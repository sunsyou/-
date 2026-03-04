import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`Created uploads directory at: ${uploadsDir}`);
  } catch (err) {
    console.error(`Failed to create uploads directory: ${err}`);
  }
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Double check if directory exists before saving
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Initialize database
const dbPath = path.join(__dirname, "portfolio.db");
const db = new Database(dbPath);
console.log(`Database initialized at: ${dbPath}`);

db.exec(`
  CREATE TABLE IF NOT EXISTS portfolios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    images TEXT NOT NULL, -- JSON array
    category TEXT NOT NULL,
    section TEXT NOT NULL DEFAULT 'portfolio',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

try {
  db.exec("ALTER TABLE portfolios ADD COLUMN section TEXT NOT NULL DEFAULT 'portfolio'");
} catch (e) {
  // Column already exists
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Serve uploaded files statically
  app.use("/uploads", express.static(uploadsDir));

  // API Routes
  app.post("/api/upload", (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.error("Single upload error:", err);
        return res.status(500).json({ error: err.message || "Upload failed" });
      }
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      const fileUrl = `/uploads/${req.file.filename}`;
      console.log(`File uploaded: ${fileUrl}`);
      res.json({ url: fileUrl });
    });
  });

  app.post("/api/upload-multiple", (req, res, next) => {
    upload.array("files")(req, res, (err) => {
      if (err) {
        console.error("Multiple upload error:", err);
        return res.status(500).json({ error: err.message || "Upload failed" });
      }
      if (!req.files || (req.files as any).length === 0) return res.status(400).json({ error: "No files uploaded" });
      const urls = (req.files as any).map((file: any) => `/uploads/${file.filename}`);
      console.log(`Multiple files uploaded: ${urls.length} files`);
      res.json({ urls });
    });
  });

  app.get("/api/portfolios", (req, res) => {
    const portfolios = db.prepare("SELECT * FROM portfolios ORDER BY created_at DESC").all();
    res.json(portfolios.map(p => ({ ...p, images: JSON.parse(p.images as string) })));
  });

  app.get("/api/portfolios/:id", (req, res) => {
    const portfolio = db.prepare("SELECT * FROM portfolios WHERE id = ?").get(req.params.id);
    if (portfolio) {
      res.json({ ...portfolio, images: JSON.parse((portfolio as any).images) });
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  app.post("/api/portfolios", (req, res) => {
    const { password, title, description, thumbnail, images, category, section } = req.body;
    if (password !== "762534") return res.status(401).json({ error: "Unauthorized" });

    const stmt = db.prepare(`
      INSERT INTO portfolios (title, description, thumbnail, images, category, section)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(title, description, thumbnail, JSON.stringify(images), category, section || 'portfolio');
    res.json({ id: info.lastInsertRowid });
  });

  app.put("/api/portfolios/:id", (req, res) => {
    const { password, title, description, thumbnail, images, category, section } = req.body;
    if (password !== "762534") return res.status(401).json({ error: "Unauthorized" });

    const stmt = db.prepare(`
      UPDATE portfolios 
      SET title = ?, description = ?, thumbnail = ?, images = ?, category = ?, section = ?
      WHERE id = ?
    `);
    stmt.run(title, description, thumbnail, JSON.stringify(images), category, section || 'portfolio', req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/portfolios/:id", (req, res) => {
    try {
      const { password } = req.body;
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      if (password !== "762534") return res.status(401).json({ error: "Unauthorized" });

      // Get portfolio data to find files to delete
      const portfolio = db.prepare("SELECT * FROM portfolios WHERE id = ?").get(id) as any;
      
      if (portfolio) {
        const deleteFile = (fileUrl: string) => {
          if (fileUrl && fileUrl.startsWith("/uploads/")) {
            const fileName = fileUrl.replace("/uploads/", "");
            const filePath = path.join(uploadsDir, fileName);
            if (fs.existsSync(filePath)) {
              try {
                fs.unlinkSync(filePath);
              } catch (err) {
                console.error(`Failed to delete file: ${filePath}`, err);
              }
            }
          }
        };

        // Delete thumbnail
        deleteFile(portfolio.thumbnail);

        // Delete images
        try {
          const images = JSON.parse(portfolio.images);
          if (Array.isArray(images)) {
            images.forEach(img => deleteFile(img));
          }
        } catch (e) {
          console.error("Failed to parse images for deletion", e);
        }
      }

      db.prepare("DELETE FROM portfolios WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Global error handler for API routes
  app.use("/api", (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("API Error:", err);
    res.status(err.status || 500).json({ 
      error: err.message || "Internal server error",
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  });
}

startServer();

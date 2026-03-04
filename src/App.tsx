import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, 
  FileText, 
  User, 
  ChevronRight, 
  ExternalLink, 
  Mail, 
  Database, 
  BarChart3, 
  Gamepad2, 
  Layers,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  Lock
} from 'lucide-react';
import { Portfolio, PortfolioInput } from './types';

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center px-6 md:px-12">
    <div 
      className="text-xl font-bold tracking-tighter cursor-pointer flex-1" 
      onClick={() => setActiveTab('home')}
    >
      SUN-GYU <span className="text-brand-blue">JANG</span>
    </div>
    <div className="flex gap-8 text-sm font-medium justify-center">
      {['Resume', 'Portfolio', 'Archive'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab.toLowerCase())}
          className={`transition-colors hover:text-brand-blue ${
            activeTab === tab.toLowerCase() ? 'text-brand-blue' : 'text-brand-ink/60'
          }`}
        >
          {tab}
        </button>
      ))}
      <button
        onClick={() => setActiveTab('admin')}
        className={`transition-colors hover:text-brand-blue ${
          activeTab === 'admin' ? 'text-brand-blue' : 'text-brand-ink/60'
        }`}
      >
        <Lock size={16} />
      </button>
    </div>
    <div className="flex-1"></div>
  </nav>
);

const Footer = () => (
  <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-zinc-950">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-sm text-brand-ink/40">
        © 2024 Sun-gyu Jang. All rights reserved.
      </div>
      <div className="flex gap-6 text-brand-ink/60">
        <a href="mailto:jsg4560@gmail.com" className="hover:text-brand-blue transition-colors">
          <Mail size={20} />
        </a>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ setActiveTab, portfolios }: { setActiveTab: (tab: string) => void, portfolios: Portfolio[] }) => (
  <div className="pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
    <section className="relative mb-32 p-8 md:p-20 rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl text-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=2070" 
          alt="Game Design Background"
          className="w-full h-full object-cover opacity-[0.1]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 to-transparent"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center"
      >
        <h2 className="text-sm font-semibold text-brand-blue uppercase tracking-widest mb-4">Game Designer</h2>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          시스템으로 재미를<br />설계하는 기획자
        </h1>
        <p className="text-xl text-brand-ink/60 max-w-2xl mb-10 leading-relaxed">
          플레이 경험을 단순한 감각이 아닌 수치와 구조로 설계합니다.<br />
          데이터 기반의 기획을 통해 지속 가능한 재미를 구축합니다.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setActiveTab('portfolio')}
            className="bg-brand-blue text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-all group"
          >
            포트폴리오 보기
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>

    <section className="mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Gamepad2 />, title: "시스템 기획", desc: "핵심 루프와 메커니즘 설계" },
          { icon: <BarChart3 />, title: "밸런스 설계", desc: "수치 기반의 전투/경제 밸런싱" },
          { icon: <Database />, title: "데이터 설계", desc: "구조화된 테이블 및 ID 체계" },
          { icon: <Layers />, title: "퀘스트 구조", desc: "내러티브와 시스템의 결합" }
        ].map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-2xl bg-zinc-900 border border-white/5 card-hover"
          >
            <div className="text-brand-blue mb-6">{skill.icon}</div>
            <h3 className="text-lg font-bold mb-2">{skill.title}</h3>
            <p className="text-sm text-brand-ink/60">{skill.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section>
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl font-bold">Portfolio</h2>
        <button 
          onClick={() => setActiveTab('portfolio')}
          className="text-brand-blue font-medium flex items-center gap-1 hover:underline"
        >
          전체 보기 <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolios.slice(0, 2).map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => {
              window.history.pushState({}, '', `/portfolio/${p.id}`);
              setActiveTab(`portfolio-detail-${p.id}`);
            }}
          >
            <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-zinc-800 border border-white/5">
              <img 
                src={p.thumbnail} 
                alt={p.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="px-2">
              <div className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">{p.category}</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-blue transition-colors">{p.title}</h3>
              <p className="text-brand-ink/60 line-clamp-2">{p.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

const ResumePage = () => (
  <div className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-20"
    >
      <section>
        <h1 className="text-4xl font-bold mb-8">Resume</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-sm font-bold text-brand-ink/20 uppercase tracking-widest mb-4">Profile</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold">이름</div>
                <div className="text-brand-ink/60">장선규 (Jang Sun-gyu)</div>
              </div>
              <div>
                <div className="text-sm font-bold">지원 직무</div>
                <div className="text-brand-ink/60">게임 시스템 기획</div>
              </div>
              <div>
                <div className="text-sm font-bold">연락처</div>
                <div className="text-brand-ink/60">jsg4560@gmail.com</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-sm font-bold text-brand-ink/20 uppercase tracking-widest mb-4">Philosophy</h2>
            <p className="text-xl font-medium leading-relaxed italic text-brand-ink/80">
              "저는 감각이 아닌 구조로 설계합니다. 시스템 → 수치 → 플레이 경험 순서로 기획을 전개하여, 의도된 재미를 데이터로 증명합니다."
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold text-brand-ink/20 uppercase tracking-widest mb-8">Experience</h2>
        <div className="space-y-12">
          {[
            {
              period: "2024",
              title: "교내 미니 게임 개발 및 런칭",
              role: "시스템 기획 및 데이터 설계",
              details: [
                "핵심 게임 루프 및 전투 시스템 설계",
                "100여 종의 스킬 데이터 테이블 구조화 및 ID 체계 수립",
                "스테이지 난이도 곡선 설계 및 몬스터 스탯 밸런싱"
              ]
            },
            {
              period: "2023",
              title: "인디 게임 프로젝트 'A' 개발",
              role: "메인 기획",
              details: [
                "로그라이크 요소가 결합된 퍼즐 시스템 기획",
                "아이템 시너지 효과 데이터 구조 설계",
                "UI/UX 와이어프레임 및 기능 명세서 작성"
              ]
            }
          ].map((exp, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-brand-blue font-mono font-medium">{exp.period}</div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                <div className="text-brand-blue text-sm font-medium mb-4">{exp.role}</div>
                <ul className="space-y-2">
                  {exp.details.map((detail, j) => (
                    <li key={j} className="text-brand-ink/60 flex gap-2">
                      <span className="text-brand-blue">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold text-brand-ink/40 uppercase tracking-widest mb-8">Tools & Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Excel / Sheets", level: "Advanced" },
            { name: "Notion", level: "Advanced" },
            { name: "PowerPoint", level: "Intermediate" },
            { name: "Figma", level: "Intermediate" }
          ].map((tool, i) => (
            <div key={i}>
              <div className="font-bold">{tool.name}</div>
              <div className="text-xs text-brand-ink/40 uppercase tracking-wider">{tool.level}</div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  </div>
);

const PortfolioListPage = ({ title, subtitle, portfolios, setActiveTab }: { title: string, subtitle: string, portfolios: Portfolio[], setActiveTab: (tab: string) => void }) => (
  <div className="pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
    <div className="mb-12">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-brand-ink/40 font-medium">{subtitle}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {portfolios.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group cursor-pointer"
          onClick={() => {
            window.history.pushState({}, '', `/portfolio/${p.id}`);
            setActiveTab(`portfolio-detail-${p.id}`);
          }}
        >
          <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-zinc-900 border border-white/5">
            <img 
              src={p.thumbnail} 
              alt={p.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">{p.category}</div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-brand-blue transition-colors">{p.title}</h3>
          <p className="text-sm text-brand-ink/60 line-clamp-2">{p.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const PortfolioDetailPage = ({ id, portfolios, onBack }: { id: number, portfolios: Portfolio[], onBack: () => void }) => {
  const portfolio = portfolios.find(p => p.id === id);
  if (!portfolio) return <div>Project not found</div>;

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-brand-ink/40 hover:text-brand-blue transition-colors mb-12"
      >
        <ArrowLeft size={20} /> Back to Portfolio
      </button>

      <header className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-sm font-bold text-brand-blue uppercase tracking-widest">{portfolio.category}</div>
          <span className="text-brand-ink/20">|</span>
          <div className="text-xs font-medium text-brand-ink/40">
            {portfolio.section === 'portfolio' ? '대표 포트폴리오 자료' : '기타 자료 모음'}
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{portfolio.title}</h1>
        <p className="text-xl text-brand-ink/60 leading-relaxed">{portfolio.description}</p>
      </header>

      <div className="space-y-8 mb-20">
        {portfolio.images.map((img, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-white/5 shadow-lg bg-zinc-900">
            <img 
              src={img} 
              alt={`${portfolio.title} page ${i + 1}`} 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminPage = ({ portfolios, onRefresh }: { portfolios: Portfolio[], onRefresh: () => void }) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Partial<Portfolio> | null>(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '762534') {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'images') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      if (type === 'thumbnail') {
        const formData = new FormData();
        formData.append('file', files[0]);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        
        if (!res.ok) {
          const errorText = await res.text();
          let errorMessage = `Upload failed (${res.status})`;
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.error || errorMessage;
          } catch (e) {
            errorMessage = errorText.slice(0, 100) || errorMessage;
          }
          throw new Error(errorMessage);
        }
        
        const data = await res.json();
        setEditingPortfolio(prev => prev ? { ...prev, thumbnail: data.url } : null);
      } else {
        const formData = new FormData();
        Array.from(files).forEach(file => formData.append('files', file as File));
        const res = await fetch('/api/upload-multiple', { method: 'POST', body: formData });
        
        if (!res.ok) {
          const errorText = await res.text();
          let errorMessage = `Upload failed (${res.status})`;
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.error || errorMessage;
          } catch (e) {
            errorMessage = errorText.slice(0, 100) || errorMessage;
          }
          throw new Error(errorMessage);
        }
        
        const data = await res.json();
        setEditingPortfolio(prev => prev ? { ...prev, images: [...(prev.images || []), ...data.urls] } : null);
      }
    } catch (err: any) {
      console.error('Upload failed', err);
      alert(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortfolio) return;

    const method = editingPortfolio.id ? 'PUT' : 'POST';
    const url = editingPortfolio.id ? `/api/portfolios/${editingPortfolio.id}` : '/api/portfolios';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingPortfolio, password })
      });

      if (res.ok) {
        setEditingPortfolio(null);
        onRefresh();
      } else {
        alert('Failed to save');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/portfolios/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        onRefresh();
      } else {
        const data = await res.json();
        alert(`Delete failed: ${data.error || res.statusText}`);
      }
    } catch (err) {
      console.error(err);
      alert('Network error occurred');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="pt-48 pb-20 px-6 flex justify-center">
        <div className="w-full max-w-md p-8 bg-zinc-900 rounded-2xl border border-white/5 shadow-2xl">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lock size={24} /> Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-white/10 bg-zinc-800 focus:ring-2 focus:ring-brand-blue outline-none text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="w-full bg-brand-blue text-white p-3 rounded-lg font-bold hover:opacity-90 transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={() => setEditingPortfolio({ title: '', description: '', thumbnail: '', images: [], category: 'creation', section: 'portfolio' })}
          className="bg-brand-blue text-white px-6 py-2 rounded-full font-bold flex items-center gap-2"
        >
          <Plus size={20} /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {portfolios.map(p => (
          <div key={p.id} className="p-6 bg-zinc-900 rounded-xl border border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-zinc-800 overflow-hidden border border-white/5">
                <img src={p.thumbnail} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{p.title}</h3>
                <div className="flex gap-2 text-xs">
                  <span className="text-brand-blue font-bold uppercase">{p.section}</span>
                  <span className="text-brand-ink/20">|</span>
                  <span className="text-brand-ink/40">{p.category}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setEditingPortfolio(p)}
                className="p-2 text-brand-ink/40 hover:text-brand-blue"
              >
                <Edit size={20} />
              </button>
              <button 
                onClick={() => handleDelete(p.id)}
                className="p-2 text-brand-ink/40 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPortfolio && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-zinc-900 w-full max-w-2xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto border border-white/10">
            <h2 className="text-2xl font-bold mb-6">{editingPortfolio.id ? 'Edit Project' : 'New Project'}</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Title</label>
                  <input 
                    className="w-full p-3 rounded-lg border border-white/10 bg-zinc-800 text-white"
                    value={editingPortfolio.title}
                    onChange={e => setEditingPortfolio({...editingPortfolio, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Category</label>
                  <select 
                    className="w-full p-3 rounded-lg border border-white/10 bg-zinc-800 text-white"
                    value={editingPortfolio.category}
                    onChange={e => setEditingPortfolio({...editingPortfolio, category: e.target.value})}
                  >
                    <option value="creation">creation</option>
                    <option value="analysis">analysis</option>
                    <option value="reverse">reverse</option>
                    <option value="suggest">suggest</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Section</label>
                <select 
                  className="w-full p-3 rounded-lg border border-white/10 bg-zinc-800 text-white"
                  value={editingPortfolio.section}
                  onChange={e => setEditingPortfolio({...editingPortfolio, section: e.target.value as any})}
                >
                  <option value="portfolio">Portfolio</option>
                  <option value="archive">Archive</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Description</label>
                <textarea 
                  className="w-full p-3 rounded-lg border border-white/10 bg-zinc-800 text-white"
                  value={editingPortfolio.description}
                  onChange={e => setEditingPortfolio({...editingPortfolio, description: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Thumbnail</label>
                <div className="flex gap-4 items-center">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => handleFileUpload(e, 'thumbnail')}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label 
                    htmlFor="thumbnail-upload"
                    className="bg-zinc-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-zinc-700 transition-colors text-sm font-medium border border-white/10"
                  >
                    Upload File
                  </label>
                  <input 
                    className="flex-1 p-3 rounded-lg border border-white/10 bg-zinc-800 text-white text-sm"
                    value={editingPortfolio.thumbnail}
                    onChange={e => setEditingPortfolio({...editingPortfolio, thumbnail: e.target.value})}
                    placeholder="Or enter URL"
                  />
                </div>
                {editingPortfolio.thumbnail && (
                  <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-white/10">
                    <img src={editingPortfolio.thumbnail} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Portfolio Images</label>
                <div className="flex gap-4 items-center">
                  <input 
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={e => handleFileUpload(e, 'images')}
                    className="hidden"
                    id="images-upload"
                  />
                  <label 
                    htmlFor="images-upload"
                    className="bg-zinc-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-zinc-700 transition-colors text-sm font-medium border border-white/10"
                  >
                    Upload Files
                  </label>
                  <div className="text-xs text-brand-ink/40">Multiple files supported</div>
                </div>
                <textarea 
                  className="w-full p-3 rounded-lg border border-white/10 bg-zinc-800 text-white text-sm"
                  value={editingPortfolio.images?.join(', ')}
                  onChange={e => setEditingPortfolio({...editingPortfolio, images: e.target.value.split(',').map(s => s.trim())})}
                  placeholder="Comma separated URLs"
                />
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {editingPortfolio.images?.map((img, idx) => (
                    <div key={idx} className="relative group aspect-[3/4] rounded-lg overflow-hidden border border-white/10">
                      <img src={img} className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setEditingPortfolio(prev => ({...prev, images: prev?.images?.filter((_, i) => i !== idx)}))}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-brand-blue text-white p-4 rounded-xl font-bold">Save</button>
                <button type="button" onClick={() => setEditingPortfolio(null)} className="flex-1 bg-zinc-800 p-4 rounded-xl font-bold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  const fetchPortfolios = async () => {
    try {
      const res = await fetch('/api/portfolios');
      const data = await res.json();
      setPortfolios(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPortfolios();
    
    // Simple routing handling for detail pages
    const path = window.location.pathname;
    if (path.startsWith('/portfolio/')) {
      const id = path.split('/').pop();
      if (id) setActiveTab(`portfolio-detail-${id}`);
    }
  }, []);

  const renderContent = () => {
    if (activeTab.startsWith('portfolio-detail-')) {
      const id = parseInt(activeTab.replace('portfolio-detail-', ''));
      return (
        <PortfolioDetailPage 
          id={id} 
          portfolios={portfolios} 
          onBack={() => {
            window.history.pushState({}, '', '/');
            setActiveTab('portfolio');
          }} 
        />
      );
    }

    switch (activeTab) {
      case 'home': return <HomePage setActiveTab={setActiveTab} portfolios={portfolios.filter(p => p.section === 'portfolio')} />;
      case 'resume': return <ResumePage />;
      case 'portfolio': return <PortfolioListPage title="Portfolio" subtitle="대표 포트폴리오 자료" portfolios={portfolios.filter(p => p.section === 'portfolio')} setActiveTab={setActiveTab} />;
      case 'archive': return <PortfolioListPage title="Archive" subtitle="기타 자료 모음" portfolios={portfolios.filter(p => p.section === 'archive')} setActiveTab={setActiveTab} />;
      case 'admin': return <AdminPage portfolios={portfolios} onRefresh={fetchPortfolios} />;
      default: return <HomePage setActiveTab={setActiveTab} portfolios={portfolios.filter(p => p.section === 'portfolio')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

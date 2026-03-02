export interface Portfolio {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  category: string;
  section: 'portfolio' | 'archive';
  created_at: string;
}

export type PortfolioInput = Omit<Portfolio, 'id' | 'created_at'>;

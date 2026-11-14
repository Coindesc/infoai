export type Language = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'zh';

export type CategoryKey = 
  | 'all'
  | 'politica'
  | 'economia'
  | 'mundo'
  | 'tecnologia'
  | 'esportes'
  | 'ciencia_saude'
  | 'cultura';

export interface Article {
  id: string;
  category: CategoryKey;
  readTime: string;
  imageUrl?: string;
  sourcesCrossedCount: number;
  title: Record<Language, string>;
  whyItMatters: Record<Language, string>;
  content: Record<Language, string[]>;
}

export interface Edition {
  id: string;
  editionNumber: number;
  date: string;
  leadArticle: Article;
  articles: Article[];
  whatsAppPayload: string;
  systemStatus: string;
  coverPrompt: string;
}

export interface SubscriberFormData {
  fullName: string;
  channel: 'email' | 'whatsapp' | 'both';
  email?: string;
  phone?: string;
  dispatchTime: string;
  interests: CategoryKey[];
}

export interface SponsorAd {
  id: string;
  sponsorName: string;
  tagline: Record<Language, string>;
  callToAction: Record<Language, string>;
  link: string;
  badge: Record<Language, string>;
  type: 'ribbon' | 'infeed' | 'newsletter';
}

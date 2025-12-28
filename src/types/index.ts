export type Platform = 'youtube' | 'facebook' | 'instagram' | 'twitter' | 'other';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  platform: Platform;
  category: string;
  views?: number;
  likes?: number;
  date: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  icon: string;
  platform?: Platform;
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
  availability: 'available' | 'limited' | 'booked';
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  logo?: string;
  rating: number;
  text: string;
  platform?: Platform;
  date: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  title: string;
  time: string;
  message: string;
}

export interface SocialLink {
  platform: Platform;
  url: string;
  icon: string;
  followers?: number;
}

export type SortOption = 'popular' | 'recent' | 'trending' | 'views';
export type FilterCategory = 'all' | Platform | string;



export interface Project {
  id: string;
  name: string;
  location: string;
  developer: string;
  architect: string;
  image: string;
  status: 'Available' | 'Sold Out' | 'Upcoming';
  type: 'Residential' | 'Commercial' | 'Mixed Use';
  details?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  purpose: string;
  message: string;
  date: string;
  status: 'new' | 'replied' | 'archived';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SiteSettings {
  siteName: string;
  ownerName: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  primaryColor: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutContent: string;
  mission: string;
  vision: string;
  metaTitle: string;
  metaDescription: string;
  autoReplyText: string;
}

export interface SiteData {
  settings: SiteSettings;
  services: Service[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
  projects: Project[];
  enquiries: Enquiry[];
}

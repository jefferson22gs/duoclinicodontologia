export interface Professional {
  id: string;
  name: string;
  role: string;
  specialty: string;
  cro?: string;
  bio: string;
  focus: string[];
  imageUrl: string;
  badge?: string;
}

export interface Service {
  id: string;
  title: string;
  category: 'endodontia' | 'estetica' | 'clinica_geral' | 'preventiva' | 'cirurgia' | 'infantil';
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  benefits: string[];
  imageUrl?: string;
  featured?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  source: 'Google';
  highlight?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'endodontia' | 'estetica' | 'atendimento' | 'geral';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'clinica' | 'atendimento' | 'tratamento' | 'infantil';
  imageUrl: string;
  caption: string;
  aspect?: 'portrait' | 'landscape' | 'square';
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  procedure: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  disclaimer: string;
}

export interface VideoReel {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
  tag: string;
  duration: string;
}

export interface ClinicConfig {
  name: string;
  brandName: string;
  tagline: string;
  instagramHandle: string;
  instagramUrl: string;
  googleRating: number;
  googleReviewCount: number;
  googleMapEmbedUrl: string;
  googleMapDirectUrl: string;
  address: {
    street: string;
    number: string;
    room: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
    fullAddress: string;
    geo: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phoneFormatted: string;
    whatsappFormatted: string;
    whatsappRaw: string; // e.g. 5511989273701
    email?: string;
    hoursWeekdays: string;
  };
  legal: {
    cnpj: string;
    cnes: string;
    technicalDirector?: string;
  };
  professionals: Professional[];
  services: Service[];
  reviews: Review[];
  faqs: FaqItem[];
  gallery: GalleryItem[];
  beforeAfterCases: BeforeAfterCase[];
  videoReels: VideoReel[];
}

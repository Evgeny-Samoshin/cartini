export type PageId =
  | 'home'
  | 'services'
  | 'portfolio'
  | 'case-detail'
  | 'how-we-work'
  | 'about'
  | 'vk-feed'
  | 'seo-landing'
  | 'contacts';

export type NicheId =
  | 'hotels'
  | 'horeca'
  | 'offices'
  | 'medical'
  | 'culture'
  | 'designers'
  | 'developers'
  | 'wholesale';

export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  priceFrom: number;
  bulkAmount: number;
  duration: string;
  listBenefits: string[];
  details: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  niche: NicheId;
  categoryTitle: string;
  image: string;
  briefResult: string;
  taskDescription: string;
  processSteps: {
    title: string;
    desc: string;
    img?: string;
  }[];
  resultDescription: string;
  paramQuantity: number;
  paramDurationDays: number;
  paramProductType: string;
  clientReview?: {
    text: string;
    author: string;
    role: string;
    avatar?: string;
  };
  otherProductPhotos: string[];
}

export interface VKPost {
  id: string;
  date: string;
  text: string;
  postTextFull: string;
  image: string;
  likes: number;
  views: number;
  comments: number;
}

export interface SEONicheConfig {
  slug: string;
  title: string;
  keyword: string;
  heroDescription: string;
  pains: { title: string; desc: string }[];
  solutions: { title: string; desc: string }[];
  defaultNiche: NicheId;
  priceRange: { item: string; price: string }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

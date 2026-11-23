export type PageId =
  | 'home'
  | 'services'
  | 'pricing'
  | 'service-paid-advertising'
  | 'service-creative-production'
  | 'service-social-media'
  | 'service-email-marketing'
  | 'service-ai-automation'
  | 'about'
  | 'work'
  | 'insights'
  | 'contact'
  | 'admin';

export interface ServiceDetail {
  id: string;
  pageId: PageId;
  title: string;
  shortDescription: string;
  badge: string;
  heroHeadline: string;
  heroSubheadline: string;
  image: string;
  problemsSolved: {
    problem: string;
    explanation: string;
  }[];
  whatIsIncluded: {
    title: string;
    description: string;
    points: string[];
  }[];
  platformsAndTools: {
    name: string;
    category: string;
    description: string;
  }[];
  campaignObjectives?: string[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  businessBenefits: {
    metricHighlight?: string;
    title: string;
    description: string;
  }[];
  portfolioPlaceholders: {
    title: string;
    label: string;
    industry: string;
    strategy: string;
    metrics: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface CaseStudy {
  id: string;
  title: string;
  clientPlaceholder: string;
  industry: string;
  category: 'Paid Advertising' | 'Graphic Design' | 'Video Editing' | 'Social Media' | 'Email Marketing' | 'AI Automation';
  challenge: string;
  strategy: string;
  servicesProvided: string[];
  measurableResult: string;
  summary: string;
  isConceptWork: boolean;
  image: string;
  keyOutputs: string[];
}

export interface InsightArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Digital Marketing Basics' | 'Paid Advertising' | 'Social Media Marketing' | 'Creative & Content' | 'Email Marketing' | 'AI & Automation' | 'Business Growth';
  readTime: string;
  publishedDate: string;
  excerpt: string;
  content: string[];
  takeaways: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ConsultationFormState {
  fullName: string;
  businessEmail: string;
  companyName: string;
  phone: string;
  websiteUrl: string;
  country: string;
  serviceRequired: string;
  budget: string;
  message: string;
  challenges?: string;
  preferredDate?: string;
  additionalInfo?: string;
}

export interface BusinessAuditFormState {
  fullName: string;
  businessName: string;
  workEmail: string;
  phone: string;
  websiteUrl: string;
  country: string;
  industry: string;
  marketingChannels: string[];
  mainChallenge: string;
  servicesInterested: string[];
  additionalDetails?: string;
}

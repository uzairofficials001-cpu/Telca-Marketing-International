import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { servicesData } from '../src/data/servicesData';
import { 
  paidAdsPlatforms, 
  creativeServicePricing, 
  socialMediaPricing, 
  emailMarketingPricing, 
  automationPricing, 
  websiteDevPricing,
  greatValueGrowthBundles,
  ppcBundles, 
  socialCreativeBundle, 
  completeBusinessGrowthBundle, 
  pricingFaqs 
} from '../src/data/pricingData';
import { insightsArticles } from '../src/data/insightsData';
import { caseStudiesData } from '../src/data/caseStudiesData';

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');
export const BACKUP_DIR = path.resolve(process.cwd(), 'data', 'backups');
export const UPLOADS_DIR = path.resolve(process.cwd(), 'data', 'uploads');

// Super Admin Owner Email configuration from environment
export const OWNER_ADMIN_EMAIL = (process.env.OWNER_ADMIN_EMAIL || 'uzairofficials001@gmail.com').trim().toLowerCase();

export interface DbUser {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  isOwner?: boolean;
  status: 'active' | 'suspended';
  resetToken?: string | null;
  createdAt: string;
  lastLogin?: string;
}

export interface DbBusinessEmail {
  id: string;
  email: string;
  displayName: string;
  category: 
    | 'General Business Inquiries' 
    | 'Sales & New Clients' 
    | 'Free Consultation Requests' 
    | 'Customer Support' 
    | 'Billing & Payments' 
    | 'Partnerships' 
    | 'Careers & Recruitment' 
    | 'Privacy & Data Requests' 
    | 'Legal Inquiries' 
    | 'Technical Support' 
    | 'Custom Category';
  description: string;
  isDefault: boolean;
  status: 'active' | 'inactive';
  verificationStatus: 'verified' | 'pending';
  forwardingTo?: string;
  createdAt: string;
}

export interface DbRecoveryEmail {
  id: string;
  email: string;
  label: string;
  isPrimary: boolean;
  status: 'verified' | 'pending';
  verificationCode?: string;
  addedAt: string;
  verifiedAt?: string;
}

export interface DbSessionRecord {
  id: string;
  userId: string;
  ip: string;
  device: string;
  browser: string;
  location: string;
  createdAt: string;
  lastActive: string;
  isCurrent?: boolean;
}

export interface DbLoginAttempt {
  id: string;
  email: string;
  ip: string;
  device: string;
  status: 'success' | 'failed';
  reason?: string;
  timestamp: string;
}

export interface DbTeamMember {
  id: string;
  fullName: string;
  email: string;
  role: 'owner' | 'content_manager' | 'marketing_manager' | 'enquiry_manager' | 'viewer';
  status: 'active' | 'invited' | 'suspended';
  invitedAt: string;
  inviteToken?: string;
  lastActive?: string;
}

export interface DbBackupRecord {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: string;
  totalRecords: number;
  createdAt: string;
  createdBy: string;
  type: 'manual' | 'automated';
}

export interface DbNotificationConfig {
  pushEnabled: boolean;
  emailBackupEnabled: boolean;
  categories: {
    consultation: boolean;
    business_audit: boolean;
    service_purchase: boolean;
    custom_package: boolean;
    contact: boolean;
    [key: string]: boolean;
  };
  securityAlerts: boolean;
  notifyOnFailedLogin: boolean;
  notifyOnPasswordChange: boolean;
  notifyOnRecoveryChange: boolean;
  notifyOnNewEnquiry: boolean;
  recipientEmails: string[];
}

export interface DbAdminNotification {
  id: string;
  eventId: string;
  category: string;
  categoryLabel: string;
  title: string;
  message: string;
  lockScreenBody: string;
  iconName: string;
  color: string;
  customerName: string;
  companyName?: string;
  referenceId: string;
  relatedRecordType: 'enquiry' | 'order' | 'security' | 'system' | 'test';
  relatedRecordId?: string;
  deepLinkUrl: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
  isTest?: boolean;
}

export interface DbPushSubscription {
  id: string;
  userId: string;
  userEmail: string;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  deviceLabel: string;
  platform: 'android' | 'ios' | 'desktop' | 'unknown';
  browser: string;
  userAgent: string;
  isStandalonePwa: boolean;
  isActive: boolean;
  failureCount: number;
  lastError?: string;
  createdAt: string;
  lastUsedAt?: string;
}

export interface DbNotificationDeliveryLog {
  id: string;
  notificationId: string;
  eventId: string;
  category: string;
  channel: 'push' | 'email';
  target: string;
  status: 'delivered' | 'failed' | 'expired_removed' | 'skipped_unconfigured' | 'skipped_disabled';
  statusCode?: number;
  detail?: string;
  timestamp: string;
}

export interface DbVerifiedOrder {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  companyName?: string;
  serviceName: string;
  packageName: string;
  amount: number;
  currency: string;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  provider: string;
  providerReference: string;
  verifiedAt?: string;
  createdAt: string;
}

export interface DbAccountSecurity {
  mfaEnabled: boolean;
  mfaMethod: 'authenticator' | 'email';
  passwordLastChanged: string;
  pendingEmailChange?: {
    newEmail: string;
    verificationCode: string;
    expiresAt: string;
  };
  sessions: DbSessionRecord[];
  loginHistory: DbLoginAttempt[];
}

export interface DbVisitorEvent {
  id: string;
  type: string;
  action: string;
  label: string;
  path: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface DbVisitorSession {
  sessionId: string;
  device: 'desktop' | 'mobile' | 'tablet';
  landingPage: string;
  startedAt: string;
  lastActiveAt: string;
  country?: string;
  referrer?: string;
  consentGiven: boolean;
  events: DbVisitorEvent[];
  enquiryId?: string;
  convertedType?: string;
}

export interface DbSocialIntegration {
  platformId: 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'x' | 'pinterest';
  platformName: string;
  publicProfileUrl: string;
  isConnected: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'requires_credentials' | 'error';
  lastConnectedAt?: string;
  accountHandle?: string;
  accountId?: string;
  scopes: string[];
  clientId?: string;
  hasSecret?: boolean;
  statusMessage?: string;
}

export interface DbSocialChannel {
  id: string;
  platform: 'linkedin' | 'x' | 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'pinterest' | 'whatsapp' | 'threads' | 'custom';
  name: string;
  url: string;
  handle: string;
  isActive: boolean;
  order: number;
  clickCount?: number;
  updatedAt: string;
}

export interface DbEnquiry {
  id: string;
  referenceId: string;
  type: 'contact' | 'custom_bundle' | 'plan_enquiry' | 'bundle_enquiry' | 'consultation' | 'business_audit';
  fullName: string;
  businessEmail: string;
  companyName: string;
  phone?: string;
  websiteUrl?: string;
  country?: string;
  serviceRequired?: string;
  selectedPlan?: string;
  planPrice?: string;
  billingType?: string;
  selectedBundle?: string;
  budget?: string;
  message?: string;
  preferredDate?: string;
  sessionId?: string;
  challenges?: string;
  industry?: string;
  marketingChannels?: string[];
  additionalInfo?: string;
  selectedServices?: Array<{
    id: string;
    name: string;
    tier: string;
    price: number;
    billingType: 'monthly' | 'one-time';
  }>;
  monthlyTotal?: number;
  oneTimeTotal?: number;
  discountPercentage?: number;
  discountAmount?: number;
  finalPrice?: number;
  businessGoals?: string;
  additionalRequirements?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'converted' | 'not_interested' | 'closed';
  notes: Array<{ text: string; author: string; createdAt: string }>;
  createdAt: string;
}

export interface DbLegalPage {
  id: string;
  slug: string;
  title: string;
  category: string;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  isPublished: boolean;
  requiresLegalReview: boolean;
  content: string;
}

export interface DbMediaItem {
  id: string;
  name: string;
  url: string;
  category: 'service' | 'hero' | 'case_study' | 'branding' | 'general';
  altText: string;
  dimensions: string;
  fileSize: string;
  usedIn: string[];
  uploadedAt: string;
}

export interface DbDeletedEnquiry extends DbEnquiry {
  deletedAt: string;
  deletedBy: string;
}

export interface DbSeoMetaTag {
  id: string;
  pageName: string;
  routeSlug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  robots: string;
  structuredDataType: string;
  isActive: boolean;
  updatedAt: string;
}

export interface DbAnalyticsEvent {
  id: string;
  type:
    | 'pageview'
    | 'cta_click'
    | 'button_click'
    | 'time_spent'
    | 'content_view'
    | 'plan_selected'
    | 'bundle_action'
    | 'form_opened'
    | 'form_submitted'
    | 'enquiry_submission'
    | 'bundle_calculation';
  path: string;
  target?: string;
  referrer?: string;
  device?: 'desktop' | 'mobile' | 'tablet';
  countryEstimate?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface DbAuditLog {
  id: string;
  action: string;
  adminEmail: string;
  details: string;
  timestamp: string;
}

export interface DbSchema {
  ownerEmail: string;
  users: DbUser[];
  enquiries: DbEnquiry[];
  deletedEnquiries?: DbDeletedEnquiry[];
  services: any[];
  pricing: any;
  bundles: {
    minServicesForDiscount: number;
    discountPercentage: number;
    readyMade: any[];
  };
  pages: Array<{
    id: string;
    title: string;
    slug: string;
    seoTitle: string;
    seoDescription: string;
    heroHeadline: string;
    heroSubheadline: string;
    isPublished: boolean;
    lastModified: string;
  }>;
  portfolio: any[];
  legalPages: DbLegalPage[];
  mediaLibrary: DbMediaItem[];
  blog: any[];
  settings: {
    agencyName: string;
    tagline: string;
    mission: string;
    contactEmail: string;
    phone: string;
    address: string;
    announcementBanner: {
      enabled: boolean;
      text: string;
      linkText?: string;
      linkUrl?: string;
    };
    maintenanceMode: boolean;
    operatingWindows: Record<string, string>;
    socialLinks: Record<string, string>;
    footerNotice: string;
    defaultSeo: {
      metaTitle: string;
      metaDescription: string;
      ogImage: string;
      canonicalDomain: string;
    };
    cookieConsent: {
      enabled: boolean;
      title: string;
      message: string;
    };
  };
  analyticsEvents: DbAnalyticsEvent[];
  activityLog: DbAuditLog[];
  businessEmails: DbBusinessEmail[];
  recoverySettings: {
    primaryEmail: string;
    backupEmails: DbRecoveryEmail[];
  };
  accountSecurity: DbAccountSecurity;
  teamMembers: DbTeamMember[];
  backups: DbBackupRecord[];
  notificationConfig: DbNotificationConfig;
  notifications: DbAdminNotification[];
  pushSubscriptions: DbPushSubscription[];
  notificationDeliveryLogs: DbNotificationDeliveryLog[];
  verifiedOrders: DbVerifiedOrder[];
  visitorSessions: DbVisitorSession[];
  socialIntegrations: DbSocialIntegration[];
  socialChannels?: DbSocialChannel[];
  seoMetaTags?: DbSeoMetaTag[];
}

function getInitialData(): DbSchema {
  const salt = bcrypt.genSaltSync(10);
  const adminPasswordHash = bcrypt.hashSync('Admin@Telca2025!', salt);

  const initialLegalPages: DbLegalPage[] = [
    {
      id: 'legal-privacy',
      slug: 'privacy-policy',
      title: 'Privacy Policy',
      category: 'Data Privacy & Protection',
      effectiveDate: '2025-01-01',
      lastUpdated: '2026-10-15',
      version: '2.1',
      isPublished: true,
      requiresLegalReview: true,
      content: `At Telca Marketing ("we," "our," or "us"), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains our data collection, usage, and retention practices for clients, prospective partners, and website visitors across international jurisdictions including the United States, United Kingdom, European Union, United Arab Emirates, and Australia.\n\n### 1. Information We Collect\nWe collect information you provide directly through our contact forms, custom bundle calculator, consultation bookings, and user account portal. This includes:\n- Full name, business email address, company name, telephone number, and website URL.\n- Performance goals, advertising budgets, target market preferences, and project requirements.\n- Account credentials securely encrypted via cryptographic one-way hashing.\n\n### 2. How We Use Your Information\nWe use your data solely for legitimate business communications, delivering advertising and growth consulting services, processing service agreements, and optimizing platform performance.\n\n### 3. Data Protection & International Transfers\nWe do not sell, rent, or trade your personal information. Data is stored on secure, encrypted infrastructure with role-based access control. International data transfers comply with standard contractual safeguards.`
    },
    {
      id: 'legal-terms',
      slug: 'terms-and-conditions',
      title: 'Terms and Conditions',
      category: 'Commercial Agreements',
      effectiveDate: '2025-01-01',
      lastUpdated: '2026-10-15',
      version: '2.0',
      isPublished: true,
      requiresLegalReview: true,
      content: `These Terms and Conditions govern your access to and use of Telca Marketing's digital platform, consulting services, performance management scopes, and marketing automation systems.\n\n### 1. Scope of Services\nTelca Marketing provides professional marketing consulting, multi-channel media management, creative production, and workflow automation. All client engagements are formally governed by an executed Statement of Work (SOW) defining specific deliverables and timelines.\n\n### 2. Media Spend Ownership & Ad Accounts\nClient ad accounts (Meta, Google, LinkedIn, TikTok) remain 100% the property of the client. Ad spend is billed directly by platforms to client payment instruments and is separate from Telca Marketing agency retainers or project fees.\n\n### 3. No Speculative Guarantees\nWhile Telca Marketing employs rigorous performance engineering and quantitative optimization, commercial outcomes depend on broader market variables, pricing, and fulfillment. We do not provide unethical speculative sales guarantees.`
    },
    {
      id: 'legal-cookies',
      slug: 'cookie-policy',
      title: 'Cookie Policy',
      category: 'Web Tracking & Consent',
      effectiveDate: '2025-01-01',
      lastUpdated: '2026-10-15',
      version: '1.4',
      isPublished: true,
      requiresLegalReview: false,
      content: `This Cookie Policy explains how Telca Marketing uses essential, functional, and performance cookies on our website.\n\n### 1. Essential Cookies\nNecessary for core security, session token persistence, and authenticated navigation. These cannot be disabled.\n\n### 2. First-Party Analytics Cookies\nWe utilize privacy-preserving, first-party aggregated analytics to evaluate popular service guides and improve site responsiveness without selling behavioral data to third-party ad brokers.`
    },
    {
      id: 'legal-refund',
      slug: 'refund-and-cancellation',
      title: 'Refund and Cancellation Policy',
      category: 'Financial Policies',
      effectiveDate: '2025-01-01',
      lastUpdated: '2026-10-15',
      version: '1.2',
      isPublished: true,
      requiresLegalReview: true,
      content: `Our commitment is transparent and professional agency partnership. Monthly performance management retainers require 30 calendar days written notice prior to the upcoming billing cycle for cancellation. Custom automation setup projects are delivered under milestone approvals; completed development milestones are non-refundable.`
    },
    {
      id: 'legal-disclaimer',
      slug: 'disclaimer',
      title: 'Performance & Results Disclaimer',
      category: 'Agency Disclaimers',
      effectiveDate: '2025-01-01',
      lastUpdated: '2026-10-15',
      version: '1.1',
      isPublished: true,
      requiresLegalReview: true,
      content: `All case studies, performance metrics, and workflow diagrams presented on this website reflect either historical anonymized client outcomes or structured performance concepts. Past performance in digital marketing does not guarantee identical future results in different industries or market conditions.`
    }
  ];

  const initialMedia: DbMediaItem[] = [
    {
      id: 'media_1',
      name: 'Paid Advertising Command Center',
      url: '/images/service_performance_ads_1793368524817.jpg',
      category: 'service',
      altText: 'Telca Marketing paid media performance analytics dashboard and campaign management interface',
      dimensions: '1920x1080',
      fileSize: '410 KB',
      usedIn: ['service-paid-advertising', 'pricing'],
      uploadedAt: '2026-10-25T12:00:00Z'
    },
    {
      id: 'media_2',
      name: 'Creative & Content Production Studio',
      url: '/images/service_creative_production_1793368525972.jpg',
      category: 'service',
      altText: 'Video editing, motion graphics, and graphic design workspace for direct-response marketing',
      dimensions: '1920x1080',
      fileSize: '385 KB',
      usedIn: ['service-creative-production', 'work'],
      uploadedAt: '2026-10-25T12:00:00Z'
    },
    {
      id: 'media_3',
      name: 'Social Media Management Workspace',
      url: '/images/service_social_media_1793433660938.jpg',
      category: 'service',
      altText: 'Multi-channel social editorial calendar and community engagement management dashboard',
      dimensions: '1920x1080',
      fileSize: '440 KB',
      usedIn: ['service-social-media', 'work'],
      uploadedAt: '2026-10-31T01:00:00Z'
    },
    {
      id: 'media_4',
      name: 'Email Marketing & Retention Canvas',
      url: '/images/service_email_marketing_1793433673325.jpg',
      category: 'service',
      altText: 'Automated email sequence workflow builder, newsletter design, and deliverability analytics',
      dimensions: '1920x1080',
      fileSize: '425 KB',
      usedIn: ['service-email-marketing', 'work'],
      uploadedAt: '2026-10-31T01:01:00Z'
    },
    {
      id: 'media_5',
      name: 'AI & Business Automation Pipeline',
      url: '/images/service_ai_automation_1793368525649.jpg',
      category: 'service',
      altText: 'Connected business workflow orchestration, CRM synchronization, and automated lead routing',
      dimensions: '1920x1080',
      fileSize: '495 KB',
      usedIn: ['service-ai-automation', 'work'],
      uploadedAt: '2026-10-25T12:00:00Z'
    },
    {
      id: 'media_6',
      name: 'Agency Global Growth Architecture',
      url: '/images/hero_marketing_growth_1793368523521.jpg',
      category: 'hero',
      altText: 'Telca Marketing international performance and digital growth architecture board',
      dimensions: '1920x1080',
      fileSize: '512 KB',
      usedIn: ['home'],
      uploadedAt: '2026-10-25T12:00:00Z'
    },
    {
      id: 'media_7',
      name: 'Executive Case Study Dashboard',
      url: '/images/portfolio_growth_case_study_1793433686566.jpg',
      category: 'case_study',
      altText: 'Multi-channel conversion funnel analytics and attribution modeling case study setup',
      dimensions: '1920x1080',
      fileSize: '460 KB',
      usedIn: ['work'],
      uploadedAt: '2026-10-31T01:01:30Z'
    },
    {
      id: 'media_8',
      name: 'Senior Marketing Architects Collaboration',
      url: '/images/about_agency_strategy_1793433704801.jpg',
      category: 'general',
      altText: 'Telca Marketing senior strategists collaborating on international growth roadmaps',
      dimensions: '1920x1080',
      fileSize: '475 KB',
      usedIn: ['about'],
      uploadedAt: '2026-10-31T01:02:00Z'
    }
  ];

  const initialPages = [
    {
      id: 'page_home',
      title: 'Homepage',
      slug: 'home',
      seoTitle: 'Telca Marketing — Performance & Digital Growth Agency',
      seoDescription: 'Turning marketing into measurable growth. We help international businesses attract the right audience, generate quality leads, and scale through paid ads and automation.',
      heroHeadline: 'Turning Marketing Into Measurable Growth.',
      heroSubheadline: 'We help businesses attract the right audience, generate quality leads, increase sales and improve their marketing operations through strategic advertising, creative content and intelligent automation.',
      isPublished: true,
      lastModified: new Date().toISOString()
    },
    {
      id: 'page_pricing',
      title: 'Pricing & Bundles',
      slug: 'pricing',
      seoTitle: 'Transparent Digital Marketing Packages & Bundles | Telca Marketing',
      seoDescription: 'Explore clear tier pricing for Meta Ads, Google Ads, Creative Production, Social Media, Email, and Custom Growth Bundles with a 10% discount on 2+ services.',
      heroHeadline: 'The Right Marketing Support for Your Business.',
      heroSubheadline: 'Choose the services you need, explore our ready-made growth bundles or build your own package. Professional marketing support with clear pricing and flexible options.',
      isPublished: true,
      lastModified: new Date().toISOString()
    },
    {
      id: 'page_about',
      title: 'About Us',
      slug: 'about',
      seoTitle: 'About Telca Marketing — International Performance Growth Agency',
      seoDescription: 'Your Business. Your Goals. Our Strategy. Discover our philosophy, strategic operating hubs, and performance methodology.',
      heroHeadline: 'Your Growth Is Our Focus.',
      heroSubheadline: 'A premium performance marketing agency built to serve forward-thinking businesses across the US, UK, UAE, Australia, and global markets.',
      isPublished: true,
      lastModified: new Date().toISOString()
    },
    {
      id: 'page_work',
      title: 'Our Work & Case Studies',
      slug: 'work',
      seoTitle: 'Performance Case Studies & Client Results | Telca Marketing',
      seoDescription: 'Explore real performance frameworks, multi-channel advertising architectures, and creative iterations across consumer and B2B sectors.',
      heroHeadline: 'Measurable Work. Strategic Execution.',
      heroSubheadline: 'Explore how our performance marketing, creative assets, and workflow automations drive tangible business outcomes for our international clients.',
      isPublished: true,
      lastModified: new Date().toISOString()
    },
    {
      id: 'page_insights',
      title: 'Insights & Knowledge',
      slug: 'insights',
      seoTitle: 'Performance Marketing Insights & Strategy Guides | Telca Marketing',
      seoDescription: 'Practical guides on paid media buying, ad creative testing, email lifecycle automation, and attribution hygiene.',
      heroHeadline: 'Strategic Perspectives on Performance & Growth.',
      heroSubheadline: 'Practical analysis, operational frameworks, and marketing insights written by senior performance practitioners.',
      isPublished: true,
      lastModified: new Date().toISOString()
    },
    {
      id: 'page_contact',
      title: 'Contact & Consultations',
      slug: 'contact',
      seoTitle: 'Contact Telca Marketing — Schedule an Inbound Strategy Call',
      seoDescription: 'Start a conversation about your marketing goals. Response within one business day across our US, UK, UAE, and Australia desks.',
      heroHeadline: 'Let’s Discuss Your Growth Strategy.',
      heroSubheadline: 'Schedule a discovery session with a senior marketing strategist or send an inquiry regarding our services and custom bundles.',
      isPublished: true,
      lastModified: new Date().toISOString()
    }
  ];

  return {
    ownerEmail: OWNER_ADMIN_EMAIL,
    users: [
      {
        id: 'user_super_admin_owner',
        fullName: 'Agency Owner & Super Admin',
        email: OWNER_ADMIN_EMAIL,
        passwordHash: adminPasswordHash,
        role: 'admin',
        isOwner: true,
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      },
      {
        id: 'user_admin_backup',
        fullName: 'Telca Admin Desk',
        email: 'admin@telcamarketing.com',
        passwordHash: adminPasswordHash,
        role: 'admin',
        isOwner: false,
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ],
    enquiries: [
      {
        id: 'enq_init_01',
        referenceId: 'TM-782419',
        type: 'contact',
        fullName: 'Sarah Jenkins',
        businessEmail: 'sarah@beaconhealth.co.uk',
        companyName: 'Beacon Healthcare UK',
        websiteUrl: 'https://beaconhealth.co.uk',
        country: 'United Kingdom',
        serviceRequired: 'Paid Advertising',
        budget: '$3,000–$5,000',
        message: 'Looking to optimize patient acquisition campaigns across Google Search and Meta Ads in the UK market.',
        preferredDate: '2026-11-10',
        status: 'qualified',
        notes: [
          {
            text: 'Initial discovery call held. Proposal sent for Search + Meta setup.',
            author: 'Super Admin',
            createdAt: new Date().toISOString()
          }
        ],
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
      },
      {
        id: 'enq_init_02',
        referenceId: 'TM-914283',
        type: 'custom_bundle',
        fullName: 'Marcus Vance',
        businessEmail: 'm.vance@nordicstyle.ae',
        companyName: 'Nordic Style Furniture',
        websiteUrl: 'https://nordicstyle.ae',
        country: 'United Arab Emirates',
        serviceRequired: 'Custom Growth Package',
        selectedServices: [
          { id: 'meta-ads', name: 'Meta Ads Management', tier: 'Growth', price: 699, billingType: 'monthly' },
          { id: 'creative', name: 'Creative & Content Production', tier: 'Growth', price: 499, billingType: 'monthly' }
        ],
        monthlyTotal: 1198,
        oneTimeTotal: 0,
        discountPercentage: 10,
        discountAmount: 119.8,
        finalPrice: 1078.2,
        businessGoals: 'Expand luxury residential furniture market reach across Dubai and Abu Dhabi.',
        additionalRequirements: 'Bilingual English/Arabic creatives needed.',
        status: 'proposal_sent',
        notes: [
          {
            text: 'Custom bundle verified with 10% discount applied to recurring services.',
            author: 'Super Admin',
            createdAt: new Date().toISOString()
          }
        ],
        createdAt: new Date(Date.now() - 3600000 * 22).toISOString()
      }
    ],
    services: Object.values(servicesData),
    pricing: {
      paidAdsPlatforms,
      creativeServicePricing,
      socialMediaPricing,
      emailMarketingPricing,
      automationPricing,
      websiteDevPricing,
      pricingFaqs
    },
    bundles: {
      minServicesForDiscount: 2,
      discountPercentage: 10,
      readyMade: [...greatValueGrowthBundles]
    },
    pages: initialPages,
    portfolio: [...caseStudiesData],
    legalPages: initialLegalPages,
    mediaLibrary: initialMedia,
    blog: [...insightsArticles],
    seoMetaTags: initialPages.map((pg, idx) => ({
      id: `seo_${pg.slug}_${idx + 1}`,
      pageName: pg.title,
      routeSlug: pg.slug === 'home' ? '/' : `/#${pg.slug}`,
      metaTitle: pg.seoTitle,
      metaDescription: pg.seoDescription,
      keywords: pg.slug === 'home'
        ? 'performance marketing agency, paid ads, creative production, AI automation, Telca Marketing'
        : `telca marketing, ${pg.title.toLowerCase()}, digital growth`,
      ogTitle: pg.seoTitle,
      ogDescription: pg.seoDescription,
      ogImage: '/images/hero_marketing_growth_1793368523521.jpg',
      canonicalUrl: pg.slug === 'home' ? 'https://telcamarketing.com/' : `https://telcamarketing.com/#${pg.slug}`,
      robots: 'index, follow',
      structuredDataType: pg.slug === 'home' ? 'ProfessionalService' : 'WebPage',
      isActive: true,
      updatedAt: new Date().toISOString()
    })),
    settings: {
      agencyName: 'Telca Marketing',
      tagline: 'Turning Marketing Into Measurable Growth.',
      mission: 'We help businesses attract the right audience, generate quality leads, increase sales and improve marketing operations through strategic advertising, creative content and intelligent automation.',
      contactEmail: 'inquiries@telcamarketing.com',
      phone: '+1 (800) 555-TELCA',
      address: 'International Growth Desks: New York · London · Dubai · Sydney',
      announcementBanner: {
        enabled: true,
        text: 'Now accepting Q4 performance audits for US, UK & UAE enterprises.',
        linkText: 'Explore Growth Bundles',
        linkUrl: '#pricing'
      },
      maintenanceMode: false,
      operatingWindows: {
        'North America (EST/PST)': '08:00 – 20:00 EST',
        'United Kingdom (GMT/BST)': '08:00 – 19:00 GMT',
        'UAE / Middle East (GST)': '09:00 – 18:00 GST',
        'Australia (AEST/AWST)': '08:00 – 18:00 AEST'
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/company/telca-marketing',
        twitter: 'https://twitter.com/telcamarketing',
        instagram: 'https://instagram.com/telcamarketing'
      },
      footerNotice: 'Telca Marketing is a registered performance marketing and growth agency. Advertising spend is billed directly by ad platforms and is separate from agency management fees. We adhere to transparent reporting and ethical growth practices.',
      defaultSeo: {
        metaTitle: 'Telca Marketing — Performance & Digital Growth Agency',
        metaDescription: 'Turning marketing into measurable growth through strategic advertising, creative content, and intelligent automation.',
        ogImage: '/images/hero_marketing_growth_1793368523521.jpg',
        canonicalDomain: 'https://telcamarketing.com'
      },
      cookieConsent: {
        enabled: true,
        title: 'Privacy & Performance Preferences',
        message: 'We use essential cookies to maintain secure sessions and privacy-preserving first-party telemetry.'
      }
    },
    analyticsEvents: [
      {
        id: 'ev_1',
        type: 'pageview',
        path: '/',
        device: 'desktop',
        countryEstimate: 'US',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'ev_2',
        type: 'cta_click',
        path: '/#pricing',
        target: 'GET MY CUSTOM BUNDLE',
        device: 'desktop',
        countryEstimate: 'UK',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: 'ev_3',
        type: 'pageview',
        path: '/#service-paid-advertising',
        device: 'mobile',
        countryEstimate: 'UAE',
        timestamp: new Date(Date.now() - 3600000 * 8).toISOString()
      }
    ],
    activityLog: [
      {
        id: 'act_1',
        action: 'Super Admin Provisioned',
        adminEmail: OWNER_ADMIN_EMAIL,
        details: `Designated Super Admin identity [${OWNER_ADMIN_EMAIL}] bootstrapped with cryptographic encryption and RBAC enforcement.`,
        timestamp: new Date().toISOString()
      }
    ],
    businessEmails: [
      {
        id: 'bmail_1',
        email: 'inquiries@telcamarketing.com',
        displayName: 'General Inquiries Desk',
        category: 'General Business Inquiries',
        description: 'Primary public email for general questions, company announcements, and agency info.',
        isDefault: true,
        status: 'active',
        verificationStatus: 'verified',
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 'bmail_2',
        email: 'sales@telcamarketing.com',
        displayName: 'Sales & New Business',
        category: 'Sales & New Clients',
        description: 'Direct inbox for Custom Bundle quotes, proposal discussions, and corporate retainers.',
        isDefault: false,
        status: 'active',
        verificationStatus: 'verified',
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 'bmail_3',
        email: 'consultations@telcamarketing.com',
        displayName: 'Growth Strategy Consultations',
        category: 'Free Consultation Requests',
        description: 'Dedicated routing desk for free strategy consultation and campaign audit bookings.',
        isDefault: false,
        status: 'active',
        verificationStatus: 'verified',
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 'bmail_4',
        email: 'support@telcamarketing.com',
        displayName: 'Client Success & Support',
        category: 'Customer Support',
        description: 'Ongoing technical and campaign support for active retainer clients.',
        isDefault: false,
        status: 'active',
        verificationStatus: 'verified',
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 'bmail_5',
        email: 'billing@telcamarketing.com',
        displayName: 'Accounts & Billing Desk',
        category: 'Billing & Payments',
        description: 'Invoicing, payment processing, wire transfer inquiries, and VAT reconciliation.',
        isDefault: false,
        status: 'active',
        verificationStatus: 'verified',
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 'bmail_6',
        email: 'partnerships@telcamarketing.com',
        displayName: 'Strategic Partnerships & Alliances',
        category: 'Partnerships',
        description: 'Agency joint ventures, ad platform vendor reps, and affiliate inquiries.',
        isDefault: false,
        status: 'active',
        verificationStatus: 'verified',
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 'bmail_7',
        email: 'careers@telcamarketing.com',
        displayName: 'Talent & Recruitment',
        category: 'Careers & Recruitment',
        description: 'Applications for senior performance media buyers, copywriters, and automation engineers.',
        isDefault: false,
        status: 'active',
        verificationStatus: 'verified',
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 'bmail_8',
        email: 'privacy@telcamarketing.com',
        displayName: 'Data Privacy & GDPR Officer',
        category: 'Privacy & Data Requests',
        description: 'Subject access requests, GDPR/CCPA data export, and privacy policy compliance.',
        isDefault: false,
        status: 'active',
        verificationStatus: 'verified',
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 'bmail_9',
        email: 'legal@telcamarketing.com',
        displayName: 'Legal & Contracts Desk',
        category: 'Legal Inquiries',
        description: 'Client Master Service Agreements (MSAs), NDAs, and corporate governance.',
        isDefault: false,
        status: 'active',
        verificationStatus: 'verified',
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 'bmail_10',
        email: 'tech@telcamarketing.com',
        displayName: 'Technical Infrastructure & Integrations',
        category: 'Technical Support',
        description: 'API tracking, Conversions API (CAPI), CRM webhooks, and automation pipelines.',
        isDefault: false,
        status: 'active',
        verificationStatus: 'verified',
        createdAt: '2025-01-01T00:00:00Z'
      }
    ],
    recoverySettings: {
      primaryEmail: OWNER_ADMIN_EMAIL,
      backupEmails: [
        {
          id: 'rec_init_1',
          email: 'executive-recovery@telcamarketing.com',
          label: 'Executive Vault Recovery',
          isPrimary: false,
          status: 'verified',
          addedAt: '2026-01-10T00:00:00Z',
          verifiedAt: '2026-01-10T00:05:00Z'
        }
      ]
    },
    accountSecurity: {
      mfaEnabled: false,
      mfaMethod: 'authenticator',
      passwordLastChanged: new Date().toISOString(),
      sessions: [
        {
          id: 'sess_curr',
          userId: 'user_super_admin_owner',
          ip: '192.0.2.45',
          device: 'MacBook Pro 16" (macOS Sonoma)',
          browser: 'Chrome 131.0',
          location: 'New York, US (Current Session)',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          lastActive: new Date().toISOString(),
          isCurrent: true
        },
        {
          id: 'sess_mobile',
          userId: 'user_super_admin_owner',
          ip: '198.51.100.12',
          device: 'iPhone 16 Pro (iOS 18.1)',
          browser: 'Mobile Safari',
          location: 'London, UK',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          lastActive: new Date(Date.now() - 7200000).toISOString(),
          isCurrent: false
        }
      ],
      loginHistory: [
        {
          id: 'log_1',
          email: OWNER_ADMIN_EMAIL,
          ip: '192.0.2.45',
          device: 'Desktop (Chrome / macOS)',
          status: 'success',
          timestamp: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: 'log_2',
          email: OWNER_ADMIN_EMAIL,
          ip: '198.51.100.12',
          device: 'Mobile (Safari / iOS)',
          status: 'success',
          timestamp: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 'log_3',
          email: OWNER_ADMIN_EMAIL,
          ip: '203.0.113.91',
          device: 'Unknown Client (Firefox / Linux)',
          status: 'failed',
          reason: 'Mismatched cryptographic credential hash',
          timestamp: new Date(Date.now() - 86400000).toISOString()
        }
      ]
    },
    teamMembers: [
      {
        id: 'tm_1',
        fullName: 'Agency Owner & Super Admin',
        email: OWNER_ADMIN_EMAIL,
        role: 'owner',
        status: 'active',
        invitedAt: '2025-01-01T00:00:00Z',
        lastActive: new Date().toISOString()
      },
      {
        id: 'tm_2',
        fullName: 'Elena Rostova',
        email: 'elena.rostova@telcamarketing.com',
        role: 'content_manager',
        status: 'active',
        invitedAt: '2026-03-10T00:00:00Z',
        lastActive: new Date(Date.now() - 43200000).toISOString()
      },
      {
        id: 'tm_3',
        fullName: 'Tariq Al-Mansoor',
        email: 'tariq.mansoor@telcamarketing.com',
        role: 'marketing_manager',
        status: 'active',
        invitedAt: '2026-05-18T00:00:00Z',
        lastActive: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'tm_4',
        fullName: 'Callum Davies',
        email: 'callum.davies@telcamarketing.com',
        role: 'enquiry_manager',
        status: 'active',
        invitedAt: '2026-08-01T00:00:00Z',
        lastActive: new Date(Date.now() - 21600000).toISOString()
      }
    ],
    backups: [],
    notificationConfig: {
      pushEnabled: true,
      emailBackupEnabled: true,
      categories: {
        consultation: true,
        business_audit: true,
        service_purchase: true,
        custom_package: true,
        contact: true
      },
      securityAlerts: true,
      notifyOnFailedLogin: true,
      notifyOnPasswordChange: true,
      notifyOnRecoveryChange: true,
      notifyOnNewEnquiry: true,
      recipientEmails: [OWNER_ADMIN_EMAIL]
    },
    notifications: [],
    pushSubscriptions: [],
    notificationDeliveryLogs: [],
    verifiedOrders: [],
    visitorSessions: [],
    socialIntegrations: [
      {
        platformId: 'facebook',
        platformName: 'Facebook',
        publicProfileUrl: 'https://facebook.com/telcamarketing',
        isConnected: false,
        connectionStatus: 'requires_credentials',
        scopes: ['pages_show_list', 'pages_read_engagement', 'ads_management'],
        statusMessage: 'OAuth configuration pending. Configure Facebook App ID and App Secret.'
      },
      {
        platformId: 'instagram',
        platformName: 'Instagram',
        publicProfileUrl: 'https://instagram.com/telcamarketing',
        isConnected: false,
        connectionStatus: 'requires_credentials',
        scopes: ['instagram_basic', 'instagram_manage_insights'],
        statusMessage: 'Connect via Meta Business Suite app with Instagram Graph API permissions.'
      },
      {
        platformId: 'linkedin',
        platformName: 'LinkedIn',
        publicProfileUrl: 'https://linkedin.com/company/telca-marketing',
        isConnected: false,
        connectionStatus: 'requires_credentials',
        scopes: ['r_organization_social', 'rw_organization_admin', 'r_ads'],
        statusMessage: 'Requires LinkedIn Developer App with Community Management API product enabled.'
      },
      {
        platformId: 'youtube',
        platformName: 'YouTube',
        publicProfileUrl: 'https://youtube.com/@telcamarketing',
        isConnected: false,
        connectionStatus: 'requires_credentials',
        scopes: ['youtube.readonly', 'yt-analytics.readonly'],
        statusMessage: 'Requires Google Cloud Console OAuth 2.0 Client credentials with YouTube Data API v3.'
      },
      {
        platformId: 'tiktok',
        platformName: 'TikTok',
        publicProfileUrl: 'https://tiktok.com/@telcamarketing',
        isConnected: false,
        connectionStatus: 'requires_credentials',
        scopes: ['user.info.basic', 'video.list'],
        statusMessage: 'Requires TikTok for Developers App approval and Client Key.'
      },
      {
        platformId: 'x',
        platformName: 'X (Twitter)',
        publicProfileUrl: 'https://x.com/telcamarketing',
        isConnected: false,
        connectionStatus: 'requires_credentials',
        scopes: ['tweet.read', 'users.read', 'offline.access'],
        statusMessage: 'Requires X Developer Portal App with OAuth 2.0 User Context authorization.'
      },
      {
        platformId: 'pinterest',
        platformName: 'Pinterest',
        publicProfileUrl: 'https://pinterest.com/telcamarketing',
        isConnected: false,
        connectionStatus: 'requires_credentials',
        scopes: ['boards:read', 'pins:read', 'user_accounts:read'],
        statusMessage: 'Requires Pinterest Business App credentials and Access Token.'
      }
    ],
    deletedEnquiries: []
  };
}

export function initDb(): DbSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const data = getInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return data;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    const initial = getInitialData();

    // Schema migration / guarantees:
    let modified = false;
    if (!parsed.legalPages) {
      parsed.legalPages = initial.legalPages;
      modified = true;
    }
    if (!parsed.mediaLibrary) {
      parsed.mediaLibrary = initial.mediaLibrary;
      modified = true;
    }
    if (!parsed.pages) {
      parsed.pages = initial.pages;
      modified = true;
    }
    if (!parsed.portfolio) {
      parsed.portfolio = [...caseStudiesData];
      modified = true;
    }
    if (!parsed.blog) {
      parsed.blog = [...insightsArticles];
      modified = true;
    }
    if (!parsed.pricing || !parsed.pricing.paidAdsPlatforms) {
      parsed.pricing = initial.pricing;
      modified = true;
    }
    if (!parsed.bundles) {
      parsed.bundles = initial.bundles;
      modified = true;
    } else if (!Array.isArray(parsed.bundles.readyMade) || parsed.bundles.readyMade.length === 0) {
      parsed.bundles.readyMade = [...greatValueGrowthBundles];
      modified = true;
    }
    if (!Array.isArray(parsed.seoMetaTags) || parsed.seoMetaTags.length === 0) {
      parsed.seoMetaTags = initial.seoMetaTags;
      modified = true;
    }
    if (!parsed.analyticsEvents) {
      parsed.analyticsEvents = [];
      modified = true;
    }
    if (!parsed.visitorSessions) {
      parsed.visitorSessions = [];
      modified = true;
    }
    if (!parsed.socialIntegrations || parsed.socialIntegrations.length === 0) {
      parsed.socialIntegrations = initial.socialIntegrations;
      modified = true;
    }
    if (!parsed.ownerEmail) {
      parsed.ownerEmail = OWNER_ADMIN_EMAIL;
      modified = true;
    }
    if (!parsed.businessEmails || parsed.businessEmails.length === 0) {
      parsed.businessEmails = initial.businessEmails;
      modified = true;
    }
    if (!parsed.recoverySettings) {
      parsed.recoverySettings = initial.recoverySettings;
      modified = true;
    }
    if (!parsed.accountSecurity) {
      parsed.accountSecurity = initial.accountSecurity;
      modified = true;
    }
    if (!parsed.teamMembers || parsed.teamMembers.length === 0) {
      parsed.teamMembers = initial.teamMembers;
      modified = true;
    }
    if (!parsed.backups) {
      parsed.backups = [];
      modified = true;
    }
    if (!parsed.notificationConfig) {
      parsed.notificationConfig = initial.notificationConfig;
      modified = true;
    } else {
      if (typeof parsed.notificationConfig.pushEnabled !== 'boolean') {
        parsed.notificationConfig.pushEnabled = true;
        modified = true;
      }
      if (typeof parsed.notificationConfig.emailBackupEnabled !== 'boolean') {
        parsed.notificationConfig.emailBackupEnabled = true;
        modified = true;
      }
      if (!parsed.notificationConfig.categories) {
        parsed.notificationConfig.categories = { ...initial.notificationConfig.categories };
        modified = true;
      } else {
        for (const key of Object.keys(initial.notificationConfig.categories)) {
          if (typeof parsed.notificationConfig.categories[key] !== 'boolean') {
            parsed.notificationConfig.categories[key] = true;
            modified = true;
          }
        }
      }
    }
    if (!Array.isArray(parsed.notifications)) {
      parsed.notifications = [];
      modified = true;
    }
    if (!Array.isArray(parsed.pushSubscriptions)) {
      parsed.pushSubscriptions = [];
      modified = true;
    }
    if (!Array.isArray(parsed.notificationDeliveryLogs)) {
      parsed.notificationDeliveryLogs = [];
      modified = true;
    }
    if (!Array.isArray(parsed.verifiedOrders)) {
      parsed.verifiedOrders = [];
      modified = true;
    }

    // Ensure owner user exists with Super Admin privileges
    const ownerIndex = parsed.users.findIndex((u: DbUser) => u.email.toLowerCase() === OWNER_ADMIN_EMAIL);
    if (ownerIndex === -1) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync('Admin@Telca2025!', salt);
      parsed.users.unshift({
        id: 'user_super_admin_owner',
        fullName: 'Agency Owner & Super Admin',
        email: OWNER_ADMIN_EMAIL,
        passwordHash: hash,
        role: 'admin',
        isOwner: true,
        status: 'active',
        createdAt: new Date().toISOString()
      });
      modified = true;
    } else {
      parsed.users[ownerIndex].role = 'admin';
      parsed.users[ownerIndex].isOwner = true;
      modified = true;
    }

    if (!parsed.socialChannels || !Array.isArray(parsed.socialChannels) || parsed.socialChannels.length === 0) {
      parsed.socialChannels = [
        {
          id: 'soc_linkedin',
          platform: 'linkedin',
          name: 'LinkedIn',
          url: 'https://linkedin.com/company/telcamarketing',
          handle: '@telcamarketing',
          isActive: true,
          order: 1,
          clickCount: 142,
          updatedAt: new Date().toISOString()
        },
        {
          id: 'soc_x',
          platform: 'x',
          name: 'X (Twitter)',
          url: 'https://x.com/telcamarketing',
          handle: '@telcamarketing',
          isActive: true,
          order: 2,
          clickCount: 98,
          updatedAt: new Date().toISOString()
        },
        {
          id: 'soc_instagram',
          platform: 'instagram',
          name: 'Instagram',
          url: 'https://instagram.com/telcamarketing',
          handle: '@telcamarketing',
          isActive: true,
          order: 3,
          clickCount: 215,
          updatedAt: new Date().toISOString()
        },
        {
          id: 'soc_facebook',
          platform: 'facebook',
          name: 'Facebook',
          url: 'https://facebook.com/telcamarketing',
          handle: '@telcamarketing',
          isActive: true,
          order: 4,
          clickCount: 86,
          updatedAt: new Date().toISOString()
        },
        {
          id: 'soc_youtube',
          platform: 'youtube',
          name: 'YouTube',
          url: 'https://youtube.com/@telcamarketing',
          handle: '@telcamarketing',
          isActive: true,
          order: 5,
          clickCount: 64,
          updatedAt: new Date().toISOString()
        },
        {
          id: 'soc_tiktok',
          platform: 'tiktok',
          name: 'TikTok',
          url: 'https://tiktok.com/@telcamarketing',
          handle: '@telcamarketing',
          isActive: true,
          order: 6,
          clickCount: 178,
          updatedAt: new Date().toISOString()
        }
      ];
      modified = true;
    }

    if (!Array.isArray(parsed.deletedEnquiries)) {
      parsed.deletedEnquiries = [];
      modified = true;
    }

    const migrateAssetPath = (value?: string) =>
      typeof value === 'string' && value.startsWith('/src/assets/images/')
        ? value.replace('/src/assets/images/', '/images/')
        : value;

    for (const item of parsed.services || []) {
      const next = migrateAssetPath(item.image);
      if (next !== item.image) { item.image = next; modified = true; }
    }
    for (const item of parsed.portfolio || []) {
      const next = migrateAssetPath(item.image);
      if (next !== item.image) { item.image = next; modified = true; }
    }
    for (const item of parsed.mediaLibrary || []) {
      const next = migrateAssetPath(item.url);
      if (next !== item.url) { item.url = next; modified = true; }
    }
    for (const item of parsed.seoMetaTags || []) {
      const next = migrateAssetPath(item.ogImage);
      if (next !== item.ogImage) { item.ogImage = next; modified = true; }
    }
    for (const item of parsed.blog || []) {
      const next = migrateAssetPath(item.image);
      if (next !== item.image) { item.image = next; modified = true; }
    }
    if (parsed.settings?.defaultSeo?.ogImage) {
      const next = migrateAssetPath(parsed.settings.defaultSeo.ogImage);
      if (next !== parsed.settings.defaultSeo.ogImage) {
        parsed.settings.defaultSeo.ogImage = next;
        modified = true;
      }
    }

    if (modified) {
      saveDb(parsed);
    }

    return parsed;
  } catch (err) {
    console.error('Error reading db.json, recreating:', err);
    const data = getInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return data;
  }
}

export function getDb(): DbSchema {
  return initDb();
}

export function saveDb(data: DbSchema): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export function logAudit(action: string, adminEmail: string, details: string) {
  const db = getDb();
  db.activityLog.unshift({
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    action,
    adminEmail,
    details,
    timestamp: new Date().toISOString()
  });
  if (db.activityLog.length > 250) {
    db.activityLog = db.activityLog.slice(0, 250);
  }
  saveDb(db);
}

export function logActivity(action: string, details: string) {
  logAudit(action, 'system', details);
}

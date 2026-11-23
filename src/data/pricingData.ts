export type TierType = 'Starter' | 'Growth' | 'Scale' | 'Boost' | 'Custom';

export interface ServiceTier {
  name: TierType;
  displayName?: string; // e.g. "Launch Website", "Starter", etc.
  price: number | null; // null for custom quote
  priceDisplay: string;
  isOneTime?: boolean;
  maintenancePrice?: number;
  maintenancePriceDisplay?: string;
  deliverables: string[];
  campaignLimits?: string;
  idealFor: string;
  whatYouGet?: string;
  bestFor?: string;
  note?: string;
  additionalNote?: string;
}

export interface PlatformPricing {
  id: string;
  name: string;
  category: string;
  badge?: string;
  tagline?: string;
  shortDescription: string;
  isOneTime?: boolean;
  tiers: Partial<Record<TierType, ServiceTier>>;
  tierKeys?: TierType[];
  importantNote?: string;
  pricingConditions?: string[];
}

export interface GrowthBundle {
  id: string;
  name: string;
  badge?: string;
  category: string;
  headline: string;
  description: string;
  startingPrice: number;
  startingPriceDisplay: string;
  individualValueDisplay?: string;
  savingsDisplay?: string;
  whyBuyThis?: string;
  bestFor?: string;
  ctaText: string;
  includedServicesShort?: string[];
  includedDeliverables: string[];
  workloadLimits?: string;
  discountNote?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
}

export interface PricingFaq {
  question: string;
  answer: string;
}

// =========================================================================
// 1. INDIVIDUAL SERVICE PRICING DATA
// =========================================================================

// 1.1 Meta Ads (5 Tiers: Starter, Growth, Scale, Boost, Custom)
export const metaAdsPricing: PlatformPricing = {
  id: 'meta-ads',
  name: 'Meta Ads',
  category: 'Paid Advertising',
  badge: 'High Conversion',
  tagline: "We don't just run ads. We build, test and optimise advertising campaigns designed to turn your advertising budget into business opportunities.",
  shortDescription: 'Targeted visual and video advertising across Facebook and Instagram feeds, Stories, and Reels to turn ad budget into business opportunities.',
  importantNote: 'Advertising spend is paid directly to Meta and is not included in the management fee. Creative production is not included in Starter; additional creative designs can be purchased separately.',
  tierKeys: ['Starter', 'Growth', 'Scale', 'Boost', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      price: 249,
      priceDisplay: '$249',
      idealFor: 'For businesses starting with paid advertising.',
      bestFor: 'Businesses starting with paid advertising.',
      note: 'Creative production is not included. You can provide your own ad creatives.',
      whatYouGet: 'Professionally managed advertising campaigns with clear performance tracking and optimisation.',
      deliverables: [
        'Meta Ads campaign setup and management',
        'Facebook & Instagram ad placement management',
        'Basic audience and competitor research',
        'Ad copywriting',
        'Campaign monitoring and weekly optimisation',
        'Pixel and conversion tracking health check',
        'Monthly performance report'
      ]
    },
    Growth: {
      name: 'Growth',
      price: 499,
      priceDisplay: '$499',
      idealFor: 'For businesses looking to generate more leads and sales.',
      bestFor: 'Businesses looking to generate more leads and sales.',
      note: 'Everything in Starter, plus custom creatives and A/B testing. Additional creative designs can be purchased separately.',
      whatYouGet: 'Professionally designed ads, tested audiences and continuous improvements to help generate better-quality leads and sales.',
      deliverables: [
        'Everything in Starter',
        'Up to 4 custom-designed ad creatives monthly',
        'Creative and audience testing',
        'A/B testing to identify better-performing ads',
        'Basic retargeting campaigns',
        'Audience segmentation',
        'Competitor ad analysis',
        'Conversion tracking setup and checks',
        'Weekly performance updates'
      ]
    },
    Scale: {
      name: 'Scale',
      price: 749,
      priceDisplay: '$749',
      idealFor: 'For businesses ready to expand their advertising performance.',
      bestFor: 'Businesses ready to expand their advertising performance.',
      note: 'Everything in Growth, plus advanced audience research and scaling strategies.',
      whatYouGet: 'A data-driven advertising strategy focused on reaching more potential customers, improving conversions and scaling successful campaigns.',
      deliverables: [
        'Everything in Growth',
        'Up to 8 custom-designed ad creatives monthly',
        'Advanced audience and competitor research',
        'Advanced retargeting strategies',
        'Lookalike audience targeting',
        'Multiple creative and audience testing',
        'Budget optimisation and scaling strategies',
        'Conversion funnel analysis',
        'Landing page improvement recommendations',
        'Detailed weekly performance reporting'
      ]
    },
    Boost: {
      name: 'Boost',
      price: 1090,
      priceDisplay: '$1,090',
      idealFor: 'For established businesses looking for complete advertising management.',
      bestFor: 'Established businesses looking for complete advertising management.',
      note: 'Everything in Scale, plus full-funnel strategy, cross-market testing and priority support.',
      whatYouGet: 'A complete advertising growth strategy designed to uncover new opportunities, improve advertising efficiency and maximise your potential return on ad spend.',
      deliverables: [
        'Everything in Scale',
        'Up to 12 custom-designed ad creatives monthly',
        'In-depth competitor advertising analysis',
        'Advanced market and audience research',
        'Market testing to identify new growth opportunities',
        'Full-funnel advertising strategy',
        'Advanced retargeting across customer journey stages',
        'Continuous creative and campaign testing',
        'Advanced conversion tracking and attribution support',
        'Cross-market audience strategies',
        'Strategic budget allocation and scaling',
        'Weekly performance reviews and insights',
        'Priority support and monthly strategy consultation'
      ]
    },
    Custom: {
      name: 'Custom',
      price: null,
      priceDisplay: 'Custom Quote',
      idealFor: 'Your business. Your goals. A strategy built around your needs.',
      bestFor: 'Businesses that need more than standard advertising packages.',
      note: 'No fixed campaign limits or predefined creative packages. Everything is tailored to your business requirements and growth objectives.',
      whatYouGet: 'A tailored advertising partnership with a complete strategy, flexible execution and ongoing optimisation built around your business goals.',
      deliverables: [
        'Complete competitor and industry research',
        'In-depth market analysis and opportunity identification',
        'Custom audience research and segmentation',
        'Market testing and campaign experimentation',
        'Complete advertising strategy and funnel planning',
        'Custom creative production and ad copywriting',
        'Retargeting and customer re-engagement strategies',
        'Multi-market and multi-platform advertising solutions',
        'Advanced tracking, analytics and attribution',
        'Ongoing campaign optimisation and scaling',
        'Custom reporting and dedicated account management'
      ]
    }
  }
};

// 1.2 Google Ads (5 Tiers: Starter, Growth, Scale, Boost, Custom)
export const googleAdsPricing: PlatformPricing = {
  id: 'google-ads',
  name: 'Google Ads',
  category: 'Paid Advertising',
  badge: 'High Intent',
  tagline: "Reach customers when they're actively searching for products and services like yours. Telca builds, manages and optimises Google Ads campaigns to attract high-intent traffic and turn searches into valuable business opportunities.",
  shortDescription: 'Capture high-intent search traffic on Google Search, Performance Max, Display, and Shopping.',
  importantNote: 'Ad spend is paid directly to Google. Management covers setup, negative keywords, bidding, tracking, and continuous optimisation.',
  tierKeys: ['Starter', 'Growth', 'Scale', 'Boost', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      price: 299,
      priceDisplay: '$299',
      idealFor: 'For businesses ready to attract customers through Google Search.',
      bestFor: 'Businesses ready to attract customers through Google Search.',
      whatYouGet: 'Ads targeting people actively searching for your services, with less wasted spend and clearer performance tracking.',
      deliverables: [
        'Google Search campaign setup and management',
        'Keyword research based on customer search intent',
        'Competitor and market overview',
        'Search ad copywriting',
        'Ad headlines, descriptions and extensions',
        'Basic conversion tracking setup',
        'Negative keyword management',
        'Weekly keyword and search-term optimisation',
        'Monthly performance report'
      ]
    },
    Growth: {
      name: 'Growth',
      price: 599,
      priceDisplay: '$599',
      idealFor: 'For businesses looking to generate consistent leads and improve conversions.',
      bestFor: 'Businesses looking to generate consistent leads and improve conversions.',
      note: 'Everything in Starter, plus display ad creatives and remarketing.',
      whatYouGet: 'More opportunities to capture potential customers, reconnect with interested visitors and improve the quality of incoming leads.',
      deliverables: [
        'Everything in Starter',
        'Up to 4 custom-designed display ad creatives',
        'Multiple keyword and search intent strategies',
        'Competitor keyword analysis',
        'Search campaign testing and optimisation',
        'Google Display or Remarketing campaigns, where suitable',
        'Landing page performance review',
        'GA4 and Google Tag Manager tracking support',
        'Conversion-focused ad copy testing',
        'Twice-weekly optimisation',
        'Weekly performance updates'
      ]
    },
    Scale: {
      name: 'Scale',
      price: 899,
      priceDisplay: '$899',
      idealFor: 'For growing businesses ready to expand their reach and advertising performance.',
      bestFor: 'Growing businesses ready to expand their reach and advertising performance.',
      note: 'Everything in Growth, plus Performance Max campaigns, continuous copy testing and bidding optimisation.',
      whatYouGet: 'A more comprehensive advertising strategy designed to capture additional search opportunities, improve conversion rates and scale profitable campaigns.',
      deliverables: [
        'Everything in Growth',
        'Up to 8 custom-designed ad creatives',
        'Advanced keyword research and segmentation',
        'Detailed competitor advertising analysis',
        'Search, Display and Performance Max campaigns, where suitable',
        'Advanced remarketing strategies',
        'Search term and negative keyword expansion',
        'Continuous ad copy and asset testing',
        'Budget allocation and bidding strategy optimisation',
        'Conversion funnel analysis',
        'Landing page improvement recommendations',
        'Advanced conversion tracking checks',
        'Detailed weekly performance reporting'
      ]
    },
    Boost: {
      name: 'Boost',
      price: 1290,
      priceDisplay: '$1,290',
      idealFor: 'For established businesses looking for complete Google advertising management.',
      bestFor: 'Established businesses looking for complete Google advertising management.',
      note: 'Everything in Scale, plus YouTube & Performance Max full-funnel strategy, competitor keyword gaps, and monthly executive strategy consultations.',
      whatYouGet: 'A complete Google advertising growth strategy focused on identifying profitable opportunities, capturing high-intent customers, improving conversion performance and scaling what works.',
      deliverables: [
        'Everything in Scale',
        'Up to 12 custom-designed display ad creatives',
        'Complete competitor advertising research',
        'In-depth market and search demand analysis',
        'Competitor keyword gap identification',
        'Market testing and new keyword opportunity discovery',
        'Full-funnel advertising strategy',
        'Advanced Search, Display, YouTube and Performance Max strategies, where suitable',
        'Advanced remarketing and audience strategies',
        'Continuous campaign and bidding experiments',
        'Advanced conversion tracking and attribution support',
        'Landing page and conversion journey analysis',
        'Strategic budget distribution across campaigns',
        'Weekly performance reviews and actionable insights',
        'Priority support and monthly strategy consultation'
      ]
    },
    Custom: {
      name: 'Custom',
      price: null,
      priceDisplay: 'Custom Quote',
      idealFor: 'A complete Google advertising solution built around your business.',
      bestFor: 'Businesses with complex advertising requirements, multiple markets or ambitious growth targets.',
      note: 'No predefined campaign or creative limits. Scope, deliverables and pricing are tailored to your business requirements.',
      whatYouGet: 'A tailored Google advertising partnership covering research, strategy, execution, tracking and continuous optimisation.',
      deliverables: [
        'Complete competitor and industry research',
        'In-depth keyword and market opportunity analysis',
        'Custom campaign architecture and strategy',
        'Search, Shopping, Display, YouTube and Performance Max management',
        'Custom ad copy and creative production',
        'Advanced remarketing and audience strategies',
        'E-commerce product feed and Merchant Center management, where required',
        'Advanced GA4, GTM and conversion tracking',
        'Offline conversion tracking and CRM integration, where applicable',
        'Landing page and conversion funnel optimisation recommendations',
        'Continuous market testing and campaign experimentation',
        'Custom performance dashboards and reporting',
        'Dedicated account management and strategic consultation'
      ]
    }
  }
};

// 1.3 TikTok Ads (4 Tiers)
export const tiktokAdsPricing: PlatformPricing = {
  id: 'tiktok-ads',
  name: 'TikTok Ads',
  category: 'Paid Advertising',
  badge: 'Viral Reach',
  tagline: 'Turn attention into action with creative-driven TikTok advertising. We create engaging ad creatives, test different approaches and optimise campaigns to help your business reach potential customers and generate measurable results.',
  shortDescription: 'Turn attention into action with creative-driven TikTok advertising and short-form video campaigns.',
  importantNote: 'TikTok ad spend is paid directly to TikTok. Ad video editing uses client-provided footage or assets; additional video creatives can be purchased separately.',
  tierKeys: ['Starter', 'Growth', 'Scale', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      price: 199,
      priceDisplay: '$199',
      idealFor: 'For businesses testing TikTok advertising for the first time.',
      bestFor: 'Businesses testing TikTok advertising for the first time.',
      whatYouGet: 'A professional starting point to introduce your products or services to potential customers through TikTok advertising.',
      deliverables: [
        'TikTok Ads account setup and campaign management',
        'Basic audience and competitor research',
        'Campaign strategy and setup',
        'Ad copy and video hook writing',
        'Up to 2 short-form video ad creatives (using client-provided footage or assets)',
        'TikTok Pixel setup and verification',
        'Basic audience targeting',
        'Weekly campaign optimisation',
        'Monthly performance report'
      ]
    },
    Growth: {
      name: 'Growth',
      price: 399,
      priceDisplay: '$399',
      idealFor: 'For businesses looking to generate more leads, engagement and sales.',
      bestFor: 'Businesses looking to generate more leads, engagement and sales.',
      note: 'Everything in Starter, plus 5 video ad creatives, Spark Ads setup, and custom audience retargeting.',
      whatYouGet: 'More creative variations, structured testing and better opportunities to identify which videos and audiences generate the strongest results.',
      deliverables: [
        'Everything in Starter',
        'Up to 5 short-form video ad creatives monthly',
        'Multiple creative hooks and storytelling approaches',
        'Creative and audience A/B testing',
        'Spark Ads setup, where eligible',
        'Basic retargeting campaigns',
        'Custom audience setup',
        'Competitor creative analysis',
        'Landing page and conversion journey review',
        'Twice-weekly campaign optimisation',
        'Weekly performance updates'
      ]
    },
    Scale: {
      name: 'Scale',
      price: 649,
      priceDisplay: '$649',
      idealFor: 'For growing brands ready to expand their TikTok advertising performance.',
      bestFor: 'Growing brands ready to expand their TikTok advertising performance.',
      note: 'Everything in Growth, plus 8 video ad creatives, Events API support, and scaling strategies.',
      whatYouGet: 'A complete creative testing and advertising strategy designed to identify winning content, attract potential buyers and scale successful campaigns.',
      deliverables: [
        'Everything in Growth',
        'Up to 8 short-form video ad creatives monthly',
        'Advanced creative testing and performance analysis',
        'Multiple audience and campaign strategies',
        'Advanced retargeting and audience segmentation',
        'Spark Ads and creator content strategy, where eligible',
        'TikTok Pixel and Events API support',
        'Budget allocation and scaling strategies',
        'Competitor and market research',
        'Landing page conversion recommendations',
        'Continuous campaign optimisation',
        'Detailed weekly performance reports'
      ]
    },
    Custom: {
      name: 'Custom',
      price: null,
      priceDisplay: 'Custom Quote',
      idealFor: 'A tailored TikTok advertising solution for ambitious brands.',
      bestFor: 'Brands with high-volume short-form video needs and multi-market scale.',
      note: 'No predefined campaign or creative limits. Deliverables are tailored to your business goals and advertising requirements.',
      whatYouGet: 'A complete TikTok advertising partnership combining creative strategy, campaign management, testing and optimisation to support long-term business growth.',
      deliverables: [
        'Complete competitor and market research',
        'Custom advertising and creative strategy',
        'High-volume short-form video creative production',
        'Advanced creative testing and experimentation',
        'Spark Ads and creator collaboration strategy',
        'Custom audience and retargeting strategies',
        'TikTok Pixel and Events API integration',
        'Full-funnel advertising strategy',
        'Multi-market campaign management',
        'TikTok Shop advertising, where available and eligible',
        'Advanced conversion tracking and reporting',
        'Continuous optimisation and scaling',
        'Dedicated account management'
      ]
    }
  }
};

// 1.3b Snapchat Ads (4 Tiers)
export const snapchatAdsPricing: PlatformPricing = {
  id: 'snapchat-ads',
  name: 'Snapchat Ads',
  category: 'Paid Advertising',
  badge: 'Gen Z & Millennial',
  tagline: 'Connect with mobile-first shoppers and active younger audiences through immersive vertical video, Story ads, and AR experiences.',
  shortDescription: 'Vertical video and AR Lens advertising on Snapchat to reach engaged younger demographics and drive mobile conversions.',
  importantNote: 'Snapchat ad spend is paid directly to Snapchat. Video editing uses client-provided footage or assets; additional video creatives can be purchased separately.',
  tierKeys: ['Starter', 'Growth', 'Scale', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      price: 199,
      priceDisplay: '$199',
      idealFor: 'Businesses testing Snapchat vertical video ads for the first time.',
      bestFor: 'Businesses testing Snapchat vertical video ads for the first time.',
      whatYouGet: 'A fast, high-impact launch into vertical video advertising on Snapchat with verified pixel tracking.',
      deliverables: [
        'Snapchat Ads account setup and campaign architecture',
        'Audience and lifestyle interest research',
        'Vertical video ad copy and call-to-action hooks',
        'Snap Pixel and conversion event tracking setup',
        'Campaign monitoring and weekly bid optimisation',
        'Monthly performance reporting'
      ]
    },
    Growth: {
      name: 'Growth',
      price: 399,
      priceDisplay: '$399',
      idealFor: 'E-commerce and local brands looking to scale mobile orders and leads.',
      bestFor: 'E-commerce and local brands looking to scale mobile orders and leads.',
      note: 'Everything in Starter, plus 4 custom video creatives, Story Ads, and retargeting.',
      whatYouGet: 'Multi-creative testing and custom retargeting to maximize mobile ROAS on Snapchat.',
      deliverables: [
        'Everything in Starter',
        'Up to 4 custom vertical video ad creatives monthly',
        'Story Ads and Collection Ads setup',
        'Audience segmentation and lookalike modeling',
        'Creative A/B testing on video hooks',
        'Retargeting website visitors and engaged viewers',
        'Bi-weekly performance reviews'
      ]
    },
    Scale: {
      name: 'Scale',
      price: 649,
      priceDisplay: '$649',
      idealFor: 'Fast-growing brands scaling cross-market Snapchat campaigns.',
      bestFor: 'Fast-growing brands scaling cross-market Snapchat campaigns.',
      note: 'Everything in Growth, plus 8 video creatives, DPA catalog sync, and CAPI support.',
      whatYouGet: 'High-volume vertical video testing and full-funnel scaling across domestic and international markets.',
      deliverables: [
        'Everything in Growth',
        'Up to 8 custom vertical video ad creatives monthly',
        'Sponsored AR Filter & Lens campaign guidance',
        'Dynamic Product Ads (DPA) catalog sync',
        'Advanced demographic and geographic cluster testing',
        'Conversion API (CAPI) server-side attribution',
        'Weekly performance reporting and strategic consultation'
      ]
    },
    Custom: {
      name: 'Custom',
      price: null,
      priceDisplay: 'Custom Quote',
      idealFor: 'Enterprise brands and multi-region e-commerce operations.',
      bestFor: 'Enterprise brands with high-volume creative needs.',
      whatYouGet: 'Bespoke Snapchat media buying with dedicated creative director and direct partner support.',
      deliverables: [
        'Everything in Scale',
        'Custom monthly video deliverable quotas',
        'Dedicated senior performance media buyer',
        'Custom audience modeling and CRM data onboarding',
        'Omnichannel attribution and incrementality testing',
        'Priority Slack/WhatsApp communication'
      ]
    }
  }
};

// 1.4 LinkedIn Ads (4 Tiers)
export const linkedinAdsPricing: PlatformPricing = {
  id: 'linkedin-ads',
  name: 'LinkedIn Ads',
  category: 'Paid Advertising',
  badge: 'B2B Precision',
  tagline: 'Reach the professionals who make business decisions. Telca builds targeted LinkedIn advertising campaigns to connect your business with decision-makers, generate qualified B2B leads and create valuable business opportunities.',
  shortDescription: 'Precision B2B targeting by job seniority, company size, and specific account lists.',
  importantNote: 'LinkedIn ad spend is separate and paid directly to LinkedIn. Additional creative designs can be purchased separately.',
  tierKeys: ['Starter', 'Growth', 'Scale', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      price: 399,
      priceDisplay: '$399',
      idealFor: 'For businesses entering LinkedIn advertising.',
      bestFor: 'Businesses entering LinkedIn advertising.',
      whatYouGet: 'Targeted advertising that puts your business in front of relevant professionals and potential business customers.',
      deliverables: [
        'LinkedIn Campaign Manager setup and management',
        'Basic B2B audience and competitor research',
        'Job title, industry and company targeting',
        'Campaign strategy and setup',
        'Ad copywriting',
        'Up to 2 custom-designed ad creatives',
        'Sponsored Content campaign management',
        'LinkedIn Insight Tag setup and verification',
        'Weekly campaign optimisation',
        'Monthly performance report'
      ]
    },
    Growth: {
      name: 'Growth',
      price: 799,
      priceDisplay: '$799',
      idealFor: 'For B2B businesses looking to generate qualified leads.',
      bestFor: 'B2B businesses looking to generate qualified leads.',
      note: 'Everything in Starter, plus 5 custom ad creatives, native Lead Gen Forms, and Matched Audiences.',
      whatYouGet: 'More precise professional targeting, lead generation campaigns and better opportunities to connect with decision-makers who matter to your business.',
      deliverables: [
        'Everything in Starter',
        'Up to 5 custom-designed ad creatives monthly',
        'LinkedIn Lead Gen Forms setup and management',
        'Advanced job title and seniority targeting',
        'Company size and industry segmentation',
        'Audience and creative A/B testing',
        'Matched Audiences setup, where eligible',
        'Basic website retargeting',
        'Competitor advertising analysis',
        'Lead quality and campaign performance review',
        'Twice-weekly optimisation',
        'Weekly performance updates'
      ]
    },
    Scale: {
      name: 'Scale',
      price: 1499,
      priceDisplay: '$1,499',
      idealFor: 'For established B2B businesses ready to expand their lead generation.',
      bestFor: 'Established B2B businesses ready to expand their lead generation.',
      note: 'Everything in Growth, plus Account-Based Marketing (ABM), Conversions API, and CRM offline conversion tracking.',
      whatYouGet: 'A strategic B2B advertising system designed to reach high-value accounts, engage key decision-makers and generate opportunities throughout the buying journey.',
      deliverables: [
        'Everything in Growth',
        'Up to 8 custom-designed ad creatives monthly',
        'Account-Based Marketing (ABM) strategy',
        'Target account and decision-maker research',
        'Company list and account-based targeting',
        'Advanced Matched Audiences and retargeting',
        'Multi-stage B2B funnel campaigns',
        'Sponsored Messaging strategy, where suitable',
        'Advanced lead qualification strategy',
        'LinkedIn Insight Tag and Conversions API support',
        'CRM integration and offline conversion tracking support',
        'Advanced audience and creative testing',
        'Budget allocation and campaign scaling',
        'Detailed weekly reporting'
      ]
    },
    Custom: {
      name: 'Custom',
      price: null,
      priceDisplay: 'Custom Quote',
      idealFor: 'A complete LinkedIn advertising strategy built around your business goals.',
      bestFor: 'Enterprise B2B organizations with global account lists and complex buying committees.',
      note: 'No predefined campaign or creative limits. All deliverables are tailored to your business requirements.',
      whatYouGet: 'A complete B2B advertising partnership focused on reaching the right companies, influencing decision-makers and turning advertising into measurable business opportunities.',
      deliverables: [
        'In-depth industry and competitor research',
        'Custom B2B demand generation strategy',
        'Advanced Account-Based Marketing (ABM)',
        'Target account and buying committee research',
        'Multiple decision-maker and audience strategies',
        'Custom creative and ad copy production',
        'Sponsored Content, Document, Video and Messaging Ads',
        'Advanced Lead Gen Forms and retargeting',
        'CRM integration and revenue attribution support',
        'Offline conversion tracking',
        'Full-funnel campaign architecture',
        'Multi-market B2B advertising',
        'Continuous testing and optimisation',
        'Custom reporting and strategic consultation',
        'Dedicated account management'
      ]
    }
  }
};

// 1.5 ChatGPT Ads (4 Tiers)
export const chatgptAdsPricing: PlatformPricing = {
  id: 'chatgpt-ads',
  name: 'ChatGPT Ads',
  category: 'Paid Advertising',
  badge: 'AI Intent',
  tagline: 'Reach potential customers while they explore solutions, compare options, and make business decisions through ChatGPT. Telca builds and manages context-driven ad campaigns designed to increase brand visibility, attract relevant traffic, and generate business opportunities.',
  shortDescription: 'Reach potential buyers in conversational search as they explore solutions and make purchasing decisions.',
  importantNote: 'Context-driven conversational ad placement. Targeting aligns with search and inquiry context. Third-party ad platform fees separate.',
  tierKeys: ['Starter', 'Growth', 'Scale', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      price: 399,
      priceDisplay: '$399',
      idealFor: 'Businesses testing ChatGPT Ads and building initial visibility with relevant audiences.',
      bestFor: 'Businesses testing ChatGPT Ads and building initial visibility with relevant audiences.',
      whatYouGet: 'Targeted conversational ads reaching potential buyers actively exploring relevant topics and solutions.',
      deliverables: [
        '1 campaign setup and management',
        'B2B audience and conversation-intent research',
        '2 ad copy variations',
        'Ad creative design',
        'Context hints and ad group setup',
        'Campaign monitoring and weekly optimisation',
        'Monthly performance report'
      ]
    },
    Growth: {
      name: 'Growth',
      price: 699,
      priceDisplay: '$699',
      idealFor: 'Businesses looking to attract more relevant visitors, test different messaging, and improve campaign performance.',
      bestFor: 'Businesses looking to attract more relevant visitors, test different messaging, and improve campaign performance.',
      whatYouGet: 'Higher query coverage, ongoing context testing, and refined messaging for qualified lead generation.',
      deliverables: [
        'Up to 2 campaigns',
        '4 ad copy variations and creative designs',
        'Multiple context and messaging tests',
        'Campaign and ad group optimisation',
        'Conversion tracking setup (where supported)',
        'Landing page recommendations',
        'Weekly performance updates'
      ]
    },
    Scale: {
      name: 'Scale',
      price: 999,
      priceDisplay: '$999',
      idealFor: 'Established B2B and SaaS businesses looking to expand reach, test new markets, and improve acquisition performance.',
      bestFor: 'Established B2B and SaaS businesses looking to expand reach, test new markets, and improve acquisition performance.',
      whatYouGet: 'Comprehensive multi-intent conversational advertising designed to scale acquisition across key markets.',
      deliverables: [
        'Up to 3 campaigns',
        '6 ad copy variations and creative designs',
        'Advanced conversation-intent research',
        'Multi-market campaign strategy',
        'Continuous creative and messaging testing',
        'Conversion performance analysis',
        'Competitor and market research',
        'Advanced optimisation and reporting'
      ]
    },
    Custom: {
      name: 'Custom',
      price: null,
      priceDisplay: "Let's Discuss",
      idealFor: 'A tailored advertising strategy for businesses with multiple markets, complex offerings, or larger campaign requirements.',
      bestFor: 'Enterprises and businesses with specialised advertising goals.',
      whatYouGet: 'Bespoke conversational advertising architecture tailored for enterprise positioning.',
      deliverables: [
        'Custom campaign strategy and structure',
        'In-depth market and competitor research',
        'Tailored creative and messaging',
        'Advanced testing and optimisation',
        'Custom reporting and performance analysis'
      ]
    }
  }
};

// 1.6 Amazon Ads (4 Tiers)
export const amazonAdsPricing: PlatformPricing = {
  id: 'amazon-ads',
  name: 'Amazon Ads',
  category: 'Paid Advertising',
  badge: 'E-Commerce',
  tagline: 'Reach shoppers actively searching for products on Amazon. Telca manages targeted advertising campaigns to increase product visibility, drive relevant traffic, and improve sales performance while controlling advertising costs.',
  shortDescription: 'Targeted Sponsored Products, Sponsored Brands, and Display campaigns to boost marketplace sales and lower ACOS.',
  importantNote: 'Ad spend is paid directly to Amazon. Management covers keyword clustering, negative targeting, bid adjustments, and listing audits.',
  tierKeys: ['Starter', 'Growth', 'Scale', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      price: 299,
      priceDisplay: '$299',
      idealFor: 'New sellers looking to promote products and build initial sales through Amazon Ads.',
      bestFor: 'New sellers looking to promote products and build initial sales through Amazon Ads.',
      whatYouGet: 'Targeted visibility for priority ASINs, controlled bids, and initial sales momentum.',
      deliverables: [
        '1 Amazon marketplace',
        'Up to 3 Sponsored Products campaigns',
        'Keyword and product-targeting research',
        'Campaign and bid setup',
        'Negative keyword management',
        'Basic listing performance review',
        'Weekly optimisation',
        'Monthly performance report'
      ]
    },
    Growth: {
      name: 'Growth',
      price: 599,
      priceDisplay: '$599',
      idealFor: 'Growing sellers looking to increase product visibility, improve advertising efficiency, and expand sales.',
      bestFor: 'Growing sellers looking to increase product visibility, improve advertising efficiency, and expand sales.',
      whatYouGet: 'Brand headline visibility, expanded product reach, and proactive ACOS optimization.',
      deliverables: [
        '1 Amazon marketplace',
        'Up to 6 campaigns',
        'Sponsored Products and Sponsored Brands (where eligible)',
        'Advanced keyword and competitor research',
        'Automatic and manual targeting strategy',
        'Search-term analysis and negative targeting',
        'Bid and budget optimisation',
        'ACOS and sales performance monitoring',
        'Weekly performance updates'
      ]
    },
    Scale: {
      name: 'Scale',
      price: 899,
      priceDisplay: '$899',
      idealFor: 'Established sellers aiming to scale advertising across products and marketplaces while improving overall profitability.',
      bestFor: 'Established sellers aiming to scale advertising across products and marketplaces while improving overall profitability.',
      whatYouGet: 'Full-funnel Amazon advertising driving market share expansion across domestic and regional marketplaces.',
      deliverables: [
        'Up to 2 Amazon marketplaces',
        'Up to 10 campaigns',
        'Sponsored Products, Sponsored Brands and Sponsored Display (where eligible)',
        'Advanced keyword and product-targeting strategy',
        'Competitor and market research',
        'Campaign structure optimisation',
        'Continuous bid and budget adjustments',
        'ACOS and TACOS analysis',
        'Sales performance and growth strategy',
        'Detailed weekly reporting'
      ]
    },
    Custom: {
      name: 'Custom',
      price: null,
      priceDisplay: "Let's Discuss",
      idealFor: 'A tailored Amazon advertising strategy for brands with larger product catalogues, multiple marketplaces, or complex advertising requirements.',
      bestFor: 'Established Amazon brands and businesses with larger advertising operations.',
      whatYouGet: 'Enterprise Amazon brand management with dedicated strategist and custom profitability dashboards.',
      deliverables: [
        'Custom campaign architecture',
        'Multi-marketplace advertising strategy',
        'Advanced product and competitor research',
        'Full-funnel advertising strategy',
        'Custom performance and profitability analysis',
        'Dedicated optimisation and reporting'
      ]
    }
  }
};

// 1.7 Pinterest Ads (4 Tiers)
export const pinterestAdsPricing: PlatformPricing = {
  id: 'pinterest-ads',
  name: 'Pinterest Ads',
  category: 'Paid Advertising',
  badge: 'Visual Discovery',
  tagline: 'Connect your brand with people actively discovering ideas, exploring products, and planning purchases. Telca creates and manages visual advertising campaigns to increase brand discovery, drive qualified traffic, and support product sales.',
  shortDescription: 'Visual search and lifestyle discovery advertising that converts planners into buyers.',
  importantNote: 'Pinterest ad spend is separate and paid directly to Pinterest. Visual creative assets designed by Telca or client-provided.',
  tierKeys: ['Starter', 'Growth', 'Scale', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      price: 249,
      priceDisplay: '$249',
      idealFor: 'Businesses starting Pinterest advertising and building brand visibility.',
      bestFor: 'Businesses starting Pinterest advertising and building brand visibility.',
      whatYouGet: 'Visual discovery campaigns introducing your product catalog to active shoppers at attractive CPMs.',
      deliverables: [
        '1 Pinterest ad account',
        'Up to 2 campaigns',
        'Audience and keyword research',
        '3 custom ad creatives',
        'Standard and video Pin campaigns',
        'Pinterest Tag health check',
        'Weekly optimisation',
        'Monthly performance report'
      ]
    },
    Growth: {
      name: 'Growth',
      price: 449,
      priceDisplay: '$449',
      idealFor: 'Brands looking to increase website traffic, product discovery, and purchase opportunities.',
      bestFor: 'Brands looking to increase website traffic, product discovery, and purchase opportunities.',
      whatYouGet: 'Shopping feed sync, custom Pin designs, and retargeting that drives qualified storefront traffic.',
      deliverables: [
        'Up to 4 campaigns',
        '5 custom ad creatives',
        'Keyword and interest-based targeting',
        'Shopping and product promotion (where eligible)',
        'Basic retargeting',
        'Creative and audience testing',
        'Pinterest Tag conversion tracking',
        'Weekly performance updates'
      ]
    },
    Scale: {
      name: 'Scale',
      price: 699,
      priceDisplay: '$699',
      idealFor: 'Established brands and e-commerce businesses looking to expand reach and improve advertising performance.',
      bestFor: 'Established brands and e-commerce businesses looking to expand reach and improve advertising performance.',
      whatYouGet: 'Scale-stage visual advertising capturing buyers at every phase from discovery to checkout.',
      deliverables: [
        'Up to 6 campaigns',
        '8 custom ad creatives',
        'Advanced audience segmentation',
        'Keyword, interest and shopping strategies',
        'Advanced retargeting',
        'Lookalike audience strategy (where available)',
        'Continuous creative and campaign testing',
        'Conversion performance analysis',
        'Competitor research and weekly reporting'
      ]
    },
    Custom: {
      name: 'Custom',
      price: null,
      priceDisplay: "Let's Discuss",
      idealFor: 'A tailored Pinterest advertising strategy for larger brands, multiple product categories, and multi-market campaigns.',
      bestFor: 'Businesses seeking a customised Pinterest growth strategy.',
      whatYouGet: 'Enterprise multi-category Pinterest presence with dedicated creative iterations and full conversion tracking.',
      deliverables: [
        'Custom campaign architecture',
        'Advanced audience and keyword research',
        'Multi-market advertising strategy',
        'Custom creative testing',
        'Advanced conversion analysis',
        'Dedicated optimisation and reporting'
      ]
    }
  }
};

// 1.8 Email Marketing (4 Tiers)
export const emailMarketingPricing: PlatformPricing = {
  id: 'email-marketing',
  name: 'Email Marketing',
  category: 'Growth & Retention',
  badge: 'High Retention',
  tagline: 'Turn your email list into a valuable business channel. Telca creates targeted email campaigns and automated customer journeys to nurture leads, strengthen customer relationships, and generate repeat business.',
  shortDescription: 'Automated customer journeys, segmentation, and retention campaigns that generate repeat revenue.',
  importantNote: 'Email marketing platform subscriptions (Klaviyo, Mailchimp, HubSpot) and sending volume fees are separate.',
  tierKeys: ['Starter', 'Growth', 'Scale', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      price: 149,
      priceDisplay: '$149',
      idealFor: 'Small businesses looking to build consistent communication with their audience.',
      bestFor: 'Small businesses looking to build consistent communication with their audience.',
      whatYouGet: 'Clean, reliable newsletter communication that keeps your brand top of mind with subscribers.',
      deliverables: [
        '2 email campaigns per month',
        'Custom email copywriting and design',
        'Basic audience segmentation',
        '1 welcome email automation',
        'Email list organisation',
        'Basic performance tracking'
      ]
    },
    Growth: {
      name: 'Growth',
      price: 349,
      priceDisplay: '$349',
      idealFor: 'Growing businesses looking to convert more leads and improve customer engagement.',
      bestFor: 'Growing businesses looking to convert more leads and improve customer engagement.',
      whatYouGet: 'Automated nurturing flows that turn new subscribers into paying clients without manual effort.',
      deliverables: [
        '4 email campaigns per month',
        '3 automated email workflows',
        'Advanced audience segmentation',
        'Lead nurturing sequences',
        'Subject-line A/B testing',
        'Custom email templates',
        'Campaign optimisation',
        'Monthly performance report'
      ]
    },
    Scale: {
      name: 'Scale',
      price: 649,
      priceDisplay: '$649',
      idealFor: 'Established businesses looking to scale email-driven sales, customer retention, and marketing automation.',
      bestFor: 'Established businesses looking to scale email-driven sales, customer retention, and marketing automation.',
      whatYouGet: 'Comprehensive retention engine driving repeat sales, abandoned cart recovery, and VIP customer flows.',
      deliverables: [
        '8 email campaigns per month',
        'Up to 6 automated workflows',
        'Behaviour-based email automation',
        'Advanced customer segmentation',
        'Re-engagement and retention campaigns',
        'Advanced A/B testing',
        'Deliverability monitoring',
        'Performance and revenue analysis'
      ]
    },
    Custom: {
      name: 'Custom',
      price: null,
      priceDisplay: "Let's Discuss",
      idealFor: 'A tailored email marketing solution for businesses with complex customer journeys and larger marketing operations.',
      bestFor: 'Businesses requiring advanced email marketing and customer lifecycle automation.',
      whatYouGet: 'Bespoke enterprise lifecycle management with custom HTML coding and dedicated copywriter.',
      deliverables: [
        'Custom email marketing strategy',
        'Advanced automation architecture',
        'Multi-segment campaign management',
        'CRM and third-party integrations',
        'Custom reporting and optimisation'
      ]
    }
  }
};

// 1.9 Social Media (4 Tiers)
export const socialMediaPricing: PlatformPricing = {
  id: 'social-media',
  name: 'Social Media',
  category: 'Social Media & Creative',
  badge: 'Organic Authority',
  tagline: 'Build a consistent and engaging social media presence with strategic content, professional creatives, and active page management. Telca helps businesses strengthen their brand identity, connect with their audience, and turn social engagement into business opportunities.',
  shortDescription: 'Consistent organic social media presence with strategic content pillars, custom design, and community care.',
  importantNote: 'Organic social media management. Paid ad campaigns and ad boosts are managed separately under paid advertising packages.',
  tierKeys: ['Starter', 'Growth', 'Scale', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      price: 179,
      priceDisplay: '$179',
      idealFor: 'Small businesses looking to maintain a professional and consistent social media presence.',
      bestFor: 'Small businesses looking to maintain a professional and consistent social media presence.',
      whatYouGet: 'A polished, active social presence that builds trust when prospects look up your brand.',
      deliverables: [
        'Management of 2 social media platforms',
        '12 posts per month',
        'Custom graphic designs',
        'Captions and hashtag research',
        'Monthly content calendar',
        'Scheduling and publishing',
        'Basic page optimisation',
        'Monthly performance report'
      ]
    },
    Growth: {
      name: 'Growth',
      price: 399,
      priceDisplay: '$399',
      idealFor: 'Growing businesses looking to improve brand awareness, engagement, and audience growth.',
      bestFor: 'Growing businesses looking to improve brand awareness, engagement, and audience growth.',
      whatYouGet: 'Multi-channel reach with video reels, story updates, and active comment engagement.',
      deliverables: [
        'Management of 3 social media platforms',
        '16 posts per month',
        '4 short-form video edits (client-provided footage)',
        'Custom graphics and captions',
        'Content strategy and monthly calendar',
        'Story content and scheduling',
        'Community engagement and comment management',
        'Monthly performance analysis'
      ]
    },
    Scale: {
      name: 'Scale',
      price: 699,
      priceDisplay: '$699',
      idealFor: 'Established brands looking for consistent multi-platform management and stronger audience relationships.',
      bestFor: 'Established brands looking for consistent multi-platform management and stronger audience relationships.',
      whatYouGet: 'High-frequency multi-network dominance that drives consistent community growth and brand authority.',
      deliverables: [
        'Management of 4 social media platforms',
        '20 posts per month',
        '8 short-form video edits (client-provided footage)',
        'Advanced content strategy',
        'Platform-specific content planning',
        'Story planning and publishing',
        'Active community management',
        'Competitor and trend research',
        'Monthly performance and growth report'
      ]
    },
    Custom: {
      name: 'Custom',
      price: null,
      priceDisplay: "Let's Discuss",
      idealFor: 'A tailored social media management solution for businesses with larger content and management requirements.',
      bestFor: 'Brands requiring a comprehensive social media presence across multiple platforms.',
      whatYouGet: 'Full-service social media department with bespoke content production and executive branding.',
      deliverables: [
        'Custom platform selection',
        'Tailored content strategy',
        'Flexible monthly content volume',
        'Advanced brand and competitor research',
        'Dedicated community management',
        'Custom reporting and strategy reviews'
      ]
    }
  }
};

// 1.10 AI Automation (4 Tiers with Setup + Maintenance)
export const automationPricing: PlatformPricing = {
  id: 'ai-automation',
  name: 'AI Automation',
  category: 'AI & Automation',
  badge: 'Efficiency',
  isOneTime: true,
  tagline: 'Reduce manual work and improve business efficiency with intelligent automation. Telca builds connected workflows that streamline lead management, customer communication, data handling, and repetitive business operations.',
  shortDescription: 'Intelligent business workflows that automate lead management, CRM follow-ups, and repetitive operations.',
  importantNote: 'Setup fees cover complete architecture, testing, and deployment. Monthly maintenance is optional but recommended for ongoing updates. Third-party API costs separate.',
  tierKeys: ['Starter', 'Growth', 'Scale', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      price: 299,
      priceDisplay: '$299 Setup',
      maintenancePrice: 49,
      maintenancePriceDisplay: '$49/month',
      isOneTime: true,
      idealFor: 'Small businesses looking to automate repetitive tasks and reduce manual work.',
      bestFor: 'Small businesses looking to automate repetitive tasks and reduce manual work.',
      note: 'Maintenance: $49/month',
      whatYouGet: 'A reliable, error-free automated connection that saves hours of manual data entry every week.',
      deliverables: [
        '1 automated business workflow',
        'Lead capture and data collection',
        'Google Sheets or basic CRM integration',
        'Automated email notifications',
        'Basic workflow error monitoring',
        'Testing and deployment',
        '7 days of post-launch support'
      ]
    },
    Growth: {
      name: 'Growth',
      price: 699,
      priceDisplay: '$699 Setup',
      maintenancePrice: 99,
      maintenancePriceDisplay: '$99/month',
      isOneTime: true,
      idealFor: 'Growing businesses looking to streamline lead management, follow-ups, and internal processes.',
      bestFor: 'Growing businesses looking to streamline lead management, follow-ups, and internal processes.',
      note: 'Maintenance: $99/month',
      whatYouGet: 'Speed-to-lead automation that instantly qualifies prospects and routes them to your sales pipeline.',
      deliverables: [
        'Up to 3 automated workflows',
        'AI-powered lead qualification',
        'CRM and Google Sheets integration',
        'Automated email follow-ups',
        'Multi-step workflow automation',
        'AI-powered data processing',
        'Workflow monitoring and optimisation',
        '14 days of post-launch support'
      ]
    },
    Scale: {
      name: 'Scale',
      price: 1499,
      priceDisplay: '$1,499 Setup',
      maintenancePrice: 199,
      maintenancePriceDisplay: '$199/month',
      isOneTime: true,
      idealFor: 'Established businesses looking to automate multiple departments and complex operational processes.',
      bestFor: 'Established businesses looking to automate multiple departments and complex operational processes.',
      note: 'Maintenance: $199/month',
      whatYouGet: 'Department-wide operational infrastructure with custom AI chatbots and automated CRM synchronization.',
      deliverables: [
        'Up to 6 connected workflows',
        'Advanced AI-powered automation',
        'Multi-platform integrations',
        'Automated lead routing and qualification',
        'Advanced CRM and data synchronisation',
        'AI chatbot or customer support workflow',
        'Conditional logic and error handling',
        'Workflow performance monitoring',
        '30 days of post-launch support'
      ]
    },
    Custom: {
      name: 'Custom',
      price: null,
      priceDisplay: "Let's Discuss",
      isOneTime: true,
      idealFor: 'A tailored automation solution for businesses with specialised operational requirements.',
      bestFor: 'Businesses requiring complex, interconnected automation systems.',
      whatYouGet: 'Enterprise AI agent engineering with private LLM integration and dedicated maintenance SLA.',
      deliverables: [
        'Custom automation architecture',
        'Advanced AI agent development',
        'Complex API and CRM integrations',
        'Multi-department workflow automation',
        'Custom chatbot and voice automation',
        'Dedicated implementation and support'
      ]
    }
  }
};

// 1.11 AI Website Development (4 Packages: Launch, Business, Advanced, Custom)
export const websiteDevPricing: PlatformPricing = {
  id: 'ai-website-dev',
  name: 'AI Website Development',
  category: 'AI & Web Development',
  badge: 'High Performance',
  isOneTime: true,
  tagline: 'Modern, high-converting websites designed for growth and engineered for performance.',
  shortDescription: 'Modern, brand-aligned websites built with modern frameworks, AI-assisted content, and conversion journeys.',
  importantNote: 'One-time project-based pricing. Domain, hosting, premium software and API costs are separate. Revisions and post-launch bug-fix support are defined in the project agreement.',
  pricingConditions: [
    'One-time project-based pricing.',
    'Domain, hosting, premium software and API costs are separate.',
    'Revisions and post-launch bug-fix support are defined in the project agreement.'
  ],
  tierKeys: ['Starter', 'Growth', 'Scale', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      displayName: 'Launch Website',
      price: 249,
      priceDisplay: '$249',
      isOneTime: true,
      idealFor: 'For businesses needing a clean, professional online presence launched fast.',
      bestFor: 'Businesses needing a clean, professional online presence launched fast.',
      whatYouGet: 'A beautiful, mobile-optimized starter website ready to receive traffic and generate inquiries.',
      deliverables: [
        'Professional, brand-aligned website',
        'AI-assisted design and content creation',
        'Mobile-responsive experience',
        'Contact and enquiry functionality',
        'Essential integrations',
        'Basic SEO-ready structure',
        'Testing and deployment'
      ]
    },
    Growth: {
      name: 'Growth',
      displayName: 'Business Website',
      price: 499,
      priceDisplay: '$499',
      isOneTime: true,
      idealFor: 'Custom business-focused website experience with conversion-focused journeys.',
      bestFor: 'Established service businesses and brands looking to scale conversions.',
      whatYouGet: 'A custom conversion-engineered website equipped with tracking, SEO foundations, and lead funnels.',
      deliverables: [
        'Custom business-focused website experience',
        'Advanced branding and visual design',
        'Conversion-focused user journey',
        'Enquiry forms and business integrations',
        'AI-powered features where suitable',
        'Analytics and tracking integration',
        'SEO and GEO foundations',
        'Performance and functionality testing'
      ]
    },
    Scale: {
      name: 'Scale',
      displayName: 'Advanced Website',
      price: 999,
      priceDisplay: '$999',
      isOneTime: true,
      idealFor: 'Bespoke website design and development with interactive features and workflows.',
      bestFor: 'Brands requiring bespoke interactivity, custom workflows, and deep integrations.',
      whatYouGet: 'High-performance digital flagship featuring interactive tools, API connectivity, and technical speed optimization.',
      deliverables: [
        'Bespoke website design and development',
        'Advanced interactive functionality',
        'Custom AI-powered features',
        'Third-party API integrations',
        'Advanced business workflows',
        'Custom user experience',
        'Advanced technical optimisation',
        'Full testing and deployment support'
      ]
    },
    Custom: {
      name: 'Custom',
      displayName: 'Custom Development',
      price: null,
      priceDisplay: 'Custom Quote',
      isOneTime: true,
      idealFor: 'Complex website requirements and specialized web applications.',
      bestFor: 'Enterprises and web applications requiring custom software engineering.',
      whatYouGet: 'Bespoke full-stack web application development tailored to your exact technical specifications.',
      deliverables: [
        'Complex website requirements',
        'Custom web applications',
        'Advanced AI integrations',
        'Specialised business systems',
        'Dedicated architecture planning & QA'
      ]
    }
  }
};

// 1.12 Creative & Content Production (Preserved for compatibility and standalone selection)
export const creativeServicePricing: PlatformPricing = {
  id: 'creative-production',
  name: 'Creative & Content Production',
  category: 'Social Media & Creative',
  badge: 'Visual Design',
  tagline: 'High-converting ad visuals, brand graphics, and short-form video assets engineered to stop the scroll.',
  shortDescription: 'High-converting ad visuals, brand graphics, and short-form video assets.',
  importantNote: 'Video editing uses client-provided footage. Filming, actors, paid stock assets and advanced production are charged separately.',
  tierKeys: ['Starter', 'Growth', 'Scale', 'Custom'],
  tiers: {
    Starter: {
      name: 'Starter',
      price: 299,
      priceDisplay: '$299',
      idealFor: 'Small businesses needing regular static ad graphics and clean copy.',
      bestFor: 'Small businesses needing regular static ad graphics and clean copy.',
      whatYouGet: 'Polished static visual assets and tested ad copy ready to run on any ad channel.',
      deliverables: [
        '6 static graphic designs (social posts or ad visuals)',
        '2 ad copy variations (headlines, body, and CTA)',
        'Basic creative direction matching your brand guide',
        '1 revision round per deliverable',
        'Standard delivery formats (PNG, JPG, WebP)'
      ]
    },
    Growth: {
      name: 'Growth',
      price: 499,
      priceDisplay: '$499',
      idealFor: 'Active brands requiring a steady stream of graphics and short-form video edits.',
      bestFor: 'Active brands requiring a steady stream of graphics and short-form video edits.',
      whatYouGet: 'A balanced pipeline of static creatives and short-form video reels that prevent ad fatigue.',
      deliverables: [
        '10 graphic designs (static ads, carousels, or social posts)',
        '4 short-form video edits (Reels/TikTok/Shorts, up to 60s each)',
        '4 ad copy variations and caption sets',
        'Strategic creative direction & angle recommendations',
        'Up to 2 revision rounds per deliverable',
        'Vertical 9:16, square 1:1, and 16:9 formats'
      ]
    },
    Scale: {
      name: 'Scale',
      price: 799,
      priceDisplay: '$799',
      idealFor: 'Aggressive advertisers testing multiple creative hooks to eliminate ad fatigue.',
      bestFor: 'Aggressive advertisers testing multiple creative hooks to eliminate ad fatigue.',
      whatYouGet: 'High-volume creative testing pod with weekly variant turnarounds and kinetic captioning.',
      deliverables: [
        '16 graphic designs across static ads and carousels',
        '8 short-form video edits with kinetic captions and sound design',
        '8 ad copy variations & hook testing matrices',
        'Multiple creative concepts & monthly testing ideas',
        'Up to 2 revision rounds per deliverable',
        'Fast 48-hour turnarounds on active creative batches'
      ]
    },
    Custom: {
      name: 'Custom',
      price: null,
      priceDisplay: 'Custom Quote',
      idealFor: 'High-volume content, advanced 3D motion, UGC coordination, and custom production.',
      bestFor: 'High-volume content, advanced 3D motion, UGC coordination, and custom production.',
      whatYouGet: 'Dedicated art director and video pod producing studio-grade multi-platform content.',
      deliverables: [
        'High-volume content production (20+ videos / 30+ graphics)',
        'UGC creator sourcing & coordination',
        'Advanced motion graphics & 3D product renders',
        'Custom scriptwriting & brand visual guidelines',
        'Dedicated art director & video editing pod'
      ]
    }
  }
};

// Array of all paid ads platforms
export const paidAdsPlatforms: PlatformPricing[] = [
  metaAdsPricing,
  googleAdsPricing,
  tiktokAdsPricing,
  snapchatAdsPricing,
  linkedinAdsPricing,
  chatgptAdsPricing,
  amazonAdsPricing,
  pinterestAdsPricing
];

// Unified Array of all individual services
export const allIndividualServices: PlatformPricing[] = [
  metaAdsPricing,
  googleAdsPricing,
  tiktokAdsPricing,
  snapchatAdsPricing,
  linkedinAdsPricing,
  chatgptAdsPricing,
  amazonAdsPricing,
  pinterestAdsPricing,
  emailMarketingPricing,
  socialMediaPricing,
  automationPricing,
  websiteDevPricing,
  creativeServicePricing
];

// =========================================================================
// 2. GREAT VALUE GROWTH BUNDLES (6 Distinct Business Goal Packages)
// =========================================================================
export const greatValueGrowthBundles: GrowthBundle[] = [
  // 1. Meta + Google Ads Package
  {
    id: 'bundle-meta-google',
    name: 'Meta + Google Ads Package',
    badge: 'High Intent & Reach',
    category: 'Paid Advertising',
    startingPrice: 499,
    startingPriceDisplay: '$499/month',
    individualValueDisplay: '$548',
    savingsDisplay: '$49',
    headline: 'More opportunities to attract customers.',
    description: 'Reach people scrolling through social media and people actively searching Google for your products or services.',
    whyBuyThis: 'Meta helps you reach potential customers, while Google helps you capture people already looking for what you offer. Two channels, one coordinated strategy.',
    bestFor: 'Restaurants, clinics, local businesses and service providers.',
    ctaText: 'Select Meta + Google',
    includedServicesShort: [
      'Meta Ads management',
      'Google Ads management',
      'Audience & keyword research',
      'Regular campaign optimisation'
    ],
    includedDeliverables: [
      'Meta Ads management',
      'Google Ads management',
      'Audience and keyword research',
      'Campaign setup and ad copy',
      'Regular campaign optimisation',
      'Monthly performance report'
    ],
    discountNote: 'Individual value: $548 · You save $49/mo'
  },

  // 2. Complete PPC Package
  {
    id: 'bundle-complete-ppc',
    name: 'Complete PPC Package',
    badge: '3 Ad Platforms',
    category: 'Omnichannel PPC',
    startingPrice: 679,
    startingPriceDisplay: '$679/month',
    individualValueDisplay: '$747',
    savingsDisplay: '$68',
    headline: 'Reach customers across three advertising platforms.',
    description: 'Expand your advertising beyond one channel and reach different audiences through search, social media and short-form video.',
    whyBuyThis: 'Capture search demand, reach social media audiences and introduce your brand through TikTok advertising—all under one strategy.',
    bestFor: 'Growing brands and businesses with enough budget to advertise across multiple platforms.',
    ctaText: 'Select Complete PPC',
    includedServicesShort: [
      'Meta Ads management',
      'Google Ads management',
      'TikTok Ads management',
      'Cross-channel optimisation'
    ],
    includedDeliverables: [
      'Meta Ads management',
      'Google Ads management',
      'TikTok Ads management',
      'Audience and keyword research',
      'Campaign setup and ad copy',
      'Campaign optimisation',
      'Monthly performance report'
    ],
    discountNote: 'Individual value: $747 · You save $68/mo'
  },

  // 3. Local Business Growth Package
  {
    id: 'bundle-local-business',
    name: 'Local Business Growth Package',
    badge: 'Local Presence & Trust',
    category: 'Local Marketing',
    startingPrice: 649,
    startingPriceDisplay: '$649/month',
    individualValueDisplay: '$727',
    savingsDisplay: '$78',
    headline: 'Get noticed by more potential local customers.',
    description: 'Build your online presence, promote your services and make it easier for nearby customers to discover your business.',
    whyBuyThis: 'Advertising attracts attention, while active social media profiles help potential customers understand your business and build confidence before contacting you.',
    bestFor: 'Restaurants, cafes, dentists, salons, gyms and local service businesses.',
    ctaText: 'Select Local Business',
    includedServicesShort: [
      'Meta Ads management',
      'Google Ads management',
      'Social Media (12 posts/mo)',
      'Local keyword research'
    ],
    includedDeliverables: [
      'Meta Ads management',
      'Google Ads management',
      'Social Media Management',
      '12 social media posts monthly across 2 platforms',
      'Local audience and keyword research',
      'Campaign optimisation',
      'Monthly performance report'
    ],
    discountNote: 'Individual value: $727 · You save $78/mo'
  },

  // 4. E-commerce Growth Package
  {
    id: 'bundle-ecommerce-growth',
    name: 'E-commerce Growth Package',
    badge: 'Sales & Retention',
    category: 'E-commerce',
    startingPrice: 749,
    startingPriceDisplay: '$749/month',
    individualValueDisplay: '$826',
    savingsDisplay: '$77',
    headline: 'Attract shoppers and encourage repeat purchases.',
    description: 'Promote your products, create better advertising visuals and stay connected with customers through email.',
    whyBuyThis: 'Ads help bring shoppers to your store, creative designs promote your products and email marketing helps you reconnect with existing customers.',
    bestFor: 'Online stores, fashion brands, beauty products and e-commerce businesses.',
    ctaText: 'Select E-commerce Growth',
    isPopular: true,
    includedServicesShort: [
      'Meta & Google Ads',
      'Email Marketing (2 campaigns)',
      'AI Creative (8 ad designs)',
      'Product & audience research'
    ],
    includedDeliverables: [
      'Meta Ads management',
      'Google Ads management',
      'Email Marketing',
      'AI Creative & Ad Production',
      '8 static ad creatives monthly',
      '2 email campaigns monthly',
      'Product and audience research',
      'Campaign optimisation and reporting'
    ],
    discountNote: 'Individual value: $826 · You save $77/mo'
  },

  // 5. B2B Growth Package
  {
    id: 'bundle-b2b-growth',
    name: 'B2B Growth Package',
    badge: 'Lead Generation',
    category: 'B2B & Enterprise',
    startingPrice: 769,
    startingPriceDisplay: '$769/month',
    individualValueDisplay: '$847',
    savingsDisplay: '$78',
    headline: 'Reach the right business audience.',
    description: 'Promote your solutions to relevant professionals and companies through search advertising, LinkedIn and email marketing.',
    whyBuyThis: 'Google reaches people searching for solutions, LinkedIn helps target professional audiences and email keeps your existing subscribers engaged.',
    bestFor: 'Software houses, IT companies, SaaS businesses and B2B service providers.',
    ctaText: 'Select B2B Growth',
    includedServicesShort: [
      'Google Ads management',
      'LinkedIn Ads management',
      'Email Marketing (2 campaigns)',
      'B2B audience research'
    ],
    includedDeliverables: [
      'Google Ads management',
      'LinkedIn Ads management',
      'Email Marketing',
      'B2B audience and keyword research',
      '2 email campaigns monthly',
      'Ad copy and campaign setup',
      'Campaign optimisation',
      'Monthly performance report'
    ],
    discountNote: 'Individual value: $847 · You save $78/mo'
  },

  // 6. Brand & Social Growth Package
  {
    id: 'bundle-brand-social',
    name: 'Brand & Social Growth Package',
    badge: 'Brand Presence',
    category: 'Brand & Social',
    startingPrice: 499,
    startingPriceDisplay: '$499/month',
    individualValueDisplay: '$557',
    savingsDisplay: '$58',
    headline: 'Build a stronger brand presence online.',
    description: 'Keep your social media active while using paid advertising and creative content to reach new audiences.',
    whyBuyThis: 'Consistent content builds your brand presence, paid ads expand your reach and promotional creatives help communicate your offers.',
    bestFor: 'Startups, lifestyle businesses, new brands and consumer businesses.',
    ctaText: 'Select Brand & Social',
    includedServicesShort: [
      'Social Media (12 posts/mo)',
      'Meta Ads management',
      'AI Creative (8 ad designs)',
      'Content planning'
    ],
    includedDeliverables: [
      'Social Media Management',
      'Meta Ads management',
      'AI Creative & Ad Production',
      '12 social media posts monthly across 2 platforms',
      '8 static advertising creatives monthly',
      'Content planning',
      'Campaign optimisation',
      'Monthly performance report'
    ],
    discountNote: 'Individual value: $557 · You save $58/mo'
  }
];

// Backwards-compatible aliases
export const ppcBundles: GrowthBundle[] = greatValueGrowthBundles.slice(0, 3);
export const socialCreativeBundle: GrowthBundle = greatValueGrowthBundles[5];
export const completeBusinessGrowthBundle: GrowthBundle = greatValueGrowthBundles[3];

// =========================================================================
// 5. PRICING FAQS
// =========================================================================
export const pricingFaqs: PricingFaq[] = [
  {
    question: 'Can I purchase just one service?',
    answer: 'Yes. You can choose any individual service package without purchasing a bundle. Many clients begin with a single service, such as Meta Ads, Google Ads, TikTok Ads, Email Marketing, or a specific automation setup.'
  },
  {
    question: 'Why should I choose a bundle?',
    answer: 'Bundles combine related services and provide a 10% discount on recurring service fees when two or more distinct services are selected. They ensure your advertising, creative assets, social media, and retention channels work together as an integrated engine.'
  },
  {
    question: 'Can I create my own bundle?',
    answer: 'Yes. Use Make Your Own Bundle to select at least two distinct services and their package tiers. The interactive calculator automatically computes your custom total and applies the 10% discount to all recurring fees.'
  },
  {
    question: 'Is advertising spend included in management fees?',
    answer: 'No. Advertising spend is paid directly by the client to the advertising platforms (Meta, Google, TikTok, LinkedIn, Amazon, Pinterest). Our pricing covers professional strategy, technical setup, copywriting, creative testing, bid calibration, and continuous optimization.'
  },
  {
    question: 'Are software and third-party API costs included?',
    answer: 'No. External software subscriptions (e.g. Klaviyo, Shopify, HubSpot), API usage tokens (OpenAI, Anthropic), and domain/hosting charges are separate unless explicitly specified in your custom agreement.'
  },
  {
    question: 'Can I upgrade or change my tier later?',
    answer: 'Yes. You can upgrade, change tiers, or add additional channels as your business expands. We provide flexible month-to-month agreements without locking you into rigid long-term contracts.'
  },
  {
    question: 'Do you guarantee results?',
    answer: 'No professional agency can guarantee specific sales numbers or ROAS, as conversions depend on market conditions, offer strength, product pricing, and sales closing. We guarantee disciplined strategy, rigorous creative testing, transparent weekly reporting, and relentless data-driven optimization.'
  },
  {
    question: 'Is AI Automation a monthly retainer or one-time project?',
    answer: 'AI Automation is priced as a one-time setup fee ($299, $699, or $1,499) that includes architecture, testing, deployment, and post-launch support. Ongoing maintenance and monitoring are optional and start from $49/month.'
  }
];

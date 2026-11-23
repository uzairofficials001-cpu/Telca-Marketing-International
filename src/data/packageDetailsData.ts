import { 
  greatValueGrowthBundles,
  allIndividualServices,
  ServiceTier,
  TierType 
} from './pricingData';

export interface PackageDetail {
  id: string;
  type: 'bundle' | 'service';
  name: string;
  badge?: string;
  category: string;
  headline: string;
  price: number | null;
  priceDisplay: string;
  billingType: string;
  oneLineBenefit: string;
  includedServicesShort: string[];
  priceComparisonSavings: {
    comparisonText: string;
    savingsAmount?: string;
    note: string;
    separateTotal?: string;
  };
  problemSolved: {
    headline: string;
    painPoints: string[];
    summary: string;
  };
  synergy: {
    headline: string;
    explanation: string;
    steps: { title: string; description: string }[];
  };
  keyBenefits: {
    title: string;
    description: string;
  }[];
  detailedDeliverables: string[];
  serviceLimits: string;
  whoShouldChoose: {
    headline: string;
    profiles: string[];
    idealStage: string;
  };
  enquiryPayload: {
    serviceName: string;
    planName: string;
    priceDisplay: string;
    billingType: string;
    isBundle: boolean;
    bundleName?: string;
  };
}

export const readyMadeBundleDetails: Record<string, PackageDetail> = {
  // 1. Meta + Google Ads Package
  'bundle-meta-google': {
    id: 'bundle-meta-google',
    type: 'bundle',
    name: 'Meta + Google Ads Package',
    badge: 'High Intent & Reach',
    category: 'Paid Advertising',
    headline: 'More opportunities to attract customers.',
    price: 499,
    priceDisplay: '$499 / month',
    billingType: 'Monthly Retainer',
    oneLineBenefit: 'Reach people scrolling through social media and people actively searching Google for your products or services.',
    includedServicesShort: [
      'Meta Ads management',
      'Google Ads management',
      'Audience & keyword research',
      'Regular campaign optimisation'
    ],
    priceComparisonSavings: {
      comparisonText: 'Purchasing Meta Ads management and Google Ads management separately totals $548/month.',
      savingsAmount: 'Individual value: $548 · You save $49/mo',
      note: 'All prices are monthly management fees. Advertising budget is separate.',
      separateTotal: '$548 / month'
    },
    problemSolved: {
      headline: 'Why buy this?',
      painPoints: [
        'Relying solely on Google misses millions of potential buyers discovering solutions on social media.',
        'Relying solely on Meta misses high-intent shoppers actively searching Google ready to purchase today.',
        'Fragmented ad management results in competing bids and wasted advertising spend.',
        'Lack of cross-platform tracking prevents knowing which network delivered each conversion.'
      ],
      summary: 'Meta helps you reach potential customers, while Google helps you capture people already looking for what you offer. Two channels, one coordinated strategy.'
    },
    synergy: {
      headline: 'How Meta and Google Ads Work Together',
      explanation: 'Two channels, one coordinated strategy: Meta introduces your brand to ideal audiences, while Google captures the immediate buying intent.',
      steps: [
        {
          title: '1. Discovery & Demand via Meta',
          description: 'Reach potential customers across Instagram and Facebook feeds, Stories, and Reels to generate awareness and warm interest.'
        },
        {
          title: '2. High-Intent Capture via Google',
          description: 'Capture in-market prospects searching Google for your specific products, services, or category.'
        },
        {
          title: '3. Cross-Platform Retargeting',
          description: 'Re-engage site visitors who searched on Google with social proof and video testimonials on Instagram.'
        },
        {
          title: '4. Continuous Optimisation',
          description: 'Weekly bid balancing and keyword tuning to keep your blended cost per acquisition as low as possible.'
        }
      ]
    },
    keyBenefits: [
      {
        title: 'Two Dominant Ad Networks',
        description: 'Complete coverage of visual social discovery and active Google search intent.'
      },
      {
        title: 'Coordinated Strategy',
        description: 'Consistent messaging, audience lists, and negative keyword alignment across both platforms.'
      },
      {
        title: 'Weekly Performance Tuning',
        description: 'Proactive bid adjustments and audience pruning to maximise return on ad spend.'
      },
      {
        title: 'Clear Monthly Reporting',
        description: 'Transparent cross-platform report showing clicks, enquiries, and cost per lead.'
      }
    ],
    detailedDeliverables: [
      'Meta Ads management (Facebook & Instagram feeds, Stories, and Reels)',
      'Google Ads management (Google Search, Keyword Match, and Performance Max)',
      'Audience and keyword research tailored to your market',
      'Campaign setup and direct-response ad copywriting',
      'Regular campaign optimisation and bid tuning',
      'Monthly performance report and strategic recommendations'
    ],
    serviceLimits: 'Monthly management fee. Advertising budget is paid directly by the client to Meta and Google for 100% financial transparency.',
    whoShouldChoose: {
      headline: 'Best for',
      profiles: [
        'Restaurants, cafes, and hospitality businesses wanting nearby customers.',
        'Dental clinics, doctors, and healthcare practices attracting local patients.',
        'Local businesses and professional service providers seeking inbound client enquiries.'
      ],
      idealStage: 'Businesses ready to capture search demand while building visual recognition in their market.'
    },
    enquiryPayload: {
      serviceName: 'Meta + Google Ads Package',
      planName: 'Dual-Network Growth Bundle',
      priceDisplay: '$499 / month',
      billingType: 'Monthly Retainer',
      isBundle: true,
      bundleName: 'Meta + Google Ads Package'
    }
  },

  // 2. Complete PPC Package
  'bundle-complete-ppc': {
    id: 'bundle-complete-ppc',
    type: 'bundle',
    name: 'Complete PPC Package',
    badge: '3 Ad Platforms',
    category: 'Omnichannel PPC',
    headline: 'Reach customers across three advertising platforms.',
    price: 679,
    priceDisplay: '$679 / month',
    billingType: 'Monthly Retainer',
    oneLineBenefit: 'Expand your advertising beyond one channel and reach different audiences through search, social media and short-form video.',
    includedServicesShort: [
      'Meta Ads management',
      'Google Ads management',
      'TikTok Ads management',
      'Cross-channel optimisation'
    ],
    priceComparisonSavings: {
      comparisonText: 'Purchasing Meta Ads ($249), Google Ads ($249), and TikTok Ads ($249) separately totals $747/month.',
      savingsAmount: 'Individual value: $747 · You save $68/mo',
      note: 'All prices are monthly management fees. Advertising budget is separate.',
      separateTotal: '$747 / month'
    },
    problemSolved: {
      headline: 'Why buy this?',
      painPoints: [
        'Over-dependence on a single ad channel leaves businesses vulnerable to sudden algorithm changes or rising CPMs.',
        'Missing Gen-Z and millennial audiences who spend their discovery time on TikTok.',
        'Paying multiple separate agencies to manage different ad networks with no shared data.'
      ],
      summary: 'Capture search demand, reach social media audiences and introduce your brand through TikTok advertising—all under one strategy.'
    },
    synergy: {
      headline: 'How Three Platforms Work Together',
      explanation: 'Search, social media, and short-form video united under a single disciplined advertising strategy.',
      steps: [
        {
          title: '1. TikTok Video Discovery',
          description: 'Leverage short-form commercial video to introduce your brand to fresh audiences with high engagement.'
        },
        {
          title: '2. Meta Social Proof',
          description: 'Retarget engaged viewers on Instagram and Facebook with client testimonials and detailed offer overviews.'
        },
        {
          title: '3. Google Search Capture',
          description: 'Capture prospects who saw your social ads and later search Google for your brand or service.'
        },
        {
          title: '4. Dynamic Channel Rebalancing',
          description: 'Shift weekly focus to whichever platform is delivering the lowest cost per qualified lead.'
        }
      ]
    },
    keyBenefits: [
      {
        title: '3 Dominant Networks',
        description: 'Complete cross-demographic advertising reach across Google, Meta, and TikTok.'
      },
      {
        title: 'Single Point of Contact',
        description: 'One experienced agency managing all paid channels with no fragmented communication.'
      },
      {
        title: 'Budget Fluidity',
        description: 'We allocate focus based on real performance data rather than rigid channel quotas.'
      },
      {
        title: 'Comprehensive Analytics',
        description: 'Consolidated monthly report comparing CPA and ROAS across all three networks.'
      }
    ],
    detailedDeliverables: [
      'Meta Ads management (Facebook & Instagram)',
      'Google Ads management (Search & Performance Max)',
      'TikTok Ads management (In-feed commercial discovery)',
      'Audience and keyword research across all 3 platforms',
      'Campaign setup, ad copy, and video hook recommendations',
      'Continuous cross-network campaign optimisation',
      'Monthly consolidated performance report'
    ],
    serviceLimits: 'Monthly management fee. Advertising budget is paid directly by the client to Meta, Google, and TikTok.',
    whoShouldChoose: {
      headline: 'Best for',
      profiles: [
        'Growing brands ready to expand beyond single-channel advertising.',
        'Businesses with enough budget to advertise across multiple platforms simultaneously.',
        'Consumer and lifestyle businesses wanting short-form video discovery alongside search capture.'
      ],
      idealStage: 'Established businesses with validated offers ready to scale multi-channel market share.'
    },
    enquiryPayload: {
      serviceName: 'Complete PPC Package',
      planName: '3-Platform PPC Growth Bundle',
      priceDisplay: '$679 / month',
      billingType: 'Monthly Retainer',
      isBundle: true,
      bundleName: 'Complete PPC Package'
    }
  },

  // 3. Local Business Growth Package
  'bundle-local-business': {
    id: 'bundle-local-business',
    type: 'bundle',
    name: 'Local Business Growth Package',
    badge: 'Local Presence & Trust',
    category: 'Local Marketing',
    headline: 'Get noticed by more potential local customers.',
    price: 649,
    priceDisplay: '$649 / month',
    billingType: 'Monthly Retainer',
    oneLineBenefit: 'Build your online presence, promote your services and make it easier for nearby customers to discover your business.',
    includedServicesShort: [
      'Meta Ads management',
      'Google Ads management',
      'Social Media (12 posts/mo)',
      'Local keyword research'
    ],
    priceComparisonSavings: {
      comparisonText: 'Purchasing Meta Ads ($249), Google Ads ($249), and Social Media ($229) separately totals $727/month.',
      savingsAmount: 'Individual value: $727 · You save $78/mo',
      note: 'All prices are monthly management fees. Advertising budget is separate.',
      separateTotal: '$727 / month'
    },
    problemSolved: {
      headline: 'Why buy this?',
      painPoints: [
        'Ads bring visitors, but abandoned social media feeds make potential customers think your business is closed.',
        'Competitors taking the top spots on local Google search and Maps.',
        'No regular time to create local promotions, post updates, or monitor ad performance.'
      ],
      summary: 'Advertising attracts attention, while active social media profiles help potential customers understand your business and build confidence before contacting you.'
    },
    synergy: {
      headline: 'How Advertising & Active Social Media Work Together',
      explanation: 'Paid ads drive new nearby foot traffic and calls, while active social profiles provide the social proof and trust needed to convert.',
      steps: [
        {
          title: '1. Local Radius Ad Campaigns',
          description: 'Geotargeted Meta and Google Ads reaching customers within your exact service radius.'
        },
        {
          title: '2. Active Social Feeds',
          description: '12 branded social posts monthly demonstrating active service, customer reviews, and specials.'
        },
        {
          title: '3. Local Keyword Capture',
          description: 'Rank for local high-intent search terms like "best near me" or treatment-specific keywords.'
        },
        {
          title: '4. Ongoing Local Optimisation',
          description: 'Adjusting ad bids for peak business hours and seasonal demand.'
        }
      ]
    },
    keyBenefits: [
      {
        title: 'Local Market Dominance',
        description: 'Be the first business nearby customers see when they search or browse.'
      },
      {
        title: 'Consistent Social Proof',
        description: '12 professional social posts per month keeping your Facebook and Instagram active and trustworthy.'
      },
      {
        title: 'Zero Founder Stress',
        description: 'No more scrambling to write captions, design graphics, or adjust ad budgets.'
      },
      {
        title: 'Transparent Reporting',
        description: 'Monthly reports showing calls, directions, website visits, and lead counts.'
      }
    ],
    detailedDeliverables: [
      'Meta Ads management (Local geotargeted campaigns on FB & Instagram)',
      'Google Ads management (Local search keywords and Maps visibility)',
      'Social Media Management for up to 2 platforms',
      '12 social media posts monthly across 2 platforms (3 posts per week)',
      'Local audience and keyword research',
      'Campaign optimisation and ad copy',
      'Monthly performance report'
    ],
    serviceLimits: 'Monthly management fee. Advertising budget is paid directly by client to Meta and Google.',
    whoShouldChoose: {
      headline: 'Best for',
      profiles: [
        'Restaurants, cafes, bakeries, and food establishments.',
        'Dentists, dental clinics, physiotherapists, and private medical practices.',
        'Beauty salons, spas, barbershops, and fitness studios.',
        'Local trades, automotive, and domestic service providers.'
      ],
      idealStage: 'Local brick-and-mortar or regional service businesses seeking dependable local customer flow.'
    },
    enquiryPayload: {
      serviceName: 'Local Business Growth Package',
      planName: 'Local Presence & Ads Bundle',
      priceDisplay: '$649 / month',
      billingType: 'Monthly Retainer',
      isBundle: true,
      bundleName: 'Local Business Growth Package'
    }
  },

  // 4. E-commerce Growth Package
  'bundle-ecommerce-growth': {
    id: 'bundle-ecommerce-growth',
    type: 'bundle',
    name: 'E-commerce Growth Package',
    badge: 'Sales & Retention',
    category: 'E-commerce',
    headline: 'Attract shoppers and encourage repeat purchases.',
    price: 749,
    priceDisplay: '$749 / month',
    billingType: 'Monthly Retainer',
    oneLineBenefit: 'Promote your products, create better advertising visuals and stay connected with customers through email.',
    includedServicesShort: [
      'Meta & Google Ads',
      'Email Marketing (2 campaigns)',
      'AI Creative (8 ad designs)',
      'Product & audience research'
    ],
    priceComparisonSavings: {
      comparisonText: 'Purchasing Meta Ads ($249), Google Shopping/Search ($249), Email Marketing ($149), and Creative Designs ($179) separately totals $826/month.',
      savingsAmount: 'Individual value: $826 · You save $77/mo',
      note: 'All prices are monthly management fees. Advertising budget is separate.',
      separateTotal: '$826 / month'
    },
    problemSolved: {
      headline: 'Why buy this?',
      painPoints: [
        'Paying for ad clicks to an online store without collecting emails or retargeting cart abandoners.',
        'Ad creatives fatiguing quickly, leading to rising cost per purchase.',
        'One-time shoppers never returning because no email nurture campaigns exist.'
      ],
      summary: 'Ads help bring shoppers to your store, creative designs promote your products and email marketing helps you reconnect with existing customers.'
    },
    synergy: {
      headline: 'The E-commerce Growth Loop',
      explanation: 'Paid advertising brings new shoppers, custom creatives keep conversion rates high, and email marketing turns first-time buyers into repeat customers.',
      steps: [
        {
          title: '1. Paid Acquisition (Meta & Google Ads)',
          description: 'Target in-market shoppers with Google Shopping/Search and dynamic product ads on Instagram.'
        },
        {
          title: '2. High-Converting Visual Creatives',
          description: '8 custom ad designs monthly highlighting product benefits, seasonal offers, and social proof.'
        },
        {
          title: '3. Direct-to-Inbox Customer Retention',
          description: '2 tailored email marketing campaigns monthly to boost repeat order volume and customer lifetime value.'
        },
        {
          title: '4. Ongoing ROAS Optimization',
          description: 'Pruning low-margin product ads and scaling winning creatives based on verified sales.'
        }
      ]
    },
    keyBenefits: [
      {
        title: 'Full E-commerce Funnel',
        description: 'Acquisition, conversion creative, and post-purchase email retention in one synchronized system.'
      },
      {
        title: 'Fresh Creative Iteration',
        description: '8 custom static ad designs every month to prevent ad fatigue and keep click-through rates high.'
      },
      {
        title: 'Higher Customer Lifetime Value',
        description: 'Email campaigns reconnect with previous purchasers, driving margin-rich repeat sales.'
      },
      {
        title: 'Disciplined ROAS Focus',
        description: 'Monthly reporting tracking purchases, ROAS, and email engagement.'
      }
    ],
    detailedDeliverables: [
      'Meta Ads management (Facebook & Instagram feed, Stories, and catalog ads)',
      'Google Ads management (Google Search and Performance Max / Shopping)',
      'Email Marketing (2 promotional or newsletter campaigns monthly)',
      'AI Creative & Ad Production (8 static ad creatives monthly)',
      'Product and audience research',
      'Campaign setup, copy, and audience testing',
      'Campaign optimisation and monthly performance reporting'
    ],
    serviceLimits: 'Monthly management fee. Advertising budget is paid directly by client to Meta and Google.',
    whoShouldChoose: {
      headline: 'Best for',
      profiles: [
        'Online stores and direct-to-consumer (DTC) brands.',
        'Fashion, apparel, and lifestyle product companies.',
        'Beauty, skincare, and cosmetics businesses.',
        'Home goods, consumer electronics, and specialty retailers.'
      ],
      idealStage: 'E-commerce businesses with an established store seeking systematic acquisition and retention.'
    },
    enquiryPayload: {
      serviceName: 'E-commerce Growth Package',
      planName: 'E-commerce Acquisition & Retention Bundle',
      priceDisplay: '$749 / month',
      billingType: 'Monthly Retainer',
      isBundle: true,
      bundleName: 'E-commerce Growth Package'
    }
  },

  // 5. B2B Growth Package
  'bundle-b2b-growth': {
    id: 'bundle-b2b-growth',
    type: 'bundle',
    name: 'B2B Growth Package',
    badge: 'Lead Generation',
    category: 'B2B & Enterprise',
    headline: 'Reach the right business audience.',
    price: 769,
    priceDisplay: '$769 / month',
    billingType: 'Monthly Retainer',
    oneLineBenefit: 'Promote your solutions to relevant professionals and companies through search advertising, LinkedIn and email marketing.',
    includedServicesShort: [
      'Google Ads management',
      'LinkedIn Ads management',
      'Email Marketing (2 campaigns)',
      'B2B audience research'
    ],
    priceComparisonSavings: {
      comparisonText: 'Purchasing Google Search Ads ($299), LinkedIn Ads ($349), and Email Nurture ($199) separately totals $847/month.',
      savingsAmount: 'Individual value: $847 · You save $78/mo',
      note: 'All prices are monthly management fees. Advertising budget is separate.',
      separateTotal: '$847 / month'
    },
    problemSolved: {
      headline: 'Why buy this?',
      painPoints: [
        'Wasting budget on consumer social feeds when decision-makers are on LinkedIn and Google.',
        'Slow sales cycles with long gaps where potential enterprise leads forget your solution.',
        'Struggling to reach specific job titles, seniority levels, and industry verticals.'
      ],
      summary: 'Google reaches people searching for solutions, LinkedIn helps target professional audiences and email keeps your existing subscribers engaged.'
    },
    synergy: {
      headline: 'How B2B Search, LinkedIn & Email Work Together',
      explanation: 'Precision B2B targeting on LinkedIn builds enterprise awareness, Google captures active buying intent, and email nurtures leads through longer sales cycles.',
      steps: [
        {
          title: '1. LinkedIn Account & Role Targeting',
          description: 'Zero in on decision-makers by job function, seniority, industry, and company size.'
        },
        {
          title: '2. Google Search Intent Capture',
          description: 'Capture business leaders searching Google for commercial software, IT services, or consulting.'
        },
        {
          title: '3. Email Lead Nurturing',
          description: '2 tailored B2B email campaigns monthly to educate prospects, share case studies, and book calls.'
        },
        {
          title: '4. Pipeline Qualification',
          description: 'Refining audience parameters based on lead quality and sales feedback.'
        }
      ]
    },
    keyBenefits: [
      {
        title: 'Decision-Maker Access',
        description: 'Reach directors, founders, and department heads with verified professional targeting.'
      },
      {
        title: 'Shorter Sales Cycles',
        description: 'Coordinated LinkedIn touchpoints and email nurture sequences keep your firm top-of-mind.'
      },
      {
        title: 'High-Intent Search Traffic',
        description: 'Capture enterprise buyers actively looking for RFP partners or software vendors.'
      },
      {
        title: 'Lead Quality Focus',
        description: 'Optimized for high-ticket enquiries and qualified pipeline rather than vanity clicks.'
      }
    ],
    detailedDeliverables: [
      'Google Ads management (Search keywords, commercial intent, and competitor terms)',
      'LinkedIn Ads management (Sponsored content, company targeting, and job title filters)',
      'Email Marketing (2 B2B email newsletters or nurture campaigns monthly)',
      'B2B audience and keyword research',
      'Ad copy and campaign setup tailored to corporate decision-makers',
      'Campaign optimisation and weekly bid tuning',
      'Monthly performance report and pipeline review'
    ],
    serviceLimits: 'Monthly management fee. Advertising budget is paid directly by client to Google and LinkedIn.',
    whoShouldChoose: {
      headline: 'Best for',
      profiles: [
        'Software development houses, tech agencies, and IT service providers.',
        'SaaS platforms and enterprise software companies.',
        'B2B consultants, corporate advisors, and commercial service firms.'
      ],
      idealStage: 'B2B firms with high-ticket services or contracts wanting steady corporate deal flow.'
    },
    enquiryPayload: {
      serviceName: 'B2B Growth Package',
      planName: 'Enterprise B2B Growth Bundle',
      priceDisplay: '$769 / month',
      billingType: 'Monthly Retainer',
      isBundle: true,
      bundleName: 'B2B Growth Package'
    }
  },

  // 6. Brand & Social Growth Package
  'bundle-brand-social': {
    id: 'bundle-brand-social',
    type: 'bundle',
    name: 'Brand & Social Growth Package',
    badge: 'Brand Presence',
    category: 'Brand & Social',
    headline: 'Build a stronger brand presence online.',
    price: 499,
    priceDisplay: '$499 / month',
    billingType: 'Monthly Retainer',
    oneLineBenefit: 'Keep your social media active while using paid advertising and creative content to reach new audiences.',
    includedServicesShort: [
      'Social Media (12 posts/mo)',
      'Meta Ads',
      'AI Creative (8 ad designs)',
      'Content planning'
    ],
    priceComparisonSavings: {
      comparisonText: 'Purchasing Social Media ($249), Meta Ads ($189), and Creative Ad Designs ($119) separately totals $557/month.',
      savingsAmount: 'Individual value: $557 · You save $58/mo',
      note: 'All prices are monthly management fees. Advertising budget is separate.',
      separateTotal: '$557 / month'
    },
    problemSolved: {
      headline: 'Why buy this?',
      painPoints: [
        'Silent, neglected social media channels that make your brand look inactive or untrustworthy.',
        'Relying solely on organic reach which social media algorithms heavily restrict.',
        'Lacking professional graphic design to make promotional offers stand out.'
      ],
      summary: 'Consistent content builds your brand presence, paid ads expand your reach and promotional creatives help communicate your offers.'
    },
    synergy: {
      headline: 'How Active Social Media, Paid Ads & Creative Content Work Together',
      explanation: 'Consistent organic publishing builds brand authority, paid ads amplify your message to thousands of targeted people, and custom visuals make your offers memorable.',
      steps: [
        {
          title: '1. Strategic Monthly Content Planning',
          description: 'Plan 12 engaging social posts mapped to audience questions, brand values, and seasonal moments.'
        },
        {
          title: '2. Custom Promotional Visuals',
          description: '8 static advertising creatives designed to communicate offers clearly and attract attention.'
        },
        {
          title: '3. Paid Reach Amplification',
          description: 'Meta Ads target your exact customer demographic to ensure your brand reaches new audiences consistently.'
        },
        {
          title: '4. Ongoing Refinement',
          description: 'Monthly performance reporting showing engagement rates, audience growth, and top-performing creatives.'
        }
      ]
    },
    keyBenefits: [
      {
        title: 'Active Brand Credibility',
        description: '12 social posts monthly across 2 platforms ensure potential buyers always find a vibrant, active brand.'
      },
      {
        title: 'Guaranteed Audience Reach',
        description: 'Meta Ads push your message beyond organic limits to reach thousands of targeted consumers.'
      },
      {
        title: 'Professional Visual Assets',
        description: '8 static promotional designs every month tailored with your brand colors, typography, and logo.'
      },
      {
        title: 'Hands-Off Execution',
        description: 'We handle copywriting, design, scheduling, and ad delivery so you can focus on running your business.'
      }
    ],
    detailedDeliverables: [
      'Social Media Management for up to 2 platforms (e.g. Instagram + Facebook)',
      'Meta Ads management (Targeted reach and engagement campaigns)',
      'AI Creative & Ad Production',
      '12 social media posts monthly across 2 platforms (3 posts per week)',
      '8 static advertising creatives monthly',
      'Monthly content planning and caption copywriting',
      'Campaign optimisation and monthly performance report'
    ],
    serviceLimits: 'Monthly management fee. Advertising budget is paid directly by client to Meta.',
    whoShouldChoose: {
      headline: 'Best for',
      profiles: [
        'Startups and emerging brands launching their online presence.',
        'Lifestyle, fitness, fashion, and consumer brands.',
        'Businesses needing active social presence combined with paid top-of-funnel reach.'
      ],
      idealStage: 'New and growing consumer businesses wanting brand credibility and steady audience discovery.'
    },
    enquiryPayload: {
      serviceName: 'Brand & Social Growth Package',
      planName: 'Brand & Social Growth Bundle',
      priceDisplay: '$499 / month',
      billingType: 'Monthly Retainer',
      isBundle: true,
      bundleName: 'Brand & Social Growth Package'
    }
  }
};

// Aliases for backward compatibility
readyMadeBundleDetails['bundle-social-boost'] = readyMadeBundleDetails['bundle-brand-social'];
readyMadeBundleDetails['bundle-business-growth'] = readyMadeBundleDetails['bundle-local-business'];
readyMadeBundleDetails['bundle-multi-platform-ppc'] = readyMadeBundleDetails['bundle-complete-ppc'];

/**
 * Resolves a dedicated PackageDetail object for any bundle or individual platform tier.
 */
export function getPackageDetail(
  packageId: string, 
  tierKey: TierType = 'Growth'
): PackageDetail | null {
  // Check pre-defined ready-made bundles first
  if (readyMadeBundleDetails[packageId]) {
    return readyMadeBundleDetails[packageId];
  }

  // Check great value growth bundles array
  const bundle = greatValueGrowthBundles.find(b => b.id === packageId);
  if (bundle && readyMadeBundleDetails[bundle.id]) {
    return readyMadeBundleDetails[bundle.id];
  }

  // Check individual service platforms
  const platform = allIndividualServices.find(p => p.id === packageId || p.id === packageId.replace(/-tier-.*$/, ''));
  if (platform) {
    const tier: ServiceTier | undefined = platform.tiers[tierKey] || platform.tiers['Growth'] || platform.tiers['Starter'];
    if (!tier) return null;

    const packageName = `${platform.name} — ${tier.displayName || tier.name} Tier`;
    const billingType = platform.isOneTime 
      ? 'One-Time Project Investment' 
      : (tier.price === null ? 'Custom Tailored Retainer' : 'Monthly Retainer');

    return {
      id: `${platform.id}-${tierKey.toLowerCase()}`,
      type: 'service',
      name: packageName,
      badge: tierKey === 'Growth' ? 'Most Popular' : (tierKey === 'Boost' ? 'High Performance' : undefined),
      category: platform.category,
      headline: tier.whatYouGet || platform.shortDescription,
      price: tier.price,
      priceDisplay: tier.priceDisplay + (tier.maintenancePriceDisplay ? ` (+ ${tier.maintenancePriceDisplay} maintenance)` : ''),
      billingType,
      oneLineBenefit: tier.bestFor || tier.idealFor,
      includedServicesShort: [
        platform.name,
        `${tier.displayName || tier.name} Scope`,
        platform.category
      ],
      priceComparisonSavings: {
        comparisonText: platform.isOneTime 
          ? 'Comprehensive one-time asset build with zero recurring mandatory fees.'
          : 'Transparent monthly management retainer. Ad spend is paid directly to the ad platform for 100% financial transparency.',
        savingsAmount: 'Bundle & Save 10% when combined with a second service',
        note: 'Qualifies for 10% discount when combined with any second service in Make Your Own Bundle.',
        separateTotal: tier.priceDisplay
      },
      problemSolved: {
        headline: `Solving Core Challenges in ${platform.name}`,
        painPoints: [
          'Wasted advertising spend on unqualified clicks or poorly targeted audiences.',
          'Lack of consistent creative iteration leading to rapid ad fatigue.',
          'Unclear conversion attribution and missing technical pixel/API tracking.',
          'Internal teams lacking specialized platform expertise to scale profitably.'
        ],
        summary: `Our ${packageName} provides dedicated management and continuous testing to ensure your investment delivers measurable business outcomes.`
      },
      synergy: {
        headline: `Structured Execution Workflow`,
        explanation: `We implement a disciplined, data-backed approach from initial setup through weekly optimization and reporting.`,
        steps: [
          {
            title: '1. Audit & Technical Onboarding',
            description: 'Health check of existing accounts, conversion tracking, pixels, and competitive positioning.'
          },
          {
            title: '2. Strategy & Creative Alignment',
            description: 'Structuring campaign architecture, targeting parameters, and direct-response ad copy.'
          },
          {
            title: '3. Weekly Bid & Delivery Calibration',
            description: 'Continuous monitoring, testing of top performers, and pruning of underperforming variations.'
          },
          {
            title: '4. Transparent Performance Reporting',
            description: 'Weekly KPI updates and monthly strategic reviews focused on business revenue and qualified pipeline.'
          }
        ]
      },
      keyBenefits: [
        {
          title: 'Direct-to-Platform Spend Control',
          description: 'You maintain 100% ownership of your accounts and pay ad spend directly with zero agency markup.'
        },
        {
          title: 'Dedicated Campaign Strategist',
          description: 'Direct access to experienced campaign managers focused on your specific industry goals.'
        },
        {
          title: 'Continuous Creative Testing',
          description: 'Systematic testing of headlines, hooks, and creative formats to continuously lower acquisition costs.'
        }
      ],
      detailedDeliverables: tier.deliverables,
      serviceLimits: tier.note || platform.importantNote || 'Ad spend is paid directly to the ad platform by the client. Turnaround times and revisions follow standard service level agreements.',
      whoShouldChoose: {
        headline: `Who Should Choose ${tier.displayName || tier.name} Tier`,
        profiles: [
          tier.idealFor,
          `Businesses wanting structured, professional ${platform.name} with predictable pricing.`
        ],
        idealStage: 'Companies with established offers looking for disciplined execution.'
      },
      enquiryPayload: {
        serviceName: platform.name,
        planName: tier.displayName ? `${tier.name} (${tier.displayName})` : tier.name,
        priceDisplay: tier.priceDisplay + (tier.maintenancePriceDisplay ? ` (+ ${tier.maintenancePriceDisplay} maintenance)` : ''),
        billingType,
        isBundle: false
      }
    };
  }

  return null;
}

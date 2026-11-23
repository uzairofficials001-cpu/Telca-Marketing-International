export interface IndustryRecommendedService {
  name: string;
  whyUseful: string;
  category: 'advertising' | 'social' | 'creative' | 'retention' | 'seo' | 'tech';
}

export interface IndustrySolution {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  examples: string;
  marketingChallenges: string;
  primaryRecommendations: IndustryRecommendedService[];
  supportingServices: IndustryRecommendedService[];
}

export const industrySolutionsData: IndustrySolution[] = [
  // 1. Restaurants, Cafes & Food Businesses
  {
    id: 'restaurants-food',
    name: 'Restaurants, Cafes & Food Businesses',
    iconName: 'Utensils',
    tagline: 'Attract hungry local diners and keep tables booked.',
    examples: 'Restaurants, coffee shops, bakeries, fast food outlets, catering businesses.',
    marketingChallenges: 'Food businesses face intense local competition, changing foot traffic patterns, and reliance on third-party delivery apps with high commissions. Overcoming this requires building direct local brand recognition and capturing high-intent nearby food searches.',
    primaryRecommendations: [
      {
        name: 'Meta Ads',
        whyUseful: 'Promote food offers, special deals, new menu items and attract nearby customers through vibrant visual and video ads on Instagram and Facebook.',
        category: 'advertising'
      },
      {
        name: 'Google Ads',
        whyUseful: 'Reach people actively searching for restaurants, cafes or specific food options nearby on Google Search and Google Maps.',
        category: 'advertising'
      }
    ],
    supportingServices: [
      {
        name: 'Social Media Management',
        whyUseful: 'Keep Instagram and Facebook active with mouth-watering food content, daily specials, customer photos and seasonal updates.',
        category: 'social'
      },
      {
        name: 'AI Creative & Ad Production',
        whyUseful: 'Create attractive promotional visuals, story graphics and advertising creatives that stop scrollers in their tracks.',
        category: 'creative'
      },
      {
        name: 'SEO & GEO',
        whyUseful: 'Improve online discoverability when people search for local food businesses and "best near me" culinary options.',
        category: 'seo'
      }
    ]
  },

  // 2. Healthcare & Dental Clinics
  {
    id: 'healthcare-dental',
    name: 'Healthcare & Dental Clinics',
    iconName: 'Stethoscope',
    tagline: 'Attract qualified patients seeking trusted clinical care.',
    examples: 'Dentists, dental clinics, dermatologists, physiotherapists and private healthcare practices.',
    marketingChallenges: 'Healthcare decisions require high trust and sensitivity. Patients research extensively before booking consultations, meaning clinics need authoritative online presence and immediate discoverability when acute symptoms arise.',
    primaryRecommendations: [
      {
        name: 'Google Ads',
        whyUseful: 'Reach people actively searching for specific treatments, dental implants, cosmetic procedures and emergency healthcare services.',
        category: 'advertising'
      },
      {
        name: 'Meta Ads',
        whyUseful: 'Build local awareness, highlight clinic credentials, promote preventive checkups and share educational patient video content.',
        category: 'advertising'
      }
    ],
    supportingServices: [
      {
        name: 'SEO & GEO',
        whyUseful: 'Improve visibility for treatment-related queries and local clinic searches so patients find your practice first.',
        category: 'seo'
      },
      {
        name: 'Social Media Management',
        whyUseful: 'Share educational content, doctor introductions, clinic updates and patient care tips to build patient comfort.',
        category: 'social'
      },
      {
        name: 'AI Website Development',
        whyUseful: 'Create a professional website with clear treatment descriptions, doctor qualifications and friction-free appointment enquiry options.',
        category: 'tech'
      }
    ]
  },

  // 3. Real Estate & Property Businesses
  {
    id: 'real-estate-property',
    name: 'Real Estate & Property Businesses',
    iconName: 'Building2',
    tagline: 'Generate qualified buyer enquiries for residential and commercial listings.',
    examples: 'Real estate agencies, property developers, estate agents and property consultants.',
    marketingChallenges: 'High ticket sizes and extended buying cycles mean generic advertising burns cash quickly. Real estate companies need precision targeting to reach genuine investors and homebuyers while presenting listings with architectural elegance.',
    primaryRecommendations: [
      {
        name: 'Meta Ads',
        whyUseful: 'Promote property listings, off-plan projects and luxury developments with immersive image carousels and lead-generation forms.',
        category: 'advertising'
      },
      {
        name: 'Google Ads',
        whyUseful: 'Reach high-intent buyers actively searching for properties, estate agents, and real estate investment opportunities in target locations.',
        category: 'advertising'
      }
    ],
    supportingServices: [
      {
        name: 'LinkedIn Ads',
        whyUseful: 'Target affluent professionals, commercial tenants, and high-net-worth investors based on industry and seniority.',
        category: 'advertising'
      },
      {
        name: 'AI Creative & Ad Production',
        whyUseful: 'Create property promotional visuals, architectural video edits, and brochure designs that elevate perceived value.',
        category: 'creative'
      },
      {
        name: 'AI Website Development',
        whyUseful: 'Present property listings, floor plans, virtual tours, and project information professionally with high-speed lead capture.',
        category: 'tech'
      }
    ]
  },

  // 4. E-commerce & Online Stores
  {
    id: 'ecommerce-retail',
    name: 'E-commerce & Online Stores',
    iconName: 'ShoppingBag',
    tagline: 'Drive consistent customer acquisition and repeat purchase loyalty.',
    examples: 'Fashion stores, electronics shops, beauty brands, home products and online retailers.',
    marketingChallenges: 'Rising customer acquisition costs (CAC) on single ad channels and high cart abandonment rates can quickly compress margins. Online stores need multi-channel acquisition paired with email retention.',
    primaryRecommendations: [
      {
        name: 'Meta Ads',
        whyUseful: 'Promote products through lifestyle creatives, retarget previous store visitors, and reach potential buyers across Instagram and Facebook feeds.',
        category: 'advertising'
      },
      {
        name: 'Google Ads',
        whyUseful: 'Capture high-intent product searches and shopping demand through Google Shopping, Performance Max, and commercial search keywords.',
        category: 'advertising'
      },
      {
        name: 'Email Marketing',
        whyUseful: 'Recover abandoned carts, send promotional broadcasts, and nurture repeat purchases to maximize customer lifetime value (LTV).',
        category: 'retention'
      }
    ],
    supportingServices: [
      {
        name: 'TikTok Ads',
        whyUseful: 'Showcase products through native, short-form viral video advertising to engage younger purchasing demographics.',
        category: 'advertising'
      },
      {
        name: 'Pinterest Ads',
        whyUseful: 'Promote visually appealing products to shoppers who use Pinterest for inspiration and planning purchases.',
        category: 'advertising'
      },
      {
        name: 'Amazon Ads',
        whyUseful: 'Promote products within the Amazon marketplace to capture shoppers already in purchase checkout mode.',
        category: 'advertising'
      },
      {
        name: 'AI Creative & Ad Production',
        whyUseful: 'Continually refresh product visuals, dynamic ad creative variants, and seasonal promotional banners to combat ad fatigue.',
        category: 'creative'
      }
    ]
  },

  // 5. Software Houses, IT Companies & SaaS
  {
    id: 'software-it-saas',
    name: 'Software Houses, IT Companies & SaaS',
    iconName: 'Laptop',
    tagline: 'Reach B2B technology decision-makers and build recurring software pipeline.',
    examples: 'Software development agencies, technology companies, SaaS platforms and IT service providers.',
    marketingChallenges: 'B2B software purchases involve multiple stakeholders, complex technical evaluations, and long consideration periods. Positioning must communicate security, ROI, and technical reliability.',
    primaryRecommendations: [
      {
        name: 'Google Ads',
        whyUseful: 'Capture high-intent searches from businesses actively looking for software solutions, custom development, and IT providers.',
        category: 'advertising'
      },
      {
        name: 'LinkedIn Ads',
        whyUseful: 'Reach specific decision-makers (CTOs, VPs of Engineering, Product Leads) based on exact job roles, company size, and industry.',
        category: 'advertising'
      },
      {
        name: 'Email Marketing',
        whyUseful: 'Nurture trial users, webinar attendees, and business prospects with product walkthroughs, case studies, and upgrade prompts.',
        category: 'retention'
      }
    ],
    supportingServices: [
      {
        name: 'Meta Ads',
        whyUseful: 'Build brand awareness and cost-effectively retarget website visitors who did not complete demo sign-ups.',
        category: 'advertising'
      },
      {
        name: 'ChatGPT Ads',
        whyUseful: 'Explore emerging advertising opportunities around relevant AI-powered discovery and conversational search experiences.',
        category: 'advertising'
      },
      {
        name: 'SEO & GEO',
        whyUseful: 'Improve organic visibility for software-related keywords, architectural comparisons, and enterprise technical guides.',
        category: 'seo'
      },
      {
        name: 'AI Website Development',
        whyUseful: 'Present services, products, API capabilities, and case studies professionally with modern interactive UX.',
        category: 'tech'
      }
    ]
  },

  // 6. Education & Training
  {
    id: 'education-training',
    name: 'Education & Training',
    iconName: 'GraduationCap',
    tagline: 'Fill classrooms and online cohorts with qualified students.',
    examples: 'Schools, academies, coaching centres, online courses and training institutes.',
    marketingChallenges: 'Student enrolments follow rigid seasonal calendars (semesters, intake cycles). Missing an intake window means waiting months for the next opportunity, demanding precise campaign timing.',
    primaryRecommendations: [
      {
        name: 'Meta Ads',
        whyUseful: 'Promote admissions deadlines, certification courses, and enrolment campaigns to prospective students and parents.',
        category: 'advertising'
      },
      {
        name: 'Google Ads',
        whyUseful: 'Reach people actively searching for specific certifications, coaching centres, degree programmes, and local academies.',
        category: 'advertising'
      }
    ],
    supportingServices: [
      {
        name: 'TikTok Ads',
        whyUseful: 'Build awareness through educational tips, student testimonials, and engaging short-form learning content.',
        category: 'advertising'
      },
      {
        name: 'Social Media Management',
        whyUseful: 'Publish educational content, campus updates, student achievements, and course spotlights to build institutional authority.',
        category: 'social'
      },
      {
        name: 'SEO & GEO',
        whyUseful: 'Improve organic search visibility for course-related queries and local academy searches.',
        category: 'seo'
      },
      {
        name: 'AI Website Development',
        whyUseful: 'Present course syllabi, instructor profiles, and tuition details with seamless enquiry and registration workflows.',
        category: 'tech'
      }
    ]
  },

  // 7. Beauty, Salon & Fitness Businesses
  {
    id: 'beauty-salon-fitness',
    name: 'Beauty, Salon & Fitness Businesses',
    iconName: 'Sparkles',
    tagline: 'Book treatment chairs and fill recurring gym memberships.',
    examples: 'Beauty salons, spas, barbershops, gyms, fitness studios and wellness businesses.',
    marketingChallenges: 'Salons and gyms depend on recurring monthly visits and local neighborhood loyalty. Client churn is high if engagement drops, making visual proof and ongoing promotions essential.',
    primaryRecommendations: [
      {
        name: 'Meta Ads',
        whyUseful: 'Promote introductory offers, service packages, membership trials, and seasonal transformation campaigns to local radius audiences.',
        category: 'advertising'
      },
      {
        name: 'Google Ads',
        whyUseful: 'Reach people searching for salons, spas, personal trainers, and gyms nearby ready to book an appointment.',
        category: 'advertising'
      }
    ],
    supportingServices: [
      {
        name: 'Social Media Management',
        whyUseful: 'Showcase before-and-after transformations, stylist work, studio environment, and customer reviews on Instagram.',
        category: 'social'
      },
      {
        name: 'AI Creative & Ad Production',
        whyUseful: 'Create promotional designs, seasonal price menus, and engaging ad creatives that project luxury and professionalism.',
        category: 'creative'
      },
      {
        name: 'SEO & GEO',
        whyUseful: 'Improve local search visibility and Google Business profile rankings for local neighborhood treatments.',
        category: 'seo'
      }
    ]
  },

  // 8. Professional & Consulting Services
  {
    id: 'professional-consulting',
    name: 'Professional & Consulting Services',
    iconName: 'Briefcase',
    tagline: 'Attract corporate clients and high-value advisory retainers.',
    examples: 'Law firms, accounting firms, consultants, financial service providers and business advisors.',
    marketingChallenges: 'Advisory clients hire expertise and discretion. Flashy sales gimmicks damage professional credibility, so marketing must emphasize proven acumen, compliance, and thought leadership.',
    primaryRecommendations: [
      {
        name: 'Google Ads',
        whyUseful: 'Reach corporate leaders and individuals actively searching for trusted legal, tax, financial, or strategic advice.',
        category: 'advertising'
      },
      {
        name: 'LinkedIn Ads',
        whyUseful: 'Target relevant corporate executives, managing directors, and business owners with specialized B2B advisory solutions.',
        category: 'advertising'
      }
    ],
    supportingServices: [
      {
        name: 'Meta Ads',
        whyUseful: 'Cost-effectively build awareness and retarget prospects who have visited your firm website or read your whitepapers.',
        category: 'advertising'
      },
      {
        name: 'SEO & GEO',
        whyUseful: 'Improve visibility for professional practice areas and localized corporate searches.',
        category: 'seo'
      },
      {
        name: 'Content Writing',
        whyUseful: 'Publish informative articles, regulatory analysis, and service guides demonstrating deep domain knowledge.',
        category: 'creative'
      },
      {
        name: 'AI Website Development',
        whyUseful: 'Establish an authoritative, responsive corporate web presence with partner bios and secure consultation request forms.',
        category: 'tech'
      }
    ]
  },

  // 9. Travel, Tourism & Hospitality
  {
    id: 'travel-hospitality',
    name: 'Travel, Tourism & Hospitality',
    iconName: 'Plane',
    tagline: 'Inspire holidaymakers and drive direct room and tour bookings.',
    examples: 'Travel agencies, hotels, tour operators and holiday rental businesses.',
    marketingChallenges: 'Heavy dependence on OTAs (Booking.com, Expedia) cuts into hotel and tour margins. Travel decisions are highly visual and emotional, requiring vibrant destination showcases.',
    primaryRecommendations: [
      {
        name: 'Meta Ads',
        whyUseful: 'Promote travel packages, stunning destination imagery, early-bird deals, and seasonal getaway offers to aspirational travelers.',
        category: 'advertising'
      },
      {
        name: 'Google Ads',
        whyUseful: 'Reach travelers actively searching for hotels, regional tours, airport transfers, and specific travel experiences.',
        category: 'advertising'
      }
    ],
    supportingServices: [
      {
        name: 'TikTok Ads',
        whyUseful: 'Showcase immersive destination tours, behind-the-scenes travel moments, and experiential video reels.',
        category: 'advertising'
      },
      {
        name: 'SEO & GEO',
        whyUseful: 'Improve organic discovery for destination guides, regional itineraries, and hotel booking searches.',
        category: 'seo'
      },
      {
        name: 'Social Media Management',
        whyUseful: 'Build an engaging, aspirational travel-focused social presence that fosters user-generated content and community shares.',
        category: 'social'
      }
    ]
  }
];

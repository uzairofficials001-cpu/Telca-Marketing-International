import { ServiceDetail } from '../types';

export const servicesData: Record<string, ServiceDetail> = {
  'paid-advertising': {
    id: 'paid-advertising',
    pageId: 'service-paid-advertising',
    title: 'Paid Advertising & Performance Marketing',
    shortDescription: 'We help businesses reach the right audience, generate quality leads and increase sales through strategic digital advertising campaigns.',
    badge: 'Performance Advertising',
    heroHeadline: 'Strategic Digital Advertising Engineered For Measurable Returns.',
    heroSubheadline: 'We design, launch, monitor and optimize targeted multi-channel ad campaigns that connect your brand with high-intent buyers across global markets.',
    image: '/src/assets/images/service_performance_ads_1793368524817.jpg',
    problemsSolved: [
      {
        problem: 'Ad Spend Without Predictable Returns',
        explanation: 'Many businesses burn budget on generic boosting without structured audience testing, pixel tracking or conversion funnel hygiene.'
      },
      {
        problem: 'Reaching the Wrong Audience',
        explanation: 'Clicks that never convert cost money and skew algorithmic learning. We calibrate high-intent targeting parameters for exact buyer profiles.'
      },
      {
        problem: 'Channel Saturation & Rising Ad Costs',
        explanation: 'Relying on a single platform creates vulnerability. We balance budgets across search, social, and emerging ad ecosystems for sustainable efficiency.'
      },
      {
        problem: 'Lack of Transparent Attribution',
        explanation: 'Without clean tracking, you cannot tell which ad generated which sale. We configure reliable attribution so you know what works.'
      }
    ],
    whatIsIncluded: [
      {
        title: 'Meta Ads (Facebook & Instagram)',
        description: 'Targeted visual and video advertising across Facebook and Instagram feeds, Stories, and Reels to engage active consumers and high-value decision-makers.',
        points: [
          'Custom and lookalike audience segmentation',
          'Full-funnel conversion campaigns (Prospecting & Retargeting)',
          'Advantage+ shopping and catalog integration',
          'Creative iteration and A/B ad variant testing'
        ]
      },
      {
        title: 'Google Ads (Search, Performance Max & YouTube)',
        description: 'Capture active demand the moment prospects search for your solutions on Google, YouTube, and the Google Display Network.',
        points: [
          'High-intent keyword research and negative match hygiene',
          'Google Search text ads & responsive search ads',
          'Performance Max campaigns with asset grouping',
          'Conversion-focused landing page alignment'
        ]
      },
      {
        title: 'LinkedIn Ads',
        description: 'Precision B2B targeting by job function, seniority, company size, and specific account lists for enterprise and high-ticket service client acquisition.',
        points: [
          'Sponsored Content & Document ads',
          'Lead gen forms with direct CRM sync',
          'Account-Based Marketing (ABM) matching',
          'Executive thought leadership amplification'
        ]
      },
      {
        title: 'TikTok Ads & Snapchat Ads',
        description: 'High-energy, native short-form video advertising tailored to younger demographics and fast-moving direct-to-consumer lifestyle categories.',
        points: [
          'Native Spark Ads and in-feed short-form video formats',
          'Interest and behavioral lifestyle clustering',
          'Trend-aligned commercial messaging',
          'Rapid creative refresh cycles'
        ]
      },
      {
        title: 'Emerging AI Advertising (ChatGPT & OpenAI Ads)',
        description: 'Strategic readiness and campaign deployment for emerging conversational search and AI answer engine advertising where commercially available.',
        points: [
          'Prompt and intent-based conversational brand placement',
          'Contextual relevance mapping within AI ecosystems',
          'Early-adopter testing frameworks for next-generation search',
          'Brand safety and algorithmic compliance governance'
        ]
      },
      {
        title: 'Amazon Ads (Sponsored Products & Brands)',
        description: 'Marketplace performance campaigns targeting active shoppers on Amazon search results and product detail pages.',
        points: [
          'Sponsored Products, Sponsored Brands & Storefront campaigns',
          'Exact & broad keyword harvesting with ASIN defense',
          'ACOS / TACOS bid calibration and inventory alignment',
          'Product listing conversion optimization insights'
        ]
      },
      {
        title: 'Pinterest Ads (Visual Discovery)',
        description: 'High-intent visual discovery campaigns engineered for eCommerce, home, beauty, fashion, and lifestyle planners.',
        points: [
          'Promoted Pins, Idea Ads, and catalog shopping feeds',
          'Interest and visual search intent clustering',
          'Pinterest Tag conversion event tracking',
          'Seasonal campaign planning ahead of peak demand'
        ]
      }
    ],
    campaignObjectives: [
      'Lead Generation: Capture verified contact details from qualified prospects',
      'Website Traffic: Drive targeted, engaged visitors to key conversion landing pages',
      'Online Sales: Generate direct purchases for eCommerce and transactional brands',
      'Brand Awareness: Elevate recognition among defined industry or regional buyers',
      'Customer Acquisition: Lower cost-per-acquisition (CPA) through structured funnels',
      'Retargeting: Re-engage warm prospects who browsed or initiated inquiries'
    ],
    platformsAndTools: [
      { name: 'Meta Ads Manager', category: 'Social Ads', description: 'Deep audience segmentation & conversion pixel optimization.' },
      { name: 'Google Ads & PMax', category: 'Search & Video', description: 'Intent-driven search ads, Shopping, and YouTube placements.' },
      { name: 'LinkedIn Campaign Manager', category: 'B2B Ads', description: 'Strict account-level firmographic and professional targeting.' },
      { name: 'TikTok Ads Manager', category: 'Short-Form', description: 'Algorithm-native video ad pacing and creative testing.' },
      { name: 'Google Analytics 4 & Tag Manager', category: 'Attribution', description: 'First-party event tracking, UTM taxonomy, and cross-channel tracking.' }
    ],
    process: [
      {
        step: '01',
        title: 'Audience & Offer Audit',
        description: 'We analyze your current metrics, target customer economics, competitors, and conversion tracking hygiene before deploying budget.'
      },
      {
        step: '02',
        title: 'Campaign Architecture',
        description: 'We structure clean campaign hierarchy separating prospecting, retargeting, and brand defense across chosen platforms.'
      },
      {
        step: '03',
        title: 'Testing & Soft Launch',
        description: 'We launch controlled test budgets with multiple creative angles, hooks, and audience segments to establish benchmark unit economics.'
      },
      {
        step: '04',
        title: 'Scale & Continuous Optimization',
        description: 'We systematically reallocate budget into winning ad sets, prune underperforming creatives, and optimize bids weekly.'
      }
    ],
    businessBenefits: [
      {
        title: 'Controlled Customer Acquisition',
        description: 'Turn guessing into a structured pipeline where every dollar spent is tracked against business inquiries and transactions.'
      },
      {
        title: 'Multi-Market Expansion',
        description: 'Test and scale campaigns smoothly across the US, UK, UAE, Australia, and international territories with localized messaging.'
      },
      {
        title: 'Realistic Optimization Cycle',
        description: 'Campaigns are planned, monitored and optimized according to business goals. We do not promise speculative instant riches; we build defensible, data-backed growth.'
      }
    ],
    portfolioPlaceholders: [
      {
        title: 'International D2C Performance Campaign',
        label: 'Concept Work / Sample Project',
        industry: 'Direct-to-Consumer / Lifestyle',
        strategy: 'Multi-territory Meta + Google PMax campaign funnel with localized currency routing across US & UK markets.',
        metrics: 'Structured CPA testing framework, achieving stable lead cost reduction over 90-day test sequence.'
      },
      {
        title: 'B2B Professional Services Inbound Funnel',
        label: 'Concept Work / Sample Project',
        industry: 'Corporate Advisory / Legal',
        strategy: 'LinkedIn Sponsored Content matched with high-intent Google Search for corporate decision-makers in London and Dubai.',
        metrics: 'Targeted high-ticket consultation inquiry pipeline with zero wasted broad-match click spend.'
      }
    ],
    faqs: [
      {
        question: 'Do you guarantee a specific return on ad spend or sales number?',
        answer: 'No reputable performance agency can ethically guarantee sales numbers, because conversion depends on external variables including product-market fit, pricing, sales closing, and market competition. What we do guarantee is disciplined media buying, rigorous testing, transparent reporting, and continuous data-driven optimization.'
      },
      {
        question: 'What is the minimum ad spend required to work together?',
        answer: 'While we work with various tiers, we generally recommend a minimum monthly ad spend of $1,000–$2,000 to generate sufficient statistical data for the advertising algorithms to learn and optimize effectively.'
      },
      {
        question: 'Who owns the advertising accounts and data?',
        answer: 'You retain 100% ownership of your ad accounts, business managers, tracking pixels, and creative assets. Telca operates through standard partner access.'
      },
      {
        question: 'How frequently do we review campaign performance?',
        answer: 'You receive live dashboard access, weekly email status updates on key actions, and a comprehensive monthly performance review analyzing trends, learnings, and next-month priorities.'
      }
    ]
  },

  'creative-production': {
    id: 'creative-production',
    pageId: 'service-creative-production',
    title: 'Creative & Content Production',
    shortDescription: 'We create engaging visuals, videos and marketing content that capture attention and help businesses communicate their value.',
    badge: 'Creative Production',
    heroHeadline: 'Strategic Creative That Stops The Scroll And Communicates Value.',
    heroSubheadline: 'We produce high-impact ad creatives, brand graphics, and short-form video assets engineered to perform across paid and organic digital channels.',
    image: '/src/assets/images/service_creative_production_1793368525972.jpg',
    problemsSolved: [
      {
        problem: 'Creative Fatigue & Ad Burnout',
        explanation: 'Audiences tune out repetitive ads within days. Without fresh visual iterations, advertising costs climb and conversion rates drop.'
      },
      {
        problem: 'Generic Stock Imagery That Fails To Connect',
        explanation: 'Overused stock photos look impersonal and erode brand trust. Modern buyers respond to authentic, polished, brand-aligned creative.'
      },
      {
        problem: 'Disconnect Between Creative and Performance',
        explanation: 'Pretty designs that do not address customer pain points fail to sell. We blend direct-response copywriting with clean visual design.'
      },
      {
        problem: 'Inconsistent Visual Identity Across Platforms',
        explanation: 'Disjointed graphics across Instagram, LinkedIn, and websites weaken credibility. We maintain consistent brand rigor across all touchpoints.'
      }
    ],
    whatIsIncluded: [
      {
        title: 'A. Ad Creative Production',
        description: 'Direct-response visual assets engineered specifically for paid campaigns to maximize click-through and engagement.',
        points: [
          'AI-Powered Ad Creatives and rapid angle generation',
          'Social media ad designs (static, split-screen, feature highlight)',
          'High-converting video ad creatives & motion graphics',
          'Multi-slide carousel ads with educational hooks',
          'UGC-style ad creatives crafted for native platform feel'
        ]
      },
      {
        title: 'B. Graphic & Brand Design',
        description: 'Polished brand visual collateral that establishes authority and differentiates your business in competitive global markets.',
        points: [
          'Core graphic design for web and digital campaigns',
          'Social media graphics and branded template systems',
          'Marketing materials (one-pagers, brochures, slide decks)',
          'Brand visuals, color palettes, and typographic styling',
          'Promotional designs for product launches and seasonal events'
        ]
      },
      {
        title: 'C. Video & Content Production',
        description: 'Engaging motion content, professional post-production editing, and compelling copy that articulate your core message clearly.',
        points: [
          'Professional video editing and color grading',
          'Short-form vertical videos for Instagram Reels and TikTok',
          'Ad video editing with kinetic captions and attention hooks',
          'Strategic content writing & commercial copywriting',
          'Direct-response ad copywriting (headlines, primary text, CTAs)',
          'Marketing scripts for founder videos, demos, and voiceovers'
        ]
      }
    ],
    platformsAndTools: [
      { name: 'Adobe Premiere Pro & After Effects', category: 'Video Production', description: 'Broadcast-grade video editing, pacing, and motion graphics.' },
      { name: 'Figma & Adobe Illustrator', category: 'Visual Design', description: 'Responsive marketing collateral, layout typography, and brand systems.' },
      { name: 'DaVinci Resolve', category: 'Color & Mastering', description: 'Professional color grading for commercial video production.' },
      { name: 'Generative AI Image & Motion Tools', category: 'AI Prototyping', description: 'Rapid concept ideation and visual storyboard iteration.' }
    ],
    process: [
      {
        step: '01',
        title: 'Creative Brief & Customer Psychology',
        description: 'We define the core customer desires, objections, and messaging angles that will resonate with your target market.'
      },
      {
        step: '02',
        title: 'Concepting & Storyboarding',
        description: 'We draft hooks, visual storyboards, and copy variations for review before full production begins.'
      },
      {
        step: '03',
        title: 'Production & Refinement',
        description: 'Our design and video editors build the visual assets with meticulous attention to typography, pacing, and audio design.'
      },
      {
        step: '04',
        title: 'Format Delivery & Iteration',
        description: 'We deliver assets formatted in 9:16, 1:1, and 16:9 aspect ratios ready for paid ad platforms and organic distribution.'
      }
    ],
    businessBenefits: [
      {
        title: 'Higher Engagement & Click-Through Rates',
        description: 'Creative engineered with strong first-3-second hooks captures attention in crowded international feeds.'
      },
      {
        title: 'Brand Consistency & Authority',
        description: 'Every post, video, and ad reflects high corporate standards that build long-term trust.'
      },
      {
        title: 'Rapid Testing Pipeline',
        description: 'Continuous batches of fresh creative angles prevent ad fatigue and keep customer acquisition costs sustainable.'
      }
    ],
    portfolioPlaceholders: [
      {
        title: 'Visual Identity & Ad Creative Suite',
        label: 'Concept Work / Sample Project',
        industry: 'Consumer Technology / Smart Living',
        strategy: 'Cohesive visual asset library featuring 12 static ads, 6 video variations, and a modular Instagram carousel system.',
        metrics: 'Consistent multi-channel design kit ready for simultaneous rollout in the US and EU.'
      },
      {
        title: 'Executive Thought Leadership Video Series',
        label: 'Concept Work / Sample Project',
        industry: 'FinTech & B2B Consulting',
        strategy: 'Short-form educational video editing with clean typography and subtitle styling optimized for LinkedIn and YouTube Shorts.',
        metrics: 'Clean editorial pacing communicating complex financial concepts in under 60 seconds.'
      }
    ],
    faqs: [
      {
        question: 'Can you work with our existing raw footage and brand guidelines?',
        answer: 'Yes. If you already have brand guidelines, product photography, or phone-recorded videos, our editors and designers can refine, polish, and repurpose them into high-performing commercial assets.'
      },
      {
        question: 'In what formats and aspect ratios do you deliver files?',
        answer: 'We deliver all assets in their native optimized formats (MP4, PNG, JPG, SVG, WebP) tailored to 9:16 (Stories/Reels/TikTok), 1:1 (Feed/Square), and 16:9 (Desktop/YouTube), organized in shared cloud folders.'
      },
      {
        question: 'How do you handle revisions?',
        answer: 'Every creative production project includes structured feedback rounds where you can review drafts and request edits before final sign-off.'
      }
    ]
  },

  'social-media': {
    id: 'social-media',
    pageId: 'service-social-media',
    title: 'Social Media Management',
    shortDescription: 'We help businesses build a consistent online presence, connect with their audience and strengthen their brand through strategic social media management.',
    badge: 'Organic Social Growth',
    heroHeadline: 'Consistent, Authoritative Social Presence That Builds Real Brand Equity.',
    heroSubheadline: 'We craft authentic organic content, manage publishing schedules, and engage your community so your brand stays top-of-mind across major global platforms.',
    image: '/src/assets/images/service_social_media_1793433660938.jpg',
    problemsSolved: [
      {
        problem: 'Inconsistent Posting & Ghost Town Profiles',
        explanation: 'Prospective clients check social profiles before buying. Inactive accounts signal neglect and cost you credibility.'
      },
      {
        problem: 'Confusing Organic Reach With Paid Advertising',
        explanation: 'Organic social builds brand affinity and trust; paid ads drive direct traffic and conversions. We clarify both roles so each delivers maximum value.'
      },
      {
        problem: 'Time Drain on Founders & Internal Teams',
        explanation: 'Writing captions, designing graphics, and researching topics takes hours every week away from your core operations.'
      },
      {
        problem: 'Lack of Cohesive Content Strategy',
        explanation: 'Posting random memes or generic quotes yields no real business inquiries. We align content pillars with your strategic business goals.'
      }
    ],
    whatIsIncluded: [
      {
        title: 'Social Media Strategy & Content Architecture',
        description: 'Comprehensive roadmapping of your target audience, core messaging pillars, tone of voice, and competitive positioning.',
        points: [
          'Audience profile research and competitor audit',
          'Content pillars (Educational, Brand Authority, Behind-the-Scenes, Social Proof)',
          'Tone of voice definition and visual branding guidelines'
        ]
      },
      {
        title: 'Content Calendar Planning & Scheduling',
        description: 'Structured monthly editorial planning so your company’s communication is organized weeks in advance.',
        points: [
          'Monthly editorial content calendars for approval',
          'Visual mockups of feeds and posting cadence',
          'Automated multi-channel scheduling during peak audience activity windows'
        ]
      },
      {
        title: 'Organic Content Publishing & Management',
        description: 'Full-service handling of publishing across your official business profiles with tailored platform formatting.',
        points: [
          'Platform-specific caption writing with natural call-to-actions',
          'Carousels, single-image posts, and short video publishing',
          'Hashtag and keyword optimization for discoverability'
        ]
      },
      {
        title: 'Community Management & Engagement',
        description: 'Active monitoring of your public comments, mentions, and inbound questions to foster authentic relationships.',
        points: [
          'Timely response to community comments and inquiries',
          'Proactive engagement on industry-relevant accounts and conversations',
          'Spam moderation and brand reputation protection'
        ]
      },
      {
        title: 'Performance Reporting & Analysis',
        description: 'Transparent monthly reporting analyzing audience growth, top-performing topics, and engagement patterns.',
        points: [
          'Monthly reach and follower quality breakdown',
          'Content resonance analysis (which themes drove real engagement)',
          'Actionable recommendations for the upcoming monthly cycle'
        ]
      }
    ],
    platformsAndTools: [
      { name: 'LinkedIn Company & Executive Pages', category: 'B2B Authority', description: 'Thought leadership, business milestones, and industry commentary.' },
      { name: 'Instagram & Facebook', category: 'Visual & Community', description: 'Brand storytelling, product showcases, customer spotlights, and Reels.' },
      { name: 'TikTok & Short-Form Video', category: 'Culture & Discovery', description: 'Trend-aware educational videos and humanized brand perspective.' },
      { name: 'Buffer / Later / Metricool', category: 'Scheduling & Analytics', description: 'Reliable multi-network scheduling and consolidated audience data.' }
    ],
    process: [
      {
        step: '01',
        title: 'Brand Voice Discovery',
        description: 'We document your brand positioning, target demographics, and preferred tone of communication.'
      },
      {
        step: '02',
        title: 'Monthly Calendar Construction',
        description: 'We draft the monthly calendar with copy, graphics, and video suggestions for your review and sign-off.'
      },
      {
        step: '03',
        title: 'Publishing & Community Care',
        description: 'We schedule approved posts and monitor engagement, comments, and community interactions.'
      },
      {
        step: '04',
        title: 'Monthly Insights Review',
        description: 'We analyze what resonated best with your audience to refine subsequent content cycles.'
      }
    ],
    businessBenefits: [
      {
        title: 'Professional Credibility',
        description: 'When potential partners or clients look you up, they find an active, respected, and polished organization.'
      },
      {
        title: 'Audience Retention & Trust',
        description: 'Stay top-of-mind with past clients and warm prospects so they choose you when ready to purchase.'
      },
      {
        title: 'Reclaimed Executive Time',
        description: 'Free up 10–15 hours every week knowing your public social channels are managed consistently.'
      }
    ],
    portfolioPlaceholders: [
      {
        title: 'Multi-Channel B2B Authority System',
        label: 'Concept Work / Sample Project',
        industry: 'Logistics & Supply Chain Technology',
        strategy: 'Structured LinkedIn and Twitter/X content roadmap with 16 monthly technical infographics and weekly case summaries.',
        metrics: 'Consistent weekly corporate communication cadence reaching international transport executives.'
      },
      {
        title: 'Modern Retail Brand Community Cadence',
        label: 'Concept Work / Sample Project',
        industry: 'Sustainable Home Goods',
        strategy: 'Instagram visual grid planning combined with short-form educational Reels demonstrating product craftsmanship.',
        metrics: 'Elevated organic engagement rate and unified aesthetic across US and Australian followers.'
      }
    ],
    faqs: [
      {
        question: 'What is the main difference between organic social management and paid ads?',
        answer: 'Organic social media management focuses on building your brand’s reputation, communicating with existing followers, and establishing long-term trust without paying platforms for each impression. Paid advertising, on the other hand, pays platforms directly to put your message in front of new, highly targeted people who do not follow you yet. Both work best together.'
      },
      {
        question: 'Do you create the posts or do we have to provide all the content?',
        answer: 'We provide full end-to-end creation including copywriting, graphic design, and video formatting. We only ask for occasional updates or photos from your operations to keep content authentic.'
      },
      {
        question: 'Do we get to approve posts before they go live?',
        answer: 'Yes. Every post is scheduled into a visual calendar for your team to review, comment on, and approve before anything is published.'
      }
    ]
  },

  'email-marketing': {
    id: 'email-marketing',
    pageId: 'service-email-marketing',
    title: 'Email Marketing & Retention',
    shortDescription: 'We help businesses build stronger customer relationships and generate more opportunities through strategic email campaigns and automated communication.',
    badge: 'Email & Retention',
    heroHeadline: 'Direct Customer Communication That Nurtures Relationships And Drives Inquiries.',
    heroSubheadline: 'We build automated email sequences, beautiful newsletters, and targeted campaigns that engage subscribers and maximize customer lifetime value.',
    image: '/src/assets/images/service_email_marketing_1793433673325.jpg',
    problemsSolved: [
      {
        problem: 'Unused Email Lists Collecting Dust',
        explanation: 'Acquiring an email address costs money. Leaving that subscriber list dormant lets leads go cold and wastes customer value.'
      },
      {
        problem: 'Emails Landing in Spam or Promotions Tabs',
        explanation: 'Poor domain authentication, spammy keywords, and bloated code send your message straight to the junk folder.'
      },
      {
        problem: 'One-Size-Fits-All Email Blasts',
        explanation: 'Sending the same generic message to VIP buyers and new sign-ups causes high unsubscribe rates and low click-through.'
      },
      {
        problem: 'Lack of Automated Follow-Up Sequences',
        explanation: 'Prospects rarely buy on day one. Without automated welcome sequences and nurture flows, interested leads slip through the cracks.'
      }
    ],
    whatIsIncluded: [
      {
        title: 'Email Campaign Management',
        description: 'End-to-end planning, copywriting, and sending of broadcast campaigns tailored to your promotions, product updates, and company news.',
        points: [
          'Subscriber list segmentation by activity and interests',
          'Promotional and seasonal email campaigns',
          'Product announcement and company update broadcasts'
        ]
      },
      {
        title: 'Newsletter Design & Editorial Strategy',
        description: 'High-value, beautifully formatted editorial newsletters that people actually look forward to reading in their inbox.',
        points: [
          'Custom responsive email templates matching brand guidelines',
          'Curated industry insights, stories, and educational tips',
          'Clean typography optimized for mobile devices and dark mode'
        ]
      },
      {
        title: 'Automated Lifecycle Sequences',
        description: 'Trigger-based email sequences that run automatically 24/7 whenever a subscriber takes a specific action.',
        points: [
          'Welcome series introducing your story and value',
          'Lead nurturing workflows educating prospective clients',
          'Abandoned inquiry or abandoned cart recovery triggers',
          'Post-purchase customer onboarding and feedback requests'
        ]
      },
      {
        title: 'Deliverability & Performance Tracking',
        description: 'Rigorous technical configuration to protect your sender reputation and maximize inbox placement.',
        points: [
          'DKIM, SPF, and DMARC technical alignment assistance',
          'Subject line A/B testing and open rate optimization',
          'Transparent tracking of opens, clicks, and conversion events'
        ]
      }
    ],
    platformsAndTools: [
      { name: 'Klaviyo', category: 'eCommerce Retention', description: 'Advanced revenue attribution, predictive analytics, and dynamic product feeds.' },
      { name: 'ActiveCampaign / HubSpot', category: 'B2B & Service CRM', description: 'Complex branching logic, lead scoring, and sales rep deal triggers.' },
      { name: 'Mailchimp / Brevo', category: 'Email Automation', description: 'Clean broadcast management and dependable list hygiene.' },
      { name: 'Litmus & Email on Acid', category: 'Deliverability QA', description: 'Cross-client rendering testing across Apple Mail, Gmail, and Outlook.' }
    ],
    process: [
      {
        step: '01',
        title: 'Deliverability & List Health Audit',
        description: 'We inspect your current email domain settings, clean inactive subscribers, and establish baseline deliverability.'
      },
      {
        step: '02',
        title: 'Core Automation Flow Setup',
        description: 'We write, design, and configure your foundational automated sequences (Welcome, Nurture, and Re-engagement).'
      },
      {
        step: '03',
        title: 'Campaign Calendar Execution',
        description: 'We draft and schedule weekly or bi-weekly newsletters and promotional broadcasts for ongoing engagement.'
      },
      {
        step: '04',
        title: 'Optimization & Segmentation',
        description: 'We continuously prune cold contacts, test subject line angles, and segment recipients by behavioral interest.'
      }
    ],
    businessBenefits: [
      {
        title: 'High-Margin Channel Ownership',
        description: 'Unlike social platforms where algorithms restrict your reach, your email list is a direct channel you own 100%.'
      },
      {
        title: 'Hands-Off Automated Nurturing',
        description: 'Educate new leads and turn curious visitors into buyers automatically while you sleep.'
      },
      {
        title: 'Increased Repeat Business',
        description: 'Re-engage existing customers with timely recommendations, updates, and loyalty incentives.'
      }
    ],
    portfolioPlaceholders: [
      {
        title: 'Multi-Step Customer Onboarding Sequence',
        label: 'Concept Work / Sample Project',
        industry: 'SaaS & Subscription Platform',
        strategy: '5-part automated welcome and feature activation sequence with dynamic personalization tokens based on user industry.',
        metrics: 'Structured onboarding flow guiding users to key milestones within their first 14 days.'
      },
      {
        title: 'Premium Brand Editorial Newsletter',
        label: 'Concept Work / Sample Project',
        industry: 'Luxury Hospitality & Private Travel',
        strategy: 'Minimalist bi-weekly destination dispatch focused on visual storytelling and exclusive curated itineraries.',
        metrics: 'High open rates and elevated engagement through clean design and zero spam triggers.'
      }
    ],
    faqs: [
      {
        question: 'How do you prevent emails from landing in the spam folder?',
        answer: 'We ensure technical domain verification protocols (SPF, DKIM, DMARC) are configured correctly, maintain healthy list hygiene by cleaning bounce addresses, avoid spam trigger language, and use clean, lightweight HTML code.'
      },
      {
        question: 'Can you migrate us from our current email platform to a better one?',
        answer: 'Yes. We frequently help businesses migrate lists, templates, and automated workflows from older systems to modern platforms like Klaviyo, ActiveCampaign, or HubSpot without losing subscriber data.'
      },
      {
        question: 'How often should we send emails to our list?',
        answer: 'It depends on your business model. For service businesses, 1–2 thoughtful newsletters per month are often ideal. For eCommerce brands, 1–2 weekly targeted campaigns balanced with automated trigger flows produce strong results without fatiguing subscribers.'
      }
    ]
  },

  'ai-automation': {
    id: 'ai-automation',
    pageId: 'service-ai-automation',
    title: 'AI & Business Automation',
    shortDescription: 'We simplify business operations by connecting tools, automating repetitive tasks and creating intelligent workflows.',
    badge: 'Intelligent Systems',
    heroHeadline: 'Automate Repetitive Workflows And Connect Your Core Business Tools.',
    heroSubheadline: 'We build intelligent automations, smart CRM pipelines, and automated follow-up workflows so your team can focus on closing deals and serving clients.',
    image: '/src/assets/images/service_ai_automation_1793368525649.jpg',
    problemsSolved: [
      {
        problem: 'Manual Copy-Pasting Across Disconnected Tools',
        explanation: 'Teams waste hours moving lead details manually from ad forms to spreadsheets, CRMs, and email software.'
      },
      {
        problem: 'Slow Lead Response Times (The 5-Minute Window)',
        explanation: 'Leads contact multiple companies at once. Waiting hours or days to respond drastically slashes your conversion probability.'
      },
      {
        problem: 'Inconsistent Data & Human Entry Errors',
        explanation: 'Manual tracking leads to mistyped phone numbers, missing follow-ups, and lost sales opportunities.'
      },
      {
        problem: 'Expensive Custom Software Headaches',
        explanation: 'Traditional custom software takes months to build and costs a fortune. We build flexible, modular automations using proven platforms like n8n.'
      }
    ],
    whatIsIncluded: [
      {
        title: 'AI Workflow Automation & Process Design',
        description: 'Connecting your existing digital tools into seamless, automated pipelines that trigger without human intervention.',
        points: [
          'End-to-end workflow architecture design',
          'Cross-application data syncing and transformation',
          'Document parsing, summary generation, and automatic filing'
        ]
      },
      {
        title: 'Lead Generation & CRM Automation',
        description: 'Instant synchronization of inbound inquiries from Meta Ads, Google Ads, or website forms directly into your CRM.',
        points: [
          'Instant lead qualification and dynamic lead scoring',
          'Automated routing to designated sales reps or account managers',
          'CRM pipeline stage updates (HubSpot, Pipedrive, Notion, Airtable)'
        ]
      },
      {
        title: 'Automated Follow-ups & Speed-to-Lead Systems',
        description: 'Trigger immediate, personalized SMS or email acknowledgments within 60 seconds of an inquiry arriving.',
        points: [
          'Instant notification to your sales team via Slack, Teams, or WhatsApp',
          'Automated calendar booking link dispatch to prospects',
          'Multi-step follow-up reminders for unanswered inquiries'
        ]
      },
      {
        title: 'n8n & Advanced App Integrations',
        description: 'Custom, private, cost-effective automation pipelines built using open and flexible workflow platforms like n8n.',
        points: [
          'Self-hosted or cloud n8n workflow deployment',
          'Webhook integrations and custom API connector endpoints',
          'Automated reporting generation and Slack/Email summary notifications'
        ]
      },
      {
        title: 'Intelligent AI Chatbots & Knowledge Assistants',
        description: 'Smart conversational assistants trained on your company FAQs, product catalogs, and service documents to answer customer questions 24/7.',
        points: [
          'Website chat widgets trained on your private knowledge base',
          'Pre-qualification of customer budget and project timeline',
          'Seamless handoff to human representatives for complex questions'
        ]
      }
    ],
    platformsAndTools: [
      { name: 'n8n Workflow Automation', category: 'Workflow Engine', description: 'Modern, highly flexible node-based automation platform for complex enterprise data flows.' },
      { name: 'Make & Zapier', category: 'Quick Integrations', description: 'Rapid connectivity across 5,000+ commercial business web applications.' },
      { name: 'HubSpot / Pipedrive / Airtable', category: 'CRM & Database', description: 'Centralized single source of truth for leads, deals, and customer touchpoints.' },
      { name: 'OpenAI & Claude API Nodes', category: 'Intelligence Nodes', description: 'Intelligent text summarization, language translation, and categorization.' }
    ],
    process: [
      {
        step: '01',
        title: 'Workflow Bottleneck Audit',
        description: 'We map out where your team spends repetitive manual hours each week and identify high-ROI automation targets.'
      },
      {
        step: '02',
        title: 'System Blueprint & Logic Design',
        description: 'We design clear step-by-step logic diagrams so you can see exactly how data moves between your tools.'
      },
      {
        step: '03',
        title: 'Build & Rigorous Edge-Case Testing',
        description: 'We build the workflows in n8n or Make, testing error handling, fallback alerts, and data formatting.'
      },
      {
        step: '04',
        title: 'Deployment & Team Walkthrough',
        description: 'We launch the automations live and provide simple documentation so your team knows how the system operates.'
      }
    ],
    businessBenefits: [
      {
        title: 'Under-60-Second Lead Response',
        description: 'Acknowledge inquiries instantly to dramatically increase appointment booking and close rates.'
      },
      {
        title: 'Eliminate Repetitive Busywork',
        description: 'Save 10–20 hours of manual data entry per employee every week so your team focuses on high-value clients.'
      },
      {
        title: 'Scalable Operations Without Bloat',
        description: 'Handle 5x more customer inquiries and transactions without immediately needing to double your administrative headcount.'
      }
    ],
    portfolioPlaceholders: [
      {
        title: 'Automated Lead Qualification & CRM Pipeline',
        label: 'Concept Work / Sample Project',
        industry: 'Commercial Real Estate & Advisory',
        strategy: 'Integrated Meta Ad leads through n8n with instant SMS verification, CRM deal creation, and auto-generated investor intake folders.',
        metrics: 'Sub-60-second inquiry response pipeline with automated data synchronization into Airtable.'
      },
      {
        title: 'Intelligent Client Onboarding Dispatcher',
        label: 'Concept Work / Sample Project',
        industry: 'Consulting & Legal Services',
        strategy: 'Automated contract signature trigger that spawns client Slack channels, sends welcome kits, and prepares billing invoices.',
        metrics: 'Zero manual administrative touchpoints required between client payment and project kickoff.'
      }
    ],
    faqs: [
      {
        question: 'Do we need a technical background or programmer on staff to use these automations?',
        answer: 'Not at all. We build automations designed specifically for non-technical business owners and teams. We handle the setup, test every connection, and deliver simple dashboards or notifications (like a clear message in your email or Slack) that require no coding.'
      },
      {
        question: 'What is n8n and why do you use it?',
        answer: 'n8n is a powerful modern workflow automation tool. Unlike older platforms that charge exorbitant fees per task, n8n provides superior privacy, handles complex logic, and can be hosted securely while keeping running costs predictable.'
      },
      {
        question: 'Can automations integrate with our existing CRM and email system?',
        answer: 'Yes. We connect with nearly all modern platforms including HubSpot, Pipedrive, Salesforce, Google Workspace, Slack, Notion, Airtable, Stripe, Meta, and Shopify.'
      },
      {
        question: 'What happens if a tool goes down or an error occurs in the automation?',
        answer: 'We build comprehensive error-handling routines into every workflow. If an API temporarily fails, the system automatically retries and sends an alert with error details so nothing is silently lost.'
      }
    ]
  }
};

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PageId } from '../types';
import { 
  allIndividualServices,
  metaAdsPricing,
  googleAdsPricing,
  greatValueGrowthBundles,
  ppcBundles, 
  socialCreativeBundle, 
  completeBusinessGrowthBundle, 
  pricingFaqs, 
  TierType,
  PlatformPricing,
  ServiceTier
} from '../data/pricingData';
import { CustomBundleModal, SelectedServiceItem } from '../components/CustomBundleModal';
import { PlanEnquiryModal, PlanEnquiryPayload } from '../components/PlanEnquiryModal';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { PackageDetailView } from '../components/PackageDetailView';
import { IndustrySolutionsSection } from '../components/IndustrySolutionsSection';
import { PricingCoreServicesSection } from '../components/PricingCoreServicesSection';
import { getPackageDetail, PackageDetail } from '../data/packageDetailsData';
import { trackContentView } from '../utils/analytics';
import { 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  AlertCircle,
  Shield,
  Layers,
  Zap,
  HelpCircle,
  Plus,
  Compass,
  Monitor,
  ShoppingBag,
  MessageSquare,
  Mail,
  Share2,
  Cpu,
  Globe
} from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (serviceWithTier?: string) => void;
}

// Cursor-Responsive Interactive Card with 3D Tilt and Cursor Spotlight Glow
interface InteractivePricingCardProps {
  children: React.ReactNode;
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
  accentGlow?: string;
}

const InteractivePricingCard: React.FC<InteractivePricingCardProps> = ({
  children,
  isSelected = false,
  className = '',
  onClick,
  accentGlow = 'rgba(53, 109, 255, 0.12)'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    // Disable on touch devices and if user prefers reduced motion
    if (window.matchMedia && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle 3D tilt: max 3.5 degrees
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 3;
    const tiltY = ((x - centerX) / centerX) * 3;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: mousePos ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
      }}
      className={`relative rounded-3xl transition-all duration-300 overflow-hidden cursor-pointer min-w-0 max-w-full w-full ${
        isSelected
          ? 'ring-2 ring-[#356DFF] border-[#356DFF] shadow-[0_12px_36px_rgba(53,109,255,0.22)] bg-blue-50/25 scale-[1.01]'
          : 'border border-slate-200/90 hover:border-slate-300 hover:shadow-lg bg-white'
      } ${className}`}
    >
      {/* Soft spotlight following cursor */}
      {mousePos && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${accentGlow}, transparent 80%)`
          }}
        />
      )}
      <div className="relative z-10 h-full flex flex-col justify-between min-w-0 max-w-full w-full">
        {children}
      </div>
    </div>
  );
};

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigate,
  onOpenConsultation
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Navigation tabs within Pricing
  const [activeMainTab, setActiveMainTab] = useState<'core' | 'individual' | 'bundles' | 'builder' | 'industry'>('core');
  const [activeIndividualCategory, setActiveIndividualCategory] = useState<string>('meta-ads');
  const [individualCategoryFilter, setIndividualCategoryFilter] = useState<'all' | 'paid' | 'social' | 'retention' | 'tech'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Dynamic Selected Tier State for Each Service Platform (Defaults to 'Growth')
  const [selectedServiceTiers, setSelectedServiceTiers] = useState<Record<string, TierType>>({
    'meta-ads': 'Growth',
    'google-ads': 'Growth',
    'tiktok-ads': 'Growth',
    'snapchat-ads': 'Growth',
    'linkedin-ads': 'Growth',
    'chatgpt-ads': 'Growth',
    'amazon-ads': 'Growth',
    'pinterest-ads': 'Growth',
    'email-marketing': 'Growth',
    'social-media': 'Growth',
    'ai-automation': 'Growth',
    'ai-website-dev': 'Growth',
    'creative-production': 'Growth'
  });

  // Selected Bundle ID for Ready-Made Bundles
  const [selectedBundleId, setSelectedBundleId] = useState<string>('bundle-social-boost');
  const [liveGrowthBundles, setLiveGrowthBundles] = useState(greatValueGrowthBundles);

  useEffect(() => {
    fetch('/api/public/data')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.bundles?.readyMade && Array.isArray(data.bundles.readyMade) && data.bundles.readyMade.length > 0) {
          setLiveGrowthBundles(data.bundles.readyMade);
        }
      })
      .catch(() => {});
  }, []);

  // Support deep-links such as #pricing?service=meta-ads or #pricing?service=google-ads
  useEffect(() => {
    const applyServiceAnchor = () => {
      const hash = window.location.hash || '';
      const qIndex = hash.indexOf('?');
      if (qIndex === -1) return;
      const params = new URLSearchParams(hash.slice(qIndex + 1));
      const serviceParam = params.get('service');
      if (serviceParam && allIndividualServices.some(s => s.id === serviceParam)) {
        setIndividualCategoryFilter('all');
        setActiveIndividualCategory(serviceParam);
        setActiveMainTab('individual');
        setTimeout(() => {
          const el = document.getElementById('pricing-individual-services');
          if (el) {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 80);
      }
    };

    applyServiceAnchor();
    window.addEventListener('hashchange', applyServiceAnchor);
    return () => window.removeEventListener('hashchange', applyServiceAnchor);
  }, []);

  // Plan Enquiry Modal State
  const [planEnquiryOpen, setPlanEnquiryOpen] = useState(false);
  const [selectedPlanPayload, setSelectedPlanPayload] = useState<PlanEnquiryPayload | null>(null);

  // Dedicated Package Detail Page State
  const [selectedDetailPackage, setSelectedDetailPackage] = useState<PackageDetail | null>(null);

  // Custom Bundle Builder State
  const [builderSelections, setBuilderSelections] = useState<Record<string, TierType | null>>({
    'meta-ads': 'Starter',
    'google-ads': 'Starter',
    'tiktok-ads': null,
    'snapchat-ads': null,
    'linkedin-ads': null,
    'chatgpt-ads': null,
    'amazon-ads': null,
    'pinterest-ads': null,
    'email-marketing': null,
    'social-media': null,
    'ai-automation': null,
    'ai-website-dev': null,
    'creative-production': null
  });

  const [customBundleModalOpen, setCustomBundleModalOpen] = useState(false);

  // All services list for builder & platforms
  const allBuilderPlatforms: PlatformPricing[] = useMemo(() => allIndividualServices, []);

  // Compute live custom bundle calculations
  const {
    selectedItems,
    originalMonthlyTotal,
    discountPercentage,
    monthlyDiscountAmount,
    finalMonthlyTotal,
    oneTimeTotal,
    hasCustomTier,
    isBundleEligible
  } = useMemo(() => {
    const selected: SelectedServiceItem[] = [];
    let monthlySum = 0;
    let oneTimeSum = 0;
    let hasCustom = false;

    allBuilderPlatforms.forEach(platform => {
      const selectedTier = builderSelections[platform.id];
      if (selectedTier) {
        const tierData = platform.tiers[selectedTier];
        if (tierData) {
          const isOneTime = platform.isOneTime || false;
          
          selected.push({
            id: platform.id,
            name: platform.name,
            category: platform.category,
            tier: tierData.displayName || selectedTier,
            price: tierData.price,
            isOneTime
          });

          if (tierData.price === null) {
            hasCustom = true;
          } else {
            if (isOneTime) {
              oneTimeSum += tierData.price;
            } else {
              monthlySum += tierData.price;
            }
          }
        }
      }
    });

    // Customer must select at least TWO distinct services to qualify for a bundle discount.
    const isBundleEligible = selected.length >= 2;
    const discountPercentage = isBundleEligible ? 10 : 0;
    const discountAmount = isBundleEligible ? Math.round(monthlySum * 0.10) : 0;
    const finalMonthly = monthlySum - discountAmount;

    return {
      selectedItems: selected,
      originalMonthlyTotal: monthlySum,
      discountPercentage,
      monthlyDiscountAmount: discountAmount,
      finalMonthlyTotal: finalMonthly,
      oneTimeTotal: oneTimeSum,
      hasCustomTier: hasCustom,
      isBundleEligible
    };
  }, [builderSelections, allBuilderPlatforms]);

  // Section Observer to automatically update active button when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const coreEl = document.getElementById('pricing-core-services');
      const individualEl = document.getElementById('pricing-individual-services');
      const bundlesEl = document.getElementById('pricing-bundles-section');
      const builderEl = document.getElementById('pricing-custom-builder');
      const industryEl = document.getElementById('industry-solutions-section');

      const scrollPos = window.scrollY + 220;

      if (industryEl && scrollPos >= industryEl.offsetTop) {
        setActiveMainTab('industry');
      } else if (builderEl && scrollPos >= builderEl.offsetTop) {
        setActiveMainTab('builder');
      } else if (bundlesEl && scrollPos >= bundlesEl.offsetTop) {
        setActiveMainTab('bundles');
      } else if (individualEl && scrollPos >= individualEl.offsetTop) {
        setActiveMainTab('individual');
      } else if (coreEl && scrollPos >= coreEl.offsetTop - 160) {
        setActiveMainTab('core');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll with Header Offset (90px)
  const scrollToSection = (sectionId: string, tabName: 'core' | 'individual' | 'bundles' | 'builder' | 'industry') => {
    setActiveMainTab(tabName);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Smooth jump directly to a specific service package section (used by Core Service Cards)
  const handleExploreCorePackage = (serviceId: 'meta-ads' | 'google-ads') => {
    setIndividualCategoryFilter('all');
    setActiveIndividualCategory(serviceId);
    scrollToSection('pricing-individual-services', 'individual');
  };

  const toggleBuilderService = (serviceId: string, defaultTier: TierType = 'Starter') => {
    setBuilderSelections(prev => {
      const current = prev[serviceId];
      return {
        ...prev,
        [serviceId]: current ? null : defaultTier
      };
    });
  };

  const changeBuilderTier = (serviceId: string, tier: TierType) => {
    setBuilderSelections(prev => ({
      ...prev,
      [serviceId]: tier
    }));
  };

  // Add a specific tier directly into the Custom Bundle Calculator and scroll to it
  const handleAddTierToBuilder = (platformId: string, tierKey: TierType) => {
    setBuilderSelections(prev => ({
      ...prev,
      [platformId]: tierKey
    }));
    scrollToSection('pricing-custom-builder', 'builder');
  };

  // Open Enquiry Form for Individual Tier Plan
  const handleOpenTierEnquiry = (platform: PlatformPricing, tierKey: TierType) => {
    const tier = platform.tiers[tierKey];
    if (!tier) return;
    setSelectedServiceTiers(prev => ({
      ...prev,
      [platform.id]: tierKey
    }));

    setSelectedPlanPayload({
      serviceName: platform.name,
      planName: tier.displayName ? `${tier.name} (${tier.displayName})` : tier.name,
      priceDisplay: tier.priceDisplay + (tier.maintenancePriceDisplay ? ` (+ ${tier.maintenancePriceDisplay} maintenance)` : ''),
      billingType: platform.isOneTime ? 'One-Time Project' : (tier.price === null ? 'Tailored Quote' : 'Monthly Retainer'),
      isBundle: false
    });
    setPlanEnquiryOpen(true);
  };

  // Open Enquiry Form for Pre-Made Bundles
  const handleOpenBundleEnquiry = (bundleName: string, priceStr: string, bundleId: string) => {
    setSelectedBundleId(bundleId);
    setSelectedPlanPayload({
      serviceName: bundleName,
      planName: 'Growth Bundle',
      priceDisplay: priceStr,
      billingType: 'Monthly Retainer',
      isBundle: true,
      bundleName
    });
    setPlanEnquiryOpen(true);
  };

  // Open Dedicated Package Details Page
  const handleOpenPackageDetails = (packageId: string, tierKey: TierType = 'Growth') => {
    const detail = getPackageDetail(packageId, tierKey);
    if (detail) {
      setSelectedDetailPackage(detail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Button micro-interaction styles
  const btnBase = "transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#356DFF] focus:outline-none";

  // Dedicated Package Detail Page Mode
  if (selectedDetailPackage) {
    return (
      <div className="min-h-screen bg-[#F6F8FC] py-6 sm:py-10">
        <PackageDetailView
          packageDetail={selectedDetailPackage}
          onBack={() => {
            setSelectedDetailPackage(null);
          }}
          onSelectPlan={(payload) => {
            setSelectedPlanPayload(payload);
            setPlanEnquiryOpen(true);
          }}
        />
        <PlanEnquiryModal
          isOpen={planEnquiryOpen}
          onClose={() => setPlanEnquiryOpen(false)}
          data={selectedPlanPayload}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-20 sm:space-y-28 pb-24">
      
      {/* =========================================================================
          1. PRICING HERO & ARCHITECTURAL MOTION HEADER
          ========================================================================= */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20 overflow-hidden">
        {/* Subtle Architectural Background Motion Lines */}
        <svg
          viewBox="0 0 1200 280"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-55"
          aria-hidden="true"
        >
          <path
            d="M -60 220 C 260 110, 480 250, 780 120 C 980 35, 1120 95, 1260 55"
            fill="none"
            stroke="#E2E8F4"
            strokeWidth="1.5"
          />
          <path
            d="M -60 160 C 280 240, 560 70, 860 180 C 1020 235, 1140 165, 1260 190"
            fill="none"
            stroke="#E2E8F4"
            strokeWidth="1.2"
          />
          {!shouldReduceMotion && (
            <>
              <motion.path
                d="M -60 220 C 260 110, 480 250, 780 120 C 980 35, 1120 95, 1260 55"
                fill="none"
                stroke="#356DFF"
                strokeOpacity="0.32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="90 520"
                animate={{ strokeDashoffset: [610, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'linear' }}
              />
              <motion.path
                d="M -60 160 C 280 240, 560 70, 860 180 C 1020 235, 1140 165, 1260 190"
                fill="none"
                stroke="#101B35"
                strokeOpacity="0.18"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="70 540"
                animate={{ strokeDashoffset: [0, -610] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: 'linear' }}
              />
            </>
          )}
        </svg>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span className="text-[#356DFF]">Transparent International Pricing</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>No Long Lock-in Retainers</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101B35] tracking-tight max-w-4xl mx-auto leading-tight text-balance">
            The Right Marketing Support for Your Business.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed text-balance">
            Choose the services you need, explore our ready-made growth bundles or build your own package. Get professional marketing support with clear pricing and flexible options.
          </p>

          {/* Section Navigation Tabs aligned with new page flow */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              onClick={() => scrollToSection('pricing-core-services', 'core')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold ${btnBase} shadow-sm ${
                activeMainTab === 'core'
                  ? 'bg-[#356DFF] text-white ring-2 ring-[#356DFF]/25 shadow-[0_6px_22px_rgba(53,109,255,0.32)]'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              Core Services (Meta &amp; Google)
            </motion.button>

            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              onClick={() => scrollToSection('pricing-individual-services', 'individual')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold ${btnBase} shadow-sm ${
                activeMainTab === 'individual'
                  ? 'bg-[#101B35] text-white ring-2 ring-[#101B35]/20 shadow-[0_4px_20px_rgba(16,27,53,0.25)]'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              Individual Services
            </motion.button>

            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              onClick={() => scrollToSection('pricing-bundles-section', 'bundles')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold ${btnBase} shadow-sm ${
                activeMainTab === 'bundles'
                  ? 'bg-[#101B35] text-white ring-2 ring-[#101B35]/20 shadow-[0_4px_20px_rgba(16,27,53,0.25)]'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              Great Value Bundles
            </motion.button>

            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              onClick={() => scrollToSection('pricing-custom-builder', 'builder')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold ${btnBase} shadow-sm flex items-center gap-1.5 ${
                activeMainTab === 'builder'
                  ? 'bg-[#356DFF] text-white ring-2 ring-[#356DFF]/20 shadow-[0_4px_20px_rgba(53,109,255,0.35)]'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Make Your Own Bundle (Save 10%)</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              onClick={() => scrollToSection('industry-solutions-section', 'industry')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold ${btnBase} shadow-sm flex items-center gap-1.5 ${
                activeMainTab === 'industry'
                  ? 'bg-[#101B35] text-white ring-2 ring-[#101B35]/20 shadow-[0_4px_20px_rgba(16,27,53,0.25)]'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#356DFF]" />
              <span>By Industry</span>
            </motion.button>
          </div>

          {/* Disclaimers Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#356DFF]" />
              <span>Direct ad spend paid to platforms</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#356DFF]" />
              <span>100% account &amp; creative ownership</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#356DFF]" />
              <span>Disciplined testing over false promises</span>
            </span>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          2. FEATURED CORE SERVICES — META ADS & GOOGLE ADS (HIGHEST PRIORITY)
          ========================================================================= */}
      <PricingCoreServicesSection
        metaStartingPrice={metaAdsPricing.tiers.Starter?.priceDisplay || '$249'}
        googleStartingPrice={googleAdsPricing.tiers.Starter?.priceDisplay || '$299'}
        onExploreMeta={() => handleExploreCorePackage('meta-ads')}
        onExploreGoogle={() => handleExploreCorePackage('google-ads')}
        onExploreBundles={() => scrollToSection('pricing-bundles-section', 'bundles')}
      />

      {/* =========================================================================
          3. INDIVIDUAL SERVICES PRICING (All 13 Services & Tiers Preserved)
          ========================================================================= */}
      <section id="pricing-individual-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-28">
        <AnimatedSection className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#356DFF]">
            MODULAR MARKETING SOLUTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#101B35] tracking-tight">
            Individual Service Packages
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Explore complete tier breakdowns for Meta Ads, Google Ads, and our full suite of 11 specialized advertising, retention, creative, and AI solutions.
          </p>
        </AnimatedSection>

        {/* Category Filter Bar */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {[
            { id: 'all', label: `All Services (${allBuilderPlatforms.length})` },
            { id: 'paid', label: 'Paid Advertising (8)' },
            { id: 'social', label: 'Social & Creative (2)' },
            { id: 'retention', label: 'Retention & Email (1)' },
            { id: 'tech', label: 'AI & Web Dev (2)' }
          ].map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              onClick={() => {
                setIndividualCategoryFilter(cat.id as any);
                const matches = allBuilderPlatforms.filter(p => {
                  if (cat.id === 'all') return true;
                  if (cat.id === 'paid') return p.category === 'Paid Advertising';
                  if (cat.id === 'social') return p.category.includes('Social');
                  if (cat.id === 'retention') return p.category.includes('Retention') || p.category.includes('Email');
                  if (cat.id === 'tech') return p.category.includes('AI') || p.category.includes('Web');
                  return true;
                });
                if (matches.length > 0 && !matches.some(m => m.id === activeIndividualCategory)) {
                  setActiveIndividualCategory(matches[0].id);
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                individualCategoryFilter === cat.id
                  ? 'bg-[#101B35] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Platform Selector */}
        <div className="w-full max-w-6xl mx-auto px-2">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {allBuilderPlatforms
              .filter(p => {
                if (individualCategoryFilter === 'all') return true;
                if (individualCategoryFilter === 'paid') return p.category === 'Paid Advertising';
                if (individualCategoryFilter === 'social') return p.category.includes('Social');
                if (individualCategoryFilter === 'retention') return p.category.includes('Retention') || p.category.includes('Email');
                if (individualCategoryFilter === 'tech') return p.category.includes('AI') || p.category.includes('Web');
                return true;
              })
              .map((platform) => {
                const is5Tier = (platform.tierKeys || []).length === 5;
                const isSelected = activeIndividualCategory === platform.id;

                return (
                  <motion.button
                    key={platform.id}
                    type="button"
                    whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    onClick={() => setActiveIndividualCategory(platform.id)}
                    className={`px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-bold rounded-2xl transition-all duration-200 flex items-center gap-2 cursor-pointer ${btnBase} ${
                      isSelected
                        ? 'bg-[#356DFF] text-white shadow-md ring-2 ring-[#356DFF]/30 scale-[1.02]'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>{platform.name}</span>
                    {is5Tier && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-800'
                      }`}>
                        5 Tiers
                      </span>
                    )}
                    {platform.isOneTime && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                      }`}>
                        Setup
                      </span>
                    )}
                  </motion.button>
                );
              })}
          </div>
        </div>

        {/* Active Platform Card Grid with AnimatePresence Transition */}
        {(() => {
          const activePlatform = allBuilderPlatforms.find(p => p.id === activeIndividualCategory) || allBuilderPlatforms[0];
          const tierKeysList: TierType[] = activePlatform.tierKeys || (['Starter', 'Growth', 'Scale', 'Custom'] as TierType[]);
          const currentlySelectedTier = selectedServiceTiers[activePlatform.id] || 'Growth';
          const is5TierGrid = tierKeysList.length === 5;

          return (
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlatform.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Platform Summary Showcase Header */}
                <div className="bg-gradient-to-r from-white via-slate-50 to-blue-50/40 rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#356DFF]">
                        <span>{activePlatform.category}</span>
                        {activePlatform.badge && (
                          <>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="text-purple-700">{activePlatform.badge}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                        {activePlatform.name} Pricing Tiers
                      </h3>
                    </div>

                    {activePlatform.importantNote && (
                      <div className="text-xs text-slate-500 max-w-md lg:text-right bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="font-bold text-slate-700 block mb-0.5">Important Notice:</span>
                        {activePlatform.importantNote}
                      </div>
                    )}
                  </div>

                  {activePlatform.tagline && (
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-blue-100/80 text-xs sm:text-sm text-slate-700">
                      <Sparkles className="w-5 h-5 text-[#356DFF] shrink-0 mt-0.5" />
                      <p className="font-medium italic leading-relaxed text-slate-800">
                        &ldquo;{activePlatform.tagline}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                {/* Dynamic Responsive Tier Cards Grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${
                  is5TierGrid
                    ? 'lg:grid-cols-3 xl:grid-cols-5 gap-4.5'
                    : 'lg:grid-cols-4 gap-5 sm:gap-6'
                } w-full min-w-0`}>
                  {tierKeysList.map((tierKey, tIdx) => {
                    const tier = activePlatform.tiers[tierKey];
                    if (!tier) return null;
                    const isSelected = currentlySelectedTier === tierKey;
                    const isGrowth = tierKey === 'Growth';
                    const isBoost = tierKey === 'Boost';
                    const isCustom = tierKey === 'Custom';

                    return (
                      <motion.div
                        key={tierKey}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: tIdx * 0.045, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <InteractivePricingCard
                          isSelected={isSelected}
                          onClick={() => setSelectedServiceTiers(prev => ({ ...prev, [activePlatform.id]: tierKey }))}
                          className="p-5 sm:p-6 xl:p-5 h-full flex flex-col justify-between w-full min-w-0"
                        >
                          <div className="space-y-4 w-full min-w-0">
                            {/* Header: Tier Name, Display Name & Badges */}
                            <div className="flex items-center justify-between min-h-[28px] gap-2 min-w-0">
                              <div className="min-w-0 flex-1">
                                <span className="text-xs font-black text-slate-800 uppercase tracking-wider block break-words">
                                  {tier.displayName || tier.name}
                                </span>
                                {tier.displayName && tier.displayName !== tier.name && (
                                  <span className="text-[10px] text-slate-400 font-semibold uppercase block break-words">
                                    {tier.name} Tier
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {isSelected && (
                                  <span className="flex items-center gap-1 text-[10px] font-bold bg-[#356DFF] text-white px-2 py-0.5 rounded-full shadow-xs">
                                    <Check className="w-2.5 h-2.5" /> Selected
                                  </span>
                                )}

                                {isGrowth && !isSelected && (
                                  <span className="text-[10px] font-bold bg-blue-50 text-[#356DFF] px-2 py-0.5 rounded border border-blue-200">
                                    Most Popular
                                  </span>
                                )}

                                {isBoost && !isSelected && (
                                  <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200">
                                    Complete Strategy
                                  </span>
                                )}

                                {isCustom && !isSelected && (
                                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                    Custom
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Price Tag */}
                            <div className="space-y-0.5 text-center">
                              <div className="text-2xl sm:text-3xl font-black text-[#101B35] tracking-tight break-words tabular-nums">
                                {tier.priceDisplay}
                              </div>
                              <div className="text-[11px] text-slate-500 font-medium break-words">
                                {tier.maintenancePriceDisplay ? (
                                  <span className="text-purple-700 font-semibold block">
                                    Setup Fee · Maintenance: {tier.maintenancePriceDisplay}
                                  </span>
                                ) : activePlatform.isOneTime ? (
                                  'One-time project investment'
                                ) : (
                                  '/month (ad spend separate)'
                                )}
                              </div>
                            </div>

                            {/* Short one-line description */}
                            <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100 break-words text-center">
                              {tier.bestFor || tier.idealFor}
                            </p>

                            {/* Included Highlights */}
                            <div className="space-y-2 pt-1 text-center w-full min-w-0">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                                Included Highlights:
                              </span>
                              <div className="flex flex-col items-center justify-center gap-1.5 w-full min-w-0">
                                {tier.deliverables.slice(0, 3).map((del, dIdx) => {
                                  const shortName = del.split('(')[0].replace(/^Everything in.*?,?\s*/i, '').trim();
                                  return (
                                    <div
                                      key={dIdx}
                                      className="w-full text-center inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50/80 text-blue-950 border border-blue-100/90 leading-tight break-words"
                                    >
                                      <Check className="w-3 h-3 text-[#356DFF] shrink-0" />
                                      <span className="break-words text-center">{shortName}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Savings note */}
                            <div className="text-[10px] text-emerald-700 bg-emerald-50/90 p-2 rounded-lg font-semibold border border-emerald-100/80 text-center break-words">
                              Bundle with a 2nd service to save 10% on monthly retainers.
                            </div>
                          </div>

                          {/* CTA Buttons */}
                          <div className="pt-4 mt-5 border-t border-slate-100 space-y-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenPackageDetails(activePlatform.id, tierKey);
                              }}
                              className="w-full py-1.5 text-xs font-bold text-[#356DFF] hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>See Package Details</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenTierEnquiry(activePlatform, tierKey);
                              }}
                              className={`w-full py-2.5 rounded-xl text-xs font-bold cursor-pointer ${btnBase} ${
                                isSelected
                                  ? 'bg-[#356DFF] hover:bg-blue-600 text-white shadow-md'
                                  : 'bg-[#101B35] hover:bg-[#356DFF] text-white'
                              }`}
                            >
                              {isCustom ? 'Request Custom Quote' : `Select ${tier.displayName || tierKey}`}
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddTierToBuilder(activePlatform.id, tierKey);
                              }}
                              className="w-full py-1.5 rounded-lg text-[11px] font-semibold text-slate-600 hover:text-[#356DFF] hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add to Custom Bundle</span>
                            </button>
                          </div>
                        </InteractivePricingCard>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Pricing Conditions Box */}
                {activePlatform.pricingConditions && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 text-xs">
                    <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                      Pricing Conditions &amp; Technical Scope:
                    </div>
                    <ul className="space-y-1.5 text-slate-600 list-disc pl-5">
                      {activePlatform.pricingConditions.map((cond, cIdx) => (
                        <li key={cIdx}>{cond}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          );
        })()}
      </section>

      {/* =========================================================================
          4. GREAT VALUE GROWTH BUNDLES (All 6 Bundles & Prices Preserved)
          ========================================================================= */}
      <section id="pricing-bundles-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-28">
        <AnimatedSection className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#356DFF]">
            COORDINATED GROWTH PACKAGES
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#101B35] tracking-tight">
            Great Value Growth Bundles
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Get more from your marketing budget with services that work better together. Choose a package based on your business goals and save compared to purchasing each service separately.
          </p>
          <div className="text-xs text-slate-500 font-medium pt-1">
            All prices are monthly management fees. Advertising budget is separate.
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveGrowthBundles.map((pkg) => {
            const isSelected = selectedBundleId === pkg.id;

            return (
              <StaggerItem key={pkg.id}>
                <InteractivePricingCard
                  isSelected={isSelected}
                  onClick={() => {
                    setSelectedBundleId(pkg.id);
                    trackContentView('Growth Bundle', pkg.name, { price: pkg.startingPriceDisplay });
                  }}
                  accentGlow="rgba(53, 109, 255, 0.15)"
                  className="p-5 sm:p-7 h-full flex flex-col justify-between w-full min-w-0"
                >
                  <div className="space-y-4 min-w-0 w-full">
                    <div className="flex items-center justify-between gap-2 min-h-[28px] min-w-0">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#356DFF] truncate">
                        {pkg.category}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[10px] font-bold bg-[#356DFF] text-white px-2 py-0.5 rounded-full shadow-xs">
                            <Check className="w-2.5 h-2.5" /> Selected
                          </span>
                        )}
                        {pkg.badge && (
                          <span className="bg-blue-50 text-[#356DFF] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100">
                            {pkg.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#101B35] break-words">
                      {pkg.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed break-words">
                      {pkg.description}
                    </p>

                    <div className="space-y-2 pt-1 text-center w-full min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                        Included Highlights:
                      </span>
                      <div className="flex flex-col items-center justify-center gap-1.5 w-full min-w-0">
                        {(pkg.includedServicesShort || []).map((srv, idx) => (
                          <div
                            key={idx}
                            className="w-full text-center inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50/80 text-blue-950 border border-blue-100/90 leading-tight break-words"
                          >
                            <Check className="w-3 h-3 text-[#356DFF] shrink-0" />
                            <span className="break-words text-center">{srv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 pb-2 border-y border-slate-100 space-y-1.5 text-center">
                      <div className="flex items-baseline justify-center gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black text-[#101B35] tracking-tight tabular-nums">
                          {pkg.startingPriceDisplay}
                        </span>
                      </div>
                      <div className="text-[11px] text-emerald-700 bg-emerald-50/90 p-2 rounded-lg font-semibold border border-emerald-100/80 flex flex-col sm:flex-row items-center justify-between gap-1 text-center">
                        <span>Individual value: {pkg.individualValueDisplay}</span>
                        <span className="text-emerald-800 font-black">Save {pkg.savingsDisplay}</span>
                      </div>
                    </div>

                    {pkg.bestFor && (
                      <div className="text-[11px] text-slate-500 leading-snug text-center break-words">
                        <strong className="text-slate-700">Best for:</strong> {pkg.bestFor}
                      </div>
                    )}
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 space-y-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPackageDetails(pkg.id);
                      }}
                      className="w-full py-1.5 text-xs font-bold text-[#356DFF] hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>See Package Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenBundleEnquiry(pkg.name, pkg.startingPriceDisplay, pkg.id);
                      }}
                      className={`w-full py-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#356DFF] text-white shadow-md'
                          : 'bg-[#101B35] hover:bg-[#356DFF] text-white'
                      } text-xs font-bold rounded-xl ${btnBase} flex items-center justify-center gap-2`}
                    >
                      <span>Select This Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </InteractivePricingCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* =========================================================================
          5. MAKE YOUR OWN BUNDLE — INTERACTIVE CUSTOM BUILDER
          ========================================================================= */}
      <section id="pricing-custom-builder" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <AnimatedSection className="bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl border-2 border-[#356DFF]/30 p-6 sm:p-10 lg:p-12 shadow-xl space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#356DFF]">
              MAKE YOUR OWN BUNDLE
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#101B35] tracking-tight">
              Your Business. Your Services. Your Bundle.
            </h2>

            <div className="text-sm sm:text-base font-bold text-[#356DFF]">
              Choose What You Need. Save 10%.
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your business is unique, so your marketing package should be too. Select the services you need, combine them into one package and enjoy the same 10% bundle discount on recurring management.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Service Selectors */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>Select Services &amp; Choose Your Tier:</span>
                <span className="text-[#356DFF] font-semibold tabular-nums">{selectedItems.length} selected</span>
              </div>

              <div className="space-y-3">
                {allBuilderPlatforms.map((platform) => {
                  const isSelected = !!builderSelections[platform.id];
                  const selectedTier = builderSelections[platform.id] || 'Starter';
                  const activeTierData = platform.tiers[selectedTier];

                  return (
                    <motion.div
                      key={platform.id}
                      layout={!shouldReduceMotion}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className={`rounded-2xl border p-4 sm:p-5 transition-colors ${
                        isSelected
                          ? 'bg-white border-[#356DFF] shadow-sm ring-1 ring-[#356DFF]'
                          : 'bg-white/90 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <input
                            type="checkbox"
                            id={`builder-${platform.id}`}
                            checked={isSelected}
                            onChange={() => toggleBuilderService(platform.id)}
                            className="w-4 h-4 text-[#356DFF] rounded border-slate-300 focus:ring-[#356DFF] mt-1 shrink-0 cursor-pointer"
                          />
                          <div className="min-w-0 flex-1">
                            <label
                              htmlFor={`builder-${platform.id}`}
                              className="text-sm font-bold text-[#101B35] cursor-pointer hover:text-[#356DFF] transition-colors flex flex-wrap items-center gap-2 break-words"
                            >
                              <span className="break-words">{platform.name}</span>
                              {platform.isOneTime && (
                                <span className="text-[10px] font-semibold bg-purple-50 text-[#795BFF] px-2 py-0.5 rounded shrink-0">
                                  One-Time Setup
                                </span>
                              )}
                            </label>
                            <p className="text-xs text-slate-500 mt-0.5 break-words">
                              {platform.shortDescription}
                            </p>
                          </div>
                        </div>

                        <div className="text-left sm:text-right shrink-0 pl-7 sm:pl-0">
                          <span className="text-sm font-extrabold text-[#101B35] tabular-nums">
                            {isSelected && activeTierData ? activeTierData.priceDisplay : `From ${platform.tiers.Starter?.priceDisplay || '$149'}`}
                          </span>
                          {isSelected && !platform.isOneTime && activeTierData?.price !== null && (
                            <div className="text-[10px] text-emerald-600 font-semibold">
                              -10% in bundle
                            </div>
                          )}
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isSelected && (
                          <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="pt-3 mt-3 border-t border-slate-100 space-y-2"
                          >
                            <div className="text-[11px] font-semibold text-slate-500">
                              Package Tier:
                            </div>
                            <div className={`grid gap-1.5 ${
                              (platform.tierKeys || []).length === 5
                                ? 'grid-cols-2 sm:grid-cols-5'
                                : 'grid-cols-2 sm:grid-cols-4'
                            }`}>
                              {(platform.tierKeys || (['Starter', 'Growth', 'Scale', 'Custom'] as TierType[])).map((tierKey) => {
                                const tData = platform.tiers[tierKey];
                                if (!tData) return null;
                                const isCurrentTier = selectedTier === tierKey;

                                return (
                                  <button
                                    key={tierKey}
                                    type="button"
                                    onClick={() => changeBuilderTier(platform.id, tierKey)}
                                    className={`p-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                                      isCurrentTier
                                        ? 'border-[#356DFF] bg-blue-50 text-[#101B35] ring-1 ring-[#356DFF] font-bold'
                                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                                    }`}
                                  >
                                    <div>{tData.displayName || tierKey}</div>
                                    <div className="text-[10px] text-slate-500 font-normal tabular-nums">
                                      {tData.priceDisplay}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Live Sticky Summary */}
            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <div className="bg-[#101B35] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-700 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
                    Live Bundle Dossier
                  </div>
                  <span className="text-[11px] font-semibold text-slate-200 tabular-nums">
                    {selectedItems.length} {selectedItems.length === 1 ? 'Service' : 'Services'}
                  </span>
                </div>

                {!isBundleEligible && selectedItems.length > 0 && (
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-start gap-2.5 text-xs text-blue-200">
                    <AlertCircle className="w-4 h-4 text-[#356DFF] shrink-0 mt-0.5" />
                    <span>
                      Select at least one more service to unlock your <strong>10% bundle discount</strong>.
                    </span>
                  </div>
                )}

                {isBundleEligible && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-start gap-2.5 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>10% Bundle Discount Unlocked!</strong> Applied to all recurring monthly marketing services.
                    </span>
                  </div>
                )}

                {selectedItems.length > 0 ? (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0"
                      >
                        <div className="space-y-0.5 truncate pr-2">
                          <span className="font-bold text-white block truncate">{item.name}</span>
                          <span className="text-[10px] text-slate-400">{item.tier} Tier</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-200 shrink-0 tabular-nums">
                          {item.price === null ? 'Custom' : `$${item.price}/${item.isOneTime ? 'setup' : 'mo'}`}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic py-4 text-center">
                    Select at least two services above to calculate your custom bundle discount.
                  </div>
                )}

                {originalMonthlyTotal > 0 && (
                  <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Original Recurring Monthly Total:</span>
                      <span className="tabular-nums font-semibold text-white">
                        ${originalMonthlyTotal}/month
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>Discount Percentage:</span>
                      <span className="font-semibold text-white tabular-nums">
                        {discountPercentage}%
                      </span>
                    </div>

                    {discountPercentage > 0 && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Discount Amount (10%):</span>
                        <span className="tabular-nums">-${monthlyDiscountAmount}/month</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-white/20 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-white">
                        {isBundleEligible ? 'Final Monthly Bundle Price:' : 'Individual Monthly Total:'}
                      </span>
                      <div className="text-right">
                        <motion.span
                          key={finalMonthlyTotal}
                          initial={shouldReduceMotion ? false : { opacity: 0.5, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25 }}
                          className="inline-block text-2xl font-black text-[#356DFF] tabular-nums"
                        >
                          ${finalMonthlyTotal}
                        </motion.span>
                        <span className="text-xs text-slate-400">/month</span>
                      </div>
                    </div>
                  </div>
                )}

                {oneTimeTotal > 0 && (
                  <div className="pt-2 border-t border-white/10 text-xs flex justify-between text-slate-300">
                    <span>Separate One-Time Setup Costs (Automation):</span>
                    <span className="font-bold text-white tabular-nums">${oneTimeTotal} one-time</span>
                  </div>
                )}

                {hasCustomTier && (
                  <div className="text-[11px] text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 leading-relaxed">
                    Your selection includes a Custom Tier service. Our strategists will supply a tailored quotation for that scope.
                  </div>
                )}

                <div>
                  <motion.button
                    type="button"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                    disabled={selectedItems.length === 0}
                    onClick={() => setCustomBundleModalOpen(true)}
                    className={`w-full py-4 bg-[#356DFF] hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl ${btnBase} shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer`}
                  >
                    <span>GET MY CUSTOM BUNDLE</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <div className="text-[10px] text-slate-400 text-center mt-2">
                    {isBundleEligible
                      ? '10% recurring bundle discount unlocked • Instant quote enquiry'
                      : selectedItems.length === 1
                        ? 'Select 1 more service to qualify for 10% discount'
                        : 'Select services to build your bundle'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* =========================================================================
          6. SOLUTIONS ENGINEERED FOR YOUR SECTOR + ADDITIONAL PRICING FAQS
          ========================================================================= */}
      <IndustrySolutionsSection onOpenConsultation={onOpenConsultation} />

      <section id="pricing-faq-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#356DFF]">
              Pricing &amp; Terms Clarity
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#101B35] tracking-tight">
              Frequently Asked Pricing Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Transparent answers regarding ad spend, bundle savings, and contract terms.
            </p>
          </div>

          <div className="space-y-3">
            {pricingFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:border-slate-300 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm text-[#101B35]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#356DFF]' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </section>

      {/* =========================================================================
          7. FINAL CONSULTATION CTA (WITH ARCHITECTURAL MOTION BACKDROP)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="relative overflow-hidden bg-[#101B35] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 group">
          <svg
            viewBox="0 0 800 220"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
            aria-hidden="true"
          >
            <path
              d="M -20 170 C 210 70, 420 190, 820 50"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
            {!shouldReduceMotion && (
              <motion.path
                d="M -20 170 C 210 70, 420 190, 820 50"
                fill="none"
                stroke="#356DFF"
                strokeOpacity="0.6"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="70 360"
                animate={{ strokeDashoffset: [430, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </svg>

          <div className="relative z-10 space-y-2 max-w-xl">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#356DFF]">
              Custom Proposal
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              Need Help Choosing the Right Strategy?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Book a free discovery call with a senior strategist. We will analyze your customer unit economics and build a transparent quotation aligned with your exact goals.
            </p>
          </div>
          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            onClick={() => onOpenConsultation()}
            className={`relative z-10 inline-flex items-center gap-2 px-7 py-4 bg-[#356DFF] hover:bg-blue-500 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-md shrink-0 cursor-pointer ${btnBase}`}
          >
            <span>Book a Free Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </AnimatedSection>
      </section>

      {/* Plan & Bundle Enquiry Modal (Connected to backend /api/enquiries) */}
      <PlanEnquiryModal
        isOpen={planEnquiryOpen}
        onClose={() => setPlanEnquiryOpen(false)}
        data={selectedPlanPayload}
      />

      {/* Custom Bundle Quotation Modal */}
      <CustomBundleModal
        isOpen={customBundleModalOpen}
        onClose={() => setCustomBundleModalOpen(false)}
        selectedServices={selectedItems}
        originalMonthlyTotal={originalMonthlyTotal}
        discountPercentage={discountPercentage}
        monthlyDiscountAmount={monthlyDiscountAmount}
        finalMonthlyTotal={finalMonthlyTotal}
        oneTimeTotal={oneTimeTotal}
        hasCustomTier={hasCustomTier}
        onNavigateToPricing={() => scrollToSection('pricing-individual-services', 'individual')}
      />

    </div>
  );
};

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Filter,
  Instagram,
  KeyRound,
  Layers,
  MousePointerClick,
  Repeat,
  Search,
  Share2,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion
} from 'framer-motion';

interface PricingCoreServicesSectionProps {
  metaStartingPrice: string;
  googleStartingPrice: string;
  onExploreMeta: () => void;
  onExploreGoogle: () => void;
  onExploreBundles: () => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SEARCH_INTENT_QUERIES = [
  'performance marketing agency near me',
  'google ads lead generation specialists',
  'managed search campaigns for growth'
];

const GOOGLE_PIPELINE_STAGES = [
  {
    id: 'keywords',
    label: 'Keywords',
    caption: 'Capture high-intent search terms',
    icon: Target
  },
  {
    id: 'bidding',
    label: 'Bidding',
    caption: 'Optimize budget & click efficiency',
    icon: MousePointerClick
  },
  {
    id: 'tracking',
    label: 'Tracking',
    caption: 'Verify qualified leads & sales',
    icon: BarChart3
  }
] as const;

export const PricingCoreServicesSection: React.FC<PricingCoreServicesSectionProps> = ({
  metaStartingPrice,
  googleStartingPrice,
  onExploreMeta,
  onExploreGoogle,
  onExploreBundles
}) => {
  const shouldReduceMotion = useReducedMotion();

  const [activeMetaPlacement, setActiveMetaPlacement] = useState<'feed' | 'reels'>('feed');
  const [metaPaused, setMetaPaused] = useState(false);

  const [queryIndex, setQueryIndex] = useState(0);
  const [activeGoogleStage, setActiveGoogleStage] = useState(0);
  const [googlePaused, setGooglePaused] = useState(false);

  // GPU pointer spotlight coordinates (zero React re-renders during cursor movement)
  const metaMouseX = useMotionValue(-350);
  const metaMouseY = useMotionValue(-350);
  const metaSpotlight = useMotionTemplate`radial-gradient(460px circle at ${metaMouseX}px ${metaMouseY}px, rgba(53, 109, 255, 0.18), transparent 72%)`;

  const googleMouseX = useMotionValue(-350);
  const googleMouseY = useMotionValue(-350);
  const googleSpotlight = useMotionTemplate`radial-gradient(460px circle at ${googleMouseX}px ${googleMouseY}px, rgba(53, 109, 255, 0.08), transparent 72%)`;

  useEffect(() => {
    if (shouldReduceMotion || metaPaused) return;
    const id = window.setInterval(() => {
      setActiveMetaPlacement((prev) => (prev === 'feed' ? 'reels' : 'feed'));
    }, 3800);
    return () => window.clearInterval(id);
  }, [shouldReduceMotion, metaPaused]);

  useEffect(() => {
    if (shouldReduceMotion || googlePaused) return;
    const id = window.setInterval(() => {
      setQueryIndex((prev) => (prev + 1) % SEARCH_INTENT_QUERIES.length);
      setActiveGoogleStage((prev) => (prev + 1) % GOOGLE_PIPELINE_STAGES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [shouldReduceMotion, googlePaused]);

  const metaCapabilities = [
    { label: 'Facebook & Instagram Advertising', icon: Share2 },
    { label: 'Lead Generation & Conversion Campaigns', icon: Target },
    { label: 'Audience Research & Targeting', icon: Users },
    { label: 'Retargeting & Remarketing', icon: Repeat },
    { label: 'Creative & Copy Testing', icon: Layers },
    { label: 'Campaign Monitoring & Optimization', icon: Activity },
    { label: 'Performance Reporting', icon: BarChart3 }
  ];

  const googleCapabilities = [
    { label: 'Google Search Advertising', icon: Search },
    { label: 'Keyword Research & Strategy', icon: KeyRound },
    { label: 'Campaign Setup & Management', icon: SlidersHorizontal },
    { label: 'Conversion Tracking', icon: CheckCircle2 },
    { label: 'Bidding & Budget Optimization', icon: TrendingUp },
    { label: 'Search Term Analysis', icon: Filter },
    { label: 'Performance Reporting', icon: BarChart3 }
  ];

  return (
    <section
      id="pricing-core-services"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 scroll-mt-28"
    >
      {/* ===================================================================
          SECTION INTRODUCTION
          =================================================================== */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="text-center max-w-3xl mx-auto space-y-3"
      >
        <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#356DFF]">
          TELCA&apos;S FLAGSHIP SOLUTIONS
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#101B35] tracking-tight leading-[1.15] text-balance">
          Performance Marketing That Drives Growth.
        </h2>

        <motion.div
          initial={shouldReduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="h-[2px] w-24 mx-auto bg-gradient-to-r from-[#356DFF] via-blue-400 to-[#356DFF] rounded-full origin-center"
          aria-hidden="true"
        />

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto pt-1">
          Our core expertise lies in helping businesses acquire customers through strategic Meta and Google advertising. Choose your platform, explore our management packages, and invest in advertising built around measurable business objectives.
        </p>

        <p className="text-xs sm:text-sm font-semibold text-[#101B35]/80 pt-0.5">
          Two powerful advertising platforms. One focus: Measurable Growth.
        </p>
      </motion.div>

      {/* ===================================================================
          TWO FLAGSHIP CARDS SIDE BY SIDE
          =================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* -----------------------------------------------------------------
            CARD ONE — META ADS MANAGEMENT (Telca Navy + Cobalt Visual Stage)
            ----------------------------------------------------------------- */}
        <motion.article
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.65, delay: 0.05, ease: EASE_OUT_EXPO }}
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            metaMouseX.set(e.clientX - rect.left);
            metaMouseY.set(e.clientY - rect.top);
          }}
          onMouseEnter={() => setMetaPaused(true)}
          onMouseLeave={() => {
            metaMouseX.set(-350);
            metaMouseY.set(-350);
            setMetaPaused(false);
          }}
          className="relative h-full min-w-0 rounded-3xl bg-[#101B35] text-white border border-slate-800 p-7 sm:p-9 shadow-xl hover:shadow-2xl hover:border-blue-500/40 transition-shadow duration-300 flex flex-col justify-between group overflow-hidden"
        >
          {/* Pointer Spotlight */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: metaSpotlight }}
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            {/* Motion Visual Header: Meta Feed & Reels Signal Engine */}
            <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-4 sm:p-5 space-y-3.5 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold">
                <span className="tracking-[0.14em] uppercase text-blue-300">
                  META ADS MANAGEMENT
                </span>
                <span className="text-slate-400 font-medium">Facebook · Instagram</span>
              </div>

              {/* Animated Signal Flow SVG */}
              <div className="rounded-xl bg-[#0B1328]/85 border border-white/10 px-3.5 py-2.5">
                <svg viewBox="0 0 360 66" className="w-full h-[58px] block" aria-hidden="true">
                  <defs>
                    <linearGradient id="pricingMetaFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.25" />
                      <stop offset="50%" stopColor="#356DFF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.35" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 40 33 C 95 9, 145 9, 180 33 C 215 57, 265 57, 320 33"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 40 33 C 95 57, 145 57, 180 33 C 215 9, 265 9, 320 33"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1.5"
                  />
                  {!shouldReduceMotion && (
                    <>
                      <motion.path
                        d="M 40 33 C 95 9, 145 9, 180 33 C 215 57, 265 57, 320 33"
                        fill="none"
                        stroke="url(#pricingMetaFlow)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeDasharray="36 144"
                        animate={{ strokeDashoffset: [180, 0] }}
                        transition={{ duration: 2.7, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.path
                        d="M 40 33 C 95 57, 145 57, 180 33 C 215 9, 265 9, 320 33"
                        fill="none"
                        stroke="#60A5FA"
                        strokeOpacity="0.5"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeDasharray="22 158"
                        animate={{ strokeDashoffset: [0, -180] }}
                        transition={{ duration: 3.3, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.circle
                        cx="40"
                        cy="33"
                        r="14"
                        fill="none"
                        stroke="#356DFF"
                        strokeWidth="1"
                        animate={{ scale: [0.85, 1.35], opacity: [0.65, 0] }}
                        transition={{ duration: 2.1, repeat: Infinity, ease: 'easeOut' }}
                        style={{ transformOrigin: '40px 33px' }}
                      />
                      <motion.circle
                        cx="320"
                        cy="33"
                        r="14"
                        fill="none"
                        stroke="#60A5FA"
                        strokeWidth="1"
                        animate={{ scale: [0.85, 1.35], opacity: [0.6, 0] }}
                        transition={{ duration: 2.1, delay: 1.05, repeat: Infinity, ease: 'easeOut' }}
                        style={{ transformOrigin: '320px 33px' }}
                      />
                    </>
                  )}
                  <circle cx="40" cy="33" r="7.5" fill="#17284F" stroke="#356DFF" strokeWidth="1.75" />
                  <circle cx="40" cy="33" r="2.8" fill="#60A5FA" />
                  <circle cx="180" cy="33" r="8.5" fill="#17284F" stroke="#60A5FA" strokeWidth="1.75" />
                  <circle cx="180" cy="33" r="3.2" fill="#FFFFFF" />
                  <circle cx="320" cy="33" r="7.5" fill="#356DFF" stroke="#93C5FD" strokeWidth="1.75" />
                  <circle cx="320" cy="33" r="2.8" fill="#FFFFFF" />
                </svg>
                <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium">
                  <span>Audience Targeting</span>
                  <span className="text-blue-300">Creative Testing</span>
                  <span>Conversions</span>
                </div>
              </div>

              {/* Interactive Placement Toggle */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveMetaPlacement('feed')}
                  className={`relative text-left rounded-xl border px-3 py-2.5 space-y-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                    activeMetaPlacement === 'feed'
                      ? 'bg-white/[0.11] border-blue-400/50'
                      : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Share2 className="w-3.5 h-3.5 text-[#356DFF] shrink-0" />
                    <span className="truncate">Facebook Feed</span>
                  </div>
                  <motion.div
                    animate={{ scaleX: activeMetaPlacement === 'feed' ? [0.65, 0.94, 0.84] : 0.65 }}
                    transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
                    className="h-1.5 w-full rounded bg-blue-400/55 origin-left"
                  />
                  {activeMetaPlacement === 'feed' && (
                    <motion.div
                      layoutId="pricingMetaPlacementIndicator"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#356DFF] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMetaPlacement('reels')}
                  className={`relative text-left rounded-xl border px-3 py-2.5 space-y-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                    activeMetaPlacement === 'reels'
                      ? 'bg-white/[0.11] border-blue-400/50'
                      : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Instagram className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    <span className="truncate">Instagram Reels</span>
                  </div>
                  <motion.div
                    animate={{ scaleX: activeMetaPlacement === 'reels' ? [0.65, 0.94, 0.84] : 0.65 }}
                    transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
                    className="h-1.5 w-full rounded bg-white/35 origin-left"
                  />
                  {activeMetaPlacement === 'reels' && (
                    <motion.div
                      layoutId="pricingMetaPlacementIndicator"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-300 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Headline & Description */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-300">
                META ADS MANAGEMENT
              </div>
              <h3 className="text-2xl sm:text-[28px] font-black text-white tracking-tight leading-snug text-balance">
                Turn Attention Into Customers.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Reach the right people across Facebook and Instagram with strategic advertising campaigns designed to generate qualified leads, increase conversions and grow your business.
              </p>
            </div>

            {/* Key Capabilities List with Attractive Icons */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Core Capabilities
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-slate-100">
                {metaCapabilities.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={item.label}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.4, delay: 0.06 + idx * 0.04, ease: EASE_OUT_EXPO }}
                      className="flex items-start gap-2.5 group-hover:translate-x-0.5 transition-transform duration-200"
                    >
                      <Icon className="w-4 h-4 text-[#356DFF] shrink-0 mt-0.5" />
                      <span className="leading-snug font-medium">{item.label}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Prominent Starting Pricing & Primary CTA */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/10 space-y-5">
            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-300">
                  STARTING AT
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight tabular-nums">
                    {metaStartingPrice}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-300">/ month</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-medium sm:text-right">
                Multiple management packages available.
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
              onClick={onExploreMeta}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[46px] bg-[#356DFF] hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              <span>Explore Meta Ads Packages</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </div>
        </motion.article>

        {/* -----------------------------------------------------------------
            CARD TWO — GOOGLE ADS MANAGEMENT (Clean White Search & Analytics Engine)
            ----------------------------------------------------------------- */}
        <motion.article
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT_EXPO }}
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            googleMouseX.set(e.clientX - rect.left);
            googleMouseY.set(e.clientY - rect.top);
          }}
          onMouseEnter={() => setGooglePaused(true)}
          onMouseLeave={() => {
            googleMouseX.set(-350);
            googleMouseY.set(-350);
            setGooglePaused(false);
          }}
          className="relative h-full min-w-0 rounded-3xl bg-white text-[#101B35] border border-slate-200 p-7 sm:p-9 shadow-md hover:shadow-2xl hover:border-blue-300 transition-shadow duration-300 flex flex-col justify-between group overflow-hidden"
        >
          {/* Pointer Spotlight */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: googleSpotlight }}
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            {/* Motion Visual Header: Search Query Intent & Conversion Curve */}
            <div className="rounded-2xl bg-[#F6F8FC] border border-slate-200/90 p-4 sm:p-5 space-y-3.5 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-slate-500">
                <span className="tracking-[0.14em] uppercase text-[#356DFF]">
                  GOOGLE ADS MANAGEMENT
                </span>
                <span className="font-medium">Search · Conversions</span>
              </div>

              {/* Animated High-Intent Search Query Cycler */}
              <div className="rounded-xl bg-white border border-slate-200 px-3.5 py-2.5 flex items-center justify-between gap-3 overflow-hidden shadow-[0_1px_2px_rgba(16,27,53,0.03)]">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <Search className="w-4 h-4 text-[#356DFF] shrink-0" />
                  <div className="relative h-5 flex items-center overflow-hidden flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={SEARCH_INTENT_QUERIES[queryIndex]}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                        className="text-xs font-semibold text-[#101B35] truncate inline-flex items-center gap-1"
                      >
                        <span>{SEARCH_INTENT_QUERIES[queryIndex]}</span>
                        {!shouldReduceMotion && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.9, repeat: Infinity }}
                            className="inline-block w-[1.5px] h-3.5 bg-[#356DFF] shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#356DFF] shrink-0">Sponsored</span>
              </div>

              {/* Self-Drawing Conversion Curve & Spring Anchor */}
              <div className="rounded-xl bg-white border border-slate-200/90 px-3.5 pt-2.5 pb-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#101B35] mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#356DFF]" />
                  <span>{GOOGLE_PIPELINE_STAGES[activeGoogleStage].caption}</span>
                </div>
                <svg viewBox="0 0 340 42" className="w-full h-[36px] block" aria-hidden="true">
                  <defs>
                    <linearGradient id="pricingGoogleArea" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#356DFF" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#356DFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 8 34 C 65 32, 98 25, 152 21 C 208 17, 254 11, 332 6 L 332 40 L 8 40 Z"
                    fill="url(#pricingGoogleArea)"
                  />
                  <path
                    d="M 8 34 C 65 32, 98 25, 152 21 C 208 17, 254 11, 332 6"
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M 8 34 C 65 32, 98 25, 152 21 C 208 17, 254 11, 332 6"
                    fill="none"
                    stroke="#356DFF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={shouldReduceMotion ? false : { pathLength: 0.15 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
                  />
                  {!shouldReduceMotion && (
                    <motion.path
                      d="M 8 34 C 65 32, 98 25, 152 21 C 208 17, 254 11, 332 6"
                      fill="none"
                      stroke="#93C5FD"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeDasharray="24 220"
                      animate={{ strokeDashoffset: [244, 0] }}
                      transition={{ duration: 2.3, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                  <motion.circle
                    animate={{
                      cx: activeGoogleStage === 0 ? 78 : activeGoogleStage === 1 ? 185 : 316,
                      cy: activeGoogleStage === 0 ? 27 : activeGoogleStage === 1 ? 18 : 7
                    }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 260, damping: 24 }
                    }
                    r="4.5"
                    fill="#101B35"
                    stroke="#356DFF"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Interactive Pipeline Stage Buttons */}
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                {GOOGLE_PIPELINE_STAGES.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isActive = activeGoogleStage === idx;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveGoogleStage(idx)}
                      className={`relative rounded-lg border px-2.5 py-2 flex items-center gap-1.5 min-w-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#356DFF] ${
                        isActive
                          ? 'bg-white border-blue-300 text-[#101B35] shadow-xs'
                          : 'bg-white/75 border-slate-200/80 text-slate-600 hover:bg-white hover:text-[#101B35]'
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isActive ? 'text-[#356DFF]' : 'text-slate-400'
                        }`}
                      />
                      <span className="font-semibold truncate">{stage.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="pricingGoogleStageIndicator"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#356DFF] rounded-full"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Headline & Description */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#356DFF]">
                GOOGLE ADS MANAGEMENT
              </div>
              <h3 className="text-2xl sm:text-[28px] font-black text-[#101B35] tracking-tight leading-snug text-balance">
                Be There When Customers Are Searching.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect with high-intent customers through strategically managed Google advertising campaigns that help generate qualified enquiries, drive conversions and grow revenue.
              </p>
            </div>

            {/* Key Capabilities List with Attractive Icons */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Core Capabilities
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-slate-700">
                {googleCapabilities.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={item.label}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.4, delay: 0.08 + idx * 0.04, ease: EASE_OUT_EXPO }}
                      className="flex items-start gap-2.5 group-hover:translate-x-0.5 transition-transform duration-200"
                    >
                      <Icon className="w-4 h-4 text-[#356DFF] shrink-0 mt-0.5" />
                      <span className="leading-snug font-medium text-slate-800">{item.label}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Prominent Starting Pricing & Primary CTA */}
          <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 space-y-5">
            <div className="rounded-2xl bg-[#F6F8FC] border border-slate-200/90 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#356DFF]">
                  STARTING AT
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-[#101B35] tracking-tight tabular-nums">
                    {googleStartingPrice}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-500">/ month</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium sm:text-right">
                Multiple management packages available.
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
              onClick={onExploreGoogle}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[46px] bg-[#101B35] hover:bg-[#356DFF] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 shadow-md hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              <span>Explore Google Ads Packages</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </div>
        </motion.article>
      </div>

      {/* ===================================================================
          COMBINED ADVERTISING FEATURE BANNER
          =================================================================== */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.14, ease: EASE_OUT_EXPO }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#F9FBFF] to-blue-50/60 border border-slate-200/90 p-7 sm:p-10 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
      >
        {/* Architectural Dual-Platform Convergence Motion SVG */}
        <svg
          viewBox="0 0 800 180"
          preserveAspectRatio="none"
          className="pointer-events-none hidden md:block absolute right-0 top-0 h-full w-[58%] opacity-75"
          aria-hidden="true"
        >
          <path
            d="M 80 34 C 240 34, 310 90, 460 90 L 780 90"
            fill="none"
            stroke="#E2E8F4"
            strokeWidth="1.5"
          />
          <path
            d="M 80 146 C 240 146, 310 90, 460 90 L 780 90"
            fill="none"
            stroke="#E2E8F4"
            strokeWidth="1.5"
          />
          {!shouldReduceMotion && (
            <>
              <motion.path
                d="M 80 34 C 240 34, 310 90, 460 90 L 780 90"
                fill="none"
                stroke="#356DFF"
                strokeOpacity="0.45"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="60 320"
                animate={{ strokeDashoffset: [380, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              />
              <motion.path
                d="M 80 146 C 240 146, 310 90, 460 90 L 780 90"
                fill="none"
                stroke="#101B35"
                strokeOpacity="0.32"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="60 320"
                animate={{ strokeDashoffset: [380, 0] }}
                transition={{ duration: 3.5, delay: 1.75, repeat: Infinity, ease: 'linear' }}
              />
            </>
          )}
          <circle cx="460" cy="90" r="4" fill="#356DFF" fillOpacity="0.55" />
        </svg>

        <div className="relative z-10 space-y-2.5 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#356DFF]">
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>THE POWER OF TWO PLATFORMS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#101B35] tracking-tight leading-tight text-balance">
            Don&apos;t Choose Between Awareness and Intent.
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Combine Meta Ads and Google Ads to connect with customers across their buying journey. Generate demand, capture active searches and build a coordinated advertising strategy.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            onClick={onExploreBundles}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[46px] bg-[#101B35] hover:bg-[#356DFF] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 shadow-md hover:shadow-xl whitespace-nowrap cursor-pointer"
          >
            <span>Explore Combined Growth Bundles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

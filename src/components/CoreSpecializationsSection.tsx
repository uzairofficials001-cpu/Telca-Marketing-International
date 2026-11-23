import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  Search,
  Layers,
  Target,
  MousePointerClick,
  BarChart3,
  Instagram,
  Share2,
  TrendingUp
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion
} from 'framer-motion';
import { PageId } from '../types';

interface CoreSpecializationsSectionProps {
  onNavigate: (page: PageId) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SEARCH_INTENT_QUERIES = [
  'digital growth agency for qualified leads',
  'managed google search ad campaigns',
  'performance marketing partner near me'
];

const GOOGLE_PIPELINE_STAGES = [
  {
    id: 'keywords',
    label: 'Keywords',
    caption: 'Match high-intent buyer search terms',
    icon: Target
  },
  {
    id: 'bidding',
    label: 'Bidding',
    caption: 'Optimize cost per qualified click',
    icon: MousePointerClick
  },
  {
    id: 'tracking',
    label: 'Tracking',
    caption: 'Attribute every lead & conversion',
    icon: BarChart3
  }
] as const;

export const CoreSpecializationsSection: React.FC<CoreSpecializationsSectionProps> = ({
  onNavigate
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Interactive motion graphics state for Meta Ads placement switcher
  const [activeMetaPlacement, setActiveMetaPlacement] = useState<'feed' | 'reels'>('feed');
  const [metaPaused, setMetaPaused] = useState(false);

  // Interactive motion graphics state for Google Ads intent & pipeline stage
  const [queryIndex, setQueryIndex] = useState(0);
  const [activeGoogleStage, setActiveGoogleStage] = useState<number>(0);
  const [googlePaused, setGooglePaused] = useState(false);

  // Smooth pointer spotlight motion values (GPU-composited radial gradients, zero layout reflow)
  const metaMouseX = useMotionValue(-300);
  const metaMouseY = useMotionValue(-300);
  const metaSpotlight = useMotionTemplate`radial-gradient(420px circle at ${metaMouseX}px ${metaMouseY}px, rgba(53, 109, 255, 0.16), transparent 72%)`;

  const googleMouseX = useMotionValue(-300);
  const googleMouseY = useMotionValue(-300);
  const googleSpotlight = useMotionTemplate`radial-gradient(420px circle at ${googleMouseX}px ${googleMouseY}px, rgba(53, 109, 255, 0.08), transparent 72%)`;

  useEffect(() => {
    if (shouldReduceMotion || metaPaused) return;
    const timer = window.setInterval(() => {
      setActiveMetaPlacement((prev) => (prev === 'feed' ? 'reels' : 'feed'));
    }, 3800);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, metaPaused]);

  useEffect(() => {
    if (shouldReduceMotion || googlePaused) return;
    const timer = window.setInterval(() => {
      setQueryIndex((prev) => (prev + 1) % SEARCH_INTENT_QUERIES.length);
      setActiveGoogleStage((prev) => (prev + 1) % GOOGLE_PIPELINE_STAGES.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, googlePaused]);

  const navigateToPricingAnchor = (serviceId?: 'meta-ads' | 'google-ads') => {
    if (serviceId) {
      window.location.hash = `pricing?service=${serviceId}`;
    } else {
      onNavigate('pricing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const metaCapabilities = [
    'Facebook & Instagram Advertising',
    'Lead Generation Campaigns',
    'Audience Research & Targeting',
    'Retargeting & Remarketing',
    'Ad Creative & Copy Testing',
    'Campaign Optimization & Performance Tracking'
  ];

  const googleCapabilities = [
    'Google Search Advertising',
    'Keyword Research & Strategy',
    'Search Campaign Management',
    'Conversion Tracking',
    'Bidding & Budget Optimization',
    'Campaign Performance Analysis'
  ];

  return (
    <section
      id="core-specializations"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
    >
      <div className="space-y-10 sm:space-y-12">
        {/* Section Header with Choreographed Editorial Reveal */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="max-w-3xl space-y-3"
        >
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#356DFF]">
            OUR CORE SPECIALIZATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#101B35] tracking-tight leading-[1.15] text-balance">
            What We Specialize In
          </h2>
          {/* Precision Accent Hairline Draw */}
          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.12, ease: EASE_OUT_EXPO }}
            className="h-[2px] w-20 bg-gradient-to-r from-[#356DFF] to-blue-400 origin-left rounded-full"
            aria-hidden="true"
          />
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl pt-1">
            We help businesses turn advertising investment into measurable growth. Through strategic Meta and Google advertising, we help brands reach the right audience, generate qualified leads and increase sales.
          </p>
        </motion.div>

        {/* Two Core Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* ===============================================================
              CARD 1: META ADS MANAGEMENT (Telca Midnight Navy Motion Engine)
              =============================================================== */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.05, ease: EASE_OUT_EXPO }}
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              metaMouseX.set(e.clientX - rect.left);
              metaMouseY.set(e.clientY - rect.top);
            }}
            onMouseEnter={() => setMetaPaused(true)}
            onMouseLeave={() => {
              metaMouseX.set(-300);
              metaMouseY.set(-300);
              setMetaPaused(false);
            }}
            className="relative h-full min-w-0 rounded-3xl bg-[#101B35] text-white border border-slate-800 p-7 sm:p-9 shadow-lg hover:shadow-2xl hover:border-blue-500/40 transition-shadow duration-300 flex flex-col justify-between group overflow-hidden"
          >
            {/* Interactive Pointer Spotlight Overlay */}
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: metaSpotlight }}
              aria-hidden="true"
            />

            <div className="relative z-10 space-y-6">
              {/* Motion Graphics Stage: Meta Audience Targeting & Creative Signal Preview */}
              <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-4 sm:p-5 space-y-4 overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-slate-300">
                  <span className="tracking-wider uppercase text-blue-300">Meta Ads Management</span>
                  <span className="text-slate-400">Facebook · Instagram</span>
                </div>

                {/* Architectural SVG Signal & Retargeting Circuit */}
                <div className="relative rounded-xl bg-[#0B1328]/80 border border-white/10 px-3.5 py-3 overflow-hidden">
                  <svg
                    viewBox="0 0 360 72"
                    className="w-full h-[64px] block"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="metaSignalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.25" />
                        <stop offset="50%" stopColor="#356DFF" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.35" />
                      </linearGradient>
                    </defs>

                    {/* Base subtle routing tracks */}
                    <path
                      d="M 42 36 C 95 10, 145 10, 180 36 C 215 62, 265 62, 318 36"
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 42 36 C 95 62, 145 62, 180 36 C 215 10, 265 10, 318 36"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1.5"
                    />

                    {/* Flowing Animated Signal Impulses */}
                    {!shouldReduceMotion && (
                      <>
                        <motion.path
                          d="M 42 36 C 95 10, 145 10, 180 36 C 215 62, 265 62, 318 36"
                          fill="none"
                          stroke="url(#metaSignalGrad)"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeDasharray="38 140"
                          animate={{ strokeDashoffset: [178, 0] }}
                          transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
                        />
                        <motion.path
                          d="M 42 36 C 95 62, 145 62, 180 36 C 215 10, 265 10, 318 36"
                          fill="none"
                          stroke="#60A5FA"
                          strokeOpacity="0.55"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeDasharray="24 154"
                          animate={{ strokeDashoffset: [0, -178] }}
                          transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }}
                        />
                      </>
                    )}

                    {/* Node 1: Audience Concentric Rings */}
                    {!shouldReduceMotion && (
                      <motion.circle
                        cx="42"
                        cy="36"
                        r="16"
                        fill="none"
                        stroke="#356DFF"
                        strokeWidth="1"
                        animate={{ scale: [0.85, 1.35], opacity: [0.65, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                        style={{ transformOrigin: '42px 36px' }}
                      />
                    )}
                    <circle cx="42" cy="36" r="8" fill="#17284F" stroke="#356DFF" strokeWidth="1.75" />
                    <circle cx="42" cy="36" r="3" fill="#60A5FA" />

                    {/* Node 2: Creative Optimization Center */}
                    <circle cx="180" cy="36" r="9" fill="#17284F" stroke="#60A5FA" strokeWidth="1.75" />
                    <circle cx="180" cy="36" r="3.5" fill="#FFFFFF" />

                    {/* Node 3: Lead Conversion Target */}
                    {!shouldReduceMotion && (
                      <motion.circle
                        cx="318"
                        cy="36"
                        r="15"
                        fill="none"
                        stroke="#60A5FA"
                        strokeWidth="1"
                        animate={{ scale: [0.85, 1.35], opacity: [0.6, 0] }}
                        transition={{ duration: 2.2, delay: 1.1, repeat: Infinity, ease: 'easeOut' }}
                        style={{ transformOrigin: '318px 36px' }}
                      />
                    )}
                    <circle cx="318" cy="36" r="8" fill="#356DFF" stroke="#93C5FD" strokeWidth="1.75" />
                    <circle cx="318" cy="36" r="3" fill="#FFFFFF" />
                  </svg>

                  <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium pt-0.5">
                    <span>Audience</span>
                    <span className="text-blue-300">Creative Testing</span>
                    <span>Qualified Leads</span>
                  </div>
                </div>

                {/* Interactive Placement Switcher (Facebook Feed / Instagram Reels) */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveMetaPlacement('feed')}
                    className={`relative text-left rounded-xl border p-3 space-y-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      activeMetaPlacement === 'feed'
                        ? 'bg-white/[0.11] border-blue-400/50'
                        : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Share2 className="w-3.5 h-3.5 text-[#356DFF] shrink-0" />
                      <span className="truncate">Facebook Feed</span>
                    </div>
                    <div className="space-y-1.5">
                      <motion.div
                        animate={{ scaleX: activeMetaPlacement === 'feed' ? [0.68, 0.92, 0.82] : 0.68 }}
                        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
                        className="h-2 w-full rounded bg-white/25 origin-left"
                      />
                      <motion.div
                        animate={{ scaleX: activeMetaPlacement === 'feed' ? [0.45, 0.78, 0.64] : 0.45 }}
                        transition={{ duration: 1.2, delay: 0.08, ease: EASE_OUT_EXPO }}
                        className="h-2 w-full rounded bg-[#356DFF]/60 origin-left"
                      />
                    </div>
                    <div className="pt-1 text-[11px] text-slate-300 font-medium">
                      Lead Generation Form
                    </div>
                    {activeMetaPlacement === 'feed' && (
                      <motion.div
                        layoutId="metaPlacementBorder"
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#356DFF] rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveMetaPlacement('reels')}
                    className={`relative text-left rounded-xl border p-3 space-y-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      activeMetaPlacement === 'reels'
                        ? 'bg-white/[0.11] border-blue-400/50'
                        : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Instagram className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                      <span className="truncate">Instagram Reels</span>
                    </div>
                    <div className="space-y-1.5">
                      <motion.div
                        animate={{ scaleX: activeMetaPlacement === 'reels' ? [0.72, 0.96, 0.88] : 0.72 }}
                        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
                        className="h-2 w-full rounded bg-white/25 origin-left"
                      />
                      <motion.div
                        animate={{ scaleX: activeMetaPlacement === 'reels' ? [0.5, 0.82, 0.7] : 0.5 }}
                        transition={{ duration: 1.2, delay: 0.08, ease: EASE_OUT_EXPO }}
                        className="h-2 w-full rounded bg-blue-400/60 origin-left"
                      />
                    </div>
                    <div className="pt-1 text-[11px] text-slate-300 font-medium">
                      Retargeting &amp; Creative
                    </div>
                    {activeMetaPlacement === 'reels' && (
                      <motion.div
                        layoutId="metaPlacementBorder"
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-300 rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-300">
                  Meta Ads Management
                </div>
                <h3 className="text-2xl sm:text-[26px] font-extrabold text-white tracking-tight leading-snug text-balance">
                  Reach the Right Audience. Generate More Leads.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We create and manage strategic Facebook and Instagram advertising campaigns designed to attract potential customers, generate qualified leads and drive business growth.
                </p>
              </div>

              {/* Staggered Highlighted Capabilities */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Core Capabilities
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-slate-100">
                  {metaCapabilities.map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.4, delay: 0.08 + idx * 0.045, ease: EASE_OUT_EXPO }}
                      className="flex items-start gap-2 group-hover:translate-x-0.5 transition-transform duration-200"
                    >
                      <Check className="w-4 h-4 text-[#356DFF] shrink-0 mt-0.5" />
                      <span className="leading-snug font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Benefit & Action with Kinetic Sheen */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 space-y-4">
              <p className="text-xs text-blue-200 font-medium leading-relaxed">
                Build awareness, attract potential customers and turn attention into action.
              </p>
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                onClick={() => navigateToPricingAnchor('meta-ads')}
                className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#356DFF] hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 shadow-sm hover:shadow-lg whitespace-nowrap"
              >
                <span className="relative z-10">Explore Meta Ads Pricing</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </div>
          </motion.div>

          {/* ===============================================================
              CARD 2: GOOGLE ADS MANAGEMENT (Architectural White Motion Engine)
              =============================================================== */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE_OUT_EXPO }}
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              googleMouseX.set(e.clientX - rect.left);
              googleMouseY.set(e.clientY - rect.top);
            }}
            onMouseEnter={() => setGooglePaused(true)}
            onMouseLeave={() => {
              googleMouseX.set(-300);
              googleMouseY.set(-300);
              setGooglePaused(false);
            }}
            className="relative h-full min-w-0 rounded-3xl bg-white text-[#101B35] border border-slate-200 p-7 sm:p-9 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-shadow duration-300 flex flex-col justify-between group overflow-hidden"
          >
            {/* Interactive Pointer Spotlight Overlay */}
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: googleSpotlight }}
              aria-hidden="true"
            />

            <div className="relative z-10 space-y-6">
              {/* Motion Graphics Stage: High-Intent Search Query & Conversion Trajectory */}
              <div className="rounded-2xl bg-[#F6F8FC] border border-slate-200/90 p-4 sm:p-5 space-y-3.5 overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-slate-500">
                  <span className="tracking-wider uppercase text-[#356DFF]">Google Ads Management</span>
                  <span>Search · Conversions</span>
                </div>

                {/* Animated Live Search Intent Query Cycler */}
                <div className="relative rounded-xl bg-white border border-slate-200 px-3.5 py-2.5 flex items-center justify-between gap-3 overflow-hidden shadow-[0_1px_2px_rgba(16,27,53,0.03)]">
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

                {/* Animated Search-to-Conversion Trajectory SVG */}
                <div className="rounded-xl bg-white border border-slate-200/90 px-3.5 pt-3 pb-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1">
                    <span className="inline-flex items-center gap-1.5 text-[#101B35] font-semibold">
                      <TrendingUp className="w-3.5 h-3.5 text-[#356DFF]" />
                      <span>{GOOGLE_PIPELINE_STAGES[activeGoogleStage].caption}</span>
                    </span>
                  </div>
                  <svg viewBox="0 0 340 44" className="w-full h-[38px] block" aria-hidden="true">
                    <defs>
                      <linearGradient id="googleAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#356DFF" stopOpacity="0.16" />
                        <stop offset="100%" stopColor="#356DFF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 8 36 C 65 34, 98 26, 152 22 C 208 18, 254 11, 332 6 L 332 42 L 8 42 Z"
                      fill="url(#googleAreaGrad)"
                    />
                    <motion.path
                      d="M 8 36 C 65 34, 98 26, 152 22 C 208 18, 254 11, 332 6"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                    <motion.path
                      d="M 8 36 C 65 34, 98 26, 152 22 C 208 18, 254 11, 332 6"
                      fill="none"
                      stroke="#356DFF"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      initial={shouldReduceMotion ? false : { pathLength: 0.15 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
                    />
                    {!shouldReduceMotion && (
                      <motion.path
                        d="M 8 36 C 65 34, 98 26, 152 22 C 208 18, 254 11, 332 6"
                        fill="none"
                        stroke="#93C5FD"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeDasharray="24 220"
                        animate={{ strokeDashoffset: [244, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                    {/* Active Stage Anchor Marker */}
                    <motion.circle
                      animate={{
                        cx: activeGoogleStage === 0 ? 78 : activeGoogleStage === 1 ? 185 : 316,
                        cy: activeGoogleStage === 0 ? 29 : activeGoogleStage === 1 ? 19 : 7
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

                {/* Interactive Keyword, Bidding & Tracking Stage Controls */}
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
                            layoutId="googleStageIndicator"
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

              {/* Title & Description */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#356DFF]">
                  Google Ads Management
                </div>
                <h3 className="text-2xl sm:text-[26px] font-extrabold text-[#101B35] tracking-tight leading-snug text-balance">
                  Capture High-Intent Searches. Win More Customers.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We help businesses connect with people actively searching for their products and services through strategically managed Google Ads campaigns.
                </p>
              </div>

              {/* Staggered Highlighted Capabilities */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Core Capabilities
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-slate-700">
                  {googleCapabilities.map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.4, delay: 0.12 + idx * 0.045, ease: EASE_OUT_EXPO }}
                      className="flex items-start gap-2 group-hover:translate-x-0.5 transition-transform duration-200"
                    >
                      <Check className="w-4 h-4 text-[#356DFF] shrink-0 mt-0.5" />
                      <span className="leading-snug font-medium text-slate-800">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Benefit & Action */}
            <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 space-y-4">
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Reach customers when they are actively looking for what you offer.
              </p>
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                onClick={() => navigateToPricingAnchor('google-ads')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#101B35] hover:bg-[#356DFF] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 shadow-sm hover:shadow-lg whitespace-nowrap"
              >
                <span>Explore Google Ads Pricing</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ===============================================================
            COMBINED ADVERTISING CTA BANNER (Architectural Convergence Motion)
            =============================================================== */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.16, ease: EASE_OUT_EXPO }}
          className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-7 sm:p-10 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
        >
          {/* Subtle Architectural Dual-Platform Convergence SVG Background */}
          <svg
            viewBox="0 0 800 180"
            preserveAspectRatio="none"
            className="pointer-events-none hidden md:block absolute right-0 top-0 h-full w-[55%] opacity-70"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="60 320"
                  animate={{ strokeDashoffset: [380, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M 80 146 C 240 146, 310 90, 460 90 L 780 90"
                  fill="none"
                  stroke="#101B35"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="60 320"
                  animate={{ strokeDashoffset: [380, 0] }}
                  transition={{ duration: 3.6, delay: 1.8, repeat: Infinity, ease: 'linear' }}
                />
              </>
            )}
            <circle cx="460" cy="90" r="4" fill="#356DFF" fillOpacity="0.5" />
          </svg>

          <div className="relative z-10 space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#356DFF]">
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>ONE STRATEGY. TWO POWERFUL PLATFORMS.</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101B35] tracking-tight leading-tight text-balance">
              Why Choose Just One Platform?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Combine Meta Ads and Google Ads to reach potential customers across different stages of their buying journey. Build awareness, capture demand and create a coordinated advertising strategy.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              onClick={() => navigateToPricingAnchor()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[44px] bg-[#101B35] hover:bg-[#356DFF] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              <span>Explore All Pricing &amp; Packages</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

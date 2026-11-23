import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Check,
  Compass,
  Globe,
  Layers,
  Mail,
  Megaphone,
  Palette,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  Target,
  Video
} from 'lucide-react';
import { allIndividualServices, PlatformPricing } from '../data/pricingData';
import { PageId } from '../types';
import { trackContentView } from '../utils/analytics';

interface AllServicesDirectorySectionProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (serviceName?: string) => void;
  compactHeader?: boolean;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SERVICE_PRACTICE_ROUTE: Record<string, PageId> = {
  'meta-ads': 'service-paid-advertising',
  'google-ads': 'service-paid-advertising',
  'tiktok-ads': 'service-paid-advertising',
  'snapchat-ads': 'service-paid-advertising',
  'linkedin-ads': 'service-paid-advertising',
  'chatgpt-ads': 'service-paid-advertising',
  'amazon-ads': 'service-paid-advertising',
  'pinterest-ads': 'service-paid-advertising',
  'email-marketing': 'service-email-marketing',
  'social-media': 'service-social-media',
  'ai-automation': 'service-ai-automation',
  'ai-website-dev': 'service-ai-automation',
  'creative-production': 'service-creative-production'
};

const SERVICE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'meta-ads': Share2,
  'google-ads': Search,
  'tiktok-ads': Video,
  'snapchat-ads': Megaphone,
  'linkedin-ads': Target,
  'chatgpt-ads': Sparkles,
  'amazon-ads': ShoppingBag,
  'pinterest-ads': Compass,
  'email-marketing': Mail,
  'social-media': Layers,
  'ai-automation': Bot,
  'ai-website-dev': Globe,
  'creative-production': Palette
};

export const AllServicesDirectorySection: React.FC<AllServicesDirectorySectionProps> = ({
  onNavigate,
  onOpenConsultation,
  compactHeader = false
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'paid' | 'social' | 'retention' | 'tech'>('all');

  const filteredServices = allIndividualServices.filter((svc) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'paid') return svc.category === 'Paid Advertising';
    if (categoryFilter === 'social') return svc.category.includes('Social') || svc.category.includes('Creative');
    if (categoryFilter === 'retention') return svc.category.includes('Retention') || svc.category.includes('Email');
    if (categoryFilter === 'tech') return svc.category.includes('AI') || svc.category.includes('Web');
    return true;
  });

  const navigateToServicePricing = (serviceId: string) => {
    window.location.hash = `pricing?service=${serviceId}`;
  };

  const navigateToPractice = (serviceId: string) => {
    const pageId = SERVICE_PRACTICE_ROUTE[serviceId] || 'service-paid-advertising';
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStartingPrice = (svc: PlatformPricing) => {
    return svc.tiers?.Starter?.priceDisplay || '$199';
  };

  return (
    <section
      id="all-services-catalog"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-28"
    >
      {/* Section Header */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
      >
        <div className="space-y-2.5 max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#356DFF]">
            COMPLETE CAPABILITIES CATALOG · ALL {allIndividualServices.length} SERVICES
          </div>
          <h2 className={compactHeader ? 'text-2xl sm:text-3xl font-black text-[#101B35] tracking-tight' : 'text-3xl sm:text-4xl font-black text-[#101B35] tracking-tight'}>
            Every Advertising, Creative &amp; Growth Service Under One Roof
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Browse all {allIndividualServices.length} specialized Telca Marketing services—led by our flagship Meta Ads and Google Ads teams alongside multi-channel paid acquisition, creative production, social media, email retention, AI automation, and web development.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shrink-0">
          {[
            { id: 'all', label: `All (${allIndividualServices.length})` },
            { id: 'paid', label: 'Paid Ads (8)' },
            { id: 'social', label: 'Social & Creative (2)' },
            { id: 'retention', label: 'Email (1)' },
            { id: 'tech', label: 'AI & Web (2)' }
          ].map((tab) => {
            const active = categoryFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id as any)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  active ? 'text-white' : 'text-slate-600 hover:text-[#101B35]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="allServicesCategoryTab"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 bg-[#101B35] rounded-xl shadow-xs"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Services Responsive Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={categoryFilter}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredServices.map((svc, idx) => {
            const Icon = SERVICE_ICON_MAP[svc.id] || Layers;
            const isCoreFlagship = svc.id === 'meta-ads' || svc.id === 'google-ads';
            const tierCount = (svc.tierKeys || ['Starter', 'Growth', 'Scale', 'Custom']).length;
            const topDeliverables = svc.tiers?.Growth?.deliverables?.slice(0, 3) || svc.tiers?.Starter?.deliverables?.slice(0, 3) || [];

            return (
              <motion.article
                key={svc.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.24), ease: EASE_OUT_EXPO }}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                className={`h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-shadow duration-200 ${
                  isCoreFlagship
                    ? 'bg-[#101B35] text-white border border-slate-800 shadow-lg hover:shadow-2xl'
                    : 'bg-white text-[#101B35] border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-200'
                }`}
              >
                <div className="space-y-4">
                  {/* Metadata Line */}
                  <div className="flex items-center justify-between gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      isCoreFlagship ? 'bg-[#356DFF]/20 text-blue-300' : 'bg-[#F6F8FC] text-[#356DFF] border border-slate-200/80'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className={`text-[11px] font-bold uppercase tracking-wider text-right ${
                      isCoreFlagship ? 'text-blue-300' : 'text-[#356DFF]'
                    }`}>
                      {isCoreFlagship ? 'Core Specialization' : svc.category}
                    </div>
                  </div>

                  {/* Title & Starting Rate */}
                  <div className="space-y-1.5">
                    <h3 className={`text-xl font-black tracking-tight ${
                      isCoreFlagship ? 'text-white' : 'text-[#101B35]'
                    }`}>
                      {svc.name}
                    </h3>
                    <div className={`text-xs font-medium flex items-center gap-2 ${
                      isCoreFlagship ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      <span>
                        Starting at <strong className={`tabular-nums ${isCoreFlagship ? 'text-white' : 'text-[#101B35]'}`}>{getStartingPrice(svc)}</strong>{svc.isOneTime ? ' setup' : '/mo'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{tierCount} Packages</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-xs leading-relaxed ${
                    isCoreFlagship ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {svc.shortDescription}
                  </p>

                  {/* Key Deliverables */}
                  {topDeliverables.length > 0 && (
                    <ul className={`pt-3 border-t space-y-2 text-xs ${
                      isCoreFlagship ? 'border-white/10 text-slate-200' : 'border-slate-100 text-slate-700'
                    }`}>
                      {topDeliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isCoreFlagship ? 'text-blue-300' : 'text-[#356DFF]'
                          }`} />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Action Controls */}
                <div className={`pt-5 mt-5 border-t space-y-2 ${
                  isCoreFlagship ? 'border-white/10' : 'border-slate-100'
                }`}>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        trackContentView('Service Catalog', svc.name);
                        navigateToServicePricing(svc.id);
                      }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        isCoreFlagship
                          ? 'bg-[#356DFF] hover:bg-blue-500 text-white shadow-sm'
                          : 'bg-[#101B35] hover:bg-[#356DFF] text-white'
                      }`}
                    >
                      <span>View Pricing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        trackContentView('Service Practice', svc.name);
                        navigateToPractice(svc.id);
                      }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center cursor-pointer ${
                        isCoreFlagship
                          ? 'border-white/20 text-white hover:bg-white/10'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span>Practice Area</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenConsultation(svc.name)}
                    className={`w-full py-2 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                      isCoreFlagship
                        ? 'text-blue-200 hover:text-white hover:bg-white/5'
                        : 'text-[#356DFF] hover:bg-blue-50'
                    }`}
                  >
                    Book Free {svc.name} Consultation
                  </button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

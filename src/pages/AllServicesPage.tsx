import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import { servicesData } from '../data/servicesData';
import { AllServicesDirectorySection } from '../components/AllServicesDirectorySection';
import { AnimatedSection } from '../components/AnimatedSection';

interface AllServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (serviceName?: string) => void;
  onOpenAudit?: () => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const AllServicesPage: React.FC<AllServicesPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenAudit
}) => {
  const shouldReduceMotion = useReducedMotion();
  const practiceAreas = Object.values(servicesData);

  return (
    <div className="space-y-20 sm:space-y-24 pb-24">
      {/* 1. SERVICES OVERVIEW HERO */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20 overflow-hidden">
        <svg
          viewBox="0 0 1200 240"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-50"
          aria-hidden="true"
        >
          <path
            d="M -40 190 C 260 90, 520 210, 820 110 C 1000 50, 1120 95, 1240 60"
            fill="none"
            stroke="#E2E8F4"
            strokeWidth="1.5"
          />
          {!shouldReduceMotion && (
            <motion.path
              d="M -40 190 C 260 90, 520 210, 820 110 C 1000 50, 1120 95, 1240 60"
              fill="none"
              stroke="#356DFF"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="85 500"
              animate={{ strokeDashoffset: [585, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </svg>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
        >
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#356DFF]">
            TELCA MARKETING SERVICES · ALL CAPABILITIES
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101B35] tracking-tight max-w-4xl mx-auto leading-tight text-balance">
            Full-Spectrum Performance Marketing, Creative &amp; Automation Services.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed text-balance">
            Led by our core Meta Ads and Google Ads specializations, explore every service Telca Marketing delivers—from multi-channel paid acquisition and creative production to retention, web development, and AI workflow automation.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#101B35] hover:bg-[#356DFF] rounded-xl transition-colors shadow-md cursor-pointer whitespace-nowrap"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenAudit && (
              <button
                type="button"
                onClick={onOpenAudit}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Request Free Audit</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onNavigate('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#356DFF] bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Compare Pricing &amp; Bundles</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. ALL 13 INDIVIDUAL SERVICES INTERACTIVE DIRECTORY */}
      <AllServicesDirectorySection
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 3. CORE PRACTICE AREAS (DEEP-DIVE DISCIPLINES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <AnimatedSection className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#356DFF]">
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>5 DEDICATED PRACTICE AREAS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#101B35] tracking-tight">
            Explore Practice Area Methodologies
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Inspect the step-by-step workflow, deliverables, platforms, and FAQs behind each Telca Marketing discipline.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area) => (
            <motion.div
              key={area.id}
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-[#101B35] overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101B35]/80 via-[#101B35]/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-[11px] font-bold uppercase tracking-wider text-blue-200">
                    {area.badge}
                  </div>
                </div>

                <div className="p-6 space-y-2.5">
                  <h3 className="text-lg font-black text-[#101B35] leading-snug">
                    {area.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {area.shortDescription}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate(area.pageId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#356DFF] hover:text-[#101B35] transition-colors cursor-pointer"
                >
                  <span>Explore Discipline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenConsultation(area.title)}
                  className="text-xs font-semibold text-slate-600 hover:text-[#101B35] transition-colors cursor-pointer"
                >
                  Book Call
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-[#101B35] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Integrated Growth Strategy</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Not Sure Which Combination Fits Your Goals?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Speak directly with our senior strategists or configure a custom multi-service package to save 10% on monthly management retainers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                onNavigate('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              View Pricing &amp; Bundles
            </button>
            <button
              type="button"
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#356DFF] hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-lg cursor-pointer whitespace-nowrap"
            >
              <span>Let&apos;s Talk Strategy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

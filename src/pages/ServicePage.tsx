import React, { useState } from 'react';
import { PageId, ServiceDetail } from '../types';
import { servicesData } from '../data/servicesData';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { AllServicesDirectorySection } from '../components/AllServicesDirectorySection';
import { MEDIA_ASSETS, resolveMediaUrl } from '../utils/mediaAssets';
import { 
  ArrowRight, 
  ChevronDown, 
  AlertCircle, 
  Check,
  Layers
} from 'lucide-react';

interface ServicePageProps {
  service: ServiceDetail;
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (serviceName?: string) => void;
  onOpenAudit?: () => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({
  service,
  onNavigate,
  onOpenConsultation,
  onOpenAudit
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const practiceList = Object.values(servicesData);

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">

      {/* PRACTICE AREA & ALL SERVICES SWITCHER BAR */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#101B35] text-white hover:bg-[#356DFF] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Services (13)</span>
            </button>
            {practiceList.map((area) => {
              const isCurrent = area.id === service.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => {
                    onNavigate(area.pageId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isCurrent
                      ? 'bg-blue-50 text-[#356DFF] border border-blue-200 font-bold'
                      : 'text-slate-600 hover:text-[#101B35] hover:bg-slate-100'
                  }`}
                >
                  {area.title}
                </button>
              );
            })}
          </div>
          <a
            href="#all-services-catalog"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('all-services-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#356DFF] hover:underline whitespace-nowrap"
          >
            Jump to Full 13-Service Catalog &darr;
          </a>
        </div>
      </div>

      {/* 1. HERO SECTION & INTRODUCTION */}
      <section className="relative pt-8 sm:pt-12 lg:pt-14">
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              {/* Unboxed Metadata / Service Category */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span className="text-[#356DFF]">{service.badge}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Dedicated Practice Area</span>
              </div>

              {/* Service Specific Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101B35] tracking-tight leading-tight text-balance">
                {service.heroHeadline}
              </h1>

              {/* Simple Introduction */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
                {service.heroSubheadline}
              </p>

              {/* Short summary note */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-700 leading-relaxed">
                <strong>Core Objective:</strong> {service.shortDescription}
              </div>

              {/* Primary Consultation Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onOpenConsultation(service.title)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#101B35] hover:bg-[#356DFF] rounded-xl transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenAudit && (
                  <button
                    onClick={onOpenAudit}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-electric-600 bg-white hover:bg-electric-50 border border-electric-200 rounded-xl transition-colors whitespace-nowrap shadow-xs"
                  >
                    <span>Request Audit</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onNavigate('pricing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors whitespace-nowrap"
                >
                  <span>View Pricing</span>
                </button>
              </div>

            </div>

            {/* Service Visual Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
                <img
                  src={resolveMediaUrl(service.image, MEDIA_ASSETS.servicePerformanceAds)}
                  alt={service.title}
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101B35]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-300">
                    Telca Execution Standard
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    Strategic, Transparent &amp; Measurable
                  </div>
                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </section>

      {/* 2. BUSINESS PROBLEMS THIS SERVICE SOLVES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8">
          
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Challenges We Eliminate
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B35] tracking-tight">
              Business Problems This Service Solves
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We diagnose the root obstacles that prevent businesses from achieving consistent results in this channel.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.problemsSolved.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full p-6 rounded-2xl bg-[#F6F8FC] border border-slate-200/80 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#101B35]">
                      {item.problem}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-10">
                    {item.explanation}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </AnimatedSection>
      </section>

      {/* 3. WHAT THE SERVICE INCLUDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          
          <AnimatedSection className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Comprehensive Deliverables
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B35] tracking-tight">
              What The Service Includes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A transparent breakdown of everything our agency handles on your behalf.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.whatIsIncluded.map((included, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#356DFF]">0{idx + 1}.</span>
                    </div>
                    <h3 className="text-base font-bold text-[#101B35]">
                      {included.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {included.description}
                    </p>
                    
                    <ul className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                      {included.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#356DFF] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Full-Service Execution
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Campaign objectives banner if paid advertising */}
          {service.campaignObjectives && (
            <AnimatedSection className="bg-[#101B35] text-white rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
                Core Campaign Objectives
              </div>
              <h3 className="text-lg font-bold">
                Planned, Monitored &amp; Optimized Around Business Milestones
              </h3>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                We align campaigns with exact business goals—not speculative guarantees. Every campaign is tracked against specific objective parameters:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {service.campaignObjectives.map((obj, oIdx) => (
                  <div key={oIdx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <span className="text-white font-medium">{obj}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* After Service Details CTAs */}
          <AnimatedSection className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation(service.title)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#101B35] hover:bg-[#356DFF] rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Get This Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenConsultation(service.title)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-sm"
            >
              <span>Discuss Your Project</span>
            </button>
          </AnimatedSection>

        </div>
      </section>

      {/* 4. PLATFORMS & TOOLS USED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8">
          
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Technology &amp; Tool Ecosystem
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B35] tracking-tight">
              Platforms &amp; Tools We Deploy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We leverage enterprise platforms to ensure accurate targeting, tracking precision, and high-uptime automation.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.platformsAndTools.map((tool, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full p-5 rounded-xl border border-slate-200/80 bg-[#F6F8FC] space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#356DFF]">
                    {tool.category}
                  </div>
                  <div className="text-sm font-bold text-[#101B35]">
                    {tool.name}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </AnimatedSection>
      </section>

      {/* 5. OUR PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          
          <AnimatedSection className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Systematic Execution
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B35] tracking-tight">
              Our Step-by-Step Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              How we take your project from discovery through launch and continuous optimization.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-3">
                  <span className="text-2xl font-black text-[#356DFF]">{step.step}</span>
                  <h3 className="text-base font-bold text-[#101B35]">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* 6. EXPECTED BUSINESS BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-[#101B35] text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Value Return
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Expected Business Benefits
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tangible advantages your company gains by engaging Telca Marketing for this discipline.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.businessBenefits.map((benefit, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#356DFF]/20 text-[#356DFF] flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white">{benefit.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{benefit.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </AnimatedSection>
      </section>

      {/* 7. RELEVANT PORTFOLIO / CASE STUDY PLACEHOLDERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
                Sample Frameworks
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B35] tracking-tight mt-1">
                Relevant Case Study Placeholders
              </h2>
            </div>
            <button
              onClick={() => {
                onNavigate('work');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-[#356DFF] hover:text-[#101B35] transition-colors"
            >
              Browse Full Portfolio &rarr;
            </button>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.portfolioPlaceholders.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {item.industry}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#101B35]">
                    {item.title}
                  </h3>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div><strong>Strategic Approach:</strong> {item.strategy}</div>
                    <div><strong>Measured Milestone:</strong> {item.metrics}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* 7.5. NEAR PRICING & PACKAGE INFORMATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Structured Package Tiers
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#101B35]">
              Package Information for {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every practice area features Starter, Growth, Scale, and Custom tiers designed to scale as your customer volume grows. Ad spend remains 100% under your direct account ownership.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                onNavigate('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              View All Pricing
            </button>
            <button
              onClick={() => onOpenConsultation(service.title)}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Choose Your Package
            </button>
          </div>
        </AnimatedSection>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-8">
          
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Service FAQs
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B35] tracking-tight">
              Common Questions About This Service
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
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
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </AnimatedSection>
      </section>

      {/* 8.5. COMPLETE CATALOG OF ALL 13 TELCA SERVICES */}
      <AllServicesDirectorySection
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        compactHeader
      />

      {/* 9. BOTTOM CONVERSION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-gradient-to-br from-[#101B35] to-[#1e2e56] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Grow Your Business?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Let&apos;s build a marketing strategy designed around your business goals.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation(service.title)}
            className="inline-flex items-center gap-2 px-7 py-4 bg-[#356DFF] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap shadow-lg hover:shadow-xl shrink-0"
          >
            <span>Let&apos;s Talk About Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </AnimatedSection>
      </section>

    </div>
  );
};

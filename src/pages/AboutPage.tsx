import React from 'react';
import { PageId } from '../types';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { ArrowRight, Globe, Lightbulb, Compass, Workflow } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenConsultation
}) => {
  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20">
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span className="text-[#356DFF]">About Telca Marketing</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>International Growth Partner</span>
              </div>

              {/* Exact Specified Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101B35] tracking-tight leading-tight text-balance">
                Your Growth Is Our Focus.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
                Telca Marketing is a premium performance marketing and digital growth agency built to serve forward-thinking businesses across the United States, United Kingdom, United Arab Emirates, Australia, and international markets.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Our Brand Philosophy
                </div>
                <div className="text-lg font-bold text-[#101B35]">
                  Your Business. Your Goals. Our Strategy.
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We exist to bridge the gap between creative visual execution and rigorous quantitative performance.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#101B35] hover:bg-[#356DFF] rounded-xl transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    onNavigate('work');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors whitespace-nowrap"
                >
                  <span>Explore Our Work</span>
                </button>
              </div>

            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
                <img
                  src="/src/assets/images/about_agency_strategy_1793433704801.jpg"
                  alt="Telca Marketing agency strategists collaborating"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101B35]/80 via-[#101B35]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-300">
                    International Standards
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    Data-Driven Strategy &amp; Automation
                  </div>
                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </section>

      {/* 2. WHO TELCA MARKETING IS & OUR MISSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 lg:p-16 shadow-sm space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
                Who We Are
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B35] tracking-tight">
                A Strategic Growth Partner for Ambitious Businesses
              </h2>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  Telca Marketing was founded to solve a pervasive frustration in the digital industry: agencies that either focus exclusively on flashy visuals with zero return on investment, or deliver cold technical ad campaigns with no brand soul.
                </p>
                <p>
                  We operate as a true extension of our clients&apos; leadership teams. Rather than selling cookie-cutter retainers, we design tailored marketing engines that directly address where your business is today and where you need it to be next quarter.
                </p>
              </div>
            </div>

            {/* Mission Box */}
            <div className="p-8 rounded-2xl bg-[#101B35] text-white space-y-4 shadow-lg">
              <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
                Our Brand Mission
              </div>
              <p className="text-base sm:text-lg font-medium leading-relaxed italic text-slate-200">
                &ldquo;We help businesses attract the right audience, generate quality leads, increase sales and improve their marketing operations through strategic advertising, creative content and intelligent automation.&rdquo;
              </p>
              <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
                Brand Tagline: <span className="text-white font-semibold">Turning Marketing Into Measurable Growth.</span>
              </div>
            </div>
          </div>

        </AnimatedSection>
      </section>

      {/* 3. HOW WE COMBINE STRATEGY, CREATIVITY AND TECHNOLOGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          
          <AnimatedSection className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              The Three Pillars
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] tracking-tight">
              Strategy. Creativity. Technology.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              True, sustainable growth happens at the intersection of three disciplines. Here is how we unite them:
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#356DFF] flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#101B35]">1. Strategy</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Before launching a single campaign or spending a single dollar, we map your business unit economics, audience psychology, competitive landscapes, and conversion goals.
                </p>
                <ul className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                  <li>• Customer acquisition cost planning</li>
                  <li>• Multi-market territory mapping</li>
                  <li>• Full-funnel customer journey design</li>
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#795BFF] flex items-center justify-center">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#101B35]">2. Creativity</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Great strategy falls flat if your visuals fail to stop users in their tracks. We craft direct-response video hooks, thumb-stopping graphics, and persuasive copywriting.
                </p>
                <ul className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                  <li>• Direct-response commercial ad video</li>
                  <li>• High-conversion carousel designs</li>
                  <li>• Cohesive brand aesthetic standards</li>
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#356DFF] flex items-center justify-center">
                  <Workflow className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#101B35]">3. Technology &amp; Automation</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Traffic without systems produces chaos. We build intelligent CRM pipelines, automated lead routing via n8n, and retention sequences so no opportunity is dropped.
                </p>
                <ul className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                  <li>• Sub-60-second speed-to-lead follow-up</li>
                  <li>• n8n cross-platform automation</li>
                  <li>• First-party tracking &amp; attribution</li>
                </ul>
              </div>
            </StaggerItem>

          </StaggerContainer>

        </div>
      </section>

      {/* 4. OUR VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 lg:p-16 shadow-sm space-y-10">
          
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Guiding Principles
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B35] tracking-tight">
              Our Core Agency Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              These six non-negotiable principles govern every client relationship, campaign audit, and line of copy we write.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <StaggerItem>
              <div className="h-full p-6 rounded-2xl bg-[#F6F8FC] border border-slate-200/80 space-y-2">
                <h3 className="text-base font-bold text-[#101B35]">Radical Transparency</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You retain complete access to all ad accounts and raw data. If a test doesn&apos;t work, we communicate why immediately and present the corrective action.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full p-6 rounded-2xl bg-[#F6F8FC] border border-slate-200/80 space-y-2">
                <h3 className="text-base font-bold text-[#101B35]">No Guaranteed Sales Myths</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We never make unethical promises about overnight riches. We guarantee disciplined testing, clean tracking, and continuous data-informed optimization.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full p-6 rounded-2xl bg-[#F6F8FC] border border-slate-200/80 space-y-2">
                <h3 className="text-base font-bold text-[#101B35]">Long-Term Partnership</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We seek lasting commercial relationships where we can deeply understand your products, your team, and your evolving market landscape.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full p-6 rounded-2xl bg-[#F6F8FC] border border-slate-200/80 space-y-2">
                <h3 className="text-base font-bold text-[#101B35]">Simplicity Over Jargon</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We explain marketing in plain English. You will never need a dictionary to understand our status updates or strategy briefs.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full p-6 rounded-2xl bg-[#F6F8FC] border border-slate-200/80 space-y-2">
                <h3 className="text-base font-bold text-[#101B35]">Capital Stewardship</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We treat your advertising budget with the same care and discipline we would our own, eliminating wasteful clicks and untested broad matches.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full p-6 rounded-2xl bg-[#F6F8FC] border border-slate-200/80 space-y-2">
                <h3 className="text-base font-bold text-[#101B35]">Continuous Innovation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  From emerging AI conversational advertising to automated n8n workflows, we stay ahead of platform shifts so your business stays competitive.
                </p>
              </div>
            </StaggerItem>

          </StaggerContainer>

        </AnimatedSection>
      </section>

      {/* 5. INTERNATIONAL SCOPE & CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-[#101B35] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#356DFF]">
              <Globe className="w-4 h-4" />
              <span>Global Client Collaboration</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              Ready to Partner With Telca Marketing?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We collaborate seamlessly with business leadership across US, UK, UAE, Australian, and international time zones.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#356DFF] hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shadow-md shrink-0"
          >
            <span>Book a Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </AnimatedSection>
      </section>

    </div>
  );
};

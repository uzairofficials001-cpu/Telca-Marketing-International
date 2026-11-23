import React, { useState } from 'react';
import { PageId } from '../types';
import { servicesData } from '../data/servicesData';
import { caseStudiesData } from '../data/caseStudiesData';
import { homepageFaqs } from '../data/faqData';
import { motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { CoreSpecializationsSection } from '../components/CoreSpecializationsSection';
import { IndustrySolutionsSection } from '../components/IndustrySolutionsSection';
import { PerformanceDataLineMotion, ConversionFunnelMotion, WorkflowConnectedNodesMotion } from '../components/MotionGraphics';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ChevronDown, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Share2, 
  Mail, 
  Cpu, 
  Target, 
  Sliders, 
  Eye, 
  LineChart 
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (defaultService?: string) => void;
  onOpenAudit?: () => void;
  onSelectCaseStudy: (caseStudyId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenAudit,
  onSelectCaseStudy
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const serviceIconMap: Record<string, React.ReactNode> = {
    'paid-advertising': <TrendingUp className="w-5 h-5 text-[#356DFF]" />,
    'creative-production': <Sparkles className="w-5 h-5 text-[#795BFF]" />,
    'social-media': <Share2 className="w-5 h-5 text-[#356DFF]" />,
    'email-marketing': <Mail className="w-5 h-5 text-[#795BFF]" />,
    'ai-automation': <Cpu className="w-5 h-5 text-[#356DFF]" />
  };

  const servicesList = Object.values(servicesData);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">

      {/* =========================================================================
          SECTION 1: HERO SECTION
          ========================================================================= */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 overflow-hidden">
        {/* Subtle geometric background backdrop */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              
              {/* Unboxed Metadata / Market Scope */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span className="text-[#356DFF]">Premium Performance &amp; Growth Agency</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>US · UK · UAE · Australia</span>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#101B35] tracking-tight leading-[1.1] text-balance">
                Turn Your Marketing Into Measurable Growth.
              </h1>

              {/* Exact Requested Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl text-balance">
                We help businesses attract the right audience, generate quality leads and increase sales through strategic advertising, compelling creative content and intelligent automation.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onOpenConsultation()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#101B35] hover:bg-[#356DFF] rounded-xl transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenAudit && (
                  <button
                    onClick={onOpenAudit}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-electric-600 bg-electric-50 hover:bg-electric-100 border border-electric-200 rounded-xl transition-colors whitespace-nowrap"
                  >
                    <Sparkles className="w-4 h-4 text-electric-600" />
                    <span>Free Business Audit</span>
                  </button>
                )}

                <a
                  href="#services-overview"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors whitespace-nowrap"
                >
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </a>
              </div>

              {/* Trust & Discipline Anchor */}
              <div className="pt-4 border-t border-slate-200/60 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#356DFF]" />
                  <span>No long lock-in contracts</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#356DFF]" />
                  <span>100% account ownership</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#356DFF]" />
                  <span>Transparent weekly reporting</span>
                </span>
              </div>

            </motion.div>

            {/* Right Column: High-Fidelity Hero Visual & Growth Command Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl bg-white">
                <img
                  src="/src/assets/images/hero_marketing_growth_1793368523521.jpg"
                  alt="Telca Marketing international growth command center"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101B35]/90 via-[#101B35]/30 to-transparent" />

                {/* Structured Performance Snapshot inside Hero */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-300 mb-1">
                    Integrated Growth Infrastructure
                  </div>
                  <div className="text-sm font-bold text-white mb-3">
                    Multi-Market Campaign &amp; Workflow Execution
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/20 text-center">
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                      <div className="text-[11px] text-slate-300">Strategy</div>
                      <div className="text-xs font-bold text-white mt-0.5">Full-Funnel</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                      <div className="text-[11px] text-slate-300">Channels</div>
                      <div className="text-xs font-bold text-white mt-0.5">Omni-Platform</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                      <div className="text-[11px] text-slate-300">Optimization</div>
                      <div className="text-xs font-bold text-white mt-0.5">Continuous</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Attribution Feature */}
              <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-lg text-xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#356DFF]">
                  <LineChart className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#101B35]">Real Measurable Metrics</div>
                  <div className="text-slate-500 text-[11px]">Clean data over speculative promises</div>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1.5: WHAT WE SPECIALIZE IN (META ADS & GOOGLE ADS CORE)
          ========================================================================= */}
      <CoreSpecializationsSection onNavigate={onNavigate} />

      {/* =========================================================================
          SECTION 2: INTRODUCTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 lg:p-16 shadow-sm">
          <div className="max-w-3xl space-y-6">
            
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Our Growth Philosophy
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] tracking-tight leading-tight text-balance">
              Your Business Deserves Marketing That Works.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              <p>
                Marketing should do more than make your business visible. It should help you reach the right people, build trust and turn opportunities into customers.
              </p>
              <p>
                At Telca Marketing, we combine strategy, creativity and technology to help businesses make better marketing decisions and achieve meaningful growth.
              </p>
            </div>

            {/* Core Philosophy Banner */}
            <div className="pt-4">
              <div className="p-6 rounded-2xl bg-[#F6F8FC] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    The Telca Principle
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#101B35] tracking-tight mt-1">
                    Your Business. Your Goals. Our Strategy.
                  </div>
                </div>
                <div className="text-xs text-slate-500 max-w-xs">
                  We are not an advertising vendor selling isolated clicks. We act as a dedicated growth partner invested in your long-term success.
                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </section>

      {/* =========================================================================
          SECTION 2.5: PERFORMANCE INTELLIGENCE MOTION GRAPHICS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Performance Intelligence &amp; Attribution
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B35] tracking-tight">
              Data-Backed Campaign &amp; Workflow Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We monitor campaign economics in real-time, engineering disciplined full-funnel efficiency across every ad dollar spent.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <PerformanceDataLineMotion />
            </div>
            <div className="lg:col-span-6">
              <ConversionFunnelMotion />
            </div>
          </div>

          <WorkflowConnectedNodesMotion />
        </AnimatedSection>
      </section>

      {/* =========================================================================
          SECTION 3: SERVICES OVERVIEW
          ========================================================================= */}
      <section id="services-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="space-y-12">
          
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
                Comprehensive Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] tracking-tight">
                Everything You Need to Grow Your Business.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Five integrated pillars designed to work independently or together as a complete client acquisition and retention engine.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <button
                onClick={() => {
                  onNavigate('pricing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101B35] hover:text-[#356DFF] bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>View Pricing &amp; Bundles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenConsultation()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#356DFF] hover:text-[#101B35] transition-colors whitespace-nowrap"
              >
                <span>Discuss Services</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </AnimatedSection>

          {/* 5 Premium Service Cards with Staggered Entrance */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, idx) => (
              <StaggerItem
                key={service.id}
                className={idx === 0 ? 'lg:col-span-2' : ''}
              >
                <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div className="space-y-4">
                    
                    {/* Top Bar inside card */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                        {serviceIconMap[service.id]}
                      </div>
                      <span className="text-xs font-semibold text-slate-400">
                        0{idx + 1}.
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-xl font-bold text-[#101B35] group-hover:text-[#356DFF] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Highlight deliverables */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Key Capabilities:
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {service.whatIsIncluded.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#356DFF] shrink-0 mt-1.5" />
                            <span className="font-medium text-slate-800">{item.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Card Action */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        onNavigate(service.pageId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#101B35] group-hover:text-[#356DFF] transition-colors"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => onOpenConsultation(service.title)}
                      className="text-[11px] text-slate-500 hover:text-slate-900 font-medium"
                    >
                      Inquire &rarr;
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: VALUE PROPOSITION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-[#101B35] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden">
          
          <div className="max-w-3xl space-y-4 mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Strategic Alignment
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-balance">
              More Than Marketing. A Partner in Your Growth.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We align advertising, creative production, social media, email marketing and automation to work together as a single disciplined system.
            </p>
          </div>

          {/* 5 Value Pillars with Staggered Entrance */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <StaggerItem>
              <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[#356DFF]/20 text-[#356DFF] flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Business-First Strategies</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We begin with your unit economics, profit margins, and sales capacity before designing campaigns. We prioritize profitability over vanity numbers.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[#795BFF]/20 text-[#795BFF] flex items-center justify-center">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Customized Marketing Solutions</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  No two businesses have identical hurdles. We build tailor-made playbooks rather than copying generic formulas across clients.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[#356DFF]/20 text-[#356DFF] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Creative &amp; Analytical Thinking</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Compelling visuals stop the scroll, while analytical data guides where capital should flow. We treat both sides with equal rigor.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[#795BFF]/20 text-[#795BFF] flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Transparent Communication</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Zero black-box mystery. You have direct access to your ad managers, weekly progress notes, and honest assessments of what is working.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem className="md:col-span-2 lg:col-span-1">
              <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[#356DFF]/20 text-[#356DFF] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Continuous Optimization</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Launching an ad is just step one. True performance comes from relentless weekly testing, creative rotation, and bid calibration.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem className="md:col-span-2 lg:col-span-1">
              <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-[#356DFF]/20 to-[#795BFF]/20 border border-[#356DFF]/30 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-300">
                    Ready to collaborate?
                  </div>
                  <div className="text-base font-bold text-white mt-1">
                    Schedule an exploratory session with our strategists.
                  </div>
                </div>
                <button
                  onClick={() => onOpenConsultation()}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#356DFF] hover:bg-blue-600 px-4 py-2.5 rounded-lg transition-colors w-fit"
                >
                  <span>Book Discovery Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </StaggerItem>

          </StaggerContainer>

        </AnimatedSection>
      </section>

      {/* =========================================================================
          INDUSTRY SOLUTIONS (Interactive Recommendation by Sector)
          ========================================================================= */}
      <IndustrySolutionsSection onOpenConsultation={onOpenConsultation} />

      {/* =========================================================================
          SECTION 5: OUR PROCESS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <AnimatedSection className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Methodology
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] tracking-tight">
              A Clear Path From Strategy to Growth.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We operate with a structured four-stage framework to ensure every initiative is deliberate, testable, and aligned with your business goals.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm relative space-y-4">
                <div className="text-2xl font-black text-[#356DFF]">01</div>
                <h3 className="text-lg font-bold text-[#101B35] uppercase tracking-wide">
                  DISCOVER
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  &ldquo;We understand your business, audience, challenges and goals.&rdquo;
                </p>
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                  Audience persona audit, customer economics review &amp; tracking verification.
                </div>
              </div>
            </StaggerItem>

            {/* Step 2 */}
            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm relative space-y-4">
                <div className="text-2xl font-black text-[#795BFF]">02</div>
                <h3 className="text-lg font-bold text-[#101B35] uppercase tracking-wide">
                  STRATEGIZE
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  &ldquo;We develop a customized marketing strategy based on your business objectives.&rdquo;
                </p>
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                  Channel roadmap, budget allocations, creative hooks &amp; conversion architecture.
                </div>
              </div>
            </StaggerItem>

            {/* Step 3 */}
            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm relative space-y-4">
                <div className="text-2xl font-black text-[#356DFF]">03</div>
                <h3 className="text-lg font-bold text-[#101B35] uppercase tracking-wide">
                  EXECUTE
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  &ldquo;We launch campaigns, create content and implement the right systems.&rdquo;
                </p>
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                  Production of ad creatives, tracking pixels, automated sequences &amp; campaign setup.
                </div>
              </div>
            </StaggerItem>

            {/* Step 4 */}
            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm relative space-y-4">
                <div className="text-2xl font-black text-[#795BFF]">04</div>
                <h3 className="text-lg font-bold text-[#101B35] uppercase tracking-wide">
                  OPTIMIZE
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  &ldquo;We monitor performance, identify opportunities and continuously improve.&rdquo;
                </p>
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                  Data attribution review, creative rotation, bid adjustment &amp; monthly reporting.
                </div>
              </div>
            </StaggerItem>

          </StaggerContainer>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CASE STUDIES / RESULTS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
                Portfolio &amp; Impact
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] tracking-tight">
                The Work Behind the Results.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                A transparent look at our campaign frameworks, strategies, and execution models. (Clearly labeled conceptual project frameworks per agency policy).
              </p>
            </div>

            <button
              onClick={() => {
                onNavigate('work');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#356DFF] hover:text-[#101B35] transition-colors whitespace-nowrap self-start md:self-auto"
            >
              <span>View All Portfolio Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </AnimatedSection>

          {/* Case Studies Cards with Staggered Entrance */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudiesData.slice(0, 3).map((study) => (
              <StaggerItem key={study.id}>
                <div
                  onClick={() => onSelectCaseStudy(study.id)}
                  className="h-full bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer group"
                >
                  {/* Visual */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#101B35]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded backdrop-blur-sm">
                      {study.isConceptWork ? 'Concept Work' : 'Case Study'}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/95 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded shadow-sm">
                      {study.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-[11px] text-slate-500 font-medium">
                        Industry: <span className="text-slate-800">{study.industry}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#101B35] group-hover:text-[#356DFF] transition-colors leading-snug">
                        {study.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {study.strategy}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Target Outcome:
                      </div>
                      <div className="text-xs font-semibold text-slate-800">
                        {study.measurableResult}
                      </div>
                    </div>
                  </div>

                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: WHY CHOOSE TELCA MARKETING?
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <AnimatedSection className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Agency Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] tracking-tight">
              Built Around Your Business Goals.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We structure our workflows to eliminate friction, respect your capital, and provide clarity at every turn.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm space-y-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#356DFF] flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-base font-bold text-[#101B35]">Business-First Approach</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We anchor campaigns to customer acquisition costs, average order value, and lifetime margins—not empty impressions.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm space-y-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#795BFF] flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-base font-bold text-[#101B35]">Customized Strategies</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We never use rigid templates. Every campaign structure is engineered around your target geographic markets and sales capacity.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm space-y-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#356DFF] flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-base font-bold text-[#101B35]">Creative &amp; Data-Driven Execution</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Direct-response copywriting and modern design backed by continuous pixel attribution and systematic A/B iteration.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm space-y-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#795BFF] flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h3 className="text-base font-bold text-[#101B35]">Transparent Communication</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Clear reporting, direct communication with your dedicated account lead, and honest discussions about channel performance.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm space-y-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#356DFF] flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <h3 className="text-base font-bold text-[#101B35]">Continuous Improvement</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Digital marketing is never &ldquo;set and forget.&rdquo; We audit bids, rotate creatives, and refine audiences weekly.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm space-y-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#795BFF] flex items-center justify-center font-bold text-sm">
                  6
                </div>
                <h3 className="text-base font-bold text-[#101B35]">Integrated Marketing Solutions</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Paid ads, creative assets, social proof, email retention, and CRM automations synchronized in one seamless growth pipeline.
                </p>
              </div>
            </StaggerItem>

          </StaggerContainer>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: TESTIMONIALS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
                Client Partnerships
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B35] tracking-tight mt-1">
                What Our Clients Say.
              </h2>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Authentic Feedback Commitment
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-4">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Sample Client Feedback Placeholder
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;Telca Marketing helped us replace random boosted posts with a disciplined Meta and Google Ads strategy. Their reporting is refreshingly straightforward and transparent.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-500">
                <span className="font-semibold text-slate-900">E-Commerce Brand Director</span> · UK Market Partner
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-4">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Sample Client Feedback Placeholder
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;The n8n CRM automation they implemented saves our sales team over 15 hours each week. Inquiries now receive immediate follow-ups within minutes.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-500">
                <span className="font-semibold text-slate-900">Operations Lead</span> · B2B Advisory, Dubai
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-4">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Sample Client Feedback Placeholder
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;Their creative team actually understands direct-response video hooks. We saw a noticeable increase in click-through rates from their short-form video batch.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-500">
                <span className="font-semibold text-slate-900">Founder &amp; CEO</span> · Consumer Tech, US
              </div>
            </div>

          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-600 flex items-center justify-between">
            <span>
              <strong>Agency Standard:</strong> We publish genuine, verified partner reviews upon completion of formal authorization and campaign completion.
            </span>
            <button
              onClick={() => onOpenConsultation()}
              className="text-[#356DFF] font-semibold hover:underline shrink-0 ml-4"
            >
              Start Your Project &rarr;
            </button>
          </div>

        </AnimatedSection>
      </section>

      {/* =========================================================================
          SECTION 9: FAQ (Exact 10 Specified Questions)
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-10">
          
          <div className="text-center space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] tracking-tight">
              Clear Answers to Common Questions.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Everything you need to know about how we work, pricing philosophies, and international collaboration.
            </p>
          </div>

          <div className="space-y-3">
            {homepageFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-sm transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-[#101B35]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#356DFF]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </AnimatedSection>
      </section>

      {/* =========================================================================
          SECTION 10: FINAL CTA
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-gradient-to-br from-[#101B35] via-[#101B35] to-[#1d2d54] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          
          {/* Subtle glow circle */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#356DFF]/20 blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-6 relative z-10">
            
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
              Begin Your Journey
            </div>

            {/* Exact Requested Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Grow Your Business?
            </h2>

            {/* Exact Requested Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Every business has different goals. Let&apos;s understand yours and explore how the right marketing strategy can help you move forward.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenConsultation()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-[#356DFF] hover:bg-blue-600 rounded-xl transition-colors shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenAudit && (
                <button
                  onClick={onOpenAudit}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-electric-400" />
                  <span>Request Business Audit</span>
                </button>
              )}

              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors whitespace-nowrap"
              >
                <span>Contact Team</span>
              </button>
            </div>

            <div className="pt-4 text-xs text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>✓ Free 30-Minute Discovery Session</span>
              <span>✓ No Obligation</span>
              <span>✓ Direct Strategist Conversation</span>
            </div>

          </div>

        </AnimatedSection>
      </section>

    </div>
  );
};

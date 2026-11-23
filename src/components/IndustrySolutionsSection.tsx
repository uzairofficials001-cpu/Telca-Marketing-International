import React, { useState } from 'react';
import { industrySolutionsData, IndustrySolution } from '../data/industrySolutionsData';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';
import { trackContentView } from '../utils/analytics';
import { 
  Utensils, 
  Stethoscope, 
  Building2, 
  ShoppingBag, 
  Laptop, 
  GraduationCap, 
  Sparkles, 
  Briefcase, 
  Plane,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  Compass,
  Layers,
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface IndustrySolutionsSectionProps {
  onOpenConsultation: (serviceWithTier?: string) => void;
  className?: string;
}

export const IndustrySolutionsSection: React.FC<IndustrySolutionsSectionProps> = ({
  onOpenConsultation,
  className = ''
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustrySolution | null>(null);

  const getIndustryIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className={className} />;
      case 'Stethoscope':
        return <Stethoscope className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'ShoppingBag':
        return <ShoppingBag className={className} />;
      case 'Laptop':
        return <Laptop className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'Plane':
        return <Plane className={className} />;
      default:
        return <Compass className={className} />;
    }
  };

  const btnBase = "transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#356DFF] focus:outline-none";

  return (
    <section id="industry-solutions-section" className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-28 ${className}`}>
      
      {/* Header */}
      <AnimatedSection className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#356DFF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          <Compass className="w-3.5 h-3.5" />
          <span>Tailored By Industry</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#101B35] tracking-tight">
          Solutions Engineered for Your Sector
        </h2>
        
        {/* Exact Subtitle Required */}
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Every business has different marketing needs. Select your industry to discover which marketing strategies and services can help your business attract customers, increase visibility and grow.
        </p>
      </AnimatedSection>

      {/* 9 Industry Clickable Cards Grid */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {industrySolutionsData.map((industry) => (
          <StaggerItem key={industry.id}>
            <div
              onClick={() => {
                setSelectedIndustry(industry);
                trackContentView('Industry Solution', industry.name, { industryId: industry.id });
              }}
              className="group p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-[#356DFF]/60 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden"
            >
              {/* Top Accent Gradient on Hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#356DFF] to-[#795BFF] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#356DFF] group-hover:bg-[#356DFF] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                    {getIndustryIcon(industry.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#356DFF] flex items-center gap-1 transition-colors">
                    <span>View Plan</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-black text-[#101B35] group-hover:text-[#356DFF] transition-colors leading-snug">
                    {industry.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {industry.tagline}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                  <strong className="text-slate-600 block mb-0.5">Includes:</strong>
                  <span className="line-clamp-2">{industry.examples}</span>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#101B35] group-hover:text-[#356DFF]">
                <span>Explore Marketing Strategy</span>
                <ArrowRight className="w-4 h-4 text-[#356DFF] transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* =========================================================================
          INTERACTIVE DEDICATED DETAIL MODAL / PANEL
          ========================================================================= */}
      {selectedIndustry && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedIndustry(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIndustry(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close detail modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 pr-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#356DFF] flex items-center justify-center shrink-0">
                {getIndustryIcon(selectedIndustry.iconName, "w-7 h-7")}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
                  Industry Strategy Blueprint
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#101B35] leading-tight">
                  {selectedIndustry.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedIndustry.examples}
                </p>
              </div>
            </div>

            {/* Marketing Challenges */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2 font-bold text-[#101B35] text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Sector Marketing Challenges:</span>
              </div>
              <p className="leading-relaxed pl-6">
                {selectedIndustry.marketingChallenges}
              </p>
            </div>

            {/* 1. Primary Recommendations */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#101B35]">
                <TrendingUp className="w-4 h-4 text-[#356DFF]" />
                <span>1. Primary Recommendations (Highest Impact):</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {selectedIndustry.primaryRecommendations.map((service, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-[#101B35]">
                        {service.name}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#356DFF] text-white">
                        Primary
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium pt-0.5">
                      <strong className="text-slate-900 font-bold">Why it works:</strong> {service.whyUseful}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Supporting Services */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Layers className="w-4 h-4 text-[#795BFF]" />
                <span>2. Supporting Services:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedIndustry.supportingServices.map((service, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs"
                  >
                    <span className="font-bold text-slate-900 block">
                      {service.name}
                    </span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      {service.whyUseful}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions with CTA: "Get a Marketing Strategy for My Business" */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400">
                Tailored strategy with transparent international execution.
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedIndustry(null)}
                  className={`px-4 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 ${btnBase}`}
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const industryName = selectedIndustry.name;
                    setSelectedIndustry(null);
                    onOpenConsultation(`Strategy Consultation for ${industryName}`);
                  }}
                  className={`px-6 py-3 bg-[#356DFF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${btnBase}`}
                >
                  <span>Get a Marketing Strategy for My Business</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

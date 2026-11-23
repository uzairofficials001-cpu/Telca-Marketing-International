import React, { useEffect } from 'react';
import { PackageDetail } from '../data/packageDetailsData';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';
import { 
  ArrowLeft, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Layers, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Target,
  FileCheck
} from 'lucide-react';

interface PackageDetailViewProps {
  packageDetail: PackageDetail;
  onBack: () => void;
  onSelectPlan: (payload: PackageDetail['enquiryPayload']) => void;
}

export const PackageDetailView: React.FC<PackageDetailViewProps> = ({
  packageDetail,
  onBack,
  onSelectPlan
}) => {
  // Scroll to top when detail view loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [packageDetail.id]);

  const btnBase = "transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#356DFF] focus:outline-none";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16 overflow-hidden">
      
      {/* =========================================================================
          TOP NAVIGATION & BREADCRUMBS
          ========================================================================= */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#356DFF] bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 px-4 py-2 rounded-xl shadow-xs ${btnBase}`}
        >
          <ArrowLeft className="w-4 h-4 text-[#356DFF]" />
          <span>Back to Pricing</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="hidden sm:inline">Pricing &amp; Packages</span>
          <span className="hidden sm:inline text-slate-300">/</span>
          <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-xs">
            {packageDetail.name}
          </span>
        </div>
      </nav>

      {/* =========================================================================
          HERO OVERVIEW BANNER (Package Name, Price, Main Benefit, Comparison)
          ========================================================================= */}
      <section className="bg-gradient-to-br from-[#101B35] via-[#162447] to-[#1F3365] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden">
        {/* Soft Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#356DFF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#795BFF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              {packageDetail.category}
            </span>
            {packageDetail.badge && (
              <span className="text-xs font-bold uppercase tracking-wider text-purple-200 bg-[#795BFF]/25 px-3 py-1 rounded-full border border-[#795BFF]/30">
                {packageDetail.badge}
              </span>
            )}
            <span className="text-xs font-medium text-slate-300 bg-white/5 px-2.5 py-1 rounded-full">
              {packageDetail.billingType}
            </span>
          </div>

          {/* Package Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight break-words">
            {packageDetail.name}
          </h1>

          {/* One-Line Benefit Description */}
          <p className="text-base sm:text-xl text-slate-200 font-medium leading-relaxed max-w-3xl">
            {packageDetail.oneLineBenefit}
          </p>

          {/* Pricing & Savings Card in Hero */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-white/10">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                Investment
              </span>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {packageDetail.priceDisplay}
                </span>
                <span className="text-xs sm:text-sm text-slate-300">
                  (Ad spend direct to platforms)
                </span>
              </div>
              {packageDetail.priceComparisonSavings.savingsAmount && (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-400/30 mt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{packageDetail.priceComparisonSavings.savingsAmount}</span>
                </div>
              )}
            </div>

            {/* Top Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectPlan(packageDetail.enquiryPayload)}
                className={`px-8 py-4 bg-[#356DFF] hover:bg-blue-600 text-white text-sm font-black rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${btnBase}`}
              >
                <span>Select This Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onBack}
                className={`px-5 py-4 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl border border-white/20 flex items-center justify-center gap-1.5 ${btnBase}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Pricing</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 1: WHAT BUSINESS PROBLEM THIS PACKAGE SOLVES
          ========================================================================= */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#356DFF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Target className="w-3.5 h-3.5" />
            <span>Problem &amp; Solution</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#101B35] tracking-tight">
            What Business Problem This Package Solves
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {packageDetail.problemSolved.summary}
          </p>
        </div>

        {/* Pain points eliminated */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {packageDetail.problemSolved.painPoints.map((point, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700"
            >
              <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                ✕
              </div>
              <span className="leading-relaxed font-medium">{point}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: HOW THE INCLUDED SERVICES WORK TOGETHER (SYNERGY)
          ========================================================================= */}
      <section className="bg-gradient-to-br from-white via-white to-blue-50/40 rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#795BFF] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            <Zap className="w-3.5 h-3.5" />
            <span>Workflow Synergy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#101B35] tracking-tight">
            How the Included Services Work Together
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {packageDetail.synergy.explanation}
          </p>
        </div>

        {/* Step-by-step synergy roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {packageDetail.synergy.steps.map((step, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="text-xs font-black text-[#356DFF] uppercase tracking-wider block">
                  {step.title}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-[#356DFF] to-[#795BFF] rounded-full opacity-30 mt-2" />
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: KEY CUSTOMER BENEFITS
          ========================================================================= */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#356DFF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Commercial Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#101B35] tracking-tight">
            Key Customer Benefits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packageDetail.keyBenefits.map((benefit, bIdx) => (
            <div 
              key={bIdx}
              className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-4"
            >
              <div className="p-2.5 rounded-xl bg-blue-100 text-[#356DFF] shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-[#101B35]">
                  {benefit.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: DETAILED DELIVERABLES AND SERVICE LIMITS
          ========================================================================= */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            <FileCheck className="w-3.5 h-3.5 text-[#356DFF]" />
            <span>Full Scope of Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#101B35] tracking-tight">
            Detailed Deliverables &amp; Service Limits
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Every deliverable included in your monthly management agreement, with zero hidden surprises.
          </p>
        </div>

        {/* Deliverables Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {packageDetail.detailedDeliverables.map((del, dIdx) => (
            <div 
              key={dIdx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/30 border border-blue-100/60 text-xs text-slate-800"
            >
              <Check className="w-4 h-4 text-[#356DFF] shrink-0 mt-0.5" />
              <span className="font-medium leading-relaxed">{del}</span>
            </div>
          ))}
        </div>

        {/* Service Limits & Conditions Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-950 text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Service Limits &amp; Workload Guidelines:</span>
          </div>
          <p className="leading-relaxed text-amber-900 font-medium pl-6">
            {packageDetail.serviceLimits}
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WHO SHOULD CHOOSE THIS PACKAGE
          ========================================================================= */}
      <section className="bg-gradient-to-r from-slate-900 via-[#101B35] to-[#1B294B] rounded-3xl p-6 sm:p-10 text-white shadow-lg space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
            <Users className="w-3.5 h-3.5" />
            <span>Audience Fit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {packageDetail.whoShouldChoose.headline}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {packageDetail.whoShouldChoose.idealStage}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packageDetail.whoShouldChoose.profiles.map((profile, pIdx) => (
            <div 
              key={pIdx}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-[#356DFF] shrink-0 mt-2" />
              <span className="leading-relaxed font-medium">{profile}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: INDIVIDUAL SERVICE PRICE COMPARISON & BUNDLE SAVINGS
          ========================================================================= */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#356DFF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Shield className="w-3.5 h-3.5" />
            <span>Price Comparison &amp; Financial Value</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#101B35] tracking-tight">
            Comparison &amp; Bundle Savings
          </h2>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {packageDetail.priceComparisonSavings.comparisonText}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-200">
            {packageDetail.priceComparisonSavings.savingsAmount && (
              <div className="text-sm font-black text-emerald-700 bg-emerald-100/80 px-3 py-1.5 rounded-lg border border-emerald-200">
                {packageDetail.priceComparisonSavings.savingsAmount}
              </div>
            )}
            <div className="text-xs text-slate-500 font-medium">
              {packageDetail.priceComparisonSavings.note}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL ACTION BAR (Primary CTA: Select This Plan, Secondary CTA: Back to Pricing)
          ========================================================================= */}
      <section className="bg-gradient-to-r from-[#101B35] to-[#1E305C] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready to Begin with {packageDetail.name}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Click below to initiate your enquiry. We will confirm your requirements, review your current channels, and prepare your onboarding roadmap.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          
          {/* Primary CTA: Select This Plan */}
          <button
            type="button"
            onClick={() => onSelectPlan(packageDetail.enquiryPayload)}
            className={`w-full sm:w-auto px-10 py-4 bg-[#356DFF] hover:bg-blue-600 text-white text-sm font-black rounded-xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 ${btnBase}`}
          >
            <span>Select This Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary CTA: Back to Pricing */}
          <button
            type="button"
            onClick={onBack}
            className={`w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl border border-white/20 flex items-center justify-center gap-2 ${btnBase}`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pricing</span>
          </button>

        </div>

        <div className="text-[11px] text-slate-400 pt-2 flex items-center justify-center gap-4 flex-wrap">
          <span>✓ Month-to-month flexibility</span>
          <span>✓ Direct ad spend control</span>
          <span>✓ Clear weekly reporting</span>
        </div>
      </section>

    </div>
  );
};

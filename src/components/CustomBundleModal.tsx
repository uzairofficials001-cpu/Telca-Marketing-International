import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Send, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { getSessionId, trackEvent } from '../utils/analytics';

export interface SelectedServiceItem {
  id: string;
  name: string;
  category: string;
  tier: string;
  price: number | null;
  isOneTime?: boolean;
}

interface CustomBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: SelectedServiceItem[];
  originalMonthlyTotal: number;
  discountPercentage: number;
  monthlyDiscountAmount: number;
  finalMonthlyTotal: number;
  oneTimeTotal: number;
  hasCustomTier: boolean;
  onNavigateToPricing?: () => void;
}

export const CustomBundleModal: React.FC<CustomBundleModalProps> = ({
  isOpen,
  onClose,
  selectedServices,
  originalMonthlyTotal,
  discountPercentage,
  monthlyDiscountAmount,
  finalMonthlyTotal,
  oneTimeTotal,
  hasCustomTier,
  onNavigateToPricing
}) => {
  const [fullName, setFullName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [businessGoals, setBusinessGoals] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setServerError('');
      trackEvent('form_opened', 'Opened Custom Bundle Modal', `${selectedServices.length} services ($${finalMonthlyTotal}/mo)`);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!businessEmail.trim()) {
      errs.businessEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail)) {
      errs.businessEmail = 'Please provide a valid business email';
    }
    if (!companyName.trim()) errs.companyName = 'Company name is required';
    if (!businessGoals.trim()) errs.businessGoals = 'Please describe your business goals';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'custom_bundle',
          fullName: fullName.trim(),
          businessEmail: businessEmail.trim(),
          companyName: companyName.trim(),
          websiteUrl: websiteUrl.trim(),
          selectedServices: selectedServices.map(s => ({
            id: s.id,
            name: s.name,
            tier: s.tier,
            price: s.price,
            billingType: s.isOneTime ? 'one-time' : 'monthly'
          })),
          monthlyTotal: originalMonthlyTotal,
          discountPercentage,
          discountAmount: monthlyDiscountAmount,
          finalPrice: finalMonthlyTotal,
          oneTimeTotal,
          businessGoals: businessGoals.trim(),
          additionalRequirements: additionalRequirements.trim(),
          sessionId: getSessionId()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit custom bundle request');
      }
      const refId = data.referenceId || `TM-BUN-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionRef(refId);
      setSubmitted(true);
      trackEvent('form_submitted', 'Submitted Custom Bundle Request', `${refId} ($${finalMonthlyTotal}/mo)`);
    } catch (err: any) {
      setServerError(err?.message || 'Unable to submit custom bundle request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setBusinessEmail('');
    setCompanyName('');
    setWebsiteUrl('');
    setBusinessGoals('');
    setAdditionalRequirements('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="custom-bundle-title"
      >
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#356DFF] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Make Your Own Bundle Quotation</span>
            </div>
            <h3 id="custom-bundle-title" className="text-xl font-bold text-[#101B35]">
              {submitted ? 'Custom Bundle Enquiry Received' : 'Request Your Custom Bundle Proposal'}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {!submitted ? (
            <div className="space-y-6">
              
              {/* Selected Services & Price Breakdown Recap */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#101B35] pb-2 border-b border-slate-200">
                  <span>Selected Package Composition ({selectedServices.length} items)</span>
                  {selectedServices.length >= 2 ? (
                    <span className="text-emerald-600 font-extrabold">10% Bundle Discount Applied</span>
                  ) : (
                    <span className="text-amber-600 font-semibold">Standard Individual Rates</span>
                  )}
                </div>

                {/* 1 service warning message */}
                {selectedServices.length === 1 && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Select at least one more service to unlock your 10% bundle discount.</span>
                    </div>
                    {onNavigateToPricing && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onNavigateToPricing();
                        }}
                        className="text-xs font-bold text-[#356DFF] hover:underline whitespace-nowrap"
                      >
                        View Individual Packages
                      </button>
                    )}
                  </div>
                )}

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-xs text-slate-700">
                  {selectedServices.map((svc) => (
                    <div key={svc.id} className="flex items-center justify-between py-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{svc.name}</span>
                        <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                          {svc.tier}
                        </span>
                      </div>
                      <span className="text-slate-800 font-medium">
                        {svc.price === null ? 'Custom Quote' : `$${svc.price}${svc.isOneTime ? ' one-time' : '/mo'}`}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculation math */}
                <div className="pt-2 border-t border-slate-200 space-y-1 text-xs">
                  {originalMonthlyTotal > 0 && (
                    <>
                      <div className="flex justify-between text-slate-600">
                        <span>Original Recurring Monthly Total:</span>
                        <span className="tabular-nums font-medium">${originalMonthlyTotal}/month</span>
                      </div>

                      <div className="flex justify-between text-slate-600">
                        <span>Discount Percentage:</span>
                        <span className="font-semibold text-slate-800">{discountPercentage}%</span>
                      </div>

                      {discountPercentage > 0 && (
                        <div className="flex justify-between text-emerald-600 font-semibold">
                          <span>Discount Amount:</span>
                          <span className="tabular-nums">-${monthlyDiscountAmount}/month</span>
                        </div>
                      )}

                      <div className="flex justify-between text-slate-900 font-bold text-sm pt-1 border-t border-slate-200/60">
                        <span>Final Monthly Bundle Price:</span>
                        <span className="text-[#356DFF] tabular-nums font-extrabold text-base">
                          ${finalMonthlyTotal}/month
                        </span>
                      </div>
                    </>
                  )}

                  {oneTimeTotal > 0 && (
                    <div className="flex justify-between text-slate-700 pt-1 text-xs">
                      <span>Separate One-Time Setup Costs (Automation):</span>
                      <span className="font-bold text-slate-900 tabular-nums">${oneTimeTotal} one-time</span>
                    </div>
                  )}

                  {hasCustomTier && (
                    <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200 flex items-center gap-1.5 mt-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Contains Custom Tier item(s). Our team will provide tailored pricing for those components.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {serverError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] ${
                        errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      placeholder="marcus@company.com"
                      className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] ${
                        errors.businessEmail ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.businessEmail && <p className="text-[11px] text-red-500 mt-1">{errors.businessEmail}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex International Ltd"
                      className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] ${
                        errors.companyName ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.companyName && <p className="text-[11px] text-red-500 mt-1">{errors.companyName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Website URL
                    </label>
                    <input
                      type="text"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://company.com"
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Business Goals *
                  </label>
                  <textarea
                    rows={2}
                    value={businessGoals}
                    onChange={(e) => setBusinessGoals(e.target.value)}
                    placeholder="e.g. Generate high-intent leads in the UK and US, scale ad creatives, and streamline CRM follow-ups..."
                    className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] ${
                      errors.businessGoals ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.businessGoals && <p className="text-[11px] text-red-500 mt-1">{errors.businessGoals}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Additional Requirements or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    placeholder="Any specific platforms, timeline constraints, or existing tools we should know about..."
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>The custom bundle submission creates an enquiry, not an immediate payment or confirmed purchase.</span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || selectedServices.length === 0}
                    className="px-6 py-2.5 bg-[#101B35] hover:bg-[#356DFF] disabled:bg-slate-400 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm inline-flex items-center gap-2"
                  >
                    <span>{isSubmitting ? 'Submitting Enquiry...' : 'GET MY CUSTOM BUNDLE'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Confirmation Receipt State */
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#101B35]">
                  Custom Bundle Enquiry Submitted!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900">{fullName}</span>. We have recorded your custom bundle enquiry for <span className="font-semibold text-slate-900">{companyName}</span> in our strategist portal.
                </p>
              </div>

              {/* Detailed Receipt Card */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-left text-xs space-y-2">
                <div className="font-bold text-slate-900 pb-1.5 border-b border-slate-200 flex justify-between">
                  <span>Custom Bundle Enquiry Record</span>
                  <span className="text-[#356DFF]">{submissionRef}</span>
                </div>

                <div className="text-slate-600">
                  <span className="font-semibold text-slate-800">Included Services ({selectedServices.length}):</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedServices.map(s => (
                      <span key={s.id} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] font-medium text-slate-800">
                        {s.name} ({s.tier})
                      </span>
                    ))}
                  </div>
                </div>

                {originalMonthlyTotal > 0 && (
                  <div className="pt-2 border-t border-slate-200 space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Standard Rate:</span>
                      <span className="line-through text-slate-400">${originalMonthlyTotal}/mo</span>
                    </div>
                    {discountPercentage > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>10% Bundle Discount:</span>
                        <span>-${monthlyDiscountAmount}/mo</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-900 font-bold">
                      <span>Estimated Bundle Monthly:</span>
                      <span className="text-[#356DFF]">${finalMonthlyTotal}/mo</span>
                    </div>
                  </div>
                )}

                {oneTimeTotal > 0 && (
                  <div className="flex justify-between text-slate-700 pt-1 border-t border-slate-200">
                    <span>One-Time Automation Setup:</span>
                    <span className="font-bold text-slate-900">${oneTimeTotal} one-time</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                A senior growth strategist will review your requirements and send a custom Statement of Work to <span className="font-medium text-slate-800">{businessEmail}</span> within 1 business day.
              </p>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#101B35] text-white text-xs font-semibold rounded-lg hover:bg-[#356DFF] transition-colors"
                >
                  Close &amp; Return to Pricing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Sparkles, 
  AlertCircle, 
  ArrowRight,
  Package,
  Layers,
  Phone,
  Mail,
  Building,
  User,
  Globe,
  DollarSign
} from 'lucide-react';
import { getSessionId, trackEvent } from '../utils/analytics';

export interface PlanEnquiryPayload {
  serviceName: string;
  planName: string;
  priceDisplay: string;
  billingType: string;
  isBundle?: boolean;
  bundleName?: string;
}

interface PlanEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PlanEnquiryPayload | null;
}

export const PlanEnquiryModal: React.FC<PlanEnquiryModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [country, setCountry] = useState('United States');
  const [budget, setBudget] = useState('$1,000–$3,000');
  const [projectDescription, setProjectDescription] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // Editable service / plan if user wants to adjust
  const [serviceName, setServiceName] = useState('');
  const [planName, setPlanName] = useState('');
  const [priceDisplay, setPriceDisplay] = useState('');
  const [billingType, setBillingType] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (data) {
      setServiceName(data.isBundle && data.bundleName ? data.bundleName : data.serviceName);
      setPlanName(data.planName || 'Selected Plan');
      setPriceDisplay(data.priceDisplay || '');
      setBillingType(data.billingType || (data.priceDisplay?.includes('one-time') ? 'One-Time Project' : 'Monthly Retainer'));
      setErrors({});
      setSubmitted(false);
      setSubmissionRef('');
      setServerError('');
      if (isOpen) {
        trackEvent('form_opened', 'Opened Plan Enquiry Modal', `${data.serviceName} - ${data.planName}`);
        trackEvent('plan_selected', 'Selected Plan', `${data.serviceName} (${data.planName})`);
      }
    }
  }, [data, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen || !data) return null;

  const countryOptions = [
    'United States',
    'United Kingdom',
    'United Arab Emirates',
    'Australia',
    'Canada',
    'Germany',
    'Singapore',
    'Saudi Arabia',
    'Other International'
  ];

  const budgetOptions = [
    'Under $1,000',
    '$1,000–$3,000',
    '$3,000–$5,000',
    '$5,000–$10,000',
    '$10,000+',
    'Flexible / As Recommended'
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    
    if (!workEmail.trim()) {
      errs.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim())) {
      errs.workEmail = 'Please provide a valid business email';
    }

    if (!phone.trim()) {
      errs.phone = 'WhatsApp / phone number is required';
    } else if (phone.trim().replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a valid phone number (min 7 digits)';
    }

    if (!country) errs.country = 'Please select your market/country';
    if (!projectDescription.trim()) {
      errs.projectDescription = 'Please describe your business goals or challenges';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: data.isBundle ? 'bundle_enquiry' : 'plan_enquiry',
          fullName: fullName.trim(),
          businessEmail: workEmail.trim(),
          companyName: (businessName.trim() || 'Direct Client'),
          phone: phone.trim(),
          websiteUrl: websiteUrl.trim(),
          country,
          serviceRequired: serviceName,
          selectedPlan: planName,
          planPrice: priceDisplay,
          billingType,
          selectedBundle: data.isBundle ? serviceName : '',
          budget,
          message: projectDescription.trim(),
          additionalRequirements: additionalRequirements.trim(),
          sessionId: getSessionId()
        })
      });

      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.error || 'Failed to submit proposal request');
      }

      const refId = responseData.referenceId || `TM-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionRef(refId);
      setSubmitted(true);
      trackEvent(
        'form_submitted',
        `Submitted ${data.isBundle ? 'Growth Bundle' : 'Plan'} Enquiry`,
        `${serviceName} · ${planName} (${refId})`
      );
    } catch (err: any) {
      setServerError(err.message || 'Network error submitting enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-[#101B35]/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden transition-all transform scale-100 max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-enquiry-title"
      >
        
        {/* Header Banner */}
        <div className="bg-[#101B35] text-white p-5 sm:p-6 shrink-0 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#356DFF] bg-blue-900/40 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                <Sparkles className="w-3 h-3 text-[#356DFF]" />
                <span>{data.isBundle ? 'Growth Bundle Consultation' : 'Package Onboarding & Strategy'}</span>
              </div>
              <h2 id="plan-enquiry-title" className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {submitted ? 'Enquiry Confirmed' : `Get Started with ${serviceName}`}
              </h2>
              <p className="text-xs text-slate-300">
                {submitted 
                  ? 'Our senior growth strategist is reviewing your scope.' 
                  : 'Fast-track your proposal. No high-pressure sales — just strategy.'}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Selected Plan Summary Badge */}
          {!submitted && (
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg">
                  {planName}
                </span>
                <span className="text-slate-400">·</span>
                <span className="font-mono text-emerald-400 font-extrabold text-sm">
                  {priceDisplay}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {billingType}
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 text-xs">
          {submitted ? (
            /* Success State */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border-2 border-emerald-200">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-black text-[#101B35]">
                  Enquiry Received, {fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Thank you for selecting <span className="font-bold text-slate-900">{serviceName}</span> ({planName}). Your brief has been dispatched to our international client strategy desk.
                </p>
              </div>

              {/* Dossier Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-900">Official Submission Reference</span>
                  <span className="font-mono font-extrabold text-[#356DFF]">{submissionRef}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Selected Package:</span>
                  <span className="font-bold text-slate-900">{serviceName} ({planName})</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Target Investment:</span>
                  <span className="font-bold text-emerald-700">{priceDisplay}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Billing Model:</span>
                  <span className="font-medium text-slate-800">{billingType}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Designated Lead Contact:</span>
                  <span className="font-medium text-slate-800">{workEmail}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>WhatsApp / Phone:</span>
                  <span className="font-medium text-slate-800">{phone}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 bg-[#101B35] hover:bg-[#356DFF] text-white font-bold rounded-xl transition-all shadow-md text-xs"
                >
                  Return to Pricing &amp; Bundles
                </button>
              </div>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {serverError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Row 1: Full Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alexander Vance"
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs ${
                        errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Business / Brand Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Global Retail"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs"
                  />
                </div>
              </div>

              {/* Row 2: Work Email & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs ${
                      errors.workEmail ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.workEmail && <p className="text-[11px] text-red-500 mt-1">{errors.workEmail}</p>}
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    WhatsApp / Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs ${
                      errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 3: Website URL & Target Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Website URL <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://yourcompany.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Primary Market / Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs"
                  >
                    {countryOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Monthly Marketing Budget */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Estimated Monthly Marketing Budget <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`p-2 rounded-xl border text-center text-[11px] font-semibold transition-all ${
                        budget === b
                          ? 'border-[#356DFF] bg-blue-50 text-[#101B35] ring-1 ring-[#356DFF]'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 5: Project Description & Goals */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Project Description &amp; Growth Objectives <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Tell us what you want to achieve (e.g. increase lead volume in the US market, optimize current ad spend, refresh creative assets, or automate lead follow-ups)..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs ${
                    errors.projectDescription ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                  }`}
                />
                {errors.projectDescription && <p className="text-[11px] text-red-500 mt-1">{errors.projectDescription}</p>}
              </div>

              {/* Row 6: Additional Requirements */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Additional Notes or Timing Requirements <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  placeholder="Any specific platforms, timeline constraints, or existing tools you use..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs"
                />
              </div>

              {/* Privacy Assurance */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-[11px] text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Confidential &amp; Secure. Your business details are protected under NDA and handled solely by our senior performance team.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold rounded-xl transition-colors text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3 bg-[#101B35] hover:bg-[#356DFF] disabled:bg-slate-400 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-xs"
                >
                  <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Plan Enquiry'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

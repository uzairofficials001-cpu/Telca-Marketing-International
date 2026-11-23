import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Send, 
  Sparkles, 
  AlertCircle,
  Phone,
  Mail,
  Building,
  User,
  Globe,
  HelpCircle
} from 'lucide-react';
import { ConsultationFormState } from '../types';
import { getSessionId, trackEvent } from '../utils/analytics';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService
}) => {
  const [form, setForm] = useState<ConsultationFormState>({
    fullName: '',
    businessEmail: '',
    companyName: '',
    phone: '',
    websiteUrl: '',
    country: 'United States',
    serviceRequired: defaultService || 'Paid Advertising',
    budget: '$1,000–$3,000',
    message: '',
    challenges: '',
    preferredDate: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (defaultService) {
        setForm(prev => ({ ...prev, serviceRequired: defaultService }));
      }
      setErrors({});
      setSubmitted(false);
      setSubmissionRef('');
      setServerError('');
      trackEvent('form_opened', 'Opened Consultation Form', defaultService || 'General');
    }
  }, [isOpen, defaultService]);

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

  if (!isOpen) return null;

  const serviceOptions = [
    'Paid Advertising',
    'Creative & Content Production',
    'Social Media Management',
    'Email Marketing',
    'AI & Business Automation',
    'Multiple Services',
    'Not Sure Yet'
  ];

  const budgetOptions = [
    'Under $1,000',
    '$1,000–$3,000',
    '$3,000–$5,000',
    '$5,000–$10,000',
    '$10,000+',
    'Flexible / As Recommended'
  ];

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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.companyName.trim()) newErrors.companyName = 'Business name is required';
    
    if (!form.businessEmail.trim()) {
      newErrors.businessEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail.trim())) {
      newErrors.businessEmail = 'Please enter a valid business email address';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'WhatsApp / phone number is required';
    } else if (form.phone.trim().replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please provide a valid phone number (min 7 digits)';
    }

    if (!form.country) newErrors.country = 'Please select your country/market';
    
    const challengesText = (form.challenges || form.message || '').trim();
    if (!challengesText) {
      newErrors.challenges = 'Please describe your current marketing challenges or objectives';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setIsSubmitting(true);
    const challengesText = (form.challenges || form.message || '').trim();

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'consultation',
          fullName: form.fullName.trim(),
          businessEmail: form.businessEmail.trim(),
          companyName: form.companyName.trim(),
          phone: form.phone.trim(),
          websiteUrl: form.websiteUrl.trim(),
          country: form.country,
          serviceRequired: form.serviceRequired,
          budget: form.budget,
          message: challengesText,
          challenges: challengesText,
          preferredDate: form.preferredDate,
          additionalInfo: form.additionalInfo?.trim() || '',
          sessionId: getSessionId()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit consultation request');
      }

      const ref = data.referenceId || `TM-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionRef(ref);
      setSubmitted(true);
      trackEvent('form_submitted', 'Submitted Free Consultation Request', ref);
    } catch (err: any) {
      setServerError(err.message || 'Unable to submit request. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-[#101B35]/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
      >
        {/* Header Banner */}
        <div className="bg-[#101B35] text-white p-5 sm:p-6 shrink-0 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#356DFF] bg-blue-900/40 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                <Sparkles className="w-3 h-3 text-[#356DFF]" />
                <span>Strategic Consultation Request</span>
              </div>
              <h2 id="consultation-modal-title" className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {submitted ? 'Consultation Request Confirmed' : 'Book a Strategy Consultation'}
              </h2>
              <p className="text-xs text-slate-300">
                {submitted 
                  ? 'Our senior performance strategists have received your dossier.'
                  : '30-minute discovery call with a senior performance strategist — not a salesperson.'}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 text-xs">
          {submitted ? (
            /* Confirmation View */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border-2 border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-black text-[#101B35]">
                  Request Received, {form.fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Thank you for requesting a strategic consultation for <span className="font-bold text-slate-900">{form.companyName}</span>. Your brief has been dispatched to our international client strategy desk.
                </p>
              </div>

              {/* Dossier Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-900">Official Consultation Reference</span>
                  <span className="font-mono font-extrabold text-[#356DFF]">{submissionRef}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Service Area:</span>
                  <span className="font-bold text-slate-900">{form.serviceRequired}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Target Market:</span>
                  <span className="font-medium text-slate-800">{form.country}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Contact Email:</span>
                  <span className="font-medium text-slate-800">{form.businessEmail}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>WhatsApp / Phone:</span>
                  <span className="font-medium text-slate-800">{form.phone}</span>
                </div>
                {form.preferredDate && (
                  <div className="flex justify-between text-slate-600">
                    <span>Preferred Timing:</span>
                    <span className="font-medium text-[#356DFF]">{form.preferredDate}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 bg-[#101B35] hover:bg-[#356DFF] text-white font-bold rounded-xl transition-all shadow-md text-xs"
                >
                  Close &amp; Return to Website
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

              {/* Service of Interest Selection */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Service of Interest <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setForm({ ...form, serviceRequired: opt })}
                      className={`p-2 rounded-xl text-left text-[11px] font-semibold border transition-all ${
                        form.serviceRequired === opt
                          ? 'border-[#356DFF] bg-blue-50 text-[#101B35] ring-1 ring-[#356DFF]'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 1: Full Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g. Jordan Miller"
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs ${
                      errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Business / Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="e.g. Vance Capital or Lumina Retail"
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs ${
                      errors.companyName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.companyName && <p className="text-[11px] text-red-500 mt-1">{errors.companyName}</p>}
                </div>
              </div>

              {/* Row 2: Email & Phone/WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Work Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.businessEmail}
                    onChange={(e) => setForm({ ...form, businessEmail: e.target.value })}
                    placeholder="jordan@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs ${
                      errors.businessEmail ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.businessEmail && <p className="text-[11px] text-red-500 mt-1">{errors.businessEmail}</p>}
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    WhatsApp / Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 234-5678"
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
                    value={form.websiteUrl}
                    onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                    placeholder="https://yourbrand.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Target Market / Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs"
                  >
                    {countryOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Marketing Challenges */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Current Marketing Challenges &amp; Strategic Goals <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={form.challenges || form.message}
                  onChange={(e) => setForm({ ...form, challenges: e.target.value, message: e.target.value })}
                  placeholder="Outline your current bottlenecks (e.g. rising customer acquisition costs, ad creative fatigue, expanding into the UK market, or automating lead nurturing)..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs ${
                    errors.challenges ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                  }`}
                />
                {errors.challenges && <p className="text-[11px] text-red-500 mt-1">{errors.challenges}</p>}
              </div>

              {/* Row 4: Preferred Date & Monthly Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Preferred Consultation Timing <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.preferredDate}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                    placeholder="e.g. Tuesday morning (EST) or this week"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Monthly Marketing Budget <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs"
                  >
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Additional Information <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={form.additionalInfo}
                  onChange={(e) => setForm({ ...form, additionalInfo: e.target.value })}
                  placeholder="Any particular platforms currently active, existing CRM/tools, or revenue targets..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-xs"
                />
              </div>

              {/* Confidentiality Notice */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-[11px] text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Confidential &amp; Secure. Your business details are held strictly confidential and never shared with third parties.
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
                  <span>{isSubmitting ? 'Submitting Request...' : 'Request Free Consultation'}</span>
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

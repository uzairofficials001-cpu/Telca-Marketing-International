import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  BarChart3, 
  ArrowRight, 
  ShieldCheck, 
  Send, 
  Sparkles, 
  AlertCircle,
  Building,
  User,
  Globe,
  Mail,
  Phone,
  Layers,
  Target,
  Clock
} from 'lucide-react';
import { BusinessAuditFormState } from '../types';
import { getSessionId, trackEvent } from '../utils/analytics';

interface BusinessAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToConsultation?: () => void;
}

export const BusinessAuditModal: React.FC<BusinessAuditModalProps> = ({
  isOpen,
  onClose,
  onSwitchToConsultation
}) => {
  const [form, setForm] = useState<BusinessAuditFormState>({
    fullName: '',
    businessName: '',
    workEmail: '',
    phone: '',
    websiteUrl: '',
    country: 'United States',
    industry: 'E-commerce & D2C',
    marketingChannels: ['Google Ads', 'Meta (FB/IG)'],
    mainChallenge: '',
    servicesInterested: ['Paid Advertising'],
    additionalDetails: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setSubmitted(false);
      setSubmissionRef('');
      setServerError('');
      trackEvent('form_opened', 'Opened Business Audit Modal', 'Audit Request');
    }
  }, [isOpen]);

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

  const industryOptions = [
    'E-commerce & D2C',
    'SaaS & B2B Tech',
    'Professional & Legal Services',
    'Healthcare & Medical',
    'Real Estate & Property',
    'Education & EdTech',
    'Financial Services & Fintech',
    'Hospitality & Tourism',
    'Retail & Consumer Brands',
    'Other Industry'
  ];

  const channelOptions = [
    'Google Ads',
    'Meta (FB/IG)',
    'TikTok Ads',
    'LinkedIn Ads',
    'SEO / Organic Search',
    'Email Marketing',
    'YouTube Ads',
    'None / Starting from Scratch'
  ];

  const serviceInterestOptions = [
    'Paid Advertising (Google/Meta)',
    'Social Media & Creative Production',
    'Complete Business Growth Bundle',
    'Custom Bundle Strategy',
    'Tracking & Conversion Optimization'
  ];

  const countryOptions = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Netherlands',
    'United Arab Emirates',
    'Singapore',
    'Switzerland',
    'Other Country'
  ];

  const toggleChannel = (channel: string) => {
    setForm(prev => {
      const exists = prev.marketingChannels.includes(channel);
      return {
        ...prev,
        marketingChannels: exists 
          ? prev.marketingChannels.filter(c => c !== channel)
          : [...prev.marketingChannels, channel]
      };
    });
  };

  const toggleService = (service: string) => {
    setForm(prev => {
      const exists = prev.servicesInterested.includes(service);
      return {
        ...prev,
        servicesInterested: exists 
          ? prev.servicesInterested.filter(s => s !== service)
          : [...prev.servicesInterested, service]
      };
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.businessName.trim()) newErrors.businessName = 'Company name is required';

    if (!form.workEmail.trim()) {
      newErrors.workEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) {
      newErrors.workEmail = 'Please enter a valid email address';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'WhatsApp / phone number is required';
    } else if (form.phone.trim().replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please provide a valid phone number (min 7 digits)';
    }

    // Website URL is optional (no required check)

    if (!form.country) newErrors.country = 'Please select your country/market';
    if (!form.mainChallenge.trim()) {
      newErrors.mainChallenge = 'Please describe your main marketing bottleneck or challenge';
    }

    if (form.servicesInterested.length === 0) {
      newErrors.servicesInterested = 'Please select at least one area of interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
          type: 'business_audit',
          fullName: form.fullName.trim(),
          businessEmail: form.workEmail.trim(),
          companyName: form.businessName.trim(),
          phone: form.phone.trim(),
          websiteUrl: form.websiteUrl.trim(),
          country: form.country,
          industry: form.industry,
          marketingChannels: form.marketingChannels,
          challenges: form.mainChallenge.trim(),
          serviceRequired: form.servicesInterested.join(', '),
          additionalInfo: form.additionalDetails?.trim() || '',
          sessionId: getSessionId()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit business audit request');
      }

      const refId = data.referenceId || data.enquiry?.referenceId || `TM-AUD-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionRef(refId);
      setSubmitted(true);
      trackEvent('form_submitted', 'Submitted Business Audit Request', refId);
    } catch (err: any) {
      setServerError(err.message || 'An error occurred while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-900/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-electric-900 p-6 sm:p-7 text-white relative flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-electric-500/20 text-electric-300 text-xs font-semibold tracking-wide border border-electric-500/30">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>COMPLIMENTARY MARKETING AUDIT</span>
              </div>
              <h2 id="audit-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Request Your Performance & Funnel Audit
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-lg">
                Get an objective, senior-level review of your current advertising, landing pages, conversion leaks, and scale potential. 100% free with no sales pressure.
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="p-6 sm:p-7 overflow-y-auto flex-1 bg-white">
            <div className="py-8 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-bold rounded-md">
                  Reference: {submissionRef}
                </div>
                <h3 className="text-2xl font-bold text-navy-900">
                  Audit Request Received!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Our growth strategists will inspect {form.websiteUrl ? <>your website <span className="font-semibold text-navy-800">{form.websiteUrl}</span> and</> : 'your'} current marketing funnel. Your comprehensive breakdown report will be delivered within 24 business hours.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-left max-w-md mx-auto space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-semibold text-navy-900 text-sm">
                  <Clock className="w-4 h-4 text-electric-600" />
                  What happens next?
                </div>
                <p>1. We review your analytics, landing pages, and competitor positioning.</p>
                <p>2. We prepare an actionable action plan highlighting top 3 conversion leaks.</p>
                <p>3. We deliver the report directly to <span className="font-semibold text-navy-800">{form.workEmail}</span> and follow up via WhatsApp.</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-navy-900 text-white font-medium text-sm hover:bg-navy-800 transition shadow-sm"
                >
                  Done
                </button>
                {onSwitchToConsultation && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSwitchToConsultation();
                    }}
                    className="px-6 py-2.5 rounded-xl border border-electric-600 text-electric-600 font-medium text-sm hover:bg-electric-50 transition"
                  >
                    Want to speak sooner? Book Call
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden" noValidate>
            <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-4 sm:space-y-5 bg-white">
              {serverError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={e => setForm({ ...form, fullName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border ${
                        errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-electric-500'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Company / Brand Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={form.businessName}
                      onChange={e => setForm({ ...form, businessName: e.target.value })}
                      placeholder="e.g. Apex Health Co."
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border ${
                        errors.businessName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-electric-500'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.businessName && <p className="text-xs text-rose-500 mt-1">{errors.businessName}</p>}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Business Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      value={form.workEmail}
                      onChange={e => setForm({ ...form, workEmail: e.target.value })}
                      placeholder="you@company.com"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border ${
                        errors.workEmail ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-electric-500'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.workEmail && <p className="text-xs text-rose-500 mt-1">{errors.workEmail}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    WhatsApp / Phone <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border ${
                        errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-electric-500'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Website URL & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1 flex items-center justify-between">
                    <span>Website / Landing Page URL</span>
                    <span className="text-slate-400 font-normal text-[11px]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="url"
                      value={form.websiteUrl}
                      onChange={e => setForm({ ...form, websiteUrl: e.target.value })}
                      placeholder="https://www.yourdomain.com (or leave blank)"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-electric-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Industry / Vertical <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={form.industry}
                    onChange={e => setForm({ ...form, industry: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-electric-500 focus:outline-none bg-white transition-colors"
                  >
                    {industryOptions.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Marketing Channels Currently Used */}
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                  Current Marketing Channels (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {channelOptions.map(channel => {
                    const selected = form.marketingChannels.includes(channel);
                    return (
                      <button
                        key={channel}
                        type="button"
                        onClick={() => toggleChannel(channel)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                          selected
                            ? 'bg-electric-50 border-electric-600 text-electric-700 font-semibold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '}{channel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Challenge */}
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  What is your primary marketing bottleneck or goal? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={form.mainChallenge}
                  onChange={e => setForm({ ...form, mainChallenge: e.target.value })}
                  placeholder="e.g. High customer acquisition costs on Meta, low conversion rates on landing pages, or scaling past $30k/month."
                  className={`w-full px-3 py-2 text-sm rounded-xl border ${
                    errors.mainChallenge ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-electric-500'
                  } focus:outline-none transition-colors`}
                />
                {errors.mainChallenge && <p className="text-xs text-rose-500 mt-1">{errors.mainChallenge}</p>}
              </div>

              {/* Services Interested In */}
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                  Solutions You're Interested In
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {serviceInterestOptions.map(serv => {
                    const selected = form.servicesInterested.includes(serv);
                    return (
                      <button
                        key={serv}
                        type="button"
                        onClick={() => toggleService(serv)}
                        className={`text-xs text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between ${
                          selected
                            ? 'bg-navy-900 text-white border-navy-900 font-medium'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="truncate">{serv}</span>
                        {selected && <CheckCircle2 className="w-3.5 h-3.5 text-electric-400 flex-shrink-0 ml-1.5" />}
                      </button>
                    );
                  })}
                </div>
                {errors.servicesInterested && <p className="text-xs text-rose-500 mt-1">{errors.servicesInterested}</p>}
              </div>
            </div>

            {/* Pinned Bottom Footer - ALWAYS VISIBLE */}
            <div className="p-4 sm:px-7 sm:py-3.5 bg-slate-50/95 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0 z-10 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Confidential NDA &bull; 100% Free Audit &bull; No obligation</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="w-1/3 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:w-auto px-7 py-3 rounded-xl bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Book Free Audit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

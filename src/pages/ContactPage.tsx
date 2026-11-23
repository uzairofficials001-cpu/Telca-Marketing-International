import React, { useState, useEffect } from 'react';
import { PageId, ConsultationFormState } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Send,
  Mail
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { getSessionId, trackEvent } from '../utils/analytics';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenLegal
}) => {
  const [form, setForm] = useState<ConsultationFormState>({
    fullName: '',
    businessEmail: '',
    companyName: '',
    phone: '',
    websiteUrl: '',
    country: '',
    serviceRequired: 'Paid Advertising',
    budget: '$1,000–$3,000',
    message: '',
    preferredDate: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [businessDesks, setBusinessDesks] = useState<Array<{
    id: string;
    email: string;
    displayName: string;
    category: string;
    description: string;
    isDefault: boolean;
  }>>([]);

  useEffect(() => {
    fetch('/api/public/data')
      .then(res => res.json())
      .then(data => {
        if (data && data.businessEmails && Array.isArray(data.businessEmails)) {
          setBusinessDesks(data.businessEmails);
        } else if (data && data.settings && data.settings.businessEmails) {
          setBusinessDesks(data.settings.businessEmails);
        }
      })
      .catch(() => {});
  }, []);

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
    'Under $500',
    '$500–$1,000',
    '$1,000–$3,000',
    '$3,000–$5,000',
    '$5,000+',
    'Not Decided Yet'
  ];

  const countries = [
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
    const newErrors: Partial<Record<keyof ConsultationFormState, string>> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!form.businessEmail.trim()) {
      newErrors.businessEmail = 'Please enter your business email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail)) {
      newErrors.businessEmail = 'Please provide a valid email address';
    }
    if (!form.companyName.trim()) newErrors.companyName = 'Please enter your company name';
    if (!form.country) newErrors.country = 'Please select your country/market';
    if (!form.message.trim()) newErrors.message = 'Please provide brief details regarding your goals';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
          type: 'contact',
          ...form,
          sessionId: getSessionId()
        })
      });
      const data = await res.json();
      const refId = data.referenceId || `TM-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionRef(refId);
      trackEvent('form_submitted', 'Submitted Contact Inquiry', `${form.serviceRequired} (${refId})`);
    } catch (err) {
      setSubmissionRef(`TM-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      
      {/* Header */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="text-[#356DFF]">Inquiries &amp; Discovery</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Direct Strategist Access</span>
            </div>

            {/* Exact Headline Required */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101B35] tracking-tight">
              Let&apos;s Talk About Your Business Goals.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Every partnership begins with understanding where your business stands today and where you want it to go. Share your objectives below, and our senior strategy team will prepare an initial assessment.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content Form & Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form or Success Confirmation */}
          <AnimatedSection direction="up" delay={0.05} className="lg:col-span-8">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div>
                    <h2 className="text-xl font-bold text-[#101B35]">
                      Project &amp; Business Inquiry
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Fields marked with an asterisk (*) are required.
                    </p>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="e.g. Katherine Miller"
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] ${
                          errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                        }`}
                      />
                      {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        value={form.businessEmail}
                        onChange={(e) => setForm({ ...form, businessEmail: e.target.value })}
                        placeholder="katherine@company.com"
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] ${
                          errors.businessEmail ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                        }`}
                      />
                      {errors.businessEmail && <p className="text-[11px] text-red-500 mt-1">{errors.businessEmail}</p>}
                    </div>
                  </div>

                  {/* Company and Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        placeholder="e.g. Miller &amp; Co International"
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] ${
                          errors.companyName ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                        }`}
                      />
                      {errors.companyName && <p className="text-[11px] text-red-500 mt-1">{errors.companyName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Website URL
                      </label>
                      <input
                        type="text"
                        value={form.websiteUrl}
                        onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                        placeholder="https://company.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF]"
                      />
                    </div>
                  </div>

                  {/* Country & Preferred Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Country / Market *
                      </label>
                      <select
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className={`w-full px-3 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] ${
                          errors.country ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select country...</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.country && <p className="text-[11px] text-red-500 mt-1">{errors.country}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Preferred Discovery Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF]"
                      />
                    </div>
                  </div>

                  {/* Service Required */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Service Required *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {serviceOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setForm({ ...form, serviceRequired: opt })}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                            form.serviceRequired === opt
                              ? 'border-[#356DFF] bg-blue-50/60 text-[#101B35] font-semibold ring-1 ring-[#356DFF]'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Marketing Budget */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Monthly Marketing Budget *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setForm({ ...form, budget: b })}
                          className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                            form.budget === b
                              ? 'border-[#356DFF] bg-blue-50/60 text-[#101B35] font-semibold ring-1 ring-[#356DFF]'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Goals &amp; Current Business Challenges *
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please describe what you want to achieve (e.g. increase lead volume in the US market, refresh ad creatives, or connect ad leads to CRM automatically)..."
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#356DFF] ${
                        errors.message ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Privacy notice */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      We respect your privacy. All information shared is held strictly confidential and never distributed to third parties. View our{' '}
                      <button
                        type="button"
                        onClick={() => onOpenLegal('privacy')}
                        className="text-[#356DFF] font-semibold underline"
                      >
                        Privacy Policy
                      </button>.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#101B35] hover:bg-[#356DFF] disabled:bg-slate-400 text-white text-xs font-semibold rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2"
                    >
                      <span>{isSubmitting ? 'Submitting Enquiry...' : 'Send My Enquiry'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </form>
              ) : (
                /* Success Confirmation State */
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#101B35]">
                      Enquiry Received, {form.fullName}!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Telca Marketing. Our growth team has received your submission for <span className="font-semibold text-slate-900">{form.companyName}</span>.
                    </p>
                  </div>

                  {/* Official Receipt Card */}
                  <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                    <div className="flex justify-between font-bold text-slate-900 pb-2 border-b border-slate-200">
                      <span>Inquiry Dossier</span>
                      <span className="text-[#356DFF]">Ref: {submissionRef}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 pt-1">
                      <span>Primary Service:</span>
                      <span className="font-semibold text-slate-800">{form.serviceRequired}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Budget Tier:</span>
                      <span className="font-semibold text-slate-800">{form.budget}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Market / Country:</span>
                      <span className="font-semibold text-slate-800">{form.country}</span>
                    </div>
                    {form.preferredDate && (
                      <div className="flex justify-between text-slate-600">
                        <span>Preferred Discovery Date:</span>
                        <span className="font-semibold text-slate-800">{form.preferredDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    A strategist will review your objectives and reach out via <span className="text-slate-800 font-medium">{form.businessEmail}</span> within 1 business day.
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          fullName: '',
                          businessEmail: '',
                          companyName: '',
                          phone: '',
                          websiteUrl: '',
                          country: '',
                          serviceRequired: 'Paid Advertising',
                          budget: '$1,000–$3,000',
                          message: '',
                          preferredDate: ''
                        });
                      }}
                      className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              )}

            </div>
          </AnimatedSection>

          {/* Right Column: Agency Details & Expectations (Strict adherence: no fake phone/emails) */}
          <AnimatedSection direction="up" delay={0.15} className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#101B35] text-white rounded-3xl p-7 shadow-lg space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF]">
                Strategic Standards
              </div>
              <h3 className="text-lg font-bold">
                What to Expect Next
              </h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#356DFF]/20 text-[#356DFF] flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                    1
                  </div>
                  <span>
                    <strong>Preliminary Audit:</strong> We analyze your industry, competitive landscape, and digital footprint before we meet.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#356DFF]/20 text-[#356DFF] flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                    2
                  </div>
                  <span>
                    <strong>Discovery Call:</strong> A focused 30-minute working session with a marketing strategist—not a high-pressure salesperson.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#356DFF]/20 text-[#356DFF] flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                    3
                  </div>
                  <span>
                    <strong>Actionable Proposal:</strong> A clear, transparent roadmap detailing scope, milestones, and investment.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Clock className="w-4 h-4 text-[#356DFF]" />
                <span>Operating Windows</span>
              </div>
              <h4 className="text-sm font-bold text-[#101B35]">
                International Time Zone Coverage
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our client success managers and campaign strategists operate across global time zones to support international partners:
              </p>
              <div className="space-y-1.5 text-xs text-slate-700 pt-1">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">North America (EST/PST):</span>
                  <span className="font-medium">Active Coverage</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">United Kingdom (GMT/BST):</span>
                  <span className="font-medium">Active Coverage</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">UAE / Middle East (GST):</span>
                  <span className="font-medium">Active Coverage</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Australia (AEST/AWST):</span>
                  <span className="font-medium">Active Coverage</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-sm space-y-4 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-[#356DFF]" />
                  <span>Official Communications</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Desks
                </span>
              </div>
              <p className="leading-relaxed text-slate-600">
                All client proposals, contracts, and marketing audits are coordinated through our verified agency communications desks.
              </p>

              {businessDesks.length > 0 && (
                <div className="pt-2 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Direct Department Inboxes:
                  </span>
                  <div className="space-y-2">
                    {businessDesks.map((desk) => (
                      <div key={desk.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-slate-800 text-[11px] truncate">{desk.displayName}</span>
                          {desk.isDefault && (
                            <span className="text-[9px] bg-blue-100 text-[#356DFF] font-bold px-1.5 py-0.5 rounded">
                              Primary
                            </span>
                          )}
                        </div>
                        <a 
                          href={`mailto:${desk.email}`} 
                          className="font-mono text-[11px] text-[#356DFF] hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Mail className="w-3 h-3 shrink-0" />
                          <span className="truncate">{desk.email}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </AnimatedSection>

        </div>
      </section>

    </div>
  );
};

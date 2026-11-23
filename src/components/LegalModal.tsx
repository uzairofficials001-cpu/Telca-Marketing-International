import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  type,
  onClose
}) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            {type === 'privacy' ? (
              <Shield className="w-4 h-4 text-[#356DFF]" />
            ) : (
              <FileText className="w-4 h-4 text-[#356DFF]" />
            )}
            <h3 className="text-base font-bold text-[#101B35]">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-slate-900">Effective Date: January 1, 2026</p>
              <h4 className="text-sm font-bold text-[#101B35]">1. Information We Collect</h4>
              <p>
                Telca Marketing (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects information you provide directly through our consultation and inquiry forms, including full name, business email address, company name, website URL, country, marketing budget range, and project objectives.
              </p>
              <h4 className="text-sm font-bold text-[#101B35]">2. How We Use Your Information</h4>
              <p>
                We use the information collected solely to assess your business requirements, schedule strategic consultations, deliver requested proposals, communicate project updates, and ensure compliance with international client service standards. We never sell, rent, or trade your personal or business information to third parties.
              </p>
              <h4 className="text-sm font-bold text-[#101B35]">3. Data Security &amp; Confidentiality</h4>
              <p>
                We implement industry-standard administrative and technological safeguards to protect confidential client data, business materials, and marketing assets.
              </p>
              <h4 className="text-sm font-bold text-[#101B35]">4. International Data Transfers</h4>
              <p>
                Because Telca Marketing operates with clients across the United States, United Kingdom, United Arab Emirates, Australia, and worldwide, information submitted may be stored and processed across secure global cloud infrastructure compliant with modern data protection regulations (including GDPR and regional data standards).
              </p>
              <h4 className="text-sm font-bold text-[#101B35]">5. Your Rights</h4>
              <p>
                You may request access to, correction of, or deletion of your personal data at any time by contacting our agency team through our official contact portal.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-900">Effective Date: January 1, 2026</p>
              <h4 className="text-sm font-bold text-[#101B35]">1. Engagement &amp; Services</h4>
              <p>
                Telca Marketing provides professional digital marketing, performance advertising, creative production, social media management, email marketing, and AI automation consulting. All client engagements are governed by customized Statements of Work (SOW) defining agreed scope, milestones, deliverables, and fees.
              </p>
              <h4 className="text-sm font-bold text-[#101B35]">2. Transparent Performance Disclaimer</h4>
              <p>
                Advertising and growth campaigns are planned, monitored, and optimized according to business objectives and data-backed best practices. We do not make speculative guarantees regarding specific revenue figures, commercial sales volumes, or algorithmic rankings, as these depend on third-party platform conditions, market competition, product economics, and external variables outside agency control.
              </p>
              <h4 className="text-sm font-bold text-[#101B35]">3. Intellectual Property &amp; Account Ownership</h4>
              <p>
                Unless otherwise specified in a formal agreement, clients retain 100% full ownership of their advertising accounts, customer lists, brand assets, and first-party pixel data. Deliverables created by Telca Marketing transfer upon full settlement of project invoices.
              </p>
              <h4 className="text-sm font-bold text-[#101B35]">4. Client Responsibilities</h4>
              <p>
                Clients agree to provide accurate business information, timely creative feedback, and legitimate access to necessary platforms required for campaign execution.
              </p>
              <h4 className="text-sm font-bold text-[#101B35]">5. Governing Law</h4>
              <p>
                These terms are interpreted in accordance with standard international commercial practices and the jurisdiction stipulated in individual client service contracts.
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-3 border-t border-slate-100 flex justify-end bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#101B35] text-white text-xs font-semibold rounded-lg hover:bg-[#356DFF] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

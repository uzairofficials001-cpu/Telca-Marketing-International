import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';
import { hasAnalyticsConsent, setAnalyticsConsent } from '../utils/analytics';

interface PrivacyConsentBannerProps {
  onOpenPrivacy?: () => void;
}

export const PrivacyConsentBanner: React.FC<PrivacyConsentBannerProps> = ({ onOpenPrivacy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tm_analytics_consent');
    if (saved === null) {
      // Delay slightly for smooth non-intrusive entrance
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    setAnalyticsConsent(true);
    setVisible(false);
  };

  const handleDecline = () => {
    setAnalyticsConsent(false);
    setVisible(false);
  };

  return (
    <aside 
      aria-label="Privacy & Cookie Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#101B35]/95 backdrop-blur-md text-white p-5 rounded-2xl border border-slate-700/80 shadow-2xl animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#356DFF]/20 text-[#356DFF] flex items-center justify-center shrink-0 mt-0.5 border border-[#356DFF]/30">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="space-y-1 text-xs">
          <h2 className="font-bold text-sm text-white">Privacy &amp; Cookie Preferences</h2>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            We use essential security cookies and privacy-preserving, first-party analytics to measure service engagement. No personal data is sold to third parties.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-[#356DFF] hover:underline font-semibold text-[11px]"
            >
              Read our Privacy Policy &rarr;
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end gap-2 text-xs">
        <button
          type="button"
          onClick={handleDecline}
          className="px-3.5 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-[11px] font-semibold"
        >
          Essential Only
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="px-4 py-2 bg-[#356DFF] hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-md text-[11px] flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Accept Analytics</span>
        </button>
      </div>
    </aside>
  );
};

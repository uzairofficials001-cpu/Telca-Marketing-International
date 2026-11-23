import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TimedAuthPopupProps {
  currentRoute: string;
  isModalOpen: boolean;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

const SESSION_DISMISSED_KEY = 'telca_timed_popup_dismissed_v2';
const LAST_SHOWN_KEY = 'telca_timed_popup_last_shown_v2';
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24h
const TIMER_DELAY_MS = 45000; // 45 seconds

export const TimedAuthPopup: React.FC<TimedAuthPopupProps> = ({
  currentRoute,
  isModalOpen,
  onOpenAuth
}) => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Never show if user is signed in
    if (user) return;

    // 2. Never show on admin route
    if (currentRoute === 'admin' || window.location.hash.includes('admin')) return;

    // 3. Do not show if dismissed in this session
    const sessionDismissed = sessionStorage.getItem(SESSION_DISMISSED_KEY);
    if (sessionDismissed === 'true') return;

    // 4. Check 24h cooldown
    const lastShown = localStorage.getItem(LAST_SHOWN_KEY);
    if (lastShown) {
      const elapsed = Date.now() - parseInt(lastShown, 10);
      if (elapsed < COOLDOWN_MS) return;
    }

    // Set 45s timer
    const timer = setTimeout(() => {
      const currentHash = window.location.hash;
      if (
        !user &&
        !currentHash.includes('admin') &&
        !isModalOpen &&
        sessionStorage.getItem(SESSION_DISMISSED_KEY) !== 'true'
      ) {
        setIsVisible(true);
        localStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
      }
    }, TIMER_DELAY_MS);

    return () => clearTimeout(timer);
  }, [user, currentRoute, isModalOpen]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(SESSION_DISMISSED_KEY, 'true');
  };

  const handleAction = (mode: 'signin' | 'signup') => {
    handleDismiss();
    onOpenAuth(mode);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleDismiss();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative max-w-md w-full bg-[#101B35] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 overflow-hidden text-center"
        >
          {/* Subtle decorative glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#356DFF]/25 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#356DFF] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>International Performance Network</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white text-balance">
                Join the Telca Marketing Community
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto text-balance">
                Create an account to stay connected with Telca Marketing, track your custom bundle proposals, and receive executive performance marketing insights.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => handleAction('signup')}
                className="w-full sm:w-auto px-6 py-3 bg-[#356DFF] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleAction('signin')}
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/15"
              >
                Sign In
              </button>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Zero spam · Strictly strategic industry updates</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

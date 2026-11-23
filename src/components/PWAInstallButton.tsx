import React, { useState } from 'react';
import { Download, Share, PlusSquare, CheckCircle2, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'card' | 'menu-item';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'compact',
  className = ''
}) => {
  const { canInstallNatively, isIOS, isInstalled, promptToInstall } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    if (variant === 'card') {
      return (
        <div className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold ${className}`}>
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Telca App Installed (Standalone Mode)</span>
        </div>
      );
    }
    return null;
  }

  if (!canInstallNatively && !isIOS) {
    return null;
  }

  const handleClick = async () => {
    if (canInstallNatively) {
      await promptToInstall();
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  return (
    <>
      {variant === 'menu-item' ? (
        <button
          type="button"
          onClick={handleClick}
          className={`w-full py-2.5 px-3 border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-[#101B35] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors ${className}`}
        >
          <Smartphone className="w-4 h-4 text-[#356DFF] shrink-0" />
          <span>Install Telca Mobile App</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#356DFF] hover:bg-blue-600 text-white text-xs font-bold shadow-sm transition-all whitespace-nowrap shrink-0 ${className}`}
        >
          <Download className="w-3.5 h-3.5 shrink-0" />
          <span>Install App</span>
        </button>
      )}

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#101B35] text-white flex items-center justify-center font-black text-sm">
                  T
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#101B35]">Install on iPhone / iPad</h3>
                  <p className="text-[11px] text-slate-500">Required for iOS Push Notifications</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                aria-label="Close installation instructions"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ol className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Share className="w-4 h-4 text-[#356DFF] shrink-0 mt-0.5" />
                <span>
                  1. Open this site in <strong>Safari</strong> and tap the <strong>Share</strong> icon in the browser toolbar.
                </span>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <PlusSquare className="w-4 h-4 text-[#356DFF] shrink-0 mt-0.5" />
                <span>
                  2. Scroll down and tap <strong>Add to Home Screen</strong>, then confirm <strong>Add</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Smartphone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  3. Launch <strong>Telca</strong> from your Home Screen icon, sign in as Admin, and tap <strong>Enable Notifications</strong>.
                </span>
              </li>
            </ol>

            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-[#101B35] text-white text-xs font-bold hover:bg-[#356DFF] transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};

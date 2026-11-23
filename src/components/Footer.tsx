import React from 'react';
import { PageId } from '../types';
import { ArrowUpRight, Globe, Shield, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: () => void;
  onOpenAudit?: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenAudit,
  onOpenLegal
}) => {
  const currentYear = new Date().getFullYear();
  const [socials, setSocials] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/socials')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSocials(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101B35] text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Column 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block p-2 bg-white rounded-xl shadow-md">
              <img 
                src="/assets/aistudio/telca_logo_trimmed.png" 
                alt="TELCA MARKETING" 
                className="h-8 sm:h-9 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/aistudio/telca_logo__fadbada3.png';
                }}
              />
            </div>
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              We help businesses attract the right audience, generate quality leads, increase sales and improve their marketing operations through strategic advertising, creative content and intelligent automation.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Brand Philosophy:</span>
                <span className="text-white font-medium">Your Business. Your Goals. Our Strategy.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Brand Tagline:</span>
                <span className="text-slate-300 italic">&ldquo;Turning Marketing Into Measurable Growth.&rdquo;</span>
              </div>
            </div>

            {/* Target International Markets Notice */}
            <div className="pt-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                <Globe className="w-3.5 h-3.5 text-[#356DFF]" />
                <span>Primary International Markets</span>
              </div>
              <div className="flex flex-wrap gap-x-2 text-xs text-slate-400">
                <span>United States</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>United Kingdom</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>United Arab Emirates</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Australia</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>International Growth Markets</span>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pricing')}
                  className="hover:text-white transition-colors"
                >
                  Pricing &amp; Bundles
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('work')}
                  className="hover:text-white transition-colors"
                >
                  Our Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('insights')}
                  className="hover:text-white transition-colors"
                >
                  Insights &amp; Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact &amp; Inquiries
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-1 text-[#356DFF] hover:text-white font-medium transition-colors"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              {onOpenAudit && (
                <li>
                  <button
                    onClick={onOpenAudit}
                    className="inline-flex items-center gap-1 text-slate-300 hover:text-[#356DFF] font-medium transition-colors"
                  >
                    <span>Request Free Audit</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="text-blue-300 hover:text-white font-semibold transition-colors text-left"
                >
                  All Services Directory (13)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('service-paid-advertising')}
                  className="hover:text-white transition-colors text-left"
                >
                  Paid Advertising
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('service-creative-production')}
                  className="hover:text-white transition-colors text-left"
                >
                  Creative Production
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('service-social-media')}
                  className="hover:text-white transition-colors text-left"
                >
                  Social Media Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('service-email-marketing')}
                  className="hover:text-white transition-colors text-left"
                >
                  Email Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('service-ai-automation')}
                  className="hover:text-white transition-colors text-left"
                >
                  AI &amp; Automation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Inquiries & Social Placeholders */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Client Inquiries
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We respond to all new client inquiries within 1 business day across global time zones.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Business Hours: Monday – Friday (Global coverage: US, UK, UAE &amp; AU time zones)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-slate-300">
                  Official Inquiries via Secure Contact Portal
                </span>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Connect With Us (Official Channels)
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                {(socials.length > 0 ? socials : [
                  { name: 'LinkedIn', url: 'https://linkedin.com/company/telcamarketing' },
                  { name: 'X (Twitter)', url: 'https://x.com/telcamarketing' },
                  { name: 'Instagram', url: 'https://instagram.com/telcamarketing' },
                  { name: 'Facebook', url: 'https://facebook.com/telcamarketing' },
                  { name: 'YouTube', url: 'https://youtube.com/@telcamarketing' }
                ]).map((soc: any, idx: number, arr: any[]) => (
                  <React.Fragment key={soc.id || soc.name}>
                    <a
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {soc.name}
                    </a>
                    {idx < arr.length - 1 && <span aria-hidden="true" className="text-slate-600">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} Telca Marketing. All rights reserved. Registered Performance &amp; Growth Agency.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms &amp; Conditions
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-slate-300 transition-colors"
            >
              Agency Inquiries
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

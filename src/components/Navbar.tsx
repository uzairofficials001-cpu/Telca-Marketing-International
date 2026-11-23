import React, { useState, useRef, useEffect } from 'react';
import { PageId } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  ChevronDown, 
  Menu, 
  X, 
  User, 
  LogIn, 
  LogOut, 
  Shield, 
  Settings as SettingsIcon, 
  FileText,
  UserCheck
} from 'lucide-react';
import { UserProfileModal } from './UserProfileModal';
import { PWAInstallButton } from './PWAInstallButton';
import { MEDIA_ASSETS } from '../utils/mediaAssets';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenConsultation: () => void;
  onOpenAudit?: () => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenConsultation,
  onOpenAudit,
  onOpenAuth
}) => {
  const { user, logout } = useAuth();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userProfileModalOpen, setUserProfileModalOpen] = useState(false);
  const [profileModalTab, setProfileModalTab] = useState<'profile' | 'security' | 'enquiries'>('profile');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const servicesList: { name: string; pageId: PageId; description: string }[] = [
    {
      name: 'Paid Advertising & Performance Marketing',
      pageId: 'service-paid-advertising',
      description: 'Meta, Google, LinkedIn & TikTok ad management'
    },
    {
      name: 'Creative & Content Production',
      pageId: 'service-creative-production',
      description: 'Ad creatives, brand graphics & short-form video'
    },
    {
      name: 'Social Media Management',
      pageId: 'service-social-media',
      description: 'Organic content, scheduling & community growth'
    },
    {
      name: 'Email Marketing & Retention',
      pageId: 'service-email-marketing',
      description: 'Automated sequences, newsletters & subscriber flows'
    },
    {
      name: 'AI & Business Automation',
      pageId: 'service-ai-automation',
      description: 'n8n workflows, CRM integration & lead routing'
    }
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setServicesOpen(false);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProfileWithTab = (tab: 'profile' | 'security' | 'enquiries') => {
    setProfileModalTab(tab);
    setUserProfileModalOpen(true);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const isServiceActive = currentPage === 'services' || currentPage.startsWith('service-');

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-4 xl:px-6 2xl:px-8">
          <div className="flex items-center justify-between h-20 gap-2 lg:gap-3 xl:gap-4 2xl:gap-6">
            
            {/* Zone 1: Official Brand Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center text-left group whitespace-nowrap shrink-0 focus:outline-none py-1"
              aria-label="Telca Marketing Home"
            >
              <img 
                src={MEDIA_ASSETS.telcaLogoTransparent} 
                alt="TELCA MARKETING" 
                className="h-9 sm:h-10 xl:h-11 w-auto max-w-[145px] sm:max-w-[170px] xl:max-w-[190px] object-contain shrink-0 transition-opacity hover:opacity-90"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = MEDIA_ASSETS.telcaLogoFallback;
                }}
              />
            </button>

            {/* Zone 2: Navigation Links (Never collapses or overflows into Sign In) */}
            <nav className="hidden lg:flex items-center gap-1 lg:gap-1.5 xl:gap-3 2xl:gap-4 text-xs xl:text-[13px] 2xl:text-sm font-medium text-slate-700 shrink-0">
              <button
                onClick={() => handleNavClick('home')}
                className={`hover:text-[#356DFF] transition-colors whitespace-nowrap shrink-0 px-1.5 xl:px-2 py-1 rounded-lg ${
                  currentPage === 'home' ? 'text-[#356DFF] font-semibold' : ''
                }`}
              >
                Home
              </button>

              {/* Services Dropdown */}
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  onClick={() => handleNavClick('services')}
                  onMouseEnter={() => setServicesOpen(true)}
                  className={`flex items-center gap-1 xl:gap-1.5 hover:text-[#356DFF] transition-colors whitespace-nowrap px-1.5 xl:px-2 py-1 rounded-lg ${
                    isServiceActive ? 'text-[#356DFF] font-semibold' : ''
                  }`}
                  aria-expanded={servicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-[#356DFF]' : 'text-slate-400'}`} />
                </button>

                {servicesOpen && (
                  <div 
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute left-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <button
                      onClick={() => handleNavClick('services')}
                      className={`w-full text-left px-3 py-2.5 mb-1.5 rounded-xl text-xs transition-colors flex items-center justify-between border ${
                        currentPage === 'services'
                          ? 'bg-[#356DFF] text-white border-[#356DFF]'
                          : 'bg-[#F6F8FC] hover:bg-blue-50 text-[#101B35] border-slate-200/80'
                      }`}
                    >
                      <div>
                        <div className="font-bold">All Services Directory (13)</div>
                        <div className={`text-[11px] ${currentPage === 'services' ? 'text-blue-100' : 'text-slate-500'}`}>
                          Meta Ads, Google Ads &amp; all 11 specialized services
                        </div>
                      </div>
                      <span className="text-xs font-bold">&rarr;</span>
                    </button>
                    <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 px-3 py-1.5">
                      5 Core Practice Areas
                    </div>
                    <div className="space-y-1">
                      {servicesList.map((svc) => (
                        <button
                          key={svc.pageId}
                          onClick={() => handleNavClick(svc.pageId)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex flex-col ${
                            currentPage === svc.pageId
                              ? 'bg-blue-50 text-[#356DFF]'
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <span className="font-semibold text-slate-900">{svc.name}</span>
                          <span className="text-[11px] text-slate-500 mt-0.5">{svc.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('pricing')}
                className={`hover:text-[#356DFF] transition-colors whitespace-nowrap shrink-0 px-1.5 xl:px-2 py-1 rounded-lg ${
                  currentPage === 'pricing' ? 'text-[#356DFF] font-semibold' : ''
                }`}
              >
                Pricing &amp; Bundles
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`hover:text-[#356DFF] transition-colors whitespace-nowrap shrink-0 px-1.5 xl:px-2 py-1 rounded-lg ${
                  currentPage === 'about' ? 'text-[#356DFF] font-semibold' : ''
                }`}
              >
                About Us
              </button>

              <button
                onClick={() => handleNavClick('work')}
                className={`hover:text-[#356DFF] transition-colors whitespace-nowrap shrink-0 px-1.5 xl:px-2 py-1 rounded-lg ${
                  currentPage === 'work' ? 'text-[#356DFF] font-semibold' : ''
                }`}
              >
                Our Work
              </button>

              <button
                onClick={() => handleNavClick('insights')}
                className={`hover:text-[#356DFF] transition-colors whitespace-nowrap shrink-0 px-1.5 xl:px-2 py-1 rounded-lg ${
                  currentPage === 'insights' ? 'text-[#356DFF] font-semibold' : ''
                }`}
              >
                Insights
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`hover:text-[#356DFF] transition-colors whitespace-nowrap shrink-0 px-1.5 xl:px-2 py-1 rounded-lg ${
                  currentPage === 'contact' ? 'text-[#356DFF] font-semibold' : ''
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Zone 3: Authentication & Action Button (Compact and Viewport-Safe) */}
            <div className="hidden lg:flex items-center gap-1.5 lg:gap-2 xl:gap-2.5 shrink-0">
              {user ? (
                /* Compact Logged-in User Account Menu */
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 xl:gap-2 px-2 xl:px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors shadow-sm focus:outline-none shrink-0"
                    aria-expanded={userDropdownOpen}
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#101B35] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {user.fullName.charAt(0)}
                    </div>
                    <span className="max-w-[60px] xl:max-w-[85px] 2xl:max-w-[120px] truncate">
                      {user.fullName.split(' ')[0]}
                    </span>
                    {user.role === 'admin' && (
                      <span className="text-[9px] bg-purple-100 text-purple-800 font-extrabold px-1.5 py-0.5 rounded shrink-0">
                        ADMIN
                      </span>
                    )}
                    <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                      {/* User Info Header */}
                      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                        <div className="font-bold text-slate-900 truncate">{user.fullName}</div>
                        <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                      </div>

                      {/* Required Menu Items: My Account, Profile, Settings, Sign Out */}
                      <div className="py-1">
                        <button
                          onClick={() => openProfileWithTab('profile')}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2.5 transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>My Account</span>
                        </button>

                        <button
                          onClick={() => openProfileWithTab('profile')}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2.5 transition-colors"
                        >
                          <UserCheck className="w-4 h-4 text-slate-400" />
                          <span>Profile</span>
                        </button>

                        <button
                          onClick={() => openProfileWithTab('security')}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2.5 transition-colors"
                        >
                          <SettingsIcon className="w-4 h-4 text-slate-400" />
                          <span>Settings</span>
                        </button>

                        <button
                          onClick={() => openProfileWithTab('enquiries')}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2.5 transition-colors"
                        >
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>My Enquiries</span>
                        </button>

                        {user.role === 'admin' && (
                          <button
                            onClick={() => {
                              setUserDropdownOpen(false);
                              handleNavClick('admin');
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-purple-50 text-purple-900 font-semibold flex items-center gap-2.5 transition-colors border-t border-slate-100"
                          >
                            <Shield className="w-4 h-4 text-purple-600" />
                            <span>Admin Control Center</span>
                          </button>
                        )}
                      </div>

                      {/* Sign Out */}
                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2.5 transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Unauthenticated Sign In Button */
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="px-2.5 xl:px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#356DFF] hover:bg-slate-50 transition-colors whitespace-nowrap inline-flex items-center gap-1.5 shrink-0 rounded-lg"
                >
                  <LogIn className="w-3.5 h-3.5 shrink-0" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Free Audit Button */}
              {onOpenAudit && (
                <button
                  onClick={onOpenAudit}
                  className="px-2.5 xl:px-3.5 py-2 border border-slate-300 hover:border-[#356DFF] hover:text-[#356DFF] text-slate-700 text-xs font-semibold rounded-xl transition-all shadow-xs whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
                >
                  <span>Free Audit</span>
                </button>
              )}

              {/* Primary Consultation Action Button: Compact & Viewport-Safe */}
              <button
                onClick={onOpenConsultation}
                className="px-3 lg:px-3.5 xl:px-4 2xl:px-5 py-2 xl:py-2.5 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0"
              >
                <span>Free Consultation</span>
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              {user ? (
                <button
                  onClick={() => openProfileWithTab('profile')}
                  className="w-8 h-8 rounded-lg bg-[#101B35] text-white flex items-center justify-center font-bold text-xs"
                  aria-label="User profile"
                >
                  {user.fullName.charAt(0)}
                </button>
              ) : (
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-[#356DFF]"
                >
                  Sign In
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-[#101B35] hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-8 space-y-4 animate-in fade-in duration-200 max-w-full overflow-x-hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
            {/* Authenticated User Profile Block */}
            {user ? (
              <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between gap-3 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#101B35] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                      {user.fullName.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-sm text-slate-900 truncate">
                        {user.fullName}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  {user.role === 'admin' && (
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-extrabold px-2.5 py-1 rounded-md border border-purple-200 uppercase tracking-wide shrink-0">
                      ADMIN
                    </span>
                  )}
                </div>

                {/* Account Quick Links */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                  <button
                    onClick={() => openProfileWithTab('profile')}
                    className="py-2 px-3 text-xs bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-800 font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>My Account</span>
                  </button>
                  <button
                    onClick={() => openProfileWithTab('security')}
                    className="py-2 px-3 text-xs bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-800 font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <SettingsIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => openProfileWithTab('enquiries')}
                    className="py-2 px-3 text-xs bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-800 font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>My Enquiries</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="py-2 px-3 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Sign Out</span>
                  </button>
                </div>

                {user.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Admin Control Center</span>
                    </div>
                    <span className="text-[10px] bg-purple-200/60 px-1.5 py-0.5 rounded font-mono">Panel &rarr;</span>
                  </button>
                )}
              </div>
            ) : null}

            {/* Navigation Links */}
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  currentPage === 'home' ? 'bg-blue-50 text-[#356DFF]' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Home
              </button>

              {/* Services Sub-Menu */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2 space-y-1">
                <div className="px-2 pt-1 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Services
                </div>
                <button
                  onClick={() => handleNavClick('services')}
                  className={`w-full text-left px-2.5 py-2 text-xs rounded-lg transition-colors flex items-center justify-between font-bold ${
                    currentPage === 'services'
                      ? 'bg-[#356DFF] text-white'
                      : 'bg-white text-[#101B35] hover:text-[#356DFF] border border-slate-200/80'
                  }`}
                >
                  <span className="truncate pr-2">All Services (13)</span>
                  <span className="text-[10px] shrink-0">&rarr;</span>
                </button>
                {servicesList.map((svc) => (
                  <button
                    key={svc.pageId}
                    onClick={() => handleNavClick(svc.pageId)}
                    className={`w-full text-left px-2.5 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                      currentPage === svc.pageId
                        ? 'bg-blue-100/60 text-[#356DFF] font-semibold'
                        : 'text-slate-700 hover:bg-white hover:text-[#356DFF]'
                    }`}
                  >
                    <span className="truncate pr-2">{svc.name}</span>
                    <span className="text-slate-400 text-[10px] shrink-0">&rarr;</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleNavClick('pricing')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  currentPage === 'pricing' ? 'bg-blue-50 text-[#356DFF]' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Pricing &amp; Bundles
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  currentPage === 'about' ? 'bg-blue-50 text-[#356DFF]' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                About Us
              </button>

              <button
                onClick={() => handleNavClick('work')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  currentPage === 'work' ? 'bg-blue-50 text-[#356DFF]' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Our Work
              </button>

              <button
                onClick={() => handleNavClick('insights')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  currentPage === 'insights' ? 'bg-blue-50 text-[#356DFF]' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Insights
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  currentPage === 'contact' ? 'bg-blue-50 text-[#356DFF]' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Contact
              </button>
            </div>

            {/* CTAs & Auth Section (Vertical Stacked Layout) */}
            <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase tracking-wider rounded-xl text-center shadow-sm hover:shadow transition-all"
              >
                Free Consultation
              </button>

              {onOpenAudit && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAudit();
                  }}
                  className="w-full py-2.5 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl text-center transition-colors"
                >
                  Free Business Audit
                </button>
              )}

              {!user && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signin');
                  }}
                  className="w-full py-2.5 border border-slate-200 hover:border-[#356DFF] text-xs font-semibold text-slate-800 hover:text-[#356DFF] rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-4 h-4 text-slate-500" />
                  <span>Sign In / Register</span>
                </button>
              )}

              <PWAInstallButton variant="menu-item" />
            </div>
          </div>
        )}
      </header>

      {/* User Account / Profile / Settings Modal */}
      <UserProfileModal
        isOpen={userProfileModalOpen}
        initialTab={profileModalTab}
        onClose={() => setUserProfileModalOpen(false)}
        onNavigateToAdmin={() => handleNavClick('admin')}
      />
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MEDIA_ASSETS, resolveMediaUrl } from '../utils/mediaAssets';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Layers, 
  CreditCard, 
  Package, 
  Inbox, 
  Users, 
  FileText, 
  Settings, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  RefreshCw, 
  ExternalLink, 
  Lock,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Globe,
  Image as ImageIcon,
  BookOpen,
  FolderGit2,
  Sliders,
  ShieldCheck,
  Download,
  Eye,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Radio,
  FileCheck,
  MessageSquare,
  Activity,
  UserCheck,
  Smartphone,
  Monitor,
  Mail,
  KeyRound,
  Database,
  Bell,
  Copy,
  Check,
  RotateCcw,
  HardDrive,
  Send,
  Share2,
  FileDown,
  BadgeCheck,
  Laptop,
  EyeOff,
  Shield,
  MousePointerClick,
  Timer,
  ArchiveRestore,
  Sparkles,
  Calendar,
  Upload,
  FolderOpen,
  Tag
} from 'lucide-react';
import {
  AnimatedCounter,
  AnimatedTrafficLeadChart,
  AnimatedLeadSourceDonut,
  AnimatedConversionFunnel,
  AnimatedHorizontalBars
} from '../components/AdminCharts';
import { AdminNotificationsModule } from '../components/AdminNotificationsModule';
import { servicesData } from '../data/servicesData';
import { caseStudiesData } from '../data/caseStudiesData';
import { insightsArticles } from '../data/insightsData';
import { paidAdsPlatforms, greatValueGrowthBundles } from '../data/pricingData';

const OWNER_ADMIN_EMAIL = 'uzairofficials001@gmail.com';

interface AdminPageProps {
  onNavigateHome: () => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigateHome, onOpenAuth }) => {
  const { user, token, logout, loginWithGoogle, isStaticCloudAuth } = useAuth();
  const [googleSigningIn, setGoogleSigningIn] = useState(false);
  const [googleAuthError, setGoogleAuthError] = useState('');
  const [staticFallbackNotice, setStaticFallbackNotice] = useState(false);
  
  // Navigation tabs (comprehensive enterprise modules)
  const [activeTab, setActiveTab] = useState<
    | 'overview' 
    | 'analytics' 
    | 'notifications'
    | 'pages' 
    | 'services' 
    | 'pricing' 
    | 'bundles' 
    | 'portfolio' 
    | 'blog' 
    | 'enquiries' 
    | 'users' 
    | 'account-security'
    | 'recovery-emails'
    | 'business-emails'
    | 'team-delegation'
    | 'backup-restore'
    | 'notification-settings'
    | 'seo' 
    | 'media' 
    | 'legal' 
    | 'settings' 
    | 'security' 
    | 'socials'
    | 'integrations' 
    | 'audit-logs'
  >('overview');

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Loading & notification states
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Real backend data states
  const [overviewData, setOverviewData] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [analyticsRange, setAnalyticsRange] = useState<'today' | '7d' | '30d' | '90d' | 'all'>('30d');
  const [visitorJourneys, setVisitorJourneys] = useState<any[]>([]);
  const [selectedJourneyId, setSelectedJourneyId] = useState<string | null>(null);
  const [socialIntegrations, setSocialIntegrations] = useState<any[]>([]);
  const [testingSocialPlatform, setTestingSocialPlatform] = useState<string | null>(null);
  const [emailTestingLoading, setEmailTestingLoading] = useState(false);
  const [emailTestModal, setEmailTestModal] = useState<any>(null);
  
  const [services, setServices] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any>(null);
  const [bundlesConfig, setBundlesConfig] = useState<any>(null);
  const [pagesList, setPagesList] = useState<any[]>([]);
  const [portfolioList, setPortfolioList] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [deletedEnquiries, setDeletedEnquiries] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [blogList, setBlogList] = useState<any[]>([]);
  const [legalPages, setLegalPages] = useState<any[]>([]);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [securityData, setSecurityData] = useState<any>(null);

  // Enterprise Security & Admin additions
  const [sessionsData, setSessionsData] = useState<any>(null);
  const [recoveryData, setRecoveryData] = useState<any>(null);
  const [businessEmails, setBusinessEmails] = useState<any[]>([]);
  const [teamData, setTeamData] = useState<any>(null);
  const [backupsData, setBackupsData] = useState<any[]>([]);
  const [notificationConfig, setNotificationConfig] = useState<any>(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);

  // Email update state
  const [newEmailInput, setNewEmailInput] = useState('');
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [pendingEmailChange, setPendingEmailChange] = useState<string | null>(null);
  const [codeVerificationPreview, setCodeVerificationPreview] = useState<string | null>(null);

  // Recovery email state
  const [isAddingBackupEmail, setIsAddingBackupEmail] = useState(false);
  const [newBackupEmail, setNewBackupEmail] = useState('');
  const [newBackupLabel, setNewBackupLabel] = useState('');
  const [verifyingBackupId, setVerifyingBackupId] = useState<string | null>(null);
  const [backupVerifyCode, setBackupVerifyCode] = useState('');

  // Business Email state
  const [isAddingBusinessEmail, setIsAddingBusinessEmail] = useState(false);
  const [editingBusinessEmail, setEditingBusinessEmail] = useState<any>(null);
  const [businessEmailForm, setBusinessEmailForm] = useState({
    email: '',
    displayName: '',
    category: 'General Business Inquiries',
    description: '',
    forwardingTo: '',
    isDefault: false
  });

  // Team invite state
  const [isInvitingTeam, setIsInvitingTeam] = useState(false);
  const [teamInviteForm, setTeamInviteForm] = useState({
    fullName: '',
    email: '',
    role: 'content_manager'
  });
  const [recentInviteUrl, setRecentInviteUrl] = useState<string | null>(null);

  // Backup & restore state
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [restoreConfirmModal, setRestoreConfirmModal] = useState<any>(null);
  const [restoreConfirmInput, setRestoreConfirmInput] = useState('');

  // Notification Center & Deep-Link state
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [deepLinkOpenRef, setDeepLinkOpenRef] = useState<string | null>(null);

  // Filters & Selected states
  const [enquiryViewTab, setEnquiryViewTab] = useState<'all' | 'consultation' | 'business_audit' | 'plan_enquiry' | 'bundles' | 'contact' | 'trash'>('all');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('all');
  const [enquiryTypeFilter, setEnquiryTypeFilter] = useState('all');
  const [enquirySearchQuery, setEnquirySearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [selectedEnquiryIds, setSelectedEnquiryIds] = useState<string[]>([]);
  const [editingEnquiry, setEditingEnquiry] = useState<any>(null);
  const [savingEnquiryEdit, setSavingEnquiryEdit] = useState(false);
  const [deletingEnquiryTarget, setDeletingEnquiryTarget] = useState<{
    id: string;
    mode: 'soft' | 'permanent' | 'bulk' | 'empty_trash';
    label: string;
  } | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [journeyFilter, setJourneyFilter] = useState<'all' | 'converted' | 'engaged'>('all');

  // Social Media Links Management state
  const [socialChannels, setSocialChannels] = useState<any[]>([]);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [editingSocialChannel, setEditingSocialChannel] = useState<any>(null);
  const [socialChannelForm, setSocialChannelForm] = useState({
    platform: 'linkedin',
    name: '',
    url: '',
    handle: '',
    order: 1,
    isActive: true
  });
  const [deletingSocialTarget, setDeletingSocialTarget] = useState<any>(null);

  // Editing modals/states
  const [editingService, setEditingService] = useState<any>(null);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [deletingServiceTarget, setDeletingServiceTarget] = useState<any>(null);
  const [uploadingAssetField, setUploadingAssetField] = useState<string | null>(null);

  // Pricing & Growth Bundles CRUD states
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
  const [editingBundle, setEditingBundle] = useState<any>(null);
  const [bundleForm, setBundleForm] = useState({
    name: '',
    badge: 'Growth Package',
    category: 'Paid Advertising',
    startingPrice: 499,
    startingPriceDisplay: '$499/month',
    individualValueDisplay: '$548',
    savingsDisplay: '$49',
    headline: '',
    description: '',
    whyBuyThis: '',
    bestFor: '',
    ctaText: '',
    includedServicesShortText: '',
    includedDeliverablesText: '',
    discountNote: '',
    isPopular: false,
    isBestValue: false
  });
  const [deletingBundleTarget, setDeletingBundleTarget] = useState<any>(null);

  const [editingPage, setEditingPage] = useState<any>(null);
  const [editingLegal, setEditingLegal] = useState<any>(null);

  // Blog & Articles CRUD states
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('All');
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    category: 'Digital Marketing Basics',
    readTime: '5 min read',
    publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    excerpt: '',
    takeawaysText: '',
    contentText: '',
    isPublished: true
  });
  const [deletingBlogTarget, setDeletingBlogTarget] = useState<any>(null);

  // Portfolio / Case Studies CRUD states
  const [editingCaseStudy, setEditingCaseStudy] = useState<any>(null);
  const [isCreatingCaseStudy, setIsCreatingCaseStudy] = useState(false);
  const [portfolioCategoryFilter, setPortfolioCategoryFilter] = useState('All');
  const [caseStudyForm, setCaseStudyForm] = useState({
    title: '',
    clientPlaceholder: '',
    industry: '',
    category: 'Paid Advertising',
    challenge: '',
    strategy: '',
    measurableResult: '',
    summary: '',
    image: '/images/portfolio_growth_case_study_1793433686566.jpg',
    servicesProvidedText: '',
    keyOutputsText: '',
    isConceptWork: true,
    isPublished: true
  });
  const [deletingCaseStudyTarget, setDeletingCaseStudyTarget] = useState<any>(null);

  // Media Library states (PC / Drive Upload + URL fallback)
  const [isCreatingMedia, setIsCreatingMedia] = useState(false);
  const [mediaUploadMode, setMediaUploadMode] = useState<'upload' | 'url'>('upload');
  const [mediaUploadFile, setMediaUploadFile] = useState<{
    fileName: string;
    dataUrl: string;
    dimensions: string;
    fileSize: string;
  } | null>(null);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [deletingMediaTarget, setDeletingMediaTarget] = useState<any>(null);
  const [copiedMediaId, setCopiedMediaId] = useState<string | null>(null);
  const [newMediaForm, setNewMediaForm] = useState({ name: '', url: '', category: 'general', altText: '' });

  // SEO & Meta Tags CRUD states
  const [seoList, setSeoList] = useState<any[]>([]);
  const [previewingSeo, setPreviewingSeo] = useState<any>(null);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [editingSeo, setEditingSeo] = useState<any>(null);
  const [seoForm, setSeoForm] = useState({
    pageName: '',
    routeSlug: '/',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '/images/hero_marketing_growth_1793368523521.jpg',
    canonicalUrl: 'https://telcamarketing.com/',
    robots: 'index, follow',
    structuredDataType: 'WebPage',
    isActive: true
  });
  const [deletingSeoTarget, setDeletingSeoTarget] = useState<any>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch initial data from backend
  const applyStaticCatalogFallback = () => {
    setStaticFallbackNotice(true);
    setServices(Object.values(servicesData));
    setPortfolioList(caseStudiesData);
    setBlogList(insightsArticles);
    setPricing({ paidAdsPlatforms });
    setBundlesConfig({ readyMade: greatValueGrowthBundles, discountPercentage: 10 });
    setOverviewData({
      metrics: {
        totalEnquiries: 0,
        newEnquiries: 0,
        totalUsers: 1,
        publishedServices: Object.values(servicesData).length,
        publishedCaseStudies: caseStudiesData.length,
        publishedArticles: insightsArticles.length
      }
    });
  };

  const loadData = async () => {
    if (!token || user?.role !== 'admin') return;
    if (isStaticCloudAuth) {
      applyStaticCatalogFallback();
      return;
    }
    setLoading(true);

    try {
      const headers = { Authorization: `Bearer ${token}` };

      // 1. Overview (detect non-JSON responses when hosted statically without Express server)
      const resOverview = await fetch('/api/admin/overview', { headers });
      const contentType = resOverview.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        applyStaticCatalogFallback();
        return;
      }
      setStaticFallbackNotice(false);
      if (resOverview.ok) {
        setOverviewData(await resOverview.json());
      }

      // 2. Real Analytics
      const resAnalytics = await fetch(`/api/admin/analytics?range=${analyticsRange}`, { headers });
      if (resAnalytics.ok) {
        setAnalyticsData(await resAnalytics.json());
      }

      // 3. Enquiries & Deleted Archive
      const resEnq = await fetch('/api/admin/enquiries', { headers });
      if (resEnq.ok) {
        setEnquiries(await resEnq.json());
      }
      const resTrash = await fetch('/api/admin/enquiries/trash', { headers });
      if (resTrash.ok) {
        setDeletedEnquiries(await resTrash.json());
      }

      // 4. Users
      const resUsers = await fetch('/api/admin/users', { headers });
      if (resUsers.ok) {
        setUsersList(await resUsers.json());
      }

      // 5. Pages CMS
      const resPages = await fetch('/api/admin/pages', { headers });
      if (resPages.ok) {
        setPagesList(await resPages.json());
      }

      // 6. Services
      const resServices = await fetch('/api/admin/services', { headers });
      if (resServices.ok) {
        setServices(await resServices.json());
      }

      // 7. Pricing & Bundles
      const resPricing = await fetch('/api/admin/pricing', { headers });
      if (resPricing.ok) {
        const p = await resPricing.json();
        setPricing(p.pricing);
        setBundlesConfig(p.bundles);
      }

      // 8. Legal Pages
      const resLegal = await fetch('/api/admin/legal', { headers });
      if (resLegal.ok) {
        setLegalPages(await resLegal.json());
      }

      // 9. Media
      const resMedia = await fetch('/api/admin/media', { headers });
      if (resMedia.ok) {
        setMediaList(await resMedia.json());
      }

      // 10. Portfolio & Case Studies
      const resPort = await fetch('/api/admin/portfolio', { headers });
      if (resPort.ok) {
        setPortfolioList(await resPort.json());
      }

      // 10b. Blog & Articles
      const resBlog = await fetch('/api/admin/blog', { headers });
      if (resBlog.ok) {
        setBlogList(await resBlog.json());
      }

      // 10c. SEO & Meta Tags
      const resSeo = await fetch('/api/admin/seo', { headers });
      if (resSeo.ok) {
        const sData = await resSeo.json();
        setSeoList(sData);
        if (sData.length > 0 && !previewingSeo) {
          setPreviewingSeo(sData[0]);
        }
      }

      // 11. Settings
      const resSettings = await fetch('/api/admin/settings', { headers });
      if (resSettings.ok) {
        setSiteSettings(await resSettings.json());
      }

      // 12. Security
      const resSec = await fetch('/api/admin/security', { headers });
      if (resSec.ok) {
        setSecurityData(await resSec.json());
      }

      // 13. Account Sessions & Login History
      const resSessions = await fetch('/api/admin/account/sessions', { headers });
      if (resSessions.ok) {
        setSessionsData(await resSessions.json());
      }

      // 14. Recovery Emails
      const resRec = await fetch('/api/admin/recovery', { headers });
      if (resRec.ok) {
        setRecoveryData(await resRec.json());
      }

      // 15. Business Emails
      const resBmail = await fetch('/api/admin/business-emails', { headers });
      if (resBmail.ok) {
        setBusinessEmails(await resBmail.json());
      }

      // 16. Team & Permissions
      const resTeam = await fetch('/api/admin/team', { headers });
      if (resTeam.ok) {
        setTeamData(await resTeam.json());
      }

      // 17. Backups
      const resBackups = await fetch('/api/admin/backups', { headers });
      if (resBackups.ok) {
        const b = await resBackups.json();
        setBackupsData(b.backups || []);
      }

      // 18. Notifications & Unread Counter
      const resNotif = await fetch('/api/admin/notifications', { headers });
      if (resNotif.ok) {
        const notifData = await resNotif.json();
        setNotificationConfig(notifData);
        if (notifData?.readiness && typeof notifData.readiness.unreadCount === 'number') {
          setUnreadNotificationCount(notifData.readiness.unreadCount);
        }
      }
      const resHistoryCount = await fetch('/api/admin/notifications/history?category=all', { headers });
      if (resHistoryCount.ok) {
        const histData = await resHistoryCount.json();
        setUnreadNotificationCount(histData.unreadCount || 0);
      }

      // 19. Social Media & API Integrations
      const resSocial = await fetch('/api/admin/social-integrations', { headers });
      if (resSocial.ok) {
        setSocialIntegrations(await resSocial.json());
      }
      const resSocialLinks = await fetch('/api/admin/socials', { headers });
      if (resSocialLinks.ok) {
        setSocialChannels(await resSocialLinks.json());
      }

      // 20. Visitor Journeys
      const resJourneys = await fetch('/api/admin/analytics/visitor-journeys', { headers });
      if (resJourneys.ok) {
        const jData = await resJourneys.json();
        setVisitorJourneys(Array.isArray(jData) ? jData : (jData.journeys || []));
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
      applyStaticCatalogFallback();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token, user]);

  useEffect(() => {
    if (token && !isStaticCloudAuth && user?.role === 'admin') {
      fetch(`/api/admin/analytics?range=${analyticsRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => (res.headers.get('content-type') || '').includes('application/json') ? res.json() : null)
        .then(data => { if (data) setAnalyticsData(data); })
        .catch(() => {});
    }
  }, [analyticsRange, isStaticCloudAuth, token, user]);

  const refreshUnreadNotificationsCount = async () => {
    if (!token || user?.role !== 'admin') return;
    try {
      const res = await fetch('/api/admin/notifications/history?category=all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUnreadNotificationCount(data.unreadCount || 0);
      }
    } catch {
      // ignore non-fatal unread sync error
    }
  };

  // Support deep-links from push notification clicks (e.g. /#admin?tab=enquiries&open=TM-123456)
  useEffect(() => {
    const applyDeepLink = () => {
      const rawHash = window.location.hash || '';
      const qIdx = rawHash.indexOf('?');
      if (qIdx === -1) return;
      const params = new URLSearchParams(rawHash.slice(qIdx + 1));
      const requestedTab = params.get('tab');
      const openRef = params.get('open');
      if (requestedTab) {
        setActiveTab(requestedTab as any);
      }
      if (openRef) {
        setDeepLinkOpenRef(openRef);
      }
    };
    applyDeepLink();
    window.addEventListener('hashchange', applyDeepLink);
    return () => window.removeEventListener('hashchange', applyDeepLink);
  }, []);

  useEffect(() => {
    if (!deepLinkOpenRef || enquiries.length === 0) return;
    if (activeTab === 'enquiries') {
      const match = enquiries.find(
        e => e.referenceId === deepLinkOpenRef || e.id === deepLinkOpenRef
      );
      if (match) {
        setSelectedEnquiry(match);
        setEnquiryViewTab('all');
        setDeepLinkOpenRef(null);
      }
    }
  }, [deepLinkOpenRef, enquiries, activeTab]);

  // Strict RBAC: Non-admin users or guests see strict Access Denied screen
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-red-200 p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              Access Restricted — Super Admin Only
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              This area is strictly restricted to the verified agency owner. Server-side role-based access control (RBAC) has intercepted this request.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1 text-slate-700">
            <div className="font-semibold text-slate-900">Current Session State:</div>
            <div>Authentication: {user ? 'Logged in as ' + user.email : 'Unauthenticated Guest'}</div>
            <div>Assigned Role: <span className="font-bold text-red-600">{user?.role || 'None'}</span></div>
            <div className="text-[11px] text-slate-500 pt-1">
              Public accounts cannot access administrative controls or private CRM data.
            </div>
          </div>

          {googleAuthError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-left leading-relaxed">
              {googleAuthError}
            </div>
          )}

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="button"
              disabled={googleSigningIn}
              onClick={async () => {
                setGoogleAuthError('');
                setGoogleSigningIn(true);
                const res = await loginWithGoogle();
                setGoogleSigningIn(false);
                if (!res.success && res.error) {
                  setGoogleAuthError(res.error);
                }
              }}
              className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-[#101B35] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-xs disabled:opacity-60"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z" />
                <path fill="#FBBC05" d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z" />
              </svg>
              <span>{googleSigningIn ? 'Connecting to Google...' : 'Continue with Google (Owner Access)'}</span>
            </button>
            <button
              onClick={() => onOpenAuth('signin')}
              className="w-full py-3 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              Sign In with Email / Password
            </button>
            <button
              onClick={onNavigateHome}
              className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- ACTIONS ---

  // Save Pricing & Custom Bundle rules
  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          pricing,
          bundles: bundlesConfig
        })
      });

      if (res.ok) {
        showNotification('success', 'Pricing tiers and custom bundle rules updated on live website.');
        loadData();
      } else {
        const err = await res.json();
        showNotification('error', err.error || 'Failed to update pricing');
      }
    } catch {
      showNotification('error', 'Network error updating pricing');
    }
  };

  // Update Page CMS
  const handleSavePage = async (page: any) => {
    try {
      const res = await fetch(`/api/admin/pages/${page.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(page)
      });
      if (res.ok) {
        showNotification('success', `Page "${page.title}" updated.`);
        setEditingPage(null);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to save page');
    }
  };

  // Shared PC/Drive image upload helper returning /uploads/... URL
  const uploadImageFileToLibrary = (
    file: File,
    category: string,
    onSuccessUrl: (url: string) => void,
    fieldKey: string
  ) => {
    if (file.size > 14 * 1024 * 1024) {
      showNotification('error', 'Image size must be 14 MB or smaller.');
      return;
    }
    setUploadingAssetField(fieldKey);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const sizeStr = file.size >= 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${Math.max(1, Math.round(file.size / 1024))} KB`;

      const uploadNow = async (dimensions: string) => {
        try {
          const res = await fetch('/api/admin/media/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              name: file.name.replace(/\.[^.]+$/, ''),
              fileName: file.name,
              fileData: dataUrl,
              category,
              altText: file.name.replace(/\.[^.]+$/, ''),
              dimensions,
              fileSize: sizeStr
            })
          });
          const data = await res.json();
          if (res.ok && data.media?.url) {
            onSuccessUrl(data.media.url);
            showNotification('success', `Imported "${file.name}" from device.`);
            loadData();
          } else {
            showNotification('error', data.error || 'Failed to upload image');
          }
        } catch {
          showNotification('error', 'Upload error');
        } finally {
          setUploadingAssetField(null);
        }
      };

      if (file.type.startsWith('image/')) {
        const img = new Image();
        img.onload = () => uploadNow(`${img.naturalWidth}x${img.naturalHeight}`);
        img.onerror = () => uploadNow('Auto');
        img.src = dataUrl;
      } else {
        uploadNow('Auto');
      }
    };
    reader.readAsDataURL(file);
  };

  // Create or Update Service
  const handleSaveService = async (svc: any) => {
    if (!svc?.title?.trim()) {
      showNotification('error', 'Service title is required.');
      return;
    }
    try {
      const url = isCreatingService ? '/api/admin/services' : `/api/admin/services/${svc.id}`;
      const method = isCreatingService ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(svc)
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', isCreatingService ? `New service "${svc.title}" added.` : `Service "${svc.title}" saved.`);
        setEditingService(null);
        setIsCreatingService(false);
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to save service');
      }
    } catch {
      showNotification('error', 'Failed to save service');
    }
  };

  const handleToggleServicePublish = async (svc: any) => {
    try {
      const res = await fetch(`/api/admin/services/${svc.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isPublished: svc.isPublished === false })
      });
      if (res.ok) {
        showNotification('success', `Service "${svc.title}" ${svc.isPublished === false ? 'published' : 'set to draft'}.`);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to update service visibility');
    }
  };

  const handleDeleteService = async () => {
    if (!deletingServiceTarget) return;
    try {
      const res = await fetch(`/api/admin/services/${deletingServiceTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', `Deleted service "${deletingServiceTarget.title}".`);
        setDeletingServiceTarget(null);
        loadData();
      } else {
        showNotification('error', 'Failed to delete service');
      }
    } catch {
      showNotification('error', 'Network error deleting service');
    }
  };

  // Growth Bundles CRUD Handlers
  const openNewBundleModal = () => {
    setEditingBundle(null);
    setBundleForm({
      name: '',
      badge: 'Growth Package',
      category: 'Paid Advertising',
      startingPrice: 499,
      startingPriceDisplay: '$499/month',
      individualValueDisplay: '$548',
      savingsDisplay: '$49',
      headline: '',
      description: '',
      whyBuyThis: '',
      bestFor: '',
      ctaText: '',
      includedServicesShortText: '',
      includedDeliverablesText: '',
      discountNote: '',
      isPopular: false,
      isBestValue: false
    });
    setIsBundleModalOpen(true);
  };

  const openEditBundleModal = (b: any) => {
    setEditingBundle(b);
    setBundleForm({
      name: b.name || '',
      badge: b.badge || '',
      category: b.category || 'Growth Bundle',
      startingPrice: b.startingPrice ?? 0,
      startingPriceDisplay: b.startingPriceDisplay || `$${b.startingPrice || 0}/month`,
      individualValueDisplay: b.individualValueDisplay || '',
      savingsDisplay: b.savingsDisplay || '',
      headline: b.headline || '',
      description: b.description || '',
      whyBuyThis: b.whyBuyThis || '',
      bestFor: b.bestFor || '',
      ctaText: b.ctaText || '',
      includedServicesShortText: Array.isArray(b.includedServicesShort) ? b.includedServicesShort.join('\n') : '',
      includedDeliverablesText: Array.isArray(b.includedDeliverables) ? b.includedDeliverables.join('\n') : '',
      discountNote: b.discountNote || '',
      isPopular: !!b.isPopular,
      isBestValue: !!b.isBestValue
    });
    setIsBundleModalOpen(true);
  };

  const handleSaveBundle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bundleForm.name.trim()) {
      showNotification('error', 'Bundle name is required.');
      return;
    }
    const payload = {
      name: bundleForm.name.trim(),
      badge: bundleForm.badge.trim(),
      category: bundleForm.category.trim(),
      startingPrice: Number(bundleForm.startingPrice) || 0,
      startingPriceDisplay: bundleForm.startingPriceDisplay.trim() || `$${Number(bundleForm.startingPrice) || 0}/month`,
      individualValueDisplay: bundleForm.individualValueDisplay.trim(),
      savingsDisplay: bundleForm.savingsDisplay.trim(),
      headline: bundleForm.headline.trim() || bundleForm.name.trim(),
      description: bundleForm.description.trim(),
      whyBuyThis: bundleForm.whyBuyThis.trim(),
      bestFor: bundleForm.bestFor.trim(),
      ctaText: bundleForm.ctaText.trim() || `Select ${bundleForm.name.trim()}`,
      includedServicesShort: bundleForm.includedServicesShortText.split('\n').map(s => s.trim()).filter(Boolean),
      includedDeliverables: bundleForm.includedDeliverablesText.split('\n').map(s => s.trim()).filter(Boolean),
      discountNote: bundleForm.discountNote.trim(),
      isPopular: bundleForm.isPopular,
      isBestValue: bundleForm.isBestValue
    };
    try {
      const url = editingBundle ? `/api/admin/bundles/${editingBundle.id}` : '/api/admin/bundles';
      const method = editingBundle ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', editingBundle ? `Updated bundle "${payload.name}".` : `Added bundle "${payload.name}".`);
        setIsBundleModalOpen(false);
        setEditingBundle(null);
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to save bundle');
      }
    } catch {
      showNotification('error', 'Network error saving bundle');
    }
  };

  const handleDeleteBundle = async () => {
    if (!deletingBundleTarget) return;
    try {
      const res = await fetch(`/api/admin/bundles/${deletingBundleTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', `Deleted bundle "${deletingBundleTarget.name}".`);
        setDeletingBundleTarget(null);
        loadData();
      } else {
        showNotification('error', 'Failed to delete bundle');
      }
    } catch {
      showNotification('error', 'Network error deleting bundle');
    }
  };

  // Portfolio / Case Studies CRUD Handlers
  const openNewCaseStudyModal = () => {
    setIsCreatingCaseStudy(true);
    setEditingCaseStudy(null);
    setCaseStudyForm({
      title: '',
      clientPlaceholder: '',
      industry: '',
      category: 'Paid Advertising',
      challenge: '',
      strategy: '',
      measurableResult: '',
      summary: '',
      image: '/images/portfolio_growth_case_study_1793433686566.jpg',
      servicesProvidedText: '',
      keyOutputsText: '',
      isConceptWork: true,
      isPublished: true
    });
  };

  const openEditCaseStudyModal = (cs: any) => {
    setIsCreatingCaseStudy(false);
    setEditingCaseStudy(cs);
    setCaseStudyForm({
      title: cs.title || '',
      clientPlaceholder: cs.clientPlaceholder || '',
      industry: cs.industry || '',
      category: cs.category || 'Paid Advertising',
      challenge: cs.challenge || '',
      strategy: cs.strategy || '',
      measurableResult: cs.measurableResult || '',
      summary: cs.summary || '',
      image: cs.image || '/images/portfolio_growth_case_study_1793433686566.jpg',
      servicesProvidedText: Array.isArray(cs.servicesProvided) ? cs.servicesProvided.join('\n') : '',
      keyOutputsText: Array.isArray(cs.keyOutputs) ? cs.keyOutputs.join('\n') : '',
      isConceptWork: cs.isConceptWork !== false,
      isPublished: cs.isPublished !== false
    });
  };

  const handleSaveCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseStudyForm.title.trim()) {
      showNotification('error', 'Case study title is required.');
      return;
    }
    const payload = {
      title: caseStudyForm.title.trim(),
      clientPlaceholder: caseStudyForm.clientPlaceholder.trim() || 'Client Portfolio Concept',
      industry: caseStudyForm.industry.trim() || 'Growth & Digital',
      category: caseStudyForm.category.trim(),
      challenge: caseStudyForm.challenge.trim(),
      strategy: caseStudyForm.strategy.trim(),
      measurableResult: caseStudyForm.measurableResult.trim(),
      summary: caseStudyForm.summary.trim(),
      image: caseStudyForm.image.trim() || '/images/portfolio_growth_case_study_1793433686566.jpg',
      servicesProvided: caseStudyForm.servicesProvidedText.split('\n').map(s => s.trim()).filter(Boolean),
      keyOutputs: caseStudyForm.keyOutputsText.split('\n').map(s => s.trim()).filter(Boolean),
      isConceptWork: caseStudyForm.isConceptWork,
      isPublished: caseStudyForm.isPublished
    };
    try {
      const url = editingCaseStudy ? `/api/admin/portfolio/${editingCaseStudy.id}` : '/api/admin/portfolio';
      const method = editingCaseStudy ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showNotification('success', editingCaseStudy ? 'Case study updated.' : 'New case study added.');
        setIsCreatingCaseStudy(false);
        setEditingCaseStudy(null);
        loadData();
      } else {
        showNotification('error', 'Failed to save case study');
      }
    } catch {
      showNotification('error', 'Network error saving case study');
    }
  };

  const handleToggleCaseStudyPublish = async (cs: any) => {
    try {
      const res = await fetch(`/api/admin/portfolio/${cs.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isPublished: cs.isPublished === false })
      });
      if (res.ok) {
        showNotification('success', `Case study ${cs.isPublished === false ? 'published' : 'hidden as draft'}.`);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to toggle visibility');
    }
  };

  const handleDeleteCaseStudy = async () => {
    if (!deletingCaseStudyTarget) return;
    try {
      const res = await fetch(`/api/admin/portfolio/${deletingCaseStudyTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', `Deleted case study "${deletingCaseStudyTarget.title}".`);
        setDeletingCaseStudyTarget(null);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to delete case study');
    }
  };

  // Blog & Articles CRUD Handlers
  const openNewBlogModal = () => {
    setIsCreatingBlog(true);
    setEditingBlog(null);
    setBlogForm({
      title: '',
      slug: '',
      category: 'Digital Marketing Basics',
      readTime: '5 min read',
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      excerpt: '',
      takeawaysText: '',
      contentText: '',
      isPublished: true
    });
  };

  const openEditBlogModal = (art: any) => {
    setIsCreatingBlog(false);
    setEditingBlog(art);
    setBlogForm({
      title: art.title || '',
      slug: art.slug || '',
      category: art.category || 'Digital Marketing Basics',
      readTime: art.readTime || '5 min read',
      publishedDate: art.publishedDate || '',
      excerpt: art.excerpt || '',
      takeawaysText: Array.isArray(art.takeaways) ? art.takeaways.join('\n') : '',
      contentText: Array.isArray(art.content) ? art.content.join('\n\n') : (art.content || ''),
      isPublished: art.isPublished !== false
    });
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim()) {
      showNotification('error', 'Article title is required.');
      return;
    }
    const payload = {
      title: blogForm.title.trim(),
      slug: blogForm.slug.trim() || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: blogForm.category.trim(),
      readTime: blogForm.readTime.trim() || '5 min read',
      publishedDate: blogForm.publishedDate.trim(),
      excerpt: blogForm.excerpt.trim(),
      takeaways: blogForm.takeawaysText.split('\n').map(s => s.trim()).filter(Boolean),
      content: blogForm.contentText.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean),
      isPublished: blogForm.isPublished
    };
    try {
      const url = editingBlog ? `/api/admin/blog/${editingBlog.id}` : '/api/admin/blog';
      const method = editingBlog ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showNotification('success', editingBlog ? 'Article updated.' : 'New article published.');
        setIsCreatingBlog(false);
        setEditingBlog(null);
        loadData();
      } else {
        showNotification('error', 'Failed to save article');
      }
    } catch {
      showNotification('error', 'Network error saving article');
    }
  };

  const handleToggleBlogPublish = async (art: any) => {
    try {
      const res = await fetch(`/api/admin/blog/${art.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isPublished: art.isPublished === false })
      });
      if (res.ok) {
        showNotification('success', `Article ${art.isPublished === false ? 'published' : 'moved to draft'}.`);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to update article status');
    }
  };

  const handleDeleteBlog = async () => {
    if (!deletingBlogTarget) return;
    try {
      const res = await fetch(`/api/admin/blog/${deletingBlogTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', `Deleted article "${deletingBlogTarget.title}".`);
        setDeletingBlogTarget(null);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to delete article');
    }
  };

  // SEO & Meta Tags CRUD Handlers
  const openNewSeoModal = () => {
    setEditingSeo(null);
    setSeoForm({
      pageName: '',
      routeSlug: '/',
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '/images/hero_marketing_growth_1793368523521.jpg',
      canonicalUrl: 'https://telcamarketing.com/',
      robots: 'index, follow',
      structuredDataType: 'WebPage',
      isActive: true
    });
    setIsSeoModalOpen(true);
  };

  const openEditSeoModal = (item: any) => {
    setEditingSeo(item);
    setSeoForm({
      pageName: item.pageName || '',
      routeSlug: item.routeSlug || '/',
      metaTitle: item.metaTitle || '',
      metaDescription: item.metaDescription || '',
      keywords: item.keywords || '',
      ogTitle: item.ogTitle || item.metaTitle || '',
      ogDescription: item.ogDescription || item.metaDescription || '',
      ogImage: item.ogImage || '/images/hero_marketing_growth_1793368523521.jpg',
      canonicalUrl: item.canonicalUrl || `https://telcamarketing.com${item.routeSlug || '/'}`,
      robots: item.robots || 'index, follow',
      structuredDataType: item.structuredDataType || 'WebPage',
      isActive: item.isActive !== false
    });
    setIsSeoModalOpen(true);
  };

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seoForm.pageName.trim() || !seoForm.metaTitle.trim()) {
      showNotification('error', 'Page name and meta title are required.');
      return;
    }
    try {
      const url = editingSeo ? `/api/admin/seo/${editingSeo.id}` : '/api/admin/seo';
      const method = editingSeo ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(seoForm)
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', editingSeo ? 'SEO & Meta tags updated.' : 'New SEO & Meta tag rule added.');
        setIsSeoModalOpen(false);
        setEditingSeo(null);
        if (data.seo) setPreviewingSeo(data.seo);
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to save SEO rule');
      }
    } catch {
      showNotification('error', 'Network error saving SEO rule');
    }
  };

  const handleDeleteSeo = async () => {
    if (!deletingSeoTarget) return;
    try {
      const res = await fetch(`/api/admin/seo/${deletingSeoTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', `Deleted SEO rule "${deletingSeoTarget.pageName}".`);
        if (previewingSeo?.id === deletingSeoTarget.id) setPreviewingSeo(null);
        setDeletingSeoTarget(null);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to delete SEO rule');
    }
  };

  // Update Legal Page
  const handleSaveLegal = async (legal: any) => {
    try {
      const res = await fetch(`/api/admin/legal/${legal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(legal)
      });
      if (res.ok) {
        showNotification('success', `Policy "${legal.title}" updated.`);
        setEditingLegal(null);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to update legal policy');
    }
  };

  // Select local file from PC / Drive for Media Library
  const handleMediaFileSelect = (file: File) => {
    if (file.size > 14 * 1024 * 1024) {
      showNotification('error', 'Selected file exceeds 14 MB limit.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const sizeStr = file.size >= 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${Math.max(1, Math.round(file.size / 1024))} KB`;
      const baseName = file.name.replace(/\.[^.]+$/, '');

      if (!newMediaForm.name.trim()) {
        setNewMediaForm(prev => ({
          ...prev,
          name: baseName,
          altText: prev.altText || baseName
        }));
      }

      if (file.type.startsWith('image/')) {
        const img = new Image();
        img.onload = () => {
          setMediaUploadFile({
            fileName: file.name,
            dataUrl,
            dimensions: `${img.naturalWidth}x${img.naturalHeight}`,
            fileSize: sizeStr
          });
        };
        img.onerror = () => {
          setMediaUploadFile({ fileName: file.name, dataUrl, dimensions: 'Auto', fileSize: sizeStr });
        };
        img.src = dataUrl;
      } else {
        setMediaUploadFile({ fileName: file.name, dataUrl, dimensions: 'Media', fileSize: sizeStr });
      }
    };
    reader.readAsDataURL(file);
  };

  // Add Media Asset (PC/Drive File Upload OR URL)
  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    setMediaUploading(true);
    try {
      if (mediaUploadMode === 'upload') {
        if (!mediaUploadFile) {
          showNotification('error', 'Please select an image or media file from your PC / drive.');
          setMediaUploading(false);
          return;
        }
        const res = await fetch('/api/admin/media/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: newMediaForm.name.trim() || mediaUploadFile.fileName,
            fileName: mediaUploadFile.fileName,
            fileData: mediaUploadFile.dataUrl,
            category: newMediaForm.category,
            altText: newMediaForm.altText.trim() || newMediaForm.name.trim(),
            dimensions: mediaUploadFile.dimensions,
            fileSize: mediaUploadFile.fileSize
          })
        });
        const data = await res.json();
        if (res.ok) {
          showNotification('success', 'Media imported from device and saved to library.');
          setIsCreatingMedia(false);
          setMediaUploadFile(null);
          setNewMediaForm({ name: '', url: '', category: 'general', altText: '' });
          loadData();
        } else {
          showNotification('error', data.error || 'Failed to upload media file');
        }
      } else {
        if (!newMediaForm.name.trim() || !newMediaForm.url.trim()) {
          showNotification('error', 'Asset name and URL are required.');
          setMediaUploading(false);
          return;
        }
        const res = await fetch('/api/admin/media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newMediaForm)
        });
        if (res.ok) {
          showNotification('success', 'Asset added to media library.');
          setIsCreatingMedia(false);
          setNewMediaForm({ name: '', url: '', category: 'general', altText: '' });
          loadData();
        } else {
          showNotification('error', 'Failed to add media asset');
        }
      }
    } catch {
      showNotification('error', 'Failed to add media asset');
    } finally {
      setMediaUploading(false);
    }
  };

  // Delete Media Asset (via In-UI Confirmation Modal)
  const handleDeleteMedia = async () => {
    if (!deletingMediaTarget) return;
    try {
      const res = await fetch(`/api/admin/media/${deletingMediaTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', `Deleted media asset "${deletingMediaTarget.name}".`);
        setDeletingMediaTarget(null);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to delete media asset');
    }
  };

  // Update Global Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(siteSettings)
      });
      if (res.ok) {
        showNotification('success', 'Global agency settings saved.');
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to save settings');
    }
  };

  // Toggle User Status
  const handleToggleUserStatus = async (targetUser: any) => {
    const newStatus = targetUser.status === 'active' ? 'suspended' : 'active';
    try {
      const res = await fetch(`/api/admin/users/${targetUser.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        showNotification('success', `User account ${targetUser.email} is now ${newStatus}.`);
        loadData();
      } else {
        const err = await res.json();
        showNotification('error', err.error || 'Failed to update user status');
      }
    } catch {
      showNotification('error', 'Network error updating user status');
    }
  };

  // Update Enquiry Status
  const handleUpdateEnquiryStatus = async (enquiryId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showNotification('success', 'Enquiry status updated.');
        loadData();
        if (selectedEnquiry) {
          setSelectedEnquiry({ ...selectedEnquiry, status });
        }
      }
    } catch {
      showNotification('error', 'Failed to update status');
    }
  };

  // Add Note to Enquiry
  const handleAddNote = async (enquiryId: string) => {
    if (!newNoteText.trim()) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: newNoteText })
      });
      if (res.ok) {
        showNotification('success', 'Internal note logged.');
        setNewNoteText('');
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to add note');
    }
  };

  // Edit Lead / Enquiry Details
  const handleSaveEnquiryEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEnquiry) return;
    setSavingEnquiryEdit(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${editingEnquiry.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editingEnquiry)
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', `Lead [${editingEnquiry.referenceId}] updated successfully.`);
        if (selectedEnquiry && selectedEnquiry.id === editingEnquiry.id) {
          setSelectedEnquiry(data.enquiry);
        }
        setEditingEnquiry(null);
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to update lead record');
      }
    } catch {
      showNotification('error', 'Network error updating lead record');
    } finally {
      setSavingEnquiryEdit(false);
    }
  };

  // Confirm Delete / Trash / Restore / Permanent Purge
  const handleConfirmEnquiryDelete = async () => {
    if (!deletingEnquiryTarget) return;
    const { id, mode } = deletingEnquiryTarget;
    try {
      if (mode === 'soft') {
        const res = await fetch(`/api/admin/enquiries/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          showNotification('success', 'Lead moved to Deleted Archive.');
          if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
          setSelectedEnquiryIds(prev => prev.filter(x => x !== id));
        }
      } else if (mode === 'permanent') {
        const res = await fetch(`/api/admin/enquiries/${id}/permanent`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          showNotification('success', 'Lead permanently deleted.');
        }
      } else if (mode === 'bulk') {
        const res = await fetch('/api/admin/enquiries/bulk-delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ ids: selectedEnquiryIds })
        });
        if (res.ok) {
          showNotification('success', `${selectedEnquiryIds.length} lead(s) moved to Deleted Archive.`);
          setSelectedEnquiryIds([]);
        }
      } else if (mode === 'empty_trash') {
        const res = await fetch('/api/admin/enquiries/trash/empty', {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          showNotification('success', 'Deleted Archive emptied permanently.');
        }
      }
      setDeletingEnquiryTarget(null);
      loadData();
    } catch {
      showNotification('error', 'Error processing deletion request.');
    }
  };

  const handleRestoreEnquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}/restore`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', 'Lead restored to active CRM pipeline.');
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to restore lead');
    }
  };

  const handleBulkUpdateStatus = async (status: string) => {
    if (selectedEnquiryIds.length === 0) return;
    try {
      const res = await fetch('/api/admin/enquiries/bulk-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ids: selectedEnquiryIds, status })
      });
      if (res.ok) {
        showNotification('success', `Updated ${selectedEnquiryIds.length} lead(s) to ${status.replace('_', ' ')}.`);
        setSelectedEnquiryIds([]);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to bulk update status');
    }
  };

  // Social Media Links CRUD Handlers
  const handleSaveSocialChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialChannelForm.name.trim() || !socialChannelForm.url.trim()) {
      showNotification('error', 'Platform name and profile URL are required.');
      return;
    }
    try {
      const endpoint = editingSocialChannel
        ? `/api/admin/socials/${editingSocialChannel.id}`
        : '/api/admin/socials';
      const method = editingSocialChannel ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(socialChannelForm)
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', editingSocialChannel ? 'Social channel updated.' : 'New social channel added.');
        setIsSocialModalOpen(false);
        setEditingSocialChannel(null);
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to save social channel');
      }
    } catch {
      showNotification('error', 'Network error saving social channel');
    }
  };

  const handleToggleSocialActive = async (channel: any) => {
    try {
      const res = await fetch(`/api/admin/socials/${channel.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !channel.isActive })
      });
      if (res.ok) {
        showNotification('success', `${channel.name} ${!channel.isActive ? 'activated on website' : 'hidden from website'}.`);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to toggle social visibility');
    }
  };

  const handleDeleteSocialChannel = async () => {
    if (!deletingSocialTarget) return;
    try {
      const res = await fetch(`/api/admin/socials/${deletingSocialTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', `Deleted social channel [${deletingSocialTarget.name}].`);
        setDeletingSocialTarget(null);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to delete social channel');
    }
  };

  // Export Enquiries as CSV
  const handleExportEnquiriesCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['Reference ID', 'Type', 'Full Name', 'Email', 'Company', 'Status', 'Final Price', 'Date'];
    const rows = enquiries.map(e => [
      e.referenceId,
      e.type,
      `"${e.fullName}"`,
      e.businessEmail,
      `"${e.companyName}"`,
      e.status,
      e.finalPrice || 0,
      new Date(e.createdAt).toISOString()
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `telca-enquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Password Strength Calculator
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    const checks = {
      length: pass.length >= 8,
      upper: /[A-Z]/.test(pass),
      lower: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[^A-Za-z0-9]/.test(pass)
    };
    if (checks.length) score++;
    if (checks.upper && checks.lower) score++;
    if (checks.number) score++;
    if (checks.special) score++;

    let label = 'Weak';
    let color = 'bg-red-500 text-red-700';
    if (score === 2) { label = 'Fair'; color = 'bg-amber-500 text-amber-700'; }
    if (score === 3) { label = 'Good'; color = 'bg-blue-500 text-blue-700'; }
    if (score === 4) { label = 'Strong'; color = 'bg-emerald-500 text-emerald-700'; }

    return { score, label, color, checks };
  };

  // 1. Password change handler
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showNotification('error', 'Current and new password are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      showNotification('error', 'New password and confirmation do not match');
      return;
    }
    if (newPassword.length < 8) {
      showNotification('error', 'Password must be at least 8 characters long');
      return;
    }

    setPasswordChangeLoading(true);
    try {
      const res = await fetch('/api/admin/account/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', data.message || 'Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to update password');
      }
    } catch {
      showNotification('error', 'Network error changing password');
    } finally {
      setPasswordChangeLoading(false);
    }
  };

  // 2. Emergency Password Reset Link Generator
  const handleGenerateResetPreview = async () => {
    try {
      const res = await fetch('/api/admin/account/request-reset', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', `Reset Token Generated: ${data.token}. Link: ${data.resetUrl}`);
      }
    } catch {
      showNotification('error', 'Failed to generate reset link');
    }
  };

  // 3. Request email change
  const handleRequestEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmailInput || !newEmailInput.includes('@')) {
      showNotification('error', 'Please enter a valid email address');
      return;
    }
    try {
      const res = await fetch('/api/admin/account/update-email/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ newEmail: newEmailInput })
      });
      const data = await res.json();
      if (res.ok) {
        setPendingEmailChange(data.pendingEmail);
        setCodeVerificationPreview(data.verificationCodePreview);
        showNotification('success', data.message || 'Verification code sent!');
      } else {
        showNotification('error', data.error || 'Failed to request email change');
      }
    } catch {
      showNotification('error', 'Network error requesting email change');
    }
  };

  // 4. Confirm email change
  const handleConfirmEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailVerificationCode) {
      showNotification('error', 'Please enter the 6-digit verification code');
      return;
    }
    try {
      const res = await fetch('/api/admin/account/update-email/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ code: emailVerificationCode })
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', data.message || 'Login email successfully updated!');
        setPendingEmailChange(null);
        setEmailVerificationCode('');
        setNewEmailInput('');
        setCodeVerificationPreview(null);
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to verify email change code');
      }
    } catch {
      showNotification('error', 'Network error confirming email change');
    }
  };

  // 5. Revoke other sessions
  const handleRevokeOtherSessions = async () => {
    try {
      const res = await fetch('/api/admin/account/sessions/revoke-others', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', 'All other active sessions have been signed out.');
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to terminate other sessions');
    }
  };

  // 6. Toggle MFA
  const handleToggleMfa = async (enabled: boolean) => {
    try {
      const res = await fetch('/api/admin/account/mfa', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ enabled, method: 'authenticator' })
      });
      if (res.ok) {
        showNotification('success', `Multi-factor authentication is now ${enabled ? 'ENABLED' : 'DISABLED'}.`);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to update MFA');
    }
  };

  // 7. Add Backup Recovery Email
  const handleAddBackupEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBackupEmail || !newBackupEmail.includes('@')) {
      showNotification('error', 'Please enter a valid backup email');
      return;
    }
    try {
      const res = await fetch('/api/admin/recovery/backup-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email: newBackupEmail, label: newBackupLabel })
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', `Backup recovery email added. Verification code: ${data.verificationCodePreview}`);
        setIsAddingBackupEmail(false);
        setNewBackupEmail('');
        setNewBackupLabel('');
        setVerifyingBackupId(data.recoveryEmail.id);
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to add backup email');
      }
    } catch {
      showNotification('error', 'Network error adding backup email');
    }
  };

  // 8. Send Code for Backup Email
  const handleSendBackupCode = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/recovery/backup-email/${id}/send-code`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', `Verification code sent! (Preview: ${data.verificationCodePreview})`);
        setVerifyingBackupId(id);
      }
    } catch {
      showNotification('error', 'Failed to send verification code');
    }
  };

  // 9. Confirm Backup Email Code
  const handleVerifyBackupEmail = async (id: string) => {
    if (!backupVerifyCode) {
      showNotification('error', 'Please enter the 6-digit code');
      return;
    }
    try {
      const res = await fetch(`/api/admin/recovery/backup-email/${id}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ code: backupVerifyCode })
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', data.message || 'Recovery email verified!');
        setVerifyingBackupId(null);
        setBackupVerifyCode('');
        loadData();
      } else {
        showNotification('error', data.error || 'Invalid verification code');
      }
    } catch {
      showNotification('error', 'Failed to verify recovery email');
    }
  };

  // 10. Delete Backup Email
  const handleDeleteBackupEmail = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/recovery/backup-email/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', 'Recovery email removed.');
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to delete recovery email');
    }
  };

  // 11. Save Business Email (Create or Edit)
  const handleSaveBusinessEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingBusinessEmail 
        ? `/api/admin/business-emails/${editingBusinessEmail.id}` 
        : '/api/admin/business-emails';
      const method = editingBusinessEmail ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(businessEmailForm)
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', `Business desk email ${editingBusinessEmail ? 'updated' : 'created'}.`);
        setIsAddingBusinessEmail(false);
        setEditingBusinessEmail(null);
        setBusinessEmailForm({
          email: '',
          displayName: '',
          category: 'General Business Inquiries',
          description: '',
          forwardingTo: '',
          isDefault: false
        });
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to save business email');
      }
    } catch {
      showNotification('error', 'Network error saving business email');
    }
  };

  // 12. Toggle Business Email Status
  const handleToggleBusinessEmailStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/business-emails/${id}/toggle-status`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', 'Status toggled.');
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to toggle status');
    }
  };

  // 13. Set Default Business Email
  const handleSetDefaultBusinessEmail = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/business-emails/${id}/set-default`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', 'Default business email updated.');
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to set default business email');
    }
  };

  // 14. Delete Business Email
  const handleDeleteBusinessEmail = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/business-emails/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', 'Business desk email deleted.');
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to delete business email');
      }
    } catch {
      showNotification('error', 'Network error deleting business email');
    }
  };

  // 15. Invite Team Member
  const handleInviteTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/team/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(teamInviteForm)
      });
      const data = await res.json();
      if (res.ok) {
        setRecentInviteUrl(data.inviteUrl);
        showNotification('success', data.message || 'Invitation created successfully.');
        setTeamInviteForm({ fullName: '', email: '', role: 'content_manager' });
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to invite team member');
      }
    } catch {
      showNotification('error', 'Network error inviting team member');
    }
  };

  // 16. Change Team Role
  const handleChangeTeamRole = async (id: string, role: string) => {
    try {
      const res = await fetch(`/api/admin/team/${id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', 'Team member role updated.');
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to change role');
      }
    } catch {
      showNotification('error', 'Network error changing team role');
    }
  };

  // 17. Toggle Team Status
  const handleToggleTeamStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      const res = await fetch(`/api/admin/team/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', `Team member status set to ${newStatus}.`);
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to update member status');
      }
    } catch {
      showNotification('error', 'Network error updating team member status');
    }
  };

  // 18. Revoke Team Member
  const handleRevokeTeamMember = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', data.message || 'Team access revoked.');
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to revoke team member');
      }
    } catch {
      showNotification('error', 'Network error revoking team member');
    }
  };

  // 19. Create Database Backup Snapshot
  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    try {
      const res = await fetch('/api/admin/backups/create', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', `Database snapshot ${data.backup.fileName} successfully created! (${data.backup.fileSize})`);
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to create backup snapshot');
      }
    } catch {
      showNotification('error', 'Network error creating database snapshot');
    } finally {
      setIsCreatingBackup(false);
    }
  };

  // 20. Restore Database Backup
  const handleRestoreBackup = async () => {
    if (!restoreConfirmModal) return;
    if (restoreConfirmInput.trim() !== 'RESTORE') {
      showNotification('error', 'Please type RESTORE in capital letters to confirm');
      return;
    }

    try {
      const res = await fetch(`/api/admin/backups/${restoreConfirmModal.id}/restore`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', data.message || 'Database restored successfully!');
        setRestoreConfirmModal(null);
        setRestoreConfirmInput('');
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to restore database from backup');
      }
    } catch {
      showNotification('error', 'Network error restoring database');
    }
  };

  // 21. Delete Backup
  const handleDeleteBackup = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/backups/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showNotification('success', 'Backup snapshot deleted.');
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to delete backup snapshot');
    }
  };

  // 22. Save Notification Preferences
  const handleSaveNotifications = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(notificationConfig)
      });
      if (res.ok) {
        showNotification('success', 'Push & notification preferences saved.');
        loadData();
      } else {
        const errData = await res.json().catch(() => ({}));
        showNotification('error', errData.error || 'Failed to save notification preferences');
      }
    } catch {
      showNotification('error', 'Failed to save notifications');
    }
  };

  // 23. Save Social Media Integration & Profile
  const handleSaveSocialIntegration = async (platformId: string, payload: any) => {
    try {
      const res = await fetch(`/api/admin/social-integrations/${platformId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', data.message || `Settings saved for ${platformId}`);
        loadData();
      } else {
        showNotification('error', data.error || 'Failed to update integration');
      }
    } catch {
      showNotification('error', 'Network error updating social settings');
    }
  };

  // 24. Test Social Media Platform Connection
  const handleTestSocialIntegration = async (platformId: string) => {
    setTestingSocialPlatform(platformId);
    try {
      const res = await fetch(`/api/admin/social-integrations/${platformId}/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.status === 'connected') {
        showNotification('success', data.message);
      } else {
        showNotification('error', data.message || 'Connection requires credentials');
      }
      loadData();
    } catch {
      showNotification('error', 'Network error during connection test');
    } finally {
      setTestingSocialPlatform(null);
    }
  };

  // 25. Disconnect Social Media Integration
  const handleDisconnectSocialIntegration = async (platformId: string) => {
    try {
      const res = await fetch(`/api/admin/social-integrations/${platformId}/disconnect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        showNotification('success', `Disconnected credentials for ${platformId}`);
        loadData();
      }
    } catch {
      showNotification('error', 'Failed to disconnect integration');
    }
  };

  // 26. Test Business Email Routing & Delivery Dispatch
  const handleTestBusinessEmails = async () => {
    setEmailTestingLoading(true);
    try {
      const res = await fetch('/api/admin/business-emails/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setEmailTestModal(data);
        showNotification('success', 'Email routing diagnostic completed successfully');
      } else {
        showNotification('error', data.error || 'Failed to execute delivery test');
      }
    } catch {
      showNotification('error', 'Network error testing email routing');
    } finally {
      setEmailTestingLoading(false);
    }
  };

  // Filtered Enquiries (respects separate category tabs + dropdown filters + search)
  const filteredEnquiries = enquiries.filter(e => {
    const matchesCategoryTab =
      enquiryViewTab === 'all' ||
      (enquiryViewTab === 'bundles'
        ? e.type === 'custom_bundle' || e.type === 'bundle_enquiry'
        : e.type === enquiryViewTab);
    const matchesStatus = enquiryStatusFilter === 'all' || e.status === enquiryStatusFilter;
    const matchesType = enquiryTypeFilter === 'all' || e.type === enquiryTypeFilter;
    const q = enquirySearchQuery.toLowerCase();
    const matchesSearch = q === '' ||
      (e.fullName || '').toLowerCase().includes(q) ||
      (e.companyName || '').toLowerCase().includes(q) ||
      (e.businessEmail || '').toLowerCase().includes(q) ||
      (e.referenceId || '').toLowerCase().includes(q) ||
      (e.serviceRequired || '').toLowerCase().includes(q) ||
      (e.selectedPlan || '').toLowerCase().includes(q);
    return matchesCategoryTab && matchesStatus && matchesType && matchesSearch;
  });

  const filteredDeletedEnquiries = deletedEnquiries.filter(e => {
    const q = enquirySearchQuery.toLowerCase();
    if (!q) return true;
    return (
      (e.fullName || '').toLowerCase().includes(q) ||
      (e.companyName || '').toLowerCase().includes(q) ||
      (e.businessEmail || '').toLowerCase().includes(q) ||
      (e.referenceId || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      
      {/* Top Admin Bar */}
      <header className="bg-[#101B35] text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-white/10 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 hidden lg:block"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 lg:hidden"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Clickable Brand Logo returning to Admin Overview */}
          <button
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 group text-left cursor-pointer hover:opacity-95 transition-opacity shrink-0"
            title="Click to return to Admin Overview dashboard"
          >
            <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-sm flex items-center justify-center shrink-0">
              <img
                src={MEDIA_ASSETS.telcaLogoTrimmed}
                alt="TELCA MARKETING"
                className="h-6 sm:h-7 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = MEDIA_ASSETS.telcaLogoFallback;
                }}
              />
            </div>
            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider hidden md:inline border-l border-white/15 pl-3">
              Owner Control Center
            </span>
          </button>

          {/* Header Breadcrumb indicator */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400 border-l border-white/15 pl-3">
            <span 
              onClick={() => setActiveTab('overview')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              Control Center
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-white font-semibold capitalize">
              {activeTab.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Status indicator, Notifications Bell, View Website button, & current user */}
        <div className="flex items-center gap-2 sm:gap-3.5 text-xs">
          
          {/* Notification Center Bell */}
          <button
            type="button"
            onClick={() => setActiveTab('notifications')}
            className={`relative p-2 rounded-xl border transition-all flex items-center gap-1.5 ${
              activeTab === 'notifications'
                ? 'bg-[#356DFF] text-white border-blue-400'
                : 'bg-white/5 hover:bg-white/15 text-slate-200 border-white/10'
            }`}
            title="Open Notification Center"
            aria-label="Open Notification Center"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white leading-none">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Status badge */}
          <div className="hidden sm:flex items-center gap-2 text-slate-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium hidden md:inline">Enterprise Engine Online</span>
          </div>

          {/* PROMINENT HIGH-CONTRAST "VIEW WEBSITE" BUTTON */}
          <a
            href="/#home"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#356DFF] hover:bg-blue-600 active:scale-95 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 border border-blue-400/40 group shrink-0"
            title="Open Live Public Website in a new browser tab"
          >
            <Globe className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            <span className="tracking-wide">View Website</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Current User Card */}
          <div className="hidden sm:flex items-center gap-2 pl-1 border-l border-white/10">
            <div className="w-7 h-7 rounded-lg bg-[#356DFF]/20 border border-blue-400/30 text-blue-300 flex items-center justify-center font-bold text-xs">
              {user.fullName.charAt(0)}
            </div>
            <div className="hidden lg:block text-left">
              <div className="font-semibold text-white text-xs leading-none">{user.fullName}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[140px]">{user.email}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Sidebar Navigation */}
        <aside
          className={`${
            sidebarCollapsed ? 'w-20' : 'w-64'
          } bg-white border-r border-slate-200 hidden lg:flex flex-col transition-all duration-200 z-20 shrink-0`}
        >
          <div className="p-3 border-b border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            {!sidebarCollapsed && <span>Control Modules</span>}
            <button
              onClick={loadData}
              disabled={loading}
              className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-50 ml-auto"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#356DFF]' : ''}`} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-4 text-xs">
            
            {/* Section 1: Growth & Inquiries */}
            <div className="space-y-1">
              {!sidebarCollapsed && (
                <div className="px-3 pt-1 pb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Growth &amp; Operations
                </div>
              )}
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'notifications', label: 'Notification Center', icon: Bell, badge: unreadNotificationCount },
                { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
                { id: 'enquiries', label: 'Leads & Enquiries', icon: Inbox, badge: overviewData?.metrics?.newEnquiries },
                { id: 'socials', label: 'Social Media Links', icon: Share2 },
                { id: 'pages', label: 'Pages Management', icon: FolderGit2 },
                { id: 'services', label: 'Services Management', icon: Layers },
                { id: 'pricing', label: 'Pricing & Bundles', icon: CreditCard },
                { id: 'portfolio', label: 'Portfolio & Case Studies', icon: BriefcaseIcon },
                { id: 'blog', label: 'Blog & Articles', icon: BookOpen },
                { id: 'media', label: 'Media Library', icon: ImageIcon }
              ].map((item: any) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition-colors text-left ${
                      isActive
                        ? 'bg-[#101B35] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#356DFF]' : 'text-slate-400'}`} />
                    {!sidebarCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                    {!sidebarCollapsed && item.badge > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#356DFF] text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Section 2: Security & Admin Access */}
            <div className="space-y-1">
              {!sidebarCollapsed && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Security &amp; Account
                </div>
              )}
              {[
                { id: 'account-security', label: 'Account & Password', icon: KeyRound },
                { id: 'recovery-emails', label: 'Recovery & Backup Emails', icon: ShieldCheck },
                { id: 'business-emails', label: 'Business Desks & Routing', icon: Mail },
                { id: 'team-delegation', label: 'Team & Delegated Roles', icon: Users },
                { id: 'backup-restore', label: 'Backup & Restore', icon: Database },
                { id: 'notification-settings', label: 'Push & Notification Settings', icon: Smartphone }
              ].map((item: any) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition-colors text-left ${
                      isActive
                        ? 'bg-[#101B35] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#356DFF]' : 'text-slate-400'}`} />
                    {!sidebarCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>

            {/* Section 3: Governance & Integrations */}
            <div className="space-y-1">
              {!sidebarCollapsed && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Settings &amp; Governance
                </div>
              )}
              {[
                { id: 'settings', label: 'Global Website Settings', icon: Sliders },
                { id: 'seo', label: 'SEO & Meta Tags', icon: Globe },
                { id: 'legal', label: 'Legal Policies', icon: FileCheck },
                { id: 'security', label: 'Security Engine', icon: Lock },
                { id: 'integrations', label: 'Integrations & Webhooks', icon: Radio },
                { id: 'audit-logs', label: 'Activity Audit Trail', icon: Activity }
              ].map((item: any) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition-colors text-left ${
                      isActive
                        ? 'bg-[#101B35] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#356DFF]' : 'text-slate-400'}`} />
                    {!sidebarCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>

          </div>

          <div className="p-3 border-t border-slate-100 bg-slate-50/70 text-[11px] text-slate-500">
            {!sidebarCollapsed ? (
              <div>
                <span className="font-semibold text-slate-800">Super Admin:</span>
                <div className="truncate text-slate-600">{user.email}</div>
              </div>
            ) : (
              <div className="text-center font-bold text-slate-700">SA</div>
            )}
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div 
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[85%] bg-white h-full flex flex-col p-4 shadow-2xl z-50 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#356DFF] text-white flex items-center justify-center font-black text-[10px]">
                    TM
                  </div>
                  <span className="font-bold text-sm text-[#101B35]">Admin Navigation</span>
                </div>
                <button 
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile View Website shortcut */}
              <div className="pt-3 pb-2">
                <a
                  href="/#home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-[#356DFF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <Globe className="w-4 h-4" />
                  <span>View Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>

              <div className="space-y-1 py-2 text-xs flex-1">
                {[
                  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                  { id: 'notifications', label: 'Notification Center', icon: Bell },
                  { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
                  { id: 'enquiries', label: 'Leads & Enquiries', icon: Inbox },
                  { id: 'socials', label: 'Social Media Links', icon: Share2 },
                  { id: 'account-security', label: 'Account & Password', icon: KeyRound },
                  { id: 'recovery-emails', label: 'Recovery & Backup Emails', icon: ShieldCheck },
                  { id: 'business-emails', label: 'Business Desks & Routing', icon: Mail },
                  { id: 'team-delegation', label: 'Team & Delegated Roles', icon: Users },
                  { id: 'backup-restore', label: 'Backup & Restore', icon: Database },
                  { id: 'notification-settings', label: 'Push & Notification Settings', icon: Smartphone },
                  { id: 'pages', label: 'Pages Management', icon: FolderGit2 },
                  { id: 'services', label: 'Services Management', icon: Layers },
                  { id: 'pricing', label: 'Pricing & Bundles', icon: CreditCard },
                  { id: 'portfolio', label: 'Portfolio & Case Studies', icon: BriefcaseIcon },
                  { id: 'blog', label: 'Blog & Articles', icon: BookOpen },
                  { id: 'legal', label: 'Legal Pages', icon: FileCheck },
                  { id: 'media', label: 'Media Library', icon: ImageIcon },
                  { id: 'seo', label: 'SEO Management', icon: Globe },
                  { id: 'settings', label: 'Global Website Settings', icon: Sliders },
                  { id: 'integrations', label: 'Integrations & Webhooks', icon: Radio },
                  { id: 'audit-logs', label: 'Activity Logs', icon: Activity }
                ].map((item: any) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left font-medium ${
                        activeTab === item.id ? 'bg-[#101B35] text-white font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">

          {staticFallbackNotice && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Static Hosting Preview Mode (Google / Cloud Auth Connected)</div>
                  <p className="text-amber-800 mt-0.5 leading-relaxed">
                    You are authenticated as Owner Admin, and static catalog previews are loaded. Live CRM inquiries, database edits, and email/push notifications require running the Node backend (`npm start` on a Node host or AI Studio server).
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStaticFallbackNotice(false)}
                className="p-1 text-amber-700 hover:bg-amber-100 rounded"
                aria-label="Dismiss notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Toast Notification */}
          {notification && (
            <div
              className={`p-4 rounded-2xl text-xs font-semibold shadow-lg flex items-center justify-between gap-3 animate-in fade-in duration-150 ${
                notification.type === 'success'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                {notification.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{notification.message}</span>
              </div>
              <button onClick={() => setNotification(null)} className="p-1 hover:bg-white/20 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* MODULE 1: OVERVIEW */}
          {activeTab === 'overview' && overviewData && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#356DFF]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Global Agency Command Center</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight mt-0.5">
                    Agency Executive Dashboard
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live operational overview powered by persistent JSON store &amp; first-party telemetry.
                  </p>
                </div>
                <button
                  onClick={loadData}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${loading ? 'animate-spin text-[#356DFF]' : ''}`} />
                  <span>Refresh Metrics</span>
                </button>
              </div>

              {/* 4 Core Metric Cards (with Animated Counters) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-blue-200 transition-colors">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Total Enquiries</span>
                    <Inbox className="w-4 h-4 text-[#356DFF]" />
                  </div>
                  <div className="text-2xl font-black text-[#101B35]">
                    <AnimatedCounter value={overviewData.metrics.totalEnquiries || 0} />
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span>{overviewData.metrics.newEnquiries} New Inquiries Awaiting Action</span>
                  </div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-purple-200 transition-colors">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Custom &amp; Growth Bundles</span>
                    <Package className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-black text-[#101B35]">
                    <AnimatedCounter value={overviewData.metrics.bundleEnquiries || 0} />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Calculated with 10% multi-service discount
                  </div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-emerald-200 transition-colors">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px] font-bold uppercase tracking-wider">First-Party Pageviews</span>
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-[#101B35]">
                    <AnimatedCounter value={overviewData.metrics.totalPageviews || 0} />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {overviewData.metrics.totalCtaClicks} CTA &amp; Button Interactions
                  </div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Est. Pipeline / Mo</span>
                    <TrendingUp className="w-4 h-4 text-[#356DFF]" />
                  </div>
                  <div className="text-2xl font-black text-[#356DFF]">
                    <AnimatedCounter value={overviewData.metrics.estimatedPipelineMonthly || 0} prefix="$" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Active qualified &amp; proposed retainers
                  </div>
                </div>
              </div>

              {/* Separate Lead Channel Breakdown Strip (Clickable Deep Links) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { tab: 'consultation' as const, label: 'Free Consultations', count: overviewData.metrics.consultationEnquiries || 0, color: 'text-[#356DFF] bg-blue-50 border-blue-100' },
                  { tab: 'business_audit' as const, label: 'Free Business Audits', count: overviewData.metrics.auditEnquiries || 0, color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
                  { tab: 'plan_enquiry' as const, label: 'Plan Enquiries', count: overviewData.metrics.planEnquiries || 0, color: 'text-amber-700 bg-amber-50 border-amber-100' },
                  { tab: 'bundles' as const, label: 'Bundles & Quotes', count: overviewData.metrics.bundleEnquiries || 0, color: 'text-purple-700 bg-purple-50 border-purple-100' },
                  { tab: 'contact' as const, label: 'Contact Inquiries', count: overviewData.metrics.contactEnquiries || 0, color: 'text-slate-700 bg-slate-50 border-slate-200' },
                  { tab: 'trash' as const, label: 'Deleted Archive', count: overviewData.metrics.deletedEnquiriesCount || 0, color: 'text-rose-700 bg-rose-50 border-rose-100' }
                ].map(item => (
                  <button
                    key={item.tab}
                    onClick={() => {
                      setEnquiryViewTab(item.tab);
                      setActiveTab('enquiries');
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all hover:shadow-md hover:-translate-y-0.5 ${item.color}`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 truncate">{item.label}</div>
                    <div className="text-xl font-black mt-1 tabular-nums">{item.count}</div>
                    <div className="text-[10px] font-semibold mt-0.5 opacity-75 flex items-center gap-1">
                      <span>Open View</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Animated Executive Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-sm text-[#101B35]">Traffic &amp; Lead Capture Velocity</h3>
                      <p className="text-[11px] text-slate-500">Live trend of page views, button engagements, and inbound leads</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className="text-xs font-bold text-[#356DFF] hover:underline shrink-0"
                    >
                      Deep Analytics →
                    </button>
                  </div>
                  <AnimatedTrafficLeadChart data={analyticsData?.dailySeries || []} height={220} />
                </div>

                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div>
                    <h3 className="font-extrabold text-sm text-[#101B35]">Lead Distribution by Source</h3>
                    <p className="text-[11px] text-slate-500">Click any channel to filter leads directly</p>
                  </div>
                  <AnimatedLeadSourceDonut
                    slices={analyticsData?.leadTypeBreakdown || []}
                    onSelectType={(type) => {
                      if (type === 'custom_bundle' || type === 'bundle_enquiry') {
                        setEnquiryViewTab('bundles');
                      } else if (['consultation', 'business_audit', 'plan_enquiry', 'contact'].includes(type)) {
                        setEnquiryViewTab(type as any);
                      } else {
                        setEnquiryViewTab('all');
                      }
                      setActiveTab('enquiries');
                    }}
                  />
                </div>
              </div>

              {/* Recent Enquiries & Activity Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Inbound Enquiries */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-sm text-[#101B35]">Recent Enquiries Feed</h3>
                      <p className="text-[11px] text-slate-500">Live records from public forms and bundle builder</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="text-xs font-bold text-[#356DFF] hover:underline"
                    >
                      View All CRM Records
                    </button>
                  </div>

                  <div className="space-y-3">
                    {overviewData.recentEnquiries.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">No enquiries recorded yet.</p>
                    ) : (
                      overviewData.recentEnquiries.map((enq: any) => (
                        <div
                          key={enq.id}
                          onClick={() => {
                            setSelectedEnquiry(enq);
                            setActiveTab('enquiries');
                          }}
                          className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                              <span>{enq.fullName}</span>
                              <span className="text-[10px] font-semibold text-slate-500">({enq.companyName})</span>
                              <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[9px] font-bold uppercase text-[#356DFF]">
                                {enq.type?.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                              <span>{enq.businessEmail}</span>
                              <span>·</span>
                              <span className="text-[#356DFF] font-medium">{enq.referenceId}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white border border-slate-200 text-slate-700">
                              {enq.status}
                            </span>
                            <div className="text-[10px] text-slate-400 mt-1">
                              {new Date(enq.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* System Activity & Security Status */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-sm text-[#101B35]">Audit &amp; Security Log</h3>
                      <p className="text-[11px] text-slate-500">Server-recorded administrative events</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('audit-logs')}
                      className="text-xs font-bold text-[#356DFF] hover:underline"
                    >
                      Full Audit
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {overviewData.recentActivity.map((act: any) => (
                      <div key={act.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                        <div className="flex items-center justify-between font-semibold text-slate-900">
                          <span>{act.action}</span>
                          <span className="text-[10px] font-normal text-slate-400">
                            {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{act.details}</p>
                      </div>
                    ))}
                  </div>

                  {/* System Environment Information */}
                  <div className="pt-2 border-t border-slate-100 text-[11px] space-y-1 text-slate-500">
                    <div className="flex justify-between">
                      <span>Super Admin Identity:</span>
                      <span className="font-semibold text-slate-800">{overviewData.system.superAdminOwner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Server Security:</span>
                      <span className="font-semibold text-emerald-600">Strict RBAC Enforced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 2: REAL ANALYTICS DASHBOARD & VISITOR JOURNEYS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Website Analytics &amp; Visitor Journey Tracking
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time first-party telemetry, animated conversion graphs, page dwell time, content views, and button click intelligence.
                  </p>
                </div>

                {/* Date range filter */}
                <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm text-xs">
                  {(['today', '7d', '30d', '90d', 'all'] as const).map(range => (
                    <button
                      key={range}
                      onClick={() => setAnalyticsRange(range)}
                      className={`px-3 py-1.5 rounded-lg font-bold uppercase text-[10px] transition-colors ${
                        analyticsRange === range
                          ? 'bg-[#101B35] text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {range === 'today' ? 'Today' : range === 'all' ? 'All Time' : range}
                    </button>
                  ))}
                </div>
              </div>

              {analyticsData ? (
                <div className="space-y-6">
                  {/* Summary Metric Counters (8 High-Value KPIs with Animated Counters) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Unique Visitors</span>
                      <div className="text-xl sm:text-2xl font-black text-[#101B35]">
                        <AnimatedCounter value={analyticsData.summary.uniqueVisitors || 0} />
                      </div>
                      <span className="text-[10px] text-slate-500">First-party sessions</span>
                    </div>

                    <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Page Views</span>
                      <div className="text-xl sm:text-2xl font-black text-[#356DFF]">
                        <AnimatedCounter value={analyticsData.summary.pageviews || 0} />
                      </div>
                      <span className="text-[10px] text-slate-500">Public route hits</span>
                    </div>

                    <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg Duration</span>
                      <div className="text-xl sm:text-2xl font-black text-indigo-600">
                        <AnimatedCounter value={Math.round(analyticsData.summary.avgSessionDurationSec || 0)} suffix="s" />
                      </div>
                      <span className="text-[10px] text-slate-500">Engaged reading time</span>
                    </div>

                    <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Conversion Rate</span>
                      <div className="text-xl sm:text-2xl font-black text-emerald-600">{analyticsData.summary.conversionRate || '0.0%'}</div>
                      <span className="text-[10px] text-slate-500">Inbound leads / visits</span>
                    </div>

                    <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Consultation Calls</span>
                      <div className="text-xl sm:text-2xl font-black text-[#356DFF]">
                        <AnimatedCounter value={analyticsData.summary.consultationRequests || 0} />
                      </div>
                      <span className="text-[10px] text-slate-500">Direct booking forms</span>
                    </div>

                    <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Business Audits</span>
                      <div className="text-xl sm:text-2xl font-black text-purple-600">
                        <AnimatedCounter value={analyticsData.summary.auditRequests || 0} />
                      </div>
                      <span className="text-[10px] text-slate-500">Performance reviews</span>
                    </div>

                    <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Pricing &amp; Bundle Enquiries</span>
                      <div className="text-xl sm:text-2xl font-black text-amber-600">
                        <AnimatedCounter value={(analyticsData.summary.pricingEnquiries || 0) + (analyticsData.summary.bundleEnquiries || 0)} />
                      </div>
                      <span className="text-[10px] text-slate-500">Plans &amp; custom bundles</span>
                    </div>

                    <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Button &amp; CTA Clicks</span>
                      <div className="text-xl sm:text-2xl font-black text-slate-800">
                        <AnimatedCounter value={analyticsData.summary.ctaClicks || 0} />
                      </div>
                      <span className="text-[10px] text-slate-500">Tracked interactive clicks</span>
                    </div>
                  </div>

                  {/* Animated Multi-Series Trend Graph */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-extrabold text-sm text-[#101B35]">Multi-Channel Activity &amp; Conversion Velocity</h3>
                        <p className="text-[11px] text-slate-500">Interactive daily comparison of page views, button clicks, and lead conversions</p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-[#356DFF] self-start sm:self-auto">
                        Real-Time Telemetry
                      </span>
                    </div>
                    <AnimatedTrafficLeadChart data={analyticsData.dailySeries || []} height={260} />
                  </div>

                  {/* Funnel Velocity & Lead Source Donut */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <div>
                        <h3 className="font-extrabold text-sm text-[#101B35]">Visitor-to-Lead Conversion Funnel</h3>
                        <p className="text-[11px] text-slate-500">Drop-off and progression from initial visit to submitted lead</p>
                      </div>
                      <AnimatedConversionFunnel stages={analyticsData.funnelStages || []} />
                    </div>

                    <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <div>
                        <h3 className="font-extrabold text-sm text-[#101B35]">Lead Category &amp; Pipeline Mix</h3>
                        <p className="text-[11px] text-slate-500">Breakdown across consultations, audits, plans, bundles &amp; contact</p>
                      </div>
                      <AnimatedLeadSourceDonut
                        slices={analyticsData.leadTypeBreakdown || []}
                        onSelectType={(type) => {
                          if (type === 'custom_bundle' || type === 'bundle_enquiry') {
                            setEnquiryViewTab('bundles');
                          } else if (['consultation', 'business_audit', 'plan_enquiry', 'contact'].includes(type)) {
                            setEnquiryViewTab(type as any);
                          } else {
                            setEnquiryViewTab('all');
                          }
                          setActiveTab('enquiries');
                        }}
                      />
                    </div>
                  </div>

                  {/* Behavioral Deep Dive: Time Spent per Page + Content Viewed + Buttons Clicked */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-extrabold text-sm text-[#101B35] flex items-center gap-2">
                            <Timer className="w-4 h-4 text-[#356DFF]" />
                            <span>Time Spent Per Page</span>
                          </h3>
                          <p className="text-[11px] text-slate-500">Total &amp; average dwell duration per route</p>
                        </div>
                      </div>
                      <AnimatedHorizontalBars
                        items={(analyticsData.pageTimeStats || []).map((p: any) => ({
                          label: `/${p.page}`,
                          sublabel: `${p.visits} visits · avg ${p.avgSeconds}s`,
                          value: p.totalSeconds || p.visits,
                          valueDisplay: p.totalSeconds > 0
                            ? (p.totalSeconds >= 60 ? `${Math.floor(p.totalSeconds / 60)}m ${p.totalSeconds % 60}s` : `${p.totalSeconds}s`)
                            : `${p.visits} hits`,
                          color: '#356DFF'
                        }))}
                        emptyMessage="No page dwell time recorded yet."
                      />
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <div>
                        <h3 className="font-extrabold text-sm text-[#101B35] flex items-center gap-2">
                          <Eye className="w-4 h-4 text-[#795BFF]" />
                          <span>Content &amp; Offers Viewed</span>
                        </h3>
                        <p className="text-[11px] text-slate-500">Industries, plans, bundles, case studies &amp; articles viewed</p>
                      </div>
                      <AnimatedHorizontalBars
                        items={(analyticsData.contentViewed || []).map((c: any) => ({
                          label: c.content,
                          sublabel: c.type,
                          value: c.views,
                          valueDisplay: `${c.views} views`,
                          color: '#795BFF'
                        }))}
                        emptyMessage="Content view telemetry will appear as visitors explore cards & plans."
                      />
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <div>
                        <h3 className="font-extrabold text-sm text-[#101B35] flex items-center gap-2">
                          <MousePointerClick className="w-4 h-4 text-emerald-600" />
                          <span>Buttons &amp; Actions Clicked</span>
                        </h3>
                        <p className="text-[11px] text-slate-500">Exact buttons clicked across public pages</p>
                      </div>
                      <AnimatedHorizontalBars
                        items={(analyticsData.buttonClicks || []).map((b: any) => ({
                          label: b.button,
                          sublabel: b.page ? `on /${b.page}` : undefined,
                          value: b.clicks,
                          valueDisplay: `${b.clicks} clicks`,
                          color: '#10B981'
                        }))}
                        emptyMessage="Button click events will populate as visitors interact."
                      />
                    </div>
                  </div>

                  {/* Top Landing Paths & Top CTAs Grid (Original Details Preserved + Animated Bars) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Top Landing Paths */}
                    <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <h3 className="font-extrabold text-sm text-[#101B35]">Popular Routes &amp; Practice Areas</h3>
                      <AnimatedHorizontalBars
                        items={(analyticsData.topPages || []).map((item: any) => ({
                          label: item.path,
                          value: item.views,
                          valueDisplay: `${item.views} views`,
                          color: '#356DFF'
                        }))}
                        emptyMessage="No route data in selected timeframe."
                      />
                    </div>

                    {/* Top CTA Clicks */}
                    <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <h3 className="font-extrabold text-sm text-[#101B35]">Top CTA Interactions &amp; Conversions</h3>
                      <AnimatedHorizontalBars
                        items={(analyticsData.topCtas || []).map((item: any) => ({
                          label: item.cta,
                          value: item.clicks,
                          valueDisplay: `${item.clicks} clicks`,
                          color: '#795BFF'
                        }))}
                        emptyMessage="No CTA interaction records yet."
                      />
                    </div>
                  </div>

                  {/* Device Breakdown & Services of Highest Interest */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <h3 className="font-extrabold text-sm text-[#101B35]">Visitor Device Breakdown</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-[#356DFF]" />
                            <span className="font-medium text-slate-800">Desktop Workstations</span>
                          </div>
                          <span className="font-bold text-slate-900">{analyticsData.deviceBreakdown?.desktop || 0}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-[#795BFF]" />
                            <span className="font-medium text-slate-800">Mobile &amp; Smartphones</span>
                          </div>
                          <span className="font-bold text-slate-900">{analyticsData.deviceBreakdown?.mobile || 0}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                          <div className="flex items-center gap-2">
                            <Laptop className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium text-slate-800">Tablets</span>
                          </div>
                          <span className="font-bold text-slate-900">{analyticsData.deviceBreakdown?.tablet || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <h3 className="font-extrabold text-sm text-[#101B35]">Services of Highest Interest</h3>
                      <AnimatedHorizontalBars
                        items={(analyticsData.topServices || []).map((svc: any) => ({
                          label: svc.service,
                          value: svc.views,
                          valueDisplay: `${svc.views} views`,
                          color: '#10B981'
                        }))}
                        emptyMessage="No service page views recorded yet."
                      />
                    </div>
                  </div>

                  {/* VISITOR JOURNEYS & CONVERSION PATHS TIMELINE */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="font-extrabold text-sm text-[#101B35]">Visitor Journeys: Content Viewed, Buttons Clicked &amp; Time Spent</h3>
                        <p className="text-[11px] text-slate-500">Full per-visitor trail showing exact pages, dwell durations, clicked buttons, and lead conversions</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {[
                          { id: 'all', label: `All (${visitorJourneys.length})` },
                          { id: 'converted', label: `Converted Leads (${visitorJourneys.filter(j => j.enquiryId).length})` },
                          { id: 'engaged', label: `High Engagement` }
                        ].map(f => (
                          <button
                            key={f.id}
                            onClick={() => setJourneyFilter(f.id as any)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                              journeyFilter === f.id
                                ? 'bg-[#101B35] text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const displayedJourneys = visitorJourneys.filter(j => {
                        if (journeyFilter === 'converted') return !!j.enquiryId;
                        if (journeyFilter === 'engaged') return (j.totalTimeSpentSec || 0) >= 15 || (j.events?.length || 0) >= 4;
                        return true;
                      });

                      if (displayedJourneys.length === 0) {
                        return (
                          <p className="text-center py-8 text-slate-400 text-xs">
                            No visitor journeys matching this filter yet. Telemetry logs automatically as visitors browse pages and click buttons.
                          </p>
                        );
                      }

                      return (
                        <div className="space-y-3">
                          {displayedJourneys.slice(0, 15).map((session: any) => {
                            const jId = session.id || session.sessionId;
                            const isExpanded = selectedJourneyId === jId;
                            const totalSec = session.totalTimeSpentSec || 0;
                            const timeLabel = totalSec >= 60 ? `${Math.floor(totalSec / 60)}m ${totalSec % 60}s` : `${totalSec}s`;

                            return (
                              <div
                                key={jId}
                                className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50 hover:bg-slate-50 transition-colors"
                              >
                                <div
                                  onClick={() => setSelectedJourneyId(isExpanded ? null : jId)}
                                  className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer text-xs"
                                >
                                  <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 font-mono font-bold text-slate-900 flex-wrap">
                                      <span>Session: {jId.slice(0, 14)}...</span>
                                      <span className="font-sans px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700 capitalize">
                                        {session.device}
                                      </span>
                                      <span className="font-sans px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#356DFF] flex items-center gap-1">
                                        <Timer className="w-3 h-3" />
                                        {timeLabel}
                                      </span>
                                      {session.enquiryId && (
                                        <span className="font-sans px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                          Converted: {session.enquiryRef || session.enquiryId} {session.enquiryName ? `(${session.enquiryName})` : ''}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                      Landing: <span className="font-mono text-slate-700">{session.landingPage}</span> · Pages: <span className="font-semibold text-slate-700">{(session.pagesViewed || []).length}</span> · Content Views: <span className="font-semibold text-slate-700">{(session.contentsViewed || []).length}</span> · Clicks: <span className="font-semibold text-slate-700">{(session.buttonsClicked || []).length}</span> · Started: {new Date(session.startedAt).toLocaleString()}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-[11px] text-slate-500 font-medium">
                                      {session.events?.length || 0} Steps
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                  </div>
                                </div>

                                {/* Expanded Behavioral Summary + Chronological Timeline */}
                                {isExpanded && (
                                  <div className="p-4 bg-white border-t border-slate-200 space-y-4 text-xs">
                                    {/* Quick Behavioral Breakdown Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                      <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1.5">
                                        <div className="font-bold text-[10px] uppercase tracking-wider text-[#356DFF]">
                                          Pages &amp; Time Spent
                                        </div>
                                        {Object.keys(session.timeByPage || {}).length > 0 ? (
                                          <div className="flex flex-wrap gap-1.5">
                                            {Object.entries(session.timeByPage).map(([pg, sec]: any) => (
                                              <span key={pg} className="px-2 py-0.5 rounded bg-white border border-blue-200 text-[10px] font-semibold text-slate-800">
                                                /{pg}: {sec >= 60 ? `${Math.floor(sec / 60)}m ${sec % 60}s` : `${sec}s`}
                                              </span>
                                            ))}
                                          </div>
                                        ) : (
                                          <div className="text-[11px] text-slate-500">
                                            {(session.pagesViewed || []).join(', ') || session.landingPage}
                                          </div>
                                        )}
                                      </div>

                                      <div className="p-3 rounded-xl bg-violet-50/50 border border-violet-100 space-y-1.5">
                                        <div className="font-bold text-[10px] uppercase tracking-wider text-[#795BFF]">
                                          Content &amp; Plans Viewed
                                        </div>
                                        {(session.contentsViewed || []).length > 0 ? (
                                          <div className="flex flex-wrap gap-1.5">
                                            {session.contentsViewed.map((c: string, i: number) => (
                                              <span key={i} className="px-2 py-0.5 rounded bg-white border border-violet-200 text-[10px] font-semibold text-slate-800">
                                                {c}
                                              </span>
                                            ))}
                                          </div>
                                        ) : (
                                          <div className="text-[11px] text-slate-400">General page browsing</div>
                                        )}
                                      </div>

                                      <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
                                        <div className="font-bold text-[10px] uppercase tracking-wider text-emerald-700">
                                          Buttons Clicked
                                        </div>
                                        {(session.buttonsClicked || []).length > 0 ? (
                                          <div className="flex flex-wrap gap-1.5">
                                            {session.buttonsClicked.map((b: string, i: number) => (
                                              <span key={i} className="px-2 py-0.5 rounded bg-white border border-emerald-200 text-[10px] font-semibold text-slate-800">
                                                {b}
                                              </span>
                                            ))}
                                          </div>
                                        ) : (
                                          <div className="text-[11px] text-slate-400">No button clicks captured</div>
                                        )}
                                      </div>
                                    </div>

                                    {session.enquiryId && (
                                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                                        <span className="font-semibold text-emerald-900">
                                          Converted into Lead: <strong>{session.enquiryRef || session.enquiryId}</strong> ({session.enquiryType?.replace('_', ' ')})
                                        </span>
                                        <button
                                          onClick={() => {
                                            const matched = enquiries.find(e => e.id === session.enquiryId);
                                            if (matched) {
                                              setSelectedEnquiry(matched);
                                              setActiveTab('enquiries');
                                            }
                                          }}
                                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                                        >
                                          Open Lead Dossier →
                                        </button>
                                      </div>
                                    )}

                                    <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                                      Chronological Event Sequence
                                    </div>
                                    <div className="space-y-2 border-l-2 border-blue-200 pl-3 ml-2 max-h-64 overflow-y-auto">
                                      {(session.events || []).map((ev: any, idx: number) => (
                                        <div key={idx} className="relative space-y-0.5">
                                          <div className="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-[#356DFF]" />
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-bold text-slate-800 capitalize">
                                              {ev.type?.replace('_', ' ')}:
                                            </span>
                                            <span className="text-slate-700">{ev.action || ev.label}</span>
                                            {ev.label && ev.action && ev.label !== ev.action && (
                                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{ev.label}</span>
                                            )}
                                            <span className="text-[10px] font-mono text-slate-400 ml-auto">
                                              {new Date(ev.timestamp).toLocaleTimeString()}
                                            </span>
                                          </div>
                                          {ev.details && (
                                            <p className="text-[11px] text-slate-500 font-mono">
                                              Details: {ev.details}
                                            </p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs">Loading analytics...</div>
              )}
            </div>
          )}

          {/* MODULE 3: PRICING & CUSTOM BUNDLES MANAGEMENT */}
          {activeTab === 'pricing' && pricing && bundlesConfig && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Pricing &amp; Bundle System Management
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure tier pricing, custom bundle discount percentage, and minimum service requirements.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSavePricing}
                  className="px-5 py-2.5 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Pricing Rules</span>
                </button>
              </div>

              {/* Bundle Rule Controls */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-[#101B35]">Custom Bundle Discount Parameters</h3>
                <p className="text-xs text-slate-500">
                  These settings directly govern the public interactive bundle calculator and validate discount eligibility.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Minimum Number of Services Required for Discount
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={bundlesConfig.minServicesForDiscount}
                      onChange={(e) => setBundlesConfig({
                        ...bundlesConfig,
                        minServicesForDiscount: parseInt(e.target.value, 10) || 2
                      })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Selecting fewer than this number shows the warning: &quot;Select at least one more service to unlock your discount.&quot;
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bundle Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={50}
                      value={bundlesConfig.discountPercentage}
                      onChange={(e) => setBundlesConfig({
                        ...bundlesConfig,
                        discountPercentage: parseInt(e.target.value, 10) || 0
                      })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Applied exclusively to recurring monthly management services (never to one-time setup).
                    </span>
                  </div>
                </div>
              </div>

              {/* Paid Ad Platform Pricing Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-[#101B35]">Paid Advertising Platform Pricing</h3>
                
                <div className="space-y-4">
                  {pricing.paidAdsPlatforms?.map((plat: any, idx: number) => (
                    <div key={plat.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="font-bold text-sm text-slate-900 flex items-center justify-between">
                        <span>{plat.name}</span>
                        <span className="text-xs text-slate-500 uppercase">{plat.category}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                          <label className="text-slate-600 text-[11px] font-semibold block mb-1">
                            Starter ($/mo):
                          </label>
                          <input
                            type="number"
                            value={plat.tiers.Starter?.price || ''}
                            onChange={(e) => {
                              const updated = [...pricing.paidAdsPlatforms];
                              updated[idx].tiers.Starter.price = parseInt(e.target.value, 10) || 0;
                              setPricing({ ...pricing, paidAdsPlatforms: updated });
                            }}
                            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-semibold"
                          />
                        </div>

                        <div>
                          <label className="text-slate-600 text-[11px] font-semibold block mb-1">
                            Growth ($/mo):
                          </label>
                          <input
                            type="number"
                            value={plat.tiers.Growth?.price || ''}
                            onChange={(e) => {
                              const updated = [...pricing.paidAdsPlatforms];
                              updated[idx].tiers.Growth.price = parseInt(e.target.value, 10) || 0;
                              setPricing({ ...pricing, paidAdsPlatforms: updated });
                            }}
                            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-semibold"
                          />
                        </div>

                        <div>
                          <label className="text-slate-600 text-[11px] font-semibold block mb-1">
                            Scale ($/mo):
                          </label>
                          <input
                            type="number"
                            value={plat.tiers.Scale?.price || ''}
                            onChange={(e) => {
                              const updated = [...pricing.paidAdsPlatforms];
                              updated[idx].tiers.Scale.price = parseInt(e.target.value, 10) || 0;
                              setPricing({ ...pricing, paidAdsPlatforms: updated });
                            }}
                            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-semibold"
                          />
                        </div>

                        {plat.tiers.Boost && (
                          <div>
                            <label className="text-slate-600 text-[11px] font-semibold block mb-1 text-purple-700">
                              Boost ($/mo):
                            </label>
                            <input
                              type="number"
                              value={plat.tiers.Boost.price || ''}
                              onChange={(e) => {
                                const updated = [...pricing.paidAdsPlatforms];
                                updated[idx].tiers.Boost.price = parseInt(e.target.value, 10) || 0;
                                setPricing({ ...pricing, paidAdsPlatforms: updated });
                              }}
                              className="w-full px-3 py-1.5 text-xs bg-white border border-purple-200 rounded-lg font-semibold"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Core Services Tier Pricing Quick Editor */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-[#101B35]">Creative, Social, Email, Automation &amp; Web Tier Pricing</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Adjust starting tier pricing across non-PPC service categories.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'creativeServicePricing', label: 'Creative & Content Production' },
                    { key: 'socialMediaPricing', label: 'Social Media Management' },
                    { key: 'emailMarketingPricing', label: 'Email Marketing & Retention' },
                    { key: 'automationPricing', label: 'AI & Business Automation' },
                    { key: 'websiteDevPricing', label: 'Website Design & Development' }
                  ].map((cat) => {
                    const item = pricing[cat.key];
                    if (!item || !item.tiers) return null;
                    const tierKeys = Object.keys(item.tiers);
                    return (
                      <div key={cat.key} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                        <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                          <span>{item.name || cat.label}</span>
                          <span className="text-[10px] text-slate-500 uppercase">{item.category}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                          {tierKeys.map((tk) => {
                            const tier = item.tiers[tk];
                            if (!tier || typeof tier.price !== 'number') return null;
                            return (
                              <div key={tk}>
                                <label className="text-[10px] font-semibold text-slate-600 block mb-1">{tier.displayName || tk} ($):</label>
                                <input
                                  type="number"
                                  value={tier.price ?? ''}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value, 10) || 0;
                                    setPricing({
                                      ...pricing,
                                      [cat.key]: {
                                        ...item,
                                        tiers: {
                                          ...item.tiers,
                                          [tk]: {
                                            ...tier,
                                            price: val,
                                            priceDisplay: `$${val}`
                                          }
                                        }
                                      }
                                    });
                                  }}
                                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-semibold"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Growth Bundles & Packages CRUD Management */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-extrabold text-sm text-[#101B35] flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#356DFF]" />
                      <span>Great Value Growth Bundles ({(bundlesConfig.readyMade || []).length})</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Add new packages, edit pricing &amp; deliverables, or remove bundles displayed on the Pricing &amp; Bundles page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={openNewBundleModal}
                    className="px-4 py-2.5 bg-[#356DFF] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Bundle</span>
                  </button>
                </div>

                {(bundlesConfig.readyMade || []).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(bundlesConfig.readyMade || []).map((bundle: any) => (
                      <div key={bundle.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#356DFF] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                              {bundle.category || 'Bundle'}
                            </span>
                            <div className="flex items-center gap-1">
                              {bundle.isPopular && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Popular</span>
                              )}
                              {bundle.badge && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">{bundle.badge}</span>
                              )}
                            </div>
                          </div>
                          <h4 className="font-extrabold text-sm text-[#101B35]">{bundle.name}</h4>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-black text-[#101B35]">{bundle.startingPriceDisplay || `$${bundle.startingPrice}/month`}</span>
                            {bundle.savingsDisplay && (
                              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                Save {bundle.savingsDisplay}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2">{bundle.description || bundle.headline}</p>
                          {bundle.bestFor && (
                            <div className="text-[11px] text-slate-500">
                              <strong>Best for:</strong> {bundle.bestFor}
                            </div>
                          )}
                          <div className="text-[11px] text-slate-400">
                            {(bundle.includedDeliverables || []).length} deliverables included
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-200/70 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditBundleModal(bundle)}
                            className="flex-1 py-2 px-3 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingBundleTarget(bundle)}
                            className="py-2 px-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1"
                            title="Delete Bundle"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 text-xs text-slate-500">
                    No bundles configured yet. Click &ldquo;Add New Bundle&rdquo; to create your first Growth Package.
                  </div>
                )}
              </div>

              {/* Add / Edit Bundle Modal */}
              {isBundleModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <form onSubmit={handleSaveBundle} className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 max-h-[88vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h3 className="text-base font-extrabold text-[#101B35]">
                        {editingBundle ? `Edit Bundle: ${editingBundle.name}` : 'Add New Growth Bundle'}
                      </h3>
                      <button type="button" onClick={() => setIsBundleModalOpen(false)}>
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Bundle / Package Name *</label>
                        <input
                          type="text"
                          required
                          value={bundleForm.name}
                          onChange={(e) => setBundleForm({ ...bundleForm, name: e.target.value })}
                          placeholder="e.g., Meta + Google Ads Package"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Category</label>
                        <input
                          type="text"
                          value={bundleForm.category}
                          onChange={(e) => setBundleForm({ ...bundleForm, category: e.target.value })}
                          placeholder="Paid Advertising / E-commerce / B2B"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Badge Label</label>
                        <input
                          type="text"
                          value={bundleForm.badge}
                          onChange={(e) => setBundleForm({ ...bundleForm, badge: e.target.value })}
                          placeholder="e.g., High Intent & Reach"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Monthly Price ($ USD) *</label>
                        <input
                          type="number"
                          required
                          min={0}
                          value={bundleForm.startingPrice}
                          onChange={(e) => {
                            const num = parseInt(e.target.value, 10) || 0;
                            setBundleForm({
                              ...bundleForm,
                              startingPrice: num,
                              startingPriceDisplay: `$${num}/month`
                            });
                          }}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Price Display Label</label>
                        <input
                          type="text"
                          value={bundleForm.startingPriceDisplay}
                          onChange={(e) => setBundleForm({ ...bundleForm, startingPriceDisplay: e.target.value })}
                          placeholder="$499/month"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Individual Value</label>
                        <input
                          type="text"
                          value={bundleForm.individualValueDisplay}
                          onChange={(e) => setBundleForm({ ...bundleForm, individualValueDisplay: e.target.value })}
                          placeholder="e.g., $548"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">You Save Display</label>
                        <input
                          type="text"
                          value={bundleForm.savingsDisplay}
                          onChange={(e) => setBundleForm({ ...bundleForm, savingsDisplay: e.target.value })}
                          placeholder="e.g., $49"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Headline</label>
                        <input
                          type="text"
                          value={bundleForm.headline}
                          onChange={(e) => setBundleForm({ ...bundleForm, headline: e.target.value })}
                          placeholder="e.g., More opportunities to attract customers."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={bundleForm.description}
                          onChange={(e) => setBundleForm({ ...bundleForm, description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Why Buy This?</label>
                        <textarea
                          rows={2}
                          value={bundleForm.whyBuyThis}
                          onChange={(e) => setBundleForm({ ...bundleForm, whyBuyThis: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Best For</label>
                        <input
                          type="text"
                          value={bundleForm.bestFor}
                          onChange={(e) => setBundleForm({ ...bundleForm, bestFor: e.target.value })}
                          placeholder="e.g., Restaurants, clinics, local businesses"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">CTA Button Text</label>
                        <input
                          type="text"
                          value={bundleForm.ctaText}
                          onChange={(e) => setBundleForm({ ...bundleForm, ctaText: e.target.value })}
                          placeholder="e.g., Select Meta + Google"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Card Summary Highlights (one per line)</label>
                        <textarea
                          rows={4}
                          value={bundleForm.includedServicesShortText}
                          onChange={(e) => setBundleForm({ ...bundleForm, includedServicesShortText: e.target.value })}
                          placeholder={'Meta Ads management\nGoogle Ads management'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Full Deliverables List (one per line)</label>
                        <textarea
                          rows={4}
                          value={bundleForm.includedDeliverablesText}
                          onChange={(e) => setBundleForm({ ...bundleForm, includedDeliverablesText: e.target.value })}
                          placeholder={'Meta Ads management\nGoogle Ads management\nMonthly performance report'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                        />
                      </div>

                      <div className="sm:col-span-2 flex items-center gap-6 pt-1">
                        <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={bundleForm.isPopular}
                            onChange={(e) => setBundleForm({ ...bundleForm, isPopular: e.target.checked })}
                            className="rounded border-slate-300"
                          />
                          <span>Mark as Popular Package</span>
                        </label>
                        <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={bundleForm.isBestValue}
                            onChange={(e) => setBundleForm({ ...bundleForm, isBestValue: e.target.checked })}
                            className="rounded border-slate-300"
                          />
                          <span>Mark as Best Value</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setIsBundleModalOpen(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        {editingBundle ? 'Save Bundle Changes' : 'Create Bundle'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Delete Bundle Confirmation Modal */}
              {deletingBundleTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#101B35]">Delete Growth Bundle</h3>
                        <p className="text-xs text-slate-500">This removes the bundle from your Growth Packages catalog.</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      Are you sure you want to delete <strong>{deletingBundleTarget.name}</strong> ({deletingBundleTarget.startingPriceDisplay})?
                    </p>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setDeletingBundleTarget(null)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteBundle}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        Delete Bundle
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODULE 4: LEADS & ENQUIRIES CRM */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Leads &amp; Enquiries CRM
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Separate pipelines for Free Consultations, Free Business Audits, Plan Purchases, Custom Bundles, Contact Inquiries &amp; Deleted Archive.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportEnquiriesCSV}
                    className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={loadData}
                    className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl shadow-sm"
                    title="Refresh Leads"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#356DFF]' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Separate Lead Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'all', label: 'All Active Leads', count: enquiries.length, activeClass: 'bg-[#101B35] text-white border-[#101B35]' },
                  { id: 'consultation', label: 'Free Consultations', count: enquiries.filter(e => e.type === 'consultation').length, activeClass: 'bg-[#356DFF] text-white border-[#356DFF]' },
                  { id: 'business_audit', label: 'Free Business Audits', count: enquiries.filter(e => e.type === 'business_audit').length, activeClass: 'bg-emerald-600 text-white border-emerald-600' },
                  { id: 'plan_enquiry', label: 'Plan Enquiries', count: enquiries.filter(e => e.type === 'plan_enquiry').length, activeClass: 'bg-amber-600 text-white border-amber-600' },
                  { id: 'bundles', label: 'Bundles & Quotes', count: enquiries.filter(e => e.type === 'custom_bundle' || e.type === 'bundle_enquiry').length, activeClass: 'bg-purple-600 text-white border-purple-600' },
                  { id: 'contact', label: 'Contact Inquiries', count: enquiries.filter(e => e.type === 'contact').length, activeClass: 'bg-slate-800 text-white border-slate-800' },
                  { id: 'trash', label: 'Deleted / Trash', count: deletedEnquiries.length, activeClass: 'bg-rose-600 text-white border-rose-600' }
                ].map(tab => {
                  const isActive = enquiryViewTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setEnquiryViewTab(tab.id as any);
                        setSelectedEnquiryIds([]);
                      }}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-bold whitespace-nowrap shrink-0 flex items-center gap-2 transition-all ${
                        isActive
                          ? `${tab.activeClass} shadow-sm`
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {tab.id === 'trash' && <Trash2 className="w-3.5 h-3.5" />}
                      <span>{tab.label}</span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black tabular-nums ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Filters, Search & Bulk Actions */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={enquirySearchQuery}
                      onChange={(e) => setEnquirySearchQuery(e.target.value)}
                      placeholder="Search by client name, email, company, service, plan, or reference ID..."
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  {enquiryViewTab !== 'trash' ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        value={enquiryStatusFilter}
                        onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                        className="px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                      >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="proposal_sent">Proposal Sent</option>
                        <option value="converted">Converted</option>
                        <option value="not_interested">Not Interested</option>
                        <option value="closed">Closed</option>
                      </select>

                      {enquiryViewTab === 'all' && (
                        <select
                          value={enquiryTypeFilter}
                          onChange={(e) => setEnquiryTypeFilter(e.target.value)}
                          className="px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                        >
                          <option value="all">All Types</option>
                          <option value="consultation">Free Consultation</option>
                          <option value="business_audit">Business Audit</option>
                          <option value="custom_bundle">Custom Bundle</option>
                          <option value="bundle_enquiry">Growth Bundle</option>
                          <option value="plan_enquiry">Plan Enquiry</option>
                          <option value="contact">Contact Inquiry</option>
                        </select>
                      )}
                    </div>
                  ) : (
                    deletedEnquiries.length > 0 && (
                      <button
                        onClick={() => setDeletingEnquiryTarget({
                          id: 'trash',
                          mode: 'empty_trash',
                          label: `all ${deletedEnquiries.length} archived lead(s)`
                        })}
                        className="px-3.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Empty Trash Permanently</span>
                      </button>
                    )
                  )}
                </div>

                {/* Bulk Selection Action Bar */}
                {enquiryViewTab !== 'trash' && selectedEnquiryIds.length > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                    <span className="font-bold text-[#101B35]">
                      {selectedEnquiryIds.length} lead(s) selected
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) {
                            handleBulkUpdateStatus(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg border border-blue-200 bg-white font-semibold text-xs"
                      >
                        <option value="" disabled>Bulk Change Status...</option>
                        <option value="contacted">Mark Contacted</option>
                        <option value="qualified">Mark Qualified</option>
                        <option value="proposal_sent">Mark Proposal Sent</option>
                        <option value="converted">Mark Converted</option>
                        <option value="closed">Mark Closed</option>
                      </select>

                      <button
                        onClick={() => setDeletingEnquiryTarget({
                          id: 'bulk',
                          mode: 'bulk',
                          label: `${selectedEnquiryIds.length} selected lead(s)`
                        })}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Selected</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Active Leads Table OR Deleted Archive Table */}
              {enquiryViewTab === 'trash' ? (
                <div className="bg-white rounded-2xl border border-rose-200 overflow-hidden shadow-sm">
                  <div className="px-4 py-3 bg-rose-50/70 border-b border-rose-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-900">Deleted Leads Archive ({filteredDeletedEnquiries.length})</span>
                    <span className="text-[11px] text-rose-700">Restore any accidentally deleted lead or purge permanently</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Ref ID</th>
                          <th className="py-3 px-4">Client / Company</th>
                          <th className="py-3 px-4">Type</th>
                          <th className="py-3 px-4">Deleted On</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredDeletedEnquiries.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center py-10 text-slate-400">
                              Deleted Archive is empty.
                            </td>
                          </tr>
                        ) : (
                          filteredDeletedEnquiries.map((enq: any) => (
                            <tr key={enq.id} className="hover:bg-rose-50/30 transition-colors">
                              <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{enq.referenceId}</td>
                              <td className="py-3.5 px-4">
                                <div className="font-semibold text-slate-900">{enq.fullName}</div>
                                <div className="text-[11px] text-slate-500">{enq.companyName} · {enq.businessEmail}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                                  {enq.type?.replace('_', ' ')}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-[11px] text-slate-500">
                                <div>{enq.deletedAt ? new Date(enq.deletedAt).toLocaleString() : '—'}</div>
                                <div className="text-[10px] text-slate-400">by {enq.deletedBy || 'Admin'}</div>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleRestoreEnquiry(enq.id)}
                                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-lg font-semibold text-[11px] transition-colors inline-flex items-center gap-1"
                                  >
                                    <ArchiveRestore className="w-3.5 h-3.5" />
                                    <span>Restore</span>
                                  </button>
                                  <button
                                    onClick={() => setDeletingEnquiryTarget({
                                      id: enq.id,
                                      mode: 'permanent',
                                      label: `${enq.referenceId} (${enq.fullName})`
                                    })}
                                    className="px-2.5 py-1 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white rounded-lg font-semibold text-[11px] transition-colors inline-flex items-center gap-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Purge</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-3 px-3 w-8">
                            <input
                              type="checkbox"
                              checked={filteredEnquiries.length > 0 && filteredEnquiries.every(e => selectedEnquiryIds.includes(e.id))}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedEnquiryIds(filteredEnquiries.map(item => item.id));
                                } else {
                                  setSelectedEnquiryIds([]);
                                }
                              }}
                              className="rounded border-slate-300 text-[#356DFF]"
                            />
                          </th>
                          <th className="py-3 px-4">Ref ID</th>
                          <th className="py-3 px-4">Client / Company</th>
                          <th className="py-3 px-4">Lead Type</th>
                          <th className="py-3 px-4">Specific Scope / Value</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Submitted</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredEnquiries.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="text-center py-10 text-slate-400">
                              No enquiry records matching criteria in this category.
                            </td>
                          </tr>
                        ) : (
                          filteredEnquiries.map((enq) => {
                            const isChecked = selectedEnquiryIds.includes(enq.id);
                            return (
                              <tr key={enq.id} className={`hover:bg-slate-50/70 transition-colors ${isChecked ? 'bg-blue-50/40' : ''}`}>
                                <td className="py-3.5 px-3">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedEnquiryIds(prev => [...prev, enq.id]);
                                      } else {
                                        setSelectedEnquiryIds(prev => prev.filter(id => id !== enq.id));
                                      }
                                    }}
                                    className="rounded border-slate-300 text-[#356DFF]"
                                  />
                                </td>
                                <td className="py-3.5 px-4 font-mono font-bold text-[#356DFF] whitespace-nowrap">
                                  {enq.referenceId}
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="font-semibold text-slate-900">{enq.fullName}</div>
                                  <div className="text-[11px] text-slate-500">{enq.companyName} · {enq.businessEmail}</div>
                                  {enq.phone && <div className="text-[10px] text-slate-400">{enq.phone} · {enq.country || 'Intl'}</div>}
                                </td>
                                <td className="py-3.5 px-4 whitespace-nowrap">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                    enq.type === 'consultation'
                                      ? 'bg-blue-100 text-[#356DFF]'
                                      : enq.type === 'business_audit'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : enq.type === 'custom_bundle'
                                          ? 'bg-purple-100 text-purple-800'
                                          : enq.type === 'bundle_enquiry'
                                            ? 'bg-indigo-100 text-indigo-800'
                                            : enq.type === 'plan_enquiry'
                                              ? 'bg-amber-100 text-amber-800'
                                              : 'bg-slate-100 text-slate-700'
                                  }`}>
                                    {enq.type === 'consultation'
                                      ? 'Consultation'
                                      : enq.type === 'business_audit'
                                        ? 'Business Audit'
                                        : enq.type === 'custom_bundle'
                                          ? 'Custom Bundle' 
                                          : enq.type === 'bundle_enquiry'
                                            ? 'Growth Bundle'
                                            : enq.type === 'plan_enquiry'
                                              ? 'Plan Enquiry'
                                              : 'Contact'}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 max-w-[230px]">
                                  {enq.type === 'business_audit' ? (
                                    <div className="space-y-0.5">
                                      <div className="font-semibold text-emerald-800 truncate">{enq.industry || 'Business Audit'}</div>
                                      <div className="text-[10px] text-slate-500 truncate">{enq.websiteUrl || 'No website provided'}</div>
                                    </div>
                                  ) : enq.type === 'consultation' ? (
                                    <div className="space-y-0.5">
                                      <div className="font-semibold text-slate-800 truncate">{enq.serviceRequired || 'Strategy Call'}</div>
                                      <div className="text-[10px] text-slate-500 truncate">{enq.preferredDate ? `Pref: ${enq.preferredDate}` : (enq.budget || 'Free 30-min call')}</div>
                                    </div>
                                  ) : enq.type === 'plan_enquiry' || enq.type === 'bundle_enquiry' ? (
                                    <div className="space-y-0.5">
                                      <div className="font-semibold text-slate-800 truncate">{enq.selectedPlan || enq.serviceRequired}</div>
                                      <div className="text-[10px] font-bold text-amber-700">{enq.planPrice || enq.budget}</div>
                                    </div>
                                  ) : enq.finalPrice > 0 ? (
                                    <div className="space-y-0.5">
                                      <div className="font-bold text-purple-700">${enq.finalPrice}/mo</div>
                                      <div className="text-[10px] text-slate-500">{enq.selectedServices?.length || 0} bundled services</div>
                                    </div>
                                  ) : (
                                    <span className="text-slate-600 truncate block">{enq.serviceRequired || enq.budget || 'General Inquiry'}</span>
                                  )}
                                </td>
                                <td className="py-3.5 px-4">
                                  <select
                                    value={enq.status}
                                    onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                                    className="px-2 py-1 text-[11px] font-bold rounded-lg border border-slate-200 bg-white"
                                  >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="qualified">Qualified</option>
                                    <option value="proposal_sent">Proposal Sent</option>
                                    <option value="converted">Converted</option>
                                    <option value="not_interested">Not Interested</option>
                                    <option value="closed">Closed</option>
                                  </select>
                                </td>
                                <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                                  {new Date(enq.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                  <div className="inline-flex items-center gap-1.5">
                                    <button
                                      onClick={() => setSelectedEnquiry(enq)}
                                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#101B35] hover:text-white rounded-lg font-semibold text-[11px] transition-colors inline-flex items-center gap-1"
                                      title="View Full Dossier"
                                    >
                                      <Eye className="w-3 h-3" />
                                      <span>Details</span>
                                    </button>
                                    <button
                                      onClick={() => setEditingEnquiry({ ...enq })}
                                      className="p-1.5 bg-blue-50 hover:bg-[#356DFF] text-[#356DFF] hover:text-white rounded-lg transition-colors"
                                      title="Edit Lead"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => setDeletingEnquiryTarget({
                                        id: enq.id,
                                        mode: 'soft',
                                        label: `${enq.referenceId} (${enq.fullName})`
                                      })}
                                      className="p-1.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-lg transition-colors"
                                      title="Delete Lead"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Enquiry Detail Dossier Modal (Type-Specific Breakdown + Linked Journey) */}
              {selectedEnquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
                    <div className="flex items-start justify-between pb-3 border-b border-slate-100 gap-3">
                      <div>
                        <div className="text-[11px] font-bold text-[#356DFF] uppercase tracking-wider flex items-center gap-2 flex-wrap">
                          <span>{selectedEnquiry.type?.replace('_', ' ').toUpperCase()} RECORD</span>
                          {selectedEnquiry.sessionId && (
                            <button
                              onClick={() => {
                                setSelectedJourneyId(selectedEnquiry.sessionId);
                                setSelectedEnquiry(null);
                                setActiveTab('analytics');
                              }}
                              className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-[#356DFF] hover:bg-blue-100 font-semibold transition"
                            >
                              ↳ View Full Journey Timeline
                            </button>
                          )}
                        </div>
                        <h3 className="text-lg font-extrabold text-[#101B35] mt-1">
                          {selectedEnquiry.referenceId} — {selectedEnquiry.fullName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => setEditingEnquiry({ ...selectedEnquiry })}
                          className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-[#356DFF] text-[#356DFF] hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeletingEnquiryTarget({
                            id: selectedEnquiry.id,
                            mode: 'soft',
                            label: `${selectedEnquiry.referenceId} (${selectedEnquiry.fullName})`
                          })}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                        <button
                          onClick={() => setSelectedEnquiry(null)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Lead Type Specific Highlight Banner */}
                    <div className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                      selectedEnquiry.type === 'business_audit'
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : selectedEnquiry.type === 'consultation'
                          ? 'bg-blue-50/70 border-blue-200 text-blue-950'
                          : selectedEnquiry.type === 'plan_enquiry' || selectedEnquiry.type === 'bundle_enquiry'
                            ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                            : selectedEnquiry.type === 'custom_bundle'
                              ? 'bg-purple-50/70 border-purple-200 text-purple-950'
                              : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}>
                      <div className="font-extrabold uppercase text-[10px] tracking-wider opacity-75">
                        {selectedEnquiry.type === 'business_audit'
                          ? 'Free Business Audit Submission Summary'
                          : selectedEnquiry.type === 'consultation'
                            ? 'Free Strategy Consultation Request'
                            : selectedEnquiry.type === 'plan_enquiry'
                              ? 'Plan Purchase / Onboarding Enquiry'
                              : selectedEnquiry.type === 'bundle_enquiry'
                                ? 'Growth Bundle Package Enquiry'
                                : selectedEnquiry.type === 'custom_bundle'
                                  ? 'Custom Configured Bundle Proposal'
                                  : 'Direct Contact Inquiry'}
                      </div>
                      <div className="font-bold text-sm">
                        {selectedEnquiry.selectedPlan
                          ? `${selectedEnquiry.serviceRequired} — ${selectedEnquiry.selectedPlan} (${selectedEnquiry.planPrice || 'Custom'})`
                          : selectedEnquiry.serviceRequired || 'General Marketing Strategy'}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400">Company Name:</span>
                        <div className="font-semibold text-slate-800">{selectedEnquiry.companyName}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Business Email:</span>
                        <div className="font-semibold text-slate-800 break-all">{selectedEnquiry.businessEmail}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Phone / WhatsApp:</span>
                        <div className="font-semibold text-slate-800">{selectedEnquiry.phone || 'Not provided'}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Target Country:</span>
                        <div className="font-semibold text-slate-800">{selectedEnquiry.country || 'International'}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Selected Service / Area:</span>
                        <div className="font-semibold text-[#356DFF]">
                          {selectedEnquiry.serviceRequired || 'General Strategy'} 
                          {selectedEnquiry.selectedPlan ? ` · ${selectedEnquiry.selectedPlan}` : ''}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Plan Rate / Budget:</span>
                        <div className="font-semibold text-emerald-700">
                          {selectedEnquiry.planPrice || (selectedEnquiry.finalPrice ? `$${selectedEnquiry.finalPrice}/mo` : selectedEnquiry.budget || 'Complimentary')}
                          {selectedEnquiry.billingType ? ` (${selectedEnquiry.billingType})` : ''}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Website URL:</span>
                        <div className="font-semibold text-slate-800 truncate">
                          {selectedEnquiry.websiteUrl ? (
                            <a href={selectedEnquiry.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[#356DFF] hover:underline">
                              {selectedEnquiry.websiteUrl}
                            </a>
                          ) : 'Optional / Not provided'}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Submission Date:</span>
                        <div className="font-semibold text-slate-800">{new Date(selectedEnquiry.createdAt).toLocaleString()}</div>
                      </div>
                      {selectedEnquiry.industry && (
                        <div>
                          <span className="text-slate-400">Industry:</span>
                          <div className="font-semibold text-slate-800">{selectedEnquiry.industry}</div>
                        </div>
                      )}
                      {selectedEnquiry.preferredDate && (
                        <div>
                          <span className="text-slate-400">Preferred Date:</span>
                          <div className="font-semibold text-slate-800">{selectedEnquiry.preferredDate}</div>
                        </div>
                      )}
                    </div>

                    {/* Linked Visitor Journey Preview Inside Dossier */}
                    {selectedEnquiry.sessionId && (() => {
                      const matchedJourney = visitorJourneys.find(
                        j => j.sessionId === selectedEnquiry.sessionId || j.id === selectedEnquiry.sessionId
                      );
                      if (!matchedJourney) return null;
                      return (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                          <div className="font-bold text-[#101B35] flex items-center justify-between">
                            <span>Visitor Activity Prior to Lead Submission</span>
                            <span className="text-[11px] text-[#356DFF]">
                              Total Time: {matchedJourney.totalTimeSpentSec || 0}s
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                            <div>
                              <span className="text-slate-400 font-semibold">Pages Viewed:</span>
                              <div className="text-slate-700 font-medium mt-0.5">
                                {(matchedJourney.pagesViewed || []).join(', ') || matchedJourney.landingPage}
                              </div>
                            </div>
                            <div>
                              <span className="text-slate-400 font-semibold">Content Viewed:</span>
                              <div className="text-slate-700 font-medium mt-0.5">
                                {(matchedJourney.contentsViewed || []).join(', ') || 'Direct form'}
                              </div>
                            </div>
                            <div>
                              <span className="text-slate-400 font-semibold">Buttons Clicked:</span>
                              <div className="text-slate-700 font-medium mt-0.5">
                                {(matchedJourney.buttonsClicked || []).slice(0, 4).join(', ') || 'Form CTA'}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Marketing Channels */}
                    {selectedEnquiry.marketingChannels && selectedEnquiry.marketingChannels.length > 0 && (
                      <div className="space-y-1.5 text-xs">
                        <span className="font-bold text-slate-700">Marketing Channels in Use:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedEnquiry.marketingChannels.map((ch: string, idx: number) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                              {ch}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Challenges / Pain Points */}
                    {selectedEnquiry.challenges && (
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-slate-700">Marketing Bottlenecks / Challenges:</span>
                        <p className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-amber-950 leading-relaxed font-medium">
                          {selectedEnquiry.challenges}
                        </p>
                      </div>
                    )}

                    {/* Additional Details */}
                    {(selectedEnquiry.additionalInfo || selectedEnquiry.additionalRequirements) && (
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-slate-700">Additional Information:</span>
                        <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                          {selectedEnquiry.additionalInfo || selectedEnquiry.additionalRequirements}
                        </p>
                      </div>
                    )}

                    {/* Selected Services in Custom Bundle */}
                    {selectedEnquiry.selectedServices && selectedEnquiry.selectedServices.length > 0 && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                        <div className="font-bold text-slate-900">Configured Bundle Services:</div>
                        <div className="space-y-1">
                          {selectedEnquiry.selectedServices.map((s: any, idx: number) => (
                            <div key={idx} className="flex justify-between py-1 border-b border-slate-200/60 last:border-0">
                              <span>{s.name} ({s.tier})</span>
                              <span className="font-semibold">${s.price}/{s.billingType === 'one-time' ? 'one-time' : 'mo'}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                          <span>Final Monthly Rate:</span>
                          <span className="text-[#356DFF]">${selectedEnquiry.finalPrice}/month</span>
                        </div>
                      </div>
                    )}

                    {selectedEnquiry.businessGoals && (
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-slate-700">Business Goals:</span>
                        <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                          {selectedEnquiry.businessGoals}
                        </p>
                      </div>
                    )}

                    {selectedEnquiry.message && !selectedEnquiry.challenges && (
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-slate-700">Message / Request:</span>
                        <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                          {selectedEnquiry.message}
                        </p>
                      </div>
                    )}

                    {/* Internal Strategist Notes */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      <div className="font-bold text-xs text-slate-900">Internal Strategist Notes</div>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {selectedEnquiry.notes?.map((n: any, idx: number) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-xs">
                            <div className="flex justify-between text-[10px] text-slate-500 pb-1">
                              <span className="font-bold text-[#101B35]">{n.author}</span>
                              <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-slate-700">{n.text}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          placeholder="Log an internal consultation note..."
                          className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                        />
                        <button
                          onClick={() => handleAddNote(selectedEnquiry.id)}
                          className="px-4 py-2 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold rounded-xl transition-colors"
                        >
                          Add Note
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* EDIT LEAD MODAL */}
              {editingEnquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
                  <form
                    onSubmit={handleSaveEnquiryEdit}
                    className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 text-xs"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#356DFF]">
                          Edit Lead Record · {editingEnquiry.referenceId}
                        </span>
                        <h3 className="text-lg font-extrabold text-[#101B35]">
                          Update Lead &amp; Pipeline Details
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingEnquiry(null)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={editingEnquiry.fullName || ''}
                          onChange={(e) => setEditingEnquiry({ ...editingEnquiry, fullName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Business Email *</label>
                        <input
                          type="email"
                          required
                          value={editingEnquiry.businessEmail || ''}
                          onChange={(e) => setEditingEnquiry({ ...editingEnquiry, businessEmail: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Company Name</label>
                        <input
                          type="text"
                          value={editingEnquiry.companyName || ''}
                          onChange={(e) => setEditingEnquiry({ ...editingEnquiry, companyName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                        <input
                          type="text"
                          value={editingEnquiry.phone || ''}
                          onChange={(e) => setEditingEnquiry({ ...editingEnquiry, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Website URL (Optional)</label>
                        <input
                          type="text"
                          value={editingEnquiry.websiteUrl || ''}
                          onChange={(e) => setEditingEnquiry({ ...editingEnquiry, websiteUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Country / Market</label>
                        <input
                          type="text"
                          value={editingEnquiry.country || ''}
                          onChange={(e) => setEditingEnquiry({ ...editingEnquiry, country: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Pipeline Status</label>
                        <select
                          value={editingEnquiry.status || 'new'}
                          onChange={(e) => setEditingEnquiry({ ...editingEnquiry, status: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="proposal_sent">Proposal Sent</option>
                          <option value="converted">Converted</option>
                          <option value="not_interested">Not Interested</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Service / Package</label>
                        <input
                          type="text"
                          value={editingEnquiry.serviceRequired || ''}
                          onChange={(e) => setEditingEnquiry({ ...editingEnquiry, serviceRequired: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Selected Plan</label>
                        <input
                          type="text"
                          value={editingEnquiry.selectedPlan || ''}
                          onChange={(e) => setEditingEnquiry({ ...editingEnquiry, selectedPlan: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Plan Price / Monthly Rate</label>
                        <input
                          type="text"
                          value={editingEnquiry.planPrice || ''}
                          onChange={(e) => setEditingEnquiry({ ...editingEnquiry, planPrice: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Budget Tier</label>
                        <input
                          type="text"
                          value={editingEnquiry.budget || ''}
                          onChange={(e) => setEditingEnquiry({ ...editingEnquiry, budget: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Industry / Preferred Date</label>
                        <input
                          type="text"
                          value={editingEnquiry.industry || editingEnquiry.preferredDate || ''}
                          onChange={(e) => {
                            if (editingEnquiry.type === 'consultation') {
                              setEditingEnquiry({ ...editingEnquiry, preferredDate: e.target.value });
                            } else {
                              setEditingEnquiry({ ...editingEnquiry, industry: e.target.value });
                            }
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Challenges / Project Message</label>
                      <textarea
                        rows={3}
                        value={editingEnquiry.challenges || editingEnquiry.message || editingEnquiry.businessGoals || ''}
                        onChange={(e) => setEditingEnquiry({
                          ...editingEnquiry,
                          challenges: e.target.value,
                          message: e.target.value
                        })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setEditingEnquiry(null)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={savingEnquiryEdit}
                        className="px-5 py-2 rounded-xl bg-[#356DFF] hover:bg-blue-700 text-white font-bold shadow-sm flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{savingEnquiryEdit ? 'Saving...' : 'Save Changes'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* DELETE / PURGE CONFIRMATION MODAL */}
              {deletingEnquiryTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-rose-200 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#101B35]">
                          {deletingEnquiryTarget.mode === 'permanent' || deletingEnquiryTarget.mode === 'empty_trash'
                            ? 'Confirm Permanent Deletion'
                            : 'Move Lead to Deleted Archive?'}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          {deletingEnquiryTarget.label}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      {deletingEnquiryTarget.mode === 'permanent' || deletingEnquiryTarget.mode === 'empty_trash'
                        ? 'This action will permanently purge the record(s) from the database and cannot be undone.'
                        : 'This lead will be removed from your active pipeline and moved to the Deleted / Trash tab where you can restore or permanently delete it later.'}
                    </p>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setDeletingEnquiryTarget(null)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmEnquiryDelete}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-sm"
                      >
                        {deletingEnquiryTarget.mode === 'permanent' || deletingEnquiryTarget.mode === 'empty_trash'
                          ? 'Delete Permanently'
                          : 'Confirm Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODULE 5: PAGES MANAGEMENT (CMS) */}
          {activeTab === 'pages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Website Pages Management
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Edit page headlines, subheadlines, SEO titles and meta descriptions without touching source code.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pagesList.map((p) => (
                  <div key={p.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-bold text-sm text-[#101B35]">{p.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        Published
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-600">
                      <div>
                        <strong>Slug:</strong> <code className="font-mono text-[#356DFF]">/{p.slug}</code>
                      </div>
                      <div>
                        <strong>Headline:</strong> <span className="text-slate-800 font-medium">{p.heroHeadline}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-2">
                        {p.heroSubheadline}
                      </div>
                    </div>

                    <button
                      onClick={() => setEditingPage({ ...p })}
                      className="w-full py-2 bg-slate-100 hover:bg-[#101B35] hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Content &amp; SEO</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Editing Page Drawer */}
              {editingPage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h3 className="text-base font-extrabold text-[#101B35]">
                        Edit Page: {editingPage.title}
                      </h3>
                      <button onClick={() => setEditingPage(null)}>
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Hero Headline</label>
                        <input
                          type="text"
                          value={editingPage.heroHeadline}
                          onChange={(e) => setEditingPage({ ...editingPage, heroHeadline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Hero Subheadline</label>
                        <textarea
                          rows={3}
                          value={editingPage.heroSubheadline}
                          onChange={(e) => setEditingPage({ ...editingPage, heroSubheadline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">SEO Title Tag</label>
                        <input
                          type="text"
                          value={editingPage.seoTitle}
                          onChange={(e) => setEditingPage({ ...editingPage, seoTitle: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Meta Description</label>
                        <textarea
                          rows={2}
                          value={editingPage.seoDescription}
                          onChange={(e) => setEditingPage({ ...editingPage, seoDescription: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        onClick={() => setEditingPage(null)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSavePage(editingPage)}
                        className="px-6 py-2 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        Save Page Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODULE 6: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Services &amp; Practice Areas ({services.length})
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add new agency services, update deliverables, upload visual mockups from PC, and manage descriptions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingService(true);
                    setEditingService({
                      title: '',
                      badge: 'Growth Service',
                      shortDescription: '',
                      heroHeadline: '',
                      heroSubheadline: '',
                      image: '/images/service_performance_ads_1793368524817.jpg',
                      isPublished: true
                    });
                  }}
                  className="px-4 py-2.5 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              <div className="space-y-4">
                {services.map((svc) => (
                  <div key={svc.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 max-w-2xl">
                      {svc.image && (
                        <img
                          src={resolveMediaUrl(svc.image, MEDIA_ASSETS.servicePerformanceAds)}
                          alt={svc.title}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 hidden sm:block"
                        />
                      )}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-[#356DFF]">
                            {svc.badge}
                          </span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${svc.isPublished === false ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'}`}>
                            {svc.isPublished === false ? 'Draft' : 'Published'}
                          </span>
                          <h3 className="font-extrabold text-sm text-[#101B35]">{svc.title}</h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{svc.shortDescription}</p>
                        <div className="text-[11px] text-slate-400">
                          Image Asset: <code className="font-mono text-slate-600">{svc.image}</code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleToggleServicePublish(svc)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                      >
                        {svc.isPublished === false ? 'Publish' : 'Set Draft'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingService(false);
                          setEditingService({ ...svc });
                        }}
                        className="px-4 py-2 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingServiceTarget(svc)}
                        className="px-3 py-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 text-xs font-bold rounded-xl transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add / Edit Service Modal */}
              {editingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 max-h-[88vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h3 className="text-base font-extrabold text-[#101B35]">
                        {isCreatingService ? 'Add New Service' : `Edit Service: ${editingService.title}`}
                      </h3>
                      <button type="button" onClick={() => { setEditingService(null); setIsCreatingService(false); }}>
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Service Title *</label>
                          <input
                            type="text"
                            value={editingService.title}
                            onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                            placeholder="e.g., Conversion Rate Optimization"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Category / Badge</label>
                          <input
                            type="text"
                            value={editingService.badge || ''}
                            onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                            placeholder="e.g., Growth Service"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                        <textarea
                          rows={2}
                          value={editingService.shortDescription}
                          onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Hero Headline</label>
                        <input
                          type="text"
                          value={editingService.heroHeadline || ''}
                          onChange={(e) => setEditingService({ ...editingService, heroHeadline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Service Image (Import from PC / Drive or URL)</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={editingService.image || ''}
                            onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                          />
                          <label className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#356DFF] border border-blue-200 rounded-xl font-bold cursor-pointer inline-flex items-center gap-1.5 shrink-0 justify-center">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingAssetField === 'service' ? 'Uploading...' : 'Upload from PC'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) {
                                  uploadImageFileToLibrary(f, 'service', (url) => setEditingService((prev: any) => ({ ...prev, image: url })), 'service');
                                }
                              }}
                            />
                          </label>
                        </div>
                        {mediaList.length > 0 && (
                          <select
                            value=""
                            onChange={(e) => {
                              if (e.target.value) setEditingService({ ...editingService, image: e.target.value });
                            }}
                            className="mt-2 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-medium text-slate-600"
                          >
                            <option value="">Or pick an existing asset from Media Library...</option>
                            {mediaList.map((m) => (
                              <option key={m.id} value={m.url}>{m.name} ({m.url})</option>
                            ))}
                          </select>
                        )}
                      </div>

                      <label className="flex items-center gap-2 font-semibold text-slate-700 pt-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingService.isPublished !== false}
                          onChange={(e) => setEditingService({ ...editingService, isPublished: e.target.checked })}
                          className="rounded border-slate-300"
                        />
                        <span>Published on live website</span>
                      </label>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => { setEditingService(null); setIsCreatingService(false); }}
                        className="px-4 py-2 text-xs font-semibold text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveService(editingService)}
                        className="px-6 py-2 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        {isCreatingService ? 'Create Service' : 'Save Service'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Delete Service Confirmation Modal */}
              {deletingServiceTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#101B35]">Delete Service</h3>
                        <p className="text-xs text-slate-500">This removes the service from your Services Management directory.</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      Are you sure you want to delete <strong>{deletingServiceTarget.title}</strong>?
                    </p>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setDeletingServiceTarget(null)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteService}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        Delete Service
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODULE 7: LEGAL PAGES MANAGEMENT */}
          {activeTab === 'legal' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Legal Pages &amp; Privacy Policies
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage terms, disclaimers, cookie policies, and refund guidelines across international jurisdictions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {legalPages.map((leg) => (
                  <div key={leg.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-bold text-sm text-[#101B35]">{leg.title}</span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        v{leg.version}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <div><strong>Category:</strong> {leg.category}</div>
                      <div><strong>Effective Date:</strong> {leg.effectiveDate}</div>
                      <div><strong>Last Updated:</strong> {leg.lastUpdated}</div>
                      {leg.requiresLegalReview && (
                        <div className="text-amber-600 font-semibold text-[11px] pt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Advisory: Professional jurisdiction review recommended</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setEditingLegal({ ...leg })}
                      className="w-full py-2 bg-slate-100 hover:bg-[#101B35] hover:text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Edit Legal Document
                    </button>
                  </div>
                ))}
              </div>

              {/* Editing Legal Drawer */}
              {editingLegal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h3 className="text-base font-extrabold text-[#101B35]">
                        Edit: {editingLegal.title} (v{editingLegal.version})
                      </h3>
                      <button onClick={() => setEditingLegal(null)}>
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Version Number</label>
                          <input
                            type="text"
                            value={editingLegal.version}
                            onChange={(e) => setEditingLegal({ ...editingLegal, version: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Effective Date</label>
                          <input
                            type="text"
                            value={editingLegal.effectiveDate}
                            onChange={(e) => setEditingLegal({ ...editingLegal, effectiveDate: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Policy Content</label>
                        <textarea
                          rows={12}
                          value={editingLegal.content}
                          onChange={(e) => setEditingLegal({ ...editingLegal, content: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] leading-relaxed"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        onClick={() => setEditingLegal(null)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveLegal(editingLegal)}
                        className="px-6 py-2 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        Save Legal Page
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODULE 8: MEDIA LIBRARY (PC / DRIVE UPLOAD + URL) */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Central Media Library ({mediaList.length})
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Import images &amp; media directly from your PC or drive, inspect usage, copy asset URLs, and manage visuals.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMediaUploadMode('upload');
                    setMediaUploadFile(null);
                    setNewMediaForm({ name: '', url: '', category: 'general', altText: '' });
                    setIsCreatingMedia(true);
                  }}
                  className="px-4 py-2.5 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 shadow-sm shrink-0"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import Media (PC / Drive)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaList.map((m) => (
                  <div key={m.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                    <div className="h-44 bg-slate-900 relative">
                      <img
                        src={resolveMediaUrl(m.url)}
                        alt={m.altText}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#101B35]/85 text-white text-[10px] font-bold uppercase rounded">
                        {m.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2 text-xs flex-1 flex flex-col justify-between">
                      <div>
                        <div className="font-bold text-slate-900 truncate">{m.name}</div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5 font-mono">{m.url}</div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          Dimensions: {m.dimensions} · Size: {m.fileSize}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-500">
                          Used in {m.usedIn?.length || 0} locations
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(m.url);
                              setCopiedMediaId(m.id);
                              setTimeout(() => setCopiedMediaId(null), 1500);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#356DFF] text-[10px] font-bold flex items-center gap-1 transition-colors"
                            title="Copy Asset URL"
                          >
                            {copiedMediaId === m.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedMediaId === m.id ? 'Copied' : 'Copy Path'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingMediaTarget(m)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs font-semibold p-1.5 rounded-lg transition-colors"
                            title="Delete Asset"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Import Media from PC / Drive Modal */}
              {isCreatingMedia && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <form onSubmit={handleAddMedia} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[88vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h3 className="font-extrabold text-sm text-[#101B35]">Import Media Asset</h3>
                      <button type="button" onClick={() => setIsCreatingMedia(false)}>
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    {/* Mode Toggle: PC/Drive Upload vs External URL */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setMediaUploadMode('upload')}
                        className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                          mediaUploadMode === 'upload' ? 'bg-white text-[#101B35] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <FolderOpen className="w-3.5 h-3.5 text-[#356DFF]" />
                        <span>Import from PC / Drive</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMediaUploadMode('url')}
                        className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                          mediaUploadMode === 'url' ? 'bg-white text-[#101B35] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#356DFF]" />
                        <span>Image URL / Path</span>
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      {mediaUploadMode === 'upload' ? (
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1.5">Select File from Computer / Drive *</label>
                          <label
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const dropped = e.dataTransfer.files?.[0];
                              if (dropped) handleMediaFileSelect(dropped);
                            }}
                            className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-slate-300 hover:border-[#356DFF] rounded-2xl bg-slate-50 hover:bg-blue-50/40 cursor-pointer transition-colors text-center"
                          >
                            {mediaUploadFile ? (
                              <div className="w-full space-y-2">
                                <img
                                  src={mediaUploadFile.dataUrl}
                                  alt="Preview"
                                  className="max-h-40 mx-auto rounded-xl object-contain border border-slate-200 bg-white"
                                />
                                <div className="text-[11px] font-bold text-slate-800 truncate">{mediaUploadFile.fileName}</div>
                                <div className="text-[10px] text-slate-500">
                                  {mediaUploadFile.dimensions} · {mediaUploadFile.fileSize} · Click to replace file
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="w-11 h-11 rounded-2xl bg-blue-100 text-[#356DFF] flex items-center justify-center">
                                  <Upload className="w-5 h-5" />
                                </div>
                                <div className="font-bold text-slate-800">Click to browse PC / Drive or drag &amp; drop</div>
                                <div className="text-[11px] text-slate-500">PNG, JPG, WEBP, SVG, GIF or MP4 (up to 14 MB)</div>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*,video/mp4,video/webm,.svg"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleMediaFileSelect(file);
                              }}
                            />
                          </label>
                        </div>
                      ) : (
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Image URL / Path *</label>
                          <input
                            type="text"
                            required={mediaUploadMode === 'url'}
                            value={newMediaForm.url}
                            onChange={(e) => setNewMediaForm({ ...newMediaForm, url: e.target.value })}
                            placeholder="/images/... or https://..."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Asset Name *</label>
                        <input
                          type="text"
                          required
                          value={newMediaForm.name}
                          onChange={(e) => setNewMediaForm({ ...newMediaForm, name: e.target.value })}
                          placeholder="e.g., Performance Marketing Dashboard"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Category</label>
                          <select
                            value={newMediaForm.category}
                            onChange={(e) => setNewMediaForm({ ...newMediaForm, category: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                          >
                            <option value="service">Service Practice Area</option>
                            <option value="hero">Hero Visual</option>
                            <option value="case_study">Case Study</option>
                            <option value="branding">Brand Identity</option>
                            <option value="general">General Agency</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Descriptive Alt Text</label>
                          <input
                            type="text"
                            value={newMediaForm.altText}
                            onChange={(e) => setNewMediaForm({ ...newMediaForm, altText: e.target.value })}
                            placeholder="Screen reader alt description"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsCreatingMedia(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={mediaUploading}
                        className="px-6 py-2 bg-[#101B35] hover:bg-[#356DFF] disabled:opacity-50 text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        {mediaUploading ? 'Uploading...' : mediaUploadMode === 'upload' ? 'Upload & Save Media' : 'Save Asset'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Delete Media Confirmation Modal */}
              {deletingMediaTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#101B35]">Delete Media Asset</h3>
                        <p className="text-xs text-slate-500">This permanently removes the media file from your library.</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      Are you sure you want to delete <strong>{deletingMediaTarget.name}</strong>?
                    </p>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setDeletingMediaTarget(null)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteMedia}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        Delete Asset
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODULE 8B: PORTFOLIO & CASE STUDIES MANAGEMENT */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Portfolio &amp; Case Studies ({portfolioList.length})
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage client execution frameworks, featured results, category tags, and project visuals.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openNewCaseStudyModal}
                  className="px-4 py-2.5 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Case Study</span>
                </button>
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {['All', 'Paid Advertising', 'Graphic Design', 'Video Editing', 'Social Media', 'Email Marketing', 'AI Automation'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPortfolioCategoryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      portfolioCategoryFilter === cat
                        ? 'bg-[#101B35] text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Case Studies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {portfolioList
                  .filter(cs => portfolioCategoryFilter === 'All' || cs.category === portfolioCategoryFilter)
                  .map((cs) => (
                    <div key={cs.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                      <div>
                        <div className="h-44 bg-slate-100 relative overflow-hidden">
                          <img
                            src={resolveMediaUrl(cs.image, MEDIA_ASSETS.portfolioGrowthCaseStudy)}
                            alt={cs.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-[#101B35]/85 text-white text-[10px] font-bold uppercase">
                              {cs.category}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              cs.isPublished === false ? 'bg-amber-100 text-amber-800' : 'bg-emerald-500 text-white'
                            }`}>
                              {cs.isPublished === false ? 'Draft' : 'Published'}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 space-y-2 text-xs">
                          <div className="text-[11px] font-semibold text-[#356DFF]">{cs.industry}</div>
                          <h3 className="font-extrabold text-sm text-[#101B35] leading-snug">{cs.title}</h3>
                          <p className="text-slate-600 line-clamp-2 leading-relaxed">{cs.summary || cs.challenge}</p>
                          {cs.measurableResult && (
                            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-900 font-medium line-clamp-2">
                              <strong>Outcome:</strong> {cs.measurableResult}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleCaseStudyPublish(cs)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors"
                        >
                          {cs.isPublished === false ? 'Publish' : 'Hide'}
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditCaseStudyModal(cs)}
                          className="flex-1 py-1.5 px-3 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingCaseStudyTarget(cs)}
                          className="p-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 rounded-lg transition-colors"
                          title="Delete Case Study"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {portfolioList.length === 0 && (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center text-xs text-slate-500">
                  No case studies found. Click &ldquo;Add Case Study&rdquo; to publish your first portfolio framework.
                </div>
              )}

              {/* Add / Edit Case Study Modal */}
              {(isCreatingCaseStudy || editingCaseStudy) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <form onSubmit={handleSaveCaseStudy} className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 max-h-[88vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h3 className="text-base font-extrabold text-[#101B35]">
                        {editingCaseStudy ? `Edit Case Study: ${editingCaseStudy.title}` : 'Add New Portfolio Case Study'}
                      </h3>
                      <button type="button" onClick={() => { setIsCreatingCaseStudy(false); setEditingCaseStudy(null); }}>
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Project / Case Study Title *</label>
                        <input
                          type="text"
                          required
                          value={caseStudyForm.title}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, title: e.target.value })}
                          placeholder="e.g., International Direct-to-Consumer Campaign Architecture"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Category</label>
                        <select
                          value={caseStudyForm.category}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, category: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                        >
                          <option value="Paid Advertising">Paid Advertising</option>
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Video Editing">Video Editing</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Email Marketing">Email Marketing</option>
                          <option value="AI Automation">AI Automation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Industry Vertical</label>
                        <input
                          type="text"
                          value={caseStudyForm.industry}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, industry: e.target.value })}
                          placeholder="e.g., Consumer Goods / E-Commerce"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Client Placeholder / Label</label>
                        <input
                          type="text"
                          value={caseStudyForm.clientPlaceholder}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, clientPlaceholder: e.target.value })}
                          placeholder="e.g., Modern Living & Essentials (Sample Concept)"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Cover Image (Upload from PC / Drive or URL)</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={caseStudyForm.image}
                            onChange={(e) => setCaseStudyForm({ ...caseStudyForm, image: e.target.value })}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                          />
                          <label className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#356DFF] border border-blue-200 rounded-xl font-bold cursor-pointer inline-flex items-center gap-1.5 shrink-0 justify-center">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingAssetField === 'portfolio' ? 'Uploading...' : 'Import from PC'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) {
                                  uploadImageFileToLibrary(f, 'case_study', (url) => setCaseStudyForm(prev => ({ ...prev, image: url })), 'portfolio');
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Executive Summary</label>
                        <textarea
                          rows={2}
                          value={caseStudyForm.summary}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, summary: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Challenge</label>
                        <textarea
                          rows={3}
                          value={caseStudyForm.challenge}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, challenge: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Execution Strategy</label>
                        <textarea
                          rows={3}
                          value={caseStudyForm.strategy}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, strategy: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Measurable Result / Benchmark</label>
                        <input
                          type="text"
                          value={caseStudyForm.measurableResult}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, measurableResult: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Services Provided (one per line)</label>
                        <textarea
                          rows={3}
                          value={caseStudyForm.servicesProvidedText}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, servicesProvidedText: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Key Outputs (one per line)</label>
                        <textarea
                          rows={3}
                          value={caseStudyForm.keyOutputsText}
                          onChange={(e) => setCaseStudyForm({ ...caseStudyForm, keyOutputsText: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                        />
                      </div>

                      <div className="sm:col-span-2 flex items-center gap-6 pt-1">
                        <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={caseStudyForm.isConceptWork}
                            onChange={(e) => setCaseStudyForm({ ...caseStudyForm, isConceptWork: e.target.checked })}
                            className="rounded border-slate-300"
                          />
                          <span>Label as Concept / Framework Project</span>
                        </label>
                        <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={caseStudyForm.isPublished}
                            onChange={(e) => setCaseStudyForm({ ...caseStudyForm, isPublished: e.target.checked })}
                            className="rounded border-slate-300"
                          />
                          <span>Published on website</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => { setIsCreatingCaseStudy(false); setEditingCaseStudy(null); }}
                        className="px-4 py-2 text-xs font-semibold text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        {editingCaseStudy ? 'Save Case Study' : 'Create Case Study'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Delete Case Study Confirmation Modal */}
              {deletingCaseStudyTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#101B35]">Delete Case Study</h3>
                        <p className="text-xs text-slate-500">This removes the project from Portfolio &amp; Case Studies.</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      Are you sure you want to delete <strong>{deletingCaseStudyTarget.title}</strong>?
                    </p>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setDeletingCaseStudyTarget(null)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteCaseStudy}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        Delete Case Study
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODULE 8C: BLOG & ARTICLES (INSIGHTS) MANAGEMENT */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Blog &amp; Insights Articles ({blogList.length})
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Create, edit, publish, and manage executive marketing articles and guides.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openNewBlogModal}
                  className="px-4 py-2.5 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Article</span>
                </button>
              </div>

              {/* Search & Category Filter */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative max-w-sm w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={blogSearchQuery}
                    onChange={(e) => setBlogSearchQuery(e.target.value)}
                    placeholder="Search articles by title or excerpt..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#356DFF]"
                  />
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {['All', 'Digital Marketing Basics', 'Paid Advertising', 'Social Media Marketing', 'Creative & Content', 'Email Marketing', 'AI & Automation', 'Business Growth'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setBlogCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                        blogCategoryFilter === cat
                          ? 'bg-[#101B35] text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {blogList
                  .filter((art) => {
                    const catOk = blogCategoryFilter === 'All' || art.category === blogCategoryFilter;
                    const q = blogSearchQuery.trim().toLowerCase();
                    const qOk = !q || art.title?.toLowerCase().includes(q) || art.excerpt?.toLowerCase().includes(q);
                    return catOk && qOk;
                  })
                  .map((art) => (
                    <div key={art.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4">
                      <div className="space-y-2.5 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-[#356DFF] text-[10px] font-bold uppercase">
                            {art.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            art.isPublished === false ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {art.isPublished === false ? 'Draft' : 'Published'}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-sm text-[#101B35] leading-snug">{art.title}</h3>
                        <p className="text-slate-600 line-clamp-3 leading-relaxed">{art.excerpt}</p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                          <span>{art.publishedDate}</span>
                          <span>·</span>
                          <span>{art.readTime}</span>
                          <span>·</span>
                          <span>{(art.takeaways || []).length} takeaways</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleBlogPublish(art)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors"
                        >
                          {art.isPublished === false ? 'Publish' : 'Set Draft'}
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditBlogModal(art)}
                          className="flex-1 py-1.5 px-3 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingBlogTarget(art)}
                          className="p-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 rounded-lg transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {blogList.length === 0 && (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center text-xs text-slate-500">
                  No blog articles found. Click &ldquo;Add New Article&rdquo; to publish your first guide.
                </div>
              )}

              {/* Add / Edit Article Modal */}
              {(isCreatingBlog || editingBlog) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <form onSubmit={handleSaveBlog} className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 max-h-[88vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h3 className="text-base font-extrabold text-[#101B35]">
                        {editingBlog ? `Edit Article: ${editingBlog.title}` : 'Publish New Article'}
                      </h3>
                      <button type="button" onClick={() => { setIsCreatingBlog(false); setEditingBlog(null); }}>
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Article Title *</label>
                        <input
                          type="text"
                          required
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                          placeholder="e.g., How to Allocate Paid Advertising Budget Without Waste"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">URL Slug</label>
                        <input
                          type="text"
                          value={blogForm.slug}
                          onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                          placeholder="auto-generated-from-title"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Category</label>
                        <select
                          value={blogForm.category}
                          onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                        >
                          <option value="Digital Marketing Basics">Digital Marketing Basics</option>
                          <option value="Paid Advertising">Paid Advertising</option>
                          <option value="Social Media Marketing">Social Media Marketing</option>
                          <option value="Creative & Content">Creative &amp; Content</option>
                          <option value="Email Marketing">Email Marketing</option>
                          <option value="AI & Automation">AI &amp; Automation</option>
                          <option value="Business Growth">Business Growth</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Read Time</label>
                        <input
                          type="text"
                          value={blogForm.readTime}
                          onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                          placeholder="5 min read"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Published Date</label>
                        <input
                          type="text"
                          value={blogForm.publishedDate}
                          onChange={(e) => setBlogForm({ ...blogForm, publishedDate: e.target.value })}
                          placeholder="November 2026"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Short Excerpt *</label>
                        <textarea
                          rows={2}
                          required
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Key Takeaways (one bullet per line)</label>
                        <textarea
                          rows={3}
                          value={blogForm.takeawaysText}
                          onChange={(e) => setBlogForm({ ...blogForm, takeawaysText: e.target.value })}
                          placeholder={'Focus on customer acquisition cost.\nInstall conversion pixels before launching ads.'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Article Body (separate paragraphs with a blank line)</label>
                        <textarea
                          rows={7}
                          value={blogForm.contentText}
                          onChange={(e) => setBlogForm({ ...blogForm, contentText: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                        />
                      </div>

                      <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer sm:col-span-2">
                        <input
                          type="checkbox"
                          checked={blogForm.isPublished}
                          onChange={(e) => setBlogForm({ ...blogForm, isPublished: e.target.checked })}
                          className="rounded border-slate-300"
                        />
                        <span>Published on website</span>
                      </label>
                    </div>

                    <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => { setIsCreatingBlog(false); setEditingBlog(null); }}
                        className="px-4 py-2 text-xs font-semibold text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        {editingBlog ? 'Save Article' : 'Publish Article'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Delete Blog Confirmation Modal */}
              {deletingBlogTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#101B35]">Delete Article</h3>
                        <p className="text-xs text-slate-500">This permanently removes the article from Insights &amp; Blog.</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      Are you sure you want to delete <strong>{deletingBlogTarget.title}</strong>?
                    </p>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setDeletingBlogTarget(null)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteBlog}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        Delete Article
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODULE 9: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    User Accounts &amp; Access Control
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Owner-only access control. Regular users can never promote themselves.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Registered Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                            <span>{u.fullName}</span>
                            {u.isOwner && (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded">
                                DESIGNATED OWNER
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">{u.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {!u.isOwner ? (
                            <button
                              onClick={() => handleToggleUserStatus(u)}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                                u.status === 'active'
                                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              }`}
                            >
                              {u.status === 'active' ? 'Suspend' : 'Activate'}
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium">Protected Owner</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE 10: GLOBAL WEBSITE SETTINGS */}
          {activeTab === 'settings' && siteSettings && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Global Website Settings
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage agency information, contact routing, announcement banners, and social profiles.
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Global Settings</span>
                </button>
              </div>

              {/* Announcement Banner */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-[#101B35]">Top Announcement Banner</h3>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={siteSettings.announcementBanner?.enabled}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        announcementBanner: { ...siteSettings.announcementBanner, enabled: e.target.checked }
                      })}
                      className="w-4 h-4 text-[#356DFF] rounded"
                    />
                    <span>Show Announcement Banner</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 mb-1 font-semibold">Banner Message</label>
                    <input
                      type="text"
                      value={siteSettings.announcementBanner?.text || ''}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        announcementBanner: { ...siteSettings.announcementBanner, text: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Action Link Label</label>
                    <input
                      type="text"
                      value={siteSettings.announcementBanner?.linkText || ''}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        announcementBanner: { ...siteSettings.announcementBanner, linkText: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* General Agency Details */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-[#101B35]">Agency Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Agency Brand Name</label>
                    <input
                      type="text"
                      value={siteSettings.agencyName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, agencyName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Official Contact Email</label>
                    <input
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Brand Tagline</label>
                    <input
                      type="text"
                      value={siteSettings.tagline}
                      onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Business Phone</label>
                    <input
                      type="text"
                      value={siteSettings.phone}
                      onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* MODULE 11: SECURITY & PRIVACY CENTER */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Security, Privacy &amp; Access Governance
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Server-enforced access controls, cryptographic storage, and owner identity protection.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#101B35]">
                    <ShieldCheck className="w-5 h-5 text-[#356DFF]" />
                    <span>Designated Super Admin Owner</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Verified Super Admin:</span>
                      <span className="font-mono font-bold text-slate-900">{securityData?.ownerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Privilege Level:</span>
                      <span className="font-bold text-purple-700 uppercase">Super Admin (Non-Demotable)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Public Self-Promotion:</span>
                      <span className="font-bold text-emerald-600">Strictly Prohibited &amp; Blocked</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    All administrative API requests enforce valid signed Bearer JWTs matched against the backend user record. No frontend-only route guards.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#101B35]">
                    <Lock className="w-5 h-5 text-emerald-600" />
                    <span>Active Cryptographic Policies</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Password Hashing:</span>
                      <span className="font-bold text-slate-800">bcrypt (10 Salt Rounds)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Token Architecture:</span>
                      <span className="font-bold text-slate-800">HMAC-SHA256 (JWT)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Session Expiration:</span>
                      <span className="font-bold text-slate-800">7 Days with Invalidation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 12: AUDIT LOGS */}
          {activeTab === 'audit-logs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Administrative Audit Trail
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Complete chronological history of changes to services, pricing, users, and content.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Admin Email</th>
                      <th className="py-3 px-4">Audit Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(securityData?.auditLogs || overviewData?.recentActivity || []).map((log: any) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                          {log.action}
                        </td>
                        <td className="py-3 px-4 text-[#356DFF] font-medium whitespace-nowrap">
                          {log.adminEmail || 'System'}
                        </td>
                        <td className="py-3 px-4 text-slate-600 leading-relaxed">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE 13: SEO & META TAGS MANAGEMENT */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    SEO &amp; Meta Tags Manager ({seoList.length})
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add, customize, and preview page meta titles, descriptions, keywords, OpenGraph tags, canonical URLs, and robots rules.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openNewSeoModal}
                  className="px-4 py-2.5 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New SEO &amp; Meta Tag</span>
                </button>
              </div>

              {/* Dynamic Google Search Snippet Preview */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-[#101B35]">
                    Live Google Search Snippet Preview {previewingSeo ? `— ${previewingSeo.pageName}` : ''}
                  </h3>
                  {previewingSeo && (
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {previewingSeo.routeSlug}
                    </span>
                  )}
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-2xl space-y-1">
                  <div className="text-[11px] text-slate-500">
                    {previewingSeo?.canonicalUrl || 'https://telcamarketing.com'}
                  </div>
                  <div className="text-base text-[#1a0dab] hover:underline font-medium">
                    {previewingSeo?.metaTitle || 'Telca Marketing — Performance & Digital Growth Agency'}
                  </div>
                  <div className="text-xs text-[#4d5156] leading-relaxed">
                    {previewingSeo?.metaDescription || 'Turning marketing into measurable growth. We help international businesses attract the right audience, generate quality leads, and scale through paid ads and automation.'}
                  </div>
                </div>
              </div>

              {/* SEO Rules List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {seoList.map((seo) => (
                  <div
                    key={seo.id}
                    className={`bg-white rounded-2xl border p-5 shadow-sm transition-all flex flex-col justify-between gap-4 ${
                      previewingSeo?.id === seo.id ? 'border-[#356DFF] ring-2 ring-blue-100' : 'border-slate-200'
                    }`}
                  >
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-[#101B35]">{seo.pageName}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">{seo.routeSlug}</span>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${seo.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                          {seo.isActive ? 'Active' : 'Paused'}
                        </span>
                      </div>

                      <div>
                        <div className="text-[11px] font-semibold text-slate-500">Meta Title ({(seo.metaTitle || '').length}/60 chars)</div>
                        <div className="font-bold text-slate-900 mt-0.5">{seo.metaTitle}</div>
                      </div>

                      <div>
                        <div className="text-[11px] font-semibold text-slate-500">Meta Description ({(seo.metaDescription || '').length}/160 chars)</div>
                        <div className="text-slate-600 mt-0.5 line-clamp-2">{seo.metaDescription}</div>
                      </div>

                      {seo.keywords && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          <Tag className="w-3 h-3 text-[#356DFF]" />
                          <span className="text-[11px] text-slate-500 truncate">{seo.keywords}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewingSeo(seo)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#356DFF] text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditSeoModal(seo)}
                        className="flex-1 py-1.5 px-3 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Meta</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingSeoTarget(seo)}
                        className="p-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 rounded-lg transition-colors"
                        title="Delete SEO Rule"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add / Edit SEO Modal */}
              {isSeoModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <form onSubmit={handleSaveSeo} className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 max-h-[88vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h3 className="text-base font-extrabold text-[#101B35]">
                        {editingSeo ? `Edit SEO & Meta Tags: ${editingSeo.pageName}` : 'Add New SEO & Meta Tag Rule'}
                      </h3>
                      <button type="button" onClick={() => setIsSeoModalOpen(false)}>
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Page / Route Name *</label>
                        <input
                          type="text"
                          required
                          value={seoForm.pageName}
                          onChange={(e) => setSeoForm({ ...seoForm, pageName: e.target.value })}
                          placeholder="e.g., Meta Ads Service Page"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Route Slug / Path</label>
                        <input
                          type="text"
                          value={seoForm.routeSlug}
                          onChange={(e) => setSeoForm({ ...seoForm, routeSlug: e.target.value })}
                          placeholder="/#services/paid-advertising"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <div className="flex justify-between mb-1">
                          <label className="font-semibold text-slate-700">Meta Title *</label>
                          <span className={`text-[10px] font-bold ${seoForm.metaTitle.length > 60 ? 'text-amber-600' : 'text-slate-400'}`}>
                            {seoForm.metaTitle.length}/60 recommended
                          </span>
                        </div>
                        <input
                          type="text"
                          required
                          value={seoForm.metaTitle}
                          onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
                          placeholder="e.g., Paid Advertising & Meta Ads Management | Telca Marketing"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <div className="flex justify-between mb-1">
                          <label className="font-semibold text-slate-700">Meta Description</label>
                          <span className={`text-[10px] font-bold ${seoForm.metaDescription.length > 160 ? 'text-amber-600' : 'text-slate-400'}`}>
                            {seoForm.metaDescription.length}/160 recommended
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          value={seoForm.metaDescription}
                          onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Target Keywords (comma-separated)</label>
                        <input
                          type="text"
                          value={seoForm.keywords}
                          onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
                          placeholder="meta ads agency, google ads management, performance marketing"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">OpenGraph Title</label>
                        <input
                          type="text"
                          value={seoForm.ogTitle}
                          onChange={(e) => setSeoForm({ ...seoForm, ogTitle: e.target.value })}
                          placeholder="Defaults to Meta Title"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Canonical URL</label>
                        <input
                          type="text"
                          value={seoForm.canonicalUrl}
                          onChange={(e) => setSeoForm({ ...seoForm, canonicalUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">OpenGraph Description</label>
                        <textarea
                          rows={2}
                          value={seoForm.ogDescription}
                          onChange={(e) => setSeoForm({ ...seoForm, ogDescription: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">OG Social Share Image (PC Upload or URL)</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={seoForm.ogImage}
                            onChange={(e) => setSeoForm({ ...seoForm, ogImage: e.target.value })}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                          />
                          <label className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#356DFF] border border-blue-200 rounded-xl font-bold cursor-pointer inline-flex items-center gap-1.5 shrink-0 justify-center">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingAssetField === 'seo' ? 'Uploading...' : 'Import from PC'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) {
                                  uploadImageFileToLibrary(f, 'hero', (url) => setSeoForm(prev => ({ ...prev, ogImage: url })), 'seo');
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Robots Directive</label>
                        <select
                          value={seoForm.robots}
                          onChange={(e) => setSeoForm({ ...seoForm, robots: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                        >
                          <option value="index, follow">index, follow</option>
                          <option value="noindex, follow">noindex, follow</option>
                          <option value="index, nofollow">index, nofollow</option>
                          <option value="noindex, nofollow">noindex, nofollow</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Schema.org Type</label>
                        <select
                          value={seoForm.structuredDataType}
                          onChange={(e) => setSeoForm({ ...seoForm, structuredDataType: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                        >
                          <option value="WebPage">WebPage</option>
                          <option value="ProfessionalService">ProfessionalService</option>
                          <option value="Service">Service</option>
                          <option value="Article">Article</option>
                          <option value="FAQPage">FAQPage</option>
                        </select>
                      </div>

                      <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer sm:col-span-2 pt-1">
                        <input
                          type="checkbox"
                          checked={seoForm.isActive}
                          onChange={(e) => setSeoForm({ ...seoForm, isActive: e.target.checked })}
                          className="rounded border-slate-300"
                        />
                        <span>Active SEO meta tag rule</span>
                      </label>
                    </div>

                    <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setIsSeoModalOpen(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        {editingSeo ? 'Save Meta Tags' : 'Add SEO Rule'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Delete SEO Confirmation Modal */}
              {deletingSeoTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#101B35]">Delete SEO Rule</h3>
                        <p className="text-xs text-slate-500">This removes this meta tag entry from SEO Management.</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      Are you sure you want to delete SEO meta tags for <strong>{deletingSeoTarget.pageName}</strong> ({deletingSeoTarget.routeSlug})?
                    </p>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setDeletingSeoTarget(null)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteSeo}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-xl transition-colors"
                      >
                        Delete Rule
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODULE: ACCOUNT & SECURITY SETTINGS */}
          {activeTab === 'account-security' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Account &amp; Security Settings
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Owner credentials, cryptographic password hashing, verified email management, and active sessions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Super Admin Identity Verified</span>
                  </span>
                </div>
              </div>

              {/* Grid: Password Management + Verified Email Update */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Card 1: Change Password */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-blue-50 text-[#356DFF]">
                        <KeyRound className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-[#101B35]">Change Master Password</h3>
                        <p className="text-[11px] text-slate-500">Cryptographic one-way hashing with bcrypt (10 rounds)</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter your current password"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] pr-10 text-xs"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">New Master Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Minimum 8 characters with mix of cases & numbers"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] pr-10 text-xs"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Password Strength Meter */}
                      {newPassword && (
                        <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                          {(() => {
                            const strength = getPasswordStrength(newPassword);
                            return (
                              <>
                                <div className="flex items-center justify-between text-[11px]">
                                  <span className="font-semibold text-slate-600">Password Strength:</span>
                                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${strength.color}`}>
                                    {strength.label}
                                  </span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden flex gap-0.5">
                                  <div className={`h-full transition-all duration-300 ${strength.score >= 1 ? 'w-1/4 bg-red-500' : 'w-0'}`} />
                                  <div className={`h-full transition-all duration-300 ${strength.score >= 2 ? 'w-1/4 bg-amber-500' : 'w-0'}`} />
                                  <div className={`h-full transition-all duration-300 ${strength.score >= 3 ? 'w-1/4 bg-blue-500' : 'w-0'}`} />
                                  <div className={`h-full transition-all duration-300 ${strength.score >= 4 ? 'w-1/4 bg-emerald-500' : 'w-0'}`} />
                                </div>
                                <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-500 pt-1">
                                  <span className={strength.checks.length ? 'text-emerald-600 font-semibold' : ''}>
                                    ✓ 8+ Characters
                                  </span>
                                  <span className={strength.checks.upper && strength.checks.lower ? 'text-emerald-600 font-semibold' : ''}>
                                    ✓ Upper &amp; Lowercase
                                  </span>
                                  <span className={strength.checks.number ? 'text-emerald-600 font-semibold' : ''}>
                                    ✓ Numbers (0–9)
                                  </span>
                                  <span className={strength.checks.special ? 'text-emerald-600 font-semibold' : ''}>
                                    ✓ Special Symbol
                                  </span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-type your new master password"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs"
                        required
                      />
                      {confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-[10px] text-red-500 mt-1">Passwords do not match</p>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleGenerateResetPreview}
                        className="text-[11px] text-[#356DFF] hover:underline font-semibold"
                      >
                        Emergency Reset Token
                      </button>
                      <button
                        type="submit"
                        disabled={passwordChangeLoading}
                        className="px-5 py-2.5 bg-[#101B35] hover:bg-[#356DFF] text-white font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                      >
                        {passwordChangeLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                        <span>Update Password</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Card 2: Update Primary Login Email & MFA */}
                <div className="space-y-6">
                  
                  {/* Verified Email Change */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                      <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-[#101B35]">Owner Primary Login Email</h3>
                        <p className="text-[11px] text-slate-500">Requires verified 2-step code before address re-binding</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                      <div className="text-slate-500 text-[11px]">Current Verified Owner Address:</div>
                      <div className="font-mono font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>{user?.email}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
                          Active &amp; Bound
                        </span>
                      </div>
                    </div>

                    {!pendingEmailChange ? (
                      <form onSubmit={handleRequestEmailChange} className="space-y-3 text-xs">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">New Owner Email Address</label>
                          <input
                            type="email"
                            value={newEmailInput}
                            onChange={(e) => setNewEmailInput(e.target.value)}
                            placeholder="e.g. owner@telcamarketing.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-slate-900 hover:bg-[#356DFF] text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Request Verification Code</span>
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleConfirmEmailChange} className="space-y-3 text-xs p-4 bg-purple-50/50 rounded-xl border border-purple-200">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-purple-900">Enter 6-Digit Code sent to:</span>
                          <span className="font-mono font-semibold text-xs text-purple-700">{pendingEmailChange}</span>
                        </div>
                        {codeVerificationPreview && (
                          <div className="p-2 bg-purple-100 rounded-lg text-purple-900 text-[11px]">
                            Preview Code: <strong className="font-mono font-bold">{codeVerificationPreview}</strong>
                          </div>
                        )}
                        <input
                          type="text"
                          maxLength={6}
                          value={emailVerificationCode}
                          onChange={(e) => setEmailVerificationCode(e.target.value)}
                          placeholder="6-digit verification code"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-purple-300 focus:outline-none focus:border-[#356DFF] font-mono text-center tracking-widest text-base font-bold bg-white"
                          required
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => { setPendingEmailChange(null); setEmailVerificationCode(''); }}
                            className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs"
                          >
                            Verify &amp; Update
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Multi-Factor Authentication */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm text-[#101B35]">Two-Factor Authentication (2FA)</h3>
                          <p className="text-[11px] text-slate-500">Authenticator App (TOTP / Google Authenticator)</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleMfa(!sessionsData?.mfaEnabled)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                          sessionsData?.mfaEnabled 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {sessionsData?.mfaEnabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  </div>

                </div>

              </div>

              {/* Active Sessions & Login Audit */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Active Sessions */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-[#356DFF]" />
                      <h3 className="font-extrabold text-sm text-[#101B35]">Active Recognized Sessions</h3>
                    </div>
                    <button
                      onClick={handleRevokeOtherSessions}
                      className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-colors"
                    >
                      Sign Out Other Devices
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(sessionsData?.sessions || []).map((sess: any) => (
                      <div key={sess.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3 text-xs">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-600 mt-0.5">
                            {sess.device.includes('iPhone') || sess.device.includes('Mobile') ? (
                              <Smartphone className="w-4 h-4" />
                            ) : (
                              <Laptop className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <span>{sess.device}</span>
                              {sess.isCurrent && (
                                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded">
                                  THIS DEVICE
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                              IP: {sess.ip} · {sess.browser}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              Location: {sess.location} · Last active: {new Date(sess.lastActive).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Login History */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      <h3 className="font-extrabold text-sm text-[#101B35]">Recent Access Attempts</h3>
                    </div>
                    <span className="text-[11px] text-slate-400">Past 30 Days</span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto text-xs">
                    {(sessionsData?.loginHistory || []).map((log: any) => (
                      <div key={log.id} className="py-2.5 flex items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="font-semibold text-slate-800 flex items-center gap-2">
                            <span>{log.ip}</span>
                            <span className="text-[10px] text-slate-400 font-normal">({log.device})</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            log.status === 'success' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {log.status === 'success' ? 'Authorized' : 'Rejected'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* MODULE: RECOVERY & BACKUP EMAILS */}
          {activeTab === 'recovery-emails' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Backup Email &amp; Account Recovery
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure secondary verified recovery channels. Air-gapped from public APIs to ensure zero public exposure.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingBackupEmail(true)}
                  className="px-4 py-2 bg-[#356DFF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Backup Recovery Email</span>
                </button>
              </div>

              {/* Security Privacy Notice */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold">Air-Gapped Privacy Guarantee:</span>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Recovery emails are strictly separated from public agency contact desks. They are never rendered in HTML headers, footers, JSON payloads, or public contact forms.
                  </p>
                </div>
              </div>

              {/* Primary & Backup Emails List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Primary Recovery Email */}
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Primary Channel</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      MASTER VERIFIED
                    </span>
                  </div>
                  <div className="text-lg font-mono font-bold text-[#101B35]">
                    {recoveryData?.primaryEmail || OWNER_ADMIN_EMAIL}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Default channel for automated emergency password resets, multi-factor backup codes, and critical security intrusion alerts.
                  </p>
                </div>

                {/* Backup Recovery Channels */}
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Auxiliary Channels</span>
                    <span className="text-[11px] font-bold text-slate-700">
                      {(recoveryData?.backupEmails || []).length} Configured
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Secondary executive email addresses capable of receiving emergency authorization tokens if the primary channel is compromised.
                  </p>
                </div>

              </div>

              {/* Table of Backup Recovery Emails */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-[#101B35]">
                  <span>Configured Recovery Channels</span>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Recovery Address</th>
                      <th className="py-3 px-4">Description Label</th>
                      <th className="py-3 px-4">Verification Status</th>
                      <th className="py-3 px-4">Added Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(recoveryData?.backupEmails || []).map((b: any) => (
                      <tr key={b.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                          {b.email}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {b.label}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            b.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                          {new Date(b.addedAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          {b.status !== 'verified' ? (
                            <button
                              onClick={() => { setVerifyingBackupId(b.id); handleSendBackupCode(b.id); }}
                              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold"
                            >
                              Verify
                            </button>
                          ) : (
                            <span className="text-[11px] text-emerald-600 font-bold mr-2">Verified</span>
                          )}
                          <button
                            onClick={() => handleDeleteBackupEmail(b.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded"
                            title="Delete recovery address"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Modal: Add Backup Email */}
              {isAddingBackupEmail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h3 className="font-extrabold text-sm text-[#101B35]">Add Backup Recovery Email</h3>
                      <button onClick={() => setIsAddingBackupEmail(false)} className="p-1 text-slate-400 hover:text-slate-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <form onSubmit={handleAddBackupEmail} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                        <input
                          type="email"
                          value={newBackupEmail}
                          onChange={(e) => setNewBackupEmail(e.target.value)}
                          placeholder="e.g. personal.recovery@gmail.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Label / Description</label>
                        <input
                          type="text"
                          value={newBackupLabel}
                          onChange={(e) => setNewBackupLabel(e.target.value)}
                          placeholder="e.g. Owner Personal Vault Backup"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs"
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingBackupEmail(false)}
                          className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#101B35] hover:bg-[#356DFF] text-white font-bold rounded-xl"
                        >
                          Add &amp; Send Code
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Modal: Verify Backup Email Code */}
              {verifyingBackupId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h3 className="font-extrabold text-sm text-[#101B35]">Verify Recovery Email</h3>
                      <button onClick={() => setVerifyingBackupId(null)} className="p-1 text-slate-400 hover:text-slate-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3 text-xs">
                      <p className="text-slate-600 leading-relaxed">
                        Enter the 6-digit confirmation code dispatched to the auxiliary address.
                      </p>
                      <input
                        type="text"
                        maxLength={6}
                        value={backupVerifyCode}
                        onChange={(e) => setBackupVerifyCode(e.target.value)}
                        placeholder="6-digit code"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#356DFF] font-mono text-center tracking-widest text-base font-bold"
                        required
                      />
                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setVerifyingBackupId(null)}
                          className="flex-1 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleVerifyBackupEmail(verifyingBackupId)}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                        >
                          Confirm Code
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* MODULE: MULTIPLE BUSINESS EMAIL DESKS & ROUTING */}
          {activeTab === 'business-emails' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Business Email Desks &amp; Dynamic Form Routing
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Categorized public agency contact addresses. Powers form routing, consultation desk allocation, and footer listings.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTestBusinessEmails}
                    disabled={emailTestingLoading}
                    className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Send className={`w-3.5 h-3.5 ${emailTestingLoading ? 'animate-spin text-electric-600' : 'text-slate-500'}`} />
                    <span>{emailTestingLoading ? 'Testing Dispatch...' : 'Test Delivery Dispatch'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingBusinessEmail(null);
                      setBusinessEmailForm({
                        email: '',
                        displayName: '',
                        category: 'General Business Inquiries',
                        description: '',
                        forwardingTo: '',
                        isDefault: false
                      });
                      setIsAddingBusinessEmail(true);
                    }}
                    className="px-4 py-2 bg-[#356DFF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Business Email Desk</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Routing Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Custom Bundles Routing</span>
                    <Package className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Routed automatically to <strong>Sales &amp; New Clients</strong> desk.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Consultation Bookings</span>
                    <Clock className="w-4 h-4 text-[#356DFF]" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Routed automatically to <strong>Free Consultation Requests</strong> desk.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Privacy &amp; Data Rights</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Routed automatically to <strong>Privacy &amp; Data Requests</strong> desk.
                  </p>
                </div>
              </div>

              {/* Business Emails Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Desk &amp; Address</th>
                      <th className="py-3 px-4">Department Category</th>
                      <th className="py-3 px-4">Purpose / Scope</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {businessEmails.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{item.displayName}</span>
                            {item.isDefault && (
                              <span className="text-[9px] bg-blue-100 text-blue-800 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                                DEFAULT
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-slate-500 text-[11px]">{item.email}</div>
                          {item.forwardingTo && (
                            <div className="text-[10px] text-purple-600 font-medium">↳ Forwards to: {item.forwardingTo}</div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 max-w-xs leading-relaxed text-[11px]">
                          {item.description}
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleToggleBusinessEmailStatus(item.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                              item.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                          >
                            {item.status}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1.5">
                          {!item.isDefault && (
                            <button
                              onClick={() => handleSetDefaultBusinessEmail(item.id)}
                              className="px-2 py-1 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 rounded-lg text-[10px] font-bold"
                            >
                              Make Default
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setEditingBusinessEmail(item);
                              setBusinessEmailForm({
                                email: item.email,
                                displayName: item.displayName,
                                category: item.category,
                                description: item.description,
                                forwardingTo: item.forwardingTo || '',
                                isDefault: item.isDefault
                              });
                              setIsAddingBusinessEmail(true);
                            }}
                            className="p-1 text-slate-400 hover:text-slate-800 rounded"
                          >
                            <Edit3 className="w-3.5 h-3.5 inline" />
                          </button>
                          {!item.isDefault && (
                            <button
                              onClick={() => handleDeleteBusinessEmail(item.id)}
                              className="p-1 text-slate-400 hover:text-red-600 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Modal: Add or Edit Business Email */}
              {isAddingBusinessEmail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h3 className="font-extrabold text-sm text-[#101B35]">
                        {editingBusinessEmail ? 'Edit Business Email Desk' : 'Create Business Email Desk'}
                      </h3>
                      <button 
                        onClick={() => { setIsAddingBusinessEmail(false); setEditingBusinessEmail(null); }} 
                        className="p-1 text-slate-400 hover:text-slate-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <form onSubmit={handleSaveBusinessEmail} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                          <input
                            type="email"
                            value={businessEmailForm.email}
                            onChange={(e) => setBusinessEmailForm({ ...businessEmailForm, email: e.target.value })}
                            placeholder="e.g. sales@telcamarketing.com"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs font-mono"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Display Name</label>
                          <input
                            type="text"
                            value={businessEmailForm.displayName}
                            onChange={(e) => setBusinessEmailForm({ ...businessEmailForm, displayName: e.target.value })}
                            placeholder="e.g. Sales & New Client Retainers"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Category Purpose</label>
                          <select
                            value={businessEmailForm.category}
                            onChange={(e) => setBusinessEmailForm({ ...businessEmailForm, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs bg-white"
                          >
                            <option value="General Business Inquiries">General Business Inquiries</option>
                            <option value="Sales & New Clients">Sales &amp; New Clients</option>
                            <option value="Free Consultation Requests">Free Consultation Requests</option>
                            <option value="Customer Support">Customer Support</option>
                            <option value="Billing & Payments">Billing &amp; Payments</option>
                            <option value="Partnerships">Partnerships</option>
                            <option value="Careers & Recruitment">Careers &amp; Recruitment</option>
                            <option value="Privacy & Data Requests">Privacy &amp; Data Requests</option>
                            <option value="Legal Inquiries">Legal Inquiries</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Custom Category">Custom Category</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Optional Forwarding</label>
                          <input
                            type="email"
                            value={businessEmailForm.forwardingTo}
                            onChange={(e) => setBusinessEmailForm({ ...businessEmailForm, forwardingTo: e.target.value })}
                            placeholder="e.g. lead-exec@telcamarketing.com"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Description / Routing Scope</label>
                        <textarea
                          rows={2}
                          value={businessEmailForm.description}
                          onChange={(e) => setBusinessEmailForm({ ...businessEmailForm, description: e.target.value })}
                          placeholder="Brief explanation of what inquiries this inbox handles..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs"
                        />
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 pt-1">
                        <input
                          type="checkbox"
                          checked={businessEmailForm.isDefault}
                          onChange={(e) => setBusinessEmailForm({ ...businessEmailForm, isDefault: e.target.checked })}
                          className="w-4 h-4 text-[#356DFF] rounded"
                        />
                        <span>Set as Default Agency Inbound Desk</span>
                      </label>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => { setIsAddingBusinessEmail(false); setEditingBusinessEmail(null); }}
                          className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#101B35] hover:bg-[#356DFF] text-white font-bold rounded-xl"
                        >
                          {editingBusinessEmail ? 'Update Desk' : 'Create Desk'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Email Delivery Test Diagnostic Modal */}
              {emailTestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-extrabold text-sm text-[#101B35]">Email Delivery Dispatch Diagnostics</h3>
                      </div>
                      <button onClick={() => setEmailTestModal(null)} className="p-1 text-slate-400 hover:text-slate-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900 font-medium">
                        {emailTestModal.message}
                      </div>

                      <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                        Dispatched Department Inboxes:
                      </div>

                      <div className="space-y-2 max-h-56 overflow-y-auto">
                        {(emailTestModal.testedDesks || []).map((t: any, idx: number) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-slate-900">{t.displayName}</div>
                              <div className="font-mono text-[11px] text-slate-500">{t.email}</div>
                              <div className="text-[10px] text-slate-400">{t.category}</div>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                              {t.status}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 text-[11px] text-slate-500">
                        Timestamp: {new Date(emailTestModal.timestamp).toLocaleString()}
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setEmailTestModal(null)}
                          className="px-5 py-2 bg-navy-900 text-white font-bold rounded-xl text-xs hover:bg-navy-800 transition"
                        >
                          Close Diagnostic
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* MODULE: TEAM & ACCESS DELEGATION */}
          {activeTab === 'team-delegation' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Team Access &amp; Role Delegation
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Assign role-based team capabilities. Normal public registration never grants administrative or team access.
                  </p>
                </div>
                <button
                  onClick={() => setIsInvitingTeam(true)}
                  className="px-4 py-2 bg-[#356DFF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Invite Team Member</span>
                </button>
              </div>

              {recentInviteUrl && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-900">
                  <div className="space-y-0.5">
                    <span className="font-bold">Active Invitation Token Link Created:</span>
                    <div className="font-mono text-[11px] text-emerald-700 truncate max-w-lg">{recentInviteUrl}</div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(recentInviteUrl);
                      showNotification('success', 'Invitation link copied to clipboard!');
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </button>
                </div>
              )}

              {/* Team Members Roster */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-[#101B35]">
                  <span>Authorized Agency Team Members</span>
                  <span className="text-slate-400 font-normal">{(teamData?.members || []).length} Total Members</span>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Member Name</th>
                      <th className="py-3 px-4">Delegated Role</th>
                      <th className="py-3 px-4">Account Status</th>
                      <th className="py-3 px-4">Invited / Active</th>
                      <th className="py-3 px-4 text-right">Role Management</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(teamData?.members || []).map((m: any) => (
                      <tr key={m.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{m.fullName}</span>
                            {m.role === 'owner' && (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-black px-1.5 py-0.5 rounded uppercase">
                                OWNER / SUPER ADMIN
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-slate-500 text-[11px]">{m.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            m.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                            m.role === 'content_manager' ? 'bg-blue-100 text-blue-800' :
                            m.role === 'marketing_manager' ? 'bg-indigo-100 text-indigo-800' :
                            m.role === 'enquiry_manager' ? 'bg-amber-100 text-amber-800' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {m.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            m.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                            m.status === 'invited' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                          {m.lastActive ? new Date(m.lastActive).toLocaleDateString() : 'Pending Onboarding'}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          {m.role !== 'owner' ? (
                            <>
                              <select
                                value={m.role}
                                onChange={(e) => handleChangeTeamRole(m.id, e.target.value)}
                                className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                              >
                                <option value="content_manager">Content Manager</option>
                                <option value="marketing_manager">Marketing Manager</option>
                                <option value="enquiry_manager">Enquiry Manager</option>
                                <option value="viewer">Auditor / Viewer</option>
                              </select>
                              <button
                                onClick={() => handleToggleTeamStatus(m.id, m.status)}
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-xs font-semibold"
                              >
                                {m.status === 'active' ? 'Suspend' : 'Activate'}
                              </button>
                              <button
                                onClick={() => handleRevokeTeamMember(m.id)}
                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                                title="Revoke team access"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline" />
                              </button>
                            </>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-semibold">Protected Super Admin</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Permissions Matrix */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#356DFF]" />
                  <h3 className="font-extrabold text-sm text-[#101B35]">Access Capabilities &amp; Permissions Matrix</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  {(teamData?.permissionsMatrix || []).map((perm: any) => (
                    <div key={perm.role} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{perm.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{perm.description}</p>
                      <div className="pt-2 border-t border-slate-200/60 space-y-1">
                        {perm.capabilities.map((cap: string, i: number) => (
                          <div key={i} className="text-[10px] text-slate-600 flex items-center gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal: Invite Team Member */}
              {isInvitingTeam && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h3 className="font-extrabold text-sm text-[#101B35]">Invite Agency Team Member</h3>
                      <button onClick={() => setIsInvitingTeam(false)} className="p-1 text-slate-400 hover:text-slate-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <form onSubmit={handleInviteTeamMember} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                        <input
                          type="text"
                          value={teamInviteForm.fullName}
                          onChange={(e) => setTeamInviteForm({ ...teamInviteForm, fullName: e.target.value })}
                          placeholder="e.g. Jordan Miller"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Business Email</label>
                        <input
                          type="email"
                          value={teamInviteForm.email}
                          onChange={(e) => setTeamInviteForm({ ...teamInviteForm, email: e.target.value })}
                          placeholder="e.g. jordan.miller@telcamarketing.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Delegated Role</label>
                        <select
                          value={teamInviteForm.role}
                          onChange={(e) => setTeamInviteForm({ ...teamInviteForm, role: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs bg-white font-medium"
                        >
                          <option value="content_manager">Content Manager (Pages, Blog, Media, Legal)</option>
                          <option value="marketing_manager">Marketing Manager (Services, Pricing, Analytics)</option>
                          <option value="enquiry_manager">Enquiry &amp; CRM Manager (Leads CRM, Notes)</option>
                          <option value="viewer">Auditor / Viewer (Read-only)</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsInvitingTeam(false)}
                          className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#101B35] hover:bg-[#356DFF] text-white font-bold rounded-xl"
                        >
                          Generate Invitation
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* MODULE: DATABASE SNAPSHOTS & BACKUP RESTORE */}
          {activeTab === 'backup-restore' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Database Snapshots &amp; System Restore
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Physical file backups stored in data directory. Create instant snapshots, download raw JSON, or roll back safely.
                  </p>
                </div>
                <button
                  onClick={handleCreateBackup}
                  disabled={isCreatingBackup}
                  className="px-4 py-2 bg-[#356DFF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Database className={`w-3.5 h-3.5 ${isCreatingBackup ? 'animate-spin' : ''}`} />
                  <span>{isCreatingBackup ? 'Capturing Snapshot...' : 'Create Snapshot Now'}</span>
                </button>
              </div>

              {/* Status Banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="font-bold text-slate-900">Total File Snapshots</span>
                  <div className="text-2xl font-black text-[#101B35]">{backupsData.length}</div>
                  <span className="text-[11px] text-slate-400">Stored in /data/backups/</span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="font-bold text-slate-900">Storage Architecture</span>
                  <div className="text-sm font-mono font-bold text-emerald-600">JSON Atomic Snapshots</div>
                  <span className="text-[11px] text-slate-400">Zero data corruption guarantees</span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="font-bold text-slate-900">Restore Safety Policy</span>
                  <div className="text-sm font-bold text-purple-700">Owner-Grounded Protection</div>
                  <span className="text-[11px] text-slate-400">Preserves verified super admin identity</span>
                </div>
              </div>

              {/* Backups Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-[#101B35]">
                  <span>Physical Snapshot Registry</span>
                </div>
                {backupsData.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500 space-y-2">
                    <Database className="w-8 h-8 text-slate-300 mx-auto" />
                    <div>No physical backups recorded yet.</div>
                    <button
                      onClick={handleCreateBackup}
                      className="text-[#356DFF] font-bold hover:underline"
                    >
                      Click here to create your first snapshot now.
                    </button>
                  </div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Snapshot File</th>
                        <th className="py-3 px-4">File Size</th>
                        <th className="py-3 px-4">Records Captured</th>
                        <th className="py-3 px-4">Creation Timestamp</th>
                        <th className="py-3 px-4 text-right">Snapshot Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {backupsData.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                            {b.fileName}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                            {b.fileSize}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                              {b.totalRecords} entities
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                            {new Date(b.createdAt).toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <a
                              href={`/api/admin/backups/${b.id}/download`}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download</span>
                            </a>
                            <button
                              onClick={() => {
                                setRestoreConfirmModal(b);
                                setRestoreConfirmInput('');
                              }}
                              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold"
                            >
                              Restore
                            </button>
                            <button
                              onClick={() => handleDeleteBackup(b.id)}
                              className="p-1 text-slate-400 hover:text-red-600 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Restore Confirmation Modal */}
              {restoreConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-red-200 space-y-4">
                    <div className="flex items-center gap-2 text-red-600 pb-2 border-b border-slate-100">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <h3 className="font-extrabold text-sm text-[#101B35]">Confirm Database Restoration</h3>
                    </div>
                    <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                      <p>
                        You are about to restore the agency database from snapshot:
                        <br />
                        <strong className="font-mono text-slate-900">{restoreConfirmModal.fileName}</strong>
                      </p>
                      <p className="text-red-600 font-semibold">
                        This action will overwrite services, pricing, CMS pages, and enquiries with the snapshot state. The Super Admin Owner identity will remain preserved.
                      </p>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">
                          Type <strong>RESTORE</strong> in capital letters to confirm:
                        </label>
                        <input
                          type="text"
                          value={restoreConfirmInput}
                          onChange={(e) => setRestoreConfirmInput(e.target.value)}
                          placeholder="RESTORE"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-center font-black tracking-widest text-sm focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setRestoreConfirmModal(null)}
                          className="flex-1 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleRestoreBackup}
                          disabled={restoreConfirmInput.trim() !== 'RESTORE'}
                          className={`flex-1 py-2 text-white font-bold rounded-xl ${
                            restoreConfirmInput.trim() === 'RESTORE'
                              ? 'bg-red-600 hover:bg-red-700 shadow-md'
                              : 'bg-slate-300 cursor-not-allowed'
                          }`}
                        >
                          Execute Restore
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* MODULE: REAL-TIME NOTIFICATION CENTER (HISTORY) */}
          {activeTab === 'notifications' && token && (
            <AdminNotificationsModule
              mode="center"
              token={token}
              ownerEmail={OWNER_ADMIN_EMAIL}
              notificationConfig={notificationConfig}
              setNotificationConfig={setNotificationConfig}
              onSavePreferences={handleSaveNotifications}
              onOpenEnquiryRecord={(refId) => {
                const match = enquiries.find(e => e.referenceId === refId || e.id === refId);
                setActiveTab('enquiries');
                setEnquiryViewTab('all');
                if (match) {
                  setSelectedEnquiry(match);
                } else {
                  setEnquirySearchQuery(refId);
                }
              }}
              onSwitchModeTab={(tab) => setActiveTab(tab)}
              onNotificationsChanged={refreshUnreadNotificationsCount}
              showToast={showNotification}
              highlightRef={deepLinkOpenRef}
            />
          )}

          {/* MODULE: MOBILE PUSH, PREFERENCES & DEVICE SUBSCRIPTIONS */}
          {activeTab === 'notification-settings' && notificationConfig && token && (
            <AdminNotificationsModule
              mode="settings"
              token={token}
              ownerEmail={OWNER_ADMIN_EMAIL}
              notificationConfig={notificationConfig}
              setNotificationConfig={setNotificationConfig}
              onSavePreferences={handleSaveNotifications}
              onOpenEnquiryRecord={(refId) => {
                const match = enquiries.find(e => e.referenceId === refId || e.id === refId);
                setActiveTab('enquiries');
                setEnquiryViewTab('all');
                if (match) {
                  setSelectedEnquiry(match);
                } else {
                  setEnquirySearchQuery(refId);
                }
              }}
              onSwitchModeTab={(tab) => setActiveTab(tab)}
              onNotificationsChanged={refreshUnreadNotificationsCount}
              showToast={showNotification}
              highlightRef={deepLinkOpenRef}
            />
          )}

          {/* MODULE: DEDICATED SOCIAL MEDIA LINKS MANAGER */}
          {activeTab === 'socials' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Social Media Channels Manager
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add, edit, reorder, activate/hide, or delete official social media links displayed across the live Telca Marketing website.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingSocialChannel(null);
                      setSocialChannelForm({
                        platform: 'instagram',
                        name: '',
                        url: '',
                        handle: '',
                        order: socialChannels.length + 1,
                        isActive: true
                      });
                      setIsSocialModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#356DFF] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Social Link</span>
                  </button>
                  <button
                    onClick={loadData}
                    className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl shadow-sm"
                    title="Refresh Social Links"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#356DFF]' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Live Website Footer Preview */}
              <div className="p-5 rounded-2xl bg-[#101B35] text-white space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  <span>Live Website Footer Channel Preview</span>
                  <span className="text-emerald-400">{socialChannels.filter(s => s.isActive).length} Active Channels</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                  {socialChannels.filter(s => s.isActive).length === 0 ? (
                    <span className="text-slate-400 italic">No active social links visible on the website.</span>
                  ) : (
                    socialChannels
                      .filter(s => s.isActive)
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((soc, idx, arr) => (
                        <React.Fragment key={soc.id}>
                          <a
                            href={soc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white font-semibold inline-flex items-center gap-1"
                          >
                            <span>{soc.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-60" />
                          </a>
                          {idx < arr.length - 1 && <span className="text-slate-600">·</span>}
                        </React.Fragment>
                      ))
                  )}
                </div>
              </div>

              {/* Social Channels Cards / Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Order</th>
                        <th className="py-3 px-4">Platform &amp; Name</th>
                        <th className="py-3 px-4">Handle</th>
                        <th className="py-3 px-4">Destination URL</th>
                        <th className="py-3 px-4">Visibility</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {socialChannels.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-10 text-slate-400">
                            No social media channels configured yet. Click &ldquo;Add Social Link&rdquo; above.
                          </td>
                        </tr>
                      ) : (
                        socialChannels.map((soc) => (
                          <tr key={soc.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-500">
                              #{soc.order || 1}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-[#101B35]">{soc.name}</div>
                              <div className="text-[10px] uppercase tracking-wider text-slate-400">{soc.platform}</div>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-600">
                              {soc.handle || '—'}
                            </td>
                            <td className="py-3.5 px-4 max-w-[240px] truncate">
                              <a
                                href={soc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#356DFF] hover:underline font-mono text-[11px]"
                              >
                                {soc.url}
                              </a>
                            </td>
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => handleToggleSocialActive(soc)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                                  soc.isActive
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                }`}
                              >
                                {soc.isActive ? 'Active on Site' : 'Hidden'}
                              </button>
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setEditingSocialChannel(soc);
                                    setSocialChannelForm({
                                      platform: soc.platform || 'custom',
                                      name: soc.name || '',
                                      url: soc.url || '',
                                      handle: soc.handle || '',
                                      order: soc.order || 1,
                                      isActive: !!soc.isActive
                                    });
                                    setIsSocialModalOpen(true);
                                  }}
                                  className="px-2.5 py-1 bg-blue-50 hover:bg-[#356DFF] text-[#356DFF] hover:text-white rounded-lg font-semibold text-[11px] transition-colors inline-flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => setDeletingSocialTarget(soc)}
                                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-lg font-semibold text-[11px] transition-colors inline-flex items-center gap-1"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add / Edit Social Channel Modal */}
              {isSocialModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
                  <form
                    onSubmit={handleSaveSocialChannel}
                    className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 text-xs"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#356DFF]">
                          {editingSocialChannel ? 'Edit Social Channel' : 'New Social Channel'}
                        </span>
                        <h3 className="text-lg font-extrabold text-[#101B35]">
                          {editingSocialChannel ? `Update ${editingSocialChannel.name}` : 'Add Official Social Media Link'}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsSocialModalOpen(false)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Platform *</label>
                        <select
                          value={socialChannelForm.platform}
                          onChange={(e) => {
                            const val = e.target.value;
                            const defaultNames: Record<string, string> = {
                              linkedin: 'LinkedIn',
                              instagram: 'Instagram',
                              facebook: 'Facebook',
                              youtube: 'YouTube',
                              tiktok: 'TikTok',
                              x: 'X (Twitter)',
                              pinterest: 'Pinterest',
                              whatsapp: 'WhatsApp',
                              threads: 'Threads',
                              custom: ''
                            };
                            setSocialChannelForm(prev => ({
                              ...prev,
                              platform: val,
                              name: prev.name || defaultNames[val] || ''
                            }));
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                        >
                          <option value="linkedin">LinkedIn</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="youtube">YouTube</option>
                          <option value="tiktok">TikTok</option>
                          <option value="x">X (Twitter)</option>
                          <option value="pinterest">Pinterest</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="threads">Threads</option>
                          <option value="custom">Custom Channel</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Display Name *</label>
                        <input
                          type="text"
                          required
                          value={socialChannelForm.name}
                          onChange={(e) => setSocialChannelForm({ ...socialChannelForm, name: e.target.value })}
                          placeholder="e.g. Instagram"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Official Profile URL *</label>
                      <input
                        type="url"
                        required
                        value={socialChannelForm.url}
                        onChange={(e) => setSocialChannelForm({ ...socialChannelForm, url: e.target.value })}
                        placeholder="https://instagram.com/telcamarketing"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Account Handle</label>
                        <input
                          type="text"
                          value={socialChannelForm.handle}
                          onChange={(e) => setSocialChannelForm({ ...socialChannelForm, handle: e.target.value })}
                          placeholder="@telcamarketing"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Display Order</label>
                        <input
                          type="number"
                          min={1}
                          value={socialChannelForm.order}
                          onChange={(e) => setSocialChannelForm({ ...socialChannelForm, order: Number(e.target.value) || 1 })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={socialChannelForm.isActive}
                        onChange={(e) => setSocialChannelForm({ ...socialChannelForm, isActive: e.target.checked })}
                        className="rounded border-slate-300 text-[#356DFF]"
                      />
                      <span className="font-semibold text-slate-700">Show this link on the public website footer</span>
                    </label>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setIsSocialModalOpen(false)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#356DFF] hover:bg-blue-700 text-white font-bold shadow-sm flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{editingSocialChannel ? 'Save Channel' : 'Add Social Link'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Delete Social Confirmation Modal */}
              {deletingSocialTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-rose-200 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#101B35]">Delete Social Channel?</h3>
                        <p className="text-[11px] text-slate-500">{deletingSocialTarget.name} ({deletingSocialTarget.url})</p>
                      </div>
                    </div>
                    <p className="text-slate-600">
                      This will permanently remove this social channel from your website footer and admin list.
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setDeletingSocialTarget(null)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteSocialChannel}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
                      >
                        Delete Channel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODULE: SOCIAL MEDIA & API INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight">
                    Social Media Channels &amp; API Integrations
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage official agency profile links and connect developer API keys across 7 international advertising and social channels.
                  </p>
                </div>
                <button
                  onClick={loadData}
                  disabled={loading}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh Integration Status</span>
                </button>
              </div>

              {/* Status & Integrity Notice */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-navy-950">
                  <ShieldCheck className="w-4 h-4 text-[#356DFF]" />
                  <span>Verified Security &amp; Honest Connection Status</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Platform API integrations require verified OAuth client credentials from each provider&apos;s developer portal. To add, edit, or delete public website social links, use the <strong>Social Media Links</strong> tab.
                </p>
              </div>

              {/* Social Platform Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {(socialIntegrations.length > 0 ? socialIntegrations : [
                  { platformId: 'facebook', platformName: 'Facebook (Meta)', category: 'Paid Advertising & Social', publicProfileUrl: 'https://facebook.com/telcamarketing', connectionStatus: 'requires_credentials' },
                  { platformId: 'instagram', platformName: 'Instagram', category: 'Creative & Content', publicProfileUrl: 'https://instagram.com/telcamarketing', connectionStatus: 'requires_credentials' },
                  { platformId: 'linkedin', platformName: 'LinkedIn', category: 'B2B & Enterprise', publicProfileUrl: 'https://linkedin.com/company/telcamarketing', connectionStatus: 'requires_credentials' },
                  { platformId: 'youtube', platformName: 'YouTube', category: 'Video Production', publicProfileUrl: 'https://youtube.com/@telcamarketing', connectionStatus: 'requires_credentials' },
                  { platformId: 'tiktok', platformName: 'TikTok', category: 'Short-Form Video', publicProfileUrl: 'https://tiktok.com/@telcamarketing', connectionStatus: 'requires_credentials' },
                  { platformId: 'x', platformName: 'X (Twitter)', category: 'Social Engagement', publicProfileUrl: 'https://x.com/telcamarketing', connectionStatus: 'requires_credentials' },
                  { platformId: 'pinterest', platformName: 'Pinterest', category: 'Visual Discovery', publicProfileUrl: 'https://pinterest.com/telcamarketing', connectionStatus: 'requires_credentials' }
                ]).map((platform: any) => {
                  const pid = platform.platformId || platform.id;
                  const pname = platform.platformName || platform.name;
                  const pstatus = platform.connectionStatus || platform.status;
                  const isTesting = testingSocialPlatform === pid;
                  return (
                    <div
                      key={pid}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs"
                    >
                      {/* Platform Header */}
                      <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                            <span>{pname}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              pstatus === 'connected'
                                ? 'bg-emerald-100 text-emerald-800'
                                : pstatus === 'requires_credentials'
                                  ? 'bg-amber-100 text-amber-800'
                                  : pstatus === 'error'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-slate-100 text-slate-700'
                            }`}>
                              {pstatus?.replace('_', ' ')}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">{platform.statusMessage || platform.category || 'Developer OAuth Channel'}</span>
                        </div>

                        {platform.lastTested && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            Tested: {new Date(platform.lastTested).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {/* Public Profile URL */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Public Profile URL (Website Link)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            defaultValue={platform.publicProfileUrl || ''}
                            id={`url-${pid}`}
                            placeholder={`https://${pid}.com/yourpage`}
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] font-mono text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById(`url-${pid}`) as HTMLInputElement;
                              if (input) {
                                handleSaveSocialIntegration(pid, {
                                  ...platform,
                                  publicProfileUrl: input.value.trim()
                                });
                              }
                            }}
                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
                          >
                            Save URL
                          </button>
                        </div>
                      </div>

                      {/* API Credentials */}
                      <div className="pt-2 border-t border-slate-100 space-y-3">
                        <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center justify-between">
                          <span>API &amp; OAuth Integration</span>
                          {platform.hasSecret && (
                            <span className="text-emerald-600 font-normal">● Credentials Stored</span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-600 text-[11px] mb-1 font-semibold">
                              App ID / Client ID
                            </label>
                            <input
                              type="text"
                              defaultValue={platform.clientId || ''}
                              id={`clientId-${pid}`}
                              placeholder="e.g. 104928374928"
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-600 text-[11px] mb-1 font-semibold">
                              Client Secret / Token
                            </label>
                            <input
                              type="password"
                              id={`secret-${pid}`}
                              placeholder={platform.hasSecret ? '••••••••••••' : 'Paste API Secret'}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
                            />
                          </div>
                        </div>

                        {platform.scopes && platform.scopes.length > 0 && (
                          <div className="text-[10px] text-slate-500 space-y-1">
                            <span className="font-semibold text-slate-600">Configured Scopes:</span>
                            <div className="flex flex-wrap gap-1">
                              {platform.scopes.map((sc: string, i: number) => (
                                <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[9px]">
                                  {sc}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions Bar */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const clientInput = document.getElementById(`clientId-${pid}`) as HTMLInputElement;
                              const secretInput = document.getElementById(`secret-${pid}`) as HTMLInputElement;
                              const urlInput = document.getElementById(`url-${pid}`) as HTMLInputElement;
                              handleSaveSocialIntegration(pid, {
                                ...platform,
                                publicProfileUrl: urlInput?.value.trim() || platform.publicProfileUrl,
                                clientId: clientInput?.value.trim() || platform.clientId,
                                clientSecret: secretInput?.value.trim() || undefined
                              });
                            }}
                            className="px-3.5 py-1.5 bg-[#101B35] hover:bg-[#356DFF] text-white font-bold rounded-xl text-xs transition shadow-xs"
                          >
                            Save API Config
                          </button>

                          <button
                            type="button"
                            onClick={() => handleTestSocialIntegration(pid)}
                            disabled={isTesting}
                            className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs transition flex items-center gap-1.5"
                          >
                            <Activity className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-[#356DFF]' : 'text-slate-400'}`} />
                            <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
                          </button>
                        </div>

                        {platform.hasSecret && (
                          <button
                            type="button"
                            onClick={() => handleDisconnectSocialIntegration(pid)}
                            className="text-xs text-rose-600 hover:underline font-semibold"
                          >
                            Disconnect
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

// Simple briefcase icon component for portfolio tab
const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);

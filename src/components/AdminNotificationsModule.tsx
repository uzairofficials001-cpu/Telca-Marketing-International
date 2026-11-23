import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  Calendar,
  SearchCheck,
  CreditCard,
  Package,
  Mail,
  Check,
  CheckCheck,
  Trash2,
  ExternalLink,
  Smartphone,
  Laptop,
  Send,
  RefreshCw,
  ShieldAlert,
  Save,
  Plus,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Radio,
  Share,
  PlusSquare,
  Sparkles,
  Filter
} from 'lucide-react';
import {
  getBrowserPushCapabilities,
  getActiveServiceWorkerRegistration,
  subscribeDeviceToPush
} from '../utils/pushNotifications';
import { PWAInstallButton } from './PWAInstallButton';

interface AdminNotificationsModuleProps {
  mode: 'center' | 'settings';
  token: string;
  ownerEmail: string;
  notificationConfig: any;
  setNotificationConfig: React.Dispatch<React.SetStateAction<any>>;
  onSavePreferences: (e: React.FormEvent) => Promise<void>;
  onOpenEnquiryRecord: (referenceId: string) => void;
  onSwitchModeTab: (tab: 'notifications' | 'notification-settings') => void;
  onNotificationsChanged?: () => void;
  showToast: (type: 'success' | 'error', message: string) => void;
  highlightRef?: string | null;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Notifications' },
  { id: 'consultation', label: 'Free Consultations' },
  { id: 'business_audit', label: 'Free Audits' },
  { id: 'service_purchase', label: 'Purchases' },
  { id: 'custom_package', label: 'Custom Package Requests' },
  { id: 'contact', label: 'General Inquiries' }
];

const CATEGORY_META: Record<
  string,
  { label: string; color: string; bgTint: string; borderTint: string; Icon: React.ComponentType<any> }
> = {
  consultation: {
    label: 'Free Consultation',
    color: 'text-[#356DFF]',
    bgTint: 'bg-blue-50',
    borderTint: 'border-blue-200',
    Icon: Calendar
  },
  business_audit: {
    label: 'Free Business Audit',
    color: 'text-sky-600',
    bgTint: 'bg-sky-50',
    borderTint: 'border-sky-200',
    Icon: SearchCheck
  },
  service_purchase: {
    label: 'Service Purchase',
    color: 'text-emerald-600',
    bgTint: 'bg-emerald-50',
    borderTint: 'border-emerald-200',
    Icon: CreditCard
  },
  custom_package: {
    label: 'Custom Package Request',
    color: 'text-violet-600',
    bgTint: 'bg-violet-50',
    borderTint: 'border-violet-200',
    Icon: Package
  },
  contact: {
    label: 'General Inquiry',
    color: 'text-[#101B35]',
    bgTint: 'bg-slate-100',
    borderTint: 'border-slate-300',
    Icon: Mail
  }
};

export const AdminNotificationsModule: React.FC<AdminNotificationsModuleProps> = ({
  mode,
  token,
  ownerEmail,
  notificationConfig,
  setNotificationConfig,
  onSavePreferences,
  onOpenEnquiryRecord,
  onSwitchModeTab,
  onNotificationsChanged,
  showToast,
  highlightRef
}) => {
  // Notification History state
  const [historyItems, setHistoryItems] = useState<any[]>([]);
  const [countsByCategory, setCountsByCategory] = useState<Record<string, number>>({});
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);
  const [verifiedOrders, setVerifiedOrders] = useState<any[]>([]);
  const [selectedOrderModal, setSelectedOrderModal] = useState<any>(null);

  // Push / Device / Delivery Logs state
  const [devices, setDevices] = useState<any[]>([]);
  const [deliveryLogs, setDeliveryLogs] = useState<any[]>([]);
  const [readiness, setReadiness] = useState<any>(null);
  const [swActive, setSwActive] = useState<boolean>(false);
  const [browserCaps, setBrowserCaps] = useState(() => getBrowserPushCapabilities());
  const [customDeviceLabel, setCustomDeviceLabel] = useState('');
  const [registeringDevice, setRegisteringDevice] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [lastTestReport, setLastTestReport] = useState<any>(null);
  const [newRecipientInput, setNewRecipientInput] = useState('');

  const fetchHistory = async (cat = categoryFilter, onlyUnread = unreadOnly) => {
    setLoadingHistory(true);
    try {
      const res = await fetch(
        `/api/admin/notifications/history?category=${encodeURIComponent(cat)}&unreadOnly=${onlyUnread}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setHistoryItems(data.notifications || []);
        setCountsByCategory(data.countsByCategory || {});
      }
      const ordersRes = await fetch('/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (ordersRes.ok) {
        const ordData = await ordersRes.json();
        setVerifiedOrders(ordData.orders || []);
      }
    } catch {
      showToast('error', 'Failed loading notification history.');
    } finally {
      setLoadingHistory(false);
    }
  };

  const fetchPushDiagnostics = async () => {
    try {
      const [subRes, logsRes] = await Promise.all([
        fetch('/api/admin/push/subscriptions', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/notifications/delivery-logs', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      if (subRes.ok) {
        const d = await subRes.json();
        setDevices(d.devices || []);
      }
      if (logsRes.ok) {
        const l = await logsRes.json();
        setDeliveryLogs(l.logs || []);
        if (l.readiness) setReadiness(l.readiness);
      }
    } catch {
      // ignore non-fatal diagnostics error
    }
  };

  useEffect(() => {
    setBrowserCaps(getBrowserPushCapabilities());
    getActiveServiceWorkerRegistration().then(reg => setSwActive(Boolean(reg)));
    fetchHistory(categoryFilter, unreadOnly);
    fetchPushDiagnostics();
  }, [token, mode]);

  useEffect(() => {
    if (mode === 'center') {
      fetchHistory(categoryFilter, unreadOnly);
    }
  }, [categoryFilter, unreadOnly]);

  const handleMarkAsRead = async (id: string, isRead = true) => {
    try {
      const res = await fetch(`/api/admin/notifications/history/${id}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isRead })
      });
      if (res.ok) {
        await fetchHistory();
        onNotificationsChanged?.();
      }
    } catch {
      showToast('error', 'Failed updating notification read status.');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await fetch('/api/admin/notifications/history/read-all', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('success', 'All notifications marked as read.');
        await fetchHistory();
        onNotificationsChanged?.();
      }
    } catch {
      showToast('error', 'Failed marking notifications as read.');
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/notifications/history/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('success', 'Notification deleted from history.');
        await fetchHistory();
        onNotificationsChanged?.();
      }
    } catch {
      showToast('error', 'Failed deleting notification.');
    }
  };

  const handleOpenRelatedRecord = (item: any) => {
    if (!item.isRead) {
      handleMarkAsRead(item.id, true);
    }
    if (item.relatedRecordType === 'order') {
      const order = verifiedOrders.find(o => o.orderId === item.referenceId || o.id === item.relatedRecordId);
      if (order) {
        setSelectedOrderModal(order);
        return;
      }
      setSelectedOrderModal({
        orderId: item.referenceId,
        customerName: item.customerName,
        companyName: item.companyName,
        serviceName: item.metadata?.purchasedService || 'Verified Service Package',
        packageName: item.metadata?.packageName || 'Standard Package',
        amount: item.metadata?.amount || '',
        currency: item.metadata?.currency || 'USD',
        paymentStatus: item.metadata?.paymentStatus || 'paid',
        createdAt: item.createdAt
      });
      return;
    }
    if (item.relatedRecordType === 'enquiry') {
      onOpenEnquiryRecord(item.referenceId);
      return;
    }
    onSwitchModeTab('notification-settings');
  };

  const handleEnablePushNotifications = async () => {
    setRegisteringDevice(true);
    try {
      const vapidRes = await fetch('/api/admin/push/vapid-public-key', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const vapidData = await vapidRes.json();

      if (!vapidData?.configured || !vapidData?.publicKey) {
        showToast(
          'error',
          'VAPID push keys are not yet configured on the server (.env VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY). Add keys first to subscribe devices.'
        );
        return;
      }

      const regResult = await subscribeDeviceToPush(token, vapidData.publicKey, customDeviceLabel);
      setBrowserCaps(getBrowserPushCapabilities());
      setCustomDeviceLabel('');
      showToast('success', `Device registered for push alerts: ${regResult.deviceLabel}`);
      await fetchPushDiagnostics();
    } catch (err: any) {
      setBrowserCaps(getBrowserPushCapabilities());
      showToast('error', err?.message || 'Could not enable push notifications on this device.');
    } finally {
      setRegisteringDevice(false);
    }
  };

  const handleRemoveDevice = async (deviceId: string) => {
    try {
      const res = await fetch(`/api/admin/push/subscriptions/${deviceId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('success', 'Push device removed.');
        await fetchPushDiagnostics();
      }
    } catch {
      showToast('error', 'Failed removing push device.');
    }
  };

  const handleSendTestNotification = async () => {
    setSendingTest(true);
    setLastTestReport(null);
    try {
      const res = await fetch('/api/admin/notifications/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ category: 'consultation' })
      });
      const data = await res.json();
      setLastTestReport(data);
      if (res.ok) {
        if (data.pushSummary?.delivered > 0) {
          showToast('success', `Test push delivered to ${data.pushSummary.delivered} registered device(s)!`);
        } else {
          showToast(
            'success',
            `Test alert recorded in Notification Center (${data.pushSummary?.status || 'check logs for VAPID/device setup'}).`
          );
        }
        await Promise.all([fetchHistory(), fetchPushDiagnostics()]);
        onNotificationsChanged?.();
      } else {
        showToast('error', data.error || 'Test notification dispatch failed.');
      }
    } catch {
      showToast('error', 'Network error dispatching test notification.');
    } finally {
      setSendingTest(false);
    }
  };

  // =========================================================================
  // VIEW A: ADMIN NOTIFICATION CENTER (HISTORY)
  // =========================================================================
  if (mode === 'center') {
    const unreadTotal = countsByCategory.unread || 0;

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#356DFF]">
              <BellRing className="w-3.5 h-3.5" />
              <span>Real-Time Business Notification Center</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight mt-0.5">
              Notifications &amp; Inquiry Alerts
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Audit consultations, free business audits, verified service purchases, custom package requests, and website inquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fetchHistory()}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingHistory ? 'animate-spin text-[#356DFF]' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleMarkAllRead}
              disabled={unreadTotal === 0}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                unreadTotal > 0
                  ? 'bg-[#101B35] hover:bg-[#356DFF] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All as Read ({unreadTotal})</span>
            </button>
            <button
              type="button"
              onClick={() => onSwitchModeTab('notification-settings')}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#356DFF] border border-blue-200 text-xs font-bold flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Push &amp; Preferences</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORY_TABS.map(tab => {
              const count = tab.id === 'all' ? (countsByCategory.all || 0) : (countsByCategory[tab.id] || 0);
              const isActive = categoryFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategoryFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#101B35] text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                      isActive ? 'bg-[#356DFF] text-white' : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer px-2">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={e => setUnreadOnly(e.target.checked)}
              className="w-4 h-4 text-[#356DFF] rounded"
            />
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Unread Only</span>
          </label>
        </div>

        {/* Notifications List */}
        {historyItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-extrabold text-[#101B35]">No Notifications Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Real business notifications appear here automatically when visitors submit consultations, audits, custom packages, contact forms, or verified purchases. You can also dispatch a test alert from Mobile Push &amp; Preferences.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {historyItems.map(item => {
              const meta = CATEGORY_META[item.category] || CATEGORY_META.contact;
              const CatIcon = meta.Icon;
              const isHighlighted = highlightRef && item.referenceId === highlightRef;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-sm transition-all ${
                    isHighlighted
                      ? 'border-[#356DFF] ring-2 ring-[#356DFF]/20'
                      : !item.isRead
                        ? 'border-blue-200 bg-blue-50/20'
                        : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5 min-w-0 flex-1">
                      <div className={`w-10 h-10 rounded-xl ${meta.bgTint} ${meta.borderTint} border flex items-center justify-center shrink-0`}>
                        <CatIcon className={`w-5 h-5 ${meta.color}`} />
                      </div>

                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {!item.isRead && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#356DFF] text-white uppercase">
                              Unread
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${meta.bgTint} ${meta.color} ${meta.borderTint}`}>
                            {item.categoryLabel || meta.label}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                            Ref: {item.referenceId}
                          </span>
                          {item.isTest && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">
                              TEST ALERT
                            </span>
                          )}
                          <span className="text-[11px] text-slate-400">
                            {new Date(item.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <h3 className="text-sm font-extrabold text-[#101B35]">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.message}
                        </p>

                        {/* Structured Metadata Summary */}
                        {item.metadata && Object.keys(item.metadata).length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
                            {Object.entries(item.metadata)
                              .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
                              .slice(0, 6)
                              .map(([key, val]) => (
                                <div key={key} className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] min-w-0">
                                  <span className="text-slate-400 font-semibold capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}:
                                  </span>{' '}
                                  <span className="text-slate-800 font-bold break-words">{String(val)}</span>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap md:flex-col items-center md:items-end gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenRelatedRecord(item)}
                        className="px-3 py-1.5 rounded-xl bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <span>
                          {item.relatedRecordType === 'order' ? 'Open Order Dossier' : 'Open Full Inquiry'}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(item.id, !item.isRead)}
                          className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{item.isRead ? 'Mark Unread' : 'Mark as Read'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteNotification(item.id)}
                          className="p-1.5 rounded-xl border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete notification"
                          aria-label="Delete notification"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Order Dossier Modal (when viewing a Service Purchase record) */}
        {selectedOrderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                    Verified Service Purchase
                  </span>
                  <h3 className="text-lg font-black text-[#101B35] mt-1">
                    Order {selectedOrderModal.orderId}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrderModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-semibold">Customer</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedOrderModal.customerName}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-semibold">Payment Status</div>
                  <div className="font-extrabold text-emerald-700 uppercase mt-0.5">{selectedOrderModal.paymentStatus}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-semibold">Service</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedOrderModal.serviceName}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-semibold">Package</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedOrderModal.packageName}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-semibold">Amount &amp; Currency</div>
                  <div className="font-black text-[#101B35] mt-0.5">
                    {selectedOrderModal.amount} {selectedOrderModal.currency}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-semibold">Verified Timestamp</div>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {new Date(selectedOrderModal.verifiedAt || selectedOrderModal.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrderModal(null)}
                className="w-full py-2.5 rounded-xl bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold transition-colors"
              >
                Close Order Dossier
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW B: NOTIFICATION PREFERENCES, DEVICE SUBSCRIPTIONS & DELIVERY LOGS
  // =========================================================================
  const categoriesConfig = notificationConfig?.categories || {
    consultation: true,
    business_audit: true,
    service_purchase: true,
    custom_package: true,
    contact: true
  };

  return (
    <form onSubmit={onSavePreferences} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#356DFF]">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Push &amp; Alert Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#101B35] tracking-tight mt-0.5">
            Notification Settings &amp; Devices
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure mobile push notifications, per-category alert filters, backup admin emails, and registered phones.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onSwitchModeTab('notifications')}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
          >
            <Bell className="w-4 h-4 text-[#356DFF]" />
            <span>Open Notification History</span>
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Notification Preferences</span>
          </button>
        </div>
      </div>

      {/* Live Push Readiness & Mobile Device Registration */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-sm font-black text-[#101B35] flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#356DFF]" />
              <span>Enable Mobile &amp; Desktop Push Notifications</span>
            </h2>
            <p className="text-xs text-slate-500">
              Subscribe this device to receive real Web Push notifications for inquiries and verified purchases even when this tab is closed.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <PWAInstallButton variant="card" />
            <button
              type="button"
              onClick={handleEnablePushNotifications}
              disabled={registeringDevice || !browserCaps.supported}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all ${
                browserCaps.supported
                  ? 'bg-[#356DFF] hover:bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-500 cursor-not-allowed'
              }`}
            >
              <BellRing className="w-4 h-4" />
              <span>{registeringDevice ? 'Registering Device...' : 'Enable Notifications on This Device'}</span>
            </button>
            <button
              type="button"
              onClick={handleSendTestNotification}
              disabled={sendingTest}
              className="px-4 py-2.5 rounded-xl bg-[#101B35] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{sendingTest ? 'Dispatching Test...' : 'Send Test Notification'}</span>
            </button>
          </div>
        </div>

        {/* Live Readiness Diagnostics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Browser Permission</div>
            <div className="font-extrabold flex items-center gap-1.5 text-slate-900">
              {browserCaps.permission === 'granted' ? (
                <><CheckCircle2 className="w-4 h-4 text-emerald-600" /><span>Granted</span></>
              ) : browserCaps.permission === 'denied' ? (
                <><XCircle className="w-4 h-4 text-red-600" /><span>Blocked by Browser</span></>
              ) : (
                <><AlertCircle className="w-4 h-4 text-amber-500" /><span>Not Yet Enabled</span></>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Service Worker</div>
            <div className="font-extrabold flex items-center gap-1.5 text-slate-900">
              {swActive ? (
                <><CheckCircle2 className="w-4 h-4 text-emerald-600" /><span>Active &amp; Ready</span></>
              ) : (
                <><AlertCircle className="w-4 h-4 text-amber-500" /><span>Registering / HTTPS Needed</span></>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">VAPID Push Keys</div>
            <div className="font-extrabold flex items-center gap-1.5 text-slate-900">
              {readiness?.vapidConfigured ? (
                <><CheckCircle2 className="w-4 h-4 text-emerald-600" /><span>Configured on Server</span></>
              ) : (
                <><AlertCircle className="w-4 h-4 text-amber-600" /><span>Env Keys Needed</span></>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">SMTP Email Backup</div>
            <div className="font-extrabold flex items-center gap-1.5 text-slate-900">
              {readiness?.smtpConfigured ? (
                <><CheckCircle2 className="w-4 h-4 text-emerald-600" /><span>SMTP Active</span></>
              ) : (
                <><AlertCircle className="w-4 h-4 text-slate-500" /><span>SMTP Env Not Set</span></>
              )}
            </div>
          </div>
        </div>

        {/* Optional Custom Device Name before registering */}
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <input
            type="text"
            value={customDeviceLabel}
            onChange={e => setCustomDeviceLabel(e.target.value)}
            placeholder="Optional custom label for this device (e.g. Owner Pixel 9, Work iPhone)..."
            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#356DFF]"
          />
          <span className="text-[11px] text-slate-500 px-1">
            Registered devices: <strong className="text-[#101B35]">{devices.length}</strong>
          </span>
        </div>

        {/* Missing VAPID/SMTP transparent notice */}
        {readiness && (!readiness.vapidConfigured || !readiness.smtpConfigured) && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1.5">
            <div className="font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Environment Credentials Setup Required for Live External Delivery</span>
            </div>
            {!readiness.vapidConfigured && (
              <p>
                • <strong>Web Push VAPID Keys missing:</strong> Generate keys with <code className="px-1.5 py-0.5 rounded bg-amber-100 font-mono text-[11px]">npx web-push generate-vapid-keys</code> and set <code className="font-mono text-[11px]">VAPID_PUBLIC_KEY</code>, <code className="font-mono text-[11px]">VAPID_PRIVATE_KEY</code>, and <code className="font-mono text-[11px]">VAPID_SUBJECT</code> in server environment variables.
              </p>
            )}
            {!readiness.smtpConfigured && (
              <p>
                • <strong>Optional Email Backup SMTP missing:</strong> Configure <code className="font-mono text-[11px]">SMTP_HOST</code>, <code className="font-mono text-[11px]">SMTP_PORT</code>, <code className="font-mono text-[11px]">SMTP_USER</code>, and <code className="font-mono text-[11px]">SMTP_PASS</code> to dispatch email copies.
              </p>
            )}
          </div>
        )}

        {/* Test Report Output */}
        {lastTestReport && (
          <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-1.5">
            <div className="font-bold text-blue-300">Latest Test Dispatch Result</div>
            <div>Notification Center History: <strong>{lastTestReport.created ? 'Recorded' : 'Skipped'}</strong></div>
            <div>Web Push Delivery: <strong>{lastTestReport.pushSummary?.status}</strong> ({lastTestReport.pushSummary?.delivered || 0} delivered / {lastTestReport.pushSummary?.attempted || 0} attempted)</div>
            <div>Email Backup Delivery: <strong>{lastTestReport.emailSummary?.status}</strong> ({lastTestReport.emailSummary?.delivered || 0} delivered)</div>
          </div>
        )}
      </div>

      {/* Global Channel Switches & Notification Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-[#101B35]">Global Notification Channels</h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/80 cursor-pointer">
              <div className="space-y-0.5">
                <span className="font-extrabold text-[#101B35]">Mobile &amp; Browser Push Notifications</span>
                <p className="text-[11px] text-slate-600">
                  Deliver real-time Web Push alerts to registered phones and desktop browsers.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notificationConfig?.pushEnabled ?? true}
                onChange={e => setNotificationConfig({ ...notificationConfig, pushEnabled: e.target.checked })}
                className="w-4 h-4 text-[#356DFF] rounded mt-1"
              />
            </label>

            <label className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div className="space-y-0.5">
                <span className="font-extrabold text-[#101B35]">Backup Email Notifications (SMTP)</span>
                <p className="text-[11px] text-slate-600">
                  Send backup HTML email alerts to configured admin emails alongside mobile push.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notificationConfig?.emailBackupEnabled ?? true}
                onChange={e => setNotificationConfig({ ...notificationConfig, emailBackupEnabled: e.target.checked })}
                className="w-4 h-4 text-[#356DFF] rounded mt-1"
              />
            </label>
          </div>

          <h4 className="font-extrabold text-xs text-slate-700 pt-2">Business Notification Categories</h4>
          <div className="space-y-2.5 text-xs">
            {[
              {
                id: 'consultation',
                title: 'Free Consultation Bookings',
                desc: 'Client name, business, requested service, and preferred schedule.'
              },
              {
                id: 'business_audit',
                title: 'Free Business Audit Requests',
                desc: 'Client name, website URL, business name, and requested audit scope.'
              },
              {
                id: 'service_purchase',
                title: 'Verified Service Purchases',
                desc: 'Triggered strictly after verified backend payment confirmation.'
              },
              {
                id: 'custom_package',
                title: 'Custom Package Requests',
                desc: 'Custom bundle selections, budget estimates, and requirements.'
              },
              {
                id: 'contact',
                title: 'General Contact Inquiries',
                desc: 'Website contact form submissions and general business messages.'
              }
            ].map(cat => (
              <label
                key={cat.id}
                className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 cursor-pointer"
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900">{cat.title}</span>
                  <p className="text-[11px] text-slate-500">{cat.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={categoriesConfig[cat.id] !== false}
                  onChange={e =>
                    setNotificationConfig({
                      ...notificationConfig,
                      categories: {
                        ...categoriesConfig,
                        [cat.id]: e.target.checked
                      }
                    })
                  }
                  className="w-4 h-4 text-[#356DFF] rounded mt-0.5"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Registered Devices + Mobile Installation Guide */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-[#101B35]">Registered Push Devices</h3>
              <span className="text-[11px] font-bold text-[#356DFF]">{devices.length} Active</span>
            </div>

            {devices.length === 0 ? (
              <div className="p-5 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
                No mobile or desktop devices are subscribed yet. Open Telca Admin on your phone or browser and click <strong>Enable Notifications on This Device</strong>.
              </div>
            ) : (
              <div className="space-y-2.5 text-xs">
                {devices.map(dev => (
                  <div
                    key={dev.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#101B35] text-white flex items-center justify-center shrink-0">
                        {dev.platform === 'desktop' ? (
                          <Laptop className="w-4 h-4" />
                        ) : (
                          <Smartphone className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{dev.deviceLabel}</div>
                        <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2">
                          <span>{dev.platform.toUpperCase()}</span>
                          <span>·</span>
                          <span>{dev.browser}</span>
                          {dev.isStandalonePwa && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-extrabold">
                              PWA APP
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveDevice(dev.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                      title="Remove device"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Phone Installation Guide (Android + iPhone) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 text-xs">
            <h3 className="font-extrabold text-sm text-[#101B35]">Install on Your Phone (Android &amp; iPhone)</h3>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="font-bold text-slate-900">Android (Chrome / Edge):</div>
              <p className="text-slate-600 text-[11px]">
                Open this site over HTTPS on Android Chrome, tap <strong>Install App</strong> (or browser menu → Install app), sign in as Admin, and tap <strong>Enable Notifications</strong>.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Share className="w-3.5 h-3.5 text-[#356DFF]" />
                <span>iPhone / iPad (iOS 16.4+ Safari PWA Required):</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Apple requires Web Push apps to be installed first: tap <strong>Share</strong> → <PlusSquare className="w-3 h-3 inline text-[#356DFF]" /> <strong>Add to Home Screen</strong>, launch Telca from the Home Screen icon, sign in as Admin, and tap <strong>Enable Notifications</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preserved Security Triggers & Verified Email Recipients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <h3 className="font-extrabold text-sm text-[#101B35] flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#356DFF]" />
            <span>Security &amp; Account Alert Triggers</span>
          </h3>
          <div className="space-y-2.5 text-xs">
            {[
              {
                key: 'securityAlerts',
                title: 'Critical Security Intrusion Alerts',
                desc: 'Triggered upon unauthorized access attempts or suspicious IP ranges.'
              },
              {
                key: 'notifyOnFailedLogin',
                title: 'Failed Administrative Login Attempts',
                desc: 'Instant notice if bad credentials or brute-force attempts occur.'
              },
              {
                key: 'notifyOnPasswordChange',
                title: 'Password & Credential Modifications',
                desc: 'Dispatches notice immediately when the master password is changed.'
              },
              {
                key: 'notifyOnRecoveryChange',
                title: 'Recovery Channel Updates',
                desc: 'Notice whenever a primary or backup recovery address is modified.'
              }
            ].map(item => (
              <label key={item.key} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!notificationConfig?.[item.key]}
                  onChange={e => setNotificationConfig({ ...notificationConfig, [item.key]: e.target.checked })}
                  className="w-4 h-4 text-[#356DFF] rounded mt-0.5"
                />
                <div>
                  <span className="font-bold text-slate-900">{item.title}</span>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#101B35]">Email Backup Recipients</h3>
            <span className="text-[11px] text-slate-400">
              {(notificationConfig?.recipientEmails || []).length} Recipient(s)
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {(notificationConfig?.recipientEmails || []).map((email: string, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between font-mono">
                <span className="font-bold text-slate-900">{email}</span>
                {email.toLowerCase() === ownerEmail.toLowerCase() ? (
                  <span className="text-[9px] bg-purple-100 text-purple-800 font-extrabold px-1.5 py-0.5 rounded uppercase">
                    DESIGNATED OWNER (REQUIRED)
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const filtered = notificationConfig.recipientEmails.filter((_: any, i: number) => i !== idx);
                      setNotificationConfig({ ...notificationConfig, recipientEmails: filtered });
                    }}
                    className="p-1 text-slate-400 hover:text-red-600 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <input
              type="email"
              value={newRecipientInput}
              onChange={e => setNewRecipientInput(e.target.value)}
              placeholder="Enter additional admin email address..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#356DFF] text-xs font-mono"
            />
            <button
              type="button"
              onClick={() => {
                if (!newRecipientInput || !newRecipientInput.includes('@')) {
                  showToast('error', 'Enter a valid email address');
                  return;
                }
                const normalized = newRecipientInput.trim().toLowerCase();
                const currentList = notificationConfig?.recipientEmails || [];
                if (currentList.includes(normalized)) {
                  showToast('error', 'Recipient already added');
                  return;
                }
                setNotificationConfig({
                  ...notificationConfig,
                  recipientEmails: [...currentList, normalized]
                });
                setNewRecipientInput('');
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-[#356DFF] text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Status & Audit Logs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-[#101B35]">Notification Delivery Status Log</h3>
            <p className="text-[11px] text-slate-500">Live log of Web Push and SMTP backup delivery attempts.</p>
          </div>
          <button
            type="button"
            onClick={fetchPushDiagnostics}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Logs</span>
          </button>
        </div>

        {deliveryLogs.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-500 text-center">
            No delivery attempts logged yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-400">
                  <th className="py-2 pr-3">Time</th>
                  <th className="py-2 pr-3">Channel</th>
                  <th className="py-2 pr-3">Category</th>
                  <th className="py-2 pr-3">Target</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deliveryLogs.slice(0, 20).map(log => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-2 pr-3 whitespace-nowrap text-slate-500">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-2 pr-3 font-bold uppercase text-slate-800">{log.channel}</td>
                    <td className="py-2 pr-3 text-slate-600">{log.category}</td>
                    <td className="py-2 pr-3 text-slate-700 truncate max-w-[160px]">{log.target}</td>
                    <td className="py-2 pr-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                          log.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : log.status === 'expired_removed'
                              ? 'bg-amber-100 text-amber-800'
                              : log.status === 'failed'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-2 text-slate-600">{log.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </form>
  );
};

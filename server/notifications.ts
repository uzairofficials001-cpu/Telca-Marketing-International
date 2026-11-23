import * as webpush from 'web-push';
import nodemailer from 'nodemailer';
import {
  getDb,
  saveDb,
  DbAdminNotification,
  DbNotificationDeliveryLog,
  DbPushSubscription,
  OWNER_ADMIN_EMAIL
} from './db';

export interface NotificationCategoryDefinition {
  id: string;
  label: string;
  defaultTitle: string;
  defaultMessage: string;
  emailSubject: string;
  iconName: string;
  color: string;
  description: string;
}

const DEFAULT_CATEGORIES: Record<string, NotificationCategoryDefinition> = {
  consultation: {
    id: 'consultation',
    label: 'Free Consultation',
    defaultTitle: 'New Free Consultation Booking',
    defaultMessage: 'A new consultation request has been received.',
    emailSubject: '[TELCA] New Free Consultation',
    iconName: 'calendar',
    color: '#356DFF',
    description: 'Triggered when a visitor submits a Free Strategy Consultation request.'
  },
  business_audit: {
    id: 'business_audit',
    label: 'Free Business Audit',
    defaultTitle: 'New Free Audit Request',
    defaultMessage: 'Someone has requested a free business audit.',
    emailSubject: '[TELCA] New Free Audit Request',
    iconName: 'search-check',
    color: '#0EA5E9',
    description: 'Triggered when a visitor submits the Free Business Audit form.'
  },
  service_purchase: {
    id: 'service_purchase',
    label: 'Service Purchase',
    defaultTitle: 'New Service Purchase',
    defaultMessage: 'A new customer has purchased a service.',
    emailSubject: '[TELCA] New Service Purchase',
    iconName: 'credit-card',
    color: '#10B981',
    description: 'Triggered strictly after backend-verified successful payment confirmation.'
  },
  custom_package: {
    id: 'custom_package',
    label: 'Custom Package Request',
    defaultTitle: 'New Custom Package Inquiry',
    defaultMessage: 'A new custom marketing package request has been received.',
    emailSubject: '[TELCA] New Custom Package Request',
    iconName: 'package',
    color: '#8B5CF6',
    description: 'Triggered when a visitor submits a Custom Marketing Package inquiry.'
  },
  contact: {
    id: 'contact',
    label: 'General Inquiry',
    defaultTitle: 'New Website Inquiry',
    defaultMessage: 'A new website contact inquiry has been submitted.',
    emailSubject: '[TELCA] New Contact Inquiry',
    iconName: 'mail',
    color: '#101B35',
    description: 'Triggered when a visitor submits the general Contact Us form.'
  }
};

const categoryRegistry: Record<string, NotificationCategoryDefinition> = { ...DEFAULT_CATEGORIES };

export function registerNotificationCategory(def: NotificationCategoryDefinition): void {
  categoryRegistry[def.id] = def;
}

export function getNotificationCategories(): NotificationCategoryDefinition[] {
  return Object.values(categoryRegistry);
}

export function getCategoryDefinition(categoryId: string): NotificationCategoryDefinition {
  if (categoryRegistry[categoryId]) {
    return categoryRegistry[categoryId];
  }
  return {
    id: categoryId,
    label: categoryId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    defaultTitle: `New ${categoryId.replace(/_/g, ' ')} Event`,
    defaultMessage: 'A new administrative notification event occurred.',
    emailSubject: `[TELCA] ${categoryId.replace(/_/g, ' ')} Alert`,
    iconName: 'bell',
    color: '#356DFF',
    description: 'Custom extensible notification category.'
  };
}

export function getVapidConfig() {
  const publicKey = (process.env.VAPID_PUBLIC_KEY || '').trim();
  const privateKey = (process.env.VAPID_PRIVATE_KEY || '').trim();
  const subject = (process.env.VAPID_SUBJECT || `mailto:${OWNER_ADMIN_EMAIL}`).trim();
  const configured = Boolean(publicKey && privateKey);
  return { configured, publicKey, privateKey, subject };
}

export function getSmtpConfig() {
  const host = (process.env.SMTP_HOST || '').trim();
  const port = parseInt(process.env.SMTP_PORT || '587', 10) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  const from = (process.env.SMTP_FROM || `Telca Marketing Alerts <${OWNER_ADMIN_EMAIL}>`).trim();
  const configured = Boolean(host && user && pass);
  return { configured, host, port, secure, user, pass, from };
}

export function getNotificationSystemReadiness() {
  const db = getDb();
  const vapid = getVapidConfig();
  const smtp = getSmtpConfig();
  const activeDevices = (db.pushSubscriptions || []).filter(s => s.isActive).length;
  return {
    vapidConfigured: vapid.configured,
    vapidPublicKey: vapid.configured ? vapid.publicKey : null,
    smtpConfigured: smtp.configured,
    smtpHost: smtp.host || null,
    activeDeviceCount: activeDevices,
    unreadCount: (db.notifications || []).filter(n => !n.isRead).length
  };
}

function escapeHtml(raw: string): string {
  return String(raw || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeLockScreenName(fullName: string): string {
  const trimmed = (fullName || 'Client').trim();
  const first = trimmed.split(/\s+/)[0] || 'Client';
  return first.slice(0, 24);
}

export interface DispatchNotificationInput {
  eventId: string;
  category: string;
  title?: string;
  message?: string;
  lockScreenBody?: string;
  customerName: string;
  companyName?: string;
  referenceId: string;
  relatedRecordType: 'enquiry' | 'order' | 'security' | 'system' | 'test';
  relatedRecordId?: string;
  deepLinkUrl?: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
  isTest?: boolean;
}

export interface DispatchNotificationResult {
  created: boolean;
  duplicate?: boolean;
  skippedReason?: string;
  notification?: DbAdminNotification;
  pushSummary: {
    attempted: number;
    delivered: number;
    failed: number;
    expiredRemoved: number;
    status: string;
  };
  emailSummary: {
    attempted: number;
    delivered: number;
    failed: number;
    status: string;
  };
}

function buildEmailHtml(notification: DbAdminNotification, def: NotificationCategoryDefinition): string {
  const appUrl = (process.env.APP_URL || '').replace(/\/+$/, '');
  const fullDeepLink = appUrl ? `${appUrl}${notification.deepLinkUrl}` : notification.deepLinkUrl;

  const detailRows = Object.entries(notification.metadata || {})
    .filter(([, val]) => val !== undefined && val !== null && String(val).trim() !== '')
    .map(([key, val]) => {
      const label = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      return `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;width:180px;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">${escapeHtml(String(val))}</td>
        </tr>
      `;
    })
    .join('');

  return `
    <div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;background:#F6F8FC;padding:24px;color:#202A3A;">
      <div style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;">
        <div style="background:#101B35;padding:20px 24px;color:#FFFFFF;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#93C5FD;font-weight:700;">TELCA MARKETING ADMIN ALERT</div>
            <div style="font-size:18px;font-weight:800;margin-top:4px;">${escapeHtml(notification.title)}</div>
          </div>
        </div>
        <div style="padding:24px;">
          <div style="display:inline-block;padding:4px 10px;border-radius:6px;background:${escapeHtml(def.color)}15;color:${escapeHtml(def.color)};font-size:12px;font-weight:700;margin-bottom:14px;">
            ${escapeHtml(def.label)} · Ref: ${escapeHtml(notification.referenceId)}
          </div>
          <p style="font-size:14px;line-height:1.6;color:#334155;margin:0 0 18px 0;">
            ${escapeHtml(notification.message)}
          </p>
          ${detailRows ? `<table style="width:100%;border-collapse:collapse;font-size:13px;background:#F8FAFC;border-radius:8px;overflow:hidden;margin-bottom:20px;">${detailRows}</table>` : ''}
          <a href="${escapeHtml(fullDeepLink)}" style="display:inline-block;background:#356DFF;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:13px;padding:12px 20px;border-radius:10px;">
            Open in Telca Admin Dashboard
          </a>
        </div>
        <div style="padding:14px 24px;background:#F8FAFC;border-top:1px solid #E2E8F0;font-size:11px;color:#64748B;">
          Telca Marketing Automated Notification Backup · Event ID: ${escapeHtml(notification.eventId)}
        </div>
      </div>
    </div>
  `;
}

export async function dispatchAdminNotification(
  input: DispatchNotificationInput
): Promise<DispatchNotificationResult> {
  const db = getDb();
  const def = getCategoryDefinition(input.category);

  // 1. Idempotency guarantee: never duplicate notifications for the same eventId
  const existing = (db.notifications || []).find(n => n.eventId === input.eventId);
  if (existing) {
    return {
      created: false,
      duplicate: true,
      notification: existing,
      pushSummary: { attempted: 0, delivered: 0, failed: 0, expiredRemoved: 0, status: 'duplicate_skipped' },
      emailSummary: { attempted: 0, delivered: 0, failed: 0, status: 'duplicate_skipped' }
    };
  }

  const config = db.notificationConfig || {
    pushEnabled: true,
    emailBackupEnabled: true,
    categories: {
      consultation: true,
      business_audit: true,
      service_purchase: true,
      custom_package: true,
      contact: true
    },
    securityAlerts: true,
    notifyOnFailedLogin: true,
    notifyOnPasswordChange: true,
    notifyOnRecoveryChange: true,
    notifyOnNewEnquiry: true,
    recipientEmails: [OWNER_ADMIN_EMAIL]
  };

  // 2. Category preference gate (skip creation & delivery if category is disabled, unless explicit test)
  if (!input.isTest && config.categories && config.categories[input.category] === false) {
    db.notificationDeliveryLogs = db.notificationDeliveryLogs || [];
    db.notificationDeliveryLogs.unshift({
      id: `dlog_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      notificationId: 'skipped',
      eventId: input.eventId,
      category: input.category,
      channel: 'push',
      target: 'category_filter',
      status: 'skipped_disabled',
      detail: `Category "${input.category}" is disabled in Notification Preferences.`,
      timestamp: new Date().toISOString()
    });
    if (db.notificationDeliveryLogs.length > 300) {
      db.notificationDeliveryLogs = db.notificationDeliveryLogs.slice(0, 300);
    }
    saveDb(db);

    return {
      created: false,
      skippedReason: 'category_disabled',
      pushSummary: { attempted: 0, delivered: 0, failed: 0, expiredRemoved: 0, status: 'category_disabled' },
      emailSummary: { attempted: 0, delivered: 0, failed: 0, status: 'category_disabled' }
    };
  }

  // 3. Create Notification History Record (zero sensitive payment instrument fields stored)
  const notificationId = `notif_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const deepLinkUrl =
    input.deepLinkUrl ||
    `/#admin?tab=notifications&open=${encodeURIComponent(input.referenceId)}`;

  const lockSafeName = sanitizeLockScreenName(input.customerName);
  const lockScreenBody =
    input.lockScreenBody ||
    `${def.defaultMessage} (${lockSafeName} · Ref ${input.referenceId}). Tap to open Telca Admin.`;

  const record: DbAdminNotification = {
    id: notificationId,
    eventId: input.eventId,
    category: input.category,
    categoryLabel: def.label,
    title: input.title || def.defaultTitle,
    message: input.message || def.defaultMessage,
    lockScreenBody,
    iconName: def.iconName,
    color: def.color,
    customerName: input.customerName || 'Website Visitor',
    companyName: input.companyName,
    referenceId: input.referenceId,
    relatedRecordType: input.relatedRecordType,
    relatedRecordId: input.relatedRecordId,
    deepLinkUrl,
    metadata: input.metadata || {},
    isRead: false,
    createdAt: new Date().toISOString(),
    isTest: Boolean(input.isTest)
  };

  db.notifications = db.notifications || [];
  db.notifications.unshift(record);
  if (db.notifications.length > 500) {
    db.notifications = db.notifications.slice(0, 500);
  }
  db.notificationDeliveryLogs = db.notificationDeliveryLogs || [];

  // 4. Web Push Delivery across active admin devices
  const pushSummary = {
    attempted: 0,
    delivered: 0,
    failed: 0,
    expiredRemoved: 0,
    status: 'not_attempted'
  };

  const vapid = getVapidConfig();
  const activeSubs: DbPushSubscription[] = (db.pushSubscriptions || []).filter(s => s.isActive);

  if (!config.pushEnabled && !input.isTest) {
    pushSummary.status = 'push_disabled';
    db.notificationDeliveryLogs.unshift({
      id: `dlog_${Date.now()}_push_off`,
      notificationId,
      eventId: input.eventId,
      category: input.category,
      channel: 'push',
      target: 'all_devices',
      status: 'skipped_disabled',
      detail: 'Push notifications globally turned OFF in preferences.',
      timestamp: new Date().toISOString()
    });
  } else if (!vapid.configured) {
    pushSummary.status = 'vapid_unconfigured';
    db.notificationDeliveryLogs.unshift({
      id: `dlog_${Date.now()}_vapid_miss`,
      notificationId,
      eventId: input.eventId,
      category: input.category,
      channel: 'push',
      target: `${activeSubs.length} registered device(s)`,
      status: 'skipped_unconfigured',
      detail: 'VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY environment variables are not configured.',
      timestamp: new Date().toISOString()
    });
  } else if (activeSubs.length === 0) {
    pushSummary.status = 'no_registered_devices';
    db.notificationDeliveryLogs.unshift({
      id: `dlog_${Date.now()}_no_dev`,
      notificationId,
      eventId: input.eventId,
      category: input.category,
      channel: 'push',
      target: '0 devices',
      status: 'skipped_unconfigured',
      detail: 'No active admin push devices registered yet. Click "Enable Notifications" on a device.',
      timestamp: new Date().toISOString()
    });
  } else {
    webpush.setVapidDetails(vapid.subject, vapid.publicKey, vapid.privateKey);
    const pushPayload = JSON.stringify({
      title: record.title,
      body: record.lockScreenBody,
      icon: '/pwa-192x192.png',
      badge: '/badge-72x72.png',
      tag: input.eventId,
      renotify: true,
      data: {
        url: record.deepLinkUrl,
        notificationId: record.id,
        referenceId: record.referenceId,
        relatedRecordId: record.relatedRecordId,
        relatedRecordType: record.relatedRecordType,
        category: record.category,
        color: record.color
      }
    });

    for (const sub of activeSubs) {
      pushSummary.attempted += 1;
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys
          },
          pushPayload,
          { TTL: 60 * 60 * 12 }
        );
        sub.lastUsedAt = new Date().toISOString();
        sub.failureCount = 0;
        sub.lastError = undefined;
        pushSummary.delivered += 1;
        db.notificationDeliveryLogs.unshift({
          id: `dlog_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          notificationId,
          eventId: input.eventId,
          category: input.category,
          channel: 'push',
          target: sub.deviceLabel,
          status: 'delivered',
          statusCode: 201,
          detail: `Delivered via Web Push (${sub.platform} / ${sub.browser})`,
          timestamp: new Date().toISOString()
        });
      } catch (err: any) {
        const statusCode = err?.statusCode || err?.code;
        if (statusCode === 410 || statusCode === 404) {
          // Expired or revoked push endpoint: safely deactivate and clean up
          sub.isActive = false;
          sub.lastError = `Expired subscription (HTTP ${statusCode})`;
          pushSummary.expiredRemoved += 1;
          db.notificationDeliveryLogs.unshift({
            id: `dlog_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            notificationId,
            eventId: input.eventId,
            category: input.category,
            channel: 'push',
            target: sub.deviceLabel,
            status: 'expired_removed',
            statusCode: Number(statusCode),
            detail: `Subscription expired or unsubscribed (HTTP ${statusCode}) and deactivated safely.`,
            timestamp: new Date().toISOString()
          });
        } else {
          sub.failureCount = (sub.failureCount || 0) + 1;
          sub.lastError = err?.message || 'Push dispatch failed';
          if (sub.failureCount >= 5) {
            sub.isActive = false;
          }
          pushSummary.failed += 1;
          db.notificationDeliveryLogs.unshift({
            id: `dlog_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            notificationId,
            eventId: input.eventId,
            category: input.category,
            channel: 'push',
            target: sub.deviceLabel,
            status: 'failed',
            statusCode: typeof statusCode === 'number' ? statusCode : undefined,
            detail: err?.message || 'Unknown push error',
            timestamp: new Date().toISOString()
          });
        }
      }
    }

    // Prune deactivated expired subscriptions automatically
    db.pushSubscriptions = (db.pushSubscriptions || []).filter(s => s.isActive);
    pushSummary.status =
      pushSummary.delivered > 0
        ? pushSummary.failed > 0
          ? 'partial_delivery'
          : 'delivered'
        : 'failed';
  }

  // 5. Email Backup Dispatch (SMTP)
  const emailSummary = {
    attempted: 0,
    delivered: 0,
    failed: 0,
    status: 'not_attempted'
  };

  const smtp = getSmtpConfig();
  const recipients = (config.recipientEmails && config.recipientEmails.length > 0
    ? config.recipientEmails
    : [OWNER_ADMIN_EMAIL]
  ).filter(Boolean);

  if (!config.emailBackupEnabled) {
    emailSummary.status = 'email_disabled';
    db.notificationDeliveryLogs.unshift({
      id: `dlog_${Date.now()}_email_off`,
      notificationId,
      eventId: input.eventId,
      category: input.category,
      channel: 'email',
      target: recipients.join(', '),
      status: 'skipped_disabled',
      detail: 'Email backup is disabled in Notification Preferences.',
      timestamp: new Date().toISOString()
    });
  } else if (!smtp.configured) {
    emailSummary.status = 'smtp_unconfigured';
    db.notificationDeliveryLogs.unshift({
      id: `dlog_${Date.now()}_smtp_miss`,
      notificationId,
      eventId: input.eventId,
      category: input.category,
      channel: 'email',
      target: recipients.join(', '),
      status: 'skipped_unconfigured',
      detail: 'SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables are not configured.',
      timestamp: new Date().toISOString()
    });
  } else {
    try {
      const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: {
          user: smtp.user,
          pass: smtp.pass
        }
      });

      const subject = `${def.emailSubject} — ${record.customerName} (${record.referenceId})`;
      const html = buildEmailHtml(record, def);

      for (const emailAddr of recipients) {
        emailSummary.attempted += 1;
        try {
          await transporter.sendMail({
            from: smtp.from,
            to: emailAddr,
            subject,
            text: `${record.title}\n\n${record.message}\nRef: ${record.referenceId}\nOpen: ${record.deepLinkUrl}`,
            html
          });
          emailSummary.delivered += 1;
          db.notificationDeliveryLogs.unshift({
            id: `dlog_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            notificationId,
            eventId: input.eventId,
            category: input.category,
            channel: 'email',
            target: emailAddr,
            status: 'delivered',
            detail: `Email sent: ${subject}`,
            timestamp: new Date().toISOString()
          });
        } catch (mailErr: any) {
          emailSummary.failed += 1;
          db.notificationDeliveryLogs.unshift({
            id: `dlog_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            notificationId,
            eventId: input.eventId,
            category: input.category,
            channel: 'email',
            target: emailAddr,
            status: 'failed',
            detail: mailErr?.message || 'SMTP send failed',
            timestamp: new Date().toISOString()
          });
        }
      }
      emailSummary.status = emailSummary.delivered > 0 ? 'delivered' : 'failed';
    } catch (transportErr: any) {
      emailSummary.status = 'failed';
      db.notificationDeliveryLogs.unshift({
        id: `dlog_${Date.now()}_smtp_err`,
        notificationId,
        eventId: input.eventId,
        category: input.category,
        channel: 'email',
        target: recipients.join(', '),
        status: 'failed',
        detail: transportErr?.message || 'Failed creating SMTP transport',
        timestamp: new Date().toISOString()
      });
    }
  }

  if (db.notificationDeliveryLogs.length > 300) {
    db.notificationDeliveryLogs = db.notificationDeliveryLogs.slice(0, 300);
  }
  saveDb(db);

  return {
    created: true,
    notification: record,
    pushSummary,
    emailSummary
  };
}

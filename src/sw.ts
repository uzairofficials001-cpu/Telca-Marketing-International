import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

interface SwExtendableEvent extends Event {
  waitUntil: (promise: Promise<unknown>) => void;
}

interface SwPushEvent extends SwExtendableEvent {
  data?: {
    json: () => any;
    text: () => string;
  } | null;
}

interface SwNotificationClickEvent extends SwExtendableEvent {
  notification: Notification & {
    data?: {
      url?: string;
      notificationId?: string;
      referenceId?: string;
      relatedRecordId?: string;
      category?: string;
    };
  };
  action?: string;
}

interface SwWindowClient {
  url: string;
  focused?: boolean;
  focus?: () => Promise<SwWindowClient>;
  navigate?: (url: string) => Promise<SwWindowClient | null>;
}

interface SwGlobalScope {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
  skipWaiting: () => Promise<void>;
  clients: {
    claim: () => Promise<void>;
    matchAll: (options?: { type?: 'window' | 'worker' | 'sharedworker' | 'all'; includeUncontrolled?: boolean }) => Promise<SwWindowClient[]>;
    openWindow: (url: string) => Promise<SwWindowClient | null>;
  };
  registration: ServiceWorkerRegistration;
  location: Location;
  addEventListener: (type: string, listener: (event: any) => void) => void;
}

const sw = self as unknown as SwGlobalScope;

cleanupOutdatedCaches();
precacheAndRoute((self as unknown as SwGlobalScope).__WB_MANIFEST || []);

sw.addEventListener('install', () => {
  void sw.skipWaiting();
});

sw.addEventListener('activate', (event: SwExtendableEvent) => {
  event.waitUntil(sw.clients.claim());
});

sw.addEventListener('push', (event: SwPushEvent) => {
  let payload: Record<string, any> = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = {
      title: 'Telca Marketing Notification',
      body: event.data?.text() || 'A new business update is ready in Telca Admin.'
    };
  }

  const title = payload.title || 'Telca Marketing Alert';
  const options: NotificationOptions & Record<string, any> = {
    body: payload.body || 'Open Telca Admin Dashboard to review details.',
    icon: payload.icon || '/pwa-192x192.png',
    badge: payload.badge || '/badge-72x72.png',
    tag: payload.tag || `telca-alert-${Date.now()}`,
    renotify: true,
    vibrate: [180, 70, 180],
    data: payload.data || { url: '/#admin?tab=notifications' },
    actions: [
      { action: 'open', title: 'Open in Admin' }
    ]
  };

  event.waitUntil(sw.registration.showNotification(title, options));
});

sw.addEventListener('notificationclick', (event: SwNotificationClickEvent) => {
  event.notification.close();

  const targetRelativeUrl = event.notification?.data?.url || '/#admin?tab=notifications';
  const targetUrl = new URL(targetRelativeUrl, sw.location.origin).href;

  event.waitUntil(
    (async () => {
      const windowClients = await sw.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      });

      for (const client of windowClients) {
        if (client.url.startsWith(sw.location.origin)) {
          if (typeof client.navigate === 'function') {
            await client.navigate(targetUrl).catch(() => null);
          }
          if (typeof client.focus === 'function') {
            return client.focus();
          }
        }
      }

      if (typeof sw.clients.openWindow === 'function') {
        return sw.clients.openWindow(targetUrl);
      }
      return null;
    })()
  );
});

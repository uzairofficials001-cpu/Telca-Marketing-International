export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function detectDeviceContext() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const platform: 'android' | 'ios' | 'desktop' | 'unknown' = isAndroid
    ? 'android'
    : isIOS
      ? 'ios'
      : /Windows|Macintosh|Linux|CrOS/i.test(ua)
        ? 'desktop'
        : 'unknown';

  let browser = 'Browser';
  if (/Edg\//i.test(ua)) browser = 'Microsoft Edge';
  else if (/CriOS\//i.test(ua)) browser = 'Chrome (iOS)';
  else if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) browser = 'Google Chrome';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari';

  const isStandalonePwa =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
      Boolean((window.navigator as any).standalone));

  const platformName =
    platform === 'android'
      ? 'Android Phone'
      : platform === 'ios'
        ? 'iPhone / iPad'
        : platform === 'desktop'
          ? /Mac/i.test(ua)
            ? 'macOS Desktop'
            : /Windows/i.test(ua)
              ? 'Windows PC'
              : 'Desktop'
          : 'Mobile Device';

  const deviceLabel = `${platformName} · ${browser}${isStandalonePwa ? ' (PWA App)' : ''}`;

  return {
    platform,
    browser,
    isIOS,
    isAndroid,
    isStandalonePwa,
    deviceLabel,
    userAgent: ua.slice(0, 220)
  };
}

export function getBrowserPushCapabilities() {
  if (typeof window === 'undefined') {
    return {
      supported: false,
      serviceWorkerSupported: false,
      pushManagerSupported: false,
      notificationSupported: false,
      permission: 'default' as NotificationPermission | 'unsupported',
      isSecureContext: false
    };
  }

  const serviceWorkerSupported = 'serviceWorker' in navigator;
  const pushManagerSupported = 'PushManager' in window;
  const notificationSupported = 'Notification' in window;
  const supported = serviceWorkerSupported && pushManagerSupported && notificationSupported;
  const permission: NotificationPermission | 'unsupported' = notificationSupported
    ? Notification.permission
    : 'unsupported';

  return {
    supported,
    serviceWorkerSupported,
    pushManagerSupported,
    notificationSupported,
    permission,
    isSecureContext: window.isSecureContext
  };
}

export async function getActiveServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const existing = await navigator.serviceWorker.getRegistration();
    if (existing) {
      return await navigator.serviceWorker.ready;
    }
    // Wait briefly for VitePWA auto-registration
    const readyPromise = navigator.serviceWorker.ready;
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000));
    return await Promise.race([readyPromise, timeoutPromise]);
  } catch {
    return null;
  }
}

export async function subscribeDeviceToPush(
  token: string,
  vapidPublicKey: string,
  customLabel?: string
): Promise<{ subscriptionId: string; deviceLabel: string; endpoint: string }> {
  const reg = await getActiveServiceWorkerRegistration();
  if (!reg) {
    throw new Error('Service Worker is not active yet. Reload the page over HTTPS or localhost and try again.');
  }

  if (!('Notification' in window)) {
    throw new Error('Browser Notifications API is not available on this browser.');
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error(
      permission === 'denied'
        ? 'Notification permission was blocked in browser settings. Allow notifications for this site and retry.'
        : 'Notification permission prompt was dismissed.'
    );
  }

  let pushSub = await reg.pushManager.getSubscription();
  if (!pushSub) {
    const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
    pushSub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey.buffer as ArrayBuffer
    });
  }

  const subJson = pushSub.toJSON();
  const deviceCtx = detectDeviceContext();

  const res = await fetch('/api/admin/push/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      subscription: {
        endpoint: subJson.endpoint,
        keys: subJson.keys
      },
      deviceLabel: customLabel?.trim() || deviceCtx.deviceLabel,
      platform: deviceCtx.platform,
      browser: deviceCtx.browser,
      userAgent: deviceCtx.userAgent,
      isStandalonePwa: deviceCtx.isStandalonePwa
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to register push subscription with server.');
  }

  return {
    subscriptionId: data.subscription.id,
    deviceLabel: data.subscription.deviceLabel,
    endpoint: data.subscription.endpoint
  };
}

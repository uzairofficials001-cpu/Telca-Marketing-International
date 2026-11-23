/**
 * Telca Marketing First-Party Privacy-Preserving Analytics & Session Tracker
 */

const SESSION_STORAGE_KEY = 'tm_session_id';
const CONSENT_STORAGE_KEY = 'tm_analytics_consent';

export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!id) {
    id = `vs_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    sessionStorage.setItem(SESSION_STORAGE_KEY, id);
  }
  return id;
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted';
}

export function setAnalyticsConsent(accepted: boolean) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_STORAGE_KEY, accepted ? 'accepted' : 'declined');
}

export function initVisitorSession(landingPage?: string) {
  if (typeof window === 'undefined') return;
  const sessionId = getSessionId();
  const device = window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop';
  const consentGiven = hasAnalyticsConsent();

  fetch('/api/analytics/session/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      device,
      landingPage: landingPage || window.location.hash || '/',
      referrer: document.referrer || '',
      consentGiven
    })
  }).catch(() => {});
}

export function trackEvent(
  type: 'pageview' | 'cta_click' | 'button_click' | 'time_spent' | 'content_view' | 'plan_selected' | 'bundle_action' | 'form_opened' | 'form_submitted',
  action: string,
  label: string,
  metadata?: Record<string, any>
) {
  if (typeof window === 'undefined') return;
  const sessionId = getSessionId();
  const currentPath = window.location.hash || window.location.pathname || '/';

  fetch('/api/analytics/session/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      type,
      action,
      label,
      path: currentPath,
      metadata: {
        ...metadata,
        url: window.location.href,
        screenWidth: window.innerWidth,
        timestamp: new Date().toISOString()
      }
    })
  }).catch(() => {});
}

export function trackButtonClick(buttonName: string, targetAction?: string, metadata?: Record<string, any>) {
  trackEvent('button_click', `Clicked Button: ${buttonName}`, targetAction || buttonName, metadata);
}

export function trackPageTime(page: string, seconds: number) {
  if (seconds < 2) return; // ignore sub-2s bounces
  const formatted = seconds >= 60 ? `${Math.floor(seconds / 60)}m ${seconds % 60}s` : `${seconds}s`;
  trackEvent('time_spent', `Spent ${formatted} on ${page}`, page, { seconds, formatted });
}

export function trackContentView(contentType: string, title: string, metadata?: Record<string, any>) {
  trackEvent('content_view', `Viewed ${contentType}: ${title}`, title, metadata);
}

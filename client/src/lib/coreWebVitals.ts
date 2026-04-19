import { getConsent } from "@/lib/gdpr";

type MetricName = "LCP" | "CLS" | "INP";

function sendToGA(name: MetricName, value: number) {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const consent = getConsent();
  if (!gaId || !consent.analytics) return;
  // @ts-expect-error gtag is injected dynamically after consent
  if (typeof window.gtag !== "function") return;
  // @ts-expect-error gtag is injected dynamically after consent
  window.gtag("event", name, {
    event_category: "Web Vitals",
    value: Math.round(name === "CLS" ? value * 1000 : value),
    non_interaction: true,
  });
}

export function trackCoreWebVitals() {
  if (typeof window === "undefined" || typeof PerformanceObserver === "undefined") return;

  let clsValue = 0;

  try {
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) clsValue += entry.value;
      }
      sendToGA("CLS", clsValue);
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });

    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1] as any;
      if (last?.startTime) sendToGA("LCP", last.startTime);
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

    const inpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as any[];
      for (const entry of entries) {
        const inp = entry.duration ?? entry.processingEnd - entry.startTime;
        if (inp) sendToGA("INP", inp);
      }
    });
    inpObserver.observe({ type: "event", buffered: true } as PerformanceObserverInit);
  } catch {
    // unsupported browser
  }
}

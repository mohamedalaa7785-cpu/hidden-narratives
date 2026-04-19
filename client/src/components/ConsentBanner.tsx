import { Button } from "@/components/ui/button";
import { getConsent, setConsent, type GDPRConsent } from "@/lib/gdpr";
import { useEffect, useState } from "react";

const CONSENT_CHOICE_KEY = "gdpr-choice-made";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const madeChoice = localStorage.getItem(CONSENT_CHOICE_KEY);
    if (!madeChoice) setVisible(true);
  }, []);

  const decide = (consent: Partial<GDPRConsent>, choice: "accept" | "reject") => {
    setConsent(consent);
    localStorage.setItem(CONSENT_CHOICE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-3xl rounded-xl border border-amber-900/40 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur">
      <h3 className="text-lg font-semibold text-amber-300">Privacy & Cookies</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        We use cookies for essential functionality. Analytics and advertising scripts are disabled by default and
        only enabled after you accept.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          onClick={() => decide({ analytics: true, marketing: true, functional: true }, "accept")}
          className="bg-amber-600 text-black hover:bg-amber-700"
        >
          Accept
        </Button>
        <Button
          variant="outline"
          onClick={() => decide({ analytics: false, marketing: false, functional: true }, "reject")}
          className="border-slate-600 text-slate-200"
        >
          Reject
        </Button>
      </div>
    </div>
  );
}

export function ConsentAwareAnalytics() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const onUpdate = () => setTick((t) => t + 1);
    window.addEventListener("gdpr-consent-updated", onUpdate as EventListener);
    return () => window.removeEventListener("gdpr-consent-updated", onUpdate as EventListener);
  }, []);

  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!gaId) return;

    const consent = getConsent();

    const adClient = import.meta.env.VITE_ADSENSE_CLIENT;
    if (consent.marketing && adClient && !document.getElementById("adsense-script")) {
      const adScript = document.createElement("script");
      adScript.id = "adsense-script";
      adScript.async = true;
      adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
      adScript.crossOrigin = "anonymous";
      document.head.appendChild(adScript);
    }
    if (!consent.analytics) return;

    if (document.getElementById("ga-script")) return;

    const script1 = document.createElement("script");
    script1.id = "ga-script";
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}', { anonymize_ip: true });`;
    document.head.appendChild(script2);
  }, [tick]);

  return null;
}

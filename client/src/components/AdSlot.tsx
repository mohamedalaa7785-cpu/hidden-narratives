import { hasConsent } from "@/lib/gdpr";
import { useEffect, useMemo } from "react";

type Position = "top" | "inline" | "sidebar";

export function AdSlot({ position }: { position: Position }) {
  const adClient = import.meta.env.VITE_ADSENSE_CLIENT;
  const adSlot = useMemo(() => {
    if (position === "top") return import.meta.env.VITE_ADSENSE_SLOT_TOP;
    if (position === "inline") return import.meta.env.VITE_ADSENSE_SLOT_INLINE;
    return import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR;
  }, [position]);

  const canShow = Boolean(adClient && adSlot && hasConsent("marketing"));

  useEffect(() => {
    if (!canShow) return;
    try {
      // @ts-expect-error adsbygoogle global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore render retries
    }
  }, [canShow]);

  if (!canShow) return null;

  const minHeight = position === "sidebar" ? 600 : 250;

  return (
    <div className="my-8 overflow-hidden rounded-lg border border-slate-700/60 bg-slate-900/40 p-2" aria-label={`Advertisement ${position}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

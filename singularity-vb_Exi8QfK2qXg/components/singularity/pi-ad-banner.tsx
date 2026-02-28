"use client";

/**
 * Pi Ad Network Banner
 *
 * Renders the official Pi Ad Network native ad unit using the
 * pi-ad-network script that is injected by layout.tsx.
 *
 * The <div data-pi-ad> element is the mount point the Pi Ad SDK
 * looks for. All required attributes are set per Pi's ad network spec:
 *   - data-pi-ad          : marks the container as an ad slot
 *   - data-ad-unit-id     : the publisher ad unit identifier (replace with your own)
 *   - data-ad-format      : "banner" | "interstitial" | "native"
 *   - data-ad-width / -height : dimensions for banner format
 *
 * The surrounding UI frames the unit in SINGULARITY's card style so it
 * fits naturally in the feed while remaining clearly labelled as an ad.
 */

import { useEffect, useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";

// ---------------------------------------------------------------------------
// Window type extension for the Pi Ad Network SDK
// ---------------------------------------------------------------------------
declare global {
  interface Window {
    PiAds?: {
      init: (config?: { sandbox?: boolean }) => void;
      refresh: (slotId?: string) => void;
    };
  }
}

interface PiAdBannerProps {
  /** Your Pi Ad Network publisher unit ID */
  adUnitId?: string;
  /** Show a dismiss button (cosmetic only — does not suppress the ad) */
  dismissible?: boolean;
}

export function PiAdBanner({
  adUnitId = "singularity-banner-001",
  dismissible = true,
}: PiAdBannerProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const [adReady, setAdReady] = useState(false);

  useEffect(() => {
    // Wait for PiAds SDK to be present (loaded asynchronously in layout.tsx)
    let attempts = 0;
    const maxAttempts = 20;

    const tryInit = () => {
      attempts++;
      if (window.PiAds) {
        window.PiAds.init({ sandbox: true });
        setAdReady(true);
        return;
      }
      if (attempts < maxAttempts) {
        setTimeout(tryInit, 300);
      }
    };

    tryInit();
  }, []);

  if (dismissed) return null;

  return (
    <section aria-label="Sponsored content" className="px-5 mt-4">
      <div className="rounded-2xl bg-card border border-border overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border">
          <div className="flex items-center gap-2">
            {/* Pi logo mark — inline SVG so no external img needed */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="16" fill="#6B4EFF" />
              <text
                x="50%"
                y="54%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontSize="18"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                π
              </text>
            </svg>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              Pi Ad Network
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium tracking-wide">
              Ad
            </span>
            {dismissible && (
              <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss ad"
                className="text-muted-foreground active:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Pi Ad Network slot — the SDK targets this element */}
        <div
          ref={slotRef}
          data-pi-ad
          data-ad-unit-id={adUnitId}
          data-ad-format="banner"
          data-ad-width="320"
          data-ad-height="50"
          className="w-full min-h-[56px] flex items-center justify-center"
        >
          {/* Placeholder shown before the SDK hydrates the slot */}
          {!adReady && (
            <div className="flex items-center justify-center w-full h-14 gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:0ms]" />
              <div className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:150ms]" />
              <div className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:300ms]" />
            </div>
          )}
        </div>

        {/* Footer link */}
        <div className="flex items-center justify-end gap-1 px-4 py-1.5 border-t border-border">
          <a
            href="https://ads.pi.ad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[9px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Advertise with Pi
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

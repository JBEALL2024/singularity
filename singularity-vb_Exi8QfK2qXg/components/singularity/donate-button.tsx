"use client";

import { useState } from "react";
import { Heart, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

type PaymentStatus = "idle" | "loading" | "success" | "error";

/**
 * DonateButton — Pi Network payment button.
 *
 * IMPORTANT: This component NEVER requests, collects, or handles user
 * passphrases. Clicking this button delegates entirely to the Pi Browser's
 * native wallet dialog via window.Pi.createPayment(). The app has zero
 * access to wallet credentials at any point.
 */
export function DonateButton() {
  const { products, isAuthenticated } = usePiAuth();
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const product = products?.find(
    (p) => p.id === PRODUCT_CONFIG.PRODUCT_699e21990ae88ff885f96c4e
  );

  const handleDonate = () => {
    if (!product || status === "loading") return;

    // Verify Pi SDK is available before attempting payment.
    // window.Pi.createPayment is the only payment entry point — no passphrase
    // is ever requested by this app.
    if (
      typeof window === "undefined" ||
      typeof window.Pi === "undefined" ||
      typeof window.Pi.createPayment !== "function"
    ) {
      setStatus("error");
      setErrorMsg("Pi Browser is required to make payments.");
      setTimeout(() => {
        setStatus("idle");
        setErrorMsg(null);
      }, 4000);
      return;
    }

    setStatus("loading");
    setErrorMsg(null);

    // Delegates to window.pay which calls window.Pi.createPayment internally.
    // The Pi Browser opens its own secure native wallet UI — this app never
    // intercepts or prompts for wallet credentials.
    window.pay({
      amount: product.price_in_pi,
      memo: product.name,
      metadata: { productId: product.id },
      onComplete: () => {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
      },
      onCancel: () => {
        setStatus("idle");
      },
      onError: (error: Error) => {
        setStatus("error");
        setErrorMsg(error?.message ?? "Payment failed. Please try again.");
        setTimeout(() => {
          setStatus("idle");
          setErrorMsg(null);
        }, 4000);
      },
    });
  };

  // Not authenticated — render nothing until auth is ready
  if (!isAuthenticated) return null;

  // Product not found in context — disable the button
  if (!product) {
    return (
      <button
        disabled
        aria-disabled="true"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-semibold opacity-50 cursor-not-allowed"
      >
        <Heart className="w-4 h-4" />
        Donate
      </button>
    );
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent/20 text-accent text-sm font-semibold"
      >
        <CheckCircle className="w-4 h-4" />
        Thank you!
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive text-sm font-semibold"
      >
        <AlertCircle className="w-4 h-4" />
        {errorMsg ?? "Payment failed"}
      </div>
    );
  }

  return (
    <button
      onClick={handleDonate}
      disabled={status === "loading"}
      aria-busy={status === "loading"}
      // Clarify that payment is handled securely by the Pi Browser — this app
      // never asks for a passphrase or wallet credentials.
      aria-label={`Donate ${product.price_in_pi} Pi — payment handled securely by Pi Browser`}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-primary-foreground text-sm font-semibold active:scale-95 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {status === "loading" ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Heart className="w-4 h-4" />
      )}
      {status === "loading"
        ? "Waiting for Pi Browser..."
        : `Donate ${product.price_in_pi} Pi`}
    </button>
  );
}

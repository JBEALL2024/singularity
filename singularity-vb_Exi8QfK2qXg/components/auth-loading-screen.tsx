"use client";

import { Zap, AlertTriangle, RefreshCw, Wifi } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";

const steps = [
  "Loading Pi Network SDK...",
  "Authenticating with Pi Network...",
  "Logging in...",
];

function getStepIndex(message: string): number {
  return steps.findIndex((s) => message.includes(s.split("...")[0]));
}

export function AuthLoadingScreen() {
  const { authMessage, hasError, reinitialize } = usePiAuth();

  const activeStep = getStepIndex(authMessage);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 starfield">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-accent/8 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs text-center">

        {/* Logo mark */}
        <div className="flex flex-col items-center gap-3">
          <div className={`relative flex items-center justify-center w-20 h-20 rounded-3xl bg-card border ${hasError ? "border-destructive/40" : "border-primary/30"} glow-amber`}>
            {hasError ? (
              <AlertTriangle className="w-9 h-9 text-destructive" />
            ) : (
              <>
                <Zap className="w-9 h-9 text-primary animate-float" />
                {/* Orbiting dot */}
                <span className="absolute w-2.5 h-2.5 rounded-full bg-accent animate-orbit" />
              </>
            )}
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] text-muted-foreground uppercase">
              Singularity
            </p>
            <h1 className="text-xl font-bold text-foreground mt-0.5 text-balance">
              {hasError ? "Authentication Failed" : "Pioneer Verification"}
            </h1>
          </div>
        </div>

        {/* Spinner or error icon */}
        {!hasError && (
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-primary/15" />
            <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <div className="absolute inset-2 rounded-full border border-accent/20 border-b-transparent animate-[spin_3s_linear_reverse_infinite]" />
          </div>
        )}

        {/* Status message */}
        <div className="rounded-2xl bg-card border border-border px-5 py-4 w-full">
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 shrink-0 w-2 h-2 rounded-full ${hasError ? "bg-destructive" : "bg-primary animate-pulse"}`} />
            <p className={`text-sm leading-relaxed text-left ${hasError ? "text-destructive" : "text-muted-foreground"}`}>
              {authMessage}
            </p>
          </div>

          {/* Step progress — only show during loading */}
          {!hasError && (
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border">
              {steps.map((step, i) => (
                <div
                  key={step}
                  className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                    i < activeStep
                      ? "bg-primary"
                      : i === activeStep
                      ? "bg-primary/60 animate-pulse"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pi Network badge */}
        {!hasError && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Wifi className="w-3.5 h-3.5 text-accent" />
            <span>Connecting via Pi Network</span>
          </div>
        )}

        {/* Retry button */}
        {hasError && (
          <button
            onClick={reinitialize}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold glow-amber active:scale-95 transition-transform w-full justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Authentication
          </button>
        )}

        <p className="text-[10px] text-muted-foreground leading-relaxed text-pretty px-2">
          Open this app inside the Pi Browser to authenticate as a Pioneer.
        </p>
      </div>
    </div>
  );
}

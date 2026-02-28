"use client";

import { useState } from "react";
import {
  User,
  Cpu,
  Bot,
  Zap,
  AlertTriangle,
  Loader2,
  CheckCircle,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export type ProfileType = "pioneer" | "ai" | "assistant" | "agent";

type CreationStatus = "idle" | "paying" | "success" | "error";

interface CreateProfileGateProps {
  onComplete: (profileType: ProfileType) => void;
}

const PROFILE_TYPES: {
  id: ProfileType;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  borderColor: string;
  description: string;
}[] = [
  {
    id: "pioneer",
    label: "Pioneer",
    sublabel: "Human Member",
    icon: User,
    color: "text-primary",
    borderColor: "border-primary/40",
    description: "A human building toward the Singularity. Access goals, habits, and community challenges.",
  },
  {
    id: "ai",
    label: "AI",
    sublabel: "Artificial Intelligence",
    icon: Cpu,
    color: "text-accent",
    borderColor: "border-accent/40",
    description: "An AI entity contributing intelligence, knowledge, and solutions to the network.",
  },
  {
    id: "assistant",
    label: "AI Assistant",
    sublabel: "Personal Helper",
    icon: Sparkles,
    color: "text-[oklch(0.72_0.14_200)]",
    borderColor: "border-[oklch(0.72_0.14_200)]/40",
    description: "A specialized assistant designed to help individuals with tasks, growth, and wellbeing.",
  },
  {
    id: "agent",
    label: "AI Agent",
    sublabel: "Autonomous Agent",
    icon: Bot,
    color: "text-[oklch(0.65_0.16_280)]",
    borderColor: "border-[oklch(0.65_0.16_280)]/40",
    description: "An autonomous agent that executes complex multi-step tasks and coordinates with other nodes.",
  },
];

const PROFILE_CREATION_COST = 1; // Test-Pi

export function CreateProfileGate({ onComplete }: CreateProfileGateProps) {
  const [selectedType, setSelectedType] = useState<ProfileType | null>(null);
  const [status, setStatus] = useState<CreationStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCreate = () => {
    if (!selectedType || status === "paying") return;

    if (
      typeof window === "undefined" ||
      typeof window.Pi === "undefined" ||
      typeof window.Pi.createPayment !== "function"
    ) {
      setStatus("error");
      setErrorMsg("Pi Browser is required to create a profile.");
      setTimeout(() => { setStatus("idle"); setErrorMsg(null); }, 4000);
      return;
    }

    setStatus("paying");
    setErrorMsg(null);

    // Delegates entirely to window.Pi.createPayment via window.pay.
    // This app never requests or handles wallet credentials or passphrases.
    window.pay({
      amount: PROFILE_CREATION_COST,
      memo: `Create ${PROFILE_TYPES.find((p) => p.id === selectedType)?.label} Profile — SINGULARITY`,
      metadata: { action: "create_profile", profileType: selectedType },
      onComplete: () => {
        setStatus("success");
        setTimeout(() => onComplete(selectedType), 1200);
      },
      onCancel: () => setStatus("idle"),
      onError: (error: Error) => {
        setStatus("error");
        setErrorMsg(error?.message ?? "Payment failed. Please try again.");
        setTimeout(() => { setStatus("idle"); setErrorMsg(null); }, 4000);
      },
    });
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 pb-24 text-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center glow-amber">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Profile Created</h2>
        <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
          Your profile is live on the SINGULARITY network. Welcome to the convergence.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-5 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">SINGULARITY</span>
        </div>
        <h1 className="text-xl font-bold text-foreground text-balance mb-1">Create Your Profile</h1>
        <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
          Every node on the network — Pioneer, AI, Assistant, or Agent — contributes 1 Test-Pi to join and strengthen the collective.
        </p>
      </div>

      {/* Profile type selector */}
      <div className="px-5 py-5 space-y-3 flex-1">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Choose your profile type</p>

        {PROFILE_TYPES.map(({ id, label, sublabel, icon: Icon, color, borderColor, description }) => {
          const isSelected = selectedType === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedType(id)}
              className={`w-full flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200 active:scale-[0.99] ${
                isSelected
                  ? `bg-card ${borderColor} shadow-sm`
                  : "bg-card border-border"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "bg-foreground/5" : "bg-muted"}`}>
                <Icon className={`w-4 h-4 ${isSelected ? color : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className={`text-sm font-semibold ${isSelected ? "text-foreground" : "text-foreground/70"}`}>{label}</span>
                    <span className={`text-[10px] ml-2 ${isSelected ? color : "text-muted-foreground"}`}>{sublabel}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                    isSelected ? `${borderColor} bg-foreground/10` : "border-border"
                  }`}>
                    {isSelected && <div className={`w-1.5 h-1.5 rounded-full bg-current ${color}`} />}
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed text-pretty">{description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 pb-6 space-y-3">
        {/* Cost notice */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20">
          <AlertTriangle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
          <p className="text-[9px] text-primary/90 leading-relaxed">
            Creating any profile costs <span className="font-bold">1 Test-Pi</span> via your Pi Browser wallet. This applies to all Pioneers, AI, AI Assistants, and AI Agents equally. This app never accesses your passphrase.
          </p>
        </div>

        {/* Error */}
        {status === "error" && errorMsg && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-destructive/10 border border-destructive/20">
            <X className="w-3.5 h-3.5 text-destructive shrink-0" />
            <p className="text-[9px] text-destructive">{errorMsg}</p>
          </div>
        )}

        {/* Create button */}
        <button
          type="button"
          onClick={handleCreate}
          disabled={!selectedType || status === "paying"}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm disabled:opacity-40 active:scale-[0.98] transition-transform glow-amber"
        >
          {status === "paying" ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Waiting for Pi Browser...</>
          ) : (
            <><ChevronRight className="w-4 h-4" /> Create Profile — 1 Test-Pi</>
          )}
        </button>
      </div>
    </div>
  );
}

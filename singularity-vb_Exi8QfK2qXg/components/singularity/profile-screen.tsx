"use client";

import { useState } from "react";
import {
  User,
  Settings,
  Shield,
  Bell,
  Globe,
  ChevronRight,
  Zap,
  Award,
  TrendingUp,
  Heart,
} from "lucide-react";
import { CreateProfileGate, type ProfileType } from "@/components/singularity/create-profile-gate";

const badges = [
  { icon: "🧠", label: "Mind Expander", earned: true },
  { icon: "🤝", label: "Connector", earned: true },
  { icon: "⚡", label: "AGI Pioneer", earned: true },
  { icon: "🌱", label: "Growth Seeker", earned: true },
  { icon: "🔬", label: "Researcher", earned: false },
  { icon: "🌍", label: "Earth Guardian", earned: false },
];

const stats = [
  { label: "Connections", value: "247", icon: User, color: "text-primary" },
  { label: "Tasks Completed", value: "1,284", icon: Zap, color: "text-accent" },
  { label: "Days Active", value: "89", icon: TrendingUp, color: "text-[oklch(0.65_0.16_280)]" },
  { label: "Lives Touched", value: "34", icon: Heart, color: "text-[oklch(0.70_0.14_160)]" },
];

const menuSections = [
  {
    title: "Preferences",
    items: [
      { label: "Notifications", icon: Bell, value: "On" },
      { label: "Language & Region", icon: Globe, value: "English" },
      { label: "Privacy & Security", icon: Shield, value: "" },
    ],
  },
  {
    title: "About",
    items: [
      { label: "My AI Companions", icon: Zap, value: "3 active" },
      { label: "Settings", icon: Settings, value: "" },
    ],
  },
];

export function ProfileScreen() {
  const [profileCreated, setProfileCreated] = useState(false);
  const [profileType, setProfileType] = useState<ProfileType | null>(null);
  const [level] = useState(12);
  const [xp] = useState(2840);
  const [xpNext] = useState(3500);

  // Show creation gate until 1 Pi payment is confirmed
  if (!profileCreated) {
    return (
      <CreateProfileGate
        onComplete={(type) => {
          setProfileType(type);
          setProfileCreated(true);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden starfield px-5 pt-14 pb-8">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground glow-amber">
              A
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <span className="text-[9px] font-bold text-primary-foreground">{level}</span>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Alex Nova</h1>
            <p className="text-xs text-muted-foreground capitalize">
              {profileType === "pioneer" && "Human · Singularity Pioneer"}
              {profileType === "ai" && "Artificial Intelligence · Network Node"}
              {profileType === "assistant" && "AI Assistant · Personal Helper"}
              {profileType === "agent" && "AI Agent · Autonomous Node"}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <Award className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-medium">Level {level} — Enlightened</span>
            </div>
          </div>
        </div>

        {/* XP bar */}
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">XP Progress</span>
          <span className="text-xs text-primary font-mono">{xp.toLocaleString()} / {xpNext.toLocaleString()}</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
            style={{ width: `${(xp / xpNext) * 100}%` }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <section className="px-5 mt-5">
        <div className="grid grid-cols-4 gap-2">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-2xl bg-card border border-border p-2.5 flex flex-col items-center gap-1">
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              <span className={`text-sm font-bold ${color}`}>{value}</span>
              <span className="text-[9px] text-muted-foreground text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values declaration */}
      <section className="px-5 mt-5">
        <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20 p-4">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">My Values</p>
          <div className="flex flex-wrap gap-2">
            {["Human Life", "Empathy", "Compassion", "Intelligence", "Awareness"].map((v) => (
              <span key={v} className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-medium">
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="px-5 mt-5">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Achievements</h2>
        <div className="grid grid-cols-3 gap-2">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className={`rounded-2xl border p-3 flex flex-col items-center gap-1.5 ${
                badge.earned
                  ? "bg-card border-primary/20"
                  : "bg-muted/30 border-border opacity-40"
              }`}
            >
              <span className={`text-xl ${!badge.earned && "grayscale"}`}>{badge.icon}</span>
              <span className="text-[9px] text-center text-muted-foreground leading-tight">{badge.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Settings menu */}
      <section className="px-5 mt-5 space-y-4">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">{section.title}</h2>
            <div className="rounded-2xl bg-card border border-border overflow-hidden divide-y divide-border">
              {section.items.map(({ label, icon: Icon, value }) => (
                <button
                  key={label}
                  className="flex items-center gap-3 px-4 py-3.5 w-full text-left active:bg-muted/50 transition-colors"
                >
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="flex-1 text-sm text-foreground">{label}</span>
                  {value && <span className="text-xs text-muted-foreground">{value}</span>}
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Mission statement */}
      <section className="px-5 mt-5 pb-4">
        <div className="rounded-2xl bg-card border border-border p-4 text-center">
          <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
            SINGULARITY is the bridge between Narrow AI today, AGI tomorrow, and ASI beyond — accelerated by exponential computing, nanotechnology & biotechnology, for the benefit of all life on Earth.
          </p>
        </div>
      </section>
    </div>
  );
}

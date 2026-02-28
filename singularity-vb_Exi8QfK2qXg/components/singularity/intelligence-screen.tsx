"use client";

import { useState } from "react";
import { Brain, BookOpen, Lightbulb, ChevronRight, Play, Star, Clock } from "lucide-react";

type Category = "all" | "mental" | "knowledge" | "ai";

const insights = [
  {
    category: "mental" as const,
    icon: "🧠",
    title: "Neuroplasticity & You",
    desc: "How deliberate practice reshapes neural pathways for lasting growth",
    duration: "8 min read",
    rating: 4.9,
    color: "border-primary/30 bg-primary/5",
    labelColor: "text-primary bg-primary/10",
    label: "Mental Health",
  },
  {
    category: "ai" as const,
    icon: "⚡",
    title: "AGI Transition Timeline",
    desc: "Understanding the roadmap from narrow AI to artificial general intelligence",
    duration: "12 min read",
    rating: 4.8,
    color: "border-accent/30 bg-accent/5",
    labelColor: "text-accent bg-accent/10",
    label: "AI Science",
  },
  {
    category: "knowledge" as const,
    icon: "🌱",
    title: "Compounding Knowledge",
    desc: "Build a second brain system that compounds your intelligence daily",
    duration: "6 min read",
    rating: 4.7,
    color: "border-border bg-card",
    labelColor: "text-muted-foreground bg-muted",
    label: "Learning",
  },
  {
    category: "mental" as const,
    icon: "💫",
    title: "Empathy as Intelligence",
    desc: "Why emotional intelligence accelerates both human and AI capabilities",
    duration: "5 min read",
    rating: 4.9,
    color: "border-primary/30 bg-primary/5",
    labelColor: "text-primary bg-primary/10",
    label: "Mental Health",
  },
  {
    category: "ai" as const,
    icon: "🔬",
    title: "Biotechnology Convergence",
    desc: "How biotech + nanotech + AI are merging to redefine human potential",
    duration: "15 min read",
    rating: 5.0,
    color: "border-accent/30 bg-accent/5",
    labelColor: "text-accent bg-accent/10",
    label: "AI Science",
  },
];

const pillars = [
  { label: "Empathy", level: 78, color: "bg-primary" },
  { label: "Awareness", level: 65, color: "bg-accent" },
  { label: "Knowledge", level: 83, color: "bg-[oklch(0.65_0.16_280)]" },
  { label: "Behavior", level: 71, color: "bg-[oklch(0.70_0.14_160)]" },
];

const catTabs: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "mental", label: "Mind" },
  { id: "knowledge", label: "Knowledge" },
  { id: "ai", label: "AI Science" },
];

export function IntelligenceScreen() {
  const [cat, setCat] = useState<Category>("all");
  const filtered = insights.filter((i) => cat === "all" || i.category === cat);

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Header */}
      <div className="px-5 pt-14 pb-5 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold text-gradient-amber">Intelligence</h1>
        </div>
        <p className="text-xs text-muted-foreground">Grow your mind. Expand your awareness.</p>
      </div>

      {/* Core pillars */}
      <section className="px-5 py-5">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Your Core Pillars</h2>
        <div className="rounded-2xl bg-card border border-border p-4 space-y-3">
          {pillars.map((p) => (
            <div key={p.label} className="flex items-center gap-3">
              <span className="text-xs text-foreground w-20 shrink-0">{p.label}</span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${p.color}`}
                  style={{ width: `${p.level}%` }}
                />
              </div>
              <span className="text-xs font-mono text-muted-foreground w-8 text-right">{p.level}%</span>
            </div>
          ))}
          <p className="text-[10px] text-muted-foreground pt-1 border-t border-border">
            Built on human life, empathy, compassion & expanding awareness
          </p>
        </div>
      </section>

      {/* Daily insight prompt */}
      <section className="px-5 pb-5">
        <div className="rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Daily Reflection</span>
          </div>
          <p className="text-sm font-medium text-foreground leading-relaxed mb-3">
            "What one small action today will compound into extraordinary growth tomorrow?"
          </p>
          <button className="flex items-center gap-1.5 text-xs text-primary font-semibold">
            <Play className="w-3.5 h-3.5 fill-primary" /> Start guided session
          </button>
        </div>
      </section>

      {/* Filter */}
      <div className="flex gap-2 px-5 pb-3 overflow-x-auto">
        {catTabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setCat(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              cat === id
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-muted text-muted-foreground border border-transparent"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Insight cards */}
      <div className="px-5 space-y-3 pb-4">
        {filtered.map((item, i) => (
          <div key={i} className={`rounded-2xl border ${item.color} p-4 active:scale-[0.98] transition-transform cursor-pointer`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground leading-tight">{item.title}</h3>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-3 mt-2.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.labelColor}`}>
                    {item.label}
                  </span>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-3 h-3 text-primary fill-primary" />
                    <span className="text-[10px] text-muted-foreground">{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{item.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

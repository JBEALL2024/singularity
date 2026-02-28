"use client";

import { useState } from "react";
import { Search, UserPlus, Cpu, Bot, User, CheckCircle } from "lucide-react";

type NodeType = "all" | "human" | "ai" | "agent";

const nodes = [
  {
    type: "human" as const,
    avatar: "J",
    name: "Jordan Rivera",
    role: "Biohacker · Researcher",
    tags: ["Longevity", "Neuroscience"],
    affinity: 94,
    color: "bg-primary",
    textColor: "text-primary",
    connected: false,
  },
  {
    type: "ai" as const,
    avatar: "L",
    name: "Lumina",
    role: "AI Assistant · Empathy Model",
    tags: ["Mental Health", "Coaching"],
    affinity: 97,
    color: "bg-accent",
    textColor: "text-accent",
    connected: true,
  },
  {
    type: "human" as const,
    avatar: "S",
    name: "Sana Patel",
    role: "Educator · Habit Scientist",
    tags: ["Learning", "Habits"],
    affinity: 88,
    color: "bg-primary",
    textColor: "text-primary",
    connected: false,
  },
  {
    type: "agent" as const,
    avatar: "Ω",
    name: "OmegaAgent",
    role: "AI Agent · Systems Design",
    tags: ["Automation", "AGI Research"],
    affinity: 91,
    color: "bg-[oklch(0.65_0.16_280)]",
    textColor: "text-[oklch(0.65_0.16_280)]",
    connected: false,
  },
  {
    type: "ai" as const,
    avatar: "N",
    name: "Nova",
    role: "AI Assistant · Knowledge Graph",
    tags: ["Research", "Intelligence"],
    affinity: 99,
    color: "bg-accent",
    textColor: "text-accent",
    connected: true,
  },
  {
    type: "human" as const,
    avatar: "K",
    name: "Kai Tanaka",
    role: "Mindfulness Teacher",
    tags: ["Wellbeing", "Compassion"],
    affinity: 85,
    color: "bg-primary",
    textColor: "text-primary",
    connected: false,
  },
];

const filterTabs: { id: NodeType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "all", label: "All", icon: User },
  { id: "human", label: "People", icon: User },
  { id: "ai", label: "AI", icon: Cpu },
  { id: "agent", label: "Agents", icon: Bot },
];

export function ConnectScreen() {
  const [filter, setFilter] = useState<NodeType>("all");
  const [connected, setConnected] = useState<Record<number, boolean>>(
    Object.fromEntries(nodes.map((n, i) => [i, n.connected]))
  );
  const [search, setSearch] = useState("");

  const filtered = nodes.filter((n) => {
    const matchType = filter === "all" || n.type === filter;
    const matchSearch =
      !search ||
      n.name.toLowerCase().includes(search.toLowerCase()) ||
      n.role.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border">
        <h1 className="text-xl font-bold mb-1 text-balance">
          <span className="text-gradient-amber">Connect</span>
        </h1>
        <p className="text-xs text-muted-foreground mb-4">Find your network of humans, AI, and agents</p>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted border border-border">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-none">
        {filterTabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
              filter === id
                ? "bg-primary/20 text-primary glow-amber border border-primary/30"
                : "bg-muted text-muted-foreground border border-transparent"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Node cards */}
      <div className="px-5 space-y-3 pb-4">
        {filtered.map((node, i) => {
          const idx = nodes.indexOf(node);
          return (
            <div key={i} className="rounded-2xl bg-card border border-border p-4">
              <div className="flex items-start gap-3">
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${node.color} text-primary-foreground font-bold text-base shrink-0`}>
                  {node.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground truncate">{node.name}</span>
                    <span className={`text-[10px] font-bold ${node.textColor}`}>{node.affinity}% match</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{node.role}</p>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    {node.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                {/* Affinity bar */}
                <div className="flex-1 mr-3">
                  <div className="h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        node.type === "human" ? "bg-primary" : node.type === "ai" ? "bg-accent" : "bg-[oklch(0.65_0.16_280)]"
                      }`}
                      style={{ width: `${node.affinity}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setConnected((p) => ({ ...p, [idx]: !p[idx] }))}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    connected[idx]
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "bg-muted text-muted-foreground border border-border active:scale-95"
                  }`}
                >
                  {connected[idx] ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" /> Connected
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" /> Connect
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Target, Plus, CheckCircle, Circle, Flame, TrendingUp, Calendar } from "lucide-react";

type GoalStatus = "active" | "completed" | "paused";

interface Goal {
  id: number;
  title: string;
  category: string;
  progress: number;
  streak: number;
  color: string;
  textColor: string;
  status: GoalStatus;
  tasks: { label: string; done: boolean }[];
}

const initialGoals: Goal[] = [
  {
    id: 1,
    title: "Daily Mindfulness",
    category: "Mental Health",
    progress: 80,
    streak: 12,
    color: "bg-primary/10 border-primary/25",
    textColor: "text-primary",
    status: "active",
    tasks: [
      { label: "10 min morning meditation", done: true },
      { label: "Evening reflection journal", done: true },
      { label: "Gratitude practice", done: false },
    ],
  },
  {
    id: 2,
    title: "Expand AI Knowledge",
    category: "Intelligence",
    progress: 55,
    streak: 7,
    color: "bg-accent/10 border-accent/25",
    textColor: "text-accent",
    status: "active",
    tasks: [
      { label: "Read 1 AGI research paper", done: true },
      { label: "Practice prompt engineering", done: false },
      { label: "Share insight to network", done: false },
    ],
  },
  {
    id: 3,
    title: "Improve Sleep Quality",
    category: "Health",
    progress: 90,
    streak: 21,
    color: "bg-[oklch(0.65_0.16_280)]/10 border-[oklch(0.65_0.16_280)]/25",
    textColor: "text-[oklch(0.65_0.16_280)]",
    status: "active",
    tasks: [
      { label: "Sleep by 10:30 PM", done: true },
      { label: "No screens 1hr before bed", done: true },
      { label: "Morning sunlight exposure", done: true },
    ],
  },
  {
    id: 4,
    title: "Strengthen Relationships",
    category: "Connection",
    progress: 40,
    streak: 3,
    color: "bg-primary/10 border-primary/25",
    textColor: "text-primary",
    status: "paused",
    tasks: [
      { label: "Reach out to one person", done: true },
      { label: "Active listening practice", done: false },
      { label: "Express appreciation", done: false },
    ],
  },
];

const habits = [
  { label: "Mon", done: true },
  { label: "Tue", done: true },
  { label: "Wed", done: true },
  { label: "Thu", done: true },
  { label: "Fri", done: false },
  { label: "Sat", done: false },
  { label: "Sun", done: false },
];

export function GoalsScreen() {
  const [goals, setGoals] = useState(initialGoals);
  const [expanded, setExpanded] = useState<number | null>(1);

  const toggleTask = (goalId: number, taskIdx: number) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? {
              ...g,
              tasks: g.tasks.map((t, i) =>
                i === taskIdx ? { ...t, done: !t.done } : t
              ),
            }
          : g
      )
    );
  };

  const activeGoals = goals.filter((g) => g.status === "active");
  const totalProgress = Math.round(
    activeGoals.reduce((s, g) => s + g.progress, 0) / activeGoals.length
  );

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Header */}
      <div className="px-5 pt-14 pb-5 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <Target className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold text-gradient-amber">Goals</h1>
        </div>
        <p className="text-xs text-muted-foreground">Life improvement, without pressure or burnout</p>
      </div>

      {/* Weekly overview */}
      <section className="px-5 py-5">
        <div className="rounded-2xl bg-gradient-to-br from-primary/15 to-background border border-primary/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Overall Progress</p>
              <p className="text-3xl font-bold text-gradient-amber">{totalProgress}%</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 text-primary">
                <Flame className="w-4 h-4 fill-primary" />
                <span className="text-sm font-bold">12 day streak</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-xs">+18% this week</span>
              </div>
            </div>
          </div>
          {/* Weekly habit dots */}
          <div className="flex gap-1.5 mt-2">
            {habits.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    h.done ? "bg-primary glow-amber" : "bg-muted"
                  }`}
                >
                  {h.done ? (
                    <CheckCircle className="w-3.5 h-3.5 text-primary-foreground" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-border block" />
                  )}
                </div>
                <span className="text-[9px] text-muted-foreground">{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goal cards */}
      <section className="px-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Active Goals</h2>
          <button className="flex items-center gap-1 text-xs text-primary font-medium">
            <Plus className="w-3.5 h-3.5" /> Add Goal
          </button>
        </div>

        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`rounded-2xl border ${goal.color} overflow-hidden transition-all duration-300`}
          >
            <button
              className="w-full p-4 text-left"
              onClick={() => setExpanded(expanded === goal.id ? null : goal.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-foreground truncate">{goal.title}</h3>
                    {goal.status === "paused" && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">
                        Paused
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] ${goal.textColor}`}>{goal.category}</span>
                    <div className="flex items-center gap-0.5">
                      <Flame className={`w-3 h-3 ${goal.textColor}`} />
                      <span className={`text-[10px] ${goal.textColor}`}>{goal.streak}d</span>
                    </div>
                  </div>
                </div>
                <span className={`text-lg font-bold ${goal.textColor} ml-3`}>{goal.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    goal.textColor === "text-primary"
                      ? "bg-primary"
                      : goal.textColor === "text-accent"
                      ? "bg-accent"
                      : "bg-[oklch(0.65_0.16_280)]"
                  }`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </button>

            {/* Expanded tasks */}
            {expanded === goal.id && (
              <div className="px-4 pb-4 space-y-2 border-t border-border/50 pt-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> Today&apos;s Tasks
                </p>
                {goal.tasks.map((task, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleTask(goal.id, idx)}
                    className="flex items-center gap-2.5 w-full text-left"
                  >
                    {task.done ? (
                      <CheckCircle className={`w-4 h-4 ${goal.textColor} shrink-0`} />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                    <span
                      className={`text-xs leading-relaxed ${
                        task.done ? "text-muted-foreground line-through" : "text-foreground"
                      }`}
                    >
                      {task.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

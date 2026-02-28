"use client";

import { Home, Users, Lightbulb, BookOpen, User } from "lucide-react";

type Screen = "home" | "connect" | "solutions" | "blog" | "profile";

interface BottomNavProps {
  active: Screen;
  onChange: (screen: Screen) => void;
}

const navItems: { id: Screen; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "home",      label: "Home",    icon: Home },
  { id: "connect",   label: "Connect", icon: Users },
  { id: "solutions", label: "Solve",   icon: Lightbulb },
  { id: "blog",      label: "Blog",    icon: BookOpen },
  { id: "profile",   label: "Profile", icon: User },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 border-t border-border bg-card/90 backdrop-blur-xl">
      {navItems.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200"
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
          >
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary/20 text-primary glow-amber"
                  : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
            </span>
            <span
              className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

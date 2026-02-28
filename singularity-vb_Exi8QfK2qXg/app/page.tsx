"use client";

import { useState } from "react";
import { PiAuthProvider, usePiAuth } from "@/contexts/pi-auth-context";
import { AuthLoadingScreen } from "@/components/auth-loading-screen";
import { BottomNav } from "@/components/singularity/bottom-nav";
import { HomeScreen } from "@/components/singularity/home-screen";
import { ConnectScreen } from "@/components/singularity/connect-screen";
import { IntelligenceScreen } from "@/components/singularity/intelligence-screen";
import { GoalsScreen } from "@/components/singularity/goals-screen";
import { ProfileScreen } from "@/components/singularity/profile-screen";
import { InnovativeSolutionsScreen } from "@/components/singularity/innovative-solutions-screen";
import { SocialBlogScreen } from "@/components/singularity/social-blog-screen";

type Screen = "home" | "connect" | "solutions" | "blog" | "profile";

// Inner app — only rendered after Pioneer is authenticated
function SingularityInner() {
  const { isAuthenticated } = usePiAuth();
  const [screen, setScreen] = useState<Screen>("home");

  if (!isAuthenticated) {
    return <AuthLoadingScreen />;
  }

  return (
    <div className="relative min-h-screen max-w-md mx-auto bg-background overflow-hidden">
      <main className="h-screen overflow-y-auto overscroll-contain">
        {screen === "home" && <HomeScreen />}
        {screen === "connect" && <ConnectScreen />}
        {screen === "solutions" && <InnovativeSolutionsScreen />}
        {screen === "blog" && <SocialBlogScreen />}
        {screen === "profile" && <ProfileScreen />}
      </main>
      <BottomNav active={screen} onChange={setScreen} />
    </div>
  );
}

export default function SingularityApp() {
  return (
    <PiAuthProvider>
      <SingularityInner />
    </PiAuthProvider>
  );
}

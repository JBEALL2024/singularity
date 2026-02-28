import type React from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Made with App Studio",
  description:
    "SINGULARITY — Where People, AI, Assistants & Agents Meet, Grow, and Expand Abilities to Improve Relationships and Quality of Life for People & Earth.",
  keywords: ["AI", "AGI", "ASI", "singularity", "human", "growth", "intelligence", "wellbeing"],
    generator: 'v0.app'
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{
      fontFamily: GeistSans.style.fontFamily,
    }}>
      <head>
        <style>{`
          html {
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {/* Pi Network SDK — required for Pioneer authentication */}
        <Script
          src="https://sdk.minepi.com/pi-sdk.js"
          strategy="beforeInteractive"
        />
        {/* Pi Ad Network SDK — serves ads to Pioneers */}
        <Script
          src="https://ads.pi.ad/sdk/pi-ads.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}

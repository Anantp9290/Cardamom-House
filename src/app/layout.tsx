import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/SplashScreen";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cardamom House · Slow brunch in Lisbon",
  description:
    "The menu, opening hours and today’s special at Cardamom House, a brunch café on Rua da Boavista in Lisbon.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef1e6" },
    { media: "(prefers-color-scheme: dark)", color: "#121a15" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${instrument.variable} font-sans antialiased`}>
        <Script id="splash-init" strategy="beforeInteractive">
          {`(function () {
            var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            document.documentElement.dataset.splash = reduceMotion ? "done" : "playing";
          })();`}
        </Script>
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50"
        >
          Skip to content
        </a>
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}

import type { CSSProperties } from "react";
import { statusLabel, type OpenStatus } from "@/lib/hours";
import { mapsHref, telHref } from "@/lib/format";
import { PodOrnament } from "./PodOrnament";

interface HeroProps {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  status: OpenStatus;
}

const step = (index: number): CSSProperties => ({ "--i": index }) as CSSProperties;

const primaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 font-semibold text-on-brand transition-colors hover:bg-brand-hover";
const secondaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-ink/25 px-6 font-semibold text-ink transition-colors hover:border-brand hover:bg-brand/10 hover:text-brand-text";

export function Hero({ name, tagline, address, phone, status }: HeroProps) {
  const isOpen = status.kind === "open";
  const [firstWord, ...rest] = name.split(" ");

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-6 -z-10 flex items-start gap-1 text-brand/35 sm:right-2 lg:right-16 lg:top-12 lg:text-brand/55 print:hidden"
      >
        <PodOrnament className="mt-14 w-16 -rotate-[14deg] sm:w-28 lg:w-44" />
        <PodOrnament className="w-20 rotate-[8deg] sm:w-36 lg:w-56" />
        <PodOrnament className="mt-24 w-14 rotate-[22deg] sm:w-24 lg:w-40" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-14 pt-12 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-28">
        <p
          style={step(0)}
          className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-[0.95rem] font-medium"
        >
          <span
            aria-hidden="true"
            className={`size-2.5 rounded-full ${isOpen ? "live-dot bg-open" : "bg-ink-soft"}`}
          />
          {statusLabel(status)}
        </p>

        <h1
          id="hero-title"
          style={step(1)}
          className="rise font-display font-soft mt-7 text-[clamp(3.6rem,17vw,10.5rem)] font-medium leading-[0.9] tracking-[-0.03em]"
        >
          <span className="block">{firstWord}</span>
          <span className="block">{rest.join(" ")}</span>
        </h1>

        <p
          style={step(2)}
          className="rise mt-7 max-w-[26ch] font-display text-2xl leading-snug text-ink-soft sm:text-3xl"
        >
          {tagline}
        </p>

        <div style={step(3)} className="rise mt-9 flex flex-wrap gap-3 print:hidden">
          <a href="#menu" className={primaryButton}>
            See the menu
          </a>
          <a href={telHref(phone)} className={secondaryButton}>
            Call us
          </a>
          <a
            href={mapsHref(address)}
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryButton}
          >
            Get directions
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

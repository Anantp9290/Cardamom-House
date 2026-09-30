import { getLisbonClock, type Clock } from "./hours";

export type PageState = "open" | "closed" | "special-sold-out" | "live";

export const PAGE_STATES: ReadonlyArray<{ value: PageState; label: string; href: string }> = [
  { value: "open", label: "Open", href: "/?state=open" },
  { value: "closed", label: "Closed", href: "/?state=closed" },
  { value: "special-sold-out", label: "Special sold out", href: "/?state=special-sold-out" },
  { value: "live", label: "Live Lisbon time", href: "/?state=live" },
];

export interface Scenario {
  state: PageState;
  clock: Clock;
  specialSoldOut: boolean;
}

export function parseState(value: string | string[] | undefined): PageState {
  const raw = Array.isArray(value) ? value[0] : value;
  const match = PAGE_STATES.find((entry) => entry.value === raw);
  return match ? match.value : "open";
}

const TUESDAY_LUNCH: Clock = { day: "tuesday", minutes: 11 * 60 + 30 };
const MONDAY_LUNCH: Clock = { day: "monday", minutes: 11 * 60 + 30 };

/**
 * The three states from the brief are pinned to a fixed moment so reviewers
 * always see the same thing. `live` uses the real time in Lisbon.
 */
export function resolveScenario(state: PageState): Scenario {
  switch (state) {
    case "closed":
      return { state, clock: MONDAY_LUNCH, specialSoldOut: false };
    case "special-sold-out":
      return { state, clock: TUESDAY_LUNCH, specialSoldOut: true };
    case "live":
      return { state, clock: getLisbonClock(), specialSoldOut: false };
    case "open":
      return { state, clock: TUESDAY_LUNCH, specialSoldOut: false };
  }
}

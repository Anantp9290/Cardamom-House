import type { Day } from "./types";

export const DAYS: readonly Day[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function isDay(value: string): value is Day {
  return (DAYS as readonly string[]).includes(value);
}

export function formatDay(day: Day): string {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

export interface Clock {
  day: Day;
  /** Minutes since midnight, café-local time. */
  minutes: number;
}

export interface TimeRange {
  open: number;
  close: number;
  openLabel: string;
  closeLabel: string;
}

const RANGE = /(\d{1,2}):(\d{2})\s*[–—-]\s*(\d{1,2}):(\d{2})/;

/** Parses "08:00 – 15:00". Returns null for "Closed" or anything unparseable. */
export function parseRange(text: string): TimeRange | null {
  const match = RANGE.exec(text);
  if (!match) return null;
  const [, oh, om, ch, cm] = match;
  return {
    open: Number(oh) * 60 + Number(om),
    close: Number(ch) * 60 + Number(cm),
    openLabel: `${oh.padStart(2, "0")}:${om}`,
    closeLabel: `${ch.padStart(2, "0")}:${cm}`,
  };
}

/** Current weekday + time in Lisbon, regardless of the server's timezone. */
export function getLisbonClock(date: Date = new Date()): Clock {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Lisbon",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekday = read("weekday").toLowerCase();
  return {
    day: isDay(weekday) ? weekday : "monday",
    minutes: Number(read("hour")) * 60 + Number(read("minute")),
  };
}

export interface NextOpening {
  day: Day;
  time: string;
  /** 0 = later today, 1 = tomorrow, and so on. */
  daysAhead: number;
}

export type OpenStatus =
  | { kind: "open"; closesAt: string }
  | { kind: "closed"; closedAllDay: boolean; next: NextOpening | null };

export function getOpenStatus(hours: Record<Day, string>, now: Clock): OpenStatus {
  const today = parseRange(hours[now.day]);

  if (today && now.minutes >= today.open && now.minutes < today.close) {
    return { kind: "open", closesAt: today.closeLabel };
  }

  const start = DAYS.indexOf(now.day);
  for (let daysAhead = 0; daysAhead <= 7; daysAhead += 1) {
    const day = DAYS[(start + daysAhead) % 7];
    const range = parseRange(hours[day]);
    if (!range) continue;
    // Today's opening has already passed (we're after close), so look at tomorrow onwards.
    if (daysAhead === 0 && now.minutes >= range.open) continue;
    return {
      kind: "closed",
      closedAllDay: today === null,
      next: { day, time: range.openLabel, daysAhead },
    };
  }

  return { kind: "closed", closedAllDay: today === null, next: null };
}

export function describeNext(next: NextOpening): string {
  if (next.daysAhead === 0) return `today at ${next.time}`;
  return `${formatDay(next.day)} at ${next.time}`;
}

export function statusLabel(status: OpenStatus): string {
  if (status.kind === "open") return `Open now, until ${status.closesAt}`;
  if (!status.next) return "Closed";
  return `${status.closedAllDay ? "Closed today" : "Closed now"}, opens ${describeNext(status.next)}`;
}

import { describeNext, type NextOpening } from "@/lib/hours";

interface ClosedBannerProps {
  closedAllDay: boolean;
  next: NextOpening | null;
}

/** Sits above everything else, so a closed café is the first thing a visitor learns. */
export function ClosedBanner({ closedAllDay, next }: ClosedBannerProps) {
  return (
    <div role="status" className="bg-brand text-on-brand print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-4">
        <p className="font-display font-soft text-xl font-medium">
          {closedAllDay ? "We’re closed today." : "We’re closed right now."}
        </p>
        <p className="text-[0.95rem]">
          {next ? `See you ${describeNext(next)}. ` : ""}
          The full menu is below if you’re planning your visit.
        </p>
      </div>
    </div>
  );
}

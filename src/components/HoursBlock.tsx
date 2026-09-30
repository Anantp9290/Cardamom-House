import { DAYS, formatDay, parseRange } from "@/lib/hours";
import type { Day } from "@/lib/types";

interface HoursBlockProps {
  hours: Record<Day, string>;
  today: Day;
}

export function HoursBlock({ hours, today }: HoursBlockProps) {
  return (
    <section
      id="hours"
      aria-labelledby="hours-heading"
      className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16 print:mt-6"
    >
      <div>
        <h2
          id="hours-heading"
          className="font-display font-soft text-4xl font-medium tracking-tight sm:text-5xl"
        >
          Opening hours
        </h2>
        <div aria-hidden="true" className="mt-3 h-1 w-14 rounded-full bg-brand" />
      </div>

      <table className="mt-6 w-full max-w-xl border-collapse text-lg lg:mt-0">
        <caption className="sr-only">Weekly opening hours</caption>
        <tbody>
          {DAYS.map((day) => {
            const isToday = day === today;
            const isClosed = parseRange(hours[day]) === null;
            return (
              <tr
                key={day}
                aria-current={isToday ? "date" : undefined}
                className={`border-b border-line ${isToday ? "bg-brand/10" : ""} ${
                  isClosed && !isToday ? "text-ink-soft" : ""
                }`}
              >
                <th
                  scope="row"
                  className={`py-3.5 pl-4 pr-4 text-left ${
                    isToday
                      ? "font-semibold shadow-[inset_4px_0_0_0_var(--brand)]"
                      : "font-medium"
                  }`}
                >
                  {formatDay(day)}
                  {isToday && (
                    <span className="ml-3 rounded-full bg-brand px-2.5 py-0.5 align-middle text-[0.8rem] font-semibold text-on-brand">
                      Today
                    </span>
                  )}
                </th>
                <td
                  className={`py-3.5 pr-4 text-right tabular-nums ${isToday ? "font-semibold" : ""}`}
                >
                  {isClosed ? (
                    <span className="rounded-full border border-dashed border-ink-soft/60 px-3 py-0.5 text-base">
                      {hours[day]}
                    </span>
                  ) : (
                    hours[day]
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

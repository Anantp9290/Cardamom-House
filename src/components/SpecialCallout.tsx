import { formatPrice } from "@/lib/format";
import { PodOrnament } from "./PodOrnament";

interface SpecialCalloutProps {
  blurb: string;
  itemId: string;
  itemName: string;
  price: number;
  soldOut: boolean;
}

export function SpecialCallout({ blurb, itemId, itemName, price, soldOut }: SpecialCalloutProps) {
  if (soldOut) {
    return (
      <section aria-labelledby="special-title" className="mx-auto max-w-6xl px-5">
        <div className="rounded-[1.75rem] border-2 border-dashed border-brand bg-surface p-6 sm:p-9">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="special-title" className="font-display font-soft text-3xl font-medium sm:text-4xl">
              Today’s special has sold out
            </h2>
            <span className="rounded-full bg-ink px-3 py-1 text-sm font-semibold text-paper">
              Sold out
            </span>
          </div>
          <p className="mt-3 max-w-[48ch] text-lg text-ink-soft">
            The {itemName} went fast. Everything else on the menu is ready to order.
          </p>
          <a
            href="#brunch"
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-brand px-6 font-semibold text-on-brand transition-colors hover:bg-brand-hover"
          >
            See the rest of brunch
          </a>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="special-title" className="mx-auto max-w-6xl px-5">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-brand p-6 text-on-brand sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2.5 rounded-[1.3rem] border border-dashed border-white/40"
        />
        <PodOrnament className="absolute -bottom-12 -right-4 w-32 rotate-[24deg] text-white/20 sm:w-44" />

        <div className="relative px-1 sm:px-2">
          <h2 id="special-title" className="font-display font-soft text-3xl font-medium sm:text-4xl">
            Today’s special
          </h2>
          <p className="mt-3 max-w-[34ch] font-display text-2xl leading-snug sm:text-3xl">{blurb}</p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={`#${itemId}`}
              className="inline-flex min-h-12 items-center rounded-full bg-white px-6 font-semibold text-[#8f3f07] transition-colors hover:bg-[#fff1dc] focus-visible:outline-white"
            >
              Find it on the menu
            </a>
            <p className="font-display text-2xl font-medium">{formatPrice(price)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

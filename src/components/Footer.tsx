import Link from "next/link";
import { instagramHref, mapsHref, telHref } from "@/lib/format";
import { PAGE_STATES, type PageState } from "@/lib/scenario";
import type { Restaurant } from "@/lib/types";

interface FooterProps {
  restaurant: Restaurant;
  state: PageState;
}

const link =
  "font-medium text-[#f2a54a] underline decoration-[#f2a54a]/40 underline-offset-4 transition-colors hover:decoration-[#f2a54a] focus-visible:outline-[#f2a54a]";

export function Footer({ restaurant, state }: FooterProps) {
  return (
    <footer className="mt-24 bg-[#16231b] text-[#edf0e4] print:mt-6 print:bg-white print:text-black">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="font-display font-soft text-2xl font-medium">{restaurant.name}</p>
          <p className="mt-2 max-w-[24ch] text-[#b9c4b6]">{restaurant.tagline}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <address className="not-italic">
            <h2 className="font-display text-lg font-medium">Find us</h2>
            <p className="mt-2 text-[#b9c4b6]">{restaurant.address}</p>
            <a
              href={mapsHref(restaurant.address)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link} mt-2 inline-block py-2`}
            >
              Open in Maps
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </address>

          <div>
            <h2 className="font-display text-lg font-medium">Call</h2>
            <a href={telHref(restaurant.phone)} className={`${link} mt-2 inline-block py-2`}>
              {restaurant.phone}
            </a>
          </div>

          <div>
            <h2 className="font-display text-lg font-medium">Instagram</h2>
            <a
              href={instagramHref(restaurant.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link} mt-2 inline-block py-2`}
            >
              {restaurant.instagram}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 print:hidden">
        <nav
          aria-label="Preview page state"
          className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-1 px-5 py-5 text-sm text-[#b9c4b6]"
        >
          <span className="mr-2">Preview state:</span>
          {PAGE_STATES.map((entry) => (
            <Link
              key={entry.value}
              href={entry.href}
              aria-current={entry.value === state ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full px-4 transition-colors focus-visible:outline-[#f2a54a] ${
                entry.value === state
                  ? "bg-[#f2a54a] font-semibold text-[#16231b]"
                  : "hover:bg-white/10 hover:text-white"
              }`}
            >
              {entry.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

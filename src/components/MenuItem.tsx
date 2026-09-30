import { formatPrice } from "@/lib/format";
import type { MenuItemData } from "@/lib/types";
import { TagBadge } from "./TagBadge";

interface MenuItemProps {
  item: MenuItemData;
  isSpecial: boolean;
  soldOut: boolean;
}

export function MenuItem({ item, isSpecial, soldOut }: MenuItemProps) {
  const dim = soldOut ? "opacity-70" : "";

  return (
    <li
      id={item.id}
      className={`relative scroll-mt-28 border-b border-line py-4 last:border-b-0 print:break-inside-avoid print:py-1.5 ${
        isSpecial
          ? "before:absolute before:-left-3.5 before:bottom-4 before:top-4 before:w-1 before:rounded-full before:bg-brand"
          : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <h3 className={`font-display font-soft text-xl font-medium leading-snug ${dim}`}>
            {item.name}
          </h3>
          {isSpecial && (
            <span className="rounded-full bg-brand px-2.5 py-0.5 text-[0.8rem] font-semibold leading-5 text-on-brand">
              Today’s special
            </span>
          )}
          {soldOut && (
            <span className="rounded-full bg-ink px-2.5 py-0.5 text-[0.8rem] font-semibold leading-5 text-paper">
              Sold out
            </span>
          )}
        </div>
        <span
          aria-hidden="true"
          className="min-w-4 flex-1  border-b border-dotted border-ink-soft/40"
        />
        <p
          className={`shrink-0 font-semibold tabular-nums ${dim} ${soldOut ? "line-through" : ""}`}
        >
          {formatPrice(item.price)}
        </p>
      </div>

      {item.description && (
        <p className={`mt-1 max-w-[52ch] text-ink-soft ${dim}`}>{item.description}</p>
      )}

      {item.tags.length > 0 && (
        <ul role="list" aria-label="Dietary information" className={`mt-2.5 flex flex-wrap gap-1.5 ${dim}`}>
          {item.tags.map((tag) => (
            <li key={tag}>
              <TagBadge tag={tag} />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

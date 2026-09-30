import type { Category } from "@/lib/types";
import { MenuItem } from "./MenuItem";

interface MenuSectionProps {
  category: Category;
  specialItemId: string;
  specialAvailable: boolean;
  specialSoldOut: boolean;
}

export function MenuSection({
  category,
  specialItemId,
  specialAvailable,
  specialSoldOut,
}: MenuSectionProps) {
  const headingId = `${category.id}-heading`;

  return (
    <section
      id={category.id}
      aria-labelledby={headingId}
      className="scroll-mt-24 py-10 first:pt-8 sm:py-12 print:break-inside-avoid print:py-3"
    >
      <h2
        id={headingId}
        className="font-display font-soft text-4xl font-medium tracking-tight sm:text-5xl"
      >
        {category.name}
      </h2>
      <div aria-hidden="true" className="mt-3 h-1 w-14 rounded-full bg-brand" />
      {category.description && (
        <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">{category.description}</p>
      )}

      {category.items.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line px-5 py-4 text-ink-soft">
          Nothing here matches that filter. Try “Everything” to see the full list.
        </p>
      ) : (
        <ul role="list" className="mt-4">
          {category.items.map((item) => {
            const isSpecialItem = item.id === specialItemId;
            return (
              <MenuItem
                key={item.id}
                item={item}
                soldOut={isSpecialItem && specialSoldOut}
                isSpecial={isSpecialItem && specialAvailable && !specialSoldOut}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
}

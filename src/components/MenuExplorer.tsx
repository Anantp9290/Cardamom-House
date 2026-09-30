"use client";

import { useMemo, useState } from "react";
import type { Category } from "@/lib/types";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { CategoryNav } from "./CategoryNav";
import { DietFilter, type DietFilterValue } from "./DietFilter";
import { MenuSection } from "./MenuSection";

interface MenuExplorerProps {
  categories: Category[];
  specialItemId: string;
  /** The café is open, so the special can be promoted. */
  specialAvailable: boolean;
  specialSoldOut: boolean;
}

/** The only stateful part of the page: scroll-spy nav plus the dietary filter. */
export function MenuExplorer({
  categories,
  specialItemId,
  specialAvailable,
  specialSoldOut,
}: MenuExplorerProps) {
  const [diet, setDiet] = useState<DietFilterValue>("all");

  const ids = useMemo(() => categories.map((category) => category.id), [categories]);
  const [activeId, setActiveId] = useScrollSpy(ids);

  const visible = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        items:
          diet === "all"
            ? category.items
            : category.items.filter((item) => item.tags.includes(diet)),
      })),
    [categories, diet],
  );
  const total = visible.reduce((sum, category) => sum + category.items.length, 0);

  return (
    <div
      id="menu"
      className="mx-auto mt-14 max-w-6xl px-5 sm:mt-20 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16 print:mt-4 print:block"
    >
      <CategoryNav categories={categories} activeId={activeId} onSelect={setActiveId} />

      <div>
        <DietFilter value={diet} onChange={setDiet} />
        <p className="sr-only" role="status">
          Showing {total} {total === 1 ? "item" : "items"}
        </p>

        <div className="print:columns-2 print:gap-10">
          {visible.map((category) => (
            <MenuSection
              key={category.id}
              category={category}
              specialItemId={specialItemId}
              specialAvailable={specialAvailable}
              specialSoldOut={specialSoldOut}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

export interface NavCategory {
  id: string;
  name: string;
}

interface CategoryNavProps {
  categories: readonly NavCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

const linkBase =
  "inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-4 text-[0.95rem] font-medium text-ink-soft transition-colors hover:bg-brand/10 hover:text-brand-text lg:rounded-none lg:border-l-[3px] lg:border-transparent lg:pl-4 lg:text-base";
const linkActive =
  "bg-brand text-on-brand! hover:bg-brand lg:bg-transparent lg:text-ink! lg:border-brand lg:font-semibold lg:hover:bg-transparent";

/**
 * One element, two layouts: a sticky, horizontally scrolling pill bar on
 * phones, and a sticky side rail from `lg` up.
 */
export function CategoryNav({ categories, activeId, onSelect }: CategoryNavProps) {
  const listRef = useRef<HTMLUListElement>(null);

  // Keep the active pill visible in the scrolling bar on small screens.
  useEffect(() => {
    const list = listRef.current;
    const link = document.getElementById(`nav-${activeId}`);
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({
      left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeId]);

  return (
    <nav
      aria-label="Menu sections"
      className="sticky top-0 z-30 -mx-5 border-b border-line bg-paper/90 px-5 backdrop-blur lg:top-10 lg:mx-0 lg:self-start lg:border-b-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none print:hidden"
    >
      <ul
        ref={listRef}
        role="list"
        className="no-scrollbar relative flex gap-2 overflow-x-auto py-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:py-0"
      >
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <li key={category.id} className="shrink-0">
              <a
                id={`nav-${category.id}`}
                href={`#${category.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => onSelect(category.id)}
                className={`${linkBase} ${isActive ? linkActive : ""}`}
              >
                {category.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

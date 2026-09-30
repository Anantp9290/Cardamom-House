"use client";

export type DietFilterValue = "all" | "V" | "GF";

interface DietFilterProps {
  value: DietFilterValue;
  onChange: (value: DietFilterValue) => void;
}

const OPTIONS: ReadonlyArray<{ value: DietFilterValue; label: string }> = [
  { value: "all", label: "Everything" },
  { value: "V", label: "Vegetarian" },
  { value: "GF", label: "Gluten-free" },
];

export function DietFilter({ value, onChange }: DietFilterProps) {
  return (
    <div role="group" aria-label="Filter the menu by diet" className="flex flex-wrap gap-2 py-6 print:hidden">
      {OPTIONS.map((option) => {
        const pressed = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(option.value)}
            className={`min-h-11 rounded-full border px-5 text-[0.95rem] font-medium transition-colors ${
              pressed
                ? "border-ink bg-ink text-paper"
                : "border-line bg-surface text-ink hover:border-brand hover:text-brand-text"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

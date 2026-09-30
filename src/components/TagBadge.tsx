import type { DietaryTag } from "@/lib/types";

interface TagMeta {
  short: string;
  long: string;
  className: string;
}

const TAGS: Record<DietaryTag, TagMeta> = {
  V: { short: "V", long: "Vegetarian", className: "bg-pod-tint text-pod" },
  GF: { short: "GF", long: "Gluten-free", className: "bg-brand/10 text-brand-text" },
  spicy: { short: "Spicy", long: "Spicy", className: "bg-heat-tint text-heat" },
};

export function TagBadge({ tag }: { tag: DietaryTag }) {
  const meta = TAGS[tag];
  return (
    <span
      title={meta.long}
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.8rem] font-semibold leading-5 ${meta.className}`}
    >
      <span aria-hidden="true">{meta.short}</span>
      <span className="sr-only">{meta.long}</span>
    </span>
  );
}

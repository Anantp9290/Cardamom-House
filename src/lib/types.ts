export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type DietaryTag = "V" | "GF" | "spicy";

export interface MenuItemData {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags: DietaryTag[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  items: MenuItemData[];
}

export interface Restaurant {
  name: string;
  tagline: string;
  address: string;
  hours: Record<Day, string>;
  brand_color: string;
  phone: string;
  instagram: string;
}

export interface TodaySpecial {
  item_id: string;
  blurb: string;
}

export interface MenuData {
  restaurant: Restaurant;
  today_special: TodaySpecial;
  categories: Category[];
}

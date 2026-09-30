import { ClosedBanner } from "@/components/ClosedBanner";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HoursBlock } from "@/components/HoursBlock";
import { MenuExplorer } from "@/components/MenuExplorer";
import { SpecialCallout } from "@/components/SpecialCallout";
import { findItem, menu } from "@/data/menu";
import { getOpenStatus } from "@/lib/hours";
import { parseState, resolveScenario } from "@/lib/scenario";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { state: rawState } = await searchParams;
  const scenario = resolveScenario(parseState(rawState));

  const { restaurant, today_special, categories } = menu;
  const status = getOpenStatus(restaurant.hours, scenario.clock);
  const isOpen = status.kind === "open";
  const special = findItem(today_special.item_id);

  return (
    <>
      {status.kind === "closed" && (
        <ClosedBanner closedAllDay={status.closedAllDay} next={status.next} />
      )}

      <main id="main">
        <Hero
          name={restaurant.name}
          tagline={restaurant.tagline}
          address={restaurant.address}
          phone={restaurant.phone}
          status={status}
        />

        {/* No special is promised while the café is closed. */}
        {isOpen && special && (
          <SpecialCallout
            blurb={today_special.blurb}
            itemId={special.item.id}
            itemName={special.item.name}
            price={special.item.price}
            soldOut={scenario.specialSoldOut}
          />
        )}

        <MenuExplorer
          categories={categories}
          specialItemId={today_special.item_id}
          specialAvailable={isOpen}
          specialSoldOut={scenario.specialSoldOut}
        />

        <HoursBlock hours={restaurant.hours} today={scenario.clock.day} />
      </main>

      <Footer restaurant={restaurant} state={scenario.state} />
    </>
  );
}

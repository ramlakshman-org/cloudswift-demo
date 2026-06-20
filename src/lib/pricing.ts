// Single source of truth for managed cloud plan pricing.
// TODO: $29.99/$39.99/$79.99 are placeholders carried over from the old
// WordPress site — swap these for real numbers from CloudSwift leadership
// before launch. Every page/component below derives from this file, so a
// price-only update happens in one place.

export interface PricingPlan {
  id: "silver" | "gold" | "platinum";
  name: string;
  price: number;
}

export const PRICING_PLANS: Record<PricingPlan["id"], PricingPlan> = {
  silver: { id: "silver", name: "Silver", price: 29.99 },
  gold: { id: "gold", name: "Gold", price: 39.99 },
  platinum: { id: "platinum", name: "Platinum", price: 79.99 },
};

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

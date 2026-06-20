import { describe, it, expect } from "vitest";
import * as content from "./site-content";

describe("site-content", () => {
  it("exports non-empty arrays for every list-based section", () => {
    expect(content.NAV_LEFT.length).toBeGreaterThan(0);
    expect(content.NAV_RIGHT.length).toBeGreaterThan(0);
    expect(content.CUSTOMER_LOGOS.length).toBeGreaterThan(0);
    expect(content.WHERE_CARDS.length).toBeGreaterThan(0);
    expect(content.INTEGRATION_LOGOS.length).toBeGreaterThan(0);
    expect(content.TESTIMONIALS.length).toBeGreaterThan(0);
    expect(content.FOOTER_COLUMNS.length).toBeGreaterThan(0);
  });

  it("exports the expected hero copy shape", () => {
    expect(content.HERO).toMatchObject({
      eyebrow: expect.any(String),
      cta: expect.any(String),
    });
    expect(Array.isArray(content.HERO.title)).toBe(true);
  });

  it("exports heading strings for sections that need them", () => {
    expect(typeof content.LOGOS_HEADING).toBe("string");
    expect(typeof content.WHERE_HEADING).toBe("string");
  });

  it("exports object-shaped content blocks with cta copy", () => {
    expect(content.MIGRATION).toHaveProperty("cta");
    expect(content.WHAT_WE_DO).toBeTruthy();
    expect(content.WHY_DIFFERENT).toHaveProperty("cta");
    expect(content.VM_BANNER).toHaveProperty("cta");
    expect(content.INTEGRATIONS).toBeTruthy();
    expect(content.MAIN_CTA).toHaveProperty("cta");
  });

  it("every footer column has links with label and href", () => {
    for (const col of content.FOOTER_COLUMNS) {
      expect(col.heading).toBeTruthy();
      for (const link of col.links) {
        expect(link.label).toBeTruthy();
        expect(link.href).toBeTruthy();
      }
    }
  });

  it("every testimonial has a quote and author", () => {
    for (const t of content.TESTIMONIALS) {
      expect(t.quote).toBeTruthy();
      expect(t.author).toBeTruthy();
    }
  });
});

import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("includes all 13 routes with absolute URLs under the production domain", () => {
    const result = sitemap();
    expect(result).toHaveLength(13);
    for (const entry of result) {
      expect(entry.url.startsWith("https://oncloudswift.com")).toBe(true);
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });

  it("gives the homepage the highest priority", () => {
    const result = sitemap();
    const home = result.find((e) => e.url === "https://oncloudswift.com/");
    expect(home?.priority).toBe(1.0);
  });

  it("does not include the removed /get-started route", () => {
    const result = sitemap();
    expect(result.some((e) => e.url.endsWith("/get-started"))).toBe(false);
  });
});

import { describe, it, expect } from "vitest";
import robots from "./robots";

describe("robots", () => {
  it("allows all crawlers and explicitly allowlists AI crawlers", () => {
    const result = robots();
    const agents = result.rules instanceof Array ? result.rules.map((r) => r.userAgent) : [];
    expect(agents).toContain("*");
    for (const bot of ["GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "Googlebot", "Bingbot", "cohere-ai"]) {
      expect(agents).toContain(bot);
    }
  });

  it("points to the production sitemap", () => {
    expect(robots().sitemap).toBe("https://oncloudswift.com/sitemap.xml");
  });
});

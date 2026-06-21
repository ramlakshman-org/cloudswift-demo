import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General crawlers
      { userAgent: "*", allow: "/", disallow: "/admin" },
      // AI training & retrieval crawlers — explicitly allowed
      // (each gets its own disallow too: a bot matching a specific group
      // ignores the "*" group entirely, per the robots.txt spec)
      { userAgent: "GPTBot", allow: "/", disallow: "/admin" },
      { userAgent: "ChatGPT-User", allow: "/", disallow: "/admin" },
      { userAgent: "ClaudeBot", allow: "/", disallow: "/admin" },
      { userAgent: "anthropic-ai", allow: "/", disallow: "/admin" },
      { userAgent: "PerplexityBot", allow: "/", disallow: "/admin" },
      { userAgent: "Google-Extended", allow: "/", disallow: "/admin" },
      { userAgent: "Googlebot", allow: "/", disallow: "/admin" },
      { userAgent: "Bingbot", allow: "/", disallow: "/admin" },
      { userAgent: "cohere-ai", allow: "/", disallow: "/admin" },
    ],
    sitemap: "https://oncloudswift.com/sitemap.xml",
  };
}

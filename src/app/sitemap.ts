import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/site-content";

const BASE = "https://oncloudswift.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyRoutes = CASE_STUDIES.map((c) => ({
    url: `/case-studies/${c.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/solutions/azure", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/solutions/dynamics-365", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/solutions/m365", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/solutions/power-bi", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/solutions/tenant-migration", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/solutions/oracle-cloud", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/services", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/managed-cloud", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/case-studies", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/assessment", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/security", priority: 0.5, changeFrequency: "yearly" as const },
    ...caseStudyRoutes,
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}

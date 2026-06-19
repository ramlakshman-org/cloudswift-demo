import type { Metadata } from "next";

const OG_IMAGE = {
  url: "https://oncloudswift.com/opengraph-image",
  width: 1200,
  height: 630,
  alt: "CloudSwift — Cloud Managed Services & Microsoft Solutions India",
};

/**
 * Builds the openGraph + twitter metadata block for a page, always
 * including the shared OG image — Next.js replaces (not merges) a
 * page's `openGraph`/`twitter` object wholesale over the layout's,
 * so the fallback image must be repeated on every page that sets one.
 */
export function pageSocial(
  title: string,
  description: string,
  path: string
): Pick<Metadata, "openGraph" | "twitter"> {
  const url = `https://oncloudswift.com${path}`;
  return {
    openGraph: { title, description, url, images: [OG_IMAGE] },
    twitter: { title, description, images: [OG_IMAGE.url], card: "summary_large_image" },
  };
}

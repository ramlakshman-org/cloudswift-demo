import { describe, it, expect } from "vitest";
import { pageSocial } from "./seo";

describe("pageSocial", () => {
  it("builds openGraph and twitter blocks with the given title/description/path", () => {
    const result = pageSocial("Title", "Description", "/about");

    expect(result.openGraph).toMatchObject({
      title: "Title",
      description: "Description",
      url: "https://oncloudswift.com/about",
    });
    expect(result.twitter).toMatchObject({
      title: "Title",
      description: "Description",
      card: "summary_large_image",
    });
  });

  it("always includes the shared OG image", () => {
    const result = pageSocial("T", "D", "/x");
    expect(result.openGraph?.images).toEqual([
      {
        url: "https://oncloudswift.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CloudSwift — Cloud Managed Services & Microsoft Solutions India",
      },
    ]);
    expect(result.twitter?.images).toEqual([
      "https://oncloudswift.com/opengraph-image",
    ]);
  });

  it("builds the correct absolute url for the root path", () => {
    const result = pageSocial("T", "D", "/");
    expect(result.openGraph?.url).toBe("https://oncloudswift.com/");
  });
});

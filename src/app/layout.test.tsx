import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import RootLayout, { metadata } from "./layout";

describe("RootLayout", () => {
  it("renders children inside the body and sets the lang attribute", () => {
    render(
      <RootLayout>
        <p data-testid="child">Child content</p>
      </RootLayout>
    );
    expect(document.querySelector('[data-testid="child"]')).toBeInTheDocument();
    expect(document.querySelector("html")).toHaveAttribute("lang", "en");
  });

  it("injects the Organization/LocalBusiness/WebSite JSON-LD schema", () => {
    render(
      <RootLayout>
        <p>Child</p>
      </RootLayout>
    );
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    const schema = JSON.parse(script!.innerHTML);
    const types = schema["@graph"].map((g: { "@type": string }) => g["@type"]);
    expect(types).toEqual(["Organization", "LocalBusiness", "WebSite"]);
  });
});

describe("metadata", () => {
  it("sets the correct title, description, and canonical base URL", () => {
    expect(metadata.title).toBe("Cloud Managed Services & Microsoft Solutions India | CloudSwift");
    expect(metadata.metadataBase?.toString()).toBe("https://oncloudswift.com/");
  });

  it("configures robots to allow indexing and following", () => {
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });
});

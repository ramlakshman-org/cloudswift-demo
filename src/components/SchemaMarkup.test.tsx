import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BreadcrumbSchema, ServiceSchema, FaqSchema } from "./SchemaMarkup";

function getSchema(container: HTMLElement) {
  const script = container.querySelector('script[type="application/ld+json"]');
  return JSON.parse(script!.innerHTML);
}

describe("BreadcrumbSchema", () => {
  it("builds a BreadcrumbList with absolute URLs and 1-based positions", () => {
    const { container } = render(
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
    );
    const schema = getSchema(container);
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://oncloudswift.com/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://oncloudswift.com/about" },
    ]);
  });
});

describe("ServiceSchema", () => {
  it("builds a Service schema without offers when none are given", () => {
    const { container } = render(
      <ServiceSchema name="Managed Cloud" description="Desc" url="/managed-cloud" />
    );
    const schema = getSchema(container);
    expect(schema["@type"]).toBe("Service");
    expect(schema.name).toBe("Managed Cloud");
    expect(schema.url).toBe("https://oncloudswift.com/managed-cloud");
    expect(schema.provider).toEqual({ "@type": "Organization", name: "CloudSwift", url: "https://oncloudswift.com" });
    expect(schema.offers).toBeUndefined();
  });

  it("omits offers when given an empty array", () => {
    const { container } = render(
      <ServiceSchema name="N" description="D" url="/u" offers={[]} />
    );
    expect(getSchema(container).offers).toBeUndefined();
  });

  it("includes offers with a default USD currency when not specified", () => {
    const { container } = render(
      <ServiceSchema name="N" description="D" url="/u" offers={[{ name: "Free Plan", price: "0" }]} />
    );
    const schema = getSchema(container);
    expect(schema.offers).toEqual([
      { "@type": "Offer", name: "Free Plan", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
    ]);
  });

  it("uses an explicit priceCurrency when given", () => {
    const { container } = render(
      <ServiceSchema name="N" description="D" url="/u" offers={[{ name: "Plan", price: "10", priceCurrency: "INR" }]} />
    );
    const schema = getSchema(container);
    expect(schema.offers[0].priceCurrency).toBe("INR");
  });
});

describe("FaqSchema", () => {
  it("builds an FAQPage schema from q/a items", () => {
    const { container } = render(
      <FaqSchema items={[{ q: "Question?", a: "Answer." }]} />
    );
    const schema = getSchema(container);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toEqual([
      { "@type": "Question", name: "Question?", acceptedAnswer: { "@type": "Answer", text: "Answer." } },
    ]);
  });
});

import { describe, it, expect } from "vitest";
import OgImage, { alt, size, contentType } from "./opengraph-image";

describe("opengraph-image metadata", () => {
  it("exports the expected alt text, size, and content type", () => {
    expect(alt).toBe("CloudSwift — Cloud Managed Services & Microsoft Solutions India");
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
  });
});

describe("OgImage", () => {
  it("returns a Response-like object without throwing", () => {
    const result = OgImage();
    expect(result).toBeInstanceOf(Response);
  });
});

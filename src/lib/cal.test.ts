import { describe, it, expect } from "vitest";
import { CAL_NAMESPACE, CAL_LINK, CAL_UI_CONFIG } from "./cal";

describe("cal config", () => {
  it("exposes a namespace and matching calLink", () => {
    expect(CAL_NAMESPACE).toBe("free-cloud-cost-risk-assessment");
    expect(CAL_LINK).toContain(CAL_NAMESPACE);
  });

  it("exposes UI config matching the site's brand color", () => {
    expect(CAL_UI_CONFIG).toEqual({
      theme: "light",
      styles: { branding: { brandColor: "#e05c20" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  });
});

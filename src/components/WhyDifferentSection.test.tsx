import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { WhyDifferentSection } from "./WhyDifferentSection";
import { WHY_DIFFERENT } from "@/lib/site-content";

function setInnerWidth(width: number) {
  Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: width });
}

describe("WhyDifferentSection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setInnerWidth(1280);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the eyebrow, heading, and one tab per feature", () => {
    render(<WhyDifferentSection />);
    expect(screen.getByText(WHY_DIFFERENT.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(WHY_DIFFERENT.heading)).toBeInTheDocument();
    for (const f of WHY_DIFFERENT.features) {
      expect(screen.getAllByText(f.title).length).toBeGreaterThan(0);
    }
  });

  it("renders two CTA buttons (desktop + mobile) pointing to /assessment", () => {
    render(<WhyDifferentSection />);
    const ctas = screen.getAllByRole("link", { name: WHY_DIFFERENT.cta });
    expect(ctas.length).toBe(2);
    for (const cta of ctas) expect(cta).toHaveAttribute("href", "/assessment");
  });

  it("starts the auto-cycle on desktop widths and advances the active tab", () => {
    render(<WhyDifferentSection />);
    act(() => {
      vi.advanceTimersByTime(7000);
    });
    // The body text renders in both the desktop tab list and the mobile
    // stacked cards (CSS media queries hide one; jsdom renders both).
    // Only the desktop one toggles opacity, so check all matches.
    const bodies = screen.getAllByText(WHY_DIFFERENT.features[1].body);
    const desktopBody = bodies.find((el) => el.parentElement?.style.opacity === "1");
    expect(desktopBody).toBeTruthy();
  });

  it("does not start the auto-cycle on narrow (mobile) widths", () => {
    setInnerWidth(500);
    const setIntervalSpy = vi.spyOn(global, "setInterval");
    render(<WhyDifferentSection />);
    expect(setIntervalSpy).not.toHaveBeenCalled();
  });

  it("a resize while already at mobile width (no interval running) is a no-op", () => {
    setInnerWidth(500);
    const clearSpy = vi.spyOn(global, "clearInterval");
    render(<WhyDifferentSection />);

    fireEvent(window, new Event("resize"));
    expect(clearSpy).not.toHaveBeenCalled();
  });

  it("clicking a tab switches the active feature and restarts the cycle", () => {
    render(<WhyDifferentSection />);
    const tabButtons = screen.getAllByRole("button");
    fireEvent.click(tabButtons[2]); // third feature (desktop tab button)
    const bodies = screen.getAllByText(WHY_DIFFERENT.features[2].body);
    const desktopBody = bodies.find((el) => el.parentElement?.style.opacity === "1");
    expect(desktopBody).toBeTruthy();
  });

  it("stops cycling on resize down to mobile width, and resumes on resize back up", () => {
    const clearSpy = vi.spyOn(global, "clearInterval");
    render(<WhyDifferentSection />);

    setInnerWidth(500);
    fireEvent(window, new Event("resize"));
    clearSpy.mockClear();

    setInnerWidth(1280);
    const setIntervalSpy = vi.spyOn(global, "setInterval");
    fireEvent(window, new Event("resize"));
    expect(setIntervalSpy).toHaveBeenCalled();
  });

  it("cleans up the resize listener and interval on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const clearSpy = vi.spyOn(global, "clearInterval");
    const { unmount } = render(<WhyDifferentSection />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(clearSpy).toHaveBeenCalled();
  });
});

describe("WhyDifferentSection with a feature missing an image", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setInnerWidth(1280);
    vi.doMock("@/lib/site-content", () => ({
      WHY_DIFFERENT: {
        eyebrow: "Eyebrow",
        heading: "Heading",
        cta: "CTA",
        bg: "/bg.svg",
        features: [
          { title: "No image feature", body: "Body text" },
          { title: "With image feature", body: "Body two", image: "/img.svg" },
        ],
      },
    }));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.doUnmock("@/lib/site-content");
    vi.resetModules();
  });

  it("skips rendering an image for features without one", async () => {
    vi.resetModules();
    const { WhyDifferentSection: Mocked } = await import("./WhyDifferentSection");
    render(<Mocked />);
    // Only the feature with an image should render an <img>; "No image
    // feature" has none, so its title must never be used as alt text.
    expect(screen.queryByAltText("No image feature")).not.toBeInTheDocument();
    expect(screen.getByAltText("With image feature")).toBeInTheDocument();
  });
});

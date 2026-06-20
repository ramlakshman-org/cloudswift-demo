import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { TestimonialsSection } from "./TestimonialsSection";
import { TESTIMONIALS } from "@/lib/site-content";

describe("TestimonialsSection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the first testimonial as active on initial render", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(`“${TESTIMONIALS[0].quote}”`)).toBeInTheDocument();
    const dots = screen.getAllByRole("button", { name: /Show testimonial/ });
    expect(dots).toHaveLength(TESTIMONIALS.length);
  });

  it("switches to the clicked testimonial", () => {
    render(<TestimonialsSection />);
    fireEvent.click(screen.getByRole("button", { name: "Show testimonial 2" }));
    expect(screen.getByText(`“${TESTIMONIALS[1].quote}”`)).toBeInTheDocument();
  });

  it("renders author, role, and a story link for the active testimonial", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(`– ${TESTIMONIALS[0].author}`)).toBeInTheDocument();
    expect(screen.getByText(TESTIMONIALS[0].role)).toBeInTheDocument();
    const links = screen.getAllByRole("link", { name: /Read the full story/ });
    expect(links.length).toBeGreaterThan(0);
  });

  it("auto-advances to the next testimonial every 7 seconds", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(`“${TESTIMONIALS[0].quote}”`)).toBeInTheDocument();

    vi.advanceTimersByTime(7000);
    expect(screen.getByText(`“${TESTIMONIALS[1].quote}”`)).toBeInTheDocument();

    vi.advanceTimersByTime(7000);
    expect(screen.getByText(`“${TESTIMONIALS[2].quote}”`)).toBeInTheDocument();
  });

  it("wraps around from the last testimonial back to the first", () => {
    render(<TestimonialsSection />);
    vi.advanceTimersByTime(7000 * TESTIMONIALS.length);
    expect(screen.getByText(`“${TESTIMONIALS[0].quote}”`)).toBeInTheDocument();
  });

  it("clears the interval on unmount", () => {
    const clearSpy = vi.spyOn(global, "clearInterval");
    const { unmount } = render(<TestimonialsSection />);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });

  it("expands the dot's tap target beyond its visible size without affecting layout", () => {
    render(<TestimonialsSection />);
    const dot = screen.getByRole("button", { name: "Show testimonial 1" });
    const overlay = within(dot).getByText("", { selector: "span.absolute" });
    expect(overlay).toBeInTheDocument();
  });
});

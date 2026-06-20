import { describe, it, expect, beforeEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

type MockObserver = { callback: IntersectionObserverCallback; observed: Element[] };

function lastObserver(): MockObserver {
  const instances = (globalThis as unknown as { __ioInstances: MockObserver[] }).__ioInstances;
  return instances[instances.length - 1];
}

describe("Reveal", () => {
  beforeEach(() => {
    (globalThis as unknown as { __ioInstances: MockObserver[] }).__ioInstances = [];
  });

  it("renders as a div by default with the reveal class and no animation-delay style", () => {
    render(<Reveal>content</Reveal>);
    const el = screen.getByText("content");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("reveal");
    expect(el).not.toHaveClass("is-visible");
    expect(el).not.toHaveAttribute("style");
  });

  it("renders as a custom element via the `as` prop", () => {
    render(<Reveal as="section">content</Reveal>);
    expect(screen.getByText("content").tagName).toBe("SECTION");
  });

  it("applies the id prop", () => {
    render(<Reveal id="my-id">content</Reveal>);
    expect(screen.getByText("content")).toHaveAttribute("id", "my-id");
  });

  it("applies an animation-delay style when delay is set", () => {
    render(<Reveal delay={200}>content</Reveal>);
    expect(screen.getByText("content")).toHaveStyle({ animationDelay: "200ms" });
  });

  it("merges a custom className", () => {
    render(<Reveal className="extra">content</Reveal>);
    expect(screen.getByText("content")).toHaveClass("reveal", "extra");
  });

  it("adds is-visible once the element intersects", () => {
    render(<Reveal>content</Reveal>);
    const el = screen.getByText("content");
    const observer = lastObserver();

    act(() => {
      observer.callback(
        [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
        observer as unknown as IntersectionObserver
      );
    });

    expect(el).toHaveClass("is-visible");
  });
});

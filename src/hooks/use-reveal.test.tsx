import { describe, it, expect, beforeEach } from "vitest";
import { act, render, renderHook, screen } from "@testing-library/react";
import { useReveal } from "./use-reveal";

type MockObserver = {
  callback: IntersectionObserverCallback;
  observed: Element[];
};

function lastObserver(): MockObserver {
  const instances = (globalThis as unknown as { __ioInstances: MockObserver[] }).__ioInstances;
  return instances[instances.length - 1];
}

function fireIntersection(observer: MockObserver, isIntersecting: boolean) {
  act(() => {
    observer.callback(
      [{ isIntersecting, target: observer.observed[0] } as unknown as IntersectionObserverEntry],
      observer as unknown as IntersectionObserver
    );
  });
}

function Probe({ once, threshold, rootMargin }: { once?: boolean; threshold?: number; rootMargin?: string }) {
  const { ref, visible } = useReveal({ once, threshold, rootMargin });
  return <div ref={ref} data-testid="probe">{visible ? "visible" : "hidden"}</div>;
}

describe("useReveal", () => {
  beforeEach(() => {
    (globalThis as unknown as { __ioInstances: MockObserver[] }).__ioInstances = [];
  });

  it("starts not visible and observes the attached element", () => {
    render(<Probe />);
    expect(screen.getByTestId("probe")).toHaveTextContent("hidden");
    expect(lastObserver().observed).toHaveLength(1);
  });

  it("becomes visible once the element intersects, and unobserves (once=true default)", () => {
    render(<Probe />);
    const observer = lastObserver();

    fireIntersection(observer, true);

    expect(screen.getByTestId("probe")).toHaveTextContent("visible");
    expect(observer.observed).toHaveLength(0);
  });

  it("toggles visibility back off when once=false, and keeps observing", () => {
    render(<Probe once={false} />);
    const observer = lastObserver();

    fireIntersection(observer, true);
    expect(screen.getByTestId("probe")).toHaveTextContent("visible");

    fireIntersection(observer, false);
    expect(screen.getByTestId("probe")).toHaveTextContent("hidden");
    expect(observer.observed).toHaveLength(1);
  });

  it("accepts custom threshold and rootMargin without throwing", () => {
    render(<Probe threshold={0.5} rootMargin="10px" />);
    expect(lastObserver()).toBeTruthy();
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = render(<Probe />);
    const observer = lastObserver();
    unmount();
    expect(observer.observed).toHaveLength(0);
  });

  it("does nothing if no element is ever attached to the ref (no options passed)", () => {
    const { result } = renderHook(() => useReveal());
    expect(result.current.ref.current).toBeNull();
    expect(result.current.visible).toBe(false);
    expect((globalThis as unknown as { __ioInstances: MockObserver[] }).__ioInstances).toHaveLength(0);
  });

  it("stays hidden when once=true (default) and the element is not yet intersecting", () => {
    render(<Probe />);
    const observer = lastObserver();

    fireIntersection(observer, false);

    expect(screen.getByTestId("probe")).toHaveTextContent("hidden");
    expect(observer.observed).toHaveLength(1);
  });
});

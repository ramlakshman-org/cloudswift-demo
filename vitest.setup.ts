import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/font/google requires the Next.js build pipeline; stub it for tests.
vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({
    className: "font-jakarta-mock",
    variable: "--font-jakarta",
  }),
}));

// jsdom has no IntersectionObserver. Provide a controllable mock:
// tests can grab the last-constructed instance via (global as any).__ioInstances.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  callback: IntersectionObserverCallback;
  observed: Element[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    (globalThis as unknown as { __ioInstances: MockIntersectionObserver[] }).__ioInstances ??= [];
    (globalThis as unknown as { __ioInstances: MockIntersectionObserver[] }).__ioInstances.push(this);
  }
  observe(target: Element) {
    this.observed.push(target);
  }
  unobserve(target: Element) {
    this.observed = this.observed.filter((t) => t !== target);
  }
  disconnect() {
    this.observed = [];
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// jsdom has no matchMedia. Used by shadcn's useIsMobile hook (Sidebar).
vi.stubGlobal(
  "matchMedia",
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
);

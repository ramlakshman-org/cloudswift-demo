import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, render, screen, fireEvent, within } from "@testing-library/react";
import { Navbar } from "./Navbar";

function setInnerWidth(width: number) {
  Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: width });
}

// The mobile overlay is a sibling of <nav>, not an ancestor of the hamburger
// button, so it can't be reached via .closest(). It's the only element with
// this exact class combination.
function getMobileOverlay(): HTMLElement {
  const overlay = document.querySelector(".overflow-y-auto");
  if (!overlay) throw new Error("mobile overlay not found -- is the menu open?");
  return overlay as HTMLElement;
}

describe("Navbar (real content)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setInnerWidth(1280);
    document.body.style.overflow = "";
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the logo, brand name, and the desktop CTA button", () => {
    render(<Navbar />);
    expect(screen.getByLabelText("CloudSwift home")).toBeInTheDocument();
    expect(screen.getByText("CloudSwift")).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: "Book Your Free Assessment" });
    expect(cta).toHaveAttribute("href", "/assessment");
  });

  it("opens a SolutionPanel-routed dropdown (Our Services) via DropdownPanel's router", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: /Our Services/ });
    fireEvent.mouseEnter(trigger.parentElement!);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("End-user & systems support")).toBeInTheDocument();
  });

  it("renders a plain link for link-kind entries and a button for dropdown entries", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("button", { name: /Our Solutions/ })).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the dropdown panel on hover and shows its content", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: /Our Solutions/ });
    fireEvent.mouseEnter(trigger.parentElement!);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("One cloud partner for everything Microsoft")).toBeInTheDocument();
  });

  it("schedules a close on mouse leave and closes after the delay", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: /Our Solutions/ });
    fireEvent.mouseEnter(trigger.parentElement!);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.mouseLeave(trigger.parentElement!);
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("cancels the scheduled close if the pointer re-enters before it fires", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: /Our Solutions/ });
    fireEvent.mouseEnter(trigger.parentElement!);
    fireEvent.mouseLeave(trigger.parentElement!);

    act(() => {
      vi.advanceTimersByTime(50);
    });
    fireEvent.mouseEnter(trigger.parentElement!);

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("re-entering the open panel itself cancels the close too", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: /Our Solutions/ });
    fireEvent.mouseEnter(trigger.parentElement!);
    const panel = screen.getByText("One cloud partner for everything Microsoft").closest(".dropdown-panel")!
      .parentElement!;
    fireEvent.mouseLeave(trigger.parentElement!);
    fireEvent.mouseEnter(panel);
    fireEvent.mouseLeave(panel);
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("a link-kind desktop item cancels any pending close on hover", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: /Our Solutions/ });
    fireEvent.mouseEnter(trigger.parentElement!);
    fireEvent.mouseLeave(trigger.parentElement!);
    fireEvent.mouseEnter(screen.getByRole("link", { name: "About Us" }));
    act(() => {
      vi.advanceTimersByTime(150);
    });
    // cancelClose on the link only clears the timer; it doesn't reopen anything,
    // so the previously-scheduled close for "Our Solutions" was defused (no-op
    // either way since clearTimeout on an already-pending close is safe).
    expect(screen.getByRole("button", { name: /Our Solutions/ })).toBeInTheDocument();
  });

  it("closes the open menu on outside click", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: /Our Solutions/ });
    fireEvent.mouseEnter(trigger.parentElement!);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.mouseDown(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("does not close when clicking inside the nav", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: /Our Solutions/ });
    fireEvent.mouseEnter(trigger.parentElement!);
    fireEvent.mouseDown(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the open menu and the mobile menu on Escape", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: /Our Solutions/ });
    fireEvent.mouseEnter(trigger.parentElement!);
    fireEvent.click(screen.getByLabelText("Open menu"));

    fireEvent.keyDown(document, { key: "Escape" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("ignores non-Escape key presses", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: /Our Solutions/ });
    fireEvent.mouseEnter(trigger.parentElement!);
    fireEvent.keyDown(document, { key: "Enter" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("adds a shadow once scrolled past 10px and removes it back at the top", () => {
    render(<Navbar />);
    const header = screen.getByLabelText("CloudSwift home").closest("header")!;
    expect(header.className).not.toContain("shadow-");

    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 50 });
    fireEvent.scroll(window);
    expect(header.className).toContain("shadow-");

    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 0 });
    fireEvent.scroll(window);
    expect(header.className).not.toContain("shadow-");
  });

  it("opens the mobile menu, locks body scroll, and toggles the hamburger label", () => {
    render(<Navbar />);
    expect(document.body.style.overflow).toBe("");
    fireEvent.click(screen.getByLabelText("Open menu"));
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closing the mobile menu unlocks body scroll", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    fireEvent.click(screen.getByLabelText("Close menu"));
    expect(document.body.style.overflow).toBe("");
  });

  it("unlocks body scroll on unmount even if the menu was left open", () => {
    const { unmount } = render(<Navbar />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("renders a mobile link item that closes the menu when clicked", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    const mobileAboutLink = within(getMobileOverlay()).getByRole("link", { name: "About Us" });
    fireEvent.click(mobileAboutLink);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("expands and collapses a mobile dropdown accordion item", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    const accordionBtn = within(getMobileOverlay()).getByRole("button", { name: /^Our Solutions/ });
    expect(accordionBtn).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(accordionBtn);
    expect(accordionBtn).toHaveAttribute("aria-expanded", "true");
    expect(within(getMobileOverlay()).getAllByRole("link", { name: "Microsoft Azure" }).length).toBeGreaterThan(0);

    fireEvent.click(accordionBtn);
    expect(accordionBtn).toHaveAttribute("aria-expanded", "false");
  });

  it("the mobile CTA closes the menu when clicked", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    const mobileCta = within(getMobileOverlay()).getByRole("link", { name: "Book Your Free Assessment" });
    fireEvent.click(mobileCta);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("cleans up scroll/mousedown/keydown listeners on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const docRemoveSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = render(<Navbar />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(docRemoveSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    expect(docRemoveSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
  });
});

// Real NAV_RIGHT only ever has a link-kind entry, so the dropdown
// open/close closures built for the *right*-side map (distinct statements
// from the left-side ones) never execute with real content.
describe("Navbar with a dropdown entry in NAV_RIGHT", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setInnerWidth(1280);
    vi.resetModules();
    vi.doMock("@/lib/site-content", () => ({
      NAV_LEFT: [{ kind: "link", label: "About Us", href: "/about" }],
      NAV_RIGHT: [
        {
          kind: "dropdown",
          label: "Right Dropdown",
          columns: [{ links: [{ label: "Right Link", href: "/right" }] }],
        },
      ],
    }));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.doUnmock("@/lib/site-content");
    vi.resetModules();
  });

  it("opens and closes a dropdown rendered on the right side of the nav", async () => {
    const { Navbar: MockedNavbar } = await import("./Navbar");
    render(<MockedNavbar />);

    const trigger = screen.getByRole("button", { name: /Right Dropdown/ });
    fireEvent.mouseEnter(trigger.parentElement!);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Right Link" })).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  SimplePanel,
  SolutionPanel,
  PlatformPanel,
  SidebarSection,
  MobileNavItem,
} from "./Navbar";
import type { NavDropdownData } from "@/types";

// SimplePanel/SolutionPanel/PlatformPanel only ever read featured/columns/
// sidebar/sideCta, but the shared NavDropdownData type also requires
// kind/label (used elsewhere in Navbar). Fill those in for every test data
// object rather than repeating them inline.
function dropdown(partial: Partial<NavDropdownData>): NavDropdownData {
  return { kind: "dropdown", label: "Test", ...partial };
}

describe("SimplePanel", () => {
  it("returns null when there are no columns", () => {
    const { container } = render(<SimplePanel data={dropdown({})} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("returns null when columns is an empty array", () => {
    const { container } = render(<SimplePanel data={dropdown({ columns: [] })} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a single flat list when there is exactly one column", () => {
    render(
      <SimplePanel
        data={dropdown({
          columns: [{ links: [{ label: "Link A", href: "/a" }, { label: "Link B", href: "/b" }] }],
        })}
      />
    );
    expect(screen.getByRole("link", { name: "Link A" })).toHaveAttribute("href", "/a");
    expect(screen.getByRole("link", { name: "Link B" })).toHaveAttribute("href", "/b");
  });

  it("renders multiple columns with and without a heading", () => {
    render(
      <SimplePanel
        data={dropdown({
          columns: [
            { heading: "Column One", links: [{ label: "Link A", href: "/a" }] },
            { links: [{ label: "Link B", href: "/b" }] },
          ],
        })}
      />
    );
    expect(screen.getByText("Column One")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Link A" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Link B" })).toBeInTheDocument();
  });
});

describe("SidebarSection", () => {
  it("renders without a heading or description", () => {
    render(<SidebarSection section={{ links: [{ label: "Only Link", href: "/x" }] }} />);
    expect(screen.getByRole("link", { name: "Only Link" })).toBeInTheDocument();
  });

  it("renders a heading without a description", () => {
    render(<SidebarSection section={{ heading: "Heading", links: [{ label: "L", href: "/l" }] }} />);
    expect(screen.getByText("Heading")).toBeInTheDocument();
  });

  it("renders a heading with a description", () => {
    render(
      <SidebarSection
        section={{ heading: "Heading", headingDesc: "Description text", links: [{ label: "L", href: "/l" }] }}
      />
    );
    expect(screen.getByText("Heading")).toBeInTheDocument();
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });
});

describe("SolutionPanel", () => {
  it("renders nothing extra when there are no featured cards and no sidebar", () => {
    const { container } = render(<SolutionPanel data={dropdown({})} />);
    expect(container.querySelector(".flex.gap-0")).toBeInTheDocument();
    expect(container.querySelectorAll("a")).toHaveLength(0);
  });

  it("renders light-variant cards by default, including a card without a cta", () => {
    render(
      <SolutionPanel
        data={dropdown({
          featured: [{ title: "Card One", desc: "Desc one", href: "/one" }],
        })}
      />
    );
    const link = screen.getByRole("link", { name: /Card One/ });
    expect(link.className).toContain("bg-ink/5");
    expect(screen.queryByText(/View|Explore/)).not.toBeInTheDocument();
  });

  it("renders a card with a cta label", () => {
    render(
      <SolutionPanel
        data={dropdown({ featured: [{ title: "Card Two", desc: "Desc two", href: "/two", cta: "Learn more" }] })}
      />
    );
    expect(screen.getByText("Learn more")).toBeInTheDocument();
  });

  it("renders dark-variant cards when any featured card has dark:true", () => {
    render(
      <SolutionPanel
        data={dropdown({
          featured: [
            { title: "Dark Card", desc: "Desc", href: "/dark", cta: "Go", dark: true },
          ],
        })}
      />
    );
    const link = screen.getByRole("link", { name: /Dark Card/ });
    expect(link.className).toContain("bg-teal");
  });

  it("renders the sidebar when provided", () => {
    render(
      <SolutionPanel
        data={dropdown({ sidebar: { heading: "Side", links: [{ label: "Side link", href: "/s" }] } })}
      />
    );
    expect(screen.getByText("Side")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Side link" })).toBeInTheDocument();
  });
});

describe("PlatformPanel", () => {
  it("renders without a featured card when none is provided", () => {
    render(
      <PlatformPanel
        data={dropdown({ columns: [{ links: [{ label: "Col link", href: "/c" }] }] })}
      />
    );
    expect(screen.queryByText(/cloud partner/)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Col link" })).toBeInTheDocument();
  });

  it("renders the featured card with an image", () => {
    render(
      <PlatformPanel
        data={dropdown({
          featured: [{ title: "Featured", desc: "Desc", href: "/f", cta: "Go", image: "/img.svg" }],
        })}
      />
    );
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(document.querySelector("img")).toBeInTheDocument();
  });

  it("renders the featured card without an image", () => {
    render(
      <PlatformPanel
        data={dropdown({ featured: [{ title: "No Image Card", desc: "Desc", href: "/f", cta: "Go" }] })}
      />
    );
    expect(screen.getByText("No Image Card")).toBeInTheDocument();
    expect(document.querySelector("img")).not.toBeInTheDocument();
  });

  it("renders nothing for columns when none are provided", () => {
    const { container } = render(
      <PlatformPanel data={dropdown({ sideCta: { heading: "H", desc: "D", href: "/x", cta: "Go" } })} />
    );
    expect(container.querySelectorAll(".border-l.border-ink\\/10").length).toBeGreaterThan(0);
  });

  it("renders multiple columns with a left border on columns after the first", () => {
    render(
      <PlatformPanel
        data={dropdown({
          columns: [
            { links: [{ label: "First col link", href: "/1" }] },
            { links: [{ label: "Second col link", href: "/2" }] },
          ],
        })}
      />
    );
    expect(screen.getByRole("link", { name: "First col link" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Second col link" })).toBeInTheDocument();
  });

  it("renders a column link's description when provided", () => {
    render(
      <PlatformPanel
        data={dropdown({ columns: [{ links: [{ label: "L", href: "/l", desc: "Link description" }] }] })}
      />
    );
    expect(screen.getByText("Link description")).toBeInTheDocument();
  });

  it("renders neither sidebar nor sideCta box when absent", () => {
    const { container } = render(
      <PlatformPanel data={dropdown({ featured: [{ title: "T", desc: "D", href: "/t", cta: "Go" }] })} />
    );
    expect(container.querySelectorAll("a")).toHaveLength(1);
  });

  it("renders the sidebar without a sideCta box", () => {
    render(
      <PlatformPanel
        data={dropdown({ sidebar: { heading: "Sidebar heading", links: [{ label: "Sidebar link", href: "/s" }] } })}
      />
    );
    expect(screen.getByText("Sidebar heading")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sidebar link" })).toBeInTheDocument();
  });

  it("renders a sideCta box with an image", () => {
    render(
      <PlatformPanel
        data={dropdown({
          sideCta: { heading: "CTA heading", desc: "CTA desc", href: "/cta", cta: "Go now", image: "/img.svg" },
        })}
      />
    );
    expect(screen.getByText("CTA heading")).toBeInTheDocument();
    expect(screen.getByText("Go now")).toBeInTheDocument();
    expect(document.querySelector("img")).toBeInTheDocument();
  });

  it("renders a sideCta box without an image", () => {
    render(
      <PlatformPanel
        data={dropdown({ sideCta: { heading: "CTA heading", desc: "CTA desc", href: "/cta", cta: "Go now" } })}
      />
    );
    expect(screen.getByText("CTA heading")).toBeInTheDocument();
    expect(document.querySelector("img")).not.toBeInTheDocument();
  });
});

describe("MobileNavItem", () => {
  it("renders a plain link for link-kind entries and calls onClose when clicked", () => {
    const onClose = vi.fn();
    render(<MobileNavItem entry={{ kind: "link", label: "Link Entry", href: "/x" }} onClose={onClose} />);
    const link = screen.getByRole("link", { name: "Link Entry" });
    fireEvent.click(link);
    expect(onClose).toHaveBeenCalled();
  });

  it("renders an accordion with no links when the dropdown entry has no featured, columns, or sidebar", () => {
    render(
      <MobileNavItem
        entry={dropdown({ label: "Empty Dropdown" })}
        onClose={() => {}}
      />
    );
    const btn = screen.getByRole("button", { name: /Empty Dropdown/ });
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });
});

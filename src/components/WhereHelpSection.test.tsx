import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhereHelpSection } from "./WhereHelpSection";
import { WHERE_HEADING, WHERE_CARDS } from "@/lib/site-content";

describe("WhereHelpSection", () => {
  it("renders the heading and every card's title, bullets, and link", () => {
    render(<WhereHelpSection />);
    expect(screen.getByText(WHERE_HEADING)).toBeInTheDocument();
    for (const card of WHERE_CARDS) {
      expect(screen.getByText(card.title)).toBeInTheDocument();
      for (const b of card.bullets) {
        expect(screen.getByText(b)).toBeInTheDocument();
      }
      expect(screen.getByRole("link", { name: new RegExp(card.linkLabel) })).toHaveAttribute(
        "href",
        card.linkHref
      );
    }
  });
});

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FaqSection } from "./FaqSection";

const items = [
  { q: "Question one?", a: "Answer one." },
  { q: "Question two?", a: "Answer two." },
];

describe("FaqSection", () => {
  it("renders the default heading and all questions, all collapsed initially", () => {
    render(<FaqSection items={items} />);
    expect(screen.getByText("Frequently asked questions")).toBeInTheDocument();
    expect(screen.getByText("Question one?")).toBeInTheDocument();
    expect(screen.getByText("Question two?")).toBeInTheDocument();
    expect(screen.queryByText("Answer one.")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Question one/ })).toHaveAttribute("aria-expanded", "false");
  });

  it("renders a custom heading and className", () => {
    render(<FaqSection items={items} heading="Custom heading" className="extra" />);
    expect(screen.getByText("Custom heading")).toBeInTheDocument();
  });

  it("opens an item's answer on click and sets aria-expanded", () => {
    render(<FaqSection items={items} />);
    fireEvent.click(screen.getByRole("button", { name: /Question one/ }));
    expect(screen.getByText("Answer one.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Question one/ })).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the open item when clicked again", () => {
    render(<FaqSection items={items} />);
    const btn = screen.getByRole("button", { name: /Question one/ });
    fireEvent.click(btn);
    expect(screen.getByText("Answer one.")).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText("Answer one.")).not.toBeInTheDocument();
  });

  it("switches to a different item, closing the previous one", () => {
    render(<FaqSection items={items} />);
    fireEvent.click(screen.getByRole("button", { name: /Question one/ }));
    fireEvent.click(screen.getByRole("button", { name: /Question two/ }));
    expect(screen.queryByText("Answer one.")).not.toBeInTheDocument();
    expect(screen.getByText("Answer two.")).toBeInTheDocument();
  });
});

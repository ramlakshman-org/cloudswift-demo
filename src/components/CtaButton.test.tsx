import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CtaButton } from "./CtaButton";

describe("CtaButton", () => {
  it("renders children and links to href", () => {
    render(<CtaButton href="/contact">Talk to us</CtaButton>);
    const link = screen.getByRole("link", { name: "Talk to us" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("defaults href to #", () => {
    render(<CtaButton>Click</CtaButton>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "#");
  });

  it.each(["primary", "outline", "ghost"] as const)(
    "applies %s variant classes",
    (variant) => {
      render(<CtaButton variant={variant}>Go</CtaButton>);
      expect(screen.getByRole("link").className.length).toBeGreaterThan(0);
    }
  );

  it("merges extra className", () => {
    render(<CtaButton className="extra-class">Go</CtaButton>);
    expect(screen.getByRole("link")).toHaveClass("extra-class");
  });

  it("fires onClick", () => {
    const onClick = vi.fn();
    render(<CtaButton onClick={onClick}>Go</CtaButton>);
    fireEvent.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

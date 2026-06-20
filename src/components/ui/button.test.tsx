import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, buttonVariants } from "./button";

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn).toHaveAttribute("data-slot", "button");
  });

  it("applies a custom variant, size, and className", () => {
    render(
      <Button variant="outline" size="lg" className="extra">
        Go
      </Button>
    );
    const btn = screen.getByRole("button", { name: "Go" });
    expect(btn).toHaveClass("extra");
  });

  it("buttonVariants generates a class string for a given variant/size", () => {
    const classes = buttonVariants({ variant: "destructive", size: "icon" });
    expect(typeof classes).toBe("string");
    expect(classes.length).toBeGreaterThan(0);
  });
});

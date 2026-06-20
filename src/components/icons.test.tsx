import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Logo,
  SearchIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  BookIcon,
  UserIcon,
  MenuIcon,
} from "./icons";

describe("Logo", () => {
  it("renders with the default height", () => {
    render(<Logo />);
    const img = screen.getByAltText("CloudSwift");
    expect(img).toHaveStyle({ height: "30px" });
  });

  it("renders with a custom height and className", () => {
    render(<Logo height={50} className="custom" />);
    const img = screen.getByAltText("CloudSwift");
    expect(img).toHaveStyle({ height: "50px" });
    expect(img).toHaveClass("custom");
  });
});

describe("standalone icon components", () => {
  it.each([
    ["SearchIcon", SearchIcon],
    ["ArrowRightIcon", ArrowRightIcon],
    ["ChevronDownIcon", ChevronDownIcon],
    ["BookIcon", BookIcon],
    ["UserIcon", UserIcon],
    ["MenuIcon", MenuIcon],
  ] as const)("%s renders an svg and forwards props", (_name, Icon) => {
    const { container } = render(<Icon data-testid="icon" className="extra" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("data-testid", "icon");
    expect(svg).toHaveClass("extra");
  });
});

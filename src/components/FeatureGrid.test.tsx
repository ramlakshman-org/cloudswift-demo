import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureGrid } from "./FeatureGrid";

const features = [
  { title: "Feature One", body: "Body one" },
  { title: "Feature Two", body: "Body two", icon: <svg data-testid="icon-2" />, accent: "rust" as const },
  { title: "Feature Three", body: "Body three", icon: <svg data-testid="icon-3" /> },
];

describe("FeatureGrid", () => {
  it("renders neither heading nor subheading when both are omitted", () => {
    render(<FeatureGrid features={features} />);
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("renders only the subheading when heading is omitted", () => {
    render(<FeatureGrid features={features} subheading="Sub only" />);
    expect(screen.getByText("Sub only")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("renders only the heading when subheading is omitted", () => {
    render(<FeatureGrid features={features} heading="Heading only" />);
    expect(screen.getByRole("heading", { level: 2, name: "Heading only" })).toBeInTheDocument();
  });

  it("renders both heading and subheading when both are given", () => {
    render(<FeatureGrid features={features} heading="H" subheading="S" />);
    expect(screen.getByText("H")).toBeInTheDocument();
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("renders every feature's title and body", () => {
    render(<FeatureGrid features={features} />);
    for (const f of features) {
      expect(screen.getByText(f.title)).toBeInTheDocument();
      expect(screen.getByText(f.body)).toBeInTheDocument();
    }
  });

  it("renders an icon wrapper only for features that have one", () => {
    render(<FeatureGrid features={features} />);
    expect(screen.getByTestId("icon-2")).toBeInTheDocument();
    expect(screen.getByTestId("icon-3")).toBeInTheDocument();
  });

  it("applies the accent color class when given, defaulting to teal otherwise", () => {
    render(<FeatureGrid features={features} />);
    const accented = screen.getByTestId("icon-2").parentElement;
    const defaulted = screen.getByTestId("icon-3").parentElement;
    expect(accented?.className).toContain("text-rust");
    expect(defaulted?.className).toContain("text-teal");
  });

  it.each(["teal", "rust", "gold", "purple", "leaf"] as const)(
    "supports the %s accent",
    (accent) => {
      render(<FeatureGrid features={[{ title: "T", body: "B", icon: <svg />, accent }]} />);
      expect(screen.getByText("T").parentElement?.querySelector("div")?.className).toContain(`text-${accent}`);
    }
  );

  it.each([2, 3, 4] as const)("supports %s columns", (cols) => {
    const { container } = render(<FeatureGrid features={features} cols={cols} />);
    expect(container.querySelector(".grid")).toBeInTheDocument();
  });

  it("defaults to 3 columns when cols is omitted", () => {
    const { container } = render(<FeatureGrid features={features} />);
    expect(container.querySelector(".md\\:grid-cols-3")).toBeInTheDocument();
  });

  it("renders the dark variant with dark-appropriate text colors", () => {
    render(<FeatureGrid features={features} heading="H" subheading="S" dark />);
    expect(screen.getByText("H").className).toContain("text-white");
    expect(screen.getByText("S").className).toContain("text-gold");
    expect(screen.getByText("Feature One").className).toContain("text-white");
  });

  it("renders the light variant with light-appropriate text colors", () => {
    render(<FeatureGrid features={features} heading="H" subheading="S" />);
    expect(screen.getByText("H").className).toContain("text-ink");
    expect(screen.getByText("S").className).toContain("text-rust");
    expect(screen.getByText("Feature One").className).toContain("text-ink");
  });

  it("forwards each feature's id to its Reveal wrapper for anchor linking", () => {
    render(<FeatureGrid features={[{ id: "anchor-id", title: "T", body: "B" }]} />);
    expect(document.getElementById("anchor-id")).toBeInTheDocument();
  });
});

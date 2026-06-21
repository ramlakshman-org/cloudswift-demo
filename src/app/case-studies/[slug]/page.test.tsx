import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

import CaseStudyPage, { generateStaticParams, generateMetadata } from "./page";
import { CASE_STUDIES } from "@/lib/site-content";
import { notFound } from "next/navigation";

const notFoundMock = vi.mocked(notFound);

describe("CaseStudyPage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    notFoundMock.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("generates static params for every case study", () => {
    expect(generateStaticParams()).toEqual(CASE_STUDIES.map((c) => ({ slug: c.slug })));
  });

  it("generates metadata for a known slug", async () => {
    const c = CASE_STUDIES[0];
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: c.slug }) });
    expect(metadata.title).toBe(`${c.client} — Case Study | CloudSwift`);
    expect(metadata.description).toBe(c.summary);
  });

  it("returns empty metadata for an unknown slug", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "does-not-exist" }) });
    expect(metadata).toEqual({});
  });

  it("renders the challenge, solution, and results for a known slug", async () => {
    const c = CASE_STUDIES[0];
    const ui = await CaseStudyPage({ params: Promise.resolve({ slug: c.slug }) });
    render(ui);

    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { name: c.client })).toBeInTheDocument();
    expect(main.getByText(c.challenge)).toBeInTheDocument();
    expect(main.getByText(c.solution)).toBeInTheDocument();
    for (const r of c.results) {
      expect(main.getByText(r)).toBeInTheDocument();
    }
  });

  it("shows the illustrative-example disclaimer for placeholder case studies", async () => {
    const c = CASE_STUDIES.find((cs) => cs.isPlaceholder)!;
    const ui = await CaseStudyPage({ params: Promise.resolve({ slug: c.slug }) });
    render(ui);
    expect(screen.getByText("Illustrative example.")).toBeInTheDocument();
  });

  it("calls notFound() for an unknown slug", async () => {
    await expect(
      CaseStudyPage({ params: Promise.resolve({ slug: "does-not-exist" }) })
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFoundMock).toHaveBeenCalled();
  });
});

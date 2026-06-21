import { describe, it, expect } from "vitest";
import { ENQUIRY_CATEGORIES } from "@/lib/enquiry-shared";
import { ASSESSMENT_QUESTIONS, ASSESSMENT_CATEGORIES } from "./assessment-questions";

describe("assessment-questions", () => {
  it("exposes the full enquiry category list", () => {
    expect(ASSESSMENT_CATEGORIES).toEqual(ENQUIRY_CATEGORIES);
  });

  it("has at least one question for every enquiry category", () => {
    for (const category of ENQUIRY_CATEGORIES) {
      expect(ASSESSMENT_QUESTIONS[category].length).toBeGreaterThan(0);
    }
  });

  it("has unique question ids within each category", () => {
    for (const category of ENQUIRY_CATEGORIES) {
      const ids = ASSESSMENT_QUESTIONS[category].map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("gives every question a non-empty question string", () => {
    for (const category of ENQUIRY_CATEGORIES) {
      for (const q of ASSESSMENT_QUESTIONS[category]) {
        expect(q.question.length).toBeGreaterThan(0);
      }
    }
  });

  it("only the Other category uses a free-text question (empty options)", () => {
    for (const category of ENQUIRY_CATEGORIES) {
      const freeText = ASSESSMENT_QUESTIONS[category].filter((q) => q.options.length === 0);
      if (category === "Other") {
        expect(freeText.length).toBeGreaterThan(0);
      } else {
        expect(freeText.length).toBe(0);
      }
    }
  });
});

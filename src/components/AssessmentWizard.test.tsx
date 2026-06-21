import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AssessmentWizard } from "./AssessmentWizard";

function pickCategory(name: string) {
  fireEvent.click(screen.getByRole("button", { name }));
}

function fillContactStep() {
  fireEvent.change(screen.getByLabelText("First name"), { target: { value: "Jane" } });
  fireEvent.change(screen.getByLabelText("Last name"), { target: { value: "Doe" } });
  fireEvent.change(screen.getByLabelText("Work email"), { target: { value: "jane@example.com" } });
  fireEvent.change(screen.getByLabelText("Company"), { target: { value: "Acme" } });
}

describe("AssessmentWizard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("starts on the category step listing every category", () => {
    render(<AssessmentWizard />);
    expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Microsoft Azure" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cloud Security" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Other" })).toBeInTheDocument();
  });

  it("advances to the questions step with option buttons for a multiple-choice category", () => {
    render(<AssessmentWizard />);
    pickCategory("Microsoft Azure");

    expect(screen.getByText("Step 2 of 3")).toBeInTheDocument();
    expect(screen.getByText("Where does your infrastructure live today?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cost reduction" })).toBeInTheDocument();
  });

  it("renders a free-text textarea for the Other category and captures typed input", () => {
    render(<AssessmentWizard />);
    pickCategory("Other");

    const textarea = screen.getByLabelText("Briefly, what are you looking for?");
    expect(textarea).toBeInTheDocument();
    fireEvent.change(textarea, { target: { value: "Need help with a hybrid setup" } });
    expect(textarea).toHaveValue("Need help with a hybrid setup");
  });

  it("toggles a selected answer option's pressed state", () => {
    render(<AssessmentWizard />);
    pickCategory("Microsoft Azure");

    const option = screen.getByRole("button", { name: "Cost reduction" });
    expect(option).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(option);
    expect(option).toHaveAttribute("aria-pressed", "true");
  });

  it("goes back from questions to category", () => {
    render(<AssessmentWizard />);
    pickCategory("Microsoft Azure");
    fireEvent.click(screen.getByRole("button", { name: "← Back" }));
    expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();
  });

  it("goes back from contact to questions", () => {
    render(<AssessmentWizard />);
    pickCategory("Microsoft Azure");
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Step 3 of 3")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "← Back" }));
    expect(screen.getByText("Step 2 of 3")).toBeInTheDocument();
  });

  it("submits category, answers, and contact info, then shows the confirmation step", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);

    render(<AssessmentWizard />);
    pickCategory("Microsoft Azure");
    fireEvent.click(screen.getByRole("button", { name: "Cost reduction" }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fillContactStep();
    fireEvent.submit(screen.getByRole("button", { name: "Get my free assessment" }).closest("form")!);

    await waitFor(() => expect(screen.getByText("We'll be in touch")).toBeInTheDocument());

    expect(fetchMock).toHaveBeenCalledWith("/api/assessment", expect.objectContaining({ method: "POST" }));
    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sentBody).toEqual({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      company: "Acme",
      category: "Microsoft Azure",
      answers: { driver: "Cost reduction" },
    });
  });

  it("shows the loading label and disables the submit button while in flight", async () => {
    let resolveFetch: (v: unknown) => void;
    const fetchMock = vi.fn(() => new Promise((resolve) => { resolveFetch = resolve; }));
    vi.stubGlobal("fetch", fetchMock);

    render(<AssessmentWizard />);
    pickCategory("Other");
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fillContactStep();
    fireEvent.submit(screen.getByRole("button", { name: "Get my free assessment" }).closest("form")!);

    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    resolveFetch!({ json: async () => ({ ok: true }) });
    await waitFor(() => expect(screen.getByText("We'll be in touch")).toBeInTheDocument());
  });

  it("shows an error message when the API responds with ok:false", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => ({ ok: false }) }));

    render(<AssessmentWizard />);
    pickCategory("Other");
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fillContactStep();
    fireEvent.submit(screen.getByRole("button", { name: "Get my free assessment" }).closest("form")!);

    expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
  });

  it("shows an error message when the request itself rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    render(<AssessmentWizard />);
    pickCategory("Other");
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fillContactStep();
    fireEvent.submit(screen.getByRole("button", { name: "Get my free assessment" }).closest("form")!);

    expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
  });
});

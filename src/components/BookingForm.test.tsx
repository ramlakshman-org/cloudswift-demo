import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BookingForm } from "./BookingForm";

describe("BookingForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the idle form with all fields and no error message", () => {
    render(<BookingForm />);
    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Work email")).toBeInTheDocument();
    expect(screen.getByLabelText("Company")).toBeInTheDocument();
    expect(screen.getByLabelText("Primary use case")).toBeInTheDocument();
    expect(screen.getByLabelText(/Tell us about your challenge/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Book my consultation" })).not.toBeDisabled();
    expect(screen.queryByText(/Something went wrong/)).not.toBeInTheDocument();
  });

  it("updates form state as the user types into each field", () => {
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText("First name"), { target: { value: "Jane" } });
    fireEvent.change(screen.getByLabelText("Last name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText("Work email"), { target: { value: "jane@x.com" } });
    fireEvent.change(screen.getByLabelText("Company"), { target: { value: "Acme" } });
    fireEvent.change(screen.getByLabelText("Primary use case"), { target: { value: "Microsoft Azure" } });
    fireEvent.change(screen.getByLabelText(/Tell us about your challenge/), { target: { value: "Help" } });

    expect(screen.getByLabelText("First name")).toHaveValue("Jane");
    expect(screen.getByLabelText("Last name")).toHaveValue("Doe");
    expect(screen.getByLabelText("Work email")).toHaveValue("jane@x.com");
    expect(screen.getByLabelText("Company")).toHaveValue("Acme");
    expect(screen.getByLabelText("Primary use case")).toHaveValue("Microsoft Azure");
    expect(screen.getByLabelText(/Tell us about your challenge/)).toHaveValue("Help");
  });

  it("shows a loading state while submitting, then success on ok:true", async () => {
    let resolveFetch: (v: unknown) => void;
    const fetchMock = vi.fn<(url: string, init?: RequestInit) => Promise<unknown>>(
      () => new Promise((resolve) => { resolveFetch = resolve; })
    );
    vi.stubGlobal("fetch", fetchMock);

    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText("Work email"), { target: { value: "jane@x.com" } });
    fireEvent.submit(screen.getByRole("button", { name: "Book my consultation" }).closest("form")!);

    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" })
    );
    const sentBody = JSON.parse(fetchMock.mock.calls[0][1]!.body as string);
    expect(sentBody.email).toBe("jane@x.com");

    resolveFetch!({ json: async () => ({ ok: true }) });

    await waitFor(() => {
      expect(screen.getByText("We'll be in touch")).toBeInTheDocument();
    });
  });

  it("shows the error message when the API responds with ok:false", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: async () => ({ ok: false }) })
    );

    render(<BookingForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Book my consultation" }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    });
    expect(screen.getByRole("link", { name: "support@oncloudswift.com" })).toHaveAttribute(
      "href",
      "mailto:support@oncloudswift.com"
    );
  });

  it("shows the error message when fetch rejects entirely", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    render(<BookingForm />);
    fireEvent.submit(screen.getByRole("button", { name: "Book my consultation" }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    });
  });

  it("links to the privacy policy", () => {
    render(<BookingForm />);
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy");
  });
});

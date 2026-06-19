"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", company: "", usecase: "", message: "",
  });

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-10 shadow-[0_4px_40px_rgba(1,33,33,0.08)] flex flex-col items-center justify-center text-center min-h-[420px]">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-light text-ink">We&apos;ll be in touch</h2>
        <p className="text-sm text-ink/55 max-w-sm">
          Thanks for reaching out. A CloudSwift expert will confirm a time with you within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-10 shadow-[0_4px_40px_rgba(1,33,33,0.08)]">
      <h2 className="mb-2 text-2xl font-light text-ink">Book a meeting</h2>
      <p className="mb-8 text-sm text-ink/55">
        Fill in your details and we&apos;ll confirm a time within one business day.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {[
            { id: "firstName", label: "First name", placeholder: "Jane" },
            { id: "lastName", label: "Last name", placeholder: "Smith" },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="mb-1.5 block text-sm font-medium text-ink">
                {f.label}
              </label>
              <input
                id={f.id}
                type="text"
                required
                placeholder={f.placeholder}
                value={form[f.id as keyof typeof form]}
                onChange={(e) => set(f.id, e.target.value)}
                className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
              />
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Work email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="jane@company.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
          />
        </div>

        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink">
            Company
          </label>
          <input
            id="company"
            type="text"
            placeholder="Acme Corp"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
          />
        </div>

        <div>
          <label htmlFor="usecase" className="mb-1.5 block text-sm font-medium text-ink">
            Primary use case
          </label>
          <select
            id="usecase"
            value={form.usecase}
            onChange={(e) => set("usecase", e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition appearance-none"
          >
            <option value="">Select one...</option>
            <option>Microsoft Azure</option>
            <option>Dynamics 365 (ERP/CRM)</option>
            <option>Microsoft 365 / Modern Workplace</option>
            <option>Power BI &amp; Analytics</option>
            <option>Managed Cloud Services</option>
            <option>Cloud Migration</option>
            <option>Cloud Security</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
            Tell us about your challenge (optional)
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="What are you trying to solve?"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition resize-none"
          />
        </div>

        {status === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            Something went wrong. Please email us directly at{" "}
            <a href="mailto:support@oncloudswift.com" className="underline">
              support@oncloudswift.com
            </a>
            .
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-[6px] bg-rust px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-rust-dark disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending…" : "Book my consultation"}
        </button>

        <p className="text-center text-xs text-ink/40">
          By submitting you agree to our{" "}
          <a href="/privacy" className="underline hover:text-ink/70">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}

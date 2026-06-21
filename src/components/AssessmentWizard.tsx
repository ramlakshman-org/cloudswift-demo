"use client";

import { useState } from "react";
import { ASSESSMENT_CATEGORIES, ASSESSMENT_QUESTIONS } from "@/lib/assessment-questions";
import type { EnquiryCategory } from "@/lib/enquiry-shared";

type Step = "category" | "questions" | "contact" | "done";
type Status = "idle" | "loading" | "error";

export function AssessmentWizard() {
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<EnquiryCategory | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", company: "" });

  function selectCategory(c: EnquiryCategory) {
    setCategory(c);
    setAnswers({});
    setStep("questions");
  }

  function setAnswer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function setContactField(field: string, value: string) {
    setContact((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, category, answers }),
      });
      const data = await res.json();
      if (data.ok) {
        setStep("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const questions = category ? ASSESSMENT_QUESTIONS[category] : [];
  const stepNumber = step === "category" ? 1 : step === "questions" ? 2 : 3;

  return (
    <div className="rounded-2xl bg-white p-10 shadow-[0_4px_40px_rgba(1,33,33,0.08)]">
      {step !== "done" && (
        <p className="mb-6 text-xs font-medium uppercase tracking-widest text-ink/40">Step {stepNumber} of 3</p>
      )}

      {step === "category" && (
        <>
          <h2 className="mb-2 text-2xl font-light text-ink">What can we help you with?</h2>
          <p className="mb-8 text-sm text-ink/55">Pick the area closest to what you&apos;re looking for.</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ASSESSMENT_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => selectCategory(c)}
                className="rounded-lg border border-ink/15 bg-surface px-4 py-3 text-left text-sm font-medium text-ink transition hover:border-teal hover:bg-teal/5"
              >
                {c}
              </button>
            ))}
          </div>
        </>
      )}

      {step === "questions" && category && (
        <>
          <h2 className="mb-2 text-2xl font-light text-ink">A few quick questions</h2>
          <p className="mb-8 text-sm text-ink/55">About your {category} needs.</p>
          <div className="space-y-6">
            {questions.map((q) =>
              q.options.length === 0 ? (
                <div key={q.id}>
                  <label htmlFor={q.id} className="mb-1.5 block text-sm font-medium text-ink">
                    {q.question}
                  </label>
                  <textarea
                    id={q.id}
                    rows={4}
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition resize-none"
                  />
                </div>
              ) : (
                <fieldset key={q.id}>
                  <legend className="mb-2 text-sm font-medium text-ink">{q.question}</legend>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAnswer(q.id, opt)}
                        aria-pressed={answers[q.id] === opt}
                        className={`rounded-full border px-4 py-2 text-sm transition ${
                          answers[q.id] === opt
                            ? "border-teal bg-teal text-white"
                            : "border-ink/15 bg-surface text-ink hover:border-teal"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )
            )}
          </div>
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => setStep("category")}
              className="text-sm font-medium text-ink/55 hover:text-ink"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep("contact")}
              className="rounded-[6px] bg-rust px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-rust/90"
            >
              Continue
            </button>
          </div>
        </>
      )}

      {step === "contact" && (
        <form onSubmit={handleSubmit}>
          <h2 className="mb-2 text-2xl font-light text-ink">Almost done</h2>
          <p className="mb-8 text-sm text-ink/55">How should we reach you?</p>
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-ink">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={contact.firstName}
                  onChange={(e) => setContactField("firstName", e.target.value)}
                  className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-ink">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  value={contact.lastName}
                  onChange={(e) => setContactField("lastName", e.target.value)}
                  className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                value={contact.email}
                onChange={(e) => setContactField("email", e.target.value)}
                className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
              />
            </div>
            <div>
              <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink">
                Company
              </label>
              <input
                id="company"
                type="text"
                value={contact.company}
                onChange={(e) => setContactField("company", e.target.value)}
                className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
              />
            </div>
          </div>

          {status === "error" && (
            <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              Something went wrong. Please email us directly at{" "}
              <a href="mailto:support@oncloudswift.com" className="underline">
                support@oncloudswift.com
              </a>
              .
            </p>
          )}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => setStep("questions")}
              className="text-sm font-medium text-ink/55 hover:text-ink"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-[6px] bg-rust px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-rust/90 disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Get my free assessment"}
            </button>
          </div>
        </form>
      )}

      {step === "done" && (
        <div className="flex flex-col items-center justify-center text-center min-h-[280px]">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-light text-ink">We&apos;ll be in touch</h2>
          <p className="text-sm text-ink/55 max-w-sm">
            A CloudSwift expert will review your answers and reach out within one business day with your free assessment.
          </p>
        </div>
      )}
    </div>
  );
}

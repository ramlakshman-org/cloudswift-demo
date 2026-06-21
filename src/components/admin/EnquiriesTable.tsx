"use client";

import { Fragment, useMemo, useState } from "react";
import {
  ENQUIRY_CATEGORIES,
  ENQUIRY_STATUSES,
  type SerializedEnquiry,
  type EnquiryStatus,
  type EnquirySource,
  type EnquiryCategory,
} from "@/lib/enquiry-shared";
import { ASSESSMENT_QUESTIONS } from "@/lib/assessment-questions";

const SOURCE_LABELS: Record<EnquirySource, string> = {
  contact: "Contact form",
  assessment: "Free assessment",
};

function answerLabel(category: string, questionId: string): string {
  const questions = ASSESSMENT_QUESTIONS[category as EnquiryCategory];
  return questions?.find((q) => q.id === questionId)?.question ?? questionId;
}

// Pinned to a fixed locale/timezone — toLocaleDateString() with no
// arguments defaults to the runtime's locale, which differs between the
// server (Node default, e.g. en-US) and the browser (e.g. en-IN), causing
// a hydration mismatch ("6/20/2026" vs "20/06/2026") on first render.
function formatReceivedDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { timeZone: "UTC" });
}

interface EnquiriesTableProps {
  initialEnquiries: SerializedEnquiry[];
}

export function EnquiriesTable({ initialEnquiries }: EnquiriesTableProps) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return enquiries.filter((e) => {
      if (category && e.category !== category) return false;
      if (status && e.status !== status) return false;
      if (term) {
        const haystack = `${e.firstName} ${e.lastName} ${e.email} ${e.company ?? ""}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [enquiries, category, status, search]);

  async function handleStatusChange(id: string, nextStatus: EnquiryStatus) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: nextStatus } : e)));
      }
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="rounded-2xl bg-white shadow-[0_4px_40px_rgba(1,33,33,0.08)]">
      <div className="flex flex-wrap gap-4 border-b border-ink/8 p-6">
        <input
          type="search"
          placeholder="Search name, email, company…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] rounded-lg border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
        >
          <option value="">All categories</option>
          {ENQUIRY_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
        >
          <option value="">All statuses</option>
          {ENQUIRY_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="p-10 text-center text-sm text-ink/55">No enquiries match these filters.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink/8 text-ink/50">
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium">Details</th>
                <th className="px-6 py-3 font-medium">Received</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const hasAnswers = Boolean(e.answers && Object.keys(e.answers).length > 0);
                const isExpanded = expandedId === e.id;
                return (
                  <Fragment key={e.id}>
                    <tr className="border-b border-ink/8 last:border-0">
                      <td className="px-6 py-4">
                        <p className="font-medium text-ink">
                          {e.firstName} {e.lastName}
                        </p>
                        <p className="text-ink/55">{e.email}</p>
                        {e.company && <p className="text-ink/40">{e.company}</p>}
                      </td>
                      <td className="px-6 py-4 text-ink/70">{e.category}</td>
                      <td className="px-6 py-4 text-ink/70">{SOURCE_LABELS[e.source]}</td>
                      <td className="px-6 py-4 max-w-xs text-ink/70">
                        {hasAnswers ? (
                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : e.id)}
                            className="font-medium text-teal hover:underline"
                          >
                            {isExpanded ? "Hide details" : "View details"}
                          </button>
                        ) : (
                          e.message || "—"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-ink/55">
                        {formatReceivedDate(e.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={e.status}
                          disabled={updatingId === e.id}
                          onChange={(ev) => handleStatusChange(e.id, ev.target.value as EnquiryStatus)}
                          className="rounded-lg border border-ink/15 bg-surface px-3 py-1.5 text-sm text-ink focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition disabled:opacity-60"
                        >
                          {ENQUIRY_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    {hasAnswers && isExpanded && (
                      <tr className="border-b border-ink/8 bg-surface last:border-0">
                        <td colSpan={6} className="px-6 py-4">
                          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {Object.entries(e.answers!).map(([id, value]) => (
                              <div key={id}>
                                <dt className="text-xs font-medium uppercase tracking-wide text-ink/45">
                                  {answerLabel(e.category, id)}
                                </dt>
                                <dd className="text-sm text-ink/80">{value}</dd>
                              </div>
                            ))}
                          </dl>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

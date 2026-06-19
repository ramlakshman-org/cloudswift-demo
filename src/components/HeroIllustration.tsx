"use client";

export function HeroIllustration() {
  return (
    <div className="relative h-full w-full select-none" aria-hidden>
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(-2deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(1.5deg); }
          50% { transform: translateY(-10px) rotate(1.5deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-18px) rotate(-1deg); }
        }
        @keyframes pulse-ring {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.7); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes bar-grow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        .card-a { animation: floatA 5s ease-in-out infinite; }
        .card-b { animation: floatB 6.5s ease-in-out infinite 0.8s; }
        .card-c { animation: floatC 5.8s ease-in-out infinite 0.4s; }
        .pulse-ring { animation: pulse-ring 2.4s ease-out infinite; }
        .pulse-ring-2 { animation: pulse-ring 2.4s ease-out infinite 1.2s; }
        .dot-blink { animation: blink 1.8s ease-in-out infinite; }
        .bar-1 { animation: bar-grow 0.6s 0.2s ease-out both; transform-origin: bottom; }
        .bar-2 { animation: bar-grow 0.6s 0.4s ease-out both; transform-origin: bottom; }
        .bar-3 { animation: bar-grow 0.6s 0.6s ease-out both; transform-origin: bottom; }
        .bar-4 { animation: bar-grow 0.6s 0.8s ease-out both; transform-origin: bottom; }
        .bar-5 { animation: bar-grow 0.6s 1.0s ease-out both; transform-origin: bottom; }
      `}</style>

      {/* Glow orb background */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
      <div className="absolute right-24 top-1/3 h-48 w-48 rounded-full bg-gold/8 blur-2xl" />

      {/* Connection lines SVG */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 480 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dotted connector lines between cards */}
        <line x1="160" y1="155" x2="260" y2="210" stroke="#012121" strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="310" y1="215" x2="230" y2="300" stroke="#012121" strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="180" y1="310" x2="160" y2="165" stroke="#012121" strokeOpacity="0.10" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Small floating dots on lines */}
        <circle cx="205" cy="178" r="3" fill="#007074" fillOpacity="0.5" />
        <circle cx="270" cy="255" r="3" fill="#C9A961" fillOpacity="0.6" />
        <circle cx="167" cy="235" r="3" fill="#007074" fillOpacity="0.4" />

        {/* Corner grid marks */}
        <rect x="60" y="50" width="8" height="8" rx="1" fill="#012121" fillOpacity="0.07" />
        <rect x="400" y="50" width="8" height="8" rx="1" fill="#012121" fillOpacity="0.07" />
        <rect x="60" y="380" width="8" height="8" rx="1" fill="#012121" fillOpacity="0.07" />
        <rect x="400" y="380" width="8" height="8" rx="1" fill="#012121" fillOpacity="0.07" />
      </svg>

      {/* ── Card A: Azure Cloud ────────────────────────────────── */}
      <div
        className="card-a absolute left-[2%] top-[5%] w-[220px] rounded-2xl border border-ink/8 bg-white/90 p-5 shadow-[0_8px_32px_rgba(1,33,33,0.10)] backdrop-blur-sm"
      >
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0078D4]/10">
            <AzureIcon />
          </div>
          <div>
            <p className="text-[11px] font-medium text-ink/45 uppercase tracking-wider">Microsoft</p>
            <p className="text-[13px] font-semibold text-ink leading-tight">Azure Cloud</p>
          </div>
        </div>
        {/* Sparkline bars */}
        <div className="mb-3 flex items-end gap-[3px] h-10">
          {[55, 70, 45, 85, 60, 90, 75].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-sm bg-[#0078D4]/70 bar-${i + 1}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-ink/45">Infrastructure</span>
          <span className="text-[11px] font-semibold text-[#0078D4]">Optimised ↑</span>
        </div>
      </div>

      {/* ── Card B: Microsoft 365 ─────────────────────────────── */}
      <div
        className="card-b absolute right-[2%] top-[22%] w-[230px] rounded-2xl border border-ink/8 bg-white/92 p-5 shadow-[0_8px_32px_rgba(1,33,33,0.12)] backdrop-blur-sm"
      >
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/10">
            <M365Icon />
          </div>
          <div>
            <p className="text-[11px] font-medium text-ink/45 uppercase tracking-wider">Microsoft</p>
            <p className="text-[13px] font-semibold text-ink leading-tight">365 Workplace</p>
          </div>
        </div>
        {/* Stat row */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-teal/6 px-3 py-2">
            <p className="text-[18px] font-light text-teal leading-none">98.5%</p>
            <p className="text-[10px] text-ink/40 mt-0.5">Uptime SLA</p>
          </div>
          <div className="rounded-lg bg-ink/4 px-3 py-2">
            <p className="text-[18px] font-light text-ink leading-none">24/7</p>
            <p className="text-[10px] text-ink/40 mt-0.5">Support</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="dot-blink h-2 w-2 rounded-full bg-teal" />
          <span className="text-[11px] text-ink/50">All systems operational</span>
        </div>
      </div>

      {/* ── Card C: Managed Cloud ─────────────────────────────── */}
      <div
        className="card-c absolute bottom-[8%] left-[12%] w-[240px] rounded-2xl border border-ink/8 bg-white/90 p-5 shadow-[0_8px_32px_rgba(1,33,33,0.10)] backdrop-blur-sm"
      >
        <div className="mb-3 flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gold/12">
            <ShieldIcon />
            <span className="pulse-ring absolute inset-0 rounded-xl border border-gold/40" />
            <span className="pulse-ring-2 absolute inset-0 rounded-xl border border-gold/25" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-ink/45 uppercase tracking-wider">Managed</p>
            <p className="text-[13px] font-semibold text-ink leading-tight">Cloud Security</p>
          </div>
        </div>
        {/* Progress bars */}
        <div className="space-y-1.5 mb-3">
          {[
            { label: "Threat Detection", val: 94, color: "bg-teal" },
            { label: "Patch Compliance", val: 88, color: "bg-gold" },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[10px] text-ink/40">{row.label}</span>
                <span className="text-[10px] font-medium text-ink/60">{row.val}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-ink/6">
                <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.val}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="dot-blink h-2 w-2 rounded-full bg-gold" style={{ animationDelay: "0.6s" }} />
          <span className="text-[11px] text-ink/50">ISO 9001-2015 Certified</span>
        </div>
      </div>
    </div>
  );
}

function AzureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
      <path d="M7 1L1 13h4.5L9 17l7-13H11L9 8 7 1Z" fill="#0078D4" />
    </svg>
  );
}

function M365Icon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#007074" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#007074" fillOpacity="0.55" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#007074" fillOpacity="0.55" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#C9A961" fillOpacity="0.8" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L3 5v5c0 4 3 7.2 7 8 4-0.8 7-4 7-8V5l-7-3Z" fill="#C9A961" fillOpacity="0.9" />
      <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

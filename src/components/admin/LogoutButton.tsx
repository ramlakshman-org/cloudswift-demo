"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-[6px] border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 transition hover:border-ink/30 hover:text-ink"
    >
      Sign out
    </button>
  );
}

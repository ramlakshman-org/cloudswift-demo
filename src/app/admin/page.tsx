import { isMongoConfigured } from "@/lib/mongodb";
import { listEnquiries, serializeEnquiry } from "@/lib/enquiries";
import { EnquiriesTable } from "@/components/admin/EnquiriesTable";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const configured = isMongoConfigured();
  const enquiries = configured ? await listEnquiries() : [];
  const serialized = enquiries.map(serializeEnquiry);

  return (
    <main className="min-h-screen bg-cream px-6 py-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-ink">Enquiries</h1>
            <p className="text-sm text-ink/55">{serialized.length} total</p>
          </div>
          <LogoutButton />
        </div>

        {!configured ? (
          <div className="rounded-2xl bg-white p-10 text-center text-ink/60 shadow-[0_4px_40px_rgba(1,33,33,0.08)]">
            MongoDB isn&apos;t configured yet — set <code>MONGODB_URI</code> to start collecting enquiries.
          </div>
        ) : (
          <EnquiriesTable initialEnquiries={serialized} />
        )}
      </div>
    </main>
  );
}

import { isMongoConfigured } from "@/lib/mongodb";
import { listEnquiries, serializeEnquiry } from "@/lib/enquiries";
import { EnquiriesDataTable } from "@/components/admin/EnquiriesDataTable";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const configured = isMongoConfigured();
  let serialized: ReturnType<typeof serializeEnquiry>[] = [];
  let dbError: string | null = null;
  if (configured) {
    try {
      const enquiries = await listEnquiries();
      serialized = enquiries.map(serializeEnquiry);
    } catch (err) {
      console.error("[admin/enquiries] Failed to load enquiries:", err);
      dbError = err instanceof Error ? err.message : "Unknown error";
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Enquiries</h1>
        <p className="text-sm text-muted-foreground">{serialized.length} total</p>
      </div>

      {!configured ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            MongoDB isn&apos;t configured yet — set <code>MONGODB_URI</code> to start collecting enquiries.
          </CardContent>
        </Card>
      ) : dbError ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            <p className="font-medium text-red-600 mb-2">Could not connect to the database.</p>
            <p className="text-xs text-muted-foreground">{dbError}</p>
            <p className="mt-3 text-xs">Check that your MongoDB Atlas cluster allows connections from all IPs (0.0.0.0/0) under <strong>Network Access</strong>.</p>
          </CardContent>
        </Card>
      ) : (
        <EnquiriesDataTable initialEnquiries={serialized} />
      )}
    </div>
  );
}

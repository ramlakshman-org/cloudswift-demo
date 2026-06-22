import { isMongoConfigured } from "@/lib/mongodb";
import { listEnquiries, serializeEnquiry } from "@/lib/enquiries";
import { EnquiriesDataTable } from "@/components/admin/EnquiriesDataTable";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const configured = isMongoConfigured();
  const enquiries = configured ? await listEnquiries() : [];
  const serialized = enquiries.map(serializeEnquiry);

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
      ) : (
        <EnquiriesDataTable initialEnquiries={serialized} />
      )}
    </div>
  );
}

import Link from "next/link";
import { isMongoConfigured } from "@/lib/mongodb";
import { listEnquiries, serializeEnquiry, ENQUIRY_STATUSES } from "@/lib/enquiries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge, SourceBadge } from "@/components/admin/badges";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const configured = isMongoConfigured();
  const enquiries = configured ? (await listEnquiries()).map(serializeEnquiry) : [];

  const statusCounts = Object.fromEntries(
    ENQUIRY_STATUSES.map((s) => [s, enquiries.filter((e) => e.status === s).length])
  ) as Record<string, number>;

  const contactCount = enquiries.filter((e) => e.source === "contact").length;
  const assessmentCount = enquiries.filter((e) => e.source === "assessment").length;

  const recent = enquiries.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of incoming leads</p>
      </div>

      {!configured ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            MongoDB isn&apos;t configured yet — set <code>MONGODB_URI</code> to start collecting enquiries.
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Card>
              <CardHeader>
                <CardDescription>Total</CardDescription>
                <CardTitle className="text-3xl">{enquiries.length}</CardTitle>
              </CardHeader>
            </Card>
            {ENQUIRY_STATUSES.map((s) => (
              <Card key={s}>
                <CardHeader>
                  <CardDescription className="capitalize">{s}</CardDescription>
                  <CardTitle className="text-3xl">{statusCounts[s]}</CardTitle>
                </CardHeader>
              </Card>
            ))}
            <Card>
              <CardHeader>
                <CardDescription>Via assessment</CardDescription>
                <CardTitle className="text-3xl">{assessmentCount}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent enquiries</CardTitle>
              <CardDescription>
                {contactCount} via contact form, {assessmentCount} via free assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recent.length === 0 ? (
                <p className="text-sm text-muted-foreground">No enquiries yet.</p>
              ) : (
                <div className="space-y-4">
                  {recent.map((e) => (
                    <div key={e.id} className="flex items-center justify-between gap-4 text-sm">
                      <div>
                        <p className="font-medium">
                          {e.firstName} {e.lastName}
                        </p>
                        <p className="text-muted-foreground">{e.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <SourceBadge source={e.source} />
                        <StatusBadge status={e.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4">
                <Link href="/admin/enquiries" className="text-sm font-medium text-primary hover:underline">
                  View all enquiries →
                </Link>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

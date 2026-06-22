import { Badge } from "@/components/ui/badge";
import type { EnquiryStatus, EnquirySource } from "@/lib/enquiry-shared";

const STATUS_STYLES: Record<EnquiryStatus, string> = {
  new: "border-blue-200 bg-blue-50 text-blue-700",
  contacted: "border-amber-200 bg-amber-50 text-amber-700",
  qualified: "border-purple-200 bg-purple-50 text-purple-700",
  closed: "border-gray-200 bg-gray-100 text-gray-600",
};

export function StatusBadge({ status }: { status: EnquiryStatus }) {
  return (
    <Badge variant="outline" className={STATUS_STYLES[status]}>
      {status}
    </Badge>
  );
}

const SOURCE_LABELS: Record<EnquirySource, string> = {
  contact: "Contact form",
  assessment: "Free assessment",
};

export function SourceBadge({ source }: { source: EnquirySource }) {
  return <Badge variant="secondary">{SOURCE_LABELS[source]}</Badge>;
}

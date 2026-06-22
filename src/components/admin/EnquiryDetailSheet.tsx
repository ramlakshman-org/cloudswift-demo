"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge, SourceBadge } from "@/components/admin/badges";
import { ASSESSMENT_QUESTIONS } from "@/lib/assessment-questions";
import {
  ENQUIRY_STATUSES,
  type EnquiryCategory,
  type EnquiryStatus,
  type SerializedEnquiry,
} from "@/lib/enquiry-shared";

function answerLabel(category: string, questionId: string): string {
  const questions = ASSESSMENT_QUESTIONS[category as EnquiryCategory];
  return questions?.find((q) => q.id === questionId)?.question ?? questionId;
}

interface EnquiryDetailSheetProps {
  enquiry: SerializedEnquiry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (id: string, status: EnquiryStatus) => void;
  updating: boolean;
}

export function EnquiryDetailSheet({
  enquiry,
  open,
  onOpenChange,
  onStatusChange,
  updating,
}: EnquiryDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        {enquiry && (
          <>
            <SheetHeader>
              <SheetTitle>
                {enquiry.firstName} {enquiry.lastName}
              </SheetTitle>
              <SheetDescription>{enquiry.email}</SheetDescription>
            </SheetHeader>

            <div className="space-y-5 px-4">
              <div className="flex items-center gap-2">
                <SourceBadge source={enquiry.source} />
                <StatusBadge status={enquiry.status} />
              </div>

              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Phone</dt>
                  <dd>{enquiry.phone || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Job title</dt>
                  <dd>{enquiry.jobTitle || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Company</dt>
                  <dd>{enquiry.company || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">City</dt>
                  <dd>{enquiry.city || "—"}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs text-muted-foreground">Category</dt>
                  <dd>{enquiry.category}</dd>
                </div>
              </dl>

              {enquiry.answers && Object.keys(enquiry.answers).length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Assessment answers</p>
                  <dl className="space-y-2">
                    {Object.entries(enquiry.answers).map(([id, value]) => (
                      <div key={id}>
                        <dt className="text-xs text-muted-foreground">{answerLabel(enquiry.category, id)}</dt>
                        <dd className="text-sm">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {enquiry.message && (
                <div>
                  <p className="mb-1 text-xs font-medium text-muted-foreground">Message</p>
                  <p className="text-sm">{enquiry.message}</p>
                </div>
              )}

              <div>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">Status</p>
                <Select
                  value={enquiry.status}
                  disabled={updating}
                  onValueChange={(value) => onStatusChange(enquiry.id, value as EnquiryStatus)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ENQUIRY_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

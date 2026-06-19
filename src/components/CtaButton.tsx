import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-rust text-white hover:bg-rust-dark",
  outline:
    "border border-rust text-rust bg-transparent hover:bg-rust hover:text-white",
  ghost: "text-teal hover:text-teal-dark underline-offset-4 hover:underline px-0 py-0",
};

export function CtaButton({
  children,
  href = "#",
  variant = "primary",
  className,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} onClick={onClick}>
      {children}
    </Link>
  );
}

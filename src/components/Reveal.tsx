"use client";

import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

/**
 * Wraps children in a scroll-triggered fade-up, matching the
 * CloudSwift reveal-on-scroll behavior.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

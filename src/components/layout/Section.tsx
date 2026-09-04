import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

interface SectionProps {
  id?: string;
  heading?: string;
  headingId?: string;
  children: ReactNode;
  className?: string;
  recessed?: boolean;
}

export function Section({ id, heading, headingId, children, className, recessed }: SectionProps) {
  const hid = headingId ?? (id ? `${id}-heading` : undefined);
  return (
    <section
      id={id}
      aria-labelledby={heading ? hid : undefined}
      className={cn("py-12 md:py-20", recessed && "bg-navy-midnight", className)}
    >
      <Container>
        {heading && (
          <h2 id={hid} className="text-section mb-6 md:mb-8">
            {heading}
          </h2>
        )}
        {children}
      </Container>
    </section>
  );
}

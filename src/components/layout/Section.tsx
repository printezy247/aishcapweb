import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/Reveal";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  headingId?: string;
  children: ReactNode;
  className?: string;
  /** Alternate surface: recessed midnight instead of the abyss base. */
  recessed?: boolean;
}

export function Section({ id, eyebrow, heading, intro, headingId, children, className, recessed }: SectionProps) {
  const hid = headingId ?? (id ? `${id}-heading` : undefined);
  return (
    <section
      id={id}
      aria-labelledby={heading ? hid : undefined}
      className={cn(
        "scroll-mt-24 border-t hairline py-16 sm:py-24",
        recessed ? "bg-navy-midnight" : "bg-navy-abyss",
        className,
      )}
    >
      <Container>
        {heading && (
          <Reveal className="mb-8 max-w-prose md:mb-12">
            {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
            <h2 id={hid} className="text-section">
              {heading}
            </h2>
            {intro && <p className="mt-3 text-platinum/80">{intro}</p>}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}

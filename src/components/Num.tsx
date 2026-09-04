import { useEffect, useState } from "react";
import NumberFlow, { type NumberFlowProps } from "@number-flow/react";
import { useLocale } from "@/hooks/useLocale";

const intlLocale = { en: "en-MY", ms: "ms-MY" } as const;

/**
 * Odometer-style number that counts up from zero once on first mount, then
 * ticks to any new value. NumberFlow honours prefers-reduced-motion itself.
 * The final value is always the real one; motion only delays it.
 */
export function Num({ value, ...rest }: { value: number } & Omit<NumberFlowProps, "value" | "locales">) {
  const { locale } = useLocale();
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setShown(value));
    return () => window.cancelAnimationFrame(id);
  }, [value]);
  return <NumberFlow value={shown} locales={intlLocale[locale]} {...rest} />;
}

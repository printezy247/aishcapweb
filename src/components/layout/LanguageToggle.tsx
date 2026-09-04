import { useTranslation } from "react-i18next";
import { LOCALES, type Locale } from "@/config/site";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = { en: "EN", ms: "MS" };
const fullNames: Record<Locale, string> = { en: "English", ms: "Bahasa Melayu" };

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation();
  return (
    <div role="group" aria-label={t("nav.language")} className={cn("flex items-center gap-1 text-[14px]", className)}>
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="text-slate/60">|</span>}
          <button
            type="button"
            lang={l}
            aria-label={`${labels[l]}, ${fullNames[l]}`}
            aria-pressed={l === locale}
            onClick={() => l !== locale && setLocale(l)}
            data-track="language_switch"
            data-location={l}
            className={cn(
              "min-h-[44px] min-w-[36px] px-1 font-semibold",
              l === locale ? "text-gold" : "text-slate hover:text-platinum",
            )}
          >
            {labels[l]}
          </button>
        </span>
      ))}
    </div>
  );
}

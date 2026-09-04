import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

export const PRODUCT_SECTIONS = ["overview", "performance", "how-it-works", "fees"] as const;
const LABEL: Record<(typeof PRODUCT_SECTIONS)[number], string> = {
  overview: "overview",
  performance: "performance",
  "how-it-works": "howItWorks",
  fees: "fees",
};

/** Header height plus the sub-nav itself: where a section counts as current. */
const LINE = 130;

/**
 * Apple "localnav": sticky under the global header, section tabs on the
 * left, the page's single gold pill on the right. The header and the mobile
 * sticky bar drop their gold button on this route, so the rule of one gold
 * button per viewport still holds.
 */
export function SubNav() {
  const { t } = useTranslation();
  const [active, setActive] = useState<string>(PRODUCT_SECTIONS[0]);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      let current: string = PRODUCT_SECTIONS[0];
      for (const id of PRODUCT_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= LINE) current = id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="glass-bar sticky top-[60px] z-40 border-b hairline bg-navy-abyss/80">
      <Container className="flex items-center justify-between gap-4">
        <nav aria-label={t("product.subnav.aria")} className="subnav-scroll -mx-5 flex min-w-0 gap-5 overflow-x-auto px-5 pr-10 sm:mx-0 sm:px-0">
          {PRODUCT_SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={cn("nav-link block whitespace-nowrap py-3 text-[14px] text-slate no-underline", active === id && "is-active")}
            >
              {t(`product.subnav.${LABEL[id]}`)}
            </a>
          ))}
        </nav>
        <ButtonLink
          to={SITE.telegramUrl}
          variant="primary"
          className="min-h-[36px] shrink-0 rounded-full px-4 text-[14px]"
          data-track="telegram_click"
          data-location="product-subnav"
        >
          {t("product.subnav.start")}
        </ButtonLink>
      </Container>
    </div>
  );
}

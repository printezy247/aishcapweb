import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { isProductPage } from "@/lib/paths";
import { CT1 } from "@/config/track-record";

/**
 * Mobile-only persistent CTA bar (apple.com "localnav" pattern). Visible only
 * once the hero section has scrolled fully out of view, so the one gold
 * button per viewport rule holds. The hero is re-measured on every scroll
 * and resize, so the bar can never show at the top of the page regardless of
 * mount timing. Hidden on lg+ where the header carries the gold button.
 */
export function StickyCta() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const record = CT1;

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const hero = document.getElementById("hero-heading")?.closest("section");
      const next = hero ? hero.getBoundingClientRect().bottom <= 0 : window.scrollY > 480;
      setVisible(next);
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
  }, [pathname]);

  // The product page's sticky sub-nav carries the gold pill on every viewport.
  if (isProductPage(pathname)) return null;

  return (
    <div
      aria-hidden={!visible}
      className={
        "glass-bar fixed inset-x-0 bottom-0 z-40 border-t hairline-strong bg-navy-abyss/80 transition-transform duration-300 lg:hidden " +
        (visible ? "translate-y-0" : "translate-y-full")
      }
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-site items-center justify-between gap-3 px-5 py-2.5">
        <div className="min-w-0">
          <p className="wdth-semi truncate text-[14px] font-semibold text-platinum">{record.accountName}</p>
          <p className="truncate text-[12px] text-slate">{t("hero.eyebrow")}</p>
        </div>
        <ButtonLink to={SITE.telegramUrl} variant="primary" className="min-h-[42px] shrink-0 px-4 text-[15px]" tabIndex={visible ? 0 : -1} data-track="telegram_click" data-location="sticky">
          {t("buttons.joinTelegram")}
        </ButtonLink>
      </div>
    </div>
  );
}

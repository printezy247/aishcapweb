import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { trackRecordSource } from "@/lib/track-record-source";

/**
 * Mobile-only persistent CTA bar (apple.com "localnav" pattern). Appears once
 * the hero has scrolled out of view, so the one gold button per viewport rule
 * holds: the hero's button is off-screen whenever this one is on.
 * Hidden on lg+ where the header already carries the gold button.
 */
export function StickyCta() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const record = trackRecordSource.getTrackRecord();

  useEffect(() => {
    const hero = document.getElementById("hero-heading")?.closest("section");
    if (hero && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting), { threshold: 0 });
      io.observe(hero);
      return () => io.disconnect();
    }
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={
        "fixed inset-x-0 bottom-0 z-40 border-t hairline-strong bg-navy-abyss/85 backdrop-blur-xl transition-transform duration-300 lg:hidden " +
        (visible ? "translate-y-0" : "translate-y-full")
      }
      style={{ paddingBottom: "env(safe-area-inset-bottom)", WebkitBackdropFilter: "saturate(180%) blur(20px)", backdropFilter: "saturate(180%) blur(20px)" }}
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

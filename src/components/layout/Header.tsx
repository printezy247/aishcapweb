import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useTranslation();
  const { href } = useLocale();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  // Legal is deliberately not a tab (client decision, 2026-09-04): the footer
  // and the inline risk links carry every /legal/* page.
  const items = [
    { to: href("/"), label: t("nav.home"), end: true },
    { to: href("/how-it-works"), label: t("nav.howItWorks"), end: false },
    { to: href("/learn"), label: t("nav.learn"), end: false },
    { to: href("/about"), label: t("nav.about"), end: false },
  ];

  // .nav-link (index.css): text brightens and a rule slides in on hover /
  // focus; gold is reserved for the active tab.
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn("nav-link block whitespace-nowrap py-3 text-[15px] text-slate no-underline md:py-1.5", isActive && "is-active");

  return (
    <header className="glass-bar sticky top-0 z-50 border-b hairline bg-navy-abyss/80">
      <Container className="flex min-h-[60px] items-center justify-between gap-4">
        <NavLink to={href("/")} className="flex items-center no-underline" aria-label={t("nav.home")}>
          <Logo />
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <LanguageToggle />
          {/* Desktop: the single gold button lives in the header. Mobile keeps it in the hero. */}
          <ButtonLink to={SITE.telegramUrl} variant="primary" className="hidden min-h-[40px] px-4 text-[14px] lg:inline-flex" data-track="telegram_click" data-location="header">
            {t("buttons.joinTelegram")}
          </ButtonLink>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-platinum md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("nav.close") : t("nav.menu")}
            onClick={() => setOpen((v) => !v)}
          >
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.75">
              {open ? <path d="M4 4l14 14M18 4L4 18" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
            </svg>
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className="border-t hairline bg-navy-midnight/95 backdrop-blur-md md:hidden"
      >
        <Container className="flex flex-col py-2">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(linkClass({ isActive }), "nav-link--row border-l-2 pl-3", isActive ? "border-gold" : "border-transparent")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </Container>
      </nav>
    </header>
  );
}

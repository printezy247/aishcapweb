import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { Logo } from "@/components/layout/Logo";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useTranslation();
  const { href } = useLocale();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  const current = location.pathname.replace(/\/$/, "");
  const items = [
    { to: href("/"), label: t("nav.home"), end: true, match: undefined as string | undefined },
    { to: href("/how-it-works"), label: t("nav.howItWorks") },
    { to: href("/learn"), label: t("nav.learn") },
    { to: href("/about"), label: t("nav.about") },
    { to: href("/legal/risk"), label: t("nav.legal"), match: "/legal" },
  ];
  const active = (item: (typeof items)[number], isActive: boolean) =>
    item.match ? current.includes(item.match) : isActive || current === item.to;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "block whitespace-nowrap py-3 text-[16px] no-underline md:py-2",
      // Gold only on the active nav indicator, as a bottom rule.
      isActive ? "text-platinum md:border-b-2 md:border-gold" : "text-slate hover:text-platinum",
    );

  return (
    <header className="border-b hairline bg-navy-deep">
      <Container className="flex min-h-[60px] items-center justify-between gap-4">
        <NavLink to={href("/")} className="flex items-center no-underline" aria-label={t("nav.home")}>
          <Logo />
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => linkClass({ isActive: active(item, isActive) })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
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
        className="border-t hairline bg-navy-midnight md:hidden"
      >
        <Container className="flex flex-col py-2">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  linkClass({ isActive: active(item, isActive) }),
                  "border-l-2 pl-3",
                  active(item, isActive) ? "border-gold" : "border-transparent",
                )
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

import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import { StickyCta } from "@/components/layout/StickyCta";
import { useSeo } from "@/hooks/useSeo";

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  useSeo();
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-card focus:bg-navy-raised focus:px-4 focus:py-2 focus:text-platinum"
      >
        {t("nav.skipToContent")}
      </a>
      <Header />
      <main id="main" className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <StickyCta />
      <Analytics />
    </div>
  );
}

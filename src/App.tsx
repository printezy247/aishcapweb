import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Layout } from "@/components/layout/Layout";
import { applyHtmlLang, detectLocale, isLocale } from "@/lib/locale";
import Home from "@/pages/Home";

// Home is in the main chunk for LCP; everything else is lazy.
const CopyTrading = lazy(() => import("@/pages/CopyTrading"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const Learn = lazy(() => import("@/pages/Learn"));
const Article = lazy(() => import("@/pages/Article"));
const About = lazy(() => import("@/pages/About"));
const Risk = lazy(() => import("@/pages/legal/Risk"));
const Affiliate = lazy(() => import("@/pages/legal/Affiliate"));
const Terms = lazy(() => import("@/pages/legal/Terms"));
const Privacy = lazy(() => import("@/pages/legal/Privacy"));
const Confirm = lazy(() => import("@/pages/Confirm"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RedirectToLocale() {
  const location = useLocation();
  const locale = detectLocale();
  const rest = location.pathname === "/" ? "" : location.pathname.replace(/\/$/, "");
  return <Navigate to={`/${locale}${rest}${location.search}${location.hash}`} replace />;
}

function LocaleGate() {
  const { locale } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isLocale(locale)) {
      applyHtmlLang(locale);
      if (i18n.language !== locale) void i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  if (!isLocale(locale)) {
    // Unknown first segment: treat it as a path under the detected locale.
    return <RedirectToLocale />;
  }

  return (
    <Layout>
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-dvh" aria-busy="true" />}>
          <Routes>
          <Route index element={<Home />} />
          <Route path="copy-trading" element={<CopyTrading />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/:slug" element={<Article />} />
          <Route path="about" element={<About />} />
          <Route path="legal/risk" element={<Risk />} />
          <Route path="legal/affiliate" element={<Affiliate />} />
          <Route path="legal/terms" element={<Terms />} />
          <Route path="legal/privacy" element={<Privacy />} />
          <Route path="confirm" element={<Confirm />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RedirectToLocale />} />
        <Route path="/:locale/*" element={<LocaleGate />} />
      </Routes>
    </>
  );
}

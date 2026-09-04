import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLocale } from "@/hooks/useLocale";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";

type State = "working" | "success" | "invalid" | "error";

/** Second half of double opt-in: /confirm?token=… */
export default function Confirm() {
  const { t } = useTranslation();
  const { href } = useLocale();
  const [params] = useSearchParams();
  const [state, setState] = useState<State>("working");
  useDocumentTitle(t("meta.titles.confirm"));

  useEffect(() => {
    const token = params.get("token");
    if (!token || !supabaseConfigured()) {
      setState("invalid");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const supabase = await getSupabase();
        const { data, error } = await supabase.rpc("confirm_subscription", { p_token: token });
        if (cancelled) return;
        if (error) setState("error");
        else setState(data === true ? "success" : "invalid");
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params]);

  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-prose">
        <h1 className="text-display">{t("confirm.heading")}</h1>
        <p role="status" aria-live="polite" className="mt-6 text-platinum/90">
          {t(`confirm.${state}`)}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={href("/")} variant="secondary">
            {t("buttons.backHome")}
          </ButtonLink>
          {state === "error" && (
            <ButtonLink to={SITE.telegramUrl} variant="secondary">
              {t("buttons.messageAdmin")}
            </ButtonLink>
          )}
        </div>
      </div>
    </Container>
  );
}

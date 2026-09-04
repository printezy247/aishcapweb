import { useId, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Reveal";
import { Button, ButtonLink } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { useLocale } from "@/hooks/useLocale";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "duplicate" | "invalid" | "error" | "unconfigured";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Weekly breakdown sign-up. Double opt-in: the row is inserted unconfirmed;
 * a database webhook sends the confirmation email; /confirm?token=… flips it.
 */
export function EmailBlock() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setStatus("invalid");
      return;
    }
    if (!supabaseConfigured()) {
      setStatus("unconfigured");
      return;
    }
    setStatus("submitting");
    try {
      const supabase = await getSupabase();
      const { error } = await supabase
        .from("subscribers")
        .insert({ email: value, locale, source: pathname });
      if (error) {
        setStatus(error.code === "23505" ? "duplicate" : "error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const message: Partial<Record<Status, string>> = {
    success: t("email.success"),
    duplicate: t("email.duplicate"),
    invalid: t("email.invalid"),
    error: t("email.error"),
    unconfigured: t("email.notConfigured"),
  };

  return (
    <Reveal>
      <h3 className="wdth-semi text-[24px] font-semibold leading-tight md:text-[28px]">{t("email.heading")}</h3>
      <p className="mt-2 max-w-prose text-platinum/80">{t("email.body")}</p>
      <form onSubmit={onSubmit} noValidate className="metal-card mt-6 max-w-[560px] rounded-lg p-6 md:p-8">
        <label htmlFor={id} className="mb-2 block text-label text-slate">
          {t("email.label")}
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id={id}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email.placeholder")}
            aria-invalid={status === "invalid"}
            aria-describedby={`${id}-hint ${id}-msg`}
            className="min-h-[48px] flex-1 rounded-card border hairline-strong bg-navy-abyss/70 px-4 text-platinum placeholder:text-slate/60"
          />
          <Button type="submit" variant="secondary" disabled={status === "submitting"}>
            {status === "submitting" ? t("email.submitting") : t("buttons.subscribe")}
          </Button>
        </div>
        <p id={`${id}-hint`} className="mt-3 text-legal text-slate">
          {t("email.frequency")}
        </p>
        <p id={`${id}-msg`} role="status" aria-live="polite" className="mt-3 min-h-[1.5em] text-legal text-platinum">
          {message[status]}
        </p>
        {status === "unconfigured" && (
          <ButtonLink to={SITE.telegramUrl} variant="secondary" className="mt-2">
            {t("buttons.joinTelegram")}
          </ButtonLink>
        )}
      </form>
    </Reveal>
  );
}

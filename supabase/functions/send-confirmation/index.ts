// Supabase Edge Function: send the double opt-in confirmation email.
//
// Wire it as a Database Webhook on `public.subscribers` INSERT.
// Secrets: RESEND_API_KEY, SITE_URL (e.g. https://aishcapital.my), FROM_EMAIL.
// Any transactional email provider works; Resend is used here as the example.

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const row = payload?.record;
    if (!row?.email || !row?.confirm_token) {
      return new Response("ignored", { status: 200 });
    }

    const siteUrl = Deno.env.get("SITE_URL") ?? "";
    const locale = row.locale === "ms" ? "ms" : "en";
    const confirmUrl = `${siteUrl}/${locale}/confirm?token=${row.confirm_token}`;

    const copy = {
      en: {
        subject: "Confirm your Aish Capital subscription",
        body: `You asked for the weekly CT-1 breakdown from Aish Capital.\n\nConfirm here: ${confirmUrl}\n\nIf you did not sign up, ignore this email and nothing will be sent.`,
      },
      ms: {
        subject: "Sahkan langganan Aish Capital anda",
        body: `Anda meminta ulasan mingguan CT-1 daripada Aish Capital.\n\nSahkan di sini: ${confirmUrl}\n\nJika anda tidak mendaftar, abaikan e-mel ini dan tiada apa-apa akan dihantar.`,
      },
    }[locale];

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: Deno.env.get("FROM_EMAIL"),
        to: row.email,
        subject: copy.subject,
        text: copy.body,
      }),
    });

    return new Response(res.ok ? "sent" : "provider error", { status: res.ok ? 200 : 502 });
  } catch (e) {
    return new Response(`error: ${String(e)}`, { status: 500 });
  }
});

// Sends the three site forms (Contact Us, Feedback, Request Missing Paper)
// to a real inbox.
//
// Two providers are supported - use whichever you actually have an account
// for. If both are configured, Web3Forms is tried first.
//
// OPTION A - Web3Forms (what you already have an account + access key for):
//   1. No npm install needed - it's a plain fetch() call, nothing extra to
//      add to package.json.
//   2. Add to your environment (.env.local locally, and in your host's
//      dashboard for production):
//        WEB3FORMS_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//      (this is the "Access Key" shown on your Web3Forms dashboard - the
//      destination inbox is whatever email you used to sign up there, so
//      you don't need to set CONTACT_EMAIL for this option)
//
// OPTION B - Resend (resend.com has a free tier - no card needed):
//   1. npm install resend   <-- required only if you want this option;
//      the import below is dynamic, so skipping this install will NOT
//      break the build as long as WEB3FORMS_ACCESS_KEY is set instead.
//   2. Create a free account at https://resend.com and get an API key.
//   3. Add to your environment:
//        RESEND_API_KEY=re_xxxxxxxxxxxx
//        CONTACT_EMAIL=pastpaperzone@gmail.com          (optional, this is the default)
//        RESEND_FROM_EMAIL=PastPaperZone <onboarding@resend.dev>  (optional for testing;
//          for a "from" address on your own domain you must verify that domain in Resend)
//
// Until either key is set, requests are only logged to the server console
// (as before) so nothing crashes - forms will still say "submitted
// successfully" but no email will actually arrive until a key is added.

const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const TO_EMAIL = process.env.CONTACT_EMAIL || "pastpaperzone@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "PastPaperZone <onboarding@resend.dev>";

async function sendViaWeb3Forms({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: "PastPaperZone",
        // Web3Forms sends the "message" field as plain text, so strip tags
        // from the HTML we already build rather than duplicating every
        // caller's email body in two formats.
        message: html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
        ...(replyTo ? { replyto: replyTo } : {}),
      }),
    });
    const data = await res.json();
    if (!data.success) {
      console.error("[email] Web3Forms rejected the request:", data.message);
    }
    return !!data.success;
  } catch (error) {
    console.error("[email] Web3Forms request failed:", error);
    return false;
  }
}

async function sendViaResend({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  try {
    // Dynamic import so the "resend" package is only required at runtime
    // when RESEND_API_KEY is actually set - if it isn't installed and this
    // branch is never reached, the build won't fail looking for it.
    const { Resend } = await import("resend");
    const resendClient = new Resend(RESEND_API_KEY);

    await resendClient.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    return true;
  } catch (error) {
    console.error("[email] Resend request failed:", error);
    return false;
  }
}

export async function sendSiteEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ sent: boolean }> {
  if (WEB3FORMS_ACCESS_KEY) {
    const sent = await sendViaWeb3Forms({ subject, html, replyTo });
    return { sent };
  }

  if (RESEND_API_KEY) {
    const sent = await sendViaResend({ subject, html, replyTo });
    return { sent };
  }

  console.warn(
    "[email] Neither WEB3FORMS_ACCESS_KEY nor RESEND_API_KEY is set - skipping real send. Message was:",
    subject
  );
  return { sent: false };
}

import { env } from "cloudflare:workers";
import { quoteLimits, validateQuoteValues, type QuoteFormValues } from "@/lib/quote";

const EMAIL_SENDER = "marketing@22energy.org";
const TURNSTILE_ACTION = "quote_form";
const MAX_REQUEST_BYTES = 32_000;

type TurnstileResult = {
  success?: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

function json(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function allowedHostnames(value: string | undefined): Set<string> {
  return new Set(
    (value ?? "22energy.org,www.22energy.org")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean),
  );
}

async function verifyTurnstile(
  token: string,
  secret: string,
  remoteIp: string | null,
): Promise<boolean> {
  const formData = new FormData();
  formData.set("secret", secret);
  formData.set("response", token);
  formData.set("idempotency_key", crypto.randomUUID());
  if (remoteIp) formData.set("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) return false;

  const result = (await response.json()) as TurnstileResult;
  const hostname = result.hostname?.toLowerCase();
  return Boolean(
    result.success &&
      result.action === TURNSTILE_ACTION &&
      hostname &&
      allowedHostnames(env.TURNSTILE_ALLOWED_HOSTNAMES).has(hostname),
  );
}

function formatQuoteEmail(quote: QuoteFormValues): string {
  const line = (label: string, value: string) => `${label}: ${value || "Not provided"}`;

  return [
    "A new quote request was submitted at 22energy.org.",
    "",
    line("Name", quote.fullName),
    line("Phone", quote.phone),
    line("Email", quote.email),
    line("Location", quote.location),
    line("Property type", quote.propertyType),
    line("Energy need", quote.energyNeed),
    line("Preferred solution", quote.preferredSolution),
    "",
    "Additional message:",
    quote.message || "Not provided",
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json({ error: "Request origin was not accepted." }, 403);
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return json({ error: "Expected a JSON request." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return json({ error: "Request is too large." }, 413);
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return json({ error: "Request is too large." }, 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return json({ error: "The request could not be read." }, 400);
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return json({ error: "The quote details were invalid." }, 400);
  }

  const payload = body as Record<string, unknown>;
  const turnstileToken = typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";
  if (!turnstileToken || turnstileToken.length > quoteLimits.turnstileToken) {
    return json({ error: "Please complete the security check." }, 400);
  }

  const validation = validateQuoteValues(payload);
  if (!validation.success) {
    return json({ error: "Please review the highlighted fields.", fieldErrors: validation.errors }, 400);
  }

  if (!env.TURNSTILE_SECRET_KEY) {
    console.error("Quote submission is unavailable: TURNSTILE_SECRET_KEY is not configured.");
    return json({ error: "Quote requests are temporarily unavailable. Please try again later." }, 503);
  }

  let turnstileValid = false;
  try {
    turnstileValid = await verifyTurnstile(
      turnstileToken,
      env.TURNSTILE_SECRET_KEY,
      request.headers.get("cf-connecting-ip"),
    );
  } catch (error) {
    console.error("Turnstile verification failed.", error);
  }

  if (!turnstileValid) {
    return json({ error: "Security verification failed. Please try again." }, 400);
  }

  if (!env.QUOTE_EMAIL || !env.QUOTE_EMAIL_TO) {
    console.error("Quote submission is unavailable: email bindings are not configured.");
    return json({ error: "Quote requests are temporarily unavailable. Please try again later." }, 503);
  }

  try {
    await env.QUOTE_EMAIL.send({
      to: env.QUOTE_EMAIL_TO,
      from: { email: EMAIL_SENDER, name: "22 Energy Website" },
      replyTo: { email: validation.data.email, name: validation.data.fullName },
      subject: "New quote request from 22energy.org",
      text: formatQuoteEmail(validation.data),
    });
  } catch (error) {
    console.error("Quote email delivery failed.", error);
    return json({ error: "We could not send your request. Please try again." }, 502);
  }

  return json({ success: true }, 200);
}

type QuoteEmailAddress = string | { email: string; name?: string };

type QuoteEmailMessage = {
  to: QuoteEmailAddress | QuoteEmailAddress[];
  from: QuoteEmailAddress;
  subject: string;
  text: string;
  html?: string;
  replyTo?: QuoteEmailAddress;
};

type QuoteEmailBinding = {
  send(message: QuoteEmailMessage): Promise<{ messageId: string }>;
};

declare module "cloudflare:workers" {
  export const env: {
    QUOTE_EMAIL?: QuoteEmailBinding;
    QUOTE_EMAIL_TO?: string;
    TURNSTILE_SECRET_KEY?: string;
    TURNSTILE_ALLOWED_HOSTNAMES?: string;
  };
}

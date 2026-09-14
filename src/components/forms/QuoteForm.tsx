"use client";

import { FormEvent, useCallback, useRef, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";
import { company } from "@/data/company";
import {
  energyNeeds,
  initialQuoteValues,
  packagePresets,
  preferredSolutions,
  propertyTypes,
  quoteLimits,
  validateQuoteValues,
  type QuoteFieldErrors,
  type QuoteFormValues,
} from "@/lib/quote";

type FormState = "idle" | "loading" | "success" | "error";

type QuoteApiResponse = {
  success?: boolean;
  error?: string;
  fieldErrors?: QuoteFieldErrors;
};

const inputClasses =
  "w-full rounded-[4px] border border-border bg-white px-3.5 py-2.5 text-[15px] text-navy placeholder:text-text-muted focus:border-gold focus:outline-none transition-colors";
const labelClasses = "mb-1.5 block text-[13px] font-medium text-navy";
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function QuoteForm({ presetSolution }: { presetSolution?: string }) {
  const [values, setValues] = useState<QuoteFormValues>({
    ...initialQuoteValues,
    preferredSolution: presetSolution ?? "",
  });
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [state, setState] = useState<FormState>("idle");
  const [formError, setFormError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const submittingRef = useRef(false);

  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
    if (token) setFormError("");
  }, []);

  function update<K extends keyof QuoteFormValues>(key: K, value: QuoteFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (state === "error") setState("idle");
  }

  function validate(): boolean {
    const result = validateQuoteValues(values);
    if (!result.success) {
      setErrors(result.errors);
      setFormError("Please review the highlighted fields.");
      return false;
    }
    setErrors({});
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current || !validate()) return;

    if (!turnstileSiteKey) {
      setState("error");
      setFormError("Quote requests are temporarily unavailable. Please email us instead.");
      return;
    }

    if (!turnstileToken) {
      setState("error");
      setFormError("Please complete the security check before sending your request.");
      return;
    }

    submittingRef.current = true;
    setState("loading");
    setFormError("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken }),
      });
      const result = (await response.json().catch(() => ({}))) as QuoteApiResponse;

      if (!response.ok || !result.success) {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        throw new Error(result.error || "We could not send your request. Please try again.");
      }

      setState("success");
    } catch (error) {
      setState("error");
      setFormError(
        error instanceof Error ? error.message : "We could not send your request. Please try again.",
      );
      setTurnstileToken("");
      setTurnstileResetKey((key) => key + 1);
    } finally {
      submittingRef.current = false;
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center" role="status">
        <CheckCircle2 className="text-green" size={44} aria-hidden="true" />
        <h3 className="text-[19px] font-bold text-navy">Request received</h3>
        <p className="max-w-[380px] text-[15px] text-text-secondary">
          Thank you, {values.fullName.split(" ")[0] || "there"}. An energy expert will get back to
          you shortly to discuss your requirements.
        </p>
      </div>
    );
  }

  const presetIsCustom =
    values.preferredSolution &&
    !(preferredSolutions as readonly string[]).includes(values.preferredSolution) &&
    (packagePresets as readonly string[]).includes(values.preferredSolution);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-busy={state === "loading"}>
      {state === "error" && formError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-[4px] border border-red-200 bg-red-50 px-3.5 py-3 text-[14px] text-red-700"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{formError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClasses}>
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            className={inputClasses}
            value={values.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            maxLength={quoteLimits.fullName}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            autoComplete="name"
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1 text-[13px] text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone number <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={inputClasses}
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            maxLength={quoteLimits.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            autoComplete="tel"
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-[13px] text-red-600">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          className={inputClasses}
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          maxLength={quoteLimits.email}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          autoComplete="email"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-[13px] text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="location" className={labelClasses}>
          Location <span aria-hidden="true">*</span>
        </label>
        <input
          id="location"
          className={inputClasses}
          placeholder="City / area"
          value={values.location}
          onChange={(event) => update("location", event.target.value)}
          maxLength={quoteLimits.location}
          aria-invalid={!!errors.location}
          aria-describedby={errors.location ? "location-error" : undefined}
          autoComplete="address-level2"
        />
        {errors.location && (
          <p id="location-error" className="mt-1 text-[13px] text-red-600">
            {errors.location}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="propertyType" className={labelClasses}>
            Property type <span aria-hidden="true">*</span>
          </label>
          <select
            id="propertyType"
            className={inputClasses}
            value={values.propertyType}
            onChange={(event) => update("propertyType", event.target.value)}
            aria-invalid={!!errors.propertyType}
            aria-describedby={errors.propertyType ? "propertyType-error" : undefined}
          >
            <option value="">Select one</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.propertyType && (
            <p id="propertyType-error" className="mt-1 text-[13px] text-red-600">
              {errors.propertyType}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="energyNeed" className={labelClasses}>
            Energy need
          </label>
          <select
            id="energyNeed"
            className={inputClasses}
            value={values.energyNeed}
            onChange={(event) => update("energyNeed", event.target.value)}
            aria-invalid={!!errors.energyNeed}
            aria-describedby={errors.energyNeed ? "energyNeed-error" : undefined}
          >
            <option value="">Select one</option>
            {energyNeeds.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
          {errors.energyNeed && (
            <p id="energyNeed-error" className="mt-1 text-[13px] text-red-600">
              {errors.energyNeed}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="preferredSolution" className={labelClasses}>
          Preferred solution
        </label>
        <select
          id="preferredSolution"
          className={inputClasses}
          value={values.preferredSolution}
          onChange={(event) => update("preferredSolution", event.target.value)}
          aria-invalid={!!errors.preferredSolution}
          aria-describedby={errors.preferredSolution ? "preferredSolution-error" : undefined}
        >
          <option value="">Select one</option>
          {presetIsCustom && <option value={values.preferredSolution}>{values.preferredSolution}</option>}
          {preferredSolutions.map((solution) => (
            <option key={solution} value={solution}>
              {solution}
            </option>
          ))}
        </select>
        {errors.preferredSolution && (
          <p id="preferredSolution-error" className="mt-1 text-[13px] text-red-600">
            {errors.preferredSolution}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Additional message
        </label>
        <textarea
          id="message"
          rows={3}
          className={inputClasses}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          maxLength={quoteLimits.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-[13px] text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {turnstileSiteKey ? (
        <TurnstileWidget
          key={turnstileResetKey}
          siteKey={turnstileSiteKey}
          onTokenChange={handleTurnstileToken}
        />
      ) : (
        <p role="alert" className="text-[13px] text-red-600">
          Security verification is not configured. Please contact us at{" "}
          <a className="underline" href={`mailto:${company.contact.email}`}>
            {company.contact.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading" || !turnstileSiteKey}
        className="w-full rounded-[4px] bg-gold px-5 py-3 text-[15px] font-semibold text-navy transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "loading" ? "Sending request…" : "Send Request"}
      </button>
      <p className="text-center text-[12.5px] text-text-muted">
        We&apos;ll use these details only to prepare your quote.
      </p>
    </form>
  );
}

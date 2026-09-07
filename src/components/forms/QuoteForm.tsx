"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  propertyType: string;
  energyNeed: string;
  preferredSolution: string;
  message: string;
};

const initialValues: FormValues = {
  fullName: "",
  phone: "",
  email: "",
  location: "",
  propertyType: "",
  energyNeed: "",
  preferredSolution: "",
  message: "",
};

const propertyTypes = ["Home", "Office", "Shop", "School", "Commercial Facility", "Other"];
const energyNeeds = ["Small", "Medium", "Large", "Commercial", "Not sure"];
const preferredSolutions = [
  "Solar Panels",
  "Battery Storage",
  "Complete Solar System",
  "Commercial System",
  "Not sure",
];

const inputClasses =
  "w-full rounded-[4px] border border-border bg-white px-3.5 py-2.5 text-[15px] text-navy placeholder:text-text-muted focus:border-gold focus:outline-none transition-colors";
const labelClasses = "mb-1.5 block text-[13px] font-medium text-navy";

export function QuoteForm({ presetSolution }: { presetSolution?: string }) {
  const [values, setValues] = useState<FormValues>({
    ...initialValues,
    preferredSolution: presetSolution ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [state, setState] = useState<FormState>("idle");

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!values.phone.trim()) next.phone = "Please enter a phone number.";
    if (!values.email.trim()) {
      next.email = "Please enter an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.location.trim()) next.location = "Please enter your location.";
    if (!values.propertyType) next.propertyType = "Please select a property type.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setState("loading");
    try {
      // Integration point: replace with a real API/server action call, e.g.
      // await fetch("/api/quote", { method: "POST", body: JSON.stringify(values) });
      await new Promise((resolve) => setTimeout(resolve, 900));
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle2 className="text-green" size={44} aria-hidden="true" />
        <h3 className="text-[19px] font-bold text-navy">Request received</h3>
        <p className="max-w-[380px] text-[15px] text-text-secondary">
          Thank you, {values.fullName.split(" ")[0] || "there"}. An energy expert will get back to
          you shortly to discuss your requirements.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {state === "error" && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-[4px] border border-red-200 bg-red-50 px-3.5 py-3 text-[14px] text-red-700"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>Something went wrong sending your request. Please try again.</span>
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
            onChange={(e) => update("fullName", e.target.value)}
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
            onChange={(e) => update("phone", e.target.value)}
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
          onChange={(e) => update("email", e.target.value)}
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
          onChange={(e) => update("location", e.target.value)}
          aria-invalid={!!errors.location}
          aria-describedby={errors.location ? "location-error" : undefined}
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
            onChange={(e) => update("propertyType", e.target.value)}
            aria-invalid={!!errors.propertyType}
            aria-describedby={errors.propertyType ? "propertyType-error" : undefined}
          >
            <option value="">Select one</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
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
            onChange={(e) => update("energyNeed", e.target.value)}
          >
            <option value="">Select one</option>
            {energyNeeds.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
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
          onChange={(e) => update("preferredSolution", e.target.value)}
        >
          <option value="">Select one</option>
          {preferredSolutions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
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
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full rounded-[4px] bg-gold px-5 py-3 text-[15px] font-semibold text-navy transition-colors hover:bg-gold-dark disabled:opacity-60"
      >
        {state === "loading" ? "Sending request…" : "Send Request"}
      </button>
      <p className="text-center text-[12.5px] text-text-muted">
        We&apos;ll use these details only to prepare your quote.
      </p>
    </form>
  );
}

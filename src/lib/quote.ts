export const quoteLimits = {
  fullName: 100,
  phone: 30,
  email: 254,
  location: 120,
  message: 2_000,
  turnstileToken: 2_048,
} as const;

export const propertyTypes = [
  "Home",
  "Office",
  "Shop",
  "School",
  "Commercial Facility",
  "Other",
] as const;

export const energyNeeds = ["Small", "Medium", "Large", "Commercial", "Not sure"] as const;

export const preferredSolutions = [
  "Solar Panels",
  "Battery Storage",
  "Complete Solar System",
  "Commercial System",
  "Not sure",
] as const;

// Pricing cards can preselect these values even though they are not all shown
// in the standard solution dropdown.
export const packagePresets = ["Starter", "Home", "Business", "Custom"] as const;

export type QuoteFormValues = {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  propertyType: string;
  energyNeed: string;
  preferredSolution: string;
  message: string;
};

export type QuoteFieldErrors = Partial<Record<keyof QuoteFormValues, string>>;

export const initialQuoteValues: QuoteFormValues = {
  fullName: "",
  phone: "",
  email: "",
  location: "",
  propertyType: "",
  energyNeed: "",
  preferredSolution: "",
  message: "",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanSingleLine(value: unknown): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function cleanMessage(value: unknown): string {
  return typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : "";
}

export function validateQuoteValues(
  input: unknown,
): { success: true; data: QuoteFormValues } | { success: false; errors: QuoteFieldErrors } {
  if (!isRecord(input)) {
    return { success: false, errors: { fullName: "Please complete the quote form." } };
  }

  const data: QuoteFormValues = {
    fullName: cleanSingleLine(input.fullName),
    phone: cleanSingleLine(input.phone),
    email: cleanSingleLine(input.email).toLowerCase(),
    location: cleanSingleLine(input.location),
    propertyType: cleanSingleLine(input.propertyType),
    energyNeed: cleanSingleLine(input.energyNeed),
    preferredSolution: cleanSingleLine(input.preferredSolution),
    message: cleanMessage(input.message),
  };
  const errors: QuoteFieldErrors = {};

  if (data.fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  } else if (data.fullName.length > quoteLimits.fullName) {
    errors.fullName = `Name must be ${quoteLimits.fullName} characters or fewer.`;
  }

  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!data.phone) {
    errors.phone = "Please enter a phone number.";
  } else if (
    data.phone.length > quoteLimits.phone ||
    !/^[+\d][\d\s().-]*$/.test(data.phone) ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15
  ) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!data.email) {
    errors.email = "Please enter an email address.";
  } else if (
    data.email.length > quoteLimits.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.location.length < 2) {
    errors.location = "Please enter your location.";
  } else if (data.location.length > quoteLimits.location) {
    errors.location = `Location must be ${quoteLimits.location} characters or fewer.`;
  }

  if (!(propertyTypes as readonly string[]).includes(data.propertyType)) {
    errors.propertyType = "Please select a property type.";
  }

  if (data.energyNeed && !(energyNeeds as readonly string[]).includes(data.energyNeed)) {
    errors.energyNeed = "Please select a valid energy need.";
  }

  const allowedSolutions: readonly string[] = [...preferredSolutions, ...packagePresets];
  if (data.preferredSolution && !allowedSolutions.includes(data.preferredSolution)) {
    errors.preferredSolution = "Please select a valid solution.";
  }

  if (data.message.length > quoteLimits.message) {
    errors.message = `Message must be ${quoteLimits.message.toLocaleString()} characters or fewer.`;
  }

  return Object.keys(errors).length > 0
    ? { success: false, errors }
    : { success: true, data };
}

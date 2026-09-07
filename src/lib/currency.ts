export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function formatUsdFrom(amount: number | null): string {
  if (amount === null) return "Tailored pricing";
  return `From $${amount.toLocaleString("en-US")}`;
}

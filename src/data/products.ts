/**
 * Commercial equipment pricing.
 * These figures are supplied directly by 22 Energy in Naira (₦) — do not
 * convert currency or alter the listed names/prices. Add or remove line
 * items here; the UI renders whatever is in these two arrays.
 */
export type CommercialProduct = {
  id: string;
  name: string;
  price: number;
  currency: "NGN";
  category: string;
};

export const commercialInverters: CommercialProduct[] = [
  {
    id: "felicity-ivgm-30kva",
    name: "Felicity IVGM 30KVA 3PHASE",
    price: 8_050_000,
    currency: "NGN",
    category: "30KVA+",
  },
  {
    id: "felicity-ivgm-50kva",
    name: "Felicity IVGM 50KVA 3PHASE",
    price: 10_550_000,
    currency: "NGN",
    category: "50KVA+",
  },
  {
    id: "growatt-hv-50kw",
    name: "Growatt HV 3PHASE 50KW",
    price: 10_600_000,
    currency: "NGN",
    category: "50KVA+",
  },
  {
    id: "growatt-hv-100kw",
    name: "Growatt HV 3PHASE 100KW",
    price: 16_100_000,
    currency: "NGN",
    category: "50KVA+",
  },
  {
    id: "firman-ess-100kw",
    name: "Firman ESS 100KW/200KWH All in one",
    price: 82_000_000,
    currency: "NGN",
    category: "50KVA+",
  },
];

export const lithiumBatteries: CommercialProduct[] = [
  {
    id: "growatt-hv-battery-50kwh",
    name: "Growatt HV BATTERY 50KWH",
    price: 18_000_000,
    currency: "NGN",
    category: "50KWH+",
  },
  {
    id: "growatt-hv-battery-60kwh",
    name: "Growatt HV BATTERY 60KWH",
    price: 19_950_000,
    currency: "NGN",
    category: "50KWH+",
  },
  {
    id: "growatt-hv-battery-150kwh",
    name: "Growatt HV BATTERY 150KWH",
    price: 42_300_000,
    currency: "NGN",
    category: "50KWH+",
  },
  {
    id: "cworth-ess-150kwh",
    name: "Cworth ESS 150KWH 512V",
    price: 27_600_000,
    currency: "NGN",
    category: "50KWH+",
  },
  {
    id: "felicity-60kva-12-batteries",
    name: "Felicity 60KVA All in one + 12pcs batteries",
    price: 21_500_000,
    currency: "NGN",
    category: "50KWH+",
  },
];

// Supplied note: "50KWH & ABOVE +₦5M" — the meaning of this additional figure
// (install/configuration cost vs. a larger-capacity variant) has not been
// confirmed, so it is surfaced as a note rather than folded into any price above.
export const batteryPricingNote =
  "Additional system requirements may affect final pricing. Prices are subject to site requirements, installation and configuration.";

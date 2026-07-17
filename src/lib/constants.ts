export const collection = 'i';
export const default_user_fields = ['t', 'p', 'd', 'q', 's', 'x'];
export const E4_URL = 'https://e4.beeeproject.com';
export const REG_AMOUNT = 90; // TEMP: prod fee set to ₦90 (dev-equivalent) — revert to 15000 after testing
export const DISCOUNT_PCT = 10;
export const COMMISSION_PCT = 10;

// Paystack minimums (NGN, in kobo). Payment min charge = ₦50; dev affiliate
// transfer floor set to ₦40.
export const MIN_PMNT_AMNT = 5000;
export const MIN_TRANSFER_AMNT = 4000;

// In dev a registration costs exactly the minimum payment + minimum transfer
// (₦90), and the affiliate is paid the minimum transfer (₦40).
// DEV_REG_FEE is in kobo (for the Paystack APIs); DEV_REG_FEE_NAIRA is in
// naira for direct UI display (the UI does not divide by 100).
export const DEV_REG_FEE = MIN_PMNT_AMNT + MIN_TRANSFER_AMNT;
export const DEV_REG_FEE_NAIRA = DEV_REG_FEE / 100;

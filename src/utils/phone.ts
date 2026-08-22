import {parsePhoneNumberFromString, type CountryCode} from 'libphonenumber-js/mobile';

/** Shape from `rn-international-phone-number` / `rn-country-select`. */
export type PhoneCountry = {
  cca2?: string;
  idd?: {root?: string; suffixes?: string[]};
};

export function getPhoneCountryIso(country: PhoneCountry | null | undefined, fallback = 'AU'): CountryCode {
  const iso = country?.cca2?.toUpperCase();
  return (iso?.length === 2 ? iso : fallback) as CountryCode;
}

/** Validates national number for country and returns E.164 (same rules as backend). */
export function toPhoneE164(
  nationalNumber: string,
  country: PhoneCountry | null | undefined,
  fallbackIso = 'AU'
): string | null {
  const national = nationalNumber.trim();
  if (!national) return null;

  const phone = parsePhoneNumberFromString(national, getPhoneCountryIso(country, fallbackIso));
  if (!phone?.isValid()) return null;
  return phone.format('E.164');
}

export function isValidNationalPhone(
  nationalNumber: string,
  country: PhoneCountry | null | undefined,
  fallbackIso = 'AU'
): boolean {
  return toPhoneE164(nationalNumber, country, fallbackIso) !== null;
}

if (__DEV__) {
  const inE164 = toPhoneE164('412345678', {cca2: 'AU'});
  if (inE164 !== '+61412345678') throw new Error(`AU mobile E.164 mismatch: ${inE164}`);
  if (toPhoneE164('123', {cca2: 'AU'}) !== null) throw new Error('short AU number should be invalid');
  if (toPhoneE164('9876543210', {cca2: 'IN'}) !== '+919876543210') throw new Error('IN mobile E.164 mismatch');
}

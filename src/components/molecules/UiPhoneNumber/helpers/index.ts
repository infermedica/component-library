import type { Alpha2Code } from 'i18n-iso-countries';
import * as i18nCountries from 'i18n-iso-countries';
import englishCountriesTranslation from 'i18n-iso-countries/langs/en.json';
import countryCodes from 'country-codes-list';

export type PhoneCodeType = {
  code: string,
  countryCode: string,
  country?: string,
 };

export type SupportedCountryCodeType = Lowercase<Alpha2Code>;
export type LanguageDataType = {
  country: SupportedCountryCodeType,
  language: string,
 }

const phoneCodes: Record<string, string>[] = countryCodes.customArray({
  code: '{countryCallingCode}',
  countryCode: '{countryCode}',
});
export const countriesLocales = new Map();
countriesLocales.set('en', englishCountriesTranslation);

export async function getPhoneCodes(languageData: LanguageDataType = {
  language: 'en',
  country: 'us',
}) {
  const {
    language, country,
  } = languageData;

  if (!country) {
    throw new Error('Incorrect country code');
  }

  if (!i18nCountries.langs().includes(language)) {
    throw new Error('No locales provided');
  }

  // initCountries(language);
  return phoneCodes
    .map((item) => ({
      ...item,
      code: `+${item.code.replace(/\s+/g, '').replace('-', '')}`,
      country: i18nCountries.getName(item.countryCode, language),
      countryCode: item.countryCode,
    }))
    .sort((a, b) => {
      if (a.country && b.country) return a.country > b.country ? 1 : -1;

      return 1;
    });
}

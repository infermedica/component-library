import * as i18nCountries from 'i18n-iso-countries';
import countryCodes from 'country-codes-list';

export type PhoneCodeType = {
  code: string,
  countryCode: string,
  country?: string,
 };

const phoneCodes: Record<string, string>[] = countryCodes.customArray({
  code: '{countryCallingCode}',
  countryCode: '{countryCode}',
});

async function initCountries(language: string) {
  const lang = await import(
    `../../../../node_modules/i18n-iso-countries/langs/${language}.json`
  );
  i18nCountries.registerLocale(lang);
}

export async function getPhoneCodes(language = 'en') {
  await initCountries(language);
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

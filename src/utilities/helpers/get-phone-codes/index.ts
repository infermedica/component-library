import * as i18nCountries from 'i18n-iso-countries';
import countryCodes from 'country-codes-list';

type CustomCountryCode = { code: string, countryCode: string } & Record<string, unknown>;
export type PhoneCodeType = CustomCountryCode & Record<'country', string>;

const phoneCodes: PhoneCodeType[] = countryCodes.customArray({
  code: '{countryCallingCode}',
  countryCode: '{countryCode}',
});

async function initCountries(language: string) {
  const lang = await import(
    `../../../../node_modules/i18n-iso-countries/langs/${language}.json`
  );
  i18nCountries.registerLocale(lang);
}

export async function getPhoneCodes(language = 'en'): Promise<(PhoneCodeType & Record<'country', string>)[]> {
  await initCountries(language);
  return phoneCodes
    .map((item) => ({
      ...item,
      code: `+${item.code.replace(/\s+/g, '').replace('-', '')}`,
      country: i18nCountries.getName(item.countryCode, language),
    }))
    .sort((a, b) => (a.country > b.country ? 1 : -1));
}

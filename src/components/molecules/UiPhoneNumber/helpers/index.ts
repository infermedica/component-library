import * as i18nCountries from 'i18n-iso-countries';
import englishCountriesTranslation from 'i18n-iso-countries/langs/en.json';
import countryCodes from 'country-codes-list';

export type PhoneCodeType = {
  code: string,
  countryCode: string,
 };

export type CountryInfoType = {
  code: string,
  country: string,
  countryCode: string,
}

i18nCountries.registerLocale(englishCountriesTranslation);

const phoneCodes: Record<string, string>[] = countryCodes.customArray({
  code: '{countryCallingCode}',
  countryCode: '{countryCode}',
});

function getCountriesInfo(language = 'us') {
  if (!i18nCountries.langs().includes(language)) throw new Error('No locales provided');

  return phoneCodes
    .map((item) => ({
      ...item,
      code: `+${item.code.replace(/\s+/g, '').replace('-', '')}`,
      country: i18nCountries.getName(item.countryCode, language),
      countryCode: item.countryCode,
    }))
    .filter((countryInfo): countryInfo is CountryInfoType => !!countryInfo.country)
    .sort((a, b) => (
      a.country > b.country ? 1 : -1
    ));
}
export {
  i18nCountries,
  getCountriesInfo,
};

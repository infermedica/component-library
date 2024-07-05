import * as i18nCountries from 'i18n-iso-countries';
import type { Alpha2Code } from 'i18n-iso-countries';
import englishCountriesTranslation from 'i18n-iso-countries/langs/en.json';
import countryCodes from 'country-codes-list';

export type PhoneCodeType = {
  code?: string,
  countryCode?: string,
 };

export type CountryInfoType = {
  code: string,
  country: string,
  countryCode: Alpha2Code,
}

i18nCountries.registerLocale(englishCountriesTranslation);

const phoneCodes = countryCodes.customArray({
  code: '{countryCallingCode}',
  countryCode: '{countryCode}' as Alpha2Code,
}) as { code: string, countryCode: Alpha2Code }[];

function getCountriesInfo(countryList: Alpha2Code[], language = 'us') {
  if (!i18nCountries.langs().includes(language)) throw new Error('No locales provided');

  const filteredPhoneCodes = countryList.length
    ? phoneCodes.filter((item) => (countryList.includes(item.countryCode)))
    : phoneCodes;

  return filteredPhoneCodes
    .map((item) => ({
      ...item,
      code: `+${item.code.replace(/\s+/g, '').replace('-', '')}`,
      country: i18nCountries.getName(item.countryCode, language),
      countryCode: item.countryCode,
    }))
    .filter((countryInfo): countryInfo is CountryInfoType => !!countryInfo.country)
    .sort((a, b) => (a.country.localeCompare(b.country)));
}
export {
  i18nCountries,
  getCountriesInfo,
};

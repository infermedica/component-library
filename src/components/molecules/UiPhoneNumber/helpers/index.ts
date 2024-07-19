import countryCodes from 'country-codes-list';

export type PhoneCodeType = {
  code?: string,
  countryCode?: string,
 };

export type CountryInfoType = {
  code: string,
  country: string,
  countryCode: string,
}

const phoneCodes = countryCodes.customArray({
  code: '{countryCallingCode}',
  countryCode: '{countryCode}',
}) as { code: string, countryCode: string }[];

function getCountriesInfo(countryList: string[], language = 'en') {
  const countryTranslations = new Intl.DisplayNames([language, 'en'], { type: 'region' });

  const filteredPhoneCodes = countryList.length
    ? phoneCodes.filter((item) => (countryList.includes(item.countryCode)))
    : phoneCodes;

  return filteredPhoneCodes
    .map((item) => ({
      ...item,
      code: `+${item.code.replace(/\s+/g, '').replace('-', '')}`,
      country: countryTranslations.of(item.countryCode),
      countryCode: item.countryCode,
    }))
    .filter((countryInfo): countryInfo is CountryInfoType => !!countryInfo.country)
    .sort((a, b) => (a.country.localeCompare(b.country)));
}
export {
  i18nCountries,
  getCountriesInfo,
};

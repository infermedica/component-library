import polishCountriesTranslation from 'i18n-iso-countries/langs/pl.json';
import {
  getCountriesInfo,
  i18nCountries,
} from './index';

describe('helpers/getCountriesInfo', () => {
  it('returns an array of phone codes with default settings', async () => {
    const phoneCodes = getCountriesInfo([]);

    expect(phoneCodes).toBeInstanceOf(Array);
    expect(phoneCodes).not.toHaveLength(0);
  });

  it('returns an array of phone codes with the correct language passed', async () => {
    i18nCountries.registerLocale(polishCountriesTranslation);
    const phoneCodes = getCountriesInfo([], 'pl');

    expect(phoneCodes).toBeInstanceOf(Array);
    expect(phoneCodes).not.toHaveLength(0);
  });
});

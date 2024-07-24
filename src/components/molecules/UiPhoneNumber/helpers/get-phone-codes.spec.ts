import { getCountriesInfo } from './index';

describe('helpers/getCountriesInfo', () => {
  it('returns an array of phone codes with default settings', async () => {
    const phoneCodes = getCountriesInfo([]);

    expect(phoneCodes).toBeInstanceOf(Array);
    expect(phoneCodes).not.toHaveLength(0);
  });

  it('returns an array of phone codes with the correct language passed', async () => {
    const phoneCodes = getCountriesInfo([], 'pl');

    expect(phoneCodes).toBeInstanceOf(Array);
    expect(phoneCodes).not.toHaveLength(0);
  });
});

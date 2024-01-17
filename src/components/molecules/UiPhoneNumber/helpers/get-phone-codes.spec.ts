import { getPhoneCodes } from './index';

describe('helpers/getPhoneCodes', () => {
  it('returns an array of phone codes with default settings', async () => {
    const phoneCodes = await getPhoneCodes();

    expect(phoneCodes).toBeInstanceOf(Array);
    expect(phoneCodes).not.toHaveLength(0);
  });

  it('returns an array of phone codes with the correct language passed', async () => {
    const phoneCodes = await getPhoneCodes({
      country: 'us',
      language: 'en',
    });

    expect(phoneCodes).toBeInstanceOf(Array);
    expect(phoneCodes).not.toHaveLength(0);
  });
});

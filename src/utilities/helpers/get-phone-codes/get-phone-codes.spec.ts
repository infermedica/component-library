import { getPhoneCodes } from './index';

describe('helpers/getPhoneCodes', () => {
  it('return array with phone codes with defaults setting', async () => {
    const phoneCodes = await getPhoneCodes();

    expect(phoneCodes).toBeInstanceOf(Array);
    expect(phoneCodes).not.toHaveLength(0);
  });

  it('return array with phone codes with pass correct language', async () => {
    const phoneCodes = await getPhoneCodes({
      country: 'us',
      language: 'en',
    });

    expect(phoneCodes).toBeInstanceOf(Array);
    expect(phoneCodes).not.toHaveLength(0);
  });
});

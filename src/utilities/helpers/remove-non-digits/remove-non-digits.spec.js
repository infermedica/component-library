import { removeNonDigits } from './index';

const cases = [
  ['', ''],
  ['2e', '2'],
  [null, null],
  ['ea2f/', '2'],
  ['2210918', '2210918'],
];

describe('helpers/removeNonDigits', () => {
  test.each(cases)(
    'given %p as arguments, returns %p',
    (input, expectedResult) => {
      const result = removeNonDigits(input);
      expect(result).toEqual(expectedResult);
    },
  );
});

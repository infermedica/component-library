import useInput from './index';

const { getInputAttrs, getRootAttrs } = useInput();

const attrs = {
  class: 'class',
  style: { background: 'red' },
  onBlur: vi.fn,
  onFocus: vi.fn,
  type: 'number',
  max: 6,
  name: 'name',
};

describe('composable/useInput', () => {
  test('return correct attrs for input element', () => {
    const output = {
      onBlur: vi.fn,
      onFocus: vi.fn,
      type: 'number',
      max: 6,
      name: 'name',
    };
    const inputAttrs = getInputAttrs(attrs);
    expect(inputAttrs).toStrictEqual(output);
  });
  test('return correct attrs for root element', () => {
    const output = {
      class: 'class',
      style: { background: 'red' },
    };
    const inputAttrs = getRootAttrs(attrs);
    expect(inputAttrs).toStrictEqual(output);
  });
  test('return empty attrs for input element when parameter is empty', () => {
    const inputAttrs = getInputAttrs({});
    expect(inputAttrs).toStrictEqual({});
  });
  test('return empty attrs for root element when parameter is empty', () => {
    const rootAttrs = getRootAttrs({});
    expect(rootAttrs).toStrictEqual({});
  });
  test('thrown error when parameter for input element is null', () => {
    expect(() => getInputAttrs(null)).toThrow(Error);
  });
  test('thrown error when parameter for input element is undefined', () => {
    expect(() => getInputAttrs(undefined)).toThrow(Error);
  });
  test('thrown error when parameter for root element is null', () => {
    expect(() => getRootAttrs(null)).toThrow(Error);
  });
  test('thrown error when parameter for root element is undefined', () => {
    expect(() => getRootAttrs(undefined)).toThrow(Error);
  });
});

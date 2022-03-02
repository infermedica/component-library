import { capitalizeFirst } from './index';

const text = 'Test test Test';
const lowerText = 'test test Test';

describe('helpers/capitalizeFirst', () => {
  it('return string with first letter capitalized when first is lowercase', () => {
    const string = capitalizeFirst(lowerText);
    expect(string).toBe(text);
  });
  it('return string when first letter is capitalize', () => {
    const string = capitalizeFirst(text);
    expect(string).toBe(text);
  });
  it('return string when number is first char', () => {
    const string = capitalizeFirst(`9${lowerText}`);
    expect(string).toBe(`9${lowerText}`);
  });
  it('return string when special character is first', () => {
    const string = capitalizeFirst(`^${lowerText}`);
    expect(string).toBe(`^${lowerText}`);
  });
  it('return string when white space is first', () => {
    const string = capitalizeFirst(` ${lowerText}`);
    expect(string).toBe(` ${lowerText}`);
  });
  it('return empty string', () => {
    const string = capitalizeFirst('');
    expect(string).toBe('');
  });
  it('thrown type error when parameter is undefined', () => {
    expect(() => capitalizeFirst(undefined)).toThrow(TypeError);
  });
  it('thrown type error when parameter is null', () => {
    expect(() => capitalizeFirst(null)).toThrow(TypeError);
  });
  it('thrown type error when parameter is type number', () => {
    expect(() => capitalizeFirst(9)).toThrow(TypeError);
  });
});

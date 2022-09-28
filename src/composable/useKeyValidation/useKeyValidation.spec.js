import useKeyValidation from './index';

const { numbersOnly } = useKeyValidation();

describe('composable/useKeyValidation', () => {
  test('pressed key is digit', () => {
    const keydownEvent = {
      preventDefault: vi.fn(),
      key: '2',
    };
    numbersOnly(keydownEvent);
    expect(keydownEvent.preventDefault).not.toHaveBeenCalled();
  });
  test('pressed key is different than digit', () => {
    const keydownEvent = {
      preventDefault: vi.fn(),
      key: 'b',
    };
    numbersOnly(keydownEvent);
    expect(keydownEvent.preventDefault).toHaveBeenCalled();
  });
  test('pressed key value length is greater than 1', () => {
    const keydownEvent = {
      preventDefault: vi.fn(),
      key: 'shift',
    };
    numbersOnly(keydownEvent);
    expect(keydownEvent.preventDefault).not.toHaveBeenCalled();
  });
});

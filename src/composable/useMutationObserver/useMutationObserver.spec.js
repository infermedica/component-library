import useMutationObserver from './index';

describe('composable/useMutationObserver', () => {
  test("not supported when window doesn't have IntersectionObserver property", () => {
    const { isSupported } = useMutationObserver();
    expect(isSupported).toBe(false);
  });
  test('no mutation observer added when not supported', () => {
    const mutationObserverMock = jest.fn(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
    }));
    window.MutationObserver = mutationObserverMock;
    useMutationObserver('<div></div>');
    expect(mutationObserverMock).not.toHaveBeenCalled();
  });
  test('supported when window have property IntersectionObserver', () => {
    window.IntersectionObserver = jest.fn();
    const { isSupported } = useMutationObserver();
    expect(isSupported).toBe(true);
  });
  test('mutation observer added when supported', () => {
    window.IntersectionObserver = jest.fn();
    const mutationObserverMock = jest.fn(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
    }));
    window.MutationObserver = mutationObserverMock;
    useMutationObserver('<div></div>');
    expect(mutationObserverMock).toHaveBeenCalledTimes(1);
  });
});

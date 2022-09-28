import useMutationObserver from './index';

describe('composable/useMutationObserver', () => {
  test("not supported when window doesn't have IntersectionObserver property", () => {
    const { isSupported } = useMutationObserver();
    expect(isSupported).toBe(false);
  });
  test('no mutation observer added when not supported', () => {
    const mutationObserverMock = vi.fn(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
    }));
    window.MutationObserver = mutationObserverMock;
    useMutationObserver('<div></div>');
    expect(mutationObserverMock).not.toHaveBeenCalled();
  });
  test('supported when window have property IntersectionObserver', () => {
    window.IntersectionObserver = vi.fn();
    const { isSupported } = useMutationObserver();
    expect(isSupported).toBe(true);
  });
  test('mutation observer added when supported', () => {
    window.IntersectionObserver = vi.fn();
    const mutationObserverMock = vi.fn(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
    }));
    window.MutationObserver = mutationObserverMock;
    useMutationObserver('<div></div>');
    expect(mutationObserverMock).toHaveBeenCalledTimes(1);
  });
});

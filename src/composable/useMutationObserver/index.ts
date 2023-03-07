import {
  unref,
  watch,
  getCurrentScope,
  onScopeDispose,
} from 'vue';
import type {
  Ref,
  ComponentPublicInstance,
} from 'vue';

const tryOnScopeDispose = (fn: () => void) => {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
};

const unrefElement = (elRef: Ref<HTMLElement | ComponentPublicInstance | null>) => {
  const plain = unref(elRef);
  return plain && '$el' in plain
    ? plain.$el
    : plain;
};

export default function useMutationObserver(
  target: Ref<HTMLElement | ComponentPublicInstance | null>,
  callback: () => void,
  options?: MutationObserverInit,
) {
  let observer: MutationObserver | undefined;
  const isSupported = window && 'IntersectionObserver' in window;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  const stopWatch = watch(
    () => unrefElement(target),
    (el: HTMLElement) => {
      cleanup();

      if (isSupported && window && el) {
        observer = new window.MutationObserver(callback);
        observer.observe(el, options);
      }
    },
    { immediate: true },
  );

  const stop = () => {
    cleanup();
    stopWatch();
  };

  tryOnScopeDispose(stop);

  return {
    isSupported,
    stop,
  };
}

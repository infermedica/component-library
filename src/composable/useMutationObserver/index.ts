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

function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

function unrefElement(elRef: Ref<HTMLElement | ComponentPublicInstance>) {
  const plain = unref(elRef);
  return (plain as ComponentPublicInstance)?.$el ?? plain;
}

export default function useMutationObserver(
  target: Ref<HTMLElement | ComponentPublicInstance>,
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
    (el) => {
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

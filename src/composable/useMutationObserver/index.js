import {
  unref,
  watch,
  getCurrentScope,
  onScopeDispose,
} from 'vue';

function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

function unrefElement(elRef) {
  const plain = unref(elRef);
  return plain?.$el ?? plain;
}

export default function useMutationObserver(target, callback, options) {
  let observer;
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
    {
      immediate: true,
    },
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

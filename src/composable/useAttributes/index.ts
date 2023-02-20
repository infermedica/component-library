import {
  computed,
  useAttrs,
} from 'vue';
import type {
  HTMLAttributes,
  Events,
} from 'vue';
import type { Attrs } from '../../types';

type EventHandlers = {
  [K in keyof Events]?: HTMLAttributes[K];
}

export default function useAttributes<T = HTMLAttributes>() {
  const attributes = useAttrs();
  const filteredAttributes = computed(() => Object.keys(attributes)
    .reduce((acc, key) => {
      if ((key).startsWith('on')) {
        acc.listeners[key] = attributes[key];
      } else {
        acc.attrs[key] = attributes[key];
      }
      return acc;
    }, {
      attrs: {} as Record<string, unknown>,
      listeners: {} as Record<string, unknown>,
    }) as { attrs: Attrs<Omit<T, keyof EventHandlers>>; listeners: EventHandlers });
  const attrs = computed(() => filteredAttributes.value.attrs);
  const listeners = computed(() => filteredAttributes.value.listeners);
  return {
    attrs,
    listeners,
  };
}

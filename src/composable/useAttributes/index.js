import {
  computed,
  useAttrs,
} from 'vue';

export default function useAttributes() {
  const attributes = useAttrs();
  const filteredAttributes = computed(() => Object.keys(attributes)
    .reduce((acc, key) => {
      if (key.startsWith('on')) {
        acc.listeners[key] = attributes[key];
      } else {
        acc.attrs[key] = attributes[key];
      }
      return acc;
    }, {
      listeners: {},
      attrs: {},
    }));
  const attrs = computed(() => filteredAttributes.value.attrs);
  const listeners = computed(() => filteredAttributes.value.listeners);
  return {
    attrs,
    listeners,
  };
}

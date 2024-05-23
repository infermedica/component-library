import {
  computed,
  useAttrs,
} from "vue";

export function useArgs(excludedAttrs:string[] = []) {
  const attrs = useAttrs();
  const args = computed(() => (Object.keys(attrs).reduce((object, key) => {
    if (!excludedAttrs.includes(key)) {
      return {
        ...object,
        [key]: attrs[key],
      };
    }
    return object;
  }, {})));
  return {
    attrs,
    args
  }
}
import {
  computed,
  useAttrs,
  toRefs,
} from 'vue';

export function useStories() {
  const attrs = useAttrs();
  const args = computed(() => (attrs));
  const {
    content,
    icon,
    iconEnd,
  } = toRefs(attrs);
  return {
    args,
    content,
    icon,
    iconEnd,
  };
}

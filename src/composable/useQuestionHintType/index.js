import { computed } from 'vue';

export default function useLink(invalid) {
  const hintType = computed(() => (invalid ? 'error' : 'default'));

  return {
    hintType,
  };
}

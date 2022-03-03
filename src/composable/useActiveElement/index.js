import {
  ref,
  readonly,
  onMounted,
  onUnmounted,
} from 'vue';

export default function useActiveElement() {
  const activeElement = ref(null);

  const handleBlur = () => {
    activeElement.value = null;
  };

  const handleFocus = () => {
    activeElement.value = window.document.activeElement;
  };

  onMounted(() => {
    window.document.addEventListener('blur', handleBlur, true);
    window.document.addEventListener('focus', handleFocus, true);
  });

  onUnmounted(() => {
    window.document.removeEventListener('blur', handleBlur);
    window.document.removeEventListener('focus', handleFocus);
  });

  return readonly(activeElement);
}

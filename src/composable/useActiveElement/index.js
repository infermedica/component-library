import {
  onMounted, onUnmounted, readonly, ref,
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
    window.addEventListener('blur', handleBlur, true);
    window.addEventListener('focus', handleFocus, true);
  });

  onUnmounted(() => {
    window.removeEventListener('blur', handleBlur);
    window.removeEventListener('focus', handleFocus);
  });

  return readonly(activeElement);
}

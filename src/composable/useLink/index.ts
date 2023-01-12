import { computed } from 'vue';
import type { ButtonProps } from '@/components/atoms/UiButton/UiButton.vue';
import type { LinkProps } from '@/components/atoms/UiLink/UiLink.vue';

export default function useLink(props: ButtonProps | LinkProps) {
  const componentTag = computed(() => {
    if (props.href) {
      return 'a';
    }
    if (props.to) {
      return 'router-link';
    }
    return props.tag;
  });
  const routeAttrs = computed(() => {
    if (props.href) {
      return { href: props.href };
    }
    if (props.to) {
      return { to: props.to };
    }
    return {};
  });

  return {
    componentTag,
    routeAttrs,
  };
}

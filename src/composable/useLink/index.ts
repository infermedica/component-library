import { computed } from 'vue';
import type { HTMLTag } from '../../types/tag';

export interface UseLinkProps {
  tag: HTMLTag;
  to?: string | Record<string, unknown>;
  href?: string;
}
export default function useLink(props: UseLinkProps) {
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

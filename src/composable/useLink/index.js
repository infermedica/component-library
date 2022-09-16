import { computed } from 'vue';

export default function useLink(props) {
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
      return {
        href: props.href,
      };
    }
    if (props.to) {
      return {
        to: props.to,
      };
    }
    return {
    };
  });

  return {
    componentTag,
    routeAttrs,
  };
}

<template>
  <component
    :is="is"
    v-bind="route"
    class="ui-link"
  >
    <slot />
  </component>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiLink',
  props: {
    /**
     * Use this props to set tag when a component shouldn't be a link.
     */
    tag: {
      type: [String, Object],
      default: '',
    },
    /**
     * Use this props to set route for internal link.
     */
    to: {
      type: [String, Object],
      default: '',
    },
    /**
     * Use this props to set route for external link.
     */
    href: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const is = computed(() => {
      if (props.tag) {
        return props.tag;
      }
      return props.href
        ? 'a'
        : 'router-link';
    });
    const route = computed(() => {
      if (props.tag) {
        return {};
      }
      return props.href
        ? { href: props.href }
        : { to: props.to };
    });
    return { is, route };
  },
};
</script>

<style lang="scss">
.ui-link {
  display: inline-flex;
  font: var(--link-font, var(--font-body-1));
  color: var(--link-color, inherit);
  text-decoration: var(--link-text-decoration, none);

  &:focus {
    outline: none;
    box-shadow: var(--box-shadow-outline);
  }
}
</style>

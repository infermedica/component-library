<template>
  <component
    :is="componentTag"
    v-bind="routeAttrs"
    class="ui-link"
  >
    <!-- @slot Use this slot to place content inside link. -->
    <slot />
  </component>
</template>

<script>
import useLink from '../../../composable/useLink';

export default {
  name: 'UiLink',
  props: {
    /**
     * Use this props to set tag when a component shouldn't be a link.
     */
    tag: {
      type: [String, Object],
      default: 'span',
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
    const { componentTag, routeAttrs } = useLink(props);
    return { componentTag, routeAttrs };
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

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
@import '../../../styles/mixins/_mixins.scss';

.ui-link {
  @include font(--font-body-1);
  $this: &;

  display: inline-flex;
  align-items: center;
  color: var(--link-color, inherit);
  text-decoration: var(--link-text-decoration, none);

  &:hover {
    color: var(--link-hover-color, var(--color-text-link-primary-hover));

    &#{$this}--has-icon {
      --icon-color: var(--link-icon-hover-color, var(--color-icon-primary-hover));
    }
  }

  &:active {
    color: var(--link-active-color, var(--color-text-link-primary-active));

    &#{$this}--has-icon {
      --icon-color: var(--link-icon-active-color, var(--color-text-link-primary-active));
    }
  }

  &:focus {
    outline: none;
    box-shadow: var(--box-shadow-outline);
    border-radius: var(--border-radius-form);
  }

  &__icon {
    --icon-size: var(--link-icon-size, var(--space-24));

    // adds negative left margin to position icon within link and avoid changing padding
    margin: var(--link-icon-margin, 0 var(--space-4) 0 calc(var(--space-8) * -1));

    &--right {
      // adds negative right margin to position icon within link and avoid changing padding
      --link-icon-margin: 0 calc(var(--space-8) * -1) 0 var(--space-4);
    }
  }

  &--has-icon {
    --icon-color: var(--link-icon-color, var(--color-icon-primary));
    --icon-size: var(--link-icon-size, var(--space-24));
  }

  &--small {
    @include font(--font-body-2-comfortable);
  }

  &--secondary {
    --link-color: var(--color-text-action-secondary-enabled);
    --link-hover-color: var(--color-text-action-secondary-hover);
    --link-active-color: var(--color-text-action-secondary-active);

    &#{$this}--has-icon {
      --link-icon-color: var(--color-icon-secondary);
      --link-icon-hover-color: var(--color-icon-secondary-hover);
      --link-icon-active-color: var(--color-icon-secondary-active);
    }

    &#{$this}--is-disabled {
      --link-icon-color: var(--color-icon-disabled);
      --link-icon-hover-color: var(--color-icon-disabled);
      --link-icon-active-color: var(--color-icon-disabled);
    }
  }

  &--is-disabled {
    --link-color: var(--color-ui-disabled);
    --link-hover-color: var(--color-ui-disabled);
    --link-active-color: var(--color-ui-disabled);

    cursor: not-allowed;
  }
}
</style>

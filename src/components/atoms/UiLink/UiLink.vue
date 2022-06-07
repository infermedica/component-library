<template>
  <component
    :is="componentTag"
    v-keyboard-focus
    v-bind="routeAttrs"
    class="ui-link"
  >
    <!-- @slot Use this slot to place content inside link. -->
    <slot />
  </component>
</template>

<script setup>
import useLink from '../../../composable/useLink';
import { keyboardFocus as vKeyboardFocus } from '../../../utilities/directives';

const props = defineProps({
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
});
const { componentTag, routeAttrs } = useLink(props);
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-link {
  @include font(link, body-1);

  $this: &;

  display: var(--link-display, inline);
  border-radius: var(--link-border-radius, var(--border-radius-button));
  color: var(--link-color, var(--color-text-action-primary));
  text-decoration: var(--link-text-decoration, none);
  vertical-align: var(--link-vertical-align, top);
  word-break: var(--link-word-break, break-all);

  @supports (overflow-wrap: anywhere) {
    overflow-wrap: var(--link-overflow-wrap, anywhere);
    word-break: normal;
  }

  @media (hover: hover) {
    &:hover {
      color: var(--link-hover-color, var(--color-text-action-primary-hover));

      &#{$this}--has-icon {
        --icon-color: var(--link-icon-hover-color, var(--color-icon-primary-hover));
      }
    }
  }

  &:active {
    color: var(--link-active-color, var(--color-text-action-primary-active));

    &#{$this}--has-icon {
      --icon-color: var(--link-icon-active-color, var(--color-text-action-primary-active));
    }
  }

  &:focus {
    outline: none;
  }

  @include focus {
    box-shadow: var(--focus-outer);
  }

  &__icon {
    --icon-size: var(--link-icon-size, var(--space-24));

    margin: var(--link-icon-margin, 0 var(--space-4) 0 0);
    vertical-align: var(--link-icon-vertical-align, top);

    [dir="rtl"] & {
      margin: var(--link-icon-margin, 0 0 0 var(--space-4));
    }

    &--right {
      // adds negative right margin to position icon within link and avoid changing padding
      --link-icon-margin: 0 0 0 var(--space-4);

      [dir="rtl"] & {
        --link-icon-margin: 0 var(--space-4) 0 0;
      }
    }
  }

  &--has-icon {
    --icon-color: var(--link-icon-color, var(--color-icon-primary));
    --icon-size: var(--link-icon-size, var(--space-24));
  }

  &--small {
    --link-font: var(--font-body-2-comfortable);
    --link-letter-spacing: var(--letter-spacing-body-2-comfortable);
  }

  &--secondary {
    --link-color: var(--color-text-action-secondary);
    --link-hover-color: var(--color-text-action-secondary-hover);
    --link-active-color: var(--color-text-action-secondary-active);
    --link-icon-color: var(--color-icon-secondary);
    --link-icon-hover-color: var(--color-icon-secondary-hover);
    --link-icon-active-color: var(--color-icon-secondary-active);
  }

  &--is-disabled {
    --link-color: var(--color-text-disabled);
    --link-hover-color: var(--color-text-disabled);
    --link-active-color: var(--color-text-disabled);
    --link-icon-color: var(--color-icon-disabled);
    --link-icon-hover-color: var(--color-icon-disabled);
    --link-icon-active-color: var(--color-icon-disabled);

    cursor: not-allowed;
  }
}
</style>

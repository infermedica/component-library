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

<script setup lang="ts">
// https://www.figma.com/file/54rgvRJfBBagt4F34rrp1s/Core-Component-Library?node-id=2%3A3027
import type { PropType } from 'vue';
import type { HTMLTag } from '../../../types/tag';
import useLink from '../../../composable/useLink';
import { keyboardFocus as vKeyboardFocus } from '../../../utilities/directives';

const props = defineProps({
  /**
   * Use this props to set tag when a component shouldn't be a link.
   */
  tag: {
    type: [
      String,
      Object,
    ] as PropType<HTMLTag | Record<string, unknown>>,
    default: 'span',
  },
  /**
   * Use this props to set route for internal link.
   */
  to: {
    type: [
      String,
      Object,
    ] as PropType<string | Record<string, unknown>>,
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
const {
  componentTag, routeAttrs,
} = useLink(props);
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-link {
  $this: &;
  $element: link;

  @include mixins.inner-border($element, $color: transparent, $width: 0, $radius: var(--border-radius-button));
  @include mixins.font($element, body-1);

  display: inline;
  color: functions.var($element, color, var(--color-text-action-primary));
  text-decoration: none;
  transition: color 150ms ease-in-out;
  vertical-align: top;
  white-space: normal;
  word-break: break-all;

  @supports (overflow-wrap: anywhere) {
    overflow-wrap: anywhere;
    word-break: normal;
  }

  @include mixins.with-hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  @include mixins.focus {
    box-shadow: var(--focus-outer);
  }

  @include mixins.hover {
    color: functions.var($element + "-hover", color, var(--color-text-action-primary-hover));

    #{$this}__icon {
      --icon-color: #{functions.var($element + "-hover-icon", color, var(--color-icon-primary-hover))};
    }
  }

  &:active {
    color: functions.var($element + "-active", color, var(--color-text-action-primary-active));

    #{$this}__icon {
      --icon-color: #{functions.var($element + "-active-icon", color, var(--color-icon-primary-active))};
    }
  }

  &__icon {
    --icon-color: #{functions.var($element + "-icon", color, var(--color-icon-primary))};

    flex: none;
    margin: functions.var($element + "-icon", margin, 0 var(--space-4) 0 0);
    transition: fill 150ms ease-in-out;
    vertical-align: top;

    [dir="rtl"] & {
      margin: functions.var($element + "-rtl-icon", margin, 0 0 0 var(--space-4));
    }

    &--right {
      margin: functions.var($element + "-icon", margin, 0 0 0 var(--space-4));

      [dir="rtl"] & {
        margin: functions.var($element + "-rtl-icon", margin, 0 var(--space-4) 0 0);
      }
    }
  }

  @at-root [class*="-secondary"] {
    #{$this},
    &#{$this} {
      --color-text-action-primary: var(--color-text-action-secondary);
      --color-text-action-primary-hover: var(--color-text-action-secondary-hover);
      --color-text-action-primary-active: var(--color-text-action-secondary-active);
      --color-icon-primary: var(--color-icon-secondary);
      --color-icon-primary-hover: var(--color-icon-secondary-hover);
      --color-icon-primary-active: var(--color-icon-secondary-active);
    }
  }

  @at-root [class*="-brand"] {
    #{$this},
    &#{$this} {
      --color-text-action-primary: var(--color-text-on-brand);
      --color-text-action-primary-hover: var(--color-text-on-brand-hover);
      --color-text-action-primary-active: var(--color-text-on-brand-active);
      --color-icon-primary: var(--color-icon-on-brand);
      --color-icon-primary-hover: var(--color-icon-on-brand-hover);
      --color-icon-primary-active: var(--color-icon-on-brand-active);
    }
  }
}
</style>

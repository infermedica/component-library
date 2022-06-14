<template>
  <component
    :is="componentTag"
    v-keyboard-focus
    v-bind="routeAttrs"
    class="ui-button"
  >
    <!-- @slot Use this slot to place content inside button. -->
    <slot />
  </component>
</template>

<script setup>
import useLink from '../../../composable/useLink';
import { keyboardFocus as vKeyboardFocus } from '../../../utilities/directives';

const props = defineProps({
  /**
   * Use this props to set tag when a component shouldn't be a button.
   */
  tag: {
    type: [String, Object],
    default: 'button',
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

.ui-button {
  @include inner-border($element: button, $color: transpatent, $width: 0, $radius: var(--border-radius-button));
  @include font(body-1-thick);

  $this: &;

  position: relative;
  display: var(--button-display, inline-flex);
  width: var(--button-width);
  height: var(--button-height);
  align-items: var(--button-align-items, center);
  justify-content: var(--button-justify-content, center);
  padding: var(--button-padding, var(--space-12) var(--space-32));
  background:
    var(
      --button-background,
      var(--color-background-action)
    );
  color: var(--button-color, var(--color-text-on-action));
  cursor: var(--button-cursor, pointer);
  text-align: var(--button-text-align, center);
  text-decoration: var(--button-text-decoration, none);
  text-transform: var(--button-text-transform);
  transition:
    var(
      --toggle-button-transition,
      (background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out,
      color 0.15s ease-in-out)
    );
  vertical-align: var(--button-vertical-align, top);
  white-space: var(--button-white-space, normal);
  word-break: var(--button-word-break, break-all);

  @supports (overflow-wrap: anywhere) {
    overflow-wrap: var(--button-overflow-wrap, anywhere);
    word-break: normal;
  }

  @media (hover: hover) {
    &:hover {
      background: var(--button-hover-background, var(--color-background-action-hover));
      color: var(--button-hover-color, var(--color-text-on-action));

      --button-border:
        var(
          --button-hover-border,
          var(--button-hover-border-style, solid) var(--button-hover-border-color, transparent)
        );

      &#{$this}--has-icon {
        --icon-color: var(--button-icon-color-hover, var(--color-icon-primary-hover));
      }
    }
  }

  &:active {
    background: var(--button-active-background, var(--color-background-action-active));
    color: var(--button-active-color, var(--color-text-on-action));

    --button-border:
      var(
        --button-active-border,
        var(--button-active-border-style, solid) var(--button-active-border-color, transparent)
      );

    &#{$this}--has-icon {
      --icon-color: var(--button-icon-color-active, var(--color-icon-primary-active));
    }
  }

  &:focus {
    z-index: var(--button-focus-z-index, 1);
    box-shadow: var(--focus-outer);
    outline: none;
  }

  &__icon {
    --icon-size: var(--button-icon-size, 1.5rem);

    margin: var(--button-icon-margin, 0 var(--space-4) 0 calc(var(--space-8) * -1));

    [dir="rtl"] & {
      margin: var(--button-icon-margin, 0 calc(var(--space-8) * -1) 0 var(--space-4));
    }

    &--right {
      // adds negative right margin to position icon within button and avoid changing padding
      --button-icon-margin: 0 calc(var(--space-8) * -1) 0 var(--space-4);

      [dir="rtl"] & {
        --button-icon-margin: 0 var(--space-4) 0 calc(var(--space-8) * -1);
      }
    }
  }

  &--small {
    @include font(body-2-comfortable);

    --button-padding: var(--space-8) var(--space-20);
  }

  &--is-disabled {
    --button-background: var(--color-background-disabled);
    --button-hover-background: var(--color-background-disabled);
    --button-active-background: var(--color-background-disabled);

    cursor: not-allowed;
  }

  &--has-icon {
    --icon-color: var(--button-icon-color, var(--color-icon-primary));
    --icon-size: var(--button-icon-size, 1.5rem);
  }

  &--outlined {
    --button-color: var(--color-text-action-primary);
    --button-hover-color: var(--color-text-action-primary-hover);
    --button-active-color: var(--color-text-action-primary-active);
    --button-border-color: var(--color-border-subtle);
    --button-hover-border-color: var(--color-border-subtle);
    --button-active-border-color: var(--color-border-subtle);
    --button-border-width: 1px;
    --button-background: transparent;
    --button-hover-background: var(--color-background-white-hover);
    --button-active-background: var(--color-gray-100);

    &#{$this}--is-disabled {
      --button-color: var(--color-text-disabled);
      --button-hover-color: var(--color-text-disabled);
      --button-active-color: var(--color-text-disabled);
      --button-border-color: var(--color-border-subtle);
      --button-hover-border-color: var(--color-border-subtle);
      --button-active-border-color: var(--color-border-subtle);
      --button-background: var(--color-white);
      --button-hover-background: var(--color-white);
      --button-active-background: var(--color-white);
      --button-icon-color: var(--color-icon-disabled);
      --button-icon-color-hover: var(--color-icon-disabled);
      --button-icon-color-active: var(--color-icon-disabled);
    }
  }

  &--circled {
    --button-border-radius: var(--border-radius-circle);
    --button-padding: var(--space-12);
  }

  &--text {
    --button-color: var(--color-text-action-primary);
    --button-hover-color: var(--color-text-action-primary-hover);
    --button-active-color: var(--color-text-action-primary-active);
    --button-border-width: 0;
    --button-background: transparent;
    --button-hover-background: transparent;
    --button-active-background: transparent;
    --button-padding: 0;

    @include font(body-1);

    &:focus {
      --button-border-radius: var(--border-radius-outline);
    }

    #{$this}__icon {
      --button-icon-margin: 0 var(--space-4) 0 0;

      [dir="rtl"] & {
        --button-icon-margin: 0 0 0 var(--space-4);
      }

      &--right {
        --button-icon-margin: 0 0 0 var(--space-4);

        [dir="rtl"] & {
          --button-icon-margin: 0 var(--space-4) 0 0;
        }
      }
    }

    &#{$this}--small {
      @include font(body-2-comfortable);
    }

    &#{$this}--is-disabled {
      --button-color: var(--color-text-disabled);
      --button-hover-color: var(--color-text-disabled);
      --button-active-color: var(--color-text-disabled);
      --button-background: transparent;
      --button-hover-background: transparent;
      --button-active-background: var(--color-white);
      --button-icon-color: var(--color-icon-disabled);
      --button-icon-color-hover: var(--color-icon-disabled);
      --button-icon-color-active: var(--color-icon-disabled);
    }
  }

  &--secondary {
    --button-color: var(--color-text-action-secondary);
    --button-hover-color: var(--color-text-action-secondary-hover);
    --button-active-color: var(--color-text-action-secondary-active);

    &#{$this}--has-icon {
      --button-icon-color: var(--color-icon-secondary);
      --button-icon-color-hover: var(--color-icon-secondary-hover);
      --button-icon-color-active: var(--color-icon-secondary-active);
    }

    &#{$this}--is-disabled {
      --button-icon-color: var(--color-icon-disabled);
      --button-icon-color-hover: var(--color-icon-disabled);
      --button-icon-color-active: var(--color-icon-disabled);
    }
  }
}
</style>

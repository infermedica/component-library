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

<script setup lang="ts">
import type { PropType } from 'vue';
import useLink from '../../../composable/useLink';
import { keyboardFocus as vKeyboardFocus } from '../../../utilities/directives';
import type { HTMLTag } from '../../../types/tag';

const props = defineProps({
  /**
   * Use this props to set tag when a component shouldn't be a button.
   */
  tag: {
    type: [String, Object] as PropType<HTMLTag | Record<string, unknown>>,
    default: 'button',
  },
  /**
   * Use this props to set route for internal link.
   */
  to: {
    type: [String, Object] as PropType<string | Record<string, unknown>>,
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
@import "../../../styles/functions/functions";

.ui-button {
  $this: &;
  $element: button;

  @include inner-border($element, $color: var(--color-border-subtle), $width: 0, $radius: var(--border-radius-button));
  @include font($element, button-1);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: css-var($element, padding, var(--space-12) var(--space-32));
  background: css-var($element, background, var(--color-background-action));
  color: css-var($element, color, var(--color-text-on-action));
  text-align: center;
  text-decoration: none;
  transition:
    (
      background-color 150ms ease-in-out,
      border-color 150ms ease-in-out,
      color 150ms ease-in-out,
    );
  vertical-align: top;
  white-space: normal;
  word-break: break-all;

  @supports (overflow-wrap: anywhere) {
    overflow-wrap: anywhere;
    word-break: normal;
  }

  @include with-hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  @include focus {
    box-shadow: var(--focus-outer);
  }

  @include hover {
    background: css-var($element + -hover, background, var(--color-background-action-hover));
    color: css-var($element + -hover, color, var(--color-text-on-action));

    &::after {
      border-color: css-var($element + -hover, border-color, var(--color-border-subtle));
    }

    #{$this}__icon {
      --icon-color: #{css-var($element + "-hover-icon", color, var(--color-icon-on-action))};
    }
  }

  &:active {
    background: css-var($element + "-active", background, var(--color-background-action-active));
    color: css-var($element + "-active", color, var(--color-text-on-action));

    &::after {
      border-color: css-var($element + "-active", border-color, var(--color-border-subtle));
    }

    #{$this}__icon {
      --icon-color: #{css-var($element + "-active-icon", color, var(--color-icon-on-action))};
    }
  }

  &__icon {
    --icon-color: #{css-var($element + "-icon", color, var(--color-icon-on-action))};

    flex: none;
    margin: css-var($element + "-icon", margin, 0 var(--space-4) 0 calc(var(--space-8) * -1));
    transition: fill 150ms ease-in-out;

    [dir="rtl"] & {
      margin: css-var($element + "-rtl-icon", margin, 0 calc(var(--space-8) * -1) 0 var(--space-4));
    }

    &--right {
      margin: css-var($element + "-icon", margin, 0 calc(var(--space-8) * -1) 0 var(--space-4));

      [dir="rtl"] & {
        margin: css-var($element + "-rtl-icon", margin, 0 var(--space-4) 0 calc(var(--space-8) * -1));
      }
    }
  }

  &--is-disabled {
    background: css-var($element, background, var(--color-background-disabled));
    cursor: not-allowed;

    @include hover {
      background: css-var($element + "-hover", background, var(--color-background-disabled));
    }

    &:active {
      background: css-var($element + "-hover", background, var(--color-background-disabled));
    }
  }

  &--small {
    padding: css-var($element, padding, var(--space-8) var(--space-20));
    font: css-var($element, font, var(--font-body-1));
    letter-spacing: css-var($element, letter-spacing, var(--letter-spacing-body-1));
  }

  &--outlined {
    background: css-var($element, background, transparent);
    color: css-var($element, color, var(--color-text-action-primary));

    &::after {
      border-width: css-var($element, border-width, 1px);
    }

    #{$this}__icon {
      --icon-color: #{css-var($element + "-icon", color, var(--color-icon-primary))};
    }

    @include hover {
      background: css-var($element + "-hover", background, var(--color-background-white-hover));
      color: css-var($element + "-hover", color, var(--color-text-action-primary-hover));

      #{$this}__icon {
        --icon-color: #{css-var($element + "-hover-icon", color, var(--color-icon-primary-hover))};
      }
    }

    &:active {
      background: css-var($element + "-active", background, var(--color-background-white-active));
      color: css-var($element + "-active", color, var(--color-text-action-primary-active));

      #{$this}__icon {
        --icon-color: #{css-var($element + "-active-icon", color, var(--color-icon-primary-active))};
      }
    }

    &#{$this}--is-selected {
      background: css-var($element, background, var(--color-background-selection));
      color: css-var($element, color, var(--color-text-on-selection));

      &::after {
        border-color: css-var($element, border-color, var(--color-background-selection));
      }

      #{$this}__icon {
        --icon-color: #{css-var($element + "-icon", color, var(--color-icon-on-selection))};
      }

      @include hover {
        background: css-var($element + "-hover", background, var(--color-background-selection-hover));
        color: css-var($element + "-hover", color, var(--color-text-on-selection));

        &::after {
          border-color: css-var($element + "-hover", border-color, var(--color-background-selection-hover));
        }

        #{$this}__icon {
          --icon-color: #{css-var($element + "-icon", color, var(--color-icon-on-selection))};
        }
      }

      &:active {
        background: css-var($element + "-active", background, var(--color-background-selection-active));
        color: css-var($element + "-active", color, var(--color-text-on-selection));

        &::after {
          border-color: css-var($element + "-active", border-color, var(--color-background-selection-active));
        }

        #{$this}__icon {
          --icon-color: #{css-var($element + "-icon", color, var(--color-icon-on-selection))};
        }
      }

      &#{$this}--is-disabled {
        background: css-var($element, background, var(--color-background-disabled));
        color: css-var($element, color, var(--color-text-on-action));

        &::after {
          border-color: css-var($element, border-color, var(--color-border-subtle));
        }

        #{$this}__icon {
          --icon-color: #{css-var($element + "-icon", color, var(--color-icon-on-action))};
        }

        @include hover {
          background: css-var($element + "-hover", background, var(--color-background-disabled));
          color: css-var($element + "-hover", color, var(--color-text-on-action));

          #{$this}__icon {
            --icon-color: #{css-var($element + "-hover-icon", color, var(--color-icon-on-action))};
          }
        }

        &:active {
          background: css-var($element + "-hover", background, var(--color-background-disabled));
          color: css-var($element + "-active", color, var(--color-text-on-action));

          #{$this}__icon {
            --icon-color: #{css-var($element + "-active-icon", color, var(--color-icon-on-action))};
          }
        }
      }
    }

    &#{$this}--is-disabled {
      color: css-var($element, color, var(--color-text-disabled));

      #{$this}__icon {
        --icon-color: #{css-var($element + "-icon", color, var(--color-icon-disabled))};
      }

      @include hover {
        background: css-var($element + "-hover", background, transparent);
        color: css-var($element + "-hover", color, var(--color-text-disabled));

        #{$this}__icon {
          --icon-color: #{css-var($element + "-hover-icon", color, var(--color-icon-disabled))};
        }
      }

      &:active {
        background: css-var($element + "-hover", background, transparent);
        color: css-var($element + "-active", color, var(--color-text-disabled));

        #{$this}__icon {
          --icon-color: #{css-var($element + "-active-icon", color, var(--color-icon-disabled))};
        }
      }
    }
  }

  &--text {
    @extend #{$this}--outlined;

    --#{$element}-border-width: 0;
    --#{$element}-padding: 0;
    --#{$element}-hover-background: transparent;
    --#{$element}-active-background: transparent;

    font: css-var($element, font, var(--font-body-1));
    letter-spacing: css-var($element, letter-spacing, var(--letter-spacing-body-1));

    #{$this}__icon {
      margin: css-var($element + "-icon", margin, 0 var(--space-4) 0 0);

      [dir="rtl"] & {
        margin: css-var($element + "-rtl-icon", margin, 0 0 0 var(--space-4));
      }

      &--right {
        margin: css-var($element + "-icon", margin, 0 0 0 var(--space-4));

        [dir="rtl"] & {
          margin: css-var($element + "-rtl-icon", margin, 0 var(--space-4) 0 0);
        }
      }
    }

    &#{$this}--small {
      font: css-var($element, font, var(--font-body-2-comfortable));
      letter-spacing: css-var($element, letter-spacing, var(--letter-spacing-2-comfortable));
    }
  }

  &--circled {
    @extend #{$this}--outlined;

    --#{$element}-border-radius: var(--border-radius-circle);
    --#{$element}-icon-margin: 0;
    --#{$element}-rtl-icon-margin: 0;

    padding: css-var($element, padding, var(--space-12));

    .ui-text {
      --text-color: currentcolor;

      width: 1.5rem;
    }
  }

  &--icon {
    @extend #{$this}--outlined;

    --#{$element}-padding: 0;
    --#{$element}-border-width: 0;
    --#{$element}-icon-margin: 0;
    --#{$element}-rtl-icon-margin: 0;
    --#{$element}-hover-background: transparent;
    --#{$element}-active-background: transparent;
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
      --color-text-disabled: var(--color-text-on-brand-disabled);
      --color-icon-disabled: var(--color-icon-on-brand-disabled);
    }
  }
}
</style>

<template>
  <component
    :is="componentTag"
    v-keyboard-focus
    v-bind="routeAttrs"
    class="ui-button"
    :type="tag === 'button' ? 'button' : null"
    :aria-disabled="isLoading ? true : null"
  >
    <template v-if="hasLoader">
      <component
        :is="loader"
        :is-loading="isLoading"
        v-bind="defaultProps.loaderAttrs"
      >
        <template #loader>
          <!-- @slot Use this slot to replace loader. -->
          <slot name="loader" />
        </template>
        <!-- @slot Use this slot to place content inside button. -->
        <slot />
      </component>
    </template>
    <template v-else>
      <!-- @slot Use this slot to place content inside button. -->
      <slot />
    </template>
  </component>
</template>

<script setup lang="ts">
import {
  h,
  ref,
  computed,
  watch,
  type HTMLAttributes,
  defineAsyncComponent,
  useSlots,
} from 'vue';
import type {
  HTMLTag,
  DefineAttrsProps,
} from '../../../types';
import type { LoaderAttrsProps } from '../../molecules/UiLoader/UiLoader.vue';
import { useLink } from '../../../composable';
import { keyboardFocus as vKeyboardFocus } from '../../../utilities/directives';

export interface ButtonProps {
  /**
   * Use this props to set tag when a component shouldn't be a button.
   */
  tag?: HTMLTag;
  /**
   * Use this props to set route for internal link.
   */
  to?: string | Record<string, unknown>;
  /**
   * Use this props to set route for external link.
   */
  href?: string;
  /**
   * Use this props to set button into loading state.
   */
  isLoading?: boolean;
  /**
   * Use this props to pass attrs for UiLoader.
   */
  loaderAttrs?: LoaderAttrsProps;
}
export type ButtonAttrsProps<HTMLAttrs = HTMLAttributes> = DefineAttrsProps<ButtonProps, HTMLAttrs>;

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  to: '',
  href: '',
  isLoading: false,
  loaderAttrs: () => ({}),
});
const defaultProps = computed(() => ({
  loaderAttrs: {
    type: 'ellipsis' as const,
    'transition-type': 'opacity',
    ...props.loaderAttrs,
  },
}));
const {
  componentTag,
  routeAttrs,
} = useLink(props);
const hasLoader = ref(props.isLoading);
watch(() => (props.isLoading), (isLoading) => {
  if (isLoading && !hasLoader.value) {
    hasLoader.value = true;
  }
}, { once: true });
const slots = useSlots();
const loader = computed(() => (
  hasLoader.value
    ? defineAsyncComponent({
      loader: () => import('../../molecules/UiLoader/UiLoader.vue'),
      delay: 0,
      loadingComponent: () => (slots.default
        ? h('slot', slots.default())
        : null)
      ,
    })
    : null
));

</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-button {
  $this: &;
  $element: button;

  @include mixins.use-logical($element, padding, var(--space-12) var(--space-32));
  @include mixins.inner-border(
    $element,
    $color: var(--color-border-subtle),
    $width: 0,
    $radius: var(--border-radius-button)
  );
  @include mixins.font($element, button-1);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: functions.var($element, background, var(--color-background-action));
  color: functions.var($element, color, var(--color-text-on-action));
  gap: functions.var($element, gap, var(--space-4));
  text-align: functions.var($element, text-align, center);
  text-decoration: none;
  transition:
    (
      background-color 150ms ease-in-out,
      border 150ms ease-in-out,
      color 150ms ease-in-out,
    );
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
    background: functions.var($element + "-hover", background, var(--color-background-action-hover));
    color: functions.var($element + "-hover", color, var(--color-text-on-action));

    &::after {
      @include mixins.use-logical($element + "-hover", border-color, var(--color-border-subtle));
    }

    #{$this}__icon {
      --icon-color: #{functions.var($element + "-hover-icon", color, var(--color-icon-on-action))};
    }
  }

  &:not([aria-disabled]):active {
    background: functions.var($element + "-active", background, var(--color-background-action-active));
    color: functions.var($element + "-active", color, var(--color-text-on-action));

    &::after {
      @include mixins.use-logical($element + "-active", border-color, var(--color-border-subtle));
    }

    #{$this}__icon {
      --icon-color: #{functions.var($element + "-active-icon", color, var(--color-icon-on-action))};
    }
  }

  &__icon {
    --icon-color: #{functions.var($element + "-icon", color, var(--color-icon-on-action))};

    @include mixins.use-logical($element + "-icon", margin, 0 0 0 calc(var(--space-8) * -1));

    flex: none;
    transition: fill 150ms ease-in-out;

    &--end {
      @include mixins.use-logical($element + "-icon", margin, 0 calc(var(--space-8) * -1) 0 0);
    }
  }

  &--is-disabled {
    background: functions.var($element, background, var(--color-background-disabled));
    cursor: not-allowed;

    @include mixins.hover {
      background: functions.var($element + "-hover", background, var(--color-background-disabled));
    }

    &:active {
      background: functions.var($element + "-hover", background, var(--color-background-disabled));
    }
  }

  &--small {
    @include mixins.use-logical($element, padding, var(--space-8) var(--space-20));

    font: functions.var($element, font, var(--font-body-1));
    letter-spacing: functions.var($element, letter-spacing, var(--letter-spacing-body-1));
  }

  &--outlined {
    --loader-ellipsis-dot-background: #{functions.var($element, color, var(--color-text-action-primary))};

    background: functions.var($element, background, transparent);
    color: functions.var($element, color, var(--color-text-action-primary));

    &::after {
      @include mixins.use-logical($element, border-width, 1px);
    }

    #{$this}__icon {
      --icon-color: #{functions.var($element + "-icon", color, var(--color-icon-primary))};
    }

    @include mixins.hover {
      background: functions.var($element + "-hover", background, var(--color-background-white-hover));
      color: functions.var($element + "-hover", color, var(--color-text-action-primary-hover));

      #{$this}__icon {
        --icon-color: #{functions.var($element + "-hover-icon", color, var(--color-icon-primary-hover))};
      }
    }

    &:not([aria-disabled]):active {
      background: functions.var($element + "-active", background, var(--color-background-white-active));
      color: functions.var($element + "-active", color, var(--color-text-action-primary-active));

      #{$this}__icon {
        --icon-color: #{functions.var($element + "-active-icon", color, var(--color-icon-primary-active))};
      }
    }

    &#{$this}--is-selected {
      --loader-ellipsis-dot-background: #{functions.var($element, color, var(--color-text-on-selection))};

      background: functions.var($element, background, var(--color-background-selection));
      color: functions.var($element, color, var(--color-text-on-selection));

      &::after {
        @include mixins.use-logical($element, border-color, var(--color-background-selection));
      }

      #{$this}__icon {
        --icon-color: #{functions.var($element + "-icon", color, var(--color-icon-on-selection))};
      }

      @include mixins.hover {
        background: functions.var($element + "-hover", background, var(--color-background-selection-hover));
        color: functions.var($element + "-hover", color, var(--color-text-on-selection));

        &::after {
          @include mixins.use-logical($element + "-hover", border-color, var(--color-background-selection-hover));
        }

        #{$this}__icon {
          --icon-color: #{functions.var($element + "-icon", color, var(--color-icon-on-selection))};
        }
      }

      &:not([aria-disabled]):active {
        background: functions.var($element + "-active", background, var(--color-background-selection-active));
        color: functions.var($element + "-active", color, var(--color-text-on-selection));

        &::after {
          @include mixins.use-logical($element + "-active", border-color, var(--color-background-selection-active));
        }

        #{$this}__icon {
          --icon-color: #{functions.var($element + "-icon", color, var(--color-icon-on-selection))};
        }
      }

      &#{$this}--is-disabled {
        background: functions.var($element, background, var(--color-background-disabled));
        color: functions.var($element, color, var(--color-text-on-action));

        &::after {
          @include mixins.use-logical($element, border-color, var(--color-border-subtle));
        }

        #{$this}__icon {
          --icon-color: #{functions.var($element + "-icon", color, var(--color-icon-on-action))};
        }

        @include mixins.hover {
          background: functions.var($element + "-hover", background, var(--color-background-disabled));
          color: functions.var($element + "-hover", color, var(--color-text-on-action));

          &::after {
            @include mixins.use-logical($element + "-hover", border-color, var(--color-border-subtle));
          }

          #{$this}__icon {
            --icon-color: #{functions.var($element + "-hover-icon", color, var(--color-icon-on-action))};
          }
        }

        &:active {
          background: functions.var($element + "-hover", background, var(--color-background-disabled));
          color: functions.var($element + "-active", color, var(--color-text-on-action));

          #{$this}__icon {
            --icon-color: #{functions.var($element + "-active-icon", color, var(--color-icon-on-action))};
          }
        }
      }
    }

    &#{$this}--is-disabled {
      --loader-ellipsis-dot-background: #{functions.var($element, color, var(--color-text-disabled))};

      color: functions.var($element, color, var(--color-text-disabled));

      #{$this}__icon {
        --icon-color: #{functions.var($element + "-icon", color, var(--color-icon-disabled))};
      }

      @include mixins.hover {
        background: functions.var($element + "-hover", background, transparent);
        color: functions.var($element + "-hover", color, var(--color-text-disabled));

        #{$this}__icon {
          --icon-color: #{functions.var($element + "-hover-icon", color, var(--color-icon-disabled))};
        }
      }

      &:active {
        background: functions.var($element + "-hover", background, transparent);
        color: functions.var($element + "-active", color, var(--color-text-disabled));

        #{$this}__icon {
          --icon-color: #{functions.var($element + "-active-icon", color, var(--color-icon-disabled))};
        }
      }
    }
  }

  &--text {
    @extend #{$this}--outlined;

    --#{$element}-padding-block: 0;
    --#{$element}-padding-inline: 0;
    --#{$element}-border-block-width: 0;
    --#{$element}-border-inline-width: 0;
    --#{$element}-hover-background: transparent;
    --#{$element}-icon-margin-inline: 0;
    --#{$element}-active-background: transparent;

    font: functions.var($element, font, var(--font-body-1));
    letter-spacing: functions.var($element, letter-spacing, var(--letter-spacing-body-1));

    &#{$this}--small {
      font: functions.var($element, font, var(--font-body-2-comfortable));
      letter-spacing: functions.var($element, letter-spacing, var(--letter-spacing-body-2-comfortable));
    }
  }

  &--circled {
    @extend #{$this}--outlined;

    --#{$element}-icon-margin-inline: 0;

    @include mixins.use-logical($element, border-radius, var(--border-radius-circle));
    @include mixins.use-logical($element, padding, var(--space-12));

    .ui-text {
      --text-color: currentcolor;

      width: 1.5rem;
    }
  }

  &--icon {
    @extend #{$this}--outlined;

    --#{$element}-padding-block: 0;
    --#{$element}-padding-inline: 0;
    --#{$element}-border-block-width: 0;
    --#{$element}-border-inline-width: 0;
    --#{$element}-icon-margin-inline: 0;
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

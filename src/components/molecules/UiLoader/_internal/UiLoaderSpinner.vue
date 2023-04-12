<template>
  <div class="ui-loader-spinner">
    <!-- @slot Use this slot to replace loader template.-->
    <slot
      name="loader"
      v-bind="{ loaderSpinnerAttrs }"
    >
      <div
        v-bind="loaderSpinnerAttrs"
        class="ui-loader-spinner__loader"
      />
    </slot>
    <!-- @slot Use this slot to replace label template.-->
    <slot
      name="label"
      v-bind="{
        label,
        textLabelAttrs,
      }"
    >
      <UiText
        v-if="label"
        v-bind="textLabelAttrs"
        class="ui-loader-spinner__label"
      >
        {{ label }}
      </UiText>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import type { TextAttrsProps } from '../../../atoms/UiText/UiText.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface LoaderSpinnerProps {
  /**
   * Use this prop to set the label text.
   */
  label?: string;
  /**
   * Use this props to pass attrs for spinner
   */
  loaderSpinnerAttrs?: DefineAttrsProps<null, HTMLAttributes>;
  /**
   * Use this props to pass attrs for label UiText
   */
  textLabelAttrs?: TextAttrsProps;
}
export type LoaderSpinnerAttrsProps = DefineAttrsProps<LoaderSpinnerProps>;

withDefaults(defineProps<LoaderSpinnerProps>(), {
  label: '',
  loaderSpinnerAttrs: () => ({}),
  textLabelAttrs: () => ({}),
});
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-loader-spinner {
  $this: &;
  $element: loader-spinner;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__loader {
    --_loader-spinner-loader-size: #{functions.var($element + "-loader", size, 4rem)};

    @include mixins.use-logical($element, border-radius, var(--border-radius-circle));

    position: relative;
    flex-shrink: 0;
    width: var(--_loader-spinner-loader-size);
    height: var(--_loader-spinner-loader-size);
    animation: rotate 0.8s cubic-bezier(0.8, 0.4, 0.4, 0.8) infinite;

    &::before,
    &::after {
      @include mixins.use-logical($element + "-loader", border-width, 2px);
      @include mixins.use-logical($element, border-style, solid);
      @include mixins.use-logical($element, border-color, var(--color-icon-secondary));

      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      content: "";
    }

    &::before {
      --#{$element}-border-block-end-color: transparent;
      --#{$element}-border-inline-color: transparent;
    }

    &::after {
      opacity: functions.var($element + "-loader", opacity, 0.3);
    }
  }

  &__label {
    @include mixins.use-logical($element + "-label", margin, var(--space-24) 0 0);
  }

  &--small {
    flex-direction: row;

    #{$this}__loader {
      --_loader-spinner-loader-size: #{functions.var($element + "-loader", size, 1.125rem)};

      @include mixins.use-logical($element, margin, 3px); //pixel perfect hack
    }

    #{$this}__label {
      @include mixins.use-logical($element + "-label", margin, 0 0 0 var(--space-8));
    }
  }

  @at-root [class*="-brand"] {
    #{$this},
    &#{$this} {
      --color-icon-secondary: var(--color-icon-on-brand);
    }
  }

  @keyframes rotate {
    100% {
      // RTL rotation intentionally in same direction
      transform: rotate(360deg);
    }
  }
}
</style>

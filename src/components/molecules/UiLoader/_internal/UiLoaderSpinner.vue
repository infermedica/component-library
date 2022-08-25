<template>
  <div class="ui-loader-spinner">
    <!-- @slot Use this slot to replace loader template.-->
    <slot name="loader">
      <div class="ui-loader-spinner__loader" />
    </slot>
    <!-- @slot Use this slot to replace label template.-->
    <slot
      name="label"
      v-bind="{label}"
    >
      <UiText
        v-if="label"
        class="ui-loader-spinner__label"
      >
        {{ label }}
      </UiText>
    </slot>
  </div>
</template>

<script setup lang="ts">
import UiText from '../../../atoms/UiText/UiText.vue';

defineProps({
  /**
   * Use this prop to set the label text.
   */
  label: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-loader-spinner {
  $this: &;
  $element: loader-spinner;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__loader {
    --_loader-spinner-loader-size: #{functions.var($element + "-loader", size, 4rem)};

    position: relative;
    width: var(--_loader-spinner-loader-size);
    height: var(--_loader-spinner-loader-size);
    animation: rotate 0.8s cubic-bezier(0.8, 0.4, 0.4, 0.8) infinite;
    border-radius: var(--border-radius-circle);

    &::before,
    &::after {
      position: absolute;
      width: 100%;
      height: 100%;
      border-width: functions.var($element + "-loader", border-width, 2px);
      border-style: solid;
      border-color: functions.var($element + "-indicator", color, var(--color-icon-secondary));
      border-radius: inherit;
      content: "";
    }

    &::before {
      border-right-color: transparent;
      border-bottom-color: transparent;
      border-left-color: transparent;
    }

    &::after {
      opacity: functions.var($element + "-loader", opacity, 0.3);
    }
  }

  &__label {
    margin: functions.var($element + "-label", margin, var(--space-24) 0 0 0);
  }

  &--small {
    flex-direction: row;

    #{$this}__loader {
      --_loader-spinner-loader-size: #{functions.var($element + "-loader", size, 1.125rem)};

      margin: 3px; //pixel perfect hack
    }

    #{$this}__label {
      margin: functions.var($element + "-label", margin, 0 0 0 var(--space-8));

      [dir="rtl"] & {
        margin: functions.var($element + "-rtl-label", margin, 0 var(--space-8) 0 0);
      }
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

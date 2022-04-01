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

<script setup>
import UiText from '../../../atoms/UiText/UiText.vue';

defineProps({
  /**
   * Use this prop to set the label text.
   */
  label: {
    type: String,
    default: 'Loading...',
  },
});
</script>

<style lang="scss">
.ui-loader-spinner {
  display: flex;
  flex-direction: var(--loader-spinner-flex-direction, column);
  align-items: var(--loader-spinner-align-items, center);
  justify-content: var(--loader-spinner-justify-content, center);

  &__loader {
    width: var(--loader-spinner-loader-size, 4rem);
    height: var(--loader-spinner-loader-size, 4rem);
    border: var(--loader-spinner-loader-border, solid rgb(95 114 133 / 30%));
    border-width: var(--loader-spinner-loader-border-width, 2px);
    border-top-color: var(--loader-spinner-loader-highlighted-color, var(--color-icon-secondary));
    border-radius: var(--loader-spinner-loader-border-radius, var(--border-radius-circle));
    animation: rotate 0.8s cubic-bezier(0.8, 0.4, 0.4, 0.8) infinite;
  }

  &__label {
    --text-color: var(--loader-spinner-label-color, var(--color-text-body));

    margin: var(--loader-spinner-label-margin, var(--space-24) 0 0 0);
  }

  &--on-dark {
    --loader-spinner-loader-border: solid rgb(255 255 255 / 30%);
    --loader-spinner-loader-highlighted-color: var(--color-icon-on-brand);
    --loader-spinner-label-color: var(--color-text-on-brand);
  }

  @keyframes rotate {
    100% {
      // RTL rotation intentionally in same direction
      transform: rotate(360deg);
    }
  }
}
</style>

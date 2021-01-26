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

<script>
import UiText from '../../../atoms/UiText/UiText.vue';

export default {
  name: 'UiLoaderSpinner',
  components: {
    UiText,
  },
  props: {
    label: {
      type: String,
      default: 'Loading...',
    },
  },
};
</script>

<style lang="scss">
.ui-loader-spinner {
  $this: &;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: var(--loader-spinner-height, 100%);
  height: var(--loader-spinner-width, 100%);
  background: var(--loader-spinner-background, var(--color-white));

  &__loader {
    width: var(--loader-spinner-loader-widtht, 4rem);
    height: var(--loader-spinner-loader-height, 4rem);
    // cannot use hexadecimal variable
    border: var(--loader-spinner-loader-border, 2px solid rgba(95, 114, 133, 0.3));
    border-top-color: var(--loader-spinner-loader-border-top-color, var(--color-icon-secondary));
    border-radius: var(--loader-spinner-loader-border-radius, var(--border-radius-circle));
    animation: rotate 0.8s cubic-bezier(0.8, 0.4, 0.4, 0.8) infinite;
  }

  &__label {
    margin: var(--loader-spinner-text-margin, var(--space-24) 0 0 0);

    --text-color: var(--loader-spinner-text-color, var(--color-text-body));
  }

  &--on-dark {
    --loader-spinner-background:
      var(
        --loader-spinner-on-dark-background,
        var(--color-background-dark)
      );
    --loader-spinner-loader-border-top-color:
      var(
        --loader-spinner-on-dark-spinner-border-top-color,
        var(--color-icon-on-dark-enabled)
      );
    // cannot use hexadecimal variable
    --loader-spinner-loader-border:
      var(
        --loader-spinner-on-dark-spinner-border,
        2px solid rgba(255, 255, 255, 0.3)
      );
    --loader-spinner-text-color:
      var(
        --loader-spinner-on-dark-text-color,
        var(--color-text-on-dark)
      );
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>

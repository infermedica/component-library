<template>
  <div class="ui-loader-ellipsis">
    <div class="ui-loader-ellipsis__dot" />
  </div>
</template>

<script>
export default {
  name: 'UiLoaderEllipsis',
};
</script>

<style lang="scss">
.ui-loader-ellipsis {
  @mixin dot($animation-delay) {
    width: var(--loader-ellipsis-dot-size, 0.375rem);
    height: var(--loader-ellipsis-dot-size, 0.375rem);
    background: var(--loader-ellipsis-dot-background, var(--color-icon-on-dark-enabled));
    border-radius: var(--loader-ellipsis-dot-border-radius, var(--border-radius-circle));
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: $animation-delay;
  }

  &__dot {
    @include dot(0.5s);

    position: relative;
    margin: var(--space-8) 0;

    &::after,
    &::before {
      position: absolute;
      top: 0;
      display: inline-block;
      content: '';
    }

    &::before {
      @include dot(0s);

      left: -0.75rem;
    }

    &::after {
      @include dot(1s);

      left: 0.75rem;
    }
  }

  @keyframes dotFlashing {
    0% {
      background: var(--loader-ellipsis-dot-animation-background, var(--color-gray-400));
    }

    50%,
    100% {
      background: var(--loader-ellipsis-dot-background, var(--color-icon-on-dark-enabled));
    }
  }
}
</style>

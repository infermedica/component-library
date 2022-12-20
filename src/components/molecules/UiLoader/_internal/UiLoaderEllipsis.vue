<template>
  <div class="ui-loader-ellipsis">
    <div class="ui-loader-ellipsis__dot" />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-loader-ellipsis {
  $element: loader-ellipsis;

  @mixin dot($animation-delay) {
    @include mixins.use-logical($element + "-dot", border-radius, var(--border-radius-circle));

    width: var(--_loader-ellipsis-dot-size);
    height: var(--_loader-ellipsis-dot-size);
    animation: dot 1s infinite linear alternate;
    animation-delay: $animation-delay;
    background: functions.var($element + "-dot", background, var(--color-icon-on-action));
  }

  --_loader-ellipsis-dot-size: #{functions.var($element + "-dot", size, 0.375rem)};

  &__dot {
    @include dot(0.5s);

    position: relative;

    &::before,
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      content: "";
    }

    &::before {
      @include dot(0s);

      transform: translateX(calc(-100% - var(--_loader-ellipsis-dot-size)));
    }

    &::after {
      @include dot(1s);

      transform: translateX(calc(100% + var(--_loader-ellipsis-dot-size)));
    }
  }

  @keyframes dot {
    0% {
      opacity: 0.5;
    }

    50% {
      opacity: 0.75;
    }

    100% {
      opacity: 1;
    }
  }
}
</style>

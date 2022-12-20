<template>
  <div class="ui-switch-control">
    <div class="ui-switch-control__wrapper" />
  </div>
</template>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-switch-control {
  $this: &;
  $element: switch-control;

  --_switch-control-color: #{functions.var($element, color, var(--color-switch-track))};

  @include mixins.use-logical($element, border-width, 2px);
  @include mixins.use-logical($element, border-style, solid);
  @include mixins.use-logical($element, border-color, var(--_switch-control-color));
  @include mixins.use-logical($element, border-radius, var(--border-radius-pill));

  display: inline-flex;
  width: functions.var($element, width, 2.4rem);
  background: functions.var($element, background, var(--_switch-control-color));
  transition: (background-color 105ms ease-in-out, border-color 105ms ease-in-out);

  &__wrapper {
    flex: 1;
    transition: transform 150ms ease-in-out;

    &::after {
      @include mixins.use-logical($element + "-thumb", border-radius, var(--border-radius-circle));

      display: block;
      width: functions.var($element + "-thumb", size, 1rem);
      height: functions.var($element + "-thumb", size, 1rem);
      background: functions.var($element + "-thumb", background, var(--color-switch-thumb));
      content: "";
      transition: inherit;
    }
  }

  &--is-checked {
    --_switch-control-color: #{functions.var($element + "-checked", color, var(--color-switch-track-checked))};

    #{$this}__wrapper {
      transform: translate3d(100%, 0, 0);

      &::after {
        transform: translate3d(-100%, 0, 0);
      }
    }

    [dir="rtl"] & {
      #{$this}__wrapper {
        transform: translate3d(-100%, 0, 0);

        &::after {
          transform: translate3d(100%, 0, 0);
        }
      }
    }
  }
}
</style>

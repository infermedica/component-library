<template>
  <div class="ui-switch-control">
    <div class="ui-switch-control__wrapper" />
  </div>
</template>

<style lang="scss">
@use "../../../../styles/functions";

.ui-switch-control {
  $this: &;
  $element: switch-control;

  --_switch-control-color: #{functions.var($element, color, var(--color-switch-track))};

  display: inline-flex;
  width: functions.var($element, width, 2.4rem);
  border-width: css-var($element, border-width, 2px);
  border-style: solid;
  border-color: functions.var($element, border-color, var(--_switch-control-color));
  background: functions.var($element, background, var(--_switch-control-color));
  border-radius: functions.var($element, border-radius, var(--border-radius-pill));
  transition: (background-color 105ms ease-in-out, border-color 105ms ease-in-out);

  &__wrapper {
    flex: 1;
    transition: transform 150ms ease-in-out;

    &::after {
      display: block;
      width: functions.var($element + "-thumb", size, 1rem);
      height: functions.var($element + "-thumb", size, 1rem);
      background: functions.var($element + "-thumb", background, var(--color-switch-thumb));
      border-radius: functions.var($element + "-thumb", border-radius, var(--border-radius-circle));
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
  }
}
</style>

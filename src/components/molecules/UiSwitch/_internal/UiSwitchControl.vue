<template>
  <div class="ui-switch-control">
    <div class="ui-switch-control__wrapper" />
  </div>
</template>

<style lang="scss">
@import "../../../../styles/mixins/mixins";

.ui-switch-control {
  --switch-control-track-color: var(--color-switch-track);
  --switch-control-transition: background-color 0.15s, border-color 0.15s;
  --switch-control-thumb-transition: transform 0.15s ease-in-out;

  $this: &;

  display: var(--switch-control-display, inline-flex);
  width: var(--switch-control-width, 2.4rem);
  height: var(--switch-control-height, auto);
  align-items: center;
  border: var(--switch-control-border, solid  var(--switch-control-border-color, var(--switch-control-track-color)));
  border-width: var(--switch-control-border-width, 2px);
  background: var(--switch-control-background, var(--switch-control-track-color));
  border-radius: var(--switch-control-border-radius, var(--border-radius-pill));
  cursor: pointer;
  transition: var(--switch-control-transition);

  &:hover {
    --switch-control-track-color: var(--switch-control-track-hover-color, var(--color-switch-track-hover));
  }

  &:active {
    --switch-control-track-color: var(--switch-control-track-active-color, var(--color-switch-track-active));
  }

  &__wrapper {
    width: 100%;
    transition: var(--switch-control-thumb-transition);

    &::after {
      display: block;
      width: var(--switch-control-thumb-size, 1rem);
      height: var(--switch-control-thumb-size, 1rem);
      background: var(--switch-control-thumb-background, var(--color-switch-thumb));
      border-radius: var(--switch-control-thumb-border-radius, var(--border-radius-pill));
      content: "";
      transition: var(--switch-control-thumb-transition);
    }
  }

  @at-root input {
    @include focus {
       & ~ #{$this} {
        box-shadow: var(--focus-outer);
      }
    }
  }

  input:checked ~ & {
    --switch-control-track-color: var(--switch-control-track-checked-color, var(--color-switch-track-checked));

    #{$this}__wrapper {
      pointer-events: none;
      transform: translateX(100%);

      &::after {
        transform: translateX(-100%);
      }
    }

    &:hover {
      --switch-control-track-color: var(--switch-control-track-checked-hover-color, var(--color-switch-track-checked-hover));
    }

    &:active {
      --switch-control-track-color: var(--switch-control-track-checked-active-color, var(--color-switch-track-checked-active));
    }
  }

  input:disabled ~ & {
    --switch-control-track-color: var(--color-switch-disabled);

    cursor: not-allowed;

    &:hover {
      --switch-control-track-color: var(--color-switch-disabled);
    }

    &:active {
      --switch-control-track-color: var(--color-switch-disabled);
    }
  }
}
</style>

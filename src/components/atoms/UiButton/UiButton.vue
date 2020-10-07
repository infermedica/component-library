<template>
  <button
    v-outline
    class="ui-button"
    v-on="$listeners"
  >
    <!-- @slot Use this slot to place content inside button. -->
    <slot />
  </button>
</template>

<script>
import { outline } from '../../../directives';

export default {
  name: 'UiButton',
  directives: {
    outline,
  },
};
</script>

<style lang="scss">
.ui-button {
  width: var(--button-width);
  height: var(--button-height);
  padding: var(--button-padding, 0.75rem 2rem);
  font: var(--button-font, inherit);
  color: var(--button-color, #fff);
  text-transform: var(--button-text-transform);
  white-space: var(--button-white-space, nowrap);
  cursor: var(--button-cursor, pointer);
  background: var(--button-background, #1ac98e);
  border: var(--button-border);
  border-radius: var(--button-border-radius, 5px);
  fill: var(--button-fill, #fff);
  transition: var(--button-transition, background-color 150ms ease-in-out);

  &:hover {
    color:
      var(
        --button-hover-color,
        var(--button-color, #fff)
      );
    background:
      var(
        --button-hover-background,
        var(--button-background, #17b580)
      );
    fill:
      var(
        --button-hover-fill,
        var(--button-fill, #fff)
      );
  }

  &:disabled {
    color:
      var(
        --button-disabled-color,
        var(--button-color, #fff)
      );
    background:
      var(
        --button-disabled-background,
        var(--button-background, #dbe1e6)
      );
    fill:
      var(
        --button-disabled-fill,
        var(--button-fill, #fff)
      );
  }

  &--text {
    --button-color: #1576d1;
    --button-fill: #1576d1;
    --button-background: transparent;
    --button-transition: color 150ms ease-in-out;
    --button-hover-color: #105ea7;
    --button-hover-fill: #105ea7;
    --button-disabled-color: #dbe1e6;
  }

  &--outlined {
    --button-color: #555;
    --button-fill: #555;
    --button-background: transparent;
    --button-border: 1px solid #dbe1e6;
    --button-hover-background: #f3f5f7;
  }
}
</style>

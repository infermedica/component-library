<template>
  <progress class="ui-progress" />
</template>

<script>
export default {
  name: 'UiProgress',
};
</script>

<style lang="scss">
.ui-progress {
  width: var(--progress-width, 100%);
  height: var(--progress-height, 0.25rem);
  padding: var(--progress-padding, 0);

  &[value] {
    border: var(--progress-border, 0);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: var(--progress-border-radius, var(--border-radius-pill));
    background-color: var(--progress-background, var(--color-bar-track));

    &::-webkit-progress-bar {
      background-color: var(--progress-background, var(--color-bar-track));
      border-radius: var(--progress-border-radius, var(--border-radius-pill));
    }

    &::-webkit-progress-value {
      background-color: var(--progress-value-background, var(--color-bar-indicator));
      border-radius: var(--progress-border-radius, var(--border-radius-pill));
    }

    &::-moz-progress-bar {
      border-radius: var(--progress-border-radius, var(--border-radius-pill));
      background-color: var(--progress-value-background, var(--color-bar-indicator));
    }
  }
}
</style>


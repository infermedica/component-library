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
    appearance: none;

    &::-webkit-progress-bar {
      background-color: var(--progress-background, var(--color-bar-track));
      border-radius: var(--progress-border-radius, var(--border-radius-pill));
    }

    &::-webkit-progress-value {
      background-color: var(--progress-value-background, var(--color-bar-indicator));
      border-radius: var(--progress-border-radius, var(--border-radius-pill));
    }
  }
}
</style>


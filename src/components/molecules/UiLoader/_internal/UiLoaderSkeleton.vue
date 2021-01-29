<template>
  <div class="ui-loader-skeleton">
    <!-- @slot Use this slot to put skeleton blocks.-->
    <slot />
  </div>
</template>

<script>
export default {
  name: 'UiLoaderSkeleton',
};
</script>

<style lang="scss">
// TODO add animation on skeleton
.ui-loader-skeleton {
  $this: &;

  width: var(--loader-skeleton-height, 100%);
  height: var(--loader-skeleton-width, 100%);

  &__block {
    position: relative;
    width: var(--loader-skeleton-block-width, 100%);
    height: var(--loader-skeleton-block-height, 0.75rem);
    margin: var(--loader-skeleton-block-margin, var(--space-12) 0 var(--space-16) 0);
    background:
      var(
        --loader-skeleton-block-background,
        linear-gradient(
          -60deg,
          var(--color-background-subtle) 20%,
          var(--color-gray-100) 30%,
          var(--color-background-subtle) 40%
        )
      );
    background-size: 200% 100%;
    border-radius: var(--loader-skeleton-block-border-radius, var(--border-radius-card));
    animation: skeleton-shine 1s linear infinite;

    @media (min-width: 768px) {
      height: var(--loader-skeleton-block-tablet-height, 1rem);
      margin: var(--loader-skeleton-block-tablet-margin, var(--space-12) 0 var(--space-20) 0);
    }

    &--large {
      height: var(--loader-skeleton-block-large-height, 7.5rem);
      margin: var(--loader-skeleton-block-large-margin, var(--space-40) 0 var(--space-12) 0);

      @media (min-width: 768px) {
        height: var(--loader-skeleton-block-large-tablet-height, 7.5rem);
        margin: var(--loader-skeleton-block-large-tablet-margin, var(--space-48) 0 0 0);
      }
    }
  }

  @keyframes skeleton-shine {
    0% {
      background-position: 100% 0;
    }

    100% {
      background-position: -100% 0;
    }
  }
}
</style>

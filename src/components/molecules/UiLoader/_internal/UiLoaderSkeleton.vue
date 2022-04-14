<template>
  <div class="ui-loader-skeleton">
    <!-- @slot Use this slot to put skeleton blocks.-->
    <slot>
      <template v-if="type === 'common'">
        <!-- @slot Use this slot to put skeleton common blocks.-->
        <slot name="common">
          <div
            class="ui-loader-skeleton__block"
            style="

  --loader-skeleton-block-width: 75%;"
          />
          <div
            class="ui-loader-skeleton__block"
          />
          <div
            class="ui-loader-skeleton__block"
            style="

  --loader-skeleton-block-width: 50%;"
          />
        </slot>
      </template>

      <template v-else-if="type === 'question'">
        <!-- @slot Use this slot to put skeleton question blocks.-->
        <slot name="question">
          <div
            class="ui-loader-skeleton__block"
          />

          <div
            class="ui-loader-skeleton__block"
            style="

  --loader-skeleton-block-width: 75%;"
          />
          <div
            class="ui-loader-skeleton__block ui-loader-skeleton__block--large"
          />
        </slot>
      </template>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  /**
   * Use this props to set skeleton type.
   */
  type: {
    type: String,
    default: 'common',
    validator: (value) => ['common', 'question'].includes(value),
  },
});
</script>

<style lang="scss">
// TODO add animation on skeleton
.ui-loader-skeleton {
  $this: &;

  display: var(--loader-skeleton-display, grid);
  width: var(--loader-skeleton-width, 100%);
  height: var(--loader-skeleton-height, auto);
  margin: var(--loader-skeleton-margin, var(--space-16) 0);
  grid-gap: var(--loader-skeleton-grid-gap, var(--space-32));

  &__block {
    position: relative;
    width: var(--loader-skeleton-block-width, 100%);
    height: var(--loader-skeleton-block-height, var(--space-8));
    animation: var(--loader-skeleton-block-animation, skeleton-shine 1s linear infinite);
    background:
      var(
        --loader-skeleton-block-background,
        linear-gradient(
          -60deg,
          var(--color-skeleton-loader-base) 20%,
          var(--color-skeleton-loader-wave) 30%,
          var(--color-skeleton-loader-base) 40%
        )
      );
    background-size: 200% 100%;
    border-radius: var(--loader-skeleton-block-border-radius, 5px);

    [dir="rtl"] & {
      background:
        var(
          --loader-skeleton-block-background,
          linear-gradient(
            60deg,
            var(--color-skeleton-loader-base) 20%,
            var(--color-skeleton-loader-wave) 30%,
            var(--color-skeleton-loader-base) 40%
          )
        );
      background-size: 200% 100%; // This needs to be repeated
    }

    &--large {
      height: var(--loader-skeleton-block-large-height, 7.5rem);
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

  [dir="rtl"] & {
    @keyframes skeleton-shine {
      0% {
        background-position: -100% 0;
      }

      100% {
        background-position: 100% 0;
      }
    }
  }
}
</style>

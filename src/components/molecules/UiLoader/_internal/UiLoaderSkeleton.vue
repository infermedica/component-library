<template>
  <div class="ui-loader-skeleton">
    <!-- @slot Use this slot to put skeleton blocks.-->
    <slot>
      <component
        :is="skeleton"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, defineAsyncComponent } from 'vue';
import { capitalizeFirst } from '../../../../utilities/helpers/index.ts';

export type LoaderSkeletonType = 'common' | 'question'

const props = defineProps({
  /**
   * Use this props to set skeleton type.
   */
  type: {
    type: String as PropType<LoaderSkeletonType>,
    default: 'common',
  },
});
const skeleton = computed(() => (defineAsyncComponent(() => import(`./UiLoaderSkeletons/UiLoaderSkeleton${capitalizeFirst(props.type)}.vue`))));
</script>

<style lang="scss">
@import "../../../../styles/functions/functions";

.ui-loader-skeleton {
  $element: loader-skeleton;

  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  margin: css-var($element, margin, var(--space-16) 0);

  &__block {
    width: css-var($element + "-block", width, 100%);
    flex: 1 1  css-var($element + "-block", height, 0.5rem);
    margin: css-var($element + "-block", margin, 0 0 var(--space-32) 0);
    animation: block 1s linear infinite;
    background:
      css-var(
        $element + "-block",
        background,
        linear-gradient(
          -60deg,
          var(--color-skeleton-loader-base) 20%,
          var(--color-skeleton-loader-wave) 30%,
          var(--color-skeleton-loader-base) 40%
        )
      );
    background-size: css-var($element + "-block", background-size, 200% 100%);
    border-radius: css-var($element + "-block", border-radius, 0.3125rem); //pixel perfect hack

    &:last-of-type {
      margin: 0;
    }

    &--large {
      flex: 1 1  css-var($element + "-block", height, 7.5rem);
    }
  }

  @keyframes block {
    0% {
      background-position: -100% 0;
    }

    100% {
      background-position: 100% 0;
    }
  }
}
</style>

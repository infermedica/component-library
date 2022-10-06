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
import {
  computed,
  defineAsyncComponent,
} from 'vue';
import { capitalizeFirst } from '../../../../utilities/helpers/index';

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
@use "../../../../styles/functions";

.ui-loader-skeleton {
  $element: loader-skeleton;

  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  margin: functions.var($element, margin, var(--space-16) 0);

  &__block {
    width: functions.var($element + "-block", width, 100%);
    flex: 1 1  functions.var($element + "-block", height, 0.5rem);
    margin: functions.var($element + "-block", margin, 0 0 var(--space-32) 0);
    animation: block 1s linear infinite;
    background:
      functions.var(
        $element + "-block",
        background,
        linear-gradient(
          -60deg,
          var(--color-skeleton-loader-base) 20%,
          var(--color-skeleton-loader-wave) 30%,
          var(--color-skeleton-loader-base) 40%
        )
      );
    background-size: functions.var($element + "-block", background-size, 200% 100%);
    border-radius: functions.var($element + "-block", border-radius, 0.3125rem); //pixel perfect hack

    &:last-of-type {
      margin: 0;
    }

    &--large {
      flex: 1 1  functions.var($element + "-block", height, 7.5rem);
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

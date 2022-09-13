<template>
  <component
    :is="outerComponent"
  >
    <!-- @slot Use this slot to replace loader. -->
    <slot
      v-if="isLoading"
      name="loader"
    >
      <component
        :is="tag"
        v-bind="$attrs"
        key="loading"
        class="ui-loader"
        aria-live="polite"
        :aria-busy="`${isLoading}`"
      >
        <component
          :is="component"
          v-bind="loaderAttrs"
        >
          <!-- @slot Use this slot to place loader blocks. -->
          <slot name="loader-blocks" />
        </component>
      </component>
    </slot>
    <!-- @slot Use this slot to put loaded content.-->
    <slot v-else-if="!eagerLoadComponent" />
    <div
      v-if="eagerLoadComponent"
      v-show="!isLoading"
      class="ui-loader__component-wrapper"
    >
      <!-- @slot Use this slot to place loaded content.-->
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
// FIXME: reveal content with v-if, v-show, visibility: hidden, check Symptom Checker use cases
import {
  computed,
  h,
  TransitionGroup,
} from 'vue';
import type {
  Slot,
  PropType,
  VNode,
} from 'vue';
import type { HTMLTag } from '../../../types/tag';
import UiLoaderSpinner from './_internal/UiLoaderSpinner.vue';
import UiLoaderSkeleton from './_internal/UiLoaderSkeleton.vue';
import UiLoaderEllipsis from './_internal/UiLoaderEllipsis.vue';
import type { PropsAttrs } from '../../../types/attrs';

export type LoaderType = 'spinner' | 'ellipsis' | 'skeleton';
export type LoaderComponent = InstanceType<(typeof UiLoaderSpinner
  | typeof UiLoaderEllipsis
  | typeof UiLoaderSkeleton)>;
const props = defineProps({
  /**
   * Use this props to show UiLoader component
   */
  isLoading: {
    type: Boolean,
    default: true,
  },
  /**
   * Use this props to select UiLoader variant
   */
  type: {
    type: String as PropType<LoaderType>,
    default: 'spinner',
  },
  /**
   * Use this props to pass attributes to internal child components
   */
  loaderAttrs: {
    type: Object as PropsAttrs,
    default: () => ({
    }),
  },
  /**
   * Use this props to pass tag of loader
   */
  tag: {
    type: [String, Object] as PropType<HTMLTag | Record<string, unknown>>,
    default: 'div',
  },
  /**
   * Use this props to pas transition name
   */
  transition: {
    type: [String, Boolean] as PropType<string | boolean>,
    default: false,
  },
  /**
   * Use this props to start rendering final component before loading stops, so it's completely rendered
   */
  eagerLoadComponent: {
    type: Boolean,
    default: false,
  },
});
const component = computed<LoaderComponent>(() => {
  const components: Record<LoaderType, LoaderComponent> = {
    spinner: UiLoaderSpinner,
    ellipsis: UiLoaderEllipsis,
    skeleton: UiLoaderSkeleton,
  };
  return components[props.type];
});
const outerComponent = computed<VNode>(() => (
  props.transition
    ? h(TransitionGroup, {
      name: props.transition as string,
    })
    : h((_, { slots }) => (slots.default as Slot)())
));
</script>

<style lang="scss">
.ui-loader {
  display: flex;
  align-items: center;
  justify-content: center;

  &__component-wrapper {
    display: contents;
  }

  /* todo: move to utilities */
  .fade {
    &-enter-active,
    &-leave-active {
      transition: opacity 300ms ease;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  }
}
</style>

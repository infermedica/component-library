<template>
  <component
    :is="transitionComponent"
    v-bind="transitionComponentAttrs"
  >
    <template #loader>
      <!-- @slot Use this slot to replace loader. -->
      <slot name="loader">
        <component
          :is="tag"
          v-bind="$attrs"
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
    </template>

    <!-- @slot Use this slot to place loaded content.-->
    <slot />
  </component>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { HTMLTag } from '../../../types/tag';
import UiLoaderSpinner from './_internal/UiLoaderSpinner.vue';
import type { PropsAttrs } from '../../../types/attrs';
import UiLoaderSkeleton from './_internal/UiLoaderSkeleton.vue';
import UiLoaderEllipsis from './_internal/UiLoaderEllipsis.vue';
import UiLoaderTransition from './_internal/UiLoaderTransition.vue';
import UiLoaderNativeTransition from './_internal/UiLoaderNativeTransition.vue';

export type LoaderType = 'spinner' | 'ellipsis' | 'skeleton';
export type LoaderComponent = typeof UiLoaderSpinner
  | typeof UiLoaderEllipsis
  | typeof UiLoaderSkeleton;
export type LoaderTransitionType = 'if' | 'show' | 'opacity';
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
   * Use this props to set transition type.
   */
  transitionType: {
    type: String as PropType<LoaderTransitionType>,
    default: 'if',
  },
  /**
   * Use this props to set transition name.
   */
  name: {
    type: String,
    default: 'fade',
  },
  /**
   * Use this props to pass tag of loader
   */
  tag: {
    type: [String, Object] as PropType<HTMLTag | Record<string, unknown>>,
    default: 'div',
  },
  /**
   * Use this props to pass attributes to internal child components
   */
  loaderAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pas transition name
   */
  transitionAttrs: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({}),
  },
});
const isIfTransitionType = computed(() => props.transitionType === 'if');
const component = computed<LoaderComponent>(() => {
  const components: Record<LoaderType, LoaderComponent> = {
    spinner: UiLoaderSpinner,
    ellipsis: UiLoaderEllipsis,
    skeleton: UiLoaderSkeleton,
  };
  return components[props.type];
});
const transitionComponent = computed(() => (isIfTransitionType.value
  ? UiLoaderNativeTransition
  : UiLoaderTransition
));
const transitionComponentAttrs = computed(() => {
  const attrs = {
    name: props.name,
    mode: 'out-in',
    ...props.transitionAttrs,
    isLoading: props.isLoading,
  };
  return isIfTransitionType.value
    ? attrs
    : {
      ...attrs,
      isOpacityTransitionType: props.transitionType === 'opacity',
    };
});
</script>

<style lang="scss">
.ui-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

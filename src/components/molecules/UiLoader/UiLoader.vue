<template>
  <component
    :is="outerComponent"
    v-bind="outerComponentAttrs"
  >
    <template #loader>
      <!-- @slot Use this slot to replace loader. -->
      <slot name="loader">
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
export type LoaderMode = 'if' | 'show' | 'opacity';
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
    default: () => ({}),
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
  transitionAttrs: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({}),
  },
  /**
   * Use this props to set transition mode
   */
  mode: {
    type: String as PropType<LoaderMode>,
    default: 'if',
  },
});
const isIfMode = computed(() => props.mode === 'if');
const component = computed<LoaderComponent>(() => {
  const components: Record<LoaderType, LoaderComponent> = {
    spinner: UiLoaderSpinner,
    ellipsis: UiLoaderEllipsis,
    skeleton: UiLoaderSkeleton,
  };
  return components[props.type];
});
const outerComponentAttrs = computed(() => {
  const attrs = { ...props.transitionAttrs, isLoading: props.isLoading };
  return isIfMode.value
    ? attrs
    : { ...attrs, isOpacityMode: props.mode === 'opacity' };
});
const outerComponent = computed(() => (isIfMode.value
  ? UiLoaderNativeTransition
  : UiLoaderTransition
));
</script>

<style lang="scss">
.ui-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

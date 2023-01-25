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
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { HTMLTag } from '../../../types/tag';
import type { DefineAttrsProps } from '../../../types/attrs';
import UiLoaderSpinner from './_internal/UiLoaderSpinner.vue';
import type { LoaderSpinnerAttrsProps } from './_internal/UiLoaderSpinner.vue';
import UiLoaderSkeleton from './_internal/UiLoaderSkeleton.vue';
import type { LoaderSkeletonAttrsProps } from './_internal/UiLoaderSkeleton.vue';
import UiLoaderEllipsis from './_internal/UiLoaderEllipsis.vue';
import UiLoaderTransition from './_internal/UiLoaderTransition.vue';
import type { LoaderTransitionAttrsProps } from './_internal/UiLoaderTransition.vue';
import UiLoaderNativeTransition from './_internal/UiLoaderNativeTransition.vue';
import type { LoaderNativeTransitionAttrsProps } from './_internal/UiLoaderNativeTransition.vue';

export type LoaderItemAttrsProps = LoaderSpinnerAttrsProps
  | LoaderSkeletonAttrsProps
  | LoaderTransitionAttrsProps
  | LoaderNativeTransitionAttrsProps;
export type LoaderType = 'spinner' | 'ellipsis' | 'skeleton';
export type LoaderComponent = typeof UiLoaderSpinner
  | typeof UiLoaderEllipsis
  | typeof UiLoaderSkeleton;
export type LoaderTransitionType = 'if' | 'show' | 'opacity';
export interface LoaderProps {
  /**
   * Use this props to show UiLoader component
   */
  isLoading?: boolean;
  /**
   * Use this props to select UiLoader variant
   */
  type?: LoaderType;
  /**
   * Use this props to set transition type.
   */
  transitionType?: LoaderTransitionType;
  /**
   * Use this props to set transition name.
   */
  name?: string;
  /**
   * Use this props to pass tag of loader
   */
  tag?: HTMLTag;
  /**
   * Use this props to pas transition name
   */
  transitionAttrs?: LoaderNativeTransitionAttrsProps | LoaderTransitionAttrsProps;
  /**
   * Use this props to pass attributes to internal child components
   */
  loaderAttrs?: LoaderItemAttrsProps;
}
export type LoaderAttrsProps<HTMLAttrs = HTMLAttributes> = DefineAttrsProps<LoaderProps, HTMLAttrs>;

const props = withDefaults(defineProps<LoaderProps>(), {
  isLoading: true,
  type: 'spinner',
  transitionType: 'if',
  name: 'fade',
  tag: 'div',
  transitionAttrs: () => ({}),
  loaderAttrs: () => ({}),
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
    ? attrs as LoaderNativeTransitionAttrsProps
    : {
      ...attrs,
      isOpacityTransitionType: props.transitionType === 'opacity',
    } as LoaderTransitionAttrsProps;
});
</script>

<style lang="scss">
.ui-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

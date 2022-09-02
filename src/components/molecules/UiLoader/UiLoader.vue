<template>
  <!-- @slot Use this slot to replace loader. -->
  <slot
    name="loader"
  >
    <component
      :is="tag"
      ref="loaderEl"
      class="ui-loader"
      :class="loaderClass"
      :style="loaderStyle"
      aria-live="polite"
      :aria-busy="`${isLoaderAnimate}`"
      v-bind="$attrs"
    >
      <component
        :is="loaderComponent"
        v-bind="loaderAttrs"
      >
        <!-- @slot Use this slot to place loader blocks. -->
        <slot name="loader-blocks" />
      </component>
    </component>
  </slot>
  <div
    ref="contentEl"
    class="ui-loader__content"
    :class="contentClass"
    :style="contentStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  reactive,
  onMounted,
} from 'vue';
import type {
  PropType,
  CSSProperties,
} from 'vue';
import UiLoaderSpinner from './_internal/UiLoaderSpinner.vue';
import UiLoaderSkeleton from './_internal/UiLoaderSkeleton.vue';
import UiLoaderEllipsis from './_internal/UiLoaderEllipsis.vue';
import type { HTMLTag } from '../../../types/tag';
import type { PropsAttrs } from '../../../types/attrs';

export type LoaderType = 'spinner' | 'ellipsis' | 'skeleton';
export type LoaderComponent = typeof UiLoaderSpinner
  | typeof UiLoaderEllipsis
  | typeof UiLoaderSkeleton;
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
   * Use this props to set transition name
   */
  name: {
    type: String,
    default: 'v',
  },
  /**
   * Use this props to apply a transition on the initial render
   */
  appear: {
    type: Boolean,
    default: true,
  },
});
const loaderEl = ref<HTMLElement | null>(null);
const contentEl = ref<HTMLElement | null>(null);
const loaderComponent = computed<LoaderComponent>(() => {
  const components: Record<LoaderType, LoaderComponent> = {
    spinner: UiLoaderSpinner,
    ellipsis: UiLoaderEllipsis,
    skeleton: UiLoaderSkeleton,
  };
  return components[props.type];
});
const animateEl = ref<'loader' | 'content'>(props.isLoading ? 'loader' : 'content');
const isLoaderAnimate = computed(() => animateEl.value === 'loader');
const isContentAnimate = computed(() => animateEl.value === 'content');
const transitionState = reactive({
  from: false,
  to: false,
});
const loaderClass = computed(() => {
  const { from, to } = transitionState;
  const move = props.isLoading ? 'enter' : 'leave';
  return {
    [`${props.name}-${move}-from`]: from && isLoaderAnimate.value,
    [`${props.name}-${move}-active`]: to && isLoaderAnimate.value,
    [`${props.name}-${move}-to`]: to && isLoaderAnimate.value,
  };
});
const contentClass = computed(() => {
  const { from, to } = transitionState;
  const move = !props.isLoading ? 'enter' : 'leave';
  return {
    [`${props.name}-${move}-from`]: from && isContentAnimate.value,
    [`${props.name}-${move}-active`]: to && isContentAnimate.value,
    [`${props.name}-${move}-to`]: to && isContentAnimate.value,
  };
});
const loaderStyle = computed<CSSProperties>(() => ({
  visibility: isLoaderAnimate.value ? undefined : 'hidden',
  position: isLoaderAnimate.value && props.type !== 'ellipsis' ? undefined : 'absolute',
}));
const contentStyle = computed<CSSProperties>(() => ({
  visibility: isContentAnimate.value ? undefined : 'hidden',
  position: isContentAnimate.value || props.type === 'ellipsis' ? undefined : 'absolute',
}));
const initTransition = () => {
  transitionState.from = true;
  setTimeout(() => {
    transitionState.to = true;
    transitionState.from = false;
  });
};
const onTransitionEnd = () => {
  transitionState.to = false;
  animateEl.value = props.isLoading ? 'loader' : 'content';
};
onMounted(() => {
  if (props.appear) {
    initTransition();
  }
  if (loaderEl.value && contentEl.value) {
    loaderEl.value.addEventListener('transitionend', onTransitionEnd);
    contentEl.value.addEventListener('transitionend', onTransitionEnd);
  }
});
watch(
  () => [props.isLoading, animateEl.value],
  () => {
    initTransition();
  },
);
</script>

<style lang="scss">
.ui-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v {
  &-enter-active,
  &-leave-active {
    transition: opacity 2000ms ease;
  }
  &-leave-to {
    opacity: 0;
  }
  &-enter-from {
    opacity: 0;
  }
}
</style>

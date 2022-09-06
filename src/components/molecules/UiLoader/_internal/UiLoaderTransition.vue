<template>
  <div
    ref="loaderEl"
    :style="loaderStyle"
  >
    <slot name="loader" />
  </div>
  <div
    ref="contentEl"
    :style="contentStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
} from 'vue';
import type {
  CSSProperties,
} from 'vue';

export type TransitionState = 'from' | 'active' | 'to';
const props = defineProps({
  /**
   * Use this props to show UiLoader component
   */
  isLoading: {
    type: Boolean,
    default: true,
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
const isLoaderVisible = ref(props.isLoading);
const transitionEl = computed(() => (isLoaderVisible.value ? loaderEl.value : contentEl.value) as HTMLElement);
const useTransitionStyle = (arg: boolean): CSSProperties => ({
  visibility: arg ? undefined : 'hidden',
  position: arg ? undefined : 'absolute',
});
const loaderStyle = computed(() => useTransitionStyle(isLoaderVisible.value));
const contentStyle = computed(() => useTransitionStyle(!isLoaderVisible.value));
const nextFrame = (callback: () => void) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
};
const handleTransitionClass = (state: TransitionState | TransitionState[]) => {
  const move = isLoaderVisible.value === props.isLoading ? 'enter' : 'leave';
  const stateList = Array.isArray(state) ? state : [state];
  stateList.forEach((stateEl) => {
    transitionEl.value?.classList.toggle(`${props.name}-${move}-${stateEl}`);
  });
};
const onTransitionEnd = () => {
  handleTransitionClass(['active', 'to']);
  transitionEl.value.removeEventListener('transitionend', onTransitionEnd);
  isLoaderVisible.value = props.isLoading;
};
const onTransitionCancel = () => {
  [loaderEl.value, contentEl.value].forEach((el) => (el as HTMLElement).removeAttribute('class'));
  transitionEl.value.removeEventListener('transitionend', onTransitionEnd);
};
const initTransition = () => {
  if (transitionEl.value?.className.includes('active')) {
    onTransitionCancel();
  }
  handleTransitionClass('from');
  nextFrame(() => {
    handleTransitionClass(['from', 'active', 'to']);
  });
  transitionEl.value.addEventListener('transitionend', onTransitionEnd);
};
onMounted(() => {
  if (props.appear) {
    initTransition();
  }
});
watch(
  () => [props.isLoading, isLoaderVisible.value],
  () => {
    initTransition();
  },
);
</script>

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
export type Move = 'leave' | 'enter';
export type TransitionHook = `before-${Move}`
  | `${Move}`
  | `after-${Move}`
  | `${Move}-cancelled`;
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
    default: '',
  },
  /**
   * Use this props to apply a transition on the initial render
   */
  appear: {
    type: Boolean,
    default: true,
  },
  isOpacityMode: {
    type: Boolean,
    default: false,
  },
});
const loaderEl = ref<HTMLElement | null>(null);
const contentEl = ref<HTMLElement | null>(null);
const isLoaderVisible = ref(props.isLoading);
const transitionEl = computed(() => (isLoaderVisible.value ? loaderEl.value : contentEl.value) as HTMLElement);
const move = computed(() => (isLoaderVisible.value === props.isLoading ? 'enter' : 'leave'));
const emit = defineEmits<{(e: TransitionHook, el: HTMLElement): void}>();
const useTransitionStyle = (isVisible: boolean, isAbsolute: boolean): CSSProperties => ({
  visibility: isVisible ? undefined : 'hidden',
  position: isAbsolute ? 'absolute' : undefined,
});
const loaderStyle = computed(() => (
  useTransitionStyle(isLoaderVisible.value, !isLoaderVisible.value || props.isOpacityMode)
));
const contentStyle = computed(() => (
  useTransitionStyle(!isLoaderVisible.value, isLoaderVisible.value && !props.isOpacityMode)
));
const nextFrame = (callback: () => void) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
};
const toggleTransitionClass = (state: TransitionState | TransitionState[]) => {
  const stateList = Array.isArray(state) ? state : [state];
  stateList.forEach((stateEl) => {
    transitionEl.value?.classList.toggle(`${props.name}-${move.value}-${stateEl}`);
  });
};
const onTransitionEnd = () => {
  toggleTransitionClass(['active', 'to']);
  transitionEl.value.removeEventListener('transitionend', onTransitionEnd);
  emit(`after-${move.value}`, transitionEl.value);
  isLoaderVisible.value = props.isLoading;
};
const onTransitionCancel = () => {
  [loaderEl.value, contentEl.value].forEach((el) => (el as HTMLElement).removeAttribute('class'));
  transitionEl.value.removeEventListener('transitionend', onTransitionEnd);
};
const onTransitionActive = () => {
  nextFrame(() => {
    emit(`${move.value}`, transitionEl.value);
    toggleTransitionClass(['from', 'active', 'to']);
  });
  transitionEl.value.addEventListener('transitionend', onTransitionEnd);
};
const onTransitionBeforeActive = () => {
  emit(`before-${move.value}`, transitionEl.value);
  toggleTransitionClass('from');
  onTransitionActive();
};
const startTransition = () => {
  if (transitionEl.value?.className.includes('active')) {
    onTransitionCancel();
    emit(`${move.value}-cancelled`, transitionEl.value);
  }
  onTransitionBeforeActive();
};
onMounted(() => {
  if (props.appear) {
    startTransition();
  }
});
watch(
  () => [props.isLoading, isLoaderVisible.value],
  () => {
    if (props.name) {
      startTransition();
      return;
    }
    isLoaderVisible.value = props.isLoading;
  },
);
</script>

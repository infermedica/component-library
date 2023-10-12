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
    class="ui-loader__loaded"
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
  type CSSProperties,
} from 'vue';
import type { DefineAttrsProps } from '../../../../types';

export type LoaderTransitionState = 'from' | 'active' | 'to';
export type LoaderTransitionMove = 'enter' | 'leave';
export type LoaderTransitionHook = `${'before' | 'after'}-${LoaderTransitionMove}`
  | `${LoaderTransitionMove}`
  | `${LoaderTransitionMove}-cancelled`;
export interface LoaderTransitionProps {
  /**
   * Use this props to show UiLoader component.
   */
  isLoading?: boolean;
  /**
   * Use this props to set transition name.
   */
  name?: '';
  /**
   * Use this props to apply a transition on the initial render.
   */
  appear?: boolean;
  /**
   * Use this props to use opacity transition type.
   */
  isOpacityTransitionType?: boolean;
}
export type LoaderTransitionAttrsProps = DefineAttrsProps<LoaderTransitionProps>;
export interface LoaderTransitionEmits {
  (e: LoaderTransitionHook, el: HTMLElement): void;
}

const props = withDefaults(defineProps<LoaderTransitionProps>(), {
  isLoading: true,
  name: '',
  appear: true,
  isOpacityTransitionType: false,
});
const emit = defineEmits<LoaderTransitionEmits>();
const loaderEl = ref<HTMLElement | null>(null);
const contentEl = ref<HTMLElement | null>(null);
const isLoaderVisible = ref(props.isLoading);
const transitionEl = computed(() => (isLoaderVisible.value ? loaderEl.value : contentEl.value) as HTMLElement);
const move = computed<LoaderTransitionMove>(() => (isLoaderVisible.value === props.isLoading ? 'enter' : 'leave'));
const useTransitionStyle = (isVisible: boolean, isAbsolute: boolean): CSSProperties => ({
  visibility: isVisible ? undefined : 'hidden',
  position: isAbsolute ? 'absolute' : undefined,
});
const loaderStyle = computed(() => (
  useTransitionStyle(isLoaderVisible.value, !isLoaderVisible.value || props.isOpacityTransitionType)
));
const contentStyle = computed(() => (
  useTransitionStyle(!isLoaderVisible.value, isLoaderVisible.value && !props.isOpacityTransitionType)
));
const nextFrame = (callback: () => void) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
};
const toggleTransitionClass = (state: LoaderTransitionState | LoaderTransitionState[]) => {
  const stateList = Array.isArray(state) ? state : [ state ];
  stateList.forEach((stateEl) => {
    transitionEl.value?.classList.toggle(`${props.name}-${move.value}-${stateEl}`);
  });
};
const onTransitionEnd = () => {
  toggleTransitionClass([
    'active',
    'to',
  ]);
  transitionEl.value.removeEventListener('transitionend', onTransitionEnd);
  emit(`after-${move.value}`, transitionEl.value);
  isLoaderVisible.value = props.isLoading;
};
const onTransitionCancel = () => {
  [
    loaderEl.value,
    contentEl.value,
  ].forEach((el) => (el as HTMLElement).removeAttribute('class'));
  transitionEl.value.removeEventListener('transitionend', onTransitionEnd);
};
const onTransitionActive = () => {
  nextFrame(() => {
    emit(`${move.value}`, transitionEl.value);
    toggleTransitionClass([
      'from',
      'active',
      'to',
    ]);
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
  () => [
    props.isLoading,
    isLoaderVisible.value,
  ],
  () => {
    if (props.name) {
      startTransition();
      return;
    }
    isLoaderVisible.value = props.isLoading;
  },
);
</script>

<template>
  <UiButton
    :class="[
      'ui-button--outlined ui-toggle-button', {
        'ui-button--is-selected': isChecked,
        'ui-toggle-button--is-selected': isChecked,
        'ui-button--is-disabled': isDisabled,
        'ui-button--has-icon': hasIcon
      }
    ]"
    :aria-checked="isChecked"
    role="radio"
    @click="clickHandler"
  >
    <!-- @slot Use this slot to place content inside component.-->
    <slot />
  </UiButton>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  watch,
  useAttrs,
} from 'vue';
import type {
  PropType,
  WritableComputedRef,
} from 'vue';
import equal from 'fast-deep-equal';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { ToggleButtonValue } from '../UiToggleButtonGroup.vue';

const props = defineProps({
  /**
   * Use this props to set value of toggle button.
   */
  value: {
    type: [
      Number,
      String,
      Object,
    ] as PropType<ToggleButtonValue>,
    default: '',
  },
});
const emit = defineEmits<{(e:'check'|'uncheck'):void;}>();
const attrs = useAttrs() as { class?: string[] };
const parentComponent = getCurrentInstance()?.parent;
if (!parentComponent || parentComponent.type.name !== 'UiToggleButtonGroup') {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('UiToggleButton has to be child of UiToggleButtonGroup');
  }
}
const modelValue = inject('modelValue') as WritableComputedRef<ToggleButtonValue>;
const isChecked = computed(() => (modelValue && equal(modelValue.value, props.value)));
const clickHandler = (): void => {
  modelValue.value = props.value;
};
watch(isChecked, () => {
  emit(isChecked.value ? 'check' : 'uncheck');
});
const isDisabled = computed(() => !!attrs.class && attrs.class.includes('ui-toggle-button--is-disabled'));
const hasIcon = computed(() => !!attrs.class && attrs.class.includes('ui-toggle-button--has-icon'));
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.ui-toggle-button {
  $this: &;
  $element: toggle-button;

  @include mixins.use-logical($element, border-radius, 0);
  @include mixins.focus {
    z-index: 1;
  }

  flex: 1;

  &:not(:last-of-type) {
    &::after {
      @include mixins.use-logical($element, border-width, 1px 0 1px 1px);
    }
  }

  &:first-of-type {
    @include mixins.use-logical($element, border-radius, var(--border-radius-button) 0);
  }

  &:last-of-type {
    @include mixins.use-logical($element, border-radius, 0 var(--border-radius-button));
  }
}
</style>

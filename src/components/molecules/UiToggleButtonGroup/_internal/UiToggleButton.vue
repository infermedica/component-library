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
import type { WritableComputedRef } from 'vue';
import equal from 'fast-deep-equal';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../../atoms/UiButton/UiButton.vue';
import type { ToggleButtonGroupProps } from '../UiToggleButtonGroup.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface ToggleButtonProps {
  /**
   * Use this props to set value of toggle button.
   */
  value?: ToggleButtonGroupProps['modelValue'];
}
export type ToggleButtonAttrsProps = DefineAttrsProps<ToggleButtonProps, ButtonAttrsProps>
export interface ToggleButtonEmits {
  (e:'check'): void;
  (e:'uncheck'): void;
}

const props = withDefaults(defineProps<ToggleButtonProps>(), { value: '' });
const emit = defineEmits<ToggleButtonEmits>();
const attrs = useAttrs() as ToggleButtonAttrsProps;
const parentComponent = getCurrentInstance()?.parent;
if (!parentComponent || parentComponent.type.name !== 'UiToggleButtonGroup') {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('UiToggleButton has to be child of UiToggleButtonGroup');
  }
}
const modelValue = inject<WritableComputedRef<ToggleButtonGroupProps['modelValue']>>('modelValue', computed(() => ''));
const isChecked = computed(() => (modelValue && equal(modelValue.value, props.value)));
const clickHandler = () => {
  modelValue.value = props.value;
};
watch(isChecked, () => {
  if (isChecked.value) {
    emit('check');
  } else {
    emit('uncheck');
  }
});
const isDisabled = computed(() => !!attrs.class.includes('ui-toggle-button--is-disabled'));
const hasIcon = computed(() => !!attrs.class.includes('ui-toggle-button--has-icon'));
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.ui-toggle-button {
  $this: &;
  $element: toggle-button;

  @include mixins.focus {
    z-index: 1;
  }

  flex: 1;

  &:not(:last-of-type) {
    @include mixins.use-logical($element, border-radius, 0);

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

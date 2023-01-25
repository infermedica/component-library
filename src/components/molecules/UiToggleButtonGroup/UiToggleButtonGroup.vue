<template>
  <div
    class="ui-toggle-button-group"
    role="radiogroup"
  >
    <!-- @slot Use this slot to place content inside component.-->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiToggleButton
          v-bind="toggleButtonAttrs(item)"
        >
          <slot
            :name="item.name"
            v-bind="{ item }"
          >
            {{ item.text }}
          </slot>
        </UiToggleButton>
      </template>
    </slot>
  </div>
</template>

<script lang="ts">
export default { name: 'UiToggleButtonGroup' };
</script>

<script setup lang="ts">
import {
  computed,
  provide,
} from 'vue';
import equal from 'fast-deep-equal';
import UiToggleButton from './_internal/UiToggleButton.vue';
import type { ToggleButtonAttrsProps } from './_internal/UiToggleButton.vue';
import type { DefineAttrsProps } from '../../../types';

export interface ToggleButtonRenderItemComplex extends ToggleButtonAttrsProps {
  name: string;
  text: string | number;
  value: string | number;
}
export type ToggleButtonRenderItem = number | string | ToggleButtonRenderItemComplex;
export interface ToggleButtonGroupProps {
  /**
   * Use this props or v-model to set value.
   */
  modelValue?: number | string | Record<string, unknown>;
  /**
   * Use this prop to set to allow deselecting selected value.
   */
  deselectable?: boolean;
  /**
   * Use this props to pass list of toggle buttons.
   */
  items?: ToggleButtonRenderItem[];
}
export type ToggleButtonGroupAttrsProps = DefineAttrsProps<ToggleButtonGroupProps>
export interface ToggleButtonGroupEmits {
  (e: 'update:modelValue', value: ToggleButtonGroupProps['modelValue']): void
}

const props = withDefaults(defineProps<ToggleButtonGroupProps>(), {
  modelValue: '',
  deselectable: false,
  items: () => ([]),
});
const emit = defineEmits<ToggleButtonGroupEmits>();
const innerValue = computed({
  get: (): ToggleButtonGroupProps['modelValue'] => (props.modelValue),
  set: (newValue: ToggleButtonGroupProps['modelValue']): void => {
    const isEquals = equal(props.modelValue, newValue);
    if (props.deselectable) {
      emit('update:modelValue', !isEquals ? newValue : undefined);
    } else if (!isEquals) {
      emit('update:modelValue', newValue);
    }
  },
});
provide('modelValue', innerValue);
const itemsToRender = computed<ToggleButtonRenderItemComplex[]>(() => (
  props.items.map((item, key) => {
    if (typeof item === 'string' || typeof item === 'number') {
      return {
        name: `toggle-button-${key}`,
        text: item,
        value: item,
      };
    }
    return {
      ...item,
      name: item.name || `toggle-button-${key}`,
      value: item.value,
    };
  })
));
const toggleButtonAttrs = (item: ToggleButtonRenderItemComplex) => {
  const {
    name, text, ...rest
  } = item;
  return rest;
};
</script>

<style lang="scss">
.ui-toggle-button-group {
  $element: toggle-button-group;

  position: relative;
  z-index: 0;
  display: flex;
}
</style>

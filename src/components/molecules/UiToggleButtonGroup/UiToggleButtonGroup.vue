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
          v-bind="(()=>{const {
            name, text, ...rest
          } = item; return rest;})()"
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
import type { PropType } from 'vue';
import equal from 'fast-deep-equal';
import UiToggleButton from './_internal/UiToggleButton.vue';

export type ToggleButtonValue = number | string | Record<string, unknown> | undefined | null;
export interface ToggleButtonItemAsObj{
  name: string;
  text: string;
  value: ToggleButtonValue;
  toggleButtonAttrs?: Record<string, unknown>
  [key: string]: ToggleButtonValue | undefined;
}
export type ToggleButtonItem = number | string | ToggleButtonItemAsObj;
const props = defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: [
      Number,
      String,
      Object,
    ] as PropType<ToggleButtonValue>,
    default: '',
  },
  /**
   * Use this prop to set to allow deselecting selected value.
   */
  deselectable: {
    type: Boolean,
    default: false,
  },
  /**
   * Use this props to pass list of toggle buttons.
   */
  items: {
    type: Array as PropType<ToggleButtonItem[]>,
    default: () => ([]),
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: ToggleButtonValue): void}>();
const innerValue = computed<ToggleButtonValue>({
  get: (): ToggleButtonValue => (props.modelValue),
  set: (newValue: ToggleButtonValue): void => {
    const isEquals = equal(props.modelValue, newValue);
    if (props.deselectable) {
      emit('update:modelValue', !isEquals ? newValue : null);
    } else if (!isEquals) {
      emit('update:modelValue', newValue);
    }
  },
});
provide('modelValue', innerValue);
const itemsToRender = computed(() => (
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
  })));
</script>

<style lang="scss">
.ui-toggle-button-group {
  $element: toggle-button-group;

  position: relative;
  z-index: 0;
  display: flex;
}
</style>

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
          :value="item.value"
          v-bind="item.toggleButtonAttrs"
        >
          <slot
            :name="item.name"
            v-bind="{item}"
          >
            {{ item.text }}
          </slot>
        </UiToggleButton>
      </template>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'UiToggleButtonGroup',
};
</script>

<script setup>
import { computed, provide } from 'vue';
import equal from 'fast-deep-equal';
import UiToggleButton from './_internal/UiToggleButton.vue';

const props = defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: [Number, String, Object],
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
    type: Array,
    default: () => ([]),
  },
});
const emit = defineEmits(['update:modelValue']);
const innerValue = computed({
  get: () => (props.modelValue),
  set: (newValue) => {
    const isEquals = equal(props.modelValue, newValue);
    if (props.deselectable) {
      emit('update:modelValue', (!isEquals && props.deselectable) ? newValue : null);
    } else if (!isEquals) {
      emit('update:modelValue', newValue);
    }
  },
});

provide('modelValue', innerValue);

const itemsToRender = computed(() => (props.items.map((item, key) => {
  if (typeof item === 'string') {
    return {
      name: `toggle-button-${key}`,
      text: item,
      value: item,
    };
  }
  return {
    name: item.name || `toggle-button-${key}`,
    ...item,
    value: item.value || item,
  };
})));
</script>

<style lang="scss">
.ui-toggle-button-group {
  display: var(--toggle-button-group-display, flex);
}
</style>

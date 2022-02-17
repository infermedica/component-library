<template>
  <div
    class="ui-toggle-button-group"
    role="radiogroup"
  >
    <!-- @slot Use this slot to place content inside component.-->
    <slot />
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

const props = defineProps({
  modelValue: {
    type: [Number, String, Object],
    default: '',
  },
  deselectable: {
    type: Boolean,
    default: false,
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
</script>

<style lang="scss">
.ui-toggle-button-group {
  display: var(--toggle-button-group-display, flex);
}
</style>

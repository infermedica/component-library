<template>
  <UiCheckbox
    class="ui-switch"
    :model-value="modelValue"
    @update:modelValue="updateHandler"
  >
    <template #checkbutton="{checked}">
      <!-- @slot Use this slot to replace switch control template. -->
      <slot
        name="switchcontrol"
        v-bind="{checked}"
      >
        <UiSwitchControl />
      </slot>
    </template>
    <template
      v-for="slot in Object.keys($slots)"
      #[slot]="data"
    >
      <slot
        :name="slot"
        v-bind="data"
      />
    </template>
  </UiCheckbox>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import UiCheckbox from '../../atoms/UiCheckbox/UiCheckbox.vue';
import UiSwitchControl from './_internal/UiSwitchControl.vue';
import type { CheckboxModelValue } from '../../atoms/UiCheckbox/UiCheckbox.vue';

defineProps({
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue: {
    type: [Boolean, Array] as PropType<CheckboxModelValue>,
    default: false,
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: CheckboxModelValue): void}>();
const updateHandler = (value: CheckboxModelValue): void => {
  emit('update:modelValue', value);
};
</script>

<style lang="scss">
.ui-switch {
  width: fit-content;
  align-items: center;
}
</style>

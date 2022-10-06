<template>
  <UiDatepickerTab
    class="ui-datepicker-day-tab"
  >
    <UiDatepickerTabItem
      v-for="i in 31"
      :key="i"
      class="ui-datepicker-day-tab__item"
      :class="{
        'ui-button--is-selected': parseInt(day) === i,
        'ui-button--is-disabled': isDisabled(i),
      }"
      :disabled="isDisabled(i)"
      @click="select(i)"
    >
      {{ formatDay(i) }}
    </UiDatepickerTabItem>
  </UiDatepickerTab>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
} from 'vue';
import type { Ref } from 'vue';
import UiDatepickerTab from './UiDatepickerTab.vue';
import UiDatepickerTabItem from './UiDatepickerTabItem.vue';

const props = defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits<{(e:'update:modelValue', value: string): void, (e: 'select', value: {type: 'day'; value: number}): void }>();
const isDisabled = inject('checkDayAvailability') as (day: number) => boolean;
const unfulfilledDayError = inject('unfulfilledDay') as Ref<boolean>;

const day = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', value); },
});

function formatDay(value: number): string {
  return `${value}`.padStart(2, '0');
}

function select(value: number): void {
  emit('select', {
    type: 'day',
    value,
  });
  day.value = formatDay(value);
  unfulfilledDayError.value = false;
}
</script>

<style lang="scss">
.ui-datepicker-day-tab {
  $this: &;
  $element: datepicker-day-tab;

  &__item {
    &:nth-of-type(-n+7) {
      margin: 0;
    }
  }
}
</style>

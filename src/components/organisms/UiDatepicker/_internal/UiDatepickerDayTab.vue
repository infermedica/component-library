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
  ref,
  type Ref,
} from 'vue';
import type { DatepickerCheckAvailability } from '../UiDatepicker.vue';
import UiDatepickerTab from './UiDatepickerTab.vue';
import type { DatepickerTabAttrsProps } from './UiDatepickerTab.vue';
import UiDatepickerTabItem from './UiDatepickerTabItem.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface DatepickerDayTabProps {
  /**
   * Use this props or v-model to set value.
   */
  modelValue?: string;
}
export type DatepickerDayTabAttrsProps = DefineAttrsProps<DatepickerDayTabProps, DatepickerTabAttrsProps>;
export interface DatepickerDayTabEmits {
  (e:'update:modelValue', value: string): void;
  (e: 'select', value: {type: 'day'; value: number}): void
}

const props = withDefaults(defineProps<DatepickerDayTabProps>(), { modelValue: '' });
const emit = defineEmits<DatepickerDayTabEmits>();
const isDisabled = inject<DatepickerCheckAvailability>('checkDayAvailability', () => false);
const unfulfilledDayError = inject<Ref<boolean>>('unfulfilledDay', ref(false));
const day = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', value); },
});
const formatDay = (value: number) => `${value}`.padStart(2, '0');
const select = (value: number) => {
  emit('select', {
    type: 'day',
    value,
  });
  day.value = formatDay(value);
  unfulfilledDayError.value = false;
};
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.ui-datepicker-day-tab {
  $this: &;
  $element: datepicker-day-tab;

  /* stylelint-disable-next-line selector-class-pattern */
  .ui-datepicker-tab__content {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    row-gap: var(--space-4);
  }

  &__item {
    --datepicker-tab-item-width: 100%;

    &.ui-button {
      overflow-wrap: normal;
      white-space: nowrap;
      word-break: normal;
    }

    &.ui-datepicker-tab-item {
      @include mixins.use-logical($element, margin, 0);
    }
  }
}
</style>

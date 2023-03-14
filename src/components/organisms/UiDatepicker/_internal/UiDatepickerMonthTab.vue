<template>
  <UiDatepickerTab
    class="ui-datepicker-month-tab"
  >
    <UiDatepickerTabItem
      v-for="i in 12"
      :key="i"
      class="ui-datepicker-month-tab__item"
      :class="{
        'ui-button--is-selected': parseInt(month, 10) == i,
        'ui-button--is-disabled': isDisabled(i),
      }"
      :disabled="isDisabled(i)"
      @click="select(`${i}`)"
    >
      {{ monthNames[i-1] }}
    </UiDatepickerTabItem>
  </UiDatepickerTab>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  ref,
} from 'vue';
import type { Ref } from 'vue';
import type { DatepickerCheckAvailability } from '../UiDatepicker.vue';
import UiDatepickerTab from './UiDatepickerTab.vue';
import type { DatepickerTabAttrsProps } from './UiDatepickerTab.vue';
import UiDatepickerTabItem from './UiDatepickerTabItem.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface DatepickerMonthTabProps {
  /**
   * Use this props or v-model to set value.
   */
  modelValue?: string;
}
export type DatepickerMonthTabAttrsProps = DefineAttrsProps<DatepickerMonthTabProps, DatepickerTabAttrsProps>;
export interface DatepickerMonthTabEmits {
  (e:'update:modelValue', value: string): void;
  (e: 'select', value: {type: 'month'; value: string}): void;
}

const props = withDefaults(defineProps<DatepickerMonthTabProps>(), { modelValue: '' });
const emit = defineEmits<DatepickerMonthTabEmits>();
const monthNames = inject('monthNames') as string[];
const isDisabled = inject<DatepickerCheckAvailability>('checkMonthAvailability', () => false);
const unfulfilledMonthError = inject<Ref<boolean>>('unfulfilledMonth', ref(false));
const month = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', value); },
});
const select = (value: string) => {
  emit('select', {
    type: 'month',
    value,
  });
  month.value = value.length === 1 ? `0${value}` : value;
  unfulfilledMonthError.value = false;
};
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.ui-datepicker-month-tab {
  $this: &;
  $element: datepicker-month-tab;

  &__item {
    @include mixins.override-logical(datepicker-tab-item, null, margin, var(--space-16) 0 0 0);

    --datepicker-tab-item-width: calc(100% / 3);

    &:nth-of-type(-n+3) {
      @include mixins.use-logical($element, margin, 0);
    }
  }
}
</style>

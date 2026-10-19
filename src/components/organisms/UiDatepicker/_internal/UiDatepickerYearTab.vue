<template>
  <UiDatepickerTab
    class="ui-datepicker-year-tab"
  >
    <UiDatepickerTabItem
      v-for="(yearItem, key) in yearsList"
      :key="key"
      class="ui-datepicker-year-tab__item"
      :class="{
        'ui-button--is-selected': parseInt(year, 10) == yearItem,
        'ui-button--is-disabled': isDisabled(yearItem),
      }"
      :disabled="isDisabled(yearItem)"
      @click="select(`${yearItem}`)"
    >
      {{ yearItem }}
    </UiDatepickerTabItem>
  </UiDatepickerTab>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  ref,
  type ComputedRef,
  type Ref,
} from 'vue';
import UiDatepickerTab from './UiDatepickerTab.vue';
import type { DatepickerTabAttrsProps } from './UiDatepickerTab.vue';
import UiDatepickerTabItem from './UiDatepickerTabItem.vue';
import type { DefineAttrsProps } from '../../../../types';
import type { DatepickerCheckAvailability } from '../UiDatepicker.vue';

export interface DatepickerYearTabProps {
  /**
   * Use this props or v-model to set value.
   */
  modelValue?: string;
}
export type DatepickerYearTabAttrsProps = DefineAttrsProps<DatepickerYearTabProps, DatepickerTabAttrsProps>;
export interface DatepickerYearTabEmits {
  (e:'update:modelValue', value: string): void;
  (e: 'select', value: {type: 'year'; value: string}): void;
}

const props = withDefaults(defineProps<DatepickerYearTabProps>(), { modelValue: '' });
const emit = defineEmits<DatepickerYearTabEmits>();
const yearsList = inject<ComputedRef<number[]>>('yearsList', computed(() => ([])));
const isDisabled = inject<DatepickerCheckAvailability>('checkYearAvailability', () => false);
const unfulfilledYearError = inject<Ref<boolean>>('unfulfilledYear', ref(false));
const year = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', value); },
});
const select = (value: string) => {
  emit('select', {
    type: 'year',
    value,
  });
  year.value = value;
  unfulfilledYearError.value = false;
};
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.ui-datepicker-year-tab {
  $this: &;
  $element: datepicker-year-tab;

  --datepicker-tab-content-display: grid;
  --datepicker-tab-content-columns: repeat(5, minmax(0, 1fr));
  --datepicker-tab-content-row-gap: var(--space-4);

  @include mixins.to(320px) {
    --datepicker-tab-content-columns: repeat(3, minmax(0, 1fr));
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

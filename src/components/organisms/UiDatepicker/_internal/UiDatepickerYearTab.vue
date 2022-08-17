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
import { computed, inject } from 'vue';
import type { ComputedRef, Ref } from 'vue';
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
const emit = defineEmits<{(e: 'update:modelValue', value: string): void, (e: 'select', value: {type: 'year', value: string}): void}>();
const yearsList = inject('yearsList') as ComputedRef<number[]>;
const isDisabled = inject('checkYearAvailability') as (year: number) => boolean;
const unfulfilledYearError = inject('unfulfilledYear') as Ref<boolean>;

const year = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', value); },
});

function select(value: string): void {
  emit('select', { type: 'year', value });
  year.value = value;
  unfulfilledYearError.value = false;
}
</script>

<style lang="scss">
@import "../../../../styles/mixins/mixins";
@import "../../../../styles/functions/functions";

.ui-datepicker-year-tab {
  $this: &;
  $element: datepicker-year-tab;

  &__item {
    --datepicker-tab-item-width: calc(100% / 5);

    &:nth-of-type(-n+5) {
      margin: 0;
    }
  }
}
</style>

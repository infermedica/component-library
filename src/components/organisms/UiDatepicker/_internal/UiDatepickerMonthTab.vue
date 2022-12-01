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
const emit = defineEmits<{(e: 'update:modelValue', value: string): void, (e: 'select', value: {type: 'month', value: string}): void}>();
const monthNames = inject('monthNames') as string[];
const isDisabled = inject('checkMonthAvailability') as (month: number) => boolean;
const unfulfilledMonthError = inject('unfulfilledMonth') as Ref<boolean>;

const month = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', value); },
});

function select(value: string): void {
  emit('select', {
    type: 'month',
    value,
  });
  month.value = value.length === 1 ? `0${value}` : value;
  unfulfilledMonthError.value = false;
}
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.ui-datepicker-month-tab {
  $this: &;
  $element: datepicker-month-tab;

  &__item {
    --datepicker-tab-item-width: calc(100% / 3);
    --datepicker-tab-item-margin-block: var(--space-16) 0 ;
    --datepicker-tab-item-margin-inline: 0;

    &:nth-of-type(-n+3) {
      @include mixins.use-logical($element, margin, 0);
    }
  }
}
</style>

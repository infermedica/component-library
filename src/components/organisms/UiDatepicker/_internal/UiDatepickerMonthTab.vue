<template>
  <UiTabsItem
    class="ui-datepicker-month-tab"
  >
    <UiButton
      v-for="i in 12"
      :key="i"
      class="ui-button--text ui-datepicker-month-tab__label"
      :class="{
        'ui-datepicker-month-tab__label--selected': parseInt(month, 10) === i,
        'ui-button--is-disabled': isDisabled(i),
      }"
      :disabled="isDisabled(i)"
      @click="select(`${i}`)"
    >
      {{ monthNames[i-1] }}
    </UiButton>
  </UiTabsItem>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
} from 'vue';
import type { Ref } from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiTabsItem from '../../UiTabs/_internal/UiTabsItem.vue';

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
  emit('select', { type: 'month', value });
  month.value = value.length === 1 ? `0${value}` : value;
  unfulfilledMonthError.value = false;
}
</script>

<style lang="scss">
.ui-datepicker-month-tab {
  --datepicker-tab-content-padding:
    var(
      --datepicker-month-tab-content-padding,
      var(--space-16) var(--space-20) var(--space-8)
    );

  &__label {
    --button-color: var(--datepicker-date-label-color, var(--color-text-body));
    --button-hover-color: var(--datepicker-date-label-hover-color, var(--color-text-body));
    --button-active-color: var(--datepicker-date-label-active-color, var(--color-text-body));
    --button-hover-background: var(--datepicker-date-label-hover-background, var(--color-background-white-active));
    --button-active-background: var(--datepicker-date-label-background, var(--color-background-white-active));

    width: var(--datepicker-month-tab-label-width, calc(100% / 3));
    height: var(--datepicker-month-tab-label-heigh, 2.5rem);
    margin: var(--datepicker-month-tab-label-margin, 0 0 var(--space-16) 0);

    &:focus {
      z-index: 1;
    }

    &--selected {
      --button-background: var(--datepicker-date-label-selected-background, var(--color-background-selection));
      --button-color: var(--datepicker-date-label-selected-color, var(--color-text-on-selection));
      --button-hover-color: var(--datepicker-date-label-selected-hover-color, var(--color-text-on-selection));
      --button-hover-background: var(--datepicker-date-label-selected-hover-background, var(--color-background-selection));
    }
  }
}
</style>

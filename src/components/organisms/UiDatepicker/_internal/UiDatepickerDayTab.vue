<template>
  <UiTabsItem
    name="day"
    class="ui-datepicker-day-tab"
  >
    <UiButton
      v-for="i in 31"
      :key="i"
      class="ui-button--text ui-datepicker-day-tab__label"
      :class="{
        'ui-datepicker-day-tab__label--selected': day == i,
        'ui-button--is-disabled': isDisabled(i),
      }"
      :disabled="isDisabled(i)"
      @click="select(i)"
    >
      {{ formatDay(i) }}
    </UiButton>
  </UiTabsItem>
</template>

<script setup>
import {
  computed,
  inject,
} from 'vue';
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
const emit = defineEmits(['update:modelValue', 'change', 'select']);
const isDisabled = inject('checkDayAvailability');
const unfulfilledDayError = inject('unfulfilledDay');

const day = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', value); },
});

function formatDay(value) {
  return `${value}`.padStart(2, '0');
}

function select(value) {
  emit('select', { type: 'day', value });
  day.value = formatDay(value);
  unfulfilledDayError.value = false;
}
</script>

<style lang="scss">
.ui-datepicker-day-tab {
  --datepicker-tab-content-padding:
    var(
      --datepicker-day-tab-content-padding,
      var(--space-16) var(--space-20) var(--space-12)
    );

  &__label {
    --button-color: var(--datepicker-date-label-color, var(--color-text-body));
    --button-hover-color: var(--datepicker-date-label-hover-color, var(--color-text-body));
    --button-active-color: var(--datepicker-date-label-active-color, var(--color-text-body));
    --button-hover-background: var(--datepicker-date-label-hover-background, var(--color-background-white-active));
    --button-active-background: var(--datepicker-date-label-background, var(--color-background-white-active));

    width: var(--datepicker-day-tab-label-width, calc(100% / 7));
    height: var(--datepicker-day-tab-label-heigh, 2.5rem);
    margin: var(--datepicker-day-tab-label-margin, 0 0 var(--space-4) 0);

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

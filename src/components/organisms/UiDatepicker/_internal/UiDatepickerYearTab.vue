<template>
  <UiTabsItem
    class="ui-datepicker-year-tab"
  >
    <UiButton
      v-for="(yearItem, key) in yearsList"
      :key="key"
      class="ui-button--text ui-datepicker-year-tab__label"
      :class="{
        'ui-datepicker-year-tab__label--selected': year == yearItem,
        'ui-button--is-disabled': isDisabled(yearItem),
      }"
      :disabled="isDisabled(yearItem)"
      @click="select(`${yearItem}`)"
    >
      {{ yearItem }}
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
const yearsList = inject('yearsList');
const isDisabled = inject('checkYearAvailability');
const unfulfilledYearError = inject('unfulfilledYear');

const year = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', value); },
});

function select(value) {
  emit('select', { type: 'year', value });
  year.value = value;
  unfulfilledYearError.value = false;
}
</script>

<style lang="scss">
.ui-datepicker-year-tab {
  --datepicker-tab-content-padding:
    var(
      --datepicker-year-tab-content-padding,
      var(--space-16) var(--space-20) var(--space-12)
    );

  &__label {
    --button-color: var(--datepicker-date-label-color, var(--color-text-body));
    --button-hover-color: var(--datepicker-date-label-hover-color, var(--color-text-body));
    --button-active-color: var(--datepicker-date-label-active-color, var(--color-text-body));
    --button-hover-background: var(--datepicker-date-label-hover-background, var(--color-background-white-active));
    --button-active-background: var(--datepicker-date-label-background, var(--color-background-white-active));

    width: var(--datepicker-year-tab-label-width, calc(100% / 5));
    height: var(--datepicker-year-tab-label-heigh, 2.5rem);
    margin: var(--datepicker-year-tab-label-margin, 0 0 var(--space-4) 0);

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

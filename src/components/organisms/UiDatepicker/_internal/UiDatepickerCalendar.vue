<template>
  <UiDropdown
    ref="dropdown"
    v-click-outside="clickOutsideValue"
    class="ui-datepicker-calendar"
    :enable-keyboard-navigation="false"
    :toggle-element="toggleElement"
  >
    <template
      #toggle="{
        toggleHandler,
        buttonToggleAttrs,
      }"
    >
      <slot
        name="toggle"
        v-bind="{
          toggleHandler,
          buttonToggleAttrs,
          iconToggleAttrs: defaultProps.iconToggleAttrs,
        }"
      >
        <UiButton
          ref="toggleElement"
          class="ui-button--circled"
          v-bind="buttonToggleAttrs"
          @click="openCalendar(toggleHandler, $event)"
        >
          <UiIcon
            v-bind="defaultProps.iconToggleAttrs"
            class="ui-button__icon"
          />
        </UiButton>
      </slot>
    </template>
    <template #content>
      <UiTabs
        v-model="currentTabId"
        v-bind="tabsAttrs"
        class="ui-tabs--fixed ui-datepicker-calendar__tabs"
      >
        <component
          :is="tabComponentSelector(datePart)"
          v-for="(datePart, key) in order"
          :key="key"
          v-model="date[datePart]"
          v-bind="getDefaultProp(datePart)"
          :title="capitalizeFirst<DatepickerDatePart>(translation[datePart])"
          @update:model-value="goToNextTab"
          @select="$emit('select', $event)"
        />
      </UiTabs>
    </template>
  </UiDropdown>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  ref,
  watch,
  watchEffect,
  type ComputedRef,
} from 'vue';
import {
  clickOutside as vClickOutside,
  type VClickOutsideValue,
} from '../../../../utilities/directives';
import { capitalizeFirst } from '../../../../utilities/helpers';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiDropdown from '../../../molecules/UiDropdown/UiDropdown.vue';
import type { DropdownAttrsProps } from '../../../molecules/UiDropdown/UiDropdown.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import UiTabs from '../../UiTabs/UiTabs.vue';
import type { TabsAttrsProps } from '../../UiTabs/UiTabs.vue';
import UiDatepickerDayTab from './UiDatepickerDayTab.vue';
import type { DatepickerDayTabAttrsProps } from './UiDatepickerDayTab.vue';
import UiDatepickerMonthTab from './UiDatepickerMonthTab.vue';
import type { DatepickerMonthTabAttrsProps } from './UiDatepickerMonthTab.vue';
import UiDatepickerYearTab from './UiDatepickerYearTab.vue';
import type { DatepickerYearTabAttrsProps } from './UiDatepickerYearTab.vue';
import type {
  DatepickerDatePart,
  DatepickerDate,
} from '../UiDatepicker.vue';
import type {
  DefineAttrsProps,
  Icon,
} from '../../../../types';

export type DatepickerTab = InstanceType<typeof UiDatepickerDayTab
  | typeof UiDatepickerMonthTab
  | typeof UiDatepickerYearTab
>;
export type DatepickerTabAttrName = `tabsItem${Capitalize<DatepickerDatePart>}Attrs`;
export interface DatepickerCalendarProps {
  /**
   * Use this props to set current tab value.
   */
  lastFocused?: DatepickerDatePart;
  /**
   * Use this props to pass attrs for UiIcon.
   */
  iconToggleAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for UiTabs.
   */
  tabsAttrs?: TabsAttrsProps;
  /**
   * Use this props to pass attrs for day UiTabsItem.
   */
  tabsItemDayAttrs?: DatepickerDayTabAttrsProps;
  /**
   * Use this props to pass attrs for month UiTabsItem.
   */
  tabsItemMonthAttrs?: DatepickerMonthTabAttrsProps;
  /**
   * Use this props to pass attrs for year UiTabsItem.
   */
  tabsItemYearAttrs?: DatepickerYearTabAttrsProps;
}
export type DatepickerCalendarAttrsProps = DefineAttrsProps<DatepickerCalendarProps, DropdownAttrsProps>;
export interface DatepickerCalendarEmits {
  (e: 'open', value: Event): void;
  (e: 'select', value: Event): void;
}

const props = withDefaults(defineProps<DatepickerCalendarProps>(), {
  lastFocused: 'day',
  iconToggleAttrs: () => ({ icon: 'calendar' }),
  tabsAttrs: () => ({}),
  tabsItemDayAttrs: () => ({ id: 'datepicker-calendar-day' }),
  tabsItemMonthAttrs: () => ({ id: 'datepicker-calendar-month' }),
  tabsItemYearAttrs: () => ({ id: 'datepicker-calendar-year' }),
});
const defaultProps = computed(() => {
  const icon: Icon = 'calendar';
  return {
    iconToggleAttrs: {
      icon,
      ...props.iconToggleAttrs,
    },
    tabsItemDayAttrs: {
      id: 'datepicker-calendar-day',
      ...props.tabsItemDayAttrs,
    },
    tabsItemMonthAttrs: {
      id: 'datepicker-calendar-month',
      ...props.tabsItemMonthAttrs,
    },
    tabsItemYearAttrs: {
      id: 'datepicker-calendar-year',
      ...props.tabsItemYearAttrs,
    },
  };
});
const emit = defineEmits<DatepickerCalendarEmits>();
const dropdown = ref<InstanceType<typeof UiDropdown> | null>(null);
const toggleElement = ref<HTMLElement | null>(null);
const translation = inject<Record<DatepickerDatePart, string>>('translation', {
  day: 'day',
  month: 'month',
  year: 'year',
});
const order = inject<DatepickerDatePart[]>('order', [
  'day',
  'month',
  'year',
]);
const date = inject<DatepickerDate<string>>('date', {
  day: '',
  month: '',
  year: '',
});
const currentTab = ref<DatepickerDatePart>(order[0]);
const getDefaultProp = (datePart: DatepickerDatePart) => defaultProps.value[`tabsItem${capitalizeFirst<DatepickerDatePart>(datePart)}Attrs`];
const dateParts = computed(() => (
  (Object.keys(date) as DatepickerDatePart[]).reduce<Record<string, DatepickerDatePart>>(
    (ids, key) => ({
      ...ids,
      [getDefaultProp(key).id]: key,
    }),
    {},
  )));
const currentTabId = computed({
  get: () => (getDefaultProp(currentTab.value).id),
  set: (id: string) => {
    currentTab.value = dateParts.value[id];
  },
});
const firstEmptyTab = computed(() => (order.find((key) => !date[key])));
const tabComponentSelector = (datePart: DatepickerDatePart) => {
  switch (datePart) {
    case ('day'):
      return UiDatepickerDayTab;
    case ('month'):
      return UiDatepickerMonthTab;
    case ('year'):
      return UiDatepickerYearTab;
    default:
      return '';
  }
};
const isDateFulfilled = inject<ComputedRef<boolean>>('isDateFulfilled', computed(() => false));
const openCalendar = (open: () => Promise<void>, event: Event) => {
  if (dropdown.value?.isOpen) return;
  emit('open', event);
  // TODO: if no empty Tabs try to focus first tab with error
  currentTab.value = isDateFulfilled.value
    ? order[0]
    : (firstEmptyTab.value || props.lastFocused);
  open();
};
watchEffect(() => {
  currentTab.value = props.lastFocused;
});
watch(isDateFulfilled, (dateFulfilled) => {
  const focusedLastInput = props.lastFocused === order.at(-1);
  if (dateFulfilled && focusedLastInput) {
    dropdown.value?.closeHandler({ focusToggle: false });
  }
});
const goToNextTab = () => {
  const currentTabIndex = order.indexOf(currentTab.value);
  if (currentTabIndex < order.length - 1) {
    currentTab.value = order[currentTabIndex + 1];
  } else if (firstEmptyTab.value) {
    const firstEmptyTabIndex = order.indexOf(firstEmptyTab.value);
    currentTab.value = order[firstEmptyTabIndex];
  } else {
    dropdown.value?.closeHandler({ focusToggle: true });
  }
};
const inputsIds = inject<ComputedRef<Record<string, DatepickerDatePart>>>('inputsIds', computed(() => ({
  'datepicker-input-day': 'day',
  'datepicker-input-month': 'month',
  'datepicker-input-year': 'year',
})));
const clickOutsideHandler = (event: MouseEvent) => {
  const target = event.target as HTMLLabelElement;
  const id = target.id;
  const htmlFor = target.htmlFor;
  const allowedIds = Object.keys(inputsIds.value);

  if (allowedIds.includes(htmlFor)) return;
  if (!allowedIds.includes(id)) {
    dropdown.value?.closeHandler({ focusToggle: false });
  }
  currentTab.value = inputsIds.value[id];
};
const clickOutsideValue = computed<VClickOutsideValue>(() => ({
  isActive: dropdown.value?.isOpen || false,
  handler: clickOutsideHandler,
}));
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-datepicker-calendar {
  $this: &;
  $element: datepicker-calendar;

  @include mixins.override-logical(dropdown-popover, $element + "-popover", padding, 0);

  --dropdown-popover-max-width: #{functions.var($element + "-popover", max-width, 100% )};

  position: unset;
}
</style>

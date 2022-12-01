<template>
  <UiDropdown
    ref="dropdown"
    v-click-outside:[isActiveClickOutside]="clickOutsideHandler"
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
          :title="capitalizeFirst(translation[datePart])"
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
  reactive,
} from 'vue';
import type {
  PropType,
  ComputedRef,
} from 'vue';
import { clickOutside as vClickOutside } from '../../../../utilities/directives';
import { capitalizeFirst } from '../../../../utilities/helpers/index';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiDropdown from '../../../molecules/UiDropdown/UiDropdown.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiTabs from '../../UiTabs/UiTabs.vue';
import UiDatepickerDayTab from './UiDatepickerDayTab.vue';
import UiDatepickerMonthTab from './UiDatepickerMonthTab.vue';
import UiDatepickerYearTab from './UiDatepickerYearTab.vue';
import type { PropsAttrs } from '../../../../types/attrs';
import type {
  DatePart,
  DatepickerDate,
  DatepickerTranslation,
} from '../UiDatepicker.vue';
import type { Icon } from '../../../../types/icon';

export type DatepickerTab = InstanceType<typeof UiDatepickerDayTab
  | typeof UiDatepickerMonthTab
  | typeof UiDatepickerYearTab
>;
export type DatepickerTabAttrName = `tabsItem${Capitalize<DatePart>}Attrs`;
const props = defineProps({
  /**
   * Use this props to set current tab value.
   */
  lastFocused: {
    type: String as PropType<DatePart>,
    default: '',
  },
  iconToggleAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for UiTabs
   */
  tabsAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for day UiTabsItem
   */
  tabsItemDayAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for month UiTabsItem
   */
  tabsItemMonthAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for year UiTabsItem
   */
  tabsItemYearAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const defaultTabsIds = computed(() => ({
  day: props.tabsItemDayAttrs?.id || 'datepicker-calendar-day',
  month: props.tabsItemDayAttrs?.id || 'datepicker-calendar-month',
  year: props.tabsItemDayAttrs?.id || 'datepicker-calendar-year',
}));
interface DefaultProps {
  iconToggleAttrs: {
    icon: Icon,
    [key:string]: unknown,
  }
  tabsItemDayAttrs: Record<string, unknown>,
  tabsItemMonthAttrs: Record<string, unknown>,
  tabsItemYearAttrs: Record<string, unknown>,
}
const defaultProps = computed<DefaultProps>(() => ({
  iconToggleAttrs: {
    icon: 'calendar',
    ...props.iconToggleAttrs,
  },
  tabsItemDayAttrs: {
    ...props.tabsItemDayAttrs,
    id: defaultTabsIds.value.day,
  },
  tabsItemMonthAttrs: {
    ...props.tabsItemMonthAttrs,
    id: defaultTabsIds.value.month,
  },
  tabsItemYearAttrs: {
    ...props.tabsItemYearAttrs,
    id: defaultTabsIds.value.year,
  },
}));
interface DefaultTabItemAttrs {
  id: string;
  [key: string]: unknown
}
const getDefaultProp = (datePart: DatePart): Record<string, unknown> => (defaultProps.value[`tabsItem${capitalizeFirst(datePart) as Capitalize<DatePart>}Attrs`]);

const emit = defineEmits<{(e:'open', value: Event): void, (e: 'select', value: Event): void}>();
const dropdown = ref<InstanceType<typeof UiDropdown> | null>(null);
const toggleElement = ref<HTMLElement | null>(null);
const translation = inject('translation') as DatepickerTranslation;
const order = inject('order') as DatePart[];
const date = inject('date') as DatepickerDate<string>;
const currentTab = ref<DatePart>(order[0]);
const dateParts = computed(() => (Object.keys(defaultProps).reduce((parts: Record<string, string>, key: string) => {
  const match = key.match(/tabsItem(.+)Attrs/);
  if (match) {
    // eslint-disable-next-line no-param-reassign
    parts[(getDefaultProp(key as DatePart) as DefaultTabItemAttrs).id] = match[1].toLowerCase();
  }
  return parts;
}, {})));
const currentTabId = computed({
  get: () => ((getDefaultProp(currentTab.value) as DefaultTabItemAttrs).id),
  set: (id) => {
    currentTab.value = dateParts.value[id] as DatePart;
  },
});
const firstEmptyTab = computed<DatePart | undefined>(() => (order.find((key) => !date[key])));
function tabComponentSelector(datePart: DatePart) {
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
}
const isActiveClickOutside = computed(() => dropdown.value?.isOpen || false);
const isDateFulfilled = inject('isDateFulfilled') as ComputedRef<boolean>;
function openCalendar(open: () => Promise<void>, event: Event): void {
  if (dropdown.value?.isOpen) return;
  emit('open', event);
  // TODO: if no empty Tabs try to focus first tab with error
  currentTab.value = isDateFulfilled.value
    ? order[0]
    : (firstEmptyTab.value || props.lastFocused);
  open();
}
watchEffect(() => {
  currentTab.value = props.lastFocused;
});
watch(isDateFulfilled, (dateFulfilled) => {
  const focusedLastInput = props.lastFocused === order.at(-1);
  if (dateFulfilled && focusedLastInput) {
    dropdown.value?.closeHandler({ focusToggle: false });
  }
});
function goToNextTab(): void {
  const currentTabIndex = order.indexOf(currentTab.value);
  if (currentTabIndex < order.length - 1) {
    currentTab.value = order[currentTabIndex + 1];
  } else if (firstEmptyTab.value) {
    const firstEmptyTabIndex = order.indexOf(firstEmptyTab.value);
    currentTab.value = order[firstEmptyTabIndex];
  } else {
    dropdown.value?.closeHandler({ focusToggle: true });
  }
}
const inputsIds = inject('inputsIds') as ComputedRef<Record<string, string>>;
const clickOutsideHandler = (event: InputEvent) => {
  const target = event.target as HTMLLabelElement;
  const id = target.id as string;
  const htmlFor = target.htmlFor as string;
  const allowedIds = Object.keys(inputsIds.value);

  if (allowedIds.includes(htmlFor)) return;
  if (!allowedIds.includes(id)) {
    dropdown.value?.closeHandler({ focusToggle: false });
  }
  currentTab.value = inputsIds.value[id] as DatePart;
};
</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-datepicker-calendar {
  $this: &;
  $element: datepicker-calendar;

  --dropdown-popover-max-width: #{functions.var($element + "-popover", max-width, 100% )};
  --dropdown-popover-padding-block: #{functions.var($element + "-popover", padding-block, 0 )};
  --dropdown-popover-padding-inline: #{functions.var($element + "-popover", padding-inline, 0 )};

  position: unset;
}
</style>

<template>
  <UiDropdown
    ref="dropdown"
    v-click-outside:[isActiveClickOutside]="clickOutsideHandler"
    class="ui-datepicker-calendar"
    :enable-keyboard-navigation="false"
    :toggle-element="toggleElement"
  >
    <template #toggle="{toggleHandler}">
      <slot
        name="toggler"
        v-bind="{toggle: toggleHandler}"
      >
        <UiButton
          ref="toggleElement"
          class="ui-button--outlined ui-button--circled ui-button--has-icon ui-datepicker-calendar__toggler"
          v-bind="buttonCalendarAttrs"
          @click="openCalendar(toggleHandler)"
        >
          <UiIcon icon="calendar" />
        </UiButton>
      </slot>
    </template>

    <template #content>
      <UiTabs
        v-model="currentTab"
        class="ui-tabs--fixed ui-datepicker-calendar__tabs"
      >
        <component
          :is="tabComponentSelector(datePart)"
          v-for="(datePart, key) in order"
          :key="key"
          v-model="date[datePart]"
          :title="capitalizeFirst(translation[datePart])"
          class="ui-datepicker-calendar__tab-content"
          @update:modelValue="goToNextTab"
          @select="$emit('select', $event)"
        />
      </UiTabs>
    </template>
  </UiDropdown>
</template>

<script setup>
import {
  computed,
  inject,
  ref,
  watch,
  watchEffect,
} from 'vue';
import { clickOutside as vClickOutside } from '../../../../utilities/directives';
import { capitalizeFirst } from '../../../../utilities/helpers';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiDropdown from '../../../molecules/UiDropdown/UiDropdown.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiTabs from '../../UiTabs/UiTabs.vue';
import UiDatepickerDayTab from './UiDatepickerDayTab.vue';
import UiDatepickerMonthTab from './UiDatepickerMonthTab.vue';
import UiDatepickerYearTab from './UiDatepickerYearTab.vue';

const props = defineProps({
  /**
     * Use this props to set current tab value.
     */
  lastFocused: {
    type: String,
    default: '',
  },
  /**
     * Use this props to pass attrs for calendar UiButton
     */
  buttonCalendarAttrs: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['update:modelValue', 'open', 'select']);
const dropdown = ref(null);
const toggleElement = ref(null);
const translation = inject('translation');
const order = inject('order');

const date = inject('date');

const currentTab = ref(`${order[0]}`);
const firstEmptyTab = computed(() => {
  let firstEmpty = '';
  // eslint-disable-next-line
      for (const [key, value] of Object.entries(date)) {
    if (!value) {
      firstEmpty = key;
      break;
    }
  }
  return firstEmpty;
});

function tabComponentSelector(datePart) {
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
const isDateFulfilled = inject('isDateFulfilled');

function openCalendar(open) {
  if (dropdown.value.isOpen) return;
  emit('open');
  // TODO: if no empty Tabs try to focus first tab with error
  currentTab.value = isDateFulfilled.value ? order.at(0) : (firstEmptyTab.value || props.lastFocused);
  open();
}

watchEffect(() => {
  currentTab.value = props.lastFocused;
});

watch(isDateFulfilled, (dateFulfilled) => {
  const focusedLastInput = props.lastFocused === order.at(-1);
  if (dateFulfilled && focusedLastInput) dropdown.value.closeHandler({ focusToggle: false });
});

function goToNextTab() {
  const currentTabIndex = order.indexOf(currentTab.value);
  if (currentTabIndex < order.length - 1) {
    currentTab.value = order[currentTabIndex + 1];
  } else if (firstEmptyTab.value) {
    const firstEmptyTabIndex = order.indexOf(firstEmptyTab.value);
    currentTab.value = order[firstEmptyTabIndex];
  } else {
    dropdown.value.closeHandler({ focusToggle: true });
  }
}

const clickOutsideHandler = ({ target: { id, htmlFor } }) => {
  const allowedIds = Object.keys(date);

  if (allowedIds.includes(htmlFor)) return;
  if (!allowedIds.includes(id)) {
    dropdown.value.closeHandler({ focusToggle: false });
    return;
  }

  currentTab.value = id;
};
</script>

<style lang="scss">
.ui-datepicker-calendar {
  --dropdown-popover-left: var(--datepicker-dropdown-popover-left, 0);
  --dropdown-popover-max-width: var(--datepicker-dropdown-popover-max-width, 100%);
  --popover-content-padding: var(--datepicker-popover-content-padding, 0);

  position: unset;

  &__toggler {
    --icon-size: var(--datepicker-toggler-icon-size, 1.125rem);
    --button-height: var(--datepicker-toggler-height, 3rem);
    --button-width: var(--datepicker-toggler-width, 3rem);

    margin: var(--datepicker-toggler-margin, var(--space-32) 0 0 0);
  }

  &__tabs {
    --tabs-item-tab-padding: var(--datepicker-tabs-item-tab-padding, var(--space-20) var(--space-4) var(--space-12));
    --tabs-item-tab-button-color:
      var(
        --datepicker-tabs-item-tab-button-color,
        var(--color-text-action-secondary)
      );
    --tabs-item-tab-button-active-color: var(--datepicker-tabs-item-tab-button-active-color, var(--color-text-body));
    --tabs-item-tab-button-margin: var(--datepicker-tabs-item-tab-button-margin, var(--space-20) 0 var(--space-12));
    --tabs-item-tab-button-last-margin:
      var(
        --datepicker-tabs-item-tab-button-last-margin,
        var(--space-20) 0 var(--space-12)
      );
    --tabs-item-tab-button-padding: var(--datepicker-tabs-item-tab-button-padding, 0);
    --tabs-underline-color: var(--datepicker-tabs-underline-color, var(--color-border-focus-dark));
  }

  &__tab-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: var(--datepicker-tab-content-height, 15.5rem);
    padding: var(--datepicker-tab-content-padding, var(--space-16) var(--space-20));
    overflow-y: auto;
  }
}
</style>

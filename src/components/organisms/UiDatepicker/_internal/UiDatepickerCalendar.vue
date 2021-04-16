<template>
  <UiDropdown
    ref="dropdown"
    class="ui-datepicker-calender"
  >
    <template #toggle="{toggleHandler}">
      <slot
        name="toggler"
        v-bind="{toggle: toggleHandler}"
      >
        <UiButton
          class="ui-button--outlined ui-button--circled ui-button--has-icon ui-datepicker-calender__toggler"
          @click="toggleHandler"
        >
          <UiIcon icon="calendar" />
        </UiButton>
      </slot>
    </template>

    <template #content>
      <UiTabs
        v-model="currentTab"
        class="ui-tabs--fixed ui-datepicker-calender__tabs"
      >
        <component
          :is="tabComponentSelector(datePart)"
          v-for="(datePart, key) in order"
          :key="key"
          v-model="date[datePart]"
          :title="capitalize(translation[datePart])"
          class="ui-datepicker-calender__tab-content"
          @update:modelValue="goToNextTab"
        />
      </UiTabs>
    </template>
  </UiDropdown>
</template>

<script>
import {
  computed,
  inject,
  ref,
} from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiDropdown from '../../../molecules/UiDropdown/UiDropdown.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiTabs from '../../UiTabs/UiTabs.vue';
import UiDatepickerDayTab from './UiDatepickerDayTab.vue';
import UiDatepickerMonthTab from './UiDatepickerMonthTab.vue';
import UiDatepickerYearTab from './UiDatepickerYearTab.vue';

export default {
  components: {
    UiButton,
    UiDropdown,
    UiIcon,
    UiTabs,
    UiDatepickerDayTab,
    UiDatepickerMonthTab,
    UiDatepickerYearTab,
  },
  props: {
    /**
     * Use this props to set cuurent tab value.
     */
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const dropdown = ref(null);
    const translation = inject('translation');
    const order = inject('order');

    const date = inject('date');

    const currentTab = computed({
      get: () => (props.modelValue),
      set: (value) => { emit('update:modelValue', value); },
    });

    function tabComponentSelector(datePart) {
      switch (datePart) {
        case ('day'):
          return 'UiDatepickerDayTab';
        case ('month'):
          return 'UiDatepickerMonthTab';
        case ('year'):
          return 'UiDatepickerYearTab';
        default:
          return '';
      }
    }

    function goToNextTab() {
      const currentTabIndex = order.indexOf(currentTab.value);
      if (currentTabIndex < order.length - 1) {
        currentTab.value = order[currentTabIndex + 1];
      } else {
        dropdown.value.isOpen = false;
      }
    }

    const capitalize = (value) => value.replace(/^\w/gm, (char) => (char.toUpperCase()));

    return {
      dropdown,
      translation,
      order,
      date,
      currentTab,
      tabComponentSelector,
      goToNextTab,
      capitalize,
    };
  },
};
</script>

<style lang="scss">
.ui-datepicker-calender {
  --dropdown-popover-left: var(--datepicker-dropdown-popover-left, 0);
  --popover-content-padding: var(--datepicker-popover-content-padding, 0);

  position: unset;

  &__toggler {
    --icon-size: var(--datepicker-toggler-icon-size, 1.125rem);
    --button-height: var(--datepicker-toggler-height, 3rem);
    --button-width: var(--datepicker-toggler-width, 3rem);

    margin: var(--datepicker-toggler-margin, var(--space-32) 0 0 0);
  }

  &__tabs {
    --tabs-item-tab-button-color:
      var(
        --datepicker-tabs-item-tab-button-color,
        var(--color-text-action-secondary-enabled)
      );
    --tabs-item-tab-button-active-color: var(--datepicker-tabs-item-tab-button-active-color, var(--color-text-body));
    --tabs-item-tab-button-margin: var(--datepicker-tabs-item-tab-button-margin, var(--space-20) 0 var(--space-12));
    --tabs-item-tab-button-last-margin:
      var(
        --datepicker-tabs-item-tab-button-last-margin,
        var(--space-20) 0 var(--space-12)
      );
    --tabs-item-tab-button-padding: var(--datepicker-tabs-item-tab-button-padding, 0);
    --tabs-underline-color: var(--datepicker-tabs-underline-color, var(--color-border-focus));
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
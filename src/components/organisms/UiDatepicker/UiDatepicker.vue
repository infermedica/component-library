<template>
  <div class="ui-datepicker">
    <UiFormField
      :error-message="errorDisplayHandler"
      class="ui-datepicker__form-fields"
    >
      <div class="ui-datepicker__fields">
        <div
          v-for="(datePart, key) in order"
          :key="key"
          class="ui-datepicker__group-field"
          :class="{ 'ui-datepicker__group-field--long': datePart === 'year'}"
        >
          <UiText
            tag="label"
            :for="datePart"
            class="ui-datepicker__label"
          >
            {{ capitalizeFirst(translation[datePart]) }}
          </UiText>
          <component
            :is="inputComponentSelector(`${datePart}`)"
            :id="datePart"
            :ref="`${datePart}Input`"
            v-model="date[datePart]"
            v-bind="{
              'error': invalid && touched,
              'valid': isInputValid[datePart],
            }"
            @change-input="focusNextField"
            @focus="synchronizeTab($event)"
          />
        </div>
      </div>
    </UiFormField>

    <UiDatepickerCalendar
      :last-focused="lastFocusedDatePart"
      v-bind="datepickerCalendarAttrs"
      class="ui-datepicker__dropdown"
    />
  </div>
</template>

<script>
import {
  computed,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
} from 'vue';
import {
  format,
  isMatch,
  lightFormat,
} from 'date-fns';
import { capitalizeFirst } from '../../../utilities/helpers';

import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiDropdown from '../../molecules/UiDropdown/UiDropdown.vue';
import UiFormField from '../../molecules/UiFormField/UiFormField.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiTabs from '../UiTabs/UiTabs.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiDatepickerDayInput from './_internal/UiDatepickerDayInput.vue';
import UiDatepickerMonthInput from './_internal/UiDatepickerMonthInput.vue';
import UiDatepickerYearInput from './_internal/UiDatepickerYearInput.vue';
import UiDatepickerCalendar from './_internal/UiDatepickerCalendar.vue';
import UiDatepickerDayTab from './_internal/UiDatepickerDayTab.vue';
import UiDatepickerMonthTab from './_internal/UiDatepickerMonthTab.vue';
import UiDatepickerYearTab from './_internal/UiDatepickerYearTab.vue';

export default {
  name: 'UiDatepicker',
  components: {
    UiButton,
    UiDropdown,
    UiFormField,
    UiIcon,
    UiTabs,
    UiText,
    UiDatepickerDayInput,
    UiDatepickerMonthInput,
    UiDatepickerYearInput,
    UiDatepickerCalendar,
    UiDatepickerDayTab,
    UiDatepickerMonthTab,
    UiDatepickerYearTab,
  },
  props: {
    /**
     * Use this props or v-model to set value.
     */
    modelValue: {
      type: String,
      default: null,
      validator: (value) => isMatch(value, 'yyyy-MM-dd') || value === '',
    },
    /**
     * Use this props to set custom error message
     */
    error: {
      type: [Boolean, String],
      default: '',
    },
    /**
     * Use this props to set input fields order
     */
    order: {
      type: Array,
      default: () => (['day', 'month', 'year']),
      validator: (value) => value.length === 3
        && value.includes('day')
        && value.includes('month')
        && value.includes('year'),
    },
    /**
     * Use this props to set invalid state of component.
     */
    invalid: {
      type: Boolean,
      default: true,
    },
    /**
     * Use this props to touch component and show validation errors.
     */
    touched: {
      type: Boolean,
      default: true,
    },
    /**
     * Use this props to set months language - default en-US
     */
    lang: {
      type: String,
      default: 'en-US',
    },
    /**
     * Use this props to override labels inside component translation.
     */
    translation: {
      type: Object,
      default: () => ({
        day: 'day',
        month: 'month',
        year: 'year',
        placeholderDay: 'DD',
        placeholderMonth: 'MM',
        placeholderYear: 'YYYY',
        errorWrongDate: 'Please enter a valid date, e.g. 05/11/1990',
        errorDateInFuture: 'Sorry, the date of birth cannot be a future date',
        errorOutOfBounds: 'Sorry, our checkup only covers people between 0 and 120 years old',
      }),
    },
    /**
     * Use this props to set minimum age limit
     */
    minLimit: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0,
    },
    /**
     *  Use this props to set maximum age limit
     */
    maxLimit: {
      type: Number,
      default: 120,
      validator: (value) => value > 0,
    },
    /**
     *  Use this props to pass attrs to UiDatepickerCalendar
     */
    datepickerCalendarAttrs: {
      type: Object,
      default: () => ({
        buttonCalendarAttrs: {
          'aria-label': 'Calendar',
        },
      }),
    },
  },
  emits: ['update:modelValue', 'update:invalid'],
  setup(props, { emit }) {
    const dropdown = ref(null);
    const dayInput = ref(null);
    const monthInput = ref(null);
    const yearInput = ref(null);

    const monthNames = ref([]);
    provide('monthNames', monthNames);

    const date = reactive(
      {
        day: '',
        month: '',
        year: '',
      },
    );
    provide('date', date);

    const currentDate = new Date();
    const currentDay = lightFormat(currentDate, 'dd');
    const currentMonth = lightFormat(currentDate, 'MM');
    const currentYear = lightFormat(currentDate, 'yyyy');

    const yearsList = computed(() => {
      const firstYear = currentDate.getUTCFullYear() - props.minLimit;
      const yearsNumber = props.maxLimit - props.minLimit + 2;
      const years = Array(yearsNumber).fill('').map((_, i) => firstYear - i);
      return years;
    });
    const firstAvailableYear = computed(() => parseInt(yearsList.value[0], 10));
    const lastAvailableYear = computed(() => parseInt(yearsList.value[yearsList.value.length - 1], 10));
    provide('yearsList', yearsList);

    function checkDayMonthLimit(day = date.day, month = date.month) {
      let daysLimit = new Date(date.year, month, 0, 0, 0, 0).getDate();
      if (day === '29' && !date.year.length) daysLimit += 1;
      return parseInt(day, 10) > daysLimit;
    }

    // Day validations
    function checkDayAvailability(day) {
      const isMonthDaysLimitExceeded = checkDayMonthLimit(day, undefined);
      const isDayAboveLimit = (parseInt(date.year, 10) === firstAvailableYear.value)
        && (date.month === currentMonth) && (day > parseInt(currentDay, 10));
      const isDayBelowLimit = (parseInt(date.year, 10) === lastAvailableYear.value)
        && (date.month === currentMonth) && (day <= parseInt(currentDay, 10));
      return isDayAboveLimit || isDayBelowLimit || isMonthDaysLimitExceeded;
    }
    const isDayValid = computed(() => {
      const selectedDay = parseInt(date.day, 10);
      return selectedDay > 0 && selectedDay <= 31 && !checkDayMonthLimit(date.day, undefined);
    });
    const isDayFulfilled = computed(() => (date.day.length === 2));
    const hasDayError = computed(() => (isDayFulfilled.value && !isDayValid.value));
    provide('checkDayAvailability', checkDayAvailability);

    // Month validations
    function checkMonthAvailability(month) {
      const isMonthDaysLimitExceeded = checkDayMonthLimit(undefined, month);
      const isMonthAboveLimit = (parseInt(date.year, 10) === firstAvailableYear.value
        && (month > parseInt(currentMonth, 10)
          || (month >= parseInt(currentMonth, 10) && currentDay < date.day))
      );
      const isMonthBelowLimit = (parseInt(date.year, 10) === lastAvailableYear.value
        && (month < parseInt(currentMonth, 10)
          || (date.day && month <= parseInt(currentMonth, 10) && currentDay > date.day))
      );
      const isCurrentLastDayOfMonth = new Date(currentYear, currentMonth, 0, 0, 0, 0).getDate()
        === parseInt(currentDay, 10);
      const monthWithoutAvailableDays = parseInt(date.year, 10) === lastAvailableYear.value
        && month === parseInt(currentMonth, 10) && isCurrentLastDayOfMonth;
      return isMonthAboveLimit || isMonthBelowLimit || isMonthDaysLimitExceeded || monthWithoutAvailableDays;
    }
    const isMonthValid = computed(() => {
      const selectedMonth = parseInt(date.month, 10);
      return selectedMonth > 0 && selectedMonth <= 12 && !checkDayMonthLimit(undefined, date.month);
    });
    const isMonthFulfilled = computed(() => (date.month.length === 2));
    const hasMonthError = computed(() => (isMonthFulfilled.value && !isMonthValid.value));
    provide('checkMonthAvailability', checkMonthAvailability);

    // Year validations
    function checkYearAvailability(year) {
      const isLeapYearLimit = ((year % 4) || (!(year % 25) && (year % 16)))
        && (parseInt(date.day, 10) === 29 && parseInt(date.month, 10) === 2);
      const isYearAboveLimit = (year === firstAvailableYear.value)
        && (currentMonth < date.month || (currentMonth <= date.month && currentDay < date.day));
      const isYearBelowLimit = (year === lastAvailableYear.value) && date.month
        && (currentMonth > date.month || (date.day && currentMonth === date.month && currentDay >= date.day));
      return isYearAboveLimit || isYearBelowLimit || isLeapYearLimit;
    }
    const isYearValid = computed(() => {
      const selectedYear = parseInt(date.year, 10);
      return yearsList.value.includes(selectedYear) && !checkYearAvailability(date.year);
    });
    const isYearFulfilled = computed(() => (date.year.length === 4));
    const hasYearError = computed(() => (isYearFulfilled.value && !isYearValid.value)
      || date.year[0] === '0');
    provide('checkYearAvailability', checkYearAvailability);

    // Date validations
    const isDateFulfilled = computed(() => isDayFulfilled.value && isMonthFulfilled.value && isYearFulfilled.value);
    const isDateEmpty = computed(() => !isDayFulfilled.value && !isMonthFulfilled.value && !isYearFulfilled.value);
    const isDateOutOfBounds = computed(() => {
      const startDate = new Date(firstAvailableYear.value, currentMonth - 1, currentDay, 0, 0, 0);
      const limitDate = new Date(lastAvailableYear.value, currentMonth - 1, currentDay, 0, 0, 0);
      if (isDateFulfilled.value) {
        const selectedDate = new Date(date.year, parseInt(date.month, 10) - 1, date.day, 0, 0, 0);
        return selectedDate > startDate || selectedDate <= limitDate;
      } if (isMonthFulfilled.value && isYearFulfilled.value) {
        const selectedDate = new Date(date.year, parseInt(date.month, 10) - 1, currentDay);
        return selectedDate > startDate || selectedDate < limitDate;
      }
      return isYearFulfilled.value && (parseInt(date.year, 10) > firstAvailableYear.value
        || parseInt(date.year, 10) < lastAvailableYear.value);
    });
    const isDateInFuture = computed(() => {
      if (isMonthValid.value && isYearFulfilled.value) {
        const selectedDate = new Date(date.year, date.month - 1, date.day);
        return selectedDate > currentDate;
      }
      return isYearFulfilled.value && parseInt(date.year, 10) > currentYear;
    });
    const isDateValid = computed(() => isDayValid.value && isMonthValid.value
      && isYearValid.value && !isDateOutOfBounds.value);

    const isInputValid = computed(() => ({
      day: isDayValid.value,
      month: isMonthValid.value,
      year: isYearValid.value,
    }));

    function assignDateParts() {
      const plainDate = new Date(`${props.modelValue}T00:00:00`);
      date.day = lightFormat(plainDate, 'dd');
      date.month = lightFormat(plainDate, 'MM');
      date.year = lightFormat(plainDate, 'yyyy');
    }

    const formattedDate = computed({
      get: () => {
        if (isMatch(props.modelValue, 'yyyy-MM-dd')) {
          assignDateParts();
        }
        return props.modelValue;
      },
      set: (value) => {
        emit('update:modelValue', value);
      },
    });

    function setDate() {
      if (isDateFulfilled.value && isDateValid.value) {
        const newDate = format(new Date(date.year, date.month - 1, date.day, 0, 0, 0), 'yyyy-MM-dd');
        formattedDate.value = newDate;
      }
      if (isDateEmpty.value) {
        formattedDate.value = '';
      }
    }

    function inputComponentSelector(datePart) {
      switch (datePart) {
        case ('day'):
          return 'UiDatepickerDayInput';
        case ('month'):
          return 'UiDatepickerMonthInput';
        case ('year'):
          return 'UiDatepickerYearInput';
        default:
          return '';
      }
    }

    const lastFocusedDatePart = ref(`${props.order[0]}`);

    function synchronizeTab(event) {
      const fieldId = event.target.id;
      lastFocusedDatePart.value = `${fieldId}`;
    }

    const focus = async (inputElement) => {
      await nextTick();
      const target = inputElement.value?.$el?.children[0];
      target.focus();
      if (target.value) target.select();
    };
    function focusInput(datePart) {
      switch (datePart) {
        case ('day'):
          focus(dayInput);
          break;
        case ('month'):
          focus(monthInput);
          break;
        case ('year'):
          focus(yearInput);
          break;
        default:
          break;
      }
    }
    function focusNextField(currentField) {
      const currentInputIndex = props.order.indexOf(currentField);
      if (currentInputIndex < props.order.length - 1) focusInput(props.order[currentInputIndex + 1]);
    }

    // TODO - refactor, for test only
    const unfulfilledDay = ref(false);
    const unfulfilledMonth = ref(false);
    const unfulfilledYear = ref(false);
    provide('unfulfilledDay', unfulfilledDay);
    provide('unfulfilledMonth', unfulfilledMonth);
    provide('unfulfilledYear', unfulfilledYear);

    const errorDisplayHandler = computed(() => {
      let error = false;

      if (isDateInFuture.value) {
        error = props.translation.errorDateInFuture;
      } else if (isDateOutOfBounds.value) {
        error = props.translation.errorOutOfBounds;
      } else if (hasDayError.value || hasMonthError.value || hasYearError.value) {
        error = props.translation.errorWrongDate;
      } else if (unfulfilledDay.value || unfulfilledMonth.value || unfulfilledYear.value) {
        error = props.translation.errorWrongDate;
      } else if (props.touched && props.error) {
        error = props.error;
      }
      return error;
    });

    const localizeMonths = async (locale) => {
      let localeFile;
      try {
        localeFile = await import(`date-fns/locale/${locale}/index`);
      } catch (error) {
        localeFile = await import('date-fns/locale/en-US/index');
        if (process.env.NODE_ENV !== 'production') {
          console.error('Unrecognized language props value, default \'en-US\' language loaded');
        }
      }
      for (let i = 0; i < 12; i += 1) {
        monthNames.value.push(localeFile.localize.month(i, { width: 'wide' }));
      }
    };

    onMounted(() => {
      localizeMonths(props.lang);
      if (props.modelValue) {
        assignDateParts();
      }
    });

    watch([() => date.day, () => date.month, () => date.year], () => {
      setDate();
    });

    watch(isDateValid, (isValid) => {
      emit('update:invalid', !isValid);
    });

    provide('translation', props.translation);
    provide('order', props.order);

    return {
      dropdown,
      dayInput,
      monthInput,
      yearInput,
      date,
      lastFocusedDatePart,
      isDateValid,
      isDateOutOfBounds,
      isInputValid,
      synchronizeTab,
      focusNextField,
      inputComponentSelector,
      errorDisplayHandler,
      capitalizeFirst,
    };
  },
};
</script>

<style lang="scss">
.ui-datepicker {
  --dropdown-popover-width: var(--datepicker-dropdown-popover-width, 20rem);

  position: relative;
  display: flex;

  &__dropdown {
    margin: var(--datepicker-dropdown-margin, 0 0 0 var(--space-24));

    [dir=rtl] & {
      margin: var(--datepicker-dropdown-margin, 0 var(--space-24) 0 0);
    }
  }

  &__form-fields {
    flex-grow: 1;
    align-items: normal;
  }

  &__fields {
    display: flex;
  }

  &__group-field {
    display: flex;
    flex: 1 1 4rem;
    flex-direction: column;
    margin: var(--datepicker-group-field-margin, 0 var(--space-8) 0 0);

    &--long {
      flex: calc(6.5 / 4) 1 6.5rem;
    }

    [dir=rtl] & {
      margin: var(--datepicker-group-field-margin, 0 0 0 var(--space-8));
    }

    &:last-child {
      margin: var(--datepicker-group-field-last-margin, 0);
    }
  }

  &__label {
    display: var(--datepicker-field-label-display, inline-block);
    margin: var(--datepicker-field-label-margin, 0 0 var(--space-8) 0);
    font: var(--datepicker-field-label-font, var(--font-body-2-comfortable));
  }
}
</style>

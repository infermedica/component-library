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
            {{ capitalize(translation[datePart]) }}
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
      v-model="currentDatePart"
      class="ui-datepicker__dropdown"
    />
  </div>
</template>

<script>
import {
  format,
  isMatch,
  lightFormat,
} from 'date-fns';
import {
  computed,
  nextTick,
  provide,
  reactive,
  ref,
  watchEffect,
} from 'vue';
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
  },
  emits: ['update:modelValue', 'update:invalid'],
  setup(props, { emit }) {
    const dropdown = ref(null);
    const dayInput = ref(null);
    const monthInput = ref(null);
    const yearInput = ref(null);

    const currentDatePart = ref(`${props.order[0]}`);

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

    const yearsList = computed(() => {
      const firstYear = new Date().getUTCFullYear() - props.minLimit;
      const yearsNumber = props.maxLimit - props.minLimit + 1;
      const years = Array(yearsNumber).fill('').map((_, i) => firstYear - i);
      return years;
    });
    const firstYear = computed(() => parseInt(yearsList.value[0], 10));
    provide('yearsList', yearsList);

    function checkDayMonthAvailability(day = date.day, month = date.month) {
      let daysLimit = new Date(date.year, month, 0).getDate();
      if (day === '29' && !date.year.length) daysLimit += 1;
      return parseInt(day, 10) > daysLimit;
    }
    provide('checkDayMonthAvailability', checkDayMonthAvailability);

    // Day validations
    const isDayValid = computed(() => {
      const selectedDay = parseInt(date.day, 10);
      return selectedDay > 0 && selectedDay <= 31 && !checkDayMonthAvailability(date.day, undefined);
    });
    const isDayFulfilled = computed(() => (date.day.length === 2));
    const hasDayError = computed(() => (isDayFulfilled.value && !isDayValid.value));

    // Month validations
    const isMonthValid = computed(() => {
      const selectedMonth = parseInt(date.month, 10);
      return selectedMonth > 0 && selectedMonth <= 12 && !checkDayMonthAvailability(undefined, date.month);
    });
    const isMonthFulfilled = computed(() => (date.month.length === 2));
    const hasMonthError = computed(() => (isMonthFulfilled.value && !isMonthValid.value));

    // Year validations
    function checkYearAvailability(year) {
      const isLeapYear = !((year % 4) || (!(year % 25) && (year % 16)));
      return parseInt(date.day, 10) === 29 && parseInt(date.month, 10) === 2 && !isLeapYear;
    }
    const isYearValid = computed(() => {
      const selectedYear = parseInt(date.year, 10);
      return yearsList.value.includes(selectedYear) && !checkYearAvailability(date.year);
    });
    const isYearFulfilled = computed(() => (date.year.length === 4));
    const hasYearError = computed(() => (isYearFulfilled.value && !isYearValid.value));
    provide('checkYearAvailability', checkYearAvailability);

    // Date validations
    const isDateFulfilled = computed(() => isDayFulfilled.value && isMonthFulfilled.value && isYearFulfilled.value);
    const isDateOutOfBounds = computed(() => {
      if (isDateFulfilled.value) {
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - props.minLimit);
        const selectedDate = new Date(date.year, parseInt(date.month, 10) - 1, date.day);
        const limitDate = new Date();
        limitDate.setFullYear(limitDate.getFullYear() - props.maxLimit);
        return selectedDate > startDate
          || selectedDate < limitDate
          || (!isDateFulfilled.value && date.year > firstYear.value);
      }
      return !isDateFulfilled.value && parseInt(date.year, 10) > firstYear.value;
    });
    const isDateInFuture = computed(() => {
      const todayDate = new Date();
      const currentYear = lightFormat(todayDate, 'yyyy');
      if (isMonthValid.value && isYearFulfilled.value) {
        const selectedDate = new Date(date.year, date.month - 1, date.day);
        return selectedDate > todayDate;
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
      const plainDate = new Date(props.modelValue);
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
        const newDate = format(new Date(date.year, date.month - 1, date.day), 'yyyy-MM-dd');
        formattedDate.value = newDate;
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

    function synchronizeTab(event) {
      const fieldId = event.target.id;
      currentDatePart.value = `${fieldId}`;
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
    function focusNextField() {
      const currentInputIndex = props.order.indexOf(currentDatePart.value);
      if (currentInputIndex < props.order.length - 1) focusInput(props.order[currentInputIndex + 1]);
    }

    const errorDisplayHandler = computed(() => {
      let error = false;
      if (props.touched) {
        error = props.error;
      } else if (isDateInFuture.value) {
        error = props.translation.errorDateInFuture;
      } else if (isDateOutOfBounds.value && isDayValid.value && isMonthValid.value) {
        error = props.translation.errorOutOfBounds;
      } else if (hasDayError.value || hasMonthError.value || hasYearError.value) {
        error = props.translation.errorWrongDate;
      }
      return error;
    });

    const localizeMonths = async (locale) => {
      let localeFile;
      try {
        localeFile = await import(`date-fns/locale/${locale}/index.js`);
      } catch (error) {
        localeFile = await import('date-fns/locale/en-US/index.js');
        if (!process.env.NODE_ENV.production) {
          // eslint-disable-next-line no-console
          console.error('Unrecognized language props value, default \'en-US\' language loaded');
        }
      }
      for (let i = 0; i < 12; i += 1) {
        monthNames.value.push(localeFile.localize.month(i, { width: 'wide' }));
      }
    };

    watchEffect(() => {
      localizeMonths(props.lang);

      if (formattedDate.value !== props.modelValue) {
        formattedDate.value = props.modelValue;
      } else {
        setDate();
      }

      if (!isDateValid.value !== props.invalid) {
        emit('update:invalid', !isDateValid.value);
      }
    });

    const capitalize = (value) => value.replace(/^\w/gm, (char) => (char.toUpperCase()));

    provide('translation', props.translation);
    provide('order', props.order);

    return {
      dropdown,
      dayInput,
      monthInput,
      yearInput,
      date,
      currentDatePart,
      isDateValid,
      isDateOutOfBounds,
      isInputValid,
      synchronizeTab,
      focusNextField,
      inputComponentSelector,
      errorDisplayHandler,
      capitalize,
    };
  },
};
</script>

<style lang="scss">
.ui-datepicker {
  --dropdown-popover-width: var(--datepicker-dropdown-popover-width, 20rem);

  position: relative;
  display: flex;
  justify-content: space-between;

  &__dropdown {
    margin: var(--datepicker-dropdown-margin, 0 0 0 var(--space-16));

    [dir=rtl] & {
      margin: var(--datepicker-dropdown-margin, 0 var(--space-16) 0 0);
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
  }

  &__label {
    display: var(--datepicker-field-label-display, inline-block);
    margin: var(--datepicker-field-label-margin, 0 0 var(--space-8) 0);
    font: var(--datepicker-field-label-font, var(--font-body-2-comfortable));
  }
}
</style>
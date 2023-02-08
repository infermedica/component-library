<template>
  <div class="ui-datepicker">
    <UiFormField
      :error-message="errorDisplayHandler"
      :alert-attrs="alertAttrs"
      class="ui-datepicker__form-fields"
    >
      <div class="ui-datepicker__fields">
        <div
          v-for="(datePart, key) in order"
          :key="key"
          class="ui-datepicker__group-field"
          :class="{ 'ui-datepicker__group-field--long': datePart === 'year' }"
        >
          <UiText
            v-bind="getTextAttrs(datePart)"
            class="ui-datepicker__label"
          >
            {{ capitalizeFirst(defaultProps.translation[datePart]) }}
          </UiText>
          <component
            :is="inputComponentSelector(datePart)"
            :ref="(el: DatepickerInput) => setDatePartElement(el, datePart)"
            :model-value="date[datePart]"
            v-bind="{
              'error': invalid && touched,
              'valid': isInputValid[datePart],
              ...getInputAttrs(datePart),
            }"
            @change-input="focusNextField"
            @focus="handleFocus($event, datePart)"
            @update:model-value="(value: DatepickerModelValue) => handleDateUpdate(datePart, value)"
          />
        </div>
      </div>
    </UiFormField>
    <UiDatepickerCalendar
      :last-focused="lastFocusedDatePart"
      v-bind="datepickerCalendarAttrs"
      class="ui-datepicker__dropdown"
      @open="emit('calendar-open', $event)"
      @select="emit('calendar-select', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
} from 'vue';
import type {
  ComputedRef,
  Ref,
} from 'vue';
import {
  format,
  isMatch,
  lightFormat,
} from 'date-fns';
import {
  capitalizeFirst,
  focusElement,
} from '../../../utilities/helpers/index';
import UiFormField from '../../molecules/UiFormField/UiFormField.vue';
import type { AlertAttrsProps } from '../../molecules/UiAlert/UiAlert.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { TextAttrsProps } from '../../atoms/UiText/UiText.vue';
import UiDatepickerDayInput from './_internal/UiDatepickerDayInput.vue';
import type { DatepickerDayInputAttrsProps } from './_internal/UiDatepickerDayInput.vue';
import UiDatepickerMonthInput from './_internal/UiDatepickerMonthInput.vue';
import type { DatepickerMonthInputAttrsProps } from './_internal/UiDatepickerMonthInput.vue';
import UiDatepickerYearInput from './_internal/UiDatepickerYearInput.vue';
import type { DatepickerYearInputAttrsProps } from './_internal/UiDatepickerYearInput.vue';
import UiDatepickerCalendar from './_internal/UiDatepickerCalendar.vue';
import type { DatepickerCalendarAttrsProps } from './_internal/UiDatepickerCalendar.vue';
import type {
  DefineAttrsProps,
  HTMLTag,
} from '../../../types';

export interface DatepickerTranslation {
  day?: string;
  month?: string;
  year?: string;
  placeholderDay?: string;
  placeholderMonth?: string;
  placeholderYear?: string;
  errorWrongDate?: string;
  errorDateInFuture?: string;
  errorOutOfBounds?: string;
}
export type DatepickerCheckAvailability = (datePart: number) => boolean;
export type DatepickerDatePart = 'day' | 'month' | 'year';
export type DatepickerDate<T> = Record<DatepickerDatePart, T>
export type DatepickerInput = typeof UiDatepickerDayInput
  | typeof UiDatepickerMonthInput
  | typeof UiDatepickerYearInput
export type DatepickerModelValue = string;
export type DatepickerInvalid = boolean;
export interface DatepickerProps {
  /**
   * Use this props or v-model to set value.
   */
  modelValue?: DatepickerModelValue;
  /**
   * Use this props to set invalid state of component.
   */
  invalid?: DatepickerInvalid;
  /**
   * Use this props to set custom error message
   */
  error?: boolean | string;
  /**
   * Use this props to set input fields order
   */
  order?: DatepickerDatePart[];
  /**
   * Use this props to touch component and show validation errors.
   */
  touched?: boolean;
  /**
   * Use this props to set months language - default enUS
   */
  lang?: string;
  /**
   * Use this props to override labels inside component translation.
   */
  translation?: DatepickerTranslation;
  /**
   * Use this props to set minimum age limit
   */
  minLimit?: number;
  /**
   *  Use this props to set maximum age limit
   */
  maxLimit?: number;
  /**
   * Use this props to pass attrs to UiAlert.
   */
  alertAttrs?: AlertAttrsProps;
  /**
   *  Use this props to pass attrs to day UiText.
   */
  textDayAttrs?: TextAttrsProps;
  /**
   *  Use this props to pass attrs to month UiText.
   */
  textMonthAttrs?: TextAttrsProps;
  /**
   *  Use this props to pass attrs to year UiText.
   */
  textYearAttrs?: TextAttrsProps;
  /**
   *  Use this props to pass attrs to day UiInput.
   */
  inputDayAttrs?: DatepickerDayInputAttrsProps;
  /**
   *  Use this props to pass attrs to month UiInput.
   */
  inputMonthAttrs?: DatepickerMonthInputAttrsProps;
  /**
   *  Use this props to pass attrs to year UiInput.
   */
  inputYearAttrs?: DatepickerYearInputAttrsProps;
  /**
   *  Use this props to pass attrs to UiDatepickerCalendar
   */
  datepickerCalendarAttrs?: DatepickerCalendarAttrsProps;
}
export type DatepickerAttrsProps = DefineAttrsProps<DatepickerProps>;
export interface DatepickerEmits {
  (e: 'update:modelValue', value: DatepickerModelValue): void;
  (e: 'update:invalid', value: DatepickerInvalid): void;
  (e: 'calendar-open', value: Event): void;
  (e: 'calendar-select', value: Event): void;
  (e: 'field-insert', value: { field: DatepickerDatePart, value: string }): void;
  (e: 'field-error', value: { field: DatepickerDatePart, error?: string | boolean }): void;
  (e: 'field-focus', value: { field: DatepickerDatePart }): void;
}

const props = withDefaults(defineProps<DatepickerProps>(), {
  modelValue: '',
  invalid: true,
  error: '',
  order: () => ([
    'day',
    'month',
    'year',
  ]),
  touched: true,
  lang: 'en-us',
  translation: () => ({
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
  minLimit: 0,
  maxLimit: 120,
  alertAttrs: () => ({}),
  textDayAttrs: () => ({
    tag: 'label',
    for: 'datepicker-input-day',
  }),
  textMonthAttrs: () => ({
    tag: 'label',
    for: 'datepicker-input-month',
  }),
  textYearAttrs: () => ({
    tag: 'label',
    for: 'datepicker-input-year',
  }),
  inputDayAttrs: () => ({ inputAttrs: { id: 'datepicker-input-day' } }),
  inputMonthAttrs: () => ({ inputAttrs: { id: 'datepicker-input-month' } }),
  inputYearAttrs: () => ({ inputAttrs: { id: 'datepicker-input-year' } }),
  datepickerCalendarAttrs: () => ({}),
});
const defaultProps = computed(() => {
  const tag: HTMLTag = 'label';
  return {
    translation: {
      day: 'day',
      month: 'month',
      year: 'year',
      placeholderDay: 'DD',
      placeholderMonth: 'MM',
      placeholderYear: 'YYYY',
      errorWrongDate: 'Please enter a valid date, e.g. 05/11/1990',
      errorDateInFuture: 'Sorry, the date of birth cannot be a future date',
      errorOutOfBounds: 'Sorry, our checkup only covers people between 0 and 120 years old',
      ...props.translation,
    },
    inputDayAttrs: {
      ...props.inputDayAttrs,
      inputAttrs: {
        id: 'datepicker-input-day',
        ...props.inputDayAttrs.inputAttrs,
      },
    },
    inputMonthAttrs: {
      ...props.inputMonthAttrs,
      inputAttrs: {
        id: 'datepicker-input-month',
        ...props.inputMonthAttrs.inputAttrs,
      },
    },
    inputYearAttrs: {
      ...props.inputYearAttrs,
      inputAttrs: {
        id: 'datepicker-input-year',
        ...props.inputYearAttrs.inputAttrs,
      },
    },
    textDayAttrs: {
      tag,
      for: 'datepicker-input-day',
      ...props.textDayAttrs,
    },
    textMonthAttrs: {
      tag,
      for: 'datepicker-input-month',
      ...props.textMonthAttrs,
    },
    textYearAttrs: {
      tag,
      for: 'datepicker-input-year',
      ...props.textYearAttrs,
    },
  };
});
const emit = defineEmits<DatepickerEmits>();
const getTextAttrs = (datePart: DatepickerDatePart) => defaultProps.value[`text${capitalizeFirst<DatepickerDatePart>(datePart)}Attrs`];
const getInputAttrs = (datePart: DatepickerDatePart) => defaultProps.value[`input${capitalizeFirst<DatepickerDatePart>(datePart)}Attrs`];
const datePartElements: Record<DatepickerDatePart, DatepickerInput | null> = {
  day: null,
  month: null,
  year: null,
};
const setDatePartElement = (el: DatepickerInput, datePart: DatepickerDatePart): void => {
  datePartElements[datePart] = el;
};
const monthNames = ref<string[]>([]);
provide<Ref<string[]>>('monthNames', monthNames);
const date = reactive<DatepickerDate<string>>({
  day: '',
  month: '',
  year: '',
});
const dateAsInt = computed(() => (Object.keys(date) as DatepickerDatePart[]).reduce((result, key) => ({
  ...result,
  [key]: parseInt(date[key], 10),
}), {
  day: 0,
  month: 0,
  year: 0,
}));
const handleDateUpdate = (datePart: DatepickerDatePart, value: DatepickerModelValue): void => {
  date[datePart] = value;
};
provide<DatepickerDate<string>>('date', date);
const currentDate = new Date();
const currentDay = parseInt(lightFormat(currentDate, 'dd'), 10);
const currentMonth = parseInt(lightFormat(currentDate, 'MM'), 10);
const currentYear = parseInt(lightFormat(currentDate, 'yyyy'), 10);

const yearsList = computed((): number[] => {
  const firstYear = currentDate.getUTCFullYear() - props.minLimit;
  const yearsNumber = props.maxLimit - props.minLimit + 2;
  const years = Array(yearsNumber).fill('').map((_, i) => firstYear - i);
  return years;
});
const firstAvailableYear = computed(() => yearsList.value[0]);
const lastAvailableYear = computed(() => yearsList.value[yearsList.value.length - 1]);
provide<ComputedRef<number[]>>('yearsList', yearsList);

const checkDayMonthLimit = (day: number = dateAsInt.value.day, month: number = dateAsInt.value.month) => {
  let daysLimit = new Date(dateAsInt.value.year, month, 0, 0, 0, 0).getDate();
  if (day === 29 && !date.year.length) daysLimit += 1;
  return day > daysLimit;
};

// Day validations
const checkDayAvailability = (day: number) => {
  const isMonthDaysLimitExceeded = checkDayMonthLimit(day, undefined);
  const isDayAboveLimit = (dateAsInt.value.year === firstAvailableYear.value)
    && (dateAsInt.value.month === currentMonth) && (day > currentDay);
  const isDayBelowLimit = (dateAsInt.value.year === lastAvailableYear.value)
    && (dateAsInt.value.month === currentMonth) && (day <= currentDay);
  return isDayAboveLimit || isDayBelowLimit || isMonthDaysLimitExceeded;
};
const isDayValid = computed(() => (dateAsInt.value.day > 0) && (dateAsInt.value.day <= 31)
  && !checkDayMonthLimit(dateAsInt.value.day, undefined));
const isDayFulfilled = computed(() => (date.day.length === 2));
const hasDayError = computed(() => (isDayFulfilled.value && !isDayValid.value));
provide<DatepickerCheckAvailability>('checkDayAvailability', checkDayAvailability);

// Month validations
const checkMonthAvailability = (month: number) => {
  const isMonthDaysLimitExceeded = checkDayMonthLimit(undefined, month);
  const isMonthAboveLimit = (dateAsInt.value.year === firstAvailableYear.value
    && (month > currentMonth || (month >= currentMonth && currentDay < dateAsInt.value.day)));
  const isMonthBelowLimit = (dateAsInt.value.year === lastAvailableYear.value
    && (month < currentMonth || (date.day && month <= currentMonth && currentDay > dateAsInt.value.day)));
  const isCurrentLastDayOfMonth = new Date(currentYear, currentMonth, 0, 0, 0, 0).getDate() === currentDay;
  const monthWithoutAvailableDays = dateAsInt.value.year === lastAvailableYear.value
    && month === currentMonth && isCurrentLastDayOfMonth;
  return isMonthAboveLimit || isMonthBelowLimit || isMonthDaysLimitExceeded || monthWithoutAvailableDays;
};
const isMonthValid = computed(() => dateAsInt.value.month > 0 && dateAsInt.value.month <= 12
  && !checkDayMonthLimit(undefined, dateAsInt.value.month));
const isMonthFulfilled = computed(() => (date.month.length === 2));
const hasMonthError = computed(() => (isMonthFulfilled.value && !isMonthValid.value));
provide<DatepickerCheckAvailability>('checkMonthAvailability', checkMonthAvailability);

// Year validations
const checkYearAvailability = (year: number) => {
  const isLeapYearLimit = !!((year % 4) || (!(year % 25) && (year % 16)))
    && (dateAsInt.value.day === 29 && dateAsInt.value.month === 2);
  const isYearAboveLimit = (year === firstAvailableYear.value) && (currentMonth < dateAsInt.value.month
    || (currentMonth <= dateAsInt.value.month && currentDay < dateAsInt.value.day));
  const isYearBelowLimit = !!(year === lastAvailableYear.value) && dateAsInt.value.month
    && (currentMonth > dateAsInt.value.month || (dateAsInt.value.day
    && currentMonth === dateAsInt.value.month && currentDay >= dateAsInt.value.day));
  return isYearAboveLimit || isYearBelowLimit || isLeapYearLimit;
};
const isYearValid = computed(() => yearsList.value.includes(dateAsInt.value.year)
  && !checkYearAvailability(dateAsInt.value.year));
const isYearFulfilled = computed(() => (date.year.length === 4));
const hasYearError = computed(() => (isYearFulfilled.value && !isYearValid.value) || date.year[0] === '0');
provide<DatepickerCheckAvailability>('checkYearAvailability', checkYearAvailability);

// Date validations
const isDateFulfilled = computed(() => isDayFulfilled.value
  && isMonthFulfilled.value && isYearFulfilled.value);
provide<ComputedRef<boolean>>('isDateFulfilled', isDateFulfilled);
const isDateEmpty = computed(() => !isDayFulfilled.value && !isMonthFulfilled.value && !isYearFulfilled.value);
const isDateOutOfBounds = computed(() => {
  const startDate = new Date(firstAvailableYear.value, currentMonth - 1, currentDay, 0, 0, 0);
  const limitDate = new Date(lastAvailableYear.value, currentMonth - 1, currentDay, 0, 0, 0);
  if (isDateFulfilled.value) {
    const selectedDate = new Date(dateAsInt.value.year, dateAsInt.value.month - 1, dateAsInt.value.day, 0, 0, 0);
    return selectedDate > startDate || selectedDate <= limitDate;
  } if (isMonthFulfilled.value && isYearFulfilled.value) {
    const selectedDate = new Date(dateAsInt.value.year, dateAsInt.value.month - 1, currentDay);
    return selectedDate > startDate || selectedDate < limitDate;
  }
  return isYearFulfilled.value && (dateAsInt.value.year > firstAvailableYear.value
    || dateAsInt.value.year < lastAvailableYear.value);
});
const isDateInFuture = computed(() => {
  if (isMonthValid.value && isYearFulfilled.value) {
    const selectedDate = new Date(dateAsInt.value.year, dateAsInt.value.month - 1, dateAsInt.value.day);
    return selectedDate > currentDate;
  }
  return isYearFulfilled.value && (dateAsInt.value.year > currentYear);
});
const isDateValid = computed(() => isDayValid.value && isMonthValid.value
  && isYearValid.value && !isDateOutOfBounds.value);
const isInputValid = computed<DatepickerDate<boolean>>(() => ({
  day: isDayValid.value,
  month: isMonthValid.value,
  year: isYearValid.value,
}));

const assignDateParts = () => {
  const plainDate = new Date(`${props.modelValue}T00:00:00`);
  date.day = lightFormat(plainDate, 'dd');
  date.month = lightFormat(plainDate, 'MM');
  date.year = lightFormat(plainDate, 'yyyy');
};

const formattedDate = computed({
  get: () => {
    if (props.modelValue && isMatch(props.modelValue, 'yyyy-MM-dd')) {
      assignDateParts();
    }
    return props.modelValue;
  },
  set: (value) => {
    emit('update:modelValue', value);
  },
});

const setDate = () => {
  if (isDateFulfilled.value && isDateValid.value) {
    const newDate = format(new Date(dateAsInt.value.year, dateAsInt.value.month - 1, dateAsInt.value.day, 0, 0, 0), 'yyyy-MM-dd');
    formattedDate.value = newDate;
  }
  if (isDateEmpty.value) {
    formattedDate.value = '';
  }
};

const inputComponentSelector = (datePart: DatepickerDatePart) => {
  switch (datePart) {
    case ('day'):
      return UiDatepickerDayInput;
    case ('month'):
      return UiDatepickerMonthInput;
    case ('year'):
      return UiDatepickerYearInput;
    default:
      return '';
  }
};

const lastFocusedDatePart = ref<DatepickerDatePart>(props.order[0]);

const handleFocus = (event: Event, datePart: DatepickerDatePart) => {
  emit('field-focus', { field: datePart });
  lastFocusedDatePart.value = datePart;
};

const focus = async (inputElement: DatepickerInput) => {
  await nextTick();
  const target = inputElement.$el.children[0];
  focusElement(target);
  if (target.value) target.select();
};
const focusInput = (datePart: DatepickerDatePart) => {
  const input = datePartElements[datePart];
  if (input) {
    focus(input);
  }
};
const focusNextField = (currentField: DatepickerDatePart) => {
  const currentInputIndex = props.order.indexOf(currentField);
  if (currentInputIndex < props.order.length - 1) {
    focusInput(props.order[currentInputIndex + 1]);
  }
};

// TODO - refactor, for test only
const unfulfilledDay = ref(false);
const unfulfilledMonth = ref(false);
const unfulfilledYear = ref(false);
provide('unfulfilledDay', unfulfilledDay);
provide('unfulfilledMonth', unfulfilledMonth);
provide('unfulfilledYear', unfulfilledYear);

const errorDisplayHandler = computed(() => {
  let error: boolean | string | undefined = false;

  if (isDateInFuture.value) {
    error = props.translation.errorDateInFuture;
  } else if (isDateOutOfBounds.value) {
    error = props.translation.errorOutOfBounds;
  } else if (hasDayError.value || hasMonthError.value || hasYearError.value
    || unfulfilledDay.value || unfulfilledMonth.value || unfulfilledYear.value) {
    error = props.translation.errorWrongDate;
  } else if (props.touched && props.error) {
    error = props.error;
  }
  return error;
});

const handleFulfilledChange = (
  isFulfilled: boolean,
  field: DatepickerDatePart,
  value: DatepickerModelValue,
  isValid: boolean,
) => {
  if (isFulfilled) {
    emit('field-insert', {
      field,
      value,
    });
  }
  if (isFulfilled && (!isValid || errorDisplayHandler.value)) {
    emit('field-error', {
      field,
      error: errorDisplayHandler?.value,
    });
  }
};

watch(isDayFulfilled, (fulfilled: boolean) => handleFulfilledChange(fulfilled, 'day', date.day, isDayValid.value));
watch(isMonthFulfilled, (fulfilled: boolean) => handleFulfilledChange(fulfilled, 'month', date.month, isMonthValid.value));
watch(isYearFulfilled, (fulfilled: boolean) => handleFulfilledChange(fulfilled, 'year', date.year, isYearValid.value));

const monthList = (locale: string): string[] => {
  const getMonth = new Intl.DateTimeFormat(locale, { month: 'long' }).format;
  return [ ...Array(12).keys() ].map((m) => getMonth(new Date(2022, m)));
};

const localizeMonths = () => {
  try {
    monthNames.value = monthList(props.lang);
  } catch {
    monthNames.value = monthList('en-US');
    console.error('Unrecognized language props value, default \'en-us\' language loaded'); // eslint-disable-line no-console
  }
};

onMounted(() => {
  localizeMonths();
  if (props.modelValue) {
    assignDateParts();
  }
});

watch([
  () => date.day,
  () => date.month,
  () => date.year,
], () => {
  setDate();
});

watch(isDateValid, (isValid: boolean) => {
  emit('update:invalid', !isValid);
});

provide<DatepickerTranslation>('translation', defaultProps.value.translation);
provide<DatepickerDatePart[]>('order', props.order);
const inputsIds = computed(() => (
  (Object.keys(date) as DatepickerDatePart[]).reduce<Record<string, DatepickerDatePart>>(
    (ids, key) => ({
      ...ids,
      [getInputAttrs(key).inputAttrs.id]: key,
    }),
    {},
  )));
provide<ComputedRef<Record<string, DatepickerDatePart>>>('inputsIds', inputsIds);
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-datepicker {
  $this: &;
  $element: datepicker;

  position: relative;
  display: flex;
  align-items: flex-start;

  &__dropdown {
    @include mixins.use-logical($element + "-dropdown", margin, var(--space-32) 0 0 var(--space-24));
  }

  &__form-fields {
    flex: 1;
    align-items: normal;
  }

  &__fields {
    display: flex;
    gap: functions.var($element + "-fields", gap, var(--space-8));
  }

  &__group-field {
    display: flex;
    flex: 1 1 4rem;
    flex-direction: column;
    gap: functions.var($element + "-group-field", gap, var(--space-8));

    &--long {
      flex: calc(6.5 / 4) 1 6.5rem;
    }
  }

  &__label {
    display: block;
  }
}
</style>

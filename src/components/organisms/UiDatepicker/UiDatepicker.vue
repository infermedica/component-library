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
            :for="getDefaultProp(datePart).id"
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
              ...getDefaultProp(datePart),
            }"
            @change-input="focusNextField"
            @focus="handleFocus($event, datePart)"
            @update:model-value="(value: string) => handleDateUpdate(datePart, value)"
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
import type { PropType } from 'vue';
import {
  format,
  isMatch,
  lightFormat,
} from 'date-fns';
import { capitalizeFirst, focusElement } from '../../../utilities/helpers/index.ts';
import UiFormField from '../../molecules/UiFormField/UiFormField.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiDatepickerDayInput from './_internal/UiDatepickerDayInput.vue';
import UiDatepickerMonthInput from './_internal/UiDatepickerMonthInput.vue';
import UiDatepickerYearInput from './_internal/UiDatepickerYearInput.vue';
import UiDatepickerCalendar from './_internal/UiDatepickerCalendar.vue';
import type { PropsAttrs } from '../../../types/attrs';

export interface DatepickerTranslation {
  day: string;
  month: string;
  year: string;
  placeholderDay: string;
  placeholderMonth: string;
  placeholderYear: string;
  errorWrongDate: string;
  errorDateInFuture: string;
  errorOutOfBounds: string;
  [key: string]: string;
}
export type DatePart = 'day' | 'month' | 'year';
export type DatepickerDate<T> = {[key in DatePart]: T}
export type DefaultAttrName = `input${Capitalize<DatePart>}Attrs`
export type DatepickerInputID = `datepicker-input-${DatePart}`
export interface DefaultInputProps<T> {
  id: T,
  [key: string]: unknown
}
export type DatepickerInput = typeof UiDatepickerDayInput
  | typeof UiDatepickerMonthInput
  | typeof UiDatepickerYearInput
const props = defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: String as PropType<string | null>,
    default: null,
    validator: (value: string) => isMatch(value, 'yyyy-MM-dd') || value === '',
  },
  /**
   * Use this props to set invalid state of component.
   */
  invalid: {
    type: Boolean,
    default: true,
  },
  /**
   * Use this props to set custom error message
   */
  error: {
    type: [Boolean, String] as PropType<string | boolean>,
    default: '',
  },
  /**
   * Use this props to set input fields order
   */
  order: {
    type: Array as PropType<DatePart[]>,
    default: () => (['day', 'month', 'year']),
    validator: (value: DatePart[]) => value.length === 3
        && value.includes('day')
        && value.includes('month')
        && value.includes('year'),
  },
  /**
   * Use this props to touch component and show validation errors.
   */
  touched: {
    type: Boolean,
    default: true,
  },
  /**
   * Use this props to set months language - default enUS
   */
  lang: {
    type: String,
    default: 'en-us',
  },
  /**
   * Use this props to override labels inside component translation.
   */
  translation: {
    type: Object as PropType<DatepickerTranslation>,
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
    validator: (value: number) => value >= 0,
  },
  /**
   *  Use this props to set maximum age limit
   */
  maxLimit: {
    type: Number,
    default: 120,
    validator: (value: number) => value > 0,
  },
  /**
   *  Use this props to pass attrs to day UiInput.
   */
  inputDayAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   *  Use this props to pass attrs to month UiInput.
   */
  inputMonthAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   *  Use this props to pass attrs to year UiInput.
   */
  inputYearAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   *  Use this props to pass attrs to UiDatepickerCalendar
   */
  datepickerCalendarAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const getDefaultProps = (datePart: DatePart): DefaultInputProps<DatepickerInputID> => ({
  id: `datepicker-input-${datePart}`,
  ...props[`input${capitalizeFirst(datePart) as Capitalize<DatePart>}Attrs`],
});
const defaultProps = computed(() => (
  {
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
    inputDayAttrs: getDefaultProps('day'),
    inputMonthAttrs: getDefaultProps('month'),
    inputYearAttrs: getDefaultProps('year'),
  }
));
const getDefaultProp = (item: DatePart | DefaultAttrName): DefaultInputProps<DatepickerInputID> => (
  item.includes('Attrs')
    ? defaultProps.value[item as DefaultAttrName]
    : defaultProps.value[`input${capitalizeFirst(item as DatePart) as Capitalize<DatePart>}Attrs`]);
provide('getDefaultProp', getDefaultProp);

const emit = defineEmits<{(e: 'update:modelValue', value: string | null): void,
  (e: 'update:invalid', value: boolean): void,
  (e: 'calendar-open', value: Event): void,
  (e: 'calendar-select', value: Event): void,
  (e: 'field-insert', value: { field: DatePart, value: string }): void,
  (e: 'field-error', value: { field: DatePart, error: string | boolean }): void,
  (e: 'field-focus', value: { field: DatePart }): void,
}>();
const datePartElements: {[key in DatePart]: DatepickerInput | null} = {
  day: null,
  month: null,
  year: null,
};
const setDatePartElement = (el: DatepickerInput, datePart: DatePart): void => {
  datePartElements[datePart] = el;
};
const monthNames = ref<string[]>([]);
provide('monthNames', monthNames);
const date = reactive<DatepickerDate<string>>(
  {
    day: '',
    month: '',
    year: '',
  },
);
const dateAsInt = computed<DatepickerDate<number>>(() => Object.keys(date).reduce((result, key) => (
  { ...result, [key]: parseInt(date[key as DatePart], 10) }), { day: 0, month: 0, year: 0 }));
const handleDateUpdate = (datePart: DatePart, value: string): void => {
  date[datePart] = value;
};
provide('date', date);
const currentDate: Date = new Date();
const currentDay: number = parseInt(lightFormat(currentDate, 'dd'), 10);
const currentMonth: number = parseInt(lightFormat(currentDate, 'MM'), 10);
const currentYear: number = parseInt(lightFormat(currentDate, 'yyyy'), 10);

const yearsList = computed<number[]>(() => {
  const firstYear = currentDate.getUTCFullYear() - props.minLimit;
  const yearsNumber = props.maxLimit - props.minLimit + 2;
  const years = Array(yearsNumber).fill('').map((_, i) => firstYear - i);
  return years;
});
const firstAvailableYear = computed(() => yearsList.value[0]);
const lastAvailableYear = computed(() => yearsList.value[yearsList.value.length - 1]);
provide('yearsList', yearsList);

function checkDayMonthLimit(day = dateAsInt.value.day, month = dateAsInt.value.month): boolean {
  let daysLimit = new Date(dateAsInt.value.year, month, 0, 0, 0, 0).getDate();
  if (day === 29 && !date.year.length) daysLimit += 1;
  return day > daysLimit;
}

// Day validations
function checkDayAvailability(day: number): boolean {
  const isMonthDaysLimitExceeded = checkDayMonthLimit(day, undefined);
  const isDayAboveLimit = (dateAsInt.value.year === firstAvailableYear.value)
    && (dateAsInt.value.month === currentMonth) && (day > currentDay);
  const isDayBelowLimit = (dateAsInt.value.year === lastAvailableYear.value)
    && (dateAsInt.value.month === currentMonth) && (day <= currentDay);
  return isDayAboveLimit || isDayBelowLimit || isMonthDaysLimitExceeded;
}
const isDayValid = computed(() => (dateAsInt.value.day > 0) && (dateAsInt.value.day <= 31)
  && !checkDayMonthLimit(dateAsInt.value.day, undefined));
const isDayFulfilled = computed(() => (date.day.length === 2));
const hasDayError = computed(() => (isDayFulfilled.value && !isDayValid.value));
provide('checkDayAvailability', checkDayAvailability);

// Month validations
function checkMonthAvailability(month: number): boolean {
  const isMonthDaysLimitExceeded = checkDayMonthLimit(undefined, month);
  const isMonthAboveLimit = (dateAsInt.value.year === firstAvailableYear.value
    && (month > currentMonth || (month >= currentMonth && currentDay < dateAsInt.value.day)));
  const isMonthBelowLimit = (dateAsInt.value.year === lastAvailableYear.value
    && (month < currentMonth || (date.day && month <= currentMonth && currentDay > dateAsInt.value.day)));
  const isCurrentLastDayOfMonth = new Date(currentYear, currentMonth, 0, 0, 0, 0).getDate() === currentDay;
  const monthWithoutAvailableDays = dateAsInt.value.year === lastAvailableYear.value
    && month === currentMonth && isCurrentLastDayOfMonth;
  return isMonthAboveLimit || isMonthBelowLimit || isMonthDaysLimitExceeded || monthWithoutAvailableDays;
}
const isMonthValid = computed(() => dateAsInt.value.month > 0 && dateAsInt.value.month <= 12
  && !checkDayMonthLimit(undefined, dateAsInt.value.month));
const isMonthFulfilled = computed(() => (date.month.length === 2));
const hasMonthError = computed(() => (isMonthFulfilled.value && !isMonthValid.value));
provide('checkMonthAvailability', checkMonthAvailability);

// Year validations
function checkYearAvailability(year: number): boolean {
  const isLeapYearLimit = !!((year % 4) || (!(year % 25) && (year % 16)))
    && (dateAsInt.value.day === 29 && dateAsInt.value.month === 2);
  const isYearAboveLimit = (year === firstAvailableYear.value) && (currentMonth < dateAsInt.value.month
    || (currentMonth <= dateAsInt.value.month && currentDay < dateAsInt.value.day));
  const isYearBelowLimit = !!(year === lastAvailableYear.value) && dateAsInt.value.month
    && (currentMonth > dateAsInt.value.month || (dateAsInt.value.day
    && currentMonth === dateAsInt.value.month && currentDay >= dateAsInt.value.day));
  return isYearAboveLimit || isYearBelowLimit || isLeapYearLimit;
}
const isYearValid = computed(() => yearsList.value.includes(dateAsInt.value.year)
  && !checkYearAvailability(dateAsInt.value.year));
const isYearFulfilled = computed(() => (date.year.length === 4));
const hasYearError = computed(() => (isYearFulfilled.value && !isYearValid.value) || date.year[0] === '0');
provide('checkYearAvailability', checkYearAvailability);

// Date validations
const isDateFulfilled = computed(() => isDayFulfilled.value
  && isMonthFulfilled.value && isYearFulfilled.value);
provide('isDateFulfilled', isDateFulfilled);
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

function assignDateParts() {
  const plainDate = new Date(`${props.modelValue}T00:00:00`);
  date.day = lightFormat(plainDate, 'dd');
  date.month = lightFormat(plainDate, 'MM');
  date.year = lightFormat(plainDate, 'yyyy');
}

const formattedDate = computed<string | null>({
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

function setDate(): void {
  if (isDateFulfilled.value && isDateValid.value) {
    const newDate = format(new Date(dateAsInt.value.year, dateAsInt.value.month - 1, dateAsInt.value.day, 0, 0, 0), 'yyyy-MM-dd');
    formattedDate.value = newDate;
  }
  if (isDateEmpty.value) {
    formattedDate.value = '';
  }
}

function inputComponentSelector(datePart: DatePart): DatepickerInput | '' {
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
}

const lastFocusedDatePart = ref<DatePart>(props.order[0]);

function handleFocus(event: Event, datePart: DatePart) {
  emit('field-focus', { field: datePart });
  lastFocusedDatePart.value = datePart;
}

const focus = async (inputElement: DatepickerInput): Promise<void> => {
  await nextTick();
  const target = inputElement?.$el?.children[0];
  focusElement(target);
  if (target.value) target.select();
};
function focusInput(datePart: DatePart): void {
  focus(datePartElements[datePart] as DatepickerInput);
}
function focusNextField(currentField: DatePart): void {
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

const errorDisplayHandler = computed<boolean | string>(() => {
  let error: string | boolean = false;

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

const handleFulfilledChange = (isFulfilled: boolean, field: DatePart, value: string, isValid: boolean): void => {
  if (isFulfilled) emit('field-insert', { field, value });
  if (isFulfilled && (!isValid || errorDisplayHandler.value)) emit('field-error', { field, error: errorDisplayHandler.value });
};

watch(isDayFulfilled, (fulfilled) => handleFulfilledChange(fulfilled, 'day', date.day, isDayValid.value));
watch(isMonthFulfilled, (fulfilled) => handleFulfilledChange(fulfilled, 'month', date.month, isMonthValid.value));
watch(isYearFulfilled, (fulfilled) => handleFulfilledChange(fulfilled, 'year', date.year, isYearValid.value));

function monthList(locale: string): string[] {
  const getMonth = new Intl.DateTimeFormat(locale, { month: 'long' }).format;
  return [...Array(12).keys()].map((m) => getMonth(new Date(2022, m)));
}

function localizeMonths() {
  try {
    monthNames.value = monthList(props.lang);
  } catch {
    monthNames.value = monthList('en-US');
    console.error('Unrecognized language props value, default \'en-us\' language loaded'); // eslint-disable-line no-console
  }
}

onMounted(() => {
  localizeMonths();
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

provide('translation', defaultProps.value.translation);
provide('order', props.order);
const inputsIds = computed<Record<string, string>>(() => (
  Object.keys(defaultProps).reduce((ids: Record<string, string>, key: string) => {
    const match = key.match(/input(.+)Attrs/);
    if (match) {
      const datePart = match[1].toLowerCase();
      // eslint-disable-next-line no-param-reassign
      ids[getDefaultProp(key as DatePart).id] = datePart;
    }
    return ids;
  }, {})));
provide('inputsIds', inputsIds);
</script>

<style lang="scss">
@use "../../../styles/functions";

.ui-datepicker {
  $this: &;
  $element: datepicker;

  position: relative;
  display: flex;
  align-items: flex-start;

  &__dropdown {
    margin: functions.var($element + "-dropdown", margin, var(--space-32) 0 0 var(--space-24));

    [dir="rtl"] & {
      margin: functions.var($element + "-rtl-dropdown", margin, var(--space-32) var(--space-24) 0 0);
    }
  }

  &__form-fields {
    flex: 1;
    align-items: normal;
  }

  &__fields {
    display: flex;
  }

  &__group-field {
    display: flex;
    flex: 1 1 4rem;
    flex-direction: column;
    margin: functions.var($element + "-group-field", margin, 0 var(--space-8) 0 0);

    [dir="rtl"] & {
      margin: functions.var($element + "-rtl-group-field", margin, 0 0 0 var(--space-8));
    }

    &:last-of-type {
      margin: functions.var($element + "-group-field", margin, 0);
    }

    &--long {
      flex: calc(6.5 / 4) 1 6.5rem;
    }
  }

  &__label {
    display: block;
    margin: functions.var($element + "-label", margin, 0 0 var(--space-8) 0);
  }
}
</style>

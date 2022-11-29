import UiDatepicker from '@/components/organisms/UiDatepicker/UiDatepicker.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';

const events = actions({
  onFieldFocus: 'field-focus',
  onFieldInsert: 'field-insert',
  onFieldError: 'field-error',
  onCalendarSelect: 'calendar-select',
  onCalendarOpen: 'calendar-open',
  onUpdateInvalid: 'update:invalid',
});

export default {
  title: 'Organisms/Datepicker',
  component: UiDatepicker,
  args: {
    initModelValue: '2077-11-27',
    initInvalid: true,
    error: 'Sorry, the date of birth cannot be a future date',
    order: [
      'day',
      'month',
      'year',
    ],
    touched: false,
    lang: 'en-us',
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
    },
    minLimit: 0,
    maxLimit: 120,
    alertAttrs: { 'data-testid': 'alert' },
    textDayAttrs: { 'data-testid': 'day-text' },
    textMonthAttrs: { 'data-testid': 'month-text' },
    textYearAttrs: { 'data-testid': 'year-text' },
    inputDayAttrs: { 'data-testid': 'day-input' },
    inputMonthAttrs: { 'data-testid': 'month-input' },
    inputYearAttrs: { 'data-testid': 'year-input' },
    datepickerCalendarAttrs: {
      buttonToggleAttrs: {
        ariaLabel: 'calendar',
        'data-testid': 'calendar-toggle-button',
      },
      iconToggleAttrs: { 'data-testid': 'calendar-toggle-icon' },
      popoverAttrs: { 'data-testid': 'calendar-popover' },
      tabsAttrs: { 'data-testid': 'calendar-tabs' },
      tabsItemDayAttrs: {
        'data-testid': 'day-tabs-item',
        buttonTabAttrs: { 'data-testid': 'day-tabs-item-button' },
        contentTabsAttrs: { 'data-testid': 'day-tabs-item-content' },
      },
      tabsItemMonthAttrs: { 'data-testid': 'month-tabs-item' },
      tabsItemYearAttrs: { 'data-testid': 'year-tabs-item' },
    },
    'update:modelValue': null,
    'update:invalid': null,
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'text',
    },
    initInvalid: {
      name: 'invalid',
      description: 'Use this control to set initial state of invalid props.',
      table: { category: 'stories controls' },
      control: 'boolean',
    },
    lang: {
      control: 'select',
      options: [
        'ar',
        'ar-sa',
        'cs',
        'de',
        'en',
        'en-us',
        'es',
        'fr',
        'it',
        'nl',
        'pl',
        'pt-br',
        'ro',
        'ru',
        'sk',
        'tr',
        'zh-cn',
        'zh-hans',
      ],
    },
    modelValue: { control: false },
    invalid: { control: false },
    'calendar-open': {
      description: 'Use this event to detect when calendar is open.',
      table: { category: 'events' },
    },
    'calendar-select': {
      description: 'Use this event to detect when user selects value on calendar tab.',
      table: { category: 'events' },
    },
    'field-insert': {
      description: 'Use this event to detect when user put value to input.',
      table: { category: 'events' },
    },
    'field-error': {
      description: 'Use this event to detect when datepicker has error.',
      table: { category: 'events' },
    },
    'field-focus': {
      description: 'Use this event to detect when some field is focused.',
      table: { category: 'events' },
    },
    alertAttrs: { table: { subcategory: 'Attrs props' } },
    textDayAttrs: { table: { subcategory: 'Attrs props' } },
    textMonthAttrs: { table: { subcategory: 'Attrs props' } },
    textYearAttrs: { table: { subcategory: 'Attrs props' } },
    inputDayAttrs: { table: { subcategory: 'Attrs props' } },
    inputMonthAttrs: { table: { subcategory: 'Attrs props' } },
    inputYearAttrs: { table: { subcategory: 'Attrs props' } },
    datepickerCalendarAttrs: { table: { subcategory: 'Attrs props' } },
  },
  decorators: [ () => ({
    template: `<div class="min-h-115 max-w-80">
      <story />
    </div>`,
  }) ],
};

export const FullConfiguration = (args) => ({
  components: { UiDatepicker },
  setup() {
    const modelValue = ref(args.initModelValue);
    const invalid = ref(args.initInvalid);
    return {
      ...args,
      ...events,
      modelValue,
      invalid,
    };
  },
  template: `<UiDatepicker
    v-model="modelValue"
    v-model:invalid="invalid"
    :error="error"
    :order="order"
    :touched="touched"
    :lang="lang"
    :translation="translation"
    :min-limit="minLimit"
    :max-limit="maxLimit"
    :alert-attrs="alertAttrs"
    :text-day-attrs="textDayAttrs"
    :text-month-attrs="textMonthAttrs"
    :text-year-attrs="textYearAttrs"
    :input-day-attrs="inputDayAttrs"
    :input-month-attrs="inputMonthAttrs"
    :input-year-attrs="inputYearAttrs"
    :datepicker-calendar-attrs="datepickerCalendarAttrs"
    @calendar-open="onCalendarOpen"
    @calendar-select="onCalendarSelect"
    @update:invalid="onUpdateInvalid"
    @field-insert="onFieldInsert"
    @field-error="onFieldError"
    @field-focus="onFieldFocus"
  />`,
});

export const NoConfiguration = () => ({
  components: { UiDatepicker },
  setup() {
    const modelValue = ref('');
    const invalid = ref(true);
    return {
      modelValue,
      invalid,
    };
  },
  template: `<UiDatepicker
    v-model="modelValue"
    v-model:invalid="invalid"
    error="Sorry, the date of birth cannot be a future date"
  />`,
});

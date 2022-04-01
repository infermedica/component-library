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
    order: ['day', 'month', 'year'],
    touched: false,
    lang: 'en-US',
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
    datepickerCalendarAttrs: {
      'aria-label': 'Calendar',
    },
    'update:modelValue': null,
    'update:invalid': null,
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: 'text',
    },
    initInvalid: {
      name: 'invalid',
      description: 'Use this control to set initial state of invalid props.',
      table: {
        category: 'stories controls',
      },
      control: 'boolean',
    },
    modelValue: { control: false },
    invalid: { control: false },
    'calendar-open': {
      description: 'Use this event to detect when calendar is open.',
      table: {
        category: 'events',
      },
    },
    'calendar-select': {
      description: 'Use this event to detect when user selects value on calendar tab.',
      table: {
        category: 'events',
      },
    },
    'field-insert': {
      description: 'Use this event to detect when user put value to input.',
      table: {
        category: 'events',
      },
    },
    'field-error': {
      description: 'Use this event to detect when datepicker has error.',
      table: {
        category: 'events',
      },
    },
    'field-focus': {
      description: 'Use this event to detect when some field is focused.',
      table: {
        category: 'events',
      },
    },
  },
  decorators: [() => ({ template: '<div style="min-height: 430px" class="max-w-80"><story /></div>' })],
  parameters: {
    cssprops: {
      'datepicker-dropdown-popover-width': {
        value: '20rem',
        control: 'text',
        description: '',
      },
      'datepicker-dropdown-margin': {
        value: '0 var(--space-24) 0 0',
        control: 'text',
        description: '',
      },
      'datepicker-group-field-margin': {
        value: '0 0 0 var(--space-8)',
        control: 'text',
        description: '',
      },
      'datepicker-group-field-last-margin': {
        value: '0',
        control: 'text',
        description: '',
      },
      'datepicker-field-label-display': {
        value: 'inline-block',
        control: 'text',
        description: '',
      },
      'datepicker-field-label-margin': {
        value: '0 0 var(--space-8) 0',
        control: 'text',
        description: '',
      },
      'datepicker-field-label-font': {
        value: 'var(--font-body-2-comfortable)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
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
      :datepicker-calendar-attrs="datepickerCalendarAttrs"
      @calendar-open="onCalendarOpen"
      @calendar-select="onCalendarSelect"
      @update:invalid="onUpdateInvalid"
      @field-insert="onFieldInsert"
      @field-error="onFieldError"
      @field-focus="onFieldFocus"
  />`,
});

export const Common = Template.bind({});


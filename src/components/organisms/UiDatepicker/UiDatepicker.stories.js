import UiDatepicker from '@/components/organisms/UiDatepicker/UiDatepicker.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';

const events = actions({
  onFieldFocus: 'field-focus',
  onFieldInsert: 'field-insert',
  onFieldError: 'field-error',
  onCalendarSelect: 'calendar-select',
  onCalendarOpen: 'calendar-open',
});

export default {
  title: 'Organisms/Datepicker',
  component: UiDatepicker,
  args: {
    error: false,
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
    const modelValue = ref('');
    const invalid = ref('');
    return {
      events, ...args, modelValue, invalid,
    };
  },
  template: `<UiDatepicker
      v-bind="{...events}"
      v-model="modelValue"
      :error="error"
      :order="order"
      v-model:invalid="invalid"
      :touched="touched"
      :lang="lang"
      :translation="translation"
      :min-limit="minLimit"
      :max-limit="maxLimit"
  />`,
});

export const Common = Template.bind({});


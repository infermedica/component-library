import UiDatepicker from '@/components/organisms/UiDatepicker/UiDatepicker.vue';
import { ref } from 'vue';

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
};

const Template = (args) => ({
  components: { UiDatepicker },
  setup() {
    const modelValue = ref('');
    const invalid = ref('');
    return { ...args, modelValue, invalid };
  },
  template: `<UiDatepicker
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


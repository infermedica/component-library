import UiRating from '@/components/molecules/UiRating/UiRating.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import { ref } from 'vue';

export default {
  title: 'Molecules/Rating',
  component: UiRating,
  subcomponents: { UiRadio, UiIcon },
  args: {
    initModelValue: 3,
    max: 5,
    name: '',
    radioAttrs: {},
    settings: {
      icon: 'star-outlined',
      iconActive: 'star-filled',
    },
    translation: {
      stars: (index) => (`${index} stars`),
    },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state. Starting from 0.',
      table: {
        category: 'stories controls',
      },
      control: 'number',
    },
    modelValue: { control: false },
  },
  parameters: {
    cssprops: {
      'rating-icon-size': {
        value: '1.5rem',
        control: 'text',
        description: '',
      },
      'rating-option': {
        value: '0',
        control: 'text',
        description: '',
      },
      'rating-icon-icon-color': {
        value: 'var(--color-icon-secondary)',
        control: 'text',
        description: '',
      },
      'rating-icon-active-icon-color': {
        value: 'var(--color-icon-secondary-active)',
        control: 'text',
        description: '',
      },
      'rating-icon-positive-icon-color': {
        value: 'var(--color-icon-primary)',
        control: 'text',
        description: '',
      },
      'rating-icon-positive-active-icon-color': {
        value: 'var(--color-icon-primary-active)',
        control: 'text',
        description: '',
      },
      'rating-icon-hover-icon-color': {
        value: 'var(--color-icon-secondary-hover)',
        control: 'text',
        description: '',
      },
      'rating-icon-positive-hover-icon-color': {
        value: 'var(--color-icon-primary-hover)',
        control: 'text',
        description: '',
      },
      'rating-icon-disabled-icon-color': {
        value: 'var(--color-icon-disabled)',
        control: 'text',
        description: '',
      },
      'rating-icon-disabled-hover-icon-color': {
        value: 'var(--color-icon-disabled)',
        control: 'text',
        description: '',
      },
      'rating-icon-disabled-active-icon-color': {
        value: 'var(--color-icon-disabled)',
        control: 'text',
        description: '',
      },
      'rating-icon-disabled-positive-icon-color': {
        value: 'var(--color-icon-disabled)',
        control: 'text',
        description: '',
      },
      'rating-icon-disabled-positive-hover-icon-color': {
        value: 'var(--color-icon-disabled)',
        control: 'text',
        description: '',
      },
      'rating-icon-disabled-positive-active-icon-color': {
        value: 'var(--color-icon-disabled)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiRating },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiRating
    v-model="modelValue"
    :max="max"
    :name="name"
    :radio-attrs="radioAttrs"
  />`,
});

export const Common = Template.bind({});

// TODO: rewrite this slot and bind required values
// export const WithOptionSlot = () => ({
//   template: 'Oops! Not found!',
// });
// WithOptionSlot.parameters = {
//   controls: { hideNoControlsWarning: true },
// };
//
// export const WithIconActiveSlot = (args) => ({
//   components: { UiRating, UiIcon },
//   setup() {
//     const modelValue = ref('3');
//     return { ...args, modelValue };
//   },
//   template: `<UiRating
//     v-model="modelValue"
//     :max="max"
//     :name="name"
//     :radio-attrs="radioAttrs"
//   >
//     <template #icon-active="{translation, icon}">
//       <UiIcon
//         :aria-label="translation"
//         :icon="icon"
//         class="ui-rating__icon ui-rating__icon--active"
//       />
//     </template>
//   </UiRating>`,
// });

export const WithIconSlot = (args) => ({
  components: { UiRating, UiIcon },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiRating
    v-model="modelValue"
    :max="max"
    :name="name"
    :radio-attrs="radioAttrs"
  >
    <template #icon="{translation, icon}">
      <UiIcon
        :aria-label="translation"
        :icon="icon"
        class="ui-rating__icon"
      />
    </template>
  </UiRating>`,
});

import UiRating from '@/components/molecules/UiRating/UiRating.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import { ref } from 'vue';

export default {
  title: 'Molecules/Rating',
  component: UiRating,
  subcomponents: { UiRadio, UiIcon },
  args: {
    name: 'feedback',
    modelValue: '3',
    max: '5',
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
    modelValue: {
      control: false,
    },
    name: {
      control: 'text',
    },
  },
};

const Template = (args) => ({
  components: { UiRating },
  setup() {
    const modelValue = ref('3');
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
export const WithOptionSlot = () => ({
  template: 'Oops! Not found!',
});
WithOptionSlot.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const WithIconActiveSlot = (args) => ({
  components: { UiRating, UiIcon },
  setup() {
    const modelValue = ref('3');
    return { ...args, modelValue };
  },
  template: `<UiRating
    v-model="modelValue"
    :max="max"
    :name="name"
    :radio-attrs="radioAttrs"
  >
    <template #icon-active="{translation, icon}">
      <UiIcon
        :aria-label="translation"
        :icon="icon"
        class="ui-rating__icon ui-rating__icon--active"
      />
    </template>
  </UiRating>`,
});

export const WithIconSlot = (args) => ({
  components: { UiRating, UiIcon },
  setup() {
    const modelValue = ref('3');
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

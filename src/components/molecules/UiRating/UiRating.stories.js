import UiRating from '@/components/molecules/UiRating/UiRating.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import { ref } from 'vue';
import { modifiers } from '@sb/helpers/argTypes';

export default {
  title: 'Molecules/Rating',
  component: UiRating,
  subcomponents: {
    UiRadio,
    UiIcon,
  },
  args: {
    initModelValue: 3,
    modifiers: [],
    max: 5,
    name: '',
    legend: 'How helpful was this checkup for you?',
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
    modifiers: modifiers({
      options: [
        'ui-rating--is-disabled',
      ],
    }),
    modelValue: {
      control: false,
    },
  },
};

const Template = (args) => ({
  components: {
    UiRating,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiRating
    v-model="modelValue"
    :max="max"
    :name="name"
    :legend="legend"
    :class="modifiers"
  />`,
});

export const Common = Template.bind({});

export const IsDisabled = Template.bind({});
IsDisabled.args = {
  modifiers: ['ui-rating--is-disabled'],
};

export const WithIconSlot = (args) => ({
  components: {
    UiRating,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiRating
    v-model="modelValue"
    :max="max"
    :name="name"
    :legend="legend"
    :class="modifiers"
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

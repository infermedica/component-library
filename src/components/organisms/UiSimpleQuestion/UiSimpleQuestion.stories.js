import UiSimpleQuestion from '@/components/organisms/UiSimpleQuestion/UiSimpleQuestion.vue';
import UiTile from '@/components/molecules/UiTile/UiTile.vue';
import { ref } from 'vue';
import { modifiers } from '@sb/helpers/argTypes';

export default {
  title: 'Organisms/SimpleQuestion',
  component: UiSimpleQuestion,
  subcomponents: {
    UiTile,
  },
  args: {
    initModelValue: 'female',
    modifiers: [],
    options: [
      {
        id: 'female',
        value: 'female',
        label: 'Female',
        icon: 'female',
        'data-testid': 'female',
        iconAttrs: {
          'data-testid': 'female-icon',
        },
        textLabelAttrs: {
          'data-testid': 'female-label',
        },
      },
      {
        id: 'male',
        value: 'male',
        label: 'Male',
        icon: 'male',
        iconAttrs: {
          'data-testid': 'male-icon',
        },
        textLabelAttrs: {
          'data-testid': 'male-label',
        },
      },
    ],
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set the initial value.',
      table: {
        category: 'stories controls',
      },
      control: 'string',
    },
    modifiers: modifiers({
      options: ['ui-simple-question--small'],
    }),
    modelValue: {
      control: false,
    },
  },
  decorators: [() => ({
    template: '<div class="max-w-147"><story /></div>',
  })],
};

const Template = (args) => ({
  components: {
    UiSimpleQuestion,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiSimpleQuestion
    v-model="modelValue"
    :options="options"
    :class="modifiers"
  />`,
});

export const AsPatientSex = Template.bind({
});

export const AsPatientSexSmall = Template.bind({
});
AsPatientSexSmall.args = {
  modifiers: ['ui-simple-question--small'],
};

export const WithTileSlot = (args) => ({
  components: {
    UiSimpleQuestion,
    UiTile,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiSimpleQuestion
    v-model="modelValue"
    :options="options"
    :class="modifiers"
  >
  <template #tile="{
    option, 
    modelValue, 
    isTileSmall, 
    updateHandler
  }">
    <UiTile
      :model-value="modelValue"
      :value="option.value"
      :id="option.id"
      :icon="option.icon"
      :icon-attrs="option.iconAttrs"
      :text-label-attrs="option.textLabelAttrs"
      v-bind="{
        'data-testid': option['data-testid'],
      }"
      :class="{'ui-tile--small': isTileSmall}"
      class="ui-simple-question__option ui-tile"
      @update:modelValue="updateHandler(option.value)"
    >
      {{ option.label }}
    </UiTile>
  </template>
  </UiSimpleQuestion>`,
});

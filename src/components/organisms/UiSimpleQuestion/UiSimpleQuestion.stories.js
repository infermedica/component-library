import UiSimpleQuestion from '@/components/organisms/UiSimpleQuestion/UiSimpleQuestion.vue';
import UiTile from '@/components/molecules/UiTile/UiTile.vue';
import { ref } from 'vue';

export default {
  title: 'Organisms/SimpleQuestion',
  component: UiSimpleQuestion,
  subcomponents: { UiTile },
  args: {
    options: [
      {
        id: 'female',
        value: 'female',
        name: 'sex',
        label: 'Female',
        iconAttrs: {
          icon: 'female',
        },
      },
      {
        id: 'male',
        value: 'male',
        name: 'sex',
        label: 'Male',
        iconAttrs: {
          icon: 'male',
        },
      },
    ],
    tileAttrs: {},
  },
  argTypes: {
    modelValue: { control: false },
    modifiers: {
      control: {
        type: 'multi-select',
        options: ['ui-simple-question--small'],
      },
      table: {
        category: 'HTML attributes',
      },
    },
  },
  decorators: [() => ({ template: '<div class="max-w-147"><story /></div>' })],
};

const Template = (args) => ({
  components: { UiSimpleQuestion },
  setup() {
    const modelValue = ref('');
    return { ...args, modelValue };
  },
  template: `<UiSimpleQuestion
    v-model="modelValue"
    :options="options"
    :class="modifiers"
  />`,
});

export const AsPatientSex = Template.bind({});

export const AsPatientSexSmall = Template.bind({});
AsPatientSexSmall.args = {
  modifiers: ['ui-simple-question--small'],
};

export const WithTileSlot = (args) => ({
  components: { UiSimpleQuestion, UiTile },
  setup() {
    const modelValue = ref('');
    return { ...args, modelValue };
  },
  template: `<UiSimpleQuestion
    v-model="modelValue"
    :options="options"
    :class="modifiers"
  >
  <template #tile="{option, tileAttrs, modelValue, isTileSmall, updateHandler}">
    <UiTile
      :id="option.id"
      v-bind="tileAttrs"
      :model-value="modelValue"
      :value="option.value"
      :icon-attrs="option.iconAttrs"
      :name="option.name"
      :class="{'ui-tile--small': isTileSmall}"
      class="ui-simple-question__option ui-tile"
      @update:modelValue="updateHandler(option.value)"
    >
      {{ option.label }}
    </UiTile>
  </template>
  </UiSimpleQuestion>`,
});

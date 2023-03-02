import UiSimpleQuestion from '@/components/organisms/UiSimpleQuestion/UiSimpleQuestion.vue';
import UiTile from '@/components/molecules/UiTile/UiTile.vue';
import { ref } from 'vue';
import { modifiers } from '@sb/helpers/argTypes';

export default {
  title: 'Organisms/SimpleQuestion',
  component: UiSimpleQuestion,
  args: {
    initModelValue: 'female',
    modifiers: [],
    items: [
      {
        value: 'female',
        label: 'Female',
        icon: 'female',
        'data-testid': 'female',
        iconAttrs: { 'data-testid': 'female-icon' },
        textLabelAttrs: { 'data-testid': 'female-label' },
      },
      {
        value: 'male',
        label: 'Male',
        icon: 'male',
        iconAttrs: { 'data-testid': 'male-icon' },
        textLabelAttrs: { 'data-testid': 'male-label' },
      },
    ],
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set the initial value.',
      table: { category: 'stories controls' },
      control: 'string',
    },
    modifiers: modifiers({ options: [ 'ui-simple-question--small' ] }),
    modelValue: { control: false },
  },
  decorators: [ () => ({ template: '<div class="max-w-147"><story /></div>' }) ],
  parameters: {
    cssProperties: {
      '--simple-question-gap': 'var(--space-12)',
      '--simple-question-tablet-gap': 'var(--space-24)',
    },
  },
};

export const AsPatientSex = {
  render: (args) => ({
    components: { UiSimpleQuestion },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiSimpleQuestion
      v-model="modelValue"
      :items="items"
      :class="modifiers"
    />`,
  }),
};

export const AsPatientSexSmall = {
  render: (args) => ({
    components: { UiSimpleQuestion },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiSimpleQuestion
      v-model="modelValue"
      :items="items"
      :class="modifiers"
    />`,
  }),

  args: { modifiers: [ 'ui-simple-question--small' ] },
};

export const WithTileSlot = {
  render: (args) => ({
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
      :items="items"
      :class="modifiers"
    >
      <template #tile="{
        item,
        modelValue,
        isTileSmall,
        updateHandler
      }">
        <UiTile
          :model-value="modelValue"
          :value="item.value"
          :icon="item.icon"
          :icon-attrs="item.iconAttrs"
          :text-label-attrs="item.textLabelAttrs"
          v-bind="{
            'data-testid': item['data-testid'],
          }"
          :class="[
            'ui-simple-question__item',
            { 'ui-tile--small': isTileSmall }
          ]"
          @update:modelValue="updateHandler(item.value)"
        >
          {{ item.label }}
        </UiTile>
      </template>
    </UiSimpleQuestion>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

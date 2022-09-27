import UiMultipleChoices from '@/components/organisms/UiMultipleChoices/UiMultipleChoices.vue';
import UiMultipleChoicesItem from '@/components/organisms/UiMultipleChoices/_internal/UiMultipleChoicesItem.vue';
import UiAlert from '@/components/molecules/UiAlert/UiAlert.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import {
  ref,
  computed,
} from 'vue';
import { actions } from '@storybook/addon-actions';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onUpdateInvalid: 'update:invalid',
  onClickInfoButton: 'click:info-button',
});

export default {
  title: 'Organisms/MultipleChoices',
  component: UiMultipleChoices,
  subcomponents: {
    UiMultipleChoicesItem,
    UiAlert,
    UiList,
  },
  args: {
    initModelValue: [],
    hint: 'Select one answer in each row',
    touched: false,
    initInvalid: true,
    items: [
      {
        id: 'diabetes',
        name: 'I have diabetes',
      },
      {
        id: 'hypertension',
        name: 'I have hypertension',
      },
      {
        id: 'cholesterol',
        name: 'I have high cholesterol',
      },
    ],
    options: [
      {
        name: 'Yes',
        value: 'present',
      },
      {
        name: 'No',
        value: 'absent',
      },
      {
        name: 'Don\'t know',
        value: 'unknown',
      },
    ],
    alertHintAttrs: {
      'data-testid': 'alert-hint',
    },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: 'array',
    },
    initInvalid: {
      name: 'invalid',
      description: 'Use this control to set initial state of invalid props.',
      table: {
        category: 'stories controls',
      },
      control: 'boolean',
    },
    hint: {
      description: 'Use this props to set hint for question.',
      table: {
        category: 'props',
        type: {
          summary: 'string',
        },
      },
      control: 'text',
    },
    hintSlot: {
      name: 'hint',
      description: 'Use this slot to replace hint template.',
      table: {
        category: 'slots',
        type: {
          summary: 'unknown',
        },
      },
    },
    modelValue: {
      control: false,
    },
    invalid: {
      control: false,
    },
  },
};

const Template = (args) => ({
  components: {
    UiMultipleChoices,
  },
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
  template: `<UiMultipleChoices
    v-model="modelValue"
    v-model:invalid="invalid"
    :hint="hint"
    :touched="touched"
    :items="items"
    :options="options"
    @update:modelValue="onUpdateModelValue"
    @update:invalid="onUpdateInvalid"
  />`,
});

export const Common = Template.bind({
});

export const WithButtonInfo = Template.bind({
});
WithButtonInfo.args = {
  items: [
    {
      id: 'i-have-diabetes',
      name: 'I have diabetes',
      translation: {
        info: 'What does it mean?',
      },
      buttonInfoAttrs: {
        onClick: events.onClickInfoButton,
      },
    },
    {
      id: 'i-have-hypertension',
      name: 'I have hypertension',
    },
    {
      id: 'i-have-hypertension',
      name: 'I have high cholesterol',
      translation: {
        info: 'How to check it?',
      },
      buttonInfoAttrs: {
        onClick: events.onClickInfoButton,
      },
    },
  ],
};

export const WithEvidence = (args) => ({
  components: {
    UiMultipleChoices,
  },
  setup() {
    const { items } = args;
    const modelValue = ref(args.initModelValue);
    const invalid = ref(args.initInvalid);
    const evidence = computed(() => modelValue.value.map((item, index) => ({
      choice_id: item,
      id: items[index].id,
      source: 'suggest',
    })));
    return {
      ...args,
      ...events,
      modelValue,
      invalid,
      evidence,
    };
  },
  template: `<UiMultipleChoices
    v-model="modelValue"
    v-model:invalid="invalid"
    :hint="hint"
    :touched="touched"
    :items="items"
    :options="options"
    @update:modelValue="onUpdateModelValue"
    @update:invalid="onUpdateInvalid"
  />`,
});
WithEvidence.args = {
  items: [
    {
      id: 'p_7',
      name: 'High BMI',
    },
    {
      id: 'p_9',
      name: 'I have hypertension',
    },
    {
      id: 'p_28',
      name: 'I have smoked cigarettes for at least 10 years',
    },
  ],
};

export const WithListItemSlot = (args) => ({
  components: {
    UiMultipleChoices,
    UiMultipleChoicesItem,
    UiListItem,
  },
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
  template: `<UiMultipleChoices
    v-model="modelValue"
    v-model:invalid="invalid"
    :hint="hint"
    :touched="touched"
    :items="items"
    :options="options"
    @update:modelValue="onUpdateModelValue"
    @update:invalid="onUpdateInvalid"
  >
    <template 
      #list-item="{
        item,
        index,
        value,
        options,
        hasError,
        updateHandler
      }"
    >
      <UiListItem class="ui-multiple-choices__list-item">
        <UiMultipleChoicesItem
          :model-value="value[index]"
          :item="item"
          :options="options"
          :invalid="hasError(index)"
          class="ui-multiple-choices__choice"
          @update:model-value="updateHandler($event, index)"
        />
      </UiListItem>
    </template>
  </UiMultipleChoices>`,
});

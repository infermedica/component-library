import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import { ref } from 'vue';
import {
  content,
  modifiers,
  disabled,
} from '@sb/helpers/argTypes';

export default {
  title: 'Atoms/Radio',
  component: UiRadio,
  subcomponents: {
    UiText,
  },
  args: {
    initModelValue: '',
    content: 'I’m overweight or obese',
    modifiers: [],
    name: '',
    disabled: false,
    id: '',
    value: 'overweight-or-obese',
  },
  argTypes: {
    content,
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: 'text',
    },
    modifiers: modifiers({
      options: ['ui-radio--has-error', 'ui-radio--is-disabled'],
    }),
    disabled,
    name: {
      description: 'Use this control to set name attribute.',
      table: {
        category: 'html attributes',
      },
      control: {
        type: 'text',
      },
    },
    id: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
  },
};

const Template = (args) => ({
  components: {
    UiRadio,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiRadio
    v-model="modelValue"
    :value="value"
    :id="id"
    :class="modifiers"       
  >
    {{ content }}
  </UiRadio>`,
});

export const WithLabel = Template.bind({
});

export const IsDisabled = Template.bind({
});
IsDisabled.args = {
  modifiers: ['ui-radio--is-disabled'],
};

export const HasError = Template.bind({
});
HasError.args = {
  modifiers: ['ui-radio--has-error'],
};

export const WithRadioSlot = (args) => ({
  components: {
    UiRadio,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiRadio
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :class="modifiers"
  >
    <template #radio="{ checked }">
      <div 
        class="ui-radio__radio"
        :class="{'ui-radio__radio--is-checked': checked}"
      >
        <div class="ui-radio__mark" />
      </div>
    </template>
    {{ content }}
  </UiRadio>`,
});

export const WithLabelSlot = (args) => ({
  components: {
    UiRadio,
    UiText,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiRadio
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :class="modifiers"
  >
    <template #label="{ hasLabel }">
      <UiText
        tag="span"
        class="ui-radio__label"
      >
        {{ content }}
      </UiText>
    </template>
  </UiRadio>`,
});

export const ValueAsObject = (args) => ({
  components: {
    UiRadio,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiRadio
    v-model="modelValue"
    :id="id"
    :value="value"
    :class="modifiers"
  >
    {{ value.label }}
  </UiRadio>`,
});
ValueAsObject.args = {
  initModelValue: {
    label: 'I’m overweight or obese',
    id: 'overweight-or-obese',
  },
  value: {
    label: 'I’m overweight or obese',
    id: 'overweight-or-obese',
  },
};
ValueAsObject.argTypes = {
  initModelValue: {
    description: 'Use this control to set initial state.',
    table: {
      category: 'stories controls',
    },
    control: 'object',
  },
  modelValue: {
    control: false,
  },
};

export const AsGroupWithPrimitiveTypes = (args) => ({
  components: {
    UiRadio,
    UiList,
    UiListItem,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiList style="--list-item-padding: var(--space-12) 0;">
    <UiListItem
      v-for="(value, key) in values"
      :key="key"
    >
      <UiRadio
        v-model="modelValue"
        :value="value"
        :name="name"
      >
        {{ value }}
      </UiRadio>
    </UiListItem>
  </UiList>`,
});
AsGroupWithPrimitiveTypes.args = {
  initModelValue: 'I’m overweight or obese',
  values: [
    'I’m overweight or obese',
    'I have hypertension',
    'I have smoked cigarettes for at least 10 years',
  ],
  name: 'AsGroupWithPrimitiveTypes',
};
AsGroupWithPrimitiveTypes.argTypes = {
  initModelValue: {
    description: 'Use this control to set initial state.',
    table: {
      category: 'stories controls',
    },
    control: 'text',
  },
  values: {
    description: 'Use this control to set the values of radio group.',
    table: {
      category: 'stories controls',
    },
    control: {
      type: 'object',
    },
  },
  id: {
    control: false,
  },
  value: {
    control: false,
  },
  modifiers: {
    control: false,
  },
  disabled: {
    control: false,
  },
  content: {
    control: false,
  },
};

export const AsGroupWithObject = (args) => ({
  components: {
    UiRadio,
    UiList,
    UiListItem,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiList style="--list-item-padding: var(--space-12) 0;">
    <UiListItem
      v-for="(value, key) in values"
      :key="key"
    >
      <UiRadio
        v-model="modelValue"
        :value="value"
        name="name"
      >
        {{value.label}}
      </UiRadio>
    </UiListItem>
  </UiList>`,
});
AsGroupWithObject.args = {
  initModelValue: {
    label: 'I’m overweight or obese',
    id: 'overweight-or-obese',
  },
  values: [
    {
      label: 'I’m overweight or obese',
      id: 'overweight-or-obese',
    },
    {
      label: 'I have hypertension',
      id: 'hypertension',
    },
    {
      label: 'I have smoked cigarettes for at least 10 years',
      id: 'smoked-cigarettes',
    },
  ],
  name: 'AsGroupWithObject',
};
AsGroupWithObject.argTypes = {
  initModelValue: {
    description: 'Use this control to set initial state.',
    table: {
      category: 'stories controls',
    },
    control: 'object',
  },
  values: {
    description: 'Values of the radios group.',
    table: {
      category: 'stories controls',
    },
    control: {
      type: 'object',
    },
  },
  id: {
    control: false,
  },
  value: {
    control: false,
  },
  modifiers: {
    control: false,
  },
  disabled: {
    control: false,
  },
  content: {
    control: false,
  },
};

export const AsGroupWithNestedObject = (args) => ({
  components: {
    UiRadio,
    UiList,
    UiListItem,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiList style="--list-item-padding: var(--space-12) 0;">
    <UiListItem
      v-for="(value, key) in values"
      :key="key"
    >
      <UiRadio
        v-model="modelValue"
        v-bind="value.radioAttrs"
        :value="value"
        :name="name"
      >
        {{value.label}}
      </UiRadio>
    </UiListItem>
  </UiList>`,
});
AsGroupWithNestedObject.args = {
  initModelValue: {
    label: 'I’m overweight or obese',
    id: 'overweight-or-obese',
    radioAttrs: {
      'data-testid': 'overweight-or-obese-radio',
    },
  },
  values: [
    {
      label: 'I’m overweight or obese',
      id: 'overweight-or-obese',
      radioAttrs: {
        'data-testid': 'overweight-or-obese-radio',
      },
    },
    {
      label: 'I have hypertension',
      id: 'hypertension',
      radioAttrs: {
        'data-testid': 'hypertension-radio',
      },
    },
    {
      label: 'I have smoked cigarettes for at least 10 years',
      id: 'smoked-cigarettes',
      radioAttrs: {
        'data-testid': 'smoked-cigarettes-radio',
      },
    },
  ],
  name: 'AsGroupWithNestedObject',
};
AsGroupWithNestedObject.argTypes = {
  initModelValue: {
    description: 'Use this control to set initial state.',
    table: {
      category: 'stories controls',
    },
    control: 'array',
  },
  values: {
    description: 'Values of the radios group.',
    table: {
      category: 'stories controls',
    },
    control: {
      type: 'object',
    },
  },
  id: {
    control: false,
  },
  value: {
    control: false,
  },
  modifiers: {
    control: false,
  },
  disabled: {
    control: false,
  },
  content: {
    control: false,
  },
};

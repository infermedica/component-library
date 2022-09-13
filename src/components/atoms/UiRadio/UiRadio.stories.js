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
    content: '98.6–100.4 °F or 37–38 °C',
    modifiers: [],
    name: '',
    disabled: false,
    id: '',
    value: 'p_7',
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
    :disabled="disabled"
    :class="modifiers"       
  >
    {{content}}
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
    <template #radio="{checked}">
      <div 
        class="ui-radio__radio"
        :class="{'ui-radio__radio--is-checked': checked}"
      >
        <div class="ui-radio__mark" />
      </div>
    </template>
    {{content}}
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
    <template #label>
      <UiText
        tag="span"
        class="ui-radio__label"
      >
        {{content}}
      </UiText>
    </template>
  </UiRadio>`,
});

export const AsGroup = (args) => ({
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
AsGroup.args = {
  initModelValue: {
    label: 'I haven’t checked my temperature',
    id: 's_15',
    choice_id: 'present',
  },
  values: [
    {
      label: '98.6–100.4 °F or 37–38 °C',
      id: 's_20',
      choice_id: 'present',
    },
    {
      label: '100.5–104 °F or 38.1–40 °C',
      id: 's_236',
      choice_id: 'present',
    },
    {
      label: 'I haven’t checked my temperature',
      id: 's_15',
      choice_id: 'present',
    },
  ],
  name: 'AsGroup',
};
AsGroup.argTypes = {
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
    label: '98.6–100.4 °F or 37–38 °C',
    id: 's_20',
    choice_id: 'present',
    radioAttrs: {
      ariaLabel: '98.6–100.4 °F or 37–38 °C',
    },
  },
  values: [
    {
      label: '98.6–100.4 °F or 37–38 °C',
      id: 's_20',
      choice_id: 'present',
      radioAttrs: {
        ariaLabel: '98.6–100.4 °F or 37–38 °C',
      },
    },
    {
      label: '100.5–104 °F or 38.1–40 °C',
      id: 's_236',
      choice_id: 'present',
      radioAttrs: {
        ariaLabel: '100.5–104 °F or 38.1–40 °C',
      },
    },
    {
      label: 'I haven’t checked my temperature',
      id: 's_15',
      choice_id: 'present',
      radioAttrs: {
        ariaLabel: 'I haven’t checked my temperature',
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
  initModelValue: 'Europe',
  values: [
    'Russia, Kazakhstan or Mongolia',
    'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
    'Europe',
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

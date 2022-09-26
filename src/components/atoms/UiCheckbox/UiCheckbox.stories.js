import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import { ref } from 'vue';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';

export default {
  title: 'Atoms/Checkbox',
  component: UiCheckbox,
  subcomponents: {
    UiIcon,
    UiText,
  },
  args: {
    initModelValue: false,
    content: 'I read and accept Terms of Service and Privacy Policy.',
    modifiers: [],
    disabled: false,
    id: '',
    value: '',
  },
  argTypes: {
    content,
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: 'boolean',
    },
    modifiers: modifiers({
      options: ['ui-checkbox--has-error', 'ui-checkbox--is-disabled'],
    }),
    modelValue: {
      control: false,
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
    UiCheckbox,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiCheckbox
    v-model="modelValue"
    :id="id"
    :class="modifiers"
  >
    {{ content }}
  </UiCheckbox>`,
});

export const WithLabel = Template.bind({
});

export const IsDisabled = Template.bind({
});
IsDisabled.args = {
  modifiers: ['ui-checkbox--is-disabled'],
};

export const HasError = Template.bind({
});
HasError.args = {
  modifiers: ['ui-checkbox--has-error'],
};

export const WithCheckboxSlot = (args) => ({
  components: {
    UiCheckbox,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiCheckbox
      v-model="modelValue"
      :id="id"
      :class="modifiers"
    >
      <template #checkbox="{ checked }">
        <div 
          class="ui-checkbox__checkbox"
          :class="{
            'ui-checkbox__checkbox--is-checked': checked,
         }"
        >
          <UiIcon
            icon="checkmark"
            class="ui-checkbox__checkmark"
          />
        </div>
      </template>
      {{ content }}
    </UiCheckbox>`,
});

export const WithLabelSlot = (args) => ({
  components: {
    UiCheckbox,
    UiText,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiCheckbox
      v-model="modelValue"
      :id="id"
      :class="modifiers"
    >
      <template #label="{ hasLabel }">
        <UiText
          tag="span"
          class="ui-checkbox__label"
        >
          {{ content }}
        </UiText>
      </template>
    </UiCheckbox>`,
});

export const ValueAsObject = (args) => ({
  components: {
    UiCheckbox,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiCheckbox
    v-model="modelValue"
    :id="id"
    :value="value"
    :class="modifiers"
  >
    {{ value.label }}
  </UiCheckbox>`,
});
ValueAsObject.args = {
  initModelValue: [{
    label: 'Europe',
    id: 'europe',
  }],
  value: {
    label: 'Europe',
    id: 'europe',
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
    UiCheckbox,
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
      <UiCheckbox
        v-model="modelValue"
        :value="value"
      >
        {{ value }}
      </UiCheckbox>
    </UiListItem>
  </UiList>`,
});
AsGroupWithPrimitiveTypes.args = {
  initModelValue: ['Europe'],
  values: [
    'Russia, Kazakhstan or Mongolia',
    'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
    'Europe',
  ],
};
AsGroupWithPrimitiveTypes.argTypes = {
  initModelValue: {
    description: 'Use this control to set initial state.',
    table: {
      category: 'stories controls',
    },
    control: 'array',
  },
  values: {
    description: 'Values of the checkbox group.',
    table: {
      category: 'stories controls',
    },
    control: 'object',
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
  content: {
    control: false,
  },
};

export const AsGroupWithObject = (args) => ({
  components: {
    UiCheckbox,
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
      <UiCheckbox
        v-model="modelValue"
        :value="value"
      >
        {{value.label}}
      </UiCheckbox>
    </UiListItem>
  </UiList>`,
});
AsGroupWithObject.args = {
  initModelValue: [
    {
      label: 'Europe',
      id: 'europe',
    },
  ],
  values: [
    {
      label: 'Russia, Kazakhstan or Mongolia',
      id: 'russia-kazakhstan-mongolia',
    },
    {
      label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      id: 'asia-excluding-middle-east-russia-mongolia-kazakhstan',
    },
    {
      label: 'Europe',
      id: 'europe',
    },
  ],
};
AsGroupWithObject.argTypes = {
  initial: {
    description: 'Use this control to set initial state.',
    table: {
      category: 'stories controls',
    },
    control: 'array',
  },
  values: {
    description: 'Use this control to set the values of checkbox group.',
    table: {
      category: 'stories controls',
    },
    control: 'array',
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
  content: {
    control: false,
  },
};

export const AsGroupWithNestedObject = (args) => ({
  components: {
    UiCheckbox,
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
      <UiCheckbox
        v-model="modelValue"
        v-bind="value.checkboxAttrs"
        :value="value"
      >
        {{value.label}}
      </UiCheckbox>
    </UiListItem>
  </UiList>`,
});
AsGroupWithNestedObject.args = {
  initModelValue: [
    {
      label: 'Europe',
      id: 'europe',
      checkboxAttrs: {
        'data-testid': 'europe-checkbox',
      },
    },
  ],
  values: [
    {
      label: 'Russia, Kazakhstan or Mongolia',
      id: 'russia-kazakhstan-mongolia',
      checkboxAttrs: {
        'data-testid': 'russia-kazakhstan-mongolia-checkbox',
      },
    },
    {
      label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      id: 'asia-excluding-middle-east-russia-mongolia-kazakhstan',
      checkboxAttrs: {
        'data-testid': 'asia-excluding-middle-east-russia-mongolia-kazakhstan-checkbox',
      },
    },
    {
      label: 'Europe',
      id: 'europe',
      checkboxAttrs: {
        'data-testid': 'europe-checkbox',
      },
    },
  ],
};
AsGroupWithNestedObject.argTypes = {
  initModelValue: {
    description: 'Use this control to set initial state.',
    table: {
      category: 'stories controls',
    },
    control: 'object',
  },
  values: {
    description: 'Values of the checkbox group.',
    table: {
      category: 'stories controls',
    },
    control: 'object',
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
  content: {
    control: false,
  },
};

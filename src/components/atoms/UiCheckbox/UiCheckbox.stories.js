import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import { ref } from 'vue';
import { content, modifiers, disabled } from '@sb/helpers/argTypes';

export default {
  title: 'Atoms/Checkbox',
  component: UiCheckbox,
  subcomponents: { UiIcon, UiText },
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
    modifiers: modifiers({ options: ['ui-checkbox--has-error', 'ui-checkbox--is-disabled'] }),
    disabled,
    modelValue: { control: false },
    id: { control: 'text' },
    value: { control: 'text' },
  },
  parameters: {
    cssprops: {
      'checkbox-border-radius': {
        value: 'var(--border-radius-form)',
        control: 'text',
        description: '',
      },
      'checkbox-size': {
        value: '1.25rem',
        control: 'text',
        description: '',
      },
      'checkbox-margin': {
        value: '0.125rem',
        control: 'text',
        description: '',
      },
      'checkbox-background': {
        value: 'var(--color-background-white)',
        control: 'text',
        description: '',
      },
      'checkbox-border': {
        value: 'var(--checkbox-border-style, solid) var(--checkbox-border-color, var(--color-border-strong))',
        control: 'text',
        description: '',
      },
      'checkbox-border-width': {
        value: '2px',
        control: 'text',
        description: '',
      },
      'checkbox-label-font': {
        value: 'var(--font-body-1)',
        control: 'text',
        description: '',
      },
      'checkbox-label-letter-spacing': {
        value: 'var(--letter-spacing-body-1)',
        control: 'text',
        description: '',
      },
      'checkbox-label-flex': {
        value: '1',
        control: 'text',
        description: '',
      },
      'checkbox-label-margin': {
        value: '0 var(--space-12) 0 0',
        control: 'text',
        description: '',
      },
      'checkbox-label-color': {
        value: 'var(--color-text-body)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiCheckbox },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiCheckbox
    v-model="modelValue"
    :id="id"
    :disabled="disabled"
    :class="modifiers"
  >
    {{content}}
  </UiCheckbox>`,
});

export const WithLabel = Template.bind({});

export const IsDisabled = Template.bind({});
IsDisabled.args = {
  modifiers: ['ui-checkbox--is-disabled'],
  disabled: true,
};

export const HasError = Template.bind({});
HasError.args = {
  modifiers: ['ui-checkbox--has-error'],
};

export const WithCheckbuttonSlot = (args) => ({
  components: { UiCheckbox, UiIcon },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiCheckbox
      v-model="modelValue"
      :id="id"
      :disabled="disabled"
      :class="modifiers"
    >
      <template #checkbutton="{checked}">
        <div class="ui-checkbox__checkbutton">
          <UiIcon
            icon="checkmark"
            class="ui-checkbox__mark"
          />
        </div>
      </template>
      {{ content }}
    </UiCheckbox>`,
});

export const WithLabelSlot = (args) => ({
  components: { UiCheckbox, UiText },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiCheckbox
      v-model="modelValue"
      :id="id"
      :disabled="disabled"
      :class="modifiers"
    >
      <template #label>
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
  components: { UiCheckbox },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiCheckbox
    v-model="modelValue"
    :id="id"
    :value="value"
    :disabled="disabled"
    :class="modifiers"
  >
    {{content}}
  </UiCheckbox>`,
});
ValueAsObject.args = {
  initModelValue: [{
    id: 1,
    question: 34,
  }],
  value: {
    id: 1,
    question: 34,
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
  modelValue: { control: false },
};

export const AsGroup = (args) => ({
  components: { UiCheckbox, UiList, UiListItem },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
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
AsGroup.args = {
  initModelValue: [
    {
      label: 'Europe',
      id: 'p_15',
      choice_id: 'present',
      source: 'predefined',
    },
  ],
  values: [
    {
      label: 'Russia, Kazakhstan or Mongolia',
      id: 'p_20',
      choice_id: 'present',
      source: 'predefined',
    },
    {
      label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      id: 'p_236',
      choice_id: 'present',
      source: 'predefined',
    },
    {
      label: 'Europe',
      id: 'p_15',
      choice_id: 'present',
      source: 'predefined',
    },
  ],
};
AsGroup.argTypes = {
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
  id: { control: false },
  value: { control: false },
  modifiers: { control: false },
  disabled: { control: false },
  content: { control: false },
};

export const AsGroupWithNestedObject = (args) => ({
  components: { UiCheckbox, UiList, UiListItem },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
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
      id: 'p_15',
      choice_id: 'present',
      source: 'predefined',
      checkboxAttrs: {
        ariaLabel: 'Europe',
      },
    },
  ],
  values: [
    {
      label: 'Russia, Kazakhstan or Mongolia',
      id: 'p_20',
      choice_id: 'present',
      source: 'predefined',
      checkboxAttrs: {
        ariaLabel: 'Russia, Kazakhstan or Mongolia',
      },
    },
    {
      label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      id: 'p_236',
      choice_id: 'present',
      source: 'predefined',
      checkboxAttrs: {
        ariaLabel: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      },
    },
    {
      label: 'Europe',
      id: 'p_15',
      choice_id: 'present',
      source: 'predefined',
      checkboxAttrs: {
        ariaLabel: 'Europe',
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
  id: { control: false },
  value: { control: false },
  modifiers: { control: false },
  disabled: { control: false },
  content: { control: false },
};

export const AsGroupWithPrimitiveTypes = (args) => ({
  components: { UiCheckbox, UiList, UiListItem },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
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
        {{value}}
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
  id: { control: false },
  value: { control: false },
  modifiers: { control: false },
  disabled: { control: false },
  content: { control: false },
};

import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';

import { ref } from 'vue';

export default {
  title: 'Atoms/Radio',
  component: UiRadio,
  args: {
    content: '98.6–100.4 °F or 37–38 °C',
    id: 'p_7',
    value: 'p_7',
    modelValue: true,
    name: 'answer',
    disabled: false,
    modifiers: [],
  },
  argTypes: {
    content: { control: 'text' },
    value: { control: 'text' },
    id: { control: 'text' },
    name: { control: 'text' },
    modelValue: { control: false },
    disabled: {
      control: 'boolean',
      table: {
        category: 'HTML attributes',
      },
    },
    modifiers: {
      control: { type: 'multi-select' },
      options: ['ui-radio--has-error', 'ui-radio--is-disabled'],
      table: {
        category: 'HTML attributes',
      },
    },
  },
  parameters: {
    cssprops: {
      'radio-size': {
        value: '1.25rem',
        control: 'text',
        description: '',
      },
      'radio-margin': {
        value: '0.125rem',
        control: 'text',
        description: '',
      },
      'radio-background': {
        value: 'var(--color-background-white)',
        control: 'text',
        description: '',
      },
      'radio-border': {
        value: 'solid var(--color-border-strong)',
        control: 'text',
        description: '',
      },
      'radio-border-width': {
        value: '2px',
        control: 'text',
        description: '',
      },
      'radio-border-radius': {
        value: 'var(--border-radius-circle)',
        control: 'text',
        description: '',
      },
      'radio-mark-size': {
        value: '0.625rem',
        control: 'text',
        description: '',
      },
      'radio-mark-background': {
        value: 'transparent',
        control: 'text',
        description: '',
      },
      'radio-label-flex': {
        value: '1',
        control: 'text',
        description: '',
      },
      'radio-label-margin': {
        value: '0 var(--space-12) 0 0',
        control: 'text',
        description: '',
      },
      'radio-label-color': {
        value: 'var(--color-text-body)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiRadio },
  setup() {
    const modelValue = ref('');
    return { ...args, modelValue };
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

export const WithLabel = Template.bind({});

export const IsDisabled = Template.bind({});
IsDisabled.args = {
  modifiers: ['ui-radio--is-disabled'],
};

export const HasError = Template.bind({});
HasError.args = {
  modifiers: ['ui-radio--has-error'],
};

export const WithRadiobuttonSlot = (args) => ({
  components: { UiRadio },
  setup() {
    const modelValue = ref('');
    return { ...args, modelValue };
  },
  template: `<UiRadio
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :class="modifiers"       
  >
    <template #radiobutton>
      <div class="ui-radio__radiobutton">
        <div class="ui-radio__mark" />
      </div>
    </template>
    {{content}}
  </UiRadio>`,
});

export const WithLabelSlot = (args) => ({
  components: { UiRadio },
  setup() {
    const modelValue = ref('');
    return { ...args, modelValue };
  },
  template: `<UiRadio
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :class="modifiers"       
  >
    <template #label>
      <div class="ui-radio__label">
        {{content}}
      </div>
    </template>
  </UiRadio>`,
});

export const AsGroup = (args) => ({
  components: { UiRadio, UiList, UiListItem },
  setup() {
    const modelValue = ref({
      label: 'I haven’t checked my temperature',
      id: 's_15',
      choice_id: 'present',
    });
    return { ...args, modelValue };
  },
  template: `<UiList style="--list-item-padding: var(--space-12) 0;">
    <UiListItem 
      v-for="(value, key) in values"
      :key="key"
    >
      <UiRadio
        v-model="modelValue"
        :value="value"
        name=""
      >
        {{value.label}}
      </UiRadio>
    </UiListItem>
  </UiList>`,
});
AsGroup.args = {
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
};
AsGroup.argTypes = {
  values: {
    control: 'object',
  },
  id: { control: false },
  value: { control: false },
  modifiers: { control: false },
  disabled: { control: false },
  content: { control: false },
};

export const AsGroupWithNestedObject = (args) => ({
  components: { UiRadio, UiList, UiListItem },
  setup() {
    const modelValue = ref({
      label: '98.6–100.4 °F or 37–38 °C',
      id: 's_20',
      choice_id: 'present',
      radioAttrs: {
        ariaLabel: '98.6–100.4 °F or 37–38 °C',
      },
    });
    return { ...args, modelValue };
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
        name=""
      >
        {{value.label}}
      </UiRadio>
    </UiListItem>
  </UiList>`,
});
AsGroupWithNestedObject.args = {
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
};
AsGroupWithNestedObject.argTypes = {
  values: {
    control: 'object',
  },
  id: { control: false },
  value: { control: false },
  modifiers: { control: false },
  disabled: { control: false },
  content: { control: false },
};

export const AsGroupWithPrimitiveTypes = (args) => ({
  components: { UiRadio, UiList, UiListItem },
  setup() {
    const modelValue = ref('Europe');
    return { ...args, modelValue };
  },
  template: `<UiList style="--list-item-padding: var(--space-12) 0;">
    <UiListItem 
      v-for="(value, key) in values"
      :key="key"
    >
      <UiRadio
        v-model="modelValue"
        :value="value"
        name=""
      >
        {{ value }}
      </UiRadio>
    </UiListItem>
  </UiList>`,
});
AsGroupWithPrimitiveTypes.args = {
  values: [
    'Russia, Kazakhstan or Mongolia',
    'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
    'Europe',
  ],
};
AsGroupWithPrimitiveTypes.argTypes = {
  values: {
    control: 'object',
  },
  id: { control: false },
  value: { control: false },
  modifiers: { control: false },
  disabled: { control: false },
  content: { control: false },
};

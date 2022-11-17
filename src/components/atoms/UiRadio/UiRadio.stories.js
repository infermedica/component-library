import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onFocus: 'onFocus',
  onBlur: 'onBlur',
});

export default {
  title: 'Atoms/Radio',
  component: UiRadio,
  subcomponents: { UiText },
  args: {
    initModelValue: '',
    content: 'I’m overweight or obese',
    modifiers: [],
    name: '',
    disabled: false,
    value: 'overweight-or-obese',
    id: '',
    inputAttrs: { 'data-testid': 'input-element' },
    radioElementAttrs: { 'data-testid': 'radio-element' },
    textLabelAttrs: { 'data-testid': 'label-text' },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'text',
    },
    content,
    modifiers: modifiers({
      options: [
        'ui-radio--has-error',
        'ui-radio--is-disabled',
      ],
    }),
    name: {
      description: 'Use this control to set name attribute.',
      table: { category: 'html attributes' },
      control: { type: 'text' },
    },
    value: { control: 'text' },
    id: { control: 'text' },
    inputAttrs: { table: { subcategory: 'Attrs props' } },
    radioElementAttrs: { table: { subcategory: 'Attrs props' } },
    textLabelAttrs: { table: { subcategory: 'Attrs props' } },
  },
};

const Template = (args) => ({
  components: { UiRadio },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiRadio
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :radio-element-attrs="radioElementAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
    @update:modelValue="onUpdateModelValue"
    @focus="onFocus"
    @blur="onBlur"
  >
    {{ content }}
  </UiRadio>`,
});

export const WithLabel = Template.bind({});

export const IsDisabled = Template.bind({});
IsDisabled.args = { modifiers: [ 'ui-radio--is-disabled' ] };

export const HasError = Template.bind({});
HasError.args = { modifiers: [ 'ui-radio--has-error' ] };

export const WithRadioSlot = (args) => ({
  components: { UiRadio },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiRadio
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :radio-element-attrs="radioElementAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
    @update:modelValue="onUpdateModelValue"
    @focus="onFocus"
    @blur="onBlur"
  >
    <template 
      #radiobutton="{ 
        checked,
        radioElementAttrs,
      }"
    >
      <div 
        v-bind="radioElementAttrs"
        :class="['ui-radio__radio', {
          'ui-radio__radio--is-checked': checked
        }]"
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
      ...events,
      modelValue,
    };
  },
  template: `<UiRadio
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :radio-element-attrs="radioElementAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
    @update:modelValue="onUpdateModelValue"
    @focus="onFocus"
    @blur="onBlur"
  >
    <template #label="{
      hasLabel,
      textLabelAttrs,
    }">
      <UiText
        v-bind="textLabelAttrs"
        class="ui-radio__label"
      >
        {{ content }}
      </UiText>
    </template>
  </UiRadio>`,
});

export const ValueAsObject = (args) => ({
  components: { UiRadio },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiRadio
    v-model="modelValue"
    :value="value"
    :id="value.id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :radio-element-attrs="radioElementAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
    @update:modelValue="onUpdateModelValue"
    @focus="onFocus"
    @blur="onBlur"
  >
    {{ value.label }}
  </UiRadio>`,
});
ValueAsObject.args = {
  initModelValue: {
    label: 'I’m overweight or obese',
    id: 'value-as-object-overweight-or-obese',
  },
  value: {
    label: 'I’m overweight or obese',
    id: 'value-as-object-overweight-or-obese',
  },
};
ValueAsObject.argTypes = {
  initModelValue: {
    description: 'Use this control to set initial state.',
    table: { category: 'stories controls' },
    control: 'object',
  },
  modelValue: { control: false },
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
      ...events,
      modelValue,
      UiRadio,
    };
  },
  template: `<UiList>
    <UiListItem
      v-for="(value, key) in values"
      :key="key"
      :tag="UiRadio"
      v-model="modelValue"
      :name="name"
      :value="value"
      :id="id"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :radio-element-attrs="radioElementAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      {{ value }}
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
    table: { category: 'stories controls' },
    control: 'text',
  },
  values: {
    description: 'Use this control to set the values of radio group.',
    table: { category: 'stories controls' },
    control: { type: 'object' },
  },
  id: { control: false },
  value: { control: false },
  modifiers: { control: false },
  disabled: { control: false },
  content: { control: false },
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
      ...events,
      modelValue,
      UiRadio,
    };
  },
  template: `<UiList>
    <UiListItem
      v-for="(value, key) in values"
      :key="key"
      :tag="UiRadio"
      v-model="modelValue"
      :value="value"
      :id="value.id"
      :name="name"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :radio-element-attrs="radioElementAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      {{ value.label }}
    </UiListItem>
  </UiList>`,
});
AsGroupWithObject.args = {
  initModelValue: {
    label: 'I’m overweight or obese',
    id: 'as-group-with-object-overweight-or-obese',
  },
  values: [
    {
      label: 'I’m overweight or obese',
      id: 'as-group-with-object-overweight-or-obese',
    },
    {
      label: 'I have hypertension',
      id: 'as-group-with-object-hypertension',
    },
    {
      label: 'I have smoked cigarettes for at least 10 years',
      id: 'as-group-with-object-smoked-cigarettes',
    },
  ],
  name: 'AsGroupWithObject',
};
AsGroupWithObject.argTypes = {
  initModelValue: {
    description: 'Use this control to set initial state.',
    table: { category: 'stories controls' },
    control: 'object',
  },
  values: {
    description: 'Values of the radios group.',
    table: { category: 'stories controls' },
    control: { type: 'object' },
  },
  id: { control: false },
  value: { control: false },
  modifiers: { control: false },
  disabled: { control: false },
  content: { control: false },
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
      ...events,
      modelValue,
      UiRadio,
    };
  },
  template: `<UiList>
    <UiListItem
      v-for="(value, key) in values"
      :key="key"
      :tag="UiRadio"
      v-model="modelValue"
      :value="value"
      :id="value.id"
      :name="name"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :radio-element-attrs="value.radioElementAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      {{ value.label }}
    </UiListItem>
  </UiList>`,
});
AsGroupWithNestedObject.args = {
  initModelValue: {
    label: 'I’m overweight or obese',
    id: 'as-group-with-nested-object-overweight-or-obese',
    radioElementAttrs: { 'data-testid': 'overweight-or-obese-radio' },
  },
  values: [
    {
      label: 'I’m overweight or obese',
      id: 'overweight-or-obese',
      radioElementAttrs: { 'data-testid': 'overweight-or-obese-radio' },
    },
    {
      label: 'I have hypertension',
      id: 'as-group-with-nested-object-hypertension',
      radioElementAttrs: { 'data-testid': 'hypertension-radio' },
    },
    {
      label: 'I have smoked cigarettes for at least 10 years',
      id: 'as-group-with-nested-object-smoked-cigarettes',
      radioElementAttrs: { 'data-testid': 'smoked-cigarettes-radio' },
    },
  ],
  name: 'AsGroupWithNestedObject',
};
AsGroupWithNestedObject.argTypes = {
  initModelValue: {
    description: 'Use this control to set initial state.',
    table: { category: 'stories controls' },
    control: 'array',
  },
  values: {
    description: 'Values of the radios group.',
    table: { category: 'stories controls' },
    control: { type: 'object' },
  },
  id: { control: false },
  value: { control: false },
  modifiers: { control: false },
  content: { control: false },
};

import UiTile from '@/components/molecules/UiTile/UiTile.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';

const events = actions({ onUpdateModelValue: 'update:modelValue' });

export default {
  title: 'Molecules/Tile',
  component: UiTile,
  subcomponents: {
    UiButton,
    UiText,
    UiIcon,
  },
  args: {
    initModelValue: '',
    content: 'Yes',
    modifiers: [],
    value: 'present',
    id: '',
    icon: 'yes',
    iconAttrs: { 'data-testid': 'icon' },
    textLabelAttrs: { 'date-testid': 'text-label' },
  },
  argTypes: {
    content,
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'string',
    },
    modifiers: modifiers({ options: ['ui-tile--small'] }),
    value: { control: 'text' },
    modelValue: { control: false },
    icon: {
      description: 'Use this props to set icon.',
      table: {
        category: 'props',
        type: { summary: 'string|object' },
      },
    },
    iconSlot: {
      name: 'icon',
      description: 'Use this slot to replace icon template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: 'object',
    },
  },
};

const Template = (args) => ({
  components: { UiTile },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiTile
    v-model="modelValue"
    :value="value"
    :id="id"
    :icon="icon"
    :icon-attrs="iconAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
    style="width: 100%; max-width: 320px;"
    @update:modelValue="onUpdateModelValue"
  >
    {{content}}
  </UiTile>`,
});

export const Large = Template.bind({});

export const Small = Template.bind({});
Small.args = { modifiers: ['ui-tile--small'] };

export const HasError = Template.bind({});
HasError.args = { modifiers: ['ui-tile--has-error'] };

export const WithIconSlot = (args) => ({
  components: {
    UiTile,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiTile
    v-model="modelValue"
    :value="value"
    :id="id"
    :icon="icon"
    :icon-attrs="iconAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
    style="width: 100%; max-width: 320px;"
    @update:modelValue="onUpdateModelValue"
  >
    <template #icon="{ attrs }">
      <UiIcon
        v-bind="attrs"
        class="ui-button__icon ui-tile__icon"
      />
    </template>
    {{content}}
  </UiTile>`,
});

export const WithLabelSlot = (args) => ({
  components: {
    UiTile,
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
  template: `<UiTile
    v-model="modelValue"
    :value="value"
    :id="id"
    :icon-attrs="iconAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
    style="width: 100%; max-width: 320px;"
    @update:modelValue="onUpdateModelValue"
  >
    <template #label="{ attrs }">
      <UiText
        v-bind="attrs"
        class="ui-tile__label"
      >
        {{ content }}
      </UiText>
    </template>
  </UiTile>`,
});

export const AsGroup = (args) => ({
  components: { UiTile },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<div 
    class="flex flex-col tablet:flex-row"
    style="width: 100%; max-width: 1008px;"
  >
    <template 
      v-for="(option, key) in values" 
      :key="key"
    >
      <UiTile
        v-model="modelValue"
        :id="option.id"
        :value="option.value"
        :icon="option.icon"
        :icon-attrs="option.iconAttrs"
        :text-label-attrs="option.textLabelAttrs"
        :class="[...option.class || [], ...modifiers || [] ]"
        style="flex: 1;"
        @update:modelValue="onUpdateModelValue"
      >
        {{option.label}}
      </UiTile>
    </template>
  </div>`,
});
AsGroup.args = {
  initModelValue: { choice_id: 'present' },
  values: [
    {
      name: 'answer',
      value: { choice_id: 'present' },
      id: 'present',
      icon: 'yes',
      iconAttrs: { 'data-testid': 'present' },
      textLabelAttrs: { 'data-testid': 'present' },
      label: 'Yes',
      class: ['mb-3', 'tablet:mr-6', 'tablet:mb-0'],
    },
    {
      name: 'answer',
      value: { choice_id: 'absent' },
      id: 'absent',
      icon: 'no',
      iconAttrs: { 'data-testid': 'no' },
      textLabelAttrs: { 'data-testid': 'no' },
      label: 'No',
      class: ['mb-3', 'tablet:mr-6', 'tablet:mb-0'],
    },
    {
      name: 'answer',
      value: { choice_id: 'unknown' },
      id: 'unknown',
      icon: 'dont-know',
      iconAttrs: { 'data-testid': 'unknown' },
      textLabelAttrs: { 'data-testid': 'unknown' },
      label: 'Don\'t know',
    },
  ],
};
AsGroup.argTypes = {
  initModelValue: {
    description: 'Use this control to set initial state.',
    table: { category: 'stories controls' },
    control: 'object',
  },
  values: {
    description: 'Use this control to set the values of the tile group.',
    table: { category: 'stories controls' },
    control: 'array',
  },
};

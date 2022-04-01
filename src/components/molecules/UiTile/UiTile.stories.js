import { content, modifiers } from '@sb/helpers/argTypes';
import { ref } from 'vue';

import UiTile from '@/components/molecules/UiTile/UiTile.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';

export default {
  title: 'Molecules/Tile',
  component: UiTile,
  subcomponents: { UiButton, UiText, UiIcon },
  args: {
    initModelValue: '',
    content: 'Yes',
    modifiers: [],
    iconAttrs: {
      icon: 'yes',
    },
    id: '',
    value: 'present',

  },
  argTypes: {
    content,
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: 'string',
    },
    modifiers: modifiers({ options: ['ui-tile--small'] }),
    value: { control: 'text' },
    modelValue: { control: false },
  },
  parameters: {
    cssprops: {
      'tile-padding': {
        value: 'var(--space-24) var(--space-16)',
        control: 'text',
        description: '',
      },
      'tile-active-transform': {
        value: 'scale(0.96)',
        control: 'text',
        description: '',
      },
      'tile-icon-size': {
        value: '4rem',
        control: 'text',
        description: '',
      },
      'tile-icon-color': {
        value: 'var(--color-icon-primary)',
        control: 'text',
        description: '',
      },
      'tile-label-padding': {
        value: '0',
        control: 'text',
        description: '',
      },
      'tile-label-margin': {
        value: '0 var(--space-16) 0 0',
        control: 'text',
        description: '',
      },
      'tile-label-text-align': {
        value: 'left',
        control: 'text',
        description: '',
      },
      'tile-label-tablet-text-align': {
        value: 'center',
        control: 'text',
        description: '',
      },
      'tile-label-tablet-margin': {
        value: 'var(--space-16) 0 0 0',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiTile },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiTile
    v-model="modelValue"
    :id="id"
    :value="value"
    :icon-attrs="iconAttrs"
    class="max-w-80 tablet:max-w-68"
    :class="modifiers"
    style="--button-width: 100%"
  >
    {{content}}
  </UiTile>`,
});

export const Large = Template.bind({});

export const Small = Template.bind({});
Small.args = {
  modifiers: ['ui-tile--small'],
};

export const WithIconSlot = (args) => ({
  components: { UiTile, UiIcon },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiTile
    v-model="modelValue"
    :id="id"
    :value="value"
    :icon-attrs="iconAttrs"
    class="max-w-80 tablet:max-w-68"
    :class="modifiers"
    style="--button-width: 100%"
  >
    <template #icon="{iconAttrs}">
      <UiIcon
        v-bind="iconAttrs"
        class="ui-tile__icon"
      />
    </template>
    {{content}}
  </UiTile>`,
});

export const WithLabelSlot = (args) => ({
  components: { UiTile, UiText },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiTile
    v-model="modelValue"
    :id="id"
    :value="value"
    :icon-attrs="iconAttrs"
    class="max-w-80 tablet:max-w-68"
    :class="modifiers"
    style="--button-width: 100%"
  >
    <template #label>
      <UiText
        tag="span"
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
    return { ...args, modelValue };
  },
  template: `<div class="flex flex-col tablet:flex-row max-w-147">
    <template v-for="(option, key) in values" :key="key">
      <UiTile
        v-model="modelValue"
        :id="option.id"
        :value="option.value"
        :icon-attrs="option.iconAttrs"
        style="--button-width: 100%"
        :class="[...option.class || [], ...modifiers || [] ]"
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
      iconAttrs: {
        icon: 'yes',
      },
      label: 'Yes',
      class: ['mb-3', 'tablet:mr-6', 'tablet:mb-0'],
    },
    {
      name: 'answer',
      value: { choice_id: 'absent' },
      id: 'absent',
      iconAttrs: {
        icon: 'no',
      },
      label: 'No',
      class: ['mb-3', 'tablet:mr-6', 'tablet:mb-0'],
    },
    {
      name: 'answer',
      value: { choice_id: 'unknown' },
      id: 'unknown',
      iconAttrs: {
        icon: 'dont-know',
      },
      label: 'Don\'t know',
    },
  ],
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
    description: 'Use this control to set the values of the tile group.',
    table: {
      category: 'stories controls',
    },
    control: 'array',
  },
};

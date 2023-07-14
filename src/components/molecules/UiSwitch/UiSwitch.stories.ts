import { ref } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import deepmerge from 'deepmerge';
import { useArgTypes } from '@sb/helpers';
import type { SwitchAttrsProps } from '@index';
import {
  UiSwitch,
  UiAccordion,
  UiText,
  UiButton,
  UiIcon,
  UiList,
} from '@index';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiSwitchControl from '@/components/molecules/UiSwitch/_internal/UiSwitchControl.vue';
import UiAccordionItem from '@/components/organisms/UiAccordion/_internal/UiAccordionItem.vue';

type SwitchArgsType = SwitchAttrsProps;
type SwitchMetaType = Meta<SwitchArgsType>;
type SwitchStoryType = StoryObj<SwitchArgsType>;

const { argTypes } = useArgTypes(deepmerge(UiSwitch, { __docgenInfo: { modifiers: [ 'ui-switch--is-disabled' ] } }));

const meta = {
  title: 'Molecules/SwitchTS',
  component: UiSwitch,
  args: {
    modelValue: false,
    modifiers: [],
    label: 'I agree to the processing of my health information for the purpose of performing the interview.',
    controlAttrs: { 'data-testid': 'switch-control' },
  },
  argTypes: {
    ...argTypes,
    modelValue: { control: 'boolean' },
    label: {
      control: 'text',
      description: 'Use this control to set the label.',
      table: { category: 'stories controls' },
    },
  },
} satisfies SwitchMetaType;

export default meta;

export const Basic: SwitchStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { UiSwitch },
    setup(props, { attrs }) {
      const {
        modelValue,
        modifiers,
        ...args
      } = attrs;

      const value = ref(modelValue);

      return {
        value,
        modifiers,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiSwitch
      v-model="value"
      v-bind="args"
    />`,
  }),
};

export const IsDisabled: SwitchStoryType = { ...Basic };
IsDisabled.args = { modifiers: [ 'ui-switch--is-disabled' ] };

export const WithLabel: SwitchStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { UiSwitch },
    setup(props, { attrs }) {
      const {
        modelValue,
        label,
        ...args
      } = attrs;

      const value = ref(modelValue);

      return {
        value,
        label,
        args,
      };
    },
    template: `<UiSwitch
      v-model="value"
      v-bind="args"
    >
      {{ label }}
    </UiSwitch>`,
  }),
};

export const AsGroup: SwitchStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSwitch,
      UiList,
      UiListItem,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        items,
        ...args
      } = attrs;

      return {
        args,
        items,
        UiSwitch,
      };
    },
    template: `
    <UiList>
      <UiListItem
        v-for="(value, key) in items"
        :key="key"
        :tag="UiSwitch"
        v-model="value.modelValue"
        v-bind="args"
      >
        {{ value.label }}
      </UiListItem>
    </UiList>`,
  }),
};
AsGroup.args = {
  items: [
    {
      label: 'Necessary',
      id: 'necessary',
      controlAttrs: { 'data-testid': 'necessary' },
      modelValue: false,
    },
    {
      label: 'Functional',
      id: 'functional',
      controlAttrs: { 'data-testid': 'functional' },
      modelValue: false,
    },
    {
      label: 'Analytics',
      id: 'analytics',
      controlAttrs: { 'data-testid': 'analytics' },
      modelValue: false,
    },
  ],
};
AsGroup.argTypes = {
  modelValue: { table: { disable: true } },
  items: {
    description: 'Use this control to set the values of checkbox group.',
    table: { category: 'stories controls' },
    control: 'array',
  },
};

export const AsGroupWithPrimiteTypes: SwitchStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSwitch,
      UiList,
      UiListItem,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        items,
        ...args
      } = attrs;

      const values = ref(modelValue);
      return {
        values,
        args,
        items,
        UiSwitch,
      };
    },
    template: `
  <UiList>
    <UiListItem
      v-for="(value, key) in items"
      :key="key"
      :tag="UiSwitch"
      v-model="values[value]"
      v-bind="args"
    >
      {{ value }}
    </UiListItem>
  </UiList>`,
  }),
};
AsGroupWithPrimiteTypes.args = {
  items: [
    'Necessary',
    'Functional',
    'Analytics',
  ],
  modelValue: [
    { necessary: false },
    { functional: false },
    { analytics: false },
  ],
};
AsGroupWithPrimiteTypes.argTypes = {
  ...AsGroup.argTypes,
  modelValue: { control: 'array' },
};

export const WithSwitchControlSlot: SwitchStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSwitch,
      UiSwitchControl,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        label,
        ...args
      } = attrs;

      const value = ref(modelValue);

      return {
        value,
        label,
        args,
      };
    },
    template: `<UiSwitch
      v-model="value"
      v-bind="args"
    >
      <template #switchcontrol="{
        checked,
        controlAttrs,
      }">
        <UiSwitchControl
          v-bind="controlAttrs"
          :class="{
            'ui-switch-control--is-checked': checked,
            'ui-switch__control--is-checked': checked,
          }"
        />
      </template>
    </UiSwitch>`,
  }),
};


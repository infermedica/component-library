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
  UiList,
} from '@index';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiSwitchControl from '@/components/molecules/UiSwitch/_internal/UiSwitchControl.vue';

type SwitchArgsType = SwitchAttrsProps;
type SwitchMetaType = Meta<SwitchArgsType>;
type SwitchStoryType = StoryObj<SwitchArgsType>;

const { argTypes } = useArgTypes(deepmerge(UiSwitch, { __docgenInfo: { modifiers: [ 'ui-switch--is-disabled' ] } }));

const meta = {
  title: 'Molecules/Switch',
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
  parameters: {
    chromatic: {
      disableSnapshot: false,
      viewports: [
        320,
        1200,
      ],
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
        v-model="values"
        :value="value.id"
        v-bind="args"
      >
        {{ value.label }}
      </UiListItem>
    </UiList>`,
  }),
};
AsGroup.args = {
  modelValue: [ 'necessary' ],
  items: [
    {
      label: 'Necessary',
      id: 'necessary',
      controlAttrs: { 'data-testid': 'necessary' },
    },
    {
      label: 'Functional',
      id: 'functional',
      controlAttrs: { 'data-testid': 'functional' },
    },
    {
      label: 'Analytics',
      id: 'analytics',
      controlAttrs: { 'data-testid': 'analytics' },
    },
  ],
};
AsGroup.argTypes = {
  modelValue: {
    control: 'object',
    defaultValue: [ 'necessary' ],
  },
  items: {
    description: 'Use this control to set values of checkboxes group.',
    table: { category: 'stories controls' },
    control: 'object',
  },
  label: { table: { disable: true } },
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
      v-model="values"
      :value="value"
      v-bind="args"
    >
      {{ value }}
    </UiListItem>
  </UiList>`,
  }),
};
AsGroupWithPrimiteTypes.args = {
  modelValue: [ 'Necessary' ],
  items: [
    'Necessary',
    'Functional',
    'Analytics',
  ],
};
AsGroupWithPrimiteTypes.argTypes = { ...AsGroup.argTypes };

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
WithSwitchControlSlot.parameters = { chromatic: { disableSnapshot: true } };

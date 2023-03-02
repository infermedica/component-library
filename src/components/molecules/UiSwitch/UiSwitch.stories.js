import UiSwitch from '@/components/molecules/UiSwitch/UiSwitch.vue';
import UiSwitchControl from '@/components/molecules/UiSwitch/_internal/UiSwitchControl.vue';
import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';
import { content } from '@sb/helpers/argTypes';
import { WithItemLinkSlot } from '@/components/molecules/UiStepper/UiStepper.stories';

const events = actions({ onUpdateModelValue: 'update:modelValue' });

export default {
  title: 'Molecules/Switch',
  component: UiSwitch,
  subcomponents: { UiCheckbox },
  args: {
    initModelValue: false,
    content:
      'I agree to the processing of my health information for the purpose of performing the interview.',
    controlAttrs: { 'data-testid': 'switch-control' },
  },
  argTypes: {
    content,
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'boolean',
    },
    modelValue: { control: false },
    controlAttrs: { table: { subcategory: 'Attrs props' } },
  },
  parameters: {
    cssProperties: {
      '--switch-hover-color': 'var(--color-switch-disabled)',
      '--switch-checked-hover-color': 'var(--color-switch-disabled)',
      '--switch-active-color': 'var(--color-switch-disabled)',
      '--switch-checked-active-color': 'var(--color-switch-disabled)',
      '--switch-color': 'var(--color-switch-disabled)',
    },
  },
};

export const WithoutLabel = {
  render: (args) => ({
    components: { UiSwitch },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiSwitch
      v-model="modelValue"
      :control-attrs="controlAttrs"
      :text-label-attrs="{ 'data-testid': 'label-text' }"
      @update:modelValue="onUpdateModelValue"
    />`,
  }),
};

export const IsDisabled = {
  render: (args) => ({
    components: { UiSwitch },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiSwitch
      v-model="modelValue"
      :control-attrs="controlAttrs"
      :text-label-attrs="{ 'data-testid': 'label-text' }"
      class="ui-switch--is-disabled"
      @update:modelValue="onUpdateModelValue"
    />`,
  }),
};

export const WithLabel = {
  render: (args) => ({
    components: {
      UiSwitch,
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
    template: `<UiSwitch
      v-model="modelValue"
      :control-attrs="controlAttrs"
      :text-label-attrs="{ 'data-testid': 'label-text' }"
      @update:modelValue="onUpdateModelValue"
    >
      {{ content }}
    </UiSwitch>`,
  }),
};

export const AsGroup = {
  render: (args) => ({
    components: {
      UiSwitch,
      UiList,
      UiListItem,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
        UiSwitch,
      };
    },
    template: `<UiList>
      <UiListItem
        v-for="(value, key) in values"
        :key="key"
        :tag="UiSwitch"
        v-model="modelValue"
        :value="value"
        :control-attrs="value.controlAttrs"
        @update:modelValue="onUpdateModelValue"
      >
        {{ value.label }}
      </UiListItem>
    </UiList>`,
  }),

  args: {
    initModelValue: [ {
      label: 'Necessary',
      id: 'necessary',
      controlAttrs: { 'data-testid': 'necessary' },
    } ],
    values: [
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
  },

  argTypes: {
    initial: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'array',
    },
    values: {
      description: 'Use this control to set the values of checkbox group.',
      table: { category: 'stories controls' },
      control: 'array',
    },
  },
};

export const AsGroupWithPrimitiveTypes = {
  render: (args) => ({
    components: {
      UiSwitch,
      UiList,
      UiListItem,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        modelValue,
        UiSwitch,
      };
    },
    template: `<UiList>
      <UiListItem
        v-for="(value, key) in values"
        :key="key"
        :tag="UiSwitch"
        v-model="modelValue"
        :value="value"
      >
        {{ value }}
      </UiListItem>
    </UiList>`,
  }),

  args: {
    initModelValue: [ 'Necessary' ],
    values: [
      'Necessary',
      'Functional',
      'Analytics',
    ],
  },

  argTypes: {
    initial: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'array',
    },
    values: {
      description: 'Use this control to set the values of checkbox group.',
      table: { category: 'stories controls' },
      control: 'array',
    },
  },

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithSwitchControlSlot = {
  render: (args) => ({
    components: {
      UiSwitch,
      UiSwitchControl,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiSwitch
      v-model="modelValue"
      :control-attrs="controlAttrs"
      :text-label-attrs="{ 'data-testid': 'label-text' }"
      @update:modelValue="onUpdateModelValue"
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

  parameters: { chromatic: { disableSnapshot: true } },
};

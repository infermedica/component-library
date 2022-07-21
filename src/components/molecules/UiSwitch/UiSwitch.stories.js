import { actions } from '@storybook/addon-actions';
import { ref } from 'vue';
import { content, disabled } from '@sb/helpers/argTypes';
import UiSwitch from '@/components/molecules/UiSwitch/UiSwitch.vue';
import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiSwitchControl from '@/components/molecules/UiSwitch/_internal/UiSwitchControl.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
});

export default {
  title: 'Molecules/Switch',
  component: UiSwitch,
  subcomponents: { UiCheckbox },
  args: {
    initModelValue: false,
    slotName: '',
    content: 'I agree to the processing of my health information for the purpose of performing the interview.',
    disabled: false,
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
    disabled,
    slotName: {
      name: 'slot',
      description: 'Use this control to set slot to override.',
      table: {
        category: 'stories controls',
      },
      control: 'select',
      options: ['switchcontrol', 'checkbutton', 'label'],
    },
    modelValue: { control: false },
  },
};

export const WithoutLabel = (args) => ({
  components: { UiSwitch },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, ...events, modelValue };
  },
  template: `<UiSwitch
    v-model="modelValue"
    :disabled="disabled"
    @update:modelValue="onUpdateModelValue"
  />`,
});

export const WithLabel = (args) => ({
  components: { UiSwitch, UiText },
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
    :disabled="disabled"
    @update:modelValue="onUpdateModelValue"
  >
    {{ content }}
  </UiSwitch>`,
});

export const WithSwitchcontrolSlot = (args) => ({
  components: { UiSwitch, UiSwitchControl },
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
    :disabled="disabled"
    @update:modelValue="onUpdateModelValue"
  >
    <template #switchcontrol="{isChecked}">
      <UiSwitchControl/>
    </template>
  </UiSwitch>`,
});

export const SlotsInSwitch = (args) => ({
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
    :disabled="disabled"
    @update:modelValue="onUpdateModelValue"
  >
    <template #[slotName]="data">
      {{ slotName }}-{{ data }}
    </template>
    {{ content }}
  </UiSwitch>`,
});

export const AsGroup = (args) => ({
  components: { UiSwitch, UiList, UiListItem },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiList style="--list-item-padding: var(--space-12) 0;">
    <UiListItem
      v-for="(value, key) in values"
      :key="key"
    >
      <UiSwitch
        v-model="modelValue"
        :value="value"
      >
        {{value.label}}
      </UiSwitch>
    </UiListItem>
  </UiList>`,
});
AsGroup.args = {
  initModelValue: [{
    label: 'Necessary',
    id: 'necessary',
  }],
  values: [
    {
      label: 'Necessary',
      id: 'necessary',
    },
    {
      label: 'Functional',
      id: 'functional',
    },
    {
      label: 'Analytics',
      id: 'analytics',
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
};

export const AsGroupWithPrimitiveTypes = (args) => ({
  components: { UiSwitch, UiList, UiListItem },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiList style="--list-item-padding: var(--space-12) 0;">
    <UiListItem
      v-for="(value, key) in values"
      :key="key"
    >
      <UiSwitch
        v-model="modelValue"
        :value="value"
      >
        {{value}}
      </UiSwitch>
    </UiListItem>
  </UiList>`,
});
AsGroupWithPrimitiveTypes.args = {
  initModelValue: ['Necessary'],
  values: ['Necessary', 'Functional', 'Analytics'],
};
AsGroupWithPrimitiveTypes.argTypes = {
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
};

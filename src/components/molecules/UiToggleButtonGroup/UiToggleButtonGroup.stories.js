import UiToggleButtonGroup from '@/components/molecules/UiToggleButtonGroup/UiToggleButtonGroup.vue';
import UiToggleButton from '@/components/molecules/UiToggleButtonGroup/_internal/UiToggleButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import { ref } from 'vue';

export default {
  title: 'Molecules/ToggleButtonGroup',
  component: UiToggleButtonGroup,
  subcomponents: {
    UiToggleButton,
  },
  args: {
    items: [{
      value: 1,
      label: 'First',
    },
    {
      value: 2,
      label: 'Second',
    },
    {
      value: 3,
      label: 'Third',
    }],
    initialValue: null,
    deselectable: false,
  },
};

export const Default = (args) => ({
  components: {
    UiToggleButton,
    UiToggleButtonGroup,
  },
  setup() {
    const modelValue = ref(args.initialValue);
    return { ...args, modelValue };
  },
  template: `
    <UiToggleButtonGroup v-model="modelValue" :deselectable="deselectable">
    <template
        v-for="({value, label, modifiers}, key) in items"
        :key="key"
    >
      <UiToggleButton :value="value" :class="modifiers">
        {{label}}
      </UiToggleButton>
    </template>
    </UiToggleButtonGroup>
  `,
});

export const Pressed = Default.bind({});
Pressed.args = { initialValue: 1 };

export const Disabled = Default.bind({});
Disabled.args = {
  items: [{
    value: 1,
    label: 'First',
    modifiers: 'ui-toggle-button--is-disabled',
  },
  {
    value: 2,
    label: 'Second',
  },
  {
    value: 3,
    label: 'Third',
  }],
};

export const PressedDisabled = Default.bind({});
PressedDisabled.args = {
  initialValue: 1,
  items: [{
    value: 1,
    label: 'First',
    modifiers: 'ui-toggle-button--is-disabled',
  },
  {
    value: 2,
    label: 'Second',
  },
  {
    value: 3,
    label: 'Third',
  }],
};

export const Deselectable = Default.bind({});
Deselectable.args = { deselectable: true };

export const WithStringValues = Default.bind({});
WithStringValues.args = {
  items: [
    {
      value: 'first',
      label: 'First',
    },
    {
      value: 'second',
      label: 'Second',
    },
    {
      value: 'third',
      label: 'Third',
    },
  ],
};

export const WithObjectValues = Default.bind({});
WithObjectValues.args = {
  items: [
    {
      value: { id: 1 },
      label: 'First',
    },
    {
      value: { id: 2 },
      label: 'Second',
    },
    {
      value: { id: 3 },
      label: 'Third',
    },
  ],
};

export const WithIcon = (args) => ({
  components: {
    UiToggleButton,
    UiToggleButtonGroup,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initialValue);
    return { ...args, modelValue };
  },
  template: `
    <UiToggleButtonGroup v-model="modelValue" :deselectable="deselectable">
    <template
        v-for="({value, label, modifiers, icon, iconPosition}, key) in items"
        :key="key"
    >
      <UiToggleButton :value="value" :class="modifiers">
        <UiIcon v-if="icon && iconPosition === 'left'" :icon="icon" class="ui-button__icon" />
        {{label}}
        <UiIcon v-if="icon && iconPosition === 'right'" :icon="icon" class="ui-button__icon ui-button__icon--right" />
      </UiToggleButton>
    </template>
    </UiToggleButtonGroup>
  `,
});

WithIcon.args = {
  items: [
    {
      value: 1,
      label: 'First',
      modifiers: 'ui-toggle-button--has-icon',
      icon: 'dots',
      iconPosition: 'left',
    },
    {
      value: 2,
      label: 'Second',
      modifiers: 'ui-toggle-button--has-icon',
      icon: 'plus',
      iconPosition: 'right',
    },
  ],
};

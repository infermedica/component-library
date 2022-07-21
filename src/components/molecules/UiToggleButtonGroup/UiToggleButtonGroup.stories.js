import { ref, computed } from 'vue';
import UiToggleButtonGroup from '@/components/molecules/UiToggleButtonGroup/UiToggleButtonGroup.vue';
import UiToggleButton from '@/components/molecules/UiToggleButtonGroup/_internal/UiToggleButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';

export default {
  title: 'Molecules/ToggleButtonGroup',
  component: UiToggleButtonGroup,
  subcomponents: {
    UiToggleButton,
  },
  args: {
    items: ['First', 'Second', 'Third'],
    initModelValue: '',
    deselectable: false,
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set the initial value.',
      table: {
        category: 'stories controls',
      },
      control: 'text',
    },
    modelValue: {
      control: false,
    },
    toggleButton: {
      name: '<name>',
      description: 'Use this slot to replace toggle button content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
  },
  parameters: {
    cssprops: {
      'toggle-button-group-display': {
        value: 'flex',
        control: 'text',
        description: '',
      },
    },
  },
};

export const Common = (args) => ({
  components: { UiToggleButtonGroup },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiToggleButtonGroup 
    v-model="modelValue"
    :items="items"
  />`,
});

export const WithToggleButtonSlot = (args) => ({
  components: { UiToggleButtonGroup },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiToggleButtonGroup 
    v-model="modelValue"
    :items="items"
  >
    <template #first="{item}">
      {{item.text}}
    </template>
  </UiToggleButtonGroup>`,
});
WithToggleButtonSlot.args = {
  items: [
    { name: 'first', text: 'First', value: 'first' },
    { name: 'second', text: 'Second', value: 'second' },
    { name: 'third', text: 'Third', value: 'third' },
  ],
};

export const Pressed = Common.bind({});
Pressed.args = { initModelValue: 'First' };

export const Disabled = Common.bind({});
Disabled.args = {
  items: [
    { text: 'First', value: 'first', toggleButtonAttrs: { class: 'ui-toggle-button--is-disabled', disabled: true } },
    { text: 'Second', value: 'second' },
    { text: 'Third', value: 'third' },
  ],
};

export const PressedDisabled = Common.bind({});
PressedDisabled.args = {
  initModelValue: 'first',
  items: [
    { text: 'First', value: 'first', toggleButtonAttrs: { class: 'ui-toggle-button--is-disabled', disabled: true } },
    { text: 'Second', value: 'second' },
    { text: 'Third', value: 'third' },
  ],
};

export const Deselectable = Common.bind({});
Deselectable.args = {
  deselectable: true,
};

export const WithNumberValues = Common.bind({});
WithNumberValues.args = {
  items: [
    {
      value: 1,
      text: 'First',
    },
    {
      value: 2,
      text: 'Second',
    },
    {
      value: 3,
      text: 'Third',
    },
  ],
};

export const WithObjectValues = Common.bind({});
WithObjectValues.args = {
  items: [
    {
      value: { id: 1 },
      text: 'First',
    },
    {
      value: { id: 2 },
      text: 'Second',
    },
    {
      value: { id: 3 },
      text: 'Third',
    },
  ],
};

export const WithIcon = (args) => ({
  components: {
    UiToggleButtonGroup,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initialValue);
    const slots = computed(() => (args.items.map((item, key) => (`toggle-button-${key}`))));
    return { ...args, modelValue, slots };
  },
  template: `<UiToggleButtonGroup 
    v-model="modelValue" 
    :deselectable="deselectable"
    :items="items"
  >
    <template 
      v-for="(slot, key) in slots"
      key="key" 
      #[slot]="{item}"
    >
      <UiIcon 
        :icon="item.icon" 
        class="ui-button__icon"
      />{{item.text}}
    </template>
  </UiToggleButtonGroup>`,
});
WithIcon.args = {
  items: [
    {
      text: 'First', value: 'first', toggleButtonAttrs: { class: 'ui-toggle-button--has-icon' }, icon: 'dots',
    },
    {
      text: 'Second', value: 'second', toggleButtonAttrs: { class: 'ui-toggle-button--has-icon' }, icon: 'plus',
    },
  ],
};

export const WithDefaultSlot = (args) => ({
  components: { UiToggleButtonGroup, UiToggleButton },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiToggleButtonGroup
        v-model="modelValue"
        :deselectable="deselectable"
    >
      <template
          v-for="(item, key) in items"
          :key="key"
      >
        <UiToggleButton :value="item">
          {{item}}
        </UiToggleButton>
      </template>
    </UiToggleButtonGroup>`,
});

import UiToggleButtonGroup from '@/components/molecules/UiToggleButtonGroup/UiToggleButtonGroup.vue';
import UiToggleButton from '@/components/molecules/UiToggleButtonGroup/_internal/UiToggleButton.vue';
import UiBackdrop from '@/components/atoms/UiBackdrop/UiBackdrop.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import {
  ref,
  computed,
} from 'vue';

export default {
  title: 'Molecules/ToggleButtonGroup',
  component: UiToggleButtonGroup,
  args: {
    items: [
      'First',
      'Second',
      'Third',
    ],
    initModelValue: 'Second',
    deselectable: false,
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set the initial value.',
      table: { category: 'stories controls' },
      control: 'text',
    },
    modelValue: { control: false },
    toggleButton: {
      name: '<name>',
      description: 'Use this slot to replace toggle button content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
  },
};

export const Common = {
  render: (args) => ({
    components: {
      UiToggleButtonGroup,
      UiBackdrop,
      UiIcon,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiToggleButtonGroup
      v-model="modelValue"
      :items="items"
    />`,
  }),
};

export const WithToggleButtonSlot = {
  render: (args) => ({
    components: { UiToggleButtonGroup },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiToggleButtonGroup
      v-model="modelValue"
      :items="items"
    >
      <template #first="{ item }">
        {{ item.text }}
      </template>
    </UiToggleButtonGroup>`,
  }),

  args: {
    items: [
      {
        name: 'first',
        text: 'First',
        value: 'first',
        'data-testid': 'first-toggle-button',
      },
      {
        name: 'second',
        text: 'Second',
        value: 'second',
      },
      {
        name: 'third',
        text: 'Third',
        value: 'third',
      },
    ],
  },
};

export const Pressed = {
  render: (args) => ({
    components: {
      UiToggleButtonGroup,
      UiBackdrop,
      UiIcon,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiToggleButtonGroup
      v-model="modelValue"
      :items="items"
    />`,
  }),

  args: { initModelValue: 'First' },
};

export const Disabled = {
  render: (args) => ({
    components: {
      UiToggleButtonGroup,
      UiBackdrop,
      UiIcon,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiToggleButtonGroup
      v-model="modelValue"
      :items="items"
    />`,
  }),

  args: {
    items: [
      {
        text: 'First',
        value: 'first',
        class: 'ui-toggle-button--is-disabled',
      },
      {
        text: 'Second',
        value: 'second',
      },
      {
        text: 'Third',
        value: 'third',
      },
    ],
  },
};

export const PressedDisabled = {
  render: (args) => ({
    components: {
      UiToggleButtonGroup,
      UiBackdrop,
      UiIcon,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiToggleButtonGroup
      v-model="modelValue"
      :items="items"
    />`,
  }),

  args: {
    initModelValue: 'second',
    items: [
      {
        text: 'First',
        value: 'first',
      },
      {
        text: 'Second',
        value: 'second',
        class: 'ui-toggle-button--is-disabled',
      },
      {
        text: 'Third',
        value: 'third',
      },
    ],
  },
};

export const Deselectable = {
  render: (args) => ({
    components: {
      UiToggleButtonGroup,
      UiBackdrop,
      UiIcon,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiToggleButtonGroup
      v-model="modelValue"
      :items="items"
    />`,
  }),
};

export const WithIcon = {
  render: (args) => ({
    components: {
      UiToggleButtonGroup,
      UiIcon,
    },
    setup() {
      const modelValue = ref(args.initialValue);
      const slots = computed(() => args.items.map((item, key) => `toggle-button-${key}`));
      return {
        ...args,
        modelValue,
        slots,
      };
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
        />{{ item.text }}
      </template>
    </UiToggleButtonGroup>`,
  }),

  args: {
    items: [
      {
        text: 'First',
        value: 'first',
        class: 'ui-toggle-button--has-icon',
        icon: 'dots',
      },
      {
        text: 'Second',
        value: 'second',
        class: 'ui-toggle-button--has-icon',
        icon: 'plus',
      },
    ],
  },
};

export const WithNumberValues = {
  render: (args) => ({
    components: {
      UiToggleButtonGroup,
      UiBackdrop,
      UiIcon,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiToggleButtonGroup
      v-model="modelValue"
      :items="items"
    />`,
  }),

  args: {
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
  },
};

export const WithObjectValues = {
  render: (args) => ({
    components: {
      UiToggleButtonGroup,
      UiBackdrop,
      UiIcon,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiToggleButtonGroup
      v-model="modelValue"
      :items="items"
    />`,
  }),

  args: {
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
  },
};

export const WithDefaultSlot = {
  render: (args) => ({
    components: {
      UiToggleButtonGroup,
      UiToggleButton,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        modelValue,
      };
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
          {{ item }}
        </UiToggleButton>
      </template>
    </UiToggleButtonGroup>`,
  }),
};

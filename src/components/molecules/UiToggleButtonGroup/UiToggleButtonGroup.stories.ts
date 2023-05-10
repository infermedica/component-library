import {
  UiToggleButtonGroup,
  UiIcon,
} from '@index';
import type { ToggleButtonGroupProps } from '@index';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  withModelValue,
  withVariants,
} from '@sb/decorators';
import { useArgTypes } from '@sb/helpers';
import UiToggleButton from './_internal/UiToggleButton.vue';

type ToggleButtonGroupArgsType = ToggleButtonGroupProps;
type ToggleButtonGroupMetaType = Meta<ToggleButtonGroupArgsType>;
type ToggleButtonGroupStoryType = StoryObj<ToggleButtonGroupArgsType>;

export const stringItemsData = [
  'Primary care',
  'Specialist care',
  'Urgent care',
];
export const complexItemsData = [
  {
    text: 'Primary care',
    value: 'primary',
  },
  {
    text: 'Specialist care',
    value: 'specialist',
  },
  {
    text: 'Urgent care',
    value: 'urgent',
  },
];

const { argTypes } = useArgTypes(UiToggleButtonGroup);
const meta = {
  title: 'Molecules/ToggleButtonGroup',
  component: UiToggleButtonGroup,
  excludeStories: /.*(Type|Data)$/,
  args: {
    items: stringItemsData,
    deselectable: false,
  },
  argTypes: {
    ...argTypes,
    'item.name': {
      name: '<name>',
      description: 'Use this slot to replace toggle button content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
  },
  decorators: [ withModelValue ],
} satisfies ToggleButtonGroupMetaType;
export default meta;

export const Basic: ToggleButtonGroupStoryType = {
  render: () => ({
    components: { UiToggleButtonGroup },
    setup(props, { attrs }) {
      const {
        modelValue, ...args
      } = attrs;
      return {
        args,
        modelValue,
      };
    },
    template: `<UiToggleButtonGroup
      v-bind="args"
      v-model="modelValue"
    />`,
  }),
};
Basic.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiToggleButtonGroup
    v-model="modelValue"
    :deselectable="deselectable"
    :items="items"
  />
</template>

<script setup lang="ts">
const { ref } from 'vue';
import { UiToggleButtonGroup } from '@infermedica/component-library';

const modelValue = ref('');
const deselectable = false;
const items = [
  'Primary care',
  'Specialist care',
  'Urgent care',
];
</script>"`,
    },
  },
};

export const Deselectable: ToggleButtonGroupStoryType = { ...Basic };
Deselectable.args = {
  modelValue: 'primary',
  items: complexItemsData,
  deselectable: true,
};
Deselectable.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiToggleButtonGroup
    v-model="modelValue"
    :deselectable="deselectable"
    :items="items"
  />
</template>

<script setup lang="ts">
const { ref } from 'vue';
import { UiToggleButtonGroup } from '@infermedica/component-library';

const modelValue = ref('primary');
const deselectable = false;
const items = [
  {
    text: 'Primary care',
    value: 'primary',
  },
  {
    text: 'Specialist care',
    value: 'specialist',
  },
  {
    text: 'Urgent care',
    value: 'urgent',
  },
];
;
</script>"`,
    },
  },
};

export const WithIcon: ToggleButtonGroupStoryType = {
  render: () => ({
    components: {
      UiToggleButtonGroup,
      UiIcon,
    },
    setup(props, { attrs }) {
      const {
        modelValue, ...args
      } = attrs;
      const slots = Array.from({ length: 3 }, (_, index) => `toggle-button-${index}`);
      return {
        args,
        modelValue,
        slots,
      };
    },
    template: `<UiToggleButtonGroup
    v-model="modelValue"
    v-bind="args"
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
};
WithIcon.args = {
  modelValue: 'primary',
  items: complexItemsData.map((item, index) => {
    const icons = [
      'emergency',
      'consultation',
      'emergency-ambulance',
    ];
    return {
      ...item,
      class: 'ui-toggle-button--has-icon',
      icon: icons[index],
    };
  }),
};
WithIcon.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiToggleButtonGroup
    v-model="modelValue"
    v-bind="args"
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
  </UiToggleButtonGroup>
</template>

<script setup lang="ts">
const { ref } from 'vue';
import { UiToggleButtonGroup } from '@infermedica/component-library';

const modelValue = ref('primary');
const deselectable = false;
const items = [
  {
    text: 'Primary care',
    icon: 'emergency'
    value: 'primary',
    class: 'ui-toggle-button--has-icon',
  },
  {
    class: 'ui-toggle-button--has-icon',
    icon: 'consultation'
    text: 'Specialist care',
    value: 'specialist',
  },
  {
    class: 'ui-toggle-button--has-icon',
    icon: 'emergency-ambulance'
    text: 'Urgent care',
    value: 'urgent',
  },
];
</script>`,
    },
  },
};

export const UnselectedVariants: ToggleButtonGroupStoryType = { ...Basic };
UnselectedVariants.decorators = [ withVariants ];
UnselectedVariants.args = { modelValue: '' };
UnselectedVariants.parameters = {
  docs: { source: { code: null } },
  variants: [
    {
      label: 'default',
      items: complexItemsData,
    },
    ...[
      'hover',
      'active',
      'focus',
    ].map((state) => ({
      label: state,
      items: [
        {
          ...complexItemsData[0],
          class: `pseudo-${state}`,
        },
        ...complexItemsData.slice(1),
      ],
    })),
    {
      label: 'disabled',
      items: [
        {
          ...complexItemsData[0],
          class: 'ui-toggle-button--is-disabled',
        },
        ...complexItemsData.slice(1),
      ],
    },
  ],
};

export const SelectedVariants: ToggleButtonGroupStoryType = { ...UnselectedVariants };
SelectedVariants.args = { modelValue: 'primary' };

export const WithStringValues: ToggleButtonGroupStoryType = { ...Basic };
WithStringValues.args = { items: stringItemsData };

export const WithNumberValues: ToggleButtonGroupStoryType = { ...Basic };
WithNumberValues.args = { items: stringItemsData.map((option, index) => index + 1) };
WithNumberValues.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiToggleButtonGroup
    v-model="modelValue"
    :deselectable="deselectable"
    :items="items"
  />
</template>

<script setup lang="ts">
const { ref } from 'vue';
import { UiToggleButtonGroup } from '@infermedica/component-library';

const modelValue = ref('');
const deselectable = false;
const items = [
  1,
  2,
  3,
];
</script>"`,
    },
  },
};

export const WithObjectValues: ToggleButtonGroupStoryType = { ...Basic };
WithObjectValues.args = { items: complexItemsData };
WithObjectValues.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiToggleButtonGroup
    v-model="modelValue"
    :deselectable="deselectable"
    :items="items"
  />
</template>

<script setup lang="ts">
const { ref } from 'vue';
import { UiToggleButtonGroup } from '@infermedica/component-library';

const modelValue = ref('');
const deselectable = false;
const items = [
  {
    text: 'Primary care',
    value: 'primary',
  },
  {
    text: 'Specialist care',
    value: 'specialist',
  },
  {
    text: 'Urgent care',
    value: 'urgent',
  },
];
</script>"`,
    },
  },
};

export const WithDefaultSlot: ToggleButtonGroupStoryType = {
  render: () => ({
    components: {
      UiToggleButtonGroup,
      UiToggleButton,
    },
    setup(props, { attrs }) {
      const {
        modelValue, items, ...args
      } = attrs;
      return {
        args,
        items,
        modelValue,
      };
    },
    template: `<UiToggleButtonGroup
      v-model="modelValue"
      v-bind="args"
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
WithDefaultSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiToggleButtonGroup
    v-model="modelValue"
    :deselectable="false"
    :items="items"
  >
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiToggleButton :value="item">
        {{ item }}
      </UiToggleButton>
    </template>
  </UiToggleButtonGroup>
</template>

<script setup lang="ts">
const { ref } from 'vue';
import { UiToggleButtonGroup } from '@infermedica/component-library';
import UiToggleButton from '@infermedica/component-library/src/components/molecules/UiToggleButtonGroup/_internal/UiToggleButton.vue';

const modelValue = ref('');
const deselectable = false;
const items = [
  'Primary care',
  'Specialist care',
  'Urgent care',
];
</script>"`,
    },
  },
};

export const WithToggleButtonSlot: ToggleButtonGroupStoryType = {
  render: () => ({
    components: { UiToggleButtonGroup },
    setup(props, { attrs }) {
      const {
        modelValue, ...args
      } = attrs;
      return {
        args,
        modelValue,
      };
    },
    template: `<UiToggleButtonGroup
      v-model="modelValue"
      v-bind="args"
    >
      <template #toggle-button-0="{ item }">
        {{ item.text }}
      </template>
    </UiToggleButtonGroup>`,
  }),
};
WithToggleButtonSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiToggleButtonGroup
    v-model="modelValue"
    :deselectable="false"
    :items="items"
  >
    <template #toggle-button-0="{ item }">
      {{ item.text }}
    </template>
  </UiToggleButtonGroup>
</template>

<script setup lang="ts">
const { ref } from 'vue';
import { UiToggleButtonGroup } from '@infermedica/component-library';

const modelValue = ref('');
const deselectable = false;
const items = [
  'Primary care',
  'Specialist care',
  'Urgent care',
];
</script>"`,
    },
  },
};

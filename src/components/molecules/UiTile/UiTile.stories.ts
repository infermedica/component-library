import {
  UiTile,
  UiIcon,
  UiText,
} from '@index';
import type {
  TileProps,
  TileAttrsProps,
} from '@index';
import { content as contentArgTypes } from '@sb/helpers/argTypes';
import './UiTIle.stories.scss';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { useArgTypes } from '@sb/helpers';
import {
  withModelValue,
  withVariants,
} from '@sb/decorators';
import { ref } from 'vue';

type TileArgsType = TileProps & {
  content?: string;
  modifiers?: string[];
  items?: TileAttrsProps[];
}
type TileMetaType = Meta<TileArgsType>;
type TileStoryType = StoryObj<TileArgsType>;

const complexValueData = {
  label: 'Yes',
  value: 'present',
  icon: 'yes',
  id: 's_1922',
  name: 'Heel drop test',
} as const;
const complexItemsData: TileAttrsProps[] = [
  {
    value: 'present',
    label: 'Yes',
    icon: 'yes',
    iconAttrs: { 'data-testid': 'present' },
    textLabelAttrs: { 'data-testid': 'present' },
    class: [
      'mb-3',
      'tablet:mr-6',
      'tablet:mb-0',
    ],
  },
  {
    value: 'absent',
    label: 'No',
    icon: 'no',
    iconAttrs: { 'data-testid': 'no' },
    textLabelAttrs: { 'data-testid': 'no' },
    class: [
      'mb-3',
      'tablet:mr-6',
      'tablet:mb-0',
    ],
  },
  {
    value: 'unknown',
    label: "Don't know",
    icon: 'dont-know',
    iconAttrs: { 'data-testid': 'unknown' },
    textLabelAttrs: { 'data-testid': 'unknown' },
  },
];

const { argTypes } = useArgTypes(UiTile);
const meta = {
  title: 'Molecules/Tile',
  excludeStories: /.*(Type|Data)$/,
  component: UiTile,
  args: {
    content: 'Yes',
    modifiers: [],
    value: 'present',
    id: '',
    icon: 'yes',
    iconAttrs: { 'data-testid': 'icon-element' },
    textLabelAttrs: { 'date-testid': 'text-element' },
  },
  argTypes: {
    ...argTypes,
    content: contentArgTypes,
  },
  parameters: {
    cssProperties: {
      '--tile-padding-block': 'var(--space-16)',
      '--tile-padding-inline': 'var(--space-16)',
      '--tile-gap': 'var(--space-16)',
      '--tile-tablet-padding-block': 'var(--space-24)',
      '--tile-tablet-padding-inline': 'var(--space-16)',
      '--tile-icon-size': '2rem',
      '--tile-tablet-icon-size': '4rem',
      '--tile-checked-border-block-width': '2px',
      '--tile-checked-border-inline-width': '2px',
      '--tile-checked-border-inline-color': 'var(--color-border-strong)',
      '--tile-checked-border-block-color': 'var(--color-border-strong)',
      '--tile-hover-checked-border-block-color': 'var(--color-border-strong)',
      '--tile-hover-checked-border-inline-color': 'var(--color-border-strong)',
      '--tile-active-checked-border-block-color': 'var(--color-border-strong)',
      '--tile-active-checked-border-inline-color': 'var(--color-border-strong)',
    },
  },
  decorators: [ withModelValue ],
} satisfies TileMetaType;

export default meta;

export const Basic: TileStoryType = {
  render: () => ({
    components: { UiTile },
    setup(props, { attrs }) {
      const {
        content, modelValue, modifiers, ...args
      } = attrs;
      return {
        args,
        modelValue,
        modifiers,
        content,
      };
    },
    template: `<UiTile
      v-model="modelValue"
      :class="['tile', modifiers]"
      v-bind="args"
    >
      {{ content }}
    </UiTile>`,
  }),
};
Basic.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiTile
    v-model="modelValue"
    :value="value"
    :id="id"
    :icon="icon"
    :icon-attrs="iconAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="[
      'tile',
      modifiers,
    ]"
  >
    {{ content }}
  </UiTile>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiTile } from '@infermedica/component-library';

const modelValue = ref('');
const modifiers = [];
const content = 'Yes';
const value = 'present';
const id = '';
const icon = 'yes';
const iconAttrs = {
  'data-testid': 'icon-element'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
</script>"`,
    },
  },
};

export const AsGroup: TileStoryType = {
  render: () => ({
    components: { UiTile },
    setup(props, { attrs }) {
      const {
        modelValue: initModelValue, content, items, modifiers, ...args
      } = attrs;
      const modelValue = ref(initModelValue);
      return {
        args,
        modelValue,
        items,
        content,
        modifiers,
      };
    },
    template: `<div class="tile-as-group">
      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <UiTile
          v-model="modelValue"
          :value="item.value"
          :icon="item.icon"
          :icon-attrs="item.iconAttrs"
          :text-label-attrs="item.textLabelAttrs"
          :class="[
            'tile-as-group__tile',
            item.class,
            modifiers,
          ]"
        >
          {{ item.label }}
        </UiTile>
      </template>
    </div>`,
  }),
};
AsGroup.args = {
  modelValue: 'present',
  items: complexItemsData,
};
AsGroup.argTypes = {
  items: {
    description: 'Use this control to set the values of the tile group.',
    table: { category: 'stories controls' },
    control: 'array',
  },
};
AsGroup.parameters = {
  docs: {
    source: {
      code: `<template>
  <div class="tile-as-group">
    <template
      v-for="(item, index) in items"
      :key="index"
    >
      <UiTile
        v-model="modelValue"
        :value="item.value"
        :icon="item.icon"
        :icon-attrs="item.iconAttrs"
        :text-label-attrs="item.textLabelAttrs"
        :class="[
          'tile-as-group__tile',
          item.class,
          modifiers,
        ]"
      >
        {{ item.label }}
      </UiTile>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { UiTile } from '@infermedica/component-library';

const modelValue = ref('present');
const modifiers = [];
const items = ${JSON.stringify(complexItemsData)};
</script>
<style lang="scss">
@use "../../../styles/mixins";
.tile-as-group {
  max-width: 63rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  @include mixins.from-tablet {
    flex-direction: row;
  }

  &__tile {
    flex: 1;
  }
}
</style>
`,
    },
  },
};

export const BasicVariants: TileStoryType = { ...Basic };
BasicVariants.argTypes = {
  modelValue: { control: false },
  modifiers: { control: false },
  content: { control: false },
  value: { control: false },
  id: { control: false },
  icon: { control: false },
  iconAttrs: { control: false },
  textLabelAttrs: { control: false },
};
BasicVariants.decorators = [ withVariants ];
BasicVariants.parameters = {
  docs: { source: { code: null } },
  variants: [
    { label: 'default' },
    ...[
      'hover',
      'active',
      'focus',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
    {
      label: 'error',
      class: 'ui-tile--has-error',
    },
  ],
};

export const CheckedVariants: TileStoryType = { ...BasicVariants };
CheckedVariants.parameters = {
  docs: { source: { code: null } },
  variants: BasicVariants.parameters.variants.map((variant: Record<string, string>) => ({
    ...variant,
    class: `${variant?.class} ui-tile--is-checked`,
  })),
};

export const SizeVariants: TileStoryType = { ...BasicVariants };
SizeVariants.parameters = {
  docs: { source: { code: null } },
  variants: [
    { label: 'default' },
    {
      label: 'small',
      class: 'ui-tile--small',
    },
  ],
};

export const WithIconSlot: TileStoryType = {
  render: () => ({
    components: {
      UiTile,
      UiIcon,
    },
    setup(props, { attrs }) {
      const {
        modelValue, content, modifiers, ...args
      } = attrs;
      return {
        args,
        content,
        modelValue,
        modifiers,
      };
    },
    template: `<UiTile
      v-bind="args"
      v-model="modelValue"
      :class="[
        'tile',
        modifiers,
      ]"
    >
      <template #icon="{ iconAttrs }">
        <UiIcon
          v-bind="iconAttrs"
          class="ui-button__icon ui-tile__icon"
        />
      </template>
      {{ content }}
    </UiTile>`,
  }),
};
WithIconSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiTile
    v-model="modelValue"
    :value="value"
    :id="id"
    :icon="icon"
    :icon-attrs="iconAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="[
      'tile',
      modifiers,
    ]"
  >
  <template #icon="{ iconAttrs }">
    <UiIcon
      v-bind="iconAttrs"
      class="ui-button__icon ui-tile__icon"
    />
  </template>
  {{ content }}
  </UiTile>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiTile, UiText } from '@infermedica/component-library';

const modelValue = ref('');
const modifiers = [];
const content = 'Yes';
const value = 'present';
const id = '';
const icon = 'yes';
const iconAttrs = {
  'data-testid': 'icon-element'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
</script>"`,
    },
  },
};

export const WithStringValue: TileStoryType = { ...Basic };
export const WithObjectValue: TileStoryType = { ...Basic };
WithObjectValue.args = { value: complexValueData };
WithObjectValue.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiTile
    v-model="modelValue"
    :value="value"
    :id="id"
    :icon="icon"
    :icon-attrs="iconAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="[
      'tile',
      modifiers,
    ]"
  >
    {{ content }}
  </UiTile>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiTile } from '@infermedica/component-library';

const modelValue = ref('');
const modifiers = [];
const content = 'Yes';
const value = ${JSON.stringify(complexValueData)};
const id = '';
const icon = 'yes';
const iconAttrs = {
  'data-testid': 'icon-element'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
</script>"`,
    },
  },
};

export const WithLabelSlot: TileStoryType = {
  render: () => ({
    components: {
      UiTile,
      UiText,
    },
    setup(props, { attrs }) {
      const {
        modelValue, content, modifiers, ...args
      } = attrs;
      return {
        args,
        content,
        modelValue,
        modifiers,
      };
    },
    template: `<UiTile
      v-bind="args"
      v-model="modelValue"
      :class="[
        'tile',
        modifiers,
      ]"
    >
      <template #label="{ textLabelAttrs }">
        <UiText
          v-bind="textLabelAttrs"
          class="ui-tile__label"
        >
          {{ content }}
        </UiText>
      </template>
    </UiTile>`,
  }),
};
WithLabelSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiTile
    v-model="modelValue"
    :value="value"
    :id="id"
    :icon="icon"
    :icon-attrs="iconAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="[
      'tile',
      modifiers,
    ]"
  >
    <template #label="{ textLabelAttrs }">
      <UiText
        v-bind="textLabelAttrs"
        class="ui-tile__label"
      >
        {{ content }}
      </UiText>
    </template>
  </UiTile>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiTile, UiText } from '@infermedica/component-library';

const modelValue = ref('');
const modifiers = [];
const content = 'Yes';
const value = 'present';
const id = '';
const icon = 'yes';
const iconAttrs = {
  'data-testid': 'icon-element'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
</script>"`,
    },
  },
};

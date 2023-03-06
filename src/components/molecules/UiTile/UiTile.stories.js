import UiTile from '@/components/molecules/UiTile/UiTile.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';
import './UiTIle.stories.scss';

const events = actions({ onUpdateModelValue: 'update:modelValue' });

export default {
  title: 'Molecules/Tile',
  component: UiTile,
  args: {
    initModelValue: '',
    content: 'Yes',
    modifiers: [],
    value: 'present',
    id: '',
    icon: 'yes',
    iconAttrs: { 'data-testid': 'icon' },
    textLabelAttrs: { 'date-testid': 'text-label' },
  },
  argTypes: {
    content,
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'string',
    },
    modifiers: modifiers({ options: [ 'ui-tile--small' ] }),
    value: { control: 'text' },
    modelValue: { control: false },
    icon: {
      description: 'Use this props to set icon.',
      table: {
        category: 'props',
        type: { summary: 'string|object' },
      },
    },
    iconSlot: {
      name: 'icon',
      description: 'Use this slot to replace icon template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: 'object',
    },
    iconAttrs: { table: { subcategory: 'Attrs props' } },
    textLabelAttrs: { table: { subcategory: 'Attrs props' } },
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
};

export const Large = {
  render: (args) => ({
    components: { UiTile },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiTile
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
      @update:modelValue="onUpdateModelValue"
    >
      {{ content }}
    </UiTile>`,
  }),
};

export const Small = {
  render: (args) => ({
    components: { UiTile },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiTile
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
      @update:modelValue="onUpdateModelValue"
    >
      {{ content }}
    </UiTile>`,
  }),

  args: { modifiers: [ 'ui-tile--small' ] },
};

export const HasError = {
  render: (args) => ({
    components: { UiTile },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiTile
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
      @update:modelValue="onUpdateModelValue"
    >
      {{ content }}
    </UiTile>`,
  }),

  args: { modifiers: [ 'ui-tile--has-error' ] },
};

export const AsGroup = {
  render: (args) => ({
    components: { UiTile },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<div class="tile-as-group">
      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <UiTile
          v-model="modelValue"
          name="answer"
          :value="item.value"
          :icon="item.icon"
          :icon-attrs="item.iconAttrs"
          :text-label-attrs="item.textLabelAttrs"
          :class="[
            'tile-as-group__tile',
            item.class,
            modifiers,
          ]"
          @update:modelValue="onUpdateModelValue"
        >
          {{ item.label }}
        </UiTile>
      </template>
    </div>`,
  }),

  args: {
    initModelValue: { choice_id: 'present' },
    items: [
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
    ],
  },

  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'object',
    },
    items: {
      description: 'Use this control to set the values of the tile group.',
      table: { category: 'stories controls' },
      control: 'array',
    },
  },
};

export const WithIconSlot = {
  render: (args) => ({
    components: {
      UiTile,
      UiIcon,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiTile
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
      @update:modelValue="onUpdateModelValue"
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

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithLabelSlot = {
  render: (args) => ({
    components: {
      UiTile,
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
    template: `<UiTile
      v-model="modelValue"
      :value="value"
      :id="id"
      :icon-attrs="iconAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="[
        'tile',
        modifiers,
      ]"
      @update:modelValue="onUpdateModelValue"
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

  parameters: { chromatic: { disableSnapshot: true } },
};

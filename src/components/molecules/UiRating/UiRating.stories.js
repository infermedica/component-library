import UiRating from '@/components/molecules/UiRating/UiRating.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import { ref } from 'vue';
import { modifiers } from '@sb/helpers/argTypes';
import { actions } from '@storybook/addon-actions';
import { WithCloseSlot } from '@/components/molecules/UiPopover/UiPopover.stories';

const events = actions({ onUpdateModelValue: 'update:modelValue' });

export default {
  title: 'Molecules/Rating',
  component: UiRating,
  subcomponents: {
    UiRadio,
    UiIcon,
  },
  args: {
    initModelValue: 3,
    modifiers: [],
    max: 5,
    name: '',
    tag: 'fieldset',
    legend: 'How helpful was this checkup for you?',
    settings: {
      iconDefault: 'star-outlined',
      iconActive: 'star-filled',
    },
    translation: { stars: (index) => `${index} stars` },
    radioOptionAttrs: { 'data-testid': 'option-radio-input' },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state. Starting from 0.',
      table: { category: 'stories controls' },
      control: 'number',
    },
    modifiers: modifiers({ options: [ 'ui-rating--is-disabled' ] }),
    modelValue: { control: false },
    radioOptionAttrs: { table: { subcategory: 'Attrs props' } },
  },
  parameters: {
    cssProperties: {
      '--rating-option-gap': 'var(--space-24)',
      '--rating-option-border-block-style':
        'var(--rating-option-border-block-start-style, solid) var(--rating-option-border-block-end-style, solid)',
      '--rating-option-border-inline-style':
        'var(--rating-option-border-inline-start-style, solid) var(--rating-option-border-inline-end-style, solid)',
      '--rating-option-border-block-color':
        'var(--rating-option-border-block-start-color, transparent) var(--rating-option-border-block-end-color, transparent)',
      '--rating-option-border-inline-color':
        'var(--rating-option-border-inline-start-color, transparent) var(--rating-option-border-inline-end-color, transparent)',
      '--rating-option-border-block-width':
        'var(--rating-option-border-block-start-width, 0) var(--rating-option-border-block-end-width, 0)',
      '--rating-option-border-inline-width':
        'var(--rating-option-border-inline-start-width, 0) var(--rating-option-border-inline-end-width, var(--_rating-option-gap))',
      '--rating-hover-icon-color': 'var(--color-icon-disabled)',
      '--rating-checked-hover-icon-color': 'var(--color-icon-disabled)',
      '--rating-active-icon-color': 'var(--color-icon-secondary-active)',
      '--rating-checked-active-icon-color': 'var(--color-icon-disabled)',
      '--rating-checked-icon-color': 'var(--color-icon-disabled)',
      '--rating-icon-color': 'var(--color-icon-disabled)',
    },
  },
};

export const Common = {
  render: (args) => ({
    components: { UiRating },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiRating
      v-model="modelValue"
      :max="max"
      :name="name"
      :tag="tag"
      :legend="legend"
      :settings="settings"
      :translation="translation"
      :radio-option-attrs="radioOptionAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
    />`,
  }),
};

export const IsDisabled = {
  render: (args) => ({
    components: { UiRating },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiRating
      v-model="modelValue"
      :max="max"
      :name="name"
      :tag="tag"
      :legend="legend"
      :settings="settings"
      :translation="translation"
      :radio-option-attrs="radioOptionAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
    />`,
  }),

  args: { modifiers: [ 'ui-rating--is-disabled' ] },
};

export const WithRadioOptionsAttrsAsArray = {
  render: (args) => ({
    components: { UiRating },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiRating
      v-model="modelValue"
      :max="max"
      :name="name"
      :tag="tag"
      :legend="legend"
      :settings="settings"
      :translation="translation"
      :radio-option-attrs="radioOptionAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
    />`,
  }),

  args: {
    radioOptionAttrs: [
      { 'data-testid': 'first-option-radio-input' },
      {},
      {
        'data-testid': 'third-option-radio-input',
        iconDefaultAttrs: {
          icon: 'star-outlined',
          'data-testid': 'third-option-icon-default',
        },
        iconActiveAttrs: {
          icon: 'star-filled',
          'data-testid': 'third-option-icon-active',
        },
      },
    ],
  },

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithIconSlot = {
  render: (args) => ({
    components: {
      UiRating,
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
    template: `<UiRating
      v-model="modelValue"
      :max="max"
      :name="name"
      :tag="tag"
      :legend="legend"
      :settings="settings"
      :translation="translation"
      :radio-option-attrs="radioOptionAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
    >
      <template #icon="{
        index,
        finalScore,
        iconActiveAttrs,
        iconDefaultAttrs,
      }">
        <template v-if="index <= finalScore">
          <UiIcon
            v-bind="iconActiveAttrs"
            class="ui-rating__icon"
          />
        </template>
        <template v-else>
          <UiIcon
            v-bind="iconDefaultAttrs"
            class="ui-rating__icon"
          />
        </template>
      </template>
    </UiRating>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

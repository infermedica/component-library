import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  inject,
  provide,
  ref,
} from 'vue';
import {
  UiNumberStepper,
  UiText,
  UiButton,
  UiIcon,
} from '@/../index';
import { useArgTypes } from '@sb/helpers';

const { argTypes } = useArgTypes(UiNumberStepper, { variables: { regexp: /^(\.ui-number-stepper|\.ui-number-stepper__decrement|\.ui-number-stepper__increment)$/ } });

const UiNumberStepperButton = {
  components: {
    UiButton,
    UiIcon,
  },
  props: [
    'icon',
    'isDisabled',
    'buttonAttrs',
    'iconAttrs',
  ],
  template: `<UiButton
    v-bind="buttonAttrs"
    :class="['ui-button--outlined ui-button--circled', {'ui-button--is-disabled': isDisabled}]"
  >
    <UiIcon
      v-bind="iconAttrs"
      class="ui-button__icon"
    />
  </UiButton>`,
};

const meta = {
  title: 'Molecules/NumberStepper',
  component: UiNumberStepper,
  args: {
    modelValue: 50,
    min: 18,
    max: 122,
    step: 1,
    hasControls: true,
    buttonDecrementAttrs: {
      'data-testid': 'button-decrement',
      'aria-label': 'decrement',
    },
    buttonIncrementAttrs: {
      'data-testid': 'button-decrement',
      'aria-label': 'increment',
    },
    iconDecrementAttrs: { 'data-testid': 'icon-decrement' },
    iconIncrementAttrs: { 'data-testid': 'icon-icrement' },
  },
  argTypes: { ...argTypes },
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: { source: { code: null } },
  },
} satisfies Meta<typeof UiNumberStepper>;
export default meta;
type Story = StoryObj<typeof UiNumberStepper>;

export const Basic: Story = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiNumberStepper,
      UiText,
    },
    setup: (props, { attrs }) => {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value') || ref(modelValue);
      return {
        args,
        value,
      };
    },
    template: `<UiNumberStepper
        v-model="value"
        v-bind="args"
    >
      <template #default="{ value }">
        <UiText class="flex items-center justify-center h-12 flex-full tablet:flex-none w-12">{{ value }}</UiText>
      </template>
    </UiNumberStepper>`,
  }),
};
Basic.decorators = [ () => ({
  inheritAttrs: false,
  setup(props, { attrs }) {
    const { modelValue } = attrs;
    const value = ref(modelValue);
    provide('value', value);
  },
  template: '<story />',
}) ];
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiNumberStepper
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :button-decrement-attrs="buttonDecrementAttrs"
    :button-increment-attrs="buttonIncrementAttrs"
    :icon-decrement-attrs="iconDecrementAttrs"
    :icon-increment-attrs="iconIncrementAttrs"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiNumberStepper } from '@infermedica/component-library';

const modelValue = ref(0);
const min = 0;
const max = 1;
const step = 1;
const buttonDecrementAttrs = { 
  'data-testid': 'button-decrement',
  'aria-label': 'decrement'
}
const buttonIncrementAttrs = {
  'data-testid': 'button-increment',
  'aria-label': 'increment'
}
const iconDecrementAttrs = { 'data-testid': 'icon-decrement' }
const iconIncrementAttrs = { 'data-testid': 'icon-increment' }
</script>`,
    },
  },
};

export const Min: Story = { ...Basic };
Min.args = { modelValue: meta.args.min };
Min.parameters = {
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
};

export const Max: Story = { ...Min };
Max.args = { modelValue: meta.args.max };

export const WithDecrementSlot: Story = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiNumberStepper,
      UiText,
      UiNumberStepperButton,
    },
    setup: (props, { attrs }) => {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value') || ref(modelValue);
      return {
        args,
        value,
      };
    },
    template: `<UiNumberStepper
        v-model="value"
        v-bind="args"
    >
      <template #default="{ value }">
        <UiText class="flex items-center justify-center h-12 flex-full tablet:flex-none w-12">{{ value }}</UiText>
      </template>
      <template #decrement="{
        hasControls,
        isMin,
        buttonDecrementAttrs,
        iconDecrementAttrs,
        decrement,
      }">
        <UiNumberStepperButton
          v-if="hasControls"
          :is-disabled="isMin"
          :button-attrs="buttonDecrementAttrs"
          :icon-attrs="iconDecrementAttrs"
          class="ui-number-stepper__decrement"
          @click="decrement"
        />
      </template>
    </UiNumberStepper>`,
  }),
};
WithDecrementSlot.decorators = [ () => ({
  inheritAttrs: false,
  setup(props, { attrs }) {
    const { modelValue } = attrs;
    const value = ref(modelValue);
    provide('value', value);
  },
  template: '<story />',
}) ];
WithDecrementSlot.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiNumberStepper
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :button-increment-attrs="buttonIncrementAttrs"
    :icon-increment-attrs="iconIncrementAttrs"
  >
    <template #decrement={
      hasControls,
      isMin,
      buttonDecrementAttrs,
      iconDecrementAttrs,
      decrement,
    }>
      <UiButton
        v-if="hasControls"
        v-bind="buttonDecrementAttrs"
        :class="[
          'ui-button--outlined ui-button--circled ui-number-stepper__decrement', 
          { 'ui-button--is-disabled': isMin }
        ]"
        @click="decrement"
      >
        <UiIcon
          v-bind="defaultProps.iconDecrementAttrs"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
  </UiNumberStepper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiNumberStepper } from '@infermedica/component-library';

const modelValue = ref(0);
const min = 0;
const max = 1;
const step = 1;
const buttonDecrementAttrs = { 
  'data-testid': 'button-decrement',
  'aria-label': 'decrement'
}
const iconDecrementAttrs = { 'data-testid': 'icon-decrement' }
</script>`,
    },
  },
};

export const WithIncrementSlot: Story = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiNumberStepper,
      UiText,
      UiNumberStepperButton,
    },
    setup: (props, { attrs }) => {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value') || ref(modelValue);
      return {
        args,
        value,
      };
    },
    template: `<UiNumberStepper
        v-model="value"
        v-bind="args"
    >
      <template #default="{ value }">
        <UiText class="flex items-center justify-center h-12 flex-full tablet:flex-none w-12">{{ value }}</UiText>
      </template>
      <template #increment="{
          hasControls,
          isMax,
          buttonIncrementAttrs,
          iconIncrementAttrs,
          increment,
        }">
        <UiNumberStepperButton
            v-if="hasControls"
            :is-disabled="isMax"
            :button-attrs="buttonIncrementAttrs"
            :icon-attrs="iconIncrementAttrs"
            class="ui-number-stepper__increment"
            @click="increment"
        />
      </template>
    </UiNumberStepper>`,
  }),
};
WithIncrementSlot.decorators = [ () => ({
  inheritAttrs: false,
  setup(props, { attrs }) {
    const { modelValue } = attrs;
    const value = ref(modelValue);
    provide('value', value);
  },
  template: '<story />',
}) ];
WithIncrementSlot.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiNumberStepper
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :button-increment-attrs="buttonIncrementAttrs"
    :icon-increment-attrs="iconIncrementAttrs"
  >
    <template #increment={
      hasControls,
      isMax,
      buttonIncrementAttrs,
      iconIncrementAttrs,
      increment,
    }>
      <UiButton
        v-if="hasControls"
        v-bind="buttonIncrementAttrs"
        :class="[
          'ui-button--outlined ui-button--circled ui-number-stepper__increment', 
          { 'ui-button--is-disabled': isMax }
        ]"
        @click="increment"
      >
        <UiIcon
          v-bind="defaultProps.iconIncrementAttrs"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
  </UiNumberStepper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiNumberStepper } from '@infermedica/component-library';

const modelValue = ref(0);
const min = 0;
const max = 1;
const step = 1;
const buttonIncrementAttrs = {
  'data-testid': 'button-increment',
  'aria-label': 'increment'
}
const iconIncrementAttrs = { 'data-testid': 'icon-increment' }
</script>`,
    },
  },
};

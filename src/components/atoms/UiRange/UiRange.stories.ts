import { expect } from '@storybook/jest';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  ref,
  provide,
  inject,
} from 'vue';
import deepmerge from 'deepmerge';
import {
  UiRange,
  UiHeading,
  UiButton,
  UiIcon,
} from '@index';
import type {
  ButtonAttrsProps,
  RangeProps,
} from '@index';
import { withVariants } from '@sb/decorators';
import {
  useArgTypes,
  inputEvents,
} from '@sb/helpers';
import {
  userEvent,
  within,
} from '@storybook/testing-library';

type RangeArgsType = RangeProps & {
  ariaLabel?: string;
  disabled?: boolean;
  buttonDecrementAttrs?: ButtonAttrsProps;
  buttonIncrementAttrs?: ButtonAttrsProps;
}
type RangeMetaType = Meta<RangeArgsType>;
type RangeStoryType = StoryObj<RangeArgsType>;

const { argTypes } = useArgTypes(deepmerge(
  UiRange,
  inputEvents,
));
const meta = {
  title: 'Atoms/Range',
  component: UiRange,
  args: {
    ariaLabel: 'patient age',
    modelValue: 70,
    min: 18,
    max: 122,
    step: 1,
    inputAttrs: { 'data-testid': 'input-element' },
    headingValueAttrs: { 'data-testid': 'value-heading' },
  },
  argTypes: {
    ...argTypes,
    ariaLabel: {
      name: 'aria-label',
      description: 'Use this control to set aria-label attribute.',
      control: 'text',
      table: { category: 'html attributes' },
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      viewports: [
        320,
        1200,
      ],
    },
    docs: { source: { code: null } },
  },
} satisfies RangeMetaType;
export default meta;

export const Basic: RangeStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { UiRange },
    setup(props, { attrs }) {
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
    template: `<UiRange
      v-model="value"
      v-bind="args"
    />`,
  }),
};
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
    <UiRange
      v-model="modelValue"
      :aria-label="ariaLabel"
      :min="min"
      :max="max"
      :step="step"
      :input-attrs="inputAttrs"
      :heading-value-attrs="headingValueAttrs"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiRange } from '@infermedica/component-library'

const ariaLabel = 'patient age';
const modelValue = ref('');
const min = 0;
const max = 1;
const step = 1;
const inputAttrs = {
  "data-testid": "input-element"
}
const headingValueAttrs = {
  "data-testid": "value-heading"
};
</script>`,
    },
  },
};
Basic.play = async ({
  canvasElement, step, args: { modelValue = 50 },
}) => {
  const [
    decrementBtn,
    incrementBtn,
  ] = [ ...canvasElement.querySelectorAll('button') ];
  const getCurrentValue = () => within(canvasElement).getByTestId('value-heading').innerText;
  await step('increment button increase value', async () => {
    await userEvent.click(incrementBtn);
    expect(getCurrentValue()).toBe(`${modelValue + 1}`);
  });
  await step('decrement button decrease value', async () => {
    await userEvent.click(decrementBtn);
    expect(getCurrentValue()).toBe(`${modelValue}`);
  });
};

export const PseudoClass: RangeStoryType = { ...Basic };
PseudoClass.decorators = [
  withVariants,
  () => ({
    inheritAttrs: false,
    setup(props, { attrs }) {
      const { modelValue } = attrs;
      const value = ref(modelValue);
      provide('value', value);
    },
    template: '<story />',
  }),
];
PseudoClass.parameters = {
  variants: [
    { label: 'default' },
    ...[
      'hover',
      'focus',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      inputAttrs: { class: `pseudo-${variant}` },
    })),
  ],
};
PseudoClass.play = undefined;

export const Min: RangeStoryType = { ...Basic };
Min.args = { modelValue: meta.args.min };
Min.parameters = { docs: { source: { code: null } } };
Min.play = async ({
  canvasElement, step, args: { min },
}) => {
  const decrementBtn = canvasElement.querySelector('.ui-number-stepper__decrement') as HTMLButtonElement;
  const getCurrentValue = () => within(canvasElement).getByTestId('value-heading').innerText;
  await step('decrement button is disabled', async () => {
    expect(decrementBtn.className).toContain('ui-button--is-disabled');
  });
  await step('decrement button doesn\'t change value', async () => {
    await userEvent.click(decrementBtn);
    expect(getCurrentValue()).toBe(`${min}`);
  });
};

export const Max: RangeStoryType = { ...Basic };
Max.args = { modelValue: meta.args.max };
Max.parameters = { ...Min.parameters };
Max.play = async ({
  canvasElement, step, args: { max },
}) => {
  const incrementBtn = canvasElement.querySelector('.ui-number-stepper__increment') as HTMLButtonElement;
  const getCurrentValue = () => within(canvasElement).getByTestId('value-heading').innerText;
  await step('increment button is disabled', async () => {
    expect(incrementBtn.className).toContain('ui-button--is-disabled');
  });
  await step('increment button doesn\'t change value', async () => {
    await userEvent.click(incrementBtn);
    expect(getCurrentValue()).toBe(`${max}`);
  });
};

export const WithValueSlot: RangeStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiRange,
      UiHeading,
    },
    setup(props, { attrs }) {
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
    template: `<UiRange
      v-model="value"
      v-bind="args"
    >
      <template #value="{
        value,
        headingValueAttrs,
      }">
        <UiHeading
            v-bind="headingValueAttrs"
            class="ui-range__value"
        >
          {{ value }}
        </UiHeading>
      </template>
    </UiRange>`,
  }),
};
WithValueSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiRange
    v-model="modelValue"
    :aria-label="ariaLabel"
    :min="min"
    :max="max"
    :step="step"
    :input-attrs="inputAttrs"
    :heading-value-attrs="headingValueAttrs"
  >
    <template #value="{
      value,
      headingValueAttrs,
    }">
      <UiHeading
        v-bind="headingValueAttrs"
        class="ui-range__value"
      >{{ value }}</UiHeading>
    </template>
  </UiRange>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiRange,
  UiHeading
} from '@infermedica/component-library';

const ariaLabel = 'patient age';
const modelValue = ref('');
const min = 0;
const max = 1;
const step = 1;
</script>`,
    },
  },
};

export const WithRangeSlot: RangeStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { UiRange },
    setup(props, { attrs }) {
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
    template: `<UiRange
      v-model="value"
      v-bind="args"
    >
    <template #range="{
      inputAttrs,
      min,
      max,
      change,
      value,
    }">
      <input
          v-keyboard-focus
          v-bind="inputAttrs"
          type="range"
          :min="min"
          :max="max"
          :value="value"
          :aria-valuemin="min"
          :aria-valuemax="max"
          :aria-valuenow="value"
          class="ui-range__track"
          @input="change(($event.target).valueAsNumber)"
      >
    </template>
    </UiRange>`,
  }),
};
WithRangeSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiRange
    v-model="modelValue"
    :aria-label="ariaLabel"
    :min="min"
    :max="max"
    :step="step"
    :input-attrs="inputAttrs"
    :heading-value-attrs="headingValueAttrs"
  >
    <template #range="{
      inputAttrs,
      min,
      max,
      change,
      value,
    }">
      <input
        v-keyboard-focus
        v-bind="inputAttrs"
        type="range"
        :min="min"
        :max="max"
        :value="value"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="value"
        class="ui-range__track"
        @input="change(($event.target).valueAsNumber)"
      >
    </template>
  </UiRange>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiRange,
  UiHeading
} from '@infermedica/component-library';

const ariaLabel = 'patient age';
const modelValue = ref('');
const min = 0;
const max = 1;
const step = 1;
</script>`,
    },
  },
};

export const WithDecrementSlot: RangeStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiRange,
      UiButton,
      UiIcon,
    },
    setup(props, { attrs }) {
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
    template: `<UiRange
      v-model="value"
      v-bind="args"
    >
      <template #decrement="{
        hasControls,
        buttonDecrementAttrs,
        isMin,
        decrement,
        iconDecrementAttrs,
      }">
        <UiButton
          v-if="hasControls"
          v-bind="buttonDecrementAttrs"
          class="ui-button--outlined ui-button--circled ui-number-stepper__decrement"
          :class="{ 'ui-button--is-disabled': isMin }"
          @click="decrement"
        >
          <UiIcon
            v-bind="iconDecrementAttrs"
            class="ui-button__icon"
          />
        </UiButton>
      </slot>
      </template>
    </UiRange>`,
  }),
};
WithDecrementSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiRange
    v-model="modelValue"
    :aria-label="ariaLabel"
    :min="min"
    :max="max"
    :step="step"
    :input-attrs="inputAttrs"
    :heading-value-attrs="headingValueAttrs"
  >
    <template #decrement="{
      hasControls,
      buttonDecrementAttrs,
      isMin,
      decrement,
      iconDecrementAttrs,
    }">
      <UiButton
        v-if="hasControls"
        v-bind="buttonDecrementAttrs"
        class="ui-button--outlined ui-button--circled ui-number-stepper__decrement"
        :class="{ 'ui-button--is-disabled': isMin }"
        @click="decrement"
      >
        <UiIcon
          v-bind="iconDecrementAttrs"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
  </UiRange>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiRange,
  UiButton,
  UiIcon,
} from '@infermedica/component-library';

const ariaLabel = 'patient age';
const modelValue = ref('');
const min = 0;
const max = 1;
const step = 1;
</script>`,
    },
  },
};

export const WithIncrementSlot: RangeStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiRange,
      UiButton,
      UiIcon,
    },
    setup(props, { attrs }) {
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
    template: `<UiRange
      v-model="value"
      v-bind="args"
    >
      <template #increment="{
        hasControls,
        buttonIncrementAttrs,
        isMax,
        increment,
        iconIncrementAttrs,
      }">
        <UiButton
          v-if="hasControls"
          v-bind="buttonIncrementAttrs"
          class="ui-button--outlined ui-button--circled ui-number-stepper__increment"
          :class="{ 'ui-button--is-disabled': isMax }"
          @click="increment"
        >
          <UiIcon
            v-bind="iconIncrementAttrs"
            class="ui-button__icon"
          />
        </UiButton>
      </template>
    </UiRange>`,
  }),
};
WithDecrementSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiRange
    v-model="modelValue"
    :aria-label="ariaLabel"
    :min="min"
    :max="max"
    :step="step"
    :input-attrs="inputAttrs"
    :heading-value-attrs="headingValueAttrs"
  >
    <template #increment="{
      hasControls,
      buttonIncrementAttrs,
      isMax,
      increment,
      iconIncrementAttrs,
    }">
      <UiButton
        v-if="hasControls"
        v-bind="buttonIncrementAttrs"
        class="ui-button--outlined ui-button--circled ui-number-stepper__increment"
        :class="{ 'ui-button--is-disabled': isMax }"
        @click="increment"
      >
        <UiIcon
          v-bind="iconIncrementAttrs"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
  </UiRange>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiRange,
  UiButton,
  UiIcon,
} from '@infermedica/component-library';

const ariaLabel = 'patient age';
const modelValue = ref('');
const min = 0;
const max = 1;
const step = 1;
</script>`,
    },
  },
};

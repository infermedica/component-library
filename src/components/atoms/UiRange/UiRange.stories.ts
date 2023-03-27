import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { ref } from 'vue';
import {
  UiRange,
  UiHeading
} from '@/../index';
import { withVariants } from '@sb/decorators';
import {
  slots,
  events,
} from '@sb/helpers'

const meta = {
  title: 'Atoms/Range',
  component: UiRange,
  args: {
    ariaLabel: 'patient age',
    modelValue: 50,
    min: 18,
    max: 122,
    step: 1,
    inputAttrs: { 'data-testid': 'input-element' },
    headingValueAttrs: { 'data-testid': 'value-heading' },
  },
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: 'Use this control to set aria-label attribute.',
      control: 'text',
      table: { category: 'html attributes' },
    },
    modelValue: {
      control: 'number',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    inputAttrs: { control: 'object' },
    headingValueAttrs: { control: 'object' },
    ...slots(UiRange),
    ...events(
      [ 'onUpdate:modelValue', 'onFocus', 'onBlur' ],
      UiRange.__docgenInfo.events.map(({ name })=>(name))
    ),
    name: {
      table: false,
    },
  },
  decorators: [ () => ({ template: '<div><story/></div>' }) ],
  parameters: {
    chromatic: {
      disableSnapshot: false,
      viewports: [320, 1200],
    },
    docs: {
      source: {
        code: null
      }
    }
  }
} satisfies Meta<typeof UiRange>;
export default meta;
type Story = StoryObj<typeof UiRange>;
export const Basic: Story = {
  render: () => ({
    inheritAttrs: false,
    components: { UiRange },
    setup( props, { attrs } ) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = ref(modelValue);

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
    }
  }
}

export const PseudoClass: Story = {
  ...Basic,
}
PseudoClass.argTypes = {}
PseudoClass.decorators = [
  withVariants,
]
PseudoClass.parameters = {
  variants: [
    { label:'default' },
    ...['hover', 'focus', 'active'].map((variant) => ({
      label: `${variant}`,
      inputAttrs: {
        class: `pseudo-${variant}`,
      },
    })),
  ]
}

export const Min:Story = {
  ...Basic
}
Min.args = {
  modelValue: meta.args.min,
}
Min.parameters = {
  docs: {
    source: {
      code: null
    }
  }
}

export const Max:Story = {
  ...Basic
}
Max.args = {
  modelValue: meta.args.max,
}
Max.parameters = {
  ...Min.parameters,
}

export const WithValueSlot: Story = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiRange,
      UiHeading
    },
    setup( props, { attrs } ) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = ref(modelValue);

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
}
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
</script>`
    }
  }
}

export const WithRangeSlot: Story = {
  render: () => ({
    inheritAttrs: false,
    components: { UiRange },
    setup( props, { attrs } ) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = ref(modelValue);

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
}
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
</script>`
    }
  }
}

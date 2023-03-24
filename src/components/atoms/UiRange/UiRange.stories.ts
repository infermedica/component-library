import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiRange, UiHeading } from '@/../index';
import { withVariants } from '@sb/decorators';

const slots = UiRange?.__docgenInfo?.slots.reduce((acc, {name, bindings}) => {
    return {...acc, [name]: {
      table: {
        type: {
          summary: bindings.map(({ name }) => name).join(' | '),
        },
      },
      control: false
    } };
  }, {})

const meta = {
  title: 'Atoms/Range',
  component: UiRange,
  args: {
    modelValue: 50,
    min: 18,
    max: 122,
    step: 1,
    inputAttrs: { 'data-testid': 'input-element' },
    headingValueAttrs: { 'data-testid': 'value-heading' },
    ariaLabel: 'patient age',
  },
  argTypes: {
    ...slots,
    name: {
      table: {
        disable: true,
      }
    }
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
  render: (args) => ({
    components: { UiRange },
    setup( ) {
      return { args };
    },
    template: `<UiRange v-bind="$attrs" />`,
  }),
};
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      language: 'vue',
      code: `<template>
    <UiRange v-bind="$attrs" />
</template>

<script setup lang="ts">
import { UiRange } from '@infermedica/component-librry'
</script>`,
    }
  }
}

export const States: Story = {
  ...Basic,
}
States.decorators = [
  withVariants,
]
States.parameters = {
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
  render: (args) => ({
    components: { UiRange, UiHeading },
    template: `  <UiRange v-bind="$attrs">
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
${WithValueSlot.render().template}
</template>

<script setup lang="ts">
import { UiRange, UiHeading } from '@infermedica/component-librry'
</script>`
    }
  }
}

export const WithRangeSlot: Story = {
  render: (args) => ({
    components: { UiRange },
    setup( ) {
      return { args };
    },
    template: `<UiRange v-bind="$attrs">
      <template #value="{
        min,
        max,
        value,
        inputAttrs,
        change,
      }">
        
      </template>
    </UiRange>`,
  }),
}

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { ref } from 'vue';
import {
  UiText,
  UiNumberStepper
} from '@/../index';
import { useArgTypes } from '@sb/helpers';

const { argTypes } = useArgTypes(UiNumberStepper, {
  variables: {
    regexp: /^(\.ui-number-stepper|\.ui-number-stepper__decrement|\.ui-number-stepper__increment)$/
  }
});

const meta = {
  title: 'Molecules/NumberStepper',
  component: UiNumberStepper,
  args: {},
  argTypes: {
    ...argTypes
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      source: {
        code: null,
      }
    }
  }
} satisfies Meta<typeof UiNumberStepper>;
export default meta;
type Story = StoryObj<typeof UiNumberStepper>;

export const Basic: Story = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiNumberStepper,
      UiText
    },
    setup: ( props, { attrs } ) => {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = ref(modelValue);

      return {
        args,
        value,
      }
    },
    template: `<UiNumberStepper
        v-model="value"
        v-bind="args"
    >
      <template #default="{ value }">
        <UiText>{{ value }}</UiText>
      </template>
    </UiNumberStepper>`
  })
}

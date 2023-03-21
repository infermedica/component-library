import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiInput } from '@/../index';
import { Icon } from '../UiButton/UiButton.stories';
import {withVariants } from '@sb/decorators';

const slots = ['input', 'aside']
  .reduce((acc, key) => {
    return {...acc, [key]: { control: false } };
  }, {})
const events = ['onFocus', 'onBlur'].reduce((acc, key) => {
  return {...acc, [key]: {
    action: key,
    table: { disable: true },
  } };
}, {})

const meta = {
  title: 'Atoms/Input',
  component: UiInput,
  args: {
    modelValue: '',
    placeholder: 'Search, e.g. headache',
    type: 'text',
    disabled: false,
    suffix: '',
    textSuffixAttrs: { 'data-testid': 'text-suffix' },
    inputAttrs: { 'data-testid': 'input-element' },
  },
  argTypes: {
    modelValue: { control: 'text' },
    suffix: { control: 'text' },
    type: {
      control: 'select',
      options: [
        'text',
        'password',
        'email',
        'number',
        'tel',
        'url',
      ],
    },
    ...slots,
    ...events,
  },
} satisfies Meta<typeof UiInput>;
export default meta;
type Story = StoryObj<typeof UiInput>;

export const Basic: Story = {
  render: (args) => ({
    components: { UiInput },
    props: Object.keys(args),
    template: '<UiInput v-bind="$props"/>',
  }),
};

const StateTemplate: Story = { ...Basic }
StateTemplate.argTypes = {
  disabled: {
    control: false,
  }
}
StateTemplate.decorators = [ withVariants ]
StateTemplate.parameters = {
  variants: [
    { label: 'default' },
    ...['hover', 'focus'].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-input--is-disabled'
    }
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
}

export const Empty: Story = { ...StateTemplate }

export const Filled: Story = { ...Empty };
Filled.args = { modelValue: 'headache' };

export const WithError: Story = {
  ...Basic,
}
WithError.decorators = [ withVariants ]
WithError.parameters = {
  ...StateTemplate.parameters,
  variants: [
    {
      label: 'default',
      class: 'ui-input--has-error'
    },
    ...['hover'].map((variant) => ({
      label: `${variant}`,
      class: `ui-input--has-error pseudo-${variant}`,
    })),
    {
      label: 'filed',
      class: 'ui-input--has-error',
      modelValue: 'headache'
    }
  ]
}

export const WithSuffix: Story = { ...Basic };
WithSuffix.args = {
  placeholder: 'Put your height',
  suffix: 'cm',
};
WithSuffix.parameters = { chromatic: { disableSnapshot: false } };

export const WithAsideButton:Story = {
  render: (args) => ({
    components: { UiInput },
    props: Object.keys(args),
    setup: () => {
      console.log(Icon.render());
      return { Icon: Icon.render({ icon: 'search' }) };
    },
    template: `<UiInput 
      v-bind="$props"
      model-value=""
    >
      <template #aside>
        <component 
          :is="Icon"
          class="ui-input__aside"
        />
      </template>
    </UiInput>`,
  }),
};

/**
 * Slots
 */
export const WithInputSlot:Story = {
  render: () => ({
    components: { UiInput },
    template: `<UiInput 
      v-bind="$props"
      model-value=""
    >
    <template #input="{
      inputAttrs,
      input,
      value,
      validation,
    }">
      <!-- -->
    </template>
    </UiInput>`,
  }),
};

export const WithAsideSlot:Story = {
  render: () => ({
    components: { UiInput },
    template: `<UiInput 
      v-bind="$props"
      model-value=""
    >
      <template #input="{
        textSuffixAttrs,
        suffix,
      }">
        <!-- -->
      </template>
    </UiInput>`,
  }),
};

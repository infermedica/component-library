import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiInput,
  UiButton,
  UiIcon,
} from '@/../index';
import { Icon } from '../UiButton/UiButton.stories';

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
    onFocus: {
      action: 'onFocus',
      table: { disable: true },
    },
    onBlur: {
      action: 'onBlur',
      table: { disable: true },
    },
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

export const Empty: Story = {
  render: (args) => ({
    components: { UiInput },
    props: Object.keys(args),
    template: `<UiInput v-bind="$props"/>
    <UiInput 
      v-bind="$props"
      :disabled="true"
      class="ui-input--is-disabled"
    />`,
  }),
};
Empty.decorators = [ () => ({ template: '<div class="grid gap-2 justify-start"><story/></div>' }) ];
Empty.parameters = {
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
};

export const Filled: Story = { ...Empty };
Filled.args = { modelValue: 'headache' };

export const WithError: Story = {
  render: (args) => ({
    components: { UiInput },
    props: Object.keys(args),
    template: `<UiInput 
      v-bind="$props"
      model-value=""
      class="ui-input--has-error"
    />
    <UiInput 
      v-bind="$props"
      class="ui-input--has-error"
    />`,
  }),
};
WithError.args = { ...Filled.args };
WithError.decorators = [ ...Empty.decorators ];
WithError.parameters = { ...Empty.parameters };

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

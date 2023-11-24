import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiTextarea } from '@index';
import {
  withVariants,
  withVModel,
} from '@sb/decorators';
import { getArgTypes } from '@sb/helpers';
import { useAttrs } from '@sb/composable';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

const {
  argTypes,
  args,
} = getArgTypes(UiTextarea);

const meta = {
  title: 'Atoms/Textarea',
  component: UiTextarea,
  args: {
    ...args,
    modelValue: '',
    resize: false,
    placeholder: 'Please provide a detailed description of the issue.',
    textareaAttrs: { 'data-testid': 'textarea-element' },
  },
  argTypes: {
    ...argTypes,
    resize: {
      control: 'select',
      options: [
        true,
        false,
        'horizontal',
        'vertical',
      ],
    },
    modelValue: { control: 'text' },
  },
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta;
export default meta;

export const Basic: StoryObj = {
  render(args, { name }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { storyAttrs: attrs } = useAttrs();
        return {
          args,
          attrs,
        };
      },
      template: '<BasicStories v-bind="{...args, ...attrs}"/>',
    };
  },
};
Basic.decorators = [ withVModel ];
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const Empty = { ...Basic };
Empty.argTypes = {};
Empty.decorators = [ withVariants ];
Empty.parameters = {
  variants: [
    { label: 'default' },
    ...[
      'hover',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
    {
      label: 'focus',
      class: 'pseudo-focus-within',
    },
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-textarea--is-disabled',
    },
  ],
};
export const Filled = { ...Basic };
Filled.argTypes = {};
Filled.decorators = [ withVariants ];
Filled.parameters = {
  variants: [ ...Empty.parameters.variants.map((variant) => ({
    ...variant,
    modelValue: 'Should be \'headache\' instead \'headahe\'',
  })) ],
};

export const Error = { ...Basic };
Error.decorators = [ withVariants ];
Error.parameters = {
  variants: [ ...Empty.parameters.variants.map((variant) => ({
    ...variant,
    class: `${variant.class} ui-textarea--has-error`,
  })) ],
};

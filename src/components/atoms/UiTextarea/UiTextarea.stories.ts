import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiTextarea,
  type TextareaProps,
} from '@index';
import {
  withVariants,
  withVModel,
} from '@sb/decorators';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

type TextareaArgsType = TextareaProps
type TextareaMetaType = Meta<TextareaArgsType>;
type TextareaStoryType = StoryObj<TextareaArgsType>;

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
} satisfies TextareaMetaType;
export default meta;

export const Basic: TextareaStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<BasicStories v-bind="{ ...attrs }"/>',
    };
  },
};
Basic.decorators = [ withVModel ];
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const Empty: TextareaStoryType = { ...Basic };
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
export const Filled: TextareaStoryType = { ...Basic };
Filled.argTypes = {};
Filled.decorators = [ withVariants ];
Filled.parameters = {
  variants: [ ...Empty.parameters.variants.map((variant) => ({
    ...variant,
    modelValue: 'Should be \'headache\' instead \'headahe\'',
  })) ],
};

export const Error: TextareaStoryType = { ...Basic };
Error.decorators = [ withVariants ];
Error.parameters = {
  variants: [ ...Empty.parameters.variants.map((variant) => ({
    ...variant,
    class: `${variant.class} ui-textarea--has-error`,
  })) ],
};

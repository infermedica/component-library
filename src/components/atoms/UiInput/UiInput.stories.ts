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
  UiInput,
  UiButton,
  UiIcon,
  UiText,
} from '@index';
import type { InputProps } from '@index';
import { keyboardFocus } from '@/utilities/directives';
import {
  withVModel,
  withVariants,
} from '@sb/decorators';
import {
  useArgTypes,
  inputEvents,
} from '@sb/helpers';
import { icon } from '@sb/helpers/argTypes/index';
import type { Icon } from '@/types';

type InputArgsType = InputProps & {
  class?: string[];
  icon?: Icon;
}
type InputMetaType = Meta<InputArgsType>;
type InputStoryType = StoryObj<InputArgsType>;

const { argTypes } = useArgTypes(
  deepmerge(UiInput, inputEvents),
  { variables: { regexp: /^(\.ui-input|\.ui-input__input)$/ } },
);

import {
  BasicStories,
  BasicStoriesSource,
  WithButtonAsideStories,
  WithButtonAsideStoriesSource,
  WithInputSlotStories,
  WithInputSlotStoriesSource,
  WithAsideSlotStories,
  WithAsideSlotStoriesSource,
} from './stories';

const UiInputButtonAside = {
  components: {
    UiButton,
    UiIcon,
  },
  props: [ 'icon' ],
  template: `<UiButton class="ui-button--icon">
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    />
  </UiButton>`,
};

const meta = {
  title: 'Atoms/Input',
  component: UiInput,
  args: {
    icon: '',
    modelValue: '',
    placeholder: 'Search, e.g. headache',
    type: 'text',
    disabled: false,
    suffix: '',
    textSuffixAttrs: { 'data-testid': 'text-suffix' },
    inputAttrs: { 'data-testid': 'input-element' },
    outline: { 'data-testid': 'outline-element' },
  },
  argTypes: {
    ...argTypes,
    modelValue: { control: 'text' },
    icon,
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
} satisfies InputMetaType;
export default meta;

export const Basic: InputStoryType = { render: () => (BasicStories) };
Basic.decorators = [ withVModel ];
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: { source: { code: BasicStoriesSource } },
};

export const Empty: InputStoryType = { ...Basic };
Empty.argTypes = {
  // modelValue: { control: false },
  placeholder: { control: 'text' },
  disabled: { control: false },
};
Empty.decorators = [
  withVariants,
  withVModel,
];
Empty.parameters = {
  variants: [
    { label: 'default' },
    {
      label: 'hover',
      class: 'pseudo-hover',
    },
    {
      label: 'focus',
      outlineAttrs: { class: 'pseudo-focus-within' },
    },
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-input--is-disabled',
    },
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
};

export const Filled: InputStoryType = { ...Empty };
Filled.args = { modelValue: 'headache' };
Filled.argTypes = {
  ...Empty.argTypes,
  modelValue: { control: 'text' },
  placeholder: { control: false },
};

export const WithError: InputStoryType = { ...Empty };
WithError.argTypes = {
  ...Empty.argTypes,
  modelValue: { control: false },
  placeholder: { control: false },
};
WithError.parameters = {
  ...Empty.parameters,
  variants: [
    {
      label: 'default',
      class: 'ui-input--has-error',
    },
    ...[ 'hover' ].map((variant) => ({
      label: `${variant}`,
      class: `ui-input--has-error pseudo-${variant}`,
    })),
    {
      label: 'focus',
      class: 'ui-input--has-error',
      outlineAttrs: { class: 'pseudo-focus-within' },
    },
    {
      label: 'disabled',
      class: 'ui-input--has-error ui-input--is-disabled',
    },
  ],
};

export const WithSuffix: InputStoryType = { ...Basic };
WithSuffix.args = {
  type: 'number',
  placeholder: 'Put your height',
  suffix: 'cm',
};
WithSuffix.parameters = { docs: { source: { code: null } } };

export const WithButtonAside: InputStoryType = { render: () => (WithButtonAsideStories) };
WithButtonAside.args = { icon: 'search' };
WithButtonAside.argTypes = {
  suffix: { control: false },
  textSuffixAttrs: { control: false },
};
WithButtonAside.decorators = [ withVModel ];
WithButtonAside.parameters = { docs: { source: { code: WithButtonAsideStoriesSource } } };

export const WithInputSlot: InputStoryType = { render: () => (WithInputSlotStories) };
WithInputSlot.parameters = {
  chromatic: { disableSnapshot: true },
  docs: { source: { code: WithInputSlotStoriesSource } },
};

export const WithAsideSlot: InputStoryType = { render: () => (WithAsideSlotStories) };
WithAsideSlot.parameters = {
  chromatic: { disableSnapshot: true },
  docs: { source: { code: WithAsideSlotStoriesSource } },
};

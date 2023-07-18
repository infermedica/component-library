import {
  withVModel,
  withVariants,
} from '@sb/decorators';
import { content } from '@sb/helpers/argTypes';
import { useArgTypes } from '@sb/helpers';
import { UiCheckbox } from '@index';
import type { CheckboxProps } from '@index';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';

type CheckboxArgsType = CheckboxProps & {
  content?: string;
  modifiers?: string[];
  items?: Required<CheckboxProps['value']>[];
}
type CheckboxMetaType = Meta<CheckboxArgsType>;
type CheckboxStoryType = StoryObj<CheckboxArgsType>;

const { argTypes } = useArgTypes(UiCheckbox, { variables: { regexp: /^(\.ui-checkbox|\.ui-checkbox__checkbox)$/ } });

import {
  BasicStories,
  BasicStoriesSource,
  AsListStories,
  AsListStoriesSource,
  WithCheckboxSlotStories,
  WithCheckboxSlotStoriesSource,
  WithCheckmarkSlotStories,
  WithCheckmarkSlotStoriesSource,
  WithLabelSlotStories,
  WithLabelSlotStoriesSource,
} from './stories';

export default {
  title: 'Atoms/Checkbox',
  component: UiCheckbox,
  excludeStories: /.*(Type|Data)$/,
  args: {
    modelValue: false,
    content: 'I read and accept Terms of Service and Privacy Policy.',
    class: [],
    value: '',
    id: '',
    disabled: false,
    inputAttrs: { 'data-testid': 'input-element' },
    iconCheckmarkAttrs: { 'data-testid': 'icon-checkmark' },
    textLabelAttrs: { 'data-testid': 'text-label' },
  },
  argTypes: {
    ...argTypes,
    modelValue: { control: 'boolean' },
    content,
  },
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies CheckboxMetaType;

export const Basic: CheckboxStoryType = { render: () => (BasicStories) };
Basic.decorators = [ withVModel ];
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const BasicVariants: CheckboxStoryType = { ...Basic };
BasicVariants.argTypes = {
  modelValue: { control: false },
  value: { control: false },
  disabled: { control: false },
  modifiers: { control: false },
  id: { control: false },
  inputAttrs: { control: false },
  iconCheckmarkAttrs: { control: false },
  textLabelAttrs: { control: false },
};
BasicVariants.decorators = [ withVariants ];
BasicVariants.parameters = {
  docs: { source: { code: null } },
  variants: [
    {
      label: 'default',
      modelValue: false,
    },
    ...[
      'hover',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
      modelValue: false,
    })),
    {
      label: 'focus',
      class: 'pseudo-focus-within',
      modelValue: false,
    },
    {
      label: 'checked default',
      modelValue: true,
    },
    ...[
      'hover',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
      modelValue: true,
    })),
    {
      label: 'checked focus',
      class: 'pseudo-focus-within',
      modelValue: true,
    },
  ],
};

export const DisabledVariants: CheckboxStoryType = { ...BasicVariants };
DisabledVariants.parameters = {
  docs: { source: { code: null } },
  variants: BasicVariants.parameters.variants.map(
    (variant: Record<string, unknown>) => ({
      ...variant,
      class: `ui-checkbox--is-disabled ${variant.class}`,
    }),
  ),
};

export const ErrorVariants: CheckboxStoryType = { ...BasicVariants };
ErrorVariants.parameters = {
  docs: { source: { code: null } },
  variants: BasicVariants.parameters.variants.map(
    (variant: Record<string, unknown>) => ({
      ...variant,
      class: `ui-checkbox--has-error ${variant.class}`,
    }),
  ),
};

export const AsStringValue: CheckboxStoryType = { ...Basic };
AsStringValue.args = {
  modelValue: [],
  value: 'I read and accept Terms of Service and Privacy Policy.',
};

export const AsObjectValue: CheckboxStoryType = { ...Basic };
AsObjectValue.args = {
  modelValue: [],
  value: {
    label: 'Europe',
    id: 'value-as-object-europe',
  },
};
AsObjectValue.argTypes = { value: { control: 'object' } };

export const AsListWithStringValue: CheckboxStoryType = { render: () => (AsListStories) };
AsListWithStringValue.args = {
  modelValue: [ ],
  items: [
    'Russia, Kazakhstan or Mongolia',
    'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
    'Europe',
  ],
};
AsListWithStringValue.argTypes = {
  modelValue: { control: 'array' },
  items: {
    table: { category: 'stories controls' },
    control: 'object',
  },
  id: { control: false },
  value: { control: false },
  content: { control: false },
};
AsListWithStringValue.decorators = [ withVModel ];
AsListWithStringValue.parameters = { docs: { source: { code: AsListStoriesSource } } };

export const AsListWithObjectValue: CheckboxStoryType = { ...AsListWithStringValue };
AsListWithObjectValue.args = {
  modelValue: [],
  items: [
    {
      label: 'Russia, Kazakhstan or Mongolia',
      id: 'as-group-with-object-north-asia',
    },
    {
      label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      id: 'as-group-with-object-south-asia',
    },
    {
      label: 'Europe',
      id: 'as-group-with-object-europe',
    },
  ],
};

export const WithCheckboxSlot: CheckboxStoryType = { render: () => (WithCheckboxSlotStories) };
WithCheckboxSlot.decorators = [ withVModel ];
WithCheckboxSlot.parameters = { docs: { source: { code: WithCheckboxSlotStoriesSource } } };

export const WithCheckmarkSlot: CheckboxStoryType = { render: () => (WithCheckmarkSlotStories) };
WithCheckmarkSlot.decorators = [ withVModel ];
WithCheckmarkSlot.parameters = { docs: { source: { code: WithCheckmarkSlotStoriesSource } } };

export const WithLabelSlot: CheckboxStoryType = { render: () => (WithLabelSlotStories) };
WithLabelSlot.decorators = [ withVModel ];
WithLabelSlot.parameters = { docs: { source: { code: WithLabelSlotStoriesSource } } };

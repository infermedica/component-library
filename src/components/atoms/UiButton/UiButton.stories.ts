import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import deepmerge from 'deepmerge';
import {
  UiButton,
  UiIcon,
  UiText,
} from '@/../index';
import { withVariants } from '@sb/decorators';
import {
  useArgTypes,
  extendEvents,
} from '@sb/helpers';
import {
  content,
  icon,
} from '@sb/helpers/argTypes/index.js';

const buttonEvents = extendEvents([ 'onClick' ]);
const { argTypes } = useArgTypes(deepmerge(UiButton, buttonEvents));
const withIconVariants = (Story, { parameters: { iconVariants } }) => ({
  setup(props, { attrs }) {
    return {
      iconVariants: iconVariants.map(({
        icon, iconEnd,
      }) => ({
        iconEnd: iconEnd
          ? attrs.iconEnd
          : undefined,
        icon: icon
          ? attrs.icon
          : undefined,
      })),
      args: attrs,
    };
  },
  template: `<template v-for="variant in iconVariants">
    <story v-bind="{
      ...args, 
      ...variant
    }" />
  </template>`,
});

const UiButtonIcon = {
  components: { UiIcon },
  props: [ 'icon' ],
  template: `<UiIcon
    :icon="icon"
    class="ui-button__icon"
  />`,
};

const meta = {
  title: 'Atoms/Button',
  component: UiButton,
  args: {
    content: 'Submit',
    modifiers: [],
  },
  argTypes: {
    ...argTypes,
    content,
    icon,
    iconEnd: {
      name: 'icon-end',
      ...icon,
    },
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: { source: { code: null } },
  },
} satisfies Meta<typeof UiButton>;
export default meta;
type Story = StoryObj<typeof UiButton>;

export const Basic: Story = {
  render: () => ({
    components: {
      UiButton,
      UiButtonIcon,
    },
    setup(props, { attrs }) {
      const {
        content,
        icon,
        iconEnd,
        modifiers,
        ...args
      } = attrs;
      return {
        content,
        icon,
        iconEnd,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiButton v-bind="args">
      <UiButtonIcon
          v-if="icon"
          :icon="icon"
      />
      {{ content }}
      <UiButtonIcon
          v-if="iconEnd"
          :icon="iconEnd"
          class="ui-button__icon--end"
      />
    </UiButton>`,
  }),
};
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiButton
    :to="to"
    :href="href"
    :tag="tag"
    @click="handleButtonClick"
  >{{ content }}</UiButton>
</template>

<script setup lang="ts">
import { UiButton } from '@infermedica/cpmponent-library'
</script>
`,
    },
  },
};

export const RouterButton: Story = { ...Basic };
RouterButton.args = { to: { path: '/blog/medical-guide-platform' } };
RouterButton.argTypes = {
  tag: { control: false },
  href: { control: false },
};
RouterButton.parameters = {
  ...Basic.parameters,
  docs: {
    source: {
      code: `<template>
  <UiButton :to="to">{{ content }}</UiButton>
</template>

<script setup lang="ts">
import { UiButton } from '@infermedica/cpmponent-library';

const to = { path: '/blog/medical-guide-platform' };
</script>
`,
    },
  },
};

export const LinkButton: Story = { ...Basic };
LinkButton.args = {
  href: 'https://www.infermedica.com',
  target: '_blank',
};
LinkButton.argTypes = {
  tag: { control: false },
  to: { control: false },
};
LinkButton.parameters = {
  ...Basic.parameters,
  docs: {
    source: {
      code: `<template>
  <UiButton 
    :href="href"
    target="_blank"
  >{{ content }}</UiButton>
</template>

<script setup lang="ts">
import { UiButton } from '@infermedica/cpmponent-library';

const href = 'https://www.infermedica.com';
</script>
`,
    },
  },
};

export const Primary: Story = { ...Basic };
Primary.argTypes = {
  modifiers: {
    ...meta.argTypes.modifiers,
    options: [ 'ui-button--small' ],
  },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
Primary.decorators = [ withVariants ];
Primary.parameters = {
  variants: [
    { label: 'default' },
    ...[
      'hover',
      'focus',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-button--is-disabled',
    },
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
};

export const Outlined: Story = { ...Primary };
Outlined.parameters = {
  variants: {
    ...Primary.parameters.variants.map((variant) => ({
      ...variant,
      class: `${variant.class} ui-button--outlined`,
    })),
  },
};

export const Text: Story = { ...Primary };
Text.parameters = {
  variants: {
    ...Primary.parameters.variants.map((variant) => ({
      ...variant,
      class: `${variant.class} ui-button--text`,
    })),
  },
};

export const TextSecondary: Story = { ...Text };
TextSecondary.decorators = [
  ...Text.decorators,
  () => ({ template: '<div class="ui-button--theme-secondary"><story/></div>' }),
];

export const TextBrand: Story = { ...Text };
TextBrand.parameters = {
  ...Text.parameters,
  backgrounds: { default: 'brand' },
};
TextBrand.decorators = [
  ...Text.decorators,
  () => ({ template: '<div class="ui-button--theme-brand"><story/></div>' }),
];

export const Icon: Story = {
  render: () => ({
    components: {
      UiButton,
      UiIcon,
    },
    setup(props, { attrs }) {
      const {
        icon, ...args
      } = attrs;
      return {
        icon,
        args: {
          ...args,
          class: args.modifiers,
        },
      };
    },
    template: `<UiButton 
        v-bind="args" 
        class="ui-button--icon"
    >
      <UiIcon 
        :icon="icon"
        class="ui-button__icon"
      />
    </UiButton>`,
  }),
};
Icon.args = { icon: 'plus-circled-filled' };
Icon.argTypes = {
  iconEnd: { control: false },
  modifiers: {
    ...meta.argTypes.modifiers,
    control: false,
  },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
Icon.decorators = [ withVariants ];
Icon.parameters = { ...Text.parameters };

export const IconSecondary: Story = { ...Icon };
IconSecondary.decorators = [
  ...Icon.decorators,
  () => ({ template: '<div class="ui-button--theme-secondary"><story/></div>' }),
];

export const IconBrand: Story = { ...Icon };
IconBrand.parameters = {
  ...Icon.parameters,
  backgrounds: { default: 'brand' },
};
IconBrand.decorators = [
  ...Icon.decorators,
  () => ({ template: '<div class="ui-button--theme-brand"><story/></div>' }),
];

export const Circled: Story = {
  render: () => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup(props, { attrs }) {
      const {
        content,
        icon,
        ...args
      } = attrs;
      return {
        content,
        icon,
        args: {
          ...args,
          class: args.modifiers,
        },
      };
    },
    template: `<UiButton 
      v-bind="args"
      class="ui-button--circled"
    >
      <UiText>
        {{ content }}
      </UiText>
    </UiButton>
    <UiButton 
      v-bind="args"
      class="ui-button--circled"
    >
      <UiIcon 
        :icon="icon" 
        class="ui-button__icon"
      />
    </UiButton>`,
  }),
};
Circled.args = {
  content: '1',
  icon: 'plus-circled-filled',
};
Circled.argTypes = {
  iconEnd: { control: false },
  modifiers: {
    ...meta.argTypes.modifiers,
    control: false,
  },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
Circled.decorators = [
  () => ({
    setup(props, { attrs }) {
      return { attrs };
    },
    template: '<div class="flex gap-2"><story v-bind="attrs"/></div>',
  }),
  withVariants,
];
Circled.parameters = {
  variants: [
    { label: 'default' },
    ...[
      'hover',
      'focus',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-button--is-disabled',
    },
  ],
};

export const CircledSelected: Story = { ...Circled };
CircledSelected.parameters = {
  variants: [ ...Circled.parameters.variants.map((variant) => ({
    ...variant,
    class: `${variant.class} ui-button--is-selected`,
  })) ],
};

export const WithIcon: Story = { ...Basic };
WithIcon.args = {
  icon: 'plus-circled-filled',
  iconEnd: 'plus-circled-filled',
};
WithIcon.argTypes = {
  modifiers: {
    ...meta.argTypes.modifiers,
    control: false,
  },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
WithIcon.decorators = [
  withIconVariants,
  ...Circled.decorators,
];
WithIcon.parameters = {
  iconVariants: [
    { icon: WithIcon.args.icon },
    { iconEnd: WithIcon.args.iconEnd },
  ],
  variants: [
    { label: 'primary' },
    {
      label: 'outlined',
      class: 'ui-button--outlined',
    },
    {
      label: 'text',
      class: 'ui-button--text',
    },
  ],
};

export const Small: Story = { ...Basic };
Small.args = {
  icon: 'plus-circled-filled',
  iconEnd: 'plus-circled-filled',
};
Small.argTypes = {
  modifiers: { control: false },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
Small.decorators = [
  withIconVariants,
  ...Circled.decorators,
];
Small.parameters = {
  iconVariants: [
    {},
    { icon: Small.args.icon },
    { iconEnd: Small.args.iconEnd },
  ],
  variants: [ ...WithIcon.parameters.variants.map((variant) => ({
    ...variant,
    class: `${variant.class} ui-button--small`,
  })) ],
};

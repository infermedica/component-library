import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiButton, UiIcon, UiText } from '@/../index';
import { withVariants } from '@sb/decorators';
import {useAttrs} from "vue";
import icons from "@/components/atoms/UiIcon/icons";

const UiButtonModifiers = [
  'ui-button--small',
  'ui-button--outlined',
  'ui-button--text',
  'ui-button--circled',
  'ui-button--icon',
  'ui-button--is-disabled',
]
const withIconVariants = ( Story, { parameters: { iconVariants }} ) => ({
  setup() {
    return { iconVariants }
  },
  template: `<template v-for="variant in iconVariants">
    <story v-bind="{...$attrs, ...variant}"/>
  </template>`
});
const UiButtonIcon = {
  components: { UiIcon },
  props: ['icon'],
  template: `<UiIcon
    :icon="icon"
    class="ui-button__icon"
  />`
}

const slots = ['default']
  .reduce((acc, key) => {
    return {...acc, [key]: { control: false } };
  }, {})
const events = ['onClick'].reduce((acc, key) => {
  return {...acc, [key]: {
      action: key,
      table: { disable: true },
    } };
}, {})

const meta = {
  title: 'Atoms/Button',
  component: UiButton,
  args: {
    content: 'Submit',
    modifiers: [],
  },
  argTypes: {
    content: {
      description: 'Use this control to set the content.',
      table: { category: 'stories controls' },
      control: 'text',
    },
    icon: {
      description: 'Use this control to set the icon.',
      table: { category: 'stories controls' },
      control: 'select',
      options: ['', ...icons.filter((icon) => {
        const illustrations = [
          'agreement',
          'agreement-rtl',
          'boy',
          'boy-rtl',
          'lock',
          'no-internet-illustration',
          'no-internet-illustration-rtl',
          'podium',
          'podium-rtl',
          'error-500',
        ];
        return !illustrations.includes(icon);
      })],
    },
    iconEnd: {
      name: 'icon-end',
      description: 'Use this control to set the icon-end.',
      table: { category: 'stories controls' },
      control: 'select',
      options: ['', ...icons.filter((icon) => {
        const illustrations = [
          'agreement',
          'agreement-rtl',
          'boy',
          'boy-rtl',
          'lock',
          'no-internet-illustration',
          'no-internet-illustration-rtl',
          'podium',
          'podium-rtl',
          'error-500',
        ];
        return !illustrations.includes(icon);
      })],
    },
    modifiers: {
      name: 'class',
      description: 'Use this control to add modifier to class.',
      table: { category: 'html attributes' },
      control: 'multi-select',
      options: UiButtonModifiers,
    },
    ...slots,
    ...events,
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      source: {
        code: null
      }
    }
  }
} satisfies Meta<typeof UiButton>;
export default meta;
type Story = StoryObj<typeof UiButton>;

export const Basic: Story = {
  render: (args) => ({
    components: {
      UiButton,
      UiButtonIcon,
    },
    setup() {
      const { content, ...rest } = args;
      const {icon, iconEnd} = useAttrs();
      return {
        content,
        icon,
        iconEnd,
        args: rest
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
    <UiButton>Submit</UiButton>
</template>

<script setup lang="ts">
import { UiButton } from '@infermedica/cpmponent-library'
</script>
`,
    }
  }
}

export const Contained: Story = {
  ...Basic
}
Contained.decorators = [ withVariants ];
Contained.parameters = {
  variants: [
    { label: 'default' },
    ...['hover', 'focus', 'active'].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-button--is-disabled'
    },
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
}

export const Outlined: Story = {
  ...Contained
}
Outlined.parameters = {
  variants: {
    ...Contained.parameters.variants.map((variant) => ({
      ...variant,
      class: `${variant.class} ui-button--outlined`,
    }))
  }
}

export const Text: Story = {
  ...Contained
}
Text.parameters = {
  variants: {
    ...Contained.parameters.variants.map((variant) => ({
      ...variant,
      class: `${variant.class} ui-button--text`,
    }))
  }
}

export const TextSecondary: Story = {
  ...Text
}
TextSecondary.decorators = [
  ...Text.decorators,
  () => ({ template: '<div class="ui-button--theme-secondary"><story/></div>' })
]

export const TextBrand: Story = {
  ...Text
}
TextBrand.parameters = {
  ...Text.parameters,
  backgrounds: { default: 'brand' },
};
TextBrand.decorators = [
  ...Text.decorators,
  () => ({ template: '<div class="ui-button--theme-brand"><story/></div>' })
]

export const Icon: Story = {
  render: (args) => ({
    components: { UiButton, UiIcon},
    setup() {
      const { content, ...rest } = args;
      return {
        content,
        args: rest
      };
    },
    template: `<UiButton 
        v-bind="args" 
        class="ui-button--icon"
    >
      <UiIcon 
        icon="plus-circled-filled"
        class="ui-button__icon"
      />
    </UiButton>`,
  }),
}
Icon.decorators = [ withVariants ];
Icon.parameters = {
  ...Text.parameters
}

export const IconSecondary: Story = {
  ...Icon
}
IconSecondary.decorators = [
  ...Icon.decorators,
  () => ({ template: '<div class="ui-button--theme-secondary"><story/></div>' })
]

export const IconBrand: Story = {
  ...Icon
}
IconBrand.parameters = {
  ...Icon.parameters,
  backgrounds: { default: 'brand' },
};
IconBrand.decorators = [
  ...Icon.decorators,
  () => ({ template: '<div class="ui-button--theme-brand"><story/></div>' })
]

export const Circled: Story = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      const { content, ...rest } = args;
      return {
        content,
        args: rest
      };
    },
    template: `<UiButton 
      v-bind="$attrs"
      class="ui-button--circled"
    >
      <UiText>
        {{ content }}
      </UiText>
    </UiButton>
    <UiButton 
      v-bind="$attrs"
      class="ui-button--circled"
    >
      <UiIcon 
        icon="plus-circled-filled" 
        class="ui-button__icon"
      />
    </UiButton>`,
  }),
};
Circled.args = {
  content: '1'
};
Circled.decorators = [
  () => ({
    template: '<div class="flex gap-2"><story v-bind="$attrs"/></div>'
  }),
  withVariants,
];
Circled.parameters = {
  variants: [
    {
      label: 'default',
    },
    ...['hover', 'focus', 'active'].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-button--is-disabled'
    },
  ]
}

export const CircledSelected: Story = {
  ...Circled
}
CircledSelected.parameters = {
  variants: [
    ...Circled.parameters.variants.map((variant) => ({
      ...variant,
      class: `${variant.class} ui-button--is-selected`,
    }))
  ]
}

export const WithIcon: Story = {
  ...Basic,
}
WithIcon.decorators = [
  withIconVariants,
  ...Circled.decorators
];
WithIcon.parameters = {
  iconVariants: [
    {
      icon: 'plus'
    },
    {
      iconEnd: 'plus'
    },
  ],
  variants: [
    {
      label: 'contained',
    },
    {
      label: 'outlined',
      class: 'ui-button--outlined',
    },
    {
      label: 'text',
      class: 'ui-button--text',
    }
  ]
};

export const Small: Story = {
  ...Basic,
}
Small.decorators = [
  withIconVariants,
  ...Circled.decorators
];
Small.parameters = {
  iconVariants: [
    {},
    {icon: 'plus'},
    {iconEnd: 'plus'},
  ],
  variants: [
    ...WithIcon.parameters.variants.map((variant) => ({
      ...variant,
      class: `${variant.class} ui-button--small`,
    }))
  ]
}

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {UiButton, UiIcon, UiText} from '@/../index';
import { withVariants } from '@sb/decorators';
import { useAttrs } from "vue";
import icons from "@/components/atoms/UiIcon/icons";
import {
  slots,
  events,
} from '@sb/helpers'

const UiButtonModifiers = [
  'ui-button--small',
  'ui-button--outlined',
  'ui-button--text',
  'ui-button--circled',
  'ui-button--icon',
  'ui-button--is-disabled',
]
const withIconVariants = ( Story, { parameters: { iconVariants }} ) => ({
  setup(props, { attrs }) {
    return {
      iconVariants: iconVariants.map(({icon, iconEnd}) => ({
        iconEnd: iconEnd ? attrs.iconEnd : undefined,
        icon: icon ? attrs.icon : undefined
      })),
      args: attrs,
    }
  },
  template: `<template v-for="variant in iconVariants">
    <story v-bind="{
      ...args, 
      ...variant
    }" />
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

const meta = {
  title: 'Atoms/Button',
  component: UiButton,
  args: {
    content: 'Submit',
    modifiers: [],
  },
  // TODO: can we merge `to` and `href` to one property?
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
    ...slots(UiButton),
    ...events(['onClick']),
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
        ...rest
      } = attrs
      return {
        content,
        icon,
        iconEnd,
        args: {
          ...rest,
          class: modifiers,
        }
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
// TODO: how to update code after change the args in stories?
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiButton>{{ content }}</UiButton>
</template>

<script setup lang="ts">
import { UiButton } from '@infermedica/cpmponent-library'
</script>
`,
    }
  }
}

export const AsARoute: Story = {
  ...Basic
}
AsARoute.args = {
  to: { path: '/blog/medical-guide-platform' },
}
AsARoute.argTypes = {
  to: {
    control: 'object',
  }
}
AsARoute.parameters = {
  ...Basic.parameters,
  docs: {
    source: {
      code: `<template></template>`
    }
  }
}

export const AsAExternalLink: Story = {
  ...Basic
}
AsAExternalLink.args = {
  href: 'https://www.infermedica.com',
  target: '_blank',
}
AsAExternalLink.argTypes = {
  href: {
    control: 'text',
  }
}
AsARoute.parameters = {
  ...Basic.parameters,
  docs: {
    source: {
      code: `<template></template>`
    }
  }
}

export const Contained: Story = {
  ...Basic
};
Contained.argTypes = {
  modifiers: {
    ...meta.argTypes.modifiers,
    control: false,
  }
};
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
};

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
  render: () => ({
    components: {
      UiButton,
      UiIcon
    },
    setup(props, { attrs }) {
      const { icon, ...rest } = attrs;
      return {
        icon,
        args: {
          ...rest,
          class: rest.modifiers,
        }
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
}
Icon.args = { icon: 'plus-circled-filled' }
Icon.argTypes = {
  iconEnd: { control: false },
  modifiers: {
    ...meta.argTypes.modifiers,
    control: false,
  }
};
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
        ...rest
      } = attrs;
      return {
        content,
        icon,
        args: {
          ...rest,
          class: rest.modifiers,
        }
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
  }
};
Circled.decorators = [
  () => ({
    setup(props, {attrs}) {
      console.log('flex');
      return {
        attrs,
      }
    },
    template: '<div class="flex gap-2"><story v-bind="attrs"/></div>'
  }),
  withVariants,
];
Circled.parameters = {
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
WithIcon.args = {
  icon: 'plus-circled-filled',
  iconEnd: 'plus-circled-filled'
}
WithIcon.argTypes = {
  modifiers: {
    ...meta.argTypes.modifiers,
    control: false,
  }
};
WithIcon.decorators = [
  withIconVariants,
  ...Circled.decorators
];
WithIcon.parameters = {
  iconVariants: [
    { icon: WithIcon.args.icon },
    { iconEnd: WithIcon.args.iconEnd },
  ],
  variants: [
    { label: 'contained' },
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
Small.args = {
  icon: 'plus-circled-filled',
  iconEnd: 'plus-circled-filled'
}
Small.argTypes = {
  modifiers: {
    ...meta.argTypes.modifiers,
    control: false,
  }
};
Small.decorators = [
  withIconVariants,
  ...Circled.decorators
];
Small.parameters = {
  iconVariants: [
    {},
    { icon: Small.args.icon },
    { iconEnd: Small.args.iconEnd },
  ],
  variants: [
    ...WithIcon.parameters.variants.map((variant) => ({
      ...variant,
      class: `${variant.class} ui-button--small`,
    }))
  ]
}

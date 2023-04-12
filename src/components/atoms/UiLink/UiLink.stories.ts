import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiLink,
  UiIcon,
  UiText
} from '@/../index';
import { withVariants } from '@sb/decorators';
import { useArgTypes } from '@sb/helpers'
import {
  content,
  icon
} from '@sb/helpers/argTypes/index.js';

const { argTypes } = useArgTypes(UiLink);

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

const UiLinkIcon = {
  components: { UiIcon },
  props: ['icon'],
  template: `<UiIcon
    :icon="icon"
    class="ui-link__icon"
  />`
}

const meta = {
  title: 'Atoms/Link',
  component: UiLink,
  args: {
    content: 'Instruction for Use',
    modifiers: [],
    href: 'https://infermedica.com/'
  },
  argTypes: {
    ...argTypes,
    content,
    icon,
    iconEnd: {
      name: 'icon-end',
      ...icon
    }
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      source: {
        code: null
      }
    }
  }
} satisfies Meta<typeof UiLink>;
export default meta;
type Story = StoryObj<typeof UiLink>;

export const Basic:Story = {
  render: () => ({
    components: {
      UiLink,
      UiLinkIcon,
    },
    setup(props, { attrs }) {
      const {
        content,
        icon,
        iconEnd,
        modifiers,
        ...args
      } = attrs
      return {
        content,
        icon,
        iconEnd,
        args: {
          ...args,
          class: modifiers,
        }
      };
    },
    template: `<UiLink v-bind="args">
      <UiLinkIcon
        v-if="icon"
        :icon="icon"
      />
      {{ content }}
      <UiLinkIcon
        v-if="iconEnd"
        :icon="iconEnd" 
        class="ui-link__icon--end"
      />
    </UiLink>`,
  }),
}
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
    <UiLink
      :to="to"
      :href="href"
      :tag="tag"   
    >{{ content }}</UiLink>
</template>

<script setup lang="ts">
import { UiLink } from '@infermedica/cpmponent-library'
</script>
`,
    }
  }
}

export const Primary:Story  = {
  ...Basic
}
Primary.decorators = [ withVariants ];
Primary.parameters = {
  variants: [
    { label: 'default' },
    ...['hover', 'focus', 'active'].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
}

export const Secondary:Story = {
  ...Basic,
}
Secondary.decorators = [
  withIconVariants,
  () => ({template: '<div class="flex gap-2"><story v-bind="$attrs"/></div>'}),
  () => ({ template: '<div class="ui-link--theme-secondary"><story v-bind="$attrs"/></div>' }),
  withVariants,
]
Secondary.parameters = {
  iconVariants: [
    {},
    {icon: 'plus'},
    {iconEnd: 'plus'},
  ],
  variants: [
    {
      label: 'default',
    },
    ...['hover', 'focus', 'active'].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
  ]
}

export const Brand:Story = {
  ...Secondary
}
Brand.decorators = [
  withIconVariants,
  () => ({template: '<div class="flex gap-2"><story v-bind="$attrs"/></div>'}),
  () => ({ template: '<div class="ui-link--theme-brand"><story v-bind="$attrs"/></div>' }),
  withVariants,
]
Brand.parameters = {
  ...Secondary.parameters,
  backgrounds: { default: 'brand' },
};

export const WithIcon:Story = {
  ...Basic
}
WithIcon.decorators = [
  withIconVariants,
  () => ({template: '<div class="flex gap-2"><story v-bind="$attrs"/></div>'}),
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
}

export const Small:Story = {
  ...Secondary
}
Small.argTypes = {
  modifiers: {
    control: false,
  }
}
Small.parameters = {
  variants: [
    {
      label: null,
      class: 'ui-link--small'
    }
  ]
}
Small.decorators = [
  () => ({template: '<div class="flex gap-2"><story v-bind="$attrs"/></div>'}),
  withVariants,
]

export const LinkInLongText:Story = {
  render: () => ({
    components: {
      UiLink,
      UiText,
      UiLinkIcon,
    },
    setup(props, { attrs }) {
      const {
        content,
        before,
        after,
        icon,
        iconEnd,
        modifiers,
        ...args
      } = attrs;
      return {
        content,
        before: `${before} `,
        after: ` ${after}`,
        icon,
        iconEnd,
        args: {
          ...args,
          class: modifiers,
        }
      }
    },
    template: `<UiText class="max-w-150">
      {{ before }}<UiLink v-bind="args">
        <UiLinkIcon 
          v-if="icon" 
          :icon="icon"
        />
        {{ content }}
        <UiLinkIcon 
          v-if="iconEnd" 
          :icon="iconEnd" 
          class="ui-link__icon--end"/>
      </UiLink>{{ after }}
    </UiText>`
  })
}
LinkInLongText.args = {
  content: 'Medical Guidance Platform',
  before: 'Healthcare is complex, and whether you’re a patient, provider, payer, or administrator, we all need a helping hand from time to time. Imagine a world where personalized help was available whenever you needed it. With Infermedica’s AI-powered',
  after: '(MGP), constant support is at our fingertips.',
  icon: 'plus-circled-filled',
  iconEnd: 'plus-circled-filled',

}
LinkInLongText.decorators = [
  withIconVariants,
  () => ({
    setup(props, { attrs }) {
      return {
        attrs,
      }
    },
    template: '<div class="flex flex-col gap-2"><story v-bind="attrs"/></div>'
  }),
]
LinkInLongText.parameters = {
  iconVariants: [
    {},
    { icon: LinkInLongText.args.icon },
    { iconEnd: LinkInLongText.args.iconEnd },
  ]
}

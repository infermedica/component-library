import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {UiLink, UiIcon, UiText} from '@/../index';
import { withVariants } from '@sb/decorators';
import {useAttrs} from "vue";
import icons from '../UiIcon/icons';

const UiLinkModifiers = [
  'ui-link--small',
]
const withIconVariants = ( Story, { parameters: { iconVariants }} ) => ({
  setup() {
    return { iconVariants }
  },
  template: `<template v-for="variant in iconVariants">
    <story v-bind="{...$attrs, ...variant}"/>
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

const slots = ['default']
  .reduce((acc, key) => {
    return {...acc, [key]: { control: false } };
  }, {})

const meta = {
  title: 'Atoms/Link',
  component: UiLink,
  args: {
    content: 'Instruction for Use',
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
      options: UiLinkModifiers,
    },
    ...slots,
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
  render: (args) => ({
    components: {
      UiLink,
      UiLinkIcon,
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
    <UiLink>Submit</UiLink>
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
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-button--is-disabled'
    },
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
}

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
  ]
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
Brand.parameters = {
  ...Secondary.parameters,
  backgrounds: { default: 'brand' },
};
Brand.decorators = [
  withIconVariants,
  () => ({template: '<div class="flex gap-2"><story v-bind="$attrs"/></div>'}),
  () => ({ template: '<div class="ui-link--theme-brand"><story v-bind="$attrs"/></div>' }),
  withVariants,
]

export const Small:Story = {
  ...Secondary
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

export const InALongText:Story = {
  render: (args) => ({
    components: {
      UiLink,
      UiText,
      UiIcon,
    },
    setup() {
      const { content, before, after} = args;
      const {icon, iconEnd} = useAttrs()
      return {
        content,
        before: `${before} `,
        after: ` ${after}`,
        icon,
        iconEnd,
      };
    },
    template: `<UiText class="max-w-150">
      {{ before }}<UiLink><UiIcon v-if="icon" :icon="icon" class="ui-link__icon"/>{{ content }}<UiIcon v-if="iconEnd" :icon="iconEnd" class="ui-link__icon ui-link__icon--end"/></UiLink>{{ after }}
    </UiText>`
  })
}
InALongText.args = {
  before: 'Healthcare is complex, and whether you’re a patient, provider, payer, or administrator, we all need a helping hand from time to time. Imagine a world where personalized help was available whenever you needed it. With Infermedica’s AI-powered',
  after: '(MGP), constant support is at our fingertips.',
  content: 'Medical Guidance Platform',

}
InALongText.decorators = [
  withVariants
]
InALongText.parameters = {
  variants: [
    {
      label: 'default',
    },
    {
      label: 'with icon',
      icon: 'plus-circled-filled',
    },
    {
      label: 'with icon on end',
      iconEnd: 'plus-circled-filled',
    }
  ]
}

import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { actions } from '@storybook/addon-actions';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';
import './UiPopover.stories.scss';
import { WithDecrementSlot } from '@/components/molecules/UiNumberStepper/UiNumberStepper.stories';

const events = actions({ onClose: 'close' });

export default {
  title: 'Molecules/Popover',
  component: UiPopover,
  subcomponents: {
    UiHeading,
    UiButton,
    UiIcon,
  },
  args: {
    content: 'A custom Triage app that you can use anywhere.',
    modifiers: [],
    title: 'Triage',
    headingTitleAttrs: { 'data-testid': 'heading-title' },
    buttonCloseAttrs: { 'aria-label': 'close triage popover' },
    iconCloseAttrs: { 'data-testid': 'close-icon' },
    closeAction: null,
  },
  argTypes: {
    content,
    modifiers: modifiers({
      options: [
        'ui-popover--has-arrow',
        'ui-popover--has-start-arrow',
        'ui-popover--unrounded',
        'ui-popover--has-mobile',
      ],
    }),
    title: {
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      control: { type: 'text' },
    },
    titleSlot: {
      name: 'title',
      description: 'Use this slot to replace title template.',
      table: {
        type: { summary: 'unknown' },
        category: 'slots',
      },
    },
    closeAction: {
      name: 'close',
      description: 'Use this event to detect when popover is closing.',
      table: { category: 'events' },
      action: 'closed',
    },
    headingTitleAttrs: { table: { subcategory: 'Attrs props' } },
    buttonCloseAttrs: { table: { subcategory: 'Attrs props' } },
    iconCloseAttrs: { table: { subcategory: 'Attrs props' } },
  },
  parameters: {
    cssProperties: {
      '--popover-border-start-start-radius': 'var(--border-radius-form)',
      '--popover-border-start-end-radius': 'var(--border-radius-form)',
      '--popover-border-end-start-radius': 'var(--border-radius-form)',
      '--popover-border-end-end-radius': 'var(--border-radius-form)',
      '--popover-transition': 'border-color 150ms ease-in-out',
      '--popover-background': 'var(--color-background-subtle)',
      '--popover-box-shadow': 'var(--box-shadow-high)',
      '--popover-border-block':
        'var(--popover-border-block-start, var(--popover-border)) var(--popover-border-block-end, var(--popover-border))',
      '--popover-border-inline':
        'var(--popover-border-inline-start, var(--popover-border)) var(--popover-border-inline-end, var(--popover-border))',
      '--popover-border-block-style':
        'var(--popover-border-block-start-style, solid) var(--popover-border-block-end-style, solid)',
      '--popover-border-inline-style':
        'var(--popover-border-inline-start-style, solid) var(--popover-border-inline-end-style, solid)',
      '--popover-border-block-color':
        'var(--popover-border-block-start-color, var(--color-border-subtle)) var(--popover-border-block-end-color, var(--color-border-subtle))',
      '--popover-border-inline-color':
        'var(--popover-border-inline-start-color, var(--color-border-subtle)) var(--popover-border-inline-end-color, var(--color-border-subtle))',
      '--popover-border-block-width':
        'var(--popover-border-block-start-width, var(--_popover-arrow-border-width)) var(--popover-border-block-end-width, var(--_popover-arrow-border-width))',
      '--popover-border-inline-width':
        'var(--popover-border-inline-start-width, var(--_popover-arrow-border-width)) var(--popover-border-inline-end-width, var(--_popover-arrow-border-width))',
      '--popover-header-padding-block':
        'var(--popover-header-padding-block-start, var(--space-12)) var(--popover-header-padding-block-end, var(--space-12))',
      '--popover-header-padding-inline':
        'var(--popover-header-padding-inline-start, var(--space-16)) var(--popover-header-padding-inline-end, var(--space-16))',
      '--popover-header-border-start-start-radius': 'inherit',
      '--popover-header-border-start-end-radius': 'inherit',
      '--popover-header-border-end-start-radius': '0',
      '--popover-header-border-end-end-radius': '0',
      '--popover-content-padding-block':
        'var(--popover-content-padding-block-start, var(--space-16)) var(--popover-content-padding-block-end, var(--space-16))',
      '--popover-content-padding-inline':
        'var(--popover-content-padding-inline-start, var(--space-16)) var(--popover-content-padding-inline-end, var(--space-16))',
      '--popover-content-border-start-start-radius': '0',
      '--popover-content-border-start-end-radius': '0',
      '--popover-content-border-end-start-radius': 'inherit',
      '--popover-content-border-end-end-radius': 'inherit',
      '--popover-arrow-size': '0.75rem',
      '--popover-arrow-border-width': '1px',
      '--popover-header-background': 'var(--color-background-subtle)',
      '--popover-mobile-border-start-start-radius': '0',
      '--popover-mobile-border-start-end-radius': '0',
      '--popover-mobile-border-end-start-radius': '0',
      '--popover-mobile-border-end-end-radius': '0',
    },
  },
};

export const Common = {
  render: (args) => ({
    components: {
      UiPopover,
      UiText,
    },
    setup() {
      return {
        ...args,
        ...events,
      };
    },
    template: `<UiPopover
      :title="title"
      :heading-title-attrs="headingTitleAttrs"
      :button-close-attrs="buttonCloseAttrs"
      :icon-close-attrs="iconCloseAttrs"
      :class="[
        'popover',
        modifiers,
      ]"
      @close="onClose"
    >
      <UiText>
        {{ content }}
      </UiText>
    </UiPopover>`,
  }),
};

export const HasArrow = {
  render: (args) => ({
    components: {
      UiPopover,
      UiText,
    },
    setup() {
      return {
        ...args,
        ...events,
      };
    },
    template: `<UiPopover
      :title="title"
      :heading-title-attrs="headingTitleAttrs"
      :button-close-attrs="buttonCloseAttrs"
      :icon-close-attrs="iconCloseAttrs"
      :class="[
        'popover',
        modifiers,
      ]"
      @close="onClose"
    >
      <UiText>
        {{ content }}
      </UiText>
    </UiPopover>`,
  }),

  args: { modifiers: [ 'ui-popover--has-arrow' ] },
};

export const HasStartArrow = {
  render: (args) => ({
    components: {
      UiPopover,
      UiText,
    },
    setup() {
      return {
        ...args,
        ...events,
      };
    },
    template: `<UiPopover
      :title="title"
      :heading-title-attrs="headingTitleAttrs"
      :button-close-attrs="buttonCloseAttrs"
      :icon-close-attrs="iconCloseAttrs"
      :class="[
        'popover',
        modifiers,
      ]"
      @close="onClose"
    >
      <UiText>
        {{ content }}
      </UiText>
    </UiPopover>`,
  }),

  args: { modifiers: [ 'ui-popover--has-start-arrow' ] },
};

export const Unrounded = {
  render: (args) => ({
    components: {
      UiPopover,
      UiText,
    },
    setup() {
      return {
        ...args,
        ...events,
      };
    },
    template: `<UiPopover
      :title="title"
      :heading-title-attrs="headingTitleAttrs"
      :button-close-attrs="buttonCloseAttrs"
      :icon-close-attrs="iconCloseAttrs"
      :class="[
        'popover',
        modifiers,
      ]"
      @close="onClose"
    >
      <UiText>
        {{ content }}
      </UiText>
    </UiPopover>`,
  }),

  args: { modifiers: [ 'ui-popover--unrounded' ] },
};

export const AsBottomPanelOnMobile = {
  render: (args) => ({
    components: {
      UiPopover,
      UiText,
    },
    setup() {
      return {
        ...args,
        ...events,
      };
    },
    template: `<UiPopover
      :title="title"
      :heading-title-attrs="headingTitleAttrs"
      :button-close-attrs="buttonCloseAttrs"
      :icon-close-attrs="iconCloseAttrs"
      :class="[
        'popover',
        modifiers,
      ]"
      @close="onClose"
    >
      <UiText>
        {{ content }}
      </UiText>
    </UiPopover>`,
  }),

  args: {
    modifiers: [
      'ui-popover--has-mobile',
      'ui-popover--has-arrow',
    ],
  },

  parameters: { viewport: { defaultViewport: 'mobile2' } },

  decorators: [ () => ({
    template: `<div class="min-h-135">
      <story />
    </div>`,
  }) ],
};

export const AsDropdown = {
  render: (args) => ({
    components: {
      UiPopover,
      UiText,
    },
    setup() {
      return {
        ...args,
        ...events,
      };
    },
    template: `<UiPopover
      :title="title"
      :heading-title-attrs="headingTitleAttrs"
      :button-close-attrs="buttonCloseAttrs"
      :icon-close-attrs="iconCloseAttrs"
      :class="[
        'popover',
        modifiers,
      ]"
      @close="onClose"
    >
      <UiText>
        {{ content }}
      </UiText>
    </UiPopover>`,
  }),

  args: { title: '' },
};

export const WithTitleSlot = {
  render: (args) => ({
    components: {
      UiPopover,
      UiHeading,
      UiText,
    },
    setup() {
      return {
        ...args,
        ...events,
      };
    },
    template: `<UiPopover
      :title="title"
      :heading-title-attrs="headingTitleAttrs"
      :button-close-attrs="buttonCloseAttrs"
      :icon-close-attrs="iconCloseAttrs"
      :class="[
        'popover',
        modifiers,
      ]"
      @close="onClose"
    >
      <template #title="{
        headingTitleAttrs,
        title
      }">
        <UiHeading
          v-bind="headingTitleAttrs"
        >
          {{ title }}
        </UiHeading>
      </template>
      <UiText>
        {{ content }}
      </UiText>
    </UiPopover>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithCloseSlot = {
  render: (args) => ({
    components: {
      UiPopover,
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return {
        ...args,
        ...events,
      };
    },
    template: `<UiPopover
        :title="title"
        :heading-title-attrs="headingTitleAttrs"
        :button-close-attrs="buttonCloseAttrs"
        :icon-close-attrs="iconCloseAttrs"
        :class="[
          'popover',
          modifiers,
        ]"
        @close="onClose"
    >
      <template #close="{
        buttonCloseAttrs,
        clickHandler,
        iconCloseAttrs,
      }">
        <UiButton
          v-bind="buttonCloseAttrs"
          class="ui-button--icon ui-button--theme-secondary ui-popover__close"
          @click="clickHandler"
        >
          <UiIcon
            v-bind="iconCloseAttrs"
            class="ui-button__icon"
          />
        </UiButton>
      </template>
      <UiText>
        {{ content }}
      </UiText>
    </UiPopover>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

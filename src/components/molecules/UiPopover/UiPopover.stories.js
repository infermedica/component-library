import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { actions } from '@storybook/addon-actions';
import { content, modifiers } from '@sb/helpers/argTypes';
import './UiPopover.stories.scss';
const events = actions({
  onClose: 'close',
});
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
    headingTitleAttrs: {
      'data-testid': 'heading-title',
    },
    buttonCloseAttrs: {
      'aria-label': 'close triage popover',
    },
    iconCloseAttrs: {
      'data-testid': 'close-icon',
    },
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
        type: {
          summary: 'string',
        },
        category: 'props',
      },
      control: {
        type: 'text',
      },
    },
    titleSlot: {
      name: 'title',
      description: 'Use this slot to replace title template.',
      table: {
        type: {
          summary: 'unknown',
        },
        category: 'slots',
      },
    },
    closeAction: {
      name: 'close',
      description: 'Use this event to detect when popover is closing.',
      table: {
        category: 'events',
      },
      action: 'closed',
    },
    headingTitleAttrs: {
      table: {
        subcategory: 'Attrs props',
      },
    },
    buttonCloseAttrs: {
      table: {
        subcategory: 'Attrs props',
      },
    },
    iconCloseAttrs: {
      table: {
        subcategory: 'Attrs props',
      },
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
  args: {
    modifiers: ['ui-popover--has-arrow'],
  },
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
  args: {
    modifiers: ['ui-popover--has-start-arrow'],
  },
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
  args: {
    modifiers: ['ui-popover--unrounded'],
  },
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
    modifiers: ['ui-popover--has-mobile', 'ui-popover--has-arrow'],
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  decorators: [
    () => ({
      template: `<div class="min-h-135">
    <story />
  </div>`,
    }),
  ],
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
  args: {
    title: '',
  },
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
};

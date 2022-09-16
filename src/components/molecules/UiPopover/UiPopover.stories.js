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
    content: 'A custom Symptomate app that you can use anywhere.',
    modifiers: [],
    title: 'Symptom Checker',
    buttonAttrs: {
      'aria-label': 'close',
    },
    closeAction: null,
  },
  argTypes: {
    content,
    modifiers: modifiers({
      options: ['ui-popover--has-arrow', 'ui-popover--has-left-arrow', 'ui-popover--unrounded', 'ui-popover--has-mobile'],
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
  },
};

const Template = (args) => ({
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
    :button-attrs="buttonAttrs"
    class="max-w-80"
    :class="modifiers"
    @close="onClose"
  >
    <UiText>{{content}}</UiText>
  </UiPopover>`,
});

export const Common = Template.bind({
});

export const HasArrow = Template.bind({
});
HasArrow.args = {
  modifiers: ['ui-popover--has-arrow'],
};

export const HasLeftArrow = Template.bind({
});
HasLeftArrow.args = {
  modifiers: ['ui-popover--has-left-arrow'],
};

export const Unrounded = Template.bind({
});
Unrounded.args = {
  modifiers: ['ui-popover--unrounded'],
};

export const AsBottomPanelOnMobile = (args) => ({
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
    :button-attrs="buttonAttrs"
    class="tablet:max-w-80"
    :class="modifiers"
    @close="onClose"
  >
    <UiText>{{content}}</UiText>
  </UiPopover>`,
});
AsBottomPanelOnMobile.args = {
  modifiers: ['ui-popover--has-mobile', 'ui-popover--has-arrow'],
};
AsBottomPanelOnMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};
AsBottomPanelOnMobile.decorators = [() => ({
  template: '<div style="min-height: 568px"><story /></div>',
})];

export const AsDropdown = Template.bind({
});
AsDropdown.args = {
  title: '',
};

export const WithTitleSlot = (args) => ({
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
    :button-attrs="buttonAttrs"
    class="tablet:max-w-80"
    :class="modifiers"
    @close="onClose"
  >
    <template #title="{title}">
      <UiHeading
        level="4"
        tag="span"
      >
        {{ title }}
      </UiHeading>
    </template>
    <UiText>{{content}}</UiText>
  </UiPopover>`,
});

export const WithCloseSlot = (args) => ({
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
    :button-attrs="buttonAttrs"
    class="tablet:max-w-80"
    :class="modifiers"
    @close="onClose"
  >
    <template #close="{attrs, clickHandler}">
      <UiButton
        v-bind="attrs"
        class="ui-button--icon ui-button--theme-secondary ui-popover__close"
        @click="clickHandler"
      >
        <UiIcon 
          class="ui-button__icon" 
          icon="clear" 
        />
      </UiButton>
    </template>
    <UiText>{{content}}</UiText>
  </UiPopover>`,
});

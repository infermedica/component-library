import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';

export default {
  title: 'Molecules/Popover',
  component: UiPopover,
  subcomponents: { UiHeading, UiButton, UiIcon },
  args: {
    content: 'A custom Symptomate app that you can use anywhere.',
    title: 'Symptom Checker',
    buttonAttrs: {
      'aria-label': 'close',
    },
  },
  argTypes: {
    content: { control: 'text' },
    modifiers: {
      control: { type: 'multi-select', options: ['ui-popover--has-arrow', 'ui-popover--unrounded', 'ui-popover--has-mobile'] },
      table: {
        category: 'HTML attributes',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiPopover },
  setup() {
    return { ...args };
  },
  template: `<UiPopover
    :title="title"
    :button-attrs="buttonAttrs"
    class="max-w-80"
    :class="modifiers"
  >
    {{content}}
  </UiPopover>`,
});

export const Popover = Template.bind({});
Popover.args = {
  modifiers: ['ui-popover--has-arrow'],
};
export const Unrounded = Template.bind({});
Unrounded.args = {
  modifiers: ['ui-popover--unrounded'],
};

export const BottomPanel = (args) => ({
  components: { UiPopover },
  setup() {
    return { ...args };
  },
  template: `<UiPopover
    :title="title"
    :button-attrs="buttonAttrs"
    class="tablet:max-w-80"
    :class="modifiers"
  >
    {{content}}
  </UiPopover>`,
});
BottomPanel.args = {
  modifiers: ['ui-popover--has-mobile'],
};

BottomPanel.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};
export const Dropdown = Template.bind({});
Dropdown.args = {
  title: '',
};

export const WithTitleSlot = (args) => ({
  components: { UiPopover, UiHeading },
  setup() {
    return { ...args };
  },
  template: `<UiPopover
    :title="title"
    :button-attrs="buttonAttrs"
    class="tablet:max-w-80"
    :class="modifiers"
  >
    <template #title="{title}">
      <UiHeading
        level="4"
        tag="span"
      >
        {{ title }}
      </UiHeading>
    </template>
    {{content}}
  </UiPopover>`,
});

export const WithCloseSlot = (args) => ({
  components: { UiPopover, UiButton, UiIcon },
  setup() {
    return { ...args };
  },
  template: `<UiPopover
    :title="title"
    :button-attrs="buttonAttrs"
    class="tablet:max-w-80"
    :class="modifiers"
  >
    <template #close="{attrs, clickHandler}">
      <UiButton
        v-bind="attrs"
        class="ui-button--has-icon ui-button--secondary ui-button--text ui-popover__close"
        @click="clickHandler"
      >
        <UiIcon icon="clear" />
      </UiButton>
    </template>
    {{content}}
  </UiPopover>`,
});

import { actions } from '@storybook/addon-actions';
import { content } from '@sb/helpers/argTypes';
import UiChip from '@/components/molecules/UiChip/UiChip.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';

const events = actions({
  onRemove: 'remove',
});

export default {
  title: 'Molecules/Chip',
  component: UiChip,
  subcomponents: { UiButton, UiIcon },
  args: {
    content: 'Chest pain',
    buttonAttrs: {
      'aria-label': 'remove chest pain from symptoms',
    },
    removeAction: null,
  },
  argTypes: {
    content,
    removeAction: {
      name: 'remove',
      description: 'Use this event to detect click on remove button.',
      table: { category: 'events' },
    },
  },
  parameters: {
    cssprops: {
      'chip-font': {
        value: 'var(--font-body-2-comfortable)',
        control: 'text',
        description: '',
      },
      'chip-letter-spacing': {
        value: 'var(--letter-spacing-body-2-comfortable)',
        control: 'text',
        description: '',
      },
      'chip-padding': {
        value: 'var(--space-4) var(--space-12) var(--space-4) var(--space-4)',
        control: 'text',
        description: '',
      },
      'chip-background': {
        value: 'var(--color-chip-background)',
        control: 'text',
        description: '',
      },
      'chip-border-radius': {
        value: 'var(--border-radius-pill)',
        control: 'text',
        description: '',
      },
      'chip-color': {
        value: 'var(--color-chip-text)',
        control: 'text',
        description: '',
      },
      'chip-remove-background': {
        value: 'var(--color-chip-icon-background)',
        control: 'text',
        description: '',
      },
      'chip-remove-hover-background': {
        value: 'var(--color-chip-icon-background-hover)',
        control: 'text',
        description: '',
      },
      'chip-remove-active-background': {
        value: 'var(--color-chip-icon-background-active)',
        control: 'text',
        description: '',
      },
      'chip-remove-size': {
        value: '1.5rem',
        control: 'text',
        description: '',
      },
      'chip-remove-cross': {
        value: 'var(--color-chip-icon)',
        control: 'text',
        description: '',
      },
      'chip-remove-margin': {
        value: 'var(--space-2) var(--space-4) var(--space-2) var(--space-2)',
        control: 'text',
        description: '',
      },
      'chip-icon-margin': {
        value: '-2px',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiChip },
  setup() {
    return {
      ...args,
      ...events,
    };
  },
  template: `<UiChip
    :button-attrs="buttonAttrs"
    @remove="onRemove"
  >
    {{content}}
  </UiChip>`,
});

export const WithLabel = Template.bind({});

export const WithRemoveSlot = (args) => ({
  components: { UiChip, UiButton, UiIcon },
  setup() { return { ...args, events }; },
  template: `<UiChip
    v-bind="events" 
    @remove="onRemove"
  >
    <template #remove="{clickHandler, attrs}">
      <UiButton
        v-bind="attrs"
        class="ui-chip__remove ui-button--has-icon ui-button--circled"
        @click="clickHandler"
      >
        <UiIcon
          icon="remove-filled"
          class="ui-chip__icon"
        />
      </UiButton>
    </template>
    {{content}}
  </UiChip>`,
});

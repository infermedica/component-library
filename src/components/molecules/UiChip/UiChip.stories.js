import UiChip from '@/components/molecules/UiChip/UiChip.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';

export default {
  title: 'Molecules/Chip',
  component: UiChip,
  subcomponents: { UiButton, UiIcon },
  args: {
    content: 'Chest pain',
    buttonAttrs: {
      'aria-label': 'remove Chest pain from symptoms',
    },
  },
  argTypes: {
    content: { control: 'text' },
    remove: {
      action: 'removed',
      description: 'Use this event to detect interaction with remove button',
      table: { category: 'Events' },
    },
  },
};

const Template = (args) => ({
  components: { UiChip },
  setup() { return { ...args }; },
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
  setup() { return { ...args }; },
  template: `<UiChip 
    :button-attrs="buttonAttrs" 
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

import UiChips from '@/components/molecules/UiChips/UiChips.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';

export default {
  title: 'Molecules/Chips',
  component: UiChips,
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
  components: { UiChips },
  setup() { return { ...args }; },
  template: `<UiChips 
    :button-attrs="buttonAttrs" 
    @remove="onRemove"
  >
    {{content}}
  </UiChips>`,
});

export const WithLabel = Template.bind({});

export const WithRemoveSlot = (args) => ({
  components: { UiChips, UiButton, UiIcon },
  setup() { return { ...args }; },
  template: `<UiChips 
    :button-attrs="buttonAttrs" 
    @remove="onRemove"
  >
    <template #remove="{clickHandler, attrs}">
      <UiButton
        v-bind="attrs"
        class="ui-chips__remove ui-button--has-icon ui-button--circled"
        @click="clickHandler"
      >
        <UiIcon
          icon="chip-remove"
          class="ui-chips__icon"
        />
      </UiButton>
    </template>
    {{content}}
  </UiChips>`,
});

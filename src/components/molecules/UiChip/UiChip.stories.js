import UiChip from '@/components/molecules/UiChip/UiChip.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import { actions } from '@storybook/addon-actions';
import { content } from '@sb/helpers/argTypes';

const events = actions({
  onRemove: 'remove',
});

export default {
  title: 'Molecules/Chip',
  component: UiChip,
  subcomponents: {
    UiButton,
    UiIcon,
  },
  args: {
    content: 'Label',
    buttonRemoveAttrs: {
      ariaLabel: 'remove label',
    },
    iconRemoveAttrs: {
      'data-testid': 'icon-remove',
    },
    removeAction: null,
  },
  argTypes: {
    content,
    removeAction: {
      name: 'remove',
      description: 'Use this event to detect click on remove button.',
      table: {
        category: 'events',
      },
    },
  },
};

export const WithLabel = (args) => ({
  components: {
    UiChip,
  },
  setup() {
    return {
      ...args,
      ...events,
    };
  },
  template: `<UiChip
    :button-remove-attrs="buttonRemoveAttrs"
    :icon-remove-attrs="iconRemoveAttrs"
    @remove="onRemove"
  >
    {{content}}
  </UiChip>`,
});

export const WithRemoveSlot = (args) => ({
  components: {
    UiChip,
    UiButton,
    UiIcon,
  },
  setup() {
    return {
      ...args,
      events,
    };
  },
  template: `<UiChip
    v-bind="events" 
    @remove="onRemove"
  >
    <template #remove="{
      attrs,
      clickHandler,
      iconRemoveAttrs, 
    }">
      <UiButton
        v-bind="attrs"
        class="ui-button--icon ui-button--circled ui-chip__remove"
        @click="clickHandler"
      >
        <UiIcon
          v-bind="iconRemoveAttrs"
          class="ui-button__icon ui-chip__icon"
        />
      </UiButton>
    </template>
    {{content}}
  </UiChip>`,
});

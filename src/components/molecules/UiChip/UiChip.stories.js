import UiChip from '@/components/molecules/UiChip/UiChip.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import { actions } from '@storybook/addon-actions';
import { content } from '@sb/helpers/argTypes';

const events = actions({ onRemove: 'remove' });

export default {
  title: 'Molecules/Chip',
  component: UiChip,
  subcomponents: {
    UiButton,
    UiIcon,
  },
  args: {
    content: 'Label',
    textLabelAttrs: { 'data-testid': 'label-text' },
    buttonRemoveAttrs: { ariaLabel: 'remove label' },
    iconRemoveAttrs: { 'data-testid': 'icon-remove' },
    removeAction: null,
  },
  argTypes: {
    content,
    removeAction: {
      name: 'remove',
      description: 'Use this event to detect click on remove button.',
      table: { category: 'events' },
    },
    textLabelAttrs: { table: { subcategory: 'Attrs props' } },
    buttonRemoveAttrs: { table: { subcategory: 'Attrs props' } },
    iconRemoveAttrs: { table: { subcategory: 'Attrs props' } },
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
    :text-label-attrs="textLabelAttrs"
    :button-remove-attrs="buttonRemoveAttrs"
    :icon-remove-attrs="iconRemoveAttrs"
    @remove="onRemove"
  >
    {{ content }}
  </UiChip>`,
});
export const WithLabel = Template.bind({});

export const WithLongLabel = Template.bind({});
WithLongLabel.args = { content: 'Input chips represent pieces of information that were added, selected or entered by the user.' };
WithLongLabel.decorators = [ () => ({ template: '<div style="max-width: 22.375rem"><story/></div>' }) ];

export const AsGroup = (args) => ({
  components: { UiChip },
  setup() {
    return {
      ...args,
      ...events,
    };
  },
  template: `<div style="display: flex; flex-wrap: wrap; gap: var(--space-8)">
    <template v-for="_ in 5">
      <UiChip
        :text-label-attrs="textLabelAttrs"
        :button-remove-attrs="buttonRemoveAttrs"
        :icon-remove-attrs="iconRemoveAttrs"
        @remove="onRemove"
      >
        {{ content }}
      </UiChip>
    </template>
  </div>`,
});
AsGroup.decorators = [ () => ({ template: '<div style="max-width: 22.375rem"><story/></div>' }) ];

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
    :text-label-attrs="textLabelAttrs"
    :button-remove-attrs="buttonRemoveAttrs"
    :icon-remove-attrs="iconRemoveAttrs"
    @remove="onRemove"
  >
    <template 
      #remove="{
        buttonRemoveAttrs,
        clickHandler,
        iconRemoveAttrs 
      }"
    >
      <UiButton
        v-bind="buttonRemoveAttrs"
        class="ui-button--icon ui-button--circled ui-chip__remove"
        @click="clickHandler"
      >
        <UiIcon
          v-bind="iconRemoveAttrs"
          class="ui-button__icon ui-chip__icon"
        />
      </UiButton>
    </template>
    {{ content }}
  </UiChip>`,
});

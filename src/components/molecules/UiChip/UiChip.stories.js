import UiChip from '@/components/molecules/UiChip/UiChip.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import { actions } from '@storybook/addon-actions';
import { content } from '@sb/helpers/argTypes';
import UiBackdrop from '@/components/atoms/UiBackdrop/UiBackdrop.vue';

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
  parameters: {
    cssProperties: {
      '--chip-padding-block': 'var(--chip-padding-block-start, var(--space-4)) var(--chip-padding-block-end, var(--space-4))',
      '--chip-padding-inline': 'var(--chip-padding-inline-start, var(--space-12)) var(--chip-padding-inline-end, var(--space-4))',
      '--chip-border-start-start-radius': 'var(--border-radius-form)',
      '--chip-border-start-end-radius': 'var(--border-radius-form)',
      '--chip-border-end-start-radius': 'var(--border-radius-form)',
      '--chip-border-end-end-radius': 'var(--border-radius-form)',
      '--chip-background': 'var(--color-chip-background)',
      '--chip-gap': 'var(--space-8)',
      '--chip-label-color': 'var(--color-chip-text)',
      '--chip-remove-filled-close-color': 'var(--color-chip-icon)',
      '--chip-icon-color': 'var(--color-chip-icon-background)',
      '--chip-icon-hover-color': 'var(--color-chip-icon-background-hover)',
      '--chip-icon-active-color': 'var(--color-chip-icon-background-active)',
      '--chip-remove-pointer-area-size': 'var(--space-32)',
      '--chip-remove-pointer-area-width': 'var(--_element-pointer-area-size)',
      '--chip-remove-pointer-area-height': 'var(--_element-pointer-area-size)',
    },
  },
};

const Template = (args) => ({
  components: {
    UiChip,
    UiBackdrop,
  },
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
WithLongLabel.decorators = [ () => ({
  template: `<div class="max-w-89">
    <story/>
  </div>`,
}) ];

export const AsGroup = (args) => ({
  components: { UiChip },
  setup() {
    return {
      ...args,
      ...events,
    };
  },
  template: `<div class="flex flex-wrap gap-2">
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
AsGroup.decorators = [ () => ({
  template: `<div class="max-w-89">
    <story/>
  </div>`,
}) ];

export const WithRemoveSlot = (args) => ({
  components: {
    UiChip,
    UiButton,
    UiIcon,
  },
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
    <template #remove="{
      buttonRemoveAttrs,
      clickHandler,
      iconRemoveAttrs
    }">
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

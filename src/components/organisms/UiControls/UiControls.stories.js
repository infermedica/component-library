import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import { actions } from '@storybook/addon-actions';

const events = actions({ onHasError: 'has-error' });

export default {
  title: 'Organisms/Controls',
  component: UiControls,
  args: {
    layout: 'horizontal',
    hideNextButton: false,
    hideBackButton: false,
    toBack: { path: '/back' },
    toNext: { path: '/next' },
    invalid: true,
    translation: {
      back: 'Back',
      next: 'Next',
    },
    containerAttrs: { 'data-testid': 'container-element' },
    buttonNextAttrs: { 'data-testid': 'next-button' },
    buttonBackAttrs: { 'data-testid': 'back-button' },
    iconBackAttrs: { 'data-testid': 'back-icon' },
  },
  argTypes: {
    toBack: { control: 'object' },
    toNext: { control: 'object' },
    'has-error': {
      description: 'Use this event to detect when control has error and toNext is blocked.',
      table: { category: 'events' },
    },
    containerAttrs: { table: { subcategory: 'Attrs props' } },
    buttonNextAttrs: { table: { subcategory: 'Attrs props' } },
    buttonBackAttrs: { table: { subcategory: 'Attrs props' } },
    iconBackAttrs: { table: { subcategory: 'Attrs props' } },
    layout: {
      options: [
        'vertical',
        'horizontal',
      ],
    },
    next: {
      table: { category: 'slots' },
      control: false,
      description: 'Use this slot to replace next template.',
    },
    back: {
      table: { category: 'slots' },
      control: false,
      description: 'Use this slot to replace back template.',
    },
    actions: {
      table: { category: 'slots' },
      control: false,
      description: 'Use this slot to replace actions template. Only applies to horizontal layout.',
    },
    default: { control: false },
    container: { control: false },
    name: { table: 'disable' },
  },
};

export const Common = {
  render: (args) => ({
    components: { UiControls },
    setup() {
      return {
        ...args,
        ...events,
      };
    },
    template: `<UiControls
      :hide-next-button="hideNextButton"
      :to-back="toBack"
      :to-next="toNext"
      :invalid="invalid"
      :translation="translation"
      :container-attrs="containerAttrs"
      :button-next-attrs="buttonNextAttrs"
      :button-back-attrs="buttonBackAttrs"
      :icon-back-attrs="iconBackAttrs"
      :direction="direction"
      @has-error="onHasError"
    />`,
  }),
};

export const Vertical = { ...Common };
Vertical.args = { layout: 'vertical' };

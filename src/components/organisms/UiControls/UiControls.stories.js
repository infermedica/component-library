import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { actions } from '@storybook/addon-actions';
import UiQuestion from '@/components/templates/UiQuestion/UiQuestion.vue';

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
  },
};

export const Common = {
  render: (args) => ({
    components: {
      UiControls,
      UiQuestion,
    },
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
    >
    </UiControls>`,
  }),
};

export const Vertical = { ...Common };
Vertical.args = { layout: 'vertical' };

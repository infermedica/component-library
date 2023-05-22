import {
  ref,
  provide,
} from 'vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import * as stories from '../../../components/organisms/UiModal/UiModal.stories.js'

export default {
  title: 'Utilities/Transitions/Fade',
  args: {
    initModelValue: true,
    title: 'Start new checkup?',
    description: 'You will have to answer the question again.',
    isClosable: true,
    hasCancel: true,
    hasConfirm: true,
    translation: {
      confirm: 'Yes, start new checkup',
      cancel: 'Cancel',
    },
    transitionBackdropAttrs: { 'data-testid': 'backdrop-transition' },
    backdropAttrs: { 'data-testid': 'backdrop' },
    transitionDialogAttrs: { 'data-testid': 'dialog-transition' },
    dialogAttrs: { 'data-testid': 'dialog-element' },
    headingTitleAttrs: { 'data-testid': 'title-heading' },
    textDescriptionAttrs: { 'data-testid': 'description-text' },
    buttonConfirmAttrs: { 'data-testid': 'confirm-button' },
    buttonCancelAttrs: { 'data-testid': 'cancel-button' },
    buttonCloseAttrs: {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    },
    iconCloseAttrs: { 'data-testid': 'close-icon' },
    'update:modelValue': null,
  },
  decorators: [ (story, { args }) => ({
    components: {
      story,
      UiButton,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      const toggleModal = () => {
        modelValue.value = !modelValue.value;
      };
      provide('modelValue', modelValue);
      return { toggleModal };
    },
    template: `<div class="min-h-80">
      <UiButton
        class="ui-button--theme-secondary ui-button--text"
        @click='toggleModal'
      >
        Show modal
      </UiButton>
      <story/>
    </div>`,
  }) ],
};

export const Fade = stories.StartNewCheckup;

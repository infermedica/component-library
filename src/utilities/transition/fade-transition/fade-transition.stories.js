import {
  ref,
  provide,
  inject,
} from 'vue';
import { actions } from '@storybook/addon-actions';
import UiModal from '@/components/organisms/UiModal/UiModal.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onConfirm: 'confirm',
  onCancel: 'cancel',
});

export default {
  title: 'Utilities/Transitions/Fade',
  component: UiModal,
  args: {
    initModelValue: false,
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

export const Fade = {
  render: (args) => ({
    components: { UiModal },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiModal
      v-model="modelValue"
      :title='title'
      :description='description'
      :is-closable="isClosable"
      :has-cancel="hasCancel"
      :has-confirm="hasConfirm"
      :translation="translation"
      :transition-backdrop-attrs="transitionBackdropAttrs"
      :backdrop-attrs="backdropAttrs"
      :transition-dialog-attrs="transitionDialogAttrs"
      :heading-title-attrs="headingTitleAttrs"
      :text-description-attrs="textDescriptionAttrs"
      :button-confirm-attrs="buttonConfirmAttrs"
      :button-cancel-attrs="buttonCancelAttrs"
      :button-close-attrs="buttonCloseAttrs"
      :icon-close-attrs="iconCloseAttrs"
      :dialog-attrs="dialogAttrs"
      @update:modelValue="onUpdateModelValue"
      @confirm="onConfirm"
      @cancel="onCancel"
    />`,
  }),
};

import UiModal from '@/components/organisms/UiModal/UiModal.vue';
import UiBackdrop from '@/components/atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import {
  ref,
  provide,
  inject,
} from 'vue';
import { actions } from '@storybook/addon-actions';
import {
  bodyScrollLock,
  focusTrap,
} from '@/utilities/directives';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onConfirm: 'confirm',
  onCancel: 'cancel',
});

export default {
  title: 'Organisms/Modal',
  component: UiModal,
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
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'boolean',
    },
    title: {
      description: 'Use this props to set dialog title.',
      table: { category: 'props' },
      control: 'text',
    },
    titleSlot: {
      name: 'title',
      description: 'Use this slot to replace title template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: 'object',
    },
    description: {
      description: 'Use this props to set dialog description.',
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
      control: 'text',
    },
    descriptionSlot: {
      name: 'description',
      description: 'Use this slot to replace description template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: 'object',
    },
    modelValue: { control: false },
    transitionBackdropAttrs: { table: { subcategory: 'Attrs props' } },
    transitionDialogAttrs: { table: { subcategory: 'Attrs props' } },
    backdropAttrs: { table: { subcategory: 'Attrs props' } },
    dialogAttrs: { table: { subcategory: 'Attrs props' } },
    headingTitleAttrs: { table: { subcategory: 'Attrs props' } },
    textDescriptionAttrs: { table: { subcategory: 'Attrs props' } },
    buttonConfirmAttrs: { table: { subcategory: 'Attrs props' } },
    buttonCancelAttrs: { table: { subcategory: 'Attrs props' } },
    buttonCloseAttrs: { table: { subcategory: 'Attrs props' } },
    iconCloseAttrs: { table: { subcategory: 'Attrs props' } },
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
  parameters: {
    docs: { description: { component: 'Modal use `v-body-scroll-lock`. Only works on Canvas mode.' } },
    cssProperties: {
      '--modal-padding-block':
        'var(--modal-padding-block-start, var(--space-24)) var(--modal-padding-block-end, var(--space-24))',
      '--modal-padding-inline':
        'var(--modal-padding-inline-start, var(--space-24)) var(--modal-padding-inline-end, var(--space-24))',
      '--modal-margin-block': 'var(--modal-margin-block-start, 0) var(--modal-margin-block-end, 0)',
      '--modal-margin-inline':
        'var(--modal-margin-inline-start, 0) var(--modal-margin-inline-end, 0)',
      '--modal-border-start-start-radius': 'var(--border-radius-container)',
      '--modal-border-start-end-radius': 'var(--border-radius-container)',
      '--modal-border-end-start-radius': 'var(--border-radius-container)',
      '--modal-border-end-end-radius': 'var(--border-radius-container)',
      '--modal-max-width': '40rem',
      '--modal-background': 'var(--color-background-white)',
      '--modal-box-shadow': 'var(--box-shadow-high)',
      '--modal-title-margin-block':
        'var(--modal-title-margin-block-start, 0) var(--modal-title-margin-block-end, var(--space-12))',
      '--modal-title-margin-inline':
        'var(--modal-title-margin-inline-start, 0) var(--modal-title-margin-inline-end, 0)',
      '--modal-actions-margin-block':
        'var(--modal-actions-margin-block-start, var(--space-32)) var(--modal-actions-margin-block-end, 0)',
      '--modal-actions-margin-inline':
        'var(--modal-actions-margin-inline-start, 0) var(--modal-actions-margin-inline-end, 0)',
      '--modal-confirm-margin-block':
        'var(--modal-confirm-margin-block-start, 0) var(--modal-confirm-margin-block-end, var(--space-12))',
      '--modal-confirm-margin-inline':
        'var(--modal-confirm-margin-inline-start, 0) var(--modal-confirm-margin-inline-end, 0)',
      '--modal-tablet-confirm-margin-block':
        'var(--modal-tablet-confirm-margin-block-start, 0) var(--modal-tablet-confirm-margin-block-end, 0)',
      '--modal-tablet-confirm-margin-inline':
        'var(--modal-tablet-confirm-margin-inline-start, var(--space-12)) var(--modal-tablet-confirm-margin-inline-end, 0)',
    },
  },
};

export const StartNewCheckup = {
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

export const WithoutTitle = {
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

  args: {
    title: '',
    description: 'Delete this file?',
    translation: { confirm: 'Yes, delete' },
  },
};

export const WithBackdropSlot = {
  render: (args) => ({
    components: {
      UiModal,
      UiBackdrop,
    },
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
    >
      <template #backdrop="{
        transitionBackdropAttrs,
        modelValue,
        backdropAttrs,
        closeHandler,
      }">
        <transition v-bind="transitionBackdropAttrs">
          <UiBackdrop
            v-if="modelValue"
            v-bind="backdropAttrs"
            class="ui-modal__backdrop"
            @click="closeHandler"
          />
        </transition>
      </template>
    </UiModal>`,
  }),
};

export const WithContainerSlot = {
  render: (args) => ({
    components: {
      UiModal,
      UiButton,
      UiText,
      UiHeading,
      UiIcon,
    },
    directives: {
      focusTrap,
      bodyScrollLock,
    },
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
    >
      <template #container="{
        transitionDialogAttrs,
        modelValue,
        title,
        hasHeader,
        titleSlotName,
        titleTag,
        titleAttrs,
        titleText,
        description,
        buttonCloseAttrs,
        confirmHandler,
        cancelHandler,
        closeHandler,
        iconCloseAttrs,
        hasDescription,
        textDescriptionAttrs,
        isClosable,
        hasActions,
        hasConfirm,
        buttonConfirmAttrs,
        translation,
        hasCancel,
        buttonCancelAttrs,
        dialogAttrs,
      }">
        <transition
          v-bind="transitionDialogAttrs"
        >
          <dialog
            v-if="modelValue"
            v-focus-trap
            v-body-scroll-lock
            v-bind="dialogAttrs"
            :class="[
              'ui-modal__dialog',
              { 'ui-modal__dialog--has-title': title },
            ]"
          >
            <div
              v-if="hasHeader"
              class="ui-modal__header"
            >
              <component
                :is="titleTag"
                v-bind="titleAttrs"
                class="ui-modal__title"
              >
                {{ titleText }}
              </component>
              <UiButton
                v-if="isClosable"
                v-bind="buttonCloseAttrs"
                class="ui-button--icon ui-button--theme-secondary ui-modal__close"
                @click="closeHandler"
              >
                <UiIcon
                  v-bind="iconCloseAttrs"
                  class="ui-button__icon"
                />
              </UiButton>
            </div>
            <UiText
              v-if="hasDescription"
              v-bind="textDescriptionAttrs"
              class="ui-modal__description"
            >
              {{ description }}
            </UiText>
            <div
              v-if="hasActions"
              class="ui-modal__actions"
            >
              <template v-if="isClosable">
                <UiButton
                  v-if="hasConfirm"
                  v-bind="buttonConfirmAttrs"
                  class="ui-modal__confirm"
                  @click="confirmHandler"
                >
                  {{ translation.confirm }}
                </UiButton>
                <UiButton
                  v-if="hasCancel"
                  v-bind="buttonCancelAttrs"
                  class="ui-button--outlined ui-modal__cancel"
                  @click="cancelHandler"
                >
                  {{ translation.cancel }}
                </UiButton>
              </template>
              <template v-else>
                <UiButton
                  v-if="hasCancel"
                  v-bind="buttonCancelAttrs"
                  class="ui-button--outlined ui-modal__cancel"
                  @click="cancelHandler"
                >
                  {{ translation.cancel }}
                </UiButton>
                <UiButton
                  v-if="hasConfirm"
                  v-bind="buttonConfirmAttrs"
                  class="ui-modal__confirm ui-modal__confirm--order"
                  @click="confirmHandler"
                >
                  {{ translation.confirm }}
                </UiButton>
              </template>
            </div>
          </dialog>
        </transition>
      </template>
    </UiModal>`,
  }),
};

export const WithHeaderSlot = {
  render: (args) => ({
    components: {
      UiModal,
      UiText,
      UiHeading,
      UiIcon,
      UiButton,
    },
    directives: {
      focusTrap,
      bodyScrollLock,
    },
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
    >
      <template #header="{
        hasHeader,
        titleSlotName,
        titleTag,
        titleAttrs,
        titleText,
        description,
        isClosable,
        buttonCloseAttrs,
        closeHandler,
        iconCloseAttrs,
        title,
        hasDescription,
        textDescriptionAttrs,
      }">
        <div
          v-if="hasHeader"
          class="ui-modal__header"
        >
          <component
            :is="titleTag"
            v-bind="titleAttrs"
            class="ui-modal__title"
          >
            {{ titleText }}
          </component>
          <UiButton
            v-if="isClosable"
            v-bind="buttonCloseAttrs"
            class="ui-button--icon ui-button--theme-secondary ui-modal__close"
            @click="closeHandler"
          >
            <UiIcon
              v-bind="iconCloseAttrs"
              class="ui-button__icon"
            />
          </UiButton>
        </div>
        <UiText
          v-if="hasDescription"
          v-bind="textDescriptionAttrs"
          class="ui-modal__description"
        >
          {{ description }}
        </UiText>
      </template>
    </UiModal>`,
  }),
};

export const WithTitleSlot = {
  render: (args) => ({
    components: {
      UiModal,
      UiHeading,
    },
    directives: {
      focusTrap,
      bodyScrollLock,
    },
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
    >
      <template #title="{
        titleTag,
        titleAttrs,
        titleText,
        description,
      }">
        <component
          :is="titleTag"
          v-bind="titleAttrs"
          class="ui-modal__title"
        >
          {{ titleText }}
        </component>
      </template>
    </UiModal>`,
  }),
};

export const WithCloseSlot = {
  render: (args) => ({
    components: {
      UiModal,
      UiButton,
      UiIcon,
    },
    directives: {
      focusTrap,
      bodyScrollLock,
    },
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
    >
      <template #close="{
        isClosable,
        buttonCloseAttrs,
        closeHandler,
        iconCloseAttrs,
      }">
        <UiButton
          v-if="isClosable"
          v-bind="buttonCloseAttrs"
          class="ui-button--icon ui-button--theme-secondary ui-modal__close"
          @click="closeHandler"
        >
          <UiIcon
            v-bind="iconCloseAttrs"
            class="ui-button__icon"
          />
        </UiButton>
      </template>
    </UiModal>`,
  }),
};

export const WithDescriptionSlot = {
  render: (args) => ({
    components: {
      UiModal,
      UiText,
    },
    directives: {
      focusTrap,
      bodyScrollLock,
    },
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
    >
      <template #description="{
        hasDescription,
        textDescriptionAttrs,
        description
      }">
        <UiText
          v-if="hasDescription"
          v-bind="textDescriptionAttrs"
          class="ui-modal__description"
        >
          {{ description }}
        </UiText>
      </template>
    </UiModal>`,
  }),
};

export const WithoutTitleWithDescriptionSlot = {
  render: (args) => ({
    components: {
      UiModal,
      UiText,
    },
    directives: {
      focusTrap,
      bodyScrollLock,
    },
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
    >
      <template #description="{
        hasDescription,
        textDescriptionAttrs,
        description
      }">
        <UiText
          v-if="hasDescription"
          v-bind="textDescriptionAttrs"
          class="ui-modal__description"
        >
          {{ description }}
        </UiText>
      </template>
    </UiModal>`,
  }),

  args: {
    title: '',
    description: 'Delete this file?',
    translation: {
      confirm: 'Yes, delete',
      cancel: 'Cancel',
    },
  },
};

export const WithActionsSlot = {
  render: (args) => ({
    components: {
      UiModal,
      UiButton,
    },
    directives: {
      focusTrap,
      bodyScrollLock,
    },
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
    >
      <template #actions="{
        hasActions,
        isClosable,
        hasConfirm,
        buttonConfirmAttrs,
        confirmHandler,
        translation,
        hasCancel,
        buttonCancelAttrs,
        cancelHandler,
        iconCloseAttrs,
      }">
        <div
          v-if="hasActions"
          class="ui-modal__actions"
        >
          <template v-if="isClosable">
            <UiButton
              v-if="hasConfirm"
              v-bind="buttonConfirmAttrs"
              class="ui-modal__confirm"
              @click="confirmHandler"
            >
              {{ translation.confirm }}
            </UiButton>
            <UiButton
              v-if="hasCancel"
              v-bind="buttonCancelAttrs"
              class="ui-button--outlined ui-modal__cancel"
              @click="cancelHandler"
            >
              {{ translation.cancel }}
            </UiButton>
          </template>
          <template v-else>
            <UiButton
              v-if="hasCancel"
              v-bind="buttonCancelAttrs"
              class="ui-button--outlined ui-modal__cancel"
              @click="cancelHandler"
            >
              {{ translation.cancel }}
            </UiButton>
            <UiButton
              v-if="hasConfirm"
              v-bind="buttonConfirmAttrs"
              class="ui-modal__confirm ui-modal__confirm--order"
              @click="confirmHandler"
            >
              {{ translation.confirm }}
            </UiButton>
          </template>
        </div>
      </template>
    </UiModal>`,
  }),
};

export const WithConfirmSlot = {
  render: (args) => ({
    components: {
      UiModal,
      UiButton,
    },
    directives: {
      focusTrap,
      bodyScrollLock,
    },
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
    >
      <template #confirm="{
        hasConfirm,
        buttonConfirmAttrs,
        confirmHandler,
        translation,
      }">
        <UiButton
          v-if="hasConfirm"
          v-bind="buttonConfirmAttrs"
          class="ui-modal__confirm"
          @click="confirmHandler"
        >
          {{ translation.confirm }}
        </UiButton>
      </template>
    </UiModal>`,
  }),
};

export const WithCancelSlot = {
  render: (args) => ({
    components: {
      UiModal,
      UiButton,
    },
    directives: {
      focusTrap,
      bodyScrollLock,
    },
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
    >
      <template #cancel="{
        hasCancel,
        buttonCancelAttrs,
        cancelHandler,
        translation,
      }">
        <UiButton
          v-if="hasCancel"
          v-bind="buttonCancelAttrs"
          class="ui-button--outlined ui-modal__cancel"
          @click="cancelHandler"
        >
          {{ translation.cancel }}
        </UiButton>
      </template>
    </UiModal>`,
  }),
};

import UiModal from '@/components/organisms/UiModal/UiModal.vue';
import UiBackdrop from '@/components/atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';
import {
  bodyScrollLock,
  focusTrap,
} from '@/utilities/directives/index';

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
    transitionBackdropAttrs: {
      'data-testid': 'backdrop-transition',
    },
    backdropAttrs: {
      'data-testid': 'backdrop',
    },
    transitionDialogAttrs: {
      'data-testid': 'dialog-transition',
    },
    headingTitleAttrs: {
      'data-testid': 'title-heading',
    },
    textDescriptionAttrs: {
      'data-testid': 'description-text',
    },
    buttonConfirmAttrs: {
      'data-testid': 'confirm',
    },
    buttonCancelAttrs: {
      'data-testid': 'cancel',
    },
    buttonCloseAttrs: {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    },
    iconCloseAttrs: {
      'data-testid': 'close-icon',
    },
    'update:modelValue': null,
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: 'boolean',
    },
    title: {
      description: 'Use this props to set dialog title.',
      table: {
        category: 'props',
      },
      control: 'text',
    },
    titleSlot: {
      name: 'title',
      description: 'Use this slot to replace title template.',
      table: {
        category: 'slots',
        type: {
          summary: 'unknown',
        },
      },
      control: 'object',
    },
    description: {
      description: 'Use this props to set dialog description.',
      table: {
        category: 'props',
        type: {
          summary: 'string',
        },
      },
      control: 'text',
    },
    descriptionSlot: {
      name: 'description',
      description: 'Use this slot to replace description template.',
      table: {
        category: 'slots',
        type: {
          summary: 'unknown',
        },
      },
      control: 'object',
    },
    modelValue: {
      control: false,
    },
  },
  decorators: [() => ({
    template: `<div style="minHeight: 320px">
      <story />
    </div>`,
  })],
  parameters: {
    docs: {
      description: {
        component: 'Modal use `v-body-scroll-lock`. Only works on Canvas mode.',
      },
    },
  },
};

const Template = (args) => ({
  components: {
    UiModal,
    UiButton,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const toggleModal = () => {
      modelValue.value = !modelValue.value;
    };
    return {
      ...args,
      ...events,
      modelValue,
      toggleModal,
    };
  },
  template: `<UiButton 
    class="ui-button--theme-secondary ui-button--text"
    @click='toggleModal'
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :is-closable="isClosable"
    :has-cancel="hasCancel"
    :has-confirm="hasConfirm"
    :translation="translation"
    :transition-backdrop-attrs="translationBackdropAttrs"
    :backdrop-attrs="backdropAttrs"
    :transition-dialog-attrs="transitionDialogAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :button-confirm-attrs="buttonConfirmAttrs"
    :button-cancel-attrs="buttonCancelAttrs"
    :button-close-attrs="buttonCloseAttrs"
    :icon-close-attrs="iconCloseAttrs"
    @update:modelValue="onUpdateModelValue"
    @confirm="onConfirm"
    @cancel="onCancel"
  />`,
});

export const StartNewCheckup = Template.bind({});

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  title: '',
  description: 'Delete this file?',
  translation: {
    confirm: 'Yes, delete',
  },
};

export const WithBackdropSlot = (args) => ({
  components: {
    UiModal,
    UiBackdrop,
    UiButton,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const toggleModal = () => {
      modelValue.value = !modelValue.value;
    };
    return {
      ...args,
      ...events,
      modelValue,
      toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--theme-secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :is-closable="isClosable"
    :has-cancel="hasCancel"
    :has-confirm="hasConfirm"
    :translation="translation"
    :transition-backdrop-attrs="translationBackdropAttrs"
    :backdrop-attrs="backdropAttrs"
    :transition-dialog-attrs="transitionDialogAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :button-confirm-attrs="buttonConfirmAttrs"
    :button-cancel-attrs="buttonCancelAttrs"
    :button-close-attrs="buttonCloseAttrs"
    :icon-close-attrs="iconCloseAttrs"
    @update:modelValue="onUpdateModelValue"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template 
      #backdrop="{
        attrs,
        modelValue,
        backdropAttrs,
        closeHandler, 
      }"
    >
      <transition v-bind="attrs">
        <UiBackdrop
          v-if="modelValue"
          v-bind="UiBackdrop"
          class="ui-modal__backdrop"
          @click="closeHandler"
        />
      </transition>
    </template>
  </UiModal>`,
});

export const WithContainerSlot = (args) => ({
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
    const modelValue = ref(args.initModelValue);
    const toggleModal = () => {
      modelValue.value = !modelValue.value;
    };
    return {
      ...args,
      ...events,
      modelValue,
      toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--theme-secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :is-closable="isClosable"
    :has-cancel="hasCancel"
    :has-confirm="hasConfirm"
    :translation="translation"
    :transition-backdrop-attrs="translationBackdropAttrs"
    :backdrop-attrs="backdropAttrs"
    :transition-dialog-attrs="transitionDialogAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :button-confirm-attrs="buttonConfirmAttrs"
    :button-cancel-attrs="buttonCancelAttrs"
    :button-close-attrs="buttonCloseAttrs"
    :icon-close-attrs="iconCloseAttrs"
    @update:modelValue="onUpdateModelValue"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template
      #container="{
        attrs,
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
      }"
    >
      <transition
        v-bind="attrs"
      >
        <dialog
          v-if="modelValue"
          v-focus-trap
          v-body-scroll-lock
          class="ui-modal__dialog"
          :class="{
            'ui-modal__dialog--has-title': title
          }"
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
});

export const WithHeaderSlot = (args) => ({
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
    const modelValue = ref(args.initModelValue);
    const toggleModal = () => {
      modelValue.value = !modelValue.value;
    };
    return {
      ...args,
      ...events,
      modelValue,
      toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--theme-secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :is-closable="isClosable"
    :has-cancel="hasCancel"
    :has-confirm="hasConfirm"
    :translation="translation"
    :transition-backdrop-attrs="translationBackdropAttrs"
    :backdrop-attrs="backdropAttrs"
    :transition-dialog-attrs="transitionDialogAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :button-confirm-attrs="buttonConfirmAttrs"
    :button-cancel-attrs="buttonCancelAttrs"
    :button-close-attrs="buttonCloseAttrs"
    :icon-close-attrs="iconCloseAttrs"
    @update:modelValue="onUpdateModelValue"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template 
      #header="{
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
      }"
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
    </template>
  </UiModal>`,
});

export const WithTitleSlot = (args) => ({
  components: {
    UiModal,
    UiButton,
    UiHeading,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const toggleModal = () => {
      modelValue.value = !modelValue.value;
    };
    return {
      ...args,
      ...events,
      modelValue,
      toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--theme-secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :is-closable="isClosable"
    :has-cancel="hasCancel"
    :has-confirm="hasConfirm"
    :translation="translation"
    :transition-backdrop-attrs="translationBackdropAttrs"
    :backdrop-attrs="backdropAttrs"
    :transition-dialog-attrs="transitionDialogAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :button-confirm-attrs="buttonConfirmAttrs"
    :button-cancel-attrs="buttonCancelAttrs"
    :button-close-attrs="buttonCloseAttrs"
    :icon-close-attrs="iconCloseAttrs"
    @update:modelValue="onUpdateModelValue"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template 
      #title="{
        titleTag,
        attrs,
        titleText,
        description,
      }"
    >
      <component
        :is="titleTag"
        v-bind="titleAttrs"
        class="ui-modal__title"
      >
        {{ titleText }}
      </component>
    </template>
  </UiModal>`,
});

export const WithCloseSlot = (args) => ({
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
    const modelValue = ref(args.initModelValue);
    const toggleModal = () => {
      modelValue.value = !modelValue.value;
    };
    return {
      ...args,
      ...events,
      modelValue,
      toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--theme-secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :is-closable="isClosable"
    :has-cancel="hasCancel"
    :has-confirm="hasConfirm"
    :translation="translation"
    :transition-backdrop-attrs="translationBackdropAttrs"
    :backdrop-attrs="backdropAttrs"
    :transition-dialog-attrs="transitionDialogAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :button-confirm-attrs="buttonConfirmAttrs"
    :button-cancel-attrs="buttonCancelAttrs"
    :button-close-attrs="buttonCloseAttrs"
    :icon-close-attrs="iconCloseAttrs"
    @update:modelValue="onUpdateModelValue"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template 
      #close="{
        isClosable,
        attrs,
        closeHandler,
        iconCloseAttrs,
      }"
    >
      <UiButton
        v-if="isClosable"
        v-bind="attrs"
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
});

export const WithDescriptionSlot = (args) => ({
  components: {
    UiModal,
    UiButton,
    UiText,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const toggleModal = () => {
      modelValue.value = !modelValue.value;
    };
    return {
      ...args,
      ...events,
      modelValue,
      toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--theme-secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :is-closable="isClosable"
    :has-cancel="hasCancel"
    :has-confirm="hasConfirm"
    :translation="translation"
    :transition-backdrop-attrs="translationBackdropAttrs"
    :backdrop-attrs="backdropAttrs"
    :transition-dialog-attrs="transitionDialogAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :button-confirm-attrs="buttonConfirmAttrs"
    :button-cancel-attrs="buttonCancelAttrs"
    :button-close-attrs="buttonCloseAttrs"
    :icon-close-attrs="iconCloseAttrs"
    @update:modelValue="onUpdateModelValue"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template 
      #description="{ 
        hasDescription,
        attrs,
        description
      }"
    >
      <UiText
        v-if="hasDescription"
        v-bind="attrs"
        class="ui-modal__description"
      >
        {{ description }}
      </UiText>
    </template>
  </UiModal>`,
});

export const WithoutTitleWithDescriptionSlot = WithDescriptionSlot.bind({});
WithoutTitleWithDescriptionSlot.args = {
  title: '',
  description: 'Delete this file?',
  translation: {
    confirm: 'Yes, delete',
    cancel: 'Cancel',
  },
};

export const WithActionsSlot = (args) => ({
  components: {
    UiModal,
    UiButton,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const toggleModal = () => {
      modelValue.value = !modelValue.value;
    };
    return {
      ...args,
      ...events,
      modelValue,
      toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--theme-secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :is-closable="isClosable"
    :has-cancel="hasCancel"
    :has-confirm="hasConfirm"
    :translation="translation"
    :transition-backdrop-attrs="translationBackdropAttrs"
    :backdrop-attrs="backdropAttrs"
    :transition-dialog-attrs="transitionDialogAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :button-confirm-attrs="buttonConfirmAttrs"
    :button-cancel-attrs="buttonCancelAttrs"
    :button-close-attrs="buttonCloseAttrs"
    :icon-close-attrs="iconCloseAttrs"
    @update:modelValue="onUpdateModelValue"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template 
      #actions="{
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
      }"
    >
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
});

export const WithConfirmSlot = (args) => ({
  components: {
    UiModal,
    UiButton,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const toggleModal = () => {
      modelValue.value = !modelValue.value;
    };
    return {
      ...args,
      ...events,
      modelValue,
      toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--theme-secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :is-closable="isClosable"
    :has-cancel="hasCancel"
    :has-confirm="hasConfirm"
    :translation="translation"
    :transition-backdrop-attrs="translationBackdropAttrs"
    :backdrop-attrs="backdropAttrs"
    :transition-dialog-attrs="transitionDialogAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :button-confirm-attrs="buttonConfirmAttrs"
    :button-cancel-attrs="buttonCancelAttrs"
    :button-close-attrs="buttonCloseAttrs"
    :icon-close-attrs="iconCloseAttrs"
    @update:modelValue="onUpdateModelValue"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template
      #confirm="{ 
        hasConfirm,
        attrs,
        confirmHandler,
        translation,
      }"
    >
      <UiButton
        v-if="hasConfirm"
        v-bind="attrs"
        class="ui-modal__confirm"
        @click="confirmHandler"
      >
        {{ translation.confirm }}
      </UiButton>
    </template>
  </UiModal>`,
});

export const WithCancelSlot = (args) => ({
  components: {
    UiModal,
    UiButton,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const toggleModal = () => {
      modelValue.value = !modelValue.value;
    };
    return {
      ...args,
      ...events,
      modelValue,
      toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--theme-secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :is-closable="isClosable"
    :has-cancel="hasCancel"
    :has-confirm="hasConfirm"
    :translation="translation"
    :transition-backdrop-attrs="translationBackdropAttrs"
    :backdrop-attrs="backdropAttrs"
    :transition-dialog-attrs="transitionDialogAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :button-confirm-attrs="buttonConfirmAttrs"
    :button-cancel-attrs="buttonCancelAttrs"
    :button-close-attrs="buttonCloseAttrs"
    :icon-close-attrs="iconCloseAttrs"
    @update:modelValue="onUpdateModelValue"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template 
      #cancel="{
        hasCancel,
        attrs,
        cancelHandler,
        translation,
      }"
    >
      <UiButton
        v-if="hasCancel"
        v-bind="attrs"
        class="ui-button--outlined ui-modal__cancel"
        @click="cancelHandler"
      >
        {{ translation.cancel }}
      </UiButton>
    </template>
  </UiModal>`,
});

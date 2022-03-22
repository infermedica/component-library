import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';
import UiModal from './UiModal.vue';
import UiBackdrop from '../../atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import { bodyScrollLock, focusTrap } from '../../../utilities/directives/index.js';

const events = actions({
  onConfirm: 'confirm',
  onCancel: 'cancel',
});

export default {
  title: 'Organisms/Modal',
  component: UiModal,
  args: {
    modelValue: true,
    title: 'Start new checkup?',
    description: 'You will have to answear the question again.',
    translation: { confirm: 'Yes, start new checkup', cancel: 'Cancel' },
    isClosable: true,
    hasConfirm: true,
    hasCancel: true,
    buttonCancelAttrs: {
      id: 'cancel',
      'aria-label': 'Cancel',
    },
    buttonConfirmAttrs: {
      id: 'confirm',
      'aria-label': 'Yes, start new checkup',
    },
    buttonCloseAttrs: {
      id: 'close',
      'aria-label': 'close panel',
    },
  },
  argTypes: {
    modelValue: { control: { type: 'boolean' } },
    title: {
      description: 'Use this props to set dialog title.',
      control: { type: 'text' },
      table: {
        category: 'props',
      },
    },
    description: {
      description: 'Use this props to set dialog description.',
      control: { type: 'text' },
      table: {
        category: 'props',
      },
    },
  },
  decorators: [() => ({ template: '<div style="--backdrop-position: absolute; --modal-position: absolute; minHeight: 350px"><story /></div>' })],
  parameters: {
    cssprops: {
      'modal-position': {
        value: 'fixed',
        control: 'text',
        description: '',
      },
      'modal-z-index': {
        value: '1000',
        control: 'text',
        description: '',
      },
      'modal-max-width': {
        value: '320px',
        control: 'text',
        description: '',
      },
      'modal-margin': {
        value: '20px',
        control: 'text',
        description: '',
      },
      'modal-background': {
        value: 'var(--color-background-white)',
        control: 'text',
        description: '',
      },
      'modal-box-shadow': {
        value: 'var(--box-shadow-high)',
        control: 'text',
        description: '',
      },
      'modal-padding': {
        value: 'var(--space-24)',
        control: 'text',
        description: '',
      },
      'modal-title-margin': {
        value: '0 0 var(--space-24) 0',
        control: 'text',
        description: '',
      },
      'modal-close-icon-size': {
        value: '14px',
        control: 'text',
        description: '',
      },
      'modal-close-margin': {
        value: '5px 5px 5px 17px',
        control: 'text',
        description: '',
      },
      'modal-action-margin': {
        value: 'var(--space-32) 0 0',
        control: 'text',
        description: '',
      },
      'modal-confirm-margin': {
        value: '0 0 var(--space-12)',
        control: 'text',
        description: '',
      },
      'modal-confirm-tablet-margin': {
        value: '0 0 0 var(--space-12)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiButton, UiModal },
  setup() {
    const { modelValue } = args;
    const refModelValue = ref(modelValue);
    const toggleModal = () => {
      refModelValue.value = !refModelValue.value;
    };
    return {
      ...args, events, refModelValue, toggleModal,
    };
  },
  template: `<UiButton 
    class="ui-button--secondary ui-button--text"
    @click='toggleModal'
  >
    Show modal
  </UiButton>
  <UiModal
    v-bind="{...events}"
    v-model="refModelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
  />`,
});

export const StartNewCheckup = Template.bind({});

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  title: '',
  description: 'Delete this file?',
  translation: { confirm: 'Yes, delete', cancel: 'Cancel' },
};

export const WithBackdropSlot = (args) => ({
  components: {
    UiBackdrop, UiButton, UiModal,
  },
  setup() {
    const { modelValue } = args;
    const refModelValue = ref(modelValue);
    const toggleModal = () => {
      refModelValue.value = !refModelValue.value;
    };
    return {
      ...args, events, refModelValue, toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-bind="{...events}"
    v-model="refModelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
  >
    <template #backdrop="{closeHandler, modelValue}">
      <transition name="fade">
        <UiBackdrop
          v-if="modelValue"
          @click="closeHandler"
        />
      </transition>
    </template>
  </UiModal>`,
});

export const WithContainerSlot = (args) => ({
  components: {
    UiModal, UiButton, UiText, UiHeading, UiIcon,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const { modelValue } = args;
    const refModelValue = ref(modelValue);
    const toggleModal = () => {
      refModelValue.value = !refModelValue.value;
    };
    return {
      ...args, events, refModelValue, toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-bind="{...events}"
    v-model="refModelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
  >
    <template #container="{ confirmHandler, cancelHandler, closeHandler, isClosable, modelValue}">
      <transition
        name="fade"
      >
        <dialog
          v-if="modelValue"
          v-focus-trap
          v-body-scroll-lock
          class="ui-modal__dialog"
          :class="{'ui-modal__dialog--has-title': title}"
        >
          <div
            class="ui-modal__header"
          >
            <UiHeading
              class="ui-modal__title"
            >
              {{ title }}
            </UiHeading>
            <UiButton
              class="ui-button--has-icon ui-button--secondary ui-button--text ui-modal__close"
              v-bind="{ buttonCloseAttrs }"
              @click="closeHandler()"
            >
              <UiIcon icon="close" />
            </UiButton>
          </div>
          <UiText
            class="ui-modal__description"
          >
            {{ description }}
          </UiText>
          <div
            class="ui-modal__actions"
          >
            <template v-if="isClosable">
              <UiButton
                v-if="hasConfirm"
                class="ui-modal__confirm"
                v-bind="buttonConfirmAttrs"
                @click="confirmHandler"
              >
                {{ translation.confirm }}
              </UiButton>
              <UiButton
                v-if="hasCancel"
                class="ui-button--outlined ui-modal__cancel"
                v-bind="buttonCancelAttrs"
                @click="cancelHandler"
              >
                {{ translation.cancel }}
              </UiButton>
            </template>
            <template v-else>
              <UiButton
                v-if="hasCancel"
                class="ui-button--outlined ui-modal__cancel"
                v-bind="buttonCancelAttrs"
                @click="cancelHandler"
              >
                {{ translation.cancel }}
              </UiButton>
              <UiButton
                v-if="hasConfirm"
                class="ui-modal__confirm ui-modal__confirm--order"
                v-bind="buttonConfirmAttrs"
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
    UiModal, UiButton, UiText, UiHeading, UiIcon,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const { modelValue } = args;
    const refModelValue = ref(modelValue);
    const toggleModal = () => {
      refModelValue.value = !refModelValue.value;
    };
    return {
      ...args, events, refModelValue, toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-bind="{...events}"
    v-model="refModelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
  >
    <template
      #header="{ closeHandler, description, hasDescription, hasHeader, isClosable, titleTag, titleText }"
    >
      <div
        v-if="hasHeader"
        class="ui-modal__header"
      >
        <UiHeading
          class="ui-modal__title"
        >
          {{ title }}
        </UiHeading>
        <UiButton
          v-if="isClosable"
          class="ui-button--has-icon ui-button--secondary ui-button--text ui-modal__close"
          v-bind="buttonCloseAttrs"
          @click="closeHandler()"
        >
          <UiIcon icon="close" />
        </UiButton>
      </div>

      <UiText
        v-if="hasDescription"
        class="ui-modal__description"
      >
        {{ description }}
      </UiText>
    </template>
  </UiModal>`,
});

export const WithTitleSlot = (args) => ({
  components: {
    UiModal, UiButton, UiHeading,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const { modelValue } = args;
    const refModelValue = ref(modelValue);
    const toggleModal = () => {
      refModelValue.value = !refModelValue.value;
    };
    return {
      ...args, events, refModelValue, toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-bind="{...events}"
    v-model="refModelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
  >
    <template #title>
      <UiHeading
        class="ui-modal__title"
      >
        {{ title }}
      </UiHeading>
    </template>
  </UiModal>`,
});

export const WithCloseSlot = (args) => ({
  components: {
    UiModal, UiButton, UiIcon,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const { modelValue } = args;
    const refModelValue = ref(modelValue);
    const toggleModal = () => {
      refModelValue.value = !refModelValue.value;
    };
    return {
      ...args, events, refModelValue, toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-bind="{...events}"
    v-model="refModelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
  >
    <template #close="{ closeHandler, isClosable}">
      <UiButton
        v-if="isClosable"
        class="ui-button--has-icon ui-button--secondary ui-button--text ui-modal__close"
        v-bind="buttonCloseAttrs"
        @click="closeHandler()"
      >
        <UiIcon icon="close" />
      </UiButton>
    </template>
  </UiModal>`,
});

export const WithDescriptionSlot = (args) => ({
  components: {
    UiModal, UiButton, UiText,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const { modelValue } = args;
    const refModelValue = ref(modelValue);
    const toggleModal = () => {
      refModelValue.value = !refModelValue.value;
    };
    return {
      ...args, events, refModelValue, toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-bind="{...events}"
    v-model="refModelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
  >
    <template #description="{ hasDescription, description }">
      <UiText
        v-if="hasDescription"
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
  translation: { confirm: 'Yes, delete', cancel: 'Cancel' },
};

export const WithActionsSlot = (args) => ({
  components: {
    UiModal, UiButton,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const { modelValue } = args;
    const refModelValue = ref(modelValue);
    const toggleModal = () => {
      refModelValue.value = !refModelValue.value;
    };
    return {
      ...args, events, refModelValue, toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-bind="{...events}"
    v-model="refModelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
  >
    <template #actions="{ confirmHandler, cancelHandler, hasActions, hasCancel, hasConfirm, isClosable, translation }">
      <div
        v-if="hasActions"
        class="ui-modal__actions"
      >
        <template v-if="isClosable">
          <UiButton
            v-if="hasConfirm"
            class="ui-modal__confirm"
            v-bind="buttonConfirmAttrs"
            @click="confirmHandler"
          >
            {{ translation.confirm }}
          </UiButton>
          <UiButton
            v-if="hasCancel"
            class="ui-button--outlined ui-modal__cancel"
            v-bind="buttonCancelAttrs"
            @click="cancelHandler"
          >
            {{ translation.cancel }}
          </UiButton>
        </template>
        <template v-else>
          <UiButton
            v-if="hasCancel"
            class="ui-button--outlined ui-modal__cancel"
            v-bind="buttonCancelAttrs"
            @click="cancelHandler"
          >
            {{ translation.cancel }}
          </UiButton>
          <UiButton
            v-if="hasConfirm"
            class="ui-modal__confirm ui-modal__confirm--order"
            v-bind="buttonConfirmAttrs"
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
    UiModal, UiButton,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const { modelValue } = args;
    const refModelValue = ref(modelValue);
    const toggleModal = () => {
      refModelValue.value = !refModelValue.value;
    };
    return {
      ...args, events, refModelValue, toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-bind="{...events}"
    v-model="refModelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
  >
    <template #confirm="{ confirmHandler, hasConfirm, translation }">
      <UiButton
        v-if="hasConfirm"
        class="ui-modal__confirm"
        v-bind="buttonConfirmAttrs"
        @click="confirmHandler('confirm')"
      >
        {{ translation.confirm }}
      </UiButton>
    </template>
  </UiModal>`,
});

export const WithCancelSlot = (args) => ({
  components: {
    UiModal, UiButton,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const { modelValue } = args;
    const refModelValue = ref(modelValue);
    const toggleModal = () => {
      refModelValue.value = !refModelValue.value;
    };
    return {
      ...args, events, refModelValue, toggleModal,
    };
  },
  template: `<UiButton
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-bind="{...events}"
    v-model="refModelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
  >
    <template #cancel="{ cancelHandler, hasCancel, translation, }">
      <UiButton
        v-if="hasCancel"
        class="ui-button--outlined ui-modal__cancel"
        v-bind="buttonCancelAttrs"
        @click="cancelHandler"
      >
        {{ translation.cancel }}
      </UiButton>
    </template>
  </UiModal>`,
});

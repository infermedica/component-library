import { actions } from '@storybook/addon-actions';
import { ref } from 'vue';
import UiModal from '@/components/organisms/UiModal/UiModal.vue';
import UiBackdrop from '@/components/atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { bodyScrollLock, focusTrap } from '@/utilities/directives/index';
import './UiModal.stories.scss';

const events = actions({
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
    buttonConfirmAttrs: {
      id: 'confirm',
      'aria-label': 'yes, start new checkup',
    },
    buttonCancelAttrs: {
      id: 'cancel',
      'aria-label': 'cancel',
    },
    buttonCloseAttrs: {
      id: 'close',
      'aria-label': 'close panel',
    },
    isClosable: true,
    hasCancel: true,
    hasConfirm: true,
    translation: {
      confirm: 'Yes, start new checkup',
      cancel: 'Cancel',
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
    modelValue: { control: false },
  },
  decorators: [() => ({ template: '<div style="minHeight: 320px"><story /></div>' })],
  parameters: {
    docs: {
      description: {
        component: 'Modal use `v-body-scroll-lock`. Only works on Canvas mode.',
      },
    },
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
        value: '480px',
        control: 'text',
        description: '',
      },
      'modal-padding': {
        value: 'var(--space-24)',
        control: 'text',
        description: '',
      },
      'modal-border': {
        value: 'none',
        control: 'text',
        description: '',
      },
      'modal-background': {
        value: 'var(--color-background-white)',
        control: 'text',
        description: '',
      },
      'modal-border-radius': {
        value: 'var(--border-radius-container)',
        control: 'text',
        description: '',
      },
      'modal-box-shadow': {
        value: 'var(--box-shadow-high)',
        control: 'text',
        description: '',
      },
      'modal-title-margin': {
        value: '0 0 var(--space-12) 0',
        control: 'text',
        description: '',
      },
      'modal-close-icon-size': {
        value: '14px',
        control: 'text',
        description: '',
      },
      'modal-close-margin': {
        value: '5px 17px 5px 5px',
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
        value: '0 var(--space-12) 0 0',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiButton, UiModal },
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
    class="ui-button--secondary ui-button--text"
    @click='toggleModal'
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
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
    cancel: 'Cancel',
  },
};
WithoutTitle.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/54rgvRJfBBagt4F34rrp1s/Core-Component-Library?node-id=1085%3A44053',
  },
};

export const WithBackdropSlot = (args) => ({
  components: { UiBackdrop, UiButton, UiModal },
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
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
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
    @confirm="onConfirm"
    @cancel="onCancel"
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
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
    @confirm="onConfirm"
    @cancel="onCancel"
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
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
    @confirm="onConfirm"
    @cancel="onCancel"
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
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
    @confirm="onConfirm"
    @cancel="onCancel"
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
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modalValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
    @confirm="onConfirm"
    @cancel="onCancel"
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
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
    @confirm="onConfirm"
    @cancel="onCancel"
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
  translation: {
    confirm: 'Yes, delete',
    cancel: 'Cancel',
  },
};
WithoutTitleWithDescriptionSlot.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/54rgvRJfBBagt4F34rrp1s/Core-Component-Library?node-id=1085%3A44053',
  },
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
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
    @confirm="onConfirm"
    @cancel="onCancel"
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
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
    @confirm="onConfirm"
    @cancel="onCancel"
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
    class="ui-button--secondary ui-button--text"
    @click="toggleModal"
  >
    Show modal
  </UiButton>
  <UiModal
    v-model="modelValue"
    :title='title'
    :description='description'
    :translation="translation"
    :isClosable="isClosable"
    :hasConfirm="hasConfirm"
    :hasCancel="hasCancel"
    :buttonConfirmAttrs="buttonConfirmAttrs"
    :buttonCancelAttrs="buttonCancelAttrs"
    :buttonCloseAttrs="buttonCloseAttrs"
    @confirm="onConfirm"
    @cancel="onCancel"
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

<template>
  <div
    class="ui-modal"
  >
    <!-- @slot Use this slot to replace backdrop template. -->
    <slot
      name="backdrop"
      v-bind="{
        transitionBackdropAttrs: defaultProps.transitionBackdropAttrs,
        modelValue,
        backdropAttrs,
        closeHandler,
      }"
    >
      <Transition
        v-bind="defaultProps.transitionBackdropAttrs"
      >
        <UiBackdrop
          v-if="modelValue"
          v-bind="backdropAttrs"
          class="ui-modal__backdrop"
          @click="closeHandler"
        />
      </Transition>
    </slot>
    <!-- @slot Use this slot to replace container template. -->
    <slot
      name="container"
      v-bind="{
        transitionDialogAttrs: defaultProps.transitionDialogAttrs,
        modelValue,
        dialogAttrs,
        title,
        hasHeader,
        titleSlotName,
        titleTag,
        titleAttrs,
        titleText,
        content,
        buttonCloseAttrs,
        confirmHandler,
        cancelHandler,
        closeHandler,
        iconCloseAttrs,
        hasContent,
        textContentAttrs,
        isClosable,
        hasActions,
        hasConfirm,
        buttonConfirmAttrs,
        translation,
        hasCancel,
        buttonCancelAttrs,
      }"
    >
      <Transition
        v-bind="defaultProps.transitionDialogAttrs"
      >
        <dialog
          v-if="modelValue"
          ref="dialog"
          v-focus-trap
          v-body-scroll-lock
          v-bind="dialogAttrs"
          :class="[
            'ui-modal__dialog',
            { 'ui-modal__dialog--has-title': title },
          ]"
        >
          <!-- @slot Use this slot to replace header template. -->
          <slot
            name="header"
            v-bind="{
              hasHeader,
              titleSlotName,
              titleTag,
              titleAttrs,
              titleText,
              content,
              isClosable,
              buttonCloseAttrs,
              closeHandler,
              iconCloseAttrs: defaultProps.iconCloseAttrs,
              title,
              hasContent,
              textContentAttrs,
            }"
          >
            <div
              v-if="hasHeader"
              class="ui-modal__header"
            >
              <!-- @slot Use this slot to replace title template. -->
              <slot
                :name="titleSlotName"
                v-bind="{
                  titleTag,
                  titleAttrs: titleAttrs,
                  titleText,
                  content,
                }"
              >
                <component
                  :is="titleTag"
                  v-bind="titleAttrs"
                  class="ui-modal__title"
                >
                  {{ titleText }}
                </component>
              </slot>
              <!-- @slot Use this slot to replace close template. -->
              <slot
                name="close"
                v-bind="{
                  isClosable,
                  buttonCloseAttrs,
                  closeHandler,
                  iconCloseAttrs: defaultProps.iconCloseAttrs,
                }"
              >
                <UiButton
                  v-if="isClosable"
                  v-bind="buttonCloseAttrs"
                  ref="button"
                  class="ui-button--theme-secondary ui-button--icon ui-modal__close"
                  @click="closeHandler"
                >
                  <slot
                    name="icon"
                    v-bind="{ iconCloseAttrs: defaultProps.iconCloseAttrs }"
                  >
                    <UiIcon
                      v-bind="defaultProps.iconCloseAttrs"
                      class="ui-button__icon"
                    />
                  </slot>
                </UiButton>
              </slot>
            </div>
            <!-- @slot Use this slot to replace content template. -->
            <slot
              name="content"
              v-bind="{
                hasContent,
                textContentAttrs,
                content,
              }"
            >
              <UiText
                v-if="hasContent"
                v-bind="textContentAttrs"
                class="ui-modal__content"
              >
                {{ content }}
              </UiText>
            </slot>
          </slot>
          <slot
            name="actions"
            v-bind="{
              hasActions,
              isClosable,
              hasConfirm,
              buttonConfirmAttrs,
              confirmHandler,
              translation: defaultProps.translation,
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
                <!-- @slot Use this slot to replace confirm button template. -->
                <slot
                  name="confirm"
                  v-bind="{
                    hasConfirm,
                    buttonConfirmAttrs,
                    confirmHandler,
                    translation: defaultProps.translation,
                  }"
                >
                  <UiButton
                    v-if="hasConfirm"
                    v-bind="buttonConfirmAttrs"
                    class="ui-modal__confirm"
                    @click="confirmHandler"
                  >
                    {{ defaultProps.translation!.confirm }}
                  </UiButton>
                </slot>
              </template>
              <template v-else>
                <!-- @slot Use this slot to replace confirm button template. -->
                <slot
                  name="confirm"
                  v-bind="{
                    hasConfirm,
                    attrs: buttonConfirmAttrs,
                    confirmHandler,
                    translation: defaultProps.translation,
                  }"
                >
                  <UiButton
                    v-if="hasConfirm"
                    v-bind="buttonConfirmAttrs"
                    class="ui-modal__confirm ui-modal__confirm--order"
                    @click="confirmHandler"
                  >
                    {{ defaultProps.translation!.confirm }}
                  </UiButton>
                </slot>
                <!-- @slot Use this slot to replace cancel button template. -->
                <slot
                  name="cancel"
                  v-bind="{
                    hasCancel,
                    attrs: buttonCancelAttrs,
                    cancelHandler,
                    translation: defaultProps.translation,
                  }"
                >
                  <UiButton
                    v-if="hasCancel"
                    v-bind="buttonCancelAttrs"
                    ref="button"
                    class="ui-button--outlined ui-modal__cancel"
                    @click="cancelHandler"
                  >
                    {{ defaultProps.translation!.cancel }}
                  </UiButton>
                </slot>
              </template>
            </div>
          </slot>
        </dialog>
      </Transition>
    </slot>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onBeforeUnmount,
  onMounted,
  type DialogHTMLAttributes,
  type TransitionProps,
} from 'vue';
import {
  bodyScrollLock as vBodyScrollLock,
  focusTrap as vFocusTrap,
} from '../../../utilities/directives';
import UiBackdrop from '../../atoms/UiBackdrop/UiBackdrop.vue';
import type { BackdropAttrsProps } from '../../atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../atoms/UiButton/UiButton.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import type {
  HeadingProps,
  HeadingAttrsProps,
} from '../../atoms/UiHeading/UiHeading.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { TextAttrsProps } from '../../atoms/UiText/UiText.vue';
import type {
  DefineAttrsProps,
  Icon,
} from '../../../types';

export interface ModalTranslation {
  confirm?: string;
  cancel?: string;
}
export interface ModalProps {
  /**
   * Use this props to set dialog visibility.
   */
  modelValue?: boolean;
  /**
   * Use this props to set dialog title.
   */
  title?: string;
  /**
   * Use this props to set dialog content.
   */
  content?: string;
  /**
   * Use this props to hide close icon.
   */
  isClosable?: boolean;
  /**
   * Use this props to hide cancel UiButton.
   */
  hasCancel?: boolean;
  /**
   * Use this props to hide confirm UiButton.
   */
  hasConfirm?: boolean;
  /**
   * Use this props to override labels inside component translation.
   */
  translation?: ModalTranslation;
  /**
   * Use this props to pass attrs for backdrop Transition
   */
  transitionBackdropAttrs?: TransitionProps;
  /**
   * Use this props to pass attrs for UiBackdrop
   */
  backdropAttrs?: BackdropAttrsProps;
  /**
   * Use this props to pass attrs for dialog element
   */
  dialogAttrs?: DefineAttrsProps<null, DialogHTMLAttributes>;
  /**
   * Use this props to pass attrs for dialog Transition
   */
  transitionDialogAttrs?: TransitionProps;
  /**
   * Use this props to pass attrs for title UiHeading
   */
  headingTitleAttrs?: HeadingAttrsProps;
  /**
   * Use this props to pass attrs for content UiText
   */
  textContentAttrs?: TextAttrsProps;
  /**
   * Use this props to pass attrs for confirm UiButton.
   */
  buttonConfirmAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for cancel UiButton.
   */
  buttonCancelAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for close UiButton.
   */
  buttonCloseAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for close UiIcon
   */
  iconCloseAttrs?: IconAttrsProps;
  /**
   * Use this props to hide content in dialog.
   */
  // hasContent?: boolean;
}
export type ModalAttrsProps = DefineAttrsProps<ModalProps>;
export interface ModalEmits {
  (e: 'cancel'): void;
  (e:'confirm'): void;
  (e:'update:modelValue', value: boolean): void;
}
const props = withDefaults(defineProps<ModalProps>(), {
  modelValue: false,
  title: '',
  content: '',
  isClosable: true,
  hasCancel: true,
  hasConfirm: true,
  translation: () => ({
    confirm: 'Ok',
    cancel: 'Cancel',
  }),
  transitionBackdropAttrs: () => ({
    appear: true,
    name: 'fade',
  }),
  backdropAttrs: () => ({}),
  dialogAttrs: () => ({}),
  transitionDialogAttrs: () => ({
    appear: true,
    name: 'fade',
  }),
  headingTitleAttrs: () => ({ level: 2 }),
  textContentAttrs: () => ({}),
  buttonConfirmAttrs: () => ({}),
  buttonCancelAttrs: () => ({}),
  buttonCloseAttrs: () => ({}),
  iconCloseAttrs: () => ({ icon: 'close' }),
  hasContent: false,
});

const dialog = ref<HTMLDialogElement | null>(null);
const button = ref<InstanceType<typeof UiButton>|null>(null);
const defaultProps = computed(() => {
  const icon: Icon = 'close';
  const level: HeadingProps['level'] = 2;
  return {
    translation: {
      confirm: 'Ok',
      cancel: 'Cancel',
      ...props.translation,
    },
    iconCloseAttrs: {
      icon,
      ...props.iconCloseAttrs,
    },
    headingTitleAttrs: {
      level,
      ...props.headingTitleAttrs,
    },
    transitionBackdropAttrs: {
      appear: true,
      name: 'fade',
      ...props.transitionBackdropAttrs,
    },
    transitionDialogAttrs: {
      appear: true,
      name: 'fade',
      ...props.transitionDialogAttrs,
    },
  };
});
const emit = defineEmits<ModalEmits>();
const hasActions = computed(() => props.hasCancel || props.hasConfirm);
const hasContent = computed(() => !!(props.title && props.content));
const hasHeader = computed(() => !!(props.title || props.content || props.isClosable));
const titleSlotName = computed(() => (props.title ? 'title' : 'content'));
const titleTag = computed(() => (props.title
  ? UiHeading
  : UiText));
const titleText = computed(() => props.title || props.content);
const titleAttrs = computed(() => (props.title
  ? defaultProps.value.headingTitleAttrs
  : props.textContentAttrs));
const closeHandler = () => {
  if (!props.isClosable) return;
  emit('update:modelValue', false);
};
const keydownHandler = ({ key }: KeyboardEvent) => {
  if (key !== 'Escape') return;
  closeHandler();
};
const confirmHandler = () => {
  emit('confirm');
};
const cancelHandler = () => {
  emit('cancel');
  emit('update:modelValue', false);
};

onMounted(() => {
  if (!props.isClosable) return;
  window.addEventListener('keydown', keydownHandler);
});

onBeforeUnmount(() => {
  if (!props.isClosable) return;
  window.removeEventListener('keydown', keydownHandler);
});
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";
@use "../../../styles/transitions";

.ui-modal {
  $this: &;
  $element: modal;

  position: absolute;
  z-index: 1;

  &__dialog {
    @include mixins.use-logical($element, padding, var(--space-24));
    @include mixins.use-logical($element, margin, 0);
    @include mixins.use-logical($element, border-radius, var(--border-radius-container));

    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    display: flex;
    width: calc(100% - functions.var($element, padding-horizontal, var(--space-20)));
    max-width: functions.var($element, max-width, 30rem);
    flex-direction: column;
    border: none;
    background: functions.var($element, background, var(--color-background-white));
    box-shadow: functions.var($element, box-shadow, var(--box-shadow-high));
    transform: translate(-50%, -50%);

    [dir="rtl"] & {
      right: 50%;
      left: auto;
      transform: translate(50%, -50%);
    }

    @include mixins.from-tablet {
      width: calc(100% - functions.var($element, padding-horizontal, var(--space-64)));
    }

    &--has-title {
      max-width: functions.var($element, max-width, 40rem);
    }
  }

  &__header {
    display: flex;
    align-items: flex-start;
  }

  &__title {
    @include mixins.use-logical($element + "-title", margin, 0 0 var(--space-12) 0);

    flex: 1;
  }

  &__content {
    flex: 1;
  }

  &__actions {
    @include mixins.use-logical($element + "-actions", margin, var(--space-32) 0 0 0);

    display: flex;
    flex-direction: column;

    @include mixins.from-tablet {
      justify-content: flex-end;
      display: grid;
      grid-template-areas: "cancel confirm";
    }
  }

  &__confirm {
    @include mixins.use-logical($element + "-confirm", margin, 0 0 var(--space-12) 0);

    grid-area: confirm;

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-confirm", margin, 0 0 0 var(--space-12));
    }
  }

  &__cancel {
    @include mixins.from-tablet {
      grid-area: cancel;
    }
  }
}
</style>

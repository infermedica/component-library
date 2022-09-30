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
        closeHandler
      }"
    >
      <transition
        v-bind="defaultProps.transitionBackdropAttrs"
      >
        <UiBackdrop
          v-if="modelValue"
          v-bind="backdropAttrs"
          class="ui-modal__backdrop"
          @click="closeHandler"
        />
      </transition>
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
        v-bind="defaultProps.transitionDialogAttrs"
      >
        <dialog
          v-if="modelValue"
          v-focus-trap
          v-body-scroll-lock
          v-bind="dialogAttrs"
          class="ui-modal__dialog"
          :class="{
            'ui-modal__dialog--has-title': title
          }"
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
              description,
              isClosable,
              buttonCloseAttrs,
              closeHandler,
              iconCloseAttrs: defaultProps.iconCloseAttrs,
              title,
              hasDescription,
              textDescriptionAttrs,
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
              </slot>
              <!-- @slot Use this slot to replace close template. -->
              <slot
                name="close"
                v-bind="{
                  isClosable,
                  buttonCloseAttrs,
                  closeHandler,
                  iconCloseAttrs: defaultProps.iconCloseAttrs
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
                    v-bind="{
                      iconCloseAttrs: defaultProps.iconCloseAttrs
                    }"
                  >
                    <UiIcon
                      v-bind="defaultProps.iconCloseAttrs"
                      class="ui-button__icon"
                    />
                  </slot>
                </UiButton>
              </slot>
            </div>
            <!-- @slot Use this slot to replace description template. -->
            <slot
              v-if="title"
              name="description"
              v-bind="{
                hasDescription,
                textDescriptionAttrs,
                description
              }"
            >
              <UiText
                v-if="hasDescription"
                v-bind="textDescriptionAttrs"
                class="ui-modal__description"
              >
                {{ description }}
              </UiText>
            </slot>
          </slot>
          <!-- @slot Use this slot to replace actions template. -->
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
                    translation: defaultProps.translation
                  }"
                >
                  <UiButton
                    v-if="hasConfirm"
                    v-bind="buttonConfirmAttrs"
                    class="ui-modal__confirm"
                    @click="confirmHandler"
                  >
                    {{ defaultProps.translation.confirm }}
                  </UiButton>
                </slot>
                <!-- @slot Use this slot to replace cancel button template. -->
                <slot
                  name="cancel"
                  v-bind="{
                    hasCancel,
                    buttonCancelAttrs,
                    cancelHandler,
                    translation: defaultProps.translation
                  }"
                >
                  <UiButton
                    v-if="hasCancel"
                    v-bind="buttonCancelAttrs"
                    class="ui-button--outlined ui-modal__cancel"
                    @click="cancelHandler"
                  >
                    {{ defaultProps.translation.cancel }}
                  </UiButton>
                </slot>
              </template>
              <template v-else>
                <!-- @slot Use this slot to replace cancel button template. -->
                <slot
                  name="cancel"
                  v-bind="{
                    hasCancel,
                    attrs: buttonCancelAttrs,
                    cancelHandler,
                    translation: defaultProps.translation
                  }"
                >
                  <UiButton
                    v-if="hasCancel"
                    v-bind="buttonCancelAttrs"
                    ref="button"
                    class="ui-button--outlined ui-modal__cancel"
                    @click="cancelHandler"
                  >
                    {{ defaultProps.translation.cancel }}
                  </UiButton>
                </slot>
                <!-- @slot Use this slot to replace confirm button template. -->
                <slot
                  name="confirm"
                  v-bind="{
                    hasConfirm,
                    attrs: buttonConfirmAttrs,
                    confirmHandler,
                    translation: defaultProps.translation
                  }"
                >
                  <UiButton
                    v-if="hasConfirm"
                    v-bind="buttonConfirmAttrs"
                    class="ui-modal__confirm ui-modal__confirm--order"
                    @click="confirmHandler"
                  >
                    {{ defaultProps.translation.confirm }}
                  </UiButton>
                </slot>
              </template>
            </div>
          </slot>
        </dialog>
      </transition>
    </slot>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
} from 'vue';
import type { PropType } from 'vue';
import type { PropsAttrs } from '../../../types/attrs';
import {
  bodyScrollLock as vBodyScrollLock,
  focusTrap as vFocusTrap,
} from '../../../utilities/directives';
import { focusElement } from '../../../utilities/helpers/index.ts';
import UiBackdrop from '../../atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../atoms/UiText/UiText.vue';

export interface ModalTranslation {
  confirm: string;
  cancel: string;
  [key: string]: string;
}
const props = defineProps({
  /**
   * Use this props to set dialog visibility.
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * Use this props to set dialog title.
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set dialog description.
   */
  description: {
    type: String,
    default: '',
  },
  /**
   * Use this props to hide close icon.
   */
  isClosable: {
    type: Boolean,
    default: true,
  },
  /**
   * Use this props to hide cancel UiButton.
   */
  hasCancel: {
    type: Boolean,
    default: true,
  },
  /**
   * Use this props to hide confirm UiButton.
   */
  hasConfirm: {
    type: Boolean,
    default: true,
  },
  /**
   * Use this props to override labels inside component translation.
   */
  translation: {
    type: Object as PropType<ModalTranslation>,
    default: () => ({
      confirm: 'Ok',
      cancel: 'Cancel',
    }),
  },
  /**
   * Use this props to pass attrs for backdrop Transition
   */
  transitionBackdropAttrs: {
    type: Object,
    default: () => ({
      appear: true,
      name: 'fade',
    }),
  },
  /**
   * Use this props to pass attrs for UiBackdrop
   */
  backdropAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for dialog element
   */
  dialogAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for dialog Transition
   */
  transitionDialogAttrs: {
    type: Object,
    default: () => ({
      appear: true,
      name: 'fade',
    }),
  },
  /**
   * Use this props to pass attrs for title UiHeading
   */
  headingTitleAttrs: {
    type: Object,
    default: () => ({ level: 2 }),
  },
  /**
   * Use this props to pass attrs for description UiText
   */
  textDescriptionAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for confirm UiButton.
   */
  buttonConfirmAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for cancel UiButton.
   */
  buttonCancelAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for close UiButton.
   */
  buttonCloseAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for close UiIcon
   */
  iconCloseAttrs: {
    type: Object as PropsAttrs,
    default: () => ({ icon: 'close' }),
  },
});
const button = ref<InstanceType<typeof UiButton>|null>(null);
async function enterHandler() {
  await nextTick();
  focusElement(button.value?.$el, true);
}
const defaultProps = computed(() => ({
  translation: {
    confirm: 'Ok',
    cancel: 'Cancel',
    ...props.translation,
  },
  iconCloseAttrs: {
    icon: 'close',
    ...props.iconCloseAttrs,
  },
  headingTitleAttrs: {
    level: 2,
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
    onEnter: enterHandler,
    ...props.transitionDialogAttrs,
  },
}));
const emit = defineEmits<{(e: 'cancel'): void, (e:'confirm'): void, (e:'update:modelValue', value: boolean): void}>();
const hasActions = computed(() => props.hasCancel || props.hasConfirm);
const hasDescription = computed(() => !!props.title && !!props.description);
const hasHeader = computed(() => !!props.title || !!props.description || !!props.isClosable);
const titleSlotName = computed<'title'|'description'>(() => (props.title
  ? 'title'
  : 'description'));
const titleTag = computed(() => (props.title
  ? UiHeading
  : UiText));
const titleText = computed(() => props.title || props.description);
const titleAttrs = computed(() => (props.title
  ? defaultProps.value.headingTitleAttrs
  : props.textDescriptionAttrs));

function closeHandler(): void {
  if (!props.isClosable) return;
  emit('update:modelValue', false);
}
function keydownHandler(event: Event) {
  const { key } = event as KeyboardEvent;
  if (key !== 'Escape') return;
  closeHandler();
}
function confirmHandler(): void {
  emit('confirm');
}
function cancelHandler(): void {
  emit('cancel');
  emit('update:modelValue', false);
}
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

.ui-modal {
  $this: &;
  $element: modal;

  z-index: 1;

  &__dialog {
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    display: flex;
    width: calc(100% - functions.var($element, padding-horizontal, var(--space-20)));
    max-width: functions.var($element, max-width, 30rem);
    flex-direction: column;
    padding: functions.var($element, padding, var(--space-24));
    border: none;
    margin: 0;
    background: functions.var($element, background, var(--color-background-white));
    border-radius: functions.var($element, border-radius, var(--border-radius-container));
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
    flex: 1;
    margin: functions.var($element + "-title", margin, 0 0 var(--space-12) 0);
  }

  &__description {
    flex: 1;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    margin: functions.var($element + "-actions", margin, var(--space-32) 0 0 0);

    @include mixins.from-tablet {
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  &__confirm {
    margin: functions.var($element + "-confirm", margin, 0 0 var(--space-12) 0);

    &--order {
      order: -1;
    }

    @include mixins.from-tablet {
      margin: functions.var($element + "-tablet-confirm", margin, 0 0 0 var(--space-12));

      [dir="rtl"] & {
        margin: functions.var($element + "-rtl-tablet-confirm", margin, 0 var(--space-12) 0 0);
      }
    }
  }

  &__cancel {
    @include mixins.from-tablet {
      order: -1;
    }
  }
}

/* todo: move to utilities */
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s linear;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>

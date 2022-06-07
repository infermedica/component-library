<template>
  <div
    class="ui-modal"
  >
    <!-- @slot Use this slot to replace backdrop template. -->
    <slot
      name="backdrop"
      v-bind="{ closeHandler, modelValue }"
    >
      <transition
        appear
        name="fade"
      >
        <UiBackdrop
          v-if="modelValue"
          class="ui-modal__background"
          @click="closeHandler"
        />
      </transition>
    </slot>
    <!-- @slot Use this slot to replace container template. -->
    <slot
      name="container"
      v-bind="{ confirmHandler, cancelHandler, closeHandler, isClosable, modelValue }"
    >
      <transition
        appear
        name="fade"
        @enter="enterHandler"
      >
        <dialog
          v-if="modelValue"
          v-focus-trap
          v-body-scroll-lock
          class="ui-modal__dialog"
          :class="{'ui-modal__dialog--has-title': title}"
        >
          <!-- @slot Use this slot to replace header template. -->
          <slot
            name="header"
            v-bind="{ closeHandler, description, hasDescription, hasHeader, isClosable, titleTag, titleText }"
          >
            <div
              v-if="hasHeader"
              class="ui-modal__header"
            >
              <!-- @slot Use this slot to replace title template. -->
              <slot
                :name="titleSlotName"
                v-bind="{ titleTag, titleText, description}"
              >
                <component
                  :is="titleTag"
                  class="ui-modal__title"
                >
                  {{ titleText }}
                </component>
              </slot>
              <!-- @slot Use this slot to replace close template. -->
              <slot
                name="close"
                v-bind="{ attrs: buttonCloseAttrs, closeHandler, isClosable }"
              >
                <UiButton
                  v-if="isClosable"
                  ref="button"
                  class="ui-button--has-icon ui-button--secondary ui-button--text ui-modal__close"
                  v-bind="buttonCloseAttrs"
                  @click="closeHandler()"
                >
                  <UiIcon icon="close" />
                </UiButton>
              </slot>
            </div>

            <!-- @slot Use this slot to replace description template. -->
            <slot
              v-if="title"
              name="description"
              v-bind="{ hasDescription, description }"
            >
              <UiText
                v-if="hasDescription"
                class="ui-modal__description"
              >
                {{ description }}
              </UiText>
            </slot>
          </slot>
          <!-- @slot Use this slot to replace actions template. -->
          <slot
            name="actions"
            v-bind="{ confirmHandler, cancelHandler, hasActions, hasCancel, hasConfirm, isClosable, translation }"
          >
            <div
              v-if="hasActions"
              class="ui-modal__actions"
            >
              <template v-if="isClosable">
                <!-- @slot Use this slot to replace confirm button template. -->
                <slot
                  name="confirm"
                  v-bind="{ attrs: buttonConfirmAttrs, confirmHandler, hasConfirm, translation }"
                >
                  <UiButton
                    v-if="hasConfirm"
                    class="ui-modal__confirm"
                    v-bind="buttonConfirmAttrs"
                    @click="confirmHandler"
                  >
                    {{ translation.confirm }}
                  </UiButton>
                </slot>
                <!-- @slot Use this slot to replace cancel button template. -->
                <slot
                  name="cancel"
                  v-bind="{ attrs: buttonCancelAttrs, cancelHandler, hasCancel, translation }"
                >
                  <UiButton
                    v-if="hasCancel"
                    class="ui-button--outlined ui-modal__cancel"
                    v-bind="buttonCancelAttrs"
                    @click="cancelHandler"
                  >
                    {{ translation.cancel }}
                  </UiButton>
                </slot>
              </template>
              <template v-else>
                <!-- @slot Use this slot to replace cancel button template. -->
                <slot
                  name="cancel"
                  v-bind="{ attrs: buttonCancelAttrs, cancelHandler, hasCancel, translation }"
                >
                  <UiButton
                    v-if="hasCancel"
                    ref="button"
                    class="ui-button--outlined ui-modal__cancel"
                    v-bind="buttonCancelAttrs"
                    @click="cancelHandler"
                  >
                    {{ translation.cancel }}
                  </UiButton>
                </slot>
                <!-- @slot Use this slot to replace confirm button template. -->
                <slot
                  name="confirm"
                  v-bind="{ attrs: buttonConfirmAttrs, confirmHandler, hasConfirm, translation, }"
                >
                  <UiButton
                    v-if="hasConfirm"
                    class="ui-modal__confirm ui-modal__confirm--order"
                    v-bind="buttonConfirmAttrs"
                    @click="confirmHandler"
                  >
                    {{ translation.confirm }}
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

<script setup>
import {
  ref, computed, nextTick, onBeforeUnmount, onMounted,
} from 'vue';
import { bodyScrollLock as vBodyScrollLock, focusTrap as vFocusTrap } from '../../../utilities/directives/index';
import { focusElement } from '../../../utilities/helpers';
import UiBackdrop from '../../atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../atoms/UiText/UiText.vue';

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
   * Use this props to pass attrs for confirm UiButton.
   */
  buttonConfirmAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for cancel UiButton
   */
  buttonCancelAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for close UiButton
   */
  buttonCloseAttrs: {
    type: Object,
    default: () => ({}),
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
    type: Object,
    default: () => ({ confirm: 'Ok', cancel: 'Cancel' }),
  },
});
const emit = defineEmits(['cancel', 'confirm', 'update:modelValue']);
const button = ref(null);
const hasActions = computed(() => props.hasCancel || props.hasConfirm);
const hasDescription = computed(() => props.title && props.description);
const hasHeader = computed(() => props.title || props.description || props.isClosable);
const titleSlotName = computed(() => (props.title ? 'title' : 'description'));
const titleTag = computed(() => (props.title ? UiHeading : UiText));
const titleText = computed(() => props.title || props.description);

async function enterHandler() {
  await nextTick();
  focusElement(button.value?.$el, true);
}
function closeHandler() {
  if (!props.isClosable) return;
  emit('update:modelValue', false);
}
function keydownHandler({ key }) {
  if (key !== 'Escape') return;
  closeHandler();
}
function confirmHandler() {
  emit('confirm');
}
function cancelHandler() {
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
@import "../../../styles/mixins/mixins";

.ui-modal {
  z-index: 1;

  &__dialog {
    position: var(--modal-position, fixed);
    z-index: var(--modal-z-index, 1000);
    top: 50%;
    left: 50%;
    display: flex;
    width: calc(100% - 2 * var(--modal-margin-horizontal, 20px));
    max-width: var(--modal-max-width, 480px);
    flex-direction: column;
    padding: var(--modal-padding, var(--space-24));
    border: var(--modal-border, none);
    margin: 0;
    background: var(--modal-background, var(--color-background-white));
    border-radius: var(--modal-border-radius, var(--border-radius-container));
    box-shadow: var(--modal-box-shadow, var(--box-shadow-high));
    transform: translate(-50%, -50%);

    [dir="rtl"] & {
      right: 50%;
      left: auto;
      transform: translate(50%, -50%);
    }

    @include from-tablet {
      --modal-margin-horizontal: 64px;
    }

    &--has-title {
      --modal-max-width: 640px;
    }
  }

  &__header {
    display: flex;
    align-items: flex-start;
  }

  &__title {
    flex-grow: 1;
    margin: var(--modal-title-margin, 0 0 var(--space-12) 0);
  }

  &__description {
    flex-grow: 1;
  }

  &__close {
    --icon-size: var(--modal-close-icon-size, 14px);

    margin: var(--modal-close-margin, 5px 5px 5px 17px);

    [dir="rtl"] & {
      margin: var(--modal-close-margin, 5px 17px 5px 5px);
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    margin: var(--modal-action-margin, var(--space-32) 0 0);

    @include from-tablet {
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  &__confirm {
    margin: var(--modal-confirm-margin, 0 0 var(--space-12));

    &--order {
      order: -1;
    }

    @include from-tablet {
      margin: var(--modal-confirm-tablet-margin, 0 0 0 var(--space-12));

      [dir="rtl"] & {
        margin: var(--modal-confirm-tablet-margin, 0 var(--space-12) 0 0);
      }
    }
  }

  &__cancel {
    @include from-tablet {
      order: -1;
    }
  }
}

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

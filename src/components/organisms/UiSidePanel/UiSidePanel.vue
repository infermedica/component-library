<template>
  <div class="ui-side-panel">
    <!-- @slot Use this slot to replace backdrop template. -->
    <slot
      name="backdrop"
      v-bind="{closeHandler, modelValue}"
    >
      <transition name="fade">
        <UiBackdrop
          v-if="modelValue"
          @click="closeHandler"
        />
      </transition>
    </slot>
    <!-- @slot Use this slot to replace container template. -->
    <slot
      name="container"
      v-bind="{transition, afterEnterHandler, modelValue, buttonCloseAttrs, closeHandler, title, subtitle}"
    >
      <transition
        :name="transition"
        @enter="enterHandler"
        @after-enter="afterEnterHandler"
      >
        <dialog
          v-if="modelValue"
          v-focus-trap
          v-body-scroll-lock
          class="ui-side-panel__dialog"
        >
          <!-- @slot Use this slot to replace header template. -->
          <slot
            name="header"
            v-bind="{attrs: buttonCloseAttrs, closeHandler, title, subtitle}"
          >
            <div class="ui-side-panel__header">
              <!-- @slot Use this slot to replace close template. -->
              <slot
                name="close"
                v-bind="{attrs: buttonCloseAttrs, closeHandler}"
              >
                <UiButton
                  ref="button"
                  class="ui-button--has-icon ui-button--secondary ui-button--text ui-side-panel__close"
                  v-bind="buttonCloseAttrs"
                  @click="closeHandler"
                >
                  <UiIcon icon="close" />
                </UiButton>
              </slot>
              <!-- @slot Use this slot to replace label template. -->
              <slot
                name="label"
                v-bind="{title, subtitle}"
              >
                <div
                  v-if="title || subtitle"
                  class="ui-side-panel__label"
                >
                  <!-- @slot Use this slot to replace title template. -->
                  <slot
                    name="title"
                    v-bind="{title, headingTitleAttrs}"
                  >
                    <UiHeading
                      v-if="title"
                      v-bind="headingTitleAttrs"
                    >
                      {{ title }}
                    </UiHeading>
                  </slot>
                  <!-- @slot Use this slot to replace subtitle template. -->
                  <slot
                    name="subtitle"
                    v-bind="{subtitle}"
                  >
                    <UiText
                      v-if="subtitle"
                      v-bind="textSubtitleAttrs"
                      class="ui-side-panel__subtitle"
                    >
                      {{ subtitle }}
                    </UiText>
                  </slot>
                </div>
              </slot>
            </div>
          </slot>
          <!-- @slot Use this slot to replace content template. -->
          <slot name="content">
            <div
              v-scroll-tabindex
              class="ui-side-panel__content"
              :body-scroll-lock-ignore="true"
            >
              <!-- @slot Use this slot to place side panel content. -->
              <slot />
            </div>
          </slot>
        </dialog>
      </transition>
    </slot>
  </div>
</template>

<script setup>
import {
  ref,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { focusTrap as vFocusTrap, bodyScrollLock as vBodyScrollLock, scrollTabindex as vScrollTabindex } from '../../../utilities/directives';

import UiBackdrop from '../../atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiText from '../../atoms/UiText/UiText.vue';

defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * Use this props to set side panel title.
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set side panel subtitle.
   */
  subtitle: {
    type: String,
    default: '',
  },
  /**
   * Use this props to pass attrs for close UiButton
   */
  buttonCloseAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for title UiHeading
   */
  headingTitleAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for subtitle UiText
   */
  textSubtitleAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to override labels inside component translation.
   */
  transition: {
    type: String,
    default: 'slide',
  },
});
const emit = defineEmits(['update:modelValue', 'after-enter']);
const button = ref(null);
function closeHandler() {
  emit('update:modelValue', false);
}

function afterEnterHandler() {
  emit('after-enter');
}

function focus(element) {
  if (element) {
    element.focus();
  }
}

async function enterHandler() {
  await nextTick();
  focus(button.value?.$el);
}

function keydownHandler({ key }) {
  if (key !== 'Escape') return;
  emit('update:modelValue', false);
}
onMounted(() => {
  window.addEventListener('keydown', keydownHandler);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', keydownHandler);
});
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-side-panel {
  z-index: 1;

  &__dialog {
    position: var(--side-panel-position, fixed);
    z-index: var(--side-panel-z-index, 1000);
    top: 0;
    right: 0;
    bottom: 0;
    left: auto;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 0;
    border-width: 0;
    margin: 0;
    background: var(--side-panel-background, var(--color-background-white));
    box-shadow: var(--side-panel-box-shadow, var(--box-shadow-high));

    [dir="rtl"] & {
      right: auto;
      left: 0;
    }

    @include from-tablet {
      max-width: var(--side-panel-container-tablet-max-width, 40rem);
    }
  }

  &__header {
    display: flex;
    flex: none;
    flex-direction: column;
    padding: var(--side-panel-header-padding, var(--space-20) var(--space-20) var(--space-24));
    background: var(--side-panel-header-background, var(--color-background-subtle));

    @include from-tablet {
      padding: var(--side-panel-header-tablet-padding, var(--space-40) var(--space-40) var(--space-32));
    }
  }

  &__close {
    --icon-size: var(--side-panel-close-icon-size, 1.5rem);
    --button-padding: 0;

    margin: var(--side-panel-close-margin, 0 0 0 auto);

    [dir="rtl"] & {
      margin: var(--side-panel-close-margin, 0 auto 0 0);
    }
  }

  &__label {
    padding: var(--side-panel-label-padding, 0);
    margin: var(--side-panel-label-margin, var(--space-32) 0 0 0);

    @include from-tablet {
      padding: var(--side-panel-tablet-label-padding, 0 var(--space-8));
    }
  }

  &__subtitle {
    @include font(side-panel-subtitle, body-2-comfortable, text);

    margin: var(--side-panel-subtitle-margin, var(--space-8) 0 0 0);
  }

  &__content {
    overflow: var(--side-panel-content-overflow, auto);
    height: 100%;
    flex: 1;
    padding: var(--side-panel-content-padding, var(--space-24) var(--space-20));

    @include from-tablet {
      padding: var(--side-panel-content-tablet-padding, var(--space-32) var(--space-48));
    }

    &:focus {
      box-shadow: var(--focus-outer);
      outline: none;
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

.slide {
  &-enter-active,
  &-leave-active {
    transition: transform 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    transform: translate3d(100%, 0, 0);
    transition: transform 0.5s ease-in;

    [dir="rtl"] & {
      transform: translate3d(-100%, 0, 0);
    }
  }
}
</style>

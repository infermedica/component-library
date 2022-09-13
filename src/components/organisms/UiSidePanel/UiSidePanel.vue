<template>
  <div class="ui-side-panel">
    <!-- @slot Use this slot to replace backdrop template. -->
    <slot
      name="backdrop"
      v-bind="{
        closeHandler,
        modelValue
      }"
    >
      <transition
        appear
        name="fade"
      >
        <UiBackdrop
          v-if="modelValue"
          @click="closeHandler"
        />
      </transition>
    </slot>
    <!-- @slot Use this slot to replace container template. -->
    <slot
      name="container"
      v-bind="{
        transition,
        afterEnterHandler,
        modelValue,
        buttonCloseAttrs,
        closeHandler,
        title,
        subtitle
      }"
    >
      <transition
        appear
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
            v-bind="{
              attrs: buttonCloseAttrs,
              closeHandler,
              title,
              subtitle
            }"
          >
            <div class="ui-side-panel__header">
              <!-- @slot Use this slot to replace close template. -->
              <slot
                name="close"
                v-bind="{
                  attrs: buttonCloseAttrs,
                  closeHandler
                }"
              >
                <UiButton
                  ref="button"
                  class="ui-button--icon ui-button--theme-secondary ui-side-panel__close"
                  v-bind="buttonCloseAttrs"
                  @click="closeHandler"
                >
                  <UiIcon
                    icon="close"
                    class="ui-button__icon"
                  />
                </UiButton>
              </slot>
              <!-- @slot Use this slot to replace label template. -->
              <slot
                name="label"
                v-bind="{
                  title,
                  subtitle
                }"
              >
                <div
                  v-if="title || subtitle"
                  class="ui-side-panel__label"
                >
                  <!-- @slot Use this slot to replace title template. -->
                  <slot
                    name="title"
                    v-bind="{
                      title,
                      headingTitleAttrs
                    }"
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
                    v-bind="{
                      subtitle
                    }"
                  >
                    <UiText
                      v-if="subtitle"
                      v-bind="textSubtitleAttrs"
                      class="ui-text--body-2-comfortable ui-side-panel__subtitle"
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
              v-keyboard-focus
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

<script setup lang="ts">
import {
  ref,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import {
  focusTrap as vFocusTrap,
  bodyScrollLock as vBodyScrollLock,
  scrollTabindex as vScrollTabindex,
  keyboardFocus as vKeyboardFocus,
} from '../../../utilities/directives';
import { focusElement } from '../../../utilities/helpers/index.ts';
import UiBackdrop from '../../atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { PropsAttrs } from '../../../types/attrs';

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
    type: Object as PropsAttrs,
    default: () => ({
    }),
  },
  /**
   * Use this props to pass attrs for title UiHeading
   */
  headingTitleAttrs: {
    type: Object as PropsAttrs,
    default: () => ({
    }),
  },
  /**
   * Use this props to pass attrs for subtitle UiText
   */
  textSubtitleAttrs: {
    type: Object as PropsAttrs,
    default: () => ({
    }),
  },
  /**
   * Use this props to override labels inside component translation.
   */
  transition: {
    type: String,
    default: 'slide',
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: boolean): void,
  (e: 'after-enter'): void
}>();
const button = ref<InstanceType<typeof UiButton>| null>(null);
function closeHandler(): void {
  emit('update:modelValue', false);
}
function afterEnterHandler(): void {
  emit('after-enter');
}
async function enterHandler(): Promise<void> {
  await nextTick();
  focusElement(button.value?.$el, true);
}
function keydownHandler(event: Event) {
  const { key } = event as KeyboardEvent;
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
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-side-panel {
  $this: &;
  $element: modal;

  z-index: 1;

  &__dialog {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    bottom: 0;
    left: auto;
    display: flex;
    width: 100%;
    max-width: functions.var($element, max-width, 100%);
    height: 100%;
    flex-direction: column;
    padding: 0;
    border-width: 0;
    margin: 0;
    background: functions.var($element, background, var(--color-background-white));
    box-shadow: functions.var($element, box-shadow, var(--box-shadow-high));

    [dir="rtl"] & {
      right: auto;
      left: 0;
    }

    @include mixins.from-tablet {
      max-width: functions.var($element + "-tablet", max-width, 40rem);
    }
  }

  &__header {
    display: flex;
    flex: none;
    flex-direction: column;
    padding: functions.var($element + "-header", padding, var(--space-20) var(--space-20) var(--space-24));
    background: functions.var($element + "-header", background, var(--color-background-subtle));

    @include mixins.from-tablet {
      padding: functions.var($element + "-tablet-header", padding, var(--space-40) var(--space-40) var(--space-32));
    }
  }

  &__close {
    align-self: flex-end;
  }

  &__label {
    padding: functions.var($element + "-label", padding, 0);
    margin: functions.var($element + "-label", margin, var(--space-32) 0 0 0);

    @include mixins.from-tablet {
      padding: functions.var($element + "-tablet-label", padding, 0 var(--space-8));
    }
  }

  &__subtitle {
    margin: functions.var($element + "-subtitle", margin, var(--space-8) 0 0 0);
  }

  &__content {
    overflow: auto;
    height: 100%;
    flex: 1;
    padding: functions.var($element + "-content", padding, var(--space-24) var(--space-20));

    @include mixins.from-tablet {
      padding: functions.var($element + "-tablet-content", padding, var(--space-32) var(--space-48));
    }

    &:focus {
      outline: none;
    }

    @include mixins.focus {
      box-shadow: var(--focus-outer);
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

/* todo: move to utilities */
.slide {
  &-enter-active,
  &-leave-active {
    transition: transform 0.5s ease;
  }

  &-enter-from {
    position: fixed;
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

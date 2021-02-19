<template>
  <div class="ui-side-panel">
    <!-- @slot Use this slot to replace backdrop template. -->
    <slot
      name="backdrop"
      v-bind="{closeHandler}"
    >
      <transition name="fade">
        <UiBackdrop
          v-if="modelValue"
          @click="closeHandler"
        />
      </transition>
    </slot>
    <!-- @slot Use this slot to replace container template. -->
    <slot name="container">
      <transition
        :name="transition"
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
            v-bind="{attr: buttonAttrs, closeHandler, title}"
          >
            <div class="ui-side-panel__header">
              <!-- @slot Use this slot to replace close template. -->
              <slot
                name="close"
                v-bind="{attrs: buttonAttrs, closeHandler}"
              >
                <UiButton
                  ref="button"
                  class="ui-button--has-icon ui-button--secondary ui-button--text ui-side-panel__close"
                  v-bind="buttonAttrs"
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
                    v-bind="{title}"
                  >
                    <UiHeading v-if="title">
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

<script>
import {
  ref,
  watchEffect,
  nextTick,
} from 'vue';
import { focusTrap, bodyScrollLock } from '../../../utilities/directives';

import UiBackdrop from '../../atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiText from '../../atoms/UiText/UiText.vue';

export default {
  name: 'UiSidePanel',
  components: {
    UiBackdrop,
    UiHeading,
    UiButton,
    UiIcon,
    UiText,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  props: {
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
     * Use this props to pass attrs for UiButton
     */
    buttonAttrs: {
      type: Object,
      default: () => ({}),
    },
    transition: {
      type: String,
      default: 'slide',
    },
  },
  emits: ['update:modelValue', 'after-enter'],
  setup(props, { emit }) {
    const button = ref(null);
    function closeHandler() {
      emit('update:modelValue', false);
    }

    function afterEnterHandler() {
      emit('after-enter');
    }
    function focus(element) {
      if (element) { element.focus(); }
    }
    watchEffect(() => {
      if (props.modelValue) {
        nextTick(() => {
          focus(button.value?.$el);
        });
      }
    });

    return {
      button,
      closeHandler,
      afterEnterHandler,
    };
  },
};
</script>

<style lang="scss">
.ui-side-panel {
  z-index: 1;
  &__dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: auto;
    z-index: var(--side-panel-z-index, 1000);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0;
    background: var(--side-panel-background, var(--color-background-white));
    border-width: 0;
    box-shadow: var(--side-panel-box-shadow, var(--box-shadow-modal));

    @media (min-width: 768px) {
      max-width: var(--side-panel-container-tablet-max-width, 40rem);
    }
  }

  &__header {
    display: flex;
    flex: none;
    flex-direction: column;
    padding: var(--side-panel-header-padding, var(--space-20) var(--space-20) var(--space-24));
    background: var(--side-panel-header-background, var(--color-background-subtle));

    @media (min-width: 768px) {
      padding: var(--side-panel-header-tablet-padding, var(--space-40) var(--space-40) var(--space-32));
    }
  }

  &__close {
    --icon-size: var(--side-panel-close-icon-size, 1.5rem);
    --button-padding: 0;

    margin: var(--side-panel-close-margin, 0 0 0 auto);
  }

  &__label {
    padding: var(--side-panel-label-padding, 0 var(--space-8));
    margin: var(--side-panel-label-margin, var(--space-32) 0 0 0);
  }

  &__subtitle {
    margin: var(--side-panel-subtitle-margin, var(--space-8) 0 0 0);
  }

  &__content {
    flex: 1;
    padding: var(--side-panel-content-padding, var(--space-32) var(--space-20));
    overflow: var(--side-panel-content-overflow, auto);
    height: 100%;

    @media (min-width: 768px) {
      padding: var(--side-panel-content-tablet-padding, var(--space-32) var(--space-48));
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
    transition: transform 0.5s ease-in;
    transform: translate3d(100%, 0, 0);
  }
}
</style>

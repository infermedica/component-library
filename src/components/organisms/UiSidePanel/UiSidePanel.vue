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
      <transition name="slide">
        <dialog
          v-if="modelValue"
          class="ui-side-panel__container"
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
                  class="ui-side-panel__close"
                  v-bind="buttonAttrs"
                  @click="closeHandler"
                >
                  <UiIcon icon="cross" />
                </UiButton>
              </slot>
              <!-- @slot Use this slot to replace label template. -->
              <slot
                name="label"
                v-bind="{title}"
              >
                <div class="ui-side-panel__label">
                  <UiHeading>{{ title }}</UiHeading>
                </div>
              </slot>
            </div>
          </slot>
          <!-- @slot Use this slot to replace content template. -->
          <slot name="content">
            <div
              ref="content"
              class="ui-side-panel__content"
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
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import UiBackdrop from '../../atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';

export default {
  name: 'UiSidePanel',
  components: {
    UiBackdrop,
    UiHeading,
    UiButton,
    UiIcon,
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
     * Use this props to pass attrs for UiButton
     */
    buttonAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const button = ref(null);
    function closeHandler() {
      emit('update:modelValue', false);
    }

    const content = ref(null);
    function toggleBodyScroll(element, state) {
      if (!element) return;
      if (state) {
        disableBodyScroll(element);
      } else {
        enableBodyScroll(element);
      }
    }
    function focus(element) {
      element.focus();
    }
    watchEffect(() => {
      if (props.modelValue) {
        nextTick(() => {
          focus(button.value.$el);
          toggleBodyScroll(content.value, true);
        });
      } else {
        toggleBodyScroll(content.value, false);
      }
    });

    return {
      button,
      content,
      closeHandler,
    };
  },
};
</script>

<style lang="scss">
.ui-side-panel {
  &__container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0;
    background: var(--side-panel-background, var(--color-background-white));
    border-width: 0;
    box-shadow: var(--side-panel-box-shadow, var(--box-shadow-modal));

    @media (min-width: 480px) {
      max-width: var(--side-panel-container-tablet-max-width, 40rem);
    }
  }

  &__header {
    display: flex;
    flex: none;
    flex-direction: column;
    padding: var(--side-panel-header-padding, var(--space-20));
    background: var(--side-panel-header-background, var(--color-background-subtle));

    @media (min-width: 480px) {
      padding: var(--side-panel-header-tablet-padding, var(--space-32) var(--space-40) var(--space-32) var(--space-40));
    }
  }

  &__close {
    --icon-size: var(--side-panel-close-ison-size, 1.5rem);
    --button-padding: 0;
    --button-background: transparent;
    --button-hover-background: transparent;
    --button-active-background: transparent;

    margin: var(--side-panel-close-margin, 0 0 var(--space-32) auto);
  }

  &__label {
    background: transparent;
  }

  &__content {
    flex: 1;
    padding: var(--side-panel-content-padding, var(--space-32) var(--space-20));
    overflow: auto;

    @media (min-width: 480px) {
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

<template>
  <div class="ui-popover">
    <!-- @slot Use this slot to replace header template. -->
    <slot
      name="header"
      v-bind="{title, attrs: buttonAttrs, clickHandler}"
    >
      <div
        v-if="title"
        class="ui-popover__header"
      >
        <!-- @slot Use this slot to replace title template. -->
        <slot
          name="title"
          v-bind="{title}"
        >
          <UiHeading
            level="4"
            tag="span"
          >
            {{ title }}
          </UiHeading>
        </slot>
        <!-- @slot Use this slot to replace close template. -->
        <slot
          name="close"
          v-bind="{attrs: buttonAttrs, clickHandler}"
        >
          <UiButton
            v-bind="buttonAttrs"
            class="ui-button--has-icon ui-button--secondary ui-button--text ui-popover__close"
            @click="clickHandler"
          >
            <UiIcon icon="clear" />
          </UiButton>
        </slot>
      </div>
    </slot>
    <div class="ui-popover__content">
      <!-- @slot Use this to put content inside component. -->
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

defineProps({
  /**
   * Use this props to pass title for popover.
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * Use this props to pass attrs to close UiButton.
   */
  buttonAttrs: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['close']);
function clickHandler() {
  emit('close');
}
function keydownHandler({ key }) {
  if (key !== 'Escape') return;
  emit('close');
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

.ui-popover {
  @include inner-border($element: popover, $color: var(--color-border-subtle), $radius: var(--border-radius-form));

  $this: &;

  z-index: 1;
  background: var(--popover-background, var(--color-background-white));
  box-shadow: var(--popover-box-shadow, var(--box-shadow-high));
  transform: var(--popover-transform);

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--popover-header-padding, var(--space-12) var(--space-16));
    background: var(--popover-header-background, var(--color-background-subtle));

    &::after {
      z-index: 1;
      pointer-events: none;
    }
  }

  &__content {
    padding: var(--popover-content-padding, var(--space-8));
  }

  &--unrounded {
    --popover-border-radius: 0;
  }

  &--has-arrow,
  &--has-left-arrow {
    #{$this}__header {
      &::after {
        position: absolute;
        top: 50%;
        width: var(--popver-arrow-size, 0.75rem);
        height: var(--popver-arrow-size, 0.75rem);
        content: "";
        background: var(--popover-header-background, var(--color-background-subtle));
        border: var(--popover-border, solid var(--color-border-subtle));
      }
    }
  }

  &--has-arrow {
    #{$this}__header {
      &::after {
        right: 0;
        border-width: var(--popover-arrow-border-width, 1px 1px 0 0);
        transform: translate(50%, -50%) rotate(45deg);
      }
    }
  }

  &--has-left-arrow {
    #{$this}__header {
      &::after {
        left: 0;
        border-width: var(--popover-arrow-border-width, 0 0 1px 1px);
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }

  &--has-mobile {
    @media (max-width: 767px) {
      --popover-border-radius: 0;

      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: var(--popover-has-mobile-height, 50%);
    }

    &#{$this}--has-arrow {
      #{$this}__header {
        &::after {
          @media (max-width: 767px) {
            content: none;
          }
        }
      }
    }
  }
}
</style>

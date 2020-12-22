<template>
  <div class="ui-popover">
    <slot
      name="header"
      v-bind="{title, attrs: buttonAttrs, clickHandler}"
    >
      <div
        v-if="title"
        class="ui-popover__header"
      >
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
        <slot
          name="close"
          v-bind="{attrs: buttonAttrs, clickHandler}"
        >
          <UiButton
            v-bind="buttonAttrs"
            class="ui-button--has-icon ui-button--secondary ui-button--text ui-popover__close"
            @click="clickHandler"
          >
            <UiIcon icon="closeCompact" />
          </UiButton>
        </slot>
      </div>
    </slot>
    <div class="ui-popover__content">
      <slot />
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

export default {
  name: 'UiPopover',
  components: {
    UiHeading,
    UiButton,
    UiIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    buttonAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
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
    return {
      clickHandler,
    };
  },
};
</script>

<style lang="scss">
.ui-popover {
  $this: &;

  background: var(--popover-background, var(--color-background-white));
  border: var(--popover-border, solid var(--color-border-subtle));
  border-width: var(--popover-border-width, 1px);
  border-radius: var(--popover-border-radius, var(--border-radius-form));
  box-shadow: var(--popover-box-shadow, var(--box-shadow-modal));
  transform: var(--popover-transform, translateY(var(--space-8)));

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--popover-header-padding, var(--space-12) var(--space-16));
    background: var(--popover-header-background, var(--color-background-subtle));
    border-radius: var(--popover-header-border-radius, var(--border-radius-form) var(--border-radius-form) 0 0);
  }

  &__content {
    padding: var(--popover-content-padding, var(--space-8));
  }

  &--unrounded {
    --popover-border-radius: 0;
  }

  &--has-arrow {
    #{$this}__header {
      &::after {
        position: absolute;
        top: 50%;
        right: 0;
        width: var(--popver-arrow-size, 0.75rem);
        height: var(--popver-arrow-size, 0.75rem);
        content: "";
        background: var(--popover-header-background, var(--color-background-subtle));
        border: var(--popover-border, solid var(--color-border-subtle));
        border-width: var(--popover-arrow-border-width, 1px 1px 0 0);
        transform: translate(50%, -50%) rotate(45deg);
      }
    }
  }
}
</style>

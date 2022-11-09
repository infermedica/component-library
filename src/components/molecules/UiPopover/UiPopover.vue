<template>
  <div class="ui-popover">
    <!-- @slot Use this slot to replace header template. -->
    <slot
      name="header"
      v-bind="{
        title,
        headingTitleAttrs,
        buttonAttrs,
        buttonCloseAttrs,
        clickHandler
      }"
    >
      <div
        v-if="title"
        class="ui-popover__header"
      >
        <!-- @slot Use this slot to replace title template. -->
        <slot
          name="title"
          v-bind="{
            headingTitleAttrs,
            title
          }"
        >
          <UiHeading
            v-bind="headingTitleAttrs"
          >
            {{ title }}
          </UiHeading>
        </slot>
        <!-- @slot Use this slot to replace close template. -->
        <slot
          name="close"
          v-bind="{
            buttonAttrs,
            buttonCloseAttrs,
            clickHandler,
            iconCloseAttrs: defaultProps.iconCloseAttrs
          }"
        >
          <UiButton
            v-bind="buttonAttrs || buttonCloseAttrs"
            class="ui-button--icon ui-button--theme-secondary ui-popover__close"
            @click="clickHandler"
          >
            <!-- @slot Use this slot to replace icon template. -->
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
    </slot>
    <div class="ui-popover__content">
      <!-- @slot Use this to put content inside component. -->
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  useAttrs,
  computed,
} from 'vue';
import type { HeadingLevel } from '@/components/atoms/UiHeading/UiHeading.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { PropsAttrs } from '../../../types/attrs';
import type { HTMLTag } from '../../../types/tag';
import type { Icon } from '../../../types/icon';

const props = defineProps({
  /**
   * Use this props to pass title for popover.
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * Use this props to pass attrs to title UiHeading.
   */
  headingTitleAttrs: {
    type: Object as PropsAttrs,
    default: () => ({
      level: '4',
      tag: 'span',
    }),
  },
  /**
   * Use this props to pass attrs to close UiButton.
   */
  buttonCloseAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs to close UiIcon.
   */
  iconCloseAttrs: {
    type: Object as PropsAttrs,
    default: () => ({ icon: 'clear' }),
  },
});
const defaultProps = computed(() => ({
  headingTitleAttrs: {
    level: '4' as HeadingLevel,
    tag: 'span' as HTMLTag,
    ...props.headingTitleAttrs,
  },
  iconCloseAttrs: {
    icon: 'clear' as Icon,
    ...props.iconCloseAttrs,
  },
}));
const emit = defineEmits<{(e: 'close'): void}>();
function clickHandler(): void {
  emit('close');
}
function keydownHandler({ key }: {key: string}): void {
  if (key !== 'Escape') return;
  emit('close');
}
onMounted(() => {
  window.addEventListener('keydown', keydownHandler);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', keydownHandler);
});
// TODO: remove in 0.6.0 / BEGIN
const attrs = useAttrs();
const buttonAttrs = computed(() => attrs.buttonAttrs || attrs['button-attrs']);
if (buttonAttrs.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiPopover]: The `buttonAttrs` props will be removed in 0.6.0. Please use `buttonCloseAttrs` props instead.');
  }
}
// END
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-popover {
  $this: &;
  $element: popover;

  @include mixins.inner-border($element, $color: var(--color-border-subtle), $radius: var(--border-radius-form));

  background: functions.var($element, background, var(--color-background-white));
  box-shadow: functions.var($element, box-shadow, var(--box-shadow-high));

  &__header {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: functions.var($element + "-header", padding, var(--space-12) var(--space-16));
    background: functions.var($element, background, var(--color-background-subtle));
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &__content {
    max-height: functions.var($element + "-content", max-height);
    padding: functions.var($element + "-content", padding, var(--space-16));
    border-radius: inherit;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    overflow-y: auto;
  }

  &--has-arrow,
  &--has-left-arrow {
    --_popover-arrow-size: #{functions.var($element + "-arrow", size, 0.75rem)};
    --_popover-arrow-border-width: #{functions.var($element + "-arrow", border-width, 1px)};

    #{$this}__header {
      &::after {
        position: absolute;
        z-index: 1;
        top: 50%;
        width: var(--_popover-arrow-size);
        height: var(--_popover-arrow-size);
        border-width: var(--_popover-arrow-border-width);
        border-style: solid;
        border-color: functions.var($element, border-color, var(--color-border-subtle));
        background: var(--popover-header-background, var(--color-background-subtle));
        content: "";
        pointer-events: none;
      }
    }
  }

  &--has-arrow {
    #{$this}__header {
      &::after {
        right: 0;
        border-bottom-width: 0;
        border-left-width: 0;
        transform: translate(50%, -50%) rotate(45deg);
      }
    }
  }

  &--has-left-arrow {
    #{$this}__header {
      &::after {
        left: 0;
        border-top-width: 0;
        border-right-width: 0;
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }

  &--has-mobile {
    @include mixins.to-mobile {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      height: 50%;
      border-radius: functions.var($element + "-mobile", border-radius, 0);
    }

    &#{$this}--has-arrow,
    &#{$this}--has-left-arrow {
      @include mixins.to-mobile {
        --_popover-arrow-size: 0;
        --_popover-arrow-border-width: 0;
      }
    }
  }

  &--unrounded {
    border-radius: 0;
  }
}
</style>

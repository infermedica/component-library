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
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import type { HeadingAttrsProps } from '../../atoms/UiHeading/UiHeading.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import type { DefineAttrsProps } from '../../../types';

export interface PopoverProps {
  /**
   * Use this props to pass title for popover.
   */
  title?: string;
  /**
   * Use this props to pass attrs to title UiHeading.
   */
  headingTitleAttrs?: HeadingAttrsProps;
  /**
   * Use this props to pass attrs to close UiButton.
   */
  buttonCloseAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs to close UiIcon.
   */
  iconCloseAttrs?: IconAttrsProps;
}
export type PopoverAttrsProps = DefineAttrsProps<PopoverProps>;
export interface PopoverEmits {
  (e: 'close'): void;
}

const props = withDefaults(defineProps<PopoverProps>(), {
  title: '',
  headingTitleAttrs: () => ({
    level: '4',
    tag: 'span',
  }),
  buttonCloseAttrs: () => ({}),
  iconCloseAttrs: () => ({ icon: 'clear' }),
});
const defaultProps = computed<PopoverProps>(() => ({
  headingTitleAttrs: {
    level: '4',
    tag: 'span',
    ...props.headingTitleAttrs,
  },
  iconCloseAttrs: {
    icon: 'clear',
    ...props.iconCloseAttrs,
  },
}));
const emit = defineEmits<PopoverEmits>();
function clickHandler(): void {
  emit('close');
}
function keydownHandler({ key }: KeyboardEvent): void {
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
    @include mixins.use-logical($element + "-header", padding, var(--space-12) var(--space-16));
    @include mixins.use-logical($element + "-header", border-radius, inherit inherit 0 0);

    position: relative;
    display: flex;
    justify-content: space-between;
    background: functions.var($element, background, var(--color-background-subtle));
  }

  &__content {
    @include mixins.use-logical($element + "-content", padding, var(--space-16));
    @include mixins.use-logical($element + "-content", border-radius, 0 0 inherit inherit);

    max-height: functions.var($element + "-content", max-height);
    overflow-y: auto;
  }

  &--has-arrow,
  &--has-start-arrow {
    --_popover-arrow-size: #{functions.var($element + "-arrow", size, 0.75rem)};
    --_popover-arrow-border-width: #{functions.var($element + "-arrow", border-width, 1px)};

    #{$this}__header {
      &::after {
        @include mixins.use-logical($element, border-style, solid);
        @include mixins.use-logical($element, border-color, var(--color-border-subtle));
        @include mixins.use-logical($element, border-width, var(--_popover-arrow-border-width));

        position: absolute;
        z-index: 1;
        top: 50%;
        width: var(--_popover-arrow-size);
        height: var(--_popover-arrow-size);
        background: var(--popover-header-background, var(--color-background-subtle));
        content: "";
        pointer-events: none;
      }
    }
  }

  &--has-arrow {
    #{$this}__header {
      &::after {
        --#{$element}-border-block-end-width: 0;
        --#{$element}-border-inline-start-width: 0;

        right: 0;
        transform: translate(50%, -50%) rotate(45deg);

        [dir="rtl"] & {
          right: auto;
          left: 0;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
  }

  &--has-start-arrow {
    #{$this}__header {
      &::after {
        --#{$element}-border-block-start-width: 0;
        --#{$element}-border-inline-end-width: 0;

        left: 0;
        transform: translate(-50%, -50%) rotate(45deg);

        [dir="rtl"] & {
          right: 0;
          left: auto;
          transform: translate(50%, -50%) rotate(-45deg);
        }
      }
    }
  }

  &--has-mobile {
    @include mixins.to-mobile {
      @include mixins.use-logical($element + "-mobile", border-radius, 0);

      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      height: 50%;
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

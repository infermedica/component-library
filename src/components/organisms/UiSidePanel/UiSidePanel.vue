<template>
  <div class="ui-side-panel">
    <!-- @slot Use this slot to replace backdrop template. -->
    <slot
      name="backdrop"
      v-bind="{
        transitionBackdropAttrs: defaultProps.transitionBackdropAttrs,
        modelValue,
        backdropAttrs,
        closeHandler,
      }"
    >
      <Transition
        v-bind="defaultProps.transitionBackdropAttrs"
      >
        <UiBackdrop
          v-if="modelValue"
          v-bind="backdropAttrs"
          @click="closeHandler"
        />
      </Transition>
    </slot>
    <!-- @slot Use this slot to replace container template. -->
    <slot
      name="container"
      v-bind="{
        transitionDialogAttrs: defaultProps.transitionDialogAttrs,
        dialogAttrs,
        modelValue,
        afterEnterHandler,
        buttonCloseAttrs,
        closeHandler,
        title,
        subtitle,
        iconCloseAttrs,
        headingTitleAttrs,
        textSubtitleAttrs,
      }"
    >
      <Transition
        v-bind="defaultProps.transitionDialogAttrs"
      >
        <dialog
          v-if="modelValue"
          v-focus-trap
          v-body-scroll-lock
          v-bind="dialogAttrs"
          class="ui-side-panel__dialog"
        >
          <!-- @slot Use this slot to replace header template. -->
          <slot
            name="header"
            v-bind="{
              buttonCloseAttrs,
              closeHandler,
              title,
              subtitle,
              headingTitleAttrs,
              textSubtitleAttrs,
              iconCloseAttrs,
            }"
          >
            <div class="ui-side-panel__header">
              <!-- @slot Use this slot to replace close template. -->
              <slot
                name="close"
                v-bind="{
                  buttonCloseAttrs,
                  closeHandler,
                  iconCloseAttrs: defaultProps.iconCloseAttrs
                }"
              >
                <UiButton
                  v-bind="buttonCloseAttrs"
                  ref="button"
                  class="ui-button--icon ui-button--theme-secondary ui-side-panel__close"
                  @click="closeHandler"
                >
                  <UiIcon
                    v-bind="defaultProps.iconCloseAttrs"
                    class="ui-button__icon"
                  />
                </UiButton>
              </slot>
              <!-- @slot Use this slot to replace label template. -->
              <slot
                name="label"
                v-bind="{
                  title,
                  subtitle,
                  headingTitleAttrs: defaultProps.headingTitleAttrs,
                  textSubtitleAttrs,
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
                      headingTitleAttrs: defaultProps.headingTitleAttrs
                    }"
                  >
                    <UiHeading
                      v-if="title"
                      v-bind="defaultProps.headingTitleAttrs"
                    >
                      {{ title }}
                    </UiHeading>
                  </slot>
                  <!-- @slot Use this slot to replace subtitle template. -->
                  <slot
                    name="subtitle"
                    v-bind="{
                      subtitle,
                      textSubtitleAttrs,
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
          <slot
            name="content"
            v-bind="{ contentAttrs }"
          >
            <div
              v-scroll-tabindex
              class="ui-side-panel__content"
              v-bind="contentAttrs"
            >
              <!-- @slot Use this slot to place side panel content. -->
              <slot />
            </div>
          </slot>
        </dialog>
      </Transition>
    </slot>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import type {
  DialogHTMLAttributes,
  TransitionProps,
} from 'vue';
import {
  focusTrap as vFocusTrap,
  bodyScrollLock as vBodyScrollLock,
  scrollTabindex as vScrollTabindex,
  keyboardFocus as vKeyboardFocus,
} from '../../../utilities/directives';
import { focusElement } from '../../../utilities/helpers';
import UiBackdrop from '../../atoms/UiBackdrop/UiBackdrop.vue';
import type { BackdropAttrsProps } from '../../atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import type {
  HeadingAttrsProps,
  HeadingProps,
} from '../../atoms/UiHeading/UiHeading.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { TextAttrsProps } from '../../atoms/UiText/UiText.vue';
import type {
  DefineAttrsProps,
  Icon,
} from '../../../types';

export type SidePanelModelValue = boolean;
export interface SidePanelProps {
  /**
   * Use this props or v-model to set value.
   */
  modelValue?: SidePanelModelValue;
  /**
   * Use this props to set side panel title.
   */
  title?: string;
  /**
   * Use this props to set side panel subtitle.
   */
  subtitle?: string;
  /**
   * Use this props to pass attrs for backdrop Transition.
   */
  transitionBackdropAttrs?: TransitionProps;
  /**
   * Use this props to pass attrs for UiBackdrop.
   */
  backdropAttrs?: BackdropAttrsProps;
  /**
   * Use this props to pass attrs for dialog element
   */
  dialogAttrs?: DefineAttrsProps<null, DialogHTMLAttributes>;
  /**
   * Use this props to pass attrs for dialog Transition.
   */
  transitionDialogAttrs?: TransitionProps;
  /**
   * Use this props to pass attrs for title UiHeading.
   */
  headingTitleAttrs?: HeadingAttrsProps;
  /**
   * Use this props to pass attrs for subtitle UiText.
   */
  textSubtitleAttrs?: TextAttrsProps;
  /**
   * Use this props to pass attrs for close UiButton
   */
  buttonCloseAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for close UiIcon
   */
  iconCloseAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for content element
   */
  contentAttrs?: DefineAttrsProps<null>;
}
export type SidePanelAttrsProps = DefineAttrsProps<SidePanelProps>;
export interface SidePanelEmits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'after-enter'): void;
}

const props = withDefaults(defineProps<SidePanelProps>(), {
  modelValue: false,
  title: '',
  subtitle: '',
  transitionBackdropAttrs: () => ({
    appear: true,
    name: 'fade',
  }),
  backdropAttrs: () => ({}),
  dialogAttrs: () => ({}),
  transitionDialogAttrs: () => ({
    appear: true,
    name: 'slide-from-end',
  }),
  headingTitleAttrs: () => ({ level: 2 }),
  textSubtitleAttrs: () => ({}),
  buttonCloseAttrs: () => ({}),
  iconCloseAttrs: () => ({ icon: 'close' }),
  contentAttrs: () => ({}),
});
const emit = defineEmits<SidePanelEmits>();
const button = ref<InstanceType<typeof UiButton>| null>(null);
const enterHandler = async () => {
  await nextTick();
  focusElement(button.value?.$el, true);
};
const afterEnterHandler = () => {
  emit('after-enter');
};
const defaultProps = computed(() => {
  const icon: Icon = 'close';
  const level: HeadingProps['level'] = 2;
  return {
    transitionBackdropAttrs: {
      appear: true,
      name: 'fade',
      ...props.transitionBackdropAttrs,
    },
    transitionDialogAttrs: {
      appear: true,
      name: 'slide-from-end',
      onEnter: enterHandler,
      onAfterEnter: afterEnterHandler,
      ...props.transitionDialogAttrs,
    },
    iconCloseAttrs: {
      icon,
      ...props.iconCloseAttrs,
    },
    headingTitleAttrs: {
      level,
      ...props.headingTitleAttrs,
    },
  };
});
const closeHandler = () => {
  emit('update:modelValue', false);
};
const keydownHandler = ({ key }: KeyboardEvent) => {
  if (key !== 'Escape') return;
  emit('update:modelValue', false);
};
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
@use "../../../styles/transitions";

.ui-side-panel {
  $this: &;
  $element: side-panel;

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
    @include mixins.use-logical($element + "-header", padding, var(--space-20) var(--space-20) var(--space-24));

    display: flex;
    flex: none;
    flex-direction: functions.var($element + "-header", flex-direction, row-reverse);
    justify-content: functions.var($element + "-header", justify-content, space-between);
    background: functions.var($element + "-header", background, var(--color-background-subtle));
    gap: functions.var($element + "-header", gap, var(--space-32));

    @include mixins.from-tablet {
      @include mixins.use-logical(
        $element + "-tablet-header",
        padding,
        var(--space-40) var(--space-40) var(--space-32)
      );
    }
  }

  &__close {
    align-self: flex-end;
  }

  &__label {
    @include mixins.use-logical($element + "-label", padding, 0);

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-label", padding, 0 var(--space-8));
    }
  }

  &__subtitle {
    @include mixins.use-logical($element + "-subtitle", margin, var(--space-8) 0 0);
  }

  &__content {
    @include mixins.use-logical($element + "-content", padding, var(--space-24) var(--space-20));

    overflow: auto;
    height: 100%;
    flex: 1;

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-content", padding, var(--space-32) var(--space-48));
    }

    &:focus {
      outline: none;
    }

    @include mixins.focus {
      box-shadow: var(--focus-outer);
    }
  }
}
</style>

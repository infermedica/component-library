<template>
  <UiContainer
    :class="[
      'ui-controls',
      `ui-controls--${layout}`,
    ]"
  >
    <component
      :is="layoutComponent"
      v-bind="layoutProps"
    >
      <template
        v-for="(_, name) in proxySlots"
        #[name]="data"
      >
        <slot
          :name="name"
          v-bind="data"
        />
      </template>
      <!-- @slot Use this slot to replace container content. -->
      <slot name="container">
        <div
          v-bind="containerAttrs"
          class="ui-controls__container"
        >
          <!-- @slot Use this slot to place container content. -->
          <slot />
        </div>
      </slot>
    </component>
  </UiContainer>
</template>

<script setup lang="ts">
import {
  computed,
  useSlots,
} from 'vue';
import UiContainer from '../UiContainer/UiContainer.vue';
import UiControlsHorizontal from './_internal/layouts/UiControlsHorizontal.vue';
import UiControlsVertical from './_internal/layouts/UiControlsVertical.vue';
import type { ContainerAttrsProps } from '../UiContainer/UiContainer.vue';
import type { ButtonAttrsProps } from '../../atoms/UiButton/UiButton.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import type { DefineAttrsProps } from '../../../types';

export interface ControlsTranslation {
  back?: string;
  next?: string;
}
export type ControlsNavigation = string | Record<string, unknown>;
export interface ControlsCommonProps {
  /**
   * Use this props to move the responsibility to move to the next screen to question content.
   */
  hideNextButton?: boolean;
  /**
   * Use this props to move the responsibility to move to the back screen to question content.
   */
  hideBackButton?: boolean;
  /**
   * Use this props to set route to back screen.
   */
  toBack?: ControlsNavigation;
  /**
   * Use this props to set route to next screen.
   */
  toNext?: ControlsNavigation;
  /**
   * Use this props to set invalid state of the question.
   */
  invalid?: boolean;
  /**
   * Use this props to override labels inside component translation.
   */
  translation?: ControlsTranslation;
  /**
   * Use this props to pass attrs for next UiButton.
   */
  buttonNextAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for back UiButton.
   */
  buttonBackAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for back UiIcon.
   */
  iconBackAttrs?: IconAttrsProps;
}
export interface ControlsProps extends ControlsCommonProps {
  /** Use this props to set direction of controls. */
  layout?: 'horizontal' | 'vertical',
  /**
   *  Use this props to pass attrs to container element.
   */
  containerAttrs?: DefineAttrsProps<null>;
}
export type ControlsAttrsProps = DefineAttrsProps<ControlsProps, ContainerAttrsProps>
export interface ControlsEmits {
  (e: 'has-error'): void;
}

const props = withDefaults(defineProps<ControlsProps>(), {
  hideNextButton: false,
  hideBackButton: false,
  toBack: '',
  toNext: '',
  invalid: true,
  layout: 'horizontal',
  translation: () => ({
    back: 'Back',
    next: 'Next',
  }),
  containerAttrs: () => ({}),
  buttonNextAttrs: () => ({}),
  buttonBackAttrs: () => ({ to: '' }),
  iconBackAttrs: () => ({ icon: 'chevron-left' }),
});
const slots = useSlots();
const proxySlots = Object.keys(slots).reduce((object, slot) => {
  if (slot === 'default') {
    return object;
  }
  return {
    ...object,
    [slot]: slots[slot],
  };
}, {});
const emit = defineEmits<ControlsEmits>();
const hasError = () => {
  emit('has-error');
};
const defaultProps = computed(() => {
  const icon: IconAttrsProps['icon'] = 'chevron-left';
  return {
    translation: {
      back: 'Back',
      next: 'Next',
      ...props.translation,
    },
    buttonBackAttrs: {
      to: props.toBack,
      ...props.buttonBackAttrs,
    },
    iconBackAttrs: {
      icon,
      ...props.iconBackAttrs,
    },
    buttonNextAttrs: {
      onClick: props.invalid
        ? hasError
        : undefined,
      to: props.invalid
        ? undefined
        : props.toNext,
      ...props.buttonNextAttrs,
    },
  };
});
const layoutComponent = computed(() => (
  props.layout === 'horizontal'
    ? UiControlsHorizontal
    : UiControlsVertical
));

const layoutProps = computed(() => {
  const {
    layout, containerAttrs, ...rest
  } = props;
  return {
    ...rest,
    ...defaultProps.value,
  };
});

</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-controls {
  $this: &;
  $element: controls;

  @include mixins.override-logical(container, null, padding, 0);
  @include mixins.override-logical(container-tablet, null, padding, 0);
  @include mixins.override-logical(container-desktop, null, padding, 0);

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__container {
    @include mixins.use-logical($element + "-container", padding, var(--space-32) var(--space-20));

    flex: 1;
    align-self: stretch;

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-container", padding, var(--space-48) var(--space-64));
    }
  }

  &--vertical {
    --container-box-shadow: transparent;

    & #{$this}__container {
      @include mixins.use-logical($element + "-container", padding, 0);
      @include mixins.use-logical($element + "-container", margin, var(--space-12) 0 var(--space-24) 0);

      @include mixins.from-tablet {
        @include mixins.use-logical($element + "-tablet-container", padding, 0);
      }
    }
  }
}
</style>

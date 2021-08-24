<template>
  <div
    class="ui-range"
    :style="{'--range-selected-track-width': trackWidth}"
    v-bind="getRootAttrs($attrs)"
  >
    <!-- @slot Use this slot to replace decrement template. -->
    <slot
      name="decrement"
      v-bind="{attrs: buttonDecrementAttrs, change: changeHandler, value: modelValue}"
    >
      <UiButton
        class="ui-range__decrement ui-button--outlined ui-button--circled ui-button--has-icon"
        tabindex="-1"
        v-bind="buttonDecrementAttrs"
        @click="changeHandler(modelValue, -1)"
      >
        <UiIcon
          icon="minus"
        />
      </UiButton>
    </slot>
    <div class="ui-range__input">
      <!-- @slot Use this slot to replace value template. -->
      <slot
        name="value"
        v-bind="{value: modelValue}"
      >
        <div class="ui-range__value">
          {{ modelValue }}
        </div>
      </slot>
      <!-- @slot Use this slot to replace range template. -->
      <slot
        name="range"
        v-bind="{attrs: getInputAttrs($attrs), min, max, value: modelValue, change: changeHandler}"
      >
        <input
          v-keyboard-focus
          v-bind="getInputAttrs($attrs)"
          type="range"
          :min="min"
          :max="max"
          :value="modelValue"
          :aria-valuemin="min"
          :aria-valuemax="max"
          :aria-valuenow="modelValue"
          class="ui-range__track"
          @input="changeHandler($event.target.value)"
        >
      </slot>
    </div>
    <!-- @slot Use this slot to replace increment template.-->
    <slot
      name="increment"
      v-bind="{attrs: buttonIncrementAttrs, change: changeHandler, value: modelValue}"
    >
      <UiButton
        class="ui-range__increment ui-button--outlined ui-button--circled ui-button--has-icon"
        tabindex="-1"
        v-bind="buttonIncrementAttrs"
        @click="changeHandler(modelValue, 1)"
      >
        <UiIcon
          icon="plus"
        />
      </UiButton>
    </slot>
  </div>
</template>

<script>
import { computed } from 'vue';
import UiButton from '../UiButton/UiButton.vue';
import UiIcon from '../UiIcon/UiIcon.vue';
import useInput from '../../../composable/useInput';
import { keyboardFocus } from '../../../utilities/directives';

export default {
  name: 'UiRange',
  components: {
    UiButton,
    UiIcon,
  },
  directives: {
    keyboardFocus,
  },
  inheritAttrs: false,
  props: {
    /**
     * Use this props or v-model to set value.
     */
    modelValue: {
      type: [String, Number],
      default: '',
    },
    /**
     * Use this props to set min value.
     */
    min: {
      type: [String, Number],
      default: '0',
    },
    /**
     * Use this props to set max value.
     */
    max: {
      type: [String, Number],
      default: '1',
    },
    /**
     * Use this props to pass attrs for decrement UiButton
     */
    buttonDecrementAttrs: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Use this props to pass attrs for increment UiButton
     */
    buttonIncrementAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { getRootAttrs, getInputAttrs } = useInput();
    const trackWidth = computed(() => {
      const value = parseInt(props.modelValue, 10);
      const min = parseInt(props.min, 10);
      const max = parseInt(props.max, 10);
      const scope = max - min;
      const position = value - min;
      return `${(position / scope) * 100}%`;
    });
    function valueValidation(value) {
      return value >= parseInt(props.min, 10) && value <= parseInt(props.max, 10);
    }
    function changeHandler(value, modifier = 0) {
      const newValue = parseInt(value, 10) + modifier;
      if (valueValidation(newValue)) {
        emit('update:modelValue', `${newValue}`);
      }
    }

    return {
      getInputAttrs,
      getRootAttrs,
      trackWidth,
      changeHandler,
    };
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';

.ui-range {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding:
    calc(
      var(--range-thumb-size, 3rem)
      + var(--range-label-spacing-bottom, 0.5rem)
    ) 0 0 0;
  touch-action: none;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }

  @media (hover: hover) {
    &:hover {
      --range-thumb-background-color:
        var(
          --range-thumb-hover-background-color,
          var(--color-range-slider-thumb-background-hover)
        );

      &:active {
        --range-thumb-background-color:
          var(
            --range-thumb-active-background-color,
            var(--color-range-slider-thumb-background-active)
          );
      }
    }
  }

  &__increment {
    margin: var(--range-mobile-increment-margin, var(--space-24) 0 0 var(--space-12));

    [dir=rtl] & {
      margin: var(--range-mobile-increment-margin, var(--space-24) var(--space-12) 0 0);
    }

    @media (min-width: 768px) {
      --range-mobile-increment-margin: 0 0 0 var(--space-4);

      [dir=rtl] & {
        --range-mobile-increment-margin: 0 var(--space-4) 0 0;
      }
    }
  }

  &__decrement {
    margin: var(--range-mobile-decrement-margin, var(--space-24) var(--space-12) 0 0);

    [dir=rtl] & {
      margin: var(--range-mobile-increment-margin, var(--space-24) 0 0 var(--space-12));
    }

    @media (min-width: 768px) {
      --range-mobile-decrement-margin: 0 var(--space-4) 0 0;

      [dir=rtl] & {
        --range-mobile-increment-margin: 0 0 0 var(--space-4);
      }
    }
  }

  &__input {
    position: relative;
    flex: 0 0 100%;
    order: -1;
    width: 100%;
    height: var(--range-thumb-size, 3rem);
    margin: var(--range-track-margin);

    @media (min-width: 768px) {
      flex: 0 1 auto;
      order: 0;
    }

    &::after {
      width: calc(var(--range-selected-track-width) - var(--space-24));
      background: var(--range-selected-track-background, var(--color-range-slider-bar-indicator));
    }

    &::before {
      width: calc(100% - (2 * var(--space-24)));
      background: var(--range-track-background, var(--color-range-slider-bar-track));
    }

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 0;
      height: var(--range-track-height, 4px);
      content: "";
      border-radius: var(--range-track-border-radius, 4px);
      transform: translateX(var(--space-24)) translateY(-50%);

      [dir=rtl] & {
        right: 0;
        left: auto;
        transform: translateX(calc(var(--space-24) * -1)) translateY(-50%);
      }
    }
  }

  &__track {
    position: absolute;
    top: 50%;
    z-index: 1;
    width: 100%;
    margin: 0;
    cursor: pointer;
    background: transparent;
    outline: none;
    transform: translateY(-50%);
    -webkit-appearance: none;

    @mixin range-thumb {
      width: var(--range-thumb-size, 3rem);
      height: var(--range-thumb-size, 3rem);
      background-color: var(--range-thumb-background-color, var(--color-range-slider-thumb-background-enabled));
      background-image:
        var(
          --range-thumb-background-image,
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath d='M34 12l-2.828 2.828L40.344 24l-9.172 9.172L34 36l12-12zm0 0M14 12l2.828 2.828L7.656 24l9.172 9.172L14 36 2 24zm0 0' fill-rule='evenodd' fill='%23fff'/%3E%3C/svg%3E%0A")
        );
      background-repeat: no-repeat;
      background-position: center;
      background-size: var(--range-thumb-background-size, 1.5rem);
      border: 0;
      border-radius: var(--range-thumb-border-radius, 50%);
      box-shadow: 0 1px 3px 0 rgba(148, 164, 179, 0.2);
    }

    @mixin range-thumb-focus {
      outline: none;
      box-shadow: var(--box-shadow-outline);
    }

    &::-webkit-slider-thumb {
      @include range-thumb;

      -webkit-appearance: none;
    }

    &:focus::-webkit-slider-thumb {
      @include range-thumb-focus;
    }

    &::-moz-range-thumb {
      @include range-thumb;
    }

    &:focus::-moz-range-thumb {
      @include range-thumb-focus;
    }
  }

  &__value {
    @include font(h1);

    position: absolute;
    left: var(--range-selected-track-width);
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--range-thumb-size, 3rem);
    color: var(--range-value-color, var(--color-text-body));
    transform:
      translate3d(
        calc(var(--range-selected-track-width) * -1),
        calc((var(--range-thumb-size, 3rem) + var(--space-8)) * -1),
        0
      );
    transform-origin: center;

    [dir=rtl] & {
      right: var(--range-selected-track-width);
      left: auto;
      transform:
        translate3d(
          var(--range-selected-track-width),
          calc((var(--range-thumb-size, 3rem) + var(--space-8)) * -1),
          0
        );
    }
  }
}
</style>

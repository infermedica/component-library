<template>
  <div
    class="ui-range"
    :style="{'--range-selected-track-width': trackWidth}"
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
      <slot name="value">
        <div class="ui-range__value">
          {{ modelValue }}
        </div>
      </slot>
      <!-- @slot Use this slot to replace range template. -->
      <slot name="range">
        <input
          v-bind="$attrs"
          type="range"
          :min="min"
          :max="max"
          :value="modelValue"
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

export default {
  name: 'UiRange',
  components: {
    UiButton,
    UiIcon,
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
      trackWidth,
      changeHandler,
    };
  },
};
</script>

<style lang="scss">
.ui-range {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding:
    calc(
      var(--range-thumb-size, 3rem)
      + var(--range-label-spacing-bottom, 0.5rem)
    ) 0 0 0;

  @media (min-width: 480px) {
    flex-wrap: nowrap;
  }

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

  &__increment {
    margin: var(--range-mobile-increment-margin, var(--space-24) 0 0 var(--space-12));

    @media (min-width: 480px) {
      --range-mobile-increment-margin: 0;
    }
  }

  &__decrement {
    margin: var(--range-mobile-decrement-margin, var(--space-24) var(--space-12) 0 0);

    @media (min-width: 480px) {
      --range-mobile-decrement-margin: 0;
    }
  }

  &__input {
    position: relative;
    flex: 0 0 100%;
    order: -1;
    width: 100%;
    height: var(--range-thumb-size, 3rem);
    margin: var(--range-track-margin, 0 1rem);

    @media (min-width: 480px) {
      flex: 0 1 auto;
      order: 0;
    }

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 0;
      height: var(--range-track-height, 4px);
      content: "";
      border-radius: var(--range-track-border-radius, 4px);
    }

    &::after {
      width: var(--range-selected-track-width);
      background: var(--range-selected-track-background, var(--color-range-slider-bar-indicator));
    }

    &::before {
      width: 100%;
      background: var(--range-track-background, var(--color-range-slider-bar-track));
    }
  }

  &__track {
    position: relative;
    z-index: 1;
    width: 100%;
    margin: 0;
    cursor: pointer;
    background: transparent;
    outline: none;
    -webkit-appearance: none;

    @mixin range-thumb {
      width: var(--range-thumb-size, 3rem);
      height: var(--range-thumb-size, 3rem);
      background:
        var(
          --range-thumb-background-image,
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs/%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M17 6l-1.4142 1.4142L20.1716 12l-4.5858 4.5858L17 18l6-6-6-6zM7 6l1.4142 1.4142L3.8284 12l4.5858 4.5858L7 18l-6-6 6-6z' clip-rule='evenodd'/%3E%3C/svg%3E"),
          #ffff
        );
      background-color: var(--range-thumb-background-color, var(--color-range-slider-thumb-background-enabled));
      background-repeat: no-repeat;
      background-position: center;
      background-size: var(--range-thumb-background-size, 2rem);
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
    position: absolute;
    left: var(--range-selected-track-width);
    font: var(--range-value-font, var(--font-h1));
    text-align: center;
    transform:
      translate(
        calc(var(--range-selected-track-width) * -1),
        calc(
          (
            var(--range-thumb-size, 2.5rem)
            + var(--range-label-spacing-bottom, 0.5rem)
          ) * -1
        )
      );
    transform-origin: center;
  }
}
</style>

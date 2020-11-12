<template>
  <div
    class="ui-range"
    :style="{'--range-selected-track-width': trackWidth}"
  >
    <!-- @slot Use this slot to replace decrement template. -->
    <slot
      name="decrement"
      v-bind="{change: changeHandler, value: modelValue}"
    >
      <UiButton
        class="ui-button--outlined ui-range__decrement"
        @click="changeHandler(modelValue, -1)"
      >
        -
      </UiButton>
    </slot>
    <div class="ui-range__input">
      <!-- @slot Use this slot to replace value template. -->
      <slot name="value">
        <div class="ui-range__value">
          {{ modelValue }}
        </div>
      </slot>
      <input
        v-bind="$attrs"
        type="range"
        :min="min"
        :max="max"
        :value="modelValue"
        class="ui-range__track"
        @input="changeHandler($event.target.value)"
      >
    </div>
    <!-- @slot Use this slot to replace increment template.-->
    <slot
      name="increment"
      v-bind="{change: changeHandler, value: modelValue}"
    >
      <UiButton
        class="ui-button--outlined ui-range__increment"
        @click="changeHandler(modelValue, 1)"
      >
        +
      </UiButton>
    </slot>
  </div>
</template>

<script>
import { computed } from 'vue';
import UiButton from '../UiButton/UiButton.vue';

export default {
  name: 'UiRange',
  components: {
    UiButton,
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
    function changeHandler(value, modifier = 0) {
      const newValue = parseInt(value, 10) + modifier;
      emit('update:modelValue', `${newValue}`);
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
  align-items: center;
  padding:
    calc(
      var(--range-thumb-size, 2.5rem)
      + var(--range-label-spacing-bottom, 0.5rem)
    ) 0 0 0;

  &__input {
    position: relative;
    display: flex;
    width: 100%;
    height: var(--range-thumb-size, 2.5rem);
    margin: var(--range-track-margin, 0 1rem);

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
      background: var(--range-selected-track-background, #1ac98e);
    }

    &::before {
      width: 100%;
      background: var(--range-track-background, #dbe1e6);
    }
  }

  &__track {
    position: relative;
    z-index: 1;
    width: 100%;
    margin: 0;
    background: transparent;
    outline: none;
    -webkit-appearance: none;

    &::-webkit-slider-thumb {
      width: var(--range-thumb-size, 2.5rem);
      height: var(--range-thumb-size, 2.5rem);
      background:
        var(
          --range-thumb-background,
          url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%226%22%20height%3D%2216%22%20viewBox%3D%220%200%206%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%3Cpath%20d%3D%22M0.5%200L0.5%2016M5.5%200V16%22%20stroke%3D%22%23DBE1E6%22/%3E%0A%3C/svg%3E%0A'),
          #ffff
        );
      background-repeat: no-repeat;
      background-position: center;
      border: var(--range-thumb-border, 1px solid #dbe1e6);
      border-radius: var(--range-thumb-border-radius, 50%);
      box-shadow: 0 1px 3px 0 rgba(148, 164, 179, 0.2);
      -webkit-appearance: none;
    }

    &:focus::-webkit-slider-thumb {
      outline: 5px auto Highlight;
      outline: 5px auto -webkit-focus-ring-color;
    }

    &::-moz-range-thumb {
      width: var(--range-thumb-size, 2.5rem);
      height: var(--range-thumb-size, 2.5rem);
      background:
        var(
          --range-thumb-background,
          url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%226%22%20height%3D%2216%22%20viewBox%3D%220%200%206%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%3Cpath%20d%3D%22M0.5%200L0.5%2016M5.5%200V16%22%20stroke%3D%22%23DBE1E6%22/%3E%0A%3C/svg%3E%0A'),
          #ffff
        );
      background-repeat: no-repeat;
      background-position: center;
      border: var(--range-thumb-border, 1px solid #dbe1e6);
      border-radius: var(--range-thumb-border-radius, 50%);
      box-shadow: 0 1px 3px 0 rgba(148, 164, 179, 0.2);
      -webkit-appearance: none;
    }

    &:focus::-moz-range-thumb {
      outline: 5px auto Highlight;
      outline: 5px auto -webkit-focus-ring-color;
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

  &__decrement,
  &__increment {
    --button-height: 34px;
    --button-padding: 0;
    --button-border-radius: 50%;
    --button-color: #1576d1;

    flex: 0 0 34px;
    font-size: 1.5rem;
  }
}
</style>

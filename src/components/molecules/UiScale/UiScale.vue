<template>
  <div class="ui-scale">
    <div class="ui-scale__controls">
      <template
        v-for="(_, index) in maxSteps"
        :key="index"
      >
        <UiRadio
          v-model="scaleValue"
          :value="index"
          :name="scaleName"
          class="ui-scale__option"
          :class="{
            'ui-scale__option--first': index === 0,
            'ui-scale__option--last': index === maxSteps - 1,
          }"
          @mouseover="hoverHandler($event, index)"
          @mouseleave="hoverHandler($event, index)"
        >
          <template #radiobutton>
            <div
              class="ui-scale__radiobutton"
              :class="{ 'ui-scale__radiobutton--is-active': index <= finalValue }"
              :style="calcActiveElementOpacity(index)"
            >
              <div
                class="ui-scale__label"
                :class="{ 'ui-scale__label--is-checked': index == scaleValue }"
              >
                <UiText tag="span">
                  {{ index + 1 }}
                </UiText>
              </div>
              <div class="ui-scale__square" />
            </div>
          </template>
        </UiRadio>
      </template>
    </div>
    <div class="ui-scale__description">
      <UiText>
        {{ translation.mild }}
      </UiText>
      <UiText>
        {{ translation.unbearable }}
      </UiText>
    </div>
    <div class="ui-scale__mobile-controls">
      <!-- @slot Use this slot to replace decrement template. -->
      <slot
        name="decrement"
        v-bind="{attrs: buttonDecrementAttrs, decrement }"
      >
        <UiButton
          class="ui-scale__decrement ui-button--outlined ui-button--circled ui-button--has-icon"
          v-bind="buttonDecrementAttrs"
          @click="decrement"
        >
          <UiIcon
            icon="minus"
          />
        </UiButton>
      </slot>
      <!-- @slot Use this slot to replace increment template. -->
      <slot
        name="increment"
        v-bind="{attrs: buttonIncrementAttrs, increment }"
      >
        <UiButton
          class="ui-scale__increment ui-button--outlined ui-button--circled ui-button--has-icon"
          v-bind="buttonIncrementAttrs"
          @click="increment"
        >
          <UiIcon
            icon="plus"
          />
        </UiButton>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { uid } from 'uid/single';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiRadio from '../../atoms/UiRadio/UiRadio.vue';
import UiText from '../../atoms/UiText/UiText.vue';

const props = defineProps({
  /**
     * Use this props or v-model to set value.
     */
  modelValue: {
    type: Number,
    default: null,
  },
  /**
     * Use this props to set radio name.
     */
  name: {
    type: String,
    default: '',
  },
  /**
     * Use this props to set max value
     */
  steps: {
    type: Number,
    default: 10,
    validator: (value) => value > 0,
  },
  /**
     * Use this props to override labels inside component translation.
     */
  translation: {
    type: Object,
    default: () => ({
      mild: 'Mild',
      unbearable: 'Unbearable',
    }),
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
});
const emit = defineEmits(['update:modelValue']);
const scaleName = computed(() => (
  props.name || `scale-${uid()}`
));
const maxSteps = computed(() => props.steps);
function valueValidation(value) {
  return value >= 0 && value < maxSteps.value;
}
function changeHandler(value, modifier = 0) {
  const newValue = value + modifier;
  if (valueValidation(newValue)) {
    emit('update:modelValue', newValue);
  }
}
const scaleValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    changeHandler(value);
  },
});
const hoverValue = ref(-1);
function hoverHandler({ type }, value) {
  hoverValue.value = type === 'mouseover' ? value : -1;
}
const finalValue = computed(() => (parseInt(hoverValue.value, 10) >= 0 ? hoverValue.value : scaleValue.value));
function decrement() {
  changeHandler(props.modelValue, -1);
}
function increment() {
  changeHandler(props.modelValue, 1);
}
function calcActiveElementOpacity(index) {
  const opacityStepValue = 1 / (maxSteps.value - 1);
  const isActive = index <= finalValue.value;

  return isActive ? {
    '--scale-square-overlay-opacity': (index * opacityStepValue).toFixed(3),
  } : {};
}
</script>

<style lang="scss">
.ui-scale {
  $this: &;

  &__controls {
    display: flex;
  }

  &__option {
    --radio-label-margin: 0;

    position: relative;
    flex: 1;
    justify-content: center;
    border: solid transparent;
    border-width: 0 1px 0 0;

    [dir="rtl"] & {
      border-width: 0 0 0 1px;
    }

    &--first {
      #{$this}__square {
        border-radius: var(--border-radius-form) 0 0 var(--border-radius-form);

        [dir="rtl"] & {
          border-radius: 0 var(--border-radius-form) var(--border-radius-form) 0;
        }
      }
    }

    &--last {
      border-width: 0;

      #{$this}__square {
        border-radius: 0 var(--border-radius-form) var(--border-radius-form) 0;

        [dir="rtl"] & {
          border-radius: var(--border-radius-form) 0 0 var(--border-radius-form);
        }
      }
    }

    &:active {
      transform: var(--scale-option-active-transform, scale(0.96));
    }
  }

  &__radiobutton {
    flex: 1;

    &--is-active {
      --scale-square-base-background: var(--color-dataviz-diverging-moderately-negative);
    }
  }

  &__square {
    position: relative;
    height: 40px;
    overflow: hidden;
    background: var(--scale-square-base-background, var(--color-dataviz-diverging-track));
    border: solid var(--color-white);
    border-width: 0;
    transition: background 200ms ease;

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: "";
      background: var(--scale-square-overlay-background, var(--color-dataviz-diverging-strongly-negative));
      opacity: var(--scale-square-overlay-opacity, 0);
      transition: opacity 200ms ease;
    }
  }

  &__label {
    position: relative;
    width: calc(100% - 1px);
    padding: var(--space-8) 0;
    margin: 0 0 var(--space-8) 0;
    text-align: center;
    border: solid var(--color-white);
    border-width: 0;
    border-radius: var(--border-radius-form);

    &--is-checked {
      --text-color: var(--color-white);

      background: var(--scale-label-background, var(--color-background-selection));

      &::after {
        position: absolute;
        bottom: -2px;
        left: calc(50% - 4px);
        width: 8px;
        height: 8px;
        content: "";
        background: inherit;
        transform: rotate(45deg);
      }
    }
  }

  &__description {
    --text-color: var(--color-text-dimmed);

    display: flex;
    justify-content: space-between;
    margin: var(--space-16) 0 0 0;
  }

  &__mobile-controls {
    display: flex;
    justify-content: center;
    margin: var(--space-32) 0 0 0;

    @media (min-width: 992px) {
      display: none;
    }
  }

  &__decrement {
    margin: 0 var(--space-12) 0 0;

    [dir="rtl"] & {
      margin: 0 0 0 var(--space-12);
    }
  }

  &__increment {
    margin: 0 0 0 var(--space-12);

    [dir="rtl"] & {
      margin: 0 var(--space-12) 0 0;
    }
  }

  input {
    &:focus + #{$this}__radiobutton {
      z-index: 1;
      border-radius: var(--border-radius-outline);
      box-shadow: var(--focus-outer);

      & #{$this}__label {
        width: 100%;
        border: 0;
      }

      & #{$this}__square {
        width: 100%;
        border: 0;
        border-bottom-right-radius: var(--border-radius-outline);
        border-bottom-left-radius: var(--border-radius-outline);
      }
    }
  }
}
</style>

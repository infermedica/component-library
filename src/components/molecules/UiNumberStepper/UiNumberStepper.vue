<template>
  <div
    className="ui-number-stepper"
  >
    <!-- @slot Use this slot to place content inside number stepper. -->
    <slot v-bind="{change, value: modelValue, min, max, step}" />
    <!-- @slot Use this slot to replace decrement template. -->
    <slot
      name="decrement"
      v-bind="{decrement, hasControls, isMin, attrs: buttonDecrementAttrs}"
    >
      <UiButton
        v-if="hasControls"
        v-bind="buttonDecrementAttrs"
        class="ui-button--circled ui-button--outlined ui-button--has-icon ui-number-stepper__decrement"
        :class="{'ui-button--is-disabled': isMin}"
        @click="decrement"
      >
        <UiIcon icon="minus" />
      </UiButton>
    </slot>
    <!-- @slot Use this slot to replace increment template. -->
    <slot
      name="increment"
      v-bind="{increment, hasControls, isMax, attrs: buttonIncrementAttrs}"
    >
      <UiButton
        v-if="hasControls"
        v-bind="buttonIncrementAttrs"
        class="ui-button--circled ui-button--outlined ui-button--has-icon ui-number-stepper__increment"
        :class="{'ui-button--is-disabled': isMax}"
        @click="increment"
      >
        <UiIcon icon="plus" />
      </UiButton>
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

const props = defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * Use this props to set min value.
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * Use this props to set max value.
   */
  max: {
    type: Number,
    default: 1,
  },
  /**
   * Use this props to set step value.
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * Use this props to hide controls.
   */
  hasControls: {
    type: Boolean,
    default: true,
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
const emit = defineEmits(['update:modelValue', 'error']);
const validate = (value) => (value >= props.min && value <= props.max);
const isMin = computed(() => props.modelValue === props.min);
const isMax = computed(() => props.modelValue === props.max);
function change(value, modifier = 0) {
  const newValue = value + modifier;
  if (validate(newValue)) {
    emit('update:modelValue', newValue);
    return;
  }
  emit('error', { isMin: isMin.value, isMax: isMax.value });
}
function decrement() {
  change(props.modelValue, props.step * -1);
}
function increment() {
  change(props.modelValue, props.step);
}
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-number-stepper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @include from-tablet {
    justify-content: flex-start;
  }

  &__decrement {
    margin: var(--quantity-selector-decrement-margin, 0 var(--space-12) 0 0);

    &[dir="rtl"] {
      margin: var(--quantity-selector-decrement-margin, 0 0 0 var(--space-12));
    }

    @include from-tablet {
      order: -1;
      margin: var(--quantity-selector-decrement-margin, 0 var(--space-4) 0 0);

      &[dir="rtl"] {
        margin: var(--quantity-selector-decrement-margin, 0 0 0 var(--space-4));
      }
    }
  }

  &__increment {
    margin: var(--quantity-selector-decrement-increment, 0 0 0 var(--space-12));

    &[dir="rtl"] {
      margin: var(--quantity-selector-decrement-increment, 0 var(--space-12) 0 0);
    }

    @include from-tablet {
      margin: var(--quantity-selector-decrement-increment, 0 0 0 var(--space-4));

      &[dir="rtl"] {
        margin: var(--quantity-selector-decrement-increment, 0 var(--space-4) 0 0);
      }
    }
  }
}
</style>

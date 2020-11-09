<template>
  <div
    class="ui-multiple-choices-item"
    role="group"
    :aria-labelledby="choice.linked_observation"
  >
    <!-- @slot Use this slot to replace name template.-->
    <slot name="name">
      <div
        :id="choice.linked_observation"
        class="ui-multiple-choices-item__name"
      >
        {{ choice.name }}
      </div>
    </slot>
    <template
      v-for="(option, key) in options"
      :key="key"
    >
      <!-- @slot Use this slot to replace option template.-->
      <slot
        name="option"
        v-bind="{option, choice, getRadioValue, getModelValue}"
      >
        <UiRadio
          :model-value="getModelValue(choice)"
          :value="getRadioValue(choice, option)"
          :name="choice.linked_observation"
          class="ui-multiple-choices-item__option"
          @update:model-value="updateHandler"
        >
          {{ option.name }}
        </UiRadio>
      </slot>
    </template>
  </div>
</template>

<script>
import UiRadio from '../../../atoms/UiRadio/UiRadio.vue';

export default {
  name: 'UiMultipleChoicesItem',
  components: { UiRadio },
  props: {
    /**
     *  Use this props or v-model to set checked.
     */
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Use this props to set value of choices item.
     */
    choice: {
      type: Object,
      default: () => ({}),
    },
    /**
     *  Use this props to override default options.
     */
    options: {
      type: Array,
      default: () => ([]),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function getModelValue(choice) {
      return props.modelValue[choice.linked_observation];
    }
    function getRadioValue(choice, option) {
      return {
        id: choice.linked_observation,
        choice_id: option.value,
      };
    }
    function updateHandler(value) {
      emit('update:modelValue', { ...props.modelValue, [value.id]: value });
    }
    return {
      getModelValue,
      getRadioValue,
      updateHandler,
    };
  },
};
</script>

<style lang="scss">
.ui-multiple-choices-item {
  display: flex;
  flex-direction: var(--multiple-choices-item-flex-direction, column);
  align-items: var(--multiple-choices-item-align-items, stretch);

  &__name {
    padding:
      var(
        --multiple-choices-item-name-padding,
        var(--space-12) var(--space-20)
      );
    margin: 0 auto 0 0;
  }

  &__option {
    padding:
      var(
        --multiple-choices-item-option-padding,
        var(--space-8) var(--space-20)
      );
    margin: var(--multiple-choices-item-option-margin, 0);
    white-space: nowrap;
    border:
      var(
        --multiple-choices-item-option-border,
        solid var(--color-border-subtle)
      );
    border-width: var(--multiple-choices-item-option-border-width, 1px 0 0 0);
  }

  @media (min-width: 480px) {
    --multiple-choices-item-flex-direction: row;
    --multiple-choices-item-align-items: center;
    --multiple-choices-item-name-padding: 0;
    --multiple-choices-item-option-margin: 0 0 0 1rem;
    --multiple-choices-item-option-padding: 0;
    --multiple-choices-item-option-border-width: 0;
  }
}
</style>

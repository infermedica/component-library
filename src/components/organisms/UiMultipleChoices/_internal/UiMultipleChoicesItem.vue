<template>
  <div
    class="ui-multiple-choices-item"
    role="group"
    :class="{'ui-multiple-choices-item--has-error': invalid}"
    :aria-labelledby="choice.linked_observation"
  >
    <!-- @slot Use this slot to replace name template.-->
    <slot
      name="name"
      v-bind="{choice}"
    >
      <UiText
        :id="choice.linked_observation"
        class="ui-multiple-choices-item__name"
        tag="span"
      >
        {{ choice.name }}
      </UiText>
    </slot>
    <template
      v-for="(option, key) in options"
      :key="key"
    >
      <!-- @slot Use this slot to replace option template.-->
      <slot
        name="option"
        v-bind="{option, choice, invalid, getRadioValue, getModelValue}"
      >
        <UiRadio
          :model-value="getModelValue(choice)"
          :value="getRadioValue(choice, option)"
          :name="choice.linked_observation"
          class="ui-multiple-choices-item__option"
          :class="{'ui-radio--has-error': invalid}"
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
import UiText from '../../../atoms/UiText/UiText.vue';

export default {
  name: 'UiMultipleChoicesItem',
  components: { UiRadio, UiText },
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
    /**
     * Use this props to set invalid state of choice item.
     */
    invalid: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function getModelValue(choice) {
      return props.modelValue[choice.id];
    }
    function getRadioValue(choice, option) {
      return {
        ...choice,
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
@import '../../../../styles/mixins/_mixins.scss';

.ui-multiple-choices-item {
  display: flex;
  flex-direction: var(--multiple-choices-item-flex-direction, column);
  align-items: var(--multiple-choices-item-align-items, stretch);
  background: var(--multiple-choices-item-background);

  @media (min-width: 768px) {
    flex-direction: var(--multiple-choices-item-flex-direction, row);
    align-items: var(--multiple-choices-item-align-items, center);
  }

  &__name {
    @include font(--font-body-1);

    padding:
      var(
        --multiple-choices-item-name-padding,
        var(--space-32) var(--space-20) var(--space-12)
      );
    background: var(--multiple-choices-item-name-background, var(--color-background-white));

    @media (min-width: 768px) {
      padding: var(--multiple-choices-item-name-padding, 0);
      margin: 0 auto 0 0;
      background: var(--multiple-choices-item-name-background);
    }
  }

  &__option {
    padding:
      var(
        --multiple-choices-item-option-padding,
        var(--space-12) var(--space-20)
      );
    margin: var(--multiple-choices-item-option-margin, 0);
    white-space: nowrap;
    border:
      var(
        --multiple-choices-item-option-border,
        solid var(--color-border-subtle)
      );
    border-width: var(--multiple-choices-item-option-border-width, 1px 0 0 0);

    @media (min-width: 768px) {
      padding: var(--multiple-choices-item-option-padding, 0);
      margin: var(--multiple-choices-item-option-margin, 0 0 0 var(--space-24));
      border-width: var(--multiple-choices-item-option-border-width, 0);
    }
  }

  &--has-error {
    --multiple-choices-item-background: var(--color-background-alert-error);
  }
}
</style>

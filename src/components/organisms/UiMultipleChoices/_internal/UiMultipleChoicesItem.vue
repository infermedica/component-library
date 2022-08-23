<template>
  <component
    :is="tag"
    class="ui-multiple-choices-item"
    role="radiogroup"
    :class="{'ui-multiple-choices-item--has-error': invalid}"
    :aria-labelledby="choiceLabelId"
  >
    <!-- @slot Use this slot to replace legend template. -->
    <slot
      name="legend"
      v-bind="{choice}"
    >
      <legend class="visual-hidden">
        {{ choice.name }}
      </legend>
    </slot>
    <!-- @slot Use this slot to replace name template.-->
    <slot
      name="name"
      v-bind="{choice}"
    >
      <div class="ui-multiple-choices-item__header">
        <UiText
          :id="choiceLabelId"
          class="ui-multiple-choices-item__name"
          tag="span"
        >
          {{ choice.name }}
        </UiText>
        <UiButton
          v-if="choice.buttonInfoAttrs"
          v-bind="choice.buttonInfoAttrs"
          class="ui-multiple-choices-item__info ui-button--small ui-button--text ui-button--has-icon"
        >
          <UiIcon
            icon="info"
            class="ui-button__icon"
          />
          <span class="ui-multiple-choices-item__info-message">
            {{ choice?.translation?.info }}
          </span>
        </UiButton>
      </div>
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
          :name="choice.id"
          class="ui-multiple-choices-item__option"
          :class="{'ui-radio--has-error': invalid}"
          @update:model-value="updateHandler"
        >
          {{ option.name }}
        </UiRadio>
      </slot>
    </template>
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { uid } from 'uid/single';
import UiRadio from '../../../atoms/UiRadio/UiRadio.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';

const props = defineProps({
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
  /**
   * Use this props to set multiple choices item tag.
   */
  tag: {
    type: String,
    default: 'fieldset',
  },
});
const emit = defineEmits(['update:modelValue']);
const choiceLabelId = computed(() => (`choice-label-${props.choice?.id || uid()}`));
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
</script>

<style lang="scss">
@import "../../../../styles/mixins/mixins";

.ui-multiple-choices-item {
  @at-root fieldset#{&} {
    border: none;
    margin: 0;
  }

  display: flex;
  flex-direction: var(--multiple-choices-item-flex-direction, column);
  align-items: var(--multiple-choices-item-align-items, stretch);
  background: var(--multiple-choices-item-background);

  @include from-tablet {
    flex-direction: var(--multiple-choices-item-flex-direction, row);
    align-items: var(--multiple-choices-item-align-items, flex-start);
  }

  &__header {
    @include font(body-1);

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding:
      var(
        --multiple-choices-item-name-padding,
        var(--space-32) var(--space-20) var(--space-12)
      );
    background: var(--multiple-choices-item-name-background, var(--color-background-white));

    @include from-tablet {
      flex-direction: column;
      padding: var(--multiple-choices-item-name-padding, 0);
      margin: 0 auto 0 0;
      background: var(--multiple-choices-item-name-background);

      [dir="rtl"] & {
        margin: 0 0 0 auto;
      }
    }
  }

  &__option {
    padding:
      var(
        --multiple-choices-item-option-padding,
        var(--space-12) var(--space-20)
      );
    border:
      var(
        --multiple-choices-item-option-border,
        solid var(--color-border-subtle)
      );
    border-width: var(--multiple-choices-item-option-border-width, 1px 0 0 0);
    margin: var(--multiple-choices-item-option-margin, 0);
    white-space: nowrap;

    @include from-tablet {
      padding: var(--multiple-choices-item-option-padding, 0);
      border-width: var(--multiple-choices-item-option-border-width, 0);
      margin: var(--multiple-choices-item-option-margin, 0 0 0 var(--space-24));

      [dir="rtl"] & {
        margin: var(--multiple-choices-item-option-margin, 0 var(--space-24) 0 0);
      }
    }
  }

  &--has-error {
    --multiple-choices-item-background: var(--color-background-error);
  }

  &__info {
    @include from-tablet {
      margin: var(--multiple-choices-item-info-margin, var(--space-8) 0 0 0);
    }
  }

  &__info-message {
    @include to-mobile {
      position: absolute;
      overflow: hidden;
      width: 1px;
      height: 1px;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }
  }
}
</style>

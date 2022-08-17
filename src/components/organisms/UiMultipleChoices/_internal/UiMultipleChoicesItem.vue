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
      <div class="ui-multiple-choices-item__header">
        <UiText
          :id="choice.linked_observation"
          tag="span"
          class="ui-multiple-choices-item__name"
        >
          {{ choice.name }}
        </UiText>
        <UiButton
          v-if="choice.buttonInfoAttrs"
          v-bind="choice.buttonInfoAttrs"
          class="ui-button--text ui-button--small ui-multiple-choices-item__info"
        >
          <UiIcon
            icon="info"
            class="ui-button__icon ui-multiple-choices-item__info-icon"
          />
          <span class="ui-multiple-choices-item__info-message">
            {{ choice?.translation?.info }}
          </span>
        </UiButton>
      </div>
    </slot>
    <div
      class="ui-multiple-choices-item__options"
    >
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import UiRadio from '../../../atoms/UiRadio/UiRadio.vue';
import type { RadioValue } from '../../../atoms/UiRadio/UiRadio.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import type {
  MultipleChoice, MultipleChoiceEvidence, MultipleChoiceModelValue, MultipleChoiceOption,
} from '../UiMultipleChoices.vue';

const props = defineProps({
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue: {
    type: Object as PropType<MultipleChoiceModelValue>,
    default: () => ({}),
  },
  /**
   * Use this props to set value of choices item.
   */
  choice: {
    type: Object as PropType<MultipleChoice>,
    default: () => ({}),
  },
  /**
   *  Use this props to override default options.
   */
  options: {
    type: Array as PropType<MultipleChoiceOption[]>,
    default: () => ([]),
  },
  /**
   * Use this props to set invalid state of choice item.
   */
  invalid: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: MultipleChoiceModelValue): void}>();
function getModelValue(choice: MultipleChoiceEvidence): MultipleChoiceEvidence {
  return props.modelValue[choice.id];
}
function getRadioValue(choice: MultipleChoiceEvidence, option: MultipleChoiceOption): MultipleChoiceEvidence {
  return {
    ...choice,
    choice_id: option.value,
  };
}
function updateHandler(value: RadioValue): void {
  const evidence = value as MultipleChoiceEvidence;
  emit('update:modelValue', { ...props.modelValue, [evidence.id]: evidence });
}
</script>

<style lang="scss">
@import "../../../../styles/mixins/mixins";
@import "../../../../styles/functions/functions";

.ui-multiple-choices-item {
  $this: &;
  $element: multiple-choices-item;

  display: flex;
  flex-direction: column;
  padding: css-var($element, padding, var(--space-20) 0 0 0);
  background: css-var($element, background, transparent);

  @include from-tablet {
    flex-direction: row;
    justify-content: space-between;
    padding: css-var($element + "-tablet-choice", padding, var(--space-12));

    @include hover {
      background: css-var($element + "-tablet-hover", background, var(--color-background-white-hover));
    }
  }

  &__header {
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: css-var($element + "-header", padding, var(--space-12) var(--space-20));

    @include from-tablet {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: css-var($element + "-tablet-header", padding, 0);
    }
  }

  &__options {
    display: flex;
    flex-direction: column;

    @include from-tablet {
      flex-direction: row;
    }
  }

  &__option {
    @include inner-border($element: multiple-answer-list-item, $color: var(--color-border-divider), $width: 1px 0 0 0);

    padding: css-var($element + "-option", padding, var(--space-12) var(--space-20));
    margin: css-var($element + "-option", margin, 0);

    @include from-tablet {
      padding: css-var($element + "-tablet-option", padding, 0);
      margin: css-var($element + "-tablet-option", margin, 0 0 0 var(--space-24));

      [dir="rtl"] & {
        margin: css-var($element + "-rtl-tablet-option", margin, 0 var(--space-24) 0 0);
      }

      &::after {
        border-width: 0;
      }
    }
  }

  &__info {
    margin: css-var($element + "-info", margin, 0);

    @include from-tablet {
      margin: css-var($element + "-tablet-info", margin, var(--space-8) 0 0 0);
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

  &__info-icon {
    --button-icon-margin: #{css-var($element + "-info-icon", margin, 0)};
    --button-rtl-icon-margin: #{css-var($element + "-rtl-info-icon", margin, 0)};

    @include from-tablet {
      --button-icon-margin: #{css-var($element + "-tablet-info-icon", margin, 0 var(--space-4) 0 0)};
      --button-rtl-icon-margin: #{css-var($element + "-rtl-tablet-info-icon", margin, 0 0 0 var(--space-4))};
    }
  }

  &--has-error {
    @include from-tablet {
      background: css-var($element + "-tablet", background, var(--color-background-error));

      @include hover {
        background: css-var($element + "-tablet-hover", background, var(--color-background-error));
      }
    }

    #{$this}__option {
      @include to-mobile {
        background: css-var($element + "-option", background, var(--color-background-error));
      }
    }
  }
}
</style>

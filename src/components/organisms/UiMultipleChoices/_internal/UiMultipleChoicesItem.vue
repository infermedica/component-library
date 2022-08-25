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
  </component>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { computed } from 'vue';
import { uid } from 'uid/single';
import UiRadio from '../../../atoms/UiRadio/UiRadio.vue';
import type { RadioValue } from '../../../atoms/UiRadio/UiRadio.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import type {
  MultipleChoice, MultipleChoiceEvidence, MultipleChoiceModelValue, MultipleChoiceOption,
} from '../UiMultipleChoices.vue';
import type { HTMLTag } from '../../../../types/tag';

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
  /**
   * Use this props to set multiple choices item tag.
   */
  tag: {
    type: String as PropType<HTMLTag>,
    default: 'fieldset',
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: MultipleChoiceModelValue): void}>();
const choiceLabelId = computed(() => (`choice-label-${props.choice?.id || uid()}`));

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
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-multiple-choices-item {
  $this: &;
  $element: multiple-choices-item;

  @at-root fieldset#{&} {
    border: none;
    margin: 0;
  }

  display: flex;
  flex-direction: column;
  padding: functions.var($element, padding, var(--space-20) 0 0 0);
  background: functions.var($element, background, transparent);

  @include mixins.from-tablet {
    flex-direction: row;
    justify-content: space-between;
    padding: functions.var($element + "-tablet-choice", padding, var(--space-12));

    @include mixins.hover {
      background: functions.var($element + "-tablet-hover", background, var(--color-background-white-hover));
    }
  }

  &__header {
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: functions.var($element + "-header", padding, var(--space-12) var(--space-20));

    @include mixins.from-tablet {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: functions.var($element + "-tablet-header", padding, 0);
    }
  }

  &__options {
    display: flex;
    flex-direction: column;

    @include mixins.from-tablet {
      flex-direction: row;
    }
  }

  &__option {
    @include mixins.inner-border($element: multiple-answer-list-item, $color: var(--color-border-divider), $width: 1px 0 0 0);

    padding: functions.var($element + "-option", padding, var(--space-12) var(--space-20));
    margin: functions.var($element + "-option", margin, 0);

    @include mixins.from-tablet {
      padding: functions.var($element + "-tablet-option", padding, 0);
      margin: functions.var($element + "-tablet-option", margin, 0 0 0 var(--space-24));

      [dir="rtl"] & {
        margin: functions.var($element + "-rtl-tablet-option", margin, 0 var(--space-24) 0 0);
      }

      &::after {
        border-width: 0;
      }
    }
  }

  &__info {
    margin: functions.var($element + "-info", margin, 0);

    @include mixins.from-tablet {
      margin: functions.var($element + "-tablet-info", margin, var(--space-8) 0 0 0);
    }
  }

  &__info-message {
    @include mixins.to-mobile {
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
    --button-icon-margin: #{functions.var($element + "-info-icon", margin, 0)};
    --button-rtl-icon-margin: #{functions.var($element + "-rtl-info-icon", margin, 0)};

    @include mixins.from-tablet {
      --button-icon-margin: #{functions.var($element + "-tablet-info-icon", margin, 0 var(--space-4) 0 0)};
      --button-rtl-icon-margin: #{functions.var($element + "-rtl-tablet-info-icon", margin, 0 0 0 var(--space-4))};
    }
  }

  &--has-error {
    @include mixins.from-tablet {
      background: functions.var($element + "-tablet", background, var(--color-background-error));

      @include mixins.hover {
        background: functions.var($element + "-tablet-hover", background, var(--color-background-error));
      }
    }

    #{$this}__option {
      @include mixins.to-mobile {
        background: functions.var($element + "-option", background, var(--color-background-error));
      }
    }
  }
}
</style>

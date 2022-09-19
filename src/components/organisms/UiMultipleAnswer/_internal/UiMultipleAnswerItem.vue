<template>
  <component
    :is="component"
    class="ui-multiple-answer-item"
    :class="errorClass"
    :model-value="modelValue"
    :value="choice"
    @update:model-value="emit('update:model-value')"
    @keydown="focusExplication"
  >
    <template #label>
      <slot
        name="label"
        v-bind="{
          choice,
          componentName
        }"
      >
        <div
          class="ui-multiple-answer-item__label"
          :class="`${componentName}__label`"
        >
          <UiText
            v-bind="defaultProps.textLabelAttrs"
          >
            {{ choice.name }}
          </UiText>
          <UiButton
            v-if="buttonInfoAttrs"
            v-bind="buttonInfoAttrs"
            tabindex="-1"
            class="ui-button--icon ui-multiple-answer-item__explication"
            @keydown="unfocusExplication"
          >
            <UiIcon
              v-bind="defaultProps.iconInfoAttrs"
              class="ui-button__icon"
            />
          </UiButton>
        </div>
      </slot>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { ComponentName } from '../UiMultipleAnswer.vue';
import UiRadio from '../../../atoms/UiRadio/UiRadio.vue';
import type { RadioValue } from '../../../atoms/UiRadio/UiRadio.vue';
import UiCheckbox from '../../../atoms/UiCheckbox/UiCheckbox.vue';
import type {
  CheckboxValue,
  CheckboxValueAsObj,
} from '../../../atoms/UiCheckbox/UiCheckbox.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import { focusElement } from '../../../../utilities/helpers/index.ts';

const props = defineProps({
  modelValue: {
    type: [String, Object, Array],
    default: () => ([]),
  },
  choice: {
    type: Object,
    default: () => ({}),
  },
  invalid: {
    type: Boolean,
    default: true,
  },
  buttonInfoAttrs: {
    type: Object,
    default: null,
  },
  textLabelAttrs: {
    type: Object,
    default: () => ({
      tag: 'span',
    }),
  },
  iconInfoAttrs: {
    type: Object,
    default: () => ({
      icon: 'info',
    }),
  },
});
const defaultProps = computed(() => ({
  textLabelAttrs: {
    tag: 'span',
    ...props.textLabelAttrs,
  },
  iconInfoAttrs: {
    icon: 'info',
    ...props.iconInfoAttrs,
  },
}));
const emit = defineEmits(['update:modelValue']);
const isCheckbox = computed(() => (Array.isArray(props.modelValue)));
const component = computed(() => (isCheckbox.value ? UiCheckbox : UiRadio));
const componentName = computed<ComponentName>(() => (isCheckbox.value ? 'ui-checkbox' : 'ui-radio'));
const errorClass = computed<`${ComponentName}--has-error` | ''>(() => ([props.invalid ? `${componentName.value}--has-error` : '', {
  'ui-multiple-answer-item--has-error': props.invalid,
}]));
function focusExplication(event: KeyboardEvent) {
  if (event.key !== 'ArrowRight') return;
  const el = event.target as HTMLInputElement;
  const explicationButton: HTMLInputElement | null | undefined = el.closest(`.${componentName.value}`)?.querySelector('.ui-multiple-answer-item__explication');
  if (explicationButton) {
    event.preventDefault();
    focusElement(explicationButton);
  }
}
function unfocusExplication(event: KeyboardEvent) {
  if (event.key !== 'ArrowLeft') return;
  const el = event.target as HTMLInputElement;
  const answerInput: HTMLInputElement | null | undefined = el.closest(`.${componentName.value}`)?.querySelector('input');
  answerInput?.focus();
}
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-multiple-answer-item {
  $this: &;
  $element: multiple-answer-item;

  padding: functions.var($element + "-choice", padding, var(--space-12) var(--space-20));
  background: functions.var($element + "-choice", background, transparent);

  @include mixins.from-tablet {
    padding: functions.var($element + "-tablet-choice", padding, var(--space-12));

    @include mixins.hover {
      background: functions.var($element + "-tablet-choice-hover", background, var(--color-background-white-hover));
    }
  }

  &--has-error {
    @include mixins.from-tablet {
      background: functions.var($element + "-tablet-option", background, var(--color-background-error));

      @include mixins.hover {
        background: functions.var($element + "-tablet-option-hover", background, var(--color-background-error));
      }
    }
  }

  &__label {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__explication {
    margin: functions.var($element + "-explication", margin, 0 0 0 var(--space-12));
  }
}
</style>

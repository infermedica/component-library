<template>
  <div class="ui-multiple-choices">
    <!-- @slot Use this slot to replace hint template. -->
    <slot
      name="hint"
      v-bind="{
        hint,
        alertHintAttrs,
        hintType,
      }"
    >
      <UiAlert
        v-if="hint"
        v-bind="alertHintAttrs"
        :type="hintType"
        class="ui-multiple-choices__hint"
      >
        {{ hint }}
      </UiAlert>
    </slot>
    <UiList
      ref="multipleChoicesItemsRef"
      class="ui-multiple-choices__items"
    >
      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <!-- @slot Use this slot to replace choice template.-->
        <slot
          name="choice"
          v-bind="{
            value,
            index,
            item,
            options,
            hasError,
            updateHandler,
          }"
        >
          <UiMultipleChoicesItem
            :model-value="value[index]"
            v-bind="item"
            :options="options"
            :invalid="hasError(index)"
            @update:model-value="updateHandler($event, index)"
          />
        </slot>
      </template>
    </UiList>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  watch,
  ref,
  type ComponentPublicInstance,
} from 'vue';
import UiAlert from '../../molecules/UiAlert/UiAlert.vue';
import type { AlertAttrsProps } from '../../molecules/UiAlert/UiAlert.vue';
import UiList from '../UiList/UiList.vue';
import type { RadioAttrsProps } from '../../atoms/UiRadio/UiRadio.vue';
import UiMultipleChoicesItem from './_internal/UiMultipleChoicesItem.vue';
import type { MultipleChoicesItemAttrsProps } from './_internal/UiMultipleChoicesItem.vue';
import type { DefineAttrsProps } from '../../../types/attrs';

export type MultipleChoicesOption = RadioAttrsProps & { label?: string };
export type MultipleChoicesModelValue = string | Record<string, unknown>;
export interface MultipleChoicesProps {
  /**
   * Use this props to set hint for question.
   */
  hint?: string;
  /**
   * Use this props to touch component and show validation errors.
   */
  touched?: boolean;
  /**
   * Use this props to set invalid state of component.
   */
  invalid?: boolean;
  /**
   *  Use this props to set possible choices.
   */
  items?: MultipleChoicesItemAttrsProps[];
  /**
   *  Use this props to set possible options.
   */
  options?: MultipleChoicesOption[];
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue?: MultipleChoicesModelValue[];
  /**
   * Use this props to pass attrs for hint UiAlert
   */
  alertHintAttrs?: AlertAttrsProps;
}
export type MultipleChoicesAttrsProps = DefineAttrsProps<MultipleChoicesProps>;
export interface MultipleChoicesEmits {
  (e: 'update:modelValue', value: MultipleChoicesModelValue[]): void;
  (e: 'update:invalid', value: boolean): void;
}

const props = withDefaults(defineProps<MultipleChoicesProps>(), {
  hint: '',
  touched: false,
  invalid: true,
  items: () => ([]),
  options: () => ([]),
  modelValue: () => ([]),
  alertHintAttrs: () => ({}),
});
const emit = defineEmits<MultipleChoicesEmits>();

const multipleChoicesItemsRef = ref<ComponentPublicInstance | null>(null);
const multipleChoicesItemsWithErrors = computed(() => {
  const multipleChoicesItemsElement = multipleChoicesItemsRef.value;
  if (multipleChoicesItemsElement && multipleChoicesItemsElement.$el instanceof HTMLElement) {
    const inputElement = multipleChoicesItemsRef.value?.$el.querySelectorAll('.ui-radio--has-error > input')[0];
    if (inputElement && inputElement instanceof HTMLInputElement) return inputElement;
  }
  return null;
});

const value = computed<MultipleChoicesModelValue[]>(() => (JSON.parse(JSON.stringify(props.modelValue))));
const valid = computed(() => (value.value.filter(
  (item) => item,
).length === props.items.length));
watch(valid, (newValue) => {
  emit('update:invalid', !newValue);
}, { immediate: true });
const hintType = computed(() => (props.touched && props.invalid ? 'error' : 'default'));

const hasError = (index: number) => {
  if (multipleChoicesItemsWithErrors.value) multipleChoicesItemsWithErrors.value.focus();
  return props.touched && !value.value[index];
};

const updateHandler = (newValue: MultipleChoicesModelValue, index: number) => {
  value.value[index] = newValue;
  emit('update:modelValue', value.value);
};
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-multiple-choices {
  $this: &;
  $element: multiple-choices;

  &__hint {
    @include mixins.use-logical($element + "-hint", padding, 0 0 var(--space-12));
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: functions.var($element + "-items", gap, var(--space-32));

    @include mixins.from-tablet {
      gap: functions.var($element + "-tablet-items", gap, 0);
    }
  }

  &--stacked {
    @include mixins.from-tablet {
      @include mixins.override-logical(multiple-choices-item-tablet-content, null, padding,  0);
      @include mixins.override-logical(multiple-choices-item-tablet-option-content, null, padding,  var(--space-12));

      --multiple-choices-tablet-items-gap: var(--space-32);
      --multiple-choices-item-width-block: 0;
      --multiple-choices-item-tablet-background: transparent;
      --multiple-choices-item-tablet-content-flex-direction: column;
      --multiple-choices-item-tablet-content-gap: var(--space-12);
      --multiple-choices-item-tablet-content-hover-background: transparent;
      --multiple-choices-item-tablet-options-display: block;
      --multiple-choices-item-tablet-choices-gap: var(--space-12);
      --multiple-choices-item-tablet-option-width-block: 1px 0;
      --multiple-choices-item-tablet-option-last-of-type-width-block: 1px;
      --multiple-choices-item-tablet-label-font: var(--font-h4);
      --multiple-choices-item-tablet-label-letter-spacing: var(--letter-spacing-h4);
    }
  }
}
</style>

<template>
  <UiListItem
    :id="id"
    :content-tag="component"
    :class="[
      'ui-multiple-answer-item', errorClass
    ]"
    :value="value"
    :model-value="modelValue"
    v-bind="defaultProps"
    @update:model-value="updateHandler"
    @keydown="focusSuffix"
  >
    <!-- @slot Use this slot to replace choice template.-->
    <template #content>
      <slot
        v-bind="{
          id,
          modelValue,
          value,
          updateHandler,
          invalid,
          label,
        }"
        :name="choiceItem && 'choice-item' || 'choice'"
      />
    </template>
    <!-- @slot Use this slot to replace label template.-->
    <slot
      :name="`label-${id}`"
      v-bind="{ label }"
    >
      {{ label }}
    </slot>
  </UiListItem>
</template>

<script setup lang="ts">
import {
  computed,
  useSlots,
} from 'vue';
import type { PropType } from 'vue';
import type {
  MultipleAnswerLabelAttrs,
  MultipleAnswerSuffixAttrs,
} from '../UiMultipleAnswer.vue';
import UiCheckbox from '../../../atoms/UiCheckbox/UiCheckbox.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';
import UiRadio from '../../../atoms/UiRadio/UiRadio.vue';
import { focusElement } from '../../../../utilities/helpers/index';

export type ComponentName = 'ui-checkbox' | 'ui-radio';
const props = defineProps({
  /**
   * Use this props to set invalid state of item.
   */
  invalid: {
    type: Boolean,
    default: true,
  },
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue: {
    type: [
      String,
      Object,
      Array,
    ],
    default: () => ([]),
  },
  /**
   * Use this props to set value of item.
   */
  value: {
    type: [
      String,
      Object,
    ],
    default: '',
  },
  /**
   * Use this props to set label of item.
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set id of item.
   */
  id: {
    type: String,
    default: '',
  },
  /**
   * Use this props to pass attrs for suffix.
   */
  suffixAttrs: {
    type: Object as PropType<MultipleAnswerSuffixAttrs>,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for label UiText.
   */
  textLabelAttrs: {
    type: Object as PropType<MultipleAnswerLabelAttrs>,
    default: () => ({}),
  },
});
const emit = defineEmits([ 'update:modelValue' ]);
const isCheckbox = computed(() => (Array.isArray(props.modelValue)));
const component = computed(() => (isCheckbox.value ? UiCheckbox : UiRadio));
const componentName = computed<ComponentName>(() => (isCheckbox.value ? 'ui-checkbox' : 'ui-radio'));
const errorClass = computed(() => (props.invalid
  ? `${componentName.value}--has-error ui-list-item--has-error`
  : ''));
function unfocusSuffix(event: KeyboardEvent) {
  if (event.key !== 'ArrowLeft') return;
  const suffixBtn = event.target as HTMLElement;
  const input: HTMLInputElement | null | undefined = suffixBtn.closest('.ui-multiple-answer-item')?.querySelector('input');
  input?.focus();
}
function focusSuffix(event: KeyboardEvent) {
  if (event.key !== 'ArrowRight') return;
  const input = event.target as HTMLInputElement;
  const suffixBtn: HTMLElement | null | undefined = input.closest('.ui-multiple-answer-item')?.querySelector('.ui-list-item-suffix');
  if (suffixBtn) {
    event.preventDefault();
    focusElement(suffixBtn);
  }
}
const updateHandler = (newValue: Record<string, unknown> | Record<string, unknown>[] | string[]) => {
  emit('update:modelValue', newValue);
};
const defaultProps = computed(() => ({
  suffixAttrs: {
    icon: 'info',
    tabindex: -1,
    onkeydown: unfocusSuffix,
    ...props.suffixAttrs,
  },
  textLabelAttrs: {
    tag: 'span',
    ...props.textLabelAttrs,
  },
}));
// TODO: remove in 0.6.0 / BEGIN
const slots = useSlots();
const choiceItem = computed(() => (slots['choice-item']));
if (choiceItem.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiMultipleAnswer]: The `choice-item` slot will be removed in 0.6.0. Please use `choice` slot instead.');
  }
}
// END
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-multiple-answer-item {
  $this: &;
  $element: multiple-answer-item;

  .ui-checkbox, .ui-radio {
    &__label {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

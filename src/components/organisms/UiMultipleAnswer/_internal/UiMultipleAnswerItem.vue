<template>
  <UiListItem
    :class="[
      'ui-multiple-answer-item', { 'ui-list-item--has-error': invalid }
    ]"
    v-bind="defaultProps.listItemAttrs"
  >
    <slot
      :name="choiceItem && 'choice-item' || 'choice'"
      v-bind="{
        id,
        value,
        modelValue,
        textLabelAttrs: defaultProps.textLabelAttrs,
        focusSuffix,
        invalid,
        updateHandler,
        label
      }"
    >
      <component
        :is="component"
        :id="id"
        :value="value"
        :class="[
          'ui-multiple-answer-item__choice', errorClass
        ]"
        :model-value="modelValue"
        :text-label-attrs="defaultProps.textLabelAttrs"
        @update:model-value="updateHandler"
        @keydown="focusSuffix"
      >
        <slot
          :name="`label-${id}`"
          v-bind="{ label }"
        >
          {{ label }}
        </slot>
      </component>
    </slot>
  </UiListItem>
</template>

<script setup lang="ts">
import {
  computed,
  useSlots,
} from 'vue';
import UiCheckbox from '../../../atoms/UiCheckbox/UiCheckbox.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';
import UiRadio from '../../../atoms/UiRadio/UiRadio.vue';
import { focusElement } from '../../../../utilities/helpers/index';
import type { HTMLTag } from '../../../../types/tag';
import type { Icon } from '../../../../types/icon';

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
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for label UiText.
   */
  textLabelAttrs: {
    type: Object,
    default: () => ({ tag: 'span' }),
  },
});
interface DefaultProps {
  textLabelAttrs: {
    tag: HTMLTag;
    [key:string]: unknown;
  };
  listItemAttrs: {
    suffixAttrs: {
      tabindex: number;
      onkeydown: (e: KeyboardEvent) => void;
      icon: Icon;
      [key: string]: unknown;
    };
  }
}
const emit = defineEmits([ 'update:modelValue' ]);
const isCheckbox = computed(() => (Array.isArray(props.modelValue)));
const component = computed(() => (isCheckbox.value ? UiCheckbox : UiRadio));
const componentName = computed<ComponentName>(() => (isCheckbox.value ? 'ui-checkbox' : 'ui-radio'));
const errorClass = computed(() => (props.invalid
  ? `${componentName.value}--has-error`
  : ''));
function unfocusSuffix(event: KeyboardEvent) {
  if (event.key !== 'ArrowLeft') return;
  const suffixBtn = event.target as HTMLElement;
  const answerInput: HTMLInputElement | null | undefined = suffixBtn.closest('.ui-multiple-answer-item')?.querySelector('input');
  answerInput?.focus();
}
function focusSuffix(event: KeyboardEvent) {
  if (event.key !== 'ArrowRight') return;
  const answerInput = event.target as HTMLInputElement;
  const suffixBtn: HTMLElement | null | undefined = answerInput.closest('.ui-multiple-answer-item')?.querySelector('.ui-list-item-suffix');
  if (suffixBtn) {
    event.preventDefault();
    focusElement(suffixBtn);
  }
}
const updateHandler = (newValue: Record<string, unknown> | Record<string, unknown>[] | string[]) => {
  emit('update:modelValue', newValue);
};
const defaultProps = computed<DefaultProps>(() => ({
  textLabelAttrs: {
    tag: 'span',
    ...props.textLabelAttrs,
  },
  listItemAttrs: {
    suffixAttrs: {
      icon: 'info',
      tabindex: -1,
      onkeydown: unfocusSuffix,
      ...props.suffixAttrs,
    },
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

  &__choice {
    flex-grow: 1;
  }
}
</style>

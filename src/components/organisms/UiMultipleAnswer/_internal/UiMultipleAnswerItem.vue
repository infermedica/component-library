<template>
  <UiListItem
    :id="id"
    :tag="component"
    :value="value"
    :model-value="modelValue"
    :has-suffix="hasButtonInfo"
    :suffix-attrs="suffixAttrs"
    :text-label-attrs="defaultProps.textLabelAttrs"
    :class="[
      'ui-multiple-answer-item', errorClass
    ]"
    @update:model-value="handleValueUpdate"
    @keydown="handleButtonInfoFocus"
  >
    <!-- @slot Use this slot to replace choice template.-->
    <template #content>
      <slot
        v-bind="{
          id,
          value,
          invalid,
          label,
          component,
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
import type { MultipleAnswerLabelAttrs } from '../UiMultipleAnswer.vue';
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
   * Use this props to pass attrs for label UiText.
   */
  textLabelAttrs: {
    type: Object as PropType<MultipleAnswerLabelAttrs>,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for info UiButton.
   */
  buttonInfoAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for info label element.
   */
  labelInfoAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   *  Use this props to pass attrs for info UiIcon.
   */
  iconInfoAttrs: {
    type: Object,
    default: () => ({ icon: 'info' }),
  },
  /**
   * Use this props to pass labels inside component translation.
   */
  translation: {
    type: Object,
    default: () => ({ info: 'What does it mean?' }),
  },
});
const emit = defineEmits([ 'update:modelValue' ]);
const isCheckbox = computed(() => (Array.isArray(props.modelValue)));
const component = computed(() => (isCheckbox.value ? UiCheckbox : UiRadio));
const componentName = computed<ComponentName>(() => (isCheckbox.value ? 'ui-checkbox' : 'ui-radio'));
const errorClass = computed(() => (props.invalid
  ? [
    `${componentName.value}--has-error`,
    'ui-list-item--has-error',
  ]
  : []));

function handleButtonInfoFocus(event: KeyboardEvent) {
  if (event.key !== 'ArrowRight') return;
  const input = event.target as HTMLInputElement;
  const buttonInfo: HTMLElement | null | undefined = input
    .closest('.ui-multiple-answer-item')
    ?.querySelector('.ui-multiple-answer-item__button-info');
  if (buttonInfo) {
    event.preventDefault();
    focusElement(buttonInfo);
  }
}
function handleButtonInfoUnfocus(event: KeyboardEvent) {
  if (event.key !== 'ArrowLeft') return;
  const buttonInfo = event.target as HTMLElement;
  const input: HTMLInputElement | null | undefined = buttonInfo
    .closest('.ui-multiple-answer-item')
    ?.querySelector('input');
  if (input) {
    event.preventDefault();
    focusElement(input);
  }
}
const handleValueUpdate = (newValue: Record<string, unknown> | Record<string, unknown>[] | string[]) => {
  emit('update:modelValue', newValue);
};

const defaultProps = computed(() => ({
  translation: {
    ...{ info: 'What does it mean?' },
    ...props.translation,
  },
  textLabelAttrs: {
    tag: 'span',
    ...props.textLabelAttrs,
    class: [
      'ui-multiple-answer-item__label',
      props.textLabelAttrs?.class,
    ],
  },
  iconInfoAttrs: {
    icon: 'info',
    ...props.iconInfoAttrs,
  },
}));
const suffixAttrs = computed(() => ({
  label: defaultProps.value.translation.info,
  tabindex: -1,
  onKeydown: handleButtonInfoUnfocus,
  class: [ 'ui-multiple-answer-item__button-info' ],
  iconSuffixAttrs: defaultProps.value.iconInfoAttrs,
  labelSuffixAttrs: {
    class: [
      'visual-hidden',
      props.labelInfoAttrs?.class,
    ],
    ...props.labelInfoAttrs,
  },
  ...props.buttonInfoAttrs,
}));
const hasButtonInfo = computed(() => (Object.keys(props.buttonInfoAttrs).length > 0));

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

  &__label {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>

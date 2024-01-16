<template>
  <component
    :is="tag"
    class="ui-multiple-answer"
  >
    <!-- @slot Use this slot to replace hint template. -->
    <slot
      name="hint"
      v-bind="{
        hint,
        hintType,
        hintAlertAttrs,
      }"
    >
      <UiAlert
        v-if="hint"
        v-bind="hintAlertAttrs"
        :type="hintType"
        class="ui-multiple-answer__hint"
      >
        {{ hint }}
      </UiAlert>
    </slot>
    <!-- @slot Use this slot to replace legend template. -->
    <slot
      name="legend"
      v-bind="{ legend }"
    >
      <legend
        v-if="legend"
        class="visual-hidden"
      >
        {{ legend }}
      </legend>
    </slot>
    <UiList
      class="ui-multiple-answer__list"
    >
      <template
        v-for="(item, index) in itemsToRender"
        :key="index"
      >
        <!-- @slot Use this slot to replace list-item template.-->
        <slot
          v-bind="{
            value,
            item,
            name,
            hasError,
          }"
          name="list-item"
        >
          <UiMultipleAnswerItem
            v-model="value"
            v-bind="item"
            :invalid="hasError"
          >
            <template
              v-for="(_, slotName) in $slots"
              #[slotName]="data"
            >
              <slot
                v-bind="data"
                :name="slotName"
              />
            </template>
          </UiMultipleAnswerItem>
        </slot>
      </template>
    </UiList>
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  watch,
} from 'vue';
import UiAlert from '../../molecules/UiAlert/UiAlert.vue';
import type { AlertAttrsProps } from '../../molecules/UiAlert/UiAlert.vue';
import UiList from '../UiList/UiList.vue';
import UiMultipleAnswerItem from './_internal/UiMultipleAnswerItem.vue';
import type { MultipleAnswerItemAttrsProps } from './_internal/UiMultipleAnswerItem.vue';
import type {
  DefineAttrsProps,
  HTMLTag,
} from '../../../types';

export type MultipleAnswerModelValue = string | Record<string, unknown> | (string | Record<string, unknown>)[];
export interface MultipleAnswerProps {
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue?: MultipleAnswerModelValue;
  /**
   *  Use this props to set possible items.
   */
  items?: (string | MultipleAnswerItemAttrsProps)[];
  /**
   *  Use this props to group inputs with name attribute
   */
  name?: string;
  /**
   * Use this props to set invalid state of component.
   */
  invalid?: boolean;
  /**
   * Use this props to set hint for question.
   */
  hint?: string;
  /**
   * Use this props to touch component and show validation errors.
   */
  touched?: boolean;
  /**
   * Use this props to pass attrs for hint UiAlert
   */
  hintAlertAttrs?: AlertAttrsProps;
  /**
   * Use this props to set multiple answer tag.
   */
  tag?: HTMLTag;
  /**
   * Use this props to set legend.
   */
  legend?: string;
}
export type MultipleAnswerAttrsProps = DefineAttrsProps<MultipleAnswerProps>;
export interface MultipleAnswerEmits {
  (e:'update:modelValue', value: MultipleAnswerModelValue): void;
  (e: 'update:invalid', value: boolean): void;
}

const props = withDefaults(defineProps<MultipleAnswerProps>(), {
  modelValue: () => ([]),
  items: () => ([]),
  name: '',
  invalid: true,
  hint: '',
  touched: false,
  hintAlertAttrs: () => ({}),
  tag: 'fieldset',
  legend: '',
});
const emit = defineEmits<MultipleAnswerEmits>();
const valid = computed(() => (Array.isArray(props.modelValue)
  ? !!props.modelValue.length
  : !!Object.keys(props.modelValue).length));
const hasError = computed(() => (props.touched && !valid.value));
const hintType = computed<'error'|'default'>(() => (props.touched && props.invalid ? 'error' : 'default'));
watch(valid, (value) => {
  emit('update:invalid', !value);
}, { immediate: true });
const handleValueUpdate = (newValue: MultipleAnswerModelValue) => {
  emit('update:modelValue', newValue);
};
const value = computed({
  get: () => (props.modelValue),
  set: (newValue) => {
    handleValueUpdate(newValue);
  },
});
const itemsToRender = computed(() => (props.items.map((item) => {
  if (typeof item === 'string') {
    return {
      label: item,
      value: item,
      inputAttrs: { name: props.name },
    };
  }
  return {
    value: JSON.parse(JSON.stringify(item)),
    label: item.name as string,
    ...item,
    inputAttrs: {
      name: props.name,
      ...((typeof item.inputAttrs === 'object') ? item.inputAttrs : {}),
    },
  };
})));
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-multiple-answer {
  $this: &;
  $element: multiple-answer;

  @at-root fieldset#{&} {
    padding: 0;
    border: none;
    margin: 0;
  }

  &__hint {
    @include mixins.use-logical($element + "-hint", padding, 0 0 var(--space-12));

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-hint", padding, 0 0 var(--space-12) 0);
    }
  }
}
</style>

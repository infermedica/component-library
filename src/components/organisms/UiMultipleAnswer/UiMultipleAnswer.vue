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
        hintAlertAttrs
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
          name="list-item"
          v-bind="{
            value,
            item,
            name,
            hasError,
          }"
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
  useAttrs,
} from 'vue';
import type { PropType } from 'vue';
import type { Icon } from '../../../types/icon';
import UiAlert from '../../molecules/UiAlert/UiAlert.vue';
import UiList from '../UiList/UiList.vue';
import UiMultipleAnswerItem from './_internal/UiMultipleAnswerItem.vue';

export interface MultipleAnswerSuffixAttrs {
  tabindex?: number;
  onkeydown?: (e: KeyboardEvent) => void;
  icon?: Icon;
}
export interface MultipleAnswerLabelAttrs {
  tag?: HTMLElement;
}
export interface MultipleAnswerItem {
  id?: string;
  label?: string;
  value?: string | Record<string, unknown>,
  name?:string; // TODO: remove in 0.6.0
  hasSuffix?: boolean;
  suffixAttrs?: MultipleAnswerSuffixAttrs;
  textLabelAttrs?: MultipleAnswerLabelAttrs;
}
export type MultipleAnswerValue = string | MultipleAnswerItem | MultipleAnswerItem[] | unknown[];

const props = defineProps({
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
   *  Use this props to set possible items.
   */
  items: {
    type: Array as PropType<MultipleAnswerItem[]>,
    default: () => ([]),
  },
  /**
   *  Use this props to group inputs with name attribute
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set invalid state of component.
   */
  invalid: {
    type: Boolean,
    default: true,
  },
  /**
   * Use this props to set hint for question.
   */
  hint: {
    type: String,
    default: '',
  },
  /**
   * Use this props to touch component and show validation errors.
   */
  touched: {
    type: Boolean,
    default: false,
  },
  /**
   * Use this props to pass attrs for hint UiAlert
   */
  hintAlertAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to set multiple answer tag.
   */
  tag: {
    type: String,
    default: 'fieldset',
  },
  /**
   * Use this props to set legend.
   */
  legend: {
    type: String,
    default: '',
  },
});
const emit = defineEmits<{(e:'update:modelValue', value: MultipleAnswerValue): void,
  (e: 'update:invalid', value: boolean): void
}>();
const isCheckbox = computed(() => (Array.isArray(props.modelValue)));
const valid = computed(() => (isCheckbox.value
  ? (props.modelValue as string).length > 0
  : Object.keys(props.modelValue as MultipleAnswerItem).length > 0));
const hasError = computed(() => (props.touched && !valid.value));
const hintType = computed<'error'|'default'>(() => (props.touched && props.invalid ? 'error' : 'default'));
watch(valid, (value) => {
  emit('update:invalid', !value);
}, { immediate: true });
const handleValueUpdate = (newValue: string | unknown[] | Record<string, unknown>) => {
  emit('update:modelValue', newValue);
};
const value = computed({
  get: () => (props.modelValue),
  set: (newValue) => {
    handleValueUpdate(newValue);
  },
});
const itemsToRender = computed(() => (props.items.map((item) => {
  if (typeof item === 'string' || typeof item === 'number') {
    return {
      label: item,
      value: item,
    };
  }
  // TODO: remove in 0.6.0 / BEGIN
  if (item.name) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[@infermedica/component-library warn][UiMultipleAnswerItem]: The `name` props will be removed in 0.6.0. Please use `label` props instead.');
    }
  }
  // END
  return {
    ...item,
    value: item.value || JSON.parse(JSON.stringify(item)),
    label: item.name || item.label,
  };
})));
// TODO: remove in 0.6.0 / BEGIN
const attrs = useAttrs();
const choices = computed(() => (attrs.choices as MultipleAnswerItem[]));
if (choices.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiMultipleAnswer]: The `choices` props will be removed in 0.6.0. Please use `items` props instead.');
  }
}
// END
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
    padding: functions.var($element + "-hint", padding, 0 var(--space-20) var(--space-12));

    @include mixins.from-tablet {
      padding: functions.var($element + "-tablet-hint", padding, 0 0 var(--space-12) 0);
    }
  }
}
</style>

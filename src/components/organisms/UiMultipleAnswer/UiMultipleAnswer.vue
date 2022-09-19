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
      v-bind="{
        legend
      }"
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
      v-bind="$attrs"
    >
      <template
        v-for="choice in choices"
        :key="choice.id"
      >
        <!-- @slot Use this slot to replace list-item template.-->
        <slot
          name="list-item"
          v-bind="{
            choice,
            modelValue,
            updateHandler,
            name,
          }"
        >
          <UiListItem
            class="ui-multiple-answer__list-item"
          >
            <!-- @slot Use this slot to replace choice-item template.-->
            <slot
              name="choice-item"
              v-bind="{
                choice,
                modelValue,
                updateHandler,
                name,
              }"
            >
              <UiMultipleAnswerItem
                :id="choice.id"
                :model-value="modelValue"
                :choice="choice"
                :value="choice"
                :name="name"
                :invalid="hasError"
                :button-info-attrs="choice.buttonInfoAttrs"
                :text-label-attrs="choice.textLabelAttrs"
                :icon-info-attrs="choice.iconInfoAttrs"
                @update:model-value="updateHandler(choice)"
              >
                <template #label="slotData">
                  <slot
                    :name="`label-${choice.id}`"
                    v-bind="slotData"
                  />
                </template>
              </UiMultipleAnswerItem>
            </slot>
          </UiListItem>
        </slot>
      </template>
    </UiList>
  </component>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import {
  computed,
  watch,
} from 'vue';
import type { PropType } from 'vue';
import UiMultipleAnswerItem from './_internal/UiMultipleAnswerItem.vue';
import UiList from '../UiList/UiList.vue';
import UiListItem from '../UiList/_internal/UiListItem.vue';
import type { RadioValue } from '../../atoms/UiRadio/UiRadio.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type {
  CheckboxValue,
  CheckboxValueAsObj,
} from '../../atoms/UiCheckbox/UiCheckbox.vue';

import type { PropsAttrs } from '../../../types/attrs';
import UiAlert from '../../molecules/UiAlert/UiAlert.vue';
import type { HTMLTag } from '../../../types/tag';

export interface MultipleAnswerChoice extends CheckboxValueAsObj {
  name: string;
  'common_name'?: string;
  source?: string;
  choices?: { id: string; label: string; }
  buttonInfoAttrs?: Record<string, unknown>;
}
export type MultipleAnswerValue = RadioValue | CheckboxValue[];
export type ComponentName = 'ui-checkbox' | 'ui-radio';
const props = defineProps({
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue: {
    type: [String, Object, Array] as PropType<MultipleAnswerValue>,
    default: () => ([]),
  },
  /**
   *  Use this props to set possible choices.
   */
  choices: {
    type: Array as PropType<MultipleAnswerChoice[]>,
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
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to set multiple answer tag.
   */
  tag: {
    type: String as PropType<HTMLTag>,
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
const emit = defineEmits<{(e:'update:modelValue', value: MultipleAnswerChoice | CheckboxValueAsObj[]): void,
  (e: 'update:invalid', value: boolean): void
}>();
const isCheckbox = computed(() => (Array.isArray(props.modelValue)));
const valid = computed(() => (isCheckbox.value
  ? (props.modelValue as string).length > 0
  : !!(props.modelValue as CheckboxValueAsObj).id));
const hasError = computed(() => (props.touched && !valid.value));
const hintType = computed<'error'|'default'>(() => (props.touched && props.invalid ? 'error' : 'default'));

watch(valid, (value) => {
  emit('update:invalid', !value);
}, {
  immediate: true,
});
function updateHandler(value: MultipleAnswerChoice): void {
  if (!isCheckbox.value) {
    emit('update:modelValue', value);
    return;
  }
  const modelValue = props.modelValue as CheckboxValueAsObj[];
  if (modelValue.some((evidence) => evidence.id === value.id)) {
    emit('update:modelValue', modelValue.filter((evidence) => evidence.id !== value.id));
  } else {
    emit('update:modelValue', [...modelValue, value]);
  }
}
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-multiple-answer {
  $this: &;
  $element: multiple-answer;

  @at-root fieldset#{&} {
    border: none;
    padding: 0;
    margin: 0;
  }

  &__hint {
    padding: functions.var($element + "-hint", padding, 0 var(--space-20) var(--space-12));

    @include mixins.from-tablet {
      padding: functions.var($element + "-tablet-hint", padding, 0 0 var(--space-12) 0);
    }
  }

  &__list-item {
    @include mixins.inner-border($element: multiple-answer-list-item, $color: var(--color-border-divider), $width: 1px 0 0 0);

    --list-item-padding: 0;

    &:last-of-type {
      &::after {
        border-width: functions.var($element, border-width, 1px 0);
      }
    }
  }
}
</style>

<template>
  <component
    :is="tag"
    class="ui-multiple-answer"
  >
    <!-- @slot Use this slot to replace hint template. -->
    <slot
      name="hint"
      v-bind="{hint, hintType, alertHintAttrs}"
    >
      <UiAlert
        v-if="hint"
        v-bind="alertHintAttrs"
        :type="hintType"
        class="ui-multiple-answer__hint"
      >
        {{ hint }}
      </UiAlert>
    </slot>
    <!-- @slot Use this slot to replace legend template. -->
    <slot
      name="legend"
      v-bind="{legend}"
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
          v-bind="{choice, modelValue, updateHandler, errorClass, name, component, componentName}"
        >
          <UiListItem
            class="ui-multiple-answer__list-item"
            :class="{'ui-multiple-answer__list-item--has-error': hasError}"
          >
            <!-- @slot Use this slot to replace choice-item template.-->
            <slot
              name="choice-item"
              v-bind="{choice, modelValue, updateHandler, errorClass, name, component, componentName}"
            >
              <component
                :is="component"
                :id="choice.id"
                :value="choice"
                :model-value="modelValue"
                :name="name"
                class="ui-multiple-answer__choice"
                :class="errorClass"
                @update:modelValue="updateHandler(choice)"
                @keydown="focusExplication"
              >
                <template #label>
                  <!-- @slot Use this slot to replace choice-label template for specific item.-->
                  <slot
                    :name="`label-${choice.id}`"
                    v-bind="{choice, componentName}"
                  >
                    <div
                      class="ui-multiple-answer__label"
                      :class="`${componentName}__label`"
                    >
                      <UiText
                        tag="span"
                      >
                        {{ choice.name }}
                      </UiText>
                      <UiButton
                        v-if="choice.buttonInfoAttrs"
                        v-bind="choice.buttonInfoAttrs"
                        tabindex="-1"
                        class="ui-multiple-answer__explication ui-button--text ui-button--has-icon"
                        @keydown="unfocusExplication"
                      >
                        <UiIcon icon="info" />
                      </UiButton>
                    </div>
                  </slot>
                </template>
              </component>
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
import { computed, watch } from 'vue';
import type { PropType } from 'vue';
import UiList from '../UiList/UiList.vue';
import UiListItem from '../UiList/_internal/UiListItem.vue';
import UiRadio from '../../atoms/UiRadio/UiRadio.vue';
import type { RadioValue } from '../../atoms/UiRadio/UiRadio.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiCheckbox from '../../atoms/UiCheckbox/UiCheckbox.vue';
import type { CheckboxValue, CheckboxValueAsObj } from '../../atoms/UiCheckbox/UiCheckbox.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { PropsAttrs } from '../../../types/attrs';
import UiAlert from '../../molecules/UiAlert/UiAlert.vue';
import { focusElement } from '../../../utilities/helpers';

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
  alertHintAttrs: {
    type: Object as PropsAttrs,
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
const emit = defineEmits<{(e:'update:modelValue', value: MultipleAnswerChoice | CheckboxValueAsObj[]): void,
  (e: 'update:invalid', value: boolean): void
}>();
const isCheckbox = computed(() => (Array.isArray(props.modelValue)));
const component = computed(() => (isCheckbox.value ? UiCheckbox : UiRadio));
const componentName = computed<ComponentName>(() => (isCheckbox.value ? 'ui-checkbox' : 'ui-radio'));
const valid = computed(() => (isCheckbox.value
  ? (props.modelValue as string).length > 0
  : !!(props.modelValue as CheckboxValueAsObj).id));
const hasError = computed(() => (props.touched && !valid.value));
const hintType = computed<'error'|'default'>(() => (props.touched && props.invalid ? 'error' : 'default'));
const errorClass = computed<`${ComponentName}--has-error` | ''>(() => (hasError.value ? `${componentName.value}--has-error` : ''));
watch(valid, (value) => {
  emit('update:invalid', !value);
}, { immediate: true });
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
function focusExplication(event: KeyboardEvent) {
  if (event.key !== 'ArrowRight') return;
  const el = event.target as HTMLInputElement;
  const explicationButton: HTMLInputElement | null | undefined = el.closest(`.${componentName.value}`)?.querySelector('.ui-multiple-answer__explication');
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
@import "../../../styles/mixins/mixins";

.ui-multiple-answer {
  @at-root fieldset#{&} {
    border: none;
    padding: 0;
    margin: 0;
  }

  &__list-item {
    @include inner-border($element: multiple-answer-list-item, $color: var(--color-border-divider), $width: 1px 0 0 0);

    --list-item-padding: 0;

    background: var(--multiple-answer-list-item-background);

    &:last-of-type {
      --multiple-answer-list-item-border-width: var(--multiple-answer-list-item-last-border-width, 1px 0);
    }

    @media (hover: hover) {
      &:hover {
        background: var(--multiple-answer-list-item-hover-background);

        @include from-tablet {
          background: var(--multiple-answer-list-item-tablet-hover-background, var(--color-gray-50));
        }
      }
    }

    &--has-error {
      --multiple-answer-list-item-background: var(--color-background-error);
    }
  }

  &__hint {
    margin: var(--multiple-answer-mobile-hint-margin, 0 var(--space-20) var(--space-12) var(--space-20));
    color: var(--multiple-answer-hint-color, var(--color-text-dimmed));

    @include from-tablet {
      margin: var(--multiple-answer-tablet-hint-margin, 0 0 var(--space-12) 0);
    }
  }

  &__choice {
    width: 100%;
    padding: var(--multiple-answer-choice-padding, var(--space-12) var(--space-20));

    @include from-tablet {
      padding: var(--multiple-answer-tablet-choice-padding, var(--space-12));
    }
  }

  &__label {
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__explication {
    margin: var(--multiple-answer-margin, 0 0 0 var(--space-12));

    [dir="rtl"] & {
      margin: var(--multiple-answer-margin, 0 var(--space-12) 0 0);
    }
  }
}
</style>

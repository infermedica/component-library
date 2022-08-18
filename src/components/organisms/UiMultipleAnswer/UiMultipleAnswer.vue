<template>
  <component
    :is="tag"
    class="ui-miltiple-answer"
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
                @update:model-value="updateHandler(choice)"
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
                        class="ui-button--icon ui-multiple-answer__explication"
                        @keydown="unfocusExplication"
                      >
                        <UiIcon
                          icon="info"
                          class="ui-button__icon"
                        />
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
import { focusElement } from '../../../utilities/helpers/index.ts';
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
  alertHintAttrs: {
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
const component = computed(() => (isCheckbox.value ? UiCheckbox : UiRadio));
const componentName = computed<ComponentName>(() => (isCheckbox.value ? 'ui-checkbox' : 'ui-radio'));
const valid = computed(() => (isCheckbox.value
  ? (props.modelValue as string).length > 0
  : !!(props.modelValue as CheckboxValueAsObj).id));
const hasError = computed(() => (props.touched && !valid.value));
const hintType = computed<'error'|'default'>(() => (props.touched && props.invalid ? 'error' : 'default'));
const errorClass = computed<`${ComponentName}--has-error` | ''>(() => ([hasError.value ? `${componentName.value}--has-error` : '', { 'ui-multiple-answer__choice--has-error': hasError.value }]));
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
@import "../../../styles/functions/functions";

.ui-multiple-answer {
  $this: &;
  $element: multiple-answer;

  border: none;

  &__hint {
    padding: css-var($element + "-hint", padding, 0 var(--space-20) var(--space-12));

    @include from-tablet {
      padding: css-var($element + "-tablet-hint", padding, 0 0 var(--space-12) 0);
    }
  }

  &__list-item {
    @include inner-border($element: multiple-answer-list-item, $color: var(--color-border-divider), $width: 1px 0 0 0);

    --list-item-padding: 0;

    &:last-of-type {
      &::after {
        border-width: css-var($element, border-width, 1px 0);
      }
    }
  }

  &__label {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__choice {
    padding: css-var($element + "-choice", padding, var(--space-12) var(--space-20));
    background: css-var($element + "-choice", background, transparent);

    @include from-tablet {
      padding: css-var($element + "-tablet-choice", padding, var(--space-12));

      @include hover {
        background: css-var($element + "-tablet-hover", background, var(--color-background-white-hover));
      }
    }

    &--has-error {
      @include from-tablet {
        background: css-var($element + "-tablet-option", background, var(--color-background-error));

        @include hover {
          background: css-var($element + "-tablet-option-hover", background, var(--color-background-error));
        }
      }
    }
  }

  &__explication {
    margin: css-var($element + "-explication", margin, 0 0 0 var(--space-12));
  }
}
</style>

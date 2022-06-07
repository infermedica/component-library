<template>
  <div class="ui-miltiple-answer">
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
          v-bind="{choice, modelValue, updateHandler, errorClass, name, component}"
        >
          <UiListItem
            class="ui-multiple-answer__list-item"
            :class="{'ui-multiple-answer__list-item--has-error': hasError}"
          >
            <!-- @slot Use this slot to replace choice-item template.-->
            <slot
              name="choice-item"
              v-bind="{choice, modelValue, updateHandler, errorClass, name, component}"
            >
              <component
                :is="isCheckbox ? UiCheckbox : UiRadio"
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
                    v-bind="{choice, component}"
                  >
                    <div
                      class="ui-multiple-answer__label"
                      :class="`${component}__label`"
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
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { computed, watch } from 'vue';
import UiList from '../UiList/UiList.vue';
import UiListItem from '../UiList/_internal/UiListItem.vue';
import UiRadio from '../../atoms/UiRadio/UiRadio.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiCheckbox from '../../atoms/UiCheckbox/UiCheckbox.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiAlert from '../../atoms/UiAlert/UiAlert.vue';
import { focusElement } from '../../../utilities/helpers';

const props = defineProps({
  /**
     *  Use this props or v-model to set checked.
     */
  modelValue: {
    type: [String, Object, Array],
    default: () => ([]),
  },
  /**
     *  Use this props to set possible choices.
     */
  choices: {
    type: Array,
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
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['update:modelValue', 'update:invalid']);
const component = computed(() => (Array.isArray(props.modelValue) ? 'ui-checkbox' : 'ui-radio'));
const isCheckbox = computed(() => (component.value === 'ui-checkbox'));
const valid = computed(() => (isCheckbox.value
  ? props.modelValue.length > 0
  : props.modelValue.id));
const hasError = computed(() => (props.touched && !valid.value));
const hintType = computed(() => (props.touched && props.invalid ? 'error' : 'default'));
const errorClass = computed(() => (hasError.value ? `${component.value}--has-error` : ''));

watch(valid, (value) => {
  emit('update:invalid', !value);
}, { immediate: true });

function updateHandler(value) {
  if (!isCheckbox.value) {
    emit('update:modelValue', value);
    return;
  }
  if (props.modelValue.some((evidence) => evidence.id === value.id)) {
    emit('update:modelValue', props.modelValue.filter((evidence) => evidence.id !== value.id));
  } else {
    emit('update:modelValue', [...props.modelValue, value]);
  }
}

function focusExplication(event) {
  const explicationButton = event.target.closest(`.${component.value}`).querySelector('.ui-multiple-answer__explication');
  if (explicationButton && event.key === 'ArrowRight') {
    event.preventDefault();
    focusElement(explicationButton);
  }
}
function unfocusExplication(event) {
  const answerInput = event.target.closest(`.${component.value}`).querySelector('input');
  if (answerInput && event.key === 'ArrowLeft') {
    focusElement(answerInput);
  }
}
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-multiple-answer {
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

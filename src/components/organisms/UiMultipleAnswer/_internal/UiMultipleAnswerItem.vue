<template>
  <component
    :is="component"
    :id="id"
    :value="value"
    :class="[
      'ui-multiple-answer-item', errorClass
    ]"
    :model-value="modelValue"
    @update:model-value="handleUpdateModelValue"
    @keydown="focusExplication"
  >
    <template #label>
      <slot
        name="label"
        v-bind="{
          id,
          componentName,
          textLabelAttrs: defaultProps.textLabelAttrs,
          name:label,
          label,
          buttonInfoAttrs,
          unfocusExplication,
          iconInfoAttrs: defaultProps.iconInfoAttrs,
        }"
      >
        <div
          :class="[
            'ui-multiple-answer-item__label',`${componentName}__label`
          ]"
        >
          <UiText
            v-bind="defaultProps.textLabelAttrs"
          >
            {{ label }}
          </UiText>
          <UiButton
            v-if="buttonInfoAttrs"
            v-bind="buttonInfoAttrs"
            tabindex="-1"
            class="ui-button--icon ui-multiple-answer-item__explication"
            @keydown="unfocusExplication"
          >
            <UiIcon
              v-bind="defaultProps.iconInfoAttrs"
              class="ui-button__icon"
            />
          </UiButton>
        </div>
      </slot>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiRadio from '../../../atoms/UiRadio/UiRadio.vue';
import UiCheckbox from '../../../atoms/UiCheckbox/UiCheckbox.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import { focusElement } from '../../../../utilities/helpers/index';
import type { HTMLTag } from '../../../../types/tag';
import type { Icon } from '../../../../types/icon';

export type ComponentName = 'ui-checkbox' | 'ui-radio';
const props = defineProps({
  /**
   * Use this props to set invalid state of choice item.
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
   * Use this props to set value of choice item.
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
   * Use this props to set item of item.
   */
  id: {
    type: String,
    default: '',
  },
  /**
   * Use this props to pass attrs for info UiButton.
   */
  buttonInfoAttrs: {
    type: Object,
    default: null,
  },
  /**
   * Use this props to pass attrs for label UiText.
   */
  textLabelAttrs: {
    type: Object,
    default: () => ({ tag: 'span' }),
  },
  /**
   * Use this props to pass attrs for info UiIcon.
   */
  iconInfoAttrs: {
    type: Object,
    default: () => ({ icon: 'info' }),
  },
});
interface DefaultProps {
  textLabelAttrs: {
    tag: HTMLTag;
    [key:string]: unknown;
  };
  iconInfoAttrs: {
    icon: Icon;
    [key:string]: unknown;
  };
}
const defaultProps = computed<DefaultProps>(() => ({
  textLabelAttrs: {
    tag: 'span',
    ...props.textLabelAttrs,
  },
  iconInfoAttrs: {
    icon: 'info',
    ...props.iconInfoAttrs,
  },
}));
const emit = defineEmits([ 'update:modelValue' ]);
const isCheckbox = computed(() => (Array.isArray(props.modelValue)));
const component = computed(() => (isCheckbox.value ? UiCheckbox : UiRadio));
const componentName = computed<ComponentName>(() => (isCheckbox.value ? 'ui-checkbox' : 'ui-radio'));
const errorClass = computed(() => ([
  props.invalid ? `${componentName.value}--has-error` : '',
  { 'ui-multiple-answer-item--has-error': props.invalid },
]));
function focusExplication(event: KeyboardEvent) {
  if (event.key !== 'ArrowRight') return;
  const el = event.target as HTMLInputElement;
  const explicationButton: HTMLInputElement | null | undefined = el.closest(`.${componentName.value}`)?.querySelector('.ui-multiple-answer-item__explication');
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
const handleUpdateModelValue = (newValue: Record<string, unknown> | Record<string, unknown>[] | string[]) => {
  emit('update:modelValue', newValue);
};
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-multiple-answer-item {
  $this: &;
  $element: multiple-answer-item;

  padding: functions.var($element + "-choice", padding, var(--space-12) var(--space-20));
  background: functions.var($element + "-choice", background, transparent);

  @include mixins.from-tablet {
    padding: functions.var($element + "-tablet-choice", padding, var(--space-12));

    @include mixins.hover {
      background: functions.var($element + "-tablet-choice-hover", background, var(--color-background-white-hover));
    }
  }

  &--has-error {
    background: functions.var($element + "-option", background, var(--color-background-error));

    @include mixins.hover {
      background: functions.var($element + "-option-hover", background, var(--color-background-error));
    }
  }

  &__label {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__explication {
    margin: functions.var($element + "-explication", margin, 0 0 0 var(--space-12));
  }
}
</style>

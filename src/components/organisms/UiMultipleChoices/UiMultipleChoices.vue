<template>
  <div class="ui-multiple-choices">
    <!-- @slot Use this slot to replace hint template. -->
    <slot
      name="hint"
      v-bind="{
        hint,
        alertHintAttrs,
      }"
    >
      <UiText
        v-if="!isAlertDisplayed"
        class="ui-text--body-2-comfortable ui-multiple-choices__hint"
      >
        {{ hint }}
      </UiText>
      <UiAlert
        v-if="isAlertDisplayed"
        v-bind="alertHintAttrs"
        type="error"
        class="ui-multiple-choices__hint"
      >
        {{ hint }}
      </UiAlert>
    </slot>
    <UiList
      class="ui-multiple-choices__items"
    >
      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <!-- @slot Use this slot to replace choice template.-->
        <slot
          name="choice"
          v-bind="{
            value,
            index,
            item,
            options,
            hasError,
            updateHandler,
          }"
        >
          <UiMultipleChoicesItem
            ref="multipleChoicesItemRefs"
            :model-value="value[index]"
            v-bind="item"
            :options="options"
            :invalid="hasError(index)"
            @update:model-value="updateHandler($event, index)"
          />
        </slot>
      </template>
    </UiList>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  watch,
  ref,
} from 'vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiAlert from '../../molecules/UiAlert/UiAlert.vue';
import type { AlertAttrsProps } from '../../molecules/UiAlert/UiAlert.vue';
import UiList from '../UiList/UiList.vue';
import type { RadioAttrsProps } from '../../atoms/UiRadio/UiRadio.vue';
import UiMultipleChoicesItem from './_internal/UiMultipleChoicesItem.vue';
import type { MultipleChoicesItemAttrsProps } from './_internal/UiMultipleChoicesItem.vue';
import type { DefineAttrsProps } from '../../../types/attrs';
import {
  focusElement,
  isSafariOnIOS,
} from '../../../utilities/helpers';

export type MultipleChoicesOption = RadioAttrsProps & { label?: string };
export type MultipleChoicesModelValue = string | Record<string, unknown>;
export interface MultipleChoicesProps {
  /**
   * Use this props to set hint for question.
   */
  hint?: string;
  /**
   * Use this props to touch component and show validation errors.
   */
  touched?: boolean;
  /**
   * Use this props to set invalid state of component.
   */
  invalid?: boolean;
  /**
   *  Use this props to set possible choices.
   */
  items?: MultipleChoicesItemAttrsProps[];
  /**
   *  Use this props to set possible options.
   */
  options?: MultipleChoicesOption[];
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue?: MultipleChoicesModelValue[];
  /**
   * Use this props to pass attrs for hint UiAlert
   */
  alertHintAttrs?: AlertAttrsProps;
}
export type MultipleChoicesAttrsProps = DefineAttrsProps<MultipleChoicesProps>;
export interface MultipleChoicesEmits {
  (e: 'update:modelValue', value: MultipleChoicesModelValue[]): void;
  (e: 'update:invalid', value: boolean): void;
  (e: 'focus:invalidChoice', value: HTMLInputElement): void;
}
export type InvalidInputs = Map<number, HTMLInputElement>;
export type ExposedTypes = {
  focusInvalidChoice: () => void
}

const props = withDefaults(defineProps<MultipleChoicesProps>(), {
  hint: '',
  touched: false,
  invalid: true,
  items: () => ([]),
  options: () => ([]),
  modelValue: () => ([]),
  alertHintAttrs: () => ({}),
});
const emit = defineEmits<MultipleChoicesEmits>();

const multipleChoicesItemRefs = ref<InstanceType<typeof UiMultipleChoicesItem>[]>([]);

const value = computed<MultipleChoicesModelValue[]>(() => (props.modelValue));
const valid = computed(() => (value.value.filter(
  (item) => item,
).length === props.items.length));
watch(valid, (newValue) => {
  emit('update:invalid', !newValue);
}, { immediate: true });

const hasError = (index: number) => props.touched && !value.value[index];

const isAlertDisplayed = computed(() => props.hint !== '' && props.touched && !valid.value);

const updateHandler = (newValue: MultipleChoicesModelValue, index: number) => {
  value.value[index] = newValue;
  emit('update:modelValue', value.value);
};

// NOTE: hack only for Safari on IOS
function scrollToFirstInvalidInput(el: HTMLElement) {
  el.setAttribute('tabindex', '0');
  el.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
  el.removeAttribute('tabindex');
}

function focusInvalidChoice() {
  const firstInvalidChoice = multipleChoicesItemRefs.value.find((element, index) => hasError(index));
  if (!firstInvalidChoice) return;

  const choicesFirstRadioItem = firstInvalidChoice?.content?.at(0);
  const firstRadioItemsInput = choicesFirstRadioItem?.content?.input;

  const elementToFocus = firstRadioItemsInput ?? firstInvalidChoice.$el.querySelector('input');
  const elementToScroll = firstRadioItemsInput ?? firstInvalidChoice.$el;

  focusElement(elementToFocus, true);

  if (isSafariOnIOS()) scrollToFirstInvalidInput(elementToScroll);

  emit('focus:invalidChoice', elementToFocus);
}

defineExpose<ExposedTypes>({ focusInvalidChoice });
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-multiple-choices {
  $this: &;
  $element: multiple-choices;

  &__hint {
    @include mixins.use-logical($element + "-hint", padding, 0 0 var(--space-12));
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: functions.var($element + "-items", gap, var(--space-32));

    @include mixins.from-tablet {
      gap: functions.var($element + "-tablet-items", gap, 0);
    }
  }

  &--stacked {
    @include mixins.from-tablet {
      @include mixins.override-logical(multiple-choices-item-tablet-content, null, padding,  0);
      @include mixins.override-logical(multiple-choices-item-tablet-option-content, null, padding,  var(--space-12));

      --multiple-choices-tablet-items-gap: var(--space-32);
      --multiple-choices-item-width-block: 0;
      --multiple-choices-item-tablet-background: transparent;
      --multiple-choices-item-tablet-content-flex-direction: column;
      --multiple-choices-item-tablet-content-gap: var(--space-12);
      --multiple-choices-item-tablet-content-hover-background: transparent;
      --multiple-choices-item-tablet-options-display: block;
      --multiple-choices-item-tablet-choices-gap: var(--space-12);
      --multiple-choices-item-tablet-option-width-block: 1px 0;
      --multiple-choices-item-tablet-option-last-of-type-width-block: 1px;
      --multiple-choices-item-tablet-label-font: var(--font-h4);
      --multiple-choices-item-tablet-label-letter-spacing: var(--letter-spacing-h4);
      --multiple-choices-item-tablet-choices-margin-inline-start: 0;
    }
  }
}
</style>

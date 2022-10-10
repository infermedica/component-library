<template>
  <div class="ui-multiple-choices">
    <!-- @slot Use this slot to replace hint template. -->
    <slot
      name="hint"
      v-bind="{
        hint,
        alertHintAttrs,
        hintType
      }"
    >
      <UiAlert
        v-if="hint"
        v-bind="alertHintAttrs"
        :type="hintType"
        class="ui-multiple-choices__hint"
      >
        {{ hint }}
      </UiAlert>
    </slot>
    <UiList
      v-bind="$attrs"
      class="ui-multiple-choices__list"
    >
      <template
        v-for="(item, index) in choices || items"
        :key="index"
      >
        <!-- @slot Use this slot to replace list-item template. -->
        <slot
          name="list-item"
          v-bind="{
            item,
            index,
            value,
            options,
            hasError,
            updateHandler
          }"
        >
          <UiListItem class="ui-multiple-choices__list-item">
            <!-- @slot Use this slot to replace choice template.-->
            <slot
              :name="choiceItem && 'choice-item' || 'choice'"
              v-bind="{
                value,
                index,
                item,
                options,
                hasError,
                updateHandler
              }"
            >
              <UiMultipleChoicesItem
                :model-value="value[index]"
                v-bind="item"
                :options="options"
                :invalid="hasError(index)"
                class="ui-multiple-choices__choice"
                @update:model-value="updateHandler($event, index)"
              />
            </slot>
          </UiListItem>
        </slot>
      </template>
    </UiList>
  </div>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import {
  computed,
  useAttrs,
  useSlots,
  watch,
} from 'vue';
import type { PropType } from 'vue';
import type { PropsAttrs } from '../../../types/attrs';
import UiAlert from '../../molecules/UiAlert/UiAlert.vue';
import UiList from '../UiList/UiList.vue';
import UiListItem from '../UiList/_internal/UiListItem.vue';
import UiMultipleChoicesItem from './_internal/UiMultipleChoicesItem.vue';

export interface MultipleChoiceOption {
  [key: string]: unknown;
  label?: string;
  value?: string | Record<string, unknown>;
}
export interface MultipleChoiceItem {
  [key: string]: unknown;
  label: string;
}

const props = defineProps({
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
   * Use this props to set invalid state of component.
   */
  invalid: {
    type: Boolean,
    default: true,
  },
  /**
   *  Use this props to set possible choices.
   */
  items: {
    type: Array as PropType<MultipleChoiceItem[]>,
    default: () => ([]),
  },
  /**
   *  Use this props to set possible options.
   */
  options: {
    type: Array as PropType<MultipleChoiceOption[]>,
    default: () => ([]),
  },
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue: {
    type: Array as PropType<string | Record<string, unknown>[]>,
    default: () => ([]),
  },
  /**
   * Use this props to pass attrs for hint UiAlert
   */
  alertHintAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: string | Record<string, unknown>[]): void, (e: 'update:invalid', value: boolean): void}>();
const value = computed(() => (JSON.parse(JSON.stringify(props.modelValue))));
const valid = computed(() => (value.value.filter((item: Record<string, unknown>) => item).length === props.items.length));
watch(valid, (value) => {
  emit('update:invalid', !value);
}, { immediate: true });
const hintType = computed(() => (props.touched && props.invalid ? 'error' : 'default'));
const hasError = (index: number) => (props.touched && !value.value[index]);
function updateHandler(newValue: string | Record<string, unknown>, index: number): void {
  value.value[index] = newValue;
  emit('update:modelValue', value.value);
}
// TODO: remove in 0.6.0 / BEGIN
const attrs = useAttrs();
const choices = computed(() => (attrs.choices) as MultipleChoiceItem[]);
if (choices.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiMultipleChoices]: The `choices` props will be removed in 0.6.0. Please use `items` props instead.');
  }
}
const slots = useSlots();
const choiceItem = computed(() => (slots['choice-item']));
if (choiceItem.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiMultipleChoices]: The `choice-item` slot will be removed in 0.6.0. Please use `choice` slot instead.');
  }
}
// END
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-multiple-choices {
  $this: &;
  $element: multiple-choices;

  &__hint {
    padding: functions.var($element + "-hint", padding, 0 var(--space-20) var(--space-12));

    @include mixins.from-tablet {
      padding: functions.var($element + "-tablet-hint", padding, 0 0 var(--space-12) 0);
    }
  }

  &__list-item {
    --list-item-padding: 0;

    @include mixins.inner-border(
      $element: multiple-choices-list-item,
      $color: var(--color-border-divider),
      $width: 1px 0 0 0
    );

    &:last-of-type {
      &::after {
        border-width: functions.var($element, border-width, 1px 0);
      }
    }
  }
}
</style>

<template>
  <div class="ui-multiple-choices">
    <!-- @slot Use this slot to replace hint template. -->
    <slot
      name="hint"
      v-bind="{
        hint,
        attrs: alertHintAttrs,
        hintType,
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
      :items="itemsToRender"
      v-bind="$attrs"
      class="ui-multiple-choices__list"
    >
      <template #default>
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
              <UiMultipleChoicesItem
                :model-value="value[index]"
                :item="item"
                :options="options"
                :invalid="hasError(index)"
                class="ui-multiple-choices__choice"
                @update:model-value="updateHandler($event, index)"
              />
            </UiListItem>
          </slot>
        </template>
      </template>
      <template
        v-for="(item, index) in itemsToRender"
        :key="index"
        #[item.name]
      >
        <UiMultipleChoicesItem
          :model-value="value[index]"
          :item="item"
          :options="options"
          :invalid="hasError(index)"
          class="ui-multiple-choices__choice"
          @update:model-value="updateHandler($event, index)"
        />
      </template>
    </UiList>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import {
  computed,
  useAttrs,
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
  name?: string;
  value?: string;
}
export interface MultipleChoiceItems {
  [key: string]: unknown;
  name: string;
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
   * Use this props to pass multiple choices items.
   */
  items: {
    type: Array as PropType<MultipleChoiceItems[]>,
    default: () => ([]),
  },
  /**
   *  Use this props to override default options.
   */
  options: {
    type: Array as PropType<MultipleChoiceOption[]>,
    default: () => ([
      {
        name: 'Yes',
        value: 'present',
      },
      {
        name: 'No',
        value: 'absent',
      },
      {
        name: 'Don\'t know',
        value: 'unknown',
      },
    ]),
  },
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => ([]),
  },
  /**
   * Use this props to pass attrs for hint UiAlert
   */
  alertHintAttrs: {
    type: Object as PropsAttrs,
    default: () => ({
    }),
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: string[]): void, (e: 'update:invalid', value: boolean): void}>();
const value = computed(() => (props.modelValue));
const valid = computed(() => (value.value.filter((item) => item).length === props.items.length));
watch(valid, (value) => {
  emit('update:invalid', !value);
});
const hintType = computed(() => (props.touched && props.invalid ? 'error' : 'default'));
const hasError = (index: number) => (props.touched && !value.value[index]);
const updateHandler = (newValue: string, index: number) => {
  value.value[index] = newValue;
  emit('update:modelValue', props.modelValue);
};
// TODO: remove in 0.6.0 / BEGIN
const attrs = useAttrs();
const choices = computed(() => (attrs.choices) as MultipleChoiceItems[]);
if (choices.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiMultipleChoices]: choices will be removed in 0.6.0. Please use items instead.');
  }
}
// END
const itemsToRender = computed(() => {
  const items = choices.value || props.items;
  return items.map((item: MultipleChoiceItems) => ({
    ...item,
    listItemAttrs: {
      class: 'ui-multiple-choices__list-item',
    },
  }));
});
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

    @include mixins.inner-border($element: multiple-choices-list-item, $color: var(--color-border-divider), $width: 1px 0 0 0);

    &:last-of-type {
      &::after {
        border-width: functions.var($element, border-width, 1px 0);
      }
    }
  }
}
</style>

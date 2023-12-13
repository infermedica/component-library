<template>
  <div
    class="ui-simple-question"
    role="group"
    aria-labelledby="ssn1"
  >
    <slot
      name="legend"
      v-bind="{
        legend,
        id,
      }"
    >
      <span
        :id="id"
        class="visual-hidden"
        :aria-hidden="true"
      >
        {{ legend }}
      </span>
    </slot>
    <template
      v-for="(item, index) in itemsToRender"
      :key="index"
    >
      <!-- @slot Use this slot to replace tile template -->
      <slot
        name="tile"
        v-bind="{
          item,
          modelValue,
          isTileSmall,
          updateHandler,
          tileItemAttrs,
        }"
      >
        <UiTile
          v-bind="tileItemAttrs(item)"
          :model-value="modelValue"
          :class="{ 'ui-tile--small': isTileSmall }"
          class="ui-simple-question__item"
          type="submit"
          @update:model-value="updateHandler(item.value)"
        >
          {{ item.label }}
        </UiTile>
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  useAttrs,
} from 'vue';
import UiTile from '../../molecules/UiTile/UiTile.vue';
import type {
  TileModelValue,
  TileAttrsProps,
} from '../../molecules/UiTile/UiTile.vue';
import type { DefineAttrsProps } from '../../../types';

export interface SimpleQuestionItem extends TileAttrsProps {
  label?: string;
}
export interface SimpleQuestionProps {
  /**
   * Use this props or v-model to set value.
   */
  modelValue?: TileModelValue;
  /**
   * Use this props to pass items for question
   */
  items?: SimpleQuestionItem[];
  legend?: string
}
export type SimpleQuestionAttrsProps = DefineAttrsProps<SimpleQuestionProps>;
export interface SimpleQuestionEmits {
  (e: 'update:modelValue', value: SimpleQuestionProps['modelValue']): void;
}
const props = withDefaults(defineProps<SimpleQuestionProps>(), {
  /**
   * Use this props or v-model to set value.
   */
  modelValue: () => ({}),
  /**
   * Use this props to pass items for question
   */
  items: () => ([]),
  legend: '',
});
const emit = defineEmits<SimpleQuestionEmits>();
const attrs: SimpleQuestionAttrsProps = useAttrs();
const id = 'ssn1';
const isTileSmall = computed(() => attrs.class && attrs.class.includes('ui-simple-question--small'));
const updateHandler = (value: SimpleQuestionProps['modelValue']) => {
  emit('update:modelValue', value);
};
const tileItemAttrs = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  label, ...itemAttrs
}: SimpleQuestionItem) => itemAttrs;
const itemsToRender = computed(() => props.items);
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-simple-question {
  $this: &;
  $element: simple-question;

  display: flex;
  flex-direction: column;
  gap: functions.var($element, gap, var(--space-12));

  @include mixins.from-tablet {
    flex-direction: row;
    gap: functions.var($element + "-tablet", gap, var(--space-24));
  }

  &__item {
    @include mixins.from-tablet {
      flex: 1;
    }
  }
}
</style>


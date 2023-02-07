<template>
  <div
    class="ui-simple-question"
    role="radiogroup"
  >
    <template
      v-for="(item, index) in itemsToRender"
      :key="index"
    >
      <!-- @slot Use this slot to replace tile template -->
      <slot
        name="tile"
        v-bind="{
          option: item,
          item,
          modelValue,
          isTileSmall,
          updateHandler
        }"
      >
        <UiTile
          v-bind="tileItemAttrs(item)"
          :model-value="modelValue"
          :class="{ 'ui-tile--small': isTileSmall }"
          class="ui-simple-question__item"
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

export interface SimpleQuestionProps {
  /**
   * Use this props or v-model to set value.
   */
  modelValue?: TileModelValue;
  /**
   * Use this props to pass items for question
   */
  items?: TileAttrsProps[];
}
export type SimpleQuestionAttrsProps = DefineAttrsProps<SimpleQuestionProps>;
export interface SimpleQuestionEmits {
  (e: 'update:modelValue', value: SimpleQuestionProps['modelValue']): void
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
});
const emit = defineEmits<SimpleQuestionEmits>();

const attrs: SimpleQuestionAttrsProps = useAttrs();
const isTileSmall = computed(() => attrs.class.includes('ui-simple-question--small'));
const updateHandler = (value: SimpleQuestionProps['modelValue']) => {
  emit('update:modelValue', value);
};
// TODO: remove in 0.6.0 / BEGIN
const options = computed(() => (attrs.options as SimpleQuestionProps['items']));
if (options.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiSimpleQuestion]: The `options` props will be removed in 0.6.0. Please use `items` props instead.');
  }
}
// END
const tileItemAttrs = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  label, ...itemAttrs
}: TileAttrsProps) => itemAttrs;
const itemsToRender = computed(() => options.value || props.items);
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


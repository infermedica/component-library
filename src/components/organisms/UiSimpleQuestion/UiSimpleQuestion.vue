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
import type { PropType } from 'vue';
import UiTile from '../../molecules/UiTile/UiTile.vue';
import type { TileModelValue } from '../../molecules/UiTile/UiTile.vue';
import type { Icon } from '../../../types/icon';

export interface SimpleQuestionOption {
  value: TileModelValue;
  label: string;
  tileAttrs: {
    iconAttrs: {
      icon: Icon;
      [key: string]: unknown;
    },
    [key: string]: unknown;
  }
}
const props = defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: [
      Object,
      String,
    ] as PropType<TileModelValue>,
    default: () => ({}),
  },
  /**
   * Use this props to pass items for question
   */
  items: {
    type: Array as PropType<SimpleQuestionOption[]>,
    default: () => [ {
      id: '',
      label: '',
      value: '',
      tileAttrs: { iconAttrs: { icon: '' } },
    } ],
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: TileModelValue): void}>();
interface Attrs {
  class?: string[];
  options?: SimpleQuestionOption[];
}
const attrs:Attrs = useAttrs();
const isTileSmall = computed(() => attrs?.class?.includes('ui-simple-question--small'));
function updateHandler(value: TileModelValue) {
  emit('update:modelValue', value);
}
// TODO: remove in 0.6.0 / BEGIN
const options = computed(() => (attrs?.options));
if (options.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiSimpleQuestion]: The `options` props will be removed in 0.6.0. Please use `items` props instead.');
  }
}
// END
const tileItemAttrs = (item: SimpleQuestionOption) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    label,
    ...rest
  } = item;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  return rest;
};
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


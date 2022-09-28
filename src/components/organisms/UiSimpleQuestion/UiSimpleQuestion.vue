<template>
  <div
    class="ui-simple-question"
    role="radiogroup"
  >
    <template
      v-for="(item, index) in options || items"
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
          v-bind="(()=>{const {
            label, ...rest
          } = item; return rest;})()"
          :model-value="modelValue"
          :class="{
            'ui-tile--small': isTileSmall
          }"
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
import type { TileValue } from '../../molecules/UiTile/UiTile.vue';
import type { Icon } from '../../../types/icon';

export interface SimpleQuestionOptions {
  value: TileValue;
  label: string;
  tileAttrs: {
    iconAttrs: {
      icon: Icon;
      [key: string]: unknown;
    },
    [key: string]: unknown;
  }
}
defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: [Object, String] as PropType<TileValue>,
    default: () => ({}),
  },
  /**
   * Use this props to pass items for question
   */
  items: {
    type: Array as PropType<SimpleQuestionOptions[]>,
    default: () => [{
      id: '',
      label: '',
      value: '',
      tileAttrs: { iconAttrs: { icon: '' } },
    }],
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: TileValue): void}>();
const attrs = useAttrs() as {class: string[]};
const isTileSmall = computed(() => attrs.class?.includes('ui-simple-question--small'));
function updateHandler(value: TileValue) {
  emit('update:modelValue', value);
}
// TODO: remove in 0.6.0 / BEGIN
const options = computed(() => (attrs?.options));
if (options.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiSimpleQuestion]: options will be removed in 0.6.0. Please use items instead.');
  }
}
// END
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-simple-question {
  $this: &;
  $element: simple-question;

  display: flex;
  flex-direction: column;

  @include mixins.from-tablet {
    flex-direction: row;
  }

  &__item {
    margin: functions.var($element + "-item", margin, 0 0 var(--space-12) 0);

    &:last-of-type {
      margin: 0;
    }

    @include mixins.from-tablet {
      flex: 1;
      margin: functions.var($element + "-tablet-item", margin, 0 var(--space-24) 0 0);

      &:last-of-type {
        margin: 0;
      }

      [dir="rtl"] & {
        margin: functions.var($element + "-rtl-tablet-item", margin, 0 0 0 var(--space-24));

        &:last-of-type {
          margin: 0;
        }
      }
    }
  }
}
</style>


<template>
  <div
    class="ui-simple-question"
    role="radiogroup"
  >
    <template v-for="option in options">
      <!-- @slot Use this slot to replace tile template -->
      <slot
        name="tile"
        v-bind="{option, tileAttrs, modelValue, isTileSmall, updateHandler}"
      >
        <UiTile
          :id="option.id"
          v-bind="tileAttrs"
          :model-value="modelValue"
          :value="option.value"
          :icon-attrs="option.iconAttrs"
          :name="option.name"
          :class="{'ui-tile--small': isTileSmall}"
          class="ui-simple-question__option ui-tile"
          @update:model-value="updateHandler(option.value)"
        >
          {{ option.label }}
        </UiTile>
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { PropType } from 'vue';
import UiTile from '../../molecules/UiTile/UiTile.vue';
import type { TileValue } from '../../molecules/UiTile/UiTile.vue';
import type { PropsAttrs } from '../../../types/attrs';
import type { Icon } from '../../../types/icon';

export interface SimpleQuestionOptions {
  id: string;
  value: TileValue;
  name: string;
  label: string;
  iconAttrs: {
    icon: Icon;
    [key: string]: unknown;
  },
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
   * Use this props to pass options for question
   */
  options: {
    type: Array as PropType<SimpleQuestionOptions[]>,
    default: () => [{
      id: '',
      name: '',
      label: '',
      value: '',
      iconAttrs: {
        icon: '',
      },
    }],
  },
  /**
   * Use this props to pass native attributes to all UiTiles.
   */
  tileAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: TileValue): void}>();
const attrs = useAttrs() as {class: string[]};
const isTileSmall = computed(() => attrs.class?.includes('ui-simple-question--small'));
function updateHandler(value: TileValue) {
  emit('update:modelValue', value);
}
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

  &__option {
    margin: functions.var($element + "-option", margin, 0 0 var(--space-12) 0);

    &:last-of-type {
      margin: 0;
    }

    @include mixins.from-tablet {
      flex: 1;
      margin: functions.var($element + "-tablet-option", margin, 0 var(--space-24) 0 0);

      &:last-of-type {
        margin: 0;
      }

      [dir="rtl"] & {
        margin: functions.var($element + "-rtl-tablet-option", margin, 0 0 0 var(--space-24));

        &:last-of-type {
          margin: 0;
        }
      }
    }
  }
}
</style>


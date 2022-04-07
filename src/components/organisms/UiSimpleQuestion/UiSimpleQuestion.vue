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
          @update:modelValue="updateHandler(option.value)"
        >
          {{ option.label }}
        </UiTile>
      </slot>
    </template>
  </div>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
import UiTile from '../../molecules/UiTile/UiTile.vue';

defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: [Object, String],
    default: () => ({}),
  },
  /**
   * Use this props to pass options for question
   */
  options: {
    type: Array,
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
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['update:modelValue']);
const attrs = useAttrs();
const isTileSmall = computed(() => attrs.class?.includes('ui-simple-question--small'));

function updateHandler(value) {
  emit('update:modelValue', value);
}
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-simple-question {
  // ui-simple-question--small - utility class for small Tile variant
  display: flex;
  flex-direction: column;

  @include from-tablet {
    flex-direction: row;
  }

  &__option {
    margin: var(--simple-question-option-margin, 0 0 var(--space-12) 0);

    @include from-tablet {
      width: 100%;
      margin: var(--simple-question-option-tablet-margin, 0 var(--space-24) 0 0);

      [dir="rtl"] & {
        margin: var(--simple-question-option-tablet-margin, 0 0 0 var(--space-24));
      }
    }

    &:last-child {
      --simple-question-option-margin: 0;
      --simple-question-option-tablet-margin: 0;
    }
  }
}
</style>


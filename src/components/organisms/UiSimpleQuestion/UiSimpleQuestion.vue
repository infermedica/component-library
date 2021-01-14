<template>
  <div class="ui-simple-question">
    <template v-for="option in options">
      <!-- Use this slot to replace tile template -->
      <slot
        name="tile"
        v-bind="{option}"
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

<script>
import { computed } from 'vue';
import UiTile from '../../molecules/UiTile/UiTile.vue';

export default {
  name: 'UiSimpleQuestion',
  components: {
    UiTile,
  },
  props: {
    /**
    * Use v-model to bind value to the component, example: <UiSimpleQuestion v-model="selected" />
    */
    modelValue: {
      type: [Object, String],
      default: () => ({}),
    },
    /**
    * Use this props to pass options for question
    * example option:
    * { id: 'id', name: 'option', label: 'label', value: 'value', iconAttrs: { icon: 'icon' }},
    */
    options: {
      type: Array,
      default: () => [],
    },
    /**
    * Use this props to pass native attributes to all UiTiles
    */
    tileAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const isTileSmall = computed(() => attrs.class?.includes('ui-simple-question--small'));

    function updateHandler(value) {
      emit('update:modelValue', value);
    }

    return {
      isTileSmall,
      updateHandler,
    };
  },
};
</script>

<style lang="scss">
.ui-simple-question {
  // ui-simple-question--small - utility class for small Tile variant
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  &__option {
    margin: var(--simple-question-option-margin, 0 0 var(--space-12) 0);

    @media (min-width: 768px) {
      width: 100%;
      margin: var(--simple-question-option-tablet-margin, 0 var(--space-32) 0 0);
    }

    &:last-child {
      --simple-question-option-margin: 0;
      --simple-question-option-tablet-margin: 0;
    }
  }
}
</style>


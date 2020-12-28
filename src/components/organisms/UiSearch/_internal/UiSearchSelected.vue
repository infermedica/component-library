<template>
  <template
    v-if="hasSelected"
  >
    <UiList
      class="ui-search-selected"
    >
      <UiListItem
        v-for="(select, key) in modelValue"
        :key="key"
        class="ui-search-selected__item"
      >
        <UiChips
          class="ui-search-selected__chips"
          @remove="removeHandler(select)"
        >
          {{ select }}
        </UiChips>
      </UiListItem>
    </UiList>
  </template>
  <template v-else>
    <div class="ui-search-selected__message">
      <UiText>
        Please try to add more than one symptom.
      </UiText>
    </div>
  </template>
</template>

<script>
import { computed } from 'vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiChips from '../../../molecules/UiChips/UiChips.vue';
import UiList from '../../UiList/UiList.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';

export default {
  name: 'UiSearchSelected',
  components: {
    UiText,
    UiChips,
    UiList,
    UiListItem,
  },
  props: {
    modelValue: {
      type: Array,
      default: () => ([]),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const hasSelected = computed(() => (props.modelValue.length > 0));
    function removeHandler(value) {
      emit('update:modelValue', props.modelValue.filter((item) => (item !== value)));
    }

    return {
      hasSelected,
      removeHandler,
    };
  },
};
</script>

<style lang="scss">
.ui-search-selected {
  --list-item-padding: 0;

  display: flex;
  flex-wrap: wrap;

  &__item {
    margin: var(--space-8) var(--space-8) 0 0;
  }

  &__message {
    --text-color: var(--color-text-dimmed);

    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-64) var(--space-20);
    background: var(--color-background-subtle);
    border-radius: var(--border-radius-card);
  }
}
</style>

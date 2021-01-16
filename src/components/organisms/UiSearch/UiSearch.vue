<template>
  <div class="ui-search">
    <UiDropdown
      class="ui-search__dropdown"
      @update:model-value="updateHandler"
      @open="openHandler"
      @close="closeHandler"
    >
      <template #toggle="{openHandler, closeHandler}">
        <UiInput
          v-bind="inputAttrs"
          :model-value="modelValue"
          type="search"
          class="ui-search__input ui-input--has-icon"
          @update:model-value="inputHandler($event, openHandler, closeHandler)"
        >
          <template #aside>
            <UiIcon
              icon="search"
              class="ui-input__aside ui-search__icon"
            />
          </template>
        </UiInput>
      </template>
      <template #default>
        <template
          v-if="hasResults"
        >
          <UiDropdownItem
            v-for="(result, key) in results"
            :key="key"
            :value="result"
            class="ui-dropdown-item--compact"
          >
            <span
              v-highlight="`${modelValue}`"
              class="ui-search__highlighted"
            >{{ result.label }}</span>
          </UiDropdownItem>
        </template>
        <UiSearchNoResults v-else />
      </template>
    </UiDropdown>
    <UiSearchSelected
      :model-value="selected"
      class="ui-search__selected"
      @update:model-value="removeHandler"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import { highlight } from '../../../utilities/directives';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiInput from '../../atoms/UiInput/UiInput.vue';
import UiDropdown from '../../molecules/UiDropdown/UiDropdown.vue';
import UiDropdownItem from '../../molecules/UiDropdown/_internal/UiDropdownItem.vue';
import UiSearchNoResults from './_internal/UiSearchNoResults.vue';
import UiSearchSelected from './_internal/UiSearchSelected.vue';

export default {
  name: 'UiSearch',
  components: {
    UiIcon,
    UiInput,
    UiDropdown,
    UiDropdownItem,
    UiSearchNoResults,
    UiSearchSelected,
  },
  directives: { highlight },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    selected: {
      type: Array,
      default: () => ([]),
    },
    results: {
      type: Array,
      default: () => ([]),
    },
    inputAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue', 'update:selected'],
  setup(props, { emit }) {
    const hasResults = computed(() => (props.results.length > 0));
    function inputHandler(value, open, close) {
      if (value.length > 0) {
        open();
      } else if (value.length < 1) {
        close();
      }
      emit('update:modelValue', value);
    }
    function updateHandler(value) {
      emit('update:selected', [...props.selected, value]);
      emit('update:modelValue', '');
    }
    function removeHandler(selected) {
      emit('update:selected', selected);
    }
    function closeHandler() {}
    function openHandler() {}
    return {
      hasResults,
      inputHandler,
      updateHandler,
      removeHandler,
      openHandler,
      closeHandler,
    };
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';

.ui-search {
  &__dropdown,
  &__input {
    width: 100%;
  }

  &__highlighted {
    @include font(--font-body-1-thick);

    mark {
      @include font(--font-body-1);

      color: inherit;
      background: transparent;
    }
  }

  &__selected {
    margin: var(--space-16) 0 0 0;
  }
}
</style>

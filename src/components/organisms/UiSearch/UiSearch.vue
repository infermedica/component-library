<template>
  <div class="ui-search">
    <UiDropdown
      class="ui-search__dropdown ui-dropdown--compact"
      :toggle-element="input"
      @update:model-value="updateHandler"
    >
      <template #toggle="{openHandler, closeHandler}">
        <UiInput
          ref="dropdowntoggle"
          v-bind="inputAttrs"
          :model-value="modelValue"
          type="search"
          class="ui-search__input ui-input--has-icon"
          @update:model-value="inputHandler($event, openHandler, closeHandler)"
        >
          <template #aside>
            <UiButton
              v-if="hasSearchQuery"
              tabindex="-1"
              class="ui-input__aside ui-button--text ui-button--secondary ui-button--has-icon"
              @click="inputHandler('', openHandler, closeHandler)"
            >
              <UiIcon
                icon="closeCompact"
              />
            </UiButton>
            <UiIcon
              v-else
              icon="search"
              class="ui-input__aside ui-search__icon"
            />
          </template>
        </UiInput>
      </template>
      <template #content>
        <UiLoader
          :is-loading="isLoading"
          type="skeleton"
          class="ui-search__loader"
        >
          <template #loader-blocks>
            <div class="ui-loader-skeleton__block" />
            <div
              class="ui-loader-skeleton__block"
              style="--loader-skeleton-block-width: 60%;"
            />
            <div
              class="ui-loader-skeleton__block"
              style="--loader-skeleton-block-width: 80%;"
            />
            <div
              class="ui-loader-skeleton__block"
              style="--loader-skeleton-block-width: 60%;"
            />
          </template>
          <template
            v-if="hasResults"
          >
            <div
              role="radiogroup"
              class="ui-search__options"
            >
              <UiDropdownItem
                v-for="(result, key) in results"
                :key="key"
                :value="result"
              >
                <span
                  v-highlight="`${modelValue}`"
                  class="ui-search__highlighted"
                >{{ result.label }}</span>
              </UiDropdownItem>
            </div>
          </template>
          <UiSearchNoResults v-else />
        </UiLoader>
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
import { computed, ref } from 'vue';
import { highlight } from '../../../utilities/directives';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiInput from '../../atoms/UiInput/UiInput.vue';
import UiDropdown from '../../molecules/UiDropdown/UiDropdown.vue';
import UiDropdownItem from '../../molecules/UiDropdown/_internal/UiDropdownItem.vue';
import UiSearchNoResults from './_internal/UiSearchNoResults.vue';
import UiSearchSelected from './_internal/UiSearchSelected.vue';
import UiLoader from '../../molecules/UiLoader/UiLoader.vue';

export default {
  name: 'UiSearch',
  components: {
    UiButton,
    UiIcon,
    UiInput,
    UiDropdown,
    UiDropdownItem,
    UiSearchNoResults,
    UiSearchSelected,
    UiLoader,
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
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'update:selected'],
  setup(props, { emit }) {
    const dropdowntoggle = ref(null);
    const input = computed(() => (
      dropdowntoggle.value?.$el.querySelector('input')
    ));
    const hasResults = computed(() => (props.results.length > 0));
    const hasSearchQuery = computed(() => (props.modelValue.length > 0));
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
    return {
      hasResults,
      hasSearchQuery,
      inputHandler,
      updateHandler,
      removeHandler,
      dropdowntoggle,
      input,
    };
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';

.ui-search {
  --popover-content-padding: 0;
  --dropdown-popover-min-height: 9.5rem;

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

  &__icon {
    --icon-color: var(--search-icon-color, var(--color-icon-primary));
  }

  &__options {
    padding: var(--search-options-padding, var(--space-8));
  }

  &__loader {
    --loader-skeleton-block-tablet-height: 0.75rem;
    --loader-skeleton-block-margin: 0 0 var(--space-24) 0;
    --loader-skeleton-block-tablet-margin: 0 0 var(--space-24) 0;

    position: absolute;
    width: 100%;
    padding: var(--space-16);
  }
}
</style>

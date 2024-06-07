<template>
  <UiList
    v-bind="args"
    class="list-box"
  />
  <div class="search-dropdown-input-row">
    <UiButton
      class="search-dropdown-input-row__button ui-button--text"
      @click="clickHandler"
    >
      <div class="search-dropdown-input-row__title">
        <UiIcon
          icon="plus"
          class="ui-button__icon"
        />
        <UiText class="search-dropdown-input-row__label">
          Didn't find chronic condition?
        </UiText>
      </div>
      <UiText class="search-dropdown-input-row__hint">
        Add with your own words
      </UiText>
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import {
  UiButton,
  UiIcon,
  UiList,
  UiText,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
export interface AddEmits {
  (e:'add'): void;
}
const attrs = useAttrs();
const args = computed(() => (attrs));

const emit = defineEmits<AddEmits>();
const clickHandler = () => {
  emit('add');
};
</script>

<style lang="scss">
.list-box {
  max-height: 20.5rem;
  overflow-y: auto;

  &__label {
    display: flex;
    justify-content: space-between;
  }
}

.search-dropdown-input-row {
  padding: var(--space-8);

  .ui-button__icon {
    margin-block: var(--space-4);
  }

  &__title {
    display: flex;
  }

  &__button {
    display: initial;
    width: 100%;
    margin-inline: var(--space-8);
    text-align: left;
  }

  &__label {
    align-content: center;
    padding: 0 var(--space-12);
    font: var(--font-body-1-thick);
    letter-spacing: var(--letter-spacing-small);
  }

  &__hint {
    overflow: hidden;
    padding: var(--space-4);
    margin-inline: var(--space-32);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background: var(--color-background-white-hover);
  }
}
</style>

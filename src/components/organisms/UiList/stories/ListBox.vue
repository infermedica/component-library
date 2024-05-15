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
      <UiIcon
        icon="plus"
        class="ui-button__icon"
      />
      <UiText class="search-dropdown-input-row__button">
        Didn't find chronic condition?
      </UiText>
    </UiButton>
    <UiText class="search-dropdown-input-row__text">
      Add with your own words
    </UiText>
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
  &__label {
    display: flex;
    justify-content: space-between;
  }
}
.search-dropdown-input-row {
  padding: var(--space-12) var(--space-4);

  &__button {
    margin-inline: var(--space-8);
    font: var(--font-body-1-thick);
  }

  &__text {
    padding: var(--space-4) var(--space-12);
    margin-inline: var(--space-32);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

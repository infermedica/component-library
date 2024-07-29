<template>
  <UiPopover class="has-button">
    <UiMenu
      v-bind="args"
      :items="itemsToRender"
      role="listbox"
      :aria-label="ariaLabel"
      aria-multiselectable="true"
      :aria-activedescendant="ariaActivedescendant"
      :aria-busy="ariaBusy"
    >
      <template #[`menu-item-${index}`] v-for="(item, index) in itemsToRender">
        <UiCheckbox :aria-label="item.label" disabled>{{ item.label }}</UiCheckbox>
      </template>
      <template #custom-option>
        <UiText
          tag="span"
          class="ui-menu-item-button__title">
          <UiIcon
            :icon="item.icon"
            class="ui-button__icon" />
          <UiText
            tag="span"
            class="ui-menu-item-button__label"
            v-bind="item.labelButtonAttrs">
            {{ item.label }}
          </UiText>
        </UiText>
        <UiText
          tag="span"
          class="ui-menu-item-button__hint">
          {{ item.hint }}
        </UiText>
      </template>
    </UiMenu>
  </UiPopover>
</template>

<script setup lang="ts">
import {
  computed,
  useAttrs,
  defineOptions,
  onMounted,
  ref,
} from 'vue';
import {
  UiButton,
  UiCheckbox,
  UiIcon,
  UiMenu,
  UiPopover,
  UiText,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (Object.keys(attrs).reduce((object, key) => {
  if (key !== 'items') {
    return {
      ...object,
      [key]: args[key]
    }
  }
}, {})));

export interface AddEmits {
  (e:'add'): void;
}

const emit = defineEmits<AddEmits>();
const clickHandler = () => {
  emit('add');
};

const allPredefinedOptionsAreLoaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    allPredefinedOptionsAreLoaded.value = true;
  }, 1000)
});

const itemsToRender = computed(() => {
  const customOption = {
    name: 'custom-option'
  }
  return [
    ...items,
    allPredefinedOptionsAreLoaded
      ? customOption
      : {}
  ].map((item, index) => ({
    ...item,
    "aria-selected": false,
    "aria-setsize": args.items.length,
    "aria-posinet": index + 1,
  }))
});
</script>

<style lang="scss">
@use "../../../../styles/mixins";
.has-button {
  max-height: 20rem;
  overflow-y: auto;

  &.ui-popover::after {
    border: none;
  }

  .ui-popover__content {
    padding: var(--space-4) 0;
  }

  .ui-menu-item {
    padding-block: var(--space-2);
  }
}
</style>

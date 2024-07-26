<template>
  <UiPopover class="has-button">
    <UiMenu
      v-bind="args"
      role="listbox"
      :aria-label="ariaLabel"
      aria-multiselectable="true"
      :aria-activedescendant="ariaActivedescendant"
      :aria-busy="ariaBusy"
    >
      <template #[`menu-item-${index}`] v-for="(item, index) in itemsToRender">
        <template v-if="item.hasCustomOption">
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
        <template v-else>
          <UiCheckbox :aria-label="item.label" disabled>{{ item.label }}</UiCheckbox>
        </template>
      </template>
    </UiMenu>
  </UiPopover>
</template>

<script setup lang="ts">
import {
  computed,
  useAttrs,
  defineOptions,
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
const args = computed(() => (attrs));

export interface AddEmits {
  (e:'add'): void;
}

const emit = defineEmits<AddEmits>();
const clickHandler = () => {
  emit('add');
};

const itemsToRender = computed(() => {
  let items = [attrs.items, {
    label: 'Didn\'t find chronic condition?',
    hint: 'Add with your own words',
    tag: UiButton,
    icon: 'plus',
    role: 'option',
    hasCustomOption: true,
  }].flat();

  items = items.map((item, index) => {
    if (typeof item === 'object') {
      return {
        ...item,
        "aria-selected": false,
        "aria-setsize": items.length,
        "aria-posinet": index + 1,
      };
    }
  });

  return items.slice(0, attrs.hasButton ? items.length : items.length - 1);
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

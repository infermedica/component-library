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
      <template #[`menu-item-${index}`] v-for="(item, index) in items">
        <template v-if="item.hasCustomOption">
          <UiText
            tag="span"
            class="ui-menu-item-button__title">
            <UiIcon
              :icon="item.icon"
              class="ui-button__icon"
              v-bind="iconButtonAttrs" />
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
            {{ hint }}
          </UiText>
        </template>
        <template v-else>
          <UiCheckbox :label="item.label" disabled />
          <UiText tag="span">{{ item.label }}</UiText>
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

const items = computed(() => ( attrs.items ));
items.value.push({
  label: 'Didn\'t find chronic condition?',
  hint: 'Add with your own words',
  tag: UiButton,
  icon: 'plus',
  role: 'option',
  hasCustomOption: true,
  "aria-setsize": 16,
  "aria-posinet": 16,
})
</script>

<style lang="scss">
@use "../../../../styles/mixins";
.has-button {
  max-height: 20.5rem;
  overflow-y: auto;

  &__menu {
    @include mixins.use-logical(null, margin, var(--space-12) 0 0 0);

    .ui-menu-item {
      padding-block: var(--space-2);
    }

    .ui-list-item__content {
      --text-margin-inline: var(--space-8);
    }
  }

  .ui-popover__content {
    padding: var(--space-4) 0;
  }
}
</style>

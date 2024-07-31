<template>
  <UiPopover class="has-button">
    <UiMenu
      v-bind="args"
      :items="itemsToRender"
      role="listbox"
      aria-label="Chronic condition"
      aria-multiselectable="true"
      :aria-activedescendant="focusedOption"
      :aria-busy="!allPredefinedOptionsAreLoaded"
    >
      <template
        v-for="({
          label, name, checkboxAttrs,
        }, index) in itemsToRender"
        #[`menu-item-${index}`]
        :key="name"
      >
        <UiCheckbox v-bind="checkboxAttrs" :aria-label="label">
          {{ label }}
        </UiCheckbox>
      </template>
      <template #custom-option>
        <UiIcon
          icon="plus"
          class="ui-button__icon has-button__custom-option-icon"
        />
        <UiText
          tag="span"
          class="ui-text--body-1-thick"
        >
          Didn't find chronic condition?
        </UiText>
        <UiText
          tag="span"
          class="has-button__custom-option-hint"
        >
          Add with your own words
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
  inject,
} from 'vue';
import {
  UiCheckbox,
  UiIcon,
  UiMenu,
  UiPopover,
  UiText,
} from '@infermedica/component-library';
import { equal } from '../../../../utilities/helpers';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (Object.keys(attrs).reduce((object, key) => {
  if (key !== 'items') {
    return {
      ...object,
      [key]: args[key],
    };
  }
  return object;
}, {})));

const value = inject('value', []);
const allPredefinedOptionsAreLoaded = ref(false);
onMounted(() => {
  setTimeout(() => {
    allPredefinedOptionsAreLoaded.value = true;
  }, 1000);
});

const focusedOption = ref('');
const handleFocus = (item) => {
  focusedOption.value = item;
};

const handleUpdateModelValue = (val) => (value.value.includes(val)
  ? value.value.filter((option) => (!equal(val, option)))
  : [
    ...value.value,
    val,
  ]);
const handleOptionClick = (val) => {
  value.value = handleUpdateModelValue(val);
};
const handleCustomOptionClick = () => {
  console.log('emit cusomOtptionClick');
};
const itemsToRender = computed(() => {
  const customOption = {
    name: 'custom-option',
    class: 'has-button__custom-option',
    listItemAttrs: { class: 'ui-list-item ui-menu-item has-button__menu-item--has-border' },
    onClick: () => handleCustomOptionClick(),
    onKeyup: ({ key }) => { key === 'enter' ? handleCustomOptionClick() : ''; },
  };
  const items = (attrs.items as any).map((item) => ({
    label: item,
    checkboxAttrs: {
      modelValue: value.value,
      value: item,
      disabled: true,
    },
    onClick: () => handleOptionClick(item),
    onFocus: () => handleFocus(item),
  }));
  return [
    ...items,
    (
      allPredefinedOptionsAreLoaded.value
        ? customOption
        : {}
    ),
  ].map((item, index) => ({
    ...item,
    'aria-selected': false,
    'aria-setsize': items.length + (
      allPredefinedOptionsAreLoaded.value
        ? 1
        : 0
    ),
    'aria-posinet': index + 1,
  }));
});
</script>

<style lang="scss">
@use "../../../../styles/mixins";
.has-button {
  --popover-content-padding-block: 0;
  --popover-content-padding-inline: 0;
  --popover-content-max-height: 20rem;
  --popover-box-shadow: none;

  &__menu-item {
    &--has-border {
      border: 1px solid var(--color-border-divider);
      border-width: 1px 0 0 0 ;
    }
  }

  &__custom-option {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    text-align: start;
    gap: 0 var(--space-12);

    &-icon {
      --button-icon-margin-inline: 0;
      --button-icon-margin-block: 0;
    }

    &-hint {
      grid-column: 2;
    }
  }
}
</style>

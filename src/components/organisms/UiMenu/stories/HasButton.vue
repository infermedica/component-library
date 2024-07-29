<template>
  <UiPopover class="has-button">
    <UiMenu
      v-bind="args"
      :items="itemsToRender"
      role="listbox"
      :aria-label="ariaLabel"
      aria-multiselectable="true"
      :aria-activedescendant="ariaActivedescendant"
      :aria-busy="!allPredefinedOptionsAreLoaded"
    >
      <template #[`menu-item-${index}`] v-for="(item, index) in itemsToRender">
        <div v-if="item.label.customOption" @click="clickHandler" class="custom-option">
          <UiText
            tag="span"
            class="ui-menu-item-button__title">
            <UiIcon
              :icon="defaultProps.icon"
              class="ui-button__icon" />
            <UiText
              tag="span"
              class="ui-menu-item-button__label">
              {{ defaultProps.translation.label }}
            </UiText>
          </UiText>
          <UiText
            tag="span"
            class="ui-menu-item-button__hint">
            {{ defaultProps.translation.hint }}
          </UiText>
        </div>
        <UiCheckbox
          v-else
          :aria-label="item.label"
          :aria-selected="false"
          role="option"
          disabled>
          {{ item.label }}
        </UiCheckbox>
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

export interface HasButtonTranslation {
  label?: string;
  hint?: string;
}
export interface HasButtonTranslationProps {
  /**
   * Use this props to pass labels inside component translation.
   */
  translation?: HasButtonTranslation;
  /**
   * Use this props to pass icon inside component.
   */
   icon?: string;
   /**
   * Use this props to pass aria-label inside component.
   */
   ariaLabel?: string;
   /**
   * Use this props to pass aria-label inside component.
   */
   ariaActivedescendant?: string;
}

const props = withDefaults(defineProps<HasButtonTranslationProps>(), {
  translation: () => ({
    label: 'Didn\'t find chronic condition?',
    hint: 'Add with your own words',
  }),
  icon: 'plus',
  ariaLabel: 'Chronic conditions',
  ariaActivedescendant: '',
});

const defaultProps = computed(() => {
  return {
    translation: {
      label: 'Didn\'t find chronic condition?',
      hint: 'Add with your own words',
      ...props.translation,
    },
    icon: 'plus',
    ariaLabel: 'Chronic conditions',
    ariaActivedescendant: '',
  };
});

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

export interface AddEmits {
  (e:'add'): void;
};

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
    customOption: true,
  }
  const items = [attrs.items].flat();

  return [
    ...items,
    allPredefinedOptionsAreLoaded
      ? customOption
      : {}
  ].map((item, index) => ({
    label: item,
    "aria-selected": false,
    "aria-setsize": itemsToRender.length,
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

<template>
  <UiListItem class="ui-accordion-item">
    <!-- @slot Use this slot to replace toggler template. -->
    <slot
      name="toggler"
      v-bind="{ toggle, name, icon, title, isOpen, iconOpen: settings.iconOpen, iconClose: settings.iconClose }"
    >
      <UiButton
        :id="`toggler${name}`"
        :aria-expanded="`${isOpen}`"
        :aria-controls="name"
        class="ui-accordion-item__toggler ui-button--text ui-button--has-icon"
        @click="toggle(name)"
      >
        <!-- @slot Use this slot to replace chevron template. -->
        <slot
          name="chevron"
          v-bind="{ isOpen, icon, iconOpen: settings.iconOpen, iconClose: settings.iconClose }"
        >
          <UiIcon
            :icon="icon"
            class="ui-accordion-item__chevron"
          />
        </slot>
        {{ title }}
      </UiButton>
    </slot>
    <!-- @slot Use this slot to replace content template. -->
    <slot
      name="content"
      v-bind="{ isOpen, name }"
    >
      <div
        v-show="isOpen"
        :id="name"
        role="region"
        :aria-labelledby="`toggler${name}`"
        class="ui-accordion-item__content"
      >
        <!-- @slot Use this slot to place content inside accordion. -->
        <slot />
      </div>
    </slot>
  </UiListItem>
</template>

<script setup>
import { computed, inject } from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';

const props = defineProps({
  /**
    * Use this props to set item title.
    */
  title: {
    type: String,
    default: '',
  },
  /**
    * Use this props to set item name, it used to toggle.
    */
  name: {
    type: String,
    default: '',
  },
  /**
    * Use this props to setup item component.
    */
  settings: {
    type: Object,
    default: () => ({
      iconOpen: 'chevron-up',
      iconClose: 'chevron-down',
    }),
  },
});
const opened = inject('opened');
const toggle = inject('toggle');
const isOpen = computed(() => {
  if (opened.value === 'string') {
    return props.name === opened.value;
  }
  return opened.value.includes(props.name);
});
const icon = computed(() => (isOpen.value ? props.settings.iconOpen : props.settings.iconClose));
</script>

<style lang="scss">
@import "../../../../styles/mixins/mixins";

.ui-accordion-item {
  @include inner-border($element: accordion-item, $color: var(--color-border-divider), $width: 1px 0 0 0);

  $this: &;

  --list-item-padding: 0;

  display: flex;
  flex-direction: column;

  &:last-of-type {
    --accordion-item-border-width: var(--accordion-item-last-border-width, 1px 0);
  }

  &__toggler {
    --button-align-items: flex-start;
    --button-justify-content: flex-start;
    --button-padding: var(--accordion-item-toggler-padding, var(--space-12));
    --button-border-width: 0;
    --button-white-space: wrap;
    --button-text-align: left;

    &:focus {
      z-index: 1;
    }

    [dir="rtl"] & {
      --button-text-align: right;
    }
  }

  &__chevron {
    --icon-size: var(--accordion-item-chevron-icon-size, 1.5rem);

    flex: none;
    margin: var(--accordion-item-chevron-margin, 0 var(--space-12) 0 0);

    [dir="rtl"] & {
      margin: var(--accordion-item-chevron-margin, 0 0 0 var(--space-12));
    }
  }

  &__content {
    padding: var(--accordion-item-content-padding, var(--space-12) var(--space-12) var(--space-12) var(--space-48));

    [dir="rtl"] & {
      padding: var(--accordion-item-content-padding, var(--space-12) var(--space-48) var(--space-12) var(--space-12));
    }
  }
}
</style>

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
        class="ui-button--outlined ui-accordion-item__toggler"
        @click="toggle(name)"
      >
        <!-- @slot Use this slot to replace chevron template. -->
        <slot
          name="chevron"
          v-bind="{ isOpen, icon, iconOpen: settings.iconOpen, iconClose: settings.iconClose }"
        >
          <UiIcon
            :icon="icon"
            class="ui-button__icon ui-accordion-item__chevron"
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

<script setup lang="ts">
import { computed, inject } from 'vue';
import type { ComputedRef, PropType } from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';
import type { AccordionValue, AccordionItemSettings } from '../UiAccordion.vue';

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
    type: Object as PropType<AccordionItemSettings>,
    default: () => ({
      iconOpen: 'chevron-up',
      iconClose: 'chevron-down',
    }),
  },
});
const opened = inject('opened') as ComputedRef<AccordionValue>;
const toggle = inject('toggle') as (name: string) => void;
const isOpen = computed(() => {
  if (opened.value === 'string') {
    return props.name === opened.value;
  }
  return opened.value.includes(props.name);
});
const icon = computed(() => (isOpen.value ? props.settings.iconOpen : props.settings.iconClose));
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-accordion-item {
  $this: &;
  $element: accordion-item;

  @include mixins.inner-border($element: accordion-item, $color: var(--color-border-divider), $width: 1px 0 0 0);

  --list-item-padding: #{functions.var($element, padding, 0)};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  &:last-of-type {
    &::after {
      border-width: functions.var($element, border-width, 1px 0);
    }
  }

  &__toggler {
    --button-padding: #{functions.var($element + "-toggler", padding, var(--space-12))};
    --button-border-width: #{functions.var($element + "-toggler", border-width, 0)};
    --button-border-radius: #{functions.var($element + "-toggler", border-radius, 0)};
    --button-font: #{functions.var($element, font, var(--font-body-1))};
    --button-letter-spacing: #{functions.var($element, letter-spacing, var(--letter-spacing-body-1))};
    --button-icon-margin: #{functions.var($element + "-toggler", icon-margin,  0 var(--space-12) 0 0)};
    --button-rtl-icon-margin: #{functions.var($element + "-rtl-toggler", icon-margin,  0 0 0 var(--space-12))};

    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;

    @include mixins.focus {
      box-shadow: var(--focus-inner);
    }

    [dir="rtl"] & {
      text-align: right;
    }
  }

  &__content {
    width: 100%;
    padding:
      functions.var(
        $element + "-content",
        padding,
        var(--space-12) var(--space-12) var(--space-12) var(--space-48)
      );

    [dir="rtl"] & {
      padding:
        functions.var(
          $element + "-rtl-content",
          padding,
          var(--space-12) var(--space-48) var(--space-12) var(--space-12)
        );
    }
  }
}
</style>

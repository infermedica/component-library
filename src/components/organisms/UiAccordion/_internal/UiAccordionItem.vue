<template>
  <UiListItem :list-item-attrs="defaultProps.listItemAttrs">
    <template #content>
      <!-- @slot Use this slot to replace toggler template. -->
      <slot
        name="toggler"
        v-bind="{
          buttonTogglerAttrs,
          name,
          isOpen,
          toggle,
          title,
          iconOpen: defaultProps.settings.iconOpen,
          iconClose: settings.iconClose,
          iconTogglerAttrs: defaultProps.iconTogglerAttrs,
        }"
      >
        <UiButton
          v-bind="buttonTogglerAttrs"
          :id="`toggler-${name}`"
          :aria-expanded="`${isOpen}`"
          :aria-controls="name"
          class="ui-button--outlined ui-accordion-item__toggler"
          @click="toggle(name)"
        >
          <!-- @slot Use this slot to replace chevron template. -->
          <slot
            name="chevron"
            v-bind="{
              iconTogglerAttrs: defaultProps.iconTogglerAttrs,
              isOpen,
              iconOpen: defaultProps.settings.iconOpen,
              iconClose: settings.iconClose
            }"
          >
            <UiIcon
              v-bind="defaultProps.iconTogglerAttrs"
              class="ui-button__icon ui-accordion-item__chevron"
            />
          </slot>
          {{ title }}
        </UiButton>
      </slot>
      <!-- @slot Use this slot to replace content template. -->
      <slot
        name="content"
        v-bind="{
          isOpen,
          contentAttrs,
          name
        }"
      >
        <div
          v-show="isOpen"
          v-bind="contentAttrs"
          :id="name"
          role="region"
          :aria-labelledby="`toggler-${name}`"
          class="ui-accordion-item__content"
        >
          <!-- @slot Use this slot to place content inside accordion. -->
          <slot />
        </div>
      </slot>
    </template>
  </UiListItem>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
} from 'vue';
import type {
  ComputedRef,
  PropType,
} from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';
import type {
  AccordionValue,
  AccordionItemSettings,
} from '../UiAccordion.vue';
import type { IconName } from '../../../../types/icon';

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
  /**
   *  Use this props to pass attrs to toggler UiButton.
   */
  buttonTogglerAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   *  Use this props to pass attrs to toggler UiIcon.
   */
  iconTogglerAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   *  Use this props to pass attrs to content element.
   */
  contentAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   *  Use this props to pass attrs to list item.
   */
  listItemAttrs: {
    type: Object,
    default: () => ({}),
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
const defaultProps = computed(() => ({
  settings: {
    iconOpen: 'chevron-up' as IconName,
    iconClose: 'chevron-down' as IconName,
    ...props.settings,
  },
  iconTogglerAttrs: {
    icon: isOpen.value
      ? props.settings?.iconOpen || 'chevron-up'
      : props.settings?.iconClose || 'chevron-down',
    ...props.iconTogglerAttrs,
  },
  listItemAttrs: {
    class: 'ui-accordion-item',
    ...props.listItemAttrs,
  },
}));
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-accordion-item {
  $this: &;
  $element: accordion-item;

  --list-item-padding-block: #{functions.var($element, padding-block, 0)};
  --list-item-padding-inline: #{functions.var($element, padding-inline, 0)};
  --list-item-tablet-block: #{functions.var($element + "-tablet", padding-block, 0)};
  --list-item-tablet-inline: #{functions.var($element + "-tablet", padding-inline, 0)};
  --list-item-hover-background: #{functions.var($element + "-hover", background, transparent)};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  &__toggler {
    @include mixins.override-logical(button, $element + "-toggler", padding, var(--space-12));
    @include mixins.override-logical(button, $element + "-toggler", border-width, 0);
    @include mixins.override-logical(button, $element + "-toggler", border-radius, 0);
    --button-font: #{functions.var($element, font, var(--font-body-1))};
    --button-letter-spacing: #{functions.var($element, letter-spacing, var(--letter-spacing-body-1))};
    --button-icon-margin-inline: #{functions.var($element + "-toggler", icon-margin-inline,  0)};
    --button-gap: #{functions.var($element + "-toggler", gap, var(--space-12))};

    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: start;

    @include mixins.focus {
      box-shadow: var(--focus-inner);
    }
  }

  &__content {
    @include mixins.use-logical(
      $element + "-content",
      padding,
      var(--space-12) var(--space-12) var(--space-12) var(--space-48)
    );

    width: 100%;
  }
}
</style>

<template>
  <UiListItem :list-item-attrs="defaultProps.listItemAttrs">
    <template #content>
      <!-- @slot Use this slot to replace toggler template. -->
      <slot
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
        name="toggler"
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
        v-bind="{
          isOpen,
          contentAttrs,
          name
        }"
        name="content"
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
import type { ComputedRef } from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';
import type { ListItemAttrsProps } from '../../UiList/_internal/UiListItem.vue';
import type {
  AccordionModelValue,
  AccordionToggle,
} from '../UiAccordion.vue';
import type {
  DefineAttrsProps,
  Icon,
} from '../../../../types';

export interface AccordionItemSettings {
  iconOpen?: Icon;
  iconClose?: Icon;
}
export interface AccordionItemProps {
  /**
    * Use this props to set item title.
    */
  title?: string;
  /**
    * Use this props to set item name, it used to toggle.
    */
  name?: string;
  /**
    * Use this props to setup item component.
    */
  settings?: AccordionItemSettings;
  /**
   *  Use this props to pass attrs to toggler UiButton.
   */
  buttonTogglerAttrs?: ButtonAttrsProps;
  /**
   *  Use this props to pass attrs to toggler UiIcon.
   */
  iconTogglerAttrs?: IconAttrsProps;
  /**
   *  Use this props to pass attrs to list item.
   */
  listItemAttrs?: ListItemAttrsProps['listItemAttrs'];
  /**
   *  Use this props to pass attrs to content element.
   */
  contentAttrs?: DefineAttrsProps<null>;
}
export type AccordionItemAttrsProps = DefineAttrsProps<AccordionItemProps, ListItemAttrsProps>;

const props = withDefaults(defineProps<AccordionItemProps>(), {
  title: '',
  name: '',
  settings: () => ({
    iconOpen: 'chevron-up',
    iconClose: 'chevron-down',
  }),
  buttonTogglerAttrs: () => ({}),
  iconTogglerAttrs: () => ({ icon: 'chevron-down' }),
  contentAttrs: () => ({}),
  listItemAttrs: () => ({ class: 'ui-accordion-item' }),
});
const opened = inject<ComputedRef<AccordionModelValue>>('opened', computed(() => ''));
const toggle = inject<AccordionToggle>('toggle', () => undefined);
const isOpen = computed(() => (opened.value === 'string'
  ? props.name === opened.value
  : opened.value.includes(props.name)));
const defaultProps = computed(() => {
  const iconOpen: AccordionItemSettings['iconOpen'] = 'chevron-up';
  const iconClose: AccordionItemSettings['iconClose'] = 'chevron-down';
  return {
    settings: {
      iconOpen,
      iconClose,
      ...props.settings,
    },
    iconTogglerAttrs: {
      icon: isOpen.value
        ? props.settings.iconOpen || iconOpen
        : props.settings.iconClose || iconClose,
      ...props.iconTogglerAttrs,
    },
    listItemAttrs: {
      class: 'ui-accordion-item',
      ...props.listItemAttrs,
    },
  };
});
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-accordion-item {
  $this: &;
  $element: accordion-item;

  @include mixins.override-logical(list-item, $element, padding, 0);
  @include mixins.override-logical(list-item-tablet, $element + "-tablet", padding, 0);

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

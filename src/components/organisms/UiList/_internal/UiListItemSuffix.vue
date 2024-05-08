<template>
  <UiListItemAffix
    class="ui-list-item-suffix"
  >
    <template
      #default="{
        icon,
        label,
        isButton,
        hasIcon,
        iconAttrs,
        labelAttrs,
      }"
    >
      <!-- @slot Use this slot to replace label template. -->
      <slot
        name="label"
        v-bind="{
          label,
          labelAttrs,
        }"
      >
        <span
          v-bind="labelAttrs"
        >{{ label }}</span>
      </slot>
      <!-- @slot Use this slot to replace icon template. -->
      <slot
        name="icon"
        v-bind="{
          isButton,
          hasIcon,
          iconAttrs,
        }"
      >
        <UiIcon
          v-if="hasIcon"
          :icon="icon"
          v-bind="iconAttrs"
          :class="[ { 'ui-button__icon ui-button__icon--end': isButton } ]"
        />
      </slot>
    </template>
  </UiListItemAffix>
</template>

<script setup lang="ts">
import UiListItemAffix, { type ListItemAffixAttrsProps } from '@/components/organisms/UiList/_internal/UiListItemAffix.vue';
import UiIcon, { type IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface ListItemSuffixProps {
  /**
   * @deprecated will be removed in 2.0.0 Use this props to pass attrs for suffix UiIcon.
   */
  iconSuffixAttrs?: IconAttrsProps,
  /**
   * @deprecated will be removed in 2.0.0 Use this props to pass attrs for label element.
   */
  labelSuffixAttrs?: DefineAttrsProps<null>;
}
export type ListItemSuffixAttrsProps = DefineAttrsProps<ListItemAffixAttrsProps, ListItemSuffixProps>
const props = withDefaults(defineProps<ListItemSuffixProps>(), { // @deprecated will be removed in 2.0.0 / BEGIN
  iconSuffixAttrs: () => ({}),
  labelSuffixAttrs: () => ({}),
// END
});

// TODO: will be removed in 2.0.0 / BEGIN
if (Object.keys(props.iconSuffixAttrs).length > 0) {
  console.warn('[@infermedica/component-library]: The `iconSuffixAttrs` props is deprecated and it will be removed in v2.0.0. Please use `iconAttrs` instead.');
}
if (Object.keys(props.labelSuffixAttrs).length > 0) {
  console.warn('[@infermedica/component-library]: The `labelSuffixAttrs` props is deprecated and it will be removed in v2.0.0. Please use `labelAttrs` instead.');
}
// END
</script>

<style scoped lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-list-item-suffix {
  $this: &;
  $element: list-item-suffix;

  --list-item-affix-gap: functions.var($element, gap);
  --list-item-affix-icon-color: #{functions.var($element, icon-color)};
  --list-item-affix-hover-icon-color: #{functions.var($element + '-hover', icon-color)};
  --list-item-affix-active-icon-color: #{functions.var($element + '-active', icon-color)};
  --list-item-affix-text-color: #{functions.var($element, text-color)};
  --list-item-affix-hover-text-color: #{functions.var($element + '-hover', text-color)};
  --list-item-affix-active-text-color: #{functions.var($element + '-active', text-color)};
}
</style>

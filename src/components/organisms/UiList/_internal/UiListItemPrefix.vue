<template>
  <UiListItemAffix
    class="ui-list-item-prefix"
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
          :class="[ { 'ui-button__icon': isButton } ]"
        />
      </slot>
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
    </template>
  </UiListItemAffix>
</template>

<script setup lang="ts">
import UiListItemAffix, { type ListItemAffixAttrsProps } from './UiListItemAffix.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import type { DefineAttrsProps } from '../../../../types';

export type ListItemPrefixAttrsProps = DefineAttrsProps<ListItemAffixAttrsProps>
</script>

<style scoped lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-list-item-prefix {
  $this: &;
  $element: list-item-prefix;

  --list-item-affix-gap: functions.var($element, gap);
  --list-item-affix-icon-color: #{functions.var($element, icon-color)};
  --list-item-affix-hover-icon-color: #{functions.var($element + '-hover', icon-color)};
  --list-item-affix-active-icon-color: #{functions.var($element + '-active', icon-color)};
  --list-item-affix-text-color: #{functions.var($element, text-color)};
  --list-item-affix-hover-text-color: #{functions.var($element + '-hover', text-color)};
  --list-item-affix-active-text-color: #{functions.var($element + '-active', text-color)};
}
</style>

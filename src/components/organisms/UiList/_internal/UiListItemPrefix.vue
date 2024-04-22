<template>
  <component
    :is="listItemPrefixComponent"
    :class="[
      'ui-list-item-prefix',
      { 'ui-button--text': isButton },
    ]"
  >
    <!-- @slot Use this slot to replace Prefix template. -->
    <slot>
      <!-- @slot Use this slot to replace icon template. -->
      <slot
        name="icon"
        v-bind="{
          hasIcon,
          iconAttrs: defaultProps.iconAttrs,
        }"
      >
        <UiIcon
          v-if="hasIcon"
          v-bind="defaultProps.iconAttrs"
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
          v-if="label"
          v-bind="labelAttrs"
        >
          {{ label }}
        </span>
      </slot>
    </slot>
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  useAttrs,
} from 'vue';
import type {
  DefineAttrsProps,
  HTMLTag,
  Icon,
} from '@/types';
import UiIcon, { type IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';

export interface ListItemPrefixProps {
  /**
   * Use this props to set list item prefix tag.
   */
  tag?: string | HTMLTag;
  /**
   * Use this props to set label.
   */
  label?: string;
  /**
   * Use this props to set icon.
   */
  icon?: Icon;
  /**
   * Use this props to pass attrs for prefix UiIcon.
   */
  iconAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for label element.
   */
  labelAttrs?: DefineAttrsProps<null>;
}
export type ListItemPrefixAttrsProps = DefineAttrsProps<ListItemPrefixProps>;
const props = withDefaults(defineProps<ListItemPrefixProps>(), {
  tag: '',
  label: '',
  icon: '',
  iconAttrs: () => ({}),
  labelAttrs: () => ({}),
});
const attrs:ListItemPrefixAttrsProps = useAttrs();
const isButton = computed(() => (!!Object.keys(attrs)
  .find((key) => key
    .match(/(^on*|to|href)/))));
const listItemPrefixComponent = computed(() => {
  if (props.tag !== '') {
    return props.tag;
  }
  return isButton.value
    ? defineAsyncComponent(() => import('../../../atoms/UiButton/UiButton.vue'))
    : defineAsyncComponent(() => import('../../../atoms/UiText/UiText.vue'));
});
const defaultProps = computed(() => ({
  iconAttrs: {
    icon: props.icon,
    class: [
      { 'ui-button__icon': isButton.value },
      props.iconAttrs?.class,
    ],
    ...props.iconAttrs,
  },
}));
const hasIcon = computed(() => (defaultProps.value?.iconAttrs?.icon));
</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-list-item-prefix {
  $element: list-item-prefix;

  display: flex;
  align-items: center;
  gap: functions.var($element, gap, var(--space-4));
}
</style>

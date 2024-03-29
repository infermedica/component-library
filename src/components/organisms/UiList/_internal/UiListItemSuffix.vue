<template>
  <component
    :is="defaultProps.tag"
    v-bind="defaultProps"
    class="ui-list-item-suffix"
  >
    <!-- @slot Use this slot to replace suffix template. -->
    <slot>
      <!-- @slot Use this slot to replace label template. -->
      <slot
        name="label"
        v-bind="{
          label,
          labelSuffixAttrs,
          labelAttrs,
        }"
      >
        <span
          v-if="label"
          v-bind="labelSuffixAttrs || labelAttrs"
        >
          {{ label }}
        </span>
      </slot>
      <!-- @slot Use this slot to replace icon template. -->
      <slot
        name="icon"
        v-bind="{
          hasIcon,
          iconSuffixAttrs,
          iconAttrs: defaultProps.iconAttrs,
        }"
      >
        <UiIcon
          v-if="hasIcon"
          v-bind="defaultProps.iconAttrs"
        />
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
import UiIcon, { type IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';

import type {
  DefineAttrsProps,
  HTMLTag,
  Icon,
} from '../../../../types';

export interface ListItemSuffixProps {
  /**
   * Use this props to set list item suffix tag.
   */
  tag?: HTMLTag;
  /**
   * Use this props to set label.
   */
  label?: string;
  /**
   * Use this props to set icon.
   */
  icon?: Icon;
  /**
   * Use this props to pass attrs for suffix UiIcon.
   */
  iconAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for label element.
   */
  labelAttrs?: DefineAttrsProps<null>;
}
export type ListItemSuffixAsButtonAttrsProps = DefineAttrsProps<ListItemSuffixProps>;
const props = withDefaults(defineProps<ListItemSuffixProps>(), {
  tag: 'div',
  label: '',
  icon: '',
  iconAttrs: () => ({}),
  labelAttrs: () => ({}),
});

const attrs = useAttrs();

// TODO: will be removed in 2.0.0 / BEGIN
const {
  iconSuffixAttrs, labelSuffixAttrs,
} = attrs;
if (iconSuffixAttrs) {
  console.warn('[@infermedica/component-library]: The `iconSuffixAttrs` props is deprecated and it will be removed in v2.0.0. Please use `iconAttrs` instead.');
}
if (labelSuffixAttrs) {
  console.warn('[@infermedica/component-library]: The `labelSuffixAttrs` props is deprecated and it will be removed in v2.0.0. Please use `labelAttrs` instead.');
}
// END

const isButton = computed(() => (!!Object.keys(attrs)
  .find((key) => key
    .match(/(^on*|to|href)/))));
const defaultProps = computed(() => ({
  ...props,
  tag: isButton.value
    ? defineAsyncComponent(() => import('../../../atoms/UiButton/UiButton.vue'))
    : defineAsyncComponent(() => import('../../../atoms/UiText/UiText.vue')),
  class: [ { 'ui-button--text': isButton.value } ],
  iconAttrs: {
    icon: props.icon,
    class: [
      { 'ui-button__icon ui-button__icon-end': isButton.value },
      props.iconAttrs.class,
      iconSuffixAttrs.class,
    ],
    ...props.iconAttrs,
    ...iconSuffixAttrs,
  },
}));
const hasIcon = computed(() => (defaultProps.value.iconAttrs.icon));
</script>

<style lang="scss">
.ui-list-item-suffix {
  display: flex;
  align-items: center;
}
</style>

<template>
  <component
    :is="tag"
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
        }"
      >
        <span
          v-if="label"
          v-bind="labelSuffixAttrs"
        >
          {{ label }}
        </span>
      </slot>
      <!-- @slot Use this slot to replace icon template. -->
      <slot
        name="icon"
        v-bind="{
          hasIcon,
          iconSuffixAttrs: defaultProps.iconSuffixAttrs,
        }"
      >
        <UiIcon
          v-if="hasIcon"
          v-bind="defaultProps.iconSuffixAttrs"
        />
      </slot>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiIcon, { type IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../../atoms/UiText/UiText.vue';

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
  iconSuffixAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for label element.
   */
  labelSuffixAttrs?: DefineAttrsProps<null>;
}
export type ListItemSuffixAsButtonAttrsProps = DefineAttrsProps<ListItemSuffixProps>;
const props = withDefaults(defineProps<ListItemSuffixProps>(), {
  tag: UiText,
  label: '',
  icon: '',
  iconSuffixAttrs: () => ({}),
  labelSuffixAttrs: () => ({}),
});

const defaultProps = computed(() => ({
  iconSuffixAttrs: {
    icon: props.icon,
    ...props.iconSuffixAttrs,
  },
}));
const hasIcon = computed(() => (defaultProps.value.iconSuffixAttrs.icon));
</script>

<style lang="scss">
.ui-list-item-suffix {
  display: flex;
  align-items: center;
}
</style>

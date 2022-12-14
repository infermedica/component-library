<template>
  <UiButton class="ui-button--text ui-list-item-suffix-as-button">
    <!-- @slot Use this slot to replace label template. -->
    <slot
      name="label"
      v-bind="{
        label,
        labelSuffixAttrs
      }"
    >
      <span
        v-if="label"
        v-bind="labelSuffixAttrs"
      >{{ label }}</span>
    </slot>
    <!-- @slot Use this slot to replace icon template. -->
    <slot
      name="icon"
      v-bind="{
        hasIcon,
        iconSuffixAttrs: defaultProps.iconSuffixAttrs
      }"
    >
      <UiIcon
        v-if="hasIcon"
        v-bind="defaultProps.iconSuffixAttrs"
        class="ui-button__icon ui-list-item-suffix-as-button__icon"
      />
    </slot>
  </UiButton>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { PropsAttrs } from '../../../../types/attrs';
import type { Icon } from '../../../../types/icon';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';

const props = defineProps({
  /**
   * Use this props to set label.
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set icon.
   */
  icon: {
    type: [
      String,
      Object,
    ] as PropType<Icon>,
    default: '',
  },
  /**
   * Use this props to pass attrs for suffix UiIcon.
   */
  iconSuffixAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for label element.
   */
  labelSuffixAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const defaultProps = computed(() => ({
  iconSuffixAttrs: {
    icon: props.icon as Icon,
    ...props.iconSuffixAttrs,
  },
}));
const hasIcon = computed(() => (!!defaultProps.value.iconSuffixAttrs.icon));
</script>

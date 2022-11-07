<template>
  <UiButton class="ui-button--text ui-list-item-suffix">
    <!-- @slot Use this slot to replace label template. -->
    <slot
      name="label"
      v-bind="{
        label,
        labelAttrs
      }"
    >
      <span v-bind="labelAttrs">{{ label }}</span>
    </slot>
    <!-- @slot Use this slot to replace icon template. -->
    <slot
      name="icon"
      v-bind="{
        hasIcon,
        iconSuffixAttrs: defaultProps.iconAttrs
      }"
    >
      <UiIcon
        v-if="icon"
        v-bind="defaultProps.iconAttrs"
        class="ui-button__icon ui-button__icon--right ui-list-item-suffix__icon"
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
    default: 'info',
  },
  /**
   * Use this props to pass attrs for UiIcon
   */
  iconAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for button label
   */
  labelAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const defaultProps = computed(() => ({
  iconAttrs: {
    icon: props.icon as Icon,
    ...props.iconAttrs,
  },
}));
const hasIcon = computed(() => !!defaultProps.value.iconAttrs.icon);
</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-list-item-suffix {
  $element: list-item-suffix;

  display: flex;
}
</style>

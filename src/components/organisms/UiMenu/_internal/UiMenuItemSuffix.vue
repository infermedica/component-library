<template>
  <span class="ui-menu-item-suffix">
    <!-- @slot Use this slot to replace label template. -->
    <slot
      name="label"
      v-bind="{ label }"
    >
      {{ label }}
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
        v-bind="defaultProps.iconSuffixAttrs"
        class="ui-button__icon ui-menu-item-suffix__icon"
      />
    </slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { PropsAttrs } from '../../../../types/attrs';
import type { Icon } from '../../../../types/icon';
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
    default: 'checkmark',
  },
  /**
   * Use this props to pass attrs for suffix UIIcon
   */
  iconSuffixAttrs: {
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
const hasIcon = computed(() => !!defaultProps.value.iconSuffixAttrs.icon);
</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-menu-item-suffix {
  $element: menu-item-suffix;

  --button-icon-block: #{functions.var($element + "-icon", margin-block, 0)};
  --button-icon-inline: #{functions.var($element + "-icon", margin-inline, 0)};

  display: flex;
  align-items: center;
  gap: functions.var($element, gap, var(--space-4));
}
</style>

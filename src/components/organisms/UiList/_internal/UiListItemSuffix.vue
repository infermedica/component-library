<template>
  <UiButton
    class="ui-list-item-suffix ui-button--text ui-text--body-2-comfortable"
  >
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
        v-if="icon"
        v-bind="defaultProps.iconSuffixAttrs"
        class="ui-list-item-suffix__icon ui-button__icon "
      />
    </slot>
  </UiButton>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
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
    default: 'info',
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

.ui-list-item-suffix {
  $element: list-item-suffix;

  --button-icon-margin: #{functions.var($element + "-icon", margin, 0)};
  display: flex;
  align-items: center;
  gap: functions.var($element, gap, var(--space-4));

  &__icon {
    width: 20px;
    height: 20px;
    margin: 2px;
  }
}
</style>

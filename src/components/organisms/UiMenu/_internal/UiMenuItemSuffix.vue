<template>
  <span
    class="ui-menu-item-suffix"
  >
    <slot>
      {{ label }}
    </slot>
    <!-- @slot Use this slot to replace icon template  -->
    <slot
      name="icon"
      v-bind="{
        hasIcon,
        ...defaultProps.iconAttrs
      }"
    >
      <UiIcon
        v-if="hasIcon"
        class="ui-menu-item-suffix__icon"
        v-bind="defaultProps.iconAttrs"
      />
    </slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type {
  Icon,
  IconAsString,
} from '../../../../types/icon';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import type { PropsAttrs } from '../../../../types/attrs';

const props = defineProps({
  /**
   * Use this prop to set label.
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * Use this prop to set icon visibility.
   */
  hasIcon: {
    type: Boolean,
    default: true,
  },
  /**
   * Use this prop to set icon.
   */
  icon: {
    type: [String, Object] as PropType<Icon>,
    default: 'checkmark',
  },
  /**
   * Use this prop to set icon attributes.
   */
  iconAttrs: {
    type: Object as PropsAttrs,
    default: () => ({
    }),
  },
});
const defaultProps = computed(() => ({
  iconAttrs: {
    icon: props.icon as IconAsString,
    ...props.iconAttrs,
  },
}));
</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-menu-item-suffix {
  $this: &;
  $element: menu-item-suffix;

  display: flex;
  align-items: center;
  margin: functions.var($element + "-suffix", margin, 0 0 0 var(--space-12));
  gap: functions.var($element + "-suffix", margin, 0 0 0 var(--space-4));

  [dir="rtl"] & {
    margin: functions.var($element + "-rtl-suffix", margin, 0 var(--space-12) 0 0);
  }

  &__icon {
    margin: functions.var($element + "-icon", margin, 0);
  }

  &--hide-icon {
    #{$this}__icon {
      fill: transparent;
    }
  }
}
</style>

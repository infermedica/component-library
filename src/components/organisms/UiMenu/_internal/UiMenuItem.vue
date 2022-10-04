<template>
  <UiListItem
    class="ui-menu-item"
    v-bind="listItemAttrs"
  >
    <UiButton
      :class="['ui-button--outlined', 'ui-menu-item__button']"
      v-bind="$attrs"
    >
      <!-- @slot Use this slot to replace label template -->

      <slot
        name="label"
        v-bind="labelClass"
      >
        <UiText
          :class="['ui-menu-item__label', labelClass]"
        >
          <!-- @slot Use this slot to place label content inside menu-item -->
          <slot />
        </UiText>
      </slot>
      <!-- @slot Use this slot to replace suffix template -->
      <slot
        v-if="hasSuffix"
        name="suffix"
        v-bind="{
          hasSuffix,
          iconLabel,
          hasIcon,
          icon,
          iconAttrs
        }"
      >
        <span
          :class="['ui-menu-item__suffix']"
        >
          {{ iconLabel }}
          <!-- @slot Use this slot to replace icon template  -->
          <slot
            name="icon"
            v-bind="{
              hasIcon,
              icon,
              iconAttrs,
            }"
          >
            <UiIcon
              v-if="hasIcon"
              :icon="icon"
              :class="['ui-menu-item__icon']"
              v-bind="iconAttrs"
            />
          </slot>
        </span>
      </slot>
    </UiButton>
  </UiListItem>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import {
  computed,
  useAttrs,
} from 'vue';
import type { PropType } from 'vue';
import type { Icon } from '../../../../types/icon';
import type { MenuIconVisible } from '../UiMenu.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';
import type { PropsAttrs } from '../../../../types/attrs';

const props = defineProps({
  /**
   * Use this prop to set icon.
   */
  icon: {
    type: [String, Object] as PropType<Icon>,
    default: 'checkmark',
  },
  /**
   * Use this prop to set suffix text.
   */
  iconLabel: {
    type: String,
    default: '',
  },
  /**
   * Use this prop to control icon visibility.
   */
  iconVisible: {
    type: String as PropType<MenuIconVisible>,
    default: 'default',
  },
  /**
   * Use this prop to set icon attributes.
   */
  iconAttrs: {
    type: Object as PropsAttrs,
    default: () => ({
    }),
  },
  /**
   * Use this prop to set list item attributes.
   */
  listItemAttrs: {
    type: Object as PropsAttrs,
    default: () => ({
    }),
  },
});
const attrs = useAttrs() as {class?: string};
const isSelected = computed(() => attrs.class && attrs.class.includes('ui-button--is-selected'));
const labelClass = computed(() => ({
  'ui-text--on-brand': isSelected.value,
}));
const hasIcon = computed(() => (props.iconVisible === 'always' || (props.iconVisible === 'default' && isSelected.value)));
const hasSuffix = computed(() => props.iconLabel || hasIcon.value);
</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-menu-item {
  $element: menu-item;

  --list-item-padding: 0;

  margin: functions.var($element + "-list-item", margin, 0 0 var(--space-8) 0);

  &:last-child {
    margin: 0;
  }

  &__button {
    --button-padding: #{functions.var($element, padding, var(--space-8))};
    --button-border-width: #{functions.var($element, border-width, 0)};
    --button-font: #{functions.var($element, font, var(--font-body-1))};

    width: functions.var($element, width, 100%);
    justify-content: flex-start;
  }

  &__label {
    flex: 1;
    text-align: start;
  }

  &__suffix {
    display: flex;
    align-items: center;
    margin: functions.var($element + "-label", margin, 0 0 0 var(--space-12));
    gap: var(--space-4);

    [dir="rtl"] & {
      margin: functions.var($element + "-rtl-label", margin, 0 var(--space-12) 0 0);
    }
  }

  &__icon {
    margin: functions.var($element + "-icon", margin, 0);
  }
}
</style>

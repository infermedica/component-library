<template>
  <UiListItem :class="['ui-menu-item']">
    <UiButton
      :class="['ui-menu-item__button', 'ui-button--outlined', {
        'ui-button--is-selected': isSelected
      }]"
      @click="changeHandler(value)"
    >
      <!-- @slot Use this slot to replace label template -->

      <slot name="label">
        <span
          :class="['ui-menu-item__label']"
        >
          <!-- @slot Use this slot to place label content inside menu-item -->
          <slot />
        </span>
      </slot>
      <!-- @slot Use this slot to replace suffix template -->
      <slot
        name="suffix"
        v-bind="{
          iconLabel,
          isIcon,
          icon
        }"
      >
        <UiLink
          :class="['ui-menu-item__suffix', {
            'ui-button--theme-brand': isSelected
          }]"
        >
          {{ iconLabel }}
          <!-- @slot Use this slot to replace icon template  -->
          <slot
            name="icon"
            v-bind="{
              isIcon,
              icon
            }"
          >
            <UiIcon
              v-if="isIcon"
              :icon="icon"
              :class="['ui-menu-item__icon', 'ui-link__icon', 'ui-link__icon--right']"
            />
          </slot>
        </UiLink>
      </slot>
    </UiButton>
  </UiListItem>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
} from 'vue';
import type {
  ComputedRef,
  PropType,
} from 'vue';
import type { Icon } from '../../../../types/icon';
import type {
  MenuIconVisible,
  MenuValue,
} from '../UiMenu.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';
import UiLink from '../../../atoms/UiLink/UiLink.vue';

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
   * Use this prop to set value of item.
   */
  value: {
    type: [String, Object] as PropType<MenuValue>,
    default: '',
  },
});
const modelValue = inject('modelValue') as ComputedRef<MenuValue>;
const changeHandler = inject('changeHandler') as (value: MenuValue) => void;
const isSelected = computed(() => (!modelValue.value
  ? false
  : props.value === modelValue.value));
const isIcon = computed(() => (props.iconVisible === 'always' || (props.iconVisible === 'default' && isSelected.value)));
</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-menu-item {
  $element: datepicker;

  --list-item-padding: 0;

  &__button {
    --button-padding: 8px;
    --button-border-width: 0;

    width: functions.var($element + "-button", width, 100%);
    justify-content: flex-start;
  }

  &__label {
    flex: 1;
    text-align: start;
  }

  &__suffix {
    display: flex;
    align-items: center;
  }

  &__icon {
    margin-left: 4px;
  }
}
</style>

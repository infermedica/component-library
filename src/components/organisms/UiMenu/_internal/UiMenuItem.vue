<template>
  <UiListItem :class="['ui-menu-item']">
    <UiButton
      :class="['ui-menu-item__button', 'ui-button--outlined', {
        'ui-button--is-selected': isSelected
      }]"
      @click="changeHandler(value)"
    >
      <span
        :class="['ui-menu-item__label']"
      >
        <slot />
      </span>
      <span
        :class="['ui-menu-item__suffix']"
      >
        {{ iconLabel }}
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
            :class="['ui-menu-item__icon', 'ui-button__icon']"
          />
        </slot>
      </span>
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

const props = defineProps({
  icon: {
    type: [String, Object] as PropType<Icon>,
    default: 'checkmark',
  },
  iconLabel: {
    type: String,
    default: '',
  },
  iconVisible: {
    type: String as PropType<MenuIconVisible>,
    default: 'default',
  },
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
    --button-padding: 12px 16px;
    --button-border-width: 0;

    width: functions.var($element + "-button", width, 100%);
    justify-content: flex-start;
  }

  &__label {
    flex-grow: 1;
    text-align: start;
  }

  &__suffix {

    display: flex;
    align-items: center;
  }
}
</style>

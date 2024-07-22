<template>
  <div class="ui-list-item-button">
    <UiButton
      class="ui-list-item-button__button ui-button--text"
      @click="clickHandler"
    >
      <slot name="title">
        <UiText tag="span" class="ui-list-item-button__title">
          <slot
            name="icon"
            v-bind="{
              icon,
              iconButtonAttrs,
            }"
          >
            <UiIcon
              :icon="icon"
              class="ui-button__icon"
              v-bind="iconButtonAttrs"
            />
          </slot>
          <slot
            name="label"
            v-bind="{
              label,
              labelButtonAttrs,
            }"
          >
            <UiText
              tag="span"
              class="ui-list-item-button__label"
              v-bind="labelButtonAttrs"
            >
              {{ label }}
            </UiText>
          </slot>
        </UiText>
      </slot>
      <slot
        name="hint"
        v-bind="{
          hint,
          hintButtonAttrs,
        }"
      >
        <UiText tag="span" class="ui-list-item-button__hint">
          {{ hint }}
        </UiText>
      </slot>
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import type { ButtonAttrsProps } from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import type {
  DefineAttrsProps,
  Icon,
} from '../../../../types';

export interface ListItemButtonProps {
  /**
   * Use this props to set label.
   */
  label?: string;
  /**
   * Use this props to set label attributes.
   */
  labelAttrs?: DefineAttrsProps<null>;
  /**
   * Use this props to set icon.
   */
  hint?: string;
  /**
   * Use this props to set icon.
   */
  icon?: Icon;
  /**
   * Use this props to pass attrs for label element.
   */
  labelButtonAttrs?: DefineAttrsProps<null>;
  /**
   * Use this props to pass attrs for label element.
   */
  hintButtonAttrs?: DefineAttrsProps<null>;
  /**
   * Use this props to pass attrs for Button UiIcon.
   */
  iconButtonAttrs?: IconAttrsProps;
}
export type ListItemButtonAttrsProps = DefineAttrsProps<ListItemButtonProps, ButtonAttrsProps>;

export interface AddEmits {
  (e:'add'): void;
}

const emit = defineEmits<AddEmits>();
const clickHandler = () => {
  emit('add');
};

const props = withDefaults(defineProps<ListItemButtonProps>(), {
  label: 'Didn\'t find chronic condition?',
  hint: 'Add with your own words',
  icon: 'plus',
  labelButtonAttrs: () => ({}),
  hintButtonAttrs: () => ({}),
  iconButtonAttrs: () => ({}),
});
const defaultProps = computed(() => ({
  iconButtonAttrs: {
    icon: props.icon,
    ...props.iconButtonAttrs,
  },
}));
const hasIcon = computed(() => (!!defaultProps.value.iconButtonAttrs?.icon));
</script>

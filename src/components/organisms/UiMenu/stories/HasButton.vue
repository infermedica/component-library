<template>
  <UiPopover class="has-button">
    <UiMenu
      v-bind="args"
      role="listbox"
      :aria-label="ariaLabel"
      aria-multiselectable="true"
      :aria-activedescendant="ariaActivedescendant"
      :aria-busy="ariaBusy"
    >
      <template #[`menu-item-${index}`] v-for="(item, index) in args.items">
        <template v-if="item.isButton">
          <UiButton
            class="ui-menu-item-button__button ui-button--text"
            @click="clickHandler"
          >
            <slot name="title">
              <UiText tag="span" class="ui-menu-item-button__title">
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
                    class="ui-menu-item-button__label"
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
              <UiText tag="span" class="ui-menu-item-button__hint">
                {{ hint }}
              </UiText>
            </slot>
          </UiButton>
        </template>
        <template v-else>
          <UiCheckbox :aria-label="item.label" disabled />
          <UiText tag="span">{{ item.label }}</UiText>
        </template>
      </template>
    </UiMenu>
  </UiPopover>
</template>

<script setup lang="ts">
import {
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiMenu } from '@infermedica/component-library';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../../atoms/UiButton/UiButton.vue';
import UiCheckbox from '../../../atoms/UiCheckbox/UiCheckbox.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import type { IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import UiPopover from '../../../molecules/UiPopover/UiPopover.vue';
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

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));

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

<style lang="scss">
@use "../../../../styles/mixins";
.has-button {
  max-height: 20.5rem;
  overflow-y: auto;

  &__menu {
    @include mixins.use-logical(null, margin, var(--space-12) 0 0 0);

    .ui-menu-item {
      padding-block: var(--space-2);
    }

    .ui-list-item__content {
      --text-margin-inline: var(--space-8);
    }
  }

  .ui-popover__content {
    padding: var(--space-4) 0;
  }
}
</style>

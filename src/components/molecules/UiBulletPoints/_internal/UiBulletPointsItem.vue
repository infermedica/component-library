<template>
  <li class="ui-bullet-points-item">
    <!-- @slot Use this slot to replace bullet points item marker -->
    <slot
      name="marker"
      v-bind="{
        isUnordered,
        icon,
        iconMarkerAttrs: defaultProps.iconMarkerAttrs,
        textMarkerAttrs: defaultProps.textMarkerAttrs,
      }"
    >
      <UiIcon
        v-if="isUnordered"
        v-bind="defaultProps.iconMarkerAttrs"
        class="ui-bullet-points-item__marker"
      />
      <UiText
        v-else
        v-bind="defaultProps.textMarkerAttrs"
        tag="span"
        class="ui-bullet-points-item__marker"
      />
    </slot>
    <!-- @slot Use this slot to replace bullet points item content -->
    <slot
      name="content"
      v-bind="{ textContentAttrs }"
    >
      <div class="ui-bullet-points-item__content">
        <UiText v-bind="textContentAttrs">
          <!-- @slot Use this slot to place bullet points item content -->
          <slot />
        </UiText>
      </div>
    </slot>
  </li>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
} from 'vue';
import type {
  ComputedRef,
  LiHTMLAttributes,
} from 'vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import type { TextAttrsProps } from '../../../atoms/UiText/UiText.vue';
import type {
  DefineAttrsProps,
  HTMLTag,
  IconName,
} from '../../../../types';

export interface BulletPointsItemProps {
  /**
   * Use this props to set the bullet point icon.
   */
  icon?: IconName;
  /**
   * Use this props to pass attrs for marker UiIcon
   */
  iconMarkerAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for checkmark UiIcon
   */
  textMarkerAttrs?: TextAttrsProps;
  /**
   * Use this props to pass attrs for text content UiText
   */
  textContentAttrs?: TextAttrsProps;
}
export type BulletPointsItemAttrsProps = DefineAttrsProps<BulletPointsItemProps, LiHTMLAttributes>;

const props = withDefaults(defineProps<BulletPointsItemProps>(), {
  icon: 'bullet-common',
  iconMarkerAttrs: () => ({}),
  textMarkerAttrs: () => ({ tag: 'span' }),
  textContentAttrs: () => ({ }),
});
const defaultProps = computed<BulletPointsItemProps>(() => ({
  iconMarkerAttrs: {
    icon: props.icon,
    ...props.iconMarkerAttrs,
  },
  textMarkerAttrs: {
    tag: 'span',
    ...props.textMarkerAttrs,
  },
}));
const tag = inject<ComputedRef<HTMLTag>>('tag', computed(() => 'ul'));
const isUnordered = computed(() => tag.value === 'ul');
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-bullet-points-item {
  $element: bullet-points-item;

  display: flex;
  align-items: functions.var($element, align-items, flex-start);
  justify-content: functions.var($element, justify-content, flex-start);
  gap: functions.var($element, gap, var(--space-12));

  &__marker {
    --icon-color: #{functions.var($element + "-marker", color, var(--color-text-body))};

    flex: none;

    &::before {
      display: block;
      width: var(--icon-size, 1.5rem);
      content: counter(counter, var(--_list-style-type)) var(--_list-item-suffix);
      counter-increment: counter;
    }
  }
}
</style>

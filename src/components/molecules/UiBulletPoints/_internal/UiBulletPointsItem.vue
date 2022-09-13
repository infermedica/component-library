<template>
  <li class="ui-bullet-points-item">
    <!-- @slot Use this slot to replace bullet points item marker -->
    <slot
      name="marker"
      v-bind="{
        isUnordered,
        icon
      }"
    >
      <UiIcon
        v-if="isUnordered"
        :icon="icon"
        class="ui-bullet-points-item__marker"
      />
      <UiText
        v-else
        tag="span"
        class="ui-bullet-points-item__marker"
      />
    </slot>
    <!-- @slot Use this slot to replace bullet points item content -->
    <slot name="content">
      <div class="ui-bullet-points-item__content">
        <!-- @slot Use this slot to place bullet points item content -->
        <slot />
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
  PropType,
  ComputedRef,
} from 'vue';
import type { IconAsString } from '../../../../types/icon';
import type { ListTag } from '../../../../types/tag';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../../atoms/UiText/UiText.vue';

defineProps({
  /**
   * Use this props to set the bullet point icon.
   */
  icon: {
    type: String as PropType<IconAsString>,
    default: 'bullet-common',
  },
});
const tag = inject('tag') as ComputedRef<ListTag>;
const isUnordered = computed(() => tag.value === 'ul');
</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-bullet-points-item {
  $element: bullet-points-item;

  display: flex;
  align-items: functions.var($element, align-items, flex-start);
  justify-content: functions.var($element, justify-content, flex-start);
  margin: functions.var($element, margin, var(--space-4) 0);

  &:last-child {
    margin: 0;
  }

  &__marker {
    --icon-color: #{functions.var($element + "-marker", color, var(--color-text-body))};

    flex: none;
    margin: functions.var($element + "-marker", padding, 0 var(--space-12) 0 0);

    [dir="rtl"] & {
      margin: functions.var($element + "-rtl-marker", padding, 0 0 0 var(--space-12));
    }

    &::before {
      display: block;
      width: var(--icon-size, 1.5rem);
      content: counter(counter, var(--_list-style-type)) var(--_list-item-suffix);
      counter-increment: counter;
    }
  }
}
</style>

<template>
  <li class="ui-bullet-points-item">
    <!-- @slot Use this slot to replace bullet points item marker -->
    <slot
      name="marker"
      v-bind="{isUnordered, icon}"
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

<script setup>
import { computed, inject } from 'vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../../atoms/UiText/UiText.vue';

defineProps({
  icon: {
    type: String,
    default: 'bullet-common',
  },
});
const tag = inject('tag');
const isUnordered = computed(() => (tag.value === 'ul'));
</script>

<style lang="scss">
.ui-bullet-points-item {
  display: flex;
  align-items: var(--bullet-points-item-align-items, flex-start);
  margin: var(--bullet-points-item-margin, var(--space-4) 0);

  &__marker {
    --icon-size: var(--bullet-points-item-marker-icon-size, 1.5rem);
    --icon-color: var(--bullet-points-item-marker-icon-color, var(--color-text-body));

    flex: none;
    margin: var(--bullet-points-item-marker-padding, 0 var(--space-12) 0 0);

    [dir=rtl] & {
      margin: var(--bullet-points-item-marker-padding, 0 0 0 var(--space-12));
    }

    &::before {
      display: block;
      width: var(--bullet-points-item-marker-before-width, 1.5rem);
      content: counter(counter, var(--list-style-type)) var(--list-item-suffix);
      counter-increment: counter;
    }
  }

  &--primary {
    --bullet-points-item-marker-icon-color: var(--color-icon-primary);
  }

  &--secondary {
    --bullet-points-item-marker-icon-color: var(--color-icon-secondary);
  }
}
</style>

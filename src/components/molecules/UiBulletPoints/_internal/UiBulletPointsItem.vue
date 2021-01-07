<template>
  <li class="ui-bullet-points-item">
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
    <slot />
  </li>
</template>

<script>
import { computed, inject } from 'vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../../atoms/UiText/UiText.vue';

export default {
  name: 'UiBulletPointsItem',
  components: { UiText, UiIcon },
  props: {
    icon: {
      type: String,
      default: 'bullet',
    },
  },
  setup() {
    const tag = inject('tag');
    const isUnordered = computed(() => (tag.value === 'ul'));

    return {
      isUnordered,
    };
  },
};
</script>

<style lang="scss">
.ui-bullet-points-item {
  display: flex;
  align-items: var(--bullet-points-item-align-items, center);
  margin: var(--bullet-points-item--margin, var(--space-4) 0);

  &__marker {
    --icon-size: var(--bullet-points-item-marker-icon-size, 1.5rem);
    --icon-color: var(--bullet-points-item-marker-icon-color, var(--color-text-body));

    margin: var(--bullet-points-item-marker-padding, 0 var(--space-12) 0 0);

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

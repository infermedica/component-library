<template>
  <UiTabsItem class="ui-datepicker-tab">
    <div class="ui-datepicker-tab__content">
      <slot />
    </div>
  </UiTabsItem>
</template>

<script setup>
import UiTabsItem from '../../UiTabs/_internal/UiTabsItem.vue';
</script>

<style lang="scss">
@import "../../../../styles/mixins/mixins";
@import "../../../../styles/functions/functions";

.ui-datepicker-tab {
  $this: &;
  $element: datepicker-tab;

  --tabs-item-content-padding: 0;

  &__content {
    height: 15.5rem;
    padding: css-var($element + "-content", padding, var(--space-16) var(--space-20));
    overflow-y: auto;
  }
}
</style>

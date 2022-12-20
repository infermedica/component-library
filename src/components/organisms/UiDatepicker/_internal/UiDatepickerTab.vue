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
@use "../../../../styles/mixins";

.ui-datepicker-tab {
  $this: &;
  $element: datepicker-tab;

  --tabs-item-content-padding-block: 0;
  --tabs-item-content-padding-inline: 0;

  &__content {
    @include mixins.use-logical($element + "-content", padding, var(--space-16) var(--space-20));

    height: 15.5rem;
    overflow-y: auto;
  }
}
</style>

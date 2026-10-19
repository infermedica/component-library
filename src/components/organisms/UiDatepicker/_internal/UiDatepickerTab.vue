<template>
  <UiTabsItem class="ui-datepicker-tab">
    <div class="ui-datepicker-tab__content">
      <slot />
    </div>
  </UiTabsItem>
</template>

<script setup lang="ts">
import UiTabsItem from '../../UiTabs/_internal/UiTabsItem.vue';
import type { TabsItemAttrsProps } from '../../UiTabs/_internal/UiTabsItem.vue';
import type { DefineAttrsProps } from '../../../../types';

export type DatepickerTabAttrsProps = DefineAttrsProps<null, TabsItemAttrsProps>;
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.ui-datepicker-tab {
  $this: &;
  $element: datepicker-tab;

  @include mixins.override-logical(tabs-item-content, null, padding, 0);

  &__content {
    @include mixins.use-logical($element + "-content", padding, var(--space-16) var(--space-20));

    display: var(--datepicker-tab-content-display, block);
    height: 15.5rem;
    grid-template-columns: var(--datepicker-tab-content-columns, none);
    overflow-y: auto;
    row-gap: var(--datepicker-tab-content-row-gap, 0);

    @include mixins.to(320px) {
      @include mixins.use-logical($element + "-content", padding, var(--space-8));
    }
  }
}
</style>

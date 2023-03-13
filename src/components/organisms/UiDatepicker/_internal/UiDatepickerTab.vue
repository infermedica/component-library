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

    height: 15.5rem;
    overflow-y: auto;
  }
}
</style>

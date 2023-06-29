<template>
  <UiButton class="ui-button--text">
    <UiIcon
      v-bind="iconBackAttrs"
      class="ui-button__icon"
    />
    <!-- @slot Use this slot to place back button label. -->
    <slot />
  </UiButton>
</template>

<script setup lang="ts">
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';

export interface ControlsBackButton {
  /**
   * Use this props to pass attrs for back UiIcon.
   */
  iconBackAttrs?: IconAttrsProps;
}
const props = defineProps<ControlsBackButton>();
</script>

<style lang="scss">

</style>

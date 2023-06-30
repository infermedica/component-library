<template>
  <!--
    @slot Use this slot to replace back template.
    @binding {ControlsNavigation} toBack
    @binding {boolean} hideBackButton
    @binding {ButtonAttrsProps} buttonBackAttrs
    @binding {IconAttrsProps} iconBackAttrs
    @binding {ControlsTranslation} translation
   -->
  <slot
    name="back"
    v-bind="{
      toBack,
      hideBackButton,
      buttonBackAttrs,
      iconBackAttrs,
      translation,
    }"
  >
    <UiControlsBackButton
      v-if="toBack && !hideBackButton"
      v-bind="{
        buttonBackAttrs,
        iconBackAttrs
      }"
    >
      {{ translation.back }}
    </UiControlsBackButton>
  </slot>
  <!-- @slot Use this slot to place container content. -->
  <slot />
  <!--
    @slot Use this slot to replace next template.
    @binding {ControlsNavigation} toNext
    @binding {boolean} hideNextButton
    @binding {ButtonAttrsProps} buttonNextAttrs
    @binding {boolean} invalid
    @binding {ControlsTranslation} translation
  -->
  <slot
    name="next"
    v-bind="{
      toNext,
      hideNextButton,
      buttonNextAttrs,
      invalid,
      translation,
    }"
  >
    <UiControlsNextButton
      v-if="toNext && !hideNextButton"
      v-bind="buttonNextAttrs"
      :class="{ 'ui-button--is-disabled': invalid }"
    >
      {{ translation.next }}
    </UiControlsNextButton>
  </slot>
</template>

<script setup lang="ts">
import UiControlsBackButton from '../UiControlsBackButton.vue';
import UiControlsNextButton from '../UiControlsNextButton.vue';

import type { ControlsCommonProps } from '../../UiControls.vue';

const props = defineProps<ControlsCommonProps>();
</script>

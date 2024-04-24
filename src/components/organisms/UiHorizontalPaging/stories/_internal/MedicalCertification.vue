<template>
  <UiHeading class="ui-heading--h3">
    Medical device label
  </UiHeading>
  <UiIcon
    icon="ce"
    class="medical-certification__icon"
  />
  <UiHeading
    :level="3"
    class="medical-certification__heading"
  >
    Class I medical device in EU
  </UiHeading>
  <UiText>
    This software meets all applicable requirements of the European Directive MDD 93/42/EWG.
  </UiText>
</template>

<script setup lang="ts">
import {
  UiText,
  UiHeading,
  UiIcon,
} from '@infermedica/component-library';
</script>

<style lang="scss">
.medical-certification {
  &__heading {}

  &__icon {}
}
</style>

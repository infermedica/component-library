<template>
  <UiRange
    v-model="value"
    v-bind="args"
  >
    <template
      #value="{
        value,
        headingValueAttrs,
      }"
    >
      <UiHeading
        v-bind="headingValueAttrs"
        class="ui-range__value"
      >
        {{ value }}
      </UiHeading>
    </template>
  </UiRange>
</template>

<script setup>
import {
  computed,
  defineOptions,
  inject,
  useAttrs,
} from 'vue';
import {
  UiRange,
  UiHeading,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const args = computed(() => (attrs));
const value = inject('value');

</script>

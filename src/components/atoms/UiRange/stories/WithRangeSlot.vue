<template>
  <UiRange
    v-model="value"
    v-bind="args"
  >
    <template
      #range="{
        inputAttrs,
        min,
        max,
        change,
        value,
      }"
    >
      <input
        v-keyboard-focus
        v-bind="inputAttrs"
        type="range"
        :min="min"
        :max="max"
        :value="value"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="value"
        class="ui-range__track"
        @input="change(($event.target).valueAsNumber)"
      >
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
import { UiRange } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const args = computed(() => (attrs));
const value = inject('value');

</script>

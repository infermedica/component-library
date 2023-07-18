<template>
  <UiInput
    v-bind="args"
    v-model="value"
  >
    <template
      #input="{
        inputAttrs,
        input,
        value,
        validation
      }"
    >
      <input
        ref="input"
        v-keyboard-focus
        v-bind="inputAttrs"
        :value="value"
        class="ui-input__input"
        @keydown="validation"
        @input="input($event)"
      >
    </template>
  </UiInput> {{ value }}
</template>

<script setup>
import {
  computed,
  defineOptions,
  inject,
  useAttrs,
} from 'vue';
import { UiInput } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const args = computed(() => (attrs));
const value = inject('value');
</script>

<style lang="scss">

</style>

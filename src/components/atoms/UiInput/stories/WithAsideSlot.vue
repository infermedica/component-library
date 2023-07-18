<template>
  <UiInput
    v-bind="args"
    v-model="value"
  >
    <template
      #aside="{
        suffix,
        textSuffixAttrs
      }"
    >
      <UiText
        v-bind="textSuffixAttrs"
        class="ui-input__aside"
      >
        {{ suffix }}
      </UiText>
    </template>
  </UiInput> {{ value }}
</template>

<script setup>
import {
  computed,
  defineOptions,
  inject,
  useAttrs,
  toRefs,
} from 'vue';
import {
  UiInput,
  UiText,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const { icon } = toRefs(attrs);
const args = computed(() => (attrs));
const value = inject('value');
</script>

<style lang="scss">

</style>

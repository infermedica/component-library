<template>
  <UiCheckbox
    v-model="value"
    v-bind="args"
  >
    <template
      #label="{
        hasLabel,
        textLabelAttrs,
      }"
    >
      <UiText
        v-bind="textLabelAttrs"
        class="ui-checkbox__label"
      >
        {{ content }}
      </UiText>
    </template>
    <template #default>
      {{ content }}
    </template>
  </UiCheckbox>
</template>

<script setup>
import {
  computed,
  defineOptions,
  useAttrs,
  toRefs,
  inject,
} from 'vue';
import {
  UiCheckbox,
  UiText,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const { content } = toRefs(attrs);
const args = computed(() => (attrs));
const value = inject('value');
</script>

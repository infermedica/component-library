<template>
  <UiInput
    v-bind="args"
    v-model="value"
  >
    <template #aside>
      <UiButton class="ui-button--icon ui-input__aside">
        <UiIcon
          :icon="icon"
          class="ui-button__icon"
        />
      </UiButton>
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
  UiButton,
  UiIcon,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const { icon } = toRefs(attrs);
const args = computed(() => (attrs));
const value = inject('value');
</script>

<style lang="scss">

</style>

<template>
  <UiInput
    v-model="value"
    v-bind="args"
  >
    <template #aside>
      <div class="ui-input__aside">
        <UiButton class="ui-button--icon">
          <UiIcon
            icon="search"
            class="ui-button__icon"
          />
        </UiButton>
      </div>
    </template>
  </UiInput>
</template>

<script setup>
import {
  computed,
  inject,
  useAttrs,
  defineOptions,
} from 'vue';
import {
  UiInput,
  UiButton,
  UiIcon,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const value = inject('value');
</script>

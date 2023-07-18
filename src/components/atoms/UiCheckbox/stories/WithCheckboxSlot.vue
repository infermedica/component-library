<template>
  <UiCheckbox
    v-model="value"
    v-bind="args"
  >
    <template
      #checkbox="{
        checked,
        iconCheckmarkAttrs
      }"
    >
      <div
        :class="[
          'ui-checkbox__checkbox',
          { 'ui-checkbox__checkbox--is-checked': checked },
        ]"
      >
        <UiIcon
          v-bind="iconCheckmarkAttrs"
          class="ui-checkbox__checkmark"
        />
      </div>
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
  UiIcon,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const { content } = toRefs(attrs);
const args = computed(() => (attrs));
const value = inject('value');
</script>

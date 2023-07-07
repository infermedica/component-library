<template>
  <UiTabs
    v-model="value"
    v-bind="args"
  >
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiTabsItem
        v-bind="item"
      >
        <UiText>
          {{ content[item.name] }}
        </UiText>
      </UiTabsItem>
    </template>
  </UiTabs>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import {
  computed,
  ref,
  useAttrs,
} from 'vue';
import UiTabs from '../UiTabs.vue';
import UiTabsItem from '../_internal/UiTabsItem.vue';
import UiText from '../../../atoms/UiText/UiText.vue';

const attrs = useAttrs();
console.log(attrs);
const {
  modelValue,
  content,
  items,
  modifiers,
  ...rest
} = attrs;

const value = ref(modelValue);
const args = computed(() => ({
  ...rest,
  items,
  class: modifiers,
}));

</script>

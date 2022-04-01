<template>
  <div class="ui-mega-menu">
    <!-- @slot Use this slot to place content inside MegaMenu. -->
    <slot />
  </div>
</template>

<script setup>
import { computed, provide } from 'vue';

const props = defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);
const open = computed(() => (props.modelValue));
const hasOpen = computed(() => (!!props.modelValue));
function openHandler(name) {
  emit('update:modelValue', name);
}
provide('open', open);
provide('hasOpen', hasOpen);
provide('openHandler', openHandler);
</script>

<style lang="scss">
.ui-mega-menu {
  cursor: inherit;
}
</style>

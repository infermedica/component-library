<template>
  <!-- @slot Use this slot to place trigger template. -->
  <slot
    name="trigger"
    v-bind="{title, to, hasControls}"
  />
  <!-- @slot Use this slot to place content inside MegaMenuItem. -->
  <slot
    v-if="isOpen"
    v-bind="{back}"
  />
</template>
<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
  /**
   * Use this props to set item name.
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set item title.
   */
  title: {
    type: String,
    default: '',
  },
});
const open = inject('open');
const hasOpen = inject('hasOpen');
const hasControls = computed(() => (!hasOpen.value));
const openHandler = inject('openHandler');
const isOpen = computed(() => (open.value === props.name));
function back() {
  openHandler('');
}
function to() {
  openHandler(props.name);
}
</script>

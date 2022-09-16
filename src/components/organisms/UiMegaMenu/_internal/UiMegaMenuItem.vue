<template>
  <!-- @slot Use this slot to place trigger template. -->
  <slot
    name="trigger"
    v-bind="{
      title,
      to,
      hasControls
    }"
  />
  <!-- @slot Use this slot to place content inside MegaMenuItem. -->
  <slot
    v-if="isOpen"
    v-bind="{
      back
    }"
  />
</template>

<script setup lang="ts">
import {
  computed,
  inject,
} from 'vue';
import type { ComputedRef } from 'vue';

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
const open = inject('open') as ComputedRef<string>;
const hasOpen = inject('hasOpen') as ComputedRef<boolean>;
const hasControls = computed(() => (!hasOpen.value));
const openHandler = inject('openHandler') as (value: string) => void;
const isOpen = computed(() => (open.value === props.name));
function back():void {
  openHandler('');
}
function to():void {
  openHandler(props.name);
}
</script>

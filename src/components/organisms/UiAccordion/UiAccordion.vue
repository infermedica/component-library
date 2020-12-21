<template>
  <UiList class="ui-accordion">
    <!-- @slot Use this slot to place accordion items. -->
    <slot />
  </UiList>
</template>

<script>
import { computed, provide } from 'vue';
import UiList from '../UiList/UiList.vue';

export default {
  components: {
    UiList,
  },
  props: {
    /**
     * Use this props or v-model to set opened items.
     */
    modelValue: {
      type: [String, Array],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const opened = computed(() => (props.modelValue));
    provide('opened', opened);
    function toggle(name) {
      if (typeof opened.value === 'string') {
        if (opened.value === name) {
          emit('update:modelValue', '');
        } else {
          emit('update:modelValue', name);
        }
      } else if (opened.value.includes(name)) {
        emit('update:modelValue', opened.value.filter((item) => (item !== name)));
      } else {
        emit('update:modelValue', [...opened.value, name]);
      }
    }
    provide('toggle', toggle);
  },
};
</script>

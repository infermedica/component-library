<template>
  <div class="ui-mega-menu">
    <!-- @slot Use this slot to place content inside MegaMenu. -->
    <slot />
  </div>
</template>

<script>
import { computed, provide } from 'vue';

export default {
  name: 'UiMegaMenu',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const open = computed(() => (props.modelValue));
    const hasOpen = computed(() => (!!props.modelValue));
    function openHandler(name) {
      emit('update:modelValue', name);
    }
    provide('open', open);
    provide('hasOpen', hasOpen);
    provide('openHandler', openHandler);
  },
};
</script>

<style lang="scss">
.ui-mega-menu {
  cursor: inherit;
}
</style>

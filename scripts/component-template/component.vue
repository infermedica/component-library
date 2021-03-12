<template>
  <div
    ref="el"
    className="ComponentNameKebabCase"
  >
    <!-- @slot Use this slot to place content inside component.-->
    <slot/>
  </div>
</template>

<script>
import {ref, computed} from 'vue';

export default {
  name: 'ComponentNameCamelCase',
  props: {
    /**
     * Use this slot to set common.
     */
    common: {
      type: String,
      default: '',
    },
  },
  emits: ['update:common'],
  setup(props, {attrs, slots, emit}) {
    const el = ref(null);
    const hasCommon = computed(() => (!!props.common));

    function updateHandler(value) {
      emit('update:common', value);
    }

    return {
      el,
      hasCommon,
      updateHandler,
    };
  },
};
</script>

<style lang="scss">
.ComponentNameKebabCase {
  cursor: inherit;
}
</style>

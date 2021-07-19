<template>
  <component
    :is="file"
    class="ui-icon"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'UiIcon',
  props: {
    icon: {
      type: [String, Object],
      default: '',
    },
  },
  setup(props) {
    const file = typeof props.icon === 'string'
      ? defineAsyncComponent(() => import(
        /* WebpackChunkName: "[request]" */
        /* WebpackMode: "lazy-once" */
        `../../../assets/svg/${props.icon}.svg`
      ))
      : props.icon;
    return {
      file,
    };
  },
};
</script>

<style lang="scss">
.ui-icon {
  width: var(--icon-size, var(--icon-width, 1rem));
  height: var(--icon-size, var(--icon-height, 1rem));
  fill: var(--icon-color);
}

.rtl-supported {
  [dir="rtl"] & {
    transform: scaleX(-1);
  }
}
</style>

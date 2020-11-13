<template>
  <svg
    class="ui-icon"
    :viewBox="iconViewBox"
  >
    <!-- @slot Use this slot to place svg paths. -->
    <slot
      name="path"
      v-bind="{ paths, viewBox: iconViewBox }"
    >
      <path
        v-for="(path, key) in paths"
        :key="key"
        v-bind="path"
      />
    </slot>
  </svg>
</template>

<script>
import { computed } from 'vue';
import icons from './icons';

export default {
  name: 'UiIcon',
  props: {
    /**
     * Use this props to set icon from icon-pack or put array with paths
     */
    icon: {
      type: [String, Array],
      default: '',
    },
    /**
     * Use this props to set viewBox for custom icons.
     */
    viewBox: {
      type: String,
      default: '0 0 48 48',
    },
  },
  setup(props) {
    const isArray = computed(() => (Array.isArray(props.icon)));
    const iconPaths = computed(() => (
      !isArray.value && icons[props.icon]
        ? icons[props.icon].paths
        : []));
    const iconViewBox = computed(() => (
      icons[props.icon]
        ? icons[props.icon].viewBox
        : props.viewBox));
    const paths = computed(() => (
      isArray.value
        ? props.icon
        : iconPaths.value
    ));

    return {
      isArray,
      iconPaths,
      iconViewBox,
      paths,
    };
  },
};
</script>

<style lang="scss">
.ui-icon {
  width: var(--icon-size, 1rem);
  height: var(--icon-size, 1rem);
  fill: var(--icon-color);
}
</style>

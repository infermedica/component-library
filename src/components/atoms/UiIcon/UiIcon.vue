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
        :d="path"
      />
    </slot>
  </svg>
</template>

<script>
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
      default: '0 0 24 24',
    },
  },
  computed: {
    isArray() {
      return Array.isArray(this.icon);
    },
    iconPaths() {
      return !this.isArray && icons[this.icon]
        ? icons[this.icon].paths
        : [];
    },
    iconViewBox() {
      return icons[this.icon]
        ? icons[this.icon].viewBox
        : this.viewBox;
    },
    paths() {
      return this.isArray
        ? this.icon
        : this.iconPaths;
    },
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

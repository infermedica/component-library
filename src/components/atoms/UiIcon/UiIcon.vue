<template>
  <svg
    class="ui-icon"
    :class="{ 'ui-icon--has-rtl-paths': rtlIconPaths, 'ui-icon--rtl-mirrorable': shouldMirrorInRtl }"
    :viewBox="iconViewBox"
  >
    <!-- @slot Use this slot to place svg paths. -->
    <slot
      name="path"
      v-bind="{ paths, viewBox: iconViewBox }"
    >
      <g class="ui-icon__group">
        <path
          v-for="(path, key) in paths"
          :key="key"
          v-bind="path"
        />
      </g>
      <g
        class="ui-icon__group ui-icon__group--rtl"
        v-if="rtlIconPaths"
      >
        <path
          v-for="(path, key) in rtlIconPaths"
          :key="key"
          v-bind="path"
        />
      </g>
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
    /**
     * Use this props to set if icon can be mirrored to fit in RTL layout
     */
    canMirrorForRtl: {
      type: Boolean,
      default: false,
    },
    /**
     * Use this props to set alternative paths for RTL layout
     */
    rtlPaths: {
      type: Array,
      default: undefined,
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
    const shouldMirrorInRtl = computed(() => (
      icons[props.icon]
        ? icons[props.icon].canMirrorForRtl
        : props.canMirrorForRtl
    ));
    const rtlIconPaths = computed(() => props.rtlPaths || icons[props.icon]?.rtlPaths);

    return {
      isArray,
      iconPaths,
      iconViewBox,
      paths,
      rtlIconPaths,
      shouldMirrorInRtl,
    };
  },
};
</script>

<style lang="scss">
.ui-icon {
  width: var(--icon-size, 1rem);
  height: var(--icon-size, 1rem);
  fill: var(--icon-color);

  &__group--rtl {
    display: none;
  }

  [dir=rtl] &--rtl-mirrorable {
    transform: scaleX(-1);
  }

  [dir=rtl] &--has-rtl-paths {
    .ui-icon__group {
      display: none;
    }

    .ui-icon__group--rtl {
      display: block;
    }
  }
}
</style>

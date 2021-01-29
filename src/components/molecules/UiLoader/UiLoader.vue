<template>
  <transition-group
    :name="transitionName"
  >
    <!-- @slot Use this slot to replace loader. -->
    <slot
      v-if="isLoading"
      name="loader"
    >
      <component
        :is="tag"
        v-bind="$attrs"
        key="loading"
        class="ui-loader"
        aria-live="polite"
        :aria-busy="`${isLoading}`"
      >
        <component
          :is="component"
          v-bind="loaderAttrs"
        >
          <!-- @slot Use this slot to place loader blocks. -->
          <slot name="loader-blocks" />
        </component>
      </component>
    </slot>
    <!-- @slot Use this slot to put loaded content.-->
    <slot v-else />
  </transition-group>
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';

const UiLoaderSpinner = defineAsyncComponent(() => import(
  /* webpackChunkName: "Spinner" */
  './_internal/UiLoaderSpinner.vue'
));
const UiLoaderSkeleton = defineAsyncComponent(() => import(
  /* webpackChunkName: "Skeleton" */
  './_internal/UiLoaderSkeleton.vue'
));
const UiLoaderEllipsis = defineAsyncComponent(() => import(
  /* webpackChunkName: "Ellipsis" */
  './_internal/UiLoaderEllipsis.vue'
));

export default {
  name: 'UiLoader',
  components: {
    UiLoaderSpinner,
    UiLoaderSkeleton,
    UiLoaderEllipsis,
  },
  inheritAttrs: false,
  props: {
    /**
     * use this props to show UiLoader component
     */
    isLoading: {
      type: Boolean,
      default: true,
    },
    /**
     * use this props to select UiLoader variant
     */
    type: {
      type: String,
      default: 'spinner',
      validator: (value) => ['spinner', 'ellipsis', 'skeleton'].includes(value),
    },
    /**
     * use this props to pass attributes to internal child components
     */
    loaderAttrs: {
      type: Object,
      default: () => ({}),
    },
    /**
     * use this props to pass tag of loader
     */
    tag: {
      type: [String, Object],
      default: 'div',
    },
    /**
     * use this ptops to pas transition name
     */
    transition: {
      type: [String, Boolean],
      default: false,
    },
  },
  setup(props) {
    const component = computed(() => `ui-loader-${props.type}`);
    const transitionName = computed(() => (props.transition ? props.transition : null));
    return {
      component,
      transitionName,
    };
  },
};
</script>

<style lang="scss">
.ui-loader {
  .fade {
    &-enter-active,
    &-leave-active {
      transition: opacity 300ms ease;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  }
}
</style>

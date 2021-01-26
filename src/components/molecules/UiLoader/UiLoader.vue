<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="isLoading"
      class="ui-loader"
      v-bind="$attrs"
      aria-live="polite"
      :aria-busy="isLoading ? true : false"
    >
      <component
        :is="component"
        v-bind="loaderAttrs"
      >
        <!-- @slot Use this slot to replace loader template. -->
        <slot name="loader" />
      </component>
    </div>
    <!-- @slot Use this slot to put loaded content.-->
    <slot v-else />
  </transition>
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
  },
  setup(props) {
    const component = computed(() => `ui-loader-${props.type}`);
    return {
      component,
    };
  },
};
</script>

<style lang="scss">
.ui-loader {
  display: flex;
  flex: 1;
  align-items: var(--loader-align-items, center);
  justify-content: var(--loader-justify-content, center);

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>


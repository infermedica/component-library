<template>
  <component
    :is="outerComponent"
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
    <slot v-else-if="!eagerLoadComponent" />
    <div
      v-if="eagerLoadComponent"
      v-show="!isLoading"
      class="ui-loader__component-wrapper"
    >
      <!-- @slot Use this slot to place loaded content.-->
      <slot />
    </div>
  </component>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
// FIXME: reveal content with v-if, v-show, visibility: hidden, check Symptom Checker use cases
import { computed, h, TransitionGroup } from 'vue';
import UiLoaderSpinner from './_internal/UiLoaderSpinner.vue';
import UiLoaderSkeleton from './_internal/UiLoaderSkeleton.vue';
import UiLoaderEllipsis from './_internal/UiLoaderEllipsis.vue';

const props = defineProps({
  /**
   * Use this props to show UiLoader component
   */
  isLoading: {
    type: Boolean,
    default: true,
  },
  /**
   * Use this props to select UiLoader variant
   */
  type: {
    type: String,
    default: 'spinner',
    validator: (value) => ['spinner', 'ellipsis', 'skeleton'].includes(value),
  },
  /**
   * Use this props to pass attributes to internal child components
   */
  loaderAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass tag of loader
   */
  tag: {
    type: [String, Object],
    default: 'div',
  },
  /**
   * Use this props to pas transition name
   */
  transition: {
    type: [String, Boolean],
    default: false,
  },
  /**
   * Use this props to start rendering final component before loading stops, so it's completely rendered
   */
  eagerLoadComponent: {
    type: Boolean,
    default: false,
  },
});
const component = computed(() => {
  if (props.type === 'spinner') {
    return UiLoaderSpinner;
  }
  if (props.type === 'ellipsis') {
    return UiLoaderEllipsis;
  }
  return UiLoaderSkeleton;
});
const outerComponent = computed(() => (
  props.transition
    ? h(TransitionGroup, { name: props.transition })
    : h((_, { slots }) => slots.default())
));
</script>

<style lang="scss">
.ui-loader {
  &__component-wrapper {
    display: contents;
  }

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

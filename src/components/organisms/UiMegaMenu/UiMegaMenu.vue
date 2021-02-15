<template>
  <div
    class="ui-mega-menu"
    :style="settings"
  >
    <component
      :is="track.is"
      v-bind="track"
    >
      <!-- @slot Use this slot to place content inside MegaMenu. -->
      <slot />
    </component>
  </div>
</template>

<script>
import {
  ref, computed, provide, inject,
} from 'vue';

export default {
  name: 'UiMegaMenu',
  props: {
    modelValue: {
      type: Array,
      default: () => ([]),
    },
  },
  emits: ['update.modelValue'],
  setup(props, { emit }) {
    const minHeight = ref(0);
    const opened = computed(() => (props.modelValue));
    const hasOpen = computed(() => (opened.value.length > 0));
    function toggleHandler(name) {
      emit('update:modelValue', opened.value.includes(name)
        ? props.modelValue.filter((item) => (item !== name))
        : [...props.modelValue, name]);
    }
    const isDeep = inject('deep');
    const track = computed(() => (
      isDeep
        ? {
          is: 'fragment',
        }
        : {
          is: 'div',
          class: 'ui-mega-menu__track',
        }
    ));
    if (!isDeep) {
      provide('deep', true);
      provide('opened', opened);
      provide('minHeight', minHeight);
      provide('toggleHandler', toggleHandler);
    }

    const settings = computed(() => ({
      '--mega-menu-min-height': hasOpen.value && minHeight.value,
      '--mega-menu-current-size': hasOpen.value && props.modelValue.length,
    }));

    return {
      track,
      settings,
    };
  },
};
</script>

<style lang="scss">
.ui-mega-menu {
  min-height: calc(1px * var(--mega-menu-min-height, 0));
  overflow: hidden;

  &__track {
    transition: transform 150ms ease-in-out;
    transform: translate3d(calc(-100% * var(--mega-menu-current-size, 0)), 0, 0);
  }
}
</style>

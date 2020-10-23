<template>
  <div
    class="ui-dropdown"
    :class="{'is-active': isOpen}"
  >
    <!-- @slot Use this slot to place toggle template. -->
    <slot
      name="toggle"
      v-bind="{toggle, open, close, isOpen}"
    >
      <UiButton
        class="ui-dropdown__toggle"
        @click="toggle"
      >
        {{ text }}
      </UiButton>
    </slot>
    <!-- @slot Use this slot to place content template. -->
    <slot
      name="content"
      v-bind="{close, isOpen}"
    >
      <div
        v-if="isOpen"
        v-click-outside="close"
        class="ui-dropdown__content"
      >
        <!-- @slot Use this slot to place dropdown content inside dropdown. -->
        <slot v-bind="{close, isOpen}" />
      </div>
    </slot>
  </div>
</template>

<script>
import { clickOutside } from '../../../directives';
import UiButton from '../../atoms/UiButton/UiButton.vue';

export default {
  name: 'UiDropdown',
  components: { UiButton },
  directives: { clickOutside },
  props: {
    /**
     * Use this props to set text on toggle button.
     */
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.ui-dropdown {
  position: relative;
  display: inline-block;

  // &__toggle {}

  &__content {
    position: absolute;
    top: 100%;
    width: var(--dropdown-content-width, 100%);
    padding: var(--dropdown-content-padding, 8px 12px);
    border: var(--dropdown-content-border, 1px solid #dbe1e6);
    border-radius: var(--dropdown-content-border-radius, 0 0 5px 5px);
    box-shadow:
      var(
        --dropdown-content-box-shadow,
        0 1px 3px 0 rgba(148, 164, 179, 0.2)
      );
    transform: var(--dropdown-content-transform, translateY(-1px));
  }
}
</style>

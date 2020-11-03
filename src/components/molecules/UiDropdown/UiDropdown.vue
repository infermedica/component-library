<template>
  <div
    class="ui-dropdown"
    :class="{'is-active': isOpen}"
    v-click-outside="closeHandler"
  >
    <!-- @slot Use this slot to place toggle template. -->
    <slot
      name="toggle"
      v-bind="{toggleHandler, openHandler, closeHandler, isOpen}"
    >
      <UiButton
        class="ui-dropdown__toggle"
        @click="toggleHandler"
      >
        {{ text }}
      </UiButton>
    </slot>
    <!-- @slot Use this slot to place content template. -->
    <slot
      name="content"
      v-bind="{closeHandler, isOpen}"
    >
      <div
        v-if="isOpen"
        class="ui-dropdown__content"
      >
        <!-- @slot Use this slot to place dropdown content inside dropdown. -->
        <slot v-bind="{closeHandler, isOpen}" />
      </div>
    </slot>
  </div>
</template>

<script>
import { ref } from 'vue';
import { clickOutside } from '../../../utilities/directives';
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
  setup() {
    const isOpen = ref(false);
    function toggleHandler() {
      isOpen.value = !isOpen.value;
    }
    function openHandler() {
      isOpen.value = true;
    }
    function closeHandler() {
      isOpen.value = false;
    }
    return {
      isOpen,
      toggleHandler,
      openHandler,
      closeHandler,
    };
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

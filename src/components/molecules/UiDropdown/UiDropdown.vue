<template>
  <div
    v-click-outside="closeHandler.bind(this, true)"
    class="ui-dropdown"
    :class="{'is-active': isOpen}"
  >
    <!-- @slot Use this slot to place toggle template. -->
    <slot
      name="toggle"
      v-bind="{toggleHandler, openHandler, closeHandler, isOpen, text}"
    >
      <UiButton
        ref="toggle"
        class="ui-dropdown__toggle"
        :aria-expanded="`${isOpen}`"
        @click="toggleHandler"
      >
        {{ text }}
      </UiButton>
    </slot>
    <!-- @slot Use this slot to replace popover template. -->
    <slot
      name="popover"
      v-bind="{closeHandler, isOpen}"
    >
      <UiPopover
        v-if="isOpen"
        class="ui-dropdown__popover"
        @close="closeHandler"
      >
        <!-- @slot Use this slot to replace content template. -->
        <slot
          name="content"
          v-bind="{closeHandler, isOpen}"
        >
          <div role="radiogroup">
            <!-- @slot Use this slot to place dropdown content inside dropdown. -->
            <slot v-bind="{closeHandler, isOpen}" />
          </div>
        </slot>
      </UiPopover>
    </slot>
  </div>
</template>

<script>
import { uid } from 'uid/single';
import {
  ref, computed, provide,
} from 'vue';
import { clickOutside } from '../../../utilities/directives';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiPopover from '../UiPopover/UiPopover.vue';

export default {
  name: 'UiDropdown',
  components: { UiButton, UiPopover },
  directives: { clickOutside },
  props: {
    /**
     * Use this props to set text on toggle button.
     */
    text: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Object],
      default: '',
    },
    /**
     * Use this props to set toggle DOM element to back to it after close popover.
     */
    toggleElement: {
      type: Object,
      default: undefined,
    },
  },
  emits: ['update:modelValue', 'open', 'close'],
  setup(props, { emit }) {
    const toggle = ref(null);
    const isOpen = ref(false);
    const dropdowntoggle = computed(() => (props.toggleElement || toggle.value?.$el));
    function openHandler() {
      isOpen.value = true;
      emit('open');
    }
    function closeHandler(outside) {
      if (dropdowntoggle.value && !outside) {
        dropdowntoggle.value.focus();
      }
      isOpen.value = false;
      emit('close');
    }
    function toggleHandler() {
      if (isOpen.value) {
        closeHandler();
      } else {
        openHandler();
      }
    }
    const dropdownName = computed(() => (
      props.name || `dropdown-${uid()}`
    ));
    provide('name', dropdownName);
    const modelValue = computed(() => (props.modelValue));
    provide('modelValue', modelValue);
    function changeHandler(value) {
      emit('update:modelValue', value);
      closeHandler();
    }
    provide('changeHandler', changeHandler);
    return {
      isOpen,
      toggleHandler,
      openHandler,
      closeHandler,
      toggle,
    };
  },
};
</script>

<style lang="scss">
.ui-dropdown {
  position: relative;
  display: inline-block;

  &__toggle {
    width: var(--dropdown-toggle-width, 100%);
  }

  &__popover {
    position: absolute;
    top: var(--dropdown-popover-top, 100%);
    left: var(--dropdown-popover-left, unset);
    width: var(--dropdown-popover-width, 100%);
    min-height: var(--dropdown-popover-min-height, 0);
    transform: var(--dropdown-popover-transform, translateY(var(--space-8)));
  }

  &--compact {
    --dropdown-item-button-padding: var(--space-4) var(--space-8);
  }
}
</style>

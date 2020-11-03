<template>
  <div class="ui-input">
    <input
      v-bind="$attrs"
      :value="modelValue"
      class="ui-input__element"
      @input="inputHandler($event.target.value)"
    >
    <!-- @slot Use this slot to place aside. -->
    <slot
      name="aside"
      v-bind="{isEmpty}"
    >
      <span
        v-if="suffix"
        class="ui-input__aside"
      >{{ suffix }}</span>
    </slot>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiInput',
  inheritAttrs: false,
  props: {
    /**
     * Use this props to set suffix.
     */
    suffix: {
      type: String,
      default: '',
    },
    /**
     * Use this props or v-model to set value.
     */
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const isEmpty = computed(() => (props.modelValue.trim().length === 0));
    function inputHandler(value) {
      emit('update:modelValue', value);
    }

    return {
      isEmpty,
      inputHandler,
    };
  },
};
</script>

<style lang="scss">
.ui-input {
  display: flex;
  align-items: center;
  overflow: hidden;
  border: var(--input-border, 1px solid #dbe1e6);
  border-radius: var(--input-border-radius, 5px);

  &:focus-within {
    border: var(--input-focus-border, 1px solid #abb8c4);
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
  }

  &.is-invalid {
    border: var(--input-is-invalid-border, 1px solid #e03131);
  }

  &__element {
    width: 100%;
    padding: var(--input-padding, 8px 12px);
    color: var(--input-color, #555);
    border: 0;
    outline: none;
  }

  &__aside {
    margin: var(--input-aside-margin, 0 12px 0 0);
  }
}
</style>

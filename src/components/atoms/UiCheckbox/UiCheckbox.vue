<template>
  <label
    class="ui-checkbox"
    :for="checkboxId"
  >
    <input
      :id="checkboxId"
      v-bind="$attrs"
      :checked="isChecked"
      type="checkbox"
      class="hidden"
      @change="changeHandler($event.target.checked)"
      @focus="focused = true"
      @blur="focused = false"
    >
    <!-- @slot Use this slot to replace checkbutton template.-->
    <slot
      name="checkbutton"
      v-bind="{checked: isChecked, focused}"
    >
      <div
        class="ui-checkbox__checkbutton"
        :class="{
          'is-checked': isChecked,
          'focused': focused
        }"
      >
        <div
          v-if="isChecked"
          class="ui-checkbox__mark"
        />
      </div>
    </slot>
    <!-- @slot Use this slot to place content inside label.-->
    <slot />
  </label>
</template>

<script>
export default {
  name: 'UiCheckbox',
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    /**
     * Use this props to set checkbox id.
     */
    id: {
      type: String,
      default: '',
    },
    /**
     * Use this props to set value of checkbox.
     * Required for multiple checkboxes.
     */
    value: {
      type: [String, Object],
      default: '',
    },
    /**
     *  Use this props or v-model to set checked.
     */
    checked: {
      type: [Boolean, Array],
      default: false,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    checkboxId() {
      // eslint-disable-next-line no-underscore-dangle
      return this.id || `checkbox-${this._uid}`;
    },
    isObject() {
      return typeof this.checked === 'object';
    },
    isChecked() {
      return this.isObject
        ? this.checked.filter(
          (option) => (JSON.stringify(option) === JSON.stringify(this.value)),
        ).length > 0
        : this.checked;
    },
  },
  methods: {
    newChecked(checked) {
      let newChecked;
      if (this.isObject) {
        newChecked = checked
          ? [
            ...this.checked,
            JSON.parse(JSON.stringify(this.value)),
          ]
          : this.checked.filter(
            (option) => (JSON.stringify(option) !== JSON.stringify(this.value)),
          );
      } else {
        newChecked = checked;
      }
      return newChecked;
    },
    changeHandler(checked) {
      /**
       * Update checkbox checked state.
       *
       * @event change
       * @property {boolean, object} new state of checked
       */
      this.$emit('change', this.newChecked(checked));
    },
  },
};
</script>

<style lang="scss">
.ui-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;

  &__checkbutton {
    width: var(--chekcbox-width, 12px);
    height: var(--checkbox-height, 12px);
    margin: var(--checkbox-margin, 4px);
    overflow: hidden;
    background: #ccc;
    border-radius: var(--checkbox-border-radius, 0);
  }

  &__mark {
    width: 12px;
    height: 12px;
    background: #2e85ff;
  }
}

.hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

.focused {
  outline: 5px auto Highlight;
  outline: 5px auto -webkit-focus-ring-color;
}
</style>

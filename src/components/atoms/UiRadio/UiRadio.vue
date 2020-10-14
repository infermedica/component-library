<template>
  <label
    class="ui-radio"
    :for="radioId"
  >
    <input
      :id="radioId"
      v-bind="$attrs"
      type="radio"
      class="hidden"
      :checked="isChecked"
      @change="changeHandler($event.target.checked)"
      @focus="focused = true"
      @blur="focused = false"
    >
    <!-- @slot Use this slot to replace radiobutton template. -->
    <slot
      name="radiobutton"
      v-bind="{checked: isChecked, focused}"
    >
      <div
        class="ui-radio__radiobutton"
        :class="{
          'is-checked': isChecked,
          'focused': focused
        }"
      >
        <div
          v-if="isChecked"
          class="ui-radio__mark"
        />
      </div>
      <!-- @slot Use this slot to place content inside label. -->
      <slot />
    </slot></label>
</template>

<script>
export default {
  name: 'UiRadio',
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    /**
     * Use this props to set radio id
     */
    id: {
      type: String,
      default: '',
    },
    /**
     * Use this props to set value of radio.
     */
    value: {
      type: [String, Object],
      default: '',
    },
    /**
     * Use this props or v-model to set checked.
     */
    checked: {
      type: [String, Object],
      default: '',
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    radioId() {
      // eslint-disable-next-line no-underscore-dangle
      return `radio-${this._uid}`;
    },
    isChecked() {
      return JSON.stringify(this.value) === JSON.stringify(this.checked);
    },
  },
  methods: {
    changeHandler(checked) {
      if (checked) {
        /**
         * Update radio checked state
         *
         * @event change
         * @property {string, object} new state of checked
         */
        this.$emit('change', JSON.parse(JSON.stringify(this.value)));
      }
    },
  },
};
</script>

<style lang="scss">
.ui-radio {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;

  &__radiobutton {
    width: var(--radio-width, 12px);
    height: var(--radio-height, 12px);
    margin: var(--radio-margin, 4px);
    overflow: hidden;
    background: #ccc;
    border-radius: 100%;
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

<template>
  <div class="ui-chips">
    <!-- @slot Use this slot to place content inside chips. -->
    <slot />
    <!-- @slot Use this slot to replace remove template. -->
    <slot
      name="remove"
      v-bind="{clickHandler, attrs: buttonAttrs}"
    >
      <UiButton
        v-bind="buttonAttrs"
        class="ui-chips__remove"
        @click="clickHandler"
      >
        <UiIcon icon="close" />
      </UiButton>
    </slot>
  </div>
</template>

<script>
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

export default {
  name: 'UiChips',
  components: {
    UiButton,
    UiIcon,
  },
  props: {
    /**
     * Use this props to pass attrs for UiButton
     */
    buttonAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['remove'],
  setup(props, { emit }) {
    function clickHandler() {
      emit('remove', true);
    }
    return {
      clickHandler,
    };
  },
};
</script>

<style lang="scss">
.ui-chips {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.75rem;
  font: var(--chips-font, var(--font-body-2-comfortable));
  color: #fff;
  background: #1576d1;
  border-radius: 20rem;

  &__remove {
    --button-width: 1.5rem;
    --button-height: 1.5rem;
    --button-padding: 0;
    --button-border-radius: 50%;
    --button-background: #2b62a7;
    --icon-size: 0.75rem;

    margin: 0 0 0 0.25rem;
  }
}
</style>

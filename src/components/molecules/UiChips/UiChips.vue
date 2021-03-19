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
        class="ui-chips__remove ui-button--has-icon ui-button--circled"
        @click="clickHandler"
      >
        <UiIcon
          icon="reverseClose"
          class="ui-chips__icon"
        />
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
@import '../../../styles/mixins/_mixins.scss';

.ui-chips {
  @include font(--font-body-2-comfortable);

  display: inline-flex;
  align-items: center;
  padding: var(--chips-padding, var(--space-4) var(--space-4) var(--space-4) var(--space-12));
  color: var(--chips-color, var(--color-chip-text));
  background: var(--chips-backgorund, var(--color-chip-backgroud));
  border-radius: var(--chips-border-radius, var(--border-radius-pill));

  [dir=rtl] & {
    padding: var(--chips-padding, var(--space-4) var(--space-12) var(--space-4) var(--space-4));
  }

  &__remove {
    --button-padding: 0;
    --button-border-width: 0;
    --button-icon-color: var(--chips-remove-background, var(--color-chip-icon-backgroud-enabled));
    --button-icon-color-hover: var(--chips-remove-hover-background, var(--color-chip-icon-backgroud-hover));
    --button-icon-color-active: var(--chips-remove-active-background, var(--color-chip-icon-backgroud-active));
    --icon-size: var(--chips-remove-size, 1.5rem);

    margin: var(--chips-remove-margin, 2px 2px 2px calc(var(--space-4) + 2px));

    [dir=rtl] & {
      margin: var(--chips-remove-margin, 2px calc(var(--space-4) + 2px) 2px 2px);
    }
  }

  &__icon {
    margin: var(--chips-icon-margin, -2px);
  }
}
</style>

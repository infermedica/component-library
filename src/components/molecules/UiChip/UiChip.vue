<template>
  <div class="ui-chip">
    <!-- @slot Use this slot to place content inside chip. -->
    <slot />
    <!-- @slot Use this slot to replace remove template. -->
    <slot
      name="remove"
      v-bind="{clickHandler, attrs: buttonAttrs}"
    >
      <UiButton
        v-bind="buttonAttrs"
        class="ui-chip__remove ui-button--has-icon ui-button--circled"
        @click="clickHandler"
      >
        <UiIcon
          icon="remove-filled"
          class="ui-chip__icon"
        />
      </UiButton>
    </slot>
  </div>
</template>

<script>
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

export default {
  name: 'UiChip',
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

.ui-chip {
  @include font(body-2-comfortable);

  display: inline-flex;
  align-items: center;
  padding: var(--chip-padding, var(--space-4) var(--space-4) var(--space-4) var(--space-12));
  color: var(--chip-color, var(--color-chip-text));
  background: var(--chip-background, var(--color-chip-background));
  border-radius: var(--chip-border-radius, var(--border-radius-pill));

  [dir=rtl] & {
    padding: var(--chip-padding, var(--space-4) var(--space-12) var(--space-4) var(--space-4));
  }

  &__remove {
    --button-padding: 0;
    --button-border-width: 0;
    --button-icon-color: var(--chip-remove-background, var(--color-chip-icon-background));
    --button-icon-color-hover: var(--chip-remove-hover-background, var(--color-chip-icon-background-hover));
    --button-icon-color-active: var(--chip-remove-active-background, var(--color-chip-icon-background-active));
    --icon-size: var(--chip-remove-size, 1.5rem);
    --remove-filled-close: var(--chip-remove-cross, var(--color-chip-icon));

    margin: var(--chip-remove-margin, 2px 2px 2px calc(var(--space-4) + 2px));

    [dir=rtl] & {
      margin: var(--chip-remove-margin, 2px calc(var(--space-4) + 2px) 2px 2px);
    }
  }

  &__icon {
    margin: var(--chip-icon-margin, -2px);
  }
}
</style>

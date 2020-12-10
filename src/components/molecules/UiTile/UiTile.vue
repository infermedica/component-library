<template>
  <UiRadio class="ui-tile">
    <template #radiobutton>
      <!-- @slot Use this slot to replace tile template. -->
      <slot
        name="button"
        v-bind="{iconAttrs}"
      >
        <div class="ui-tile__button">
          <!-- @slot Use this slot to replace icon template. -->
          <slot
            name="icon"
            v-bind="{iconAttrs}"
          >
            <UiIcon
              v-bind="iconAttrs"
              class="ui-tile__icon"
            />
          </slot>
          <!-- @slot Use this slot to replace label template. -->
          <slot name="label">
            <div class="ui-tile__label">
              <!-- @slot Use this slot to place content inside label. -->
              <slot />
            </div>
          </slot>
        </div>
      </slot>
    </template>
  </UiRadio>
</template>

<script>
import UiRadio from '../../atoms/UiRadio/UiRadio.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

export default {
  name: 'UiTile',
  components: {
    UiRadio,
    UiIcon,
  },
  props: {
    /**
     * Use this props to pass attrs for UiIcon
     */
    iconAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss">
.ui-tile {
  $this: &;

  display: flex;

  &__button {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: var(--tile-flex-direction, row);
    align-items: center;
    justify-content: var(--tile-flex-direction, flex-start);
    padding: var(--tile-padding, var(--space-16));
    font: var(--tile-font, var(--font-body-1));
    background: var(--tile-background, var(--color-background-white));
    border: var(--tile-border, solid var(--color-border-subtle));
    border-width: var(--tile-border-width, 2px);
    border-radius: var(--tile-border-radius, var(--border-radius-form));
    transition: transform 200ms ease;

    @media (min-width: 480px) {
      flex-direction: var(--tile-flex-direction, column);
      justify-content: var(--tile-flex-direction, center);
      padding: var(--tile-padding, var(--space-32) var(--space-16) var(--space-24) var(--space-16));
    }

    &:hover {
      background: var(--tile-hover-background, var(--color-background-white-hover));
    }
  }

  &__icon {
    --icon-size: var(--tile-icon-size, 3rem);
    --icon-color: var(--color-icon-primary);

    margin: var(--tile-icon-margin, 0 var(--space-16) 0 0);

    @media (min-width: 480px) {
      --icon-size: var(--tile-icon-size, 4rem);

      margin: var(--tile-icon-margin, 0 0 var(--space-16) 0);
    }
  }

  &__label {
    color: var(--tile-label-color, var(--color-text-body));
  }

  input {
    &:focus + #{$this}__button {
      box-shadow: var(--box-shadow-outline);
    }

    &:active + #{$this}__button {
      background: var(--tile-active-background, var(--color-background-white-active));
      transform: var(--tile-active-transform, scale(0.96));
    }

    &:checked {
      & + #{$this}__button {
        --tile-border: solid var(--color-border-accessible);
      }
    }
  }

  &--small {
    @media (min-width: 480px) {
      --tile-icon-size: 2rem;
    }
  }
}
</style>

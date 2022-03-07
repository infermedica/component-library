<template>
  <UiButton
    :id="tileId"
    class="ui-tile ui-button--outlined"
    :class="{'ui-tile--selected': isChecked}"
    role="radio"
    :aria-checked="`${isChecked}`"
    @click="selectHandler"
  >
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
      <UiText
        tag="span"
        class="ui-tile__label"
      >
        <!-- @slot Use this slot to place content inside label. -->
        <slot />
      </UiText>
    </slot>
  </UiButton>
</template>

<script setup>
import { uid } from 'uid/single';
import { computed } from 'vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

const props = defineProps({
  /**
     * Use this props to pass attrs for UiIcon
     */
  iconAttrs: {
    type: Object,
    default: () => ({}),
  },
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
  modelValue: {
    type: [String, Object],
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);
const tileId = computed(() => (
  props.id || `tile-${uid()}`
));
const isChecked = computed(() => {
  if (typeof props.modelValue === 'string') {
    return props.value === props.modelValue;
  }
  return Object.keys(props.modelValue)
    .every((key) => (props.modelValue[key] === props.value[key]));
});
function selectHandler() {
  emit('update:modelValue', JSON.parse(JSON.stringify(props.value)));
}
</script>

<style lang="scss">
.ui-tile {
  --button-padding: var(--tile-padding, var(--space-16));
  --button-white-space: wrap;

  align-items: center;
  justify-content: flex-start;
  transition: transform 200ms ease;

  @media (min-width: 768px) {
    flex-direction: column;
    justify-content: center;

    --button-padding: var(--tile-padding, var(--space-24) var(--space-16));
  }

  &:active {
    transform: var(--tile-active-transform, scale(0.96));
  }

  &__icon {
    --icon-size: var(--tile-icon-size, 3rem);
    --icon-color: var(--tile-icon-color, var(--color-icon-primary));

    flex: none;

    @media (min-width: 768px) {
      --icon-size: var(--tile-icon-size, 4rem);
    }
  }

  &__label {
    padding: var(--tile-label-padding, 0);
    margin: var(--tile-label-margin, 0 0 0 var(--space-16));
    text-align: var(--tile-label-text-align, left);

    [dir="rtl"] & {
      margin: var(--tile-label-margin, 0 var(--space-16) 0 0);
    }

    @media (min-width: 768px) {
      text-align: var(--tile-label-tablet-text-align, center);

      [dir] & {
        margin: var(--tile-label-tablet-margin, var(--space-16) 0 0 0);
      }
    }
  }

  &--selected {
    &::before {
      box-shadow: 0 0 0 2px var(--tile-border-color, var(--color-border-strong)); // border of selected tile
    }
  }

  &--small {
    --tile-icon-size: 2rem;
  }
}
</style>

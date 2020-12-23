<template>
  <UiListItem class="ui-dropdown-item">
    <UiRadio
      :model-value="modelValue"
      :value="value"
      :name="name"
      class="ui-dropdown-item__option"
      @update:modelValue="changeHandler"
    >
      <template #radiobutton>
        <div class="ui-dropdown-item__button">
          <UiText tag="span">
            <slot />
          </UiText>
          <UiIcon
            icon="tick"
            class="ui-dropdown-item__checkmark"
          />
        </div>
      </template>
    </UiRadio>
  </UiListItem>
</template>

<script>
import { inject } from 'vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiRadio from '../../../atoms/UiRadio/UiRadio.vue';
import UiListItem from '../../../organisms/UiList/_internal/UiListItem.vue';

export default {
  name: 'UiDropdownItem',
  components: {
    UiRadio,
    UiListItem,
    UiIcon,
    UiText,
  },
  props: {
    value: {
      type: [String, Object],
      default: '',
    },

  },
  setup() {
    const name = inject('name');
    const changeHandler = inject('changeHandler');
    const modelValue = inject('modelValue');
    return {
      name,
      changeHandler,
      modelValue,
    };
  },
};
</script>

<style lang="scss">
@import '../../../../styles/mixins/_mixins.scss';

.ui-dropdown-item {
  $this: &;

  --list-item-padding: 0;

  margin: var(--dropdown-item-margin, 0 0 var(--space-8) 0);

  &:last-of-type {
    margin: var(--dropdown-item-margin, 0);
  }

  &__option {
    width: 100%;
  }

  &__button {
    --icon-color: var(--dropdown-item-button-icon-color, transparent);
    --icon-size: var(--dropdown-item-button-icon-size, 1.5rem);

    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: var(--dropdown-item-button-padding, var(--space-8));
    border-radius: var(--dropdown-item-button-border-radius, var(--border-radius-form));

    &:hover {
      background: var(--dropdown-item-button-hover-background, var(--color-background-white-hover));
    }

    &:active {
      background: var(--dropdown-item-button-active-background, var(--color-background-white-active));
    }
  }

  &__checkmark {
    margin: var(--dropdown-item-checkmark-margin, 0 0 0 var(--space-12));
  }

  input {
    &:focus + #{$this}__button {
      box-shadow: var(--box-shadow-outline);
    }

    &:checked {
      & + #{$this}__button {
        --dropdown-item-button-icon-color: var(--color-icon-negative);
        --text-color: var(--color-text-on-dark);

        background: var(--dropdown-item-button-checked-background, var(--color-background-dark));
      }

      &:hover {
        --dropdown-item-button-icon-color: transparent;
        --text-color: var(--color-text);

        background: var(--dropdown-item-button-checked-hover-background, var(--color-background-white-hover));
      }

      &:active + #{$this}__button {
        --dropdown-item-button-icon-color: transparent;
        --text-color: var(--color-text);

        background: var(--dropdown-item-button-checked-active-background, var(--color-background-white-active));
      }
    }
  }

  &--compact {
    --dropdown-item-button-padding: var(--space-4) var(--space-8);
  }
}
</style>

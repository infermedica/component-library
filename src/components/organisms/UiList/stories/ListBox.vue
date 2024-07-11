<template>
  <UiList
    v-bind="args"
    class="list-box"
    role="listbox"
  />
</template>

<script setup lang="ts">
import {
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import {
  UiButton,
  UiIcon,
  UiList,
  UiText,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const label = computed(() => (listLabel));
</script>

<style lang="scss">
@use "../../../../styles/mixins";

$element: list;

#storybook-root:has(.list-box) {
  @include mixins.inner-border($element, $color: var(--color-border-subtle), $radius: var(--border-radius-form));
}

.list-box {
  max-height: 20.5rem;
  overflow-y: auto;

  &__label {
    display: flex;
    justify-content: space-between;
    border-radius: var(--border-radius-form);

    @include mixins.with-hover {
      &:hover {
        background-color: var(--color-background-white-hover);
      }
    }

    &:active {
      background-color: var(--color-background-white-active);
    }
  }

  .ui-list-item {
    padding: var(--space-4) var(--space-8);
    
    &::after {
      border-block-style: none;
    }

    &__content {
      padding-block: var(--space-4);
      padding-inline: var(--space-8);

      &:focus-within {
        border-radius: 0.5rem;
        box-shadow: var(--focus-outer);
      }
    }

    .ui-checkbox:focus-within:has(input[type="checkbox"]:focus) .ui-checkbox {
      &__checkbox {
        box-shadow: none;
      }
    }

    @media (hover: hover) {
      .ui-list-item {
        &__content:not([aria-disabled]):hover {
          border-radius: var(--border-radius-form);
          background: var(--list-item-content-hover-background, var(--color-background-white-hover));
        }
      }
    }
  }
}

.ui-list-item-button {
  padding: var(--space-4) var(--space-8);
  border-top: 1px solid var(--color-gray-100);

  .ui-button {
    &__icon {
      margin-block: var(--space-4);
    }
  }

  &__title {
    display: flex;
  }

  &__button {
    display: initial;
    width: 100%;
    padding: var(--space-8) var(--space-8);
    padding-inline: var(--space-4);
    text-align: left;

    @include mixins.from-tablet {
      padding: var(--space-4) var(--space-8);
    }

    @include mixins.with-hover {
      &:hover {
        background-color: var(--color-background-white-hover);
      }
    }

    &:active {
      background-color: var(--color-background-white-active);
    }

    &:not([aria-disabled]):hover  {
      border-radius: var(--border-radius-form);
      background: var(--color-background-white-hover);
    }
  }

  &__label {
    align-content: center;
    padding: 0 var(--space-12);
    font: var(--font-body-1-thick);
    letter-spacing: var(--letter-spacing-small);
  }

  &__hint {
    overflow: hidden;
    padding: var(--space-4);
    margin-inline: var(--space-32);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

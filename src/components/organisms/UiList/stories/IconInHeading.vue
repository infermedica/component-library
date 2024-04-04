<template>
  <UiList
    v-bind="args"
    class="icon-in-heading"
  >
    <template
      v-for="{ name } in args.items"
      :key="name"
      #[name]="item"
    >
      <UiIcon
        icon="calendar"
        class="ui-button__icon icon-in-heading__prefix-icon"
      />
      <div class="icon-in-heading__heading">
        <UiHeading level="4">
          {{ item?.label }}
        </UiHeading>
        <UiText>
          {{ item?.label }}
        </UiText>
      </div>
    </template>
  </UiList>
</template>

<script setup>
import {
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import {
  UiList,
  UiHeading,
  UiIcon,
  UiText,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.icon-in-heading {
  $this: &;

  &__content {
    @include mixins.focus {
      box-shadow: var(--focus-inner);
    }

    --button-gap: 0;
    --button-border-start-start-radius: 0;
    --button-border-start-end-radius: 0;
    --button-border-end-start-radius: 0;
    --button-border-end-end-radius: 0;
    --button-border-block-width: 0;
    --button-border-inline-width: 0;

    justify-content: space-between;

    @include mixins.hover {
      & #{$this}__suffix {
        --icon-color: var(--color-icon-primary-hover);
      }
    }

    &:active {
      & #{$this}__suffix {
        --icon-color: var(--color-icon-primary-active);
      }
    }
  }

  &__prefix-icon {
    --icon-size: 2rem;
    --button-icon-margin-inline: 0 var(--space-16);
  }

  &__heading {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    flex: 1;
    text-align: start;
    margin-block-start: var(--space-4)
  }

  &__suffix {
    --icon-color: var(--color-icon-primary);
  }
}
</style>


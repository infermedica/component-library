<template>
  <UiList
    v-bind="args"
    class="condition"
  >
    <template
      v-for="{ name } in args.items"
      #[name]="item"
      :key="name"
    >
      <div class="condition__content">
        <div class="condition__probability">
          <UiProgress
            :value="item?.evidence?.value"
            :max="10"
            class="condition__progress"
          />
          <UiText class="ui-text--body-2-comfortable condition__label">
            {{ item?.evidence?.label }}
          </UiText>
        </div>
        <UiHeading level="3">
          {{ item?.label }}
        </UiHeading>
        <UiText class="ui-text--body-2-comfortable ui-text--theme-secondary condition-with-button__description">
          {{ item?.description }}
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
  UiProgress,
  UiText,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.condition {
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

    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;

    @include mixins.hover {
      & #{$this}__suffix {
        --text-color: var(--color-text-action-primary-hover);
        --icon-color: var(--color-icon-primary-hover);
      }
    }

    &:active {
      & #{$this}__suffix {
        --text-color: var(--color-text-action-primary-active);
        --icon-color: var(--color-icon-primary-active);
      }
    }
  }

  &__probability {
    display: flex;
    align-items: center;
    gap: var(--space-8);
  }

  &__progress {
    --progress-indicator-background: var(--color-dataviz-sequential-strong);

    flex: 0 0 1.875rem;
  }

  &__label {
    flex: 0 0 auto;
  }

  &__suffix {
    --text-color: var(--color-text-action-primary);
    --icon-color: var(--color-icon-primary);

    align-self: end;
    font: var(--font-body-2-comfortable);
    letter-spacing: var(--letter-spacing-body-2-comfortable);
  }
}
</style>


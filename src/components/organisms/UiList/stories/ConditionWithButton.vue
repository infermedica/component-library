<template>
  <UiList
    v-bind="args"
    class="condition-with-button"
  >
    <template
      v-for="{ name } in args.items"
      #[name]="item"
      :key="name"
    >
      <div class="condition-with-button__content">
        <div class="condition-with-button__probability">
          <UiProgress
            :value="item?.evidence?.value"
            :max="10"
            class="condition-with-button__progress"
          />
          <UiText class="ui-text--body-2-comfortable ui-text--theme-secondary condition-with-button__label">
            {{ item?.evidence?.label }}
          </UiText>
        </div>
        <UiHeading level="3">
          {{ item?.label }}
        </UiHeading>
        <UiText class="ui-text--body-2-comfortable ui-text--theme-secondary condition-with-button__description">
          {{ item?.description }}
        </UiText>
        <UiButton class="ui-button--text ui-button--small">
          Show details
        </UiButton>
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
  UiButton,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.condition-with-button {
  $this: &;

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
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
    align-self: center;
  }
}
</style>


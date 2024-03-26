<template>
  <UiList
    v-bind="args"
    class="as-condition"
  >
    <template #listItem="{ item }">
      <UiHeading level="3">
        {{ item.label }}
      </UiHeading>
      <div class="as-condition__probability">
        <UiProgress
          :value="item.evidence.value"
          :max="10"
          class="as-condition__progress"
        />
        <UiText class="ui-text--body-2-comfortable as-condition__label">
          {{ item.evidence.label }}
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
  UiProgress,
  UiText,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.as-condition {
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

    flex-direction: column;
    align-items: flex-start;
    width: 100%;
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

  &__suffix {}

  &__suffix-icon {}
}
</style>


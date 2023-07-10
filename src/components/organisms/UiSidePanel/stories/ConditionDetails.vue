<template>
  <UiSidePanel
    v-model="value"
    v-bind="args"
    class="side-panel-condition-details"
  >
    <template #title="{ title }">
      <div class="side-panel-condition-details__byline">
        <UiProgress :value="100" />
        <UiText class="ui-text--body-2-comfortable">
          Strong evidence
        </UiText>
      </div>
      <UiHeading>
        {{ title }}
      </UiHeading>
    </template>
    <template #default>
      <div class="side-panel-condition-details-section">
        <UiHeading class="side-panel-condition-details-section__title">
          About
        </UiHeading>
        <UiHeading
          level="4"
          class="side-panel-condition-details-section__subtitle"
        >
          What is acute viral throat infection?
        </UiHeading>
        <template v-if="isShowMoreOpen">
          <UiText class="side-panel-condition-details-section__paragraph">
            Acute viral tonsillopharyngitis known as sore throat is an inflammation of throat and tonsils, caused by viral infection. It causes pain, discomfort, swelling in the throat, which can also be red and dry.
          </UiText>
          <UiText class="side-panel-condition-details-section__paragraph">
            Other symptoms of pharyngitis may include painful swallowing, fever, bad breath, mild cough, joint pain, sneezing, headache, muscle aches, tender, swollen lymph nodes in the neck or runny nose.
          </UiText>
        </template>
        <template v-else>
          <UiText class="side-panel-condition-details-section__paragraph">
            Acute viral tonsillopharyngitis known as sore throat is an inflammation of throat and tonsils, caused by viral infection ...
          </UiText>
        </template>
        <UiButton
          class="ui-button--text side-panel-condition-details-section__show-more"
          @click="handleShowMoreClick"
        >
          <UiIcon
            :icon="isShowMoreOpen ? 'chevron-up' : 'chevron-down'"
            class="ui-button__icon"
          />Show {{ isShowMoreOpen ? 'less' : 'more' }}
        </UiButton>
      </div>
    </template>
  </UiSidePanel>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import {
  ref,
  computed,
  useAttrs,
  inject,
} from 'vue';
import {
  UiSidePanel,
  UiProgress,
  UiText,
  UiHeading,
  UiIcon,
  UiButton,
} from '@infermedica/component-library';

const attrs = useAttrs();
const {
  modelValue,
  ...rest
} = attrs;

const value = inject('value');
const args = computed(() => ({ ...rest }));
const isShowMoreOpen = ref(false);
const handleShowMoreClick = () => {
  isShowMoreOpen.value = !isShowMoreOpen.value;
};
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.side-panel-condition-details {
  &__label {
    display: grid;
    gap: var(--space-4);
  }

  &__byline {
    display: grid;
    grid-template-columns: 4rem 1fr;
    align-items: center;
    gap: var(--space-12);
  }

  &-section {
    @include mixins.inner-border(
            'side-panel-condition-details-section',
        $color: var(--color-border-subtle),
        $width: 0 0 1px 0,
        $radius: 0
    );

    &__title {
      margin-block-end: var(--space-12);
    }

    &__paragraph {
      margin-block-start: var(--space-12);
    }

    &__show-more {
      margin-block: var(--space-24) var(--space-32);
    }
  }
}
</style>

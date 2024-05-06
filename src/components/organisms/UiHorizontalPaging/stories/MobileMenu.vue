<template>
  <UiSidePanel
    :model-value="true"
    :title="sidePanelTitle"
    class="mobile-menu"
  >
    <template #title="{ title }">
      <div class="mobile-menu__title">
        <UiButton
          v-if="isActive"
          class="ui-button--icon mobile-menu__back"
          @click="handleBackClick"
        >
          <UiIcon
            icon="chevron-left"
            class="ui-button__icon"
          />
          <span class="visual-hidden">Back to {{ previous }}</span>
        </UiButton>
        <UiHeading>
          {{ title }}
        </UiHeading>
      </div>
    </template>
    <UiHorizontalPaging
      ref="horizontalPagingTemplateRefs"
      v-model="value"
      v-bind="args"
      class=""
    >
      <template
        #menu="{
          items,
          isActive,
        }"
      >
        <div
          :class="[
            'mobile-menu__menu',
            { 'mobile-menu__menu--is-hidden': isActive },
          ]"
        >
          <UiMenu
            :items="items"
          />
          <footer class="mobile-menu__footer">
            <UiLink
              href="https://infermedica.com/"
              target="_blank"
              class="ui-link--theme-secondary"
            >
              © 2021 Infermedica
            </UiLink>
          </footer>
        </div>
      </template>
      <template #medical-certification>
        <MedicalCertification />
      </template>
      <template #instruction-for-use>
        <UiLoader type="skeleton" />
      </template>
      <template #terms-of-service>
        <TermsOfService />
      </template>
      <template #privacy-policy>
        <UiLoader type="skeleton" />
      </template>
      <template #interview-id>
        <InterviewId />
      </template>
    </UiHorizontalPaging>
  </UiSidePanel>
</template>

<script setup>
import {
  ref,
  computed,
  useAttrs,
  defineOptions,
  inject,
} from 'vue';
import {
  UiHorizontalPaging,
  UiMenu,
  UiLoader,
  UiSidePanel,
  UiButton,
  UiIcon,
  UiLink,
  UiHeading,
} from '@infermedica/component-library';
import MedicalCertification from './_internal/MedicalCertification.vue';
import TermsOfService from './_internal/TermsOfService.vue';
import InterviewId from './_internal/InterviewId.vue';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const value = inject('value', []);

const horizontalPagingTemplateRefs = ref(null);
const isActive = computed(() => (horizontalPagingTemplateRefs.value?.isActive));
const handleBackClick = () => {
  horizontalPagingTemplateRefs.value.handleBackClick();
};
const sidePanelTitle = computed(() => (horizontalPagingTemplateRefs.value?.activeItem.title || args.value.title));
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.mobile-menu {
  $element: mobile-menu;

  --side-panel-content-padding-block: 0;
  --side-panel-content-padding-inline: 0;

  &__title {
    display: flex;
    gap: var(--space-12);
  }

  &__back {
    align-self: flex-start;
    margin-block-start: 3px;
  }

  &__menu {
    @include mixins.use-logical($element + "-menu", padding, var(--space-12) var(--space-4));

    flex: 0 0 100%;

    &--is-hidden {
      visibility: hidden;
    }
  }

  &__language {
    padding-inline: 0.625rem;
    padding-block-end: var(--space-12);
    margin-block-end: var(--space-4);
    margin-inline: calc(var(--space-4) * -1);
    border: solid var(--color-border-divider);
    border-width: 0 0 1px 0;
  }

  &__footer {
    border: solid var(--color-border-divider);
    border-width: 1px 0 0 0;
    padding-inline: var(--space-20);
    padding-block: var(--space-24);
  }
}
</style>

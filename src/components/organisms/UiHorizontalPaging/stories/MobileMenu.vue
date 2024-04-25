<template>
  <UiSidePanel
    :model-value="true"
    class="mobile-menu"
  >
    <UiHorizontalPaging
      v-model="value"
      v-bind="args"
      class=""
    >
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
    <UiLink
      href="https://infermedica.com/"
      target="_blank"
      class="ui-link--theme-secondary"
    >
      © 2021 Infermedica
    </UiLink>
  </UiSidePanel>
</template>

<script setup>
import {
  computed,
  useAttrs,
  defineOptions,
  inject,
} from 'vue';
import {
  UiHorizontalPaging,
  UiLoader,
  UiSidePanel,
} from '@infermedica/component-library';
import MedicalCertification from './_internal/MedicalCertification.vue';
import TermsOfService from './_internal/TermsOfService.vue';
import InterviewId from './_internal/InterviewId.vue';
import UiLink from '../../../atoms/UiLink/UiLink.vue';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const value = inject('value', []);
</script>

<style lang="scss">
.mobile-menu {

}
</style>

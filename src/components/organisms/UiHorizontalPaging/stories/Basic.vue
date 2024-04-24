<template>
  <UiHorizontalPaging
    v-model="value"
    v-bind="args"
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
} from '@infermedica/component-library';
import MedicalCertification from './_internal/MedicalCertification.vue';
import TermsOfService from './_internal/TermsOfService.vue';
import InterviewId from './_internal/InterviewId.vue';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const value = inject('value', []);
</script>

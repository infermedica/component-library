<template>
  <UiHorizontalPaging
    v-model="value"
    v-bind="args"
    :items="itemsA"
  >
    <template #industries>
      <UiLoader type="skeleton" />
    </template>
    <template #platform>
      <UiHorizontalPaging
        :items="itemsB"
      >
        <template #our-platform>
          <UiLoader type="skeleton" />
        </template>
        <template #modules>
          <UiHorizontalPaging
            :items="itemsC"
          >
            <template #triage>
              <UiLoader type="skeleton" />
            </template>
            <template #intake>
              <UiLoader type="skeleton" />
            </template>
            <template #fallow-up>
              <UiLoader type="skeleton" />
            </template>
          </UiHorizontalPaging>
        </template>
      </UiHorizontalPaging>
    </template>
    <template #partners>
      <UiLoader type="skeleton" />
    </template>
  </UiHorizontalPaging>
</template>

<script setup lang="ts">
import {
  defineOptions,
  inject,
} from 'vue';
import {
  UiHorizontalPaging,
  UiLoader,
} from '@infermedica/component-library';
import { useArgs } from '@sb/composable/useArgs';

defineOptions({ inheritAttrs: false });
const {
  attrs, args,
} = useArgs([
  'modelValue',
  'items',
]);
const value = inject('value', []);
const itemsA = [
  {
    label: 'Industries',
    title: 'Industries',
    name: 'industries',
  },
  {
    label: 'Platform',
    title: 'Platform',
    name: 'platform',
  },
  {
    label: 'Partners',
    title: 'Partners',
    name: 'partners',
  },
];
const itemsB = [
  {
    label: 'Our Platform',
    title: 'Our platform',
    name: 'our-platform',
  },
  {
    label: 'Modules',
    title: 'Modules',
    name: 'modules',
  },
];
const itemsC = [
  {
    label: 'Triage',
    title: 'Triage',
    name: 'triage',
  },
  {
    label: 'Intake',
    title: 'Intake',
    name: 'intake',
  },
  {
    label: 'Fallow-up',
    title: 'Fallow-up',
    name: 'fallow-up',
  },
];
</script>

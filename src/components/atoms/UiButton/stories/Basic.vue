<template>
  <UiButton v-bind="args">
    <UiIcon
      v-if="icon"
      :icon="icon"
      class="ui-button__icon"
    />
    {{ content }}
    <UiIcon
      v-if="iconEnd"
      :icon="iconEnd"
      class="ui-button__icon ui-button__icon--end"
    />
  </UiButton>
</template>

<script setup>
import { defineOptions } from 'vue';
import {
  UiButton,
  UiIcon,
} from '@infermedica/component-library';
import { useStories } from './useStories';

defineOptions({ inheritAttrs: false });

const {
  args,
  content,
  icon,
  iconEnd,
} = useStories();
</script>

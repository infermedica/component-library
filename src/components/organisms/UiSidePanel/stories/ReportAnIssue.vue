<template>
  <UiSidePanel
    v-model="value"
    v-bind="args"
    class="side-panel-report-an-issue"
  >
    <form @submit.prevent="handleReportAnIssueSubmit">
      <UiText>
        What's wrong with this question?
      </UiText>
      <UiFormField
        :error-message="errorMessage"
        :alert-attrs="{ class: 'side-panel-with-report-an-issue__alert' }"
      >
        <UiList
          :items="options"
          class="side-panel-with-report-an-issue__options"
        >
          <template
            v-for="({ name }, key) in options"
            #[name]="{ item: { label } }"
            :key="key"
          >
            <UiCheckbox
              v-model="selected"
              :value="label"
              :disabled="isProcessing"
              :class="{ 'ui-checkbox--is-disabled': isProcessing, }"
            >
              {{ label }}
            </UiCheckbox>
          </template>
        </UiList>
      </UiFormField>
      <UiFormField
        :error-message="false"
        message="Describe details"
        hint="Optional"
        class="side-panel-with-report-an-issue__details"
      >
        <template #default="{ id }">
          <UiTextarea
            :id="id"
            :disabled="isProcessing"
          />
        </template>
      </UiFormField>
      <div class="side-panel-with-report-an-issue__actions">
        <UiButton
          type="submit"
          :class="{ 'ui-button--is-disabled': isProcessing }"
          :disabled="isProcessing"
        >
          <UiLoader
            :is-loading="isProcessing"
            type="ellipsis"
            transition-type="opacity"
            :transition-attrs="{ name: '' }"
          >
            <span>Submit</span>
          </UiLoader>
        </UiButton>
        <UiButton
          type="button"
          :class="[
            'ui-button--text', { 'ui-button--is-disabled': isProcessing }
          ]"
          :disabled="isProcessing"
          @click="closeHandler"
        >
          Cancel
        </UiButton>
      </div>
    </form>
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
import type { Ref } from 'vue';
import {
  UiSidePanel,
  UiText,
  UiFormField,
  UiList,
  UiLoader,
  UiCheckbox,
  UiTextarea,
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
const options = [
  {
    name: 'too-long',
    label: 'It\'s too long',
  },
  {
    name: 'unrelated',
    label: 'It seems to be unrelated to me',
  },
  {
    name: 'complex',
    label: 'It contains complex words',
  },
  {
    name: 'answered',
    label: 'I\'ve already answered this question',
  },
  {
    name: 'which-answer-to-choose',
    label: 'I can\'t decide which answer to choose',
  },
  {
    name: 'typo',
    label: 'I found a typo',
  },
  {
    name: 'other',
    label: 'Other (please comment below)',
  },
].map((option) => ({
  ...option,
  listItemAttrs: { class: 'side-panel-with-report-an-issue__option' },
}));
const selected = ref([]);
const isProcessing = ref(false);
const isTouched = ref(false);
const errorMessage = computed(() => (
  selected.value.length > 0 || !isTouched.value
    ? false
    : 'Please select at least one issue.'
));
const closeHandler = () => {
  selected.value.length = 0;
  isTouched.value = false;

  (value as Ref<unknown>).value = false;
};
const handleReportAnIssueSubmit = () => {
  isTouched.value = true;
  if (!errorMessage.value) {
    isProcessing.value = true;
    setTimeout(() => {
      isProcessing.value = false;
      closeHandler();
    }, 1000);
  }
};
</script>

<style lang="scss">
.side-panel-report-an-issue {
  &__options {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
    margin-block-start: var(--space-24)
  }

  &__option {
    --list-item-content-padding-block: 0;
    --list-item-content-padding-inline: 0;
    --list-item-tablet-content-padding-block: 0;
    --list-item-tablet-content-padding-inline: 0;
    --list-item-border-block-width: 0;
    --list-item-content-hover-background: transparent;
  }

  &__details {
    margin-block: var(--space-32);
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--space-32);
  }

  &__alert {
    --form-field-alert-margin-block-start: var(--space-24);
  }
}
</style>

import { ref } from 'vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiFormField from '@/components/molecules/UiFormField/UiFormField.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiTextarea from '@/components/atoms/UiTextarea/UiTextarea.vue';
import docs from './focus-first.mdx';
import { focusFirst } from '../index';

export default {
  title: 'Utilities/Directives/Focus First',
  parameters: {
    docs: {
      page: docs,
    },
  },
};

export const WithDirective = () => ({
  components: {
    UiButton, UiFormField, UiHeading, UiTextarea,
  },
  directives: {
    focusFirst,
  },
  setup() {
    const feedback = ref('');
    const alert = ref(null);
    const sendMessage = () => {
      feedback.value = '';
      alert.value = 'Thank you very much! Your feedback will help us improve the system.';
    };
    const reset = () => {
      alert.value = null;
    };
    return {
      alert, feedback, sendMessage, reset,
    };
  },
  template: `
  <UiHeading> Whats's wrong with this question? </UiHeading>
  <UiFormField
    style="height: 150px"
    :alertAttrs="{ type: 'success' }"
    label="Describe details"
    hint="Optional"
    :errorMessage="alert"
    v-focus-first
  >
    <template #default>
      <UiTextarea style="width: 100%" v-model="feedback" @click="reset" />
    </template>
  </UiFormField>
  <UiButton @click="sendMessage"> Send </UiButton>
  `,
});

export const WithoutDirective = () => ({
  components: {
    UiButton, UiFormField, UiHeading, UiTextarea,
  },
  setup() {
    const feedback = ref('');
    const alert = ref(null);
    const sendMessage = () => {
      feedback.value = '';
      alert.value = 'Thank you very much! Your feedback will help us improve the system.';
    };
    const reset = () => {
      alert.value = null;
    };
    return {
      alert, feedback, sendMessage, reset,
    };
  },
  template: `
  <UiHeading> Whats's wrong with this question? </UiHeading>
  <UiFormField
    style="height: 150px"
    :alertAttrs="{ type: 'success' }"
    label="Describe details"
    hint="Optional"
    :errorMessage="alert"
  >
    <template #default>
      <UiTextarea style="width: 100%" v-model="feedback" @click="reset" />
    </template>
  </UiFormField>
  <UiButton @click="sendMessage"> Send </UiButton>
  `,
});

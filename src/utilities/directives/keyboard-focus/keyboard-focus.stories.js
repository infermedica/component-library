import { keyboardFocus } from '@/utilities/directives/index';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiTextarea from '@/components/atoms/UiTextarea/UiTextarea.vue';
import UiFormField from '@/components/molecules/UiFormField/UiFormField.vue';
import { ref } from 'vue';
import docs from './keyboard-focus.mdx';

export default {
  title: 'Utilities/Directives/Keyboard Focus',
  parameters: {
    docs: {
      page: docs,
    },
  },
};

export const WithDirective = () => ({
  components: {
    UiButton, UiHeading, UiTextarea, UiFormField,
  },
  directives: {
    keyboardFocus,
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
  <UiHeading>
    Whats's wrong with this question?
  </UiHeading>
  <UiFormField style="height: 150px" :alertAttrs="{type: 'success'}" label="Describe details" hint="Optional" :errorMessage="alert">
    <template #default>
      <UiTextarea class="ui-textarea" style="width: 100%; resize: none" v-model="feedback" @click="reset" v-keyboard-focus/>
    </template>
  </UiFormField>
  <button class="ui-button" @click='sendMessage' v-keyboard-focus>
    Send
  </button>
  `,
});

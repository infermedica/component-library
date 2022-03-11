import { ref, onMounted } from 'vue';
import UiButton from '../../../components/atoms/UiButton/UiButton.vue';
import UiFormField from '../../../components/molecules/UiFormField/UiFormField.vue';
import UiHeading from '../../../components/atoms/UiHeading/UiHeading.vue';
import UiTextarea from '../../../components/atoms/UiTextarea/UiTextarea.vue';
import docs from './keyboard-focus.mdx';
import { keyboardFocus } from '../index';

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
    UiButton, UiFormField, UiHeading, UiTextarea,
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
      <textarea class="ui-textarea" style="width: 100%; resize: none" v-model="feedback" @click="reset" v-keyboard-focus/>
    </template>
  </UiFormField>
  <button class="ui-button" @click='sendMessage' v-keyboard-focus>
    Send
  </button>
  `,
});

export const WithoutDirective = () => ({
  components: {
    UiButton, UiFormField, UiHeading, UiTextarea,
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
    onMounted(() => {
      document.body.classList.remove('focus-is-hidden');
    });
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
      <textarea class="ui-textarea" style="width: 100%; resize: none" v-model="feedback" @click="reset"/>
    </template>
  </UiFormField>
  <button class="ui-button" @click='sendMessage'>
    Send
  </button>
  `,
});

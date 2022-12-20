import { focusTrap } from '@/utilities/directives/index';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiTextarea from '@/components/atoms/UiTextarea/UiTextarea.vue';
import UiFormField from '@/components/molecules/UiFormField/UiFormField.vue';
import UiRating from '@/components/molecules/UiRating/UiRating.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import { ref } from 'vue';
import docs from './focus-trap.mdx';

export default {
  title: 'Utilities/Directives/Focus Trap',
  decorators: [ () => ({ template: '<div style="--backdrop-position: absolute; --side-panel-position: absolute; --side-panel-z-index: 0; min-height: 320px;"><story /></div>' }) ],
  parameters: { docs: { page: docs } },
};

export const WithDirective = () => ({
  components: {
    UiButton,
    UiHeading,
    UiIcon,
    UiText,
    UiTextarea,
    UiFormField,
    UiRating,
    UiSidePanel,
  },
  directives: { focusTrap },
  setup() {
    const modelValue = ref(true);
    const feedback = ref('');
    const alert = ref(null);
    const rating = ref(0);
    const sendMessage = () => {
      feedback.value = '';
      alert.value = 'Thank you very much! Your feedback will help us improve the system.';
    };
    const reset = () => {
      alert.value = null;
    };
    return {
      alert,
      feedback,
      modelValue,
      rating,
      reset,
      sendMessage,
    };
  },
  template: `
  <UiSidePanel v-model="modelValue">
    <template #container="{
      transition,
      afterEnterHandler,
      modelValue,
      buttonCloseAttrs,
      closeHandler,
      title,
      subtitle,
    }">
      <transition 
        :name="transition" 
        @after-enter="afterEnterHandler"
      >
        <dialog 
          v-if="modelValue"
          v-focus-trap
          class="ui-side-panel__dialog">
          <div class="ui-side-panel__header">
            <UiButton
              ref="button"
              class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
              v-bind="buttonCloseAttrs"
              @click="closeHandler"
            >
              <UiIcon icon="close" />
            </UiButton>
          </div>
          <div class="ui-side-panel__content">
            <UiHeading>
              Whats's wrong with this question?
            </UiHeading>
            <UiFormField
              style="height: 150px"
              :alertAttrs="{ type: 'success' }"
              label="Describe details"
              hint="Optional"
              :errorMessage="alert"
            >
              <template #default>
                <UiTextarea
                  v-model="feedback"
                  style="width: 100%" 
                  @click="reset" 
                />
              </template>
            </UiFormField>
            <UiButton @click="sendMessage">
              Send
            </UiButton>
          </div>
        </dialog>
      </transition>
    </template>
  </UiSidePanel>
  <div style="padding: 5px">
    <UiButton class="ui-button--text ui-button--theme-secondary" @click="modelValue = true">
      Show side panel
    </UiButton>
    <UiHeading style="margin-top: 25px">
      Feedback
    </UiHeading>
    <UiText style="margin-top: 5px">
      Is the information on this site helpful?
    </UiText>
    <UiRating
      v-model="rating"
      max="5"
      style="margin-top: 10px"   
    />
  </div>
  `,
});

export const WithoutDirective = () => ({
  components: {
    UiButton,
    UiFormField,
    UiHeading,
    UiIcon,
    UiRating,
    UiSidePanel,
    UiText,
    UiTextarea,
  },
  setup() {
    const modelValue = ref(true);
    const feedback = ref('');
    const alert = ref(null);
    const rating = ref(0);
    const sendMessage = () => {
      feedback.value = '';
      alert.value = 'Thank you very much! Your feedback will help us improve the system.';
    };
    const reset = () => {
      alert.value = null;
    };
    return {
      alert,
      feedback,
      modelValue,
      rating,
      reset,
      sendMessage,
    };
  },
  template: `
  <UiSidePanel v-model="modelValue">
    <template #container="{
      transition,
      afterEnterHandler,
      modelValue,
      buttonCloseAttrs,
      closeHandler,
      title,
      subtitle,
    }">
      <transition 
        :name="transition" 
        @after-enter="afterEnterHandler"
      >
        <dialog 
          v-if="modelValue" 
          class="ui-side-panel__dialog"
        >
          <div class="ui-side-panel__header">
            <UiButton
              ref="button"
              class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
              v-bind="buttonCloseAttrs"
              @click="closeHandler"
            >
              <UiIcon icon="close" />
            </UiButton>
          </div>
          <div class="ui-side-panel__content">
            <UiHeading>
              Whats's wrong with this question?
            </UiHeading>
            <UiFormField
              style="height: 150px"
              :alertAttrs="{ type: 'success' }"
              label="Describe details"
              hint="Optional"
              :errorMessage="alert"
            >
              <template #default>
                <UiTextarea
                  v-model="feedback"
                  style="width: 100%" 
                  @click="reset"
                />
              </template>
            </UiFormField>
            <UiButton @click="sendMessage">
              Send
            </UiButton>
          </div>
        </dialog>
      </transition>
    </template>
  </UiSidePanel>
  <div style="padding: 5px">
    <UiButton 
      class="ui-button--text ui-button--theme-secondary" 
      @click="modelValue = true"
    >
      Show side panel
    </UiButton>
    <UiHeading style="margin-top: 25px">
      Feedback
    </UiHeading>
    <UiText style="margin-top: 5px">
      Is the information on this site helpful?
    </UiText>
    <UiRating
      v-model="rating"
      style="margin-top: 10px"
      max="5"
    />
  </div>
  `,
});

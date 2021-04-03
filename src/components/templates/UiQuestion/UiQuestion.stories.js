import UiQuestion from '@/components/templates/UiQuestion/UiQuestion.vue';
import UiAlert from '@/components/atoms/UiAlert/UiAlert.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiSimpleQuestion from '@/components/organisms/UiSimpleQuestion/UiSimpleQuestion.vue';
import UiMultipleAnswer from '@/components/organisms/UiMultipleAnswer/UiMultipleAnswer.vue';
import { ref } from 'vue';

export default {
  title: 'Templates/Question',
  component: UiQuestion,
  subcomponents: { UiAlert, UiButton, UiHeading },
  args: {
    title: 'Do you have a sore throat?',
    translation: {
      info: 'What does it mean?',
      why: 'Why am I being asked this?',
      issue: 'Report an issues with this question',
    },
    options: {
      info: true,
      why: true,
      issue: true,
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Use this props to set question title.',
      table: {
        category: 'props',
      },
    },
  },
};

// const Template = (args) => ({
//   components: { UiQuestion, UiSimpleQuestion },
//   setup() {
//     const modelValue = ref('');
//     return { ...args, modelValue };
//   },
//   template: `<UiQuestion
//     :title="title"
//     :translation="translation"
//     :options="options"
//   >
//     <UiSimpleQuestion
//       v-model="modelValue"
//       :options="[
//       {
//         value: 'present',
//         label: 'Yes',
//         iconAttrs: {
//           icon: 'check',
//         },
//       },
//       {
//         value: 'absent',
//         label: 'Male',
//         iconAttrs: {
//           icon: 'cross',
//         },
//       },
//       {
//         value: 'unknown',
//         label: 'Don\\'t know',
//         iconAttrs: {
//           icon: 'arrowRight',
//         },
//       },
//     ]"
//     />
//   </UiQuestion>`,
// });
export const AsMultipleAnswer = (args) => ({
  components: { UiQuestion, UiMultipleAnswer },
  setup() {
    const modelValue = ref('');
    return { ...args, modelValue };
  },
  template: `<UiQuestion
    :title="title"
    :translation="translation"
    :options="options"
  >
    <UiMultipleAnswer
      v-model="modelValue"
      :choices="[
        {
          id: 's_1907',
          name: 'Seconds to minutes',
        },
        {
          id: 's_1868',
          name: 'A few minutes to 4 hours',
        },
        {
          id: 's_1870',
          name: '4 hours to 3 days',
        },
        {
          id: 's_1901',
          name: 'Over 3 days',
        },
      ]"
    />
  </UiQuestion>`,
});

export const AsSimpleQuestion = (args) => ({
  components: { UiQuestion, UiSimpleQuestion },
  setup() {
    const modelValue = ref('');
    return { ...args, modelValue };
  },
  template: `<UiQuestion
    :title="title"
    :translation="translation"
    :options="options"
    style="--question-tablet-actions-margin: var(--space-48) 0 0 0; --question-tablet-content-margin: var(--space-48) 0 0 0"
  >
    <UiSimpleQuestion
      v-model="modelValue"
      :options="[
      {
        value: 'present',
        label: 'Yes',
        iconAttrs: {
          icon: 'check',
        },
      },
      {
        value: 'absent',
        label: 'Male',
        iconAttrs: {
          icon: 'cross',
        },
      },
      {
        value: 'unknown',
        label: 'Don\\'t know',
        iconAttrs: {
          icon: 'arrowRight',
        },
      },
    ]"
    />
  </UiQuestion>`,
});

export const WithTitleSlot = (args) => ({
  components: { UiQuestion, UiHeading },
  setup() {
    return { ...args };
  },
  template: `<UiQuestion
    :title="title"
    :translation="translation"
    :options="options"
  >
    <template #titl="{title}">
      <UiHeading
        v-if="title"
        class="ui-question__title"
      >
        {{ title }}
      </UiHeading>
    </template>
  </UiQuestion>`,
});

export const WithInfoSlot = (args) => ({
  components: { UiQuestion, UiButton, UiAlert },
  setup() {
    return { ...args };
  },
  template: `<UiQuestion
    :title="title"
    :translation="translation"
    :options="options"
  >
    <template #info="{options, translation}">
      <UiButton
        v-if="options.info"
        class="ui-question__alert ui-button--text"
      >
        <UiAlert type="info">
          {{ translation.info }}
        </UiAlert>
      </UiButton>
    </template>
  </UiQuestion>`,
});

export const WithActionsSlot = (args) => ({
  components: { UiQuestion, UiButton },
  setup() {
    return { ...args };
  },
  template: `<UiQuestion
    :title="title"
    :translation="translation"
    :options="options"
  >
    <template #actions="{options, translation}">
      <div
        v-if="options.why || options.issue"
        class="ui-question__actions"
      >
        <div
          v-if="options.why"
          class="ui-question__action"
        >
          <UiButton class="ui-button--text">
            {{ translation.why }}
          </UiButton>
        </div>
        <div
          v-if="options.issue"
          class="ui-question__action"
        >
          <UiButton class="ui-question__action ui-button--text">
            {{ translation.issue }}
          </UiButton>
        </div>
      </div>
    </template>
  </UiQuestion>`,
});

export const WithWhySlot = (args) => ({
  components: { UiQuestion, UiButton },
  setup() {
    return { ...args };
  },
  template: `<UiQuestion
    :title="title"
    :translation="translation"
    :options="options"
  >
    <template #why="{options, translation}">
      <div
        v-if="options.why"
        class="ui-question__action"
      >
        <UiButton class="ui-button--text">
          {{ translation.why }}
        </UiButton>
      </div>
    </template>
  </UiQuestion>`,
});

export const WithIssueSlot = (args) => ({
  components: { UiQuestion, UiButton },
  setup() {
    return { ...args };
  },
  template: `<UiQuestion
    :title="title"
    :translation="translation"
    :options="options"
  >
    <template #issue="{options, translation}">
      <div
        v-if="options.issue"
        class="ui-question__action"
      >
        <UiButton class="ui-question__action ui-button--text">
          {{ translation.issue }}
        </UiButton>
      </div>
    </template>
  </UiQuestion>`,
});

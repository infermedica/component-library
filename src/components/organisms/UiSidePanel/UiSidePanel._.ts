import {
  inject,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue';
import {
  UiBackdrop,
  UiBulletPoints,
  UiButton,
  UiCheckbox,
  UiHeading,
  UiIcon,
  UiFormField,
  UiList,
  UiLink,
  UiLoader,
  UiProgress,
  UiTextarea,
  UiSidePanel,
  UiText,
} from '@index';
import { useArgTypes } from '@sb/helpers';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import type { SidePanelProps } from '@index';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import './UiSidePanel.stories.scss';
import {
  focusTrap,
  bodyScrollLock,
  scrollTabindex,
  keyboardFocus,
} from '@/utilities/directives';

type SidePanelArgsType = SidePanelProps;
type SidePanelMetaType = Meta<SidePanelArgsType>;
type SidePanelStoryType = StoryObj<SidePanelArgsType>;

const { argTypes } = useArgTypes(UiSidePanel);

const meta = {
  title: 'Organisms/SidePanel',
  component: UiSidePanel,
  args: {
    modelValue: true,
    title: 'Terms of Service',
    subtitle: 'Last updated: 26/11/2020',
    transitionBackdropAttrs: { 'data-testid': 'backdrop-transition' },
    backdropAttrs: { 'data-testid': 'backdrop' },
    dialogAttrs: { 'data-testid': 'dialog-element' },
    transitionDialogAttrs: { 'data-testid': 'dialog-transition' },
    labelAttrs: { 'data-testid': 'label-element' },
    headingTitleAttrs: { 'data-testid': 'title-heading' },
    textSubtitleAttrs: { 'data-testid': 'subtitle-text' },
    buttonCloseAttrs: {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    },
    iconCloseAttrs: {
      'data-testid': 'close-icon',
      icon: 'close',
    },
    contentAttrs: { 'data-testid': 'content-element' },
  },
  argTypes: {
    ...argTypes,
    modelValue: { control: 'boolean' },
  },
  decorators: [ () => ({
    components: { UiButton },
    setup(props, { attrs }) {
      const {
        modelValue,
        title,
        ...args
      } = attrs;
      const value = ref(modelValue);
      const handleSidePanelToggle = () => {
        value.value = !value.value;
      };

      provide('value', value);

      return {
        handleSidePanelToggle,
        title,
        args: {
          ...args,
          title,
        },
      };
    },
    template: `<div class="max-w-32 min-h-80">
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="handleSidePanelToggle"
      >
        {{ title }}
      </UiButton>
      <story v-bind="args"/>
    </div>`,
  }) ],
  parameters: {
    chromatic: {
      disableSnapshot: false,
      viewports: [
        320,
        1200,
      ],
    },
  },
} satisfies SidePanelMetaType;

export default meta;

const TemplateStories = {
  render: (args) => ({
    inheritAttrs: false,
    components: { UiSidePanel },
    setup() {
      const {
        title,
        subtitle,
        transitionBackdropAttrs,
        backdropAttrs,
        dialogAttrs,
        transitionDialogAttrs,
        headingTitleAttrs,
        textSubtitleAttrs,
        buttonCloseAttrs,
        iconCloseAttrs,
        contentAttrs,
        ...attrs
      } = args;

      const modelValue = inject('modelValue');

      return {
        modelValue,
        title,
        subtitle,
        transitionBackdropAttrs,
        backdropAttrs,
        dialogAttrs,
        transitionDialogAttrs,
        headingTitleAttrs,
        textSubtitleAttrs,
        buttonCloseAttrs,
        iconCloseAttrs,
        contentAttrs,
        args: { ...attrs },
      };
    },
    template: `<UiSidePanel
      v-model="modelValue"
      :title="title"
      :subtitle="subtitle"
      :transition-backdrop-attrs="transitionBackdropAttrs"
      :backdrop-attrs="backdropAttrs"
      :transition-dialog-attrs="transitionDialogAttrs"
      :heading-title-attrs="headingTitleAttrs"
      :text-subtitle-attrs="textSubtitleAttrs"
      :button-close-attrs="buttonCloseAttrs"
      :icon-close-attrs="iconCloseAttrs"
      :dialog-attrs="dialogAttrs"
      :content-attrs="contentAttrs"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="data"
      >
        <slot
          :name="name"
          v-bind="data"
        />
      </template>
    </UiSidePanel>`,
  }),
} satisfies SidePanelStoryType;

export const Basic: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { UiSidePanel },
    setup(props, { attrs }) {
      const value = inject('value');
      return {
        value,
        args: attrs,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
    >
      <!-- TODO: Place side panel content. -->
    </UiSidePanel>`,

  }),
};
Basic.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiSidePanel
        v-model="modelValue"
        :title="title"
        :subtitle="subtitle"
      >
        <!-- Use default slot to place side panel content. -->
      </UiSidePanel>
    </template>
    
    <script setup lang="ts">
    import { ref } from 'vue';
    import { UiSidePanel } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';
    
    const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
    const title: SidePanelProps['title'] = '${meta.args.title}';
    const subtitle: SidePanelProps['subtitle'] = '${meta.args.subtitle}';
    </script>`,
    },
  },
};

export const WithAsyncContent: SidePanelStoryType = {
  args: {
    ...Basic.args,
    title: 'For Business',
    subtitle: '',
  },
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiLoader,
      UiText,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;
      const isLoading = ref(true);
      const value = inject('value');

      watch(
        value,
        (value) => {
          if (value) {
            setTimeout(() => {
              isLoading.value = false;
            }, 1000);
          } else {
            isLoading.value = true;
          }
        },
        { immediate: true },
      );

      return {
        isLoading,
        value,
        args,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
    >
      <UiLoader
        :isLoading="isLoading"
        type="skeleton"
        :loaderAttrs="{
          type: 'common'
        }"
      >
        <!-- TODO: Place side panel content. -->
      </UiLoader>
    </UiSidePanel>`,
  }),
};
WithAsyncContent.args = {
  title: 'For Business',
  subtitle: '',
};
WithAsyncContent.parameters = {
  docs: {
    source: {
      code: `<template>
    <UiSidePanel
      v-model="modelValue"
      :title="title"
      :subtitle="subtitle"
    >
      <UiLoader
        :isLoading="isLoading"
        type="skeleton"
        :loaderAttrs="{
          type: 'common'
        }"
      >
        <!-- Use default slot to place side panel content. -->
      </UiLoader>
    </UiSidePanel>
  </template>

  <script setup lang="ts">
  import {
    ref,
    onMounted,
  } from 'vue';
  import { UiSidePanel } from '@infermedica/component-library';
  import type { SidePanelProps } from '@infermedica/component-library';
  import type { LoaderProps } from "@infermedica/component-library";

  const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
  const title: SidePanelProps['title'] = '${WithAsyncContent?.args?.title}';
  const subtitle: SidePanelProps['subtitle'] = '${WithAsyncContent?.args?.subtitle}';
  const isLoading: LoaderProps['isLoading'] = true;
  
  onMounted(() => {
    setTimeout(()=>{
      isLoading.value = false;
    }}, 1000)
  })
  </script>`,
    },
  },
  chromatic: { disableSnapshot: true },
};

export const WithConditionDetails: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiButton,
      UiIcon,
      UiHeading,
      UiProgress,
      UiText,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value');

      return {
        value,
        args,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
      class="side-panel-with-condition-details"
    >
      <template #title="{title}">
        <div class="side-panel-with-condition-details__byline">
          <UiProgress value="100"/>
          <UiText class="ui-text--body-2-comfortable">Strong evidence</UiText>
        </div>
        <UiHeading>
          {{ title }}
        </UiHeading>
      </template>
      <template #default>
        <div class="side-panel-with-condition-details-section">
          <UiHeading class="side-panel-with-condition-details-section__title">About</UiHeading>
          <UiHeading 
            level="4"
            class="side-panel-with-condition-details-section__subtitle"
          >
            What is acute viral throat infection?
          </UiHeading>
          <UiText class="side-panel-with-condition-details-section__description">Acute viral tonsillopharyngitis known as sore throat is an inflammation of throat and tonsils, caused by viral infection ...</UiText>
          <UiButton class="ui-button--text side-panel-with-condition-details-section__show-more">
            <UiIcon 
              icon="chevron-down" 
              class="ui-button__icon"
            /> Show more
          </UiButton>
        </div>
      </template>
    </UiSidePanel>`,
  }),
};
WithConditionDetails.args = {
  title: 'Acute viral throat infection',
  subtitle: 'Acute viral pharyngitis',
  labelAttrs: { class: 'side-panel-with-condition-details__label' },
  textSubtitleAttrs: { class: 'ui-text--theme-secondary' },
};
WithConditionDetails.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiSidePanel
        v-model="value"
        v-bind="args"
        class="side-panel-with-condition-details"
      >
        <template #title="{title}">
          <div class="side-panel-with-condition-details__byline">
            <UiProgress :value="byline.percentage"/>
            <UiText class="ui-text--body-2-comfortable">{{ byline.label }}</UiText>
          </div>
          <UiHeading>
            {{ title }}
          </UiHeading>
        </template>
        <template #default>
          <div class="side-panel-with-condition-details-section">
            <UiHeading class="side-panel-with-condition-details-section__title">About</UiHeading>
            <UiHeading 
              level="4"
              class="side-panel-with-condition-details-section__subtitle"
            >
              What is acute viral throat infection?
            </UiHeading>
            <UiText class="side-panel-with-condition-details-section__description">Acute viral tonsillopharyngitis known as sore throat is an inflammation of throat and tonsils, caused by viral infection ...</UiText>
            <UiButton class="ui-button--text side-panel-with-condition-details-section__show-more">
              <UiIcon 
                icon="chevron-down" 
                class="ui-button__icon"
              /> Show more
            </UiButton>
          </div>
        </template>
      </UiSidePanel>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue';
    import {
      UiSidePanel,
      UiProgress,
      UiText,
      UiHeading,
      UiButton,
      UiIcon,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';

    const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
    const title: SidePanelProps['title'] = '${WithConditionDetails?.args?.title}';
    const subtitle: SidePanelProps['subtitle'] = '${WithConditionDetails?.args?.subtitle}';
    const byline = {
      label: 'Strong evidence',
      percentage: 100,
    };
    </script>

    <style lang="scss">
    @use "@infermedica/component-library/mixins";

    .side-panel-with-condition-details {
      &__label {
        display: grid;
        gap: var(--space-4);
      }
      
      &__byline {
        display: grid;
        grid-template-columns: 4rem 1fr;
        align-items: center;
        gap: var(--space-12);
      }
      
      &-section {
        @include mixins.inner-border(
        'side-panel-with-condition-details-section',
        $color: var(--color-border-subtle),
        $width: 0 0 1px 0,
        $radius: 0
        );
    
        &__title,
        &__subtitle {
          margin-block-end: var(--space-12);
        }
    
        &__description {
          margin-block-end: var(--space-24);
        }
    
        &__show-more {
          margin-block-end: var(--space-32);
        }
      }
    }
    </style>`,
    },
  },
};

export const WithReportAnIssueForm: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiButton,
      UiFormField,
      UiList,
      UiListItem,
      UiCheckbox,
      UiTextarea,
      UiIcon,
      UiHeading,
      UiLoader,
      UiProgress,
      UiText,
      UiSidePanel,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value');
      const options = [
        'It\'s too long',
        'It seems to be unrelated to me',
        'It contains complex words',
        'I\'ve already answered this question',
        'I can\'t decide which answer to choose',
        'I found a typo',
        'Other (please comment below)',
      ];
      const isProcessing = ref(true);
      onMounted(() => window.setTimeout(() => {
        isProcessing.value = false;
      }, 1000));
      const selected = ref([]);

      return {
        value,
        args,
        options,
        isProcessing,
        selected,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
    >
      <div class="report-an-issue">
        <form @submit.prevent>
          <UiText>
            What's wrong with this question?
          </UiText>
          <UiFormField>
            <UiList>
              <template
                v-for="option in options"
                :key="option"
              >
                <UiListItem>
                  <UiCheckbox
                    v-model="selected"
                    :value="option"
                    :disabled="isProcessing"
                    :class="{
                      'ui-checkbox--is-disabled': isProcessing,
                    }"
                  >
                    {{ option }}
                  </UiCheckbox>
                </UiListItem>
              </template>
            </UiList>
          </UiFormField>
          <UiFormField
            id="report-issue-textarea"
            label="Describe details"
            :hint="false"
            :errorMessage="false"
          >
            <UiTextarea
              id="comment"
              resize="vertical"
              :disabled="isProcessing"
              class="mb-6"
            />
          </UiFormField>
          <div class="report-an-issue__actions mb-6">
            <UiButton
              type="submit"
              class="me-5"
              :disabled="isProcessing"
            >
              <UiLoader
                v-if="isProcessing"
                type="ellipsis"
                transition="fade"
                tag="div"
                class="report-an-issue__submit-loader"
              />
              <span>
                Submit
              </span>
            </UiButton>
            <UiButton
              type="button"
              class="ui-button--text"
              :class="{ 'ui-button--is-disabled': isProcessing }"
              :disabled="isProcessing"
            >
              Cancel
            </UiButton>
          </div>
        </form>
      </div>
    </UiSidePanel>`,
  }),
};
WithReportAnIssueForm.args = {
  title: 'Report an issu',
  subtitle: '',
};
WithReportAnIssueForm.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiSidePanel
        v-model="modelValue"
        :title="title"
        :subtitle="subtitle"
      >
        <div class="report-an-issue">
          <form @submit.prevent>
            <UiText
              class="mb-6"
            >
              What's wrong with this question?
            </UiText>
            <UiFormField>
              <UiList>
                <template
                  v-for="option in options"
                  :key="option"
                >
                  <UiListItem>
                    <UiCheckbox
                      v-model="selected"
                      :value="option"
                      :disabled="isProcessing"
                      :class="{
                        'ui-checkbox--is-disabled': isProcessing,
                      }"
                    >
                      {{ option }}
                    </UiCheckbox>
                  </UiListItem>
                </template>
              </UiList>
            </UiFormField>
            <UiFormField
              id="report-issue-textarea"
              label="Describe details"
              :hint="false"
              :errorMessage="false"
            >
              <UiTextarea
                id="comment"
                resize="vertical"
                :disabled="isProcessing"
                class="mb-6"
              />
            </UiFormField>
            <div class="report-an-issue__actions mb-6">
              <UiButton
                type="submit"
                class="me-5"
                :disabled="isProcessing"
              >
                <UiLoader
                  v-if="isProcessing"
                  type="ellipsis"
                  transition="fade"
                  tag="div"
                  class="report-an-issue__submit-loader"
                />
                <span>
                  Submit
                </span>
              </UiButton>
              <UiButton
                type="button"
                class="ui-button--text"
                :class="{ 'ui-button--is-disabled': isProcessing }"
                :disabled="isProcessing"
              >
                Cancel
              </UiButton>
            </div>
          </form>
        </div>
      </UiSidePanel>
    </template>

    <script setup lang="ts">
    import {
      ref,
      onMounted,
    } from 'vue';
    import {
      UiButton,
      UiCheckbox,
      UiFormField,
      UiHeading,
      UiIcon,
      UiList,
      UiLoader,
      UiProgress,
      UiSidePanel,
      UiTextarea,
      UiText,
    } from '@infermedica/component-library';
    import UiListItem from '@infermedica/component-library/src/components/organisms/UiList/_internal/UiListItem.vue';
    import type { SidePanelProps } from '@infermedica/component-library';

    const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
    const title: SidePanelProps['title'] = '${WithReportAnIssueForm?.args?.title}';
    const subtitle: SidePanelProps['subtitle'] = '${WithReportAnIssueForm?.args?.subtitle}';
    const options = [
      "It's too long",
      'It seems to be unrelated to me',
      'It contains complex words',
      "I've already answered this question",
      "I can't decide which answer to choose",
      'I found a typo',
      'Other (please comment below)',
    ];
    const selected = ref([]);
    const isProcessing = ref(true);

    onMounted(() =>
      window.setTimeout(() => {
        isProcessing.value = false;
      }, 1000)
    );

    </script>

    <style lang="scss">
    .me-5 {
      margin-inline-end: 1.25rem;
    }

    .mb-6 {
      margin-bottom: 1.5rem;
    }

    .report-an-issue {
      &__actions {
        display: flex;
        justify-items: center;
      }
    }
    </style>
    `,
    },
  },
};

export const WithLabelSlot: SidePanelStoryType = {
  args: {
    ...Basic.args,
    title: 'For Business',
  },
  render: (args) => ({
    inheritAttrs: false,
    components: {
      UiHeading,
      UiText,
    },
    setup() {
      const {
        title,
        subtitle,
        headingTitleAttrs,
        textSubtitleAttrs,
      } = args;

      return {
        UiSidePanel: TemplateStories.render(args),
        title,
        subtitle,
        headingTitleAttrs,
        textSubtitleAttrs,
      };
    },
    template: `<component :is="UiSidePanel">
      <template #label="{
        title,
        subtitle,
        headingTitleAttrs,
        textSubtitleAttrs,
      }">
        <div
          v-if="title || subtitle"
          class="ui-side-panel__label"
        >
          <UiHeading
            v-if="title"
            v-bind="headingTitleAttrs"
          >
            {{ title }}
          </UiHeading>
          <UiText
            v-if="subtitle"
            v-bind="textSubtitleAttrs"
            class="ui-text--body-2-comfortable ui-side-panel__subtitle"
          >
            {{ subtitle }}
          </UiText>
        </div>
      </template>
      <UiText>
        Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage
      </UiText>
    </component>`,
  }),
};
WithLabelSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiSidePanel
        v-model="modelValue"
        :title="title"
        :subtitle="subtitle"
      >
        <template #label="{
            title,
            subtitle,
            headingTitleAttrs,
            textSubtitleAttrs
          }"
        >
          <div
            v-if="title || subtitle"
            class="ui-side-panel__label"
          >
            <UiHeading
              v-if="title"
              v-bind="headingTitleAttrs"
            >
              {{ title }}
            </UiHeading>
            <UiText
              v-if="subtitle"
              v-bind="textSubtitleAttrs"
              class="ui-text--body-2-comfortable ui-side-panel__subtitle"
            >
              {{ subtitle }}
            </UiText>
          </div>
        </template>
        <UiText>
          Triage is developed by Infermedica – the company that creates AI tools for
          preliminary medical diagnosis and triage
        </UiText>
      </UiSidePanel>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue';
    import {
      UiHeading,
      UiSidePanel,
      UiText,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';

    const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
    const title: SidePanelProps['title'] = '${WithLabelSlot?.args?.title}';
    const subtitle: SidePanelProps['subtitle'] = '${meta.args.subtitle}';

    </script>
    `,
    },
  },
};

export const WithCloseSlot: SidePanelStoryType = {
  args: {
    ...Basic.args,
    title: 'For Business',
    subtitle: '',
  },
  render: (args) => ({
    inheritAttrs: false,
    components: {
      UiHeading,
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      const {
        buttonCloseAttrs,
        iconCloseAttrs,
      } = args;

      return {
        UiSidePanel: TemplateStories.render(args),
        buttonCloseAttrs,
        iconCloseAttrs,
      };
    },
    template: `<component :is="UiSidePanel">
    <template #close="{
      buttonCloseAttrs,
      closeHandler,
      iconCloseAttrs,
    }">
      <UiButton
        v-bind="buttonCloseAttrs"
        ref="button"
        class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
        @click="closeHandler"
      >
        <UiIcon
          v-bind="iconCloseAttrs"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
    <UiText>
      Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage
    </UiText>
  </component>`,
  }),
};
WithCloseSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiSidePanel
        v-model="modelValue"
        :title="title"
        :subtitle="subtitle"
      >
        <template #close="{
          buttonCloseAttrs,
          closeHandler,
          iconCloseAttrs
          }"
        >
          <UiButton
            v-bind="buttonCloseAttrs"
            ref="button"
            class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
            @click="closeHandler"
          >
            <UiIcon
              v-bind="iconCloseAttrs"
              class="ui-button__icon"
            />
          </UiButton>
        </template>
        <UiText>
          Triage is developed by Infermedica – the company that creates AI tools for
          preliminary medical diagnosis and triage
        </UiText>
      </UiSidePanel>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue';
    import {
      UiButton,
      UiIcon,
      UiSidePanel,
      UiText,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';

    const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
    const title: SidePanelProps['title'] = '${WithCloseSlot?.args?.title}';
    const subtitle: SidePanelProps['subtitle'] = '${WithCloseSlot?.args?.subtitle}';

    </script>
    `,
    },
  },
};

export const WithHeaderSlot: SidePanelStoryType = {
  args: {
    ...Basic.args,
    title: 'For Business',
    subtitle: '',
  },
  render: (args) => ({
    inheritAttrs: false,
    components: {
      UiHeading,
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      const {
        title,
        subtitle,
        headingTitleAttrs,
        textSubtitleAttrs,
        buttonCloseAttrs,
        iconCloseAttrs,
      } = args;

      return {
        UiSidePanel: TemplateStories.render(args),
        title,
        subtitle,
        headingTitleAttrs,
        textSubtitleAttrs,
        buttonCloseAttrs,
        iconCloseAttrs,
      };
    },
    template: `<component :is="UiSidePanel">
      <template #header="{
        buttonCloseAttrs,
        closeHandler,
        title,
        subtitle,
        headingTitleAttrs,
        textSubtitleAttrs,
        iconCloseAttrs,
      }">
        <div class="ui-side-panel__header">
          <UiButton
            v-bind="buttonCloseAttrs"
            ref="button"
            class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
            @click="closeHandler"
          >
            <UiIcon
              v-bind="iconCloseAttrs"
              class="ui-button__icon"
            />
          </UiButton>
          <div
            v-if="title || subtitle"
            class="ui-side-panel__label"
          >
            <UiHeading
              v-if="title"
              v-bind="headingTitleAttrs"
            >
              {{ title }}
            </UiHeading>
            <UiText
              v-if="subtitle"
              v-bind="textSubtitleAttrs"
              class="ui-text--body-2-comfortable ui-side-panel__subtitle"
            >
              {{ subtitle }}
            </UiText>
          </div>
        </div>
      </template>
      <UiText>
        Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage
      </UiText>
    </component>`,
  }),
};
WithHeaderSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiSidePanel
        v-model="modelValue"
        :title="title"
        :subtitle="subtitle"
      >
        <template #header="{
            buttonCloseAttrs,
            closeHandler,
            title,
            subtitle,
            headingTitleAttrs,
            textSubtitleAttrs,
            iconCloseAttrs,
          }"
        >
          <div class="ui-side-panel__header">
            <UiButton
              v-bind="buttonCloseAttrs"
              ref="button"
              class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
              @click="closeHandler"
            >
              <UiIcon
                v-bind="iconCloseAttrs"
                class="ui-button__icon"
              />
            </UiButton>
            <div
              v-if="title || subtitle"
              class="ui-side-panel__label"
            >
              <UiHeading
                v-if="title"
                v-bind="headingTitleAttrs"
              >
                {{ title }}
              </UiHeading>
              <UiText
                v-if="subtitle"
                v-bind="textSubtitleAttrs"
                class="ui-text--body-2-comfortable ui-side-panel__subtitle"
              >
                {{ subtitle }}
              </UiText>
            </div>
          </div>
        </template>
        <UiText>
          Triage is developed by Infermedica – the company that creates AI tools for
          preliminary medical diagnosis and triage
        </UiText>
      </UiSidePanel>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue';
    import {
      UiButton,
      UiHeading,
      UiIcon,
      UiSidePanel,
      UiText,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';

    const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
    const title: SidePanelProps['title'] = '${WithHeaderSlot?.args?.title}';
    const subtitle: SidePanelProps['subtitle'] = '${WithHeaderSlot?.args?.subtitle}';

    </script>
    `,
    },
  },
};

export const WithBackdropSlot: SidePanelStoryType = {
  args: {
    ...Basic.args,
    title: 'For Business',
    subtitle: '',
  },
  render: (args) => ({
    inheritAttrs: false,
    components: {
      UiText,
      UiBackdrop,
    },
    setup() {
      const {
        transitionBackdropAttrs,
        backdropAttrs,
      } = args;

      const modelValue = inject('modelValue');

      return {
        UiSidePanel: TemplateStories.render(args),
        modelValue,
        transitionBackdropAttrs,
        backdropAttrs,
      };
    },
    template: `<component :is="UiSidePanel">
      <template #backdrop="{
        transitionBackdropAttrs,
        modelValue,
        backdropAttrs,
        closeHandler,
      }">
        <transition v-bind="transitionBackdropAttrs">
          <UiBackdrop
            v-if="modelValue"
            v-bind="backdropAttrs"
            @click="closeHandler"
          />
        </transition>
      </template>
      <UiText>
        Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage
      </UiText>
    </component>`,
  }),
};
WithBackdropSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiSidePanel
        v-model="modelValue"
        :title="title"
        :subtitle="subtitle"
      >
        <template #backdrop="{
            transitionBackdropAttrs,
            modelValue,
            backdropAttrs,
            closeHandler,
          }"
        >
          <transition
            v-bind="transitionBackdropAttrs"
          >
            <UiBackdrop
              v-if="modelValue"
              v-bind="backdropAttrs"
              @click="closeHandler"
            />
          </transition>
        </template>
        <UiText>
          Triage is developed by Infermedica – the company that creates AI tools for
          preliminary medical diagnosis and triage
        </UiText>
      </UiSidePanel>
    </template>

    <script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import {
      UiBackdrop,
      UiButton,
      UiSidePanel,
      UiText,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';

    const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
    const title: SidePanelProps['title'] = '${WithBackdropSlot?.args?.title}';
    const subtitle: SidePanelProps['subtitle'] = '${WithBackdropSlot?.args?.subtitle}';

    </script>
    `,
    },
  },
};

export const WithContainerSlot: SidePanelStoryType = {
  args: {
    ...Basic.args,
    title: 'For Business',
    subtitle: '',
  },
  render: (args) => ({
    inheritAttrs: false,
    components: {
      UiHeading,
      UiButton,
      UiIcon,
      UiText,
    },
    directives: {
      focusTrap,
      bodyScrollLock,
    },
    setup() {
      const {
        title,
        subtitle,
        dialogAttrs,
        transitionDialogAttrs,
        headingTitleAttrs,
        textSubtitleAttrs,
        buttonCloseAttrs,
        iconCloseAttrs,
      } = args;

      const modelValue = inject('modelValue');

      return {
        UiSidePanel: TemplateStories.render(args),
        modelValue,
        title,
        subtitle,
        dialogAttrs,
        transitionDialogAttrs,
        headingTitleAttrs,
        textSubtitleAttrs,
        buttonCloseAttrs,
        iconCloseAttrs,
      };
    },
    template: `<component :is="UiSidePanel">
      <template #container="{
        transitionDialogAttrs,
        modelValue,
        afterEnterHandler,
        buttonCloseAttrs,
        closeHandler,
        title,
        subtitle,
        iconCloseAttrs,
        headingTitleAttrs,
        textSubtitleAttrs,
        dialogAttrs,
      }">
        <transition
          v-bind="transitionDialogAttrs"
        >
          <dialog
            v-if="modelValue"
            v-focus-trap
            v-body-scroll-lock
            v-bind="dialogAttrs"
            class="ui-side-panel__dialog"
          >
            <div class="ui-side-panel__header">
              <UiButton
                v-bind="buttonCloseAttrs"
                ref="button"
                class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
                @click="closeHandler"
              >
                <UiIcon
                  v-bind="iconCloseAttrs"
                  class="ui-button__icon"
                />
              </UiButton>
              <div
                v-if="title || subtitle"
                class="ui-side-panel__label"
              >
                <UiHeading
                  v-if="title"
                  v-bind="headingTitleAttrs"
                >
                  {{ title }}
                </UiHeading>
                <UiText
                  v-if="subtitle"
                  v-bind="textSubtitleAttrs"
                  class="ui-text--body-2-comfortable ui-side-panel__subtitle"
                >
                  {{ subtitle }}
                </UiText>
              </div>
            </div>
            <div
              class="ui-side-panel__content"
            >
              <UiText>
                Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage
              </UiText>
            </div>
          </dialog>
        </transition>
      </template>
    </component>`,
  }),
};
WithContainerSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiSidePanel
        v-model="modelValue"
        :title="title"
        :subtitle="subtitle"
      >
        <template #container="{
            transitionDialogAttrs,
            dialogAttrs,
            modelValue,
            afterEnterHandler,
            buttonCloseAttrs,
            closeHandler,
            title,
            subtitle,
            iconCloseAttrs,
            headingTitleAttrs,
            textSubtitleAttrs,
          }"
        >
          <transition
            v-bind="transitionDialogAttrs"
          >
            <dialog
              v-if="modelValue"
              v-focus-trap
              v-body-scroll-lock
              v-bind="dialogAttrs"
              class="ui-side-panel__dialog"
            >
              <div class="ui-side-panel__header">
                <UiButton
                  v-bind="buttonCloseAttrs"
                  ref="button"
                  class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
                  @click="closeHandler"
                >
                  <UiIcon
                    v-bind="iconCloseAttrs"
                    class="ui-button__icon"
                  />
                </UiButton>
                <div
                  v-if="title || subtitle"
                  class="ui-side-panel__label"
                >
                  <UiHeading
                    v-if="title"
                    v-bind="headingTitleAttrs"
                  >
                    {{ title }}
                  </UiHeading>
                  <UiText
                    v-if="subtitle"
                    v-bind="textSubtitleAttrs"
                    class="ui-text--body-2-comfortable ui-side-panel__subtitle"
                  >
                    {{ subtitle }}
                  </UiText>
                </div>
              </div>
              <div class="ui-side-panel__content">
                <UiText>
                  Triage is developed by Infermedica – the company that creates AI
                  tools for preliminary medical diagnosis and triage
                </UiText>
              </div>
            </dialog>
          </transition>
        </template>
      </UiSidePanel>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue';
    import {
      focusTrap as vFocusTrap,
      bodyScrollLock as vBodyScrollLock,
    } from '@infermedica/component-library/src/utilities/directives/index.ts';
    import {
      UiButton,
      UiHeading,
      UiIcon,
      UiSidePanel,
      UiText,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';

    const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
    const title: SidePanelProps['title'] = '${WithContainerSlot?.args?.title}';
    const subtitle: SidePanelProps['subtitle'] = '${WithContainerSlot?.args?.subtitle}';

    </script>
    `,
    },
  },
};

export const WithTitleSlot: SidePanelStoryType = {
  args: {
    ...Basic.args,
    title: 'For Business',
    subtitle: '',
  },
  render: (args) => ({
    inheritAttrs: false,
    components: {
      UiHeading,
      UiText,
    },
    setup() {
      const {
        title,
        headingTitleAttrs,
      } = args;

      return {
        UiSidePanel: TemplateStories.render(args),
        title,
        headingTitleAttrs,
      };
    },
    template: `<component :is="UiSidePanel">
      <template #title="{
        title,
        headingTitleAttrs,
      }">
        <UiHeading
          v-if="title"
          v-bind="headingTitleAttrs"
        >
          {{ title }}
        </UiHeading>
      </template>
      <UiText>
        Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage
      </UiText>
    </component>`,
  }),
};
WithTitleSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiSidePanel
        v-model="modelValue"
        :title="title"
        :subtitle="subtitle"
      >
        <template #title="{
          title,
          headingTitleAttrs,
        }">
          <UiHeading
            v-if="title"
            v-bind="headingTitleAttrs"
          >
            {{ title }}
          </UiHeading>
        </template>
        <UiText>
          Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage
        </UiText>
      </UiSidePanel>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue';
    import {
      UiButton,
      UiHeading,
      UiSidePanel,
      UiText,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';

    const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
    const title: SidePanelProps['title'] = '${WithTitleSlot?.args?.title}';
    const subtitle: SidePanelProps['subtitle'] = '${WithTitleSlot?.args?.subtitle}';

    </script>`,
    },
  },
};

export const WithSubtitleSlot: SidePanelStoryType = {
  render: (args) => ({
    inheritAttrs: false,
    components: {
      UiHeading,
      UiText,
    },
    setup() {
      const {
        subtitle,
        textSubtitleAttrs,
      } = args;

      return {
        UiSidePanel: TemplateStories.render(args),
        subtitle,
        textSubtitleAttrs,
      };
    },
    template: `<component :is="UiSidePanel">
      <template #subtitle="{
        subtitle,
        textSubtitleAttrs,
      }">
        <UiText
          v-if="subtitle"
          v-bind="textSubtitleAttrs"
          class="ui-text--body-2-comfortable ui-side-panel__subtitle"
        >
          {{ subtitle }}
        </UiText>
      </template>
      <UiText>
        Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage
      </UiText>
    </component>`,
  }),
};
WithSubtitleSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiSidePanel
        v-model="modelValue"
        :title="title"
        :subtitle="subtitle"
      >
        <template #subtitle="{
          subtitle,
          textSubtitleAttrs,
        }">
          <UiText
            v-if="subtitle"
            v-bind="textSubtitleAttrs"
            class="ui-text--body-2-comfortable ui-side-panel__subtitle"
          >
            {{ subtitle }}
          </UiText>
        </template>
        <UiText>
          Triage is developed by Infermedica – the company that creates AI tools for
          preliminary medical diagnosis and triage
        </UiText>
      </UiSidePanel>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue';
    import {
      UiSidePanel,
      UiText,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';

    const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
    const title: SidePanelProps['title'] = '${meta.args.title}';
    const subtitle: SidePanelProps['subtitle'] = '${meta.args.subtitle}';

    </script>
    `,
    },
  },
};

export const WithContentSlot: SidePanelStoryType = {
  args: {
    ...Basic.args,
    title: 'For Business',
    subtitle: '',
  },
  render: (args) => ({
    inheritAttrs: false,
    components: { UiText },
    directives: {
      scrollTabindex,
      keyboardFocus,
    },
    setup() {
      const { contentAttrs } = args;

      return {
        UiSidePanel: TemplateStories.render(args),
        contentAttrs,
      };
    },
    template: `<component :is="UiSidePanel">
      <template #content="{ contentAttrs }">
        <div
          v-scroll-tabindex
          v-keyboard-focus
          v-bind="contentAttrs"
          class="ui-side-panel__content"
        >
          <UiText>
            Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage
          </UiText>
        </div>
      </template>
    </component>`,
  }),
};
WithContentSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiSidePanel
        v-model="modelValue"
        :title="title"
        :subtitle="subtitle"
      >
        <template #content="{ contentAttrs }">
          <div
            v-scroll-tabindex
            v-keyboard-focus
            v-bind="contentAttrs"
            class="ui-side-panel__content"
          >
            <UiText>
              Triage is developed by Infermedica – the company that creates AI tools
              for preliminary medical diagnosis and triage
            </UiText>
          </div>
        </template>
      </UiSidePanel>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue';
    import {
      scrollTabindex as vScrollTabindex,
      keyboardFocus as vKeyboardFocus,
    } from '@infermedica/component-library/src/utilities/directives/index.ts';
    import {
      UiSidePanel,
      UiText,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';

    const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
    const title: SidePanelProps['title'] = '${WithContentSlot?.args?.title}';
    const subtitle: SidePanelProps['subtitle'] = '${WithContentSlot?.args?.subtitle}';
    </script>
    `,
    },
  },
};

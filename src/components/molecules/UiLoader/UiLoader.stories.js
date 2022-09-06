import UiLoader from '@/components/molecules/UiLoader/UiLoader.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiContainer from '@/components/organisms/UiContainer/UiContainer.vue';
import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import UiLoaderSkeleton from '@/components/molecules/UiLoader/_internal/UiLoaderSkeleton.vue';
import UiLoaderEllipsis from '@/components/molecules/UiLoader/_internal/UiLoaderEllipsis.vue';
import UiLoaderSpinner from '@/components/molecules/UiLoader/_internal/UiLoaderSpinner.vue';
import UiSwitch from '@/components/molecules/UiSwitch/UiSwitch.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import UiAccordion from '@/components/organisms/UiAccordion/UiAccordion.vue';
import UiSimpleQuestion from '@/components/organisms/UiSimpleQuestion/UiSimpleQuestion.vue';
import UiMessage from '@/components/templates/UiMessage/UiMessage.vue';
import UiQuestion from '@/components/templates/UiQuestion/UiQuestion.vue';
import { ref, provide, inject } from 'vue';
import './UiLoader.stories.scss';

export default {
  title: 'Molecules/Loader',
  component: UiLoader,
  subcomponents: {
    UiLoaderSkeleton,
    UiLoaderSpinner,
    UiLoaderEllipsis,
  },
  args: {
    isLoading: true,
    transitionAttrs: {
      name: 'v',
      appear: true,
      mode: 'out-in',
    },
  },
  decorators: [() => ({ template: '<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 2.5rem"><story /></div>' })],
};

const SpinnerTemplate = () => ({
  components: { UiLoader, UiText },
  template: `<UiText tag="span">Large:</UiText>
  <UiLoader
    :isLoading="true"
    type="spinner"
  >
    <!-- Place the content to be loaded. -->
  </UiLoader>
  <UiLoader
    :isLoading="true"
    :loaderAttrs="{ 
      label: 'Label' 
    }"
    type="spinner"
  >
    <!-- Place the content to be loaded. -->
  </UiLoader>
  <UiText tag="span">Small:</UiText>
  <UiLoader
    :isLoading="true"
    type="spinner"
    :loader-attrs="{ 
      class: 'ui-loader-spinner--small'
    }"
  >
    <!-- Place the content to be loaded. -->
  </UiLoader>
  <UiLoader
    :isLoading="true"
    type="spinner"
    :loader-attrs="{ 
      class: 'ui-loader-spinner--small',
      label: 'Label'
    }"
  >
    <!-- Place the content to be loaded. -->
  </UiLoader>
  `,
});
export const SpinnerLoader = SpinnerTemplate.bind({});

export const SpinnerLoaderOnBrand = SpinnerTemplate.bind({});
SpinnerLoaderOnBrand.parameters = {
  backgrounds: { default: 'brand' },
};
SpinnerLoaderOnBrand.decorators = [() => ({ template: '<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 2.5rem" class="--theme-brand"><story /></div>' })];

export const SkeletonLoader = () => ({
  components: { UiLoader, UiButton, UiText },
  template: `<UiText tag="span">Common:</UiText>
  <div style="min-width: 20rem">
    <UiLoader
      :isLoading="true"
      type="skeleton"
    >
      <!-- Place the content to be loaded. -->
    </UiLoader>
  </div>
  <UiText tag="span">Question:</UiText>
  <div style="min-width: 20rem">
    <UiLoader
      :isLoading="true"
      type="skeleton"
      :loaderAttrs="{ 
        type: 'question'
      }"
    >
      <UiText>content</UiText>
    </UiLoader>
  </div>`,
});

export const LoadingButton = (args) => ({
  components: { UiLoader, UiButton, UiText },
  setup() {
    const isLoading = inject('isLoading');
    return { ...args, isLoading };
  },
  template: `<UiText tag="span">Contained:</UiText>
  <UiButton>
    <UiLoader
      :isLoading="isLoading"
      type="ellipsis"
      mode="opacity"
      :transitionAttrs="transitionAttrs"
    >
      <span>Label</span>
    </UiLoader>
  </UiButton>
  <UiText tag="span">Outlined:</UiText>
  <UiButton 
    class="ui-button--outlined" 
    style="--loader-ellipsis-dot-background: var(--color-icon-primary);"
  >
    <UiLoader
      :isLoading="isLoading"
      type="ellipsis"
      mode="opacity"
      :transitionAttrs="transitionAttrs"
    >
      <span>Label</span>
    </UiLoader>
  </UiButton>
  <UiText tag="span">Without transition:</UiText>
  <UiButton 
    class="ui-button--outlined" 
    style="--loader-ellipsis-dot-background: var(--color-icon-primary);"
  >
    <UiLoader
      :isLoading="isLoading"
      type="ellipsis"
      mode="opacity"
    >
      <span>Label</span>
    </UiLoader>
  </UiButton>`,
});
LoadingButton.decorators = [
  (story) => ({
    components: { story, UiSwitch },
    setup() {
      const isLoading = ref(true);
      provide('isLoading', isLoading);

      return { isLoading };
    },
    template: `
      <div style="flex: 1">
        <UiSwitch 
          v-model="isLoading" 
          style="margin: 0 0 1rem 0;"
        >
          {{ isLoading ? 'on' : 'off' }}
        </UiSwitch>
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 2.5rem">
          <story   v-bind="{ isLoading }" />
        </div>
      </div>
    `,
  }),
];

export const LoadingPopover = (args) => ({
  components: {
    UiLoader, UiPopover, UiText, UiMessage, UiButton,
  },
  setup() {
    const isLoading = inject('isLoading');
    return { ...args, isLoading };
  },
  template: `
    <UiPopover
    title="Upper arm"
    class="ui-popover--has-arrow loading-popover"
    :button-attrs="{
      'aria-label': 'close',
    }"
  >
    <UiLoader
      :isLoading="isLoading"
      type="skeleton"
      :loaderAttrs="{ 
        type: 'common'
      }"
      :transitionAttrs="transitionAttrs"
    >
      <UiMessage
        title="No internet connection"
        illustration="no-internet"
        :heading-title-attrs="{
          level: '4',
        }"
        class="loading-popover__message"
        :style="{
          '--message-flex-direction': 'row-reverse',
          '--message-tablet-flex-direction': 'row-reverse',
          '--message-aside-margin': '0 var(--space-12) 0 0',
          '--message-tablet-aside-margin': '0 var(--space-12) 0 0',
          '--message-content-align-self': 'flex-start',
          '--message-illustration-size': '1.5rem',
        }"
      >
        <UiText>It seems you’re offline right now. Please check your connection and try again.</UiText>
        <UiButton
            class="ui-button--text loading-popover__try-again"
        >Try again</UiButton>
      </UiMessage>
    </UiLoader>
  </UiPopover>`,
});
LoadingPopover.decorators = [
  (story) => ({
    components: { story, UiSwitch },
    setup() {
      const isLoading = ref(true);
      provide('isLoading', isLoading);

      return { isLoading };
    },
    template: `
      <div style="flex: 1">
        <UiSwitch 
          v-model="isLoading" 
          style="margin: 0 0 1rem 0;"
        >
          {{ isLoading ? 'on' : 'off' }}
        </UiSwitch>
        <story v-bind="{ isLoading }" />
      </div>
    `,
  }),
];

export const LoadingContainer = (args) => ({
  components: {
    UiLoader, UiContainer, UiText, UiHeading, UiAccordion,
  },
  setup() {
    const isLoading = inject('isLoading');
    return { ...args, isLoading };
  },
  template: `
    <UiContainer
        style="max-width: 48.75rem; width: 100%; --container-padding: var(--space-40) var(--space-48)"
    >
    <UiLoader
        :isLoading="isLoading"
        type="skeleton"
        :loaderAttrs="{ type: 'common'}"
        :transitionAttrs="transitionAttrs"
    >
      <UiHeading level="2">Lab tests</UiHeading>
      <UiHeading level="4" style="margin: var(--space-16) 0 0 0">Recommended</UiHeading>
      <UiText style="margin: var(--space-4) 0 0 0">Lab tests recommended in further diagnostic process.</UiText>
      <UiAccordion
        style="margin: var(--space-24) 0 0  0"
        :items="['Morphology', 'Rheumatology blood tests panel', 'Inflammation panel']"/>
    </UiLoader>
    </UiContainer>`,
});
LoadingContainer.decorators = [
  (story) => ({
    components: { story, UiSwitch },
    setup() {
      const isLoading = ref(true);
      provide('isLoading', isLoading);

      return { isLoading };
    },
    template: `
      <div style="flex: 1">
        <UiSwitch 
          v-model="isLoading" 
          style="margin: 0 0 1rem 0;"
        >
          {{ isLoading ? 'on' : 'off' }}
        </UiSwitch>
        <story v-bind="{ isLoading }" />
      </div>
    `,
  }),
];

export const LoadingSidePanel = () => ({
  components: {
    UiLoader, UiSidePanel, UiText, UiMessage, UiButton,
  },
  setup() {
    const isLoading = inject('isLoading');
    return { isLoading };
  },
  template: `<UiSidePanel
    :model-value="true"
    title="Why am I being asked this?"
    :button-close-attrs="{
      'aria-label': 'close panel',
    }"
    class="loading-side-panel"
  >
    <UiLoader
      :isLoading="isLoading"
      type="skeleton"
      :loaderAttrs="{ type: 'common'}"
      style="padding: var(--space-16);"
    >
      <UiMessage
          title="No internet connection"
          illustration="no-internet"
          :heading-title-attrs="{
          level: '4',
        }"
          class="loading-side-panel__message"
          :style="{
          '--message-flex-direction': 'row-reverse',
          '--message-tablet-flex-direction': 'row-reverse',
          '--message-aside-margin': '0 var(--space-12) 0 0',
          '--message-tablet-aside-margin': '0 var(--space-12) 0 0',
          '--message-content-align-self': 'flex-start',
          '--message-illustration-size': '1.5rem',
        }"
      >
        <UiText>It seems you’re offline right now. Please check your connection and try again.</UiText>
        <UiButton
            class="ui-button--text loading-side-panel__try-again"
        >Try again</UiButton>
      </UiMessage>
    </UiLoader>
  </UiSidePanel>`,
});
LoadingSidePanel.decorators = [
  (story) => ({
    components: { story, UiSwitch },
    setup() {
      const isLoading = ref(true);
      provide('isLoading', isLoading);

      return { isLoading };
    },
    template: `
      <div style="flex: 1; min-height: 320px;">
        <UiSwitch 
          v-model="isLoading"
          style="position: relative; z-index: 100; margin: 0 0 1rem 0; "
        >
          {{ isLoading ? 'on' : 'off' }}
        </UiSwitch>
        <story v-bind="{ isLoading }" />
      </div>
    `,
  }),
];

export const LoadingControls = (args) => ({
  components: {
    UiLoader, UiQuestion, UiSimpleQuestion, UiControls, UiButton,
  },
  setup() {
    const isLoading = inject('isLoading');
    const options = [
      {
        value: 'present',
        label: 'Yes',
        iconAttrs: {
          icon: 'yes',
        },
      },
      {
        value: 'absent',
        label: 'Male',
        iconAttrs: {
          icon: 'no',
        },
      },
      {
        value: 'unknown',
        label: 'Don\'t know',
        iconAttrs: {
          icon: 'dont-know',
        },
      },
    ];
    return { ...args, isLoading, options };
  },
  template: `<UiControls
      to-next="#"
      to-back="#"
      :invalid="false"
      style="max-width: 48.75rem; width: 100%;"
  >
    <UiLoader
      :isLoading="isLoading"
      type="skeleton"
      :loader-attrs="{ type: 'question'}"
      style="width: 100%"
      :transitionAttrs="transitionAttrs"
    >
      <UiQuestion
        title="Do you have a sore throat?"
        :options="{
          info: true,
          why: true,
          issue: {
            feedback: true,
          },
        }"
      >
      <UiSimpleQuestion
        model-value=""
        :options="options"
      />
      </UiQuestion>
    </UiLoader>
    <template #next>
      <UiButton>
        <UiLoader 
          :is-loading="isLoading"
          type="ellipsis"
        >
          Next
        </UiLoader>
      </UiButton>
    </template>
  </UiControls>`,
});
LoadingControls.decorators = [
  (story) => ({
    components: { story, UiSwitch },
    setup() {
      const isLoading = ref(true);
      provide('isLoading', isLoading);

      return { isLoading };
    },
    template: `
      <div style="flex: 1">
        <UiSwitch 
          v-model="isLoading"
          style="position: relative; z-index: 100; margin: 0 0 1rem 0; "
        >
          {{ isLoading ? 'on' : 'off' }}
        </UiSwitch>
        <story v-bind="{ isLoading }" />
      </div>
    `,
  }),
];

export const LoadingFullOnBrand = () => ({
  components: { UiLoader, UiText },
  setup() {
    return {};
  },
  template: `<UiLoader
    :isLoading="true"
    type="spinner"
    :loaderAttrs="{ label: 'Loading...', class: 'ui-loader-spinner--on-dark'}"
    class="ui-loader--theme-brand"
    style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;"
    :style="{background: true ? 'var(--color-background-brand)' : 'var(--color-white)'}"
  >
    <UiText>content</UiText>
  </UiLoader>`,
});
LoadingFullOnBrand.decorators = [() => ({ template: '<div style="flex: 1; min-height: 480px;"><story /></div>' })];

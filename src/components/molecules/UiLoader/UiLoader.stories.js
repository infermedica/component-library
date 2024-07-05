import UiLoader from '@/components/molecules/UiLoader/UiLoader.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiContainer from '@/components/organisms/UiContainer/UiContainer.vue';
import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import UiSwitch from '@/components/molecules/UiSwitch/UiSwitch.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import UiAccordion from '@/components/organisms/UiAccordion/UiAccordion.vue';
import UiSimpleQuestion from '@/components/organisms/UiSimpleQuestion/UiSimpleQuestion.vue';
import UiMessage from '@/components/templates/UiMessage/UiMessage.vue';
import UiQuestion from '@/components/templates/UiQuestion/UiQuestion.vue';
import { actions } from '@storybook/addon-actions';
import {
  ref,
  provide,
  inject,
  onMounted,
} from 'vue';
import './UiLoader.stories.scss';

const events = actions({ onMounted: 'onMounted' });

export default {
  title: 'Molecules/Loader',
  component: UiLoader,
  tags: [ '!autodocs' ],
  args: {
    isLoading: true,
    type: 'spinner',
    transitionType: 'if',
    tag: 'div',
    loaderAttrs: {
      type: 'question', // refers to UiLoaderSkeleton
      label: 'Loading...', // refers to UiLoaderSpinner
      textLabelAttrs: { 'data-testid': 'label-text' }, // refers to UiLoaderSpinner
      loaderSpinnerAttrs: { 'data-testid': 'spinner-loader' }, // refers to UiLoaderSpinner
    },
    transitionAttrs: { appear: true },
  },
  argTypes: {
    transitionType: {
      control: 'select',
      options: [
        'if',
        'show',
        'opacity',
      ],
    },
    type: {
      control: 'select',
      options: [
        'skeleton',
        'spinner',
        'ellipsis',
      ],
    },
    loaderAttrs: { table: { subcategory: 'Attrs props' } },
    transitionAttrs: { table: { subcategory: 'Attrs props' } },
  },
  decorators: [ () => ({
    template: `<div class="flex flex-wrap items-center gap-10">
      <story />
    </div>`,
  }) ],
};

export const Common = {
  render: (args) => ({
    components: {
      UiLoader,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiLoader
      :isLoading="isLoading"
      :type="type"
      :tranition-type="transitionType"
      :tag="tag"
      :loader-attrs="loaderAttrs"
      :transition-attrs="transitionAttrs"
      :class="[
        'loading-common',
        { 'loading-common--is-skeleton': type === 'skeleton' },
      ]"
    >
      <UiText>
        Place the content to be loaded.
      </UiText>
    </UiLoader>`,
  }),
};

const LoadingPopoverOfflineMessage = {
  components: {
    UiText,
    UiButton,
    UiMessage,
  },
  setup() {
    onMounted(() => {
      events.onMounted();
    });
  },
  template: `<UiMessage
    title="No internet connection"
    illustration="no-internet"
    :heading-title-attrs="{
        level: '4',
      }"
    class="loading-popover__message"
  >
    <UiText>
      It seems you’re offline right now. Please check your connection and try again.
    </UiText>
    <UiButton class="ui-button--text loading-popover__try-again">
      Try again
    </UiButton>
  </UiMessage>`,
};

export const IfTransitionType = {
  render: () => ({
    components: {
      UiLoader,
      LoadingPopoverOfflineMessage,
    },
    setup() {
      const isLoading = inject('isLoading', true);
      return { isLoading };
    },
    template: `<UiLoader
      :is-loading="isLoading"
      transition-type="if"
      :loader-attrs="{
        label: 'Loading...',
      }"
    >
      <LoadingPopoverOfflineMessage />
    </UiLoader>`,
  }),

  decorators: [ (story) => ({
    components: {
      story,
      UiSwitch,
    },
    setup() {
      const isLoading = ref(true);
      provide('isLoading', isLoading);

      return { isLoading };
    },
    template: `<div class="flex-1">
      <UiSwitch
        v-model="isLoading"
        class="mb-4"
      >
        {{ isLoading ? 'on' : 'off' }}
      </UiSwitch>
      <story />
    </div>`,
  }) ],
};

export const ShowTransitionType = {
  render: () => ({
    components: {
      UiLoader,
      LoadingPopoverOfflineMessage,
    },
    setup() {
      const isLoading = inject('isLoading', true);
      return { isLoading };
    },
    template: `<UiLoader
      :is-loading="isLoading"
      transition-type="show"
      :loader-attrs="{
        label: 'Loading...',
      }"
    >
      <LoadingPopoverOfflineMessage />
    </UiLoader>`,
  }),

  decorators: [ (story) => ({
    components: {
      story,
      UiSwitch,
    },
    setup() {
      const isLoading = ref(true);
      provide('isLoading', isLoading);

      return { isLoading };
    },
    template: `<div class="flex-1">
      <UiSwitch
        v-model="isLoading"
        class="mb-4"
      >
        {{ isLoading ? 'on' : 'off' }}
      </UiSwitch>
      <story />
    </div>`,
  }) ],
};

export const OpacityTransitionType = {
  render: () => ({
    components: {
      UiLoader,
      UiButton,
    },
    setup() {
      const isLoading = inject('isLoading', true);
      return { isLoading };
    },
    template: `<UiButton
      :class="{
        'ui-button--is-disabled': isLoading,
      }"
    >
      <UiLoader
        :is-loading="isLoading"
        transition-type="opacity"
        type="ellipsis"
      >
        <span>Label</span>
      </UiLoader>
    </UiButton>`,
  }),

  decorators: [ (story) => ({
    components: {
      story,
      UiSwitch,
    },
    setup() {
      const isLoading = ref(true);
      provide('isLoading', isLoading);
      return { isLoading };
    },
    template: `<div class="flex-1">
      <UiSwitch
        v-model="isLoading"
        class="mb-4"
      >
        {{ isLoading ? 'on' : 'off' }}
      </UiSwitch>
      <story />
    </div>`,
  }) ],
};

export const SpinnerLoader = {
  render: () => ({
    components: {
      UiLoader,
      UiText,
    },
    template: `<UiText tag="span">
      Large:
    </UiText>
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
    <UiText tag="span">
      Small:
    </UiText>
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
  }),
};

export const SpinnerLoaderOnBrand = {
  render: () => ({
    components: {
      UiLoader,
      UiText,
    },
    template: `<UiText tag="span">
      Large:
    </UiText>
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
    <UiText tag="span">
      Small:
    </UiText>
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
  }),

  parameters: { backgrounds: { default: 'brand' } },

  decorators: [ () => ({
    template: `<div class="flex flex-wrap items-center gap-10 --theme-brand">
      <story />
    </div>`,
  }) ],
};

export const SkeletonLoader = () => ({
  components: {
    UiLoader,
    UiText,
  },
  template: `<UiText
    tag="span"
    class="self-start"
  >
    Common:
  </UiText>
  <div class="min-w-80 self-start">
    <UiLoader
      :isLoading="true"
      type="skeleton"
    >
      <!-- Place the content to be loaded. -->
    </UiLoader>
  </div>
  <UiText
    tag="span"
    class="self-start"
  >
    Question:
  </UiText>
  <div class="min-w-80 self-start">
    <UiLoader
      :isLoading="true"
      type="skeleton"
      :loaderAttrs="{
        type: 'question'
      }"
    >
      <!-- Place the content to be loaded. -->
    </UiLoader>
  </div>`,
});

export const LoadingButton = {
  render: (args) => ({
    components: {
      UiLoader,
      UiButton,
      UiText,
    },
    setup() {
      const isLoading = inject('isLoading', true);
      return {
        ...args,
        isLoading,
      };
    },
    template: `<UiText tag="span">
      Contained:
    </UiText>
    <UiButton class="loading-button">
      <UiLoader
        :isLoading="isLoading"
        type="ellipsis"
        transition-type="opacity"
      >
        <span>Label</span>
      </UiLoader>
    </UiButton>
    <UiText tag="span">
      Outlined:
    </UiText>
    <UiButton class="ui-button--outlined loading-button loading-button--is-outlined">
      <UiLoader
        :isLoading="isLoading"
        type="ellipsis"
        transition-type="opacity"
      >
        <span>Label</span>
      </UiLoader>
    </UiButton>
    <UiText tag="span">
      Without transition:
    </UiText>
    <UiButton class="ui-button--outlined loading-button loading-button--is-outlined">
      <UiLoader
        :isLoading="isLoading"
        type="ellipsis"
        transition-type="opacity"
        name=""
      >
        <span>Label</span>
      </UiLoader>
    </UiButton>`,
  }),
};

export const LoadingPopover = {
  render: () => ({
    components: {
      UiLoader,
      UiPopover,
      LoadingPopoverOfflineMessage,
    },
    setup() {
      const isLoading = inject('isLoading', true);
      return { isLoading };
    },
    template: `<UiPopover
      title="Upper arm"
      class="ui-popover--has-arrow loading-popover"
      :button-close-attrs="{
        ariaLabel: 'close',
      }"
    >
      <UiLoader
        :isLoading="isLoading"
        type="skeleton"
        :loaderAttrs="{
          type: 'common'
        }"
      >
        <LoadingPopoverOfflineMessage/>
      </UiLoader>
    </UiPopover>`,
  }),

  decorators: [ (story) => ({
    components: {
      story,
      UiSwitch,
    },
    setup() {
      const isLoading = ref(true);
      provide('isLoading', isLoading);

      return { isLoading };
    },
    template: `<div class="flex-1">
      <UiSwitch
        v-model="isLoading"
        class="mb-4"
      >
        {{ isLoading ? 'on' : 'off' }}
      </UiSwitch>
      <story />
    </div>`,
  }) ],
};

export const LoadingContainer = {
  render: (args) => ({
    components: {
      UiLoader,
      UiContainer,
      UiText,
      UiHeading,
      UiAccordion,
    },
    setup() {
      const isLoading = inject('isLoading', true);
      return {
        ...args,
        isLoading,
      };
    },
    template: `<UiContainer class="loading-container">
      <UiLoader
        :isLoading="isLoading"
        type="skeleton"
        :loaderAttrs="{ type: 'common'}"
        :transitionAttrs="transitionAttrs"
      >
        <UiHeading level="2">
          Lab tests
        </UiHeading>
        <UiHeading
          level="4"
          class="loading-container__recommended"
        >
          Recommended
        </UiHeading>
        <UiText class="loading-container__description">
          Lab tests recommended in further diagnostic process.
        </UiText>
        <UiAccordion
          class="loading-container__accordion"
          :items="['Morphology', 'Rheumatology blood tests panel', 'Inflammation panel']"/>
      </UiLoader>
    </UiContainer>`,
  }),

  decorators: [ (story) => ({
    components: {
      story,
      UiSwitch,
    },
    setup() {
      const isLoading = ref(true);
      provide('isLoading', isLoading);

      return { isLoading };
    },
    template: `<div class="flex-1">
      <UiSwitch
        v-model="isLoading"
        class="mb-4"
      >
        {{ isLoading ? 'on' : 'off' }}
      </UiSwitch>
      <story />
    </div>`,
  }) ],
};

export const LoadingSidePanel = {
  render: () => ({
    components: {
      UiLoader,
      UiSidePanel,
      LoadingPopoverOfflineMessage,
    },
    setup() {
      const isLoading = inject('isLoading', true);
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
        :loaderAttrs="{
          type: 'common'
        }"
        class="loading-side-panel__loader"
      >
        <LoadingPopoverOfflineMessage/>
      </UiLoader>
    </UiSidePanel>`,
  }),

  decorators: [ (story) => ({
    components: {
      story,
      UiSwitch,
    },
    setup() {
      const isLoading = ref(true);
      provide('isLoading', isLoading);

      return { isLoading };
    },
    template: `<div class="flex-1 min-h-135">
      <UiSwitch
        v-model="isLoading"
        class="relative z-10 mb-4"
      >
        {{ isLoading ? 'on' : 'off' }}
      </UiSwitch>
      <story />
    </div>`,
  }) ],
};

export const LoadingControls = {
  render: () => ({
    components: {
      UiLoader,
      UiQuestion,
      UiSimpleQuestion,
      UiControls,
      UiButton,
    },
    setup() {
      const isLoading = inject('isLoading', true);
      const items = [
        {
          value: 'present',
          label: 'Yes',
          iconAttrs: { icon: 'yes' },
        },
        {
          value: 'absent',
          label: 'Male',
          iconAttrs: { icon: 'no' },
        },
        {
          value: 'unknown',
          label: "Don't know",
          iconAttrs: { icon: 'dont-know' },
        },
      ];
      return {
        isLoading,
        items,
      };
    },
    template: `<UiControls
      to-next="#"
      to-back="#"
      :invalid="false"
      class="loading-controls"
    >
      <UiLoader
        :isLoading="isLoading"
        type="skeleton"
        :loader-attrs="{ type: 'question'}"
        class="loading-controls__loader"
      >
        <UiQuestion
          title="Do you have a sore throat?"
          :settings="{
            info: true,
            why: true,
            issue: {
              feedback: true,
            },
          }"
        >
          <UiSimpleQuestion
            model-value=""
            :items="items"
          />
        </UiQuestion>
      </UiLoader>
      <template #next>
        <UiButton>
          <UiLoader
            :is-loading="isLoading"
            type="ellipsis"
            transition-type="opacity"
            name=""
          >
            Next
          </UiLoader>
        </UiButton>
      </template>
    </UiControls>`,
  }),

  decorators: [ (story) => ({
    components: {
      story,
      UiSwitch,
    },
    setup() {
      const isLoading = ref(true);
      provide('isLoading', isLoading);

      return { isLoading };
    },
    template: `<div class="flex-1">
      <UiSwitch
        v-model="isLoading"
        class="mb-4"
      >
        {{ isLoading ? 'on' : 'off' }}
      </UiSwitch>
      <story />
    </div>`,
  }) ],
};

export const LoadingFullOnBrand = {
  render: () => ({
    components: {
      UiLoader,
      UiText,
    },
    setup() {
      return {};
    },
    template: `<UiLoader
      :isLoading="true"
      type="spinner"
      :loaderAttrs="{
        label: 'Loading...',
        class: 'ui-loader-spinner--on-dark'
      }"
      class="loading-full-on-brand ui-loader--theme-brand"
    >
      <!-- Place the content to be loaded. -->
    </UiLoader>`,
  }),

  parameters: { backgrounds: { default: 'brand' } },

  decorators: [ () => ({
    template: `<div class="flex-1 min-h-135">
      <story />
    </div>`,
  }) ],
};

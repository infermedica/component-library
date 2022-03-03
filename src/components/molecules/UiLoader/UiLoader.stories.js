
import UiLoader from '@/components/molecules/UiLoader/UiLoader.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiContainer from '@/components/organisms/UiContainer/UiContainer.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import UiControls from '@/components/organisms/UiControls/UiControls.vue';

export default {
  title: 'Molecules/Loader',
  component: UiLoader,
  subcomponents: {},
  args: {
    tag: 'div',
    transition: 'fade',
    loaderAttrs: {},
    isLoading: true,
    type: 'spinner',
  },
  argTypes: {
    tag: { control: 'text' },
    transition: { control: 'text' },
  },
  parameters: {
    cssprops: [],
  },
};
const Template = (args) => ({
  components: { UiLoader },
  setup() {
    return { ...args };
  },
  template: `<UiLoader
    :is-loading="isLoading"
    :loader-attrs="loaderAttrs"
    :type="type"
    :transition="transition"
    class="absolute w-full h-full flex justify-center items-center"
  >It seems you’re offline right now. Please check your connection and try again.</UiLoader>`,
});

export const Spinner = Template.bind({});
Spinner.parameters = {
  layout: 'fullscreen',
};
Spinner.decorators = [() => ({ template: '<div style="min-height: 320px;"><story /></div>' })];

export const SpinnerOnDark = (args) => ({
  components: { UiLoader },
  setup() {
    return { ...args };
  },
  template: `<UiLoader
    :is-loading="isLoading"
    :loader-attrs="loaderAttrs"
    :type="type"
    :transition="transition"
    :tag="tag"
    class="absolute w-full h-full flex justify-center items-center"
    style="background: var(--color-blue-600)"
  >
    It seems you’re offline right now. Please check your connection and try again.
  </UiLoader>`,
});
SpinnerOnDark.args = {
  loaderAttrs: {
    class: 'ui-loader-spinner--on-dark',
  },
};
SpinnerOnDark.parameters = {
  layout: 'fullscreen',
};
SpinnerOnDark.decorators = [() => ({ template: '<div style="min-height: 320px;"><story /></div>' })];

export const LoadingButton = (args) => ({
  components: { UiLoader, UiButton },
  setup() {
    return { ...args };
  },
  template: `<UiButton class="relative">
    <UiLoader
      :is-loading="isLoading"
      :loader-attrs="loaderAttrs"
      :type="type"
      :transition="transition"
      :tag="tag"
      class="absolute"
    />
    <span :class="{ 'opacity-0': isLoading }">
      Next
    </span>
  </UiButton>`,
});
LoadingButton.args = {
  type: 'ellipsis',
};

export const LoadingPopover = (args) => ({
  components: { UiLoader, UiPopover },
  setup() {
    return { ...args };
  },
  template: `<UiPopover
    title="Loading..."
    class="max-w-80 ui-popover--has-arrow"
    style="--popover-content-padding: 0"
    :button-attrs="{
      'aria-label': 'close',
    }"
  >
    <UiLoader
      :is-loading="isLoading"
      :loader-attrs="loaderAttrs"
      :type="type"
      :transition="transition"
      :tag="tag"
      style="padding: var(--space-16)"
    />
  </UiPopover>`,
});
LoadingPopover.args = {
  type: 'skeleton',
};

export const LoadingContainer = (args) => ({
  components: { UiLoader, UiContainer },
  setup() {
    return { ...args };
  },
  template: `<UiContainer
    class="max-w-195 w-full"
    style="--container-padding: var(--space-40) var(--space-48);"
  >
    <UiLoader
      :is-loading="isLoading"
      :loader-attrs="loaderAttrs"
      :type="type"
      :transition="transition"
      :tag="tag"
    />
  </UiContainer>`,
});
LoadingContainer.args = {
  type: 'skeleton',
};

export const LoadingSidePanel = (args) => ({
  components: { UiLoader, UiSidePanel },
  setup() {
    return { ...args };
  },
  template: `<UiSidePanel
    :model-value="true"
    title="Loading..."
    :button-close-attrs="{
      'aria-label': 'close panel',
    }"
  >
    <UiLoader
      :is-loading="isLoading"
      :loader-attrs="loaderAttrs"
      :type="type"
      :transition="transition"
      :tag="tag"
    />
  </UiSidePanel>`,
});
LoadingSidePanel.args = {
  type: 'skeleton',
};
LoadingSidePanel.decorators = [() => ({ template: '<div style="--backdrop-position: absolute; --side-panel-position: absolute; --side-panel-z-index: 0; min-height: 320px;"><story /></div>' })];

export const LoadingControls = (args) => ({
  components: { UiLoader, UiControls },
  setup() {
    return { ...args };
  },
  template: `<UiControls
    to-next="#"
    to-back="#"
    :invalid="false"
    class="max-w-195 w-full"
  >
    <UiLoader
      :is-loading="isLoading"
      :loader-attrs="loaderAttrs"
      :type="type"
      :transition="transition"
      :tag="tag"
      class="w-full"
    />
  </UiControls>`,
});
LoadingControls.args = {
  type: 'skeleton',
  loaderAttrs: { type: 'question' },
};

const Skeleton = (args) => ({
  components: { UiLoader, UiContainer },
  setup() {
    return { ...args };
  },
  template: `<UiContainer
    class="max-w-195 w-full"
    style="--container-padding: var(--space-40) var(--space-48);"
  >
    <UiLoader
      :is-loading="isLoading"
      :loader-attrs="loaderAttrs"
      :type="type"
      :transition="transition"
      :tag="tag"
    />
  </UiContainer>`,
});

export const SkeletonCommon = Skeleton.bind({});
SkeletonCommon.args = {
  type: 'skeleton',
  loaderAttrs: { type: 'common' },
};

export const SkeletonQuestion = Skeleton.bind({});
SkeletonQuestion.args = {
  type: 'skeleton',
  loaderAttrs: { type: 'question' },
};

import UiLoader from '@/components/molecules/UiLoader/UiLoader.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiContainer from '@/components/organisms/UiContainer/UiContainer.vue';
import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import UiLoaderSkeleton from '@/components/molecules/UiLoader/_internal/UiLoaderSkeleton.vue';
import UiLoaderEllipsis from '@/components/molecules/UiLoader/_internal/UiLoaderEllipsis.vue';
import UiLoaderSpinner from '@/components/molecules/UiLoader/_internal/UiLoaderSpinner.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';

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
  },
  decorators: [() => ({ template: '<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 2.5rem"><story /></div>' })],
};

const SpinnerTemplate = (args) => ({
  components: { UiLoader, UiText },
  setup() {
    return args;
  },
  template: `<UiText tag="span">Large:</UiText>
  <UiLoader
    :isLoading="isLoading"
    type="spinner"
  >
    <UiText>content</UiText>
  </UiLoader>
  <UiLoader
    :isLoading="isLoading"
    :loaderAttrs="{ label: 'Label' }"
    type="spinner"
  >
    <UiText>content</UiText>
  </UiLoader>
  <UiText tag="span">Small:</UiText>
  <UiLoader
    :isLoading="isLoading"
    type="spinner"
    :loader-attrs="{ class: 'ui-loader-spinner--small'}"
  >
    <UiText>content</UiText>
  </UiLoader>
  <UiLoader
    :isLoading="isLoading"
    type="spinner"
    :loader-attrs="{ class: 'ui-loader-spinner--small', label: 'Label' }"
  >
    <UiText>content</UiText>
  </UiLoader>
  `,
});
export const SpinnerLoader = SpinnerTemplate.bind({});

export const SpinnerLoaderOnBrand = SpinnerTemplate.bind({});
SpinnerLoaderOnBrand.parameters = {
  backgrounds: { default: 'brand' },
};
SpinnerLoaderOnBrand.decorators = [() => ({ template: '<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 2.5rem" class="--theme-brand"><story /></div>' })];

export const SkeletonLoader = (args) => ({
  components: { UiLoader, UiButton, UiText },
  setup() {
    return args;
  },
  template: `<UiText tag="span">Common:</UiText>
  <div style="min-width: 320px">
    <UiLoader
      :isLoading="isLoading"
      type="skeleton"
    >
      <UiText>content</UiText>
    </UiLoader>
  </div>
  <UiText tag="span">Question:</UiText>
  <div style="min-width: 320px">
    <UiLoader
      :isLoading="isLoading"
      type="skeleton"
      :loaderAttrs="{ type: 'question'}"
    >
      <UiText>content</UiText>
    </UiLoader>
  </div>`,
});

export const LoadingButton = (args) => ({
  components: { UiLoader, UiButton, UiText },
  setup() {
    return args;
  },
  template: `<UiText tag="span">Contained:</UiText>
  <UiButton>
    <UiLoader
      :isLoading="isLoading"
      type="ellipsis"
    >
      <span>{{"Some long text"}}</span>
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
    >
      <span>{{"Label"}}</span>
    </UiLoader>
  </UiButton>`,
});
LoadingButton.decorators = [() => ({ template: '<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 2.5rem"><story /></div>' })];

export const LoadingPopover = (args) => ({
  components: {
    UiLoader, UiPopover, UiText,
  },
  setup() {
    return args;
  },
  template: `<UiPopover
    title="Loading..."
    class="ui-popover--has-arrow"
    style="--popover-content-padding: var(--space-16); max-width: 20rem;"
    :button-attrs="{
      'aria-label': 'close',
    }"
  >
    <UiLoader
      :isLoading="isLoading"
      type="skeleton"
      :loaderAttrs="{ type: 'common'}"
    >
      <UiText>content</UiText>
    </UiLoader>
  </UiPopover>`,
});
LoadingPopover.decorators = [() => ({ template: '<div style="flex: 1;"><story /></div>' })];

export const LoadingContainer = (args) => ({
  components: { UiLoader, UiContainer, UiText },
  setup() {
    return args;
  },
  template: `<UiContainer
    style="max-width: 48.75rem; width: 100%; --container-padding: var(--space-40) var(--space-48)"
  >
    <UiLoader
      :isLoading="isLoading"
      type="skeleton"
      :loaderAttrs="{ type: 'question'}"
    >
      <UiText>content</UiText>
    </UiLoader>
  </UiContainer>`,
});
LoadingContainer.decorators = [() => ({ template: '<div style="flex: 1;"><story /></div>' })];

export const LoadingSidePanel = (args) => ({
  components: { UiLoader, UiSidePanel, UiText },
  setup() {
    return args;
  },
  template: `<UiSidePanel
    :model-value="true"
    title="Loading..."
    :button-close-attrs="{
      'aria-label': 'close panel',
    }"
  >
    <UiLoader
      :isLoading="isLoading"
      type="skeleton"
      :loaderAttrs="{ type: 'common'}"
      style="padding: var(--space-16);"
    >
      <UiText>content</UiText>
    </UiLoader>
  </UiSidePanel>`,
});

LoadingSidePanel.decorators = [() => ({ template: '<div style="flex: 1; min-height: 320px; position: relative; --side-panel-position: absolute; --backdrop-position: absolute;"><story /></div>' })];

export const LoadingControls = (args) => ({
  components: { UiLoader, UiControls, UiText },
  setup() {
    return args;
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
    >
      <UiText>content</UiText>
    </UiLoader>
  </UiControls>
  `,
});
LoadingControls.decorators = [() => ({ template: '<div style="flex: 1; min-height: 320px;"><story /></div>' })];

export const LoadingFullOnBrand = (args) => ({
  components: { UiLoader, UiText },
  setup() {
    return args;
  },
  template: `<UiLoader
    :isLoading="isLoading"
    type="spinner"
    :loaderAttrs="{ label: 'Loading...', class: 'ui-loader-spinner--on-dark'}"
    class="ui-loader--theme-brand"
    style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;"
    :style="{background: isLoading ? 'var(--color-background-brand)' : 'var(--color-white)'}"
  >
    <UiText>content</UiText>
  </UiLoader>`,
});
LoadingFullOnBrand.decorators = [() => ({ template: '<div style="flex: 1; min-height: 480px;"><story /></div>' })];

import UiLoader from '@/components/molecules/UiLoader/UiLoader.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiContainer from '@/components/organisms/UiContainer/UiContainer.vue';
import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';

export default {
  title: 'Molecules/Loader',
  component: UiLoader,
  subcomponents: {
  },
  args: {
  },
  argTypes: {
  },
  decorators: [() => ({
    template: '<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 2.5rem"><story /></div>',
  })],
};

const SpinnerTemplate = (args) => ({
  components: {
    UiLoader,
    UiText,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiText tag="span">Large:</UiText>
  <UiLoader
    :is-loading="true"
    type="spinner"
    transition="fade"
  >
    {{"content"}}
  </UiLoader>
  <UiLoader
    :is-loading="true"
    type="spinner"
    transition="fade"
    :loader-attrs="{ label: 'Label' }"
  >
    {{"content"}}
  </UiLoader>
  <UiText tag="span">Small:</UiText>
  <UiLoader
    :is-loading="true"
    type="spinner"
    transition="fade"
    :loader-attrs="{ class: 'ui-loader-spinner--small'}"
  >
    {{"content"}}
  </UiLoader>
  <UiLoader
    :is-loading="true"
    type="spinner"
    transition="fade"
    :loader-attrs="{ class: 'ui-loader-spinner--small', label: 'Label' }"
  >
    {{"content"}}
  </UiLoader>`,
});
export const SpinnerLoader = SpinnerTemplate.bind({
});

export const SpinnerLoaderOnBrand = SpinnerTemplate.bind({
});
SpinnerLoaderOnBrand.parameters = {
  backgrounds: {
    default: 'brand',
  },
};
SpinnerLoaderOnBrand.decorators = [() => ({
  template: '<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 2.5rem" class="--theme-brand"><story /></div>',
})];

export const SkeletonLoader = () => ({
  components: {
    UiLoader,
    UiButton,
    UiText,
  },
  template: `<UiText tag="span">Common:</UiText>
  <div style="min-width: 320px">
    <UiLoader
      :is-loading="true"
      type="skeleton"
      transition="fade"
    >
      {{"content"}}
    </UiLoader>
  </div>
  <UiText tag="span">Question:</UiText>
  <div style="min-width: 320px">
    <UiLoader
      :is-loading="true"
      type="skeleton"
      transition="fade"
      :loader-attrs="{ type: 'question'}"
    >
      {{"content"}}
    </UiLoader>
  </div>`,
});

export const LoadingButton = () => ({
  components: {
    UiLoader,
    UiButton,
    UiText,
  },
  template: `<UiText tag="span">Contained:</UiText>
  <UiButton>
    <UiLoader
      :is-loading="true"
      type="ellipsis"
      style="position: absolute;"
    /><span style="opacity: 0;">{{"Label"}}</span>
  </UiButton>
  <UiText tag="span">Outlined:</UiText>
  <UiButton 
    class="ui-button--outlined" 
    style="--loader-ellipsis-dot-background: var(--color-icon-primary);"
  >
    <UiLoader
      :is-loading="true"
      type="ellipsis"
      style="position: absolute;"
    /><span style="opacity: 0;">{{"Label"}}</span>
  </UiButton>`,
});
LoadingButton.decorators = [() => ({
  template: '<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 2.5rem"><story /></div>',
})];

export const LoadingPopover = () => ({
  components: {
    UiLoader,
    UiPopover,
  },
  template: `<UiPopover
    title="Loading..."
    class="ui-popover--has-arrow"
    style="--popover-content-padding: 0; max-width: 20rem;"
    :button-attrs="{
      'aria-label': 'close',
    }"
  >
    <UiLoader
      :is-loading="true"
      type="skeleton"
      transition="fade"
      :loader-attrs="{ type: 'common'}"
      style="padding: 0 var(--space-16) var(--space-16);"
    >
      {{"content"}}
    </UiLoader>
  </UiPopover>`,
});
LoadingPopover.decorators = [() => ({
  template: '<div style="flex: 1;"><story /></div>',
})];

export const LoadingContainer = () => ({
  components: {
    UiLoader,
    UiContainer,
  },
  template: `<UiContainer
    style="max-width: 48.75rem; width: 100%; --container-padding: var(--space-40) var(--space-48)"
  >
    <UiLoader
      :is-loading="true"
      type="skeleton"
      transition="fade"
      :loader-attrs="{ type: 'question'}"
      style="padding: var(--space-16);"
    >
      {{"content"}}
    </UiLoader>
  </UiContainer>`,
});
LoadingContainer.decorators = [() => ({
  template: '<div style="flex: 1;"><story /></div>',
})];

export const LoadingSidePanel = () => ({
  components: {
    UiLoader,
    UiSidePanel,
  },
  template: `<UiSidePanel
    :model-value="true"
    title="Loading..."
    :button-close-attrs="{
      'aria-label': 'close panel',
    }"
  >
    <UiLoader
      :is-loading="true"
      type="skeleton"
      transition="fade"
      :loader-attrs="{ type: 'common'}"
      style="padding: var(--space-16);"
    >
      {{"content"}}
    </UiLoader>
  </UiSidePanel>`,
});
LoadingSidePanel.decorators = [() => ({
  template: '<div style="flex: 1; min-height: 320px;"><story /></div>',
})];

export const LoadingControls = () => ({
  components: {
    UiLoader,
    UiControls,
  },
  template: `<UiControls
    to-next="#"
    to-back="#"
    :invalid="false"
    style="max-width: 48.75rem; width: 100%;"
  >
    <UiLoader
      :is-loading="true"
      type="skeleton"
      transition="fade"
      :loader-attrs="{ type: 'question'}"
      style="width: 100%;"
    >
      {{"content"}}
    </UiLoader>
  </UiControls>`,
});
LoadingControls.decorators = [() => ({
  template: '<div style="flex: 1; min-height: 320px;"><story /></div>',
})];

export const LoadingFullOnBrand = () => ({
  components: {
    UiLoader,
  },
  template: `<div 
    style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; align-items: center; justify-content: center; background: var(--color-background-brand);"
  >
   <UiLoader
     :is-loading="true"
     :type="spinner"
     :loader-attrs="{ label: 'Loading...' }"
     class="ui-loader--theme-brand"
   >
     {{"content"}}
   </UiLoader>
  </div>`,
});
LoadingFullOnBrand.decorators = [() => ({
  template: '<div style="flex: 1; min-height: 480px;"><story /></div>',
})];

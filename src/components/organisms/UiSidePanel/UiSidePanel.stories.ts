import {
  inject,
  onMounted,
  provide,
  ref,
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
import {
  useArgTypes,
  extendEvents,
} from '@sb/helpers';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import deepmerge from 'deepmerge';
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

const events = extendEvents([
  'update:modelValue',
  'after-enter',
]);
const { argTypes } = useArgTypes(deepmerge(UiSidePanel, events));

const TOS = {
  components: {
    UiBulletPoints,
    UiBulletPointsItem,
    UiHeading,
    UiLink,
  },
  template: `
  <UiHeading>
    §1. General Provisions
  </UiHeading>  
  <UiBulletPoints
    tag="ol"
    class="tos"
  >
    <UiBulletPointsItem>
      These Terms of Service specify:
      <UiBulletPoints
        tag="ol"
        type="a"
        class="ui-bullet-points--nested tos__sub-points"
      >
        <UiBulletPointsItem>
          principles of operation of the website and the mobile application "<UiLink href="#">Symptomate.com</UiLink>",
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          rules on the provision of services by electronic means,
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          the rights and obligations of the Service Provider and the Service Recipients.
        </UiBulletPointsItem>
      </UiBulletPoints>
    </UiBulletPointsItem>
    <UiBulletPointsItem>
      Whenever these Terms of Service refer to:
      <UiBulletPoints
        tag="ol"
        type="a"
        class="ui-bullet-points--nested tos__sub-points"
      >
        <UiBulletPointsItem>
          Application, this means the software for portable devices, made available free of charge by the Service Provider referred to in sec. 2(l) below, enabling the use of the Services referred to in sec. 2(k) below,
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          Articles, this means articles referring to medical and pharmaceutical topics,
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          License, this means a non-exclusive, royalty-free license granted to Users referred to in sec. 2(m) below to use the Application or Website referred to in sec. 2(j) below,
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          Terms of Service, this means these Terms of Service,
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          GDPR, this means Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of individuals with regard to the processing of personal data and on the free movement of such data and repealing Directive 95/46/EC (General Data Protection Regulation) (OJ L 119, p. 1),
        </UiBulletPointsItem>
      </UiBulletPoints>
    </UiBulletPointsItem>
  </UiBulletPoints>`,
};

const meta = {
  title: 'Organisms/UiSidePanelTS',
  component: UiSidePanel,
  args: {
    modelValue: true,
    title: 'Terms of Service',
    subtitle: 'Last updated: 26/11/2020',
    transitionBackdropAttrs: { 'data-testid': 'backdrop-transition' },
    backdropAttrs: { 'data-testid': 'backdrop' },
    dialogAttrs: { 'data-testid': 'dialog-element' },
    transitionDialogAttrs: { 'data-testid': 'dialog-transition' },
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
  argTypes: { ...argTypes },
  decorators: [ (story, { args }) => ({
    components: {
      UiButton,
      UiHeading,
      UiSidePanel,
      story,
    },
    setup(props, { attrs }) {
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
        ...restArgs
      } = attrs;

      const modelValue = ref(args.modelValue);

      const toggleSidePanel = () => {
        modelValue.value = !modelValue.value;
      };
      provide('modelValue', modelValue);
      return {
        toggleSidePanel,
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
        args: { ...restArgs },
      };
    },
    template: `<div class="max-w-32 min-h-80">
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <UiSidePanel
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
        <story />
      </UiSidePanel>
    </div>`,
  }) ],
  parameters: { chromatic: { disableSnapshot: true } },
} satisfies SidePanelMetaType;

export default meta;

export const Basic: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { TOS },
    template: '<TOS />',
  }),
};
Basic.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <UiSidePanel
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
        <UiHeading> §1. General Provisions </UiHeading>
        <UiBulletPoints tag="ol" class="tos">
          <UiBulletPointsItem>
            These Terms of Service specify:
            <UiBulletPoints
              tag="ol"
              type="a"
              class="ui-bullet-points--nested tos__sub-points"
            >
              <UiBulletPointsItem>
                principles of operation of the website and the mobile application
                "<UiLink href="#">Symptomate.com</UiLink>",
              </UiBulletPointsItem>
              <UiBulletPointsItem>
                rules on the provision of services by electronic means,
              </UiBulletPointsItem>
              <UiBulletPointsItem>
                the rights and obligations of the Service Provider and the Service
                Recipients.
              </UiBulletPointsItem>
            </UiBulletPoints>
          </UiBulletPointsItem>
          <UiBulletPointsItem>
            Whenever these Terms of Service refer to:
            <UiBulletPoints
              tag="ol"
              type="a"
              class="ui-bullet-points--nested tos__sub-points"
            >
              <UiBulletPointsItem>
                Application, this means the software for portable devices, made
                available free of charge by the Service Provider referred to in sec.
                2(l) below, enabling the use of the Services referred to in sec.
                2(k) below,
              </UiBulletPointsItem>
              <UiBulletPointsItem>
                Articles, this means articles referring to medical and
                pharmaceutical topics,
              </UiBulletPointsItem>
              <UiBulletPointsItem>
                License, this means a non-exclusive, royalty-free license granted to
                Users referred to in sec. 2(m) below to use the Application or
                Website referred to in sec. 2(j) below,
              </UiBulletPointsItem>
              <UiBulletPointsItem>
                Terms of Service, this means these Terms of Service,
              </UiBulletPointsItem>
              <UiBulletPointsItem>
                GDPR, this means Regulation (EU) 2016/679 of the European Parliament
                and of the Council of 27 April 2016 on the protection of individuals
                with regard to the processing of personal data and on the free
                movement of such data and repealing Directive 95/46/EC (General Data
                Protection Regulation) (OJ L 119, p. 1),
              </UiBulletPointsItem>
            </UiBulletPoints>
          </UiBulletPointsItem>
        </UiBulletPoints>
      </UiSidePanel>
    </template>
    
    <script setup lang="ts">
    import { ref } from 'vue';
    import {
      UiBulletPoints,
      UiButton,
      UiHeading,
      UiLink,
      UiSidePanel,
    } from '@infermedica/component-library';
    import UiBulletPointsItem from '@infermedica/component-library/src/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
    import type { SidePanelProps } from '@infermedica/component-library';
    
    const modelValue = ref<SidePanelProps['modelValue']>(true);
    const title: SidePanelProps['title'] = 'Terms of Service';
    const subtitle: SidePanelProps['subtitle'] = 'Last updated: 26/11/2020';
    const transitionBackdropAttrs: SidePanelProps['transitionBackdropAttrs'] = {
      'data-testid': 'backdrop-transition',
    };
    const backdropAttrs: SidePanelProps['backdropAttrs'] = {
      'data-testid': 'backdrop',
    };
    const dialogAttrs: SidePanelProps['dialogAttrs'] = {
      'data-testid': 'dialog-element',
    };
    const transitionDialogAttrs: SidePanelProps['transitionDialogAttrs'] = {
      'data-testid': 'dialog-transition',
    };
    const headingTitleAttrs: SidePanelProps['headingTitleAttrs'] = {
      'data-testid': 'title-heading',
    };
    const textSubtitleAttrs: SidePanelProps['textSubtitleAttrs'] = {
      'data-testid': 'subtitle-text',
    };
    const buttonCloseAttrs: SidePanelProps['buttonCloseAttrs'] = {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    };
    const iconCloseAttrs: SidePanelProps['iconCloseAttrs'] = {
      'data-testid': 'close-icon',
      icon: 'close',
    };
    const contentAttrs: SidePanelProps['contentAttrs'] = {
      'data-testid': 'content-element',
    };
    
    const toggleSidePanel = () => {
      modelValue.value = !modelValue.value;
    };
    </script>
      `,
    },
  },
};

export const WithLabelSlot: SidePanelStoryType = {
  args: {
    ...Basic.args,
    title: 'For Business',
  },
  render: () => ({
    inheritAttrs: false,
    components: {
      UiHeading,
      UiText,
    },
    setup(props, { attrs }) {
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
        ...args
      } = attrs;

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
        args: { ...args },
      };
    },
    template: `
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
    <template #default>
      <UiText>
        Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage
      </UiText>
    </template>`,
  }),
};
WithLabelSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <UiSidePanel
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
      UiButton,
      UiHeading,
      UiSidePanel,
      UiText,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';
    
    const modelValue = ref<SidePanelProps['modelValue']>(true);
    const title: SidePanelProps['title'] = 'For Business';
    const subtitle: SidePanelProps['subtitle'] = 'Last updated: 26/11/2020';
    const transitionBackdropAttrs: SidePanelProps['transitionBackdropAttrs'] = {
      'data-testid': 'backdrop-transition',
    };
    const backdropAttrs: SidePanelProps['backdropAttrs'] = {
      'data-testid': 'backdrop',
    };
    const dialogAttrs: SidePanelProps['dialogAttrs'] = {
      'data-testid': 'dialog-element',
    };
    const transitionDialogAttrs: SidePanelProps['transitionDialogAttrs'] = {
      'data-testid': 'dialog-transition',
    };
    const headingTitleAttrs: SidePanelProps['headingTitleAttrs'] = {
      'data-testid': 'title-heading',
    };
    const textSubtitleAttrs: SidePanelProps['textSubtitleAttrs'] = {
      'data-testid': 'subtitle-text',
    };
    const buttonCloseAttrs: SidePanelProps['buttonCloseAttrs'] = {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    };
    const iconCloseAttrs: SidePanelProps['iconCloseAttrs'] = {
      'data-testid': 'close-icon',
      icon: 'close',
    };
    const contentAttrs: SidePanelProps['contentAttrs'] = {
      'data-testid': 'content-element',
    };
    
    const toggleSidePanel = () => {
      modelValue.value = !modelValue.value;
    };
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
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiHeading,
      UiButton,
      UiIcon,
      UiText,
    },
    setup(props, { attrs }) {
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
        ...args
      } = attrs;

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
        args: { ...args },
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
  </UiSidePanel>`,
  }),
};
WithCloseSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <UiSidePanel
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
    
    const modelValue = ref<SidePanelProps['modelValue']>(true);
    const title: SidePanelProps['title'] = 'For Business';
    const subtitle: SidePanelProps['subtitle'] = '';
    const transitionBackdropAttrs: SidePanelProps['transitionBackdropAttrs'] = {
      'data-testid': 'backdrop-transition',
    };
    const backdropAttrs: SidePanelProps['backdropAttrs'] = {
      'data-testid': 'backdrop',
    };
    const dialogAttrs: SidePanelProps['dialogAttrs'] = {
      'data-testid': 'dialog-element',
    };
    const transitionDialogAttrs: SidePanelProps['transitionDialogAttrs'] = {
      'data-testid': 'dialog-transition',
    };
    const headingTitleAttrs: SidePanelProps['headingTitleAttrs'] = {
      'data-testid': 'title-heading',
    };
    const textSubtitleAttrs: SidePanelProps['textSubtitleAttrs'] = {
      'data-testid': 'subtitle-text',
    };
    const buttonCloseAttrs: SidePanelProps['buttonCloseAttrs'] = {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    };
    const iconCloseAttrs: SidePanelProps['iconCloseAttrs'] = {
      'data-testid': 'close-icon',
      icon: 'close',
    };
    const contentAttrs: SidePanelProps['contentAttrs'] = {
      'data-testid': 'content-element',
    };
    
    const toggleSidePanel = () => {
      modelValue.value = !modelValue.value;
    };
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
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiHeading,
      UiButton,
      UiIcon,
      UiText,
    },
    setup(props, { attrs }) {
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
        ...args
      } = attrs;

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
        args: { ...args },
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
  </UiSidePanel>`,
  }),
};
WithHeaderSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <UiSidePanel
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
    
    const modelValue = ref<SidePanelProps['modelValue']>(true);
    const title: SidePanelProps['title'] = 'For Business';
    const subtitle: SidePanelProps['subtitle'] = '';
    const transitionBackdropAttrs: SidePanelProps['transitionBackdropAttrs'] = {
      'data-testid': 'backdrop-transition',
    };
    const backdropAttrs: SidePanelProps['backdropAttrs'] = {
      'data-testid': 'backdrop',
    };
    const dialogAttrs: SidePanelProps['dialogAttrs'] = {
      'data-testid': 'dialog-element',
    };
    const transitionDialogAttrs: SidePanelProps['transitionDialogAttrs'] = {
      'data-testid': 'dialog-transition',
    };
    const headingTitleAttrs: SidePanelProps['headingTitleAttrs'] = {
      'data-testid': 'title-heading',
    };
    const textSubtitleAttrs: SidePanelProps['textSubtitleAttrs'] = {
      'data-testid': 'subtitle-text',
    };
    const buttonCloseAttrs: SidePanelProps['buttonCloseAttrs'] = {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    };
    const iconCloseAttrs: SidePanelProps['iconCloseAttrs'] = {
      'data-testid': 'close-icon',
      icon: 'close',
    };
    const contentAttrs: SidePanelProps['contentAttrs'] = {
      'data-testid': 'content-element',
    };
    
    const toggleSidePanel = () => {
      modelValue.value = !modelValue.value;
    };
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
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiHeading,
      UiButton,
      UiIcon,
      UiText,
      UiBackdrop,
    },
    setup(props, { attrs }) {
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
        ...args
      } = attrs;

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
        args: { ...args },
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
  </UiSidePanel>`,
  }),
};
WithBackdropSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <UiSidePanel
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
        <template #backdrop="{
            transitionBackdropAttrs,
            modelValue,
            backdropAttrs,
            closeHandler,
          }"
        >
          <transition v-bind="transitionBackdropAttrs">
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
    
    const modelValue = ref<SidePanelProps['modelValue']>(true);
    const title: SidePanelProps['title'] = 'For Business';
    const subtitle: SidePanelProps['subtitle'] = '';
    const transitionBackdropAttrs: SidePanelProps['transitionBackdropAttrs'] = {
      'data-testid': 'backdrop-transition',
    };
    const backdropAttrs: SidePanelProps['backdropAttrs'] = {
      'data-testid': 'backdrop',
    };
    const dialogAttrs: SidePanelProps['dialogAttrs'] = {
      'data-testid': 'dialog-element',
    };
    const transitionDialogAttrs: SidePanelProps['transitionDialogAttrs'] = {
      'data-testid': 'dialog-transition',
    };
    const headingTitleAttrs: SidePanelProps['headingTitleAttrs'] = {
      'data-testid': 'title-heading',
    };
    const textSubtitleAttrs: SidePanelProps['textSubtitleAttrs'] = {
      'data-testid': 'subtitle-text',
    };
    const buttonCloseAttrs: SidePanelProps['buttonCloseAttrs'] = {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    };
    const iconCloseAttrs: SidePanelProps['iconCloseAttrs'] = {
      'data-testid': 'close-icon',
      icon: 'close',
    };
    const contentAttrs: SidePanelProps['contentAttrs'] = {
      'data-testid': 'content-element',
    };
    
    const toggleSidePanel = () => {
      modelValue.value = !modelValue.value;
    };
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
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiHeading,
      UiButton,
      UiIcon,
      UiText,
    },
    directives: {
      focusTrap,
      bodyScrollLock,
    },
    setup(props, { attrs }) {
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
        ...args
      } = attrs;

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
        args: { ...args },
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
  </UiSidePanel>`,
  }),
};
WithContainerSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <UiSidePanel
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
    
    const modelValue = ref<SidePanelProps['modelValue']>(true);
    const title: SidePanelProps['title'] = 'For Business';
    const subtitle: SidePanelProps['subtitle'] = '';
    const transitionBackdropAttrs: SidePanelProps['transitionBackdropAttrs'] = {
      'data-testid': 'backdrop-transition',
    };
    const backdropAttrs: SidePanelProps['backdropAttrs'] = {
      'data-testid': 'backdrop',
    };
    const dialogAttrs: SidePanelProps['dialogAttrs'] = {
      'data-testid': 'dialog-element',
    };
    const transitionDialogAttrs: SidePanelProps['transitionDialogAttrs'] = {
      'data-testid': 'dialog-transition',
    };
    const headingTitleAttrs: SidePanelProps['headingTitleAttrs'] = {
      'data-testid': 'title-heading',
    };
    const textSubtitleAttrs: SidePanelProps['textSubtitleAttrs'] = {
      'data-testid': 'subtitle-text',
    };
    const buttonCloseAttrs: SidePanelProps['buttonCloseAttrs'] = {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    };
    const iconCloseAttrs: SidePanelProps['iconCloseAttrs'] = {
      'data-testid': 'close-icon',
      icon: 'close',
    };
    const contentAttrs: SidePanelProps['contentAttrs'] = {
      'data-testid': 'content-element',
    };
    
    const toggleSidePanel = () => {
      modelValue.value = !modelValue.value;
    };
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
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiHeading,
      UiText,
    },
    setup(props, { attrs }) {
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
        ...args
      } = attrs;

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
        args: { ...args },
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
  </UiSidePanel>`,
  }),
};
WithTitleSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <UiSidePanel
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
    
    const modelValue = ref<SidePanelProps['modelValue']>(true);
    const title: SidePanelProps['title'] = 'For Business';
    const subtitle: SidePanelProps['subtitle'] = '';
    const transitionBackdropAttrs: SidePanelProps['transitionBackdropAttrs'] = {
      'data-testid': 'backdrop-transition',
    };
    const backdropAttrs: SidePanelProps['backdropAttrs'] = {
      'data-testid': 'backdrop',
    };
    const dialogAttrs: SidePanelProps['dialogAttrs'] = {
      'data-testid': 'dialog-element',
    };
    const transitionDialogAttrs: SidePanelProps['transitionDialogAttrs'] = {
      'data-testid': 'dialog-transition',
    };
    const headingTitleAttrs: SidePanelProps['headingTitleAttrs'] = {
      'data-testid': 'title-heading',
    };
    const textSubtitleAttrs: SidePanelProps['textSubtitleAttrs'] = {
      'data-testid': 'subtitle-text',
    };
    const buttonCloseAttrs: SidePanelProps['buttonCloseAttrs'] = {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    };
    const iconCloseAttrs: SidePanelProps['iconCloseAttrs'] = {
      'data-testid': 'close-icon',
      icon: 'close',
    };
    const contentAttrs: SidePanelProps['contentAttrs'] = {
      'data-testid': 'content-element',
    };
    
    const toggleSidePanel = () => {
      modelValue.value = !modelValue.value;
    };
    </script>`,
    },
  },
};

export const WithSubtitleSlot: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiHeading,
      UiText,
    },
    setup(props, { attrs }) {
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
        ...args
      } = attrs;

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
        args: { ...args },
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
  </UiSidePanel>`,
  }),
};
WithSubtitleSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <UiSidePanel
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
      UiButton,
      UiHeading,
      UiSidePanel,
      UiText,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';
    
    const modelValue = ref<SidePanelProps['modelValue']>(true);
    const title: SidePanelProps['title'] = 'Terms of Service';
    const subtitle: SidePanelProps['subtitle'] = 'Last updated: 26/11/2020';
    const transitionBackdropAttrs: SidePanelProps['transitionBackdropAttrs'] = {
      'data-testid': 'backdrop-transition',
    };
    const backdropAttrs: SidePanelProps['backdropAttrs'] = {
      'data-testid': 'backdrop',
    };
    const dialogAttrs: SidePanelProps['dialogAttrs'] = {
      'data-testid': 'dialog-element',
    };
    const transitionDialogAttrs: SidePanelProps['transitionDialogAttrs'] = {
      'data-testid': 'dialog-transition',
    };
    const headingTitleAttrs: SidePanelProps['headingTitleAttrs'] = {
      'data-testid': 'title-heading',
    };
    const textSubtitleAttrs: SidePanelProps['textSubtitleAttrs'] = {
      'data-testid': 'subtitle-text',
    };
    const buttonCloseAttrs: SidePanelProps['buttonCloseAttrs'] = {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    };
    const iconCloseAttrs: SidePanelProps['iconCloseAttrs'] = {
      'data-testid': 'close-icon',
      icon: 'close',
    };
    const contentAttrs: SidePanelProps['contentAttrs'] = {
      'data-testid': 'content-element',
    };
    
    const toggleSidePanel = () => {
      modelValue.value = !modelValue.value;
    };
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
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiText,
    },
    directives: {
      scrollTabindex,
      keyboardFocus,
    },
    setup(props, { attrs }) {
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
        ...args
      } = attrs;

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
        args: { ...args },
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
  </UiSidePanel>`,
  }),
};
WithContentSlot.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <UiSidePanel
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
      UiButton,
      UiSidePanel,
      UiText,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';
    
    const modelValue = ref<SidePanelProps['modelValue']>(true);
    const title: SidePanelProps['title'] = 'For Business';
    const subtitle: SidePanelProps['subtitle'] = '';
    const transitionBackdropAttrs: SidePanelProps['transitionBackdropAttrs'] = {
      'data-testid': 'backdrop-transition',
    };
    const backdropAttrs: SidePanelProps['backdropAttrs'] = {
      'data-testid': 'backdrop',
    };
    const dialogAttrs: SidePanelProps['dialogAttrs'] = {
      'data-testid': 'dialog-element',
    };
    const transitionDialogAttrs: SidePanelProps['transitionDialogAttrs'] = {
      'data-testid': 'dialog-transition',
    };
    const headingTitleAttrs: SidePanelProps['headingTitleAttrs'] = {
      'data-testid': 'title-heading',
    };
    const textSubtitleAttrs: SidePanelProps['textSubtitleAttrs'] = {
      'data-testid': 'subtitle-text',
    };
    const buttonCloseAttrs: SidePanelProps['buttonCloseAttrs'] = {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    };
    const iconCloseAttrs: SidePanelProps['iconCloseAttrs'] = {
      'data-testid': 'close-icon',
      icon: 'close',
    };
    const contentAttrs: SidePanelProps['contentAttrs'] = {
      'data-testid': 'content-element',
    };
    
    const toggleSidePanel = () => {
      modelValue.value = !modelValue.value;
    };
    </script>    
    `,
    },
  },
};

export const WithAsyncContentSlot: SidePanelStoryType = {
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
        ...args
      } = attrs;

      const modelValue = inject('modelValue');
      const isLoading = ref(true);
      // TODO: isLoading on each open sidepanel
      onMounted(() => window.setTimeout(() => {
        isLoading.value = false;
      }, 1000));

      return {
        modelValue,
        isLoading,
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
        args: { ...args },
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
      <UiText>
        Triage is developed by Infermedica – the company that creates AI tools
        for preliminary medical diagnosis and triage
      </UiText>
    </UiLoader>
  </UiSidePanel>`,
  }),
};
WithAsyncContentSlot.parameters = {
  docs: {
    source: {
      code: `<template>
    <UiButton
      class="ui-button--text ui-button--theme-secondary"
      @click="toggleSidePanel"
    >
      {{ title }}
    </UiButton>
    <UiSidePanel
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
      <UiLoader
        :isLoading="isLoading"
        type="skeleton"
        :loaderAttrs="{
          type: 'common'
        }"
        class="loading-side-panel__loader"
      >
        <UiText>
          Triage is developed by Infermedica – the company that creates AI tools
          for preliminary medical diagnosis and triage
        </UiText>
      </UiLoader>
    </UiSidePanel>
  </template>
  
  <script setup lang="ts">
  import { 
    ref, 
    onMounted,
  } from 'vue';
  import {
    scrollTabindex as vScrollTabindex,
    keyboardFocus as vKeyboardFocus,
  } from '@infermedica/component-library/src/utilities/directives/index.ts';
  import {
    UiButton,
    UiLoader,
    UiSidePanel,
    UiText,
  } from '@infermedica/component-library';
  import type { SidePanelProps } from '@infermedica/component-library';
  
  const modelValue = ref<SidePanelProps['modelValue']>(true);
  const title: SidePanelProps['title'] = 'For Business';
  const subtitle: SidePanelProps['subtitle'] = '';
  const transitionBackdropAttrs: SidePanelProps['transitionBackdropAttrs'] = {
    'data-testid': 'backdrop-transition',
  };
  const backdropAttrs: SidePanelProps['backdropAttrs'] = {
    'data-testid': 'backdrop',
  };
  const dialogAttrs: SidePanelProps['dialogAttrs'] = {
    'data-testid': 'dialog-element',
  };
  const transitionDialogAttrs: SidePanelProps['transitionDialogAttrs'] = {
    'data-testid': 'dialog-transition',
  };
  const headingTitleAttrs: SidePanelProps['headingTitleAttrs'] = {
    'data-testid': 'title-heading',
  };
  const textSubtitleAttrs: SidePanelProps['textSubtitleAttrs'] = {
    'data-testid': 'subtitle-text',
  };
  const buttonCloseAttrs: SidePanelProps['buttonCloseAttrs'] = {
    'data-testid': 'close-button',
    ariaLabel: 'close modal',
  };
  const iconCloseAttrs: SidePanelProps['iconCloseAttrs'] = {
    'data-testid': 'close-icon',
    icon: 'close',
  };
  const contentAttrs: SidePanelProps['contentAttrs'] = {
    'data-testid': 'content-element',
  };
  
  const toggleSidePanel = () => {
    modelValue.value = !modelValue.value;
  };
  const isLoading = ref(true);
    onMounted(() => window.setTimeout(() => {
      isLoading.value = false;
  }, 1000));
  </script>
  `,
    },
  },
};

export const SidePanelShowingDetails: SidePanelStoryType = {
  args: {
    ...Basic.args,
    title: 'Show Details',
    subtitle: 'Acute viral pharyngitis',
  },
  render: () => ({
    inheritAttrs: false,
    components: {
      UiButton,
      UiIcon,
      UiHeading,
      UiProgress,
      UiSidePanel,
      UiText,
    },
    setup(props, { attrs }) {
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
        ...args
      } = attrs;

      const modelValue = inject('modelValue');
      const heading = 'Acute viral throat infection';

      return {
        modelValue,
        title,
        subtitle,
        heading,
        transitionBackdropAttrs,
        backdropAttrs,
        dialogAttrs,
        transitionDialogAttrs,
        headingTitleAttrs,
        textSubtitleAttrs,
        buttonCloseAttrs,
        iconCloseAttrs,
        contentAttrs,
        args: { ...args },
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
    class="loading-side-panel"
    >
    <template #label>
      <div class="label-slot">
      <div class="label-slot-subtitle">
        <UiProgress
          class="label-slot-pill"
          :value="70"
        />
        <UiText
          class="ui-text--body-2-comfortable"
        >
          Moderate evidence
        </UiText>
      </div>
      <UiHeading
        level="1"
        class="ui-heading--h2"
        >
        {{ heading }}
      </UiHeading>
      <UiText
        class="ui-text--body-2-comfortable"
      >
        {{ subtitle }}
      </UiText>
    </div> 
    </template>
    <div class="condition__section">
      <UiHeading level="2">
        About
      </UiHeading>
      <UiHeading level="5">
        What is acute viral throat infection?
      </UiHeading>
      <UiText class="mt-3 mb-6">
        Acute viral tonsillopharyngitis known as sore throat is an inflammation of throat and tonsils, caused by viral infection ...
      </UiText>
      <UiButton class="ui-button--text">
        <UiIcon icon="chevron-down" />
        Show details
      </UiButton>
    </div>
  </UiSidePanel>`,
  }),
};
SidePanelShowingDetails.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <UiSidePanel
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
        class="loading-side-panel"
      >
        <template #label>
          <div class="label-slot">
            <div class="label-slot-subtitle">
              <UiProgress class="label-slot-pill" :value="70" />
              <UiText class="ui-text--body-2-comfortable">
                {{ evidence }}
              </UiText>
            </div>
            <UiHeading level="1" class="ui-heading--h2">
              {{ heading }}
            </UiHeading>
            <UiText class="ui-text--body-2-comfortable">
              {{ subtitle }}
            </UiText>
          </div>
        </template>
        <div class="condition__section">
          <UiHeading level="2"> About </UiHeading>
          <UiHeading level="5"> What is acute viral throat infection? </UiHeading>
          <UiText class="mt-3 mb-6">
            Acute viral tonsillopharyngitis known as sore throat is an inflammation
            of throat and tonsils, caused by viral infection ...
          </UiText>
          <UiButton class="ui-button--text">
            <UiIcon icon="chevron-down" />
            Show details
          </UiButton>
        </div>
      </UiSidePanel>
    </template>
    
    <script setup lang="ts">
    import { ref } from 'vue';
    import {
      UiButton,
      UiHeading,
      UiIcon,
      UiSidePanel,
      UiProgress,
      UiText,
    } from '@infermedica/component-library';
    import type { SidePanelProps } from '@infermedica/component-library';
    
    const modelValue = ref<SidePanelProps['modelValue']>(true);
    const title: SidePanelProps['title'] = 'Show Details';
    const subtitle: SidePanelProps['subtitle'] = 'Acute viral pharyngitis';
    const transitionBackdropAttrs: SidePanelProps['transitionBackdropAttrs'] = {
      'data-testid': 'backdrop-transition',
    };
    const backdropAttrs: SidePanelProps['backdropAttrs'] = {
      'data-testid': 'backdrop',
    };
    const dialogAttrs: SidePanelProps['dialogAttrs'] = {
      'data-testid': 'dialog-element',
    };
    const transitionDialogAttrs: SidePanelProps['transitionDialogAttrs'] = {
      'data-testid': 'dialog-transition',
    };
    const headingTitleAttrs: SidePanelProps['headingTitleAttrs'] = {
      'data-testid': 'title-heading',
    };
    const textSubtitleAttrs: SidePanelProps['textSubtitleAttrs'] = {
      'data-testid': 'subtitle-text',
    };
    const buttonCloseAttrs: SidePanelProps['buttonCloseAttrs'] = {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    };
    const iconCloseAttrs: SidePanelProps['iconCloseAttrs'] = {
      'data-testid': 'close-icon',
      icon: 'close',
    };
    const contentAttrs: SidePanelProps['contentAttrs'] = {
      'data-testid': 'content-element',
    };
    const heading = 'Acute viral throat infection';
    const evidence = 'Moderate evidence';
    
    const toggleSidePanel = () => {
      modelValue.value = !modelValue.value;
    };
    </script>
    
    <style lang="scss">
    .mt-3 {
      margin-top: 0.75rem;
    }
    
    .mb-6 {
      margin-bottom: 1.5rem;
    }
    
    .label-slot {
      --progress-width: 32px;
    
      &-subtitle {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        margin: var(--space-4) 0 0 0;
      }
      
      .ui-progress {
        width: var(--progress-width, 100%);
        margin: 0 var(--space-8) 0 0;
      }
    }
    </style>`,
    },
  },
};

export const SidePanelWithForm: SidePanelStoryType = {
  args: {
    ...Basic.args,
    title: 'Report an issue',
    subtitle: '',
  },
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
      UiSidePanel,
      UiText,
    },
    setup(props, { attrs }) {
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
        ...args
      } = attrs;

      const modelValue = inject('modelValue');
      const heading = 'Acute viral throat infection';

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
        modelValue,
        title,
        subtitle,
        heading,
        transitionBackdropAttrs,
        backdropAttrs,
        dialogAttrs,
        transitionDialogAttrs,
        headingTitleAttrs,
        textSubtitleAttrs,
        buttonCloseAttrs,
        iconCloseAttrs,
        contentAttrs,
        options,
        isProcessing,
        selected,
        args: { ...args },
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
    class="loading-side-panel"
    >
    <div class="report-an-issue">
      <form @submit.prevent>
      <UiText class="mb-6">What's wrong with this question?</UiText>
        <UiFormField
          class="report-an-issue__issues"
        >
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
              class="report-an-issue__submit me-5"
              :class="{ 'report-an-issue__submit--disabled': isProcessing }"
              :disabled="isProcessing"
            >
              <UiLoader
                v-if="isProcessing"
                type="ellipsis"
                transition="fade"
                tag="div"
                class="report-an-issue__submit-loader"
              />
              <span
                class="report-an-issue__submit-label"
                :class="{ 'report-an-issue__submit-label--hidden': isProcessing }"
              >
                Submit
              </span>
            </UiButton>
            <UiButton
              type="button"
              class="report-an-issue__cancel ui-button--text"
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
SidePanelWithForm.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiSidePanel
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
        class="loading-side-panel"
      >
        <div class="report-an-issue">
          <form @submit.prevent>
            <UiText class="mb-6">What's wrong with this question?</UiText>
            <UiFormField class="report-an-issue__issues">
              <UiList>
                <template v-for="option in options" :key="option">
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
                class="report-an-issue__submit me-5"
                :class="{ 'report-an-issue__submit--disabled': isProcessing }"
                :disabled="isProcessing"
              >
                <UiLoader
                  v-if="isProcessing"
                  type="ellipsis"
                  transition="fade"
                  tag="div"
                  class="report-an-issue__submit-loader"
                />
                <span
                  class="report-an-issue__submit-label"
                  :class="{ 'report-an-issue__submit-label--hidden': isProcessing }"
                >
                  Submit
                </span>
              </UiButton>
              <UiButton
                type="button"
                class="report-an-issue__cancel ui-button--text"
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
    import { ref, onMounted } from 'vue';
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
    
    const modelValue = ref<SidePanelProps['modelValue']>(true);
    const title: SidePanelProps['title'] = 'Show Details';
    const subtitle: SidePanelProps['subtitle'] = 'Acute viral pharyngitis';
    const transitionBackdropAttrs: SidePanelProps['transitionBackdropAttrs'] = {
      'data-testid': 'backdrop-transition',
    };
    const backdropAttrs: SidePanelProps['backdropAttrs'] = {
      'data-testid': 'backdrop',
    };
    const dialogAttrs: SidePanelProps['dialogAttrs'] = {
      'data-testid': 'dialog-element',
    };
    const transitionDialogAttrs: SidePanelProps['transitionDialogAttrs'] = {
      'data-testid': 'dialog-transition',
    };
    const headingTitleAttrs: SidePanelProps['headingTitleAttrs'] = {
      'data-testid': 'title-heading',
    };
    const textSubtitleAttrs: SidePanelProps['textSubtitleAttrs'] = {
      'data-testid': 'subtitle-text',
    };
    const buttonCloseAttrs: SidePanelProps['buttonCloseAttrs'] = {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    };
    const iconCloseAttrs: SidePanelProps['iconCloseAttrs'] = {
      'data-testid': 'close-icon',
      icon: 'close',
    };
    const contentAttrs: SidePanelProps['contentAttrs'] = {
      'data-testid': 'content-element',
    };
    const heading = 'Acute viral throat infection';
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
    
    const toggleSidePanel = () => {
      modelValue.value = !modelValue.value;
    };
    
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

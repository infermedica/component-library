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
  UiHeading,
  UiIcon,
  UiLink,
  UiLoader,
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
      story,
      UiButton,
    },
    setup() {
      const modelValue = ref(args.modelValue);
      const toggleSidePanel = () => {
        modelValue.value = !modelValue.value;
      };
      provide('modelValue', modelValue);
      return {
        toggleSidePanel,
        title: args.title,
      };
    },
    template: `<div class="max-w-32 min-h-80">
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <story/>
    </div>`,
  }) ],
} satisfies SidePanelMetaType;

export default meta;

export const Basic: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiHeading,
      TOS,
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
    <TOS />
  </UiSidePanel>`,
  }),
};

export const WithLabelSlot: SidePanelStoryType = {
  args: {
    ...Basic.args,
    title: 'For Business',
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
      Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:
    </UiText>
  </UiSidePanel>`,
  }),
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
      Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:
    </UiText>
  </UiSidePanel>`,
  }),
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
    Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:
  </UiText>
  </UiSidePanel>`,
  }),
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
      Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:
    </UiText>
  </UiSidePanel>`,
  }),
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
              Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:
            </UiText>
          </div>
        </dialog>
      </transition>
    </template>
  </UiSidePanel>`,
  }),
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
      Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:
    </UiText>
  </UiSidePanel>`,
  }),
};

export const WithSubtitleSlot: SidePanelStoryType = {
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
      Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:
    </UiText>
  </UiSidePanel>`,
  }),
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
      UiHeading,
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
          Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:
        </UiText>
      </div>
    </template>
  </UiSidePanel>`,
  }),
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
      UiHeading,
      UiLoader,
      UiText,
      TOS,
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
      const isLoaded = ref(true);
      onMounted(() => window.setTimeout(() => {
        isLoaded.value = false;
      }, 1000));

      return {
        modelValue,
        isLoaded,
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
      :isLoading="isLoaded"
      type="skeleton"
      :loaderAttrs="{
        type: 'common'
      }"
      class="loading-side-panel__loader"
    >
      <TOS />
    </UiLoader>
  </UiSidePanel>`,
  }),
};

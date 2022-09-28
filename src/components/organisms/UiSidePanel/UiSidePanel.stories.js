import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import UiBackdrop from '@/components/atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiLink from '@/components/atoms/UiLink/UiLink.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import {
  onMounted,
  ref,
} from 'vue';
import { actions } from '@storybook/addon-actions';
import {
  focusTrap,
  bodyScrollLock,
  scrollTabindex,
  keyboardFocus,
} from '@/utilities/directives';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onAfterEnter: 'after-enter',
});

export default {
  title: 'Organisms/SidePanel',
  component: UiSidePanel,
  subcomponents: {
    UiBackdrop,
    UiButton,
    UiIcon,
    UiHeading,
    UiText,
  },
  args: {
    initModelValue: true,
    title: 'For business',
    subtitle: '',
    transitionBackdropAttrs: { 'data-testid': 'backdrop-transition' },
    backdropAttrs: { 'data-testid': 'backdrop' },
    transitionDialogAttrs: { 'data-testid': 'dialog-transition' },
    headingTitleAttrs: { 'data-testid': 'title-heading' },
    textSubtitleAttrs: { 'data-testid': 'subtitle-text' },
    buttonCloseAttrs: {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    },
    iconCloseAttrs: { 'data-testid': 'close-icon' },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'boolean',
    },
    title: {
      description: 'Use this props to set side panel title.',
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
      control: 'text',
    },
    titleSlot: {
      name: 'title',
      description: 'Use this slot to replace title template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
    subtitle: {
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
      control: 'text',
    },
    subtitleSlot: {
      name: 'subtitle',
      description: 'Use this slot to replace subtitle template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
    modelValue: { control: false },
    'after-enter': { description: 'Use this event to detect when side panel enter transition is finishing.' },
  },
  decorators: [() => ({
    template: `<div class="max-w-32" style="min-height: 320px;">
        <story />
    </div>`,
  })],
  parameters: { docs: { description: { component: 'SidePanel use `v-body-scroll-lock`. Only works on Canvas mode.' } } },
};

const Template = (args) => ({
  components: {
    UiSidePanel,
    UiButton,
    UiHeading,
    UiBulletPoints,
    UiBulletPointsItem,
    UiText,
    UiLink,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiButton
      class="ui-button--text ui-button--theme-secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
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
    @update:modelValue="onUpdateModelValue"
    @after-enter="onAfterEnter"
  >
    <UiHeading>§1. General Provisions</UiHeading>
    <UiBulletPoints tag="ol">
      <UiBulletPointsItem style="margin: var(--space-32) 0">
        <UiText>These Terms of Service specify:</UiText>
        <UiBulletPoints
          tag="ol"
          type="a"
        >
          <UiBulletPointsItem>
            <UiText>principles of operation of the website and the mobile application "<UiLink href="#">Triage.com</UiLink>",</UiText>
          </UiBulletPointsItem>
          <UiBulletPointsItem>
            <UiText>rules on the provision of services by electronic means,</UiText>
          </UiBulletPointsItem>
          <UiBulletPointsItem>
            <UiText>the rights and obligations of the Service Provider and the Service Recipients.</UiText>
          </UiBulletPointsItem>
        </UiBulletPoints>
      </UiBulletPointsItem>
      <UiBulletPointsItem style="margin: var(--space-32) 0">
        <UiText>Whenever these Terms of Service refer to:</UiText>
        <UiBulletPoints
          tag="ol"
          type="a"
        >
          <UiBulletPointsItem>
            <UiText>Application, this means the software for portable devices, made available free of charge by the Service Provider referred to in sec. 2(l) below, enabling the use of the Services referred to in sec. 2(k) below,</UiText>
          </UiBulletPointsItem>
          <UiBulletPointsItem>
            <UiText>Articles, this means articles referring to medical and pharmaceutical topics,</UiText>
          </UiBulletPointsItem>
          <UiBulletPointsItem>
            <UiText>License, this means a non-exclusive, royalty-free license granted to Users referred to in sec. 2(m) below to use the Application or Website referred to in sec. 2(j) below,</UiText>
          </UiBulletPointsItem>
          <UiBulletPointsItem>
            <UiText>Terms of Service, this means these Terms of Service,</UiText>
          </UiBulletPointsItem>
          <UiBulletPointsItem>
            <UiText>GDPR, this means Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of individuals with regard to the processing of personal data and on the free movement of such data and repealing Directive 95/46/EC (General Data Protection Regulation) (OJ L 119, p. 1),</UiText>
          </UiBulletPointsItem>
        </UiBulletPoints>
      </UiBulletPointsItem>
    </UiBulletPoints>
  </UiSidePanel>`,
});

export const TermsOfService = Template.bind({});
TermsOfService.args = {
  title: 'Terms of Service',
  subtitle: 'Last updated: Nov 26th, 2020',
};

export const WithBackdropSlot = (args) => ({
  components: {
    UiSidePanel,
    UiButton,
    UiText,
    UiBackdrop,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiButton
      class="ui-button--text ui-button--theme-secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
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
    @update:modelValue="onUpdateModelValue"
    @after-enter="onAfterEnter"
  >
    <template 
      #backdrop="{
        attrs,
        modelValue,
        backdropAttrs,
        closeHandler,
      }"
    >
      <transition v-bind="attrs">
        <UiBackdrop
          v-if="modelValue"
          v-bind="backdropAttrs"
          @click="closeHandler"
        />
      </transition>
    </template>
    <UiText>Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
  </UiSidePanel>`,
});

export const WithContainerSlot = (args) => ({
  components: {
    UiSidePanel,
    UiButton,
    UiText,
    UiHeading,
    UiIcon,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiButton
      class="ui-button--text ui-button--theme-secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
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
    @update:modelValue="onUpdateModelValue"
    @after-enter="onAfterEnter"
  >
    <template 
      #container="{
        attrs,
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
        v-bind="attrs"
      >
        <dialog
          v-if="modelValue"
          v-focus-trap
          v-body-scroll-lock
          class="ui-side-panel__dialog"
        >
          <div class="ui-side-panel__header">
            <!-- @slot Use this slot to replace close template. -->
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
            <UiText>Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
          </div>
        </dialog>
      </transition>
    </template>
  </UiSidePanel>`,
});

export const WithHeaderSlot = (args) => ({
  components: {
    UiSidePanel,
    UiButton,
    UiText,
    UiHeading,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiButton
      class="ui-button--text ui-button--theme-secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
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
    @update:modelValue="onUpdateModelValue"
    @after-enter="onAfterEnter"
  >
    <template 
      #header="{
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
    <UiText>Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
  </UiSidePanel>`,
});

export const WithCloseSlot = (args) => ({
  components: {
    UiSidePanel,
    UiButton,
    UiText,
    UiHeading,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiButton
      class="ui-button--text ui-button--theme-secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
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
    @update:modelValue="onUpdateModelValue"
    @after-enter="onAfterEnter"
  >
    <template 
      #close="{
        attrs,
        closeHandler,
        iconCloseAttrs,
      }"
    >
      <UiButton
        v-bind="attrs"
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
    <UiText>Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
  </UiSidePanel>`,
});

export const WithLabelSlot = (args) => ({
  components: {
    UiSidePanel,
    UiButton,
    UiText,
    UiHeading,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiButton
      class="ui-button--text ui-button--theme-secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
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
    @update:modelValue="onUpdateModelValue"
    @after-enter="onAfterEnter"
  >
    <template 
      #label="{
        title,
        subtitle,
        headingTitleAttrs,
        textSubtitleAttrs,
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
    <UiText>Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
  </UiSidePanel>`,
});

export const WithTitleSlot = (args) => ({
  components: {
    UiSidePanel,
    UiButton,
    UiText,
    UiHeading,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiButton
      class="ui-button--text ui-button--theme-secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
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
    @update:modelValue="onUpdateModelValue"
    @after-enter="onAfterEnter"
  >
    <template 
      #title="{
        title,
        attrs,
      }"
    >
      <UiHeading 
        v-if="title"
        v-bind="attrs"
      >
        {{ title }}
      </UiHeading>
    </template>
    <UiText>Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
  </UiSidePanel>`,
});

export const WithSubtitleSlot = (args) => ({
  components: {
    UiSidePanel,
    UiButton,
    UiText,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiButton
      class="ui-button--text ui-button--theme-secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
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
    @update:modelValue="onUpdateModelValue"
    @after-enter="onAfterEnter"
  >
    <template 
      #subtitle="{
        subtitle,
        attrs,
      }"
    >
      <UiText
        v-if="subtitle"
        v-bind="attrs"
        class="ui-text--body-2-comfortable ui-side-panel__subtitle"
      >
        {{ subtitle }}
      </UiText>
    </template>
    <UiText>Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
  </UiSidePanel>`,
});

export const WithContentSlot = (args) => ({
  components: {
    UiSidePanel,
    UiButton,
    UiText,
  },
  directives: {
    scrollTabindex,
    keyboardFocus,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiButton
      class="ui-button--text ui-button--theme-secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
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
    @update:modelValue="onUpdateModelValue"
    @after-enter="onAfterEnter"
  >
    <template #content>
      <div
        v-scroll-tabindex
        v-keyboard-focus
        class="ui-side-panel__content"
      >
        <UiText>Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
      </div>
    </template>
  </UiSidePanel>`,
});

export const WithAsyncContent = (args) => ({
  components: {
    UiSidePanel,
    UiButton,
    UiHeading,
    UiBulletPoints,
    UiBulletPointsItem,
    UiText,
    UiLink,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const isLoaded = ref(false);
    onMounted(() => (
      window.setTimeout(() => {
        isLoaded.value = true;
      }, 1000)
    ));
    return {
      ...args,
      ...events,
      modelValue,
      isLoaded,
    };
  },
  template: `<UiButton
      class="ui-button--text ui-button--theme-secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
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
    @update:modelValue="onUpdateModelValue"
    @after-enter="onAfterEnter"
  >
    <template v-if="isLoaded">
      <UiHeading>§1. General Provisions</UiHeading>
      <UiBulletPoints tag="ol">
        <UiBulletPointsItem style="margin: var(--space-32) 0">
          <UiText>These Terms of Service specify:</UiText>
          <UiBulletPoints
            tag="ol"
            type="a"
          >
            <UiBulletPointsItem>
              <UiText>principles of operation of the website and the mobile application "<UiLink href="#">Triage.com</UiLink>",</UiText>
            </UiBulletPointsItem>
            <UiBulletPointsItem>
              <UiText>rules on the provision of services by electronic means,</UiText>
            </UiBulletPointsItem>
            <UiBulletPointsItem>
              <UiText>the rights and obligations of the Service Provider and the Service Recipients.</UiText>
            </UiBulletPointsItem>
          </UiBulletPoints>
        </UiBulletPointsItem>
        <UiBulletPointsItem style="margin: var(--space-32) 0">
          <UiText>Whenever these Terms of Service refer to:</UiText>
          <UiBulletPoints
            tag="ol"
            type="a"
          >
            <UiBulletPointsItem>
              <UiText>Application, this means the software for portable devices, made available free of charge by the Service Provider referred to in sec. 2(l) below, enabling the use of the Services referred to in sec. 2(k) below,</UiText>
            </UiBulletPointsItem>
            <UiBulletPointsItem>
              <UiText>Articles, this means articles referring to medical and pharmaceutical topics,</UiText>
            </UiBulletPointsItem>
            <UiBulletPointsItem>
              <UiText>License, this means a non-exclusive, royalty-free license granted to Users referred to in sec. 2(m) below to use the Application or Website referred to in sec. 2(j) below,</UiText>
            </UiBulletPointsItem>
            <UiBulletPointsItem>
              <UiText>Terms of Service, this means these Terms of Service,</UiText>
            </UiBulletPointsItem>
            <UiBulletPointsItem>
              <UiText>GDPR, this means Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of individuals with regard to the processing of personal data and on the free movement of such data and repealing Directive 95/46/EC (General Data Protection Regulation) (OJ L 119, p. 1),</UiText>
            </UiBulletPointsItem>
          </UiBulletPoints>
        </UiBulletPointsItem>
      </UiBulletPoints>
    </template>
  </UiSidePanel>`,
});

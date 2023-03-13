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
  provide,
  inject,
} from 'vue';
import { actions } from '@storybook/addon-actions';
import {
  focusTrap,
  bodyScrollLock,
  scrollTabindex,
  keyboardFocus,
} from '@/utilities/directives';
import './UiSidePanel.stories.scss';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onAfterEnter: 'after-enter',
});

export default {
  title: 'Organisms/SidePanel',
  component: UiSidePanel,
  args: {
    initModelValue: true,
    title: 'For business',
    subtitle: '',
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
    iconCloseAttrs: { 'data-testid': 'close-icon' },
    contentAttrs: { 'data-testid': 'content-element' },
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
    transitionBackdropAttrs: { table: { subcategory: 'Attrs props' } },
    backdropAttrs: { table: { subcategory: 'Attrs props' } },
    dialogAttrs: { table: { subcategory: 'Attrs props' } },
    transitionDialogAttrs: { table: { subcategory: 'Attrs props' } },
    headingTitleAttrs: { table: { subcategory: 'Attrs props' } },
    textSubtitleAttrs: { table: { subcategory: 'Attrs props' } },
    buttonCloseAttrs: { table: { subcategory: 'Attrs props' } },
    iconCloseAttrs: { table: { subcategory: 'Attrs props' } },
    contentAttrs: { table: { subcategory: 'Attrs props' } },
  },
  decorators: [ (story, { args }) => ({
    components: {
      story,
      UiButton,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
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
  parameters: {
    docs: { description: { component: 'SidePanel use `v-body-scroll-lock`. Only works on Canvas mode.' } },
    cssProperties: {
      '--side-panel-max-width': '100%',
      '--side-panel-background': 'var(--color-background-white)',
      '--side-panel-box-shadow': 'var(--box-shadow-high)',
      '--side-panel-tablet-max-width': '40rem',
      '--side-panel-header-padding-block':
        'var(--side-panel-header-padding-block-start, var(--space-20)) var(--side-panel-header-padding-block-end, var(--space-24))',
      '--side-panel-header-padding-inline':
        'var(--side-panel-header-padding-inline-start, var(--space-20)) var(--side-panel-header-padding-inline-end, var(--space-20))',
      '--side-panel-header-background': 'var(--color-background-subtle)',
      '--side-panel-header-gap': 'var(--space-32)',
      '--side-panel-tablet-header-padding-block':
        'var(--side-panel-tablet-header-padding-block-start, var(--space-40)) var(--side-panel-tablet-header-padding-block-end, var(--space-32))',
      '--side-panel-tablet-header-padding-inline':
        'var(--side-panel-tablet-header-padding-inline-start, var(--space-40)) var(--side-panel-tablet-header-padding-inline-end, var(--space-40))',
      '--side-panel-label-padding-block':
        'var(--side-panel-label-padding-block-start, 0) var(--side-panel-label-padding-block-end, 0)',
      '--side-panel-label-padding-inline':
        'var(--side-panel-label-padding-inline-start, 0) var(--side-panel-label-padding-inline-end, 0)',
      '--side-panel-tablet-label-padding-block':
        'var(--side-panel-tablet-label-padding-block-start, 0) var(--side-panel-tablet-label-padding-block-end, 0)',
      '--side-panel-tablet-label-padding-inline':
        'var(--side-panel-tablet-label-padding-inline-start, var(--space-8)) var(--side-panel-tablet-label-padding-inline-end, var(--space-8))',
      '--side-panel-subtitle-margin-block':
        'var(--side-panel-subtitle-margin-block-start, var(--space-8)) var(--side-panel-subtitle-margin-block-end, 0)',
      '--side-panel-subtitle-margin-inline':
        'var(--side-panel-subtitle-margin-inline-start, 0) var(--side-panel-subtitle-margin-inline-end, 0)',
      '--side-panel-content-padding-block':
        'var(--side-panel-content-padding-block-start, var(--space-24)) var(--side-panel-content-padding-block-end, var(--space-24))',
      '--side-panel-content-padding-inline':
        'var(--side-panel-content-padding-inline-start, var(--space-20)) var(--side-panel-content-padding-inline-end, var(--space-20))',
      '--side-panel-tablet-content-padding-block':
        'var(--side-panel-tablet-content-padding-block-start, var(--space-32)) var(--side-panel-tablet-content-padding-block-end, var(--space-32))',
      '--side-panel-tablet-content-padding-inline':
        'var(--side-panel-tablet-content-padding-inline-start, var(--space-48)) var(--side-panel-tablet-content-padding-inline-end, var(--space-48))',
    },
  },
};
const TOS = {
  components: {
    UiBulletPoints,
    UiBulletPointsItem,
    UiLink,
  },
  template: `<UiBulletPoints
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
          principles of operation of the website and the mobile application "<UiLink href="#">Triage.com</UiLink>",
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

export const TermsOfService = {
  render: (args) => ({
    components: {
      UiSidePanel,
      UiButton,
      UiHeading,
      TOS,
    },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
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
      @update:modelValue="onUpdateModelValue"
      @after-enter="onAfterEnter"
    >
      <UiHeading>
        §1. General Provisions
      </UiHeading>
      <TOS/>
    </UiSidePanel>`,
  }),

  args: {
    title: 'Terms of Service',
    subtitle: 'Last updated: Nov 26th, 2020',
  },
};

export const WithAsyncContent = {
  render: (args) => ({
    components: {
      UiSidePanel,
      UiButton,
      UiHeading,
      TOS,
    },
    setup() {
      const modelValue = inject('modelValue');
      const isLoaded = ref(false);
      onMounted(() => window.setTimeout(() => {
        isLoaded.value = true;
      }, 1000));
      return {
        ...args,
        ...events,
        modelValue,
        isLoaded,
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
      @update:modelValue="onUpdateModelValue"
      @after-enter="onAfterEnter"
    >
      <template v-if="isLoaded">
        <UiHeading>§1. General Provisions</UiHeading>
        <TOS/>
      </template>
    </UiSidePanel>`,
  }),
};

export const WithBackdropSlot = {
  render: (args) => ({
    components: {
      UiSidePanel,
      UiButton,
      UiText,
      UiBackdrop,
    },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
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
      @update:modelValue="onUpdateModelValue"
      @after-enter="onAfterEnter"
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

export const WithContainerSlot = {
  render: (args) => ({
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
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
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
      @update:modelValue="onUpdateModelValue"
      @after-enter="onAfterEnter"
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

export const WithHeaderSlot = {
  render: (args) => ({
    components: {
      UiSidePanel,
      UiButton,
      UiText,
      UiHeading,
      UiIcon,
    },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
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
      @update:modelValue="onUpdateModelValue"
      @after-enter="onAfterEnter"
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

export const WithCloseSlot = {
  render: (args) => ({
    components: {
      UiSidePanel,
      UiButton,
      UiText,
      UiHeading,
      UiIcon,
    },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
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
      @update:modelValue="onUpdateModelValue"
      @after-enter="onAfterEnter"
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

export const WithLabelSlot = {
  render: (args) => ({
    components: {
      UiSidePanel,
      UiButton,
      UiText,
      UiHeading,
    },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
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
      @update:modelValue="onUpdateModelValue"
      @after-enter="onAfterEnter"
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

export const WithTitleSlot = {
  render: (args) => ({
    components: {
      UiSidePanel,
      UiButton,
      UiText,
      UiHeading,
    },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
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
      @update:modelValue="onUpdateModelValue"
      @after-enter="onAfterEnter"
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

export const WithSubtitleSlot = {
  render: (args) => ({
    components: {
      UiSidePanel,
      UiButton,
      UiText,
    },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
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
      @update:modelValue="onUpdateModelValue"
      @after-enter="onAfterEnter"
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
        Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:
      </UiText>
    </UiSidePanel>`,
  }),
};

export const WithContentSlot = {
  render: (args) => ({
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
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
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
      @update:modelValue="onUpdateModelValue"
      @after-enter="onAfterEnter"
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

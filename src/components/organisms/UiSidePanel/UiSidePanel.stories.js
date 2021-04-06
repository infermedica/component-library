import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import UiBackdrop from '@/components/atoms/UiBackdrop/UiBackdrop.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import { focusTrap, bodyScrollLock } from '@/utilities/directives';
import { ref } from 'vue';

export default {
  title: 'Organisms/SidePanel',
  component: UiSidePanel,
  subcomponents: {
    UiBackdrop, UiButton, UiIcon, UiHeading, UiText,
  },
  args: {
    modelValue: true,
    title: 'For business',
    subtitle: '',
    buttonCloseAttrs: {
      id: 'close',
      'aria-label': 'close panel',
    },
    headingTitleAttrs: {
      id: 'title',
    },
    textSubtitleAttrs: {
      id: 'subtitle',
    },
    transition: 'slide',
  },
  argTypes: {
    modelValue: { control: false },
    title: {
      control: { type: 'text' },
      table: {
        category: 'props',
      },
    },
    subtitle: {
      control: { type: 'text' },
      table: {
        category: 'props',
      },
    },
  },
  decorators: [() => ({ template: '<div class="max-w-32" style="--backdrop-position: absolute; --side-panel-position: absolute; --side-panel-z-index: 0; min-height: 320px;"><story /></div>' })],
};

const Template = (args) => ({
  components: {
    UiSidePanel, UiButton, UiHeading, UiBulletPoints, UiBulletPointsItem, UiText,
  },
  setup() {
    const modelValue = ref(true);
    return { ...args, modelValue };
  },
  template: `<UiButton
      class="ui-button--text ui-button--secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
  <UiSidePanel 
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
    :button-close-attrs="buttonCloseAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
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
            <UiText>principles of operation of the website and the mobile application "Symptomate.com",</UiText>
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
    UiSidePanel, UiButton, UiText, UiBackdrop,
  },
  setup() {
    const modelValue = ref(true);
    return { ...args, modelValue };
  },
  template: `<UiButton
      class="ui-button--text ui-button--secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
  <UiSidePanel 
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
    :button-close-attrs="buttonCloseAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
  >
    <template #backdrop="{closeHandler, modelValue}">
      <transition name="fade">
        <UiBackdrop
          v-if="modelValue"
          @click="closeHandler"
        />
      </transition>
    </template>
    <UiText>Symptomate is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
  </UiSidePanel>`,
});

export const WithContainerSlot = (args) => ({
  components: {
    UiSidePanel, UiButton, UiText, UiHeading, UiIcon,
  },
  directives: {
    focusTrap,
    bodyScrollLock,
  },
  setup() {
    const modelValue = ref(true);
    return { ...args, modelValue };
  },
  template: `<UiButton
      class="ui-button--text ui-button--secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
  <UiSidePanel 
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
    :button-close-attrs="buttonCloseAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
  >
    <template #container="{transition, afterEnterHandler, modelValue, buttonCloseAttrs, closeHandler, title, subtitle}">
      <transition
        :name="transition"
        @after-enter="afterEnterHandler"
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
              ref="button"
              class="ui-button--has-icon ui-button--secondary ui-button--text ui-side-panel__close"
              v-bind="buttonCloseAttrs"
              @click="closeHandler"
            >
              <UiIcon icon="close" />
            </UiButton>
            <div
              v-if="title || subtitle"
              class="ui-side-panel__label"
            >
              <UiHeading v-if="title">
                {{ title }}
              </UiHeading>
              <UiText
                v-if="subtitle"
                class="ui-side-panel__subtitle"
              >
                {{ subtitle }}
              </UiText>
            </div>
          </div>
          <div
            class="ui-side-panel__content"
            :body-scroll-lock-ignore="true"
          >
            <UiText>Symptomate is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
          </div>
        </dialog>
      </transition>
    </template>
  </UiSidePanel>`,
});

export const WithHeaderSlot = (args) => ({
  components: {
    UiSidePanel, UiButton, UiText, UiHeading, UiIcon,
  },
  setup() {
    const modelValue = ref(true);
    return { ...args, modelValue };
  },
  template: `<UiButton
      class="ui-button--text ui-button--secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
  <UiSidePanel 
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
    :button-close-attrs="buttonCloseAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
  >
    <template #header="{attrs, closeHandler, title, subtitle}">
      <div class="ui-side-panel__header">
        <UiButton
          ref="button"
          class="ui-button--has-icon ui-button--secondary ui-button--text ui-side-panel__close"
          v-bind="attrs"
          @click="closeHandler"
        >
          <UiIcon icon="close" />
        </UiButton>
        <div
          v-if="title || subtitle"
          class="ui-side-panel__label"
        >
          <UiHeading v-if="title">
            {{ title }}
          </UiHeading>
          <UiText
            v-if="subtitle"
            class="ui-side-panel__subtitle"
          >
            {{ subtitle }}
          </UiText>
        </div>
      </div>
    </template>
    <UiText>Symptomate is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
  </UiSidePanel>`,
});

export const WithCloseSlot = (args) => ({
  components: {
    UiSidePanel, UiButton, UiText, UiHeading, UiIcon,
  },
  setup() {
    const modelValue = ref(true);
    return { ...args, modelValue };
  },
  template: `<UiButton
      class="ui-button--text ui-button--secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
  <UiSidePanel 
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
    :button-close-attrs="buttonCloseAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
  >
    <template #close="{attrs, closeHandler}">
      <UiButton
        ref="button"
        class="ui-button--has-icon ui-button--secondary ui-button--text ui-side-panel__close"
        v-bind="attrs"
        @click="closeHandler"
      >
        <UiIcon icon="close" />
      </UiButton>
    </template>
    <UiText>Symptomate is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
  </UiSidePanel>`,
});

export const WithLabelSlot = (args) => ({
  components: {
    UiSidePanel, UiButton, UiText, UiHeading,
  },
  setup() {
    const modelValue = ref(true);
    return { ...args, modelValue };
  },
  template: `<UiButton
      class="ui-button--text ui-button--secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
  <UiSidePanel 
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
    :button-close-attrs="buttonCloseAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
  >
    <template #label="{title, subtitle}">
      <div
        v-if="title || subtitle"
        class="ui-side-panel__label"
      >
        <UiHeading v-if="title">
          {{ title }}
        </UiHeading>
        <UiText
          v-if="subtitle"
          class="ui-side-panel__subtitle"
        >
          {{ subtitle }}
        </UiText>
      </div>
    </template>
    <UiText>Symptomate is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
  </UiSidePanel>`,
});

export const WithTitleSlot = (args) => ({
  components: {
    UiSidePanel, UiButton, UiText, UiHeading,
  },
  setup() {
    const modelValue = ref(true);
    return { ...args, modelValue };
  },
  template: `<UiButton
      class="ui-button--text ui-button--secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
  <UiSidePanel 
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
    :button-close-attrs="buttonCloseAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
  >
    <template #title="{title}">
      <UiHeading v-if="title">
        {{ title }}
      </UiHeading>
    </template>
    <UiText>Symptomate is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
  </UiSidePanel>`,
});

export const WithSubtitleSlot = (args) => ({
  components: {
    UiSidePanel, UiButton, UiText,
  },
  setup() {
    const modelValue = ref(true);
    return { ...args, modelValue };
  },
  template: `<UiButton
      class="ui-button--text ui-button--secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
  <UiSidePanel 
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
    :button-close-attrs="buttonCloseAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
  >
    <template #subtitle="{subtitle}">
      <UiText
        v-if="subtitle"
        class="ui-side-panel__subtitle"
      >
        {{ subtitle }}
      </UiText>
    </template>
    <UiText>Symptomate is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
  </UiSidePanel>`,
});

export const WithContentSlot = (args) => ({
  components: {
    UiSidePanel, UiButton, UiText,
  },
  setup() {
    const modelValue = ref(true);
    return { ...args, modelValue };
  },
  template: `<UiButton
      class="ui-button--text ui-button--secondary"
      @click="modelValue = true;"
  >{{ title }}</UiButton>
  <UiSidePanel 
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
    :button-close-attrs="buttonCloseAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
  >
    <template #content>
      <div
        class="ui-side-panel__content"
        :body-scroll-lock-ignore="true"
      >
        <UiText>Symptomate is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:</UiText>
      </div>
    </template>
  </UiSidePanel>`,
});

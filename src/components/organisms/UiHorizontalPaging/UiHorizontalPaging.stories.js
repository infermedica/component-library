import {
  ref,
  watch,
  computed,
  nextTick,
} from 'vue';
import UiHorizontalPaging from '@/components/organisms/UiHorizontalPaging/UiHorizontalPaging.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiLoader from '@/components/molecules/UiLoader/UiLoader.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import UiHorizontalPagingItem from '@/components/organisms/UiHorizontalPaging/_internal/UiHorizontalPagingItem.vue';
import UiLink from '@/components/atoms/UiLink/UiLink.vue';
import { actions } from '@storybook/addon-actions';
import './UiHorizontalPaging.stories.scss';
import UiMenu from '@/components/organisms/UiMenu/UiMenu.vue';
import { focusElement } from '../../../utilities/helpers';

const events = actions({ onUpdateModelValue: 'update:modelValue' });
const Language = {
  components: { UiMenu },
  setup() {
    const languages = ref([
      { label: 'Čeština' },
      { label: 'English' },
      { label: 'Deutsch' },
      {
        label: 'Polski',
        class: 'ui-menu-item--is-selected',
      },
      { label: 'Українська' },
    ]);
    return { languages };
  },
  template: `<UiMenu 
    class="language"
    :items="languages" 
    :enable-keyboard-navigation="true"
  />`,
};
const ForBusiness = {
  components: {
    UiText,
    UiHeading,
    UiIcon,
    UiButton,
    UiList,
    UiListItem,
  },
  setup() {
    const products = [
      {
        icon: 'symptom-checker',
        title: 'Symptom Checker',
        description: 'A custom Symptomate app that you can use anywhere.',
      },
      {
        icon: 'call-center-triage',
        title: 'Call Center Triage',
        description: 'Patient triage tool for call centers and emergency rooms.',
      },
      {
        icon: 'api',
        title: 'Infermedica API',
        description: 'An API for preliminary diagnosis and patient triage.',
      },
    ];
    return {
      products,
      UiButton,
    };
  },
  template: `<UiText>
  Symptomate is developed by Infermedica – the company providing a technological platform for digital symptom assessment, triage, patient intake, and more.
  </UiText>
  <UiList class="for-business__products">
    <template
      v-for="({icon, title, description}, key) in products"
      :key="key"
    >
      <UiListItem
      :tag="UiButton"
      class="ui-button--outlined for-business__product"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon for-business__product-prefix-icon"
      />
      <div class="for-business__product-content">
        <UiHeading :level="4">
          {{ title }}
        </UiHeading>
        <UiText>
          {{ description }}
        </UiText>
      </div>
      <UiIcon
        icon="arrow-right"
        class="ui-button__icon for-business__product-suffix-icon"
      />
    </UiListItem>
    </template>
  </UiList>
  <UiButton>Learn more</UiButton>`,
};
const MedicalCertification = {
  components: {
    UiText,
    UiHeading,
    UiIcon,
    UiButton,
  },
  template: `<UiHeading class="ui-heading--h3">
    Medical device label
  </UiHeading>
  <UiIcon
    icon="ce"
    class="medical-certification__icon"
  />
  <UiHeading
    :level="3"
    class="medical-certification__heading"
  >
    Class I medical device in EU
  </UiHeading>
  <UiText>
    This software meets all applicable requirements of the European Directive MDD 93/42/EWG.
  </UiText>`,
};
const InstructionForUse = {
  components: { UiLoader },
  template: '<UiLoader type="skeleton"/>',
};
const TermsOfService = {
  components: {
    UiHeading,
    UiBulletPoints,
  },
  setup() {
    const items = [
      {
        text: 'These Terms of Service specify:',
        children: {
          tag: 'ol',
          type: 'a',
          class: 'terms-of-service__sub-points',
          items: [
            { text: 'principles of operation of the website and the mobile application "Symptomate.com",' },
            { text: 'rules on the provision of services by electronic means,' },
            { text: 'the rights and obligations of the Service Provider and the Service Recipients.' },
          ],
        },
      },
      {
        text: 'Whenever these Terms of Service refer to:',
        children: {
          tag: 'ol',
          type: 'a',
          class: 'terms-of-service__sub-points',
          items: [
            { text: 'Application, this means the software for portable devices, made available free of charge by the Service Provider referred to in sec. 2(l) below, enabling the use of the Services referred to in sec. 2(k) below,' },
            { text: 'Articles, this means articles referring to medical and pharmaceutical topics,' },
            { text: 'License, this means a non-exclusive, royalty-free license granted to Users referred to in sec. 2(m) below to use the Application or Website referred to in sec. 2(j) below,' },
          ],
        },
      },
    ];
    return { items };
  },
  template: `<UiHeading
    :lavel="3"
    class="terms-of-service__heading"
  >
    §1. General Provisions
  </UiHeading>
  <UiBulletPoints
    :items="items"
    tag="ol"
    class="terms-of-service__bullet-points"
  />
  `,
};
const PrivacyPolicy = {
  components: { UiLoader },
  template: '<UiLoader type="skeleton"/>',
};
const InterviewId = {
  components: {
    UiHeading,
    UiText,
  },
  template: `<UiHeading class="ui-heading--h4">
    Interview ID:
  </UiHeading>
  <UiText class="interview-id__heading">
    8611d67x-063x-4390-x812-125288e0b070
  </UiText>`,
};
const Loader = {
  components: { UiLoader },
  template: '<UiLoader type="skeleton"/>',
};

export default {
  title: 'Organisms/HorizontalPaging',
  component: UiHorizontalPaging,
  args: {
    initialModelValue: [],
    title: 'Settings & Info',
    items: [
      {
        label: 'For business',
        title: 'For business',
        name: 'for-business',
      },
      {
        label: 'Medical Certification',
        title: 'Medical certification and compliance',
        name: 'medical-certification',
      },
      {
        label: 'Instruction for Use',
        title: 'Instruction for Use',
        name: 'instruction-for-use',
      },
      {
        label: 'Terms of Service',
        title: 'Terms of Service',
        name: 'terms-of-service',
      },
      {
        label: 'Privacy Policy',
        title: 'Privacy Policy',
        name: 'privacy-policy',
      },
      {
        label: 'Interview ID',
        title: 'Interview ID',
        name: 'interview-id',
      },
    ],
  },
  argTypes: {
    initialModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'array',
    },
    modelValue: { control: false },
    title: {
      description: 'Use this props to set inside pages title.',
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
  },
  decorators: [ () => ({
    template: `<div class="max-w-90">
      <story />
    </div>`,
  }) ],
};

export const Common = {
  render: (args) => ({
    components: {
      UiHorizontalPaging,
      ForBusiness,
      MedicalCertification,
      InstructionForUse,
      TermsOfService,
      PrivacyPolicy,
      InterviewId,
    },
    setup() {
      const modelValue = ref(args.initialModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiHorizontalPaging
      v-model="modelValue"
      :title="title"
      :items="items"
      @update:modelValue="onUpdateModelValue"
    >
      <template #for-business>
        <ForBusiness />
      </template>
      <template #medical-certification>
        <MedicalCertification/>
      </template>
      <template #instruction-for-use>
        <InstructionForUse/>
      </template>
      <template #terms-of-service>
        <TermsOfService/>
      </template>
      <template #privacy-policy>
        <PrivacyPolicy/>
      </template>
      <template #interview-id>
        <InterviewId/>
      </template>
    </UiHorizontalPaging>`,
  }),
};

export const AsMultilevel = {
  render: (args) => ({
    components: {
      UiHorizontalPaging,
      UiText,
      UiBulletPoints,
      Loader,
    },
    setup() {
      const modelValue = ref(args.initialModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiHorizontalPaging
      v-model="modelValue"
      title="Platform"
      :items="[
        {
          label: 'Modules',
          title: 'Modules',
          name: 'modules',
        },
        {
          label: 'Intelligent core',
          title: 'Intelligent core',
          name: 'intelligent-core',
        },
      ]"
      @update:modelValue="onUpdateModelValue"
    >
      <template #modules>
        <UiHorizontalPaging
          title="Modules"
          :items="[
            {
              label: 'Triage',
              title: 'Triage',
              name: 'triage',
            },
            {
              label: 'Intake',
              title: 'Intake',
              name: 'intake',
            },
          ]"
        >
          <template #triage>
            <UiHorizontalPaging
              title="Triage"
              :items="[
                {
                  label: 'Intelligent survey',
                  title: 'Intelligent survey',
                  name: 'intelligent-survey',
                },
                {
                  label: 'Reliable results',
                  title: 'Reliable results',
                  name: 'reliable-results',
                }
              ]"
            >
              <template #intelligent-survey>
                <UiText>This dynamic interview analyzes initial symptoms, revealing more about the patient’s state. It compares symptoms with hundreds of diseases collected in our extensive Medical Knowledge Base.</UiText>
                <UiBulletPoints :items="['Demographic data', 'Risk factors', 'Initial symptoms', 'AI-generated interviews', 'Basic self-examination']"/>
              </template>
              <template #reliable-results>
                <Loader />
              </template>
            </UiHorizontalPaging>
          </template>
          <template #intake>
            <Loader />
          </template>
        </UiHorizontalPaging>
      </template>
      <template #intelligent-core>
        <Loader />
      </template>
    </UiHorizontalPaging>`,
  }),
};

export const AsMobileMenu = {
  render: (args) => ({
    components: {
      UiSidePanel,
      UiHorizontalPaging,
      UiHeading,
      UiButton,
      UiIcon,
      UiMenu,
      UiLink,
      ForBusiness,
      MedicalCertification,
      InstructionForUse,
      TermsOfService,
      PrivacyPolicy,
      InterviewId,
      Language,
    },
    setup() {
      const modelValue = ref(args.initialModelValue);
      const length = computed(() => modelValue.value.length);
      const title = computed(() => modelValue.value[length.value - 1]?.title || 'Settings & Info');
      const previous = computed(
        () => modelValue.value[length.value - 2]?.title || 'Settings & Info',
      );
      const isActive = computed(() => modelValue.value.length > 0);
      const handleBackClick = () => {
        modelValue.value = modelValue.value.slice(0, -1);
      };
      const backButton = ref(null);
      watch(isActive, async (active) => {
        if (active) {
          await nextTick();
          focusElement(backButton.value?.$el, true);
        }
      });
      const menu = ref(null);
      return {
        ...args,
        ...events,
        title,
        modelValue,
        previous,
        isActive,
        backButton,
        menu,
        handleBackClick,
      };
    },
    template: `<UiSidePanel
      :model-value="true"
      :title="title"
      class="horizontal-paging-as-mobile-menu"
    >
      <template #title="{ title }">
        <div class="horizontal-paging-as-mobile-menu__title">
          <UiButton
            v-if="isActive"
            ref="backButton"
            class="ui-button--icon horizontal-paging-as-mobile-menu__back"
            @click="handleBackClick"
          >
            <UiIcon
              icon="chevron-left"
              class="ui-button__icon"
            />
            <span class="visual-hidden">Back to {{ previous }}</span>
          </UiButton>
          <UiHeading>
            {{ title }}
          </UiHeading>
        </div>
      </template>
      <UiHorizontalPaging
        v-model="modelValue"
        :items="items"
        :has-header="false"
        :menu-attrs="{ enableKeyboardNavigation: true }"
        :menu-template-ref="menu"
        @update:modelValue="onUpdateModelValue"
      >
        <template #menu="{items, isActive}">
          <div class="horizontal-paging-as-mobile-menu__menu">
            <UiMenu
              ref="menu"
              :items="items"
              class=""
              :enable-keyboard-navigation="true"
            />
            <footer class="horizontal-paging-as-mobile-menu__footer">
              <UiLink 
                :tabindex="isActive ? -1 : undefined"
                href="http://infermedica.com" 
                target="_blank"
                class="ui-link--theme-secondary"
              >© 2021 Infermedica</UiLink>
            </footer>
          </div>
        </template>
        <template #languages>
          <Language/>
        </template>
        <template #for-business>
          <ForBusiness/>
        </template>
        <template #medical-certification>
          <MedicalCertification/>
        </template>
        <template #instruction-for-use>
          <InstructionForUse/>
        </template>
        <template #terms-of-service>
          <TermsOfService/>
        </template>
        <template #privacy-policy>
          <PrivacyPolicy/>
        </template>
        <template #interview-id>
          <InterviewId/>
        </template>
      </UiHorizontalPaging>
    </UiSidePanel>`,
  }),

  args: {
    items: [
      {
        label: 'Languages',
        title: 'Languages',
        name: 'languages',
        class: '', // override default class `ui-menu-item--theme-secondary`
        suffixAttrs: { label: 'English' },
        listItemAttrs: { class: 'ui-menu-item horizontal-paging-as-mobile-menu__language' },
      },
      {
        label: 'For business',
        title: 'For business',
        name: 'for-business',
      },
      {
        label: 'Medical Certification',
        title: 'Medical certification and compliance',
        name: 'medical-certification',
      },
      {
        label: 'Instruction for Use',
        title: 'Instruction for Use',
        name: 'instruction-for-use',
      },
      {
        label: 'Terms of Service',
        title: 'Terms of Service',
        name: 'terms-of-service',
      },
      {
        label: 'Privacy Policy',
        title: 'Privacy Policy',
        name: 'privacy-policy',
        href: 'https://infermedica.com',
        target: '_blank',
        onClick: () => (false),
      },
      {
        label: 'Interview ID',
        title: 'Interview ID',
        name: 'interview-id',
      },
      {
        label: 'Log out',
        title: 'Log out',
        name: 'logo-ut',
        listItemAttrs: { class: 'horizontal-paging-as-mobile-menu__log-out' },
      },
    ],
  },

  parameters: { viewport: { defaultViewport: 'mobile2' } },

  decorators: [ () => ({
    template: `<div class="min-h-140">
      <story/>
    </div>`,
  }) ],
};

export const WithDefaultSlot = {
  render: (args) => ({
    components: {
      UiHorizontalPaging,
      UiHorizontalPagingItem,
      ForBusiness,
      MedicalCertification,
      InstructionForUse,
      TermsOfService,
      PrivacyPolicy,
      InterviewId,
    },
    setup() {
      const modelValue = ref(args.initialModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiHorizontalPaging
      v-model="modelValue"
      :title="title"
      @update:modelValue="onUpdateModelValue"
    >
      <template
        v-for="(item, key) in items"
        :key="key"
      >
        <UiHorizontalPagingItem v-bind="item">
          <component :is="item.name"/>
        </UiHorizontalPagingItem>
      </template>
    </UiHorizontalPaging>`,
  }),
};

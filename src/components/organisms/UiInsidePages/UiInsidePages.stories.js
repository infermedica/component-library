import {
  ref,
  computed,
} from 'vue';
import UiInsidePages from '@/components/organisms/UiInsidePages/UiInsidePages.vue';
import UiInsidePagesItem from '@/components/organisms/UiInsidePages/_internal/UiInsidePagesItem.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiLoader from '@/components/molecules/UiLoader/UiLoader.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiMenu from '@/components/organisms/UiMenu/UiMenu.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';

const ForBusiness = {
  components: {
    UiText,
    UiHeading,
    UiIcon,
    UiButton,
    UiList,
    UiListItem,
  },
  template: `<UiText>
  Symptomate is developed by Infermedica – the company providing a technological platform for digital symptom assessment, triage, patient intake, and more.
  </UiText>
  <UiList style="margin: 24px 0 32px">
  <UiListItem style="--icon-size: 2rem; --icon-color: var(--color-icon-primary); display: flex; gap: 1rem; align-items: flex-start">
    <UiIcon
        icon="symptom-checker"
        style="flex: none;"
    />
    <div>
      <UiHeading :level="4">Symptom Checker</UiHeading>
      <UiText>A custom Symptomate app that you can use anywhere.</UiText>
    </div>
    <UiButton class="ui-button--icon">
      <UiIcon
          icon="arrow-right"
          class="ui-button__icon"
      />
    </UiButton>
  </UiListItem>
  <UiListItem style="--icon-size: 2rem; --icon-color: var(--color-icon-primary); display: flex; gap: 1rem; align-items: flex-start">
    <UiIcon
        icon="call-center-triage"
        style="flex: none;"
    />
    <div>
      <UiHeading :level="4">Call Center Triage</UiHeading>
      <UiText>Patient triage tool for call centers and emergency rooms.</UiText>
    </div>
    <UiButton class="ui-button--icon">
      <UiIcon
          icon="arrow-right"
          class="ui-button__icon"
      />
    </UiButton>
  </UiListItem>
  <UiListItem style="--icon-size: 2rem; --icon-color: var(--color-icon-primary); display: flex; gap: 1rem; align-items: flex-start">
    <UiIcon
        icon="api"
        style="flex: none;"
    />
    <div>
      <UiHeading :level="4">Infermedica API</UiHeading>
      <UiText>An API for preliminary diagnosis and patient triage.</UiText>
    </div>
    <UiButton class="ui-button--icon">
      <UiIcon
          icon="arrow-right"
          class="ui-button__icon"
      />
    </UiButton>
  </UiListItem>
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
  template: `<UiHeading class="ui-heading--h3">Medical device label</UiHeading>
  <UiIcon
      icon="ce"
      style="--icon-size: 3rem; margin: 12px 0 0;"
  />
  <UiHeading
      :level="3"
      style="margin: 8px 0;"
  >Class I medical device in EU</UiHeading>
  <UiText>This software meets all applicable requirements of the European Directive MDD 93/42/EWG.</UiText>`,
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
    style="margin: 0 0 32px 0"
  >§1. General Provisions</UiHeading>
  <UiBulletPoints
    :items="items"
    tag="ol"
    style="--bullet-points-item-margin: var(--space-8) 0;"
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
  template: `<UiHeading class="ui-heading--h4">Interview ID:</UiHeading>
  <UiText style="margin: 4px 0;">8611d67x-063x-4390-x812-125288e0b070</UiText>`,
};
const Loader = {
  components: { UiLoader },
  template: '<UiLoader type="skeleton"/>',
};

export default {
  title: 'Organisms/InsidePages',
  component: UiInsidePages,
  subcomponents: {
    UiInsidePagesItem,
    UiButton,
    UiIcon,
    UiHeading,
    UiMenu,
  },
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
  decorators: [ () => ({ template: '<div style="max-width: 22.5rem;"><story /></div>' }) ],
};

export const Common = (args) => ({
  components: {
    UiInsidePages,
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
      modelValue,
    };
  },
  template: `<UiInsidePages
    v-model="modelValue"
    :title="title"
    :items="items"
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
  </UiInsidePages>`,
});

export const WithDefaultSlot = (args) => ({
  components: {
    UiInsidePages,
    UiInsidePagesItem,
    ForBusiness,
    MedicalCertification,
    InstructionForUse,
    TermsOfService,
    PrivacyPolicy,
    InterviewId,
  },
  setup() {
    const val = ref([]);
    return {
      ...args,
      val,
    };
  },
  template: `<UiInsidePages
    v-model="val"
    :title="title"
  >
    <template v-for="item in items">
      <UiInsidePagesItem v-bind="item">
        <component :is="item.name"/>
      </UiInsidePagesItem>
    </template>
  </UiInsidePages>`,
});

export const AsMultilevel = (args) => ({
  components: {
    UiInsidePages,
    UiText,
    UiBulletPoints,
    Loader,
  },
  setup() {
    const modelValue = ref(args.initialModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiInsidePages
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
  >
    <template #modules>
      <UiInsidePages
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
          <UiInsidePages
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
          </UiInsidePages>
        </template>
        <template #intake>
          <Loader />
        </template>
      </UiInsidePages>
    </template>
    <template #intelligent-core>
      <Loader />
    </template>
  </UiInsidePages>`,
});

export const AsMobileMenu = (args) => ({
  components: {
    UiSidePanel,
    UiInsidePages,
    UiHeading,
    UiButton,
    UiIcon,
    ForBusiness,
    MedicalCertification,
    InstructionForUse,
    TermsOfService,
    PrivacyPolicy,
    InterviewId,
  },
  setup() {
    const modelValue = ref(args.initialModelValue);
    const length = computed(() => modelValue.value.length);
    const title = computed(() => (modelValue.value[length.value - 1]?.title || 'Settings & Info'));
    const previous = computed(() => (modelValue.value[length.value - 2]?.title || 'Settings & Info'));
    const isActive = computed(() => (modelValue.value.length > 0));
    const handleBackClick = () => {
      modelValue.value = modelValue.value.slice(0, -1);
    };
    return {
      ...args,
      title,
      modelValue,
      previous,
      isActive,
      handleBackClick,
    };
  },
  template: `<UiSidePanel
    :model-value="true"
    :title="title"
    style="--side-panel-content-padding: var(--space-12) var(--space-4); --side-panel-tablet-content-padding: var(--space-12) var(--space-32);"
  >
    <template #title="{ title }">
      <div style="display: flex; gap: var(--space-12)">
        <UiButton
          v-if="isActive"
          class="ui-button--icon"
          @click="handleBackClick"
        >
          <UiIcon
            icon="chevron-left"
            class="ui-button__icon"
          />
          <span class="visual-hidden">Back to {{ previous }}</span>
        </UiButton>
        <UiHeading>{{ title }}</UiHeading>
      </div>
    </template>
    <UiInsidePages
      v-model="modelValue"
      :items="items"
      :has-header="false"
    >
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
    </UiInsidePages>
  </UiSidePanel>`,
});
AsMobileMenu.parameters = { viewport: { defaultViewport: 'mobile2' } };
AsMobileMenu.decorators = [ () => ({
  template: `<div style="min-height: 560px">
   <story/>
  </div>`,
}) ];

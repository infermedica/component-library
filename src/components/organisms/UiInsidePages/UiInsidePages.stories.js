import { ref } from 'vue';
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
  argTypes: { content: { control: { type: 'text' } } },
  decorators: [ () => ({ template: '<div style="max-width: 22.5rem"><story /></div>' }) ],
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
    const val = ref([]);
    return {
      ...args,
      val,
    };
  },
  template: `<UiInsidePages
      v-model="val"
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
    Loader,
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
    title="Settings & Info"
    :items="[
      {
        label: 'Primary',
        title: 'Primary',
        name: 'primary',
      },
      {
        label: 'Secondary',
        title: 'Secondary',
        name: 'secondary',
      },
    ]"
  >
    <template #primary>
      <UiInsidePages
        title="Primary"
        :items="[
          {
            label: 'Apple',
            title: 'Apple',
            name: 'apple',
          },
          {
            label: 'Pineapple',
            title: 'Pineapple',
            name: 'pineapple',
          },
        ]"
      >
        <template #apple>
          <UiInsidePages
            title="Apple"
            :items="[
              {
                label: 'Tomato',
                title: 'Tomato',
                name: 'tomato',
              },
              {
                label: 'Potato',
                title: 'Potato',
                name: 'potato',
              }
            ]"
          >
            <template #tomato>
              <UiText>The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America. The Mexican Nahuatl word tomatl gave rise to the Spanish word tomate, from which the English word tomato derived.</UiText>
            </template>
            <template #potato>
              <Loader />
            </template>
          </UiInsidePages>
        </template>
        <template #pineapple>
          <Loader />
        </template>
      </UiInsidePages>
    </template>
    <template #secondary>
      <Loader />
    </template>
  </UiInsidePages>`,
});

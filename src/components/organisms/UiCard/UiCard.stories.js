import { modifiers } from '@sb/helpers/argTypes';
import UiCard from '@/components/organisms/UiCard/UiCard.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import UiContainer from '@/components/organisms/UiContainer/UiContainer.vue';
import './UiCard.stories.scss';
import docs from './UiCard.mdx';

export default {
  title: 'Organisms/Card',
  component: UiCard,
  subcomponents: {
    UiIcon,
    UiText,
    UiHeading,
    UiContainer,
  },
  args: {
    modifiers: [],
    title: 'Call an ambulance',
    subtitle: 'Recommendation',
    description: 'Your symptoms are very serious, and you may require emergency care. Do not delay. Call an ambulance right now.',
    type: 'emergency_ambulance',
    iconTriageAttrs: { 'data-testid': 'triage-icon' },
    textSubtitleAttrs: { 'data-testid': 'subtitle-text' },
    headingTitleAttrs: { 'data-testid': 'title-heading' },
    textDescriptionAttrs: { 'data-testid': 'description-text' },
  },
  argTypes: {
    modifiers: modifiers({ options: [ 'ui-card--modern' ] }),
    title: {
      description: 'Use this props to set title for card.',
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
      control: { type: 'object' },
    },
    subtitle: {
      description: 'Use this props to set subtitle for card.',
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
      control: 'object',
    },
    description: {
      description: 'Use this props to set description for card.',
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
      control: 'text',
    },
    descriptionSlot: {
      name: 'description',
      description: 'Use this slot to replace description template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: { type: 'object' },
    },
    type: {
      control: { type: 'select' },
      options: [
        'emergency_ambulance',
        'emergency',
        'consultation_24',
        'consultation',
        'self_care',
      ],
    },
    iconTriageAttrs: { table: { subcategory: 'Attrs props' } },
    textSubtitleAttrs: { table: { subcategory: 'Attrs props' } },
    headingTitleAttrs: { table: { subcategory: 'Attrs props' } },
    textDescriptionAttrs: { table: { subcategory: 'Attrs props' } },
  },
  parameters: { docs: { page: docs } },
};

const Template = (args) => ({
  components: { UiCard },
  setup() {
    return { ...args };
  },
  template: `<UiCard
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :type="type"
    :icon-triage-attrs="iconTriageAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :class="modifiers"
  />`,
});

export const Ambulance = Template.bind({});

export const Emergency = Template.bind({});
Emergency.args = { type: 'emergency' };

export const Consultation24 = Template.bind({});
Consultation24.args = { type: 'consultation_24' };

export const Consultation = Template.bind({});
Consultation.args = { type: 'consultation' };

export const SelfCare = Template.bind({});
SelfCare.args = { type: 'self_care' };

export const ModernAmbulance = Template.bind({});
ModernAmbulance.args = {
  type: 'emergency_ambulance',
  subtitle: '',
  modifiers: [ 'ui-card--modern' ],
};

export const ModernEmergency = Template.bind({});
ModernEmergency.args = {
  type: 'emergency',
  subtitle: '',
  modifiers: [ 'ui-card--modern' ],
};

export const ModernConsultation24 = Template.bind({});
ModernConsultation24.args = {
  type: 'consultation_24',
  subtitle: '',
  modifiers: [ 'ui-card--modern' ],
};

export const ModernConsultation = Template.bind({});
ModernConsultation.args = {
  type: 'consultation',
  subtitle: '',
  modifiers: [ 'ui-card--modern' ],
};

export const ModernSelfCare = Template.bind({});
ModernSelfCare.args = {
  type: 'self_care',
  subtitle: '',
  modifiers: [ 'ui-card--modern' ],
};

export const WithDetailsSlot = (args) => ({
  components: {
    UiCard,
    UiText,
    UiHeading,
    UiBulletPoints,
    UiBulletPointsItem,
  },
  setup() {
    return { ...args };
  },
  template: `<UiCard
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :type="type"
    :icon-triage-attrs="iconTriageAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :class="[ 
      'card-with-detailed', 
      modifiers,
    ]"
  >
    <template #details>
      <UiHeading
        :level="4"
        class="card-with-detailed__heading"
      >
        Alarming symptoms:
      </UiHeading>
      <UiBulletPoints :items="['Vomiting', 'Abdominal pain, lasting 2 to 7 days']" />
    </template>
  </UiCard>`,
});

export const WithTriageSlot = (args) => ({
  components: {
    UiCard,
    UiIcon,
  },
  setup() {
    return { ...args };
  },
  template: `<UiCard
    :class="modifiers"
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :type="type"
  >
    <template #triage="{ iconTriageAttrs }">
      <div class="ui-card__triage">
        <UiIcon
          v-if="iconTriageAttrs.icon"
          v-bind="iconTriageAttrs"
          class="ui-card__icon"
        />
      </div>
    </template>
  </UiCard>`,
});

export const WithContentSlot = (args) => ({
  components: {
    UiCard,
    UiText,
    UiHeading,
  },
  setup() {
    return { ...args };
  },
  template: `<UiCard
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :type="type"
    :icon-triage-attrs="iconTriageAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :class="modifiers"
  >
    <template #content="{
      subtitle,
      textSubtitleAttrs,
      title,
      headingTitleAttrs, 
      description,
      textDescriptionAttrs,
    }">
      <div class="ui-card__content">
        <UiText
          v-if="subtitle"
          v-bind="textSubtitleAttrs"
          class="ui-card__subtitle"
        >
          {{ subtitle }}
        </UiText>
        <UiHeading
          v-if="title"
          v-bind="headingTitleAttrs"
          class="ui-card__title"
        >
          {{ title }}
        </UiHeading>
        <UiText
          v-if="description"
          v-bind="textDescriptionAttrs"
          class="ui-card__description"
        >
          {{ description }}
        </UiText>
      </div>
    </template>
  </UiCard>`,
});

export const WithSubtitleSlot = (args) => ({
  components: {
    UiCard,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiCard
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :type="type"
    :icon-triage-attrs="iconTriageAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :class="modifiers"
  >
    <template #subtitle="{
      subtitle,
      textSubtitleAttrs
    }">
      <UiText
        v-if="subtitle"
        v-bind="textSubtitleAttrs"
        class="ui-card__subtitle"
      >
        {{ subtitle }}
      </UiText>
    </template>
  </UiCard>`,
});

export const WithTitleSlot = (args) => ({
  components: {
    UiCard,
    UiHeading,
  },
  setup() {
    return { ...args };
  },
  template: `<UiCard
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :type="type"
    :icon-triage-attrs="iconTriageAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :class="modifiers"
  >
    <template #title="{
      title,
      headingTitleAttrs,
    }">
      <UiHeading
        v-if="title"
        v-bind="headingTitleAttrs"
        class="ui-card__title"
      >
        {{ title }}
      </UiHeading>
    </template>
  </UiCard>`,
});

export const WithDescriptionSlot = (args) => ({
  components: {
    UiCard,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiCard
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :type="type"
    :icon-triage-attrs="iconTriageAttrs"
    :text-subtitle-attrs="textSubtitleAttrs"
    :heading-title-attrs="headingTitleAttrs"
    :text-description-attrs="textDescriptionAttrs"
    :class="modifiers"
  >
    <template #description="{
      description,
      textDescriptionAttrs
    }">
      <UiText
        v-if="description"
        v-bind="textDescriptionAttrs"
        class="ui-card__description"
      >
        {{ description }}
      </UiText>
    </template>
  </UiCard>`,
});

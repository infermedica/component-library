import UiCard from '@/components/organisms/UiCard/UiCard.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiContainer from '@/components/organisms/UiContainer/UiContainer.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import { modifiers } from '@sb/helpers/argTypes';

export default {
  title: 'Organisms/Card',
  component: UiCard,
  subcomponents: {
    UiIcon, UiText, UiHeading, UiContainer,
  },
  args: {
    modifiers: [],
    title: 'Call an ambulance',
    subtitle: 'Recommendation',
    description: 'Your symptoms are very serious, and you may require emergency care. Do not delay. Call an ambulance right now.',
    type: 'emergency_ambulance',
  },
  argTypes: {
    modifiers: modifiers({ options: ['ui-card--modern'] }),
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
      control: {
        type: 'select',
      },
      options: [
        'emergency_ambulance', 'emergency', 'consultation_24', 'consultation', 'self_care',
      ],
    },
    symptoms: {
      name: 'symptoms',
      description: '@deprecated Will be removed in 0.4.0 use `details` slots instead',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: false,
    },
  },
  parameters: {
    cssprops: {
      'card-padding': {
        value: '0',
        control: 'text',
        description: '',
      },
      'card-tablet-padding': {
        value: '0',
        control: 'text',
        description: '',
      },
      'card-triage-padding': {
        value: 'var(--space-16) var(--space-20)',
        control: 'text',
        description: '',
      },
      'card-triage-margin': {
        value: '0',
        control: 'text',
        description: '',
      },
      'card-triage-background': {
        value: undefined,
        control: 'text',
        description: '',
      },
      'card-triage-border-radius': {
        value: '0',
        control: 'text',
        description: '',
      },
      'card-triage-tablet-padding': {
        value: 'var(--space-32) var(--space-32) var(--space-40)',
        control: 'text',
        description: '',
      },
      'card-triage-tablet-margin': {
        value: '0',
        control: 'text',
        description: '',
      },
      'card-triage-tablet-border-radius': {
        value: '0',
        control: 'text',
        description: '',
      },
      'card-triage-icon-size': {
        value: '3rem',
        control: 'text',
        description: '',
      },
      'card-subtitle-margin': {
        value: '0 0 var(--space-4)',
        control: 'text',
        description: '',
      },
      'card-subtitle-color': {
        value: 'var(--color-text-dimmed)',
        control: 'text',
        description: '',
      },
      'card-title-font': {
        value: 'var(--font-h2)',
        control: 'text',
        description: '',
      },
      'card-title-letter-spacing': {
        value: 'var(--letter-spacing-h2)',
        control: 'text',
        description: '',
      },
      'card-title-margin': {
        value: '0 0 var(--space-12)',
        control: 'text',
        description: '',
      },
      'card-content-padding': {
        value: 'var(--space-24) var(--space-20) var(--space-32)',
        control: 'text',
        description: '',
      },
      'card-content-tablet-padding': {
        value: 'var(--space-32) var(--space-48) var(--space-48)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiCard },
  setup() {
    return { ...args };
  },
  template: `<UiCard
    :class="modifiers"
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :type="type"
  />`,
});

export const Ambulance = Template.bind({});

export const Emergency = Template.bind({});
Emergency.args = {
  type: 'emergency',
};

export const Consultation24 = Template.bind({});
Consultation24.args = {
  type: 'consultation_24',
};

export const Consultation = Template.bind({});
Consultation.args = {
  type: 'consultation',
};

export const SelfCare = Template.bind({});
SelfCare.args = {
  type: 'self_care',
};

export const ModernAmbulance = Template.bind({});
ModernAmbulance.args = {
  type: 'emergency_ambulance',
  modifiers: ['ui-card--modern'],
};

export const ModernEmergency = Template.bind({});
ModernEmergency.args = {
  type: 'emergency',
  modifiers: ['ui-card--modern'],
};

export const ModernConsultation24 = Template.bind({});
ModernConsultation24.args = {
  type: 'consultation_24',
  modifiers: ['ui-card--modern'],
};

export const ModernConsultation = Template.bind({});
ModernConsultation.args = {
  type: 'consultation',
  modifiers: ['ui-card--modern'],
};

export const ModernSelfCare = Template.bind({});
ModernSelfCare.args = {
  type: 'self_care',
  modifiers: ['ui-card--modern'],
};

export const WithDetailsSlot = (args) => ({
  components: {
    UiCard, UiText, UiHeading, UiBulletPoints, UiBulletPointsItem,
  },
  setup() {
    return { ...args };
  },
  template: `
    <UiCard
      :class="modifiers"
      :title="title"
      :subtitle="subtitle"
      :description="description"
      :type="type"
    >
    <template #details>
      <UiHeading
        :level="4"
        style="margin: var(--space-24) 0 var(--space-8) 0"
      >
        Alarming symptoms:
      </UiHeading>
      <UiBulletPoints>
        <template
          v-for="(symptom, key) in ['Vomiting', 'Abdominal pain, lasting 2 to 7 days']"
          :key="key"
        >
          <UiBulletPointsItem icon="bullet-alarming" class="ui-bullet-points-item--primary">
            <UiText>{{ symptom }}</UiText>
          </UiBulletPointsItem>
        </template>
      </UiBulletPoints>
    </template>
    </UiCard>`,
});

export const WithTriageSlot = (args) => ({
  components: { UiCard, UiIcon },
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
    <template #triage="{icon}">
      <div class="ui-card__triage">
        <UiIcon
          v-if="icon"
          :icon="icon"
          class="ui-card__icon"
        />
      </div>
    </template>
  </UiCard>`,
});

export const WithContentSlot = (args) => ({
  components: {
    UiCard, UiText, UiHeading,
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
    <template #content="{subtitle, title, description}">
      <div class="ui-card__content">
        <UiText
          v-if="subtitle"
          class="ui-card__subtitle"
        >
          {{ subtitle }}
        </UiText>
        <UiHeading
          v-if="title"
          class="ui-card__title"
        >
          {{ title }}
        </UiHeading>
        <UiText
          v-if="description"
          class="ui-card__description"
        >
          {{ description }}
        </UiText>
      </div>
    </template>
  </UiCard>`,
});

export const WithSubtitleSlot = (args) => ({
  components: { UiCard, UiText },
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
    <template #subtitle="{subtitle}">
      <UiText
        v-if="subtitle"
        class="ui-card__subtitle"
      >
        {{ subtitle }}
      </UiText>
    </template>
  </UiCard>`,
});

export const WithTitleSlot = (args) => ({
  components: { UiCard, UiHeading },
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
    <template #title="{title}">
      <UiHeading
        v-if="title"
        class="ui-card__title"
      >
        {{ title }}
      </UiHeading>
    </template>
  </UiCard>`,
});

export const WithDescriptionSlot = (args) => ({
  components: { UiCard, UiText },
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
    <template #description="{description}">
      <UiText
        v-if="description"
        class="ui-card__description"
      >
        {{ description }}
      </UiText>
    </template>
  </UiCard>`,
});

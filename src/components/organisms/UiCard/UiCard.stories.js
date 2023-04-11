import { modifiers } from '@sb/helpers/argTypes';
import UiCard from '@/components/organisms/UiCard/UiCard.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import './UiCard.stories.scss';

export default {
  title: 'Organisms/Card',
  component: UiCard,
  args: {
    modifiers: [],
    title: 'Call an ambulance',
    subtitle: 'Recommendation',
    description:
      'Your symptoms are very serious, and you may require emergency care. Do not delay. Call an ambulance right now.',
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
  parameters: {
    cssProperties: {
      '--card-padding-block': 'var(--card-padding-block-start, 0) var(--card-padding-block-end, 0)',
      '--card-padding-inline': 'var(--card-padding-inline-start, 0) var(--card-padding-inline-end, 0)',
      '--card-tablet-padding-block': 'var(--card-tablet-padding-block-start, 0) var(--card-tablet-padding-block-end, 0)',
      '--card-tablet-padding-inline': 'var(--card-tablet-padding-inline-start, 0) var(--card-tablet-padding-inline-end, 0)',
      '--card-desktop-padding-block': 'var(--card-desktop-padding-block-start, 0) var(--card-desktop-padding-block-end, 0)',
      '--card-desktop-padding-inline': 'var(--card-desktop-padding-inline-start, 0) var(--card-desktop-padding-inline-end, 0)',
      '--card-gap': 'var(--space-20)',
      '--card-tablet-gap': '0',
      '--card-triage-padding-block': 'var(--card-triage-padding-block-start, var(--space-16)) var(--card-triage-padding-block-end, var(--space-16))',
      '--card-triage-padding-inline': 'var(--card-triage-padding-inline-start, var(--space-16)) var(--card-triage-padding-inline-end, var(--space-16))',
      '--card-triage-border-start-start-radius': '0',
      '--card-triage-border-start-end-radius': '0',
      '--card-triage-border-end-start-radius': '0',
      '--card-triage-border-end-end-radius': '0',
      '--card-triage-background': 'var(--color-triage-self-care)',
      '--card-tablet-triage-padding-block': 'var(--card-tablet-triage-padding-block-start, var(--space-32)) var(--card-tablet-triage-padding-block-end, var(--space-32))',
      '--card-tablet-triage-padding-inline': 'var(--card-tablet-triage-padding-inline-start, var(--space-32)) var(--card-tablet-triage-padding-inline-end, var(--space-32))',
      '--card-tablet-triage-border-start-start-radius': '0',
      '--card-tablet-triage-border-start-end-radius': 'var(--border-radius-container)',
      '--card-tablet-triage-border-end-start-radius': '0',
      '--card-tablet-triage-border-end-end-radius': 'var(--border-radius-container)',
      '--card-icon-size': '4rem',
      '--card-icon-color': 'var(--color-icon-negative)',
      '--card-subtitle-color': 'var(--color-text-dimmed)',
      '--card-subtitle-margin-block': 'var(--card-subtitle-margin-block-start, 0) var(--card-subtitle-margin-block-end, var(--space-4))',
      '--card-subtitle-margin-inline': 'var(--card-subtitle-margin-inline-start, 0) var(--card-subtitle-margin-inline-end, 0)',
      '--card-title-margin-block': 'var(--card-title-margin-block-start, 0) var(--card-title-margin-block-end, var(--space-12))',
      '--card-title-margin-inline': 'var(--card-title-margin-inline-start, 0) var(--card-title-margin-inline-end, 0)',
      '--card-content-padding-block': 'var(--card-content-padding-block-start, var(--space-24)) var(--card-content-padding-block-end, var(--space-32))',
      '--card-content-padding-inline': 'var(--card-content-padding-inline-start, var(--space-20)) var(--card-content-padding-inline-end, var(--space-20))',
      '--card-tablet-content-padding-block': 'var(--card-tablet-content-padding-block-start, var(--space-40)) var(--card-tablet-content-padding-block-end, var(--space-48))',
      '--card-tablet-content-padding-inline': 'var(--card-tablet-content-padding-inline-start, var(--space-48)) var(--card-tablet-content-padding-inline-end, var(--space-40))',
      '--card-mobile-icon-size': '3rem',
      '--card-title-font': 'var(--font-h1)',
      '--card-title-letter-spacing': 'var(--letter-spacing-h1)',
    },
  },
};

export const Ambulance = {
  render: (args) => ({
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
  }),
};

export const Emergency = {
  render: (args) => ({
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
  }),

  args: { type: 'emergency' },
};

export const Consultation24 = {
  render: (args) => ({
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
  }),

  args: { type: 'consultation_24' },
};

export const Consultation = {
  render: (args) => ({
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
  }),

  args: { type: 'consultation' },
};

export const SelfCare = {
  render: (args) => ({
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
  }),

  args: { type: 'self_care' },
};

export const ModernAmbulance = {
  render: (args) => ({
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
  }),

  args: {
    type: 'emergency_ambulance',
    subtitle: '',
    modifiers: [ 'ui-card--modern' ],
  },
};

export const ModernEmergency = {
  render: (args) => ({
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
  }),

  args: {
    type: 'emergency',
    subtitle: '',
    modifiers: [ 'ui-card--modern' ],
  },
};

export const ModernConsultation24 = {
  render: (args) => ({
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
  }),

  args: {
    type: 'consultation_24',
    subtitle: '',
    modifiers: [ 'ui-card--modern' ],
  },
};

export const ModernConsultation = {
  render: (args) => ({
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
  }),

  args: {
    type: 'consultation',
    subtitle: '',
    modifiers: [ 'ui-card--modern' ],
  },
};

export const ModernSelfCare = {
  render: (args) => ({
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
  }),

  args: {
    type: 'self_care',
    subtitle: '',
    modifiers: [ 'ui-card--modern' ],
  },
};

export const WithDetailsSlot = {
  render: (args) => ({
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
  }),
};

export const WithTriageSlot = {
  render: (args) => ({
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
  }),
};

export const WithContentSlot = {
  render: (args) => ({
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
  }),
};

export const WithSubtitleSlot = {
  render: (args) => ({
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
  }),
};

export const WithTitleSlot = {
  render: (args) => ({
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
  }),
};

export const WithDescriptionSlot = {
  render: (args) => ({
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
  }),
};

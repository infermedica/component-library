import {Warning} from "@/components/atoms/UiAlert/UiAlert.stories.js";
import UiCard from '@/components/organisms/UiCard/UiCard.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiContainer from '@/components/organisms/UiContainer/UiContainer.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';

export default {
  title: 'Organisms/Card',
  component: UiCard,
  subcomponents: {
    UiIcon, UiText, UiHeading, UiContainer,
  },
  args: {
    title: 'Call an ambulance',
    subtitle: 'Recommendation',
    description: 'Your symptoms are very serious, and you may require emergency care.',
  },
  argTypes: {
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
    description: {
      control: { type: 'text' },
      table: {
        category: 'props',
      },
    },
    type: {
      control: {
        type: 'select',
        options: [
          'emergency_ambulance', 'emergency', 'consultation_24', 'consultation', 'self_care',
        ],
      },
      table: {
        category: 'props',
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
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :type="type"
  />`,
});

export const Ambulance = Template.bind({});
Ambulance.args = {
  type: 'emergency_ambulance',
};

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

export const WithSymptomsSlot = (args) => ({
  components: {
    UiCard, UiText, UiHeading, UiBulletPoints, UiBulletPointsItem,
  },
  setup() {
    return { ...args };
  },
  template: `
    <UiCard
      :title="title"
      :subtitle="subtitle"
      :description="description"
      :type="type"
    >
    <template #symptoms>
      <UiHeading 
        :level="4" 
        style="margin: var(--space-24) 0 var(--space-8) 0"
      >Alarming symptoms:</UiHeading>
      <UiBulletPoints>
        <template
          v-for="(symptom, key) in ['Vomiting', 'Abdominal pain, lasting 2 to 7 days']"
          :key="key"
        >
          <UiBulletPointsItem icon="bulletAlarming" class="ui-bullet-points-item--primary">
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

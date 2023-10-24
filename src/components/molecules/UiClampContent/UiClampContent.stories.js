import { actions } from '@storybook/addon-actions';
import { ref } from 'vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiClampContent from '@/components/molecules/UiClampContent/UiClampContent.vue';
import ArrowThinUp from '@/assets/icons/arrow-thin-up.svg';
import ArrowThinDown from '@/assets/icons/arrow-thin-down.svg';
import IconBulletCommon from '@/assets/icons/bullet-common.svg';
import {
  truncateHTMLByTextElementCount,
  truncateHTMLByElements,
  truncateHTMLByCharactersCount,
} from '@/utilities/helpers/truncate-HTML';
import './UiClampContent.stories.scss';

const events = actions({
  clickExpand: 'clickExpand',
  scrollToElementRequest: 'scrollToElementRequest',
});

const presenceSection = {
  heading: 'Reasoning for',
  subheading: 'Presence of symptoms:',
  evidences: [
    {
      id: 1,
      commonName: 'Headache',
    },
    {
      id: 2,
      commonName: 'Eye pain',
    },
    {
      id: 3,
      commonName: 'Pain around or behind eye',
    },
    {
      id: 4,
      commonName: 'Light sensitivity',
    },
    {
      id: 5,
      commonName: 'Moderate headache',
    },
  ],
};

const absenceSection = {
  heading: 'Reasons against',
  subheading: 'Absence of symptoms:',
  evidences: [
    {
      id: 1,
      commonName: 'Headache',
    },
    {
      id: 2,
      commonName: 'Eye pain',
    },
    {
      id: 3,
      commonName: 'Pain around or behind eye',
    },
  ],
};

export default {
  title: 'Molecules/ClampContent',
  component: UiClampContent,
  args: {
    presenceSection,
    absenceSection,
  },
  argTypes: {},
  decorators: [ () => ({
    template: `<div class="min-h-115">
      <story />
    </div>`,
  }) ],
};

export const TruncateHTMLByTextElementCount = {
  render: (args) => ({
    components: {
      UiClampContent,
      UiHeading,
      UiBulletPoints,
      UiBulletPointsItem,
      UiText,
    },
    setup() {
      const handleTruncateStrategy = ref(truncateHTMLByTextElementCount(7));

      return {
        ...args,
        ...events,
        ArrowThinUp,
        ArrowThinDown,
        handleTruncateStrategy,
      };
    },
    template: `<UiClampContent
      :truncate-strategy="handleTruncateStrategy"
      @expand="clickExpand"
      @scroll-to-element-request="scrollToElementRequest"
      class="ui-clamp-content-story-truncate-html-by-text-element-count"
    >
      <div class="ui-clamp-content-story-truncate-html-by-text-element-count__presence">
        <UiHeading level="4">
          {{ presenceSection.heading }}
        </UiHeading>
        <UiText class="ui-clamp-content-story-truncate-html-by-text-element-count__text">
          {{ presenceSection.subheading}}
        </UiText>
        <UiBulletPoints
          tag="ul"
        >
          <template
            v-for="evidence in presenceSection.evidences"
            :key="evidence.id"
          >
            <UiBulletPointsItem
              v-bind="{
                icon: ArrowThinUp,
                class: 'ui-bullet-points-item--primary',
              }"
            >
              <UiText
                tag="span"
                class="ui-text--2-comfortable"
              >
                {{ evidence.commonName }}
              </UiText>
            </UiBulletPointsItem>
          </template>
        </UiBulletPoints>
      </div>
      <div class="ui-clamp-content-story-truncate-html-by-text-element-count__absence">
        <UiHeading level="4">
          {{ absenceSection.heading }}
        </UiHeading>
        <UiText class="ui-clamp-content-story-truncate-html-by-text-element-count__text">
          {{ absenceSection.subheading }}
        </UiText>
        <UiBulletPoints
          tag="ul"
        >
          <template
            v-for="evidence in absenceSection.evidences"
            :key="evidence.id"
          >
            <UiBulletPointsItem
              v-bind="{
                icon: ArrowThinDown,
                class: 'ui-bullet-points-item--primary',
              }"
            >
              <UiText
                tag="span"
                class="ui-text--2-comfortable"
              >
                {{ evidence.commonName }}
              </UiText>
            </UiBulletPointsItem>
          </template>
        </UiBulletPoints>
      </div>
    </UiClampContent>`,
  }),
};

export const TruncateHTMLByElements = {
  render: (args) => ({
    components: {
      UiClampContent,
      UiHeading,
      UiText,
      UiBulletPoints,
      UiBulletPointsItem,
    },
    setup() {
      const handleTruncateStrategy = ref(truncateHTMLByElements(5));
      const list = [
        'Gargle with warm, salty water (one half teaspoon or 3 grams of salt in a glass of warm water)',
        'Drink plenty of water',
        'Eat cool or soft foods',
        'Avoid smoking or smoky places',
        'Suck ice cubes, ice lollies or hard sweets',
        'Rest in bed',
        'Humidify the air using cool-air humidifier or just sit in a steamy bathroom for several minutes',
      ];
      return {
        ...args,
        ...events,
        handleTruncateStrategy,
        list,
        IconBulletCommon,
      };
    },
    template: `<UiClampContent
      :truncate-strategy="handleTruncateStrategy"
      @expand="clickExpand"
      @scroll-to-element-request="scrollToElementRequest"
      class="ui-clamp-content-story-truncate-HTML-by-elements"
    >
      <UiHeading level="2">
        Common care methods
      </UiHeading>
      <UiHeading level="4">
        How can people manage acute viral throat infection?
      </UiHeading>
      <UiText class="ui-clamp-content-story-truncate-HTML-by-elements__text">
        To help soothe a sore throat and shorten how long it lasts, you can:
      </UiText>
      <UiBulletPoints
        tag="ul"
        type="1"
        :items="list"
        v-bind="{icon: IconBulletCommon}"
      />

      <UiHeading 
        level="4"
        class="ui-clamp-content-story-truncate-HTML-by-elements__heading"
      >
        What medicines can manage acute viral throat infection?
      </UiHeading>
      <UiText class="ui-clamp-content-story-truncate-HTML-by-elements__text">
        There is no dedicated treatment for viral pharyngitis. Painkillers, such as acetaminophen or ibuprofen can ease the pain and fever. Throat lozenge may also help with the pain.There is no need for antibiotics for a sore throat because they will not usually relieve the symptoms or speed up the recovery.
      </UiText>
      <UiText>
        It is recommended to use all medications with caution. They should be always used as directed and the labels should be read. It is recommended to talk with a healthcare professional before taking any medicines or giving it to children.
      </UiText>

      <UiHeading 
        level="4"
        class="ui-clamp-content-story-truncate-HTML-by-elements__heading"
      >
        How can acute viral throat infection be prevented?
      </UiHeading>
      <UiText>
        It is important to wash the hands frequently during the day, especially after coming home from work or school and to avoid contact with people who are sick. Not sharing drinking glasses or bottler, or eating utensils are also good habits to avoid getting sick.
      </UiText>

      <UiHeading 
        level="4"
        class="ui-clamp-content-story-truncate-HTML-by-elements__heading"
      >
        When should you get help from a healthcare provider for acute viral throat infection?
      </UiHeading>
      <UiText>
        Symptoms of viral tonsillopharyngitis should resolve within a week to 10 days. If they don’t, self-care methods don’t work, or if the symptoms get even worse with time, especially if they’re accompanied by difficulty swallowing or breathing, patients or their guardian should seek professional medical care.
      </UiText>
    </UiClampContent>`,
  }),
};

export const TruncateHTMLByCharactersCount = {
  render: (args) => ({
    components: {
      UiClampContent,
      UiHeading,
      UiBulletPoints,
      UiBulletPointsItem,
      UiText,
    },
    setup() {
      const handleTruncateStrategy = ref(truncateHTMLByCharactersCount(160));

      return {
        ...args,
        ...events,
        handleTruncateStrategy,
        ArrowThinUp,
        ArrowThinDown,
      };
    },
    template: `<UiClampContent
      :truncate-strategy="handleTruncateStrategy"
      @expand="clickExpand"
      @scroll-to-element-request="scrollToElementRequest"
      class="ui-clamp-content-story-truncate-html-by-characters-count"
    >
      <UiHeading level="2">About</UiHeading>
      <article>
        <UiHeading level="4">What is acute viral throat infection?</UiHeading>
        <UiText>
          Acute viral tonsillopharyngitis known as sore throat is an inflammation of throat and tonsils, caused by viral infection. It causes pain, discomfort, swelling in the throat, which can also be red and dry. 
        </UiText>
        <UiText>
          Other symptoms of pharyngitis may include painful swallowing, fever, bad breath, mild cough, joint pain, sneezing, headache, muscle aches, tender, swollen lymph nodes in the neck or runny nose. 
        </UiText>
      </article>

      <article class="ui-clamp-content-story-truncate-html-by-characters-count__article">
        <UiHeading level="4">What causes acute viral throat infection?</UiHeading>
      <UiText>
        Sore throats are usually caused by viruses (like cold or flu).
      </UiText>
      </article>

      <article class="ui-clamp-content-story-truncate-html-by-characters-count__article">
        <UiHeading level="4">How is acute viral throat infection diagnosed?</UiHeading>
        <UiText>
          Simple throat examination correlated with symptoms reported by the patient is usually enough to diagnose viral pharyngitis. In some cases, a rapid antigen test or throat culture may be performed to distinguish if sore throat is caused by viruses or bacteria. 
        </UiText>
      </article>
    </UiClampContent>
    `,
  }),
};

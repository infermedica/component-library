import { actions } from '@storybook/addon-actions';
import { ref } from 'vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiClampContent from '@/components/molecules/UiClampContent/UiClampContent.vue';
import ArrowThinUp from '@/assets/icons/arrow-thin-up.svg';
import ArrowThinDown from '@/assets/icons/arrow-thin-down.svg';
import { truncateHTMLByTextElementCount } from '@/utilities/helpers/truncate-HTML';
import './UiClampContent.stories.scss';

const events = actions({
  clickExpand: 'clickExpand',
  scrollToElementRequest: 'scrollToElementRequest',
});

const presenceEvidences = [
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
];
const absenceEvidences = [
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
];

export default {
  title: 'Molecules/ClampContent',
  component: UiClampContent,
  args: {
    presenceEvidences,
    absenceEvidences,
  },
  argTypes: {},
  decorators: [ () => ({
    template: `<div class="min-h-115">
      <story />
    </div>`,
  }) ],
};

export const Common = {
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
    template: `
    <UiClampContent
      :truncate-strategy="handleTruncateStrategy"
      @expand="clickExpand"
      @scroll-to-element-request="scrollToElementRequest"
    >
      <div class="ui-clamp-content__story-presence">
        <UiHeading level="4">
          Reasoning for
        </UiHeading>
        <UiText class="ui-clamp-content__story-text">
          Presence of symptoms:
        </UiText>
        <UiBulletPoints
          tag="ul"
        >
          <template
            v-for="evidence in presenceEvidences"
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
      <div class="ui-clamp-content__story-absence">
        <UiHeading level="4">
          Reasons against
        </UiHeading>
        <UiText class="ui-clamp-content__story-text">
          Absence of symptoms:
        </UiText>
        <UiBulletPoints
          tag="ul"
        >
          <template
            v-for="evidence in absenceEvidences"
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

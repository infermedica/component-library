import { actions } from '@storybook/addon-actions';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiClampContent from '@/components/molecules/UiClampContent/UiClampContent.vue';
import ArrowThinUp from '@/assets/icons/arrow-thin-up.svg';
import { truncateHTMLByTextElementCount } from '@/utilities/helpers/truncate-HTML';

const events = actions({
  clickExpand: 'clickExpand',
  scrollToElementRequest: 'scrollToElementRequest',
});
const subtitle = 'Reasons for';
const evidences = [
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
  {
    id: 6,
    commonName: 'Headache',
  },
  {
    id: 7,
    commonName: 'Eye pain',
  },
  {
    id: 8,
    commonName: 'Pain around or behind eye',
  },
  {
    id: 9,
    commonName: 'Light sensitivity',
  },
  {
    id: 10,
    commonName: 'Moderate headache',
  },
];

export default {
  title: 'Molecules/ClampContent',
  component: UiClampContent,
  args: {
    subtitle,
    evidences,
  },
  argTypes: {},
  decorators: [ (story) => ({
    components: { story },
    template: `<div class="max-w-32 min-h-115">
      <story/>
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
      const handleTruncateStrategy = () => truncateHTMLByTextElementCount(7);

      return {
        ...args,
        ...events,
        ArrowThinUp,
        handleTruncateStrategy,
      };
    },
    template: `<UiClampContent
      :truncate-strategy="handleTruncateStrategy"
      @expand="clickExpand"
      @scroll-to-element-request="scrollToElementRequest"
      v-bind="$props"
    >
      <UiHeading level="4">
        {{ subtitle }}
      </UiHeading>
      <UiBulletPoints
        tag="ul"
      >
        <template
          v-for="evidence in evidences"
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
    </UiClampContent>`,
  }),
};

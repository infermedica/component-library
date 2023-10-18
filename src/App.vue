<template>
  <UiHeading
    level="2"
  >
    {{ title }}
  </UiHeading>
  <UiClampContent
    :truncate-strategy="truncateHTMLByTextElementCount(7)"
    @expand="$emit('clickExpand', 'reasoning')"
    @scroll-to-element-request="$emit('scrollToElementRequest', $event)"
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
  </UiClampContent>
</template>

<script setup lang="ts">
import { truncateHTMLByTextElementCount } from './utilities/helpers/truncate-HTML';
// import { UiButton } from '../index';
import UiText from './components/atoms/UiText/UiText.vue';
import UiBulletPoints from './components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from './components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import UiHeading from './components/atoms/UiHeading/UiHeading.vue';
import UiClampContent from './components/molecules/UiClampContent/UiClampContent.vue';
import ArrowThinUp from './assets/icons/arrow-thin-up.svg';

defineEmits([
  'scrollToElementRequest',
  'clickExpand',
]);

const title = 'Reasoning';
const subtitle = 'Reasons for';
const evidences = [
  {
    id: 1,
    commonName: 'test',
  },
  {
    id: 2,
    commonName: 'test',
  },
  {
    id: 3,
    commonName: 'test',
  },
  {
    id: 4,
    commonName: 'test',
  },
  {
    id: 5,
    commonName: 'test',
  },
  {
    id: 6,
    commonName: 'test',
  },
  {
    id: 7,
    commonName: 'test',
  },
  {
    id: 8,
    commonName: 'test',
  },
  {
    id: 9,
    commonName: 'test',
  },
];

</script>

<style lang="scss">
.custom-button {
  --button-border-radius: 0;
}
</style>

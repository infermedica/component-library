<template>
  <div
    ref="truncateContent"
    class="ui-truncate-content"
  >
    <div
      v-show="expanded"
      ref="content"
      class="ui-truncate-content__inner"
    >
      <!-- @slot Use this slot to place content inside TruncateContent.  -->
      <slot />
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-show="!expanded"
      class="ui-truncate-content__clamped"
      v-html="clippedContentHTML"
    />
    <!-- @slot Use this slot to replace toggle button. -->
    <slot
      name="toggle"
      v-bind="{
        isContentTruncated,
        handleToggleClick,
        expanded,
      }"
    >
      <UiButton
        v-if="isContentTruncated"
        class="
          ui-truncate-content__button
          ui-button--text
          ui-button--has-icon
        "
        @click="handleToggleClick"
      >
        <template v-if="expanded">
          <!-- @slot Use this slot to replace icon inside hide button. -->
          <slot
            name="toggle-hide"
            v-bind="{ iconHideAttrs: defaultProps.iconHideAttrs }"
          >
            <UiIcon
              v-if="hasHideIcon"
              class="ui-button__icon"
              v-bind="defaultProps.iconHideAttrs"
            />
            {{ defaultProps.hideButtonText }}
          </slot>
        </template>
        <template v-else>
          <!-- @slot Use this slot to replace icon inside expand button. -->
          <slot name="toggle-expand">
            <UiIcon
              v-if="hasExpandIcon"
              class="ui-button__icon"
              v-bind="defaultProps.iconExpandAttrs"
            />
            {{ defaultProps.expandButtonText }}
          </slot>
        </template>
      </UiButton>
    </slot>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  onUpdated,
  ref,
} from 'vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import ChevronDownIcon from '../../../assets/icons/chevron-down.svg';
import ChevronUpIcon from '../../../assets/icons/chevron-up.svg';
import {
  truncateHTMLByCharactersCount,
  truncateHTMLByElements,
  truncateHTMLByTextElementCount,
} from '../../../utilities/helpers/truncate-HTML';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import type { DefineAttrsProps } from '../../../types';

export interface TruncateContentProps {
  /**
   * Use this props to set truncateStrategy for a component.
   */
  truncateStrategy?: ReturnType<
    typeof truncateHTMLByElements |
    typeof truncateHTMLByCharactersCount |
    typeof truncateHTMLByTextElementCount
  >,
  /**
   * Use this props to pass attrs for UiIcon expand
   */
  iconExpandAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for UiIcon expand
   */
  iconHideAttrs?: IconAttrsProps;
  /**
   * Use this props to hide expand icon in button.
   */
  hasExpandIcon?: boolean;
  /**
   * Use this props to hide hide icon in button.
   */
  hasHideIcon?: boolean;
  /**
   * Use this props to set expand button's text.
   */
  expandButtonText?: string;
  /**
   * Use this props to set hide button's text.
   */
  hideButtonText?: string;
}
export type TruncateContentAttrsProps = DefineAttrsProps<TruncateContentProps>;
const props = withDefaults(defineProps<TruncateContentProps>(), {
  truncateStrategy: () => (truncateHTMLByTextElementCount(7)),
  iconExpandAttrs: () => ({}),
  iconHideAttrs: () => ({}),
  hasExpandIcon: true,
  hasHideIcon: true,
  expandButtonText: '',
  hideButtonText: '',
});

const defaultProps = computed(() => ({
  iconExpandAttrs: {
    icon: ChevronDownIcon,
    ...props.iconExpandAttrs,
  },
  iconHideAttrs: {
    icon: ChevronUpIcon,
    ...props.iconHideAttrs,
  },
  expandButtonText: 'Show more',
  hideButtonText: 'Show less',
}));

const emit = defineEmits([
  'expand',
  'hide',
  'scrollToElementRequest',
]);

const truncateContentElement = ref<HTMLElement | null>(null);
const expanded = ref(false);
const content = ref<HTMLElement | null>(null);
const isContentTruncated = ref(false);
const clippedContentHTML = ref<string | null>(null);

const truncateContent = () => {
  if (content.value === null) return;
  const {
    content: newContent, truncated,
  } = props.truncateStrategy(content.value);
  clippedContentHTML.value = newContent;
  isContentTruncated.value = truncated;
};

const handleToggleClick = () => {
  expanded.value = !expanded.value;
  emit(expanded.value ? 'expand' : 'hide');
  if (!expanded.value) emit('scrollToElementRequest', truncateContentElement.value);
};

onMounted(truncateContent);
onUpdated(truncateContent);

</script>

<style lang="scss">
@use "../../../styles/mixins";

.ui-truncate-content {
  $element: ui-truncate-content;

  &__button {
    @include mixins.use-logical($element + "-truncate-content", margin, var(--space-24) 0 0 0);

  }
}
</style>

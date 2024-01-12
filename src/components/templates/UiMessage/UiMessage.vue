<template>
  <div class="ui-message">
    <!-- @slot Use this slot to replace content template. -->
    <slot
      name="content"
      v-bind="{
        subtitle,
        title,
        textSubtitleAttrs,
        headingTitleAttrs,
      }"
    >
      <div class="ui-message__content">
        <!-- @slot Use this slot to replace subtitle template. -->
        <slot
          name="subtitle"
          v-bind="{
            subtitle,
            textSubtitleAttrs,
          }"
        >
          <UiText
            v-if="subtitle"
            v-bind="textSubtitleAttrs"
            class="ui-message__subtitle"
          >
            {{ subtitle }}
          </UiText>
        </slot>
        <!-- @slot Use this slot to replace title template. -->
        <slot
          name="title"
          v-bind="{
            title,
            headingTitleAttrs,
          }"
        >
          <UiHeading
            v-if="title"
            v-bind="headingTitleAttrs"
            class="ui-message__title"
          >
            {{ title }}
          </UiHeading>
        </slot>
        <!-- @slot Use this slot to place message content. -->
        <slot />
      </div>
    </slot>
    <!-- @slot Use this slot to replace aside template. -->
    <slot
      name="aside"
      v-bind="{
        illustration,
        iconIllustrationAttrs: defaultProps.iconIllustrationAttrs,
      }"
    >
      <div
        v-if="illustration"
        class="ui-message__aside"
      >
        <!-- @slot Use this slot to replace illustration template. -->
        <slot
          name="illustration"
          v-bind="{ iconIllustrationAttrs: defaultProps.iconIllustrationAttrs }"
        >
          <UiIcon
            v-bind="defaultProps.iconIllustrationAttrs"
            class="ui-message__illustration"
          />
        </slot>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { TextAttrsProps } from '../../atoms/UiText/UiText.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import type { HeadingAttrsProps } from '../../atoms/UiHeading/UiHeading.vue';
import type {
  Icon,
  DefineAttrsProps,
} from '../../../types';

export interface MessageProps {
  /**
   * Use this props to set message title.
   */
  title?: string;
  /**
   * Use this props to set message subtitle.
   */
  subtitle?: string;
  /**
   * Use this props to set message illustration.
   */
  illustration?: Icon;
  /**
   * Use this props to pass attrs for subtitle UiText.
   */
  textSubtitleAttrs?: TextAttrsProps;
  /**
   * Use this props to pass attrs for title UiHeading.
   */
  headingTitleAttrs?: HeadingAttrsProps;
  /**
   * Use this props to pass attrs for illustration UiIcon.
   */
  iconIllustrationAttrs?: IconAttrsProps;
}
export type MessageAttrsProps = DefineAttrsProps<MessageProps>;

const props = withDefaults(defineProps<MessageProps>(), {
  title: '',
  subtitle: '',
  illustration: '',
  textSubtitleAttrs: () => ({}),
  headingTitleAttrs: () => ({}),
  iconIllustrationAttrs: () => ({}),
});
const defaultProps = computed(() => ({
  iconIllustrationAttrs: {
    icon: props.illustration,
    ...props.iconIllustrationAttrs,
  },
}));
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-message {
  $this: &;
  $element: message;

  display: flex;
  flex-direction: functions.var($element, flex-direction, column-reverse);

  @include mixins.from-tablet {
    flex-direction: functions.var($element + "-tablet", flex-direction, row);
  }

  &__content {
    flex: 1;
    align-self: functions.var($element + "-content", align-self, flex-end);
  }

  &__title {
    @include mixins.use-logical($element + "-title", margin, 0 0 var(--space-8) 0);
  }

  &__aside {
    @include mixins.use-logical($element + "-aside", margin, 0 0 var(--space-24) 0);

    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-aside", margin, 0 0 0 var(--space-40));

      align-items: flex-start;
    }
  }

  &__illustration {
    --icon-size: 100%;

    max-width: functions.var($element + "-illustration", size, 15rem);
    max-height: functions.var($element + "-illustration", size, 15rem);
  }
}
</style>

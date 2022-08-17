<template>
  <div class="ui-message">
    <!-- @slot Use this slot to replace content template. -->
    <slot
      name="content"
      v-bind="{subtitle, title, headingTitleAttrs}"
    >
      <div class="ui-message__content">
        <!-- @slot Use this slot to replace subtitle template. -->
        <slot
          name="subtitle"
          v-bind="{subtitle}"
        >
          <UiText
            v-if="subtitle"
            class="ui-message__subtitle"
          >
            {{ subtitle }}
          </UiText>
        </slot>
        <!-- @slot Use this slot to replace title template. -->
        <slot
          name="title"
          v-bind="{title, headingTitleAttrs}"
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
      v-bind="{illustration}"
    >
      <div
        v-if="illustration"
        class="ui-message__aside"
      >
        <!-- @slot Use this slot to replace illustration template. -->
        <slot
          name="illustration"
          v-bind="{illustration}"
        >
          <UiIcon
            :icon="illustration"
            class="ui-message__illustration"
          />
        </slot>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import type { Icon } from '../../../types/icon';
import type { PropsAttrs } from '../../../types/attrs';

defineProps({
  /**
   * Use this props to set message title.
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set message subtitle.
   */
  subtitle: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set message illustration.
   */
  illustration: {
    type: [String, false] as PropType<Icon | false>,
    default: '',
  },
  /**
   * Use this props to pass attrs for title UiHeading
   */
  headingTitleAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";
@import "../../../styles/functions/functions";

.ui-message {
  $this: &;
  $element: message;

  display: flex;
  flex-direction: css-var($element, flex-direction, column-reverse);

  @include from-tablet {
    flex-direction: css-var($element + "-tablet", flex-direction, row);
  }

  &__content {
    flex: 1;
    align-self: css-var($element + "-content", align-self, flex-end);
  }

  &__title {
    margin: css-var($element + "-title", margin, 0 0 var(--space-8) 0);
  }

  &__aside {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    margin: css-var($element + "-aside", margin, 0 0 var(--space-24) 0);

    @include from-tablet {
      align-items: flex-start;
      margin: css-var($element + "-tablet-aside", margin, 0 0 0 var(--space-40));

      [dir="rtl"] & {
        margin: css-var($element + "-rtl-tablet-aside", margin, 0 var(--space-40) 0 0);
      }
    }
  }

  &__illustration {
    --icon-size: 100%;

    max-width: css-var($element + "-illustration", size, 15rem);
    max-height: css-var($element + "-illustration", size, 15rem);
  }
}
</style>

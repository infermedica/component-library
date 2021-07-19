<template>
  <div class="ui-message">
    <!-- @slot Use this slot to replace content template. -->
    <slot
      name="content"
      v-bind="{title}"
    >
      <div class="ui-message__content">
        <!-- @slot Use this slot to replace subtitle template. -->
        <slot
          name="subtitle"
          v-bind="subtitle"
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
          v-bind="{title}"
        >
          <UiHeading
            v-if="title"
            class="ui-message__title"
          >
            {{ title }}
          </UiHeading>
        </slot>
        <!-- @slot Use this slot to place message content. -->
        <slot />
      </div>
    </slot>
    <slot
      name="aside"
      v-bind="illustration"
    >
      <div
        v-if="illustration"
        class="ui-message__aside"
      >
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

<script>
import UiText from '../../atoms/UiText/UiText.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';

export default {
  name: 'UiMessage',
  components: {
    UiText,
    UiIcon,
    UiHeading,
  },
  props: {
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
      type: [String, Boolean],
      default: '',
    },
  },
};
</script>

<style lang="scss">
.ui-message {
  display: flex;
  flex-direction: var(--message-flex-direction, column-reverse);

  @media (min-width: 768px) {
    flex-direction: var(--message-tablet-flex-direction, row);
  }

  &__content {
    flex: 1;
    align-self: var(--message-content-align-slef, flex-end);
    margin: var(--message-content-margin, 0);

    @media (min-width: 768px) {
      margin: var(--message-content-tablet-margin, var(--space-16) 0 0 0);
    }
  }

  &__subtitle {
    margin: var(--message-title-margin, 0 0 var(--space-8) 0);
    color: var(--color-text-dimmed);

    @media (min-width: 768px) {
      margin: var(--message-title-tablet-margin, 0 0 var(--space-4) 0);
    }
  }

  &__title {
    margin: var(--message-title-margin, 0 0 var(--space-8) 0);
  }

  &__aside {
    flex: none;
    margin: var(--message-aside-margin, 0 auto var(--space-24) auto);

    @media (min-width: 768px) {
      order: 0;
      margin: var(--message-aside-tablet-margin, 0 0 0 var(--space-40));

      [dir=rtl] & {
        margin: var(--message-aside-tablet-rtl-margin, 0 var(--space-40) 0 0);
      }
    }
  }

  &__illustration {
    --icon-size: 100%;

    max-width: var(--message-illustration-size, var(--message-illustration-width, 15rem));
    max-height: var(--message-illustration-size, var(--message-illustration-height, 15rem));
  }
}
</style>

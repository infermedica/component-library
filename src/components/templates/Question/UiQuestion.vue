<template>
  <div class="ui-question">
    <!-- @slot Use this slot to replace title template. -->
    <slot
      name="title"
      v-bind="{title}"
    >
      <UiHeading
        v-if="title"
        class="ui-question__title"
      >
        {{ title }}
      </UiHeading>
    </slot>
    <slot
      name="info"
      v-bind="{options}"
    >
      <UiButton
        v-if="options.info"
        class="ui-question__alert ui-button--text"
      >
        <UiAlert type="info">
          {{ translation.info }}
        </UiAlert>
      </UiButton>
    </slot>
    <div class="ui-question__content">
      <!-- @slot Use this slot to place content inside question. -->
      <slot />
    </div>
    <!-- @slot Use this slot to replace actions template. -->
    <slot
      name="actions"
      v-bind="{options, translation}"
    >
      <div
        v-if="options.why || options.issue"
        class="ui-question__actions"
      >
        <!-- @slot Use this slot to replace why template. -->
        <slot
          name="why"
          v-bind="{options, translation}"
        >
          <div
            v-if="options.why"
            class="ui-question__action"
          >
            <UiButton class="ui-button--text">
              {{ translation.why }}
            </UiButton>
          </div>
        </slot>
        <!-- @slot Use this slot to replace issue template. -->
        <slot
          name="issue"
          v-bind="{options, translation}"
        >
          <div
            v-if="options.issue"
            class="ui-question__action"
          >
            <UiButton class="ui-question__action ui-button--text">
              {{ translation.issue }}
            </UiButton>
          </div>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script>
import UiAlert from '../../atoms/UiAlert/UiAlert.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';

export default {
  name: 'UiQuestion',
  components: {
    UiAlert,
    UiButton,
    UiHeading,
  },
  props: {
    /**
     * Use this props to set question title.
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Use this props to set valid state of the question.
     */
    translation: {
      type: Object,
      default: () => ({
        info: 'What does it mean?',
        why: 'Why am I being asked this?',
        issue: 'Report an issues with this question',
      }),
    },
    /**
     * Use this props to setup question.
     */
    options: {
      type: Object,
      default: () => ({
        info: true,
        why: true,
        issue: true,
      }),
    },
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';

.ui-question {
  padding: var(--question-padding, 0 var(--space-20));

  @media (min-width: 768px) {
    padding: var(--question-tablet-padding, var(--space-16) var(--space-48));
  }

  &__title {
    background: inherit;
  }

  &__alert {
    margin: var(--question-alert-margin, var(--space-12) 0 0 0);
  }

  &__actions {
    display: flex;
    flex-direction: column;
    margin: var(--space-32) 0 0 0;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  &__content {
    margin: var(--question-mobile-content-margin, var(--space-20) 0 0 calc(var(--space-20) * -1));

    [dir=rtl] & {
      margin: var(--question-mobile-content-margin, var(--space-20) calc(var(--space-20) * -1) 0 0);
    }

    @media (min-width: 768px) {
      [dir] & {
        margin: var(--question-tablet-content-margin, var(--space-20) 0 0 0);
      }
    }
  }

  &__action {
    display: flex;
    align-items: center;
    margin: var(--space-20) 0 0 0;

    @media (min-width: 768px) {
      margin: 0;
    }

    &::before {
      @media (min-width: 768px) {
        flex: none;
        align-self: stretch;
        width: 1px;
        margin: 0 var(--space-12);
        content: "";
        background: var(--color-border-divider);
      }
    }

    &:first-child {
      margin: 0;

      &::before {
        content: none;
      }
    }
  }
}
</style>

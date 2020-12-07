<template>
  <div class="question">
    <!-- @slot Use this slot to replace title template. -->
    <slot
      name="title"
      v-bind="{title}"
    >
      <UiHeading class="question__title">
        {{ title }}
      </UiHeading>
    </slot>
    <slot
      name="info"
      v-bind="{options}"
    >
      <UiButton
        v-if="options.info"
        class="question__alert ui-button--text"
      >
        <UiAlert type="info">
          {{ translation.info }}
        </UiAlert>
      </UiButton>
    </slot>
    <!-- @slot Use this slot to replace hint template. -->
    <slot
      name="hint"
      v-bind="{hint}"
    >
      <UiAlert
        :type="hintType"
        class="question__hint"
      >
        {{ hint }}
      </UiAlert>
    </slot>
    <!-- @slot Use this slot to place content inside question. -->
    <slot />
    <!-- @slot Use this slot to replace actions template. -->
    <slot
      name="actions"
      v-bind="{options, translation}"
    >
      <div class="question__actions">
        <!-- @slot Use this slot to replace why template. -->
        <slot
          name="why"
          v-bind="{options, translation}"
        >
          <div
            v-if="options.why"
            class="question__action"
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
            class="question__action"
          >
            <UiButton class="question__action ui-button--text">
              {{ translation.issue }}
            </UiButton>
          </div>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script>
import { computed } from 'vue';
import UiAlert from '../../atoms/UiAlert/UiAlert.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';

export default {
  name: 'Question',
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
     * Use this props to set hint for question.
     */
    hint: {
      type: String,
      default: '',
    },
    /**
     * Use this props to set invalid state for question.
     */
    invalid: {
      type: Boolean,
      default: true,
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
  setup(props) {
    const hintType = computed(() => (props.invalid ? 'error' : 'default'));
    return {
      hintType,
    };
  },
};
</script>

<style lang="scss">
.question {
  @media (min-width: 480px) {
    padding: var(--space-16) var(--space-48);
  }

  &__title {
    background: inherit;
  }

  &__alert {
    margin: var(--question-alert-margin, var(--space-12) 0 0 0);
  }

  &__hint {
    display: flex;
    margin: var(--question-hint-margin, var(--space-32) 0 var(--space-12) 0);
    font: var(--question-hint-font, var(--font-body-2-comfortable-thick));
    color: var(--question-hint-color, var(--color-text-dimmed));
  }

  &__actions {
    display: flex;
    flex-direction: column;
    margin: var(--space-32) 0 0 0;

    @media (min-width: 480px) {
      flex-direction: row;
      align-items: center;
    }
  }

  &__action {
    display: flex;
    align-items: center;
    margin: var(--space-20) 0 0 0;

    @media (min-width: 480px) {
      margin: 0;
    }

    &::before {
      @media (min-width: 480px) {
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

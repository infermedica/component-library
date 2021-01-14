<template>
  <div class="ui-message">
    <!-- @slot Use this slot to replace content template. -->
    <slot
      name="content"
      v-bind="{title}"
    >
      <div class="ui-message__content">
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
          <UiImage
            class="ui-message__illustration"
            :src="`/assets/illustrations/${illustration}.svg`"
          />
        </slot>
      </div>
    </slot>
  </div>
</template>

<script>
import UiImage from '../../atoms/UiImage/UiImage.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';

export default {
  name: 'UiMessage',
  components: {
    UiImage,
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
  flex-direction: column-reverse;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  &__content {
    flex: 1;
    align-self: flex-end;
  }

  &__title {
    margin: 0 0 var(--space-8) 0;
  }

  &__aside {
    flex: none;
    margin: 0 auto var(--space-24) auto;

    @media (min-width: 768px) {
      order: 0;
      margin: 0 0 0 var(--space-40);
    }
  }

  &__illustration {
    width: 100%;
    max-width: 15rem;
  }
}
</style>

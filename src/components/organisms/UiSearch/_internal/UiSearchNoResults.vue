<template>
  <div
    class="ui-search-no-results"
  >
    <div class="ui-search-no-results__header">
      <UiIcon
        icon="sad"
        class="ui-search-no-results__icon"
      />
      <UiHeading
        level="4"
        class="ui-search-no-results__title"
      >
        No results
      </UiHeading>
    </div>
    <div class="ui-search-no-results__content">
      <UiText>Unfortunately, the symptom was not found.</UiText>
      <UiBulletPoints>
        <UiBulletPointsItem>
          <UiText>Please try to enter single words</UiText>
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          <UiText>Keep in mind, that you can only select symptoms from the autocomplete list</UiText>
        </UiBulletPointsItem>
      </UiBulletPoints>
    </div>
  </div>
</template>

<script>
import UiHeading from '../../../atoms/UiHeading/UiHeading.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiBulletPoints from '../../../molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '../../../molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';

export default {
  name: 'UiSearchNoResults',
  components: {
    UiBulletPoints,
    UiBulletPointsItem,
    UiHeading,
    UiIcon,
    UiText,
  },
};
</script>

<style lang="scss">
.ui-search-no-results {
  &__header {
    --icon-size: 1.5rem;
    --icon-color: var(--color-icon-secondary);

    display: flex;
    align-items: center;
  }

  &__icon {
    margin: 0 var(--space-12) 0 0;
  }

  &__content {
    padding: 0 0 0 var(--space-36);
    margin: var(--space-8) 0 0 0;
  }
}
</style>

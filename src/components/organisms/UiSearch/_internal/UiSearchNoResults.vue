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
      <UiList>
        <UiListItem>
          <UiText>Please try to enter single words</UiText>
        </UiListItem>
        <UiListItem>
          <UiText>Keep in mind, that you can only select symptoms from the autocomplete list</UiText>
        </UiListItem>
      </UiList>
    </div>
  </div>
</template>

<script>
import UiHeading from '../../../atoms/UiHeading/UiHeading.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiList from '../../UiList/UiList.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';

export default {
  name: 'UiSearchNoResults',
  components: {
    UiHeading,
    UiIcon,
    UiText,
    UiList,
    UiListItem,
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

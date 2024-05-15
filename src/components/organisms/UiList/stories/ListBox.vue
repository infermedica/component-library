<template>
  <InfiniteScroll
    ref="elementContainer"
    :next="asyncElements"
    :has-more="hasAsyncElements"
    class="search-dropdown__scroll"
    :class="{ 'search-dropdown__scroll--has-input': inputRow }"
  >
    <div
      v-if="showList"
      class="search-dropdown__scroll-container"
    >
      <template v-if="showCategories && categories.length">
        <template v-for="(category, key) in categories" :key="key">
          <SearchDropdownCategoryRow>{{ t(category.label) }}</SearchDropdownCategoryRow>
          <DynamicScroller
            v-slot="{ item, index, active }"
            :items="byCategory(category.id as string)"
            :min-item-size="52"
            key-field="name"
            class="search-dropdown__dynamic-scroller"
          >
            <DynamicScrollerItem
              :item="item"
              :active="active"
              :data-index="index"
            >
              <SearchDropdownScrollerWrapper>
                <SearchDropdownRow v-model="selected" :value="item" />
              </SearchDropdownScrollerWrapper>
            </DynamicScrollerItem>
          </DynamicScroller>
        </template>
      </template>

      <template v-else>
        <DynamicScroller
          v-slot="{ item, index, active }"
          :items="elementsWithoutCustom"
          :min-item-size="52"
          key-field="id"
          class="search-dropdown__dynamic-scroller"
          :page-mode="true"
        >
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :data-index="index"
            :size-dependencies="[
              item.dose,
              item.label,
              item.commonName,
              item.category,
            ]"
          >
            <SearchDropdownScrollerWrapper>
              <slot
                name="row"
                :value="item"
                :update-selected="updateSelected"
              >
                <SearchDropdownRow v-model="selected" :value="item" />
              </slot>
            </SearchDropdownScrollerWrapper>
          </DynamicScrollerItem>
        </DynamicScroller>
      </template>

      <template v-if="showCustomOnMobile">
        <SearchDropdownCategoryRow>
          {{ t('searchDropdown.customElementsLabel') }}
        </SearchDropdownCategoryRow>
        <DynamicScroller
          v-slot="{ item, index, active }"
          :items="customElements"
          :min-item-size="72"
          key-field="name"
          class="search-dropdown__dynamic-scroller"
        >
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :data-index="index"
          >
            <SearchDropdownScrollerWrapper>
              <SearchDropdownRow v-model="selected" :value="item" />
            </SearchDropdownScrollerWrapper>
          </DynamicScrollerItem>
        </DynamicScroller>
      </template>
    </div>

    <div
      v-else-if="showEmptyState"
      class="search-dropdown__empty-state"
    >
      <AppIcon
        class="search-dropdown__empty-state-icon"
        icon="minus"
      />
      {{ t('searchDropdown.notFound') }}
    </div>
  </InfiniteScroll>
  <SearchDropdownInputRow
    v-if="inputRow"
    :value="inputText"
    :limit="inputLimit"
    class="search-dropdown__input"
    :class="{ 'search-dropdown__input--no-border': !showEmptyState }"
    @add="onAdd"
  />
</template>

<script setup>
import {
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiList } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
</script>

<style lang="scss">
.answer-with-checkbox {
  &__label {
    display: flex;
    justify-content: space-between;
  }
}
</style>

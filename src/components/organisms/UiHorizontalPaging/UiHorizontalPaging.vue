<template>
  <div
    :class="[
      'ui-horizontal-paging',
      { 'ui-horizontal-paging--nested': isNested },
    ]"
  >
    <!-- @slot Use this slot to replace header template. -->
    <slot name="header">
      <div
        v-if="isHeaderDisplayed"
        class="ui-horizontal-paging__header"
      >
        <!-- @slot Use this slot to replace back-button template. -->
        <slot
          name="back-button"
          v-bind="{
            isActive,
            buttonBackAttrs,
            handleBackClick,
          }"
        >
          <UiButton
            v-if="isActive"
            v-bind="buttonBackAttrs"
            class="ui-button--icon ui-horizontal-paging__back"
            @click="handleBackClick"
          >
            <UiIcon
              v-bind="defaultProps.iconBackAttrs"
              class="ui-button__icon"
            />
            <span class="visual-hidden">{{ defaultProps.translation.back }} {{ backToTitle }}</span>
          </UiButton>
        </slot>
        <!-- @slot Use this slot to replace title template. -->
        <slot
          name="title"
          v-bind="{
            headingTitleAttrs,
            title: currentTitle,
          }"
        >
          <UiHeading v-bind="headingTitleAttrs">
            {{ currentTitle }}
          </UiHeading>
        </slot>
      </div>
    </slot>
    <div class="ui-horizontal-paging__wrapper">
      <div
        :class="[
          'ui-horizontal-paging__section',
          { 'ui-horizontal-paging__section--is-active': isActive },
        ]"
      >
        <!-- @slot Use this slot to replace menu template. -->
        <slot
          name="menu"
          v-bind="{
            items: menuItemsToRender,
            isActive,
          }"
        >
          <UiMenu
            ref="menuTemplateRefs"
            :items="menuItemsToRender"
            v-bind="menuAttrs"
            class="ui-horizontal-paging__menu"
          >
            <template
              v-for="(_, name) in menuItemsSlots"
              #[name]="data"
            >
              <slot
                v-bind="data"
                :name="name"
              />
            </template>
          </UiMenu>
        </slot>
        <!-- @slot Use this slot to replace content template. -->
        <slot name="content">
          <div class="ui-horizontal-paging__content">
            <!-- @slot Use this slot to place inside pages items. -->
            <slot>
              <template
                v-for="(item, index) in items"
                :key="index"
              >
                <UiHorizontalPagingItem
                  v-bind="item"
                >
                  <slot
                    v-bind="{ item }"
                    :name="item.name"
                  />
                </UiHorizontalPagingItem>
              </template>
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  provide,
  inject,
  watch,
  nextTick,
  useSlots,
  type ComputedRef,
  type WritableComputedRef,
  type Ref,
} from 'vue';
import UiMenu, { type MenuAttrsProps } from '../UiMenu/UiMenu.vue';
import { focusElement } from '../../../utilities/helpers';
import type {
  Icon,
  DefineAttrsProps,
} from '../../../types';
import UiButton, { type ButtonAttrsProps } from '../../atoms/UiButton/UiButton.vue';
import UiIcon, { type IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import type { MenuItemAttrsProps } from '../UiMenu/_internal/UiMenuItem.vue';
import UiHorizontalPagingItem, { type HorizontalPagingItemProps } from './_internal/UiHorizontalPagingItem.vue';
import UiHeading, { type HeadingAttrsProps } from '../../atoms/UiHeading/UiHeading.vue';

export type HorizontalPagingHandleItems = Record<string, HorizontalPagingItemProps>;
export type HorizontalPagingActiveItems = WritableComputedRef<HorizontalPagingItemProps[]>;
export interface HorizontalPagingTranslation {
  back?: string;
}
export interface HorizontalPagingProps{
  /**
   * Use this props to set active page item.
   */
  modelValue?: HorizontalPagingItemProps[] | HorizontalPagingItemProps;
  /**
   * Use this props to set inside pages title.
   */
  title?: string;
  /**
   * Use this props to pass inside pages items.
   */
  items?: HorizontalPagingItemProps[];
  /**
   * Use this props to display inside pages header.
   */
  hasHeader?: boolean;
  /**
   * Use this props to pass attrs for back UiButton
   */
  buttonBackAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for back button UiIcon
   */
  iconBackAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for title UiHeading
   */
  headingTitleAttrs?: HeadingAttrsProps;
  /**
   * Use this props to pass attrs for title UiMenu
   */
  menuAttrs?: MenuAttrsProps;
  /**
   * Use this props to pass labels inside component translation.
   */
  translation?: HorizontalPagingTranslation;
  /** Use this props to pass menu template ref when you use menu slot. */
  // menuTemplateRefs?: InstanceType<typeof UiMenu> | null
}
export type HorizontalPagingAttrsProps = DefineAttrsProps<HorizontalPagingProps>;
export interface HorizontalPagingEmits {
  (event: 'update:modelValue', value: HorizontalPagingItemProps[]): void;
}

const props = withDefaults(defineProps<HorizontalPagingProps>(), {
  modelValue: () => ([]),
  title: '',
  items: () => ([]),
  hasHeader: true,
  buttonBackAttrs: () => ({}),
  iconBackAttrs: () => ({ icon: 'chevron-left' }),
  headingTitleAttrs: () => ({}),
  menuAttrs: () => ({}),
  translation: () => ({ back: 'Back to' }),
  // menuTemplateRefs: null,
});
const defaultProps = computed(() => {
  const icon: Icon = 'chevron-left';
  return {
    translation: {
      back: 'Back to',
      ...props.translation,
    },
    iconBackAttrs: {
      icon,
      ...props.iconBackAttrs,
    },
  };
});
const emit = defineEmits<HorizontalPagingEmits>();
const index = inject<number>('index', 0);
provide<number>('index', index + 1);
const isNested = computed(() => index > 0);
const isHeaderDisplayed = computed(() => (props.hasHeader && !isNested.value));
const activeItems = inject<HorizontalPagingActiveItems>('activeItems', computed({
  get: () => (Array.isArray(props.modelValue)
    ? props.modelValue
    : [ props.modelValue ]),
  set: (value) => { emit('update:modelValue', value); },
}));
provide<HorizontalPagingActiveItems>('activeItems', activeItems);
const sizeOfActiveItems = computed(() => (activeItems.value.length));
const activeItem = computed<HorizontalPagingItemProps>(() => (activeItems.value[index] || {}));
const isActive = computed(() => (Object.keys(activeItem.value).length > 0));
const activeItemName = computed(() => activeItem.value?.name || '');
provide<ComputedRef<string>>('activeItemName', activeItemName);
const currentTitle = computed(() => (activeItems.value[sizeOfActiveItems.value - 1]?.title || props.title));
const backToTitle = computed(() => (activeItems.value[sizeOfActiveItems.value - 2]?.title || props.title));
const itemsToHandle = ref<HorizontalPagingHandleItems>({});
provide<Ref<HorizontalPagingHandleItems>>('items', itemsToHandle);
const itemsAsArray = computed(() => (Object.values(itemsToHandle.value)));
const menuItemsToRender = computed<MenuItemAttrsProps[]>(() => itemsAsArray.value.map((item) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    title,
    name,
    ...rest
  } = item;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const icon: Icon = 'chevron-right';
  return {
    ...rest,
    name: `menu-item-${name}`,
    hasSuffix: true,
    suffixAttrs: {
      ...(item.suffixAttrs || {}),
      icon,
    },
    ...(item.tag ? {} : {
      onClick: () => {
        activeItems.value = [
          ...activeItems.value,
          item,
        ];
      },
    }),
  };
}));
const slots = useSlots();
const menuItemsSlots = computed(() => (Object.keys(slots).reduce((object, slotName) => {
  if (slotName.match(/menu-item/gm)) {
    return {
      ...object,
      [slotName]: slots[slotName],
    };
  }
  return object;
}, {})));
const menuTemplateRefs = ref<InstanceType<typeof UiMenu> | null>(null);
const handleBackClick = () => {
  activeItems.value = activeItems.value.slice(0, -1);
  if (menuTemplateRefs.value?.lastFocusedMenuItemTemplateRefs) {
    focusElement(menuTemplateRefs.value?.lastFocusedMenuItemTemplateRefs.itemTemplateRefs.content.$el, true);
  }
};
defineExpose({
  isActive,
  activeItem,
  handleBackClick,
});
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-horizontal-paging {
  $element: inside-pages;

  &__header {
    @include mixins.use-logical($element + "-header", padding, var(--space-24) var(--space-20));

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    background: functions.var($element + "-header", background, var(--color-background-subtle));
    gap: functions.var($element + "-header", gap, var(--space-12));
  }

  &__back {
    @include mixins.use-logical($element + "-button-back", margin, 3px 0 0 0);

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-button-back", margin, 6px 0 0 0);
    }
  }

  &__wrapper {
    overflow: hidden;
  }

  &__section {
    display: flex;
    transition: transform 150ms ease-in-out;

    &--is-active {
      transform: translate3d(-100%, 0, 0);
    }
  }

  &__menu {
    @include mixins.use-logical($element + "-menu", padding, var(--space-12) var(--space-4));

    flex: 0 0 100%;
  }

  &__content {
    @include mixins.use-logical($element + "-content", padding, var(--space-24) var(--space-20));

    flex: 0 0 100%;
  }

  &--nested {
    @include mixins.use-logical($element + "-nested", margin, calc(var(--space-24) * -1) calc(var(--space-20) * -1));
  }
}
</style>

import type { Icon } from '../../../../types';
import type { MenuItemSuffixAttrsProps } from './UiMenuItemSuffix.vue';
import type { ListItemAttrsProps } from '../../UiList/_internal/UiListItem.vue';

export interface MenuItemProps {
  /**
   * Use this props to set icon.
   */
  icon?: Icon;
  /**
   * Use this props to set suffix visibility.
   */
  suffixVisible?: 'default' | 'always' | 'never';
  /**
   * Use this props to pass attrs for UIMenuItemSuffix
   */
  suffixAttrs?: MenuItemSuffixAttrsProps;
  /**
   * Use this props to pass attrs for list item element
   */
  listItemAttrs?: ListItemAttrsProps;
}

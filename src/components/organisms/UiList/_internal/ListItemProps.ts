import type { LiHTMLAttributes } from 'vue';
import type { Icon } from '../../../../types/icon';
import type { ListItemPrefixAttrsProps } from './UiListItemPrefix.vue';
import type { ListItemSuffixAttrsProps } from './UiListItemSuffix.vue';
import type {
  DefineAttrsProps,
  HTMLTag,
} from '../../../../types';

export interface ListItemProps {
  /**
   * Use this props to set list item content tag.
   */
  tag?: HTMLTag;
  /**
   * @deprecated will be removed in 2.0.0; Use this props to set suffix icon.
   */
  icon?: Icon;
  /**
   * Use this props to control prefix visibility.
   */
  hasPrefix?: boolean;
  /**
   * Use this props to pass attrs for UIListItemPrefix
   */
  prefixAttrs?: ListItemPrefixAttrsProps;
  /**
   * Use this props to control suffix visibility.
   */
  hasSuffix?: boolean;
  /**
   * Use this props to pass attrs for UIListItemSuffix
   */
  suffixAttrs?: ListItemSuffixAttrsProps;
  /**
   * Use this props to pass attrs for list item element
   */
  listItemAttrs?: DefineAttrsProps<null, LiHTMLAttributes>;
}

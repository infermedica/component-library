import type { HTMLAttributes } from 'vue';

export type Attrs<ElementAttrs = HTMLAttributes> = ElementAttrs & {
  'data-testid'?: string;
  [key: string]: unknown;
}

export type DefineAttrsProps<
  ComponentProps,
  ElementAttrs = HTMLAttributes
> = ComponentProps extends object
  ? ComponentProps & Attrs<ElementAttrs>
  : Attrs<ElementAttrs>

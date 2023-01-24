import type {
  HTMLAttributes,
  PropType,
} from 'vue';

export type PropsAttrs = PropType<Record<string, unknown>>;

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

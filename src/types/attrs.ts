import type {
  HTMLAttributes,
  PropType,
} from 'vue';

export type PropsAttrs = PropType<Record<string, unknown>>

export type Attrs<ElementAttrs = HTMLAttributes> = ElementAttrs & {
  'data-testid'?: string;
  [key: string]: unknown;
};

export type DefinePropsAttrs<ComponentProps, ElementAttrs = HTMLAttributes> = ComponentProps & Attrs<ElementAttrs>

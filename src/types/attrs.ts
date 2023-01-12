import type {
  PropType,
  HTMLAttributes,
} from 'vue';

export type PropsAttrs = PropType<Record<string, unknown>>

export type DefineAttrs<T, U = HTMLAttributes> = T & U & {'data-testid'?: string}

import {
  getStyle,
  getModifiers,
  getVariables,
} from "./parseRaw";
import { modifiers as argTypesModifiers } from './argTypes';
export function useArgTypes(component, raw) {
  const { __docgenInfo } = component;
  const style = getStyle(raw);
  const getControl = (type) => {
    const { name } = type

    if ( name.match(/^(HTMLTag|string)$/gm) ) {
      return 'text'
    }
    if ( name.match(/^(union)$/gm) ) {
      return 'object'
    }
    if ( name.match(/^(boolean)$/gm) ) {
      return 'boolean'
    }
    if ( name.match(/^(AttrsProps)$/gm) ) {
      return 'object'
    }
    if ( name.match(/^(ModelValue)$/gm) ) {
      return 'text'
    }
  }
  const getTable = (name) => {
    if (name.match(/(Attrs)$/gm)) {
      return {
        category: 'Attrs Props'
      }
    }
  }
  const props = (()=> {
    return __docgenInfo.props
      .reduce(
        (object, { name, type }) => {
          const control = getControl(type)
          const table = getTable(name);
          return {
            ...object,
            [name]: {
              control,
              table
            }
          }
        },
        {}
      )
  })();
  const getBindings = (bindings) => (
    bindings.map(({ name, type }) => (
      `${name}${ 
        type?.name 
          ? ':' + type.name 
          : '' 
      }`.trim()
    ))
  )
  const slots = (() => {
    return __docgenInfo.slots
      .reduce(
        (object, { name, description, bindings = [ { name: 'unknown '} ] }) => {
          if ( !description ) {
            return {
              ...object,
              [name]: {
                table: {
                  disable: true,
                }
              }
            }
          }

          return {
            ...object,
            [name]: {
              control: false,
              table: {
                summary: getBindings(bindings),
              }
            }
          }
        },
        {}
      )
  })();
  const events = () => {
    console.log('events');
  }
  const modifiers = (() => {
    const options = getModifiers(style)
      .map( modifier => modifier.replace(/&/, __docgenInfo.displayName
        .toLowerCase()
        .split('ui')
        .join('ui-'))
      );
    if ( options.length < 1 ) {
      return {};
    }
    return argTypesModifiers({ options });
  })();
  const variables = (()=> {
    const options = getVariables(style);
    console.log(options);
  })();
  const argTypes = (() => {
    return {
      ...props,
      ...slots,
      ...variables,
      modifiers,
    }
  })()
  return {
    props,
    slots,
    events,
    argTypes,
  }
}

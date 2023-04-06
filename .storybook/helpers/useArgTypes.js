import {
  getStyle
} from "./parseRaw";
import {
  modifiers as argTypesModifiers,
  variable as argTypesVariable
} from './argTypes/index';
export function useArgTypes(component, raw) {
  const { __docgenInfo } = component;
  const componentNameKebabCase = __docgenInfo.displayName
    .toLowerCase()
    .split('ui')
    .join('ui-');
  const style = getStyle(raw);
  const { cssRules } = [...document.styleSheets]
    .find( (styleSheet) => {
      try {
        const { cssRules } = styleSheet;
        const { selectorText } = [...cssRules].at(0);
        return selectorText.match(componentNameKebabCase);
      }
      catch (e) {
        console.error(e);
      }
    })
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
      ?.reduce(
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
      ?.reduce(
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
  const getAction = (action) => {
    switch (action) {
      case 'update:modelValue':
        return 'onUpdate:modelValue'
      default:
        return action
    }
  }
  const events = (() => {
    return __docgenInfo.events
      ?.reduce(
        (object, { name }) => {
          const action = getAction(name);
          return {
            ...object,
            [action]: {
              name,
              action,
              control: false,
              table: {
                disable: true,
              }
            }
          }
        },
        {}
      )
  })();
  const getModifiers = (rules) => {
    return rules
      .filter( ( { selectorText = '' } ) => {
        const MODIFIER_RE = new RegExp(`^\.${componentNameKebabCase}--[\\w|-]+?$`);
        return selectorText.match(MODIFIER_RE)
      })
      .map( ( { selectorText = '' } ) => ( selectorText.substring(1) ));
  };
  const getVariables = (rules) => {
    const { cssText } = rules[0];
    const VARIABLE_RE = /var\(([\s\S]+?), ([\s\S]+?)\);/gm
    const VARIABLE_MA = [...cssText.matchAll(VARIABLE_RE)];
    return VARIABLE_MA.map(([match, name, defaultValue]) => ({
      name,
      defaultValue
    }));
  };
  const modifiers = (() => {
    const options = getModifiers([...cssRules]);
    return argTypesModifiers({ options });
  })();
  const variables = (()=> {
    const options = getVariables([...cssRules]);
    return options.reduce(
      (object, {name, defaultValue}) => (
        {
          ...object,
          [name]: argTypesVariable({defaultValue}),
        }
      ),
      {}
    );
  })();
  const argTypes = (() => {
    return {
      ...props,
      ...slots,
      ...events,
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

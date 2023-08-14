import upperCamelCase from "uppercamelcase";
import {
  modifiers as argTypesModifiers,
  variable as argTypesVariable
} from './argTypes/index';
export function useArgTypes(component, options = { variables: {}}) {
  const { __docgenInfo } = component;
  const componentNameKebabCase = __docgenInfo?.displayName
    ?.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
    .substring(1);
  const cssRules = [...document?.styleSheets]
    .find( (styleSheet) => {
      try {
        const cssRules = styleSheet?.cssRules || [];
        const { selectorText } = [...cssRules]?.at(0);
        return selectorText
          ?.match(new RegExp(`${componentNameKebabCase}$`));
      }
      catch (e) {}
    })?.cssRules || [];
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
    if ( name.match(/(AttrsProps|HTMLAttributes)$/gm) ) {
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
    return {
      category: 'props'
    }
  }
  const props = (()=> {
    return __docgenInfo?.props
      ?.reduce(
        (object, { name, type, description }) => {
          const control = getControl(type)
          const table = getTable(name);
          return {
            ...object,
            [name]: {
              name,
              control,
              table,
              description,
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
    return __docgenInfo?.slots
      ?.reduce(
        (object, { name, description, bindings = [ { name: 'unknown '} ] }) => {
          let keyName = name;
          if(__docgenInfo?.props.find(({name: propsName})=>{
            return propsName === name
          })) {
            keyName += 'Slot'
          }
          if ( !description ) {
            return {
              ...object,
              [keyName]: {
                name,
                table: {
                  category: 'slots',
                  disable: true,
                }
              }
            }
          }

          return {
            ...object,
            [keyName]: {
              name,
              description,
              control: false,
              table: {
                category: 'slots',
                type: {
                  summary: getBindings(bindings),
                }
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
      case 'after-enter': {
        return 'onAfterEnter'
      }
      default:
        if(action.match(/^on/gmi)){
          return action
        }
        return `on${upperCamelCase(action)}`
    }
  }
  const events = (() => {
    return __docgenInfo?.events
      ?.reduce(
        (object, { name }) => {
          const action = getAction(name);
          return {
            ...object,
            [name]: {
              control: false,
            },
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
    const { variables: {
      regexp = undefined
    } } = options;
    const SELECTOR_RE = regexp || new RegExp(`^(\.${componentNameKebabCase})$`);
    const cssText = rules
      .filter( ( { selectorText } ) => (
        selectorText
          ?.match(SELECTOR_RE)
      ))
      .reduce( ( string, { cssText } ) => {
        return string + cssText
      }, '' )

    const VARIABLE_RE = /var\(([\s\S]+?), ([\s\S]+?)\);/gm
    const VARIABLE_MA = [...cssText.matchAll(VARIABLE_RE)];
    return VARIABLE_MA.map(([match, name, defaultValue]) => ({
      name,
      defaultValue
    }));

    return [];
  };
  const modifiers = (() => {
    const modifiers = __docgenInfo.modifiers || [];
    const options = [
      ...getModifiers([...cssRules]),
      ...modifiers
    ];
    return argTypesModifiers({ options });
  })();
  const getSubcategory = (name) => {
    if ( name.match(/-border-/gm) ) {
      return 'Borders'
    }
    if ( name.match(/(-padding-|-margin-|-gap)/gm) ) {
      return 'Spacings'
    }
    if ( name.match(/(-font|-letter-spacing)/gm) ) {
      return 'Typography'
    }
    if ( name.match(/(-color|-background)/gm) ) {
      return 'Colors'
    }
  }
  const variables = (()=> {
    const options = getVariables([...cssRules]);
    return options.reduce(
      (object, {name, defaultValue}) => {
        const subcategory = getSubcategory(name)
        return {
          ...object,
          [name]: argTypesVariable({
            subcategory,
            defaultValue
          }),
        }
      },
      {}
    );
  })();
  const argTypes = (() => {
    const toReturn = {
      ...props,
      ...slots,
      ...events,
      ...variables,
    }
    if (modifiers) {
      toReturn['class'] = modifiers
    }
    return toReturn
  })()
  return {
    props,
    slots,
    events,
    argTypes,
  }
}

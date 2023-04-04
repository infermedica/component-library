const formatSlots = (slots = []) => (
  slots.reduce( (obj, { name, description, bindings = [ { name: 'unknown' } ] } ) => {
    if (!description) {
      return {
        ...obj,
        [name]: {
          table: {
            disable: true,
          }
        }
      }
    }
    return {
      ...obj,
      [name]: {
        control: false,
        table: {
          type: {
            summary: bindings.map( ( { name, type = {name: 'unknown'} } ) => (`${name}:${type.name}`)   )
              .join(' | '),
          }
        }
      }
    }
  }, {})
)
const getControl = ({ name: type }) => {
  switch(type) {
    case 'HTMLTag':
    case 'string':
      return 'text'
    case 'union':
      return 'object'
    case 'boolean':
      return 'boolean'
    case 'number':
      return 'number'
  }
  if(type.match(/AttrsProps$/)) {
    return 'object'
  }
  if(type.match(/ModelValue$/)) {
    return 'text'
  }
}

const TableCategories = {
  attrs: {
    category: 'Attrs Props'
  }
}
const getTable = (name) => {
  let table = {};
  if( name.match(/Attrs$/)) {
    table = {
      ...table,
      ...TableCategories.attrs
    }
  }
  return table;
}
const formatProps = (props = []) => {
  return props.reduce((obj, {name, type}) => {
    const control = getControl(type)
    const table = getTable(name)
    return {
      ...obj,
      [name]: {
        control,
        table,
      }
    }
  }, {})
};
const getAction = (action) => {
  switch (action) {
    case 'update:modelValue':
      return 'onUpdate:modelValue'
    default:
      return action
  }
}
const formatEvents = (events = []) => {
  console.log(events);
  return events.reduce((obj, { name }) => {
    const action = getAction(name);
    return {
      ...obj,
      [action]: {
        name,
        action,
        control: false,
        table: {
          disable: true,
        }
      }
    }
  }, {})
}
export const parseArgTypes = (component) => {
  const {
    __docgenInfo: { props, slots, events }
  } = component
  console.log(events);
  return {
    ...formatProps(props),
    ...formatSlots(slots),
    ...formatEvents(events),
  }
};

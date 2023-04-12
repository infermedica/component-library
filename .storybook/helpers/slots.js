export const slots = (component) => {
  return component?.__docgenInfo?.slots.reduce((acc, {name, bindings = [{name:'unknown'}]}) => {
    return {...acc, [name]: {
        table: {
          type: {
            summary: bindings.map(({ name }) => name).join(' | '),
          },
        },
        control: false
      } };
  }, {})
}

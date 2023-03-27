export const events = (events) => {
  return events.reduce((acc, key) => {
    return {...acc, [key]: {
        action: key,
        table: { disable: true },
      } };
  }, {})
}

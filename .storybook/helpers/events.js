export const events = (events, componentEvents = []) => {
  return events.reduce((acc, key) => {
    const event = {
      action: key,
      control: false,
    };
    if (!componentEvents.includes(key)) {
      event['table'] = { disable: true }
    }
    return {...acc, [key]: event }
  }, {})
}

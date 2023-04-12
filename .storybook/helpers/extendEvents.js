export const extendEvents = ( events ) => ({
  __docgenInfo: {
    events: events.map( event => ({
      name: event,
    }))
  }
})

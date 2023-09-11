export  const withArgs = ( story, { args, id } ) => ({
  components: { story },
  setup() {
    return {
      args,
      id,
    }
  },
  template: `<story 
    v-bind="args" 
    :key="id"
  />`
})

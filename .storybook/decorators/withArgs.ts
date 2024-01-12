export  const withArgs = ( story, { args, id } ) => ({
  inheritAttrs: false,
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

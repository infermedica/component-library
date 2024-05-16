import {
  ref,
  computed,
  defineComponent,
  provide,
} from "vue";

import { useArgs } from "@storybook/preview-api";

export const withVModel = (story, { id, args }) => {
  const [{ modelValue }, updateArgs] = useArgs();

  return defineComponent({
    name: 'DWithVModel',
    inheritAttrs: false,
    setup() {
      const modelValueFallback = ref(null)
      const modelValue = computed({
        get: ()=>(modelValueFallback.value || args.modelValue),
        set: (newValue) => {
          modelValueFallback.value = newValue;
          updateArgs({ modelValue: newValue });
        }
      })
      provide('value', modelValue)

      return {
        args,
        id,
      }
    },
    template: `<story />`
  })
}

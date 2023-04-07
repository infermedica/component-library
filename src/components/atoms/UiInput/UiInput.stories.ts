import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { ref } from 'vue';
import deepmerge from "deepmerge";
import {
  UiInput,
  UiButton,
  UiIcon,
  UiText,
} from '@/../index';
import raw from './UiInput.vue?raw';
import { keyboardFocus} from "@/utilities/directives";
import { withVariants } from '@sb/decorators';
import {
  useArgTypes,
  inputEvents
} from '@sb/helpers'
import { icon } from '@sb/helpers/argTypes/index.js';

const { argTypes } = useArgTypes(deepmerge(UiInput, inputEvents), {
  variables: {
    regexp: /^(\.ui-input|\.ui-input__input)$/
  }
});

const UiInputButtonAside = {
  components: {
    UiButton,
    UiIcon
  },
  props: ['icon'],
  template: `<UiButton class="ui-button--icon">
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    />
  </UiButton>`
}

const meta = {
  title: 'Atoms/Input',
  component: UiInput,
  args: {
    modifiers: [],
    modelValue: '',
    placeholder: 'Search, e.g. headache',
    type: 'text',
    disabled: false,
    suffix: '',
    textSuffixAttrs: { 'data-testid': 'text-suffix' },
    inputAttrs: { 'data-testid': 'input-element' },
    outline: { 'data-testid': 'outline-element' },
  },
  argTypes: {
    ...argTypes
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      viewports: [320, 1200],
    },
    docs: {
      source: {
        code: null,
      }
    }
  }
} satisfies Meta<typeof UiInput>;
export default meta;
type Story = StoryObj<typeof UiInput>;

export const Basic: Story = {
  render: () => ({
    inheritAttrs: false,
    components: { UiInput },
    setup: ( props, { attrs } ) => {
      const {
        modelValue,
        modifiers = {},
        ...args
      } = attrs;
      const value = ref(modelValue);

      return {
        args: {
          ...args,
          class: modifiers,
        },
        value
      }
    },
    template: `<UiInput
      v-model="value"
      v-bind="args"
    />`,
  }),
};
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiInput 
    v-model="modelValue"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
    :suffix="suffix"
    :text-suffix-attrs="textSuffixAttrs"
    :input-attrs="inputAttrs"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiInput } from '@infermedica/component-library';

const modelValue = ref('');
const placeholder = 'Search, e.g. headache';
const type = "text";
const disabled = false;
const suffix = '';
const textSuffixAttrs = {
  "data-testid": "text-suffix"
};
const inputAttrs = {
  "data-testid": "input-element"
};
</script>"`
    }
  }
}

export const Empty: Story = { ...Basic }
Empty.argTypes = {
  modelValue: { control: false },
  placeholder: { control: 'text' },
  disabled: { control: false }
}
Empty.decorators = [ withVariants ]
Empty.parameters = {
  variants: [
    { label: 'default' },
    {
      label: 'hover',
      class: 'pseudo-hover'
    },
    {
      label: 'focus',
      outlineAttrs: {
        class: 'pseudo-focus-within'
      }
    },
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-input--is-disabled'
    }
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
}

export const Filled: Story = { ...Empty };
Filled.args = {
  modelValue: 'headache'
};
Filled.argTypes = {
  ...Empty.argTypes,
  modelValue: { control: 'text' },
  placeholder: { control: false },
}

export const WithError: Story = {
  ...Basic,
}
WithError.argTypes = {
  ...Empty.argTypes,
  modelValue: { control: false },
  placeholder: { control: false },
};
WithError.decorators = [ withVariants ]
WithError.parameters = {
  ...Empty.parameters,
  variants: [
    {
      label: 'default',
      class: 'ui-input--has-error'
    },
    ...['hover'].map((variant) => ({
      label: `${variant}`,
      class: `ui-input--has-error pseudo-${variant}`,
    })),
    {
      label: 'filed',
      class: 'ui-input--has-error',
      modelValue: 'headache'
    }
  ]
}

export const WithSuffix: Story = { ...Basic };
WithSuffix.args = {
  placeholder: 'Put your height',
  suffix: 'cm',
};
WithSuffix.parameters = {
  docs: {
    source: {
      code: null,
    }
  }
}
export const WithButtonAside:Story = {
  render: () => ({
    components: {
      UiInput,
      UiInputButtonAside,
    },
    setup: (props, { attrs } ) => {
      const {
        icon,
        modelValue,
        modifiers = {},
        ...args
      } = attrs;
      const value = ref(modelValue);

      return {
        icon,
        args: {
          ...args,
          class: modifiers,
        },
        value,
        icon,
      };
    },
    template: `<UiInput
      v-model="value"
      v-bind="args"
    >
      <template #aside>
        <UiInputButtonAside 
          :icon="icon"
          class="ui-input__aside"
        />
      </template>
    </UiInput>`,
  }),
};
WithButtonAside.argTypes = {
  suffix: { control: false },
  textSuffixAttrs: { control: false },
}
WithButtonAside.args = {
  icon: 'search',
}
WithButtonAside.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiInput 
    v-model="modelValue"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
    :suffix="suffix"
  >
    <template #aside>
      <UiButton class="ui-button--icon">
        <UiIcon
          icon="search"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
  </UiInput>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  UiInput,
  UiButton,
  UiIcon,
} from '@infermedica/component-library';

const modelValue = ref('');
const placeholder = 'Search, e.g. headache';
const type = "text";
const disabled = false;
const suffix = '';
</script>"`
    }
  }
}

export const WithInputSlot: Story = {
  render: () => ({
    inheritAttrs: false,
    directives: { keyboardFocus },
    components: { UiInput },
    setup: ( props, { attrs } ) => {
      const {
        modelValue,
        modifiers = {},
        ...args
      } = attrs;
      const value = ref(modelValue);

      return {
        args: {
          ...args,
          class: modifiers,
        },
        value
      }
    },
    template: `<UiInput
      v-model="value"
      v-bind="args"
    >
      <template #input="{
        inputAttrs,
        input,
        value,
        validation
      }">
        <input
          ref="input"
          v-keyboard-focus
          v-bind="inputAttrs"
          :value="value"
          class="ui-input__input"
          @keydown="validation"
          @input="input($event)"
        >
      </template>
    </UiInput>`,
  }),
};
WithInputSlot.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiInput 
    v-model="modelValue"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
    :suffix="suffix"
    :input-attrs="inputAttrs"
  >
    <template #input="{
      inputAttrs,
      input,
      value,
      validation
    }">
      <input
        ref="input"
        v-keyboard-focus
        v-bind="inputAttrs"
        :value="value"
        class="ui-input__input"
        @keydown="validation"
        @input="input($event)"
      >
    </template>
  </UiInput>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiInput } from '@infermedica/component-library';
import { keyboardFocus as vKeyboardFocus } from '@infermedica/component-library/directives'

const modelValue = ref('');
const placeholder = 'Search, e.g. headache';
const type = "text";
const disabled = false;
const suffix = '';
const inputAttrs = {
  "data-testid": "input-element"
}
</script>"`
    }
  }
}

export const WithAsideSlot: Story = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiInput,
      UiText,
    },
    setup: ( props, { attrs } ) => {
      const {
        modelValue,
        modifiers = {},
        ...args
      } = attrs;
      const value = ref(modelValue);

      return {
        args: {
          ...args,
          class: modifiers,
        },
        value
      }
    },
    template: `<UiInput
      v-model="value"
      v-bind="args"
    >
      <template #input="{
        suffix,
        textSuffixAttrs
      }">
        <UiText
          v-if="suffix"
          v-bind="textSuffixAttrs"
          class="ui-input__aside"
        >{{ suffix }}</UiText>
      </template>
    </UiInput>`,
  }),
};
WithAsideSlot.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiInput 
    v-model="modelValue"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
    :suffix="suffix"
  >
    <template #aside="{
      suffix,
      textSuffixAttrs,
    }">
       <UiText
        v-if="suffix"
        v-bind="textSuffixAttrs"
        class="ui-input__aside"
      >
        {{ suffix }}
      </UiText>
    </template>
  </UiInput>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  UiInput,
  UiText
} from '@infermedica/component-library';

const modelValue = ref('');
const placeholder = 'Search, e.g. headache';
const type = "text";
const disabled = false;
const suffix = '';
</script>"`
    }
  }
}

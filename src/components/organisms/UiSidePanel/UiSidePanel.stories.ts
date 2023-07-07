import {
  inject,
  provide,
  ref,
  watch,
  computed,
} from 'vue';
import type {
  InjectionKey,
  Ref,
} from 'vue';
import {
  UiBackdrop,
  UiBulletPoints,
  UiButton,
  UiCheckbox,
  UiHeading,
  UiIcon,
  UiFormField,
  UiList,
  UiLink,
  UiLoader,
  UiProgress,
  UiTextarea,
  UiSidePanel,
  UiText,
} from '@index';
import { useArgTypes } from '@sb/helpers';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import type { SidePanelProps } from '@index';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import './UiSidePanel.stories.scss';
import {
  focusTrap,
  bodyScrollLock,
  scrollTabindex,
  keyboardFocus,
} from '@/utilities/directives';

type SidePanelArgsType = SidePanelProps;
type SidePanelMetaType = Meta<SidePanelArgsType>;
type SidePanelStoryType = StoryObj<SidePanelArgsType>;

const { argTypes } = useArgTypes(UiSidePanel);
import ConditionDetailsStories from './stories/ConditionDetails.vue';
import ConditionDetailsStoriesCode from './stories/ConditionDetails.vue?raw';
import ReportAnIssueStories from './stories/ReportAnIssue.vue';
import ReportAnIssueStoriesCode from './stories/ReportAnIssue.vue?raw';

const meta = {
  title: 'Organisms/SidePanel',
  component: UiSidePanel,
  args: {
    modelValue: true,
    title: 'Terms of Service',
    subtitle: 'Last updated: 26/11/2020',
    transitionBackdropAttrs: { 'data-testid': 'backdrop-transition' },
    backdropAttrs: { 'data-testid': 'backdrop' },
    dialogAttrs: { 'data-testid': 'dialog-element' },
    transitionDialogAttrs: { 'data-testid': 'dialog-transition' },
    labelAttrs: { 'data-testid': 'label-element' },
    headingTitleAttrs: { 'data-testid': 'title-heading' },
    textSubtitleAttrs: { 'data-testid': 'subtitle-text' },
    buttonCloseAttrs: {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    },
    iconCloseAttrs: {
      'data-testid': 'close-icon',
      icon: 'close',
    },
    contentAttrs: { 'data-testid': 'content-element' },
  },
  argTypes: {
    ...argTypes,
    modelValue: { control: 'boolean' },
  },
  decorators: [ () => ({
    components: { UiButton },
    setup(props, { attrs }) {
      const {
        modelValue,
        title,
        ...args
      } = attrs;
      const value = ref(modelValue);
      provide('value', value);
      const handleSidePanelToggle = () => {
        value.value = !value.value;
      };
      return {
        handleSidePanelToggle,
        title,
        args: {
          ...args,
          title,
        },
      };
    },
    template: `<div class="max-w-32 min-h-80">
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="handleSidePanelToggle"
      >
        {{ title }}
      </UiButton>
      <story v-bind="args"/>
    </div>`,
  }) ],
  parameters: {
    chromatic: {
      disableSnapshot: true,
      viewports: [
        320,
        1200,
      ],
    },
  },
} satisfies SidePanelMetaType;

export default meta;

const TOS = {
  components: {
    UiHeading,
    UiBulletPoints,
    UiBulletPointsItem,
    UiLink,
  },
  setup() {
    const items = [
      {
        text: 'These Terms of Service specify:',
        name: 'links',
        children: {
          class: 'tos__sub-points',
          type: 'a',
          items: [
            {
              name: 'link',
              text: 'principles of operation of the website and the mobile application',
            },
            { text: 'rules on the provision of services by electronic means,' },
            { text: 'the rights and obligations of the Service Provider and the Service Recipients,' },
          ],
        },
      },
      {
        text: 'Whenever these Terms of Service refer to:',
        children: {
          class: 'tos__sub-points',
          type: 'a',
          items: [
            { text: 'Application, this means the software for portable devices, made available free of charge by the Service Provider referred to in sec. 2(l) below, enabling the use of the Services referred to in sec. 2(k) below,' },
            { text: 'Articles, this means articles referring to medical and pharmaceutical topics,' },
            { text: 'License, this means a non-exclusive, royalty-free license granted to Users referred to in sec. 2(m) below to use the Application or Website referred to in sec. 2(j) below,' },
          ],
        },
      },
    ];
    return { items };
  },
  template: `<UiHeading>
    §1. General Provisions
  </UiHeading>
  <UiBulletPoints
    tag="ol"
    :items="items"
    class="tos"
  >
    <template #links="{ item:{ children, text } }">
      {{ text }}
      <UiBulletPoints
        :items="children.items"
        :tag="children.tag"
        :type="children.type"
        :class="children.class"
      >
        <template #link="{ item: { text } }">
          {{ text }}
          <UiLink href="https://github.com/infermedica/component-library">
            Component Library,
          </UiLink>
        </template>
      </UiBulletPoints>
    </template>
  </UiBulletPoints>`,
};

export const Basic: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      TOS,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value');

      return {
        value,
        args,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
    >
      <TOS/>
    </UiSidePanel>`,
  }),
};
Basic.parameters = {
  chromatic: { disableSnapshot: false },
  docs: {
    source: {
      code: `<template>
  <UiSidePanel
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
  >
    <!-- Use default slot to place side panel content. -->
  </UiSidePanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiSidePanel } from '@infermedica/component-library';
import type { SidePanelProps } from '@infermedica/component-library';

const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
const title: SidePanelProps['title'] = '${meta.args.title}';
const subtitle: SidePanelProps['subtitle'] = '${meta.args.subtitle}';
</script>`,
    },
  },
};

export const AsyncContent: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiLoader,
      TOS,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value') as InjectionKey<unknown>;
      const isLoading = ref(true);
      watch(
        value,
        (isSidePanelOpen) => {
          if (isSidePanelOpen) {
            setTimeout(() => {
              isLoading.value = false;
            }, 1000);
          } else {
            isLoading.value = true;
          }
        },
        { immediate: true },
      );

      return {
        value,
        args,
        isLoading,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
    >
      <UiLoader
        :isLoading="isLoading"
        type="skeleton"
      >
        <TOS />
      </UiLoader>
    </UiSidePanel>`,
  }),
};
AsyncContent.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiSidePanel
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
  >
    <UiLoader
      :isLoading="isLoading"
      type="skeleton"
    >
      <!-- Use default slot to place side panel content. -->
    </UiLoader>
  </UiSidePanel>
</template>

<script setup lang="ts">
import { 
  ref,
  onMounted
} from 'vue';
import { 
  UiSidePanel,
  UiLoader,
} from '@infermedica/component-library';
import type { 
  SidePanelProps,
  LoaderProps,
} from '@infermedica/component-library';

const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
const title: SidePanelProps['title'] = '${meta.args.title}';
const subtitle: SidePanelProps['subtitle'] = '${meta.args.subtitle}';
const isLoading = ref<LoaderProps['isLoading']>(true);

// TODO: remove in production code / BEGIN
onMounted(() => {
  setTimeout(()=>{
    isLoading.value = false;
  }}, 1000)
});
// END
</script>`,
    },
  },
};

export const ConditionDetails: SidePanelStoryType = { render: () => (ConditionDetailsStories) };
ConditionDetails.args = {
  title: 'Acute viral throat infection',
  subtitle: 'Acute viral pharyngitis',
  labelAttrs: { class: 'side-panel-with-condition-details__label' },
  textSubtitleAttrs: { class: 'ui-text--theme-secondary' },
};
ConditionDetails.parameters = { docs: { source: { code: ConditionDetailsStoriesCode } } };

export const ReportAnIssue: SidePanelStoryType = { render: () => (ReportAnIssueStories) };
ReportAnIssue.args = {
  title: 'Report an issue',
  subtitle: '',
};
ReportAnIssue.parameters = { docs: { source: { code: ReportAnIssueStoriesCode } } };

export const WithBackdropSlot: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiBackdrop,
      TOS,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value');

      return {
        value,
        args,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
    >
    <template #backdrop="{
      transitionBackdropAttrs,
      modelValue,
      backdropAttrs,
      closeHandler,
    }">
      <transition v-bind="transitionBackdropAttrs">
        <UiBackdrop
          v-if="modelValue"
          v-bind="backdropAttrs"
          @click="closeHandler"
        />
      </transition>
    </template>
    <template #default>
      <TOS />
    </template>
  </UiSidePanel>`,
  }),
};
WithBackdropSlot.parameters = {
  chromatic: { disableSnapshot: false },
  docs: {
    source: {
      code: `<template>
  <UiSidePanel
    v-model="modelValue"
    :title="title"
  >
    <template #backdrop="{
      transitionBackdropAttrs,
      modelValue,
      backdropAttrs,
      closeHandler,
    }">
      <transition v-bind="transitionBackdropAttrs">
        <UiBackdrop
          v-if="modelValue"
          v-bind="backdropAttrs"
          @click="closeHandler"
        />
      </transition>
    </template>
    <template #default>
      <!-- Use default slot to place side panel content. -->
    </template>   
  </UiSidePanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  UiSidePanel,
  UiBackdrop,
} from '@infermedica/component-library';
import type { SidePanelProps } from '@infermedica/component-library';

const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
const title: SidePanelProps['title'] = '${meta.args.title}';
</script>`,
    },
  },
};

export const WithContainerSlot: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiText,
      UiHeading,
      UiButton,
      UiIcon,
      TOS,
    },
    directives: {
      focusTrap,
      bodyScrollLock,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value');

      return {
        value,
        args,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
    >
      <template #container="{
        transitionDialogAttrs,
        modelValue,
        afterEnterHandler,
        buttonCloseAttrs,
        closeHandler,
        title,
        subtitle,
        iconCloseAttrs,
        headingTitleAttrs,
        textSubtitleAttrs,
        dialogAttrs,
      }">
        <transition
          v-bind="transitionDialogAttrs"
        >
          <dialog
            v-if="modelValue"
            v-focus-trap
            v-body-scroll-lock
            v-bind="dialogAttrs"
            class="ui-side-panel__dialog"
          >
            <div class="ui-side-panel__header">
              <UiButton
                v-bind="buttonCloseAttrs"
                ref="button"
                class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
                @click="closeHandler"
              >
                <UiIcon
                  v-bind="iconCloseAttrs"
                  class="ui-button__icon"
                />
              </UiButton>
              <div
                v-if="title || subtitle"
                class="ui-side-panel__label"
              >
                <UiHeading
                  v-if="title"
                  v-bind="headingTitleAttrs"
                >
                  {{ title }}
                </UiHeading>
                <UiText
                  v-if="subtitle"
                  v-bind="textSubtitleAttrs"
                  class="ui-text--body-2-comfortable ui-side-panel__subtitle"
                >
                  {{ subtitle }}
                </UiText>
              </div>
            </div>
            <div class="ui-side-panel__content">
              <TOS />
            </div>
          </dialog>
        </transition>
      </template>
    </UiSidePanel>`,
  }),
};
WithContainerSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiSidePanel
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
  >
    <template #container="{
      transitionDialogAttrs,
      modelValue,
      afterEnterHandler,
      buttonCloseAttrs,
      closeHandler,
      title,
      subtitle,
      iconCloseAttrs,
      headingTitleAttrs,
      textSubtitleAttrs,
      dialogAttrs,
    }">
      <transition
        v-bind="transitionDialogAttrs"
      >
        <dialog
          v-if="modelValue"
          v-focus-trap
          v-body-scroll-lock
          v-bind="dialogAttrs"
          class="ui-side-panel__dialog"
        >
          <div class="ui-side-panel__header">
            <UiButton
              v-bind="buttonCloseAttrs"
              ref="button"
              class="ui-button--icon ui-button--theme-secondary ui-side-panel__close"
              @click="closeHandler"
            >
              <UiIcon
                v-bind="iconCloseAttrs"
                class="ui-button__icon"
              />
            </UiButton>
              <div
                v-if="title || subtitle"
                v-bind="labelAttrs"
                class="ui-side-panel__label"
              >
                <UiHeading
                  v-if="title"
                  v-bind="headingTitleAttrs"
                >
                  {{ title }}
                </UiHeading>
                <UiText
                  v-if="subtitle"
                  v-bind="textSubtitleAttrs"
                  class="ui-text--body-2-comfortable ui-side-panel__subtitle"
                >
                  {{ subtitle }}
                </UiText>
            </div>
          </div>
          <div
            v-scroll-tabindex
            v-keyboard-focus
            class="ui-side-panel__content"
            v-bind="contentAttrs"
          >
            <!-- Place side panel content. -->
          </div>
        </dialog>
      </transition>
    </template>
  </UiSidePanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  scrollTabindex as vScrollTabindex,
  keyboardFocus as vKeyboardFocus,
} from '@infermedica/component-library/directives';
import { UiSidePanel } from '@infermedica/component-library';
import type { SidePanelProps } from '@infermedica/component-library';

const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
const title: SidePanelProps['title'] = '${meta.args.title}';
const subtitle: SidePanelProps['subtitle'] = '${meta.args.subtitle}';
</script>`,
    },
  },
};

export const WithHeaderSlot: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiButton,
      UiIcon,
      UiHeading,
      UiText,
      TOS,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value');

      return {
        value,
        args,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
    >
      <template #header="{
        buttonCloseAttrs,
        closeHandler,
        title,
        subtitle,
        headingTitleAttrs,
        textSubtitleAttrs,
        iconCloseAttrs,
      }">
        <div class="ui-side-panel__header">
          <UiButton
            v-bind="buttonCloseAttrs"
            ref="button"
            class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
            @click="closeHandler"
          >
            <UiIcon
              v-bind="iconCloseAttrs"
              class="ui-button__icon"
            />
          </UiButton>
          <div
            v-if="title || subtitle"
            class="ui-side-panel__label"
          >
            <UiHeading
              v-if="title"
              v-bind="headingTitleAttrs"
            >
              {{ title }}
            </UiHeading>
            <UiText
              v-if="subtitle"
              v-bind="textSubtitleAttrs"
              class="ui-text--body-2-comfortable ui-side-panel__subtitle"
            >
              {{ subtitle }}
            </UiText>
          </div>
        </div>
      </template>
      <template #default>
        <TOS/>
      </template>
    </UiSidePanel>`,
  }),
};
WithHeaderSlot.parameters = {
  chromatic: { disableSnapshot: false },
  docs: {
    source: {
      code: `<template>
  <UiSidePanel
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
  >
    <template #header="{
      buttonCloseAttrs,
      closeHandler,
      title,
      subtitle,
      headingTitleAttrs,
      textSubtitleAttrs,
      iconCloseAttrs,
    }">
      <div class="ui-side-panel__header">
        <UiButton
          v-bind="buttonCloseAttrs"
          ref="button"
          class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
          @click="closeHandler"
        >
          <UiIcon
            v-bind="iconCloseAttrs"
            class="ui-button__icon"
          />
        </UiButton>
        <div
          v-if="title || subtitle"
          class="ui-side-panel__label"
        >
          <UiHeading
            v-if="title"
            v-bind="headingTitleAttrs"
          >
            {{ title }}
          </UiHeading>
          <UiText
            v-if="subtitle"
            v-bind="textSubtitleAttrs"
            class="ui-text--body-2-comfortable ui-side-panel__subtitle"
          >
            {{ subtitle }}
          </UiText>
        </div>
      </div>
    </template>
    <template #default>
      <!-- Use default slot to place side panel content. -->
    </template>
  </UiSidePanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  UiSidePanel,
  UiButton,
  UiIcon,
  UiHeading,
  UiText,
} from '@infermedica/component-library';
import type { SidePanelProps } from '@infermedica/component-library';

const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
const title: SidePanelProps['title'] = '${meta.args.title}';
const subtitle: SidePanelProps['subtitle'] = '${meta.args.subtitle}';
</script>`,
    },
  },
};

export const WithCloseSlot: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiButton,
      UiIcon,
      TOS,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;

      const value = inject('value');

      return {
        value,
        args,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
    >
      <template #close="{
        buttonCloseAttrs,
        closeHandler,
        iconCloseAttrs,
      }">
        <UiButton
          v-bind="buttonCloseAttrs"
          ref="button"
          class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
          @click="closeHandler"
        >
          <UiIcon
            v-bind="iconCloseAttrs"
            class="ui-button__icon"
          />
        </UiButton>
      </template>
      <template #default>
        <TOS/>
      </template>
    </UiSidePanel>`,
  }),
};
WithCloseSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiSidePanel
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
  >
    <template #close="{
      buttonCloseAttrs,
      closeHandler,
      iconCloseAttrs,
    }">
      <UiButton
        v-bind="buttonCloseAttrs"
        ref="button"
        class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
        @click="closeHandler"
      >
        <UiIcon
          v-bind="iconCloseAttrs"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
    <template #default>
      <!-- Use default slot to place side panel content. -->
    </template>
  </UiSidePanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  UiSidePanel,
  UiButton,
  UiIcon,
} from '@infermedica/component-library';
import type { SidePanelProps } from '@infermedica/component-library';

const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
const title: SidePanelProps['title'] = '${meta.args.title}';
const subtitle: SidePanelProps['subtitle'] = '${meta.args.subtitle}';
</script>
    `,
    },
  },
};

export const WithLabelSlot: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiHeading,
      UiText,
      TOS,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value');

      return {
        value,
        args,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
    >
      <template #label="{
        title,
        subtitle,
        headingTitleAttrs,
        textSubtitleAttrs,
        labelAttrs,
      }">
        <div
          v-if="title || subtitle"
          v-bind="labelAttrs"
          class="ui-side-panel__label"
        >
          <UiHeading
            v-if="title"
            v-bind="headingTitleAttrs"
          >
            {{ title }}
          </UiHeading>
          <UiText
            v-if="subtitle"
            v-bind="textSubtitleAttrs"
            class="ui-text--body-2-comfortable ui-side-panel__subtitle"
          >
            {{ subtitle }}
          </UiText>
        </div>
      </template>
      <template #default>
        <TOS/>
      </template>
    </UiSidePanel>`,
  }),
};
WithLabelSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiSidePanel
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
  >
    <template #label="{
      title,
      subtitle,
      headingTitleAttrs,
      textSubtitleAttrs,
      labelAttrs,
    }">
      <div
        v-if="title || subtitle"
        v-bind="labelAttrs"
        class="ui-side-panel__label"
      >
        <UiHeading
          v-if="title"
          v-bind="headingTitleAttrs"
        >
          {{ title }}
        </UiHeading>
        <UiText
          v-if="subtitle"
          v-bind="textSubtitleAttrs"
          class="ui-text--body-2-comfortable ui-side-panel__subtitle"
        >
          {{ subtitle }}
        </UiText>
      </div>
    </template>
    <template #default>
      <!-- Use default slot to place side panel content. -->
    </template>   
  </UiSidePanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  UiSidePanel,
  UiHeading,
  UiText,
} from '@infermedica/component-library';
import type { SidePanelProps } from '@infermedica/component-library';

const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
const title: SidePanelProps['title'] = '${meta.args.title}';
const subtitle: SidePanelProps['subtitle'] = '${meta.args.subtitle}';
</script>`,
    },
  },
};

export const WithTitleSlot: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiHeading,
      TOS,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value');

      return {
        value,
        args,
      };
    },
    template: `<UiSidePanel
    v-model="value"
    v-bind="args"
  >
    <template #title="{
      title,
      headingTitleAttrs,
    }">
      <UiHeading
        v-if="title"
        v-bind="headingTitleAttrs"
      >
        {{ title }}
      </UiHeading>
    </template>
    <template #default>
      <TOS/>
    </template>
  </UiSidePanel>`,
  }),
};
WithTitleSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiSidePanel
    v-model="modelValue"
    :title="title"
  >
    <template #title="{
      title,
      headingTitleAttrs,
    }">
      <UiHeading
        v-if="title"
        v-bind="headingTitleAttrs"
      >
        {{ title }}
      </UiHeading>
    </template>
    <template #default>
      <!-- Use default slot to place side panel content. -->
    </template> 
  </UiSidePanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  UiSidePanel,
  UiHeading,
} from '@infermedica/component-library';
import type { SidePanelProps } from '@infermedica/component-library';

const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
const title: SidePanelProps['title'] = '${meta.args.title}';
</script>
      `,
    },
  },
};

export const WithSubtitleSlot: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      UiText,
      TOS,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value');

      return {
        value,
        args,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
    >
      <template #subtitle="{
        subtitle,
        textSubtitleAttrs,
      }">
        <UiText
          v-if="subtitle"
          v-bind="textSubtitleAttrs"
          class="ui-text--body-2-comfortable ui-side-panel__subtitle"
        >
          {{ subtitle }}
        </UiText>
      </template>
      <template #default>
        <TOS/>
      </template>
    </UiSidePanel>`,
  }),
};
WithSubtitleSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiSidePanel
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
  >
    <template #subtitle="{
      subtitle,
      textSubtitleAttrs,
    }">
      <UiText
        v-if="subtitle"
        v-bind="textSubtitleAttrs"
        class="ui-text--body-2-comfortable ui-side-panel__subtitle"
      >
        {{ subtitle }}
      </UiText>
    </template>
    <template #default>
      <!-- Use default slot to place side panel content. -->
    </template>  
  </UiSidePanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  UiSidePanel,
  UiText,
} from '@infermedica/component-library';
import type { SidePanelProps } from '@infermedica/component-library';

const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
const title: SidePanelProps['title'] = '${meta.args.title}';
const subtitle: SidePanelProps['subtitle'] = '${meta.args.subtitle}';
</script>`,
    },
  },
};

export const WithContentSlot: SidePanelStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSidePanel,
      TOS,
    },
    directives: {
      scrollTabindex,
      keyboardFocus,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;
      const value = inject('value');

      return {
        value,
        args,
      };
    },
    template: `<UiSidePanel
      v-model="value"
      v-bind="args"
    >
      <template #content="{ contentAttrs }">
        <div
          v-scroll-tabindex
          v-keyboard-focus
          v-bind="contentAttrs"
          class="ui-side-panel__content"
        >
          <TOS/>
        </div>
      </template>
    </UiSidePanel>`,
  }),
};
WithContentSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiSidePanel
    v-model="modelValue"
    :title="title"
    :subtitle="subtitle"
  >
    <template #content="{ contentAttrs }">
      <div
        v-scroll-tabindex
        v-keyboard-focus
        v-bind="contentAttrs"
        class="ui-side-panel__content"
      >
        <!-- Place side panel content. -->
      </div>
    </template>
  </UiSidePanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  scrollTabindex as vScrollTabindex,
  keyboardFocus as vKeyboardFocus,
} from '@infermedica/component-library/directives';
import { UiSidePanel } from '@infermedica/component-library';
import type { SidePanelProps } from '@infermedica/component-library';

const modelValue = ref<SidePanelProps['modelValue']>(${meta.args.modelValue});
const title: SidePanelProps['title'] = '${meta.args.title}';
const subtitle: SidePanelProps['subtitle'] = '${meta.args.subtitle}';
</script>
  `,
    },
  },
};

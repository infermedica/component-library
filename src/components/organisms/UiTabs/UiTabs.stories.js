import UiTabs from '@/components/organisms/UiTabs/UiTabs.vue';
import UiTabsItem from '@/components/organisms/UiTabs/_internal/UiTabsItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { ref } from 'vue';

export default {
  title: 'Organisms/Tabs',
  component: UiTabs,
  subcomponents: { UiTabs, UiTabsItem, UiButton },
  args: {
    items: [
      {
        title: 'Search',
        name: 'search',
        content: 'Serum uric acid concentration',
      },
      {
        title: 'Point on the body',
        name: 'point',
        content: '1. Erythrocyte Sedimentation Rate',
      },
    ],
  },
  argTypes: {
    modifiers: {
      control: { type: 'multi-select', options: ['ui-tabs--fixed'] },
      table: {
        category: 'HTML attributes',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiTabs, UiTabsItem, UiText },
  setup() {
    const modelValue = ref('search');
    return { ...args, modelValue };
  },
  template: `<UiTabs 
    v-model="modelValue"
    :class="modifiers"
  >
    <template v-for="({name, title, content}, key) in items" :key="key">
      <UiTabsItem 
        :name="name" 
        :title="title"
      >
        <UiText>{{content}}</UiText>
      </UiTabsItem>
    </template>
  </UiTabs>`,
});

export const Common = Template.bind({});
Common.decorators = [() => ({ template: '<div style="min-height: 120px"><story /></div>' })];

export const Fixed = Template.bind({});
Fixed.args = {
  modifiers: ['ui-tabs--fixed'],
};
Fixed.decorators = [() => ({ template: '<div style="min-height: 120px"><story /></div>' })];

export const AsInTheDesign = (args) => ({
  components: { UiTabs, UiTabsItem, UiText },
  setup() {
    const modelValue = ref('search');
    return { ...args, modelValue };
  },
  template: `<UiTabs 
    v-model="modelValue"
    :class="modifiers"
    style="--tabs-padding: 0 var(--space-20); --tabs-underline-x-default: var(--space-20);"
  >
    <template v-for="({name, title, content}, key) in items" :key="key">
      <UiTabsItem 
        :name="name" 
        :title="title"
      >
        <UiText>{{content}}</UiText>
      </UiTabsItem>
    </template>
  </UiTabs>`,
});
AsInTheDesign.parameters = {
  layout: 'fullscreen',
};
AsInTheDesign.decorators = [() => ({ template: '<div style="min-height: 120px"><story /></div>' })];

export const WithTogglerSlot = (args) => ({
  components: {
    UiTabs, UiTabsItem, UiText, UiButton,
  },
  setup() {
    const modelValue = ref('search');
    return { ...args, modelValue };
  },
  template: 'Oops! Not found!',
  // template: `<UiTabs
  //   v-model="modelValue"
  //   :class="modifiers"
  // >
  //   <template
  //     v-for="({name, title, content}, key) in items"
  //     :key="key"
  //   >
  //     <UiTabsItem
  //       :name="name"
  //       :title="title"
  //     >
  //       <template #toggler="{toggle, name, title, isOpen}">
  //         <!-- fixme: how to handle ref in slots -->
  //         <div
  //           ref="tab"
  //           class="ui-tabs-item__tab"
  //         >
  //           <UiButton
  //             :id="'toggler' + name"
  //             :aria-expanded="isOpen.toString()"
  //             :aria-controls="name"
  //             class="ui-tabs-item__tab-button ui-button--text"
  //             :class="{'ui-tabs-item__tab-button--active': isOpen}"
  //             @click="toggle(name)"
  //           >
  //             {{ title }}
  //           </UiButton>
  //         </div>
  //       </template>
  //       <UiText>{{content}}</UiText>
  //     </UiTabsItem>
  //   </template>
  // </UiTabs>`,
});

export const WithContentSlot = (args) => ({
  components: {
    UiTabs, UiTabsItem, UiText, UiButton,
  },
  setup() {
    const modelValue = ref('search');
    return { ...args, modelValue };
  },
  template: `<UiTabs
    v-model="modelValue"
    :class="modifiers"
  >
    <template
      v-for="({name, title, content}, key) in items"
      :key="key"
    >
      <UiTabsItem
        :name="name"
        :title="title"
      >
        <template #content="{isOpen, name, attrs}">
          <div
            v-show="isOpen"
            :id="name"
            role="region"
            :aria-labelledby="'toggler' + name"
            class="ui-tabs-item__content"
            v-bind="attrs"
          >
            <UiText>{{content}}</UiText>
          </div>
        </template>
      </UiTabsItem>
    </template>
  </UiTabs>`,
});
WithContentSlot.decorators = [() => ({ template: '<div style="min-height: 120px"><story /></div>' })];

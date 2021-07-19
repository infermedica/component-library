import UiAccordion from '@/components/organisms/UiAccordion/UiAccordion.vue';
import UiAccordionItem from '@/components/organisms/UiAccordion/_internal/UiAccordionItem.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import { ref } from 'vue';

export default {
  title: 'Organisms/Accordion',
  component: UiAccordion,
  subcomponents: { UiAccordion, UiAccordionItem },
  args: {
    items: [
      {
        title: 'Mortphology',
        name: 'mortphology',
        content: 'Serum uric acid concentration',
      },
      {
        title: 'Rheumatology blood tests panel',
        name: 'rheumatology',
        content: '1. Erythrocyte Sedimentation Rate',
      },
      {
        title: 'Inflammation panel',
        name: 'inflammation',
        content: 'Rheumatoid factor',
      },
    ],
  },
};

const Template = (args) => ({
  components: { UiAccordion, UiAccordionItem, UiText },
  setup() {
    const modelValue = ref('');
    return { ...args, modelValue };
  },
  template: `<UiAccordion v-model="modelValue">
    <template 
      v-for="({name, title, content}, key) in items" 
      :key="key"
    >
      <UiAccordionItem 
        :name="name" 
        :title="title"
      >
        <UiText>{{content}}</UiText>
      </UiAccordionItem>
    </template>
  </UiAccordion>`,
});

export const MultipleItems = Template.bind({});

export const SingleItem = Template.bind({});
SingleItem.args = {
  items: [{
    title: 'Less likely conditions',
    name: 'less',
    content: 'Serum uric acid concentration',
  }],
};

export const MultipleItemsOpened = (args) => ({
  components: { UiAccordion, UiAccordionItem, UiText },
  setup() {
    const modelValue = ref([]);
    return { ...args, modelValue };
  },
  template: `<UiAccordion v-model="modelValue">
    <template 
      v-for="({name, title, content}, key) in items" 
      :key="key"
    >
      <UiAccordionItem 
        :name="name" 
        :title="title"
      >
        <UiText>{{content}}</UiText>
      </UiAccordionItem>
    </template>
  </UiAccordion>`,
});

export const WithTogglerSlot = (args) => ({
  components: {
    UiAccordion, UiAccordionItem, UiText, UiButton, UiIcon,
  },
  setup() {
    const modelValue = ref([]);
    return { ...args, modelValue };
  },
  template: `<UiAccordion v-model="modelValue">
    <template 
      v-for="({name, title, content}, key) in items" 
      :key="key"
    >
      <UiAccordionItem 
        :name="name" 
        :title="title"
      >
        <template #toggler="{toggle, name, icon, title, isOpen, iconOpen, iconClose}">
          <UiButton
            :id="'toggler' + name"
            :aria-expanded="isOpen.toString()"
            :aria-controls="name"
            class="ui-accordion-item__toggler ui-button--outlined ui-button--has-icon"
            @click="toggle(name)"
          >
            <template v-if="isOpen">
              <UiIcon
                :icon="iconOpen"
                class="ui-accordion-item__chevron"
              />
            </template>
            <template v-else>
              <UiIcon
                :icon="iconClose"
                class="ui-accordion-item__chevron"
              />
            </template>
            {{ title }}
          </UiButton>
        </template>
        <UiText>{{content}}</UiText>
      </UiAccordionItem>
    </template>
  </UiAccordion>`,
});

export const WithChevronSlot = (args) => ({
  components: {
    UiAccordion, UiAccordionItem, UiText, UiIcon,
  },
  setup() {
    const modelValue = ref([]);
    return { ...args, modelValue };
  },
  template: `<UiAccordion v-model="modelValue">
    <template 
      v-for="({name, title, content}, key) in items" 
      :key="key"
    >
      <UiAccordionItem 
        :name="name" 
        :title="title"
      >
        <template #chevron="{isOpen, iconOpen, iconClose}">
          <template v-if="isOpen">
            <UiIcon
              :icon="iconOpen"
              class="ui-accordion-item__chevron"
            />
          </template>
          <template v-else>
            <UiIcon
              :icon="iconClose"
              class="ui-accordion-item__chevron"
            />
          </template>
        </template>
        <UiText>{{content}}</UiText>
      </UiAccordionItem>
    </template>
  </UiAccordion>`,
});

export const WithContentSlot = (args) => ({
  components: {
    UiAccordion, UiAccordionItem, UiText,
  },
  setup() {
    const modelValue = ref([]);
    return { ...args, modelValue };
  },
  template: `<UiAccordion v-model="modelValue">
    <template 
      v-for="({name, title, content}, key) in items" 
      :key="key"
    >
      <UiAccordionItem 
        :name="name" 
        :title="title"
      >
        <template #content="{isOpen, name}">
          <div
            v-show="isOpen"
            :id="name"
            role="region"
            :aria-labelledby="'toggler' + name"
            class="ui-accordion-item__content"
          >
            <UiText>{{content}}</UiText>
          </div>
        </template>
      </UiAccordionItem>
    </template>
  </UiAccordion>`,
});

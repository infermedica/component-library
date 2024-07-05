import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiLink from '@/components/atoms/UiLink/UiLink.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import { ref } from 'vue';
import { scrollTabindex } from '@/utilities/directives';
import './scroll-tabindex.stories.scss';

export default {
  title: 'Utilities/Directives/Scroll Tabindex',
  tags: [ '!autodocs' ],
  decorators: [ () => ({
    template: `<div style="--backdrop-position: absolute; --side-panel-position: absolute; --side-panel-z-index: 0; min-height: 320px;">
        <story />
    </div>`,
  }) ],
};

export const WithDirective = () => ({
  components: {
    UiButton,
    UiHeading,
    UiIcon,
    UiSidePanel,
    UiText,
  },
  directives: { scrollTabindex },
  setup() {
    const modelValue = ref(true);
    return { modelValue };
  },
  template: `
  <UiButton
    class="ui-button--text ui-button--theme-secondary"
    @click="modelValue = true;"
  >
    Show side panel
  </UiButton>
  <UiSidePanel v-model="modelValue">
    <template #container="{
      transition,
      afterEnterHandler,
      modelValue,
      buttonCloseAttrs,
      closeHandler,
      title,
      subtitle
    }">
      <transition
        :name="transition"
        @after-enter="afterEnterHandler"
      >
        <dialog
          v-if='modelValue'
          class="ui-side-panel__dialog"
        >
          <div class="ui-side-panel__header">
            <UiButton
              ref="button"
              class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
              v-bind="buttonCloseAttrs"
              @click="closeHandler"
            >
              <UiIcon icon="close" />
            </UiButton>
            <div class="ui-side-panel__label">
              <UiHeading>
                Interview ID
              </UiHeading>
            </div>
          </div>
          <div
            v-scroll-tabindex
            class="ui-side-panel__content"
          >
            <UiHeading level="4">
              Interview ID:
            </UiHeading>
            <UiText>
              f437b2ba-772b-4cf1-8108-9e23505844d8
            </UiText>
          </div>
        </dialog>
      </transition>
    </template>
  </UiSidePanel>
    `,
});
const TOS = {
  components: {
    UiBulletPoints,
    UiBulletPointsItem,
    UiLink,
  },
  template: `<UiBulletPoints
    tag="ol"
    class="tos"
  >
    <UiBulletPointsItem>
      These Terms of Service specify:
      <UiBulletPoints
        tag="ol"
        type="a"
        class="ui-bullet-points--nested tos--nested"
      >
        <UiBulletPointsItem>
          principles of operation of the website and the mobile application "<UiLink href="#">Triage.com</UiLink>",
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          rules on the provision of services by electronic means,
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          the rights and obligations of the Service Provider and the Service Recipients.
        </UiBulletPointsItem>
      </UiBulletPoints>
    </UiBulletPointsItem>
    <UiBulletPointsItem>
      Whenever these Terms of Service refer to:
      <UiBulletPoints
        tag="ol"
        type="a"
        class="ui-bullet-points--nested tos--nested"
      >
        <UiBulletPointsItem>
          Application, this means the software for portable devices, made available free of charge by the Service Provider referred to in sec. 2(l) below, enabling the use of the Services referred to in sec. 2(k) below,
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          Articles, this means articles referring to medical and pharmaceutical topics,
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          License, this means a non-exclusive, royalty-free license granted to Users referred to in sec. 2(m) below to use the Application or Website referred to in sec. 2(j) below,
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          Terms of Service, this means these Terms of Service,
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          GDPR, this means Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of individuals with regard to the processing of personal data and on the free movement of such data and repealing Directive 95/46/EC (General Data Protection Regulation) (OJ L 119, p. 1),
        </UiBulletPointsItem>
      </UiBulletPoints>
    </UiBulletPointsItem>
  </UiBulletPoints>`,
};

export const WithDirectiveAndScrollableContent = () => ({
  components: {
    UiButton,
    UiHeading,
    UiIcon,
    UiSidePanel,
    UiText,
    TOS,
  },
  directives: { scrollTabindex },
  setup() {
    const modelValue = ref(true);
    return { modelValue };
  },
  template: `<UiButton
    class="ui-button--text ui-button--theme-secondary"
    @click="modelValue = true"
  >
    Show side panel
  </UiButton>
  <UiSidePanel v-model="modelValue">
    <template #container="{
      transition,
      afterEnterHandler,
      modelValue,
      buttonCloseAttrs,
      closeHandler,
      title,
      subtitle,
    }">
      <transition
          :name="transition"
          @after-enter="afterEnterHandler"
      >
        <dialog
          v-if="modelValue"
          class="ui-side-panel__dialog"
        >
          <div class="ui-side-panel__header">
            <UiButton
                ref="button"
                class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
                v-bind="buttonCloseAttrs"
                @click="closeHandler"
            >
              <UiIcon icon="close"/>
            </UiButton>
            <div class="ui-side-panel__label">
              <UiHeading>
                Terms of services
              </UiHeading>
              <UiText class="ui-side-panel__subtitle">
                Last updated: Nov 26th, 2020
              </UiText>
            </div>
          </div>
          <div class="ui-side-panel__content" v-scroll-tabindex>
            <UiHeading>
              §1. General Provisions
            </UiHeading>
            <TOS/>
          </div>
        </dialog>
      </transition>
    </template>
  </UiSidePanel>`,
});

export const WithoutDirective = () => ({
  components: {
    UiButton,
    UiHeading,
    UiIcon,
    UiSidePanel,
    UiText,
    TOS,
  },
  setup() {
    const modelValue = ref(true);
    return { modelValue };
  },
  template: `<UiButton
    class="ui-button--text ui-button--theme-secondary"
    @click="modelValue = true"
  >
    Show side panel
  </UiButton>
  <UiSidePanel v-model="modelValue">
    <template #container="{
      transition,
      afterEnterHandler,
      modelValue,
      buttonCloseAttrs,
      closeHandler,
      title,
      subtitle,
    }">
      <transition
        :name="transition"
        @after-enter="afterEnterHandler"
      >
        <dialog
          v-if="modelValue"
          class="ui-side-panel__dialog"
        >
          <div class="ui-side-panel__header">
            <UiButton
              ref="button"
              class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-side-panel__close"
              v-bind="buttonCloseAttrs"
              @click="closeHandler"
            >
              <UiIcon icon="close"/>
            </UiButton>
            <div class="ui-side-panel__label">
              <UiHeading>
                Terms of services
              </UiHeading>
              <UiText class="ui-side-panel__subtitle">
                Last updated: Nov 26th, 2020
              </UiText>
            </div>
          </div>
          <div class="ui-side-panel__content">
            <UiHeading>
              §1. General Provisions
            </UiHeading>
            <TOS/>
          </div>
        </dialog>
      </transition>
    </template>
  </UiSidePanel>`,
});

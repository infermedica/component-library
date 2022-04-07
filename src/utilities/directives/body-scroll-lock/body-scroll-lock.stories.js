import { ref } from 'vue';
import UiAlert from '@/components/atoms/UiAlert/UiAlert.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiLink from '@/components/atoms/UiLink/UiLink.vue';
import UiNotification from '@/components/molecules/UiNotification/UiNotification.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import docs from './body-scroll-lock.mdx';
import { bodyScrollLock } from '../index';

export default {
  title: 'Utilities/Directives/Body Scroll Lock',
  decorators: [() => ({ template: '<div style="--backdrop-position: absolute; --side-panel-position: absolute; --side-panel-z-index: 0; height: 350px;"><story /></div>' })],
  parameters: {
    docs: {
      page: docs,
    },
  },
};

export const WithDirective = () => ({
  components: {
    UiAlert,
    UiBulletPoints,
    UiBulletPointsItem,
    UiButton,
    UiHeading,
    UiIcon,
    UiLink,
    UiNotification,
    UiText,
    UiSidePanel,
  },
  directives: {
    bodyScrollLock,
  },
  setup() {
    const modelValue = ref(true);
    return {
      modelValue,
    };
  },
  template: `
  <!-- This div bellow was added only to simulate body scrollbar behavior inside storybook -->
  <div :style="{ overflow: modelValue ? 'hidden' : visible, height: '350px' }">
    <UiButton class="ui-button--text ui-button--secondary" @click="modelValue = true">
      Show side panel
    </UiButton>
    <UiNotification type="info" style="margin-top: 105vh">
      <UiAlert type="info" class="ui-alert--secondary"> Bottom of body </UiAlert>
    </UiNotification>
    <UiSidePanel v-model="modelValue">
      <template
        #container="{
          transition,
          afterEnterHandler,
          modelValue,
          buttonCloseAttrs,
          closeHandler,
          title,
          subtitle,
        }"
      >
        <transition :name="transition" @after-enter="afterEnterHandler">
          <!-- scope where body-scroll-lock will be look elements to ignore -->
          <dialog v-if="modelValue" class="ui-side-panel__dialog" v-body-scroll-lock>
            <div class="ui-side-panel__header">
              <UiButton
                ref="button"
                class="ui-button--has-icon ui-button--secondary ui-button--text ui-side-panel__close"
                v-bind="buttonCloseAttrs"
                @click="closeHandler"
              >
                <UiIcon icon="close" />
              </UiButton>
              <div class="ui-side-panel__label">
                <UiHeading> Terms of sevices </UiHeading>
                <UiText class="ui-side-panel__subtitle">
                  Last updated: Nov 26th, 2020
                </UiText>
              </div>
            </div>
            <div class="ui-side-panel__content" :body-scroll-lock-ignore="true">
              <UiHeading>§1. General Provisions</UiHeading>
              <UiBulletPoints tag="ol">
                <UiBulletPointsItem style="margin: var(--space-32) 0">
                  <UiText>These Terms of Service specify:</UiText>
                  <UiBulletPoints tag="ol" type="a">
                    <UiBulletPointsItem>
                      <UiText>
                        principles of operation of the website and the mobile application
                        "<UiLink href="#"> Symptomate.com</UiLink>",
                      </UiText>
                    </UiBulletPointsItem>
                    <UiBulletPointsItem>
                      <UiText>
                        rules on the provision of services by electronic means,
                      </UiText>
                    </UiBulletPointsItem>
                    <UiBulletPointsItem>
                      <UiText>
                        the rights and obligations of the Service Provider and the Service Recipients.
                      </UiText>
                    </UiBulletPointsItem>
                  </UiBulletPoints>
                </UiBulletPointsItem>
                <UiBulletPointsItem style="margin: var(--space-32) 0">
                  <UiText>Whenever these Terms of Service refer to:</UiText>
                  <UiBulletPoints tag="ol" type="a">
                    <UiBulletPointsItem>
                      <UiText>
                        Application, this means the software for portable devices, made
                        available free of charge by the Service Provider referred to in
                        sec. 2(l) below, enabling the use of the Services referred to in
                        sec. 2(k) below,
                      </UiText>
                    </UiBulletPointsItem>
                    <UiBulletPointsItem>
                      <UiText>
                        Articles, this means articles referring to medical and
                        pharmaceutical topics,
                      </UiText>
                    </UiBulletPointsItem>
                    <UiBulletPointsItem>
                      <UiText>
                        License, this means a non-exclusive, royalty-free license granted
                        to Users referred to in sec. 2(m) below to use the Application or
                        Website referred to in sec. 2(j) below,
                      </UiText>
                    </UiBulletPointsItem>
                    <UiBulletPointsItem>
                      <UiText>
                        Terms of Service, this means these Terms of Service,
                      </UiText>
                    </UiBulletPointsItem>
                    <UiBulletPointsItem>
                      <UiText>
                        GDPR, this means Regulation (EU) 2016/679 of the European
                        Parliament and of the Council of 27 April 2016 on the protection
                        of individuals with regard to the processing of personal data and
                        on the free movement of such data and repealing Directive 95/46/EC
                        (General Data Protection Regulation) (OJ L 119, p. 1),
                      </UiText>
                    </UiBulletPointsItem>
                  </UiBulletPoints>
                </UiBulletPointsItem>
              </UiBulletPoints>
            </div>
          </dialog>
        </transition>
      </template>
    </UiSidePanel>
  </div>
  `,
});

export const WithoutDirective = () => ({
  components: {
    UiAlert,
    UiBulletPoints,
    UiBulletPointsItem,
    UiButton,
    UiHeading,
    UiIcon,
    UiLink,
    UiNotification,
    UiText,
    UiSidePanel,
  },
  directives: {
    bodyScrollLock,
  },
  setup() {
    const modelValue = ref(true);
    return {
      modelValue,
    };
  },

  template: `
  <UiButton class="ui-button--text ui-button--secondary" @click="modelValue = true">
    Show side panel
  </UiButton>
  <UiNotification type="info" style="margin-top: 105vh">
    <UiAlert type="info" class="ui-alert--secondary"> Bottom of body </UiAlert>
  </UiNotification>
  <UiSidePanel v-model="modelValue">
    <template
      #container="{
        transition,
        afterEnterHandler,
        modelValue,
        buttonCloseAttrs,
        closeHandler,
        title,
        subtitle,
      }"
    >
      <transition :name="transition" @after-enter="afterEnterHandler">
        <dialog v-if="modelValue" class="ui-side-panel__dialog">
          <div class="ui-side-panel__header">
            <UiButton
              ref="button"
              class="ui-button--has-icon ui-button--secondary ui-button--text ui-side-panel__close"
              v-bind="buttonCloseAttrs"
              @click="closeHandler"
            >
              <UiIcon icon="close" />
            </UiButton>
            <div class="ui-side-panel__label">
              <UiHeading> Terms of sevices </UiHeading>
              <UiText class="ui-side-panel__subtitle">
                Last updated: Nov 26th, 2020
              </UiText>
            </div>
          </div>
          <div class="ui-side-panel__content">
            <UiHeading>§1. General Provisions</UiHeading>
            <UiBulletPoints tag="ol">
              <UiBulletPointsItem style="margin: var(--space-32) 0">
                <UiText>These Terms of Service specify:</UiText>
                <UiBulletPoints tag="ol" type="a">
                  <UiBulletPointsItem>
                    <UiText
                      >principles of operation of the website and the mobile application
                      "<UiLink href="#"> Symptomate.com</UiLink>",
                    </UiText>
                  </UiBulletPointsItem>
                  <UiBulletPointsItem>
                    <UiText>
                      rules on the provision of services by electronic means,
                    </UiText>
                  </UiBulletPointsItem>
                  <UiBulletPointsItem>
                    <UiText>
                      the rights and obligations of the Service Provider and the Service
                      Recipients.</UiText
                    >
                  </UiBulletPointsItem>
                </UiBulletPoints>
              </UiBulletPointsItem>
              <UiBulletPointsItem style="margin: var(--space-32) 0">
                <UiText>Whenever these Terms of Service refer to:</UiText>
                <UiBulletPoints tag="ol" type="a">
                  <UiBulletPointsItem>
                    <UiText>
                      Application, this means the software for portable devices, made
                      available free of charge by the Service Provider referred to in sec.
                      2(l) below, enabling the use of the Services referred to in sec.
                      2(k) below,
                    </UiText>
                  </UiBulletPointsItem>
                  <UiBulletPointsItem>
                    <UiText>
                      Articles, this means articles referring to medical and
                      pharmaceutical topics,
                    </UiText>
                  </UiBulletPointsItem>
                  <UiBulletPointsItem>
                    <UiText>
                      License, this means a non-exclusive, royalty-free license granted to
                      Users referred to in sec. 2(m) below to use the Application or
                      Website referred to in sec. 2(j) below,
                    </UiText>
                  </UiBulletPointsItem>
                  <UiBulletPointsItem>
                    <UiText>Terms of Service, this means these Terms of Service,</UiText>
                  </UiBulletPointsItem>
                  <UiBulletPointsItem>
                    <UiText>
                      GDPR, this means Regulation (EU) 2016/679 of the European Parliament
                      and of the Council of 27 April 2016 on the protection of individuals
                      with regard to the processing of personal data and on the free
                      movement of such data and repealing Directive 95/46/EC (General Data
                      Protection Regulation) (OJ L 119, p. 1),
                    </UiText>
                  </UiBulletPointsItem>
                </UiBulletPoints>
              </UiBulletPointsItem>
            </UiBulletPoints>
          </div>
        </dialog>
      </transition>
    </template>
  </UiSidePanel>
  `,
});


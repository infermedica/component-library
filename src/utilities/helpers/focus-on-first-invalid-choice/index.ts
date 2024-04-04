import {
  nextTick,
  type Ref,
} from 'vue';
import UiMultipleChoices from '../../../components/organisms/UiMultipleChoices/UiMultipleChoices.vue';

export default function focusOnInvalidChoice(invalidChoices: Ref<InstanceType<typeof UiMultipleChoices> | null>) {
  const focusInvalidInput = async () => {
    if (!invalidChoices.value) return;

    const { focusInvalidChoice } = invalidChoices.value;

    await nextTick();
    focusInvalidChoice();
  };

  return { focusInvalidInput };
}

import {useEffect} from "react";
import { useAddonState } from '@storybook/api';

export const useCssPropertiesState = (onChange = () => {}) => {
  const [state, setState] = useAddonState('AddonReset', false);
  useEffect(() => {
    if (state) {
      onChange();
      setState(false);
    }
  }, [state])
  const updateState = (isReset) => {
    if (isReset) {
      document.querySelector("#storybook-preview-iframe").contentWindow.document.body.removeAttribute("style");
      window.localStorage.setItem('cssProperties', JSON.stringify({}))
    }
    setState(isReset);
  }
  return [state, updateState];
}
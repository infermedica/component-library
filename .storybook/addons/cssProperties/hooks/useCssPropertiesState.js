import {useEffect} from "react";
import { useAddonState } from '@storybook/api';
import { removeBodyStyles } from "../helpers";

export const useCssPropertiesState = (onChange = () => {}) => {
  const [state, setState] = useAddonState('AddonReset', false);
  useEffect(() => {
    if (state) {
      onChange();
      setState(false);
    }
  }, [state]);
  const updateState = (isReset) => {
    if (isReset) {
      removeBodyStyles();
      window.localStorage.setItem('cssProperties', JSON.stringify({}));
    }
    setState(isReset);
  }
  return [state, updateState];
}
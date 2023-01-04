import { useState, useRef, useEffect } from "react";
import { useAddonState } from "@storybook/api";

export const getStorageValue = (storyId) => (JSON.parse(window.localStorage.getItem('cssProperties'))
  ? JSON.parse(window.localStorage.getItem('cssProperties'))[storyId]
  : {});
export const setStorageValue = (storyId, newValue = {}, isReset = false) => {
  if(isReset){
    window.localStorage.setItem('cssProperties', JSON.stringify(newValue))
  } else {
    window.localStorage.setItem('cssProperties', JSON.stringify({
      ...JSON.parse(window.localStorage.getItem('cssProperties')),
      [storyId]: newValue
    }));
  }
};
export const setStorageGlobalProperties = (event, cssGlobalProperties) => {
  if (event.storageArea === window.localStorage && event.key === 'cssProperties') {
    cssGlobalProperties.current = JSON.parse(event.newValue).global;
  }
}
export const getStorageGlobalProperties = () => {
  const hasProperty = !!window.localStorage.getItem('cssProperties')
  return useRef(hasProperty
    ? JSON.parse(window.localStorage.getItem('cssProperties'))?.global
    : {}
  );
}
export const useLocalStorage = (storyId, initialValue = {cssProperties: {}}) => {
  const [localValue, setLocalValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      return getStorageValue(storyId);
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const [addonState, setAddonState] = useAddonState("LocalChanges", localValue)
  useEffect(() => {
    setAddonState(localValue)
  }, [localValue])
  useEffect(() => {
    setLocalValue(addonState);
  }, [addonState])
  const handleSetValue = (value) => {
    try {
      const valueToStore = value instanceof Function
        ? value(localValue)
        : value;
      setLocalValue(valueToStore);
      if (typeof window !== "undefined") {
        setStorageValue(storyId, valueToStore);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetValue = (isReset = false) => {
    setLocalValue({});
    setStorageValue(storyId, {}, isReset);
  };
  return [localValue, handleSetValue, resetValue];
}
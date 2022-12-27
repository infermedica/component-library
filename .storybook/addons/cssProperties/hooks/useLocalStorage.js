import { useState, useRef } from "react";

const getStorageValue = (storyId) => (JSON.parse(window.localStorage.getItem('cssProperties'))
  ? JSON.parse(window.localStorage.getItem('cssProperties'))[storyId]
  : {});
const setStorageValue = (storyId, newValue = {}) => {
  window.localStorage.setItem('cssProperties', JSON.stringify({
    ...JSON.parse(window.localStorage.getItem('cssProperties')),
    [storyId]: newValue
  }));
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
  const [value, setValue] = useState(() => {
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
  const handleSetValue = (value) => {
    try {
      const valueToStore = value instanceof Function
        ? value(value)
        : value;
      setValue(valueToStore);
      if (typeof window !== "undefined") {
        setStorageValue(storyId, valueToStore);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetValue = () => {
    setValue({});
    setStorageValue(storyId, {});
  };
  return [value, handleSetValue, resetValue];
}
import { useState, useRef } from "react";

const handleError = (error) => {
  console.error(error);
  return {};
};
const getLocalStorageItem = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return handleError(error)
  }
};
const setLocalStorageItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return handleError(error);
  }
};
export const getStorageValue = (storyId) => {
  const cssProperties = getLocalStorageItem('cssProperties') || {};
  return cssProperties[storyId] || {};
};
export const setStorageValue = (storyId, newValue = {}) => {
  const cssProperties = getLocalStorageItem('cssProperties');
  setLocalStorageItem('cssProperties', { ...cssProperties, [storyId]: newValue });
};
export const setStorageGlobalProperties = (event, cssGlobalProperties) => {
  if (event.storageArea === window.localStorage && event.key === 'cssProperties') {
    cssGlobalProperties.current = JSON.parse(event.newValue);
  }
}
export const getStorageGlobalProperties = () => {
  const cssProperties = getLocalStorageItem('cssProperties');
  return useRef(Object.keys(cssProperties).reduce((styles, key) => ({
      ...styles,
      ...cssProperties[key],
    }),{})
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
  const resetValue = () => {
    setLocalValue({});
    setStorageValue(storyId, {});
  };
  return [localValue, handleSetValue, resetValue];
}
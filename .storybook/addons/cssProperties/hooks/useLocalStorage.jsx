import { useState } from "react";

const getLocalStorageValue = (storyId) => (JSON.parse(window.localStorage.getItem('cssProperties'))
  ? JSON.parse(window.localStorage.getItem('cssProperties'))[storyId]
  : {});
const setLocalStorage = (storyId, newValue) => {
  window.localStorage.setItem('cssProperties', JSON.stringify({
    ...JSON.parse(window.localStorage.getItem('cssProperties')),
    ...{
      [storyId]: newValue
    },
  }));
};
export const useLocalStorage = (storyId, initialValue = {cssProperties: {}}) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      return getLocalStorageValue(storyId);
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        setLocalStorage(storyId, valueToStore);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetValue = () => {
    setStoredValue({});
    setLocalStorage(storyId, {});
  };
  return [storedValue, setValue, resetValue];
}
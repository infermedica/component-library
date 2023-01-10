import { useEffect } from "react";

export const useWindowEvent = (
  type,
  listener,
) => {
  useEffect(() => {
    window.addEventListener(type, listener);
    return () => window.removeEventListener(type, listener);
  }, []);
}
import { useLayoutEffect } from "react";
import { getStringifiedStyles, getDocument } from "../helpers";

export const useInjectStyles = (cssProperties) => {
  useLayoutEffect(() => {
    const body = getDocument().body;
    const stringifiedStyles = getStringifiedStyles(cssProperties);
    if (stringifiedStyles) {
      body?.setAttribute("style", stringifiedStyles);
    } else {
      body?.removeAttribute("style");
    }
  });
}
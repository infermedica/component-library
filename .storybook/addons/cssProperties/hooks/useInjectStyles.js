import { useLayoutEffect, useRef } from "react";
import { getStringifiedStyles } from "../helpers";

export const useInjectStyles = (cssProperties) => {
  const previewRef = useRef();
  useLayoutEffect(() => {
    const iframe = document.querySelector("#storybook-preview-iframe");
    if (iframe) {
      previewRef.current = iframe?.contentWindow?.document;
    } else if (document) {
      previewRef.current = document;
    }
    const stringifiedStyles = getStringifiedStyles(cssProperties);
    if (stringifiedStyles) {
      previewRef?.current?.body?.setAttribute("style", stringifiedStyles);
    } else {
      previewRef?.current?.body?.removeAttribute("style");
    }
  });
}
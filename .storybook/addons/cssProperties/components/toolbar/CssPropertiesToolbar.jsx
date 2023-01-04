import React, { useState, useRef } from "react";
import { IconButton, WithTooltip, Icons } from '@storybook/components';
import { styled } from "@storybook/theming";
import { useCssPropertiesState } from "../../hooks/useCssPropertiesState";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`
const Icon = styled(Icons)`
  width: 14px;
  height: 14px;
  margin-right: 5px;
`
const ResetIcon = styled(Icon)`
  color: #ff8f8e;
`
const Button = styled(IconButton)`
  display: flex;
  justify-content: flex-start;
  font-weight: normal;
  margin: 0;
`

export const CssPropertiesToolbar = ({ active }) => {
  const [isHidden, setIsHidden] = useState(false);
  const setAddonState = useCssPropertiesState()[1];
  const styles = useRef();
  const handleReset = (closeTooltip) => {
    setAddonState(true);
    styles.current = "";
    closeTooltip();
  }
  const handleHide = (closeTooltip) => {
    const body = document.querySelector("#storybook-preview-iframe").contentWindow.document.body;
    if (isHidden) {
      body.style = styles.current;
    } else {
      styles.current = body.getAttribute('style');
      body.removeAttribute("style");
    }
    setIsHidden(!isHidden);
    closeTooltip();
  }
  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      closeOnClick
      tooltip={({ onHide }) => {
        const icon = isHidden ? 'eye' : 'eyeclose';
        const text = isHidden ? "Show Custom Properties" : "Hide Custom Properties";
        return (
          <List>
            <Button onClick={() => handleHide(onHide)}>
              <Icon icon={icon} />{text}
            </Button>
            <Button onClick={() => handleReset(onHide)}>
              <ResetIcon icon="delete" />Reset Custom Properties
            </Button>
          </List>
        )
      }}
    >
      <IconButton
        active={active}
        title="Reset or hide CSS Custom Properties"
      >
        CSS
      </IconButton>
    </WithTooltip>
  )
}
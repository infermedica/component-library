import React, { useState } from "react";
import { IconButton, WithTooltip, Icons } from '@storybook/components';
import { styled } from "@storybook/theming";
import { useAddonState, useParameter } from '@storybook/api';
import { getRows, getCssProperties, getStringifiedStyles } from '../../helpers';
import { useLocalStorage } from "../../hooks/useLocalStorage";

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

export const CssPropertiesToolbar = ({ active, storyId }) => {
  const [isHidden, setIsHidden] = useState(false);
  const defaultCssProperties = getCssProperties(useParameter('cssProperties', {}));
  const setPanelState = useAddonState('CssPropertiesState')[1];
  const [localChanges, setLocalChanges, resetLocalChanges] = useLocalStorage(storyId);

  const handleReset = () => {
    // window.localStorage.setItem("cssProperties", JSON.stringify({}))
    setPanelState(getRows(defaultCssProperties));
    // setLocalChanges({})
    resetLocalChanges(true);
  }
  const handleHide = () => {
    const iframe = document.querySelector("#storybook-preview-iframe")
    if (isHidden) {
      iframe.contentWindow.document.body.style = getStringifiedStyles(localChanges)
    } else {
      iframe.contentWindow.document.body.removeAttribute("style");
    }
    setIsHidden(!isHidden)
  }
  const HideButton = () => {
    const icon = isHidden ? 'eye' : 'eyeclose';
    const text = isHidden ? "Show Custom Properties" : "Hide Custom Properties"
    return (
      <Button onClick={handleHide}>
        <Icon icon={icon} />{text}
      </Button>
    )
  }
  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      closeOnClick
      tooltip={() => {
        return (
          <List>
            <HideButton />
            <Button onClick={handleReset}>
              <ResetIcon icon="delete" />Reset Custom Properties
            </Button>
          </List>
        )
      }}
    >
      <IconButton
        active={active}
        title="Show a Storybook toolbar"
      >
        CSS
      </IconButton>
    </WithTooltip>
  )
}
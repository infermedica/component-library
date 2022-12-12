import * as React from 'react';
import { ArgsTable } from '@storybook/components';

const CssPropertiesTable = ({
  file, inAddonPanel = false,
}) => {
  console.log(file);
  const tableArgsBuilder = () => {
    if (!file) return {};
    const cssVariableList = file.split('\n')
      .slice(3, -2)
      .map((fileLine) => fileLine.trim()
        .replace(';', '')
        .split(':')).filter((el) => el.length === 2);
    return cssVariableList.reduce((args, [
      name,
      value,
    ]) => ({
      ...args,
      [name]: {
        name,
        table: {
          category: name.slice(2, -1).split('-')[1],
          defaultValue: { summary: value.trim() },
        },
        control: {
          type: name.includes('color') ? 'color' : 'text',
          value: value.trim(),
        },
      },
    }), {});
  };

  console.log(tableArgsBuilder());

  tableArgsBuilder();

  const resetArgs = () => {
    window.location.reload();
  };

  return (
    <ArgsTable
      inAddonPanel={inAddonPanel}
      resetArgs={() => resetArgs()}
      rows={tableArgsBuilder()}
      updateArgs={(a) => {
        console.log(a);
      }}
    />
  );
};

export default CssPropertiesTable;

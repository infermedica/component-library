/* eslint-disable import/prefer-default-export */
import React from 'react';
import { styled } from '@storybook/theming';
import { Table } from './Table';
import { capitalizeFirst } from '../../src/utilities/helpers/index';

const List = styled.ul`
  list-style-type: none;
  padding: 0 8px;`;
const ListItem = styled.ul`
  padding: 0;
  margin: 0;`;
const SectionTitle = styled.h2`
  margin: 20px 0 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(0,0,0,.1);
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
`;
const ComponentTitle = styled.h3`
  margin: 20px 0 8px;
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  h2 + & {
    margin-top: 0;
    padding-top: 0;
  }
`;
const ApiElTitle = styled.h4`
  margin: 20px 0 8px;
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
`;
const Text = styled.p`
  margin: 0 0 8px 8px;
  font-size: 14px`;

export const ComponentsApiSection = ({ diffs }) => <React.Fragment>
  <SectionTitle>Changes in the API of components</SectionTitle>
    { Object.keys(diffs).map((componentName) => <React.Fragment key={componentName}>
      <ComponentTitle>{componentName}</ComponentTitle>
      { Object.keys(diffs[componentName]).map((apiEl, index) => {
        if (apiEl === 'component') {
          return <Text key={index}>{`Component is ${diffs[componentName][apiEl][0].type}`}</Text>;
        }
        {
          const rows = diffs[componentName][apiEl].map(({
            name, type, description,
          }) => [
            name,
            type,
            description || '',
          ]);
          const apiElCapitalized = capitalizeFirst(apiEl);
          return <React.Fragment key={index}>
            <ApiElTitle>{`${apiElCapitalized} changes`}</ApiElTitle>
            <Table
              headers={[
                apiElCapitalized,
                'Status',
                'Description',
              ]}
              rows={ rows }
            />
          </React.Fragment>;
        }
      })}
    </React.Fragment>)}
</React.Fragment>;

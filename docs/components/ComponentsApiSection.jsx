/* eslint-disable import/prefer-default-export */
import React from 'react';
import { styled } from '@storybook/theming';
import { Table } from './Table';

const Section = styled.section`
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;`;
const List = styled.ul`
  list-style-type: none;
  padding: 0 8px;`;
const ListItem = styled.ul`
  padding: 8px 0;
  margin: 0;`;
const SectionTitle = styled.h2`
  margin: 20px 0 16px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(0,0,0,.1);`;
const ComponentTitle = styled.h3`
  margin: 0 0 8px;`;
const ApiElTitle = styled.h4`
  margin: 0 0 8px;`;
const Text = styled.p`
  margin: 0 0 8px 8px;
  font-size: 14px`;

export const ComponentsApiSection = ({ diffs }) => <Section>
  <SectionTitle>Changes in the API of components</SectionTitle>
  <List>
    { Object.keys(diffs).map((componentName) => <ListItem key={componentName}>
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
          return <List key={index}>
            <ListItem>
              <ApiElTitle>{`• ${apiEl} changes`}</ApiElTitle>
              <Table
                headers={[
                  'Name',
                  'Status',
                  'Description',
                ]}
                rows={ rows }
              />
            </ListItem>
          </List>;
        }
      })}
    </ListItem>)}
  </List>
</Section>;

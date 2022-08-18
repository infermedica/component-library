import React from 'react';
import reactStringReplace from 'react-string-replace';
import { styled } from '@storybook/theming';

const RTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe R", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  line-height: 24px;
  color: #333333;`;

const RTh = styled.th`
  font-weight: bold;
  padding: 6px 13px;`;

const RTr = styled.tr`
  margin: 16px;
  text-align: left;
  border-bottom: 1px solid rgba(0,0,0,.1);`;

const RTd = styled.td`
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe R", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  color: #333333;
  padding: 6px 13px;
  &:first-of-type,
  &:last-of-type {
    width: 35%;
  }
  &:nth-of-type(2) {
    width: 25%;
  }`;

const RCode = styled.code`
  line-height: 1;
  margin: 0 2px;
  padding: 3px 5px;
  white-space: nowrap;
  border-radius: 3px;
  border: 1px solid #EEEEEE;
  font-size: 13px;
  color: rgba(51,51,51,0.9);
  background-color: #F8F8F8`;

export const Table = ({ headers = [], rows = [[]] }) => <RTable>
  <thead>
    <RTr>
      {headers.map((header) => <RTh className="th">{header}</RTh>)}
    </RTr>
  </thead>
  <tbody>
    {rows.map((row) => <RTr>
      {
        row.map((cell, index) => {
          const content = reactStringReplace(cell, /`(.*?)`/g, (match, p1) => <RCode>{match}</RCode>);
          return <RTd key={index}>
            {content}
          </RTd>;
        })
      }
    </RTr>)}
  </tbody>
</RTable>;

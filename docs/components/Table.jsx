import React from 'react';
import reactStringReplace from 'react-string-replace';
import { styled } from '@storybook/theming';

const RTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe R", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 13px;
  line-height: 20px;
  color: #333333;
  text-align: left;
`;

const THead = styled.thead`
  display: table-header-group;
  vertical-align: middle;
`;

const RTh = styled.th`
  color: #333333;
  padding: 10px 15px;
  font-weight: 600;
  width: 20%;
`;

const RTr = styled.tr`
  margin: 16px;
  text-align: left;
  border-bottom: 1px solid rgba(0,0,0,.1);
`;

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
width: 25%;}
`;

const TBody = styled.tbody`
  box-shadow: rgb(0 0 0 / 10%) 0 1px 3px 1px, rgb(0 0 0 / 7%) 0 0 0 1px;
  border-radius: 4px;
`;

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

export const Table = ({
  headers = [], rows = [[]], slotRows, slotHeaders,
}) => <RTable>
    <THead>
      <RTr>
        {slotHeaders ?? headers.map((header, index) => <RTh className="th" key={index}>{header}</RTh>)}
      </RTr>
    </THead>
    <TBody>
      {rows.map((row, rowIndex) => slotRows ?? <RTr key={rowIndex}>
        {
          row.map((cell, index) => {
            const content = reactStringReplace(cell, /`(.*?)`/g, (match, p1) => <RCode>{match}</RCode>);
            return <RTd key={index}>
              {content}
            </RTd>;
          })
        }
      </RTr>)}
    </TBody>
  </RTable>;

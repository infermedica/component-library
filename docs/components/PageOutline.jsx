import React, {
  useState,
  useEffect,
} from 'react';
import {
  styled,
  css,
} from '@storybook/theming';

// https://emotion.sh/docs/introduction
const Container = styled.div`
  margin: 16px 0;
`;
const Title = styled.span`
  display: block;
  margin: 20px 0 8px;
  color: #333333;
  font-family: "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: bold;
  font-size: 16px;
`;
const List = styled.ul`
  padding: 0;
  ${(props) => (props.nested ? css`margin: 0 16px;` : css`margin: 0;`)}
  list-style: none;
`;
const Link = styled.a`
  color: rgb(30, 167, 253);
  font-family: "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  text-decoration: none;
  line-height: 24px;
`;

const makeAnchor = (node) => {
  const id = encodeURI(node.textContent)
    .replace('%20', '-')
    .replace('%22', '')
    .toLocaleLowerCase();
  node.setAttribute('id', id);
  return node;
};
const getHeadingLevel = (node) => parseInt(node?.tagName.substring(1), 10);
const getNodes = (elements) => {
  let headings = [ ...elements ];
  const nodes = [];

  while (headings.length) {
    const currentHeading = makeAnchor(headings.shift());
    const key = currentHeading.textContent.replace(' ', '_');
    const nextHeading = headings.at(0);
    if (getHeadingLevel(currentHeading) > getHeadingLevel(nextHeading)) { // h3 > h2
      nodes.push(<li key={key}>
        <Link
          href={`#${currentHeading.id}`}
          target="_self"
        >
          {currentHeading.textContent}
        </Link>
      </li>);
      return {
        nodes,
        headings,
      };
    }
    if (getHeadingLevel(currentHeading) < getHeadingLevel(nextHeading)) { // h2 < h3
      const {
        nodes: children, headings: restHeadings,
      } = getNodes(headings);
      headings = restHeadings;
      nodes.push(<li key={key}>
        <Link
          href={`#${currentHeading.id}`}
          target="_self"
        >
          {currentHeading.textContent}
        </Link>
        <List nested>
          {children}
        </List>
      </li>);
    } else { // h2 === h2
      nodes.push(<li key={key}>
        <Link
          href={`#${currentHeading.id}`}
          target="_self"
        >
          {currentHeading.textContent}
        </Link>
      </li>);
    }
  }

  return {
    nodes,
    headings,
  };
};

/**
 * Generate a list of links to the sections based on the page's outline.
 */
export const PageOutline = ({ selectors = 'h2, h3, h4, h5, h6' }) => {
  const [
    pageOutline,
    setPageOutline,
  ] = useState(<li>loading...</li>);
  useEffect(() => {
    const el = document.getElementById('storybook-docs');
    const headings = [ ...el.querySelectorAll(selectors) ];
    const nodes = getNodes(headings).nodes;
    setPageOutline(nodes);
  }, []);
  return <Container>
    <Title>On this page</Title>
    <List>
      {pageOutline}
    </List>
  </Container>;
};

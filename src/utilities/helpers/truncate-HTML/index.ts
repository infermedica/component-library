function findAllTextNodes(node: Node) {
  const list: Node[] = [];
  const tw = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) {
    const next = tw.currentNode;
    if (next.textContent?.trim() !== '' && tw.currentNode.nodeType === Node.TEXT_NODE) list.push(next);
  }
  return list;
}

function removeAllNodesAfterNode(node: Node, removeAfterNode: Node) {
  const tw = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
  const elementsToRemove: Element[] = [];
  let remove = false;
  while (tw.nextNode()) {
    const next = tw.currentNode as Element;
    if (!remove && next === removeAfterNode) {
      remove = true;
    } else if (remove) {
      elementsToRemove.push(next);
    }
  }
  elementsToRemove.forEach((element) => element.remove());
}

export function truncateHTMLByElements(maxElements: number) {
  return (content: HTMLElement) => {
    const clonedNode = content.cloneNode(true) as HTMLElement;
    const truncated = clonedNode.children.length > maxElements;

    if (truncated) {
      [ ...clonedNode.children ].forEach((element, index) => {
        if (index + 1 > maxElements) clonedNode.removeChild(element);
      });

      const textNodes = findAllTextNodes(clonedNode);
      const lastTextNode = textNodes[textNodes.length - 1];
      if (lastTextNode) lastTextNode.textContent += '...';
    }

    return ({
      content: clonedNode.innerHTML,
      truncated,
    });
  };
}

export function truncateHTMLByCharactersCount(maxCharacters: number) {
  return (content: HTMLElement) => {
    const clonedNode = content.cloneNode(true) as HTMLElement;
    const textNodes = findAllTextNodes(clonedNode);

    let totalCharacters = 0;
    let truncated = false;
    for (let i = 0; i < textNodes.length; i += 1) {
      const node = textNodes[i];
      const charactersBeforeNode = totalCharacters;
      totalCharacters += node.textContent?.length ?? 0;
      if (totalCharacters > maxCharacters) {
        const targetLength = maxCharacters - charactersBeforeNode;
        const trimRegex = RegExp(`^([\\s\\S]{${targetLength}}\\S*)[\\s\\S]*`);
        const trimmedContent = node.textContent?.replace(trimRegex, '$1');
        node.textContent = typeof trimmedContent === 'string' ? `${trimmedContent}...` : '';
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        removeAllNodesAfterNode(clonedNode, node.parentNode!);
        truncated = true;
        break;
      }
    }

    return {
      content: clonedNode.innerHTML,
      truncated,
    };
  };
}

export function truncateHTMLByTextElementCount(maxTextElements: number) {
  return (content: HTMLElement) => {
    const textNodes = findAllTextNodes(content);
    const clonedNode = content.cloneNode(true) as HTMLElement;
    const truncated = textNodes.length > maxTextElements;

    if (!truncated) {
      return {
        content: clonedNode.innerHTML,
        truncated,
      };
    }

    const clonedTextNodes = findAllTextNodes(clonedNode);
    const lastNode = clonedTextNodes[maxTextElements - 1];
    lastNode.textContent += '...';

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    removeAllNodesAfterNode(clonedNode, lastNode.parentNode!);

    return {
      content: clonedNode.innerHTML,
      truncated,
    };
  };
}

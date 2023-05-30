/**
 * The function `parseHTML` parses an HTML string to extract questions and answers and returns them in
 * an array.
 * @param {string} htmlString - A string representing an HTML document.
 * @returns The function `parseHTML` returns an array of objects with two properties: `question` and
 * `answer`. The `question` property is a string representing the text content of an `H2` element, and
 * the `answer` property is a string representing the HTML content of the next sibling element of the
 * `H2` element. If the next sibling element has child elements, their HTML content
 */
export const parseHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const body = doc.body;

  /**
   * The function parses HTML nodes to extract questions and answers and returns them in an array.
   * @param {HTMLElement | Element} node - An HTML element that represents a node in the DOM (Document
   * Object Model). It can be either an HTMLElement or an Element.
   * @returns The function `parseNode` returns an array of objects with two properties: `question` and
   * `answer`. The `question` property is a string representing the text content of an `H2` element,
   * and the `answer` property is a string representing the HTML content of the next sibling element of
   * the `H2` element. If the next sibling element has child elements, their HTML content
   */
  const parseNode = (node: HTMLElement | Element) => {
    const result: { question: string; answer: string }[] = [];

    if (node.tagName === 'H2') {
      const heading = (node.textContent as string).trim();
      let answer = '';

      let sibling = node.nextElementSibling;
      while (sibling !== null) {
        if (sibling.tagName === 'H2') {
          break;
        }
        answer += sibling.outerHTML;
        sibling = sibling.nextElementSibling;
      }

      result.push({ question: heading, answer });
    }

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const childResult = parseNode(child);
      result.push(...childResult);
    }

    return result;
  };

  return parseNode(body);
};

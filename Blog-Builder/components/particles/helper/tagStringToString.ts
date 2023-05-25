/**
 * The function takes in a string of HTML data, parses it using DOMParser, and returns the text content
 * of the first element found.
 * @param {string} data - The `data` parameter is a string that represents an HTML document or fragment
 * that needs to be parsed and converted to a plain text string.
 * @returns The `TagToString` function takes a string of HTML data as input and returns the text
 * content of the first element in the HTML data. If there is no element in the HTML data, it returns
 * an empty string.
 */
export const TagToString = (data: string) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(data, 'text/html');

  const firstElement = htmlDoc.querySelector('*');
  const textContent = firstElement ? firstElement.textContent : '';

  return textContent;
};

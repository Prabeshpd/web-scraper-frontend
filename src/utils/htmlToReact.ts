// import * as React from 'react';

// export const parseHtmlToElement = (rawHtml: string) => {
//   const template = document.createElement('template');
//   const htmlString = rawHtml.trim();
//   template.innerHTML = htmlString;
//   console.log({ template });
//   return template.content.firstChild;
// };

// export function elementToReact(el) {
//   const tagName = el.tagName?.toLowerCase(); // Note: 'React.createElement' prefers lowercase tag names for HTML elements.
//   const descriptor = tagName ?? el.nodeName;
//   const childNodes = Array.from(el.childNodes);
//   if (childNodes.length > 0) {
//     console.log(`This element ('${descriptor}') has child nodes. Let's transform them now.`);
//     const childReactElements = childNodes
//       .map((childNode) => elementToReact(childNode))
//       .filter((el) => {
//         // In the edge case that we found an unsupported node type, we'll just filter it out.
//         return el !== null;
//       });
//     return React.createElement(tagName, null, ...childReactElements);
//   } else {
//     // This is a "bottom out" point. The recursion stops here. The element is either a text node, a comment node,
//     // and maybe some other types. I'm not totally sure. Reference the docs to understand the different node
//     // types: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
//     console.log(`This element ('${descriptor}') has no child nodes.`);

//     // For simplicity, let's only support text nodes.
//     const nodeType = el.nodeType;
//     if (nodeType === Node.TEXT_NODE) {
//       return el.textContent;
//     } else {
//       console.warn(`Unsupported node type: ${nodeType}. Consider improving this function to support this type`);
//       return null;
//     }
//   }
// }

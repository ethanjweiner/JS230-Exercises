// Array to nodes

/*
High-level options:
1. Create a string of HTML -> render
2. Insert new nodes into existing HTML

Try #2 first; do #1 if #2 seems unfeasable

# PROBLEM

- Input: Nested array of `nodeNames` (capitalized tags)
- Output: A DOM element, nested in the same fashion as the
nodes in `nodeNames`
- Note: The element itself need not be inserted into the document...

# IDEAS

- For each level of nesting:
  - Create all the children of the element
  - Insert those newly created children into the parent

# ALGORITHM

Purpose: Create all nodes in `nodeNames` and append them to the `parentNode`

Given a list of `nodeNames` and a `parentNode` (default = `document`):
- Separate `nodeNames` into the `elementTag` and `childTags`
- Create a `newElement` from `elementTag`
- Append the `newElement` to `parentNode`
- For each element in `childTags`:
  - Create all nodes in `childTags` and append them to the `newElement` (recur)

## IMPLEMENTATION NOTES

- Argument of `createElement`? -- can be the uppercased tag name in `nodeNames`
*/

// Base Case: `childTags` is empty -> will no longer invoke `arrayToNodes`
function arrayToNodes(nodeNames) {
  const [parentTag, childTags] = nodeNames;

  const parent = document.createElement(parentTag);
  childTags.forEach((childTag) => {
    parent.append(arrayToNodes(childTag, parent));
  });

  return parent;
}

// Nested array of nodes
// const nodes = [
//   'BODY',
//   [
//     ['HEADER', []],
//     ['MAIN', []],
//     ['FOOTER', []],
//   ],
// ];

// OR
//
// ["BODY", [
//   ["HEADER", []],
//   ["MAIN", []],
//   ["FOOTER", []]]]

const nodes = [
  'BODY',
  [
    [
      'DIV',
      [
        ['DIV', []],
        ['DIV', [['DIV', []]]],
      ],
    ],
    ['DIV', []],
    [
      'DIV',
      [
        ['DIV', []],
        ['DIV', []],
        ['DIV', []],
      ],
    ],
  ],
];

document.body = arrayToNodes(nodes); // Returns an expandable BODY element

// Idea response to Bob's post:
// If you decide to try to append the body to the document itself, you run
// into issues, since the browser will auto-create the body element, and you
// can't append to the document more than once. However, the solution simply
// asks you to return a new element itself -- you don't necessarily need to
// alter the document. That is why the solution didn't need to account for
// an existing body element. It could create a new one regardless.

// Nodes to Array

/*
# PROBLEM

- Input: A DOM to traverse
- Output: Nested array represent the elements in the body of the DOM
- Definitions/Rules:
  - An element is represented in the form [<TAG_NAME>, [<children>]]
  - If the element has no children, the 2nd element should be `[]`

# EXAMPLES

Check examples in separate file
Edge Case: Body contains no elements -> singular nested array: ["BODY", []]

# IDEAS

- Recursive algorithm

# ALGORITHM

Given a DOM to traverse:
- Produce a 2-element nested array representing the `document.body`##

## Convert an element -> 2-element array representation

Given an `element`:
- Return an array consisting of:
  - The `tagName` of that `element`
  - An array containing all 2-d representations of the elements' child elements
    - Transform all the array's child elements to there 2-d representations**
*/

function nodesToArr(element = document.body) {
  return [element.tagName, [...element.children].map(nodesToArr)];
}

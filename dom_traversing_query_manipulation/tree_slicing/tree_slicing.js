// Slice Tree

/*
# PROBLEM

- Input: Two ids (as integers), `idStart` and `idEnd`
  - Note: ids might not be in the DOM tree
- Output: An array of tag names representing the slice/path from the element at
`idStart` to `idEnd` (inclusive), or `undefined` if no path exists
- Requirements:
  - *Slice/Path*: A slice/path exists from `idStart` to `idEnd` only if `idEnd`
  is a child of `idStart`. They can not be siblings. 
  - Only elements that have `body` as ancestor are sliceable
  - Only element nodes should be considered in the slice

# EXAMPLES

Edge Cases:
- Start element IS the end element
- No path exists -> return `undefined`
- Either the start/end id don't exist -> return `undefined`

# IDEAS

- Start from the end?
- Search for a path from `idStart` to `idEnd`; if none found -> return undefined

# DATA STRUCTURES

- Intermediate: Accumulate an array of tag names during tree traversal

# ALGORITHM

Given an `idStart` and `idEnd`:
- Find the `startElement` and `endElement` (##getElementByID)
- If either does not exist, return `undefined`
- Determine a path from `startElement` to `endElement`##
  - Pass an initial `sliceSoFar` of empty

## Find a path from start to end

Note: Use an accumulator for optimization purposes

Given a `startElement`, `endElement`, and `sliceSoFar`:
- If `startElement` is `undefined` -> return `undefined`
- Create a `newSlice` with `startElement`'s tag name concatenated to `sliceSoFar`
- If `startElement` is the `endElement`:
  - Return the `newSlice`
- Else:
  - For each `child` of `startElement`:
    - Find all paths from `child` to `endElement`, using the `newSlice`
  - If any path is not `undefined` -> return that path
  - Otherwise, return `undefined`
  
# IMPLEMENTATION NOTES

- Check whether comparing the same node to itself returns `true`
- Use a plain `for` loop: allows for early return if we find a path

*/

// Option 1: Recursive w/ accumulator
function sliceTree(startId, endId) {
  const startElement = document.getElementById(startId);
  const endElement = document.getElementById(endId);

  if (!startElement || !endElement) return;

  return (function findPath(start, end, sliceSoFar) {
    if (start === undefined) return;
    let newSlice = [...sliceSoFar, start.tagName];
    if (start === end) return newSlice;

    for (let index = 0; index < start.children.length; index++) {
      const candidatePath = findPath(start.children[index], end, newSlice);
      if (candidatePath) return candidatePath;
    }

    // No path was found
    return undefined;
  })(startElement, endElement, []);
}

// Option 2: Recursive w/o accumulator
function sliceTree(startId, endId) {
  const startElement = document.getElementById(startId);
  const endElement = document.getElementById(endId);

  if (!startElement || !endElement) return;

  return (function findPath(start, end) {
    if (start === undefined) return;
    if (start === end) return [end.tagName];

    for (let index = 0; index < start.children.length; index++) {
      const childPath = findPath(start.children[index], end);
      if (childPath) return [start.tagName, ...childPath];
    }
  })(startElement, endElement);
}

// Option 3: Backwards (simpler)
function sliceTree(startId, endId) {
  const startElement = document.getElementById(startId);
  const endElement = document.getElementById(endId);

  if (!startElement || !endElement) return;

  return (function findPath(start, end) {
    if (end.tagName === 'BODY' || !end) return;
    if (start === end) return [start.tagName];

    const pathFromParent = findPath(start, end.parentElement);
    if (pathFromParent) return pathFromParent.concat(end.tagName);
  })(startElement, endElement);
}

console.log(sliceTree(1, 4));
// ["ARTICLE", "HEADER", "SPAN", "A"]
console.log(sliceTree(1, 1));
// ["ARTICLE"]
console.log(sliceTree(1, 76));
// undefined
console.log(sliceTree(35, 4));
// undefined
console.log(sliceTree(2, 5));
// undefined
console.log(sliceTree(5, 4));
// undefined
console.log(sliceTree(1, 23));
// ["ARTICLE", "FOOTER"]
console.log(sliceTree(1, 22));
// ["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
console.log(sliceTree(11, 19));
// ["SECTION", "P", "SPAN", "STRONG", "A"]

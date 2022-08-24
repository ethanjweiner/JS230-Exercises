// Tracing the Dom Tree

/*
# PROBLEM

Input: An `idNum` of an element
Output: An array of subarrays:
- First subarray is the tag name of the element & its siblings
- Upper subarrays are the tag names of the element's parents & their siblings
- Last subarry is ["ARTICLE"]
Requirements:
- Traverse UP the DOM tree
- Each subarray should contain the `nodeName` or `tagName` of that element
- Assume the top-level element is the element w/ an id of 1

# EXAMPLES

Edge Cases:
- id of 1 (returns 1-element subarray)
- Non-existent id (don't handle)

# DATA STRUCTURES

- Accumulate array of sub-arrays
- Use a recursive algorithm...

# ALGORITHM

Given an `idNum`:
- Find the `element` corresponding to `idNum`
- Retrieve an array of the element plus its siblings##
- Trace the DOM tree of the parent of the element
- Return an array consisting of:
  - The current subarray
  - All subarrays from the parent's DOM tree

## Get siblings

Given an `element`:
- Find the parent of the element
- Return all child elements of the parent
*/

// Recursive
// function domTreeTracer(idNum) {
//   const element = document.getElementById(String(idNum));
//   if (idNum === 1) return [[element.tagName]];
//   return [
//     tagsInLayer(element),
//     ...domTreeTracer(parseInt(element.parentElement.id)),
//   ];
// }

// function tagsInLayer(element) {
//   const children = Array.prototype.slice.call(element.parentElement.children);
//   return children.map((node) => node.tagName);
// }

// Recursive Refactored
function domTreeTracer(idNum) {
  const element = document.getElementById(String(idNum));
  const layers = [];

  (function allTags(element) {
    if (element.id === '1') {
      layers.push([element.tagName]);
      return;
    }

    layers.push(tagsInLayer(element));
    allTags(element.parentElement);
  })(element);

  return layers;
}

function tagsInLayer(element) {
  const children = Array.prototype.slice.call(element.parentElement.children);
  return children.map((node) => node.tagName);
}

// Recursive w/ accumulator
// Note: Doesn't mutate `previousLayers`: assigning to new variable makes clear
// that we pass an updated accumulator each time
function domTreeTracer(id, previousLayers = []) {
  const element = document.getElementById(id);
  const parent = element.parentElement;
  const siblings = [...parent.children];
  const tags = siblings.map((element) => element.tagName);
  const newLayers = [...previousLayers, tags];

  return element.id === '1' ? newLayers : domTreeTracer(parent.id, newLayers);
}

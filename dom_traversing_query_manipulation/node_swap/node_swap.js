// Node Swap

/*
# PROBLEM

- Input: Two ids, `idA` and `idB`, of elements to swap
- Output:
  - RV: `true` for valid swaps, `undefined` for invalid
  - Side Effect: Swap the elements in the DOM, unless the swap is invalid
- Definitions/Rules:
  - *Invalid Swap*:
    - No element exists for one or both of the given ids
    - One element is the child of another element
  - The listed elements need not be in order

# EXAMPLES/TESTS

- Edge Cases:
  - Element(s) are at the ends of the children
- Test in the DOM

# IDEAS

- Determing whether elements are children:
  - Determine the inverse: If the elements are siblings, then the swap is valid
  - Otherwise, return undefined
  - [Determine siblings by taking the children of the parent]
- Avoid direct replacement, because then we lose the node
- Instead, insert idA before/adjacent to idB, and vice versa
- Potential problem: We lose the position of the previous element
  - Idea: Store the adjacent element of one of the ids for reference?
  - Idea: Store the index of the element itself? ***
- Use the parent to perform the DOM insertion methods

Starting:

X A X X X B
0 1 2 3 4 5

IndexA = 1

Insert A before B:

X X X X A B
0 1 2 3 4 5

Insert B where A was:
- Find element at index 1
- Insert before that

X B X X X A
0 1 2 3 4 5

Reverse Direction:

X B X X X A
0 1 2 3 4 5
IndexA = 5

Insert A before B:
X A B X X X
0 1 2 3 4 5

Insert B where A was:
- Find element at index 5
- Insert before that 

DOESN'T WORK for reverse direction
Goal is to make it universal

Need to insert after/before indexed element conditionally?
- If index of A > index of B -> insert B BEFORE indexed element
- If index of A < index of B -> insert AFTER indexed element

# IMPLEMENTATION NOTES

- Use `Node.contains` to check whether one element is a child of the other?

# ALGORITHM

Given two ids, `idA` and `idB`:

Preparation:
- Retrieve the elements `elementA` and `elementB` associated w/ ids
- If either element is nonexistent -> return `undefined`
- If elements do not share parents -> return `undefined`
- Compute the `parent` of both elements
- If the index of `elementA` is greater than the index of `elementB`, swap
`elementA` and `elementB`

Swapping:
- Find the `indexOfA` of `elementA` in the `parent`'s children
- Insert `elementA` before `elementB` (##Node.insertBefore)
- Insert `elementB` before the element now at `indexOfA`
- Return true

# ALGORITHM 2

Given two ids, `idA` and `idB`:

- Retrieve the elements `elementA` and `elementB` associated w/ ids
- If the swap is invalid -> return `undefined
- Compute `elementAParent` and `elementBParent`
- Find the indices of both elements
- Re-insert the elements into the appropriate indices ##
   - Insert into the lower index first
   - Insert into the higher index second
- Return true

## Insert an element at an index in children

# ALGORITHM 3

- Retrieve the elements `elementA` and `elementB` associated w/ ids
- If the swap is invalid -> return `undefined
- Compute `elementAParent` and `elementBParent`
- Retrieve the `nextElementSibling` of `elementA` and `elementB` (## returns
  element or `null`): `siblingAfterA`, `siblingAfterB`
- Insert `elementA` and `elementB` into appropriate positions, given the siblings
- Return `true`


## Insert element into position

Given `elementToInsert`, the `parent`, and the `elementAfter`:
- If `elementAfter` exists:
  - Insert `elementToInsert` in `parent` before `elementAfter` (##Node.insertBefore)
- Else:
  - Append `elementToInsert` to the end of the `parent`
*/

// Helper
function isInvalidSwap(node1, node2) {
  return !node1 || !node2 || node1.contains(node2) || node2.contains(node1);
}

// Solution with cloning
function nodeSwap(idA, idB) {
  let elementA = document.getElementById(idA);
  let elementB = document.getElementById(idB);

  if (isInvalidSwap(elementA, elementB)) return undefined;

  let elementAClone = elementA.cloneNode(true);
  let elementBClone = elementB.cloneNode(true);

  elementA.replaceWith(elementBClone);
  elementB.replaceWith(elementAClone);

  return true;
}

// Solution without cloning

/*
Main problem: Don't use indices <- they are updating

A before B:
X A X X X B
0 1 2 3 4 5

X X X X B A
X B X X X A

B before A:
X B X X X A
0 1 2 3 4 5

X B A X X X
X A X X X B
*/
function nodeSwap(idA, idB) {
  let elementA = document.getElementById(idA);
  let elementB = document.getElementById(idB);

  if (isInvalidSwap(elementA, elementB)) return undefined;

  let elementAParent = elementA.parentElement;
  let elementBParent = elementB.parentElement;

  let siblingAfterA = elementA.nextElementSibling;
  let siblingAfterB = elementB.nextElementSibling;

  insertBeforeElement(elementA, siblingAfterB, elementBParent);
  insertBeforeElement(elementB, siblingAfterA, elementAParent);
}

function insertBeforeElement(elementToInsert, referenceElement, parent) {
  if (referenceElement) {
    parent.insertBefore(elementToInsert, referenceElement);
  } else {
    parent.appendChild(elementToInsert);
  }
}

// Try swapping some other nodes...

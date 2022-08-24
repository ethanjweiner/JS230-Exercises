// Coloring

/*
# PROBLEM

- Input: A non-negative integer representing the `generation` to color
- Output: Add a `.generation-color` class to the specified generation
- Note: Generation is NOT equivalent to children
- Note: Only dealing w/ elements, not all nodes

# EXAMPLES/TESTS

- Edge Cases:
  - The generation does not exist -> do not add class to any generation

# IDEAS

- Compute the generations first (using an object to map gen #s -> elements)
- If found, add the class `.generation-color` to all elements in that generation
- Goal: Short-circuit once we reach the generation

Key: x = element
     
Question: How to find all elements in third gen?

     x
    /  \
   x    x
  / \   |
 x  x   x

Keep track of gen # -> collect all elements in that gen
Idea: Only mutate array if in that gen

# DATA STRUCTURES

- Input: We are recursing through the generations of the DOM tree
- Intermediate: Array of generations? 
- Intermediate: Current generation array?

# ALGORITHM

Given a `genNumber`:
- If the `genNumber` is 0 -> return (body should not be colored)
- Find all elements in the `genNumber` ##
  - Current generation = [body]
  - Current gen # = 0
- Color all the elements in that generation ##

## Find elements in a particular generation (cumulative)

Given a `genNumberToFind`, `currentGenNumber` and `currentGeneration`:
- If `currentGenNumber` equals `genNumberToFind`, return `currentGeneration`
- Else:
  - Transform each element in `previousGeneration` to its children
  - Flatten the transformed array, giving us the `nextGeneration`
  - Recursively compute the generation of `genNumberToFind`, passing the
  `nextGeneration` and `currentGenNumber + 1`

## Find elements in a particular generation (pure recursive)

Given the `gensRemaining` and `currentGen`:
- If `gensRemaining` is 0 -> return empty array
- 

## Color all elements in an array

- For each element:
  - Add the class `.generation-color`

# Short Recurisve Algorithm

colorGeneration: Given a `parent` to start from colors the `genToColor`
Given a `genToColor`, `parent` (default = document.body), and `parentGen=0`:
- If the `parent` is null -> return (don't keep traversing)
- If the `parentGen` equals the `genToColor`:
  - Color the `parent`
- Else:
  - Color the `genToColor` for each of the child elements
*/

// function colorGeneration(genNumber) {
//   if (genNumber === 0) return;
//   const generation = findGeneration(genNumber, 0, [document.body]);
//   colorElements(generation);
// }

function findGeneration(genNumberToFind) {
  let currentGen = [document.body];
  let currentGenNumber = 0;

  do {
    currentGen = currentGen
      .map((element) => {
        return Array.prototype.slice.call(element.children);
      })
      .flat();
    currentGenNumber += 1;
  } while (currentGenNumber !== genNumberToFind);

  return currentGen;
}

function colorElements(elements) {
  elements.forEach((element) => {
    element.classList.add('generation-color');
  });
}

// Recursive solution

function colorGeneration(genToColor, parent = document.body, parentGen = 0) {
  if (parent === null) return;
  if (genToColor === parentGen) parent.classList.add('generation-color');
  [...parent.children].forEach((child) =>
    colorGeneration(genToColor, child, parentGen + 1)
  );
}

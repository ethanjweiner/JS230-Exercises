// Child Nodes: Further Exploration

function walk(node, callback) {
  callback(node);

  children.forEach((childNode) => walk(childNode, callback));
}

// Option 1: Count indirect nodes by subtracting direct count from entire count

function childNodes(idNum) {
  const element = document.getElementById(String(idNum));
  const directChildCount = element.childNodes.length;
  const indirectChildCount = nodeCount(element) - directChildCount;
  return [directChildCount, indirectChildCount];
}

function nodeCount(node) {
  const children = Array.prototype.slice.call(node.childNodes);
  let count = children.length;

  children.forEach((child) => (count += nodeCount(child)));
  return count;
}

console.log(childNodes(1)); // [9, 12]
console.log(childNodes(4)); // [3, 1]
console.log(childNodes(9)); // [1, 1]

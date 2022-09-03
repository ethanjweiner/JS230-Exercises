// Delegate Vent Function

// Goal:

// Difference from regular event delegation: Callback is ONLY invoked when
// the event occurs on elements of the `selector`

// All event handflers listen during the bubbling phase

/*
# PROBLEM:

- Input: `parentElement`, `selector`, `eventType`, `callback`
- Requirements:
  - GOAL: Delegate events of `eventType` on descendants of `parentElement`
  matching `selector` to the `callback` used in the listener of `parentElement`
  - If `parentElement` exists:
    - Add an event listener to it of `eventType`
      - Only invoke the `callback` if the `event` occurred on a `target` which
      is both: A descendant of `parentElement` AND matches the `selector`
    - Return `true`
  

# IDEAS:
- To test whether the `event` occured on a proper descendant:
  - Return true if `parentElement.querySelector(selector)` includes `event.target`
*/

function delegateEvent(parentElement, selector, eventType, callback) {
  if (!(parentElement instanceof Element)) return;

  function happenedOnMatchingDescendant(event) {
    const descendants = Array.from(parentElement.querySelectorAll(selector));
    return descendants.includes(event.target);
  }

  parentElement.addEventListener(eventType, (event) => {
    if (happenedOnMatchingDescendant(event)) callback(event);
  });

  return true;
}

// # EXAMPLES/TESTS

// Possible elements for use with the scenarios
const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

// Possible callback for use with the scenarios
const callback = ({ target, currentTarget }) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

// Scenario 1: Parent doesn't exist
// delegateEvent(element1, 'p', 'click', callback);
// => undefined
// Doesn't add any event listeners

// Scenario 2: Parent includes none of selector
// delegateEvent(element2, 'p', 'click', callback);
// => true
// Adds 'click' event listener to `element2`
// The callback function never triggers, however

// Scenario 3: Parent & selector are the same
// delegateEvent(element2, 'h1', 'click', callback);
// => true
// Adds `click` event listener to `element2`
// The callback function DOES NOT trigger

// Secnario 4: Parent includes the selector
// delegateEvent(element3, 'h1', 'click', callback);
// => true
// Adds `click` event listener to `element3`
// Callback function triggers when the 'h1' element is clicked
// Alerts: Target: H1, Current Target: MAIN

// Scenario 5: Parent includes the selector
// delegateEvent(element3, 'aside p', 'click', callback);
// => true
// Adds `click` event listener to `element3`
// Callback function triggers when either `p` element in the `aside` is clicked
// Alerts: Taarget: P, Current Target: MAIN

// Scenario 6:
// delegateEvent(element2, 'p', 'click', callback);
// => true
// Adds `click` event listener to `element2`
// Callback function never triggers, the parent contains no `p`

// const newP = document.createElement('P');
// const newContent = document.createTextNode('New Paragraph');
// newP.appendChild(newContent);
// element2.appendChild(newP);

// Now, callback function triggers when clicking "New Paragraph"
// Alerts: Target: P, Current Target: H1

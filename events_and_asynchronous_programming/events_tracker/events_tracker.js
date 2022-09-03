// Events Tracker

/*
# PROBLEM

- Input: An `eventHandler`
- Behavior:
  - Adds the `event` to a `tracker` object (if it's unique)
  - Invokes the event handler itself
- `tracker` object:
  - Create w/ an IIFE for private variables
  - `events` local variable: Includes all events
  - `list()`: Returns a shallow copy of the `events`
    - Internal `events` can not be mutated
  - `elements()`: Returns a list of the event targets
  - `clear()`: Resets the list, returns the new list length

# IDEAS
- Use event delegation to track any events on the entire `window` object
- Events should be tracked even if propagation stops
- Check if the `tracker` already includes the `event` before adding it
*/

const { tracker, track } = (function () {
  const events = [];

  const tracker = {
    list() {
      return [...events];
    },
    elements() {
      return events.map(({ target }) => target);
    },
    clear() {
      events.length = 0;
      return events.length;
    },
  };

  // Returns a function that wraps the `eventHandler`
  function track(eventHandler) {
    return function (event) {
      if (events.includes(event)) {
        events.push(event);
      }

      eventHandler(event);
    };
  }

  return { tracker, track };
})();

// Tests
const divRed = document.querySelector('#red');
const divBlue = document.querySelector('#blue');
const divOrange = document.querySelector('#orange');
const divGreen = document.querySelector('#green');

divRed.addEventListener(
  'click',
  track((event) => {
    document.body.style.background = 'red';
  })
);

divBlue.addEventListener(
  'click',
  track((event) => {
    event.stopPropagation();
    document.body.style.background = 'blue';
  })
);

divOrange.addEventListener(
  'click',
  track((event) => {
    document.body.style.background = 'orange';
  })
);

divGreen.addEventListener(
  'click',
  track((event) => {
    document.body.style.background = 'green';
  })
);

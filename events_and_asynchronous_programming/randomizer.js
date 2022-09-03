// Randomizer

function randomizer(...callbacks) {
  const maxSeconds = callbacks.length * 2;
  logElapsedTime(maxSeconds);
  callbacks.forEach((callback) => executeInRandomTime(callback, maxSeconds));
}

function logElapsedTime(maxSeconds) {
  let elapsedSeconds = 0;

  let interval = setInterval(() => {
    elapsedSeconds += 1;
    console.log(elapsedSeconds);

    if (elapsedSeconds >= maxSeconds) {
      clearInterval(interval);
    }
  }, 1000);
}

function executeInRandomTime(callback, maxSeconds) {
  setTimeout(callback, Math.random() * maxSeconds * 1000);
}

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

randomizer(callback1, callback2, callback3);

/*
BTS:

Synchronous tasks (everything you can "see"):
- Interval is set
- For each callback, a random time is deteremined and a callback is "set"

Asynchronous tasks:
- Callbacks passed to interval are invoked
- Callbacks passed to setTimeout are executed

Notes:
- Web APIs handle the async behavior of setTimeout and setInterval
- It is not until the callbacks are passed to the task queue that they are
executed
*/

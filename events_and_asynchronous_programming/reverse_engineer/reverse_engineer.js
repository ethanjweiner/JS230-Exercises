// document.querySelector('html').addEventListener('click', (event) => {
//   if (event.target.id !== 'container') {
//     container.style = 'display: none';
//   }
// });

// Using bubbling & capturing
// Goal: When clicking anywhere outside container, hide the container
// When clicking anywhere inside the container, don't hide it.

// If outside container is clicked, hide it
document.querySelector('html').addEventListener(
  'click',
  () => {
    document.querySelector('#container').style = 'display: none';
  },
  true
);

// If the container (or anywhere inside is clicked), unhide it
document.querySelector('#container').addEventListener('click', (event) => {
  document.querySelector('#container').style = 'display: visible';
});

// Note that the event listener on `html` will activate first because it is
// listneing on the capture phase; so the container will be hidden before it is
// unhidden

/*
GOAL: Handle everything in a singular event listener
Idea: Condition based on the target?

Since we are just dealing with one element here, there's no need to
use event propagation to delegate the event handling to a parent element.
We can simply handle the event on the `#container` element itself.
This also simplifies things because we don't query as much.
*/
